"""Bounded absence delivery recovery; no model-written retry drivers or global counts."""
import datetime as dt
import json
import time

from fetch import CONFIG, ROOT, TZ, DingTalkError, cli, save
from reminders import deliver


class DeliveryAttention(RuntimeError):
    pass


def timestamp(value):
    parsed = dt.datetime.fromisoformat(value.replace('Z', '+00:00'))
    return parsed.replace(tzinfo=TZ) if parsed.tzinfo is None else parsed


def known_conversation(state, recipient):
    """Only confirmed delivery IDs or a complete inbox's exact sender ID bind a DM."""
    ids = {entry['openConversationId'] for entry in state['messages'].values()
           if entry.get('recipientId') == recipient['recipientId']
           and entry.get('status') == 'sent' and entry.get('openConversationId')}
    snapshot = ROOT / 'state/latest-response.json'
    if not ids and snapshot.exists():
        data = json.loads(snapshot.read_text(encoding='utf-8'))
        if data.get('complete') is True and data.get('result', {}).get('hasMore') is False:
            ids = {conv['openConversationId'] for conv in data['result']['conversationMessagesList']
                   if conv.get('singleChat') is True and conv.get('openConversationId')
                   and any(msg.get('senderOpenDingTalkId') == recipient['recipientId']
                           for msg in conv.get('messages', []))}
    return next(iter(ids)) if len(ids) == 1 else None


def inspect_attempt(entry, args, conversation_id, file_id, sender, now):
    """Read only the attempt window. Absence requires complete, recipient-bound evidence."""
    attempted = timestamp(entry['attemptedAt'])
    start = attempted.replace(microsecond=0)  # Provider timestamps have second precision.
    if not conversation_id or now - attempted > dt.timedelta(minutes=15):
        raise DeliveryAttention('No verified conversation or attempt older than 15 minutes; inspect manually')
    cursor, visited, conversations = '0', set(), []
    for _ in range(3):
        response = sender(['chat', 'message', 'list-all', '--start', start.astimezone(TZ).strftime('%Y-%m-%d %H:%M:%S'),
                           '--end', now.astimezone(TZ).strftime('%Y-%m-%d %H:%M:%S'),
                           '--limit', '100', '--cursor', cursor])
        result = response.get('result', {})
        if response.get('success') is not True or not isinstance(result.get('conversationMessagesList'), list):
            raise DeliveryAttention('Recovery scan failed; delivery stays uncertain')
        conversations.extend(result['conversationMessagesList'])
        if result.get('hasMore') is False:
            break
        following = result.get('nextCursor')
        if result.get('hasMore') is not True or not following or str(following) in visited or str(following) == cursor:
            raise DeliveryAttention('Recovery scan is incomplete; delivery stays uncertain')
        visited.add(cursor)
        cursor = str(following)
    else:
        raise DeliveryAttention('Recovery scan exceeded three pages; delivery stays uncertain')
    own = [conv for conv in conversations if conv.get('openConversationId') == conversation_id
           and conv.get('singleChat') is True]
    if not own:
        raise DeliveryAttention('Verified conversation missing from scan; absence is not proven')
    matches = {}
    for conv in own:
        for msg in conv.get('messages', []):
            if msg.get('openConversationId', conversation_id) != conversation_id:
                raise DeliveryAttention('Conflicting message conversation ID')
            if msg.get('senderOpenDingTalkId') != CONFIG['selfOpenDingTalkId']:
                continue
            try:
                created = timestamp(msg['createTime'])
            except (KeyError, ValueError, TypeError):
                raise DeliveryAttention('Outgoing message lacks a usable timestamp')
            if not start <= created <= now:
                continue
            if not isinstance(msg.get('content'), str):
                raise DeliveryAttention('Outgoing message content is unavailable; inspect manually')
            if '--content' in args:
                match = msg.get('content') == args[args.index('--content') + 1]
            else:
                if not isinstance(msg.get('resources', []), list):
                    raise DeliveryAttention('Outgoing resource metadata is unavailable; inspect manually')
                match = bool(file_id) and any(
                    resource.get('resourceIdType') == 'fileId' and resource.get('resourceId') == file_id
                    for resource in msg.get('resources', []))
                # A same-named card without a file ID cannot prove either outcome.
                if not match and args[args.index('--file-name') + 1] in (msg.get('content') or ''):
                    raise DeliveryAttention('File card lacks the expected resource ID; inspect manually')
            if match:
                mid = msg.get('openMessageId') or msg.get('messageId')
                if not mid:
                    raise DeliveryAttention('Matching message lacks a message ID')
                matches[mid] = msg
    if len(matches) > 1:
        raise DeliveryAttention('Multiple matching deliveries; inspect manually')
    evidence = {'conversationId': conversation_id, 'start': start.isoformat(), 'end': now.isoformat(),
                'complete': True, 'pages': len(visited) + 1, 'matchedMessageIds': list(matches)}
    return next(iter(matches), None), evidence


def deliver_bounded(state, path, key, recipient, args, sender=cli, file_id=None,
                    sleep=time.sleep, clock=time.monotonic, now=lambda: dt.datetime.now(TZ)):
    """Poll persisted tasks; retry one explicitly retryable busy rejection after inspection.

    Timeouts, missing task IDs and unknown failures never authorize a resend.
    The 120-second budget includes reads and waits, not an unbounded campaign loop.
    """
    started = clock()
    existing = state['messages'].get(key, {})
    if existing.get('status') == 'uncertain' and not existing.get('openTaskId'):
        raise DeliveryAttention(f'{key}: unresolved uncertain delivery; inspect before retrying')

    def call(arguments):
        remaining = 120 - (clock() - started)
        if remaining <= 0:
            raise DeliveryAttention('Delivery recovery time budget exhausted; resume from saved state')
        if sender is cli:
            return cli(arguments, timeout=min(45, remaining))
        return sender(arguments)

    for poll in range(3):
        try:
            if deliver(state, path, key, recipient, args, call):
                return True
        except Exception as error:
            entry = state['messages'].get(key, {})
            cause = error.__cause__ if isinstance(error.__cause__, DingTalkError) else error
            payload = cause.payload if isinstance(cause, DingTalkError) else {}
            failure = payload.get('error', {})
            busy = (failure.get('retryable') is True and failure.get('reason') == 'business_error'
                    and 'THREADPOOL_BUSY' in failure.get('technical_detail', ''))
            if not busy or entry.get('busyRetries', 0) >= 1:
                raise DeliveryAttention(f'{key}: {error}; state preserved, no automatic resend') from error
            # Read-only task-status failures can safely be queried again.
            if entry.get('openTaskId'):
                entry['busyRetries'] = entry.get('busyRetries', 0) + 1
                save(path, state)
            else:
                sleep(8)
                try:
                    mid, evidence = inspect_attempt(entry, args, known_conversation(state, recipient),
                                                    file_id, call, now())
                except Exception as inspection_error:
                    raise DeliveryAttention(f'{key}: recovery inspection failed: {inspection_error}; '
                                            'delivery stays uncertain') from inspection_error
                entry.setdefault('inspections', []).append(evidence)
                if mid:
                    entry.update(status='sent', openMessageId=mid,
                                 openConversationId=evidence['conversationId'], confirmedAt=now().isoformat())
                    save(path, state)
                    return True
                entry.setdefault('attemptHistory', []).append({k: entry.get(k) for k in
                                                              ('attemptedAt', 'lastError', 'status')})
                entry.update(status='not-sent', busyRetries=1)
                entry.pop('attemptedAt', None)
                entry.pop('lastError', None)
                save(path, state)
        if poll < 2:
            sleep((3, 8)[poll])
    raise DeliveryAttention(f'{key}: confirmation still pending; resume send to query the saved task')
