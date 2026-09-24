"""Send deterministic receipts for reviewed and logged DingTalk absence reasons."""
import argparse
import hashlib
import json
import os
import re
from pathlib import Path

from fetch import CONFIG, ROOT, TZ, ensure_english_only, save
from student_messages import dingtalk_text
from platform_db import PLATFORM_CLASSES, connect, require_schema
from reminders import deliver

STATE = ROOT / 'state' / 'absence-receipt-deliveries.json'
PERSONAL_STATE = ROOT / 'state' / 'personal-replies.json'


def load_state(path=STATE):
    return json.loads(path.read_text(encoding='utf-8')) if path.exists() else {
        'messages': {}, 'skipped': {}}


def review_key(conversation_id, message_id):
    return hashlib.sha256((conversation_id + '\n' + message_id).encode()).hexdigest()[:24]


def reviewed_keys(path=PERSONAL_STATE):
    if not path.exists():
        return set()
    state = json.loads(path.read_text(encoding='utf-8'))
    return {key for key, review in state.get('reviews', {}).items()
            if review.get('status') == 'routine'}


def eligible_rows():
    classes = tuple(PLATFORM_CLASSES)
    placeholders = ','.join('?' for _ in classes)
    with connect(readonly=True) as db:
        require_schema(db)
        return db.execute(f'''
            SELECT f.attendance_log_id,f.response_message_id,f.conversation_id,
                   f.recipient_external_id,f.reason_text,
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
        ''', classes).fetchall()


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


def run(send=False, state_path=STATE, personal_path=PERSONAL_STATE):
    if not send:
        return {'eligible': 0, 'sent': 0, 'alreadyConfirmed': 0,
                'awaitingConfirmation': 0, 'needsAttention': []}
    state = load_state(state_path)
    routine_reviews = reviewed_keys(personal_path)
    result = {'eligible': 0, 'sent': 0, 'alreadyConfirmed': 0,
              'awaitingConfirmation': 0, 'needsAttention': []}
    for raw in eligible_rows():
        row = dict(raw)
        key = review_key(row['conversation_id'], row['response_message_id'])
        if key not in routine_reviews:
            result['needsAttention'].append({
                'attendanceLogId': row['attendance_log_id'],
                'reason': 'Absence reason is logged but has not been marked routine after review'})
            continue
        result['eligible'] += 1
        message_key = receipt_key(row)
        recipient = {
            'recipientId': row['recipient_external_id'],
            'student': {'key': row['student_account_id']},
        }
        state.setdefault('messages', {}).setdefault(message_key, {})
        already_confirmed = state['messages'][message_key].get('status') == 'sent'
        text = state['messages'][message_key].get('text') or receipt_text(row)
        if state['messages'][message_key].get('text') not in (None, text):
            raise RuntimeError('Absence receipt text changed after delivery intent was saved')
        state['messages'][message_key]['text'] = text
        if not deliver(state, message_key, recipient, ['--content', text], state_path):
            result['awaitingConfirmation'] += 1
            continue
        entry = state['messages'][message_key]
        entry.update(attendanceLogId=row['attendance_log_id'], sourceMessageId=row['response_message_id'],
                     reasonText=row['reason_text'], reviewKey=key)
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
