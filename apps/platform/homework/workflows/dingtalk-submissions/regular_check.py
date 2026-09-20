from pathlib import Path
"""Explicit regular-check lifecycle; intentionally excludes campaigns and absence sends."""
import argparse
import json
import subprocess
import sys

from pathlib import Path
from fetch import ROOT
SOURCE_ROOT = Path(__file__).resolve().parent


def stage_commands(stage):
    python = sys.executable
    scripts = {
        'fetch': [[python, str(Path(__file__).with_name('fetch.py'))]],
        'evidence': [
            [python, str(SOURCE_ROOT / 'media.py')],
            [python, str(SOURCE_ROOT / 'reply_queue.py'), 'prepare'],
        ],
        'prepare': [[python, str(SOURCE_ROOT / 'update.py'), 'prepare']],
        'inspect': [[python, str(SOURCE_ROOT / 'update.py'), 'inspect']],
        'commit': [[python, str(SOURCE_ROOT / 'update.py'), 'commit']],
        'deliver': [
            [python, str(SOURCE_ROOT / 'receipts.py'), '--send'],
            [python, str(SOURCE_ROOT / 'working_followups.py')],
            [python, str(SOURCE_ROOT / 'english_name_ack.py'), '--send'],
        ],
        'reply-queue': [[python, str(SOURCE_ROOT / 'reply_queue.py'), 'apply']],
    }
    return scripts[stage]


def run(stage, runner=subprocess.run):
    results = []
    for command in stage_commands(stage):
        completed = runner(command, cwd=ROOT, capture_output=True, text=True, timeout=600)
        result = {'command': [str(part) for part in command[1:]], 'returncode': completed.returncode,
                  'stdout': completed.stdout.strip(), 'stderr': completed.stderr.strip()}
        results.append(result)
        if completed.returncode:
            raise RuntimeError(json.dumps({'stage': stage, 'status': 'failed', 'results': results}, ensure_ascii=True))
    attention = []
    for result in results:
        try:
            payload = json.loads(result['stdout']) if result['stdout'] else {}
        except ValueError:
            continue
        if not isinstance(payload, dict):
            continue
        if payload.get('needsAttention'):
            attention.extend(payload['needsAttention'])
        if payload.get('awaitingConfirmation'):
            attention.append({'reason': f"{payload['awaitingConfirmation']} delivery task(s) await confirmation"})
        native = payload.get('native')
        if isinstance(native, dict) and native.get('error'):
            attention.append({'reason': 'Native reply queue update failed', 'detail': native['error']})
    return {'stage': stage, 'status': 'attention' if attention else 'complete',
            'attention': attention, 'results': results}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('stage', choices=('fetch', 'evidence', 'prepare', 'inspect', 'commit', 'deliver', 'reply-queue'))
    args = parser.parse_args()
    print(json.dumps(run(args.stage), ensure_ascii=True))


if __name__ == '__main__':
    main()
