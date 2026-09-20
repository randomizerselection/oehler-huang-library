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
from platform_db import PLATFORM_CLASSES, backup, connect, require_in_scope_student, require_schema
from reminders import deliver

PLAN = ROOT / 'state' / 'absence-followup-plan.json'
DELIVERIES = ROOT / 'state' / 'absence-followup-deliveries.json'
MANIFEST = Path(CONFIG['platformProject']) / 'apps' / 'library' / 'generated' / 'content-manifest.json'
PDF_ROOT = Path(CONFIG['platformProject']) / 'authoring' / 'a-level' / 'outputs' / 'pdf'
SELF_ID = CONFIG['selfOpenDingTalkId']


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def content_titles():
    data = json.loads(MANIFEST.read_text(encoding='utf-8'))
    return {item['id']: item['title'].split(' · ', 1)[0] for item in data.get('items', [])}


def pdf_for(content_id):
    prefix = 'a-level:lessons:'
    if not (content_id or '').startswith(prefix):
        return None
    return PDF_ROOT / f"{content_id[len(prefix):]}.pdf"


def student_greeting(preferred_name):
    name = (preferred_name or '').strip()
    return f'Hi {name},' if re.fullmatch(r"[A-Za-z][A-Za-z .'-]{0,49}", name) else 'Hi,'


def lesson_date(marked_at):
    value = dt.datetime.fromisoformat(marked_at.replace('Z', '+00:00')).astimezone(TZ)
    return value.strftime('%-d %B %Y') if os.name != 'nt' else value.strftime('%d %B %Y').lstrip('0')


def message_for(row, title):
    message = (
        f"{student_greeting(row['preferred_name'])} you were marked absent from our A Level Economics lesson "
        f"\u201c{title}\u201d on {lesson_date(row['marked_at'])}. Please reply to this message with "
        f"\u201cAbsence reason:\u201d followed by the reason you were absent. The lesson PDF is attached. "
        f"Please study the lesson independently and let me know if anything is unclear."
    )
    ensure_english_only(message)
    return message


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


def eligible_absences():
    classes = tuple(CONFIG.get('classes', ()))
    placeholders = ','.join('?' for _ in classes)
    with connect(readonly=True) as db:
        require_schema(db)
        return db.execute(f'''
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
        ''', classes).fetchall()


def prepare():
    titles = content_titles()
    recipients, unreachable, skipped = [], [], []
    attachments = {}
    for row in eligible_absences():
        item = dict(row)
        title = titles.get(item['lesson_content_id'])
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
    value = re.sub(r'^\s*absence\s+reason\s*:\s*', '', text or '', flags=re.I).strip()
    return value[:2000]


def capture(snapshot):
    data = json.loads(Path(snapshot).read_text(encoding='utf-8'))
    if data.get('complete') is not True or data.get('result', {}).get('hasMore') is not False:
        raise ValueError('Absence replies require a complete DingTalk message scan')
    classes = tuple(PLATFORM_CLASSES)
    placeholders = ','.join('?' for _ in classes)
    with connect(readonly=True) as db:
        require_schema(db)
        outstanding = [dict(row) for row in db.execute(f'''
            SELECT f.attendance_log_id,f.recipient_external_id,f.conversation_id,f.sent_at,
                   l.student_account_id,l.class_id
            FROM absence_followups f
            JOIN selector_attendance_log l ON l.id=f.attendance_log_id
            JOIN classes c ON c.id=l.class_id
            JOIN class_memberships m ON m.class_id=l.class_id AND m.account_id=l.student_account_id
            JOIN accounts a ON a.id=l.student_account_id
            WHERE f.status='sent' AND f.conversation_id IS NOT NULL AND f.sent_at IS NOT NULL
              AND c.name IN ({placeholders}) AND m.status='active'
              AND a.role='student' AND a.status='active'
        ''', classes)]
        used = {row['response_message_id'] for row in db.execute('SELECT response_message_id FROM absence_followups WHERE response_message_id IS NOT NULL')}
    by_conversation = {}
    for row in outstanding:
        by_conversation.setdefault(row['conversation_id'], []).append(row)
    captured = []
    for conversation in data['result']['conversationMessagesList']:
        cid = conversation.get('openConversationId')
        waiting = by_conversation.get(cid, [])
        if not waiting:
            continue
        waiting.sort(key=lambda item: parse_dingtalk_time(item['sent_at']))
        messages = sorted(conversation.get('messages', []), key=lambda item: parse_dingtalk_time(item.get('createTime')) or dt.datetime.min.replace(tzinfo=dt.timezone.utc))
        for message in messages:
            mid = message.get('openMessageId') or message.get('messageId')
            if not mid or mid in used or message.get('senderOpenDingTalkId') == SELF_ID:
                continue
            created = parse_dingtalk_time(message.get('createTime'))
            text = normalize_reason(message.get('content') or message.get('text') or '')
            if not created or not text or text.startswith('['):
                continue
            candidates = [item for item in waiting if item['recipient_external_id'] == message.get('senderOpenDingTalkId') and parse_dingtalk_time(item['sent_at']) < created]
            if not candidates:
                continue
            target = candidates[-1]
            captured.append({'attendanceLogId': target['attendance_log_id'], 'messageId': mid, 'reason': text, 'respondedAt': created.isoformat()})
            waiting.remove(target)
            used.add(mid)
    if captured:
        backup('absence-reasons')
        with connect() as db:
            db.execute('BEGIN IMMEDIATE')
            for item in captured:
                row = db.execute('''SELECT l.student_account_id,l.class_id
                    FROM selector_attendance_log l WHERE l.id=?''', (item['attendanceLogId'],)).fetchone()
                if not row:
                    raise RuntimeError('Attendance record disappeared before absence reason commit')
                require_in_scope_student(row['student_account_id'], row['class_id'], connection=db)
                db.execute('''UPDATE absence_followups SET status='responded',response_message_id=?,reason_text=?,responded_at=?,updated_at=?
                    WHERE attendance_log_id=? AND status='sent' ''',
                    (item['messageId'], item['reason'], item['respondedAt'], dt.datetime.now(TZ).isoformat(), item['attendanceLogId']))
            db.commit()
    return {'captured': len(captured), 'items': captured}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('command', choices=('prepare', 'send', 'capture'))
    parser.add_argument('--snapshot', type=Path, default=ROOT / 'state' / 'latest-response.json')
    args = parser.parse_args()
    lock = ROOT / 'state' / 'absence-followups.lock'
    handle = os.open(lock, os.O_CREAT | os.O_EXCL | os.O_WRONLY)
    try:
        if args.command == 'prepare':
            prepare()
        elif args.command == 'send':
            send_campaign()
        else:
            print(json.dumps(capture(args.snapshot), ensure_ascii=False))
    finally:
        os.close(handle)
        lock.unlink()


if __name__ == '__main__':
    main()
