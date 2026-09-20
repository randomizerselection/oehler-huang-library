"""English-name acknowledgment delivery tests; DingTalk and platform reads are mocked."""
import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import english_name_ack as acknowledgments
from fetch import save


class EnglishNameAcknowledgmentTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.state = Path(self.temp.name) / 'english-name-updates.json'
        self.item = {
            'status': 'saved', 'studentKey': 'S3.3|1|student',
            'senderId': 'ding-student', 'englishName': 'Liam'
        }
        save(self.state, {'updates': {'source-message': dict(self.item)}})
        self.patches = [
            patch.object(acknowledgments, 'STATE', self.state),
            patch.object(acknowledgments, 'verify_saved'),
        ]
        for item in self.patches:
            item.start()

    def tearDown(self):
        for item in reversed(self.patches):
            item.stop()
        self.temp.cleanup()

    def test_confirmed_acknowledgment_is_sent_once(self):
        responses = [
            {'result': {'openTaskId': 'task'}},
            {'result': {'openMessageId': 'message', 'openConversationId': 'conversation'}},
        ]
        with patch.object(acknowledgments, 'cli', side_effect=responses) as api:
            self.assertEqual(acknowledgments.run(send=True)['sent'], 1)
            self.assertEqual(acknowledgments.run(send=True)['eligible'], 0)
        self.assertEqual(api.call_count, 2)

    def test_ambiguous_send_outcome_is_not_retried(self):
        with patch.object(acknowledgments, 'cli', side_effect=RuntimeError('connection lost')) as api:
            first = acknowledgments.run(send=True)
            second = acknowledgments.run(send=True)
        self.assertEqual(len(first['needsAttention']), 1)
        self.assertEqual(len(second['needsAttention']), 1)
        self.assertEqual(api.call_count, 1)
        state = json.loads(self.state.read_text(encoding='utf-8'))
        self.assertEqual(state['updates']['source-message']['acknowledgementStatus'], 'uncertain')
        self.assertTrue(state['updates']['source-message']['idempotencyKey'].startswith('english-name-'))


if __name__ == '__main__':
    unittest.main()
