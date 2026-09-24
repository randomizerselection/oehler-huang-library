"""S3.6 reviewed absence-reason acknowledgment tests. No DingTalk calls are made."""
import json
import unittest
from unittest.mock import patch

from fixtures import build_workspace, fresh_import


class AbsenceReceiptTests(unittest.TestCase):
    def row(self):
        return {
            'attendance_log_id': 'attendance-1', 'response_message_id': 'response-1',
            'conversation_id': 'conversation-1', 'recipient_external_id': 'DING_EMMA',
            'reason_text': 'I was ill.', 'absence_start_date': None, 'absence_end_date': None,
            'student_account_id': 'acct-emma', 'preferred_name': 'Emma',
        }

    def test_first_run_baselines_existing_reasons_without_sending(self):
        fixture = build_workspace(self)
        receipts = fresh_import(fixture, 'absence_receipts')
        with patch.object(receipts, 'eligible_rows', return_value=[self.row()]), \
             patch.object(receipts, 'deliver') as deliver:
            result = receipts.run(send=True)
        self.assertTrue(result['initialized'])
        self.assertEqual(result['preExistingReasons'], 1)
        deliver.assert_not_called()

    def test_new_reviewed_reason_is_sent_once(self):
        fixture = build_workspace(self)
        receipts = fresh_import(fixture, 'absence_receipts')
        receipts.save(receipts.STATE, {'enabledAt': '2026-09-22T00:00:00+08:00', 'messages': {}})
        receipts.save(receipts.LEDGER, {'processed': {'response-1': {
            'messageId': 'response-1', 'action': 'absence_reason'}}})
        calls = []

        def fake_deliver(state, state_path, key, recipient, args):
            calls.append((key, recipient, args))
            state['messages'][key].update(status='sent', openMessageId='ack-1')
            receipts.save(state_path, state)
            return True

        with patch.object(receipts, 'eligible_rows', return_value=[self.row()]), \
             patch.object(receipts, 'deliver', side_effect=fake_deliver):
            first = receipts.run(send=True)
            second = receipts.run(send=True)
        self.assertEqual(first['sent'], 1)
        self.assertEqual(second['alreadyConfirmed'], 1)
        self.assertEqual(len(calls), 2)  # The helper rechecks confirmation but never creates a new intent.
        saved = json.loads(receipts.STATE.read_text(encoding='utf-8'))
        entry = next(iter(saved['messages'].values()))
        self.assertEqual(entry['sourceMessageId'], 'response-1')

    def test_unreviewed_new_reason_needs_attention_and_is_not_sent(self):
        fixture = build_workspace(self)
        receipts = fresh_import(fixture, 'absence_receipts')
        receipts.save(receipts.STATE, {'enabledAt': '2026-09-22T00:00:00+08:00', 'messages': {}})
        receipts.save(receipts.LEDGER, {'processed': {}})
        with patch.object(receipts, 'eligible_rows', return_value=[self.row()]), \
             patch.object(receipts, 'deliver') as deliver:
            result = receipts.run(send=True)
        self.assertEqual(result['sent'], 0)
        self.assertEqual(len(result['needsAttention']), 1)
        deliver.assert_not_called()


if __name__ == '__main__':
    unittest.main()
