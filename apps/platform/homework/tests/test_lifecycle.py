"""Exercise the real controller and adapters against a synthetic DingTalk inbox."""
import importlib.util
import json
from pathlib import Path
import subprocess
import sys
import unittest

HOME = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('s36_lifecycle_fixtures', HOME / 'workflows/dingtalk-s36/tests/fixtures.py')
fixtures = importlib.util.module_from_spec(spec)
spec.loader.exec_module(fixtures)


class LifecycleTests(unittest.TestCase):
    def make_fixture(self, messages):
        fixture = fixtures.build_workspace(self, {'pages': [
            {'cursor': '0', 'hasMore': False, 'conversations': [fixtures.conversation('conv-emma', messages)]}
        ]})
        registry = fixture.tmp / 'runtime.json'
        registry.write_text(json.dumps({'dingtalk-s36': {'runtimeRoot': str(fixture.ws)}}), encoding='utf-8')
        fixture.env['HOMEWORK_REGISTRY'] = str(registry)
        fixtures.save_state(fixture, 'receipts.json', {'enabledAt': '2026-09-01', 'receipts': {}})
        return fixture

    def run_stage(self, fixture, action, *args):
        result = subprocess.run([sys.executable, str(HOME / 'runner.py'), 'dingtalk-s36', action, *args],
                                cwd=fixture.ws, env=fixture.env, capture_output=True,
                                encoding='utf-8', errors='replace', timeout=120)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        return json.loads(result.stdout)

    def test_empty_check_uses_real_helpers_without_db_write_or_send(self):
        fixture = self.make_fixture([])
        before = fixture.db.read_bytes()
        collected = self.run_stage(fixture, 'collect')
        self.assertEqual(collected['status'], 'ready-to-finish')
        finished = self.run_stage(fixture, 'finish', '--run-id', collected['runId'])
        self.assertEqual(finished['status'], 'complete')
        self.assertEqual(fixture.db.read_bytes(), before)
        self.assertEqual(fixtures.calls_for(fixture, 'chat', 'message', 'send'), [])

    def test_review_commit_and_receipt_work_across_short_lived_processes(self):
        fixture = self.make_fixture([fixtures.wire_message('answer-1', fixtures.EMMA['dingtalkId'], '2026-09-18 10:00:00')])
        collected = self.run_stage(fixture, 'collect')
        batch = fixtures.load_state(fixture, 'pending.json')
        fixtures.save_state(fixture, 'decisions.json', {'batchId': batch['batchId'], 'decisions': [{
            'messageId': 'answer-1', 'studentKey': fixtures.EMMA['key'], 'assignment': fixtures.HEADER,
            'action': 'submitted', 'responseFormat': 'worked', 'workingPhotoPresent': True,
            'evidence': 'Synthetic worked answer reviewed for this test.'}]})
        fixtures.save_state(fixture, 'english-name-decisions.json', {'batchId': batch['batchId'], 'decisions': []})
        run_args = ('--run-id', collected['runId'])
        self.run_stage(fixture, 'prepare', *run_args)
        inspected = self.run_stage(fixture, 'inspect', *run_args)
        finished = self.run_stage(fixture, 'finish', *run_args, '--plan-sha256', inspected['planSha256'])
        self.assertEqual(finished['status'], 'complete')
        self.assertIn(fixtures.homework_row(fixture.db)['status'], ('submitted', 'late'))
        self.assertEqual(len(fixtures.calls_for(fixture, 'chat', 'message', 'send')), 1)
        self.assertFalse((fixture.state / 'run.lock').exists())
        # The next empty run confirms history is shared, so no receipt is resent.
        second = self.run_stage(fixture, 'collect')
        self.run_stage(fixture, 'finish', '--run-id', second['runId'])
        self.assertEqual(len(fixtures.calls_for(fixture, 'chat', 'message', 'send')), 1)


if __name__ == '__main__':
    unittest.main()
