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

    def test_capture_records_first_later_reply_in_verified_conversation(self):
        db = sqlite3.connect(':memory:')
        self.addCleanup(db.close)
        db.row_factory = sqlite3.Row
        db.executescript('''
          CREATE TABLE classes (id TEXT PRIMARY KEY,name TEXT);
          CREATE TABLE accounts (id TEXT PRIMARY KEY,role TEXT,status TEXT);
          CREATE TABLE class_memberships (class_id TEXT,account_id TEXT,status TEXT);
          CREATE TABLE selector_attendance_log (
            id TEXT PRIMARY KEY,student_account_id TEXT,class_id TEXT
          );
          CREATE TABLE absence_followups (
            attendance_log_id TEXT PRIMARY KEY,status TEXT,recipient_external_id TEXT,
            conversation_id TEXT,sent_at TEXT,response_message_id TEXT,reason_text TEXT,
            responded_at TEXT,updated_at TEXT
          );
          INSERT INTO classes VALUES ('class-1','S3.3');
          INSERT INTO accounts VALUES ('student-1','student','active');
          INSERT INTO class_memberships VALUES ('class-1','student-1','active');
          INSERT INTO selector_attendance_log VALUES ('attendance-1','student-1','class-1');
          INSERT INTO absence_followups VALUES
            ('attendance-1','sent','student-ding-id','conversation-1','2026-09-17T08:00:00+00:00',NULL,NULL,NULL,'2026-09-17T08:00:00+00:00');
        ''')
        snapshot = {
            'complete': True,
            'result': {
                'hasMore': False,
                'conversationMessagesList': [{
                    'openConversationId': 'conversation-1',
                    'messages': [{
                        'openMessageId': 'reply-1',
                        'createTime': '2026-09-17 16:05:00',
                        'senderOpenDingTalkId': 'student-ding-id',
                        'content': 'Absence reason: I had a medical appointment.'
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
        row = db.execute('SELECT status,response_message_id,reason_text FROM absence_followups').fetchone()
        self.assertEqual(dict(row), {
            'status': 'responded',
            'response_message_id': 'reply-1',
            'reason_text': 'I had a medical appointment.'
        })


if __name__ == '__main__':
    unittest.main()

