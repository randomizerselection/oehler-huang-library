"""Prepare and deliver one reviewed two-homework DingTalk campaign."""
import argparse
import datetime as dt
import hashlib
import json
import os
import subprocess
import sys
from collections import Counter, defaultdict
from pathlib import Path

from fetch import CONFIG, ROOT, TZ, roster, save
from platform_db import homework_row
from reminders import deliver
from receipts import receipt_key, submitted_records
from working_followups import eligible_records

PLAN = ROOT / 'state' / 'daily-campaign-2026-09-17.json'
STATE = ROOT / 'state' / 'daily-campaign-2026-09-17-deliveries.json'
CAMPAIGN = 'two-homework-check-2026-09-17'
H1 = '15 Sep 2026\nInflationary gap (Q19)'
H2 = '16 Sep 2026\nDeflationary gap (9708/31 Q18)'
ATTACHMENTS = {
    'Homework 1': ROOT / 'state' / 'Inflationary-gap-Q19.png',
    'Homework 2': ROOT / 'assignments' / '2026-09-16' / '9708-s26-31-Q18-clean.png',
}


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def student_name(student):
    return student.get('english', '').strip()


def greeting(name):
    return f'Hi {name},' if name else 'Hi,'


def make_message(category, name):
    salutation = greeting(name)
    templates = {
        'completed_h1': f"{salutation} thanks for completing Homework 1. I've marked it as submitted.",
        'completed_h2': f"{salutation} thanks for completing Homework 2. I've marked it as submitted.",
        'completed_both': f"{salutation} thanks for completing Homework 1 and Homework 2. I've marked both as submitted.",
        'completed_h1_missing_h2': f"{salutation} thanks for completing Homework 1. I've marked it as submitted. Homework 2 is overdue and still missing. Please complete it today and send a clear photo showing your full working. The question is attached.",
        'completed_h2_missing_h1': f"{salutation} thanks for completing Homework 2. I've marked it as submitted. Homework 1 is overdue and still missing. Please complete it today and send a clear photo showing your full working. The question is attached.",
        'missing_both': f"{salutation} Homework 1 and Homework 2 are both overdue and still not submitted. Please complete both today and send clear photos showing your full working. Both questions are attached.",
        'missing_h2': f"{salutation} Homework 2 is overdue and has not been submitted. Please complete it today and send a clear photo showing your full working. The question is attached.",
        'missing_h1': f"{salutation} Homework 1 is overdue and has not been submitted. Please complete it today and send a clear photo showing your full working. The question is attached.",
        'incomplete_h1_missing_h2': f"{salutation} your Homework 1 answer is still incomplete because it does not show your working, and Homework 2 is also overdue. Please send full working for Homework 1 and complete Homework 2 today. The Homework 2 question is attached.",
        'incomplete_h1': f"{salutation} your Homework 1 answer is still incomplete because it does not show your working. Please send a clear photo showing your full working. The question is attached.",
    }
    return templates[category]


def prepare():
    students = {s['key']: s for s in roster() if s['class'] in ('S3.3', 'S3.4')}
    ledger = json.loads((ROOT / 'state' / 'ledger.json').read_text(encoding='utf-8'))
    decisions = json.loads((ROOT / 'state' / 'decisions.json').read_text(encoding='utf-8'))
    receipts = json.loads((ROOT / 'state' / 'receipts.json').read_text(encoding='utf-8')).get('receipts', {})
    sent_sources = {entry.get('sourceMessageId') for entry in receipts.values() if entry.get('status') == 'sent'}

    events = ledger['processed']
    new_by_student = defaultdict(list)
    for decision in decisions:
        if decision.get('action') != 'submitted' or decision['messageId'] in sent_sources:
            continue
        item = events[decision['messageId']]
        new_by_student[item['studentKey']].append({'messageId': decision['messageId'], 'assignment': item['assignment']})

    labels = {'missing': 'Not submitted', 'awaiting_working': 'Awaiting working', 'submitted': 'Submitted', 'late': 'Submitted'}
    status = defaultdict(dict)
    for key, student in students.items():
        for assignment in (H1, H2):
            row = homework_row(student, assignment)
            if row is None or row['status'] not in labels:
                raise ValueError(f'Platform homework record missing or invalid for {key}: {assignment}')
            status[key][assignment] = labels[row['status']]

    ids_by_student = defaultdict(list)
    for student_key, student in students.items():
        sender_id = student.get('dingtalkId')
        if sender_id and sender_id != CONFIG['selfOpenDingTalkId']:
            ids_by_student[student_key].append(sender_id)
    recent_sender = {}
    for item in events.values():
        if item.get('studentKey') in students and item.get('senderId'):
            recent_sender[item['studentKey']] = item['senderId']

    recipients = []
    candidate_keys = set(ids_by_student) | set(new_by_student)
    for key in sorted(candidate_keys):
        student = students[key]
        h1, h2 = status[key][H1], status[key][H2]
        new = new_by_student.get(key, [])
        new_assignments = {item['assignment'] for item in new}
        category = None
        attachments = []
        working_source = None
        if new_assignments == {H1, H2}:
            category = 'completed_both'
        elif H1 in new_assignments:
            if h2 == 'Submitted':
                category = 'completed_h1'
            else:
                category = 'completed_h1_missing_h2'; attachments = ['Homework 2']
        elif H2 in new_assignments:
            if h1 == 'Submitted':
                category = 'completed_h2'
            elif h1 == 'Awaiting working':
                category = 'incomplete_h1'; attachments = ['Homework 1']
            else:
                category = 'completed_h2_missing_h1'; attachments = ['Homework 1']
        elif key in ids_by_student:
            if h1 == 'Not submitted' and h2 == 'Not submitted':
                category = 'missing_both'; attachments = ['Homework 1', 'Homework 2']
            elif h1 == 'Awaiting working' and h2 == 'Not submitted':
                category = 'incomplete_h1_missing_h2'; attachments = ['Homework 2']
            elif h1 == 'Submitted' and h2 == 'Not submitted':
                category = 'missing_h2'; attachments = ['Homework 2']
            elif h1 == 'Not submitted' and h2 == 'Submitted':
                category = 'missing_h1'; attachments = ['Homework 1']
            elif h1 == 'Awaiting working' and h2 == 'Submitted':
                category = 'incomplete_h1'; attachments = ['Homework 1']
        if not category:
            continue

        recipient_id = None
        if new:
            recipient_id = events[new[-1]['messageId']]['senderId']
        elif recent_sender.get(key) in ids_by_student[key]:
            recipient_id = recent_sender[key]
        elif len(ids_by_student[key]) == 1:
            recipient_id = ids_by_student[key][0]
        if not recipient_id:
            raise ValueError(f'No single verified recipient ID for {key}')

        if h1 == 'Awaiting working':
            candidates = [item for item in events.values() if item.get('studentKey') == key and item.get('assignment') == H1 and item.get('action') == 'needs_work']
            if candidates:
                working_source = sorted(candidates, key=lambda item: item.get('receivedAt', ''))[-1].get('messageId')

        recipients.append({
            'student': {k: student.get(k, '') for k in ('key', 'class', 'rosterNo', 'studentNo', 'name', 'english')},
            'recipientId': recipient_id,
            'category': category,
            'message': make_message(category, student_name(student)),
            'attachments': attachments,
            'completionRecords': new,
            'workingSourceMessageId': working_source,
            'expectedStatus': {'Homework 1': h1, 'Homework 2': h2},
        })

    attachment_meta = {name: {'path': str(path), 'sha256': digest(path)} for name, path in ATTACHMENTS.items()}
    counts = Counter(item['category'] for item in recipients)
    plan = {
        'campaign': CAMPAIGN,
        'status': 'draft',
        'preparedAt': dt.datetime.now(TZ).isoformat(),
        'attachments': attachment_meta,
        'counts': dict(sorted(counts.items())),
        'recipients': recipients,
    }
    save(PLAN, plan)
    print(json.dumps({'plan': str(PLAN), 'totalRecipients': len(recipients), 'counts': plan['counts']}, ensure_ascii=False))


def mark_covered(recipient, delivery):
    if recipient.get('completionRecords'):
        receipt_state = json.loads((ROOT / 'state' / 'receipts.json').read_text(encoding='utf-8'))
        records = submitted_records()
        by_source = {item['sourceMessageId']: key for key, item in records.items()}
        for completion in recipient['completionRecords']:
            key = by_source.get(completion['messageId'])
            if not key:
                raise ValueError('Could not map campaign confirmation to receipt key')
            receipt_state['receipts'][key] = {
                'status': 'sent',
                'sourceMessageId': completion['messageId'],
                'senderId': recipient['recipientId'],
                'idempotencyKey': delivery['idempotencyKey'],
                'text': recipient['message'],
                'openMessageId': delivery['openMessageId'],
                'openConversationId': delivery['openConversationId'],
                'confirmedAt': delivery['confirmedAt'],
                'coveredByCampaign': CAMPAIGN,
            }
        save(ROOT / 'state' / 'receipts.json', receipt_state)

    if recipient.get('workingSourceMessageId'):
        followup_path = ROOT / 'state' / 'working-followups.json'
        followup_state = json.loads(followup_path.read_text(encoding='utf-8')) if followup_path.exists() else {'followups': {}}
        candidates = eligible_records()
        by_source = {item['sourceMessageId']: key for key, item in candidates.items()}
        key = by_source.get(recipient['workingSourceMessageId'])
        if key and followup_state['followups'].get(key, {}).get('status') != 'sent':
            followup_state['followups'][key] = {
                'status': 'sent',
                'sourceMessageId': recipient['workingSourceMessageId'],
                'senderId': recipient['recipientId'],
                'idempotencyKey': delivery['idempotencyKey'],
                'text': recipient['message'],
                'openMessageId': delivery['openMessageId'],
                'openConversationId': delivery['openConversationId'],
                'confirmedAt': delivery['confirmedAt'],
                'coveredByCampaign': CAMPAIGN,
            }
            save(followup_path, followup_state)


def send_campaign():
    plan = json.loads(PLAN.read_text(encoding='utf-8'))
    if plan.get('status') != 'authorized':
        raise RuntimeError('Campaign is not authorized')
    for name, meta in plan['attachments'].items():
        path = Path(meta['path'])
        if digest(path) != meta['sha256']:
            raise ValueError(f'Attachment changed: {name}')

    subprocess.run([sys.executable, str(Path(__file__).with_name('fetch.py'))], check=True, capture_output=True, timeout=300)
    pending = json.loads((ROOT / 'state' / 'pending.json').read_text(encoding='utf-8'))
    if pending['messages']:
        raise RuntimeError(f"{len(pending['messages'])} new messages require review before this campaign can be sent")

    state = json.loads(STATE.read_text(encoding='utf-8')) if STATE.exists() else {'messages': {}, 'skipped': {}}
    completed = 0
    for recipient in plan['recipients']:
        material = CONFIG['profile'] + '\n' + recipient['student']['key'] + '\n' + CAMPAIGN
        base = hashlib.sha256(material.encode()).hexdigest()
        text_key = 'daily-text-' + base
        if not deliver(state, text_key, recipient, ['--content', recipient['message']], STATE):
            raise RuntimeError('Text delivery pending; resume by querying its task')
        delivery = state['messages'][text_key]
        mark_covered(recipient, delivery)
        for label in recipient['attachments']:
            file_key = 'daily-file-' + hashlib.sha256((material + '\n' + label).encode()).hexdigest()
            if not deliver(state, file_key, recipient, ['--msg-type', 'file', '--file', plan['attachments'][label]['path']], STATE):
                raise RuntimeError('Attachment delivery pending; resume by querying its task')
        completed += 1
        print(json.dumps({'completedRecipients': completed, 'studentKey': recipient['student']['key'], 'category': recipient['category']}, ensure_ascii=False), flush=True)
    state.update(status='completed', campaign=CAMPAIGN, completedAt=dt.datetime.now(TZ).isoformat())
    save(STATE, state)
    plan['status'] = 'completed'; plan['completedAt'] = state['completedAt']; save(PLAN, plan)
    print(json.dumps({'completedRecipients': completed, 'totalPlanned': len(plan['recipients'])}, ensure_ascii=False))


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('command', choices=('prepare', 'send'))
    args = parser.parse_args()
    lock = ROOT / 'state' / 'daily-campaign.lock'
    handle = os.open(lock, os.O_CREAT | os.O_EXCL | os.O_WRONLY)
    try:
        prepare() if args.command == 'prepare' else send_campaign()
    finally:
        os.close(handle)
        lock.unlink()
