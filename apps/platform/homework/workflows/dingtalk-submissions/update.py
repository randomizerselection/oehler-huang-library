"""Plan and commit DingTalk homework decisions to the platform SQLite database."""
import datetime as dt
import hashlib
import json
import os
import re
import sys
import uuid
from pathlib import Path

from fetch import ROOT, CONFIG, TZ, save, roster
from platform_db import (PLATFORM_CLASSES, assignment_metadata, backup,
                         classify_dingtalk_senders, connect,
                         require_in_scope_student, require_schema)

INSPECTION = ROOT / 'state' / 'plan-inspection.json'


def canonical_digest(value):
    material = json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(',', ':'))
    return hashlib.sha256(material.encode('utf-8')).hexdigest()


def plan_digest(plan):
    return canonical_digest({key: value for key, value in plan.items() if key != 'planDigest'})


def row_fingerprint(row, fields):
    if row is None:
        return None
    return canonical_digest({field: row[field] for field in fields})


def validate_plan(plan):
    required = {'schemaVersion', 'batchDigest', 'decisionsDigest', 'nameDecisionsDigest', 'preparedAt', 'decisions',
                'nameDecisions', 'homeworkWrites', 'nameWrites', 'identityLinks', 'outboundIntents', 'planDigest'}
    if not required <= set(plan):
        raise ValueError('Plan is missing required audit fields')
    if plan_digest(plan) != plan['planDigest']:
        raise ValueError('Plan digest mismatch; prepare and inspect again')
    if canonical_digest(plan['decisions']) != plan['decisionsDigest']:
        raise ValueError('Plan decisions digest mismatch')
    if canonical_digest(plan['nameDecisions']) != plan['nameDecisionsDigest']:
        raise ValueError('Plan English-name decisions digest mismatch')


def validate_plan_bindings(plan, batch):
    """Prove that every proposed write and send intent is derived from reviewed evidence."""
    messages = {item['messageId']: item for item in batch.get('messages', [])}
    decisions = plan['decisions']
    name_decisions = {item['messageId']: item for item in plan['nameDecisions']}
    links = plan['identityLinks']
    expected_intents = []
    for write in plan['homeworkWrites']:
        matches = [item for item in decisions
                   if item.get('messageId') == write.get('sourceMessageId')
                   and item.get('studentKey') == write.get('studentKey')
                   and item.get('assignment') == write.get('assignment')]
        decision = matches[0] if len(matches) == 1 else None
        message = messages.get(write.get('sourceMessageId'))
        if not decision or not message:
            raise ValueError('Homework write is not bound to reviewed durable evidence')
        if (decision.get('studentKey') != write.get('studentKey')
                or decision.get('assignment') != write.get('assignment')):
            raise ValueError('Homework write does not match its reviewed decision')
        expected_statuses = {'submitted', 'late'} if decision.get('action') == 'submitted' else {'awaiting_working'}
        if decision.get('action') not in ('submitted', 'needs_work') or write.get('status') not in expected_statuses:
            raise ValueError('Homework write status contradicts its reviewed decision')
        if bool(write.get('teacherAccepted')) != bool(decision.get('teacherAccepted')):
            raise ValueError('Homework teacher-acceptance flag contradicts its reviewed decision')
        if not any(link.get('accountId') == write.get('accountId')
                   and link.get('classId') == write.get('classId')
                   and link.get('studentKey') == write.get('studentKey')
                   and link.get('senderId') == message.get('senderId') for link in links):
            raise ValueError('Homework write is not bound to the evidence sender identity')
        expected_intents.append((
            'working_request' if write['status'] == 'awaiting_working' else 'receipt',
            write['studentKey'], write['assignment'], write['sourceMessageId']))
    for write in plan['nameWrites']:
        decision = name_decisions.get(write.get('sourceMessageId'))
        message = messages.get(write.get('sourceMessageId'))
        if not decision or not message:
            raise ValueError('English-name write is not bound to reviewed durable evidence')
        if (decision.get('studentKey') != write.get('studentKey')
                or decision.get('englishName') != write.get('englishName')):
            raise ValueError('English-name write does not match its reviewed decision')
        if not any(link.get('accountId') == write.get('accountId')
                   and link.get('classId') == write.get('classId')
                   and link.get('studentKey') == write.get('studentKey')
                   and link.get('senderId') == message.get('senderId') for link in links):
            raise ValueError('English-name write is not bound to the evidence sender identity')
        expected_intents.append(('english_name_ack', write['studentKey'], None, write['sourceMessageId']))
    actual_intents = [(item.get('type'), item.get('studentKey'), item.get('assignment'), item.get('sourceMessageId'))
                      for item in plan['outboundIntents']]
    if sorted(expected_intents, key=str) != sorted(actual_intents, key=str):
        raise ValueError('Outbound intents do not exactly match the proposed writes')
    used_links = {(write['accountId'], write['classId'], write['studentKey'])
                  for write in plan['homeworkWrites'] + plan['nameWrites']}
    if any((link.get('accountId'), link.get('classId'), link.get('studentKey')) not in used_links for link in links):
        raise ValueError('Identity link is not required by a reviewed write')


def load(name):
    return json.loads((ROOT / 'state' / name).read_text(encoding='utf-8'))


def parse_message_time(value):
    return dt.datetime.strptime(value, '%Y-%m-%d %H:%M:%S').replace(tzinfo=TZ)


def validate_closed_decision(decision, message, snapshot):
    """Require a later human teacher reply in the same conversation."""
    answer_id = decision.get('answeredByMessageId')
    if not answer_id:
        raise ValueError('Closed conversation decision needs answeredByMessageId')
    conversation_id = message.get('conversationId')
    conversations = snapshot.get('result', {}).get('conversationMessagesList', [])
    conversation = next((item for item in conversations
                         if item.get('openConversationId') == conversation_id), None)
    reply = next((item for item in (conversation or {}).get('messages', [])
                  if (item.get('openMessageId') or item.get('messageId')) == answer_id), None)
    if (not reply or reply.get('senderOpenDingTalkId') != CONFIG['selfOpenDingTalkId']
            or parse_message_time(reply.get('createTime', '1970-01-01 00:00:00'))
            <= parse_message_time(message['time'])):
        raise ValueError('Closed conversation must reference a later teacher reply in the same chat')


def media_evidence(message_id):
    path = ROOT / 'state' / 'media.json'
    records = json.loads(path.read_text(encoding='utf-8')) if path.exists() else []
    matches = [item for item in records if item.get('messageId') == message_id]
    evidence = []
    for item in matches:
        media_path = os.path.abspath(item.get('path', ''))
        if not media_path or not os.path.isfile(media_path):
            continue
        data = Path(media_path).read_bytes()
        valid_magic = data.startswith((b'\xff\xd8\xff', b'\x89PNG\r\n\x1a\n', b'GIF87a', b'GIF89a'))
        if len(data) < 64 or not valid_magic:
            continue
        evidence.append({'path': media_path, 'sha256': hashlib.sha256(data).hexdigest(), 'bytes': len(data)})
    return evidence


def completion_metadata(decision, message):
    if decision['action'] not in ('submitted', 'needs_work'):
        return {}
    meta = assignment_metadata(decision['assignment'])
    completed = parse_message_time(message['time']) if decision['action'] == 'submitted' else None
    due = dt.datetime.fromisoformat(meta['dueAt']) if meta.get('dueAt') else None
    return {
        'statusRecordedAt': dt.datetime.now(TZ).isoformat(),
        'dueAt': meta.get('dueAt'),
        'completedAt': message['time'] if completed else None,
        'isLate': completed > due if completed and due else None,
    }


def verified_student(decision, message, students):
    student = students[decision['studentKey']]
    permitted = {candidate['key'] for candidate in message.get('candidates', [])}
    linked = student.get('dingtalkId') == message.get('senderId')
    if student.get('dingtalkId') and not linked:
        raise ValueError('Decision sender conflicts with the current verified DingTalk identity')
    if (len(permitted) != 1 or decision['studentKey'] not in permitted) and not linked:
        raise ValueError('Student identity must be uniquely resolved before writing')
    return student


def prepare():
    batch, decisions = load('pending.json'), load('decisions.json')
    snapshot = load('latest-response.json') if any(
        decision.get('action') == 'closed' for decision in decisions) else None
    if batch.get('complete') is not True or not batch.get('batchId') or not batch.get('snapshotDigest'):
        raise RuntimeError('Pending evidence is not a complete durable fetch batch')
    name_path = ROOT / 'state' / 'english-name-decisions.json'
    name_decisions = json.loads(name_path.read_text(encoding='utf-8')) if name_path.exists() else []
    known = {message['messageId']: message for message in batch['messages']}
    decision_keys=[(decision['messageId'],decision.get('assignment'),decision.get('action')) for decision in decisions]
    if len(set(decision_keys)) != len(decision_keys):
        raise ValueError('Duplicate message-purpose decision')
    if any(decision['messageId'] not in known for decision in decisions):
        raise ValueError('Decision not backed by current batch')
    if any(not str(decision.get('decisionReason') or '').strip() for decision in decisions):
        raise ValueError('Every decision requires a factual decisionReason')
    if len({decision['messageId'] for decision in name_decisions}) != len(name_decisions):
        raise ValueError('Duplicate English-name decision')
    if any(decision['messageId'] not in known for decision in name_decisions):
        raise ValueError('English-name decision not backed by current batch')
    if any(not str(decision.get('decisionReason') or '').strip() for decision in name_decisions):
        raise ValueError('Every English-name decision requires a factual decisionReason')

    students = {student['key']: student for student in roster()}
    plan = {
        'schemaVersion': None,
        'batchDigest': canonical_digest(batch),
        'decisionsDigest': canonical_digest(decisions),
        'nameDecisionsDigest': canonical_digest(name_decisions),
        'preparedAt': dt.datetime.now(TZ).isoformat(),
        'end': batch['end'], 'decisions': decisions, 'nameDecisions': name_decisions,
        'homeworkWrites': [], 'nameWrites': [], 'identityLinks': [], 'outboundIntents': [],
    }
    with connect(readonly=True) as db:
        plan['schemaVersion'] = require_schema(db)
        for decision in decisions:
            if decision['action'] not in ('submitted', 'needs_work', 'ignore', 'pending', 'out_of_scope', 'closed'):
                raise ValueError('Unknown decision action')
            message = known[decision['messageId']]
            if decision['action'] == 'closed':
                validate_closed_decision(decision, message, snapshot)
                continue
            sender_classes = set(classify_dingtalk_senders([message.get('senderId')], connection=db).get(message.get('senderId'), []))
            in_scope_sender = bool(sender_classes.intersection(PLATFORM_CLASSES))
            if decision['action'] == 'out_of_scope':
                if not sender_classes or in_scope_sender:
                    raise ValueError('Out-of-scope decision requires a verified platform identity outside S3.3/S3.4')
                continue
            if decision['action'] == 'ignore' and not in_scope_sender:
                raise ValueError('Unresolved or out-of-scope identity cannot be ignored; keep it pending or classify it out_of_scope')
            if decision['action'] not in ('submitted', 'needs_work'):
                continue
            if decision['action'] == 'submitted' and decision.get('responseFormat') == 'letter_only' and not decision.get('workingPhotoPresent') and not decision.get('teacherAccepted'):
                raise ValueError('Letter-only answer requires working before submission confirmation')
            if not decision.get('evidence') or not decision.get('assignment'):
                raise ValueError('Missing submission evidence/assignment')
            evidence_references = []
            if re.search(r'图片消息|mediaId=', message.get('text', ''), re.I):
                evidence_references = media_evidence(decision['messageId'])
                if not evidence_references:
                    raise ValueError('Image evidence is missing or unreadable; keep the decision pending')
            student = verified_student(decision, message, students)
            meta = assignment_metadata(decision['assignment'])
            existing = db.execute('''SELECT * FROM homework_submissions
                WHERE class_id=? AND student_account_id=? AND assignment_title=? AND assigned_on=?''',
                (student['classId'], student['accountId'], meta['platformTitle'], meta['assignedDate'])).fetchone()
            old_status = existing['status'] if existing else None
            completed = parse_message_time(message['time']) if decision['action'] == 'submitted' else None
            due = dt.datetime.fromisoformat(meta['dueAt']) if meta.get('dueAt') else None
            late = completed > due if completed and due else None
            status = ('late' if late else 'submitted') if completed else 'awaiting_working'
            if status == 'awaiting_working' and old_status in ('submitted', 'late'):
                continue
            # A completed or teacher-accepted platform record is authoritative.
            # Later duplicate messages remain auditable in the ledger but must not
            # replace its evidence, source, timestamps, or teacher decision.
            if existing and (existing['teacher_accepted'] or old_status in ('submitted', 'late')):
                continue
            if old_status not in (None, 'missing', 'awaiting_working', 'submitted', 'late'):
                raise ValueError(f'Refusing to replace platform homework status {old_status}')
            evidence = {key: value for key, value in decision.items() if key not in ('studentKey', 'assignment')}
            if evidence_references:
                evidence['evidenceReferences'] = evidence_references
            plan['homeworkWrites'].append({
                'studentKey': student['key'], 'accountId': student['accountId'], 'classId': student['classId'],
                'assignment': decision['assignment'], 'assignmentTitle': meta['platformTitle'], 'assignedOn': meta['assignedDate'],
                'dueAt': meta.get('dueAt'), 'status': status, 'completedAt': message['time'] if completed else None,
                'isLate': late, 'teacherAccepted': bool(decision.get('teacherAccepted')),
                'sourceMessageId': decision['messageId'], 'lastActivityAt': message['time'],
                'evidence': evidence, 'oldStatus': old_status,
                'evidenceReferences': evidence_references,
                'oldFingerprint': row_fingerprint(existing, (
                    'id', 'status', 'completed_at', 'is_late', 'teacher_accepted',
                    'source_message_id', 'confirmation_sent_at', 'updated_at')),
            })
            current_link = db.execute("SELECT external_id FROM student_integrations WHERE account_id=? AND provider='dingtalk'", (student['accountId'],)).fetchone()
            plan['identityLinks'].append({'accountId': student['accountId'], 'classId': student['classId'],
                                          'senderId': message['senderId'], 'studentKey': student['key'],
                                          'oldExternalId': current_link['external_id'] if current_link else None})
            plan['outboundIntents'].append({
                'type': 'working_request' if status == 'awaiting_working' else 'receipt',
                'studentKey': student['key'], 'assignment': decision['assignment'],
                'sourceMessageId': decision['messageId']
            })

        for decision in name_decisions:
            if not re.fullmatch(r"[A-Za-z][A-Za-z .'-]{0,49}", decision.get('englishName', '')):
                raise ValueError('English name must contain only English letters and common name punctuation')
            message = known[decision['messageId']]
            student = verified_student(decision, message, students)
            current = db.execute('SELECT legal_name,preferred_name,display_name,updated_at FROM accounts WHERE id=?', (student['accountId'],)).fetchone()
            old_name = (current['preferred_name'] or '').strip()
            if old_name and old_name != decision['englishName'] and not decision.get('allowReplace'):
                raise ValueError('Refusing to replace an existing preferred name without explicit correction evidence')
            plan['nameWrites'].append({
                'studentKey': student['key'], 'accountId': student['accountId'],
                'classId': student['classId'],
                'legalName': current['legal_name'] or student['name'], 'englishName': decision['englishName'],
                'oldName': old_name, 'sourceMessageId': decision['messageId'],
                'oldFingerprint': row_fingerprint(current, ('legal_name', 'preferred_name', 'display_name', 'updated_at')),
            })
            current_link = db.execute("SELECT external_id FROM student_integrations WHERE account_id=? AND provider='dingtalk'", (student['accountId'],)).fetchone()
            plan['identityLinks'].append({'accountId': student['accountId'], 'classId': student['classId'],
                                          'senderId': message['senderId'], 'studentKey': student['key'],
                                          'oldExternalId': current_link['external_id'] if current_link else None})
            plan['outboundIntents'].append({'type': 'english_name_ack', 'studentKey': student['key'],
                                             'sourceMessageId': decision['messageId']})

    unique_links = {}
    for link in plan['identityLinks']:
        if link['senderId']:
            unique_links[(link['accountId'], link['senderId'])] = link
    plan['identityLinks'] = list(unique_links.values())
    plan['planDigest'] = plan_digest(plan)
    save(ROOT / 'state' / 'plan.json', plan)
    if INSPECTION.exists():
        INSPECTION.unlink()
    print(json.dumps({
        'platformDatabase': CONFIG['platformDatabase'], 'homeworkWrites': plan['homeworkWrites'],
        'nameWrites': plan['nameWrites'], 'identityLinks': len(plan['identityLinks']),
        'outboundIntents': plan['outboundIntents'], 'planDigest': plan['planDigest'],
    }, ensure_ascii=True))


def inspect_plan():
    plan, batch = load('plan.json'), load('pending.json')
    validate_plan(plan)
    validate_plan_bindings(plan, batch)
    inspection = {
        'planDigest': plan['planDigest'],
        'batchDigest': plan['batchDigest'],
        'inspectedAt': dt.datetime.now(TZ).isoformat(),
        'status': 'inspected',
    }
    save(INSPECTION, inspection)
    print(json.dumps(plan, ensure_ascii=True, indent=2))


def commit():
    plan, batch = load('plan.json'), load('pending.json')
    validate_plan(plan)
    validate_plan_bindings(plan, batch)
    inspection = json.loads(INSPECTION.read_text(encoding='utf-8')) if INSPECTION.exists() else {}
    if inspection.get('status') != 'inspected' or inspection.get('planDigest') != plan['planDigest']:
        raise RuntimeError('Plan has not been explicitly inspected; run update.py inspect')
    if canonical_digest(batch) != plan['batchDigest']:
        raise RuntimeError('Pending batch changed after prepare; prepare and inspect again')
    if canonical_digest(load('decisions.json')) != plan['decisionsDigest']:
        raise RuntimeError('Decisions changed after prepare; prepare and inspect again')
    current_name_decisions = json.loads((ROOT / 'state' / 'english-name-decisions.json').read_text(encoding='utf-8')) if (ROOT / 'state' / 'english-name-decisions.json').exists() else []
    if canonical_digest(current_name_decisions) != plan['nameDecisionsDigest']:
        raise RuntimeError('English-name decisions changed after prepare; prepare and inspect again')
    lock = ROOT / 'state' / 'update.lock'
    handle = os.open(lock, os.O_CREAT | os.O_EXCL | os.O_WRONLY)
    try:
        writes = bool(plan.get('homeworkWrites') or plan.get('nameWrites') or plan.get('identityLinks'))
        backup_path = str(backup()) if writes else None
        now_utc = dt.datetime.now(dt.timezone.utc).isoformat()
        with connect() as db:
            db.execute('BEGIN IMMEDIATE')
            try:
                if require_schema(db) != plan['schemaVersion']:
                    raise RuntimeError('Platform schema changed; prepare again')
                for link in plan.get('identityLinks', []):
                    require_in_scope_student(link['accountId'], link['classId'], connection=db)
                    if not link.get('senderId') or link['senderId'] == CONFIG['selfOpenDingTalkId']:
                        raise ValueError('Invalid DingTalk identity link in inspected plan')
                    current_link = db.execute("SELECT external_id FROM student_integrations WHERE account_id=? AND provider='dingtalk'", (link['accountId'],)).fetchone()
                    current_external_id = current_link['external_id'] if current_link else None
                    if current_external_id != link.get('oldExternalId'):
                        # A previous commit may have reached SQLite before the
                        # local ledger/inspection files were finalized.
                        if current_external_id == link['senderId'] and link.get('oldExternalId') is None:
                            continue
                        raise RuntimeError('DingTalk identity changed after prepare; prepare again')
                    if current_external_id not in (None, link['senderId']):
                        raise ValueError('Refusing to replace an existing verified DingTalk identity')
                    conflicting = db.execute("SELECT account_id FROM student_integrations WHERE provider='dingtalk' AND external_id=?", (link['senderId'],)).fetchone()
                    if conflicting and conflicting['account_id'] != link['accountId']:
                        raise ValueError('DingTalk identity is already linked to another platform student')
                    if current_external_id is None:
                        db.execute('''INSERT INTO student_integrations (account_id,provider,external_id,verified_at,metadata_json)
                            VALUES (?,'dingtalk',?,?,?)''',
                            (link['accountId'], link['senderId'], now_utc, json.dumps({'studentKey': link['studentKey']}, ensure_ascii=False)))

                for write in plan.get('nameWrites', []):
                    require_in_scope_student(write['accountId'], write['classId'], connection=db)
                    current = db.execute('SELECT legal_name,preferred_name,display_name,updated_at FROM accounts WHERE id=?', (write['accountId'],)).fetchone()
                    if not current or row_fingerprint(current, ('legal_name', 'preferred_name', 'display_name', 'updated_at')) != write['oldFingerprint']:
                        expected_display = f"{write['legalName']} {write['englishName']}".strip()
                        already_applied = current and (
                            current['legal_name'] == write['legalName']
                            and current['preferred_name'] == write['englishName']
                            and current['display_name'] == expected_display)
                        if already_applied:
                            continue
                        raise RuntimeError('Preferred name changed after prepare; prepare again')
                    display_name = f"{write['legalName']} {write['englishName']}".strip()
                    db.execute('UPDATE accounts SET legal_name=?,preferred_name=?,display_name=?,updated_at=? WHERE id=?',
                               (write['legalName'], write['englishName'], display_name, now_utc, write['accountId']))

                for write in plan.get('homeworkWrites', []):
                    require_in_scope_student(write['accountId'], write['classId'], connection=db)
                    current = db.execute('''SELECT * FROM homework_submissions WHERE class_id=? AND student_account_id=? AND assignment_title=? AND assigned_on=?''',
                        (write['classId'], write['accountId'], write['assignmentTitle'], write['assignedOn'])).fetchone()
                    current_status = current['status'] if current else None
                    current_fingerprint = row_fingerprint(current, (
                        'id', 'status', 'completed_at', 'is_late', 'teacher_accepted',
                        'source_message_id', 'confirmation_sent_at', 'updated_at'))
                    if current_status != write['oldStatus'] or current_fingerprint != write['oldFingerprint']:
                        already_applied = current and (
                            current['status'] == write['status']
                            and current['source_message_id'] == write['sourceMessageId']
                            and int(current['teacher_accepted'] or 0) >= int(write['teacherAccepted']))
                        if already_applied:
                            continue
                        raise RuntimeError('Homework status changed after prepare; prepare again')
                    if current and current['teacher_accepted']:
                        raise RuntimeError('Teacher-accepted homework changed after prepare; refusing automated write')
                    owner = db.execute('SELECT owner_account_id FROM classes WHERE id=?', (write['classId'],)).fetchone()
                    homework_id = current['id'] if current else f"homework_{uuid.uuid4()}"
                    completed_at = parse_message_time(write['completedAt']).astimezone(dt.timezone.utc).isoformat() if write['completedAt'] else None
                    due_at = dt.datetime.fromisoformat(write['dueAt']).astimezone(dt.timezone.utc).isoformat() if write.get('dueAt') else None
                    last_activity = parse_message_time(write['lastActivityAt']).astimezone(dt.timezone.utc).isoformat()
                    db.execute('''INSERT INTO homework_submissions
                        (id,class_id,student_account_id,assignment_title,assigned_on,due_at,status,completed_at,is_late,teacher_accepted,source,source_message_id,evidence_json,note,confirmation_sent_at,last_activity_at,recorded_by_account_id,recorded_at,updated_at)
                        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
                        ON CONFLICT(class_id,student_account_id,assignment_title,assigned_on) DO UPDATE SET
                          due_at=excluded.due_at,status=excluded.status,
                          completed_at=COALESCE(homework_submissions.completed_at,excluded.completed_at),
                          is_late=COALESCE(homework_submissions.is_late,excluded.is_late),
                          teacher_accepted=MAX(homework_submissions.teacher_accepted,excluded.teacher_accepted),
                          source=excluded.source,source_message_id=excluded.source_message_id,evidence_json=excluded.evidence_json,
                          last_activity_at=excluded.last_activity_at,
                          recorded_by_account_id=excluded.recorded_by_account_id,updated_at=excluded.updated_at''',
                        (homework_id, write['classId'], write['accountId'], write['assignmentTitle'], write['assignedOn'], due_at,
                         write['status'], completed_at, None if write['isLate'] is None else int(write['isLate']), int(write['teacherAccepted']),
                         'dingtalk', write['sourceMessageId'], json.dumps(write['evidence'], ensure_ascii=False), None, None,
                         last_activity, owner['owner_account_id'], now_utc, now_utc))
                    event_type = 'working_received' if write['status'] in ('submitted', 'late') and write['oldStatus'] == 'awaiting_working' else ('submitted' if write['status'] in ('submitted', 'late') else 'awaiting_working')
                    db.execute('''INSERT OR IGNORE INTO homework_submission_events
                        (id,homework_submission_id,event_type,provider,external_message_id,occurred_at,evidence_json,recorded_at)
                        VALUES (?,?,?,?,?,?,?,?)''',
                        ('homework_event_' + hashlib.sha256((homework_id + '\n' + event_type + '\n' + write['sourceMessageId']).encode()).hexdigest()[:32],
                         homework_id, event_type, 'dingtalk', write['sourceMessageId'],
                         last_activity, json.dumps(write['evidence'], ensure_ascii=False), now_utc))
                db.commit()
            except Exception:
                db.rollback()
                raise

        if plan.get('nameDecisions'):
            name_state_path = ROOT / 'state' / 'english-name-updates.json'
            name_state = json.loads(name_state_path.read_text(encoding='utf-8')) if name_state_path.exists() else {'updates': {}}
            messages = {message['messageId']: message for message in batch['messages']}
            for decision in plan['nameDecisions']:
                message = messages[decision['messageId']]
                previous = name_state['updates'].get(decision['messageId'], {})
                name_state['updates'][decision['messageId']] = {
                    **previous, **decision, 'status': 'saved', 'senderId': message['senderId'], 'receivedAt': message['time'],
                    'savedAt': previous.get('savedAt') or dt.datetime.now(TZ).isoformat(), 'storage': 'platform-database',
                }
            save(name_state_path, name_state)

        ledger_path = ROOT / 'state' / 'ledger.json'
        ledger = json.loads(ledger_path.read_text(encoding='utf-8')) if ledger_path.exists() else {'processed': {}}
        messages = {message['messageId']: message for message in batch['messages']}
        decision_counts={}
        for decision in plan['decisions']:
            decision_counts[decision['messageId']]=decision_counts.get(decision['messageId'],0)+1
        for decision in plan['decisions']:
            if decision['action'] == 'pending':
                continue
            message = messages[decision['messageId']]
            ledger_key=decision['messageId']
            if decision_counts[decision['messageId']]>1:
                purpose=decision.get('assignment') or decision['action']
                ledger_key=decision['messageId']+'#'+hashlib.sha256(purpose.encode()).hexdigest()[:12]
            ledger['processed'][ledger_key] = {**decision, **completion_metadata(decision, message), 'senderId': message['senderId'], 'receivedAt': message['time']}
        unresolved = [decision['messageId'] for decision in plan['decisions'] if decision['action'] == 'pending']
        undecided = set(messages) - {decision['messageId'] for decision in plan['decisions']}
        if not unresolved and not undecided:
            ledger['checkedThrough'] = plan['end']
        ledger['lastRun'] = dt.datetime.now(TZ).isoformat()
        save(ledger_path, ledger)
        inspection.update(status='committed', committedAt=dt.datetime.now(TZ).isoformat())
        save(INSPECTION, inspection)
        print(json.dumps({
            'database': CONFIG['platformDatabase'], 'backup': backup_path,
            'submitted': sum(decision['action'] == 'submitted' for decision in plan['decisions']),
            'pending': len(unresolved) + len(undecided), 'homeworkWrites': len(plan.get('homeworkWrites', [])),
            'nameWrites': len(plan.get('nameWrites', [])),
        }))
    finally:
        os.close(handle)
        lock.unlink()


if __name__ == '__main__':
    commands = {'prepare': prepare, 'inspect': inspect_plan, 'commit': commit}
    if len(sys.argv) != 2 or sys.argv[1] not in commands:
        raise SystemExit('Usage: update.py {prepare|inspect|commit}')
    commands[sys.argv[1]]()
