"""Acknowledge verified English-name updates after both roster views are saved."""
import argparse
import datetime as dt
import hashlib
import json
import os
from fetch import CONFIG, ROOT, TZ, cli, ensure_english_only, roster, save
from platform_db import require_recipient, verify_preferred_name
from receipts import field
import student_messages

STATE = ROOT / 'state' / 'english-name-updates.json'
TEXT = "Thank you for letting me know. I've updated my name list."


def verify_saved(item):
    if not item.get('senderId') or item['senderId'] == CONFIG['selfOpenDingTalkId']:
        raise ValueError('English-name acknowledgment lacks a unique student or valid recipient')
    require_recipient(item['studentKey'], item['senderId'])
    verify_preferred_name(item['studentKey'], item['englishName'])


def run(send=False):
    if not STATE.exists():
        return {'eligible': 0, 'sent': 0, 'awaitingConfirmation': 0}
    state = json.loads(STATE.read_text(encoding='utf-8'))
    result = {'eligible': 0, 'sent': 0, 'awaitingConfirmation': 0, 'needsAttention': []}
    for source_id, item in state.get('updates', {}).items():
        if item.get('status') != 'saved' or item.get('acknowledgementStatus') == 'sent':
            continue
        if item.get('acknowledgementStatus') in ('uncertain', 'failed'):
            result['needsAttention'].append({'studentKey': item['studentKey'], 'reason': f"Delivery is {item['acknowledgementStatus']}; inspect the DingTalk chat before any retry"})
            continue
        verify_saved(item)
        result['eligible'] += 1
        if not send:
            continue
        task = item.get('openTaskId')
        if not task:
            now = dt.datetime.now(TZ)
            if item.get('acknowledgementStatus') == 'sending':
                item.update(acknowledgementStatus='uncertain', lastError='Process stopped after send intent was saved but before a task ID was persisted')
                save(STATE, state)
                result['needsAttention'].append({'studentKey': item['studentKey'], 'reason': 'Uncertain prior send; inspect chat before any retry'})
                continue
            verify_saved(item)
            text = item.get('text') or student_messages.name_text(item['englishName'])
            ensure_english_only(text)
            item.update(
                acknowledgementStatus='sending',
                attemptedAt=now.isoformat(),
                text=text,
                idempotencyKey='english-name-' + hashlib.sha256((CONFIG['profile'] + '\n' + item['studentKey'] + '\n' + item['englishName']).encode()).hexdigest(),
            )
            save(STATE, state)
            try:
                response = cli(['chat', 'message', 'send', '--open-dingtalk-id', item['senderId'],
                                '--content', text, '--ai-tag=true', '--idempotency-key', item['idempotencyKey'], '--yes'])
            except Exception as error:
                item.update(acknowledgementStatus='uncertain', lastError=str(error)[:500])
                save(STATE, state)
                result['needsAttention'].append({'studentKey': item['studentKey'], 'reason': 'DingTalk send outcome is uncertain; no automatic retry will occur'})
                continue
            task = field(response, 'openTaskId')
            if not task:
                item.update(acknowledgementStatus='uncertain', lastError='Send response lacks openTaskId')
                save(STATE, state)
                result['needsAttention'].append({'studentKey': item['studentKey'], 'reason': 'DingTalk accepted no trackable task ID; inspect chat before any retry'})
                continue
            item.update(openTaskId=task, acknowledgementStatus='awaiting-confirmation')
            save(STATE, state)
        try:
            response = cli(['chat', 'message', 'query-send-status', '--open-task-id', str(task)])
        except Exception as error:
            item['lastError'] = str(error)[:500]
            save(STATE, state)
            result['needsAttention'].append({'studentKey': item['studentKey'], 'reason': 'Could not reconcile the existing DingTalk send task'})
            continue
        message_id, conversation_id = field(response, 'openMessageId'), field(response, 'openConversationId')
        if message_id and conversation_id:
            item.update(acknowledgementStatus='sent', openMessageId=message_id,
                        openConversationId=conversation_id, confirmedAt=dt.datetime.now(TZ).isoformat())
            result['sent'] += 1
        else:
            remote_status = str(field(response, 'status') or field(response, 'sendStatus') or '').lower()
            if remote_status in ('failed', 'failure', 'error', 'rejected'):
                item.update(acknowledgementStatus='failed', lastError=f'DingTalk task status: {remote_status}')
                result['needsAttention'].append({'studentKey': item['studentKey'], 'reason': 'DingTalk reported a failed send task'})
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
