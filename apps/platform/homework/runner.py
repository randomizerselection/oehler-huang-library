"""Common, resumable homework lifecycle. No model calls and no campaign commands.

collect -> agent review -> prepare -> inspect -> finish
Only finish commits reviewed decisions and delivers existing authorized responses.
All raw output stays in the private runtime; stdout is a small control envelope.
"""
import argparse
import contextlib
import datetime as dt
import hashlib
import json
import os
from pathlib import Path
import subprocess
import sys
import time
import uuid

from runtime import PROFILES, runtime_root, source_root

TZ = dt.timezone(dt.timedelta(hours=8))
INPUTS = ('pending.json', 'decisions.json', 'english-name-decisions.json')


def now():
    return dt.datetime.now(TZ).isoformat()


def read(path, default=None):
    return json.loads(path.read_text(encoding='utf-8-sig')) if path.exists() else default


def save(path, value, *, compact_json=False):
    path.parent.mkdir(parents=True, exist_ok=True)
    temp = path.with_name(path.name + '.' + uuid.uuid4().hex + '.tmp')
    temp.write_text(json.dumps(value, ensure_ascii=False, indent=None if compact_json else 2,
                               separators=(',', ':') if compact_json else None), encoding='utf-8')
    temp.replace(path)


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest() if path.exists() else None


class Overlap(RuntimeError):
    pass


def compact(payload):
    if not isinstance(payload, dict):
        return {'items': len(payload)} if isinstance(payload, list) else {}
    # Full evidence, student details and transport envelopes belong in the log.
    return {key: value if isinstance(value, (str, int, float, bool, type(None))) else len(value)
            for key, value in payload.items()
            if key in {'pending', 'privateConversations', 'submitted', 'homeworkWrites',
                       'nameWrites', 'sent', 'eligible', 'deferred', 'awaitingConfirmation',
                        'alreadyConfirmed', 'captured', 'corrected', 'backfilled',
                        'absenceReasons', 'preExistingReasons', 'periodBackfilled', 'initialized',
                       'needsAttention', 'new', 'changed', 'openCount', 'transcribed',
                       'cached', 'skipped', 'status', 'unreviewed', 'open', 'changes',
                       'commitVerified', 'homeworkVerified', 'namesVerified', 'identityLinksVerified'}}


def attention(payload):
    if not isinstance(payload, dict):
        return False
    return bool(payload.get('needsAttention') or payload.get('awaitingConfirmation')
                or payload.get('error') or payload.get('status') in ('failed', 'error', 'attention')
                or (isinstance(payload.get('native'), dict) and payload['native'].get('error')))


def context_message(message, pending=None):
    """Lossless alias elimination; pending text is already present in the packet."""
    row = {k: message[k] for k in ('openMessageId', 'messageId', 'createTime', 'sender',
           'senderOpenDingTalkId', 'content', 'text', 'messageAiSendFlag') if k in message}
    if row.get('messageId') == row.get('openMessageId'):
        row.pop('messageId', None)
    if 'content' in row and row.get('text') == row['content']:
        row.pop('text', None)
    mid = row.get('openMessageId') or row.get('messageId')
    if pending and mid in pending:
        for field in ('content', 'text'):
            if (field in row and row[field] == pending[mid].get('text')
                    and len(str(row[field])) > len(str(mid)) + 32):
                row.pop(field)
                row['textFromPendingMessageId'] = mid
    return row


def control_response(result, record_path=None):
    """Keep private fingerprints and repeated stage envelopes out of model context.

    Inspection is deliberately never shortened: the complete plan is reviewed.
    Full timings, summaries and logs remain in the durable run record.
    """
    if not isinstance(result, dict) or 'stages' not in result:
        return result
    public = {k: v for k, v in result.items() if k not in {
        'stages', 'preparedInputs', 'collectedInputs', 'review', 'phase', 'planSha256'}}
    if record_path:
        public['runLog'] = str(record_path)
    public['stages'] = []
    for stage in result['stages']:
        row = {k: stage[k] for k in ('script', 'seconds', 'summary')}
        if stage.get('attention') or stage.get('returncode'):
            row.update(attention=True, log=stage['log'], returncode=stage['returncode'])
        public['stages'].append(row)
    return public


class Workflow:
    def __init__(self, profile, root=None, source=None, execute=None):
        self.profile = profile
        self.root = Path(root) if root else runtime_root(profile)
        self.source = Path(source) if source else source_root(profile)
        self.state = self.root / 'state'
        self.state.mkdir(parents=True, exist_ok=True)
        self.lock = self.state / 'run.lock'  # Same lock seen by legacy Kimi entry points.
        self.execute = execute or subprocess.run
        self.record = None

    def record_path(self):
        return self.state / 'runs' / (self.record['runId'] + '.json')

    def persist(self):
        save(self.record_path(), self.record)

    @contextlib.contextmanager
    def operation(self):
        path = self.state / 'runner-operation.lock'
        try:
            handle = os.open(path, os.O_CREAT | os.O_EXCL | os.O_WRONLY)
        except FileExistsError as exc:
            raise Overlap('Another lifecycle command is running; do not retry or remove its lock') from exc
        try:
            os.write(handle, json.dumps({'pid': os.getpid(), 'startedAt': now()}).encode())
            yield
        finally:
            os.close(handle)
            path.unlink()

    def begin(self):
        run_id = 'run-' + uuid.uuid4().hex
        try:
            handle = os.open(self.lock, os.O_CREAT | os.O_EXCL | os.O_WRONLY)
        except FileExistsError as exc:
            raise Overlap('A review/run is already open; inspect status before recovery') from exc
        with os.fdopen(handle, 'w', encoding='utf-8') as stream:
            json.dump({'runId': run_id, 'pid': os.getpid(), 'startedAt': now(),
                       'heartbeatAt': now(), 'controller': 'platform-homework'}, stream)
        self.record = {'runId': run_id, 'profile': self.profile, 'startedAt': now(),
                       'status': 'in-progress', 'phase': 'collecting', 'stages': []}
        self.persist()

    def resume(self, run_id):
        owner = read(self.lock, {})
        if not run_id or owner.get('runId') != run_id:
            raise ValueError('Run ID does not own the workflow lock')
        record = read(self.state / 'runs' / (run_id + '.json'), {})
        if record.get('profile') != self.profile or record.get('status') != 'in-progress':
            raise ValueError('Run is not an open platform homework run')
        self.record = record
        owner.update(heartbeatAt=now(), pid=os.getpid())
        save(self.lock, owner)

    def close(self, status):
        self.record.update(status=status, finishedAt=now())
        elapsed = (dt.datetime.fromisoformat(self.record['finishedAt'])
                   - dt.datetime.fromisoformat(self.record['startedAt'])).total_seconds()
        scripted = sum(stage['seconds'] for stage in self.record['stages'])
        self.record['timing'] = {'elapsedSeconds': round(elapsed, 3), 'scriptSeconds': round(scripted, 3),
                                'betweenCommandsSeconds': round(max(0, elapsed - scripted), 3)}
        self.persist()
        owner = read(self.lock, {})
        if owner.get('runId') != self.record['runId']:
            raise ValueError('Lock ownership changed; refusing to remove it')
        self.lock.unlink()

    def step(self, script, *arguments):
        started = time.monotonic()
        name = f"{len(self.record['stages']) + 1:02d}-{Path(script).stem}"
        output = self.state / 'runs' / self.record['runId'] / (name + '.json')
        env = {**os.environ, 'PYTHONUTF8': '1'}
        env[{'qq-ic3': 'QQ_RUN_ID', 'dingtalk-s36': 'S36_RUN_ID'}.get(self.profile, 'HOMEWORK_RUN_ID')] = self.record['runId']
        command = [sys.executable, str(self.source / script), *arguments]
        try:
            result = self.execute(command, cwd=self.root, env=env, capture_output=True,
                                  encoding='utf-8', errors='replace', timeout=900)
        except subprocess.TimeoutExpired:
            save(output, {'status': 'timeout', 'script': script, 'arguments': arguments})
            raise RuntimeError(f'{script} timed out; inspect delivery history before retrying')
        save(output, {'script': script, 'arguments': arguments, 'returncode': result.returncode,
                      'stdout': result.stdout, 'stderr': result.stderr})
        try:
            payload = json.loads(result.stdout)
        except (ValueError, TypeError):
            payload = None
        entry = {'script': script, 'arguments': list(arguments), 'seconds': round(time.monotonic() - started, 3),
                 'returncode': result.returncode, 'outputBytes': len((result.stdout or '').encode()),
                 'log': str(output), 'summary': compact(payload), 'attention': attention(payload)}
        if script == 'run_guard.py' and isinstance(payload, dict):
            checks = payload.get('checks', {})
            if 'friendAcceptListener' in checks:
                entry['summary']['friendAcceptListener'] = checks['friendAcceptListener']
                entry['attention'] |= checks['friendAcceptListener'] != 'ok'
        self.record['stages'].append(entry)
        self.persist()
        if result.returncode:
            raise RuntimeError(f'{script} failed (exit {result.returncode}); inspect {output}')
        if payload is None:
            raise RuntimeError(f'{script} returned invalid JSON; inspect {output}')
        return payload

    def input_digests(self):
        result = {name: digest(self.state / name) for name in INPUTS}
        result['assignments.json'] = digest(self.root / 'assignments.json')
        result['config.json'] = digest(self.root / 'config.json')
        return result

    def packet(self, personal_report=None):
        batch = read(self.state / 'pending.json', {})
        snapshot = read(self.state / 'latest-response.json', {})
        if not batch.get('batchId') or snapshot.get('complete') is not True:
            raise ValueError('No complete durable fetch is available')
        media = read(self.state / 'media.json', [])
        ocr = read(self.state / 'ocr.json', {}).get('files', [])
        media_by_id, ocr_by_id, ocr_details_by_id = {}, {}, {}
        for entry in media:
            media_by_id.setdefault(entry.get('messageId'), []).append(entry['path'])
        for entry in ocr:
            ocr_by_id.setdefault(entry.get('messageId'), []).append(entry['transcription'])
            ocr_details_by_id.setdefault(entry.get('messageId'), []).append({
                key: entry[key] for key in ('transcription', 'provider', 'status', 'fallbackReason', 'frameCount', 'allFrames')
                if entry.get(key) is not None})
        pending_by_id = {item['messageId']: item for item in batch.get('messages', [])}
        conversations = {c['openConversationId']: c for c in snapshot.get('result', {}).get('conversationMessagesList', [])}
        messages, contexts = [], {}
        for item in batch.get('messages', []):
            mid, cid = item['messageId'], item.get('conversationId')
            msg = {key: item.get(key) for key in ('messageId', 'time', 'sender', 'senderId', 'conversationId',
                                                  'title', 'text', 'candidates', 'scope', 'verifiedClasses',
                                                   'contactSearchError', 'absenceReason') if key in item}
            msg['media'] = media_by_id.get(mid, [])
            msg['ocr'] = ocr_by_id.get(mid, [])
            details = ocr_details_by_id.get(mid, [])
            if details:
                msg['ocrDetails'] = details
            msg['resourceCount'] = len(item.get('resources', []))
            messages.append(msg)
            if cid not in contexts:
                history = sorted(conversations.get(cid, {}).get('messages', []),
                                 key=lambda m: (str(m.get('createTime') or ''),
                                                str(m.get('openMessageId') or m.get('messageId') or '')))
                contexts[cid] = {'totalMessages': len(history), 'truncated': len(history) > 12,
                                 'messages': [context_message(m, pending_by_id) for m in history[-12:]]}
        packet = {'profile': self.profile, 'batchId': batch['batchId'], 'start': batch.get('start'),
                  'end': batch.get('end'), 'messages': messages, 'context': contexts,
                  'assignments': read(self.root / 'assignments.json', []),
                  'fullEvidence': str(self.state / 'latest-response.json'),
                  'decisionPath': str(self.state / 'decisions.json'),
                  'nameDecisionPath': str(self.state / 'english-name-decisions.json'),
                  'decisionFormat': 'list' if self.profile == 'dingtalk-submissions' else '{batchId, decisions: [...]}',
                  'personalReview': str(self.state / ('personal-reply-review.json' if self.profile == 'dingtalk-submissions' else 'personal-attention.json'))}
        if self.profile == 'dingtalk-submissions':
            personal = read(self.state / 'personal-reply-review.json', [])
            packet['personalDecisionsPath'] = str(self.state / 'personal-reply-decisions.json')
            packet['personalRequests'] = []
            for conversation in personal:
                history = conversation.get('messages', [])
                target_ids = {t['messageId'] for t in conversation.get('targets', [])}
                keep = {i for i, m in enumerate(history)
                        if (m.get('openMessageId') or m.get('messageId')) in target_ids}
                keep.update(range(max(0, len(history) - 12), len(history)))
                packet['personalRequests'].append({
                    'conversationId': conversation['conversationId'], 'title': conversation.get('title'),
                    'targets': conversation.get('targets', []), 'truncated': len(keep) < len(history),
                    'messages': [context_message(history[i], pending_by_id) for i in sorted(keep)]})
        else:
            # Local personal requests stay visible; only the existing reporter
            # decides which ones are new/changed, and no model answers them.
            delta_path = self.state / 'personal-review-delta.json'
            if personal_report is not None:
                save(delta_path, {'batchId': batch['batchId'], 'report': personal_report})
            else:
                delta = read(delta_path, {})
                if delta.get('batchId') == batch['batchId']:
                    personal_report = delta.get('report')
            if personal_report is not None:
                packet['personalRequests'] = {
                    item['conversationId'] + ':' + item['messageId']: item
                    for item in personal_report.get('new', []) + personal_report.get('changed', [])}
                packet['personalSummary'] = {key: len(personal_report.get(key, [])) for key in ('new', 'changed')}
                packet['personalSummary']['openCount'] = personal_report.get('openCount', 0)
            else:
                # Standalone packet/recovery has no reliable delta: show everything.
                packet['personalRequests'] = read(self.state / 'personal-attention.json', {}).get('items', {})
        if self.profile == 'qq-ic3':
            from review_aids import enrich
            enrich(packet, self.state)
        path = self.state / 'review-packet.json'
        save(path, packet, compact_json=True)
        return {'packet': str(path), 'pending': len(messages), 'packetBytes': path.stat().st_size,
                'archiveBytes': (self.state / 'latest-response.json').stat().st_size,
                'batchId': batch['batchId']}

    def collect(self):
        self.begin()
        if self.profile != 'dingtalk-submissions':
            self.step('run_guard.py', 'preflight')
        self.step('fetch.py')
        batch = read(self.state / 'pending.json', {})
        if batch.get('messages'):
            self.step('media.py')
            if self.profile == 'qq-ic3':
                self.step('ocr_evidence.py')
        personal_report = None
        if self.profile == 'dingtalk-submissions':
            self.step('reply_queue.py', 'prepare')
        else:
            personal_report = self.step('personal_requests.py', 'report')
        result = self.packet(personal_report)
        self.record.update(phase='review', batchId=batch['batchId'], collectedInputs=self.input_digests(), review=result)
        self.persist()
        return {'status': 'review-required' if result['pending'] else 'ready-to-finish',
                'runId': self.record['runId'], **result, 'stages': self.record['stages'],
                **({'reviewHelp': 'Read the packet once: exact cached OCR text is included when bounded. '
                    'Inspect original images directly, or use the maintained viewer instead of building a server.',
                    'viewerCommand': f'python "{Path(__file__).resolve()}" {self.profile} viewer --run-id {self.record["runId"]}'}
                   if self.profile == 'qq-ic3' and result['pending'] else {})}

    def viewer(self):
        if self.record['phase'] not in ('review', 'prepared', 'inspected'):
            raise ValueError('Viewer is only available for an open review')
        if digest(self.state / 'pending.json') != self.record['collectedInputs']['pending.json']:
            raise ValueError('Evidence changed since collection; collect again')
        from review_viewer import start
        return start(self.state, self.record['runId'])

    def prepare(self):
        if self.record['phase'] not in ('review', 'prepared', 'inspected'):
            raise ValueError('Collect and review evidence first')
        inputs = self.input_digests()
        for key in ('pending.json', 'assignments.json', 'config.json'):
            if inputs[key] != self.record['collectedInputs'][key]:
                raise ValueError(f'{key} changed since collection; abort and collect again')
        self.step('update.py', 'prepare')
        self.record.update(phase='prepared', preparedInputs=inputs, planSha256=digest(self.state / 'plan.json'))
        self.persist()
        return {'status': 'prepared', 'runId': self.record['runId'], 'plan': str(self.state / 'plan.json')}

    def check_prepared(self):
        if self.input_digests() != self.record.get('preparedInputs'):
            raise ValueError('Evidence or decisions changed since prepare; prepare and inspect again')
        if digest(self.state / 'plan.json') != self.record.get('planSha256'):
            raise ValueError('Plan changed since prepare; prepare and inspect again')

    def inspect(self):
        if self.record['phase'] not in ('prepared', 'inspected'):
            raise ValueError('Prepare before inspecting')
        self.check_prepared()
        if self.profile == 'dingtalk-submissions':
            self.step('update.py', 'inspect')
        self.record['phase'] = 'inspected'
        self.persist()
        return {'runId': self.record['runId'], 'planSha256': self.record['planSha256'],
                'plan': read(self.state / 'plan.json')}

    def finish(self, plan_sha256=None):
        batch = read(self.state / 'pending.json', {})
        if self.record['phase'] == 'review' and not batch.get('messages'):
            for key in ('pending.json', 'assignments.json', 'config.json'):
                if self.input_digests()[key] != self.record['collectedInputs'][key]:
                    raise ValueError('Collected inputs changed; collect again')
            # Empty complete fetches need no model decision or DB backup/write.
            ledger = read(self.state / 'ledger.json', {'processed': {}})
            ledger.update(checkedThrough=batch['end'], lastRun=now())
            save(self.state / 'ledger.json', ledger)
        else:
            if self.record['phase'] != 'inspected' or not plan_sha256 or plan_sha256 != self.record.get('planSha256'):
                raise ValueError('Inspect the exact plan and pass its planSha256 before finish')
            self.check_prepared()
            # Mark an in-flight commit before spawning: an interrupted commit must
            # never be silently retried against an uncertain database outcome.
            self.record['phase'] = 'committing'
            self.persist()
            self.step('update.py', 'commit')
        self.record['phase'] = 'delivering'
        self.persist()
        self.step('receipts.py', '--send')
        self.step('working_followups.py')
        self.step('english_name_ack.py', '--send')
        if self.profile == 'qq-ic3':
            self.step('feedback.py', '--send')
        if self.profile == 'dingtalk-submissions':
            self.step('reply_queue.py', 'apply')
            self.step('absence_receipts.py', '--send')
        elif self.profile == 'dingtalk-s36':
            self.step('absence_receipts.py', '--send')
        # A delivery-time refresh can discover new work. Never hide it as complete.
        latest = read(self.state / 'pending.json', {})
        processed = read(self.state / 'ledger.json', {}).get('processed', {})
        ids = {v.get('messageId') or key.split('#', 1)[0] for key, v in processed.items()}
        remaining = [m['messageId'] for m in latest.get('messages', []) if m['messageId'] not in ids]
        self.record['remainingMessageIds'] = remaining
        status = 'attention' if remaining or any(s['attention'] for s in self.record['stages']) else 'complete'
        self.close(status)
        return self.record


def main():
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('profile', choices=PROFILES)
    parser.add_argument('action', choices=('collect', 'packet', 'viewer', 'prepare', 'inspect', 'finish', 'abort', 'status'))
    parser.add_argument('--run-id')
    parser.add_argument('--plan-sha256')
    args = parser.parse_args()
    workflow = Workflow(args.profile)
    try:
        if args.action == 'status':
            result = {'profile': args.profile, 'runtimeRoot': str(workflow.root), 'lock': read(workflow.lock),
                      'operation': read(workflow.state / 'runner-operation.lock')}
        elif args.action == 'packet':
            result = workflow.packet()  # Local, no network/DB writes/sends. Useful for migration QA.
        else:
            with workflow.operation():
                if args.action == 'collect':
                    result = workflow.collect()
                else:
                    workflow.resume(args.run_id)
                    if args.action == 'abort':
                        workflow.close('incomplete')
                        result = {'status': 'incomplete', 'runId': args.run_id}
                    elif args.action == 'finish':
                        result = workflow.finish(args.plan_sha256)
                    else:
                        result = getattr(workflow, args.action)()
        print(json.dumps(control_response(result, workflow.record_path() if workflow.record else None),
                         ensure_ascii=False, separators=(',', ':')))
    except Overlap as error:
        print(json.dumps({'status': 'skipped-overlap', 'error': str(error)}))
        return 3
    except Exception as error:
        # Keep review state on validation failures so the agent can correct decisions.
        # A failed collect/delivery ends honestly; transport ambiguity stays in its ledger.
        if workflow.record and workflow.record.get('phase') in ('collecting', 'committing', 'delivering'):
            workflow.record['error'] = str(error)
            workflow.close('failed')
        print(json.dumps({'status': 'failed', 'error': str(error),
                          'runId': (workflow.record or {}).get('runId')}))
        return 1
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
