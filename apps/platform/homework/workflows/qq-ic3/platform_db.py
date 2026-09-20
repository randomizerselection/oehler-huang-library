"""Shared access to the Oehler-Huang platform student database."""
import datetime as dt
import json
import os
import re
import sqlite3
from pathlib import Path

# Fixture copies keep local config; production data is registered privately.
SOURCE_ROOT = Path(__file__).resolve().parent
if (SOURCE_ROOT / 'config.json').is_file():
    ROOT = SOURCE_ROOT
else:
    import sys
    sys.path.insert(0, str(SOURCE_ROOT.parents[1]))
    from runtime import runtime_root
    ROOT = runtime_root('qq-ic3', SOURCE_ROOT)
# Tests point QQ_CONFIG_PATH at a fixture config; default behaviour is unchanged.
CONFIG_PATH = Path(os.environ['QQ_CONFIG_PATH']) if os.environ.get('QQ_CONFIG_PATH') else ROOT / 'config.json'
CONFIG = json.loads(CONFIG_PATH.read_text(encoding='utf-8'))
TZ = dt.timezone(dt.timedelta(hours=8))
DB_PATH = Path(CONFIG['platformDatabase'])
PLATFORM_CLASSES = tuple(CONFIG.get('classes', ['IC3.1', 'IC3.2', 'IC3 Investment']))


def connect(readonly=False):
    if not DB_PATH.exists():
        raise FileNotFoundError(f'Platform database not found: {DB_PATH}')
    target = f'file:{DB_PATH.as_posix()}?mode=ro' if readonly else str(DB_PATH)
    connection = sqlite3.connect(target, uri=readonly, timeout=15)
    connection.row_factory = sqlite3.Row
    connection.execute('PRAGMA foreign_keys=ON')
    connection.execute('PRAGMA busy_timeout=15000')
    return connection


def schema_version(connection=None):
    owned = connection is None
    connection = connection or connect(readonly=True)
    try:
        return int(connection.execute('PRAGMA user_version').fetchone()[0])
    finally:
        if owned:
            connection.close()


def require_schema(connection=None, minimum=15):
    version = schema_version(connection)
    if version < minimum:
        raise RuntimeError(f'Platform database schema v{minimum} is required; found v{version}')
    return version


def backup(label='qq-write'):
    backup_dir = DB_PATH.parent / 'backups'
    backup_dir.mkdir(parents=True, exist_ok=True)
    stamp = dt.datetime.now(TZ).strftime('%Y%m%d-%H%M%S-%f')
    destination = backup_dir / f'{label}-{stamp}.sqlite'
    with connect(readonly=True) as source, sqlite3.connect(destination) as target:
        source.backup(target)
    return destination


def roster(classes=PLATFORM_CLASSES):
    placeholders = ','.join('?' for _ in classes)
    with connect(readonly=True) as db:
        require_schema(db)
        rows = db.execute(f'''
            SELECT c.id AS class_id,c.name AS class_name,m.roster_number,
                   a.id AS account_id,a.student_id,a.form_class,a.legal_name,a.preferred_name,a.display_name,
                   si.external_id AS qq_id
            FROM class_memberships m
            JOIN classes c ON c.id=m.class_id
            JOIN accounts a ON a.id=m.account_id
            LEFT JOIN student_integrations si ON si.account_id=a.id AND si.provider='qq'
            WHERE m.status='active' AND a.status='active' AND a.role='student'
              AND c.name IN ({placeholders})
            ORDER BY c.name,CASE WHEN m.roster_number IS NULL THEN 1 ELSE 0 END,m.roster_number,a.student_id
        ''', tuple(classes)).fetchall()
    result = []
    for row in rows:
        legal = (row['legal_name'] or '').strip()
        preferred = (row['preferred_name'] or '').strip()
        if not legal:
            match = re.match(r'^([\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]+)(?:\s+(.*))?$', row['display_name'] or '')
            legal = match.group(1) if match else (row['display_name'] or '').strip()
            preferred = preferred or ((match.group(2) or '').strip() if match else '')
        roster_number = '' if row['roster_number'] is None else str(row['roster_number'])
        result.append({
            'key': f"{row['class_name']}|{roster_number}|{legal}",
            'accountId': row['account_id'],
            'classId': row['class_id'],
            'class': row['class_name'],
            'rosterNo': roster_number,
            'studentNo': row['student_id'] or '',
            'formClass': row['form_class'],
            'name': legal,
            'english': preferred,
            'qqId': row['qq_id'] or '',
        })
    return result


def student_by_key(key, connection=None):
    matches = [student for student in roster() if student['key'] == key]
    if len(matches) != 1:
        raise ValueError(f'Platform student key is missing or ambiguous: {key}')
    return matches[0]


def assignment_metadata(header):
    catalog = json.loads((ROOT / 'assignments.json').read_text(encoding='utf-8'))
    matches = [item for item in catalog if item['header'] == header]
    if len(matches) != 1:
        raise ValueError(f'Assignment header is missing or ambiguous: {header}')
    item = matches[0]
    return {**item, 'platformTitle': item.get('platformTitle') or header.split('\n', 1)[-1]}


def homework_row(student, assignment_header, connection=None):
    meta = assignment_metadata(assignment_header)
    owned = connection is None
    connection = connection or connect(readonly=True)
    try:
        return connection.execute('''
            SELECT * FROM homework_submissions
            WHERE class_id=? AND student_account_id=? AND assignment_title=? AND assigned_on=?
        ''', (student['classId'], student['accountId'], meta['platformTitle'], meta['assignedDate'])).fetchone()
    finally:
        if owned:
            connection.close()


def verify_homework(student_key, assignment_header, expected=None):
    student = student_by_key(student_key)
    row = homework_row(student, assignment_header)
    if row is None:
        raise ValueError('Homework record is missing from the platform database')
    allowed = set(expected or ('submitted', 'late'))
    if row['status'] not in allowed:
        raise ValueError(f"Unexpected platform homework status: {row['status']}")
    return dict(row)


def verify_score(student_key, assignment_header, expected_score=None):
    """Return the saved homework row, asserting the committed grade is present."""
    row = verify_homework(student_key, assignment_header, expected=('submitted', 'late'))
    if row.get('score') is None or row.get('score_max') is None:
        raise ValueError('Saved homework record has no recorded score')
    if expected_score is not None and int(row['score']) != int(expected_score):
        raise ValueError(f"Saved score {row['score']} does not match the graded decision {expected_score}")
    return row


def verify_preferred_name(student_key, expected):
    student = student_by_key(student_key)
    if student['english'] != expected:
        raise ValueError('Preferred name is not saved in the platform database')
    return student


def mark_confirmation(student_key, assignment_header, confirmed_at, source_message_id=None):
    student = student_by_key(student_key)
    meta = assignment_metadata(assignment_header)
    with connect() as db:
        require_schema(db)
        result = db.execute('''
            UPDATE homework_submissions
            SET confirmation_sent_at=COALESCE(confirmation_sent_at,?),updated_at=?
            WHERE class_id=? AND student_account_id=? AND assignment_title=? AND assigned_on=?
              AND status IN ('submitted','late')
        ''', (confirmed_at, dt.datetime.now(dt.timezone.utc).isoformat(), student['classId'], student['accountId'], meta['platformTitle'], meta['assignedDate']))
        if result.rowcount != 1:
            raise ValueError('Could not mark confirmation on a submitted platform homework record')
        row = db.execute('''SELECT id FROM homework_submissions WHERE class_id=? AND student_account_id=? AND assignment_title=? AND assigned_on=?''',
                         (student['classId'], student['accountId'], meta['platformTitle'], meta['assignedDate'])).fetchone()
        db.execute('''INSERT OR IGNORE INTO homework_submission_events
            (id,homework_submission_id,event_type,provider,external_message_id,occurred_at,evidence_json,recorded_at)
            VALUES (?,?,?,?,?,?,?,?)''',
            (f"event-confirmation-{row['id']}", row['id'], 'confirmation_sent', 'qq', source_message_id,
             confirmed_at, None, dt.datetime.now(dt.timezone.utc).isoformat()))


def current_counts():
    placeholders = ','.join('?' for _ in PLATFORM_CLASSES)
    with connect(readonly=True) as db:
        require_schema(db)
        rows = db.execute(f'''SELECT h.status,COUNT(*) AS count FROM homework_submissions h
            JOIN classes c ON c.id=h.class_id WHERE c.name IN ({placeholders}) GROUP BY h.status''', PLATFORM_CLASSES).fetchall()
    return {row['status']: row['count'] for row in rows}
