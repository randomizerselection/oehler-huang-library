"""Absence follow-up tests. No DingTalk calls are made."""
import json
import sqlite3
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import absence_followups as followups


class AbsenceFollowupTests(unittest.TestCase):
    def test_reason_prefix_is_removed(self):
        self.assertEqual(followups.normalize_reason(' Absence reason: Medical appointment '), 'Medical appointment')

    def test_verified_reasons_receive_stable_categories(self):
        cases = {
            'I had a medical appointment.': 'health',
            'I was sitting an SAT exam.': 'academic',
            'I represented school in a competition.': 'school_activity',
            'There was a family emergency.': 'family_personal',
            'My flight was delayed.': 'travel_transport',
            'I had a counsellor appointment.': 'appointment',
            'The matter is private.': 'other',
            '我发烧了。': 'health',
        }
        for reason, expected in cases.items():
            with self.subTest(reason=reason):
                self.assertEqual(followups.classify_absence_reason(reason), expected)

    def test_capture_skips_acknowledgment_before_explicit_reason(self):
        db = sqlite3.connect(':memory:')
        self.addCleanup(db.close)
        db.row_factory = sqlite3.Row
        db.executescript('''
          CREATE TABLE classes (id TEXT PRIMARY KEY,name TEXT);
          CREATE TABLE accounts (id TEXT PRIMARY KEY,role TEXT,status TEXT);
          CREATE TABLE class_memberships (class_id TEXT,account_id TEXT,status TEXT);
          CREATE TABLE student_integrations (account_id TEXT,provider TEXT,external_id TEXT);
          CREATE TABLE selector_attendance_log (
            id TEXT PRIMARY KEY,student_account_id TEXT,class_id TEXT,status TEXT,marked_at TEXT
          );
          CREATE TABLE absence_followups (
            attendance_log_id TEXT PRIMARY KEY,status TEXT,recipient_external_id TEXT,
            outbound_message_id TEXT,conversation_id TEXT,message_text TEXT,sent_at TEXT,
            response_message_id TEXT UNIQUE,reason_text TEXT,responded_at TEXT,updated_at TEXT,
            absence_start_date TEXT,absence_end_date TEXT,reason_category TEXT
          );
          INSERT INTO classes VALUES ('class-1','S3.3');
          INSERT INTO accounts VALUES ('student-1','student','active');
          INSERT INTO class_memberships VALUES ('class-1','student-1','active');
          INSERT INTO student_integrations VALUES ('student-1','dingtalk','student-ding-id');
          INSERT INTO selector_attendance_log VALUES
            ('attendance-1','student-1','class-1','absent','2026-09-17T07:50:00+00:00');
          INSERT INTO absence_followups
            (attendance_log_id,status,recipient_external_id,outbound_message_id,conversation_id,
             message_text,sent_at,response_message_id,reason_text,responded_at,updated_at) VALUES
            ('attendance-1','sent','student-ding-id','prompt-1','conversation-1','Prompt',
             '2026-09-17T08:00:00+00:00',NULL,NULL,NULL,'2026-09-17T08:00:00+00:00');
        ''')
        snapshot = {
            'complete': True,
            'result': {
                'hasMore': False,
                'conversationMessagesList': [{
                    'openConversationId': 'conversation-1',
                    'messages': [{
                        'openMessageId': 'ack-1',
                        'createTime': '2026-09-17 16:02:00',
                        'senderOpenDingTalkId': 'student-ding-id',
                        'content': 'okok'
                    }, {
                        'openMessageId': 'unlabelled-1',
                        'createTime': '2026-09-17 16:03:00',
                        'senderOpenDingTalkId': 'student-ding-id',
                        'content': 'I had an appointment.'
                    }, {
                        'openMessageId': 'reply-1',
                        'createTime': '2026-09-17 16:05:00',
                        'senderOpenDingTalkId': 'student-ding-id',
                        'content': 'Absence reason: I will be away from 17 September to 24 September.'
                    }]
                }]
            }
        }
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / 'snapshot.json'
            path.write_text(json.dumps(snapshot), encoding='utf-8')
            with patch.object(followups, 'connect', return_value=db), patch.object(followups, 'require_schema'), patch.object(followups, 'backup'), patch.object(followups, 'require_in_scope_student'):
                result = followups.capture(path)
        self.assertEqual(result['captured'], 1)
        row = db.execute('''SELECT status,response_message_id,reason_text,reason_category,
                            absence_start_date,absence_end_date FROM absence_followups''').fetchone()
        self.assertEqual(dict(row), {
            'status': 'responded',
            'response_message_id': 'reply-1',
            'reason_text': 'I will be away from 17 September to 24 September.',
            'reason_category': 'other',
            'absence_start_date': '2026-09-17',
            'absence_end_date': '2026-09-24',
        })

    def test_later_explicit_reason_replaces_unacknowledged_placeholder(self):
        db = sqlite3.connect(':memory:')
        self.addCleanup(db.close)
        db.row_factory = sqlite3.Row
        db.executescript('''
          CREATE TABLE classes (id TEXT PRIMARY KEY,name TEXT);
          CREATE TABLE accounts (id TEXT PRIMARY KEY,role TEXT,status TEXT);
          CREATE TABLE class_memberships (class_id TEXT,account_id TEXT,status TEXT);
          CREATE TABLE student_integrations (account_id TEXT,provider TEXT,external_id TEXT);
          CREATE TABLE selector_attendance_log (
            id TEXT PRIMARY KEY,student_account_id TEXT,class_id TEXT,status TEXT,marked_at TEXT
          );
          CREATE TABLE absence_followups (
            attendance_log_id TEXT PRIMARY KEY,status TEXT,recipient_external_id TEXT,
            outbound_message_id TEXT,conversation_id TEXT,message_text TEXT,sent_at TEXT,
            response_message_id TEXT UNIQUE,reason_text TEXT,responded_at TEXT,updated_at TEXT,
            absence_start_date TEXT,absence_end_date TEXT,reason_category TEXT
          );
          INSERT INTO classes VALUES ('class-1','S3.4');
          INSERT INTO accounts VALUES ('student-1','student','active');
          INSERT INTO class_memberships VALUES ('class-1','student-1','active');
          INSERT INTO student_integrations VALUES ('student-1','dingtalk','student-ding-id');
          INSERT INTO selector_attendance_log VALUES
            ('attendance-1','student-1','class-1','absent','2026-09-17T07:50:00+00:00');
          INSERT INTO absence_followups
            (attendance_log_id,status,recipient_external_id,outbound_message_id,conversation_id,
             message_text,sent_at,response_message_id,reason_text,responded_at,updated_at) VALUES
            ('attendance-1','responded','student-ding-id','prompt-1','conversation-1','Prompt',
             '2026-09-17T08:00:00+00:00','placeholder','I did not come to school',
             '2026-09-17T08:01:00+00:00','2026-09-17T08:01:00+00:00');
        ''')
        snapshot = {'complete': True, 'result': {'hasMore': False, 'conversationMessagesList': [{
            'openConversationId': 'conversation-1', 'messages': [
                {'openMessageId': 'placeholder', 'createTime': '2026-09-17 16:01:00',
                 'senderOpenDingTalkId': 'student-ding-id', 'content': 'I did not come to school'},
                {'openMessageId': 'explicit', 'createTime': '2026-09-17 16:05:00',
                 'senderOpenDingTalkId': 'student-ding-id',
                 'content': 'Absence reason: I had a medical appointment.'}
            ]}]}}
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / 'snapshot.json'
            path.write_text(json.dumps(snapshot), encoding='utf-8')
            with patch.object(followups, 'connect', return_value=db), \
                 patch.object(followups, 'require_schema'), patch.object(followups, 'backup'), \
                 patch.object(followups, 'require_in_scope_student'):
                result = followups.capture(path, Path(directory) / 'receipts.json')
        self.assertEqual(result['corrected'], 1)
        row = db.execute('SELECT response_message_id,reason_text FROM absence_followups').fetchone()
        self.assertEqual(dict(row), {'response_message_id': 'explicit',
                                     'reason_text': 'I had a medical appointment.'})

    def test_manual_prompt_is_backfilled_before_capturing_reason(self):
        db = sqlite3.connect(':memory:')
        self.addCleanup(db.close)
        db.row_factory = sqlite3.Row
        db.executescript('''
          CREATE TABLE classes (id TEXT PRIMARY KEY,name TEXT);
          CREATE TABLE accounts (id TEXT PRIMARY KEY,role TEXT,status TEXT);
          CREATE TABLE class_memberships (class_id TEXT,account_id TEXT,status TEXT);
          CREATE TABLE student_integrations (account_id TEXT,provider TEXT,external_id TEXT);
          CREATE TABLE selector_attendance_log (
            id TEXT PRIMARY KEY,student_account_id TEXT,class_id TEXT,status TEXT,marked_at TEXT
          );
          CREATE TABLE absence_followups (
            attendance_log_id TEXT PRIMARY KEY,status TEXT,recipient_external_id TEXT,
            outbound_message_id TEXT,conversation_id TEXT,message_text TEXT,sent_at TEXT,
            response_message_id TEXT UNIQUE,reason_text TEXT,responded_at TEXT,updated_at TEXT,
            absence_start_date TEXT,absence_end_date TEXT,reason_category TEXT
          );
          INSERT INTO classes VALUES ('class-1','S3.3');
          INSERT INTO accounts VALUES ('student-1','student','active');
          INSERT INTO class_memberships VALUES ('class-1','student-1','active');
          INSERT INTO student_integrations VALUES ('student-1','dingtalk','student-ding-id');
          INSERT INTO selector_attendance_log VALUES
            ('attendance-1','student-1','class-1','absent','2026-09-17T07:50:00+00:00');
        ''')
        snapshot = {'complete': True, 'result': {'hasMore': False, 'conversationMessagesList': [{
            'openConversationId': 'conversation-1', 'messages': [
                {'openMessageId': 'prompt-1', 'createTime': '2026-09-17 16:00:00',
                 'senderOpenDingTalkId': followups.SELF_ID,
                 'content': 'You were marked absent today. Please reply with Absence reason: followed by your reason.'},
                {'openMessageId': 'reply-1', 'createTime': '2026-09-17 16:05:00',
                 'senderOpenDingTalkId': 'student-ding-id',
                 'content': 'Absence reason: I had a medical appointment.'}
            ]}]}}
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / 'snapshot.json'
            path.write_text(json.dumps(snapshot), encoding='utf-8')
            with patch.object(followups, 'connect', return_value=db), \
                 patch.object(followups, 'require_schema'), patch.object(followups, 'backup'), \
                 patch.object(followups, 'require_in_scope_student'):
                result = followups.capture(path, Path(directory) / 'receipts.json')
        self.assertEqual(result['backfilled'], 1)
        self.assertEqual(result['captured'], 1)
        row = db.execute('SELECT status,outbound_message_id,response_message_id,reason_text FROM absence_followups').fetchone()
        self.assertEqual(dict(row), {'status': 'responded', 'outbound_message_id': 'prompt-1',
                                     'response_message_id': 'reply-1',
                                     'reason_text': 'I had a medical appointment.'})


if __name__ == '__main__':
    unittest.main()

