"""Fixture builders for the qq-ic3 regression tests.

Every test copies the automation scripts into a temp directory so ROOT (and
therefore state/) is fully isolated from the real automation directory.
"""
import datetime as dt
import hashlib
import importlib
import json
import os
import shutil
import sqlite3
import subprocess
import sys
import tempfile
from pathlib import Path
from types import SimpleNamespace

HERE = Path(__file__).resolve().parent
REAL_DIR = HERE.parent
SCRIPTS = ['fetch.py', 'platform_db.py', 'update.py', 'receipts.py',
           'working_followups.py', 'english_name_ack.py', 'reply_queue.py',
           'personal_requests.py', 'run_guard.py', 'media.py', 'reminders.py',
           'feedback.py', 'ocr_evidence.py']
MODULES = [s[:-3] for s in SCRIPTS]

TZ = dt.timezone(dt.timedelta(hours=8))
HEADER = '15 Sep 2026\nInflationary gap (Q19)'
PLATFORM_TITLE = 'Inflationary gap (Q19)'
ASSIGNED_ON = '2026-09-15'
DUE_AT = '2026-09-17T23:59:00+08:00'
HW2_HEADER = '18 Sep 2026\nDeflationary gap (9708/31 Q18)'

# The real qq-ic3 assignments.json starts empty (IC3 assignments are added when
# identifiable), so tests carry their own catalog.
FIXTURE_ASSIGNMENTS = [
    {'header': HEADER, 'platformTitle': PLATFORM_TITLE, 'displayName': 'Homework 1',
     'assignedDate': ASSIGNED_ON, 'dueAt': DUE_AT, 'maxScore': 8,
     'feedbackImage': 'attachments/model-answer.png',
     'description': 'Question 19: closed economy without government; C = 100 + 0.8Y, I = 100.',
     'rule': 'Mark Submitted when the student provides an answer with working. '
             'A letter-only answer without working is Awaiting working.'},
    {'header': HW2_HEADER, 'platformTitle': 'Deflationary gap (9708/31 Q18)',
     'displayName': 'Homework 2', 'assignedDate': '2026-09-18',
     'dueAt': '2026-09-18T23:59:00+08:00',
     'description': 'Cambridge 9708/31 Q18: equilibrium income $25m, full employment $30m, MPC 4/5.',
     'rule': 'Mark Submitted when the student provides an answer with working. '
             'A letter-only answer without working is Awaiting working.'},
]

CLASS_IC31, CLASS_S36 = 'class-ic31', 'class-s36'
OWNER = 'acct-owner'
EMMA = {'accountId': 'acct-emma', 'key': 'IC3.1|1|张梦', 'qqId': 'QQ_EMMA', 'english': 'Emma'}
LEO = {'accountId': 'acct-leo', 'key': 'IC3.1|2|李雷', 'qqId': 'QQ_LEO', 'english': ''}
WENDY = {'accountId': 'acct-wendy', 'key': 'S3.6|1|王芳', 'qqId': 'QQ_WENDY', 'english': 'Wendy'}


def build_db(path):
    connection = sqlite3.connect(path)
    connection.executescript('''
        CREATE TABLE classes (id TEXT PRIMARY KEY, name TEXT, owner_account_id TEXT);
        CREATE TABLE accounts (id TEXT PRIMARY KEY, student_id TEXT, form_class TEXT,
            legal_name TEXT, preferred_name TEXT, display_name TEXT,
            status TEXT, role TEXT, updated_at TEXT);
        CREATE TABLE class_memberships (class_id TEXT, account_id TEXT,
            roster_number INTEGER, status TEXT);
        CREATE TABLE student_integrations (account_id TEXT, provider TEXT, external_id TEXT,
            verified_at TEXT, metadata_json TEXT, PRIMARY KEY (account_id, provider));
        CREATE TABLE homework_submissions (id TEXT PRIMARY KEY, class_id TEXT,
            student_account_id TEXT, assignment_title TEXT, assigned_on TEXT, due_at TEXT,
            status TEXT, completed_at TEXT, is_late INTEGER, teacher_accepted INTEGER,
            source TEXT, source_message_id TEXT, evidence_json TEXT, note TEXT,
            confirmation_sent_at TEXT, last_activity_at TEXT, recorded_by_account_id TEXT,
            recorded_at TEXT, updated_at TEXT, score INTEGER, score_max INTEGER,
            feedback TEXT, graded_at TEXT,
            UNIQUE (class_id, student_account_id, assignment_title, assigned_on));
        CREATE TABLE homework_submission_events (id TEXT PRIMARY KEY,
            homework_submission_id TEXT, event_type TEXT, provider TEXT,
            external_message_id TEXT, occurred_at TEXT, evidence_json TEXT, recorded_at TEXT);
    ''')
    connection.execute('PRAGMA user_version=19')
    connection.executemany('INSERT INTO classes VALUES (?,?,?)',
                           [(CLASS_IC31, 'IC3.1', OWNER), (CLASS_S36, 'S3.6', OWNER)])
    connection.executemany('INSERT INTO accounts VALUES (?,?,?,?,?,?,?,?,?)', [
        (OWNER, None, None, 'Teacher', None, 'Teacher', 'active', 'teacher', None),
        (EMMA['accountId'], 'STU-3001', '1', '张梦', 'Emma', '张梦 Emma', 'active', 'student', None),
        (LEO['accountId'], 'STU-3002', '1', '李雷', '', '李雷', 'active', 'student', None),
        (WENDY['accountId'], '20246001', '6', '王芳', 'Wendy', '王芳 Wendy', 'active', 'student', None),
    ])
    connection.executemany('INSERT INTO class_memberships VALUES (?,?,?,?)', [
        (CLASS_IC31, EMMA['accountId'], 1, 'active'),
        (CLASS_IC31, LEO['accountId'], 2, 'active'),
        (CLASS_S36, WENDY['accountId'], 1, 'active'),
    ])
    connection.executemany('INSERT INTO student_integrations VALUES (?,?,?,?,?)', [
        (EMMA['accountId'], 'qq', EMMA['qqId'], '2026-09-15T00:00:00+00:00', None),
        (LEO['accountId'], 'qq', LEO['qqId'], '2026-09-15T00:00:00+00:00', None),
        (WENDY['accountId'], 'qq', WENDY['qqId'], '2026-09-15T00:00:00+00:00', None),
    ])
    connection.commit()
    connection.close()


def insert_homework(db_path, student, status, teacher_accepted=0, row_id='hw-1'):
    connection = sqlite3.connect(db_path)
    class_id = CLASS_IC31 if student is not WENDY else CLASS_S36
    connection.execute(
        'INSERT OR IGNORE INTO homework_submissions (id,class_id,student_account_id,assignment_title,'
        'assigned_on,status,teacher_accepted,recorded_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?)',
        (row_id, class_id, student['accountId'], PLATFORM_TITLE, ASSIGNED_ON, status,
         teacher_accepted, '2026-09-16T00:00:00+00:00', '2026-09-16T00:00:00+00:00'))
    connection.commit()
    connection.close()


def homework_row(db_path, student=EMMA):
    connection = sqlite3.connect(db_path)
    connection.row_factory = sqlite3.Row
    row = connection.execute(
        'SELECT * FROM homework_submissions WHERE student_account_id=? AND assignment_title=? AND assigned_on=?',
        (student['accountId'], PLATFORM_TITLE, ASSIGNED_ON)).fetchone()
    connection.close()
    return dict(row) if row else None


def build_workspace(test, scenario=None):
    """Create a temp workspace; registers cleanup on the TestCase."""
    tmp = Path(tempfile.mkdtemp(prefix='qq-test-'))
    test.addCleanup(shutil.rmtree, tmp, True)
    ws = tmp / 'ws'
    ws.mkdir()
    (ws / 'state').mkdir()
    for script in SCRIPTS:
        shutil.copy(REAL_DIR / script, ws / script)
    shutil.copy(REAL_DIR.parents[1] / 'student_messages.py', ws / 'student_messages.py')
    shutil.copy(REAL_DIR / 'windows_ocr.ps1', ws / 'windows_ocr.ps1')
    (ws / 'assignments.json').write_text(json.dumps(FIXTURE_ASSIGNMENTS, ensure_ascii=False, indent=2),
                                         encoding='utf-8')
    (ws / 'attachments').mkdir()
    (ws / 'attachments' / 'model-answer.png').write_bytes(b'\x89PNG\r\n\x1a\nfixture-model-answer')
    shutil.copy(HERE / 'mock_cli.py', ws / 'mock_cli.py')
    cli_cmd = ws / 'mock-cli.cmd'
    cli_cmd.write_text(f'@echo off\r\n"{sys.executable}" "{ws / "mock_cli.py"}" %*\r\n', encoding='utf-8')
    db_path = tmp / 'fixture.sqlite'
    build_db(db_path)
    scenario_path = tmp / 'scenario.json'
    logs = tmp / 'logs'
    logs.mkdir()
    config = {
        'cli': str(cli_cmd), 'start': '2026-09-15 00:00:00', 'selfQqId': 'SELF',
        'platformDatabase': str(db_path), 'platformProject': str(tmp),
        'classes': ['IC3.1'], 'expectedUserId': 'TEACHER_QQ',
        'onebotHttp': 'http://127.0.0.1:9', 'onebotToken': 'fixture-token',
    }
    (ws / 'config.json').write_text(json.dumps(config, indent=2), encoding='utf-8')
    env = dict(os.environ, MOCK_SCENARIO=str(scenario_path), MOCK_LOG_DIR=str(logs))
    fixture = SimpleNamespace(tmp=tmp, ws=ws, state=ws / 'state', db=db_path,
                              scenario_path=scenario_path, logs=logs, env=env)
    set_scenario(fixture, scenario or {})
    return fixture


def set_scenario(fixture, scenario):
    fixture.scenario_path.write_text(json.dumps(scenario, ensure_ascii=False), encoding='utf-8')


def run_script(fixture, script, *args, extra_env=None):
    env = dict(fixture.env)
    env.update(extra_env or {})
    # fetch.py pins stdout/stderr to UTF-8 at import, so decode accordingly.
    return subprocess.run([sys.executable, str(fixture.ws / script), *args],
                          capture_output=True, text=True, encoding='utf-8',
                          errors='replace', env=env, cwd=fixture.ws, timeout=120)


def fresh_import(fixture, name):
    for module in MODULES:
        sys.modules.pop(module, None)
    sys.path.insert(0, str(fixture.ws))
    try:
        return importlib.import_module(name)
    finally:
        sys.path.remove(str(fixture.ws))


def read_log(fixture, name):
    path = fixture.logs / name
    if not path.exists():
        return []
    return [json.loads(line) for line in path.read_text(encoding='utf-8').splitlines() if line.strip()]


def calls_for(fixture, *command):
    prefix = list(command)
    rows = []
    for argv in read_log(fixture, 'calls.log'):
        args = list(argv)
        if args[:len(prefix)] == prefix:
            rows.append(args)
    return rows


def save_state(fixture, name, data):
    (fixture.state / name).write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')


def load_state(fixture, name):
    return json.loads((fixture.state / name).read_text(encoding='utf-8'))


def state_snapshot(path):
    result = {}
    if not path.exists():
        return result
    for file in sorted(p for p in path.rglob('*') if p.is_file()):
        result[str(file.relative_to(path))] = hashlib.sha256(file.read_bytes()).hexdigest()
    return result


def message(mid, sender_id, time='2026-09-16 10:00:00', content='here is my homework 作业',
            conversation_id='conv-emma', title='张梦 Emma', candidates=None, single_chat=True,
            resources=None):
    return {'messageId': mid, 'time': time, 'sender': title, 'senderId': sender_id,
            'conversationId': conversation_id, 'title': title, 'text': content,
            'resources': resources or [], 'candidates': candidates or []}


def conversation(cid, messages, title='张梦 Emma', single_chat=True):
    return {'openConversationId': cid, 'singleChat': single_chat, 'title': title,
            'messages': messages}


def wire_message(mid, sender_id, time='2026-09-18 08:00:00', content='here is my homework 作业',
                 sender='张梦 Emma', ai_flag=False):
    return {'openMessageId': mid, 'createTime': time, 'sender': sender,
            'senderOpenDingTalkId': sender_id, 'content': content,
            'messageAiSendFlag': ai_flag, 'resources': []}


def write_pending(fixture, messages, batch_id='batch-1', end='2026-09-18 09:00:00'):
    save_state(fixture, 'pending.json', {
        'batchId': batch_id, 'runId': None, 'start': '2026-09-15 00:00:00', 'end': end,
        'platformSchemaVersion': 18, 'messages': messages})


def write_decisions(fixture, decisions, batch_id='batch-1', name='decisions.json'):
    save_state(fixture, name, {'batchId': batch_id, 'decisions': decisions})


def empty_pages():
    return [{'cursor': '0', 'conversations': [], 'hasMore': False}]


def now_local(offset=dt.timedelta(0)):
    return (dt.datetime.now(TZ) + offset).strftime('%Y-%m-%d %H:%M:%S')
