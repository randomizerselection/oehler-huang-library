"""NapCatQQ (OneBot v11 HTTP) transport for the IC3 homework automation.

This script speaks the automation's private internal CLI dialect — the same
command paths and field names the DingTalk scripts were written against — so
fetch.py, receipts.py, reminders.py and run_guard.py run unchanged. It is NOT
DingTalk: QQ numbers travel in the dialect's `openDingTalkId` /
`senderOpenDingTalkId` / `--open-dingtalk-id` slots purely for field-name
compatibility with the shared modules. Treat those fields as "transport user
id" everywhere in this directory.

Dialect command -> OneBot v11 mapping:
  chat message list-all            -> get_recent_contact (NapCat extension) to
                                      enumerate recent private (c2c) contacts,
                                      then get_friend_msg_history (NapCat
                                      extension) paged per contact.
  contact user search              -> get_friend_list, nickname/remark filter.
  contact user get-self            -> get_login_info.
  chat message send                -> send_private_msg (text chain, or one
                                      image segment for the file-card variant).
  chat message query-send-status   -> get_msg.
  chat message download-media      -> get_image (image segments) or get_file
                                      (file segments, selected by
                                      --resource-type), then urllib download or
                                      local file copy into --output.
  drive upload / drive info        -> local pass-through (QQ has no drive here);
                                      the "fileId"/"dentryId" are the local
                                      absolute path. Used by reminders.py only.

Config: config.json next to this script (env QQ_CONFIG_PATH overrides), keys
`onebotHttp` (e.g. http://127.0.0.1:3000) and `onebotToken` (NapCat OneBot
HTTP access token). Stdlib only.

Exit codes: 0 success envelope on stdout; 1 failure envelope (transport down,
API failure, ambiguous send); 2 unknown/malformed command.
"""
import base64
from concurrent.futures import ThreadPoolExecutor
import datetime as dt
import json
import os
import shutil
import sys
import urllib.error
import urllib.request
import uuid
from pathlib import Path

# Fixture copies keep local config; production data is registered privately.
SOURCE_ROOT = Path(__file__).resolve().parent
if (SOURCE_ROOT / 'config.json').is_file():
    ROOT = SOURCE_ROOT
else:
    import sys
    sys.path.insert(0, str(SOURCE_ROOT.parents[1]))
    from runtime import runtime_root
    ROOT = runtime_root('qq-ic3', SOURCE_ROOT)
STATE = ROOT / 'state'
# Tests point QQ_CONFIG_PATH at a fixture config; default behaviour is unchanged.
CONFIG_PATH = Path(os.environ['QQ_CONFIG_PATH']) if os.environ.get('QQ_CONFIG_PATH') else ROOT / 'config.json'
CONFIG = json.loads(CONFIG_PATH.read_text(encoding='utf-8'))
TZ = dt.timezone(dt.timedelta(hours=8))
CONTACT_CACHE = STATE / 'qq-contact-cache.json'
SEND_KEYS = STATE / 'qq-send-keys.json'
# Mid-scan the contact snapshot must stay stable; a scan older than this is
# aborted (failure envelope) rather than silently skipping contacts.
CACHE_TTL = dt.timedelta(minutes=15)

# Callers (fetch.cli, run_guard.self_identity) decode stdout as UTF-8, but a
# piped stdout on Windows defaults to the locale codepage (GBK here),
# corrupting CJK QQ nicknames and message text. Pin UTF-8 regardless.
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')


class TransportError(Exception):
    """The OneBot endpoint could not be reached or its answer was unusable."""


class ApiError(Exception):
    """OneBot answered but reported failure (retcode != 0)."""


def emit(payload):
    sys.stdout.write(json.dumps(payload, ensure_ascii=False) + '\n')


def fail(message, code=1):
    sys.stderr.write('qq-cli: ' + str(message) + '\n')
    emit({'success': False, 'error': str(message)})
    sys.exit(code)


def save(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_suffix(path.suffix + '.tmp')
    tmp.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')
    tmp.replace(path)


def option(args, name, required=False):
    if name in args:
        index = args.index(name) + 1
        if index < len(args):
            return args[index]
    if required:
        fail(f'missing required option {name}', code=2)
    return None


def call_api(action, payload=None, timeout=240):
    """POST one OneBot v11 action; return its data object."""
    url = CONFIG['onebotHttp'].rstrip('/') + '/' + action
    request = urllib.request.Request(url, data=json.dumps(payload or {}).encode('utf-8'), headers={
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + str(CONFIG.get('onebotToken') or '')})
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            raw = response.read()
    except urllib.error.HTTPError as error:
        if error.code in (401, 403):
            raise TransportError(
                f'OneBot authorization failed (HTTP {error.code}); check onebotToken '
                'and re-login via the NapCat WebUI (http://127.0.0.1:6099/webui)') from error
        raise TransportError(f'OneBot HTTP {error.code} for {action}') from error
    except (urllib.error.URLError, TimeoutError, OSError) as error:
        if action == 'ocr_image' and (isinstance(error, TimeoutError)
                                     or isinstance(getattr(error, 'reason', None), TimeoutError)):
            raise TransportError('OCR_TIMEOUT: QQ OCR did not answer within its time budget') from error
        raise TransportError(
            f'cannot reach OneBot endpoint {CONFIG["onebotHttp"]} '
            f'(connection refused or unreachable): {error}') from error
    try:
        envelope = json.loads(raw)
    except ValueError as error:
        raise TransportError(f'OneBot returned non-JSON for {action}') from error
    if envelope.get('retcode') not in (0, None) or envelope.get('status') == 'failed':
        detail = envelope.get('message') or envelope.get('wording') or ''
        raise ApiError(f"{action} failed: retcode={envelope.get('retcode')} {detail}".strip())
    return envelope.get('data')


# --- list-all: recent private contacts, paged history -----------------------

def encode_cursor(position):
    return base64.urlsafe_b64encode(json.dumps(position).encode('utf-8')).decode('ascii')


def decode_cursor(text):
    try:
        position = json.loads(base64.urlsafe_b64decode(text.encode('ascii')))
    except Exception:
        raise ValueError('unparseable message cursor')
    if not isinstance(position, dict) or 'g' not in position or 'c' not in position:
        raise ValueError('unparseable message cursor')
    return position


def recent_contacts():
    """NapCat get_recent_contact: recent one-to-one conversations only."""
    data = call_api('get_recent_contact') or []
    if isinstance(data, dict):
        data = data.get('contacts') or data.get('list') or []
    contacts = []
    self_uin = str(CONFIG.get('selfQqId') or '')
    for item in data:
        if not isinstance(item, dict):
            continue
        if item.get('group_id') or item.get('groupCode'):
            continue
        # Explicit non-private chat types are skipped: 2 is a group, and NapCat
        # also returns non-chat entries (for example chatType 8 with peerUin "0")
        # whose history cannot be read at all — one of those used to abort the
        # whole scan. An absent chatType is still treated as private.
        chat_type = str(item.get('chatType') or item.get('chat_type') or '').strip()
        if chat_type and chat_type not in ('1', 'c2c', 'private', 'friend'):
            continue
        uin = item.get('user_id') or item.get('peerUin') or item.get('peerUid') or item.get('uin')
        uin = str(uin if uin is not None else '').strip()
        if not uin or set(uin) == {'0'}:
            continue
        if self_uin and uin == self_uin:
            # The account's own chat can never be a student submission.
            continue
        contacts.append({'userId': uin,
                         'nickname': str(item.get('nickname') or ''),
                         'remark': str(item.get('remark') or item.get('peerName') or '')})
    return contacts


def friend_names():
    try:
        friends = call_api('get_friend_list') or []
    except (TransportError, ApiError):
        return {}
    result = {}
    for friend in friends:
        uin = str(friend.get('user_id') or '')
        if uin:
            result[uin] = {'nickname': str(friend.get('nickname') or ''),
                           'remark': str(friend.get('remark') or '')}
    return result


def load_cache():
    if not CONTACT_CACHE.exists():
        return None
    try:
        return json.loads(CONTACT_CACHE.read_text(encoding='utf-8'))
    except ValueError:
        return None


def cache_age(cache):
    try:
        return dt.datetime.now(TZ) - dt.datetime.fromisoformat(cache['fetchedAt'])
    except (KeyError, ValueError):
        return CACHE_TTL + dt.timedelta(seconds=1)


def fresh_contacts():
    names = friend_names()
    contacts = recent_contacts()
    for contact in contacts:
        known = names.get(contact['userId'], {})
        contact['nickname'] = contact['nickname'] or known.get('nickname', '')
        contact['remark'] = contact['remark'] or known.get('remark', '')
    cache = {'generation': uuid.uuid4().hex[:12],
             'fetchedAt': dt.datetime.now(TZ).isoformat(), 'contacts': contacts}
    save(CONTACT_CACHE, cache)
    return cache


def flatten(message):
    """Flatten a OneBot message chain to plain text plus image resources."""
    chain = message.get('message')
    if isinstance(chain, str):
        return chain, []
    parts, resources = [], []
    for segment in chain or []:
        kind = segment.get('type')
        data = segment.get('data') or {}
        if kind == 'text':
            parts.append(str(data.get('text') or ''))
        elif kind == 'image':
            # The literal marker keeps image-only messages pending in fetch.py
            # (its homework-keyword filter matches 图片消息).
            parts.append('[图片消息]')
            resource_id = data.get('file') or data.get('file_id')
            if resource_id:
                resources.append({'resourceType': 'image', 'resourceId': str(resource_id),
                                  'url': str(data.get('url') or '')})
        elif kind == 'file':
            # Students often send photos as QQ file segments; keep the file_id
            # as a downloadable resource (NapCat get_file) instead of dropping it.
            parts.append('[File: ' + str(data.get('file') or data.get('file_name') or 'attachment') + ']')
            resource_id = data.get('file_id') or data.get('file')
            if resource_id:
                resources.append({'resourceType': 'file', 'resourceId': str(resource_id),
                                  'fileName': str(data.get('file') or ''),
                                  'fileSize': str(data.get('file_size') or '')})
        elif kind == 'face':
            parts.append('[表情]')
        elif kind == 'record':
            parts.append('[语音]')
        elif kind == 'video':
            parts.append('[视频]')
        elif kind == 'at':
            parts.append('@' + str(data.get('qq') or ''))
        elif kind == 'forward':
            parts.append('[聊天记录]')
        elif kind == 'json':
            parts.append('[JSON消息]')
    text = ''.join(parts).strip()
    if not text:
        text = str(message.get('raw_message') or '').strip() or '[消息]'
    return text, resources


def render_message(message, title):
    sender = message.get('sender') or {}
    sender_id = str(sender.get('user_id') or message.get('user_id') or '')
    text, resources = flatten(message)
    stamp = dt.datetime.fromtimestamp(float(message.get('time') or 0), TZ).strftime('%Y-%m-%d %H:%M:%S')
    mid = str(message.get('message_id'))
    return {
        'openMessageId': mid,
        'messageId': mid,
        'createTime': stamp,
        'sender': str(sender.get('nickname') or title),
        # Dialect slot carrying the sender's QQ number (see module docstring).
        'senderOpenDingTalkId': sender_id,
        'content': text,
        'text': text,
        'messageAiSendFlag': False,
        'resources': resources,
    }


def emit_list(conversations, has_more, position):
    result = {'conversationMessagesList': conversations, 'hasMore': has_more}
    if has_more:
        result['nextCursor'] = encode_cursor(position)
    emit({'success': True, 'result': result})


def history_pages(contacts, index, seq, limit):
    """Prefetch at most three independent read-only contact pages.

    Results are consumed in the original cursor order. A full page still returns
    its original continuation cursor; speculative reads never advance it. There
    is no cross-scan cache and every scan still discovers new contacts.
    """
    def fetch_page(pair):
        offset, contact = pair
        payload = {'user_id': int(contact['userId']), 'count': limit, 'reverseOrder': True}
        if offset == index and seq:
            payload['message_seq'] = seq
        data = call_api('get_friend_msg_history', payload) or {}
        messages = data.get('messages') if isinstance(data, dict) else None
        return contact, messages or []

    with ThreadPoolExecutor(max_workers=3) as pool:
        for start in range(index, len(contacts), 3):
            chunk = list(enumerate(contacts[start:start + 3], start))
            # Observe every error in the window before accepting any of it.
            pages = list(pool.map(fetch_page, chunk))
            yield from pages


def cmd_list_all(args):
    start = dt.datetime.strptime(option(args, '--start', required=True), '%Y-%m-%d %H:%M:%S').replace(tzinfo=TZ)
    end = dt.datetime.strptime(option(args, '--end', required=True), '%Y-%m-%d %H:%M:%S').replace(tzinfo=TZ)
    limit = int(option(args, '--limit') or '100')
    cursor_text = option(args, '--cursor') or '0'
    start_ts, end_ts = start.timestamp(), end.timestamp()
    if cursor_text == '0':
        # Refresh the contact snapshot at the start of every scan step: a student
        # writing for the first time must appear in that step. The snapshot only
        # has to stay stable while one cursor chain is being paged, so the cached
        # copy is reused for later pages of the same chain.
        cache = fresh_contacts()
        position = {'g': cache['generation'], 'c': 0, 's': 0}
    else:
        try:
            position = decode_cursor(cursor_text)
        except ValueError as error:
            fail(str(error))
        cache = load_cache()
        if cache is None or cache.get('generation') != position.get('g') or cache_age(cache) > CACHE_TTL:
            # Never silently continue on a different contact snapshot: the scan
            # would quietly skip contacts. Fail so fetch.py reports incomplete.
            fail('contact snapshot expired mid-scan; restart the scan from cursor 0')
    contacts = cache['contacts']
    conversations = []
    index, seq = position['c'], position.get('s') or 0
    for contact, messages in history_pages(contacts, index, seq, limit):
        in_window = [m for m in messages
                     if m.get('time') and start_ts <= float(m['time']) <= end_ts]
        if in_window:
            conversations.append({
                'openConversationId': 'qqc2c-' + contact['userId'],
                'singleChat': True,
                'title': contact.get('remark') or contact.get('nickname') or contact['userId'],
                'messages': [render_message(m, contact.get('remark') or contact.get('nickname') or contact['userId'])
                             for m in in_window],
            })
        oldest = messages[-1] if messages else None
        exhausted = (not messages or len(messages) < limit
                     or bool(oldest.get('time') and float(oldest['time']) < start_ts))
        if exhausted:
            index += 1
            seq = 0
            continue
        next_position = {'g': cache['generation'], 'c': index,
                         's': oldest.get('message_seq') or seq}
        if next_position['s'] == position.get('s') and index == position['c'] and not conversations:
            fail('message history did not advance; refusing a stalled cursor')
        emit_list(conversations, True, next_position)
        return
    emit_list(conversations, False, None)


# --- sends ------------------------------------------------------------------

def load_send_keys():
    if SEND_KEYS.exists():
        try:
            state = json.loads(SEND_KEYS.read_text(encoding='utf-8'))
            state.setdefault('keys', {})
            state.setdefault('byMessageId', {})
            return state
        except ValueError:
            pass
    return {'keys': {}, 'byMessageId': {}}


def cmd_send(args):
    peer = option(args, '--open-dingtalk-id', required=True)  # QQ number, dialect name
    key = option(args, '--idempotency-key')
    state = load_send_keys()
    if key and key in state['keys']:
        # Local idempotency: a repeated key returns the recorded result WITHOUT
        # resending (QQ/OneBot has no server-side idempotency key).
        emit({'success': True, 'result': {'openTaskId': state['keys'][key]['messageId'],
                                          'idempotentReplay': True}})
        return
    if option(args, '--msg-type') == 'file':
        # reminders.py file-card variant: send the local question image as one
        # image segment (NapCat accepts file:/// URIs for local files).
        file_path = Path(option(args, '--file-path', required=True)).resolve()
        chain = [{'type': 'image', 'data': {'file': 'file:///' + file_path.as_posix()}}]
    else:
        chain = [{'type': 'text', 'data': {'text': option(args, '--content', required=True)}}]
    try:
        data = call_api('send_private_msg', {'user_id': int(peer), 'message': chain})
    except (TransportError, ApiError) as error:
        # Ambiguous outcome: the message may or may not have been delivered.
        # Exit nonzero WITHOUT recording the key; the caller's uncertain
        # machinery (receipts/reminders) owns recovery.
        fail(f'send outcome ambiguous: {error}')
    message_id = (data or {}).get('message_id') if isinstance(data, dict) else None
    if message_id is None:
        fail('send response lacks message_id; outcome ambiguous')
    if key:
        state['keys'][key] = {'messageId': str(message_id), 'userId': str(peer),
                              'sentAt': dt.datetime.now(TZ).isoformat()}
        state['byMessageId'][str(message_id)] = str(peer)
        save(SEND_KEYS, state)
    emit({'success': True, 'result': {'openTaskId': str(message_id)}})


def cmd_query_send_status(args):
    task = option(args, '--open-task-id', required=True)
    try:
        data = call_api('get_msg', {'message_id': int(task)})
    except ApiError as error:
        # Not retrievable (yet): callers keep waiting rather than failing.
        emit({'success': True, 'result': {'pending': True, 'note': str(error)[:200]}})
        return
    peer = load_send_keys()['byMessageId'].get(str(task))
    if not peer and isinstance(data, dict):
        peer = data.get('peer_id') or data.get('target_id')
        peer = str(peer) if peer else ''
    if peer:
        emit({'success': True, 'result': {'openMessageId': str(task),
                                          'openConversationId': 'qqc2c-' + peer}})
    else:
        emit({'success': True, 'result': {'pending': True,
                                          'note': 'peer conversation unknown for message ' + str(task)}})


# --- media ------------------------------------------------------------------

def cmd_download_media(args):
    resource = option(args, '--resource-id', required=True)
    output = Path(option(args, '--output', required=True))
    # media.py tells us the segment kind via --resource-type; the dialect's
    # --type fileId also marks files. Resource ids can surprise us, so a failed
    # primary lookup falls back to the other action before giving up.
    kind = (option(args, '--resource-type') or '').lower()
    if kind not in ('file', 'image'):
        kind = 'file' if 'file' in (option(args, '--type') or '').lower() else 'image'
    primary = [('get_file', {'file_id': resource}), ('get_image', {'file': resource})]
    if kind == 'image':
        primary.reverse()
    data = None
    errors = []
    for action, payload in primary:
        try:
            data = call_api(action, payload) or {}
            break
        except ApiError as error:
            errors.append(str(error))
    if data is None:
        fail('resource not retrievable: ' + '; '.join(errors))
    url = str(data.get('url') or '') if isinstance(data, dict) else ''
    if url.startswith(('http://', 'https://')):
        try:
            with urllib.request.urlopen(url, timeout=240) as response:
                payload = response.read()
        except Exception as error:
            fail(f'download failed: {error}')
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_bytes(payload)
    else:
        local = str(data.get('file') or '') if isinstance(data, dict) else ''
        if local and Path(local).exists():
            output.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(local, output)
        else:
            fail('resource lookup returned neither a usable url nor a local file')
    if not output.exists():
        fail('resource was not saved')
    emit({'success': True, 'result': {'path': str(output)}})


# --- contacts / identity ----------------------------------------------------

def cmd_contact_search(args):
    query = (option(args, '--query', required=True) or '').lower()
    friends = call_api('get_friend_list') or []
    result = []
    for friend in friends:
        nickname = str(friend.get('nickname') or '')
        remark = str(friend.get('remark') or '')
        if query in nickname.lower() or query in remark.lower():
            result.append({'name': remark or nickname,
                           'openDingTalkId': str(friend.get('user_id') or '')})
    emit({'success': True, 'result': result})


def cmd_get_self(args):
    data = call_api('get_login_info') or {}
    emit({'success': True, 'result': {'userId': str(data.get('user_id') or ''),
                                      'nickname': str(data.get('nickname') or '')}})


# --- reminders-only local drive pass-through --------------------------------

def cmd_drive_upload(args):
    path = Path(option(args, '--file', required=True)).resolve()
    emit({'success': True, 'result': {'fileId': str(path), 'spaceId': 'local',
                                      'fileName': option(args, '--file-name') or path.name}})


def cmd_drive_info(args):
    path = str(Path(option(args, '--file-id', required=True)).resolve())
    emit({'success': True, 'result': {'dentryId': path, 'spaceId': 'local',
                                      'path': path, 'fileId': path}})


def cmd_ocr_text(args):
    """Extract text from an evidence file through NapCat's QQ OCR service.

    The dialect command is `chat message ocr-text --file-path <abs path>`; it is
    used to record a machine-readable transcription of a student's answer so a
    mark can be checked against the mark scheme. QQ's OCR is imperfect on
    handwriting, so the transcription is evidence for review, never a substitute
    for reading the image, and it is stored verbatim.
    """
    path = Path(option(args, '--file-path', required=True)).resolve()
    if not path.is_file():
        fail(f'ocr-text: file not found: {path}')
    data = call_api('ocr_image', {'image': 'file:///' + path.as_posix()}, timeout=25) or []
    if isinstance(data, dict):
        data = data.get('texts') or data.get('result') or []
    lines = [str(item.get('text') or '') for item in data if isinstance(item, dict)]
    lines = [line for line in lines if line.strip()]
    emit({'success': True, 'result': {'file': str(path), 'lineCount': len(lines),
                                      'text': '\n'.join(lines), 'boxes': data}})


def main(argv):
    args = list(argv)
    command = tuple(args[:3])
    if command == ('chat', 'message', 'list-all'):
        cmd_list_all(args)
    elif command == ('contact', 'user', 'search'):
        cmd_contact_search(args)
    elif command == ('contact', 'user', 'get-self'):
        cmd_get_self(args)
    elif command == ('chat', 'message', 'send'):
        cmd_send(args)
    elif command == ('chat', 'message', 'query-send-status'):
        cmd_query_send_status(args)
    elif command == ('chat', 'message', 'download-media'):
        cmd_download_media(args)
    elif command == ('chat', 'message', 'ocr-text'):
        cmd_ocr_text(args)
    elif tuple(args[:2]) == ('drive', 'upload'):
        cmd_drive_upload(args)
    elif tuple(args[:2]) == ('drive', 'info'):
        cmd_drive_info(args)
    else:
        sys.stderr.write('qq-cli: unknown command: ' + ' '.join(args) + '\n')
        sys.exit(2)


if __name__ == '__main__':
    try:
        main(sys.argv[1:])
    except SystemExit:
        raise
    except (TransportError, ApiError) as error:
        fail(str(error))
    except Exception as error:
        fail(f'unexpected error: {error}')
