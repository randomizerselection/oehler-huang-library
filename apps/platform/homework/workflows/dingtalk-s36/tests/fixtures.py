"""Fixture builders for the dingtalk-s36 regression tests.

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
            'absence_followups.py', 'absence_delivery.py', 'absence_receipts.py']
MODULES = [s[:-3] for s in SCRIPTS]

TZ = dt.timezone(dt.timedelta(hours=8))
HEADER = '15 Sep 2026\nInflationary gap (Q19)'
PLATFORM_TITLE = 'Inflationary gap (Q19)'
ASSIGNED_ON = '2026-09-15'
DUE_AT = '2026-09-17T23:59:00+08:00'
HEADER2 = '18 Sep 2026\nDeflationary gap (9708/31 Q18)'
PLATFORM_TITLE2 = 'Deflationary gap (9708/31 Q18)'
ASSIGNED_ON2 = '2026-09-18'

FIXTURE_ASSIGNMENTS = [{'header': '15 Sep 2026\nInflationary gap (Q19)', 'platformTitle': 'Inflationary gap (Q19)', 'displayName': 'Homework 1', 'assignedDate': '2026-09-15', 'description': 'Question 19: closed economy without government; C = 100 + 0.8Y, I = 100, initial equilibrium Y = 1000 million, full-employment Y = 800 million; asks the inflationary gap. Answer choices 40, 160, 260, 840 million.', 'dueAt': '2026-09-17T23:59:00+08:00', 'rule': 'Mark Submitted when the student provides an answer with working, or Samuel explicitly accepts the submission. Incorrect answers with working still count. A letter-only answer without accompanying working is Awaiting working; do not send a completion confirmation yet. A blank question or acknowledgment alone does not count. Reuse the same header for later submissions.', 'correctAnswer': 'A'}, {'header': '18 Sep 2026\nDeflationary gap (9708/31 Q18)', 'platformTitle': 'Deflationary gap (9708/31 Q18)', 'assignedDate': '2026-09-18', 'description': 'Cambridge 9708/31 May/June 2026 Q18, p.7: closed economy; equilibrium income $25 million, full-employment income $30 million, MPC 4/5. Asks the deflationary gap. Options A $1m, B $4m, C $5m, D $6.25m.', 'submissionTag': 'Homework 2', 'rule': 'Mark Submitted when the student provides an answer with working, or Samuel explicitly accepts the submission. Incorrect answers with working still count. A letter-only answer without accompanying working is Awaiting working; do not send a completion confirmation yet. A blank question or acknowledgment alone does not count. Reuse the same header for later submissions.', 'correctAnswer': 'A', 'displayName': 'Homework 2', 'dueAt': '2026-09-18T23:59:00+08:00'}]

CLASS_S36, CLASS_S33 = 'class-s36', 'class-s33'
OWNER = 'acct-owner'
EMMA = {'accountId': 'acct-emma', 'key': 'S3.6|1|张梦', 'dingtalkId': 'DING_EMMA', 'english': 'Emma'}
LEO = {'accountId': 'acct-leo', 'key': 'S3.6|2|李雷', 'dingtalkId': 'DING_LEO', 'english': ''}
WENDY = {'accountId': 'acct-wendy', 'key': 'S3.3|1|王芳', 'dingtalkId': 'DING_WENDY', 'english': 'Wendy'}


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
            recorded_at TEXT, updated_at TEXT,
            UNIQUE (class_id, student_account_id, assignment_title, assigned_on));
        CREATE TABLE homework_submission_events (id TEXT PRIMARY KEY,
            homework_submission_id TEXT, event_type TEXT, provider TEXT,
            external_message_id TEXT, occurred_at TEXT, evidence_json TEXT, recorded_at TEXT);
        CREATE TABLE selector_attendance_log (id TEXT PRIMARY KEY, session_id TEXT,
            class_id TEXT, student_account_id TEXT, status TEXT, lesson_content_id TEXT,
            marked_at TEXT, recorded_at TEXT);
        CREATE TABLE absence_followups (attendance_log_id TEXT PRIMARY KEY, provider TEXT,
            status TEXT, recipient_external_id TEXT, outbound_message_id TEXT,
            conversation_id TEXT, message_text TEXT, lesson_pdf_name TEXT,
            lesson_pdf_sha256 TEXT, sent_at TEXT, response_message_id TEXT,
            reason_text TEXT, responded_at TEXT, updated_at TEXT,
            absence_start_date TEXT, absence_end_date TEXT, reason_category TEXT);
    ''')
    connection.execute('PRAGMA user_version=21')
    connection.executemany('INSERT INTO classes VALUES (?,?,?)',
                           [(CLASS_S36, 'S3.6', OWNER), (CLASS_S33, 'S3.3', OWNER)])
    connection.executemany('INSERT INTO accounts VALUES (?,?,?,?,?,?,?,?,?)', [
        (OWNER, None, None, 'Teacher', None, 'Teacher', 'active', 'teacher', None),
        (EMMA['accountId'], '20246001', '6', '张梦', 'Emma', '张梦 Emma', 'active', 'student', None),
        (LEO['accountId'], '20246002', '6', '李雷', '', '李雷', 'active', 'student', None),
        (WENDY['accountId'], '20243001', '3', '王芳', 'Wendy', '王芳 Wendy', 'active', 'student', None),
    ])
    connection.executemany('INSERT INTO class_memberships VALUES (?,?,?,?)', [
        (CLASS_S36, EMMA['accountId'], 1, 'active'),
        (CLASS_S36, LEO['accountId'], 2, 'active'),
        (CLASS_S33, WENDY['accountId'], 1, 'active'),
    ])
    connection.executemany('INSERT INTO student_integrations VALUES (?,?,?,?,?)', [
        (EMMA['accountId'], 'dingtalk', EMMA['dingtalkId'], '2026-09-15T00:00:00+00:00', None),
        (LEO['accountId'], 'dingtalk', LEO['dingtalkId'], '2026-09-15T00:00:00+00:00', None),
        (WENDY['accountId'], 'dingtalk', WENDY['dingtalkId'], '2026-09-15T00:00:00+00:00', None),
    ])
    connection.commit()
    connection.close()


def insert_homework(db_path, student, status, teacher_accepted=0, row_id='hw-1',
                    title=PLATFORM_TITLE, assigned=ASSIGNED_ON):
    connection = sqlite3.connect(db_path)
    class_id = CLASS_S36 if student is not WENDY else CLASS_S33
    connection.execute(
        'INSERT OR IGNORE INTO homework_submissions (id,class_id,student_account_id,assignment_title,'
        'assigned_on,status,teacher_accepted,recorded_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?)',
        (row_id, class_id, student['accountId'], title, assigned, status,
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


LESSON_SLUG = '9-2-1-growth-output-gaps'
LESSON_TITLE = 'Actual growth, potential growth and output gaps'
LESSON_CONTENT_ID = ('C::Users:oehle:Documents:oehler-huang-platform:apps:library:a-level:lessons:'
                     + LESSON_SLUG)
LESSON_GROUP_TITLE = 'Economics 5'
LESSON_GROUP_ID = 'cid-fixture-econ5'
LESSON_MARKED_AT = '2026-09-20T05:57:50.771Z'


def write_lesson_assets(fixture, slug=LESSON_SLUG, title=LESSON_TITLE):
    manifest = fixture.tmp / 'apps' / 'library' / 'generated' / 'content-manifest.json'
    manifest.parent.mkdir(parents=True, exist_ok=True)
    manifest.write_text(json.dumps({'items': [
        {'id': 'a-level:lessons:' + slug, 'title': title + ' · A Level Economics'}]}), encoding='utf-8')
    pdf = fixture.tmp / 'authoring' / 'a-level' / 'outputs' / 'pdf' / (slug + '.pdf')
    pdf.parent.mkdir(parents=True, exist_ok=True)
    pdf.write_bytes(b'%PDF-1.4 fixture lesson\n')
    return pdf


def default_scenario(**overrides):
    """Group-search defaults, so a later scenario reset still resolves the lesson group."""
    scenario = {
        'groupSearch': [{'cursor': '0', 'hasMore': False, 'groups': [
            {'title': LESSON_GROUP_TITLE, 'openConversationId': LESSON_GROUP_ID, 'memberCount': 37}]}],
        'messageSearch': [{'cursor': '0', 'hasMore': False, 'conversations': []}],
    }
    scenario.update(overrides)
    return scenario


def group_missing():
    return {'groupSearch': [{'cursor': '0', 'hasMore': False, 'groups': []}]}


def group_has_pdf(name, group_id=LESSON_GROUP_ID, message_id='group-card-1'):
    """A message-search page showing the lesson PDF already posted in the group."""
    return {'messageSearch': [{'cursor': '0', 'hasMore': False, 'conversations': [
        {'openConversationId': group_id, 'singleChat': False, 'title': LESSON_GROUP_TITLE,
         'messages': [{'openMessageId': message_id, 'createTime': '2026-09-20 09:00:00',
                       'sender': 'Samuel Oehler-Huang', 'senderOpenDingTalkId': 'SELF',
                       'content': f'[文件] {name} fileId: FILE1 注意：如需下载使用dws drive download命令下载',
                       'resources': [{'resourceId': 'FILE1', 'resourceIdType': 'fileId',
                                      'resourceType': 'file', 'url': 'url'}]}]}]}]}


def insert_absence(db_path, student, status='absent', log_id='attlog-1', session_id='session-1',
                   lesson_content_id=LESSON_CONTENT_ID, marked_at=LESSON_MARKED_AT,
                   class_id=CLASS_S36, followup=None):
    connection = sqlite3.connect(db_path)
    connection.execute('INSERT OR REPLACE INTO selector_attendance_log VALUES (?,?,?,?,?,?,?,?)',
                       (log_id, session_id, class_id, student['accountId'], status,
                        lesson_content_id, marked_at, marked_at))
    if followup is not None:
        connection.execute('''INSERT OR REPLACE INTO absence_followups
            (attendance_log_id,provider,status,recipient_external_id,conversation_id,message_text,
             sent_at,updated_at) VALUES (?,?,?,?,?,?,?,?)''',
            (log_id, 'dingtalk', followup.get('status', 'sent'),
             followup.get('recipient_id', student['dingtalkId']), followup.get('conversation_id'),
             followup.get('message'), followup.get('sent_at'), followup.get('sent_at')))
    connection.commit()
    connection.close()


def unlink_dingtalk(db_path, student):
    connection = sqlite3.connect(db_path)
    connection.execute('DELETE FROM student_integrations WHERE account_id=?', (student['accountId'],))
    connection.commit()
    connection.close()


def absence_followup_row(db_path, log_id='attlog-1'):
    connection = sqlite3.connect(db_path)
    connection.row_factory = sqlite3.Row
    row = connection.execute('SELECT * FROM absence_followups WHERE attendance_log_id=?', (log_id,)).fetchone()
    connection.close()
    return dict(row) if row else None


def build_workspace(test, scenario=None):
    """Create a temp workspace; registers cleanup on the TestCase."""
    tmp = Path(tempfile.mkdtemp(prefix='s36-test-'))
    test.addCleanup(shutil.rmtree, tmp, True)
    ws = tmp / 'ws'
    ws.mkdir()
    (ws / 'state').mkdir()
    for script in SCRIPTS:
        shutil.copy(REAL_DIR / script, ws / script)
    shutil.copy(REAL_DIR.parents[1] / 'student_messages.py', ws / 'student_messages.py')
    shutil.copy(REAL_DIR.parents[1] / 'absence_periods.py', ws / 'absence_periods.py')
    (ws / 'assignments.json').write_text(json.dumps(FIXTURE_ASSIGNMENTS), encoding='utf-8')
    shutil.copy(HERE / 'mock_cli.py', ws / 'mock_cli.py')
    cli_cmd = ws / 'mock-cli.cmd'
    cli_cmd.write_text(f'@echo off\r\n"{sys.executable}" "{ws / "mock_cli.py"}" %*\r\n', encoding='utf-8')
    db_path = tmp / 'fixture.sqlite'
    build_db(db_path)
    scenario_path = tmp / 'scenario.json'
    logs = tmp / 'logs'
    logs.mkdir()
    config = {
        'cli': str(cli_cmd), 'profile': 'fixture-profile',
        'start': '2026-09-15 00:00:00', 'selfOpenDingTalkId': 'SELF',
        'platformDatabase': str(db_path), 'platformProject': str(tmp),
        'classes': ['S3.6'], 'expectedCorpId': 'CORP5', 'expectedUserId': 'USER5',
    }
    (ws / 'config.json').write_text(json.dumps(config, indent=2), encoding='utf-8')
    env = dict(os.environ, MOCK_SCENARIO=str(scenario_path), MOCK_LOG_DIR=str(logs))
    fixture = SimpleNamespace(tmp=tmp, ws=ws, state=ws / 'state', db=db_path,
                              scenario_path=scenario_path, logs=logs, env=env)
    set_scenario(fixture, default_scenario(**(scenario or {})))
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
        while '--profile' in args:
            index = args.index('--profile')
            del args[index:index + 2]
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
