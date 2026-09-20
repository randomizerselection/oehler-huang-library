"""Controller tests use synthetic files and transports; never students or providers."""
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from runner import Workflow, Overlap, attention, digest, read, save


class RunnerTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        self.state = self.root / 'state'
        self.calls = []
        self.messages = []
        self.responses = {}
        self.fail_script = None
        save(self.root / 'config.json', {'classes': ['S3.6']})
        save(self.root / 'assignments.json', [{'header': 'Homework', 'rule': 'Working required'}])
        self.workflow = Workflow('dingtalk-s36', self.root, self.root, self.execute)

    def execute(self, command, **kwargs):
        script, *args = [Path(command[1]).name, *command[2:]]
        self.calls.append((script, args))
        self.assertEqual(kwargs['env']['S36_RUN_ID'], self.workflow.record['runId'])
        if script == self.fail_script:
            return subprocess.CompletedProcess(command, 1, '{"error":"fixture failure"}', '')
        if script == 'fetch.py':
            save(self.state / 'pending.json', {'batchId': 'batch-1', 'end': '2026-09-19 18:00:00', 'messages': self.messages})
            save(self.state / 'latest-response.json', {'complete': True, 'result': {'conversationMessagesList': []}})
        if script == 'update.py' and args == ['prepare']:
            save(self.state / 'plan.json', {'batchId': 'batch-1', 'homeworkWrites': self.messages})
        if script == 'update.py' and args == ['commit']:
            save(self.state / 'ledger.json', {'processed': {m['messageId']: {'messageId': m['messageId']} for m in self.messages}})
        return subprocess.CompletedProcess(command, 0, json.dumps(self.responses.get(script, {})), '')

    def nonempty(self):
        self.messages = [{'messageId': 'm1', 'conversationId': 'c1', 'text': 'My answer', 'resources': [], 'candidates': []}]
        return self.workflow.collect()

    def prepare(self):
        self.nonempty()
        save(self.state / 'decisions.json', {'batchId': 'batch-1', 'decisions': [{'messageId': 'm1', 'action': 'submitted'}]})
        self.workflow.prepare()

    def test_empty_fetch_skips_media_model_plan_commit_and_still_delivers_backlog(self):
        result = self.workflow.collect()
        self.assertEqual(result['status'], 'ready-to-finish')
        self.workflow.finish()
        self.assertNotIn('update.py', [c[0] for c in self.calls])
        self.assertNotIn('media.py', [c[0] for c in self.calls])
        self.assertIn(('receipts.py', ['--send']), self.calls)
        self.assertEqual(read(self.state / 'ledger.json')['checkedThrough'], '2026-09-19 18:00:00')
        self.assertFalse(self.workflow.lock.exists())

    def test_collect_has_no_commit_or_send(self):
        self.nonempty()
        self.assertFalse(any('--send' in args or 'commit' in args for _, args in self.calls))
        self.assertEqual(self.workflow.record['phase'], 'review')

    def test_overlap_preserves_owner(self):
        self.workflow.collect()
        before = self.workflow.lock.read_bytes()
        other = Workflow('dingtalk-s36', self.root, self.root, self.execute)
        with self.assertRaises(Overlap):
            other.collect()
        self.assertEqual(self.workflow.lock.read_bytes(), before)

    def test_operation_lock_prevents_concurrent_commands(self):
        with self.workflow.operation():
            with self.assertRaises(Overlap):
                with self.workflow.operation():
                    self.fail('should not enter')
        self.assertFalse((self.state / 'runner-operation.lock').exists())

    def test_wrong_run_cannot_resume_or_release(self):
        self.workflow.collect()
        with self.assertRaises(ValueError):
            self.workflow.resume('other-run')
        self.assertTrue(self.workflow.lock.exists())

    def test_failed_fetch_stops_before_evidence_or_delivery(self):
        self.fail_script = 'fetch.py'
        with self.assertRaises(RuntimeError):
            self.workflow.collect()
        self.assertEqual([c[0] for c in self.calls], ['run_guard.py', 'fetch.py'])
        self.assertEqual(self.workflow.record['stages'][-1]['returncode'], 1)

    def test_finish_requires_actual_inspection_and_matching_digest(self):
        self.prepare()
        with self.assertRaises(ValueError):
            self.workflow.finish(digest(self.state / 'plan.json'))
        result = self.workflow.inspect()
        with self.assertRaises(ValueError):
            self.workflow.finish('wrong')
        self.workflow.finish(result['planSha256'])
        self.assertLess(self.calls.index(('update.py', ['commit'])), self.calls.index(('receipts.py', ['--send'])))

    def test_changed_plan_refused_without_commit(self):
        self.prepare()
        result = self.workflow.inspect()
        save(self.state / 'plan.json', {'forged': True})
        with self.assertRaises(ValueError):
            self.workflow.finish(result['planSha256'])
        self.assertNotIn(('update.py', ['commit']), self.calls)

    def test_changed_decisions_refused(self):
        self.prepare()
        save(self.state / 'decisions.json', {'batchId': 'batch-1', 'decisions': []})
        with self.assertRaises(ValueError):
            self.workflow.inspect()

    def test_refetch_refused_before_prepare(self):
        self.nonempty()
        save(self.state / 'pending.json', {'batchId': 'batch-2', 'messages': []})
        with self.assertRaises(ValueError):
            self.workflow.prepare()

    def test_empty_batch_cannot_replace_nonempty_review(self):
        self.nonempty()
        save(self.state / 'pending.json', {'batchId': 'batch-2', 'end': 'later', 'messages': []})
        with self.assertRaises(ValueError):
            self.workflow.finish()
        self.assertNotIn(('receipts.py', ['--send']), self.calls)

    def test_failed_commit_stops_all_delivery(self):
        self.prepare()
        result = self.workflow.inspect()
        self.fail_script = 'update.py'
        with self.assertRaises(RuntimeError):
            self.workflow.finish(result['planSha256'])
        self.assertEqual(self.workflow.record['phase'], 'committing')
        self.assertNotIn(('receipts.py', ['--send']), self.calls)

    def test_uncertain_delivery_surfaces_attention(self):
        self.responses['receipts.py'] = {'awaitingConfirmation': 1}
        self.workflow.collect()
        result = self.workflow.finish()
        self.assertEqual(result['status'], 'attention')

    def test_complete_is_not_reported_when_pending_remains(self):
        self.prepare()
        result = self.workflow.inspect()
        execute = self.workflow.execute
        def delayed(command, **kwargs):
            response = execute(command, **kwargs)
            if Path(command[1]).name == 'working_followups.py':
                save(self.state / 'pending.json', {'batchId': 'batch-2', 'messages': [{'messageId': 'm2'}]})
            return response
        self.workflow.execute = delayed
        result = self.workflow.finish(result['planSha256'])
        self.assertEqual(result['status'], 'attention')
        self.assertEqual(result['remainingMessageIds'], ['m2'])

    def test_packet_has_full_pending_text_and_links_context(self):
        self.nonempty()
        packet = read(self.state / 'review-packet.json')
        self.assertEqual(packet['messages'][0]['text'], 'My answer')
        self.assertEqual(packet['batchId'], 'batch-1')
        self.assertTrue(Path(packet['fullEvidence']).is_file())
        self.assertNotIn('resources', packet['messages'][0])

    def test_packet_rejects_incomplete_snapshot(self):
        self.workflow.collect()
        save(self.state / 'latest-response.json', {'complete': False})
        with self.assertRaises(ValueError):
            self.workflow.packet()

    def test_packet_orders_reverse_paged_history_and_keeps_latest_context(self):
        self.nonempty()
        history = [{'openMessageId': str(i), 'createTime': f'2026-09-19 12:{i:02d}:00',
                    'content': f'context {i}'} for i in reversed(range(20))]
        save(self.state / 'latest-response.json', {'complete': True, 'result': {
            'conversationMessagesList': [{'openConversationId': 'c1', 'messages': history}]}})
        self.workflow.packet()
        context = read(self.state / 'review-packet.json')['context']['c1']
        self.assertTrue(context['truncated'])
        self.assertEqual(context['messages'][-1]['openMessageId'], '19')
        self.assertEqual(context['messages'][0]['openMessageId'], '8')

    def test_stage_logs_are_durable_and_stdout_is_summarized(self):
        self.responses['fetch.py'] = {'pending': 0, 'messages': ['large evidence'] * 100}
        result = self.workflow.collect()
        stage = next(s for s in result['stages'] if s['script'] == 'fetch.py')
        self.assertNotIn('messages', stage['summary'])
        self.assertIn('large evidence', read(Path(stage['log']))['stdout'])
        self.assertGreaterEqual(stage['seconds'], 0)

    def test_native_failure_is_attention(self):
        self.assertTrue(attention({'native': {'error': 'Unavailable'}}))
        self.assertFalse(attention({'sent': 1}))

    def test_listener_failure_remains_visible_on_an_empty_check(self):
        self.responses['run_guard.py'] = {'checks': {'friendAcceptListener': 'down'}}
        collected = self.workflow.collect()
        self.assertEqual(collected['stages'][0]['summary']['friendAcceptListener'], 'down')
        self.assertEqual(self.workflow.finish()['status'], 'attention')

    def test_finished_run_distinguishes_script_time_from_time_between_commands(self):
        self.workflow.collect()
        self.workflow.record['startedAt'] = '2026-09-19T00:00:00+08:00'
        result = self.workflow.finish()
        timing = result['timing']
        self.assertAlmostEqual(timing['scriptSeconds'], sum(s['seconds'] for s in result['stages']), places=3)
        self.assertGreaterEqual(timing['betweenCommandsSeconds'], 0)
        self.assertAlmostEqual(timing['elapsedSeconds'], timing['scriptSeconds'] + timing['betweenCommandsSeconds'], places=2)


if __name__ == '__main__':
    unittest.main()
