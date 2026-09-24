"""Recovery regressions: no network, no real students, no wall-clock waits."""
import datetime as dt
import json
import unittest
from types import SimpleNamespace
from unittest.mock import patch

from fixtures import build_workspace, fresh_import, save_state


class RecoveryTests(unittest.TestCase):
    def setUp(self):
        self.fixture = build_workspace(self)
        self.module = fresh_import(self.fixture, 'absence_delivery')
        self.path = self.fixture.state / 'absence-followup-deliveries.json'
        self.recipient = {'recipientId': 'DING_EMMA', 'student': {'key': 'emma'}}
        self.state = {'messages': {}}
        self.args = ['--content', 'Hi Emma, please explain your absence.']
        self.calls = []
        self.delays = []
        self.scan = {'success': True, 'result': {'hasMore': False, 'conversationMessagesList': [
            {'singleChat': True, 'openConversationId': 'conv-emma', 'messages': []}]}}
        self.busy = {'error': {'retryable': True, 'reason': 'business_error',
                               'technical_detail': 'THREADPOOL_BUSY'}}
        save_state(self.fixture, 'latest-response.json', {'complete': True, 'result': {
            'hasMore': False, 'conversationMessagesList': [
                {'singleChat': True, 'openConversationId': 'conv-emma', 'messages': [
                    {'senderOpenDingTalkId': 'DING_EMMA'}]}]}})

    def sender(self, args):
        self.calls.append(args)
        if args[:3] == ['chat', 'message', 'send']:
            if self.send_count() == 1:
                raise self.module.DingTalkError(self.busy)
            return {'success': True, 'result': {'openTaskId': 'task-emma'}}
        if args[:3] == ['chat', 'message', 'list-all']:
            return self.scan
        return {'success': True, 'result': {'openMessageId': 'sent-emma', 'openConversationId': 'conv-emma'}}

    def send_count(self):
        return sum(args[:3] == ['chat', 'message', 'send'] for args in self.calls)

    def run_delivery(self, **kwargs):
        return self.module.deliver_bounded(self.state, self.path, 'absence-key', self.recipient,
                                           self.args, sender=self.sender, sleep=self.delays.append, **kwargs)

    def message(self, **overrides):
        return {'openMessageId': 'landed', 'senderOpenDingTalkId': 'SELF',
                'createTime': dt.datetime.now(self.module.TZ).isoformat(),
                'content': self.args[1], **overrides}

    def test_retryable_busy_is_inspected_and_retried_once(self):
        self.assertTrue(self.run_delivery())
        self.assertEqual(self.send_count(), 2)
        entry = self.state['messages']['absence-key']
        self.assertEqual(entry['busyRetries'], 1)
        self.assertEqual(entry['inspections'][0]['conversationId'], 'conv-emma')
        self.assertEqual(entry['status'], 'sent')

    def test_landed_text_is_confirmed_without_resending(self):
        self.scan['result']['conversationMessagesList'][0]['messages'] = [self.message()]
        self.assertTrue(self.run_delivery())
        self.assertEqual(self.send_count(), 1)
        self.assertEqual(self.state['messages']['absence-key']['openMessageId'], 'landed')

    def test_other_conversation_card_cannot_confirm_this_student(self):
        self.args = ['--msg-type', 'file', '--file-name', 'lesson.pdf']
        self.scan['result']['conversationMessagesList'].append({
            'singleChat': True, 'openConversationId': 'conv-leo', 'messages': [self.message(
                content='[file] lesson.pdf', resources=[{'resourceIdType': 'fileId', 'resourceId': 'FILE1'}])]})
        self.assertTrue(self.run_delivery(file_id='FILE1'))
        self.assertEqual(self.send_count(), 2)

    def test_exact_file_resource_in_verified_conversation_confirms_without_resend(self):
        self.args = ['--msg-type', 'file', '--file-name', 'lesson.pdf']
        self.scan['result']['conversationMessagesList'][0]['messages'] = [self.message(
            content='[file] lesson.pdf', resources=[{'resourceIdType': 'fileId', 'resourceId': 'FILE1'}])]
        self.assertTrue(self.run_delivery(file_id='FILE1'))
        self.assertEqual(self.send_count(), 1)

    def test_same_filename_without_matching_resource_stops(self):
        self.args = ['--msg-type', 'file', '--file-name', 'lesson.pdf']
        self.scan['result']['conversationMessagesList'][0]['messages'] = [self.message(content='[file] lesson.pdf')]
        with self.assertRaises(self.module.DeliveryAttention):
            self.run_delivery(file_id='FILE1')
        self.assertEqual(self.send_count(), 1)

    def test_incomplete_scan_does_not_clear_uncertain_send(self):
        self.scan['result']['hasMore'] = True
        with self.assertRaises(self.module.DeliveryAttention):
            self.run_delivery()
        self.assertEqual(self.send_count(), 1)
        self.assertEqual(self.state['messages']['absence-key']['status'], 'uncertain')

    def test_missing_conversation_is_not_evidence_of_absence(self):
        self.scan['result']['conversationMessagesList'] = []
        with self.assertRaises(self.module.DeliveryAttention):
            self.run_delivery()
        self.assertEqual(self.send_count(), 1)

    def test_unverified_conversation_stops_without_scanning(self):
        (self.fixture.state / 'latest-response.json').unlink()
        with self.assertRaises(self.module.DeliveryAttention):
            self.run_delivery()
        self.assertEqual(len(self.calls), 1)

    def test_nonretryable_and_unknown_errors_never_retry(self):
        self.busy['error']['retryable'] = False
        with self.assertRaises(self.module.DeliveryAttention):
            self.run_delivery()
        self.assertEqual(len(self.calls), 1)

    def test_timeout_never_authorizes_a_resend(self):
        def timed_out(args):
            self.calls.append(args)
            raise TimeoutError('No transport result')
        self.sender = timed_out
        with self.assertRaises(self.module.DeliveryAttention):
            self.run_delivery()
        self.assertEqual(self.send_count(), 1)
        self.assertEqual(self.state['messages']['absence-key']['status'], 'uncertain')

    def test_scan_failure_stays_uncertain_and_reports_attention(self):
        original = self.sender
        def failing_scan(args):
            if args[:3] == ['chat', 'message', 'list-all']:
                raise self.module.DingTalkError({'error': {'message': 'read failed'}})
            return original(args)
        self.sender = failing_scan
        with self.assertRaisesRegex(self.module.DeliveryAttention, 'recovery inspection failed'):
            self.run_delivery()
        self.assertEqual(self.send_count(), 1)
        self.assertEqual(self.state['messages']['absence-key']['status'], 'uncertain')

    def test_second_busy_failure_stops_and_preserves_evidence(self):
        original = self.sender
        def always_busy(args):
            if args[:3] == ['chat', 'message', 'send']:
                self.calls.append(args)
                raise self.module.DingTalkError(self.busy)
            return original(args)
        self.sender = always_busy
        with self.assertRaises(self.module.DeliveryAttention):
            self.run_delivery()
        self.assertEqual(self.send_count(), 2)
        prior = self.path.read_bytes()
        with self.assertRaises(self.module.DeliveryAttention):
            self.run_delivery()
        self.assertEqual(self.path.read_bytes(), prior)
        self.assertEqual(self.send_count(), 2)

    def test_pending_task_is_polled_without_resending(self):
        self.state['messages']['absence-key'] = {'status': 'awaiting-confirmation', 'openTaskId': 'existing'}
        count = 0
        def sender(args):
            nonlocal count
            self.calls.append(args)
            self.assertEqual(args[:3], ['chat', 'message', 'query-send-status'])
            count += 1
            return {'result': {'openMessageId': 'done', 'openConversationId': 'conv-emma'} if count == 3 else {}}
        self.sender = sender
        self.assertTrue(self.run_delivery())
        self.assertEqual(self.send_count(), 0)
        self.assertEqual(count, 3)

    def test_stalled_confirmation_stops_after_three_reads(self):
        self.state['messages']['absence-key'] = {'status': 'awaiting-confirmation', 'openTaskId': 'existing'}
        def pending(args):
            self.calls.append(args)
            return {'result': {}}
        self.sender = pending
        with self.assertRaisesRegex(self.module.DeliveryAttention, 'confirmation still pending'):
            self.run_delivery()
        self.assertEqual(len(self.calls), 3)
        self.assertEqual(self.send_count(), 0)

    def test_expired_recovery_budget_does_not_query_or_resend(self):
        self.state['messages']['absence-key'] = {'status': 'awaiting-confirmation', 'openTaskId': 'existing'}
        times = iter([0, 121])
        with self.assertRaisesRegex(self.module.DeliveryAttention, 'budget exhausted'):
            self.run_delivery(clock=lambda: next(times))
        self.assertEqual(self.calls, [])

    def test_stderr_json_retains_retryable_error(self):
        import sys
        fetch = sys.modules['fetch']
        with patch.object(fetch.subprocess, 'run', return_value=SimpleNamespace(
                stdout='', stderr=json.dumps(self.busy), returncode=1)) as run:
            with self.assertRaises(fetch.DingTalkError) as error:
                fetch.cli(['chat', 'message', 'query-send-status'], timeout=12)
            self.assertTrue(error.exception.payload['error']['retryable'])
            self.assertEqual(run.call_args.kwargs['timeout'], 12)


if __name__ == '__main__':
    unittest.main()
