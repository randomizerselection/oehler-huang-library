"""Tests for reviewed absence-reason receipts. No DingTalk calls are made."""
import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import absence_receipts as receipts


class AbsenceReceiptTests(unittest.TestCase):
    def row(self):
        return {
            'attendance_log_id': 'attendance-1',
            'response_message_id': 'response-1',
            'conversation_id': 'conversation-1',
            'recipient_external_id': 'student-ding-id',
            'reason_text': 'Medical appointment',
            'student_account_id': 'student-1',
            'preferred_name': 'Ashley',
        }

    def test_receipt_requires_routine_review_and_is_idempotent(self):
        row = self.row()
        key = receipts.review_key(row['conversation_id'], row['response_message_id'])
        with tempfile.TemporaryDirectory() as directory:
            state = Path(directory) / 'receipts.json'
            personal = Path(directory) / 'personal.json'
            personal.write_text(json.dumps({'reviews': {key: {'status': 'routine'}}}), encoding='utf-8')
            calls = []

            def fake_deliver(saved, message_key, recipient, args, state_path):
                calls.append((message_key, recipient, args))
                saved['messages'][message_key].update(status='sent')
                receipts.save(state_path, saved)
                return True

            with patch.object(receipts, 'eligible_rows', return_value=[row]), \
                 patch.object(receipts, 'deliver', side_effect=fake_deliver):
                result = receipts.run(send=True, state_path=state, personal_path=personal)
                repeated = receipts.run(send=True, state_path=state, personal_path=personal)

            self.assertEqual(result['sent'], 1)
            self.assertEqual(result['alreadyConfirmed'], 0)
            self.assertEqual(repeated['sent'], 0)
            self.assertEqual(repeated['alreadyConfirmed'], 1)
            self.assertEqual(calls[0][2], ['--content', receipts.receipt_text(row)])
            saved = json.loads(state.read_text(encoding='utf-8'))
            self.assertEqual(saved['messages'][calls[0][0]]['sourceMessageId'], 'response-1')

    def test_unreviewed_reason_is_not_sent(self):
        row = self.row()
        with tempfile.TemporaryDirectory() as directory:
            state = Path(directory) / 'receipts.json'
            personal = Path(directory) / 'personal.json'
            personal.write_text(json.dumps({'reviews': {}}), encoding='utf-8')
            with patch.object(receipts, 'eligible_rows', return_value=[row]), \
                 patch.object(receipts, 'deliver') as deliver:
                result = receipts.run(send=True, state_path=state, personal_path=personal)
            self.assertEqual(result['sent'], 0)
            self.assertEqual(len(result['needsAttention']), 1)
            deliver.assert_not_called()

    def test_saved_delivery_text_is_preserved_after_identity_change(self):
        row = self.row()
        key = receipts.review_key(row['conversation_id'], row['response_message_id'])
        message_key = receipts.receipt_key(row)
        original = 'Hi Ashley, your absence reason has been recorded.'
        with tempfile.TemporaryDirectory() as directory:
            state = Path(directory) / 'receipts.json'
            personal = Path(directory) / 'personal.json'
            personal.write_text(json.dumps({'reviews': {key: {'status': 'routine'}}}), encoding='utf-8')
            state.write_text(json.dumps({'messages': {message_key: {
                'status': 'awaiting-confirmation', 'openTaskId': 'original-task',
                'text': original}}}), encoding='utf-8')
            with patch.object(receipts, 'eligible_rows', return_value=[row]), \
                 patch.object(receipts, 'deliver', return_value=False) as deliver:
                receipts.run(send=True, state_path=state, personal_path=personal)
            self.assertEqual(deliver.call_args.args[1], message_key)
            self.assertEqual(deliver.call_args.args[3], ['--content', original])
            self.assertEqual(json.loads(state.read_text())['messages'][message_key]['openTaskId'], 'original-task')


if __name__ == '__main__':
    unittest.main()
