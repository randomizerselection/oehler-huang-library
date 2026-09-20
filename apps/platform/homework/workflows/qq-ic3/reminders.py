"""Reviewed, explicitly authorized reminder campaign for missing homework.

Flow: --build (draft plan from the platform database) -> human review ->
--authorize -> --upload (registers the question image with the transport; on
QQ this is a local pass-through, and the image goes out as an image message)
-> --send. Every send is idempotent, confirmed through query-send-status, and
records delivery history; uncertain outcomes stop the campaign instead of
retrying.
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


def sha256_file(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def load_plan():
    if not PLAN.exists():
        raise RuntimeError('No reminder plan; run --build first')
    return json.loads(PLAN.read_text(encoding='utf-8'))


def assignment_label(meta):
    return meta.get('displayName') or meta.get('platformTitle')


def due_month_name(meta):
    if not meta.get('dueAt'):
        return None
    return dt.datetime.fromisoformat(meta['dueAt']).strftime('%d %B').lstrip('0')


def message_for(student, meta):
    name = (student.get('english') or '').strip()
    salutation = f'Hi {name},' if name else 'Hi,'
    due = due_month_name(meta)
    deadline = f' - it was due on {due}.' if due else '.'
    return (f"{salutation} I don't have your {assignment_label(meta)} yet{deadline}"
            f" Please send a photo of your answer with your working. The question is attached.")


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
    if any(other.get('qqId') == identity for other in students if other['key'] != student['key']):
        return None, 'Org directory identity is already linked to another student'
    return identity, None


def build(campaign, assignment, attachment, allow_reset=False, resolve_contacts=False, sender=cli):
    meta = assignment_metadata(assignment)
    attachment = Path(attachment).resolve()
    if not attachment.exists():
        raise FileNotFoundError(f'Attachment not found: {attachment}')
    if PLAN.exists():
        existing = json.loads(PLAN.read_text(encoding='utf-8'))
        if existing.get('status') != 'draft' and not allow_reset:
            raise RuntimeError('An authorized or completed campaign already exists; pass --allow-reset to replace it')
    recipients, unreachable = [], []
    students = [student for student in roster() if student['class'] in CONFIG['classes']]
    with connect(readonly=True) as db:
        require_schema(db)
    for student in students:
        row = homework_row(student, assignment)
        status = row['status'] if row else None
        if row and row['teacher_accepted']:
            continue
        if status not in MISSING_STATUSES:
            if status in ('submitted', 'late', 'awaiting_working'):
                continue
            raise ValueError(f"Unexpected platform homework status: {status}")
        if student['class'] not in CONFIG['classes']:
            raise ValueError('Unauthorized class in reminder recipient')
        identity, reason = student.get('qqId'), None
        evidence = 'platform-link'
        if not identity and resolve_contacts:
            identity, reason = directory_identity(student, students, sender)
            evidence = 'contact-search'
        if not identity:
            unreachable.append({'student': student_view(student),
                                'reason': reason or 'No verified QQ identity link'})
            continue
        recipients.append({'student': student_view(student), 'recipientId': identity,
                           'identityEvidence': evidence,
                           'message': message_for(student, meta)})
    plan = {
        'campaign': campaign, 'status': 'draft', 'assignment': assignment,
        'assignmentLabel': assignment_label(meta), 'dueDate': meta.get('dueAt'),
        'attachment': str(attachment), 'attachmentSha256': sha256_file(attachment),
        'attachmentFileName': attachment.name, 'attachmentSize': attachment.stat().st_size,
        'attachmentExtension': attachment.suffix.lstrip('.').lower(),
        'driveFile': None,
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
    attachment = Path(plan['attachment'])
    if sha256_file(attachment) != plan['attachmentSha256']:
        raise ValueError('Attachment changed since the plan was built')
    existing = plan.get('driveFile') or {}
    if existing.get('fileId') and existing.get('dentryId') and existing.get('spaceId'):
        return plan
    response = sender(['drive', 'upload', '--file', str(attachment),
                       '--file-name', plan['attachmentFileName']])
    file_id = field(response, 'fileId')
    space = field(response, 'spaceId')
    if not file_id:
        raise RuntimeError('Drive upload response lacks fileId; inspect before retrying')
    # On QQ the transport's drive commands are a local pass-through, so the
    # dentryId/path are simply the local absolute path of the image file.
    info = sender(['drive', 'info', '--file-id', str(file_id)])
    dentry = field(info, 'dentryId')
    space = field(info, 'spaceId') or space
    if not dentry or not space:
        raise RuntimeError('Drive info response lacks dentryId/spaceId; inspect before retrying')
    plan['driveFile'] = {'fileId': str(file_id), 'dentryId': str(dentry), 'spaceId': str(space),
                         'fileName': plan['attachmentFileName'], 'path': field(info, 'path'),
                         'uploadedAt': dt.datetime.now(TZ).isoformat()}
    save(plan_path, plan)
    return plan


def delivery_key(plan, recipient, prefix):
    digest = hashlib.sha256((CONFIG['selfQqId'] + '\n' + recipient['student']['key'] + '\n'
                             + plan['assignment'] + '\n' + plan['campaign']).encode()).hexdigest()
    return prefix + digest


def still_missing(recipient, assignment):
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
            return False
    row = homework_row(student, assignment)
    if row and row['teacher_accepted']:
        return False
    status = row['status'] if row else None
    if status in ('submitted', 'late', 'awaiting_working'):
        return False
    if status not in MISSING_STATUSES:
        raise ValueError(f'Unexpected platform homework status: {status}')
    return True


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
            raise RuntimeError('Uncertain delivery; inspect the QQ chat before any retry')
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
            raise RuntimeError('QQ send outcome is uncertain; inspect the chat before any retry') from error
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
    attachment = Path(plan['attachment'])
    if sha256_file(attachment) != plan['attachmentSha256']:
        raise ValueError('Attachment changed since the plan was built')
    drive_file = plan.get('driveFile') or {}
    if not drive_file.get('dentryId') or not drive_file.get('spaceId'):
        raise RuntimeError('Question image has not been registered with the transport; run --upload first')
    state = json.loads(state_path.read_text(encoding='utf-8')) if state_path.exists() else {'messages': {}, 'skipped': {}}
    state['campaign'] = plan['campaign']
    result = {'sent': 0, 'skipped': 0, 'awaitingConfirmation': [], 'uncertain': [], 'recipients': len(plan['recipients'])}
    for index, recipient in enumerate(plan['recipients']):
        keys = [delivery_key(plan, recipient, 'reminder-text-'),
                delivery_key(plan, recipient, 'reminder-question-')]
        if all(state['messages'].get(key, {}).get('status') == 'sent' for key in keys):
            continue
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
        if not still_missing(recipient, plan['assignment']):
            state['skipped'][recipient['student']['key']] = 'Submitted or has a new message needing review'
            save(state_path, state)
            result['skipped'] += 1
            print(json.dumps({'skipped': recipient['student']['key']}, ensure_ascii=True), flush=True)
            continue
        ensure_english_only(recipient['message'])
        text_ok = deliver(state, state_path, keys[0], recipient, ['--content', recipient['message']], sender)
        if not text_ok:
            result['awaitingConfirmation'].append(recipient['student']['key'])
            continue
        file_ok = deliver(state, state_path, keys[1], recipient,
                          ['--msg-type', 'file', '--dentry-id', str(drive_file['dentryId']),
                           '--space-id', str(drive_file['spaceId']),
                           '--file-name', drive_file.get('fileName') or plan['attachmentFileName'],
                           '--file-type', plan.get('attachmentExtension') or 'png',
                           '--file-size', str(attachment.stat().st_size),
                           '--file-path', drive_file.get('path') or ('/' + plan['attachmentFileName']),
                           '--title', plan['assignmentLabel']], sender)
        if not file_ok:
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
    parser.add_argument('--assignment')
    parser.add_argument('--attachment')
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
            if not args.assignment or not args.attachment:
                parser.error('--build requires --assignment and --attachment')
            plan = build(args.campaign, args.assignment, args.attachment, args.allow_reset,
                         args.resolve_contacts)
            print(json.dumps({'plan': str(PLAN), 'status': plan['status'],
                              'recipients': len(plan['recipients']),
                              'unreachable': len(plan['unreachable'])}, ensure_ascii=True))
        elif args.authorize:
            print(json.dumps({'status': authorize(args.plan)['status']}, ensure_ascii=True))
        elif args.upload:
            plan = upload(args.plan)
            print(json.dumps({'driveFile': plan['driveFile']}, ensure_ascii=True))
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