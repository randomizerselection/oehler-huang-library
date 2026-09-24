"""Send one deterministic acknowledgment for each reviewed S3.6 absence reason."""
import argparse
import datetime as dt
import hashlib
import json
import os
import re

from fetch import CONFIG, ROOT, TZ, ensure_english_only, save
from platform_db import PLATFORM_CLASSES, connect, require_schema
from reminders import deliver
from student_messages import dingtalk_text

STATE = ROOT / 'state' / 'absence-receipt-deliveries.json'
LEDGER = ROOT / 'state' / 'ledger.json'


def eligible_rows():
    placeholders = ','.join('?' for _ in PLATFORM_CLASSES)
    with connect(readonly=True) as db:
        require_schema(db)
        return [dict(row) for row in db.execute(f'''
            SELECT f.attendance_log_id,f.response_message_id,f.conversation_id,
                   f.recipient_external_id,f.reason_text,f.absence_start_date,f.absence_end_date,
                   l.student_account_id,a.preferred_name
            FROM absence_followups f
            JOIN selector_attendance_log l ON l.id=f.attendance_log_id
            JOIN classes c ON c.id=l.class_id
            JOIN class_memberships m ON m.class_id=l.class_id AND m.account_id=l.student_account_id
            JOIN accounts a ON a.id=l.student_account_id
            WHERE f.status='responded' AND f.response_message_id IS NOT NULL
              AND f.conversation_id IS NOT NULL AND f.recipient_external_id IS NOT NULL
              AND c.name IN ({placeholders}) AND m.status='active'
              AND a.role='student' AND a.status='active'
            ORDER BY f.responded_at,f.attendance_log_id
        ''', PLATFORM_CLASSES).fetchall()]


def reviewed_response_ids(path=LEDGER):
    if not path.exists():
        return set()
    ledger = json.loads(path.read_text(encoding='utf-8'))
    return {item.get('messageId') or key.split('~dup-', 1)[0]
            for key, item in ledger.get('processed', {}).items()
            if item.get('action') == 'absence_reason'}


def greeting(preferred_name):
    name = (preferred_name or '').strip()
    return f'Hi {name},' if re.fullmatch(r"[A-Za-z][A-Za-z .'-]{0,49}", name) else 'Hi,'


def receipt_text(row):
    message = f"{greeting(row['preferred_name'])} thank you for letting me know. I've checked and recorded your absence reason."
    ensure_english_only(message)
    return dingtalk_text(message)


def receipt_key(row):
    material = CONFIG['profile'] + '\n' + row['attendance_log_id'] + '\n' + row['response_message_id']
    return 'absence-receipt-' + hashlib.sha256(material.encode()).hexdigest()


def initialize(rows, state_path):
    state = {'enabledAt': dt.datetime.now(TZ).isoformat(), 'messages': {
        receipt_key(row): {'status': 'pre-existing', 'attendanceLogId': row['attendance_log_id'],
                           'sourceMessageId': row['response_message_id']}
        for row in rows
    }}
    save(state_path, state)
    return {'initialized': True, 'preExistingReasons': len(rows), 'eligible': 0, 'sent': 0,
            'alreadyConfirmed': 0, 'awaitingConfirmation': 0, 'needsAttention': []}


def run(send=False, state_path=STATE, ledger_path=LEDGER):
    rows = eligible_rows()
    if not state_path.exists():
        return initialize(rows, state_path)
    if not send:
        return {'eligible': 0, 'sent': 0, 'alreadyConfirmed': 0,
                'awaitingConfirmation': 0, 'needsAttention': []}
    state = json.loads(state_path.read_text(encoding='utf-8'))
    reviewed = reviewed_response_ids(ledger_path)
    result = {'eligible': 0, 'sent': 0, 'alreadyConfirmed': 0,
              'awaitingConfirmation': 0, 'needsAttention': []}
    for row in rows:
        key = receipt_key(row)
        existing = state.setdefault('messages', {}).get(key, {})
        if existing.get('status') == 'pre-existing':
            continue
        if row['response_message_id'] not in reviewed:
            result['needsAttention'].append({
                'attendanceLogId': row['attendance_log_id'],
                'reason': 'Captured absence reason has not been reviewed with action absence_reason'})
            continue
        result['eligible'] += 1
        already_confirmed = existing.get('status') == 'sent'
        text = existing.get('text') or receipt_text(row)
        existing['text'] = text
        state['messages'][key] = existing
        recipient = {'recipientId': row['recipient_external_id'],
                     'student': {'key': row['student_account_id']}}
        if not deliver(state, state_path, key, recipient, ['--content', text]):
            result['awaitingConfirmation'] += 1
            continue
        state['messages'][key].update(
            attendanceLogId=row['attendance_log_id'], sourceMessageId=row['response_message_id'],
            reasonText=row['reason_text'], absenceStartDate=row['absence_start_date'],
            absenceEndDate=row['absence_end_date'])
        save(state_path, state)
        result['alreadyConfirmed' if already_confirmed else 'sent'] += 1
    return result


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--send', action='store_true')
    args = parser.parse_args()
    lock = ROOT / 'state' / 'absence-receipts.lock'
    handle = os.open(lock, os.O_CREAT | os.O_EXCL | os.O_WRONLY)
    try:
        print(json.dumps(run(send=args.send), ensure_ascii=False))
    finally:
        os.close(handle)
        lock.unlink()


if __name__ == '__main__':
    main()
