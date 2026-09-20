"""Offline before/after measurements; copies evidence, never contacts transports.

Requires a saved runner baseline. Output is aggregate sizes and synthetic read
timings only. Private snapshots and results must stay outside Git/public roots.
"""
import argparse
import importlib.util
import json
from pathlib import Path
import shutil
import statistics
import tempfile
import time
from unittest.mock import patch

from runner import Workflow, control_response, read

HOME = Path(__file__).resolve().parent


def load_module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def comparison(before, after):
    return {'before': before, 'after': after, 'reductionPercent': round(100 * (1 - after / before), 1) if before else 0}


def packets(baseline, registry):
    results = {}
    for profile, config in read(registry).items():
        live = Path(config['runtimeRoot'])
        with tempfile.TemporaryDirectory(prefix='homework-packet-benchmark-') as directory:
            root = Path(directory)
            (root / 'state').mkdir()
            for name in ('pending.json', 'latest-response.json', 'media.json', 'ocr.json',
                         'personal-attention.json', 'personal-reply-review.json'):
                source = live / 'state' / name
                if source.exists():
                    shutil.copyfile(source, root / 'state' / name)
            shutil.copyfile(live / 'assignments.json', root / 'assignments.json')
            before_workflow = baseline.Workflow(profile, root, root)
            before = before_workflow.packet()['packetBytes']
            after_workflow = Workflow(profile, root, root)
            after = after_workflow.packet()['packetBytes']
            row = {'sameEvidenceBytes': comparison(before, after),
                   'pendingMessages': len(read(root / 'state/pending.json')['messages'])}
            if profile != 'dingtalk-submissions':
                items = read(root / 'state/personal-attention.json', {}).get('items', {})
                unchanged_report = {'new': [], 'changed': [],
                                    'openCount': sum(i.get('status') == 'open' for i in items.values())}
                after = after_workflow.packet(unchanged_report)['packetBytes']
                row['unchangedPersonalRequestsBytes'] = comparison(before, after)
                row['historicalPersonalEntries'] = len(items)
            results[profile] = row
    return results


def control_sizes():
    # A reproducible eight-stage successful run; no real student content.
    record = {'runId': 'run-' + 'a' * 32, 'profile': 'qq-ic3', 'status': 'complete',
              'phase': 'delivering', 'remainingMessageIds': [], 'stages': [],
              'startedAt': '2026-09-19T20:00:00+08:00', 'finishedAt': '2026-09-19T20:01:00+08:00',
              'preparedInputs': {key: 'f' * 64 for key in ('pending.json', 'decisions.json', 'config.json', 'assignments.json')},
              'collectedInputs': {key: 'a' * 64 for key in ('pending.json', 'decisions.json', 'config.json', 'assignments.json')}}
    for script in ('run_guard.py', 'fetch.py', 'personal_requests.py', 'update.py',
                   'receipts.py', 'working_followups.py', 'english_name_ack.py', 'feedback.py'):
        record['stages'].append({'script': script, 'arguments': [], 'seconds': 0.1,
                                'returncode': 0, 'outputBytes': 100, 'attention': False,
                                'summary': {'sent': 0}, 'log': 'C:/private/homework/state/runs/' + record['runId'] + '/' + script + '.json'})
    old = len(json.dumps(record, ensure_ascii=True).encode())
    new = len(json.dumps(control_response(record, 'C:/private/run.json'), ensure_ascii=False, separators=(',', ':')).encode())
    return comparison(old, new)


def history_timing():
    with tempfile.TemporaryDirectory(prefix='homework-history-benchmark-') as directory:
        root = Path(directory)
        shutil.copyfile(HOME / 'workflows/qq-ic3/qq_cli.py', root / 'qq_cli.py')
        (root / 'config.json').write_text('{}', encoding='utf-8')
        with patch.dict('os.environ', {'QQ_CONFIG_PATH': str(root / 'config.json')}):
            cli = load_module('isolated_benchmark_qq', root / 'qq_cli.py')
        contacts = [{'userId': str(i)} for i in range(1, 13)]
        def slow_read(action, payload):
            time.sleep(0.03)
            return {'messages': [payload['user_id']]}
        sequential, concurrent = [], []
        with patch.object(cli, 'call_api', slow_read):
            for _ in range(5):
                start = time.perf_counter()
                old = [slow_read('get_friend_msg_history', {'user_id': int(c['userId'])})['messages'] for c in contacts]
                sequential.append(time.perf_counter() - start)
                start = time.perf_counter()
                new = [messages for _, messages in cli.history_pages(contacts, 0, 0, 100)]
                concurrent.append(time.perf_counter() - start)
                assert old == new
        return comparison(round(statistics.median(sequential), 4), round(statistics.median(concurrent), 4))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--baseline', type=Path, required=True)
    parser.add_argument('--registry', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    baseline = load_module('baseline_runner', args.baseline)
    result = {'packetSnapshots': packets(baseline, args.registry),
              'syntheticFinishResponseBytes': control_sizes(),
              'syntheticHistorySeconds': history_timing(),
              'limitations': 'Bytes are not model tokens. History uses 12 independent 30ms mock reads, five repetitions; no live latency or billing measured.'}
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(result, indent=2), encoding='utf-8')
    print(json.dumps(result, indent=2))


if __name__ == '__main__':
    main()
