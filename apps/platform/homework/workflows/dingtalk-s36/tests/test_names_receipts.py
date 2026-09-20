"""Scenario groups 6, 7, 9: English names, receipts, acknowledgments, and the
send crash window."""
import datetime as dt
import hashlib
import json
import sqlite3
import unittest

from fixtures import (EMMA, HEADER, LEO, TZ, build_workspace, empty_pages,
                      fresh_import, homework_row, insert_homework, load_state,
                      message, read_log, run_script, save_state, set_scenario,
                      write_decisions, write_pending)


def receipt_key(fixture_profile, student_key, assignment):
    return hashlib.sha256((fixture_profile + '\n' + student_key + '\n' + assignment).encode()).hexdigest()


def seed_submitted(fixture, student=EMMA, mid='m1', sender=None):
    """Platform row + ledger entry + empty receipt state for one submission."""
    insert_homework(fixture.db, student, 'submitted')
    save_state(fixture, 'ledger.json', {'processed': {mid: {
        'action': 'submitted', 'studentKey': student['key'], 'assignment': HEADER,
        'senderId': sender or student['dingtalkId'], 'responseFormat': 'worked',
        'workingPhotoPresent': True}}})
    save_state(fixture, 'receipts.json', {'enabledAt': '2026-09-17T00:00:00+08:00', 'receipts': {}})


class EnglishNameTests(unittest.TestCase):
    def test_valid_name_write_and_acknowledgment(self):
        fixture = build_workspace(self, {'pages': empty_pages()})
        incoming = message('m1', LEO['dingtalkId'], candidates=[{'key': LEO['key']}],
                           conversation_id='conv-leo', title='李雷')
        write_pending(fixture, [incoming])
        write_decisions(fixture, [], batch_id='batch-1')
        write_decisions(fixture, [{'messageId': 'm1', 'englishName': 'Leo',
                                   'studentKey': LEO['key']}],
                        batch_id='batch-1', name='english-name-decisions.json')
        result = run_script(fixture, 'update.py', 'prepare')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(run_script(fixture, 'update.py', 'commit').returncode, 0)
        connection = sqlite3.connect(fixture.db)
        saved = connection.execute('SELECT preferred_name FROM accounts WHERE id=?',
                                   (LEO['accountId'],)).fetchone()[0]
        connection.close()
        self.assertEqual(saved, 'Leo')
        module = fresh_import(fixture, 'platform_db')
        self.assertEqual(module.verify_preferred_name(LEO['key'], 'Leo')['english'], 'Leo')

        ack = run_script(fixture, 'english_name_ack.py', '--send')
        self.assertEqual(ack.returncode, 0, ack.stderr)
        self.assertEqual(json.loads(ack.stdout)['sent'], 1)
        sends = read_log(fixture, 'sends.log')
        self.assertEqual(len(sends), 1)
        self.assertEqual(sends[0]['content'], "Hi Leo, thanks for letting me know. I've saved your preferred English name.")
        self.assertEqual(sends[0]['openDingTalkId'], LEO['dingtalkId'])
        # Second run is idempotent.
        ack = run_script(fixture, 'english_name_ack.py', '--send')
        self.assertEqual(json.loads(ack.stdout)['sent'], 0)
        self.assertEqual(len(read_log(fixture, 'sends.log')), 1)

    def test_replacement_without_allow_replace_is_rejected(self):
        fixture = build_workspace(self)
        incoming = message('m1', EMMA['dingtalkId'], candidates=[{'key': EMMA['key']}])
        write_pending(fixture, [incoming])
        write_decisions(fixture, [], batch_id='batch-1')
        write_decisions(fixture, [{'messageId': 'm1', 'englishName': 'Emmaline',
                                   'studentKey': EMMA['key']}],
                        batch_id='batch-1', name='english-name-decisions.json')
        result = run_script(fixture, 'update.py', 'prepare')
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('Refusing to replace', result.stderr)

    def test_cjk_name_is_rejected(self):
        fixture = build_workspace(self)
        incoming = message('m1', LEO['dingtalkId'], candidates=[{'key': LEO['key']}],
                           conversation_id='conv-leo', title='李雷')
        write_pending(fixture, [incoming])
        write_decisions(fixture, [], batch_id='batch-1')
        write_decisions(fixture, [{'messageId': 'm1', 'englishName': '李',
                                   'studentKey': LEO['key']}],
                        batch_id='batch-1', name='english-name-decisions.json')
        result = run_script(fixture, 'update.py', 'prepare')
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('English letters', result.stderr)

    def test_greeting_without_preferred_name_is_english_only(self):
        fixture = build_workspace(self)
        receipts = fresh_import(fixture, 'receipts')
        fetch = fresh_import(fixture, 'fetch')
        text = receipts.receipt_text({'studentKey': LEO['key'], 'assignment': HEADER})
        self.assertTrue(text.startswith('Hi,'))
        fetch.ensure_english_only(text)  # must not raise
        self.assertNotRegex(text, r'[一-鿿]')

    def test_send_guard_raises_on_cjk_before_any_subprocess(self):
        fixture = build_workspace(self)
        fetch = fresh_import(fixture, 'fetch')
        with self.assertRaises(ValueError):
            fetch.cli(['chat', 'message', 'send', '--open-dingtalk-id', 'DING_EMMA',
                       '--content', '你好', '--yes'])
        self.assertEqual(read_log(fixture, 'calls.log'), [])


class ReceiptTests(unittest.TestCase):
    def test_dry_run_counts_eligible_without_sending(self):
        fixture = build_workspace(self)
        seed_submitted(fixture)
        result = run_script(fixture, 'receipts.py')
        self.assertEqual(result.returncode, 0, result.stderr)
        report = json.loads(result.stdout)
        self.assertEqual(report['eligible'], 1)
        self.assertEqual(report['sent'], 0)
        self.assertEqual(read_log(fixture, 'sends.log'), [])

    def test_empty_fetch_still_delivers_outstanding_receipt(self):
        fixture = build_workspace(self, {'pages': empty_pages()})
        seed_submitted(fixture)
        fetch = run_script(fixture, 'fetch.py')
        self.assertEqual(fetch.returncode, 0, fetch.stderr)
        self.assertEqual(load_state(fixture, 'pending.json')['messages'], [])
        result = run_script(fixture, 'receipts.py', '--send')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(json.loads(result.stdout)['sent'], 1)
        sends = read_log(fixture, 'sends.log')
        self.assertEqual(len(sends), 1)
        self.assertTrue(sends[0]['content'].startswith('Hi Emma,'))
        self.assertEqual(sends[0]['idempotencyKey'],
                         'submission-' + receipt_key('fixture-profile', EMMA['key'], HEADER))
        self.assertIsNotNone(homework_row(fixture.db)['confirmation_sent_at'])
        # Second run sends nothing.
        result = run_script(fixture, 'receipts.py', '--send')
        self.assertEqual(json.loads(result.stdout)['sent'], 0)
        self.assertEqual(len(read_log(fixture, 'sends.log')), 1)


class CrashWindowTests(unittest.TestCase):
    def test_crash_after_remote_send_reuses_same_idempotency_key(self):
        fixture = build_workspace(self, {'send': {'mode': 'crash'}})
        seed_submitted(fixture)
        first = run_script(fixture, 'receipts.py', '--send')
        self.assertNotEqual(first.returncode, 0)
        state = load_state(fixture, 'receipts.json')
        key = receipt_key('fixture-profile', EMMA['key'], HEADER)
        self.assertEqual(state['receipts'][key]['status'], 'sending')

        set_scenario(fixture, {'send': {'mode': 'success'}})
        second = run_script(fixture, 'receipts.py', '--send')
        self.assertEqual(second.returncode, 0, second.stderr)
        self.assertEqual(json.loads(second.stdout)['sent'], 1)
        sends = read_log(fixture, 'sends.log')
        self.assertEqual(len(sends), 2)
        self.assertEqual(sends[0]['idempotencyKey'], sends[1]['idempotencyKey'])
        self.assertEqual(load_state(fixture, 'receipts.json')['receipts'][key]['status'], 'sent')

    def test_uncertain_send_older_than_23h_needs_attention_without_resend(self):
        fixture = build_workspace(self)
        seed_submitted(fixture)
        key = receipt_key('fixture-profile', EMMA['key'], HEADER)
        old = (dt.datetime.now(TZ) - dt.timedelta(hours=24)).isoformat()
        save_state(fixture, 'receipts.json', {'enabledAt': old, 'receipts': {key: {
            'status': 'sending', 'attemptedAt': old, 'idempotencyKey': 'submission-' + key,
            'text': 'Hi Emma, thanks.', 'senderId': EMMA['dingtalkId'], 'sourceMessageId': 'm1'}}})
        result = run_script(fixture, 'receipts.py', '--send')
        self.assertEqual(result.returncode, 0, result.stderr)
        report = json.loads(result.stdout)
        self.assertEqual(report['sent'], 0)
        self.assertEqual(len(report['needsAttention']), 1)
        self.assertEqual(read_log(fixture, 'sends.log'), [])


if __name__ == '__main__':
    unittest.main()
