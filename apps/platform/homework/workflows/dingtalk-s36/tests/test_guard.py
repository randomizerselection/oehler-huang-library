"""Scenario groups 1 and 2: preflight account checks and the run lock."""
import datetime as dt
import json
import os
import unittest

from fixtures import (TZ, build_workspace, calls_for, fresh_import, load_state,
                      run_script, set_scenario, state_snapshot)


class PreflightTests(unittest.TestCase):
    def test_preflight_success(self):
        fixture = build_workspace(self, {'getSelf': {'mode': 'success'}})
        result = run_script(fixture, 'run_guard.py', 'preflight')
        self.assertEqual(result.returncode, 0, result.stderr + result.stdout)
        report = json.loads(result.stdout)
        self.assertEqual(report['status'], 'ok')
        self.assertEqual(report['checks']['account'], {'corpId': 'CORP5', 'userId': 'USER5'})
        self.assertEqual(report['checks']['platformSchemaVersion'], 21)

    def test_preflight_success_snake_case_and_flat_shapes(self):
        for mode in ('snake', 'flat'):
            fixture = build_workspace(self, {'getSelf': {'mode': mode}})
            result = run_script(fixture, 'run_guard.py', 'preflight')
            self.assertEqual(result.returncode, 0, f'{mode}: ' + result.stdout + result.stderr)

    def test_preflight_nested_production_shape(self):
        fixture = build_workspace(self, {'getSelf': {'mode': 'nested'}})
        result = run_script(fixture, 'run_guard.py', 'preflight')
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        report = json.loads(result.stdout)
        self.assertEqual(report['checks']['account'], {'corpId': 'CORP5', 'userId': 'USER5'})

    def test_preflight_nested_wrong_org_fails_closed(self):
        fixture = build_workspace(self, {'getSelf': {'mode': 'nested-wrong-org'}})
        result = run_script(fixture, 'run_guard.py', 'preflight')
        self.assertEqual(result.returncode, 5, result.stdout)
        self.assertIn('account mismatch', result.stdout)

    def test_preflight_wrong_org_fails_closed_without_state_writes(self):
        fixture = build_workspace(self, {'getSelf': {'mode': 'wrong-org'}})
        before = state_snapshot(fixture.state)
        result = run_script(fixture, 'run_guard.py', 'preflight')
        self.assertEqual(result.returncode, 5, result.stdout)
        self.assertIn('account mismatch', result.stdout)
        self.assertEqual(before, state_snapshot(fixture.state))

    def test_preflight_auth_failure_exit4_single_attempt(self):
        fixture = build_workspace(self, {'getSelf': {'mode': 'auth-failure'}})
        result = run_script(fixture, 'run_guard.py', 'preflight')
        self.assertEqual(result.returncode, 4, result.stdout)
        self.assertIn('sign-in required', result.stdout)
        self.assertEqual(len(calls_for(fixture, 'contact', 'user', 'get-self')), 1)

    def test_preflight_malformed_output_is_a_clear_error(self):
        fixture = build_workspace(self, {'getSelf': {'mode': 'malformed'}})
        result = run_script(fixture, 'run_guard.py', 'preflight')
        self.assertNotIn(result.returncode, (0, 4, 5))
        self.assertIn('non-JSON', result.stdout)


class RunLockTests(unittest.TestCase):
    def test_begin_overlap_end_lifecycle(self):
        fixture = build_workspace(self)
        owner_env = {'S36_RUN_OWNER_PID': str(os.getpid())}
        first = run_script(fixture, 'run_guard.py', 'begin', extra_env=owner_env)
        self.assertEqual(first.returncode, 0, first.stdout + first.stderr)
        run_id = json.loads(first.stdout)['runId']
        self.assertTrue((fixture.state / 'run.lock').exists())
        self.assertTrue((fixture.state / 'runs' / f'{run_id}.json').exists())

        second = run_script(fixture, 'run_guard.py', 'begin')
        self.assertEqual(second.returncode, 3, second.stdout)
        skipped = json.loads(second.stdout)
        self.assertEqual(skipped['status'], 'skipped')
        self.assertEqual(skipped['reason'], 'overlap')
        # The overlap attempt created no new run records and left the lock intact.
        self.assertEqual(len(list((fixture.state / 'runs').glob('*.json'))), 1)
        self.assertEqual(load_state(fixture, 'run.lock')['runId'], run_id)

        beat = run_script(fixture, 'run_guard.py', 'heartbeat')
        self.assertEqual(beat.returncode, 0, beat.stdout)
        self.assertEqual(json.loads(beat.stdout)['runId'], run_id)

        end = run_script(fixture, 'run_guard.py', 'end', '--status', 'complete',
                         '--notes', '{"summary": "all quiet"}')
        self.assertEqual(end.returncode, 0, end.stdout + end.stderr)
        record = load_state(fixture, f'runs/{run_id}.json')
        self.assertEqual(record['status'], 'complete')
        self.assertEqual(record['summary'], 'all quiet')
        self.assertIn('finishedAt', record)
        self.assertFalse((fixture.state / 'run.lock').exists())

        status = run_script(fixture, 'run_guard.py', 'status')
        self.assertEqual(status.returncode, 0)
        self.assertFalse(json.loads(status.stdout)['locked'])

    def test_stale_lock_from_dead_pid_is_recovered_by_rename(self):
        fixture = build_workspace(self)
        old = dt.datetime.now(TZ) - dt.timedelta(hours=12)
        stale = {'runId': 'run-old', 'pid': 999999,
                 'startedAt': old.isoformat(), 'heartbeatAt': old.isoformat()}
        (fixture.state / 'run.lock').write_text(json.dumps(stale), encoding='utf-8')
        result = run_script(fixture, 'run_guard.py', 'begin')
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        run_id = json.loads(result.stdout)['runId']
        stale_files = list(fixture.state.glob('run.lock.stale-*'))
        self.assertEqual(len(stale_files), 1)
        self.assertEqual(json.loads(stale_files[0].read_text(encoding='utf-8'))['runId'], 'run-old')
        self.assertTrue((fixture.state / 'run.lock').exists())
        record = load_state(fixture, f'runs/{run_id}.json')
        self.assertEqual(record['staleLock']['previousOwner']['runId'], 'run-old')

    def seed_lock(self, fixture, pid, heartbeat_age):
        moment = dt.datetime.now(TZ) - heartbeat_age
        lock = {'runId': 'run-existing', 'pid': pid,
                'startedAt': moment.isoformat(), 'heartbeatAt': moment.isoformat()}
        (fixture.state / 'run.lock').write_text(json.dumps(lock), encoding='utf-8')
        return lock

    def assert_overlap_skip(self, fixture, lock):
        result = run_script(fixture, 'run_guard.py', 'begin')
        self.assertEqual(result.returncode, 3, result.stdout)
        report = json.loads(result.stdout)
        self.assertEqual(report['status'], 'skipped')
        self.assertEqual(report['reason'], 'overlap')
        # Lock untouched, no stale rename, no new run record.
        self.assertEqual(load_state(fixture, 'run.lock'), lock)
        self.assertEqual(list(fixture.state.glob('run.lock.stale-*')), [])
        self.assertFalse((fixture.state / 'runs').exists())

    def assert_stale_recovery(self, fixture):
        result = run_script(fixture, 'run_guard.py', 'begin')
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertEqual(len(list(fixture.state.glob('run.lock.stale-*'))), 1)
        run_id = json.loads(result.stdout)['runId']
        self.assertEqual(load_state(fixture, 'run.lock')['runId'], run_id)

    def test_dead_pid_recent_heartbeat_still_blocks_within_grace_window(self):
        fixture = build_workspace(self)
        lock = self.seed_lock(fixture, 999999, dt.timedelta(minutes=5))
        self.assert_overlap_skip(fixture, lock)

    def test_dead_pid_old_heartbeat_is_stale_after_grace_window(self):
        fixture = build_workspace(self)
        self.seed_lock(fixture, 999999, dt.timedelta(hours=2))
        self.assert_stale_recovery(fixture)

    def test_live_pid_recent_heartbeat_blocks(self):
        fixture = build_workspace(self)
        lock = self.seed_lock(fixture, os.getpid(), dt.timedelta(minutes=5))
        self.assert_overlap_skip(fixture, lock)

    def test_live_pid_very_old_heartbeat_is_stale(self):
        fixture = build_workspace(self)
        self.seed_lock(fixture, os.getpid(), dt.timedelta(hours=7))
        self.assert_stale_recovery(fixture)

    def test_live_owner_with_stale_heartbeat_is_recovered(self):
        fixture = build_workspace(self)
        old = dt.datetime.now(TZ) - dt.timedelta(hours=12)
        stale = {'runId': 'run-old', 'pid': os.getpid(),
                 'startedAt': old.isoformat(), 'heartbeatAt': old.isoformat()}
        (fixture.state / 'run.lock').write_text(json.dumps(stale), encoding='utf-8')
        result = run_script(fixture, 'run_guard.py', 'begin')
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertEqual(len(list(fixture.state.glob('run.lock.stale-*'))), 1)

    def test_heartbeat_without_lock_warns_but_succeeds(self):
        fixture = build_workspace(self)
        result = run_script(fixture, 'run_guard.py', 'heartbeat')
        self.assertEqual(result.returncode, 0)
        self.assertEqual(json.loads(result.stdout)['status'], 'warning')

    def test_end_without_lock_fails(self):
        fixture = build_workspace(self)
        result = run_script(fixture, 'run_guard.py', 'end', '--status', 'complete')
        self.assertNotEqual(result.returncode, 0)


class ConfigHookTests(unittest.TestCase):
    def test_s36_config_path_env_overrides_config(self):
        fixture = build_workspace(self)
        alternate = fixture.tmp / 'alternate.json'
        config = json.loads((fixture.ws / 'config.json').read_text(encoding='utf-8'))
        config['profile'] = 'alternate-profile'
        alternate.write_text(json.dumps(config), encoding='utf-8')
        os.environ['S36_CONFIG_PATH'] = str(alternate)
        try:
            module = fresh_import(fixture, 'fetch')
            self.assertEqual(module.CONFIG['profile'], 'alternate-profile')
        finally:
            del os.environ['S36_CONFIG_PATH']
        module = fresh_import(fixture, 'fetch')
        self.assertEqual(module.CONFIG['profile'], 'fixture-profile')


if __name__ == '__main__':
    unittest.main()
