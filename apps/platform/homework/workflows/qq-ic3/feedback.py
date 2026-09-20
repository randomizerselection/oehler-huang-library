"""Send the marked score, one improvement sentence, and the model answer.

For every graded submission in the ledger (a `submitted` decision carrying
`score` and `feedback`), send the student exactly two messages, each confirmed
before its delivery state advances:

  1. text: verified name, assignment/topic, saved score, and one improvement.
  2. image: the assignment's `feedbackImage` from assignments.json

Both are English-only, verified against the freshly saved platform homework row
(score and status) and the student's in-scope class immediately before sending.
Delivery history lives in state/feedback.json and is never reset. A tracked
task can be reconciled; an uncertain send without a task requires chat inspection.
Confirmed text is skipped while the image is pending.

Usage:
  python feedback.py --initialize   # record already-graded submissions as sent
  python feedback.py --send         # deliver outstanding feedback
"""
import argparse
import datetime as dt
import hashlib
import json
import os
from fetch import CONFIG, ROOT, TZ, cli, roster, save, ensure_english_only
from platform_db import verify_score
from receipts import field, greeting
import student_messages

STATE = ROOT / 'state' / 'feedback.json'
RETRY_WINDOW = dt.timedelta(hours=23)


def source_message_id(ledger_key):
    return ledger_key.split('~dup-', 1)[0]


def assignment_meta(assignment):
    return student_messages.assignment_meta(ROOT, assignment)


def feedback_key(item):
    return hashlib.sha256((CONFIG['selfQqId'] + '\n' + item['studentKey'] + '\n' + item['assignment'] + '\ngraded').encode()).hexdigest()


def graded_records():
    ledger_path = ROOT / 'state' / 'ledger.json'
    if not ledger_path.exists():
        return {}
    ledger = json.loads(ledger_path.read_text(encoding='utf-8'))
    result = {}
    for mid, item in ledger['processed'].items():
        if item.get('action') != 'submitted' or item.get('score') is None:
            continue
        # A graded entry is delivered even when it came from a teacher-authorized
        # exception: an ungraded exemption is not a submission, but a marked one
        # still owes the student their score.
        result[feedback_key(item)] = {**item, 'sourceMessageId': source_message_id(mid)}
    return result


def feedback_text(item, student):
    meta = assignment_meta(item['assignment'])
    text = student_messages.feedback_text(item, student, student_messages.assignment_label(meta))
    ensure_english_only(text)
    return text


def verify(item):
    students = [s for s in roster() if s['key'] == item['studentKey']]
    if len(students) != 1:
        raise ValueError('Feedback lacks a unique student')
    student = students[0]
    if student['class'] not in CONFIG['classes']:
        raise ValueError(f"Refusing to send for a student outside {CONFIG['classes']}: {student['class']}")
    # A decision backed by a student message carries its verified sender; a
    # retroactive grade of an already-recorded submission uses the student's
    # pre-linked QQ identity instead.
    recipient = item.get('senderId') or student.get('qqId')
    if not recipient or recipient == CONFIG['selfQqId']:
        raise ValueError('Feedback lacks a valid recipient')
    row = verify_score(item['studentKey'], item['assignment'], expected_score=item['score'])
    meta = assignment_meta(item['assignment'])
    image = (meta.get('feedbackImage') or '').strip()
    if not image:
        raise ValueError('Assignment catalog entry has no feedbackImage for the feedback attachment')
    path = ROOT / image
    if not path.is_file():
        raise ValueError(f'Feedback attachment is missing on disk: {path}')
    return {**student, 'recipient': recipient}, row, path


def deliver(entry, student, text, path, image_key, persist=lambda: None):
    """Send text then image, confirming each; returns updated entry."""
    now = dt.datetime.now(TZ)
    if not entry.get('textConfirmedAt') and not entry.get('openTaskId'):
        if entry.get('status') in ('sending', 'uncertain'):
            raise RuntimeError('Uncertain prior text send; inspect the chat before resending')
        attempted = entry.get('attemptedAt')
        if attempted and now - dt.datetime.fromisoformat(attempted) > RETRY_WINDOW:
            raise RuntimeError('Uncertain send is outside the safe retry window; inspect the chat before resending')
        text = entry.get('text') or text
        ensure_english_only(text)
        entry.update(status='sending', attemptedAt=attempted or now.isoformat(), text=text,
                     idempotencyKey=entry.get('idempotencyKey') or ('feedback-' + image_key))
        persist()
        response = cli(['chat', 'message', 'send', '--open-dingtalk-id', entry['senderId'], '--content', text,
                        '--ai-tag=true', '--idempotency-key', entry['idempotencyKey'], '--yes'])
        task = field(response, 'openTaskId')
        if not task:
            raise RuntimeError('Send response lacks a task id; inspect the chat before any retry')
        entry['openTaskId'] = str(task)
        entry['status'] = 'awaiting-confirmation'
        persist()
    if not entry.get('textConfirmedAt'):
        status = cli(['chat', 'message', 'query-send-status', '--open-task-id', str(entry['openTaskId'])])
        if field(status, 'openMessageId') and field(status, 'openConversationId'):
            entry['textConfirmedAt'] = now.isoformat()
            entry.pop('openTaskId', None)
            entry['status'] = 'text-sent'
            persist()
        else:
            entry['status'] = 'awaiting-confirmation'
            persist()
            return entry

    image = entry.get('image', {})
    if image.get('status') == 'sent':
        entry['status'] = 'sent'
        return entry
    if not image.get('openTaskId') and image.get('status') != 'sent':
        if image.get('status') in ('sending', 'uncertain'):
            raise RuntimeError('Uncertain prior attachment send; inspect the chat before resending')
        attempted = image.get('attemptedAt')
        if attempted and now - dt.datetime.fromisoformat(attempted) > RETRY_WINDOW:
            raise RuntimeError('Uncertain attachment send is outside the safe retry window; inspect the chat before resending')
        image = {**image, 'status': 'sending', 'attemptedAt': attempted or now.isoformat(),
                 'idempotencyKey': image.get('idempotencyKey') or ('feedback-image-' + image_key)}
        entry['image'] = image
        persist()
        response = cli(['chat', 'message', 'send', '--open-dingtalk-id', entry['senderId'], '--msg-type', 'file',
                        '--file-path', str(path), '--file-name', path.name,
                        '--idempotency-key', image['idempotencyKey'], '--yes'])
        task = field(response, 'openTaskId')
        if not task:
            raise RuntimeError('Attachment send response lacks a task id; inspect the chat before any retry')
        image['openTaskId'] = str(task)
        image['status'] = 'awaiting-confirmation'
        entry['image'] = image
        persist()
    status = cli(['chat', 'message', 'query-send-status', '--open-task-id', str(image.get('openTaskId'))])
    if field(status, 'openMessageId') and field(status, 'openConversationId'):
        image['status'] = 'sent'
        image['confirmedAt'] = now.isoformat()
        image.pop('openTaskId', None)
        entry['status'] = 'sent'
        entry['sentAt'] = now.isoformat()
    else:
        image['status'] = 'awaiting-confirmation'
    entry['image'] = image
    persist()
    return entry


def run(send=False, initialize=False):
    records = graded_records()
    if initialize:
        if STATE.exists():
            raise RuntimeError('Feedback history already initialized; refusing to reset it')
        save(STATE, {'enabledAt': dt.datetime.now(TZ).isoformat(),
                     'deliveries': {key: {'status': 'pre-existing', 'sourceMessageId': value['sourceMessageId']}
                                    for key, value in records.items()}})
        return {'initialized': True, 'preExistingGraded': len(records)}
    if not STATE.exists():
        raise RuntimeError('Initialize feedback history explicitly before sending')
    state = json.loads(STATE.read_text(encoding='utf-8'))
    result = {'graded': len(records), 'sent': 0, 'awaitingConfirmation': 0, 'needsAttention': []}
    for key, item in records.items():
        entry = state['deliveries'].get(key, {})
        if entry.get('status') in ('pre-existing', 'sent'):
            continue
        student, row, path = verify(item)
        # Use the committed denominator and feedback, not stale ledger copies.
        item = {**item, 'score': row['score'], 'scoreMax': row['score_max'], 'feedback': row['feedback']}
        if not isinstance(item['feedback'], str) or not item['feedback'].strip():
            raise ValueError('Saved homework record has no feedback')
        text = feedback_text(item, student)
        entry = {**entry, 'studentKey': item['studentKey'], 'senderId': student['recipient'],
                 'sourceMessageId': item['sourceMessageId'], 'assignment': item['assignment'],
                 'score': int(item['score']), 'scoreMax': int(item.get('scoreMax') or 8)}
        if not send:
            result['needsAttention'].append({'studentKey': item['studentKey'], 'reason': 'graded feedback not yet sent'})
            continue
        try:
            state['deliveries'][key] = entry
            entry = deliver(entry, student, text, path, key, lambda: save(STATE, state))
        except RuntimeError as error:
            entry['status'] = 'uncertain'
            entry['error'] = str(error)
            state['deliveries'][key] = entry
            save(STATE, state)
            result['needsAttention'].append({'studentKey': item['studentKey'], 'reason': str(error)})
            continue
        state['deliveries'][key] = entry
        save(STATE, state)
        if entry.get('status') == 'sent':
            result['sent'] += 1
        else:
            result['awaitingConfirmation'] += 1
    return result


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--send', action='store_true')
    parser.add_argument('--initialize', action='store_true')
    args = parser.parse_args()
    if args.send and args.initialize:
        parser.error('Initialize and send are separate operations')
    lock = ROOT / 'state/feedback.lock'
    handle = os.open(lock, os.O_CREAT | os.O_EXCL | os.O_WRONLY)
    try:
        print(json.dumps(run(send=args.send, initialize=args.initialize), ensure_ascii=True))
    finally:
        os.close(handle)
        lock.unlink()
