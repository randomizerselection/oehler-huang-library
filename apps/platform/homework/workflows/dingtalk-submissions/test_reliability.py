"""Failure-recovery tests. All databases and DingTalk responses are isolated fixtures."""
from contextlib import closing
import json
import sqlite3
import subprocess
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import absence_followups
import fetch
import platform_db
import receipts
import regular_check
import reply_queue
import update


ASSIGNMENT = "15 Sep 2026\nInflationary gap (Q19)"


def create_fixture_database(path):
    db = sqlite3.connect(path)
    db.executescript('''
      PRAGMA user_version=18;
      CREATE TABLE accounts (
        id TEXT PRIMARY KEY,username TEXT,display_name TEXT,password_hash TEXT,
        created_at TEXT,updated_at TEXT,last_login_at TEXT,status TEXT,role TEXT,
        deleted_at TEXT,class_name TEXT,student_id TEXT,legal_name TEXT,
        preferred_name TEXT,form_class TEXT
      );
      CREATE TABLE classes (
        id TEXT PRIMARY KEY,owner_account_id TEXT,name TEXT,status TEXT,
        join_code_hash TEXT,join_code_rotated_at TEXT,consent_attested_at TEXT,
        consent_attested_by_account_id TEXT,created_at TEXT,updated_at TEXT
      );
      CREATE TABLE class_memberships (
        class_id TEXT,account_id TEXT,status TEXT,joined_at TEXT,removed_at TEXT,
        roster_number INTEGER,PRIMARY KEY(class_id,account_id)
      );
      CREATE TABLE student_integrations (
        account_id TEXT,provider TEXT,external_id TEXT,verified_at TEXT,metadata_json TEXT,
        UNIQUE(account_id,provider),UNIQUE(provider,external_id)
      );
      CREATE TABLE homework_submissions (
        id TEXT PRIMARY KEY,class_id TEXT,student_account_id TEXT,assignment_title TEXT,
        assigned_on TEXT,due_at TEXT,status TEXT,completed_at TEXT,is_late INTEGER,
        teacher_accepted INTEGER,source TEXT,source_message_id TEXT,evidence_json TEXT,
        note TEXT,confirmation_sent_at TEXT,last_activity_at TEXT,
        recorded_by_account_id TEXT,recorded_at TEXT,updated_at TEXT,
        UNIQUE(class_id,student_account_id,assignment_title,assigned_on)
      );
      CREATE TABLE homework_submission_events (
        id TEXT PRIMARY KEY,homework_submission_id TEXT,event_type TEXT,provider TEXT,
        external_message_id TEXT,occurred_at TEXT,evidence_json TEXT,recorded_at TEXT
      );
      CREATE TABLE selector_attendance_log (
        id TEXT PRIMARY KEY,session_id TEXT,class_id TEXT,student_account_id TEXT,
        status TEXT,lesson_content_id TEXT,marked_at TEXT,recorded_at TEXT
      );
      CREATE TABLE absence_followups (
        attendance_log_id TEXT PRIMARY KEY,status TEXT,recipient_external_id TEXT,
        conversation_id TEXT,sent_at TEXT,response_message_id TEXT,reason_text TEXT,
        responded_at TEXT,updated_at TEXT
      );
      INSERT INTO accounts VALUES
        ('teacher','teacher','Teacher','','2026-01-01','2026-01-01',NULL,'active','teacher',NULL,NULL,NULL,'Teacher','',NULL),
        ('s33','s33','Student 33','','2026-01-01','2026-01-01',NULL,'active','student',NULL,NULL,'20241025','学生甲','Liam','1'),
        ('s36','s36','Student 36','','2026-01-01','2026-01-01',NULL,'active','student',NULL,NULL,'20246001','学生乙','Ken','6');
      INSERT INTO classes VALUES
        ('c33','teacher','S3.3','active','','','','','2026-01-01','2026-01-01'),
        ('c36','teacher','S3.6','active','','','','','2026-01-01','2026-01-01');
      INSERT INTO class_memberships VALUES
        ('c33','s33','active','2026-01-01',NULL,1),
        ('c36','s36','active','2026-01-01',NULL,1);
      INSERT INTO student_integrations VALUES
        ('s33','dingtalk','ding-s33','2026-01-01','{}'),
        ('s36','dingtalk','ding-s36','2026-01-01','{}');
    ''')
    db.commit()
    db.close()


class FixtureCase(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(ignore_cleanup_errors=True)
        self.root = Path(self.temp.name)
        (self.root / 'state').mkdir()
        self.db_path = self.root / 'econmark.sqlite'
        create_fixture_database(self.db_path)
        self.assignment_path = self.root / 'assignments.json'
        self.assignment_path.write_text(json.dumps([{
            'header': ASSIGNMENT,
            'platformTitle': 'Inflationary gap (Q19)',
            'assignedDate': '2026-09-15',
            'dueAt': '2026-09-15T23:59:00+08:00'
        }, {
            'header': '16 Sep 2026\nDeflationary gap (9708/31 Q18)',
            'platformTitle': 'Deflationary gap (9708/31 Q18)',
            'assignedDate': '2026-09-16',
            'dueAt': '2026-09-16T23:59:00+08:00'
        }]), encoding='utf-8')
        self.config = dict(update.CONFIG)
        self.config['platformDatabase'] = str(self.db_path)
        self.patches = [
            patch.object(platform_db, 'DB_PATH', self.db_path),
            patch.object(platform_db, 'ROOT', self.root),
            patch.object(update, 'ROOT', self.root),
            patch.object(update, 'INSPECTION', self.root / 'state' / 'plan-inspection.json'),
            patch.object(update, 'CONFIG', self.config),
            patch.object(update, 'roster', platform_db.roster),
        ]
        for item in self.patches:
            item.start()

    def tearDown(self):
        for item in reversed(self.patches):
            item.stop()
        self.temp.cleanup()

    def save(self, name, value):
        fetch.save(self.root / 'state' / name, value)

    def evidence(self, sender='ding-s33', candidate=True):
        message = {
            'messageId': 'message-1', 'time': '2026-09-15 18:00:00',
            'sender': 'Student', 'senderId': sender, 'conversationId': 'conversation-1',
            'title': 'Student', 'text': 'A. 840 - 800 = 40',
            'resources': [], 'candidates': []
        }
        if candidate:
            message['candidates'] = [platform_db.roster()[0]]
        batch = {'batchId': 'batch-1', 'snapshotDigest': 'snapshot-1', 'complete': True,
                 'start': '2026-09-15 17:00:00', 'end': '2026-09-15 18:05:00',
                 'platformSchemaVersion': 18, 'messages': [message]}
        decision = {'messageId': 'message-1', 'studentKey': 'S3.3|1|学生甲',
                    'assignment': ASSIGNMENT, 'action': 'submitted',
                    'responseFormat': 'worked_answer', 'workingPhotoPresent': False,
                    'evidence': 'Visible calculation is present.', 'decisionReason': 'Working shown'}
        self.save('pending.json', batch)
        self.save('decisions.json', [decision])
        self.save('english-name-decisions.json', [])
        return batch, decision


class TransactionTests(FixtureCase):
    def row_count(self):
        with closing(sqlite3.connect(self.db_path)) as db:
            return db.execute('SELECT COUNT(*) FROM homework_submissions').fetchone()[0]

    def test_prepare_is_read_only_and_commit_requires_explicit_inspection(self):
        self.evidence()
        update.prepare()
        self.assertEqual(self.row_count(), 0)
        with self.assertRaisesRegex(RuntimeError, 'explicitly inspected'):
            update.commit()
        self.assertEqual(self.row_count(), 0)

    def test_inspected_plan_commits_and_creates_sqlite_backup(self):
        self.evidence()
        update.prepare()
        update.inspect_plan()
        update.commit()
        self.assertEqual(self.row_count(), 1)
        with closing(sqlite3.connect(self.db_path)) as db:
            status = db.execute('SELECT status FROM homework_submissions').fetchone()[0]
        self.assertEqual(status, 'submitted')
        self.assertEqual(len(list((self.root / 'backups').glob('*.sqlite'))), 1)

    def test_stale_teacher_update_fails_closed(self):
        self.evidence()
        update.prepare()
        update.inspect_plan()
        with closing(sqlite3.connect(self.db_path)) as db:
            db.execute('''INSERT INTO homework_submissions
              (id,class_id,student_account_id,assignment_title,assigned_on,status,teacher_accepted,
               source,note,recorded_at,updated_at)
              VALUES ('teacher-row','c33','s33','Inflationary gap (Q19)','2026-09-15',
                      'submitted',1,'teacher','Accepted manually','2026-09-15','2026-09-15')''')
            db.commit()
        with self.assertRaisesRegex(RuntimeError, 'Homework status changed'):
            update.commit()
        with closing(sqlite3.connect(self.db_path)) as db:
            row = db.execute('SELECT status,teacher_accepted,note FROM homework_submissions').fetchone()
        self.assertEqual(row, ('submitted', 1, 'Accepted manually'))

    def test_forged_s36_plan_cannot_bypass_commit_scope(self):
        self.evidence()
        update.prepare()
        plan = json.loads((self.root / 'state' / 'plan.json').read_text(encoding='utf-8'))
        for collection in ('homeworkWrites', 'identityLinks'):
            for item in plan[collection]:
                item.update(accountId='s36', classId='c36')
        plan['planDigest'] = update.plan_digest(plan)
        self.save('plan.json', plan)
        update.inspect_plan()
        with self.assertRaisesRegex(ValueError, 'authorized S3.3/S3.4'):
            update.commit()
        self.assertEqual(self.row_count(), 0)

    def test_transaction_rolls_back_earlier_write_when_later_write_fails(self):
        self.evidence()
        update.prepare()
        update.inspect_plan()
        with closing(sqlite3.connect(self.db_path)) as db:
            db.execute('''CREATE TRIGGER fail_audit_event BEFORE INSERT ON homework_submission_events
                          BEGIN SELECT RAISE(ABORT,'simulated audit failure'); END''')
            db.commit()
        with self.assertRaises(sqlite3.IntegrityError):
            update.commit()
        self.assertEqual(self.row_count(), 0)

    def test_retry_after_database_commit_finalizes_local_audit_without_rewriting(self):
        self.evidence()
        update.prepare()
        update.inspect_plan()
        with closing(sqlite3.connect(self.db_path)) as db:
            db.execute('''INSERT INTO homework_submissions
              (id,class_id,student_account_id,assignment_title,assigned_on,due_at,status,
               completed_at,is_late,teacher_accepted,source,source_message_id,evidence_json,
               note,confirmation_sent_at,last_activity_at,recorded_by_account_id,recorded_at,updated_at)
              VALUES ('already','c33','s33','Inflationary gap (Q19)','2026-09-15',NULL,
                      'submitted','2026-09-15',0,0,'dingtalk','message-1','{}',NULL,NULL,
                      '2026-09-15','teacher','2026-09-15','2026-09-15')''')
            db.commit()
        update.commit()
        self.assertEqual(self.row_count(), 1)
        ledger = json.loads((self.root / 'state' / 'ledger.json').read_text(encoding='utf-8'))
        self.assertIn('message-1', ledger['processed'])

    def test_teacher_accepted_record_is_never_planned_for_overwrite(self):
        with closing(sqlite3.connect(self.db_path)) as db:
            db.execute('''INSERT INTO homework_submissions
              (id,class_id,student_account_id,assignment_title,assigned_on,status,teacher_accepted,
               source,source_message_id,note,recorded_at,updated_at)
              VALUES ('ellie','c33','s33','Inflationary gap (Q19)','2026-09-15','submitted',1,
                      'teacher','manual','Teacher accepted','2026-09-15','2026-09-15')''')
            db.commit()
        self.evidence()
        update.prepare()
        plan = json.loads((self.root / 'state' / 'plan.json').read_text(encoding='utf-8'))
        self.assertEqual(plan['homeworkWrites'], [])
        update.inspect_plan()
        update.commit()
        with closing(sqlite3.connect(self.db_path)) as db:
            row = db.execute('SELECT teacher_accepted,note,source_message_id FROM homework_submissions').fetchone()
        self.assertEqual(row, (1, 'Teacher accepted', 'manual'))

    def test_ambiguous_name_does_not_replace_existing_preferred_name(self):
        batch, _ = self.evidence()
        self.save('decisions.json', [])
        self.save('english-name-decisions.json', [{
            'messageId': 'message-1', 'studentKey': 'S3.3|1|学生甲',
            'englishName': 'Ryan', 'decisionReason': 'Verified student clearly supplied this English name.'
        }])
        with self.assertRaisesRegex(ValueError, 'Refusing to replace'):
            update.prepare()
        with closing(sqlite3.connect(self.db_path)) as db:
            self.assertEqual(db.execute("SELECT preferred_name FROM accounts WHERE id='s33'").fetchone()[0], 'Liam')

    def test_unreadable_image_evidence_remains_uncommitted(self):
        batch, _ = self.evidence()
        batch['messages'][0]['text'] = '[图片消息] mediaId=broken'
        self.save('pending.json', batch)
        invalid = self.root / 'state' / 'broken.bin'
        invalid.write_bytes(b'not an image')
        self.save('media.json', [{'messageId': 'message-1', 'path': str(invalid)}])
        with self.assertRaisesRegex(ValueError, 'missing or unreadable'):
            update.prepare()
        self.assertEqual(self.row_count(), 0)

    def test_incorrect_answer_with_visible_work_is_still_submitted(self):
        self.evidence()
        decisions = json.loads((self.root / 'state' / 'decisions.json').read_text(encoding='utf-8'))
        decisions[0]['answerMatchesKey'] = False
        self.save('decisions.json', decisions)
        update.prepare()
        update.inspect_plan()
        update.commit()
        with closing(sqlite3.connect(self.db_path)) as db:
            self.assertEqual(db.execute('SELECT status FROM homework_submissions').fetchone()[0], 'submitted')

    def test_confirmed_s36_decision_is_only_audited_as_out_of_scope(self):
        batch, decision = self.evidence(sender='ding-s36', candidate=False)
        decision = {'messageId': 'message-1', 'action': 'out_of_scope',
                    'evidence': 'Platform identity is an active S3.6 student.',
                    'decisionReason': 'Managed by the separate S3.6 workflow.'}
        self.save('decisions.json', [decision])
        update.prepare()
        plan = json.loads((self.root / 'state' / 'plan.json').read_text(encoding='utf-8'))
        self.assertEqual(plan['homeworkWrites'], [])
        self.assertEqual(plan['identityLinks'], [])
        self.assertEqual(plan['outboundIntents'], [])
        update.inspect_plan()
        update.commit()
        self.assertEqual(self.row_count(), 0)
        ledger = json.loads((self.root / 'state' / 'ledger.json').read_text(encoding='utf-8'))
        self.assertEqual(ledger['processed']['message-1']['action'], 'out_of_scope')

    def test_one_teacher_accepted_message_can_complete_two_assignments(self):
        self.evidence()
        decisions=[]
        for assignment in (ASSIGNMENT, '16 Sep 2026\nDeflationary gap (9708/31 Q18)'):
            decisions.append({
                'messageId':'message-1','studentKey':'S3.3|1|学生甲','assignment':assignment,
                'action':'submitted','responseFormat':'teacher_accepted_attachment',
                'workingPhotoPresent':False,'teacherAccepted':True,
                'evidence':'Teacher accepted the attachment for this assignment.',
                'decisionReason':'Explicit teacher acceptance.'})
        self.save('decisions.json',decisions)
        update.prepare(); update.inspect_plan(); update.commit()
        with closing(sqlite3.connect(self.db_path)) as db:
            rows=db.execute('SELECT assignment_title,teacher_accepted FROM homework_submissions ORDER BY assigned_on').fetchall()
        self.assertEqual(rows,[('Inflationary gap (Q19)',1),('Deflationary gap (9708/31 Q18)',1)])
        ledger=json.loads((self.root/'state'/'ledger.json').read_text(encoding='utf-8'))
        self.assertEqual(len(ledger['processed']),2)
        self.assertEqual(fetch.processed_message_ids(ledger),{'message-1'})

    def test_unknown_identity_must_remain_pending(self):
        self.evidence(sender='unknown', candidate=False)
        self.save('decisions.json', [{'messageId': 'message-1', 'action': 'ignore',
                                      'evidence': 'Unknown sender', 'decisionReason': 'No match'}])
        with self.assertRaisesRegex(ValueError, 'cannot be ignored'):
            update.prepare()


class FetchRecoveryTests(unittest.TestCase):
    @staticmethod
    def response(messages, more=False, cursor=None):
        result = {'hasMore': more, 'conversationMessagesList': [{
            'openConversationId': 'chat', 'singleChat': True, 'messages': messages
        }]}
        if cursor:
            result['nextCursor'] = cursor
        return {'success': True, 'result': result}

    def test_multiple_pages_identical_timestamps_are_retained_once(self):
        pages = [
            self.response([{'openMessageId': 'a', 'createTime': '2026-09-18 09:00:00'}], True, 'next'),
            self.response([{'openMessageId': 'a', 'createTime': '2026-09-18 09:00:00'},
                           {'openMessageId': 'b', 'createTime': '2026-09-18 09:00:00'}])
        ]
        conversations, count = fetch.scan_messages('2026-09-18 08:00:00', '2026-09-18 09:00:00', lambda _args: pages.pop(0))
        self.assertEqual(count, 2)
        self.assertEqual([m['openMessageId'] for m in conversations[0]['messages']], ['a', 'b'])

    def test_later_page_failure_is_not_an_empty_inbox_and_next_run_recovers(self):
        calls = 0
        def broken(_args):
            nonlocal calls
            calls += 1
            if calls == 1:
                return self.response([{'openMessageId': 'a'}], True, 'next')
            raise RuntimeError('NETWORK_DOWN')
        with self.assertRaises(fetch.IncompleteFetch):
            fetch.scan_messages('2026-09-18 08:00:00', '2026-09-18 08:20:00', broken)
        pages = [self.response([{'openMessageId': 'a'}], True, 'next'),
                 self.response([{'openMessageId': 'b'}])]
        conversations, _ = fetch.scan_messages('2026-09-18 08:00:00', '2026-09-18 08:20:00', lambda _args: pages.pop(0))
        self.assertEqual({m['openMessageId'] for m in conversations[0]['messages']}, {'a', 'b'})

    def test_authentication_failure_stops_without_login_retry(self):
        calls = 0
        def denied(_args):
            nonlocal calls
            calls += 1
            raise fetch.AuthenticationRequired('sign-in required')
        with self.assertRaises(fetch.AuthenticationRequired):
            fetch.scan_messages('2026-09-18 08:00:00', '2026-09-18 09:00:00', denied)
        self.assertEqual(calls, 1)

    def test_overlapping_six_hour_windows_deduplicate_stable_message_ids(self):
        def api(args):
            return self.response([{'openMessageId': 'same', 'createTime': args[args.index('--end') + 1]}])
        conversations, count = fetch.scan_messages('2026-09-18 00:00:00', '2026-09-18 13:00:00', api)
        self.assertEqual(count, 3)
        self.assertEqual([m['openMessageId'] for m in conversations[0]['messages']], ['same'])

    def test_partial_main_fetch_preserves_existing_pending_batch_and_watermark(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            old_pending = {'batchId': 'old', 'complete': True, 'messages': [{'messageId': 'unresolved'}]}
            fetch.save(root / 'state' / 'pending.json', old_pending)
            fetch.save(root / 'state' / 'ledger.json', {'processed': {}, 'checkedThrough': '2026-09-18 08:00:00'})
            with patch.object(fetch, 'ROOT', root), \
                 patch.object(fetch, 'roster', return_value=[]), \
                 patch.object(fetch, 'scan_messages', side_effect=fetch.IncompleteFetch('later page failed')):
                with self.assertRaises(fetch.IncompleteFetch):
                    fetch.main()
            self.assertEqual(json.loads((root / 'state' / 'pending.json').read_text(encoding='utf-8')), old_pending)
            ledger = json.loads((root / 'state' / 'ledger.json').read_text(encoding='utf-8'))
            self.assertEqual(ledger['checkedThrough'], '2026-09-18 08:00:00')


class DeliveryRecoveryTests(unittest.TestCase):
    def test_remote_acceptance_crash_becomes_uncertain_and_is_not_resent(self):
        with tempfile.TemporaryDirectory() as directory:
            state = Path(directory) / 'receipts.json'
            item = {'studentKey': 'S3.3|1|学生甲', 'assignment': ASSIGNMENT,
                    'senderId': 'ding-s33', 'sourceMessageId': 'source'}
            key = receipts.receipt_key(item)
            fetch.save(state, {'receipts': {}})
            with patch.object(receipts, 'STATE', state), \
                 patch.object(receipts, 'submitted_records', return_value={key: item}), \
                 patch.object(receipts, 'verify_saved'), \
                 patch.object(receipts, 'receipt_text', return_value="Hi Liam, thanks for sending your assignment. I've marked it as submitted."), \
                 patch.object(receipts, 'cli', side_effect=RuntimeError('connection lost after acceptance')) as api:
                first = receipts.run(send=True)
                second = receipts.run(send=True)
            self.assertEqual(len(first['needsAttention']), 1)
            self.assertEqual(len(second['needsAttention']), 1)
            self.assertEqual(api.call_count, 1)
            saved = json.loads(state.read_text(encoding='utf-8'))
            self.assertEqual(saved['receipts'][key]['status'], 'uncertain')
            self.assertTrue(saved['receipts'][key]['idempotencyKey'].startswith('submission-'))


class ScopeAndQueueTests(FixtureCase):
    def test_s36_recipient_is_rejected_even_with_a_verified_identity(self):
        with self.assertRaises(ValueError):
            platform_db.require_recipient('S3.6|1|学生乙', 'ding-s36')

    def test_unknown_and_s36_messages_never_enter_native_reply_queue(self):
        state_root = self.root
        snapshot = {'complete': True, 'result': {'hasMore': False, 'conversationMessagesList': [
            {'singleChat': True, 'openConversationId': 'c33', 'title': 'S33', 'messages': [
                {'openMessageId': 'm33', 'senderOpenDingTalkId': 'ding-s33', 'createTime': '2026-09-18 09:00:00', 'content': 'Can we talk?'}]},
            {'singleChat': True, 'openConversationId': 'c36', 'title': 'S36', 'messages': [
                {'openMessageId': 'm36', 'senderOpenDingTalkId': 'ding-s36', 'createTime': '2026-09-18 09:00:00', 'content': 'Can we talk?'}]},
            {'singleChat': True, 'openConversationId': 'unknown', 'title': 'Unknown', 'messages': [
                {'openMessageId': 'mu', 'senderOpenDingTalkId': 'unknown', 'createTime': '2026-09-18 09:00:00', 'content': 'Can we talk?'}]},
        ]}}
        with patch.object(reply_queue, 'ROOT', state_root), \
             patch.object(reply_queue, 'STATE', state_root / 'state' / 'personal-replies.json'), \
             patch.object(reply_queue, 'REPORT', state_root / 'Needs-my-reply.html'):
            state = reply_queue.capture(snapshot, '2026-09-18 09:01:00', {'ding-s33'}, {'ding-s36'})
            self.assertEqual({item['messageId'] for item in reply_queue.incoming(state).values()}, {'m33'})
            bad = reply_queue.key('c36', 'm36')
            self.assertEqual(state['reviews'][bad]['status'], 'out_of_scope')
            with self.assertRaises(ValueError):
                reply_queue.apply_reviews(state, [{'key': bad, 'status': 'open', 'summary': 'Question', 'reason': 'Personal request'}])
            reply_queue.apply_reviews(state, [{'key': bad, 'status': 'out_of_scope', 'reason': 'Verified S3.6'}])
            unknown = reply_queue.key('unknown', 'mu')
            with self.assertRaisesRegex(ValueError, 'platform-verified'):
                reply_queue.apply_reviews(state, [{'key': unknown, 'status': 'out_of_scope', 'reason': 'No match'}])
            state['reviews'][unknown] = {'key': unknown, 'status': 'out_of_scope', 'reason': 'Legacy nickname inference'}
            reply_queue.save(reply_queue.STATE, state)
            state = reply_queue.capture(snapshot, '2026-09-18 09:02:00', {'ding-s33'}, {'ding-s36'})
            self.assertNotIn(unknown, state['reviews'])

    def test_absence_capture_excludes_s36_and_sends_no_reply(self):
        with closing(sqlite3.connect(self.db_path)) as db:
            db.executescript('''
              INSERT INTO selector_attendance_log VALUES ('a33','session','c33','s33','absent','lesson','2026-09-18T00:00:00+00:00','2026-09-18');
              INSERT INTO selector_attendance_log VALUES ('a36','session','c36','s36','absent','lesson','2026-09-18T00:00:00+00:00','2026-09-18');
              INSERT INTO absence_followups VALUES ('a33','sent','ding-s33','chat33','2026-09-18T00:00:00+00:00',NULL,NULL,NULL,'2026-09-18');
              INSERT INTO absence_followups VALUES ('a36','sent','ding-s36','chat36','2026-09-18T00:00:00+00:00',NULL,NULL,NULL,'2026-09-18');
            ''')
            db.commit()
        snapshot = {'complete': True, 'result': {'hasMore': False, 'conversationMessagesList': [
            {'singleChat': True, 'openConversationId': 'chat33', 'messages': [
                {'openMessageId': 'r33', 'senderOpenDingTalkId': 'ding-s33', 'createTime': '2026-09-18 08:05:00', 'content': 'Medical appointment'}]},
            {'singleChat': True, 'openConversationId': 'chat36', 'messages': [
                {'openMessageId': 'r36', 'senderOpenDingTalkId': 'ding-s36', 'createTime': '2026-09-18 08:05:00', 'content': 'Medical appointment'}]},
        ]}}
        path = self.root / 'state' / 'snapshot.json'
        path.write_text(json.dumps(snapshot), encoding='utf-8')
        with patch.object(absence_followups, 'connect', platform_db.connect), \
             patch.object(absence_followups, 'backup', platform_db.backup), \
             patch.object(absence_followups, 'require_in_scope_student', platform_db.require_in_scope_student):
            result = absence_followups.capture(path)
        self.assertEqual(result['captured'], 1)
        with closing(sqlite3.connect(self.db_path)) as db:
            rows = dict(db.execute('SELECT attendance_log_id,status FROM absence_followups'))
        self.assertEqual(rows, {'a33': 'responded', 'a36': 'sent'})


class RegularEntryPointTests(unittest.TestCase):
    def test_regular_check_has_no_campaign_login_pdf_or_absence_send_path(self):
        commands = [part.lower() for stage in ('fetch', 'evidence', 'prepare', 'inspect', 'commit', 'deliver', 'reply-queue')
                    for command in regular_check.stage_commands(stage) for part in map(str, command)]
        joined = '\n'.join(commands)
        for prohibited in ('reminders.py', 'daily_campaign.py', 'login', 'reauthor', '.pdf'):
            self.assertNotIn(prohibited, joined)
        self.assertNotIn('absence_followups.py', joined)

    def test_native_queue_failure_is_reported_and_local_state_remains(self):
        state = {'nativeEnabled': True, 'categoryId': 7, 'managedConversations': [],
                 'authorizedSenderIds': [], 'conversations': {}, 'reviews': {}}
        with patch.object(reply_queue, 'sync_native', side_effect=RuntimeError('unsupported operation')):
            try:
                reply_queue.sync_native(state)
            except RuntimeError as error:
                result = {'enabled': bool(state.get('nativeEnabled')), 'error': str(error), 'localQueuePreserved': True}
        self.assertEqual(result['error'], 'unsupported operation')
        self.assertTrue(result['localQueuePreserved'])

    def test_stage_accepts_list_shaped_read_only_output(self):
        completed = subprocess.CompletedProcess([], 0, '[]', '')
        result = regular_check.run('evidence', runner=lambda *args, **kwargs: completed)
        self.assertEqual(result['status'], 'complete')


if __name__ == '__main__':
    unittest.main()

