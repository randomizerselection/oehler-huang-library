"""Reviewed, explicitly authorized reminder campaign for missing homework.

Flow: --build (draft plan from the platform database) -> human review ->
--authorize -> --upload (question image to DingTalk Drive) -> --send.
Every send is idempotent, confirmed through query-send-status, and records
delivery history; uncertain outcomes stop the campaign instead of retrying.

A campaign may cover several assignments at once: each student receives one
personalized message naming exactly what they still owe, plus one question
file card per owed assignment. --exclude <studentKey>:<header> removes one
assignment from one student's owed set (for students already reminded for
that assignment through a confirmed earlier delivery).
"""
import argparse
import datetime as dt
import hashlib
import json
import os
import subprocess
import sys
import time
from pathlib import Path

from fetch import CONFIG, ROOT, TZ, cli, ensure_english_only, roster, save
from platform_db import assignment_metadata, connect, homework_row, require_schema
from receipts import field

PLAN = ROOT / 'state' / 'reminder-plan.json'
DELIVERIES = ROOT / 'state' / 'reminder-deliveries.json'
MISSING_STATUSES = (None, 'missing')
EXCLUDE_REASON = 'already reminded earlier today (delivery confirmed)'


def sha256_file(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def load_plan():
    if not PLAN.exists():
        raise RuntimeError('No reminder plan; run --build first')
    return json.loads(PLAN.read_text(encoding='utf-8'))


def assignment_label(meta):
    return meta.get('displayName') or meta.get('platformTitle') or meta.get('label')


def meta_label(meta):
    return meta.get('label') or assignment_label(meta)


def meta_due(meta):
    if meta.get('dueDate'):
        return meta['dueDate']
    return due_month_name(meta)


def due_month_name(meta):
    if not meta.get('dueAt'):
        return None
    return dt.datetime.fromisoformat(meta['dueAt']).strftime('%d %B').lstrip('0')


def compose_message(student, owed_metas):
    """One deterministic English message naming exactly what the student owes.
    Send-time recomposition with the same owed set produces identical text."""
    metas = sorted(owed_metas, key=lambda meta: meta.get('assignedDate') or '')
    name = (student.get('english') or '').strip()
    salutation = f'Hi {name},' if name else 'Hi,'
    labels = [meta_label(meta) for meta in metas]
    if len(metas) == 1:
        due = meta_due(metas[0])
        deadline = f' - it was due on {due}.' if due else '.'
        return (f"{salutation} I don't have your {labels[0]} yet{deadline}"
                f" Please send a photo of your answer with your working. The question is attached.")
    due_parts = ' and '.join(f'{label} was due on {meta_due(meta)}' for label, meta in zip(labels, metas))
    return (f"{salutation} I don't have your {' or '.join(labels)} yet - {due_parts}."
            f" Please send a photo of your answer with your working for each. The questions are attached.")


def message_for(student, meta):
    return compose_message(student, [meta])


def student_view(student):
    return {key: student[key] for key in ('key', 'accountId', 'classId', 'class', 'name', 'english')}


def directory_identity(student, students, searcher):
    """Resolve an unlinked student through the org directory. Only an exact,
    unique full-name match is accepted; the returned id must not already belong
    to another platform student, and the roster name must not be a substring of
    another student's name (which would make the match ambiguous)."""
    name = student['name']
    if any(other['name'] != name and name in other['name'] for other in students):
        return None, 'Roster name is a substring of another student name; ambiguous'
    results = searcher(['contact', 'user', 'search', '--query', name]).get('result') or []
    exact = [item for item in results
             if item.get('name') == name or (item.get('name') or '').endswith(name)]
    if len(exact) != 1:
        if not results:
            return None, 'Not found in the org directory (search returned no results)'
        return None, f'Org directory match is not unique ({len(exact)} of {len(results)} results)'
    identity = exact[0].get('openDingTalkId')
    if not identity:
        return None, 'Org directory match has no openDingTalkId'
    if any(other.get('dingtalkId') == identity for other in students if other['key'] != student['key']):
        return None, 'Org directory identity is already linked to another student'
    return identity, None


def parse_exclusions(excludes, students, assignments):
    result = {}
    for item in excludes or []:
        if ':' not in item:
            raise ValueError('--exclude must be <studentKey>:<assignment header>')
        student_key, header = item.split(':', 1)
        if student_key not in {student['key'] for student in students}:
            raise ValueError(f'--exclude references an unknown student: {student_key}')
        if header not in assignments:
            raise ValueError(f'--exclude references an assignment outside this campaign: {header}')
        result.setdefault(student_key, set()).add(header)
    return result


def normalize_attachments(plan):
    """Upgrade a legacy single-assignment plan in-memory to the attachments list."""
    if not plan.get('attachments'):
        plan['attachments'] = [{'assignment': plan['assignment'], 'path': plan['attachment'],
                                'sha256': plan['attachmentSha256'],
                                'fileName': plan['attachmentFileName'],
                                'extension': plan.get('attachmentExtension'),
                                'size': plan.get('attachmentSize'),
                                'driveFile': plan.get('driveFile')}]
    return plan['attachments']


def plan_metas(plan):
    metas = {meta['header']: meta for meta in plan.get('assignments') or []}
    if not metas:
        metas[plan['assignment']] = assignment_metadata(plan['assignment'])
    return metas


def build(campaign, assignments, attachments, excludes=None, allow_reset=False,
          resolve_contacts=False, sender=cli):
    if len(assignments) != len(attachments):
        raise ValueError('Each --assignment needs exactly one --attachment (same order)')
    pairs = sorted(((assignment_metadata(header), Path(attachment).resolve())
                    for header, attachment in zip(assignments, attachments)),
                   key=lambda pair: pair[0].get('assignedDate') or '')
    metas = [pair[0] for pair in pairs]
    plan_attachments = []
    for meta, path in pairs:
        if not path.exists():
            raise FileNotFoundError(f'Attachment not found: {path}')
        plan_attachments.append({'assignment': meta['header'], 'path': str(path),
                                 'sha256': sha256_file(path), 'fileName': path.name,
                                 'extension': path.suffix.lstrip('.').lower(),
                                 'size': path.stat().st_size, 'driveFile': None})
    if PLAN.exists():
        existing = json.loads(PLAN.read_text(encoding='utf-8'))
        if existing.get('status') != 'draft' and not allow_reset:
            raise RuntimeError('An authorized or completed campaign already exists; pass --allow-reset to replace it')
    recipients, unreachable = [], []
    students = [student for student in roster() if student['class'] in CONFIG['classes']]
    exclusions = parse_exclusions(excludes, students, assignments)
    with connect(readonly=True) as db:
        require_schema(db)
    for student in students:
        owed, excluded_records = [], []
        for meta in metas:
            row = homework_row(student, meta['header'])
            status = row['status'] if row else None
            if row and row['teacher_accepted']:
                continue
            if status not in MISSING_STATUSES:
                if status in ('submitted', 'late', 'awaiting_working'):
                    continue
                raise ValueError(f"Unexpected platform homework status: {status}")
            if meta['header'] in exclusions.get(student['key'], set()):
                excluded_records.append({'assignment': meta['header'], 'reason': EXCLUDE_REASON})
                continue
            owed.append(meta)
        if student['class'] not in CONFIG['classes']:
            raise ValueError('Unauthorized class in reminder recipient')
        if not owed:
            # Owes nothing (or only excluded assignments): never a recipient.
            continue
        identity, reason = student.get('dingtalkId'), None
        evidence = 'platform-link'
        if not identity and resolve_contacts:
            identity, reason = directory_identity(student, students, sender)
            evidence = 'contact-search'
        if not identity:
            unreachable.append({'student': student_view(student),
                                'reason': reason or 'No verified DingTalk identity link'})
            continue
        recipients.append({'student': student_view(student), 'recipientId': identity,
                           'identityEvidence': evidence,
                           'owed': [meta['header'] for meta in owed],
                           'excludedAssignments': excluded_records,
                           'message': compose_message(student, owed)})
    first = plan_attachments[0]
    plan = {
        'campaign': campaign, 'status': 'draft', 'assignment': metas[0]['header'],
        'assignmentLabel': meta_label(metas[0]), 'dueDate': metas[0].get('dueAt'),
        'assignments': [{'header': meta['header'], 'label': meta_label(meta),
                         'assignedDate': meta.get('assignedDate'),
                         'dueDate': meta_due(meta), 'dueAt': meta.get('dueAt')} for meta in metas],
        'attachments': plan_attachments,
        # Legacy single-assignment fields, mirrored from the first attachment.
        'attachment': first['path'], 'attachmentSha256': first['sha256'],
        'attachmentFileName': first['fileName'], 'attachmentSize': first['size'],
        'attachmentExtension': first['extension'], 'driveFile': None,
        'createdAt': dt.datetime.now(TZ).isoformat(), 'recipients': recipients,
        'unreachable': unreachable, 'resolvedContacts': resolve_contacts,
    }
    for recipient in recipients:
        ensure_english_only(recipient['message'])
        if recipient['student']['english']:
            if not recipient['message'].startswith(f"Hi {recipient['student']['english']},"):
                raise ValueError('Recipient message is not personalized with the preferred name')
        elif not recipient['message'].startswith('Hi,'):
            raise ValueError('Recipient message must use the neutral greeting')
    save(PLAN, plan)
    return plan


def authorize(plan_path=PLAN):
    plan = load_plan() if plan_path == PLAN else json.loads(Path(plan_path).read_text(encoding='utf-8'))
    if plan.get('status') != 'draft':
        raise RuntimeError('Only a draft plan can be authorized')
    plan['status'] = 'authorized'
    plan['authorizedAt'] = dt.datetime.now(TZ).isoformat()
    save(plan_path, plan)
    return plan


def upload(plan_path=PLAN, sender=cli):
    plan = load_plan() if plan_path == PLAN else json.loads(Path(plan_path).read_text(encoding='utf-8'))
    if plan.get('status') != 'authorized':
        raise RuntimeError('Reminder plan is not authorized')
    attachments = normalize_attachments(plan)
    for attachment in attachments:
        if sha256_file(attachment['path']) != attachment['sha256']:
            raise ValueError('Attachment changed since the plan was built: ' + attachment['fileName'])
        existing = attachment.get('driveFile') or {}
        if existing.get('fileId') and existing.get('dentryId') and existing.get('spaceId'):
            continue
        response = sender(['drive', 'upload', '--file', attachment['path'],
                           '--file-name', attachment['fileName']])
        file_id = field(response, 'fileId')
        space = field(response, 'spaceId')
        if not file_id:
            raise RuntimeError('Drive upload response lacks fileId; inspect before retrying')
        # The chat file-card send needs the numeric dentryId, which only drive info returns.
        info = sender(['drive', 'info', '--file-id', str(file_id)])
        dentry = field(info, 'dentryId')
        space = field(info, 'spaceId') or space
        if not dentry or not space:
            raise RuntimeError('Drive info response lacks dentryId/spaceId; inspect before retrying')
        attachment['driveFile'] = {'fileId': str(file_id), 'dentryId': str(dentry), 'spaceId': str(space),
                                   'fileName': attachment['fileName'], 'path': field(info, 'path'),
                                   'uploadedAt': dt.datetime.now(TZ).isoformat()}
    plan['driveFile'] = attachments[0].get('driveFile')
    save(plan_path, plan)
    return plan


def delivery_digest(plan, recipient, detail):
    return hashlib.sha256((CONFIG['profile'] + '\n' + recipient['student']['key'] + '\n'
                           + plan['campaign'] + '\n' + detail).encode()).hexdigest()


def text_delivery_key(plan, recipient, owed_headers):
    return 'reminder-text-' + delivery_digest(plan, recipient, '|'.join(sorted(owed_headers)))


def card_delivery_key(plan, recipient, header):
    return 'reminder-question-' + delivery_digest(plan, recipient, header)


def live_owed_set(recipient, owed_headers):
    """Recompute what the recipient still owes at send time. An empty result
    means the recipient is skipped entirely (submitted, teacher-accepted, or a
    new message in the fresh batch needs review first)."""
    matches = [student for student in roster() if student['key'] == recipient['student']['key']]
    if len(matches) != 1:
        raise ValueError('Roster identity changed')
    student = matches[0]
    if student['class'] not in CONFIG['classes']:
        raise ValueError('Unauthorized class')
    batch_path = ROOT / 'state' / 'pending.json'
    if batch_path.exists():
        batch = json.loads(batch_path.read_text(encoding='utf-8'))
        if any(message['senderId'] == recipient['recipientId'] for message in batch.get('messages', [])):
            return []
    owed = []
    for header in owed_headers:
        row = homework_row(student, header)
        if row and row['teacher_accepted']:
            continue
        status = row['status'] if row else None
        if status in ('submitted', 'late', 'awaiting_working'):
            continue
        if status not in MISSING_STATUSES:
            raise ValueError(f'Unexpected platform homework status: {status}')
        owed.append(header)
    return owed


def deliver(state, state_path, key, recipient, args, sender=cli):
    entry = state['messages'].get(key, {})
    if entry.get('status') == 'sent':
        return True
    if not entry.get('openTaskId'):
        now = dt.datetime.now(TZ)
        if entry.get('status') == 'sending' or entry.get('attemptedAt'):
            entry.update(status='uncertain', lastError='A prior send intent has no persisted task ID')
            state['messages'][key] = entry
            save(state_path, state)
            raise RuntimeError('Uncertain delivery; inspect the DingTalk chat before any retry')
        entry.update(status='sending', attemptedAt=now.isoformat(),
                     recipientId=recipient['recipientId'], studentKey=recipient['student']['key'],
                     idempotencyKey=key)
        state['messages'][key] = entry
        save(state_path, state)
        try:
            response = sender(['chat', 'message', 'send', '--open-dingtalk-id', recipient['recipientId'],
                               *args, '--ai-tag=true', '--idempotency-key', key, '--yes'])
        except Exception as error:
            entry.update(status='uncertain', lastError=str(error)[:500])
            save(state_path, state)
            raise RuntimeError('DingTalk send outcome is uncertain; inspect the chat before any retry') from error
        task = field(response, 'openTaskId')
        if not task:
            entry.update(status='uncertain', lastError='Send response lacks openTaskId')
            save(state_path, state)
            raise RuntimeError('Missing send task; do not blindly retry')
        entry.update(openTaskId=task, status='awaiting-confirmation')
        save(state_path, state)
    status = sender(['chat', 'message', 'query-send-status', '--open-task-id', str(entry['openTaskId'])])
    message_id, conversation_id = field(status, 'openMessageId'), field(status, 'openConversationId')
    if message_id and conversation_id:
        entry.update(status='sent', openMessageId=message_id, openConversationId=conversation_id,
                     confirmedAt=dt.datetime.now(TZ).isoformat())
    save(state_path, state)
    return entry['status'] == 'sent'


def send(plan_path=PLAN, state_path=DELIVERIES, sender=cli, refresh_every=10):
    plan = load_plan() if plan_path == PLAN else json.loads(Path(plan_path).read_text(encoding='utf-8'))
    if plan.get('status') != 'authorized':
        raise RuntimeError('Reminder plan is not authorized')
    attachments = normalize_attachments(plan)
    by_header = {attachment['assignment']: attachment for attachment in attachments}
    for attachment in attachments:
        if sha256_file(attachment['path']) != attachment['sha256']:
            raise ValueError('Attachment changed since the plan was built: ' + attachment['fileName'])
        drive_file = attachment.get('driveFile') or {}
        if not drive_file.get('dentryId') or not drive_file.get('spaceId'):
            raise RuntimeError('Question image has not been uploaded to DingTalk Drive; run --upload first: '
                               + attachment['fileName'])
    metas_by_header = plan_metas(plan)
    # Plan integrity: the reviewed build-time text must stay English-only even
    # though send recomposes the live message from the current owed set.
    for recipient in plan['recipients']:
        ensure_english_only(recipient.get('message', ''))
    state = json.loads(state_path.read_text(encoding='utf-8')) if state_path.exists() else {'messages': {}, 'skipped': {}}
    state['campaign'] = plan['campaign']
    result = {'sent': 0, 'skipped': 0, 'awaitingConfirmation': [], 'uncertain': [], 'recipients': len(plan['recipients'])}
    for index, recipient in enumerate(plan['recipients']):
        if index % refresh_every == 0:
            refresh = None
            for attempt in range(3):
                refresh = subprocess.run([sys.executable, str(Path(__file__).with_name('fetch.py'))],
                                         capture_output=True, encoding='utf-8', errors='replace', timeout=300)
                if not refresh.returncode:
                    break
                # The scan is read-only, so a transient upstream failure is safe to retry.
                time.sleep(5 * (attempt + 1))
            if refresh.returncode:
                detail = (refresh.stderr or refresh.stdout or '').strip()[-800:]
                raise RuntimeError('Pre-send freshness fetch failed after 3 attempts; no reminder sent: ' + detail)
        owed_headers = recipient.get('owed') or [plan['assignment']]
        owed_now = live_owed_set(recipient, owed_headers)
        if not owed_now:
            state['skipped'][recipient['student']['key']] = 'Submitted or has a new message needing review'
            save(state_path, state)
            result['skipped'] += 1
            print(json.dumps({'skipped': recipient['student']['key']}, ensure_ascii=True), flush=True)
            continue
        keys = [text_delivery_key(plan, recipient, owed_now)]
        keys += [card_delivery_key(plan, recipient, header) for header in owed_now]
        if all(state['messages'].get(key, {}).get('status') == 'sent' for key in keys):
            continue
        text = compose_message(recipient['student'], [metas_by_header[header] for header in owed_now])
        ensure_english_only(text)
        preferred = (recipient['student'].get('english') or '').strip()
        if preferred:
            if not text.startswith(f'Hi {preferred},'):
                raise ValueError('Recipient message is not personalized with the preferred name')
        elif not text.startswith('Hi,'):
            raise ValueError('Recipient message must use the neutral greeting')
        text_ok = deliver(state, state_path, keys[0], recipient, ['--content', text], sender)
        if not text_ok:
            result['awaitingConfirmation'].append(recipient['student']['key'])
            continue
        cards_ok = True
        for key, header in zip(keys[1:], owed_now):
            attachment = by_header[header]
            drive_file = attachment['driveFile']
            card_ok = deliver(state, state_path, key, recipient,
                              ['--msg-type', 'file', '--dentry-id', str(drive_file['dentryId']),
                               '--space-id', str(drive_file['spaceId']),
                               '--file-name', drive_file.get('fileName') or attachment['fileName'],
                               '--file-type', attachment.get('extension') or 'png',
                               '--file-size', str(Path(attachment['path']).stat().st_size),
                               '--file-path', drive_file.get('path') or ('/' + attachment['fileName']),
                               '--title', meta_label(metas_by_header[header])], sender)
            if not card_ok:
                cards_ok = False
                break
        if not cards_ok:
            result['awaitingConfirmation'].append(recipient['student']['key'])
            continue
        result['sent'] += 1
        print(json.dumps({'completedRecipients': result['sent'],
                          'studentKey': recipient['student']['key']}, ensure_ascii=True), flush=True)
    for key, entry in state['messages'].items():
        if entry.get('status') == 'uncertain':
            result['uncertain'].append({'key': key, 'studentKey': entry.get('studentKey'),
                                        'lastError': entry.get('lastError')})
    state['lastRunAt'] = dt.datetime.now(TZ).isoformat()
    save(state_path, state)
    return result


def resolve_uncertain(state_path, key, note):
    """Clear an uncertain delivery ONLY with recorded evidence that nothing was
    sent (for example a verified chat inspection). Never marks anything sent."""
    if not note:
        raise ValueError('Resolving an uncertain delivery requires an evidence note')
    state = json.loads(state_path.read_text(encoding='utf-8'))
    entry = state['messages'].get(key)
    if not entry or entry.get('status') != 'uncertain':
        raise ValueError('No uncertain delivery for that key')
    entry['status'] = 'not-sent'
    entry['resolution'] = {'note': note, 'resolvedAt': dt.datetime.now(TZ).isoformat(),
                           'previousAttempt': {k: entry.get(k) for k in ('attemptedAt', 'lastError', 'openTaskId')}}
    entry.pop('attemptedAt', None)
    entry.pop('lastError', None)
    save(state_path, state)
    return entry


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--build', action='store_true')
    parser.add_argument('--authorize', action='store_true')
    parser.add_argument('--upload', action='store_true')
    parser.add_argument('--send', action='store_true')
    parser.add_argument('--resolve-uncertain')
    parser.add_argument('--note')
    parser.add_argument('--campaign', default='reminder-' + dt.datetime.now(TZ).strftime('%Y-%m-%d'))
    parser.add_argument('--assignment', action='append', dest='assignments',
                        help='Assignment catalog header; repeat for a combined campaign')
    parser.add_argument('--attachment', action='append', dest='attachments',
                        help='Question image path, one per --assignment in the same order')
    parser.add_argument('--exclude', action='append', default=[], metavar='STUDENT_KEY:HEADER',
                        help='Remove one assignment from one student\'s owed set (repeatable)')
    parser.add_argument('--allow-reset', action='store_true')
    parser.add_argument('--resolve-contacts', action='store_true',
                        help='Resolve unlinked students through the org directory (exact unique match only)')
    parser.add_argument('--plan', type=Path, default=PLAN)
    parser.add_argument('--state', type=Path, default=DELIVERIES)
    args = parser.parse_args()
    actions = [name for name in ('build', 'authorize', 'upload', 'send') if getattr(args, name)]
    if args.resolve_uncertain:
        actions.append('resolve')
    if len(actions) != 1:
        parser.error('Choose exactly one of --build, --authorize, --upload, --send, --resolve-uncertain')
    lock = ROOT / 'state' / ('reminders-' + hashlib.sha256(args.campaign.encode()).hexdigest()[:12] + '.lock')
    handle = os.open(lock, os.O_CREAT | os.O_EXCL | os.O_WRONLY)
    try:
        if args.build:
            if not args.assignments or not args.attachments:
                parser.error('--build requires --assignment and --attachment')
            plan = build(args.campaign, args.assignments, args.attachments, args.exclude,
                         allow_reset=args.allow_reset, resolve_contacts=args.resolve_contacts)
            print(json.dumps({'plan': str(PLAN), 'status': plan['status'],
                              'recipients': len(plan['recipients']),
                              'unreachable': len(plan['unreachable'])}, ensure_ascii=True))
        elif args.authorize:
            print(json.dumps({'status': authorize(args.plan)['status']}, ensure_ascii=True))
        elif args.upload:
            plan = upload(args.plan)
            print(json.dumps({'attachments': [{'assignment': a['assignment'], 'driveFile': a.get('driveFile')}
                                              for a in plan['attachments']]}, ensure_ascii=True))
        elif args.resolve_uncertain:
            entry = resolve_uncertain(args.state, args.resolve_uncertain, args.note)
            print(json.dumps({'resolved': args.resolve_uncertain, 'status': entry['status']}, ensure_ascii=True))
        else:
            print(json.dumps(send(args.plan, args.state), ensure_ascii=True))
    finally:
        os.close(handle)
        lock.unlink()


if __name__ == '__main__':
    main()
