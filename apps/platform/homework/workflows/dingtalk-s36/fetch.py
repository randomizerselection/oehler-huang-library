"""Read DingTalk messages and the platform roster; never send messages."""
import datetime as dt
import json
import os
import re
import subprocess
import sys
import uuid
from pathlib import Path
from platform_db import roster as platform_roster, schema_version

# Fixture copies keep local config; production data is registered privately.
SOURCE_ROOT = Path(__file__).resolve().parent
if (SOURCE_ROOT / 'config.json').is_file():
    ROOT = SOURCE_ROOT
else:
    import sys
    sys.path.insert(0, str(SOURCE_ROOT.parents[1]))
    from runtime import runtime_root
    ROOT = runtime_root('dingtalk-s36', SOURCE_ROOT)
# Tests point S36_CONFIG_PATH at a fixture config; default behaviour is unchanged.
CONFIG_PATH = Path(os.environ['S36_CONFIG_PATH']) if os.environ.get('S36_CONFIG_PATH') else ROOT / 'config.json'
CONFIG = json.loads(CONFIG_PATH.read_text(encoding='utf-8'))
TZ = dt.timezone(dt.timedelta(hours=8))

# The console codepage on this machine is GBK; pin UTF-8 so emoji/CJK in
# printed JSON cannot crash a run after its state was already saved.
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')
CJK_RE = re.compile(r'[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]')

def ensure_english_only(text):
    if CJK_RE.search(text or ''):
        raise ValueError('Student communication must be English-only; Chinese characters are not allowed')

def save(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_suffix(path.suffix + '.tmp')
    tmp.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')
    tmp.replace(path)

class DingTalkError(RuntimeError):
    """Preserve structured provider failures, including errors emitted on stderr."""
    def __init__(self, payload):
        self.payload = payload
        super().__init__(json.dumps(payload, ensure_ascii=True)[:1500])


def cli(args, timeout=240):
    if args[:3] == ['chat', 'message', 'send'] and '--content' in args:
        content_index = args.index('--content') + 1
        if content_index >= len(args):
            raise ValueError('Missing value for --content')
        ensure_english_only(args[content_index])
    proc = subprocess.run([CONFIG['cli'], '--profile', CONFIG['profile'], *args], capture_output=True, encoding='utf-8', timeout=timeout)
    try:
        result = json.loads(proc.stdout)
    except ValueError:
        try:
            failure = json.loads(proc.stderr)
        except ValueError:
            raise RuntimeError('DingTalk returned non-JSON output: ' + proc.stderr[:500])
        raise DingTalkError(failure)
    # Asynchronous writes wrap the normal API result in an operation envelope.
    accepted = result.get('success') is True or (
        result.get('ok') is True and isinstance(result.get('data'), dict)
        and result['data'].get('success') is True
    )
    if not accepted:
        # Compat invocations (e.g. download-media on this CLI version) nest the
        # real outcome under response -> content, with success either at the
        # content level or inside its result object.
        response = result.get('response')
        if isinstance(response, dict):
            content = response.get('content')
            if isinstance(content, dict):
                inner = content.get('result')
                accepted = content.get('success') is True or (
                    isinstance(inner, dict) and inner.get('success') is True)
    if proc.returncode or not accepted:
        raise DingTalkError(result)
    return result

def roster():
    return platform_roster()

def matches(label, students):
    cn = [s for s in students if s['name'] and s['name'] in label]
    if cn:
        return cn
    return [s for s in students if s['english'] and re.search(r'(?<![A-Za-z])' + re.escape(s['english'].strip()) + r'(?![A-Za-z])', label, re.I)]

def main():
    students = roster()
    save(ROOT / 'state' / 'roster.json', students)
    state_path = ROOT / 'state' / 'ledger.json'
    ledger = json.loads(state_path.read_text(encoding='utf-8')) if state_path.exists() else {'processed': {}}
    now = dt.datetime.now(TZ)
    start = CONFIG['start']
    if ledger.get('checkedThrough'):
        overlap = dt.datetime.fromisoformat(ledger['checkedThrough']) - dt.timedelta(days=2)
        start = max(start, overlap.strftime('%Y-%m-%d %H:%M:%S'))
    end = now.strftime('%Y-%m-%d %H:%M:%S')
    # Explicit cursor for each fresh scan. Native --page-all can reuse a cursor and
    # return an empty scan despite messages in the same time window on this CLI version.
    conversations_by_id = {}
    cursor, visited = '0', set()
    for page in range(50):
        response = cli(['chat', 'message', 'list-all', '--start', start, '--end', end, '--limit', '100', '--cursor', cursor])
        result = response.get('result', {})
        if not isinstance(result.get('hasMore'), bool) or not isinstance(result.get('conversationMessagesList'), list):
            raise RuntimeError('Unexpected DingTalk pagination response; cannot establish completeness')
        for conversation in result['conversationMessagesList']:
            cid = conversation['openConversationId']
            if cid not in conversations_by_id:
                conversations_by_id[cid] = {**conversation, 'messages': []}
            existing = {m.get('openMessageId') or m.get('messageId') for m in conversations_by_id[cid]['messages']}
            for message in conversation.get('messages', []):
                mid = message.get('openMessageId') or message.get('messageId')
                if mid and mid not in existing:
                    conversations_by_id[cid]['messages'].append(message)
                    existing.add(mid)
        if result['hasMore'] is False:
            break
        next_cursor = result.get('nextCursor')
        if not next_cursor or next_cursor == cursor or next_cursor in visited:
            raise RuntimeError('Invalid or stalled message cursor; scan is incomplete')
        visited.add(cursor)
        cursor = next_cursor
    else:
        raise RuntimeError('Message scan exceeds 50 pages; do not advance watermark')
    conversations = list(conversations_by_id.values())
    save(ROOT / 'state' / 'latest-response.json', {'success': True, 'complete': True, 'pages': page + 1, 'result': {'conversationMessagesList': conversations, 'hasMore': False}})
    # Personal requests have an independent ledger: assignment 'ignore' must not lose them.
    from reply_queue import capture_fresh
    capture_fresh({'complete': True, 'result': {'conversationMessagesList': conversations, 'hasMore': False}}, end)
    processed_ids = {entry.get('messageId') or key.split('#', 1)[0]
                     for key, entry in ledger.get('processed', {}).items()}
    contact_cache = {}  # One lookup per sender/name within this complete scan.
    pending = []
    for conversation in conversations:
        if not conversation.get('singleChat'):
            continue
        title = conversation.get('title', '')
        for msg in conversation.get('messages', []):
            mid = msg.get('openMessageId') or msg.get('messageId')
            if not mid or mid in processed_ids:
                continue
            sender = msg.get('sender', '')
            if msg.get('senderOpenDingTalkId') == CONFIG['selfOpenDingTalkId']:
                continue
            sender_id = msg.get('senderOpenDingTalkId', '')
            search_error = None
            candidates = matches(sender, students) or matches(title, students)
            linked = [s for s in students if s.get('dingtalkId') == sender_id]
            if linked:
                candidates = linked
            elif not any(s['name'] in sender or s['name'] in title for s in candidates):
                # Nicknames and even unique English names are not stable identity evidence.
                # A failing lookup (e.g. emoji nicknames make this API return system_error)
                # must not abort the scan: leave the message unresolved for review.
                try:
                    lookup_key = (sender_id, sender)
                    if lookup_key not in contact_cache:
                        contact_cache[lookup_key] = cli(['contact', 'user', 'search', '--query', sender]).get('result', [])
                    contacts = contact_cache[lookup_key]
                    identities = [c for c in contacts if c.get('openDingTalkId') == sender_id]
                    candidates = []
                    if len(identities) == 1:
                        candidates = [s for s in students if s['name'] in identities[0].get('name', '')]
                except RuntimeError as error:
                    candidates = []
                    search_error = str(error)[:200]
            content = msg.get('content') or msg.get('text') or ''
            if not candidates and not re.search(r'作业|homework|assignment|答案|question|图片消息|文件消息', content, re.I):
                continue
            entry = {'messageId': mid, 'time': msg.get('createTime'), 'sender': sender, 'senderId': sender_id, 'conversationId': conversation.get('openConversationId'), 'title': title, 'text': content, 'resources': msg.get('resources', []), 'candidates': candidates}
            if search_error:
                entry['contactSearchError'] = search_error
            pending.append(entry)
    previous_path = ROOT / 'state' / 'pending.json'
    previous = json.loads(previous_path.read_text(encoding='utf-8')) if previous_path.exists() else {}
    processed_ids = {entry.get('messageId') or key.split('#', 1)[0]
                     for key, entry in ledger.get('processed', {}).items()}
    durable = {item['messageId']: item for item in previous.get('messages', [])
               if item.get('messageId') not in processed_ids}
    durable.update({item['messageId']: item for item in pending})
    pending = sorted(durable.values(), key=lambda item: (item.get('time') or '', item['messageId']))
    batch = {'batchId': uuid.uuid4().hex[:12], 'runId': os.environ.get('S36_RUN_ID') or None, 'start': start, 'end': end, 'platformSchemaVersion': schema_version(), 'messages': pending}
    save(ROOT / 'state' / 'pending.json', batch)
    # This is an intentional fetch side effect, run only after the complete
    # evidence batch is durable. It never sends a student message.
    from absence_followups import capture as capture_absence_reasons
    absence_capture = capture_absence_reasons(ROOT / 'state' / 'latest-response.json')
    captured_by_id = {item['messageId']: item for item in absence_capture.get('items', [])}
    if captured_by_id:
        for item in pending:
            captured = captured_by_id.get(item['messageId'])
            if captured:
                item['absenceReason'] = {
                    'attendanceLogId': captured['attendanceLogId'],
                    'reason': captured['reason'],
                    'category': captured['category'],
                    'absenceStartDate': captured['absencePeriod'][0] if captured.get('absencePeriod') else None,
                    'absenceEndDate': captured['absencePeriod'][1] if captured.get('absencePeriod') else None,
                }
        batch['messages'] = pending
        save(ROOT / 'state' / 'pending.json', batch)
    print(json.dumps({'start': start, 'end': end, 'privateConversations': sum(bool(c.get('singleChat')) for c in conversations), 'pending': len(pending), 'pendingFile': str(ROOT / 'state' / 'pending.json'), 'batchId': batch['batchId']}, ensure_ascii=True))

if __name__ == '__main__':
    main()
