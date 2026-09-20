"""Fixture regression suite for the dingtalk-s36 automation.

Run from the automation directory:  python tests/run_tests.py

Every test copies the automation scripts into a temp directory, so no test
touches the real state/. As a belt-and-braces guard, the real state/ tree is
hash-snapshotted before and after the whole suite; any change fails the run.
"""
import sys
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))

from fixtures import REAL_DIR, state_snapshot  # noqa: E402


def main():
    before = state_snapshot(REAL_DIR / 'state')
    loader = unittest.TestLoader()
    suite = loader.discover(str(HERE), pattern='test_*.py')
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    after = state_snapshot(REAL_DIR / 'state')
    guard_ok = before == after
    if not guard_ok:
        print('\nREAL-STATE GUARD FAILURE: the suite changed files under the real state/ directory')
        for path in sorted(set(before) | set(after)):
            if before.get(path) != after.get(path):
                print(f'  changed: {path}')
    ok = result.wasSuccessful() and guard_ok
    print(f"\n{'OK' if ok else 'FAILURE'} (tests run: {result.testsRun}, "
          f"failures: {len(result.failures)}, errors: {len(result.errors)}, "
          f"real-state guard: {'pass' if guard_ok else 'FAIL'})")
    sys.exit(0 if ok else 1)


if __name__ == '__main__':
    main()
