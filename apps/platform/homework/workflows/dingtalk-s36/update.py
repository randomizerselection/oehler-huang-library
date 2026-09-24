"""Plan and commit DingTalk homework decisions to the platform SQLite database."""
import datetime as dt
import hashlib
import json
import os
import re
import sys
import uuid

from fetch import ROOT, CONFIG, TZ, save, roster
from platform_db import assignment_metadata, backup, connect, require_schema
from absence_followups import explicit_reason, normalize_reason, is_substantive_absence_reason


def load(name):
    return json.loads((ROOT / 'state' / name).read_text(encoding='utf-8'))


def parse_message_time(value):
    return dt.datetime.strptime(value, '%Y-%m-%d %H:%M:%S').replace(tzinfo=TZ)


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


def is_teacher_exception(decision):
    return bool(decision.get('teacherException'))


def verified_student(decision, message, students):
    student = students[decision['studentKey']]
    if is_teacher_exception(decision):
        # A teacher-authorized exception (for example an approved class skip) has no
        # student message behind it; identity is the roster key the teacher named.
        if student['class'] not in CONFIG['classes']:
            raise ValueError(f"Refusing to write for a student outside {CONFIG['classes']}: {student['class']}")
        return student
    permitted = {candidate['key'] for candidate in message.get('candidates', [])}
    linked = student.get('dingtalkId') == message.get('senderId')
    if (len(permitted) != 1 or decision['studentKey'] not in permitted) and not linked:
        raise ValueError('Student identity must be uniquely resolved before writing')
    if student['class'] not in CONFIG['classes']:
        raise ValueError(f"Refusing to write for a student outside {CONFIG['classes']}: {student['class']}")
    return student


def load_batch_decisions(name, batch_id, required):
    path = ROOT / 'state' / name
    if not path.exists():
        if required:
            raise ValueError(f'{name} is missing; re-review state/pending.json')
        return []
    document = json.loads(path.read_text(encoding='utf-8'))
    if (not batch_id or not isinstance(document, dict)
            or not isinstance(document.get('decisions'), list)
            or document.get('batchId') != batch_id):
        raise ValueError('decisions not bound to current fetch batch; re-review state/pending.json')
    return document['decisions']


def prepare():
    batch = load('pending.json')
    batch_id = batch.get('batchId')
    decisions = load_batch_decisions('decisions.json', batch_id, required=True)
    name_decisions = load_batch_decisions('english-name-decisions.json', batch_id, required=False)
    known = {message['messageId']: message for message in batch['messages']}
    if len({(decision.get('messageId'), decision.get('assignment')) for decision in decisions}) != len(decisions):
        raise ValueError('Duplicate message decision (same message and assignment)')
    for decision in decisions:
        if is_teacher_exception(decision):
            if not decision.get('authorizedBy') or not decision.get('evidence'):
                raise ValueError('Teacher exception needs authorizedBy and evidence')
            continue
        if decision['messageId'] not in known:
            raise ValueError('Decision not backed by current batch')
    if len({decision['messageId'] for decision in name_decisions}) != len(name_decisions):
        raise ValueError('Duplicate English-name decision')
    if any(decision['messageId'] not in known for decision in name_decisions):
        raise ValueError('English-name decision not backed by current batch')

    students = {student['key']: student for student in roster()}
    plan = {
        'schemaVersion': None, 'batchId': batch_id, 'end': batch['end'], 'decisions': decisions, 'nameDecisions': name_decisions,
        'homeworkWrites': [], 'nameWrites': [], 'identityLinks': [], 'absenceReviews': [],
    }
    with connect(readonly=True) as db:
        plan['schemaVersion'] = require_schema(db)
        for decision in decisions:
            if decision['action'] not in ('submitted', 'needs_work', 'absence_reason', 'ignore', 'pending'):
                raise ValueError('Unknown decision action')
            if decision['action'] == 'absence_reason':
                if not decision.get('evidence') or not decision.get('studentKey'):
                    raise ValueError('Absence-reason review needs verified student and evidence')
                message = known[decision['messageId']]
                if (not explicit_reason(message.get('text'))
                        or not is_substantive_absence_reason(normalize_reason(message.get('text')))):
                    raise ValueError('Absence-reason review requires an explicit, substantive student reason')
                student = verified_student(decision, message, students)
                captured = message.get('absenceReason') or {}
                row = db.execute('''
                    SELECT f.attendance_log_id,f.reason_text,f.reason_category,
                           f.absence_start_date,f.absence_end_date
                    FROM absence_followups f
                    JOIN selector_attendance_log l ON l.id=f.attendance_log_id
                    WHERE f.status='responded' AND f.response_message_id=?
                      AND l.student_account_id=? AND l.class_id=?
                ''', (decision['messageId'], student['accountId'], student['classId'])).fetchone()
                if (not row or captured.get('attendanceLogId') != row['attendance_log_id']
                        or captured.get('reason') != row['reason_text']
                        or captured.get('category') != row['reason_category']):
                    raise ValueError('Absence reason is not the verified captured platform record')
                plan['absenceReviews'].append({
                    'messageId': decision['messageId'], 'studentKey': student['key'],
                    'attendanceLogId': row['attendance_log_id'], 'reason': row['reason_text'],
                    'category': row['reason_category'],
                    'absenceStartDate': row['absence_start_date'],
                    'absenceEndDate': row['absence_end_date'],
                })
                continue
            if decision['action'] not in ('submitted', 'needs_work'):
                continue
            if decision['action'] == 'submitted' and decision.get('responseFormat') == 'letter_only' and not decision.get('workingPhotoPresent') and not decision.get('teacherAccepted'):
                raise ValueError('Letter-only answer requires working before submission confirmation')
            if not decision.get('evidence') or not decision.get('assignment'):
                raise ValueError('Missing submission evidence/assignment')
            message = known.get(decision['messageId']) if not is_teacher_exception(decision) else None
            student = verified_student(decision, message or {}, students)
            meta = assignment_metadata(decision['assignment'])
            existing = db.execute('''SELECT * FROM homework_submissions
                WHERE class_id=? AND student_account_id=? AND assignment_title=? AND assigned_on=?''',
                (student['classId'], student['accountId'], meta['platformTitle'], meta['assignedDate'])).fetchone()
            old_status = existing['status'] if existing else None
            completed = None
            if decision['action'] == 'submitted' and message:
                completed = parse_message_time(message['time'])
            due = dt.datetime.fromisoformat(meta['dueAt']) if meta.get('dueAt') else None
            late = completed > due if completed and due else None
            status = ('late' if late else 'submitted') if completed else 'awaiting_working'
            if status == 'awaiting_working' and old_status in ('submitted', 'late'):
                continue
            if old_status not in (None, 'missing', 'awaiting_working', 'submitted', 'late'):
                raise ValueError(f'Refusing to replace platform homework status {old_status}')
            evidence = {key: value for key, value in decision.items() if key not in ('studentKey', 'assignment')}
            if evidence.get('teacherException'):
                status = 'submitted'
            plan['homeworkWrites'].append({
                'studentKey': student['key'], 'accountId': student['accountId'], 'classId': student['classId'],
                'assignment': decision['assignment'], 'assignmentTitle': meta['platformTitle'], 'assignedOn': meta['assignedDate'],
                'dueAt': meta.get('dueAt'), 'status': status, 'completedAt': message['time'] if completed else None,
                'isLate': late, 'teacherAccepted': bool(decision.get('teacherAccepted')),
                'sourceMessageId': decision.get('messageId'), 'lastActivityAt': message['time'] if message else None,
                'evidence': evidence, 'oldStatus': old_status,
            })
            if message:
                plan['identityLinks'].append({'accountId': student['accountId'], 'senderId': message['senderId'], 'studentKey': student['key']})

        for decision in name_decisions:
            if not re.fullmatch(r"[A-Za-z][A-Za-z .'-]{0,49}", decision.get('englishName', '')):
                raise ValueError('English name must contain only English letters and common name punctuation')
            message = known[decision['messageId']]
            student = verified_student(decision, message, students)
            current = db.execute('SELECT legal_name,preferred_name FROM accounts WHERE id=?', (student['accountId'],)).fetchone()
            old_name = (current['preferred_name'] or '').strip()
            if old_name and old_name != decision['englishName'] and not decision.get('allowReplace'):
                raise ValueError('Refusing to replace an existing preferred name without explicit correction evidence')
            plan['nameWrites'].append({
                'studentKey': student['key'], 'accountId': student['accountId'],
                'legalName': current['legal_name'] or student['name'], 'englishName': decision['englishName'],
                'oldName': old_name, 'sourceMessageId': decision['messageId'],
            })
            plan['identityLinks'].append({'accountId': student['accountId'], 'senderId': message['senderId'], 'studentKey': student['key']})

    unique_links = {}
    for link in plan['identityLinks']:
        if link['senderId']:
            unique_links[(link['accountId'], link['senderId'])] = link
    plan['identityLinks'] = list(unique_links.values())
    save(ROOT / 'state' / 'plan.json', plan)
    print(json.dumps({
        'platformDatabase': CONFIG['platformDatabase'], 'homeworkWrites': plan['homeworkWrites'],
        'nameWrites': plan['nameWrites'], 'absenceReviews': plan['absenceReviews'],
        'identityLinks': len(plan['identityLinks']),
    }, ensure_ascii=True))


def commit():
    plan, batch = load('plan.json'), load('pending.json')
    if plan.get('batchId') != batch.get('batchId'):
        raise RuntimeError('plan is stale; prepare again')
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
                    conflicting = db.execute("SELECT account_id FROM student_integrations WHERE provider='dingtalk' AND external_id=?", (link['senderId'],)).fetchone()
                    if conflicting and conflicting['account_id'] != link['accountId']:
                        raise ValueError('DingTalk identity is already linked to another platform student')
                    db.execute('''INSERT INTO student_integrations (account_id,provider,external_id,verified_at,metadata_json)
                        VALUES (?,'dingtalk',?,?,?)
                        ON CONFLICT(account_id,provider) DO UPDATE SET external_id=excluded.external_id,verified_at=excluded.verified_at,metadata_json=excluded.metadata_json''',
                        (link['accountId'], link['senderId'], now_utc, json.dumps({'studentKey': link['studentKey']}, ensure_ascii=False)))

                for write in plan.get('nameWrites', []):
                    current = db.execute('SELECT preferred_name FROM accounts WHERE id=?', (write['accountId'],)).fetchone()
                    if not current or (current['preferred_name'] or '').strip() != write['oldName']:
                        raise RuntimeError('Preferred name changed after prepare; prepare again')
                    display_name = f"{write['legalName']} {write['englishName']}".strip()
                    db.execute('UPDATE accounts SET legal_name=?,preferred_name=?,display_name=?,updated_at=? WHERE id=?',
                               (write['legalName'], write['englishName'], display_name, now_utc, write['accountId']))

                for write in plan.get('homeworkWrites', []):
                    current = db.execute('''SELECT * FROM homework_submissions WHERE class_id=? AND student_account_id=? AND assignment_title=? AND assigned_on=?''',
                        (write['classId'], write['accountId'], write['assignmentTitle'], write['assignedOn'])).fetchone()
                    current_status = current['status'] if current else None
                    if current_status != write['oldStatus']:
                        raise RuntimeError('Homework status changed after prepare; prepare again')
                    owner = db.execute('SELECT owner_account_id FROM classes WHERE id=?', (write['classId'],)).fetchone()
                    homework_id = current['id'] if current else f"homework_{uuid.uuid4()}"
                    completed_at = parse_message_time(write['completedAt']).astimezone(dt.timezone.utc).isoformat() if write['completedAt'] else None
                    due_at = dt.datetime.fromisoformat(write['dueAt']).astimezone(dt.timezone.utc).isoformat() if write.get('dueAt') else None
                    last_activity = (parse_message_time(write['lastActivityAt']).astimezone(dt.timezone.utc).isoformat()
                                     if write.get('lastActivityAt') else now_utc)
                    db.execute('''INSERT INTO homework_submissions
                        (id,class_id,student_account_id,assignment_title,assigned_on,due_at,status,completed_at,is_late,teacher_accepted,source,source_message_id,evidence_json,note,confirmation_sent_at,last_activity_at,recorded_by_account_id,recorded_at,updated_at)
                        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
                        ON CONFLICT(class_id,student_account_id,assignment_title,assigned_on) DO UPDATE SET
                          due_at=excluded.due_at,status=excluded.status,
                          completed_at=COALESCE(homework_submissions.completed_at,excluded.completed_at),
                          is_late=COALESCE(homework_submissions.is_late,excluded.is_late),
                          teacher_accepted=MAX(homework_submissions.teacher_accepted,excluded.teacher_accepted),
                          source=excluded.source,source_message_id=excluded.source_message_id,evidence_json=excluded.evidence_json,
                          note=excluded.note,last_activity_at=excluded.last_activity_at,
                          recorded_by_account_id=excluded.recorded_by_account_id,updated_at=excluded.updated_at''',
                        (homework_id, write['classId'], write['accountId'], write['assignmentTitle'], write['assignedOn'], due_at,
                         write['status'], completed_at, None if write['isLate'] is None else int(write['isLate']), int(write['teacherAccepted']),
                         'dingtalk', write['sourceMessageId'], json.dumps(write['evidence'], ensure_ascii=False), None, None,
                         last_activity, owner['owner_account_id'], now_utc, now_utc))
                    event_type = 'working_received' if write['status'] in ('submitted', 'late') and write['oldStatus'] == 'awaiting_working' else ('submitted' if write['status'] in ('submitted', 'late') else 'awaiting_working')
                    db.execute('''INSERT OR IGNORE INTO homework_submission_events
                        (id,homework_submission_id,event_type,provider,external_message_id,occurred_at,evidence_json,recorded_at)
                        VALUES (?,?,?,?,?,?,?,?)''',
                        (f"homework_event_{uuid.uuid4()}", homework_id, event_type, 'dingtalk', write['sourceMessageId'],
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
        seen_mids = set()
        for decision in plan['decisions']:
            if decision['action'] == 'pending':
                continue
            if is_teacher_exception(decision):
                # Message-less exemption: keep an audit record under a synthetic key
                # (plain message IDs stay reserved for real messages).
                synthetic = ('teacher-exception:' + decision['studentKey'] + ':'
                             + hashlib.sha256(str(decision.get('assignment')).encode()).hexdigest()[:8])
                ledger['processed'][synthetic] = {**decision, 'senderId': None, 'receivedAt': None,
                                                  'recordedAt': dt.datetime.now(TZ).isoformat()}
                continue
            message = messages[decision['messageId']]
            # One message can back several assignments (e.g. one photo covering two
            # questions). The first decision keeps the plain messageId key so fetch
            # idempotency matches; later ones get a composite key, stripped again in
            # receipts/working_followups when used as sourceMessageId.
            ledger_key = decision['messageId']
            if ledger_key in seen_mids:
                ledger_key = decision['messageId'] + '~dup-' + hashlib.sha256(str(decision.get('assignment')).encode()).hexdigest()[:8]
            seen_mids.add(decision['messageId'])
            ledger['processed'][ledger_key] = {**decision, **completion_metadata(decision, message), 'senderId': message['senderId'], 'receivedAt': message['time']}
        unresolved = [decision['messageId'] for decision in plan['decisions'] if decision['action'] == 'pending']
        undecided = set(messages) - {decision['messageId'] for decision in plan['decisions'] if decision.get('messageId')}
        if not unresolved and not undecided:
            ledger['checkedThrough'] = plan['end']
        ledger['lastRun'] = dt.datetime.now(TZ).isoformat()
        save(ledger_path, ledger)
        print(json.dumps({
            'database': CONFIG['platformDatabase'], 'backup': backup_path,
            'submitted': sum(decision['action'] == 'submitted' for decision in plan['decisions']),
            'absenceReasons': sum(decision['action'] == 'absence_reason' for decision in plan['decisions']),
            'pending': len(unresolved) + len(undecided), 'homeworkWrites': len(plan.get('homeworkWrites', [])),
            'nameWrites': len(plan.get('nameWrites', [])),
        }))
    finally:
        os.close(handle)
        lock.unlink()


if __name__ == '__main__':
    {'prepare': prepare, 'commit': commit}[sys.argv[1]]()
