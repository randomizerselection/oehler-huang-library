"""Mock DingTalk CLI for fixture tests. Reads a scenario JSON (env
MOCK_SCENARIO), appends every invocation to calls.log and every send to
sends.log under env MOCK_LOG_DIR, and answers the scripted subset of commands.
Never talks to DingTalk.
"""
import json
import os
import sys
from pathlib import Path

LOG_DIR = Path(os.environ['MOCK_LOG_DIR'])
SCENARIO_PATH = Path(os.environ['MOCK_SCENARIO'])


def scenario():
    return json.loads(SCENARIO_PATH.read_text(encoding='utf-8'))


def log(name, record):
    LOG_DIR.mkdir(parents=True, exist_ok=True)
    with open(LOG_DIR / name, 'a', encoding='utf-8') as handle:
        handle.write(json.dumps(record, ensure_ascii=False) + '\n')


def fail(message, code=1):
    print(json.dumps({'success': False, 'error': message}))
    sys.exit(code)


def find_page(pages, cursor):
    for page in pages:
        if 'repeat' in page:
            prefix = page.get('cursorPrefix', 'r')
            if cursor == '0':
                index = 0
            elif cursor.startswith(prefix) and cursor[len(prefix):].isdigit():
                index = int(cursor[len(prefix):])
            else:
                continue
            if index >= page['repeat']:
                return None
            response = {k: v for k, v in page.items() if k not in ('repeat', 'cursorPrefix')}
            response.setdefault('hasMore', True)
            response['nextCursor'] = f'{prefix}{index + 1}'
            return response
        if page.get('cursor', '0') == cursor:
            return page
    return None


def get_self(config):
    mode = config.get('mode', 'success')
    if mode == 'malformed':
        print('this is not JSON at all')
        return
    if mode == 'auth-failure':
        fail('authentication failed: token expired, sign-in required')
    corp = config.get('corpId', 'CORP5')
    user = config.get('userId', 'USER5')
    if mode == 'wrong-org':
        corp = 'OTHERCORP999'
    if mode == 'snake':
        print(json.dumps({'success': True, 'corp_id': corp, 'user_id': user}))
    elif mode == 'flat':
        print(json.dumps({'success': True, 'corpId': corp, 'userId': user}))
    elif mode == 'nested':
        # Production shape: identifiers nested inside orgEmployeeModel.
        print(json.dumps({'result': [{'isAdmin': False, 'orgEmployeeModel': {
            'corpId': corp, 'userId': user, 'name': 'Samuel'}}]}))
    elif mode == 'nested-wrong-org':
        print(json.dumps({'result': [{'isAdmin': False, 'orgEmployeeModel': {
            'corpId': 'OTHERCORP999', 'userId': user, 'name': 'Samuel'}}]}))
    else:
        print(json.dumps({'success': True, 'result': [{'corpId': corp, 'userId': user}]}))


def send_status(args, config):
    task = args[args.index('--open-task-id') + 1]
    per_task = config.get('sendStatus', {})
    entry = per_task.get(task, per_task.get('*', {}))
    state_path = LOG_DIR / 'mock-status.json'
    state = json.loads(state_path.read_text(encoding='utf-8')) if state_path.exists() else {}
    calls = state.get(task, 0) + 1
    state[task] = calls
    state_path.write_text(json.dumps(state), encoding='utf-8')
    if calls <= entry.get('pendingCalls', 0) or not entry.get('confirmed', True):
        print(json.dumps({'success': True, 'result': {'status': 'SENDING'}}))
    else:
        print(json.dumps({'success': True, 'result': {
            'status': 'SENT', 'openMessageId': 'selfmsg-' + task, 'openConversationId': 'selfconv-' + task}}))


def main():
    log('calls.log', sys.argv[1:])
    config = scenario()
    args = list(sys.argv[1:])
    while '--profile' in args:
        index = args.index('--profile')
        del args[index:index + 2]
    command = tuple(args[:3])
    if tuple(args[:2]) == ('drive', 'upload'):
        drive = config.get('driveUpload', {})
        if drive.get('mode') == 'fail':
            fail('drive upload failed')
        if drive.get('mode') == 'no-ids':
            print(json.dumps({'success': True, 'result': {'fileName': 'x.png'}}))
            return
        name = args[args.index('--file-name') + 1] if '--file-name' in args else 'question.png'
        per_file = drive.get('byFile', {}).get(name, {})
        print(json.dumps({'success': True, 'result': {
            'fileId': per_file.get('fileId', drive.get('fileId', 'FILE1')),
            'spaceId': per_file.get('spaceId', drive.get('spaceId', 'SPACE1')),
            'fileName': per_file.get('fileName', drive.get('fileName', name))}}))
    elif tuple(args[:2]) == ('drive', 'info'):
        info = config.get('driveInfo', {})
        if info.get('mode') == 'fail':
            fail('drive info failed')
        file_id = args[args.index('--file-id') + 1] if '--file-id' in args else 'FILE1'
        per_file = info.get('byFileId', {}).get(file_id, {})
        print(json.dumps({'success': True, 'result': {
            'dentryId': per_file.get('dentryId', info.get('dentryId', 'DENTRY1')),
            'spaceId': per_file.get('spaceId', info.get('spaceId', 'SPACE1')),
            'fileId': file_id,
            'name': per_file.get('name', info.get('name', 'question.png'))}}))
    elif tuple(args[:2]) == ('chat', 'search'):
        cursor = args[args.index('--cursor') + 1] if '--cursor' in args else '0'
        page = find_page(config.get('groupSearch', []), cursor)
        if page is None:
            fail('no scripted group search page for cursor ' + cursor)
        if 'error' in page:
            fail(page['error'])
        result = {'groups': page.get('groups', []), 'hasMore': page.get('hasMore', False)}
        if 'nextCursor' in page:
            result['nextCursor'] = page['nextCursor']
        print(json.dumps({'success': True, 'result': result}))
    elif command == ('chat', 'message', 'search'):
        cursor = args[args.index('--cursor') + 1] if '--cursor' in args else '0'
        page = find_page(config.get('messageSearch', []), cursor)
        if page is None:
            fail('no scripted message search page for cursor ' + cursor)
        if 'error' in page:
            fail(page['error'])
        result = {'conversationMessagesList': page.get('conversations', []),
                  'hasMore': page.get('hasMore', False)}
        if 'nextCursor' in page:
            result['nextCursor'] = page['nextCursor']
        print(json.dumps({'success': True, 'result': result}))
    elif command == ('contact', 'user', 'get-self'):
        get_self(config.get('getSelf', {}))
    elif command == ('chat', 'message', 'list-all'):
        remaining = config.get('listAllFailures', 0)
        counter = LOG_DIR / 'list-all-failures.json'
        seen = json.loads(counter.read_text(encoding='utf-8')) if counter.exists() else 0
        if seen < remaining:
            counter.write_text(json.dumps(seen + 1), encoding='utf-8')
            fail('business error: success=false (TIMEOUT_ERROR, retryable)')
        cursor = args[args.index('--cursor') + 1]
        page = find_page(config.get('pages', []), cursor)
        if page is None:
            fail('no scripted page for cursor ' + cursor)
        if 'error' in page:
            fail(page['error'])
        result = {'conversationMessagesList': page.get('conversations', []),
                  'hasMore': page.get('hasMore', False)}
        if 'nextCursor' in page:
            result['nextCursor'] = page['nextCursor']
        print(json.dumps({'success': True, 'result': result}))
    elif command == ('contact', 'user', 'search'):
        query = args[args.index('--query') + 1]
        answer = config.get('search', {}).get(query, [])
        if isinstance(answer, dict) and answer.get('error'):
            fail(answer['error'])
        print(json.dumps({'success': True, 'result': answer}))
    elif command == ('chat', 'message', 'send'):
        send_config = config.get('send', {})
        content = args[args.index('--content') + 1] if '--content' in args else None
        is_group = '--group' in args
        recipient = args[args.index('--group' if is_group else '--open-dingtalk-id') + 1]
        key = args[args.index('--idempotency-key') + 1] if '--idempotency-key' in args else None
        task = send_config.get('openTaskId', 'task-1')
        log('sends.log', {'openDingTalkId': None if is_group else recipient,
                          'group': recipient if is_group else None, 'content': content,
                          'msgType': args[args.index('--msg-type') + 1] if '--msg-type' in args else None,
                          'dentryId': args[args.index('--dentry-id') + 1] if '--dentry-id' in args else None,
                          'spaceId': args[args.index('--space-id') + 1] if '--space-id' in args else None,
                          'fileName': args[args.index('--file-name') + 1] if '--file-name' in args else None,
                          'fileType': args[args.index('--file-type') + 1] if '--file-type' in args else None,
                          'filePath': args[args.index('--file-path') + 1] if '--file-path' in args else None,
                          'fileSize': args[args.index('--file-size') + 1] if '--file-size' in args else None,
                          'idempotencyKey': key, 'openTaskId': task})
        if send_config.get('mode') == 'crash':
            # Remote send happened; the local process dies before persisting it.
            os._exit(3)
        if send_config.get('mode') == 'fail':
            fail('send failed')
        print(json.dumps({'success': True, 'result': {'openTaskId': task}}))
    elif command == ('chat', 'message', 'query-send-status'):
        send_status(args, config)
    elif command == ('chat', 'message', 'download-media'):
        output = args[args.index('--output') + 1]
        download = config.get('downloadMedia', {})
        mode = download.get('mode', 'save')
        if mode == 'compat':
            # This CLI version's real shape: a compat envelope carrying a
            # signed downloadUrl instead of a saved file.
            print(json.dumps({
                'invocation': {'kind': 'compat_invocation', 'implemented': False,
                               'legacy_path': 'chat message download-media'},
                'response': {'content': {'errorCode': None, 'result': {
                    'downloadUrl': download.get('url', ''), 'expireInSeconds': 3600},
                    'success': True}, 'endpoint': 'fixture'}}))
        elif mode == 'compat-fail':
            print(json.dumps({'response': {'content': {
                'errorCode': '500', 'result': {'success': False}, 'success': False},
                'endpoint': 'fixture'}}))
        elif mode == 'garbage':
            print('this is not JSON at all')
        else:
            # Older behavior: the CLI saves the file directly to --output.
            Path(output).parent.mkdir(parents=True, exist_ok=True)
            Path(output).write_bytes(b'\xff\xd8\xff\xd9')
            print(json.dumps({'success': True, 'result': {'path': output}}))
    else:
        fail('unmocked command: ' + ' '.join(args), code=2)


if __name__ == '__main__':
    main()
