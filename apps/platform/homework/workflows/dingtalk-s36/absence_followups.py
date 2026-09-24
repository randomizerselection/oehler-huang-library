"""Prepare, send, and record DingTalk absence follow-ups.

Flow: `prepare --date YYYY-MM-DD` (draft plan from the platform database) -> review every
recipient, message, group and PDF hash -> `authorize --plan-sha256 SHA` ->
`send`. Each recipient receives one English text question. The lesson PDF is
posted once into the class lesson group when it is not already there, and the
question tells the student to download it from that group; nothing is attached
to a personal message. Every delivery uses a deterministic idempotency key and
is confirmed before the platform record is written.

`capture` records a student's explicit, substantive absence reason in the same
verified conversation; fetch.py runs it after every complete scan.

The bounded delivery helper polls accepted tasks and inspects explicitly retryable
busy failures. Remaining uncertain outcomes require chat inspection before
`--resolve-uncertain <key> --note <evidence>`. See ABSENCE_FOLLOWUPS.md.

Never send a draft plan, never substitute a PDF from another lesson, never point
a student at an unverified group, and never message an unlinked or ambiguous
identity.
"""
import argparse
import datetime as dt
import hashlib
import json
import os
import re
import time
from pathlib import Path

from fetch import CONFIG, ROOT, TZ, cli, ensure_english_only, roster, save
from student_messages import dingtalk_text
from platform_db import PLATFORM_CLASSES, backup, connect, require_in_scope_student, require_schema
from receipts import field
from reminders import deliver, directory_identity
from absence_delivery import DeliveryAttention, deliver_bounded
from reminders import resolve_uncertain as resolve_uncertain_delivery
try:
    from absence_periods import classify_absence_reason, extract_absence_period, is_substantive_absence_reason
except ModuleNotFoundError:
    import sys
    sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
    from absence_periods import classify_absence_reason, extract_absence_period, is_substantive_absence_reason

PLAN = ROOT / 'state' / 'absence-followup-plan.json'
DELIVERIES = ROOT / 'state' / 'absence-followup-deliveries.json'
RECEIPTS = ROOT / 'state' / 'absence-receipt-deliveries.json'
MANIFEST = Path(CONFIG['platformProject']) / 'apps' / 'library' / 'generated' / 'content-manifest.json'
PDF_ROOT = Path(CONFIG['platformProject']) / 'authoring' / 'a-level' / 'outputs' / 'pdf'
SELF_ID = CONFIG['selfOpenDingTalkId']
# Students download the lesson PDF from this class group instead of a personal attachment.
LESSON_GROUP_TITLE = CONFIG.get('lessonGroup') or 'Economics 5'
GROUP_SEARCH_PAGES = 5
GROUP_PDF_WINDOW_DAYS = 30
ABSENCE_PROMPT_RE = re.compile(r'\bmarked absent\b.*\babsence reason\b', re.I | re.S)
EXPLICIT_REASON_RE = re.compile(r'^\s*[\u201c\u201d"\']?\s*absence\s+reason\s*[\u201c\u201d"\']?\s*[:\uff1a]', re.I)


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def content_titles():
    data = json.loads(MANIFEST.read_text(encoding='utf-8'))
    return {item['id']: item['title'].split(' · ', 1)[0] for item in data.get('items', [])}


def canonical_content_id(content_id):
    """Normalize legacy Windows-path lesson IDs stored by the selector."""
    value = (content_id or '').strip()
    marker = 'apps:library:'
    if value.startswith('C::') and marker in value:
        return value.split(marker, 1)[1]
    return value


def pdf_for(content_id):
    canonical = canonical_content_id(content_id)
    prefix = 'a-level:lessons:'
    if not canonical.startswith(prefix):
        return None
    return PDF_ROOT / f"{canonical[len(prefix):]}.pdf"


def student_greeting(preferred_name):
    name = (preferred_name or '').strip()
    return f'Hi {name},' if re.fullmatch(r"[A-Za-z][A-Za-z .'-]{0,49}", name) else 'Hi,'


def lesson_date(marked_at):
    value = dt.datetime.fromisoformat(marked_at.replace('Z', '+00:00')).astimezone(TZ)
    return value.strftime('%-d %B %Y') if os.name != 'nt' else value.strftime('%d %B %Y').lstrip('0')


def message_for(row, title, group_title=LESSON_GROUP_TITLE):
    coverage = ('The lesson covered actual and potential growth, negative and positive output gaps, '
                'and how to interpret them using diagrams. '
                if canonical_content_id(row['lesson_content_id']) == 'a-level:lessons:9-2-1-growth-output-gaps'
                else '')
    message = (
        f"{student_greeting(row['preferred_name'])} you were marked absent from Samuel's A Level Economics lesson "
        f"\u201c{title}\u201d on {lesson_date(row['marked_at'])}. {coverage}Please reply to this message with "
        f"\u201cAbsence reason:\u201d followed by the reason you were absent. Please download the lesson PDF "
        f"from the {group_title} group. Please study the lesson independently and let Samuel know "
        f"if anything is unclear."
    )
    ensure_english_only(message)
    return dingtalk_text(message)


def student_view(item, student):
    return {'key': student['key'], 'accountId': item['student_account_id'],
            'classId': item['class_id'], 'class': item['class_name'],
            'studentNo': item['student_id'] or '', 'name': item['legal_name'] or item['display_name'],
            'english': item['preferred_name'] or ''}


def resolve_identity(item, student, students, searcher):
    """Platform link first, otherwise an exact unique org-directory match.
    Never guess from a nickname or an ambiguous name."""
    if item['dingtalk_id']:
        return item['dingtalk_id'], 'platform-link', None
    identity, reason = directory_identity(student, students, searcher)
    return identity, ('contact-search' if identity else None), reason


def resolve_lesson_group(sender=cli, title=None):
    """Resolve the class lesson group by exact title. Never guess an ambiguous group."""
    wanted = (title or LESSON_GROUP_TITLE).strip()
    cursor, found = '0', []
    for _ in range(GROUP_SEARCH_PAGES):
        response = sender(['chat', 'search', '--query', wanted, '--limit', '20', '--cursor', cursor])
        result = response.get('result', {})
        groups = result.get('groups')
        if response.get('success') is not True or not isinstance(groups, list):
            raise RuntimeError('DingTalk group search failed; cannot verify the lesson group')
        found.extend(groups)
        if result.get('hasMore') is not True:
            break
        following = str(result.get('nextCursor') or '')
        if not following or following == cursor:
            raise RuntimeError('DingTalk group search pagination is incomplete')
        cursor = following
    else:
        raise RuntimeError(f'DingTalk group search exceeded {GROUP_SEARCH_PAGES} pages')
    matches = [group for group in found if (group.get('title') or '').strip() == wanted]
    if len(matches) != 1:
        raise RuntimeError(f'Lesson group "{wanted}" is missing or not unique ({len(matches)} exact matches)')
    group = matches[0]
    if not group.get('openConversationId'):
        raise RuntimeError('Lesson group has no openConversationId')
    return {'title': wanted, 'conversationId': group['openConversationId'],
            'memberCount': group.get('memberCount'), 'checkedAt': dt.datetime.now(TZ).isoformat()}


def lesson_pdf_in_group(group, name, sender=cli):
    """True only when the lesson group already carries a card for this exact PDF name."""
    end = dt.datetime.now(TZ)
    start = end - dt.timedelta(days=GROUP_PDF_WINDOW_DAYS)
    cursor = '0'
    for _ in range(3):
        response = sender(['chat', 'message', 'search', '--query', name, '--group', group['conversationId'],
                           '--start', start.isoformat(), '--end', end.isoformat(),
                           '--limit', '100', '--cursor', cursor])
        result = response.get('result', {})
        conversations = result.get('conversationMessagesList')
        if response.get('success') is not True or not isinstance(conversations, list):
            raise RuntimeError('DingTalk group message search failed; cannot verify the lesson PDF')
        for conversation in conversations:
            if conversation.get('openConversationId') != group['conversationId']:
                continue
            for message in conversation.get('messages', []):
                if any(resource.get('resourceType') == 'file' for resource in message.get('resources', [])) \
                        and name in (message.get('content') or ''):
                    return True
        if result.get('hasMore') is not True:
            return False
        following = str(result.get('nextCursor') or '')
        if not following or following == cursor:
            raise RuntimeError('DingTalk group message search pagination is incomplete')
        cursor = following
    raise RuntimeError('DingTalk group message search exceeded three pages')


def post_pdf_to_group(plan, attachment, group, state, sender=cli):
    """Post the lesson PDF card into the class group once per lesson."""
    key = 'absence-group-' + hashlib.sha256(
        '\n'.join([CONFIG['profile'], group['conversationId'], attachment['sha256']]).encode()).hexdigest()
    entry = state['messages'].get(key, {})
    if entry.get('status') == 'sent':
        return {'status': 'already-posted', 'key': key, 'messageId': entry.get('openMessageId')}
    upload_attachment(plan, attachment, sender)
    recipient = {'recipientId': group['conversationId'], 'student': {'key': 'group:' + group['title']}}
    deliver(state, DELIVERIES, key, recipient, file_card_args(attachment), sender,
            target=['--group', group['conversationId']])
    return {'status': 'posted', 'key': key, 'messageId': state['messages'][key].get('openMessageId')}


def validate_authorized_plan(plan):
    """Fail closed before the first outbound action in an authorized campaign."""
    with connect(readonly=True) as db:
        require_schema(db)
        for recipient in plan.get('recipients', []):
            row = db.execute('''
                SELECT l.student_account_id,l.class_id,l.status,l.lesson_content_id,l.marked_at,
                       si.external_id AS dingtalk_id
                FROM selector_attendance_log l
                LEFT JOIN student_integrations si
                  ON si.account_id=l.student_account_id AND si.provider='dingtalk'
                WHERE l.id=?
            ''', (recipient.get('attendanceLogId'),)).fetchone()
            if not row:
                raise RuntimeError('Absence plan references a missing attendance record')
            require_in_scope_student(row['student_account_id'], row['class_id'], connection=db)
            if (row['status'] != 'absent' or row['lesson_content_id'] != recipient.get('lessonContentId')
                    or row['marked_at'] != recipient.get('markedAt')):
                raise RuntimeError('Attendance record changed after absence plan preparation')
            if not recipient.get('recipientId'):
                raise RuntimeError('Absence recipient has no verified DingTalk identity')
            platform_link = row['dingtalk_id']
            if platform_link and platform_link != recipient['recipientId']:
                raise RuntimeError('Absence recipient no longer matches the verified platform identity')
            if not platform_link and recipient.get('identityEvidence') != 'contact-search':
                raise RuntimeError('Absence recipient identity is not verified by the platform or the directory')
            ensure_english_only(recipient.get('message', ''))


def partition_absences():
    placeholders = ','.join('?' for _ in PLATFORM_CLASSES)
    with connect(readonly=True) as db:
        require_schema(db)
        rows = [dict(row) for row in db.execute(f'''
            SELECT l.id AS attendance_log_id,l.session_id,l.class_id,c.name AS class_name,
                   l.student_account_id,l.lesson_content_id,l.marked_at,
                   a.student_id,a.legal_name,a.preferred_name,a.display_name,
                   si.external_id AS dingtalk_id
            FROM selector_attendance_log l
            JOIN classes c ON c.id=l.class_id
            JOIN accounts a ON a.id=l.student_account_id
            LEFT JOIN student_integrations si ON si.account_id=a.id AND si.provider='dingtalk'
            LEFT JOIN absence_followups f ON f.attendance_log_id=l.id
            WHERE l.status='absent' AND f.attendance_log_id IS NULL
              AND c.name IN ({placeholders})
            ORDER BY l.marked_at,l.id
        ''', PLATFORM_CLASSES).fetchall()]
        periods = [dict(row) for row in db.execute('''
            SELECT l.student_account_id,f.attendance_log_id AS source_attendance_log_id,
                   f.absence_start_date,f.absence_end_date
            FROM absence_followups f
            JOIN selector_attendance_log l ON l.id=f.attendance_log_id
            WHERE f.absence_start_date IS NOT NULL AND f.absence_end_date IS NOT NULL
        ''').fetchall()]
    by_student = {}
    for period in periods:
        by_student.setdefault(period['student_account_id'], []).append(period)
    eligible, covered = [], []
    for row in rows:
        marked_date = parse_dingtalk_time(row['marked_at']).astimezone(TZ).date().isoformat()
        match = next((period for period in by_student.get(row['student_account_id'], [])
                      if period['absence_start_date'] <= marked_date <= period['absence_end_date']), None)
        if match:
            covered.append({**row, 'reason': 'Covered by recorded absence period',
                            'absenceStartDate': match['absence_start_date'],
                            'absenceEndDate': match['absence_end_date'],
                            'sourceAttendanceLogId': match['source_attendance_log_id']})
        else:
            eligible.append(row)
    return eligible, covered


def eligible_absences():
    return partition_absences()[0]


def prepare(resolve_contacts=True, sender=cli, date=None):
    if PLAN.exists() and json.loads(PLAN.read_text(encoding='utf-8')).get('status') == 'authorized':
        raise RuntimeError('An authorized campaign exists; use status/send, do not replace a partial campaign')
    titles = content_titles()
    students = roster()
    rows, covered = partition_absences()
    if date:
        rows = [item for item in rows
                if dt.datetime.fromisoformat(item['marked_at'].replace('Z', '+00:00')).astimezone(TZ)
                .date().isoformat() == date]
    attachments, eligible, skipped = {}, [], list(covered)
    for item in rows:
        matches = [student for student in students if student['accountId'] == item['student_account_id']]
        if len(matches) != 1:
            skipped.append({**item, 'reason': 'Student is not on the active class roster'})
            continue
        canonical_id = canonical_content_id(item['lesson_content_id'])
        title = titles.get(canonical_id)
        pdf = pdf_for(item['lesson_content_id'])
        if not title or pdf is None:
            skipped.append({**item, 'reason': 'Unsupported or unknown lesson content ID'})
            continue
        if not pdf.exists():
            skipped.append({**item, 'reason': f'Lesson PDF has not been exported: {pdf}'})
            continue
        if item['lesson_content_id'] not in attachments:
            attachments[item['lesson_content_id']] = {
                'path': str(pdf), 'name': pdf.name, 'sha256': digest(pdf), 'title': title, 'driveFile': None}
        eligible.append((item, matches[0], title))
    # The students are told to download from the group, so resolve it before promising it.
    group = resolve_lesson_group(sender) if eligible else None
    if group:
        for attachment in attachments.values():
            attachment['inGroup'] = lesson_pdf_in_group(group, attachment['name'], sender)
        group['pdfInGroup'] = all(meta.get('inGroup') for meta in attachments.values())
    recipients, unreachable = [], []
    for item, student, title in eligible:
        followup = {
            'attendanceLogId': item['attendance_log_id'], 'sessionId': item['session_id'],
            'lessonContentId': item['lesson_content_id'], 'markedAt': item['marked_at'],
            'student': student_view(item, student),
            'recipientId': item['dingtalk_id'] or '', 'identityEvidence': 'platform-link',
            'message': message_for(item, title, group['title']), 'attachment': item['lesson_content_id'],
        }
        if not followup['recipientId']:
            if not resolve_contacts:
                unreachable.append({**followup, 'reason': 'No verified DingTalk identity link'})
                continue
            identity, evidence, reason = resolve_identity(item, student, students, sender)
            followup.update(recipientId=identity or '', identityEvidence=evidence or '')
            if not identity:
                unreachable.append({**followup, 'reason': reason})
                continue
        recipients.append(followup)
    plan = {
        'campaign': f"absence-followup-{dt.datetime.now(TZ).date().isoformat()}",
        'status': 'draft', 'preparedAt': dt.datetime.now(TZ).isoformat(),
        'group': group, 'attachments': attachments, 'recipients': recipients,
        'unreachable': unreachable, 'skipped': skipped,
    }
    save(PLAN, plan)
    return {'plan': str(PLAN), 'planSha256': digest(PLAN), 'recipients': len(recipients), 'unreachable': len(unreachable),
            'group': group, 'attachments': attachments,
            'skipped': len(skipped),
            'messages': [{'student': x['student'], 'recipientId': x['recipientId'],
                          'identityEvidence': x['identityEvidence'], 'message': x['message'],
                          'pdf': attachments[x['attachment']]['path']} for x in recipients],
            'unreachableDetail': [{'student': x['student'], 'reason': x.get('reason')}
                                  for x in unreachable],
            'skippedDetail': [{key: value for key, value in {
                'attendanceLogId': x['attendance_log_id'], 'reason': x['reason'],
                'absenceStartDate': x.get('absenceStartDate'),
                'absenceEndDate': x.get('absenceEndDate'),
                'sourceAttendanceLogId': x.get('sourceAttendanceLogId'),
            }.items() if value is not None} for x in skipped]}


def upload_attachment(plan, attachment, sender=cli):
    """Upload the lesson PDF once, then reuse the Drive file for every recipient."""
    existing = attachment.get('driveFile') or {}
    if existing.get('fileId') and existing.get('dentryId') and existing.get('spaceId'):
        return existing
    file_id, space = existing.get('fileId'), existing.get('spaceId')
    if not file_id:
        response = sender(['drive', 'upload', '--file', attachment['path'],
                           '--file-name', attachment['name']])
        file_id, space = field(response, 'fileId'), field(response, 'spaceId')
        if file_id:
            attachment['driveFile'] = {'fileId': str(file_id), 'spaceId': space}
            save(PLAN, plan)  # A failed info lookup must not upload the PDF again.
    if not file_id:
        raise RuntimeError('Drive upload response lacks fileId; inspect before retrying')
    info = sender(['drive', 'info', '--file-id', str(file_id)])
    dentry = field(info, 'dentryId')
    space = field(info, 'spaceId') or space
    if not dentry or not space:
        raise RuntimeError('Drive info response lacks dentryId/spaceId; inspect before retrying')
    attachment['driveFile'] = {'fileId': str(file_id), 'dentryId': str(dentry),
                               'spaceId': str(space), 'path': field(info, 'path'),
                               'fileName': attachment['name'],
                               'uploadedAt': dt.datetime.now(TZ).isoformat()}
    save(PLAN, plan)
    return attachment['driveFile']


def file_card_args(attachment):
    drive_file = attachment['driveFile']
    return ['--msg-type', 'file', '--dentry-id', str(drive_file['dentryId']),
            '--space-id', str(drive_file['spaceId']), '--file-name', attachment['name'],
            '--file-type', Path(attachment['name']).suffix.lstrip('.').lower() or 'pdf',
            '--file-size', str(Path(attachment['path']).stat().st_size),
            '--file-path', drive_file.get('path') or ('/' + attachment['name']),
            '--title', attachment['title']]


def upsert_delivery(db, recipient, attachment, delivery, status='sent'):
    now = delivery.get('confirmedAt') or dt.datetime.now(TZ).isoformat()
    sent_at = now if status == 'sent' else None
    db.execute('''INSERT INTO absence_followups
        (attendance_log_id,status,recipient_external_id,outbound_message_id,conversation_id,message_text,
         lesson_pdf_name,lesson_pdf_sha256,sent_at,updated_at)
        VALUES (?,?,?,?,?,?,?,?,?,?)
        ON CONFLICT(attendance_log_id) DO UPDATE SET
          status=excluded.status,recipient_external_id=excluded.recipient_external_id,
          outbound_message_id=excluded.outbound_message_id,conversation_id=excluded.conversation_id,
          message_text=excluded.message_text,lesson_pdf_name=excluded.lesson_pdf_name,
          lesson_pdf_sha256=excluded.lesson_pdf_sha256,sent_at=excluded.sent_at,updated_at=excluded.updated_at
        WHERE absence_followups.status != 'responded' ''',
        (recipient['attendanceLogId'], status, recipient.get('recipientId') or None,
         delivery.get('openMessageId'), delivery.get('openConversationId'), recipient.get('message'),
         attachment.get('name'), attachment.get('sha256'), sent_at, now))


def send_campaign(sender=cli):
    started = time.monotonic()
    plan = json.loads(PLAN.read_text(encoding='utf-8'))
    if plan.get('status') == 'completed':
        return {**campaign_status(), 'elapsedSeconds': round(time.monotonic() - started, 2)}
    if plan.get('status') != 'authorized':
        raise RuntimeError('Absence follow-up plan is not authorized')
    for meta in plan['attachments'].values():
        path = Path(meta['path'])
        if not path.exists() or digest(path) != meta['sha256']:
            raise ValueError(f'Attachment changed or is missing: {path}')
    recorded_group = plan.get('group') or {}
    if plan['recipients'] and not (recorded_group.get('title') and recorded_group.get('conversationId')):
        raise RuntimeError('Absence plan has no verified lesson group to point students at')
    validate_authorized_plan(plan)
    state = json.loads(DELIVERIES.read_text(encoding='utf-8')) if DELIVERIES.exists() else {'messages': {}, 'skipped': {}}
    backup_path = backup('absence-followup')
    completed = 0
    group_result = {'group': recorded_group.get('title'), 'alreadyPresent': [], 'posted': []}
    if plan['recipients']:
        # The group and its contents are re-verified immediately before anything is sent.
        group = resolve_lesson_group(sender, recorded_group.get('title'))
        for attachment in plan['attachments'].values():
            if lesson_pdf_in_group(group, attachment['name'], sender):
                group_result['alreadyPresent'].append(attachment['name'])
                continue
            group_result['posted'].append({'name': attachment['name'],
                                           **post_pdf_to_group(plan, attachment, group, state, sender)})
            save(DELIVERIES, state)
        group['pdfInGroup'] = True
        plan['group'] = group
        save(PLAN, plan)
    with connect() as db:
        require_schema(db)
        for recipient in plan['recipients']:
            material = CONFIG['profile'] + '\n' + recipient['attendanceLogId'] + '\n' + plan['campaign']
            text_key = 'absence-text-' + hashlib.sha256(material.encode()).hexdigest()
            attachment = plan['attachments'][recipient['attachment']]
            validate_authorized_plan({'recipients': [recipient]})
            if not deliver_bounded(state, DELIVERIES, text_key, recipient,
                                   ['--content', recipient['message']], sender):
                raise RuntimeError('Text delivery is awaiting confirmation; rerun send to resume safely')
            upsert_delivery(db, recipient, attachment, state['messages'][text_key])
            db.commit()
            completed += 1
            print(json.dumps({'completedRecipients': completed, 'studentNo': recipient['student']['studentNo']},
                             ensure_ascii=False), flush=True)
        now = dt.datetime.now(TZ).isoformat()
        for recipient in plan.get('unreachable', []):
            attachment = plan['attachments'][recipient['attachment']]
            upsert_delivery(db, recipient, attachment, {'confirmedAt': now}, status='unreachable')
        db.commit()
    state.update(status='completed', campaign=plan['campaign'], completedAt=dt.datetime.now(TZ).isoformat(),
                 backupPath=str(backup_path))
    save(DELIVERIES, state)
    plan.update(status='completed', completedAt=state['completedAt'])
    save(PLAN, plan)
    return {'completedRecipients': completed, 'unreachable': len(plan.get('unreachable', [])),
            'group': group_result, 'backup': str(backup_path),
            'elapsedSeconds': round(time.monotonic() - started, 2)}


def campaign_status():
    plan = json.loads(PLAN.read_text(encoding='utf-8')) if PLAN.exists() else {}
    state = json.loads(DELIVERIES.read_text(encoding='utf-8')) if DELIVERIES.exists() else {}
    entries = []
    for recipient in plan.get('recipients', []):
        material = CONFIG['profile'] + '\n' + recipient['attendanceLogId'] + '\n' + plan['campaign']
        base = hashlib.sha256(material.encode()).hexdigest()
        entries.append({'studentNo': recipient['student']['studentNo'],
                        'text': state.get('messages', {}).get('absence-text-' + base, {})
                        .get('status', 'not-started')})
    group = plan.get('group') or {}
    group_posts = [value.get('status') for key, value in state.get('messages', {}).items()
                   if key.startswith('absence-group-')]
    return {'status': plan.get('status', 'no-plan'), 'plan': str(PLAN),
            'planSha256': digest(PLAN) if PLAN.exists() else None,
            'deliveries': str(DELIVERIES), 'recipients': entries,
            'completedRecipients': sum(x['text'] == 'sent' for x in entries),
            'group': {'title': group.get('title'), 'conversationId': group.get('conversationId'),
                      'pdfInGroup': group.get('pdfInGroup'),
                      'post': group_posts[-1] if group_posts else 'not-needed-yet'},
            'unreachable': len(plan.get('unreachable', []))}


def authorize_plan(expected_sha):
    if digest(PLAN) != expected_sha:
        raise ValueError('Plan changed since review; inspect it again')
    plan = json.loads(PLAN.read_text(encoding='utf-8'))
    if plan.get('status') != 'draft':
        raise ValueError('Only a draft can be authorized')
    plan.update(status='authorized', authorizedAt=dt.datetime.now(TZ).isoformat())
    save(PLAN, plan)
    return campaign_status()


def parse_dingtalk_time(value):
    if not value:
        return None
    try:
        parsed = dt.datetime.fromisoformat(value.replace('Z', '+00:00'))
    except ValueError:
        parsed = dt.datetime.strptime(value, '%Y-%m-%d %H:%M:%S')
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=TZ)
    return parsed.astimezone(dt.timezone.utc)


def normalize_reason(text):
    value = re.sub(r'^\s*[\u201c\u201d"\']?\s*absence\s+reason\s*[\u201c\u201d"\']?\s*[:\uff1a]\s*',
                   '', text or '', flags=re.I).strip()
    return value[:2000]


def message_text(message):
    return message.get('content') or message.get('text') or ''


def explicit_reason(text):
    return bool(EXPLICIT_REASON_RE.search(text or ''))


def acknowledged_response_ids(path=RECEIPTS):
    if not path.exists():
        return set()
    state = json.loads(path.read_text(encoding='utf-8'))
    return {item.get('sourceMessageId') for item in state.get('messages', {}).values()
            if item.get('status') == 'sent' and item.get('sourceMessageId')}


def backfill_recorded_periods():
    placeholders = ','.join('?' for _ in PLATFORM_CLASSES)
    with connect(readonly=True) as db:
        require_schema(db)
        rows = [dict(row) for row in db.execute(f'''
            SELECT f.attendance_log_id,f.response_message_id,f.reason_text,f.responded_at,
                   l.marked_at,l.student_account_id,l.class_id
            FROM absence_followups f
            JOIN selector_attendance_log l ON l.id=f.attendance_log_id
            JOIN classes c ON c.id=l.class_id
            WHERE f.status='responded' AND f.reason_text IS NOT NULL
              AND f.responded_at IS NOT NULL AND f.absence_start_date IS NULL
              AND f.absence_end_date IS NULL AND c.name IN ({placeholders})
        ''', PLATFORM_CLASSES).fetchall()]
    updates = []
    for row in rows:
        period = extract_absence_period(row['reason_text'], row['marked_at'], row['responded_at'], TZ)
        if period:
            updates.append({**row, 'absenceStartDate': period[0], 'absenceEndDate': period[1]})
    if updates:
        backup('absence-periods')
        with connect() as db:
            db.execute('BEGIN IMMEDIATE')
            for item in updates:
                require_in_scope_student(item['student_account_id'], item['class_id'], connection=db)
                cursor = db.execute('''UPDATE absence_followups
                    SET absence_start_date=?,absence_end_date=?,updated_at=?
                    WHERE attendance_log_id=? AND response_message_id=? AND reason_text=?
                      AND absence_start_date IS NULL AND absence_end_date IS NULL''',
                    (item['absenceStartDate'], item['absenceEndDate'], dt.datetime.now(TZ).isoformat(),
                     item['attendance_log_id'], item['response_message_id'], item['reason_text']))
                if cursor.rowcount != 1:
                    raise RuntimeError('Absence reason changed during period backfill; collect again')
            db.commit()
    return {'periodBackfilled': len(updates), 'items': [{
        'attendanceLogId': item['attendance_log_id'],
        'absenceStartDate': item['absenceStartDate'], 'absenceEndDate': item['absenceEndDate']
    } for item in updates]}


def backfill_recorded_categories():
    placeholders = ','.join('?' for _ in PLATFORM_CLASSES)
    with connect(readonly=True) as db:
        require_schema(db)
        rows = [dict(row) for row in db.execute(f'''
            SELECT f.attendance_log_id,f.response_message_id,f.reason_text,
                   l.student_account_id,l.class_id
            FROM absence_followups f
            JOIN selector_attendance_log l ON l.id=f.attendance_log_id
            JOIN classes c ON c.id=l.class_id
            WHERE f.status='responded' AND f.reason_text IS NOT NULL
              AND f.reason_category IS NULL AND c.name IN ({placeholders})
        ''', PLATFORM_CLASSES).fetchall()]
    updates = [{**row, 'category': classify_absence_reason(row['reason_text'])} for row in rows]
    if updates:
        backup('absence-categories')
        with connect() as db:
            db.execute('BEGIN IMMEDIATE')
            for item in updates:
                require_in_scope_student(item['student_account_id'], item['class_id'], connection=db)
                cursor = db.execute('''UPDATE absence_followups
                    SET reason_category=?,updated_at=?
                    WHERE attendance_log_id=? AND response_message_id=? AND reason_text=?
                      AND reason_category IS NULL''',
                    (item['category'], dt.datetime.now(TZ).isoformat(),
                     item['attendance_log_id'], item['response_message_id'], item['reason_text']))
                if cursor.rowcount != 1:
                    raise RuntimeError('Absence reason changed during category backfill; collect again')
            db.commit()
    return {'categoryBackfilled': len(updates), 'items': [{
        'attendanceLogId': item['attendance_log_id'], 'category': item['category']
    } for item in updates]}


def capture(snapshot, receipt_path=RECEIPTS):
    data = json.loads(Path(snapshot).read_text(encoding='utf-8'))
    if data.get('complete') is not True or data.get('result', {}).get('hasMore') is not False:
        raise ValueError('Absence replies require a complete DingTalk message scan')
    period_backfill = backfill_recorded_periods()
    category_backfill = backfill_recorded_categories()
    placeholders = ','.join('?' for _ in PLATFORM_CLASSES)
    with connect(readonly=True) as db:
        require_schema(db)
        followups = [dict(row) for row in db.execute(f'''
            SELECT f.attendance_log_id,f.status,f.recipient_external_id,
                   f.conversation_id,f.sent_at,f.response_message_id,
                   f.reason_text,f.responded_at,l.student_account_id,l.class_id,l.marked_at
            FROM absence_followups f
            JOIN selector_attendance_log l ON l.id=f.attendance_log_id
            JOIN classes c ON c.id=l.class_id
            JOIN class_memberships m ON m.class_id=l.class_id AND m.account_id=l.student_account_id
            JOIN accounts a ON a.id=l.student_account_id
            WHERE f.status IN ('sent','responded') AND f.conversation_id IS NOT NULL AND f.sent_at IS NOT NULL
              AND c.name IN ({placeholders}) AND m.status='active'
              AND a.role='student' AND a.status='active'
        ''', PLATFORM_CLASSES)]
        unmatched = [dict(row) for row in db.execute(f'''
            SELECT l.id AS attendance_log_id,si.external_id AS recipient_external_id,
                   l.student_account_id,l.class_id,l.marked_at
            FROM selector_attendance_log l
            JOIN classes c ON c.id=l.class_id
            JOIN class_memberships m ON m.class_id=l.class_id AND m.account_id=l.student_account_id
            JOIN accounts a ON a.id=l.student_account_id
            JOIN student_integrations si ON si.account_id=l.student_account_id AND si.provider='dingtalk'
            LEFT JOIN absence_followups f ON f.attendance_log_id=l.id
            WHERE l.status='absent' AND f.attendance_log_id IS NULL
              AND c.name IN ({placeholders}) AND m.status='active'
              AND a.role='student' AND a.status='active'
        ''', PLATFORM_CLASSES)]
        used = {row['response_message_id'] for row in db.execute('SELECT response_message_id FROM absence_followups WHERE response_message_id IS NOT NULL')}
    acknowledged = acknowledged_response_ids(receipt_path)
    conversations = {conversation.get('openConversationId'): conversation
                     for conversation in data['result']['conversationMessagesList']}
    backfilled = []
    remaining_unmatched = list(unmatched)
    for cid, conversation in conversations.items():
        messages = sorted(conversation.get('messages', []),
                          key=lambda item: parse_dingtalk_time(item.get('createTime'))
                          or dt.datetime.min.replace(tzinfo=dt.timezone.utc))
        incoming_ids = {message.get('senderOpenDingTalkId') for message in messages
                        if message.get('senderOpenDingTalkId') and message.get('senderOpenDingTalkId') != SELF_ID}
        if len(incoming_ids) != 1:
            continue
        recipient_id = next(iter(incoming_ids))
        for prompt in messages:
            prompt_time = parse_dingtalk_time(prompt.get('createTime'))
            prompt_id = prompt.get('openMessageId') or prompt.get('messageId')
            prompt_text = message_text(prompt)
            if (prompt.get('senderOpenDingTalkId') != SELF_ID or not prompt_id or not prompt_time
                    or not ABSENCE_PROMPT_RE.search(prompt_text)):
                continue
            later_reply = any(
                message.get('senderOpenDingTalkId') == recipient_id
                and (parse_dingtalk_time(message.get('createTime')) or prompt_time) > prompt_time
                and explicit_reason(message_text(message))
                and is_substantive_absence_reason(normalize_reason(message_text(message)))
                for message in messages)
            if not later_reply:
                continue
            candidates = [row for row in remaining_unmatched
                          if row['recipient_external_id'] == recipient_id
                          and parse_dingtalk_time(row['marked_at']) <= prompt_time
                          and prompt_time - parse_dingtalk_time(row['marked_at']) <= dt.timedelta(days=3)]
            if not candidates:
                continue
            target = max(candidates, key=lambda row: parse_dingtalk_time(row['marked_at']))
            remaining_unmatched.remove(target)
            row = {**target, 'status': 'sent', 'outbound_message_id': prompt_id,
                   'conversation_id': cid, 'message_text': prompt_text,
                   'sent_at': prompt_time.isoformat(), 'response_message_id': None,
                   'reason_text': None, 'responded_at': None}
            followups.append(row)
            backfilled.append(row)

    by_conversation = {}
    for row in followups:
        if row.get('response_message_id') in acknowledged:
            continue
        by_conversation.setdefault(row['conversation_id'], []).append(row)
    captured = []
    for conversation in data['result']['conversationMessagesList']:
        cid = conversation.get('openConversationId')
        waiting = by_conversation.get(cid, [])
        if not waiting:
            continue
        waiting.sort(key=lambda item: parse_dingtalk_time(item['sent_at']))
        messages = sorted(conversation.get('messages', []),
                          key=lambda item: parse_dingtalk_time(item.get('createTime')) or dt.datetime.min.replace(tzinfo=dt.timezone.utc))
        for index, target in enumerate(waiting):
            sent_at = parse_dingtalk_time(target['sent_at'])
            next_sent = (parse_dingtalk_time(waiting[index + 1]['sent_at'])
                         if index + 1 < len(waiting) else None)
            candidates = []
            for message in messages:
                mid = message.get('openMessageId') or message.get('messageId')
                created = parse_dingtalk_time(message.get('createTime'))
                raw_text = message_text(message)
                text = normalize_reason(raw_text)
                if (not mid or message.get('senderOpenDingTalkId') != target['recipient_external_id']
                        or not created or created <= sent_at or (next_sent and created >= next_sent)
                        or not explicit_reason(raw_text)
                        or not is_substantive_absence_reason(text)
                        or text.startswith('[')
                        or (mid in used and mid != target.get('response_message_id'))):
                    continue
                candidates.append((message, created, raw_text, text))
            current_id = target.get('response_message_id')
            current_explicit = any((message.get('openMessageId') or message.get('messageId')) == current_id
                                   and explicit_reason(raw_text)
                                   for message, _created, raw_text, _text in candidates)
            if target['status'] == 'responded' and current_explicit:
                continue
            explicit = [item for item in candidates
                        if not target.get('responded_at') or item[1] > parse_dingtalk_time(target['responded_at'])]
            chosen = explicit[0] if explicit else None
            if not chosen:
                continue
            message, created, _raw_text, text = chosen
            mid = message.get('openMessageId') or message.get('messageId')
            if mid == current_id:
                continue
            captured.append({'attendanceLogId': target['attendance_log_id'], 'messageId': mid,
                             'reason': text, 'respondedAt': created.isoformat(),
                             'category': classify_absence_reason(text),
                             'previousMessageId': current_id, 'previousStatus': target['status'],
                             'absencePeriod': extract_absence_period(
                                 text, target['marked_at'], created.isoformat(), TZ)})
            used.discard(current_id)
            used.add(mid)
    if captured or backfilled:
        backup('absence-reasons')
        with connect() as db:
            db.execute('BEGIN IMMEDIATE')
            now = dt.datetime.now(TZ).isoformat()
            for item in backfilled:
                require_in_scope_student(item['student_account_id'], item['class_id'], connection=db)
                db.execute('''INSERT OR IGNORE INTO absence_followups
                    (attendance_log_id,status,recipient_external_id,outbound_message_id,conversation_id,
                     message_text,sent_at,updated_at) VALUES (?,'sent',?,?,?,?,?,?)''',
                    (item['attendance_log_id'], item['recipient_external_id'], item['outbound_message_id'],
                     item['conversation_id'], item['message_text'], item['sent_at'], now))
            for item in captured:
                row = db.execute('''SELECT l.student_account_id,l.class_id
                    FROM selector_attendance_log l WHERE l.id=?''', (item['attendanceLogId'],)).fetchone()
                if not row:
                    raise RuntimeError('Attendance record disappeared before absence reason commit')
                require_in_scope_student(row['student_account_id'], row['class_id'], connection=db)
                values = (item['messageId'], item['reason'], item['category'], item['respondedAt'],
                          item['absencePeriod'][0] if item['absencePeriod'] else None,
                          item['absencePeriod'][1] if item['absencePeriod'] else None, now)
                if item['previousStatus'] == 'responded':
                    cursor = db.execute('''UPDATE absence_followups SET response_message_id=?,reason_text=?,reason_category=?,responded_at=?,
                        absence_start_date=?,absence_end_date=?,updated_at=?
                        WHERE attendance_log_id=? AND status='responded' AND response_message_id=?''',
                        (*values, item['attendanceLogId'], item['previousMessageId']))
                else:
                    cursor = db.execute('''UPDATE absence_followups SET status='responded',response_message_id=?,reason_text=?,reason_category=?,responded_at=?,
                        absence_start_date=?,absence_end_date=?,updated_at=?
                        WHERE attendance_log_id=? AND status='sent' ''',
                        (*values, item['attendanceLogId']))
                if cursor.rowcount != 1:
                    raise RuntimeError('Absence response changed during capture; collect again')
            db.commit()
    return {'captured': sum(item['previousStatus'] == 'sent' for item in captured),
            'corrected': sum(item['previousStatus'] == 'responded' for item in captured),
            'backfilled': len(backfilled), 'periodBackfilled': period_backfill['periodBackfilled'],
            'categoryBackfilled': category_backfill['categoryBackfilled'],
            'items': captured}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('command', nargs='?', choices=('prepare', 'authorize', 'status', 'send', 'capture', 'backfill-periods', 'backfill-categories'))
    parser.add_argument('--date', help='Attendance date in Asia/Shanghai, YYYY-MM-DD; use for today-only requests')
    parser.add_argument('--plan-sha256', help='Exact digest printed by prepare, required for authorize')
    parser.add_argument('--snapshot', type=Path, default=ROOT / 'state' / 'latest-response.json')
    parser.add_argument('--no-resolve-contacts', action='store_true',
                        help='Skip org-directory identity resolution for unlinked students')
    parser.add_argument('--resolve-uncertain',
                        help='Idempotency key of an uncertain delivery to clear after inspection')
    parser.add_argument('--note', help='Evidence that nothing was sent; required with --resolve-uncertain')
    args = parser.parse_args()
    lock = ROOT / 'state' / 'absence-followups.lock'
    handle = os.open(lock, os.O_CREAT | os.O_EXCL | os.O_WRONLY)
    try:
        if args.resolve_uncertain:
            print(json.dumps(resolve_uncertain_delivery(DELIVERIES, args.resolve_uncertain, args.note),
                             ensure_ascii=False))
        elif args.command == 'prepare':
            if args.date:
                dt.date.fromisoformat(args.date)
            print(json.dumps(prepare(resolve_contacts=not args.no_resolve_contacts, date=args.date), ensure_ascii=False, indent=2))
        elif args.command == 'authorize':
            print(json.dumps(authorize_plan(args.plan_sha256), ensure_ascii=False))
        elif args.command == 'status':
            print(json.dumps(campaign_status(), ensure_ascii=False))
        elif args.command == 'send':
            print(json.dumps(send_campaign(), ensure_ascii=False))
        elif args.command == 'capture':
            print(json.dumps(capture(args.snapshot), ensure_ascii=False))
        elif args.command == 'backfill-periods':
            print(json.dumps(backfill_recorded_periods(), ensure_ascii=False))
        elif args.command == 'backfill-categories':
            print(json.dumps(backfill_recorded_categories(), ensure_ascii=False))
        else:
            parser.error('specify prepare, send, capture, backfill-periods, backfill-categories or --resolve-uncertain')
    except DeliveryAttention as error:
        print(json.dumps({**campaign_status(), 'status': 'needs-attention', 'reason': str(error)}, ensure_ascii=False))
        raise SystemExit(2)
    finally:
        os.close(handle)
        lock.unlink()


if __name__ == '__main__':
    main()
