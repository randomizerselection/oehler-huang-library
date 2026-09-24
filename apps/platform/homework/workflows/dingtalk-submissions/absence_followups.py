"""Prepare, send, and record DingTalk absence follow-ups with lesson PDFs."""
import argparse
import datetime as dt
import hashlib
import json
import os
import re
import sqlite3
from pathlib import Path

from fetch import CONFIG, ROOT, TZ, ensure_english_only, save
from student_messages import dingtalk_text
from platform_db import PLATFORM_CLASSES, backup, connect, require_in_scope_student, require_schema
from reminders import deliver
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


def message_for(row, title):
    message = (
        f"{student_greeting(row['preferred_name'])} you were marked absent from Samuel's A Level Economics lesson "
        f"\u201c{title}\u201d on {lesson_date(row['marked_at'])}. The lesson covered actual and potential growth, "
        f"negative and positive output gaps, and how to interpret them using diagrams. Please reply to this message with "
        f"\u201cAbsence reason:\u201d followed by the reason you were absent. The lesson PDF is attached. "
        f"Please study the lesson independently and let Samuel know if anything is unclear."
    )
    ensure_english_only(message)
    return dingtalk_text(message)


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
            if not recipient.get('recipientId') or row['dingtalk_id'] != recipient['recipientId']:
                raise RuntimeError('Absence recipient no longer matches the verified platform identity')
            ensure_english_only(recipient.get('message', ''))


def partition_absences():
    classes = tuple(CONFIG.get('classes', ()))
    placeholders = ','.join('?' for _ in classes)
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
        ''', classes).fetchall()]
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


def prepare():
    titles = content_titles()
    recipients, unreachable = [], []
    rows, covered = partition_absences()
    skipped = list(covered)
    attachments = {}
    for item in rows:
        canonical_id = canonical_content_id(item['lesson_content_id'])
        title = titles.get(canonical_id)
        pdf = pdf_for(item['lesson_content_id'])
        if not title or pdf is None:
            skipped.append({**item, 'reason': 'Unsupported or unknown lesson content ID'})
            continue
        if not pdf.exists():
            skipped.append({**item, 'reason': f'Lesson PDF has not been exported: {pdf}'})
            continue
        sha = digest(pdf)
        attachments[item['lesson_content_id']] = {'path': str(pdf), 'name': pdf.name, 'sha256': sha, 'title': title}
        student = {
            'key': item['student_account_id'],
            'accountId': item['student_account_id'], 'studentId': item['student_id'],
            'class': item['class_name'], 'name': item['legal_name'] or item['display_name'],
            'english': item['preferred_name'] or ''
        }
        followup = {
            'attendanceLogId': item['attendance_log_id'], 'sessionId': item['session_id'],
            'lessonContentId': item['lesson_content_id'], 'markedAt': item['marked_at'],
            'student': student, 'recipientId': item['dingtalk_id'] or '',
            'message': message_for(item, title), 'attachment': item['lesson_content_id']
        }
        (recipients if item['dingtalk_id'] else unreachable).append(followup)
    plan = {
        'campaign': f"absence-followup-{dt.datetime.now(TZ).date().isoformat()}",
        'status': 'draft', 'preparedAt': dt.datetime.now(TZ).isoformat(),
        'attachments': attachments, 'recipients': recipients,
        'unreachable': unreachable, 'skipped': skipped
    }
    save(PLAN, plan)
    print(json.dumps({
        'plan': str(PLAN), 'recipients': len(recipients),
        'unreachable': len(unreachable), 'skipped': len(skipped),
        'messages': [{'student': x['student'], 'message': x['message'], 'pdf': attachments[x['attachment']]['path']} for x in recipients]
    }, ensure_ascii=False, indent=2))


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
          lesson_pdf_sha256=excluded.lesson_pdf_sha256,sent_at=excluded.sent_at,updated_at=excluded.updated_at''',
        (recipient['attendanceLogId'], status, recipient.get('recipientId') or None,
         delivery.get('openMessageId'), delivery.get('openConversationId'), recipient.get('message'),
         attachment.get('name'), attachment.get('sha256'), sent_at, now))


def send_campaign():
    plan = json.loads(PLAN.read_text(encoding='utf-8'))
    if plan.get('status') != 'authorized':
        raise RuntimeError('Absence follow-up plan is not authorized')
    for meta in plan['attachments'].values():
        path = Path(meta['path'])
        if not path.exists() or digest(path) != meta['sha256']:
            raise ValueError(f"Attachment changed or is missing: {path}")
    validate_authorized_plan(plan)
    state = json.loads(DELIVERIES.read_text(encoding='utf-8')) if DELIVERIES.exists() else {'messages': {}, 'skipped': {}}
    backup_path = backup('absence-followup')
    completed = 0
    with connect() as db:
        require_schema(db)
        for recipient in plan['recipients']:
            material = CONFIG['profile'] + '\n' + recipient['attendanceLogId'] + '\n' + plan['campaign']
            base = hashlib.sha256(material.encode()).hexdigest()
            text_key, file_key = 'absence-text-' + base, 'absence-file-' + base
            validate_authorized_plan({'recipients': [recipient]})
            if not deliver(state, text_key, recipient, ['--content', recipient['message']], DELIVERIES):
                raise RuntimeError('Text delivery is awaiting confirmation; rerun send to resume safely')
            attachment = plan['attachments'][recipient['attachment']]
            validate_authorized_plan({'recipients': [recipient]})
            if not deliver(state, file_key, recipient, ['--msg-type', 'file', '--file', attachment['path']], DELIVERIES):
                raise RuntimeError('PDF delivery is awaiting confirmation; rerun send to resume safely')
            upsert_delivery(db, recipient, attachment, state['messages'][text_key])
            db.commit()
            completed += 1
            print(json.dumps({'completedRecipients': completed, 'studentId': recipient['student']['studentId']}, ensure_ascii=False), flush=True)
        now = dt.datetime.now(TZ).isoformat()
        for recipient in plan.get('unreachable', []):
            attachment = plan['attachments'][recipient['attachment']]
            upsert_delivery(db, recipient, attachment, {'confirmedAt': now}, status='unreachable')
        db.commit()
    state.update(status='completed', campaign=plan['campaign'], completedAt=dt.datetime.now(TZ).isoformat(), backupPath=str(backup_path))
    save(DELIVERIES, state)
    plan.update(status='completed', completedAt=state['completedAt'])
    save(PLAN, plan)
    print(json.dumps({'completedRecipients': completed, 'unreachable': len(plan.get('unreachable', [])), 'backup': str(backup_path)}, ensure_ascii=False))


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
    classes = tuple(PLATFORM_CLASSES)
    placeholders = ','.join('?' for _ in classes)
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
        ''', classes).fetchall()]
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
    classes = tuple(PLATFORM_CLASSES)
    placeholders = ','.join('?' for _ in classes)
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
        ''', classes)]
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
        ''', classes)]
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
        messages = sorted(conversation.get('messages', []), key=lambda item: parse_dingtalk_time(item.get('createTime')) or dt.datetime.min.replace(tzinfo=dt.timezone.utc))
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
                if item['previousStatus'] == 'responded':
                    cursor = db.execute('''UPDATE absence_followups SET response_message_id=?,reason_text=?,reason_category=?,responded_at=?,
                        absence_start_date=?,absence_end_date=?,updated_at=?
                        WHERE attendance_log_id=? AND status='responded' AND response_message_id=?''',
                        (item['messageId'], item['reason'], item['category'], item['respondedAt'],
                         item['absencePeriod'][0] if item['absencePeriod'] else None,
                         item['absencePeriod'][1] if item['absencePeriod'] else None, now,
                         item['attendanceLogId'], item['previousMessageId']))
                else:
                    cursor = db.execute('''UPDATE absence_followups SET status='responded',response_message_id=?,reason_text=?,reason_category=?,responded_at=?,
                        absence_start_date=?,absence_end_date=?,updated_at=?
                        WHERE attendance_log_id=? AND status='sent' ''',
                        (item['messageId'], item['reason'], item['category'], item['respondedAt'],
                         item['absencePeriod'][0] if item['absencePeriod'] else None,
                         item['absencePeriod'][1] if item['absencePeriod'] else None,
                         now, item['attendanceLogId']))
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
    parser.add_argument('command', choices=('prepare', 'send', 'capture', 'backfill-periods', 'backfill-categories'))
    parser.add_argument('--snapshot', type=Path, default=ROOT / 'state' / 'latest-response.json')
    args = parser.parse_args()
    lock = ROOT / 'state' / 'absence-followups.lock'
    handle = os.open(lock, os.O_CREAT | os.O_EXCL | os.O_WRONLY)
    try:
        if args.command == 'prepare':
            prepare()
        elif args.command == 'send':
            send_campaign()
        elif args.command == 'capture':
            print(json.dumps(capture(args.snapshot), ensure_ascii=False))
        elif args.command == 'backfill-periods':
            print(json.dumps(backfill_recorded_periods(), ensure_ascii=False))
        else:
            print(json.dumps(backfill_recorded_categories(), ensure_ascii=False))
    finally:
        os.close(handle)
        lock.unlink()


if __name__ == '__main__':
    main()
