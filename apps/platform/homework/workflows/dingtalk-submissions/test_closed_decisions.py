"""Tests for closing already-answered non-homework messages."""
import unittest

import update


class ClosedDecisionTests(unittest.TestCase):
    def setUp(self):
        self.message = {
            'messageId': 'question', 'conversationId': 'chat-1',
            'time': '2026-09-21 09:00:00',
        }
        self.snapshot = {'result': {'conversationMessagesList': [{
            'openConversationId': 'chat-1', 'messages': [{
                'openMessageId': 'teacher-reply',
                'senderOpenDingTalkId': update.CONFIG['selfOpenDingTalkId'],
                'createTime': '2026-09-21 09:10:00',
                'content': 'Here is the answer.',
            }]
        }]}}

    def test_later_human_teacher_reply_closes_message(self):
        update.validate_closed_decision(
            {'action': 'closed', 'answeredByMessageId': 'teacher-reply'},
            self.message, self.snapshot)

    def test_verified_assistant_reply_can_close_but_other_conversation_cannot(self):
        reply = self.snapshot['result']['conversationMessagesList'][0]['messages'][0]
        reply['messageAiSendFlag'] = 'DWS'
        update.validate_closed_decision(
            {'action': 'closed', 'answeredByMessageId': 'teacher-reply'},
            self.message, self.snapshot)
        self.snapshot['result']['conversationMessagesList'][0]['openConversationId'] = 'chat-2'
        with self.assertRaises(ValueError):
            update.validate_closed_decision(
                {'action': 'closed', 'answeredByMessageId': 'teacher-reply'},
                self.message, self.snapshot)


if __name__ == '__main__':
    unittest.main()
