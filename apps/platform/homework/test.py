"""Run isolated homework suites without provider credentials or a live registry."""
from concurrent.futures import ThreadPoolExecutor
import argparse
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile

HOME = Path(__file__).resolve().parent


def suite(name, command, cwd):
    env = dict(os.environ, PYTHONUTF8='1')
    for key in ('HOMEWORK_REGISTRY', 'QQ_CONFIG_PATH', 'S36_CONFIG_PATH', 'QQ_RUN_ID', 'S36_RUN_ID'):
        env.pop(key, None)
    result = subprocess.run([sys.executable, *command], cwd=cwd, env=env,
                            capture_output=True, encoding='utf-8', errors='replace', timeout=900)
    output = result.stdout + '\n' + result.stderr
    lines = [line for line in output.splitlines() if line.startswith(('Ran ', 'OK', 'FAIL'))]
    return name, result.returncode, lines, output


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--suite', choices=('controller', 's33', 's36', 'qq'))
    args = parser.parse_args()
    with tempfile.TemporaryDirectory(prefix='homework-s33-tests-') as directory:
        # Old S3.3/S3.4 tests import modules before patching their paths. Give them
        # a synthetic local config so even imports never consult the live registry.
        root = Path(directory)
        for source in (HOME / 'workflows/dingtalk-submissions').glob('*.py'):
            shutil.copyfile(source, root / source.name)
        shutil.copyfile(HOME / 'student_messages.py', root / 'student_messages.py')
        shutil.copyfile(HOME / 'absence_periods.py', root / 'absence_periods.py')
        (root / 'config.json').write_text(json.dumps({
            'classes': ['S3.3', 'S3.4'], 'cli': 'fixture-no-live-cli', 'profile': 'fixture',
            'platformDatabase': str(root / 'must-not-open.sqlite'), 'platformProject': str(root),
            'selfOpenDingTalkId': 'SELF', 'start': '2026-09-15 00:00:00'}), encoding='utf-8')
        (root / 'assignments.json').write_text('[]', encoding='utf-8')
        jobs = [
            ('controller', ['-m', 'unittest', 'discover', '-s', str(HOME / 'tests')], HOME),
            ('S3.3/S3.4', ['-m', 'unittest', 'discover'], root),
            ('S3.6', ['tests/run_tests.py'], HOME / 'workflows/dingtalk-s36'),
            ('QQ/IC3', ['tests/run_tests.py'], HOME / 'workflows/qq-ic3'),
        ]
        if args.suite:
            jobs = [jobs[('controller', 's33', 's36', 'qq').index(args.suite)]]
        with ThreadPoolExecutor(max_workers=4) as pool:
            results = list(pool.map(lambda args: suite(*args), jobs))
        for name, code, lines, output in results:
            print(f'{name}: ' + ' | '.join(lines))
            if code:
                print(output)
        return int(any(row[1] for row in results))


if __name__ == '__main__':
    raise SystemExit(main())
