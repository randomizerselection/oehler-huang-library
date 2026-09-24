"""Read DingTalk messages and the platform roster; never send messages."""
import datetime as dt
import hashlib
import json
import re
import subprocess
import sys
import time
from pathlib import Path
from platform_db import PLATFORM_CLASSES, classify_dingtalk_senders, roster as platform_roster, schema_version

# Fixture copies keep local config; production data is registered privately.
SOURCE_ROOT = Path(__file__).resolve().parent
if (SOURCE_ROOT / 'config.json').is_file():
    ROOT = SOURCE_ROOT
else:
    import sys
    sys.path.insert(0, str(SOURCE_ROOT.parents[1]))
    from runtime import runtime_root
    ROOT = runtime_root('dingtalk-submissions', SOURCE_ROOT)
CONFIG = json.loads((ROOT / 'config.json').read_text(encoding='utf-8'))
TZ = dt.timezone(dt.timedelta(hours=8))
CJK_RE = re.compile(r'[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]')
READ_ONLY_RETRY_PREFIXES = (
    ('chat', 'message', 'list-all'),
    ('chat', 'message', 'query-send-status'),
    ('chat', 'message', 'download-media'),
    ('chat', 'category', 'list-by-conv'),
    ('contact', 'user', 'search'),
)
TRANSIENT_TRANSPORT_RE = re.compile(
    r'NETWORK_UNREACHABLE|TLS handshake|context deadline exceeded|THREADPOOL_BUSY|'
    r'connection (?:reset|refused)|i/o timeout|\btimeout\b|timed? out|unexpected EOF', re.I,
)


class AuthenticationRequired(RuntimeError):
    pass


class IncompleteFetch(RuntimeError):
    pass

def ensure_english_only(text):
    if CJK_RE.search(text or ''):
        raise ValueError('Student communication must be English-only; Chinese characters are not allowed')

def save(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_suffix(path.suffix + '.tmp')
    tmp.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')
    tmp.replace(path)

def cli(args):
    original_args = tuple(args)
    if '--format' not in args and '-f' not in args:
        args = [*args, '--format', 'json']
    if args[:3] == ['chat', 'message', 'send'] and '--content' in args:
        content_index = args.index('--content') + 1
        if content_index >= len(args):
            raise ValueError('Missing value for --content')
        ensure_english_only(args[content_index])
    read_only = any(original_args[:len(prefix)] == prefix for prefix in READ_ONLY_RETRY_PREFIXES)
    attempts = 3 if read_only else 1
    for attempt in range(attempts):
        # The chat list-all endpoint can legitimately need more than the CLI's
        # 30-second default when scanning the two-day safety overlap. Keep the
        # outer process limit higher so the CLI can return a complete response.
        try:
            proc = subprocess.run(
                [CONFIG['cli'], '--profile', CONFIG['profile'], '--timeout', '120', *args],
                capture_output=True, encoding='utf-8', timeout=180,
            )
        except subprocess.TimeoutExpired as error:
            detail = f'DingTalk command timed out: {" ".join(args[:3])}'
            if read_only and attempt + 1 < attempts:
                time.sleep(1 + 2 * attempt)
                continue
            raise RuntimeError(detail) from error

        result = None
        for raw in (proc.stdout, proc.stderr):
            try:
                if raw and raw.strip():
                    result = json.loads(raw)
                    break
            except ValueError:
                continue
        safe_error = (json.dumps(result, ensure_ascii=True) if isinstance(result, dict)
                      else (proc.stderr or proc.stdout or 'DingTalk returned no output'))[:1500]
        if re.search(r'auth|unauthor|login|sign.?in|token.+expir|credential', safe_error, re.I):
            raise AuthenticationRequired('DingTalk sign-in is required for the configured profile')

        # Asynchronous writes wrap the normal API result in an operation envelope.
        accepted = isinstance(result, dict) and (
            result.get('success') is True or (
                result.get('ok') is True and isinstance(result.get('data'), dict)
                and result['data'].get('success') is True
            )
        )
        if not proc.returncode and accepted:
            return result
        if read_only and attempt + 1 < attempts and TRANSIENT_TRANSPORT_RE.search(safe_error):
            time.sleep(1 + 2 * attempt)
            continue
        if result is None:
            raise RuntimeError('DingTalk returned non-JSON output: ' + safe_error[:500])
        raise RuntimeError(safe_error)


def scan_messages(start, end, cli_call=cli):
    """Fetch every paginated message page, splitting retryable large windows."""
    conversations_by_id = {}
    total_pages = 0
    scan_start = dt.datetime.strptime(start, '%Y-%m-%d %H:%M:%S').replace(tzinfo=TZ)
    scan_end = dt.datetime.strptime(end, '%Y-%m-%d %H:%M:%S').replace(tzinfo=TZ)

    def scan_window(window_start, window_end):
        nonlocal total_pages
        cursor, visited = '0', set()
        try:
            for _page in range(50):
                response = cli_call([
                    'chat', 'message', 'list-all',
                    '--start', window_start.strftime('%Y-%m-%d %H:%M:%S'),
                    '--end', window_end.strftime('%Y-%m-%d %H:%M:%S'),
                    '--limit', '100', '--cursor', cursor,
                ])
                total_pages += 1
                result = response.get('result', {})
                if not isinstance(result.get('hasMore'), bool) or not isinstance(result.get('conversationMessagesList'), list):
                    raise IncompleteFetch('Unexpected DingTalk pagination response')
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
                    return
                next_cursor = result.get('nextCursor')
                if not next_cursor or next_cursor == cursor or next_cursor in visited:
                    raise IncompleteFetch('Invalid or stalled message cursor')
                visited.add(cursor)
                cursor = next_cursor
            raise IncompleteFetch('Message scan exceeded 50 pages')
        except AuthenticationRequired:
            raise
        except RuntimeError as error:
            retryable_range_error = any(code in str(error) for code in ('TIMEOUT_ERROR', 'PARAM_ERROR', 'COMM_ERROR'))
            duration = window_end - window_start
            if retryable_range_error and duration > dt.timedelta(minutes=30):
                midpoint = window_start + duration / 2
                scan_window(window_start, midpoint)
                scan_window(midpoint, window_end)
                return
            raise IncompleteFetch(
                f'DingTalk scan failed for {window_start.isoformat()} to {window_end.isoformat()}: {error}'
            ) from error

    window_start = scan_start
    while window_start < scan_end:
        window_end = min(window_start + dt.timedelta(hours=6), scan_end)
        scan_window(window_start, window_end)
        window_start = window_end
    return list(conversations_by_id.values()), total_pages

def roster():
    return platform_roster()


def processed_message_ids(ledger):
    """Return source message IDs, including multi-assignment ledger entries."""
    result=set()
    for ledger_key,item in ledger.get('processed',{}).items():
        result.add(item.get('messageId') or item.get('sourceMessageId') or ledger_key.split('#',1)[0])
    return result

def matches(label, students):
    cn = [s for s in students if s['name'] and s['name'] in label]
    if cn:
        return cn
    return [s for s in students if s['english'] and re.search(r'(?<![A-Za-z])' + re.escape(s['english'].strip()) + r'(?![A-Za-z])', label, re.I)]

def reviewed_out_of_scope_sender_ids():
    """Return sender IDs already confirmed as outside the Codex class scope."""
    path = ROOT / 'state' / 'personal-replies.json'
    if not path.exists():
        return set()
    state = json.loads(path.read_text(encoding='utf-8'))
    result = set()
    reviews = state.get('reviews', {})
    for conversation in state.get('conversations', {}).values():
        for message_id, message in conversation.get('messages', {}).items():
            conversation_id = message.get('openConversationId', '')
            review_key = hashlib.sha256((conversation_id + '\n' + message_id).encode()).hexdigest()[:24]
            if reviews.get(review_key, {}).get('status') == 'out_of_scope':
                sender_id = message.get('senderOpenDingTalkId')
                if sender_id:
                    result.add(sender_id)
    return result

def main():
    students = roster()
    out_of_scope_sender_ids = reviewed_out_of_scope_sender_ids()
    save(ROOT / 'state' / 'roster.json', students)
    state_path = ROOT / 'state' / 'ledger.json'
    ledger = json.loads(state_path.read_text(encoding='utf-8')) if state_path.exists() else {'processed': {}}
    processed_ids = processed_message_ids(ledger)
    now = dt.datetime.now(TZ)
    start = CONFIG['start']
    if ledger.get('checkedThrough'):
        overlap = dt.datetime.fromisoformat(ledger['checkedThrough']) - dt.timedelta(days=2)
        start = max(start, overlap.strftime('%Y-%m-%d %H:%M:%S'))
    end = now.strftime('%Y-%m-%d %H:%M:%S')
    # Explicit cursor for each fresh scan. Native --page-all can reuse a cursor and
    # return an empty scan despite messages in the same time window on this CLI version.
    conversations, total_pages = scan_messages(start, end)
    sender_ids = {
        msg.get('senderOpenDingTalkId')
        for conversation in conversations for msg in conversation.get('messages', [])
        if msg.get('senderOpenDingTalkId') and msg.get('senderOpenDingTalkId') != CONFIG['selfOpenDingTalkId']
    }
    sender_classes = classify_dingtalk_senders(sender_ids)
    platform_out_of_scope = {
        sender_id for sender_id, classes in sender_classes.items()
        if classes and not set(classes).intersection(PLATFORM_CLASSES)
    }
    out_of_scope_sender_ids.update(platform_out_of_scope)
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
            candidates = matches(sender, students) or matches(title, students)
            linked = [s for s in students if s.get('dingtalkId') == sender_id]
            if linked:
                candidates = linked
            elif sender_id in out_of_scope_sender_ids:
                # Do not spend a network lookup on identities already confirmed as
                # S3.6 or otherwise outside this workflow. Their new homework-like
                # messages still enter the batch so the ledger can classify them.
                candidates = []
            elif not any(s['name'] in sender or s['name'] in title for s in candidates):
                # Nicknames and even unique English names are not stable identity evidence.
                lookup_key = (sender_id, sender)
                if lookup_key not in contact_cache:
                    contact_cache[lookup_key] = cli(['contact', 'user', 'search', '--query', sender]).get('result', [])
                contacts = contact_cache[lookup_key]
                identities = [c for c in contacts if c.get('openDingTalkId') == sender_id]
                candidates = []
                if len(identities) == 1:
                    candidates = [s for s in students if s['name'] in identities[0].get('name', '')]
            content = msg.get('content') or msg.get('text') or ''
            if not candidates and not re.search(r'作业|homework|assignment|答案|question|图片消息|文件消息', content, re.I):
                continue
            verified_classes = sorted(sender_classes.get(sender_id, []))
            scope = ('in_scope' if set(verified_classes).intersection(PLATFORM_CLASSES)
                     else 'out_of_scope' if verified_classes else 'unresolved')
            pending.append({'messageId': mid, 'time': msg.get('createTime'), 'sender': sender,
                            'senderId': sender_id, 'conversationId': conversation.get('openConversationId'),
                            'title': title, 'text': content, 'resources': msg.get('resources', []),
                            'candidates': candidates, 'scope': scope,
                            'verifiedClasses': verified_classes})

    # Retain unresolved evidence from earlier completed scans even if it has aged
    # outside the current overlap window. Stable message IDs deduplicate ties and
    # repeated pages without relying on timestamps alone.
    previous_path = ROOT / 'state' / 'pending.json'
    previous = json.loads(previous_path.read_text(encoding='utf-8')) if previous_path.exists() else {'messages': []}
    durable = {message['messageId']: message for message in previous.get('messages', [])
               if message.get('messageId') not in processed_ids}
    durable.update({message['messageId']: message for message in pending})
    pending = sorted(durable.values(), key=lambda item: (item.get('time') or '', item['messageId']))

    snapshot = {'success': True, 'complete': True, 'pages': total_pages,
                'result': {'conversationMessagesList': conversations, 'hasMore': False}}
    snapshot_digest = hashlib.sha256(json.dumps(snapshot, ensure_ascii=False, sort_keys=True, separators=(',', ':')).encode()).hexdigest()
    batch_id = hashlib.sha256((start + '\n' + end + '\n' + snapshot_digest).encode()).hexdigest()
    snapshot['batchId'] = batch_id
    batch = {'batchId': batch_id, 'snapshotDigest': snapshot_digest, 'complete': True,
             'start': start, 'end': end, 'platformSchemaVersion': schema_version(), 'messages': pending}
    stage = {'status': 'complete', 'batchId': batch_id, 'snapshot': snapshot, 'pending': batch,
             'stagedAt': dt.datetime.now(TZ).isoformat()}
    save(ROOT / 'state' / 'fetch-stage.json', stage)
    save(ROOT / 'state' / 'latest-response.json', snapshot)
    save(ROOT / 'state' / 'pending.json', batch)
    save(ROOT / 'state' / 'fetch-manifest.json', {
        'status': 'durable', 'batchId': batch_id, 'snapshotDigest': snapshot_digest,
        'pendingDigest': hashlib.sha256(json.dumps(batch, ensure_ascii=False, sort_keys=True, separators=(',', ':')).encode()).hexdigest(),
        'completedAt': dt.datetime.now(TZ).isoformat(), 'pages': total_pages,
    })
    # Decision artifacts are batch work queues. Retain decisions only while
    # their source message remains pending; committed/stale decisions must not
    # block the next completed fetch batch.
    pending_ids={message['messageId'] for message in pending}
    for filename in ('decisions.json','english-name-decisions.json'):
        decision_path=ROOT/'state'/filename
        current=json.loads(decision_path.read_text(encoding='utf-8')) if decision_path.exists() else []
        retained=[item for item in current if item.get('messageId') in pending_ids]
        if retained!=current or not decision_path.exists():
            save(decision_path,retained)

    # These are intentional fetch side effects and run only after the complete
    # evidence batch is durable. Neither sends a student message.
    from absence_followups import capture as capture_absence_reasons
    absence_capture = capture_absence_reasons(ROOT / 'state' / 'latest-response.json')
    from reply_queue import capture_fresh
    authorized_sender_ids = {student['dingtalkId'] for student in students if student.get('dingtalkId')}
    capture_fresh(snapshot, end, authorized_sender_ids=authorized_sender_ids,
                  out_of_scope_sender_ids=platform_out_of_scope)
    print(json.dumps({'start': start, 'end': end,
                      'privateConversations': sum(bool(c.get('singleChat')) for c in conversations),
                      'pending': len(pending), 'pendingFile': str(ROOT / 'state' / 'pending.json'),
                      'batchId': batch['batchId'],
                      'captured': absence_capture.get('captured', 0),
                      'corrected': absence_capture.get('corrected', 0),
                      'backfilled': absence_capture.get('backfilled', 0)}, ensure_ascii=True))

if __name__ == '__main__':
    main()
