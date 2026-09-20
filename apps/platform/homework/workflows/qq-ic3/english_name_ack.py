"""Acknowledge verified English-name updates after both roster views are saved."""
import argparse
import datetime as dt
import hashlib
import json
import os
from fetch import CONFIG, ROOT, TZ, cli, roster, save
from platform_db import verify_preferred_name
from receipts import field
import student_messages

STATE = ROOT / 'state' / 'english-name-updates.json'
TEXT = "Thank you for letting me know. I've updated my name list."


def verify_saved(item):
    students = [s for s in roster() if s['key'] == item['studentKey']]
    if len(students) != 1 or not item.get('senderId') or item['senderId'] == CONFIG['selfQqId']:
        raise ValueError('English-name acknowledgment lacks a unique student or valid recipient')
    if students[0]['class'] not in CONFIG['classes']:
        raise ValueError(f"Refusing to send for a student outside {CONFIG['classes']}: {students[0]['class']}")
    verify_preferred_name(item['studentKey'], item['englishName'])


def run(send=False):
    if not STATE.exists():
        return {'eligible': 0, 'sent': 0, 'awaitingConfirmation': 0}
    state = json.loads(STATE.read_text(encoding='utf-8'))
    result = {'eligible': 0, 'sent': 0, 'awaitingConfirmation': 0, 'needsAttention': []}
    for source_id, item in state.get('updates', {}).items():
        if item.get('status') != 'saved' or item.get('acknowledgementStatus') == 'sent':
            continue
        verify_saved(item)
        result['eligible'] += 1
        if not send:
            continue
        task = item.get('openTaskId')
        if not task:
            now = dt.datetime.now(TZ)
            attempted = item.get('attemptedAt')
            if attempted and now - dt.datetime.fromisoformat(attempted) > dt.timedelta(hours=23):
                result['needsAttention'].append({'studentKey': item['studentKey'], 'reason': 'Uncertain send is outside safe retry window'})
                continue
            text = item.get('text') or student_messages.name_text(item['englishName'])
            item.update(
                acknowledgementStatus='sending',
                attemptedAt=attempted or now.isoformat(),
                text=text,
                idempotencyKey='english-name-' + hashlib.sha256((CONFIG['selfQqId'] + '\n' + item['studentKey'] + '\n' + item['englishName']).encode()).hexdigest(),
            )
            save(STATE, state)
            response = cli(['chat', 'message', 'send', '--open-dingtalk-id', item['senderId'],
                            '--content', text, '--ai-tag=true', '--idempotency-key', item['idempotencyKey'], '--yes'])
            task = field(response, 'openTaskId')
            if not task:
                raise RuntimeError('Send response lacks openTaskId; inspect response and chat before retrying')
            item.update(openTaskId=task, acknowledgementStatus='awaiting-confirmation')
            save(STATE, state)
        response = cli(['chat', 'message', 'query-send-status', '--open-task-id', str(task)])
        message_id, conversation_id = field(response, 'openMessageId'), field(response, 'openConversationId')
        if message_id and conversation_id:
            item.update(acknowledgementStatus='sent', openMessageId=message_id,
                        openConversationId=conversation_id, confirmedAt=dt.datetime.now(TZ).isoformat())
            result['sent'] += 1
        else:
            result['awaitingConfirmation'] += 1
        save(STATE, state)
    return result


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--send', action='store_true')
    args = parser.parse_args()
    lock = ROOT / 'state' / 'english-name-ack.lock'
    handle = os.open(lock, os.O_CREAT | os.O_EXCL | os.O_WRONLY)
    try:
        print(json.dumps(run(send=args.send), ensure_ascii=True))
    finally:
        os.close(handle)
        lock.unlink()
