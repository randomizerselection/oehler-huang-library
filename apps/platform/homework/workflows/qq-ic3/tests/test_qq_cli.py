"""Tests for qq_cli.py against a mock OneBot v11 (NapCatQQ) HTTP endpoint.

A stdlib http.server plays NapCat: scripted per-action responses for
get_login_info, get_friend_list, get_recent_contact, get_friend_msg_history
(paginated), send_private_msg, get_msg and get_image. Each test copies
qq_cli.py into a temp directory (so state/qq-send-keys.json and
state/qq-contact-cache.json are isolated) and points QQ_CONFIG_PATH at a
fixture config referencing the mock server. The real NapCat endpoint and the
real state/ tree are never touched.
"""
import json
import os
import shutil
import subprocess
import sys
import tempfile
import threading
import unittest
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from fixtures import REAL_DIR

TOKEN = 'test-token'
TEACHER_UIN = '900001'
NOW = 1800000000  # arbitrary fixed "now"; message times are built relative to it


class RetcodeError(Exception):
    def __init__(self, retcode, message):
        super().__init__(message)
        self.retcode = retcode


class HttpError(Exception):
    def __init__(self, status):
        super().__init__(status)
        self.status = status


class MockOneBot:
    def __init__(self, server):
        self.server = server
        self.token = TOKEN
        self.login = {'user_id': int(TEACHER_UIN), 'nickname': 'Samuel'}
        self.friends = []
        self.recent = []
        self.history = {}        # uin string -> [messages, newest first]
        self.sent = []           # send_private_msg bodies
        self.actions = []        # every action name received
        self.send_mode = 'ok'    # 'ok' | 'http500' | 'retcode'
        self.next_message_id = 5000
        self.messages = {}       # message_id string -> peer uin string
        self.images = {}         # file id -> {'urlPath': ...} or {'localPath': ...}
        self.files = {}          # get_file file_id -> {'urlPath': ...} or {'localPath': ...}
        self.file_bytes = {}     # URL path -> bytes (for get_image/get_file url downloads)

    def page_history(self, body):
        uin = str(body['user_id'])
        messages = self.history.get(uin, [])
        seq = body.get('message_seq')
        start = 0
        if seq:
            for index, message in enumerate(messages):
                if str(message['message_seq']) == str(seq):
                    start = index + 1
                    break
        return messages[start:start + int(body.get('count', 100))]

    def handle(self, action, body):
        if action == 'get_login_info':
            return self.login
        if action == 'get_friend_list':
            return self.friends
        if action == 'get_recent_contact':
            return self.recent
        if action == 'get_friend_msg_history':
            return {'messages': self.page_history(body)}
        if action == 'send_private_msg':
            if self.send_mode == 'http500':
                raise HttpError(500)
            if self.send_mode == 'retcode':
                raise RetcodeError(1, 'send failed')
            self.sent.append(body)
            self.next_message_id += 1
            self.messages[str(self.next_message_id)] = str(body['user_id'])
            return {'message_id': self.next_message_id}
        if action == 'get_msg':
            mid = str(body['message_id'])
            peer = self.messages.get(mid)
            if peer is None:
                raise RetcodeError(1404, 'message not found')
            return {'message_id': int(mid), 'message_type': 'private',
                    'peer_id': int(peer), 'sender': {'user_id': int(TEACHER_UIN)},
                    'time': NOW, 'message': []}
        if action == 'get_image':
            entry = self.images.get(body.get('file'))
            if entry is None:
                raise RetcodeError(1404, 'file not found')
            if 'urlPath' in entry:
                return {'file': body['file'],
                        'url': f'http://127.0.0.1:{self.server.server_port}{entry["urlPath"]}'}
            return {'file': entry['localPath']}
        if action == 'get_file':
            entry = self.files.get(body.get('file_id'))
            if entry is None:
                raise RetcodeError(1404, 'file not found')
            if 'urlPath' in entry:
                return {'file': body['file_id'], 'file_size': '121361',
                        'url': f'http://127.0.0.1:{self.server.server_port}{entry["urlPath"]}'}
            return {'file': entry['localPath'], 'file_size': '121361'}
        raise AssertionError('unscripted action: ' + action)


class Handler(BaseHTTPRequestHandler):
    def log_message(self, *args):
        pass

    def reply(self, status, payload, raw=False):
        body = payload if raw else json.dumps(payload).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/octet-stream' if raw else 'application/json')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        mock = self.server.mock
        data = mock.file_bytes.get(self.path)
        if data is None:
            self.reply(404, b'not found', raw=True)
        else:
            self.reply(200, data, raw=True)

    def do_POST(self):
        mock = self.server.mock
        if self.headers.get('Authorization') != 'Bearer ' + mock.token:
            self.reply(401, {'status': 'failed', 'retcode': 1403, 'message': 'unauthorized'})
            return
        length = int(self.headers.get('Content-Length') or 0)
        body = json.loads(self.rfile.read(length) or b'{}')
        action = self.path.lstrip('/')
        mock.actions.append(action)
        try:
            data = mock.handle(action, body)
        except HttpError as error:
            self.reply(error.status, {'status': 'failed', 'retcode': 1, 'message': 'http error'})
            return
        except RetcodeError as error:
            self.reply(200, {'status': 'failed', 'retcode': error.retcode, 'message': str(error)})
            return
        self.reply(200, {'status': 'ok', 'retcode': 0, 'data': data})


def make_message(mid, seq, time, text=None, uin='1001', nickname='Sunny', segments=None):
    chain = segments if segments is not None else [{'type': 'text', 'data': {'text': text or ''}}]
    return {'message_id': mid, 'message_seq': seq, 'time': time, 'message_type': 'private',
            'sub_type': 'friend', 'user_id': int(uin),
            'sender': {'user_id': int(uin), 'nickname': nickname}, 'message': chain,
            'raw_message': text or ''}


class QqCliCase(unittest.TestCase):
    def setUp(self):
        tmp = Path(tempfile.mkdtemp(prefix='qq-cli-test-'))
        self.addCleanup(shutil.rmtree, tmp, True)
        self.tmp = tmp
        self.script = tmp / 'qq_cli.py'
        shutil.copy(REAL_DIR / 'qq_cli.py', self.script)
        self.server = ThreadingHTTPServer(('127.0.0.1', 0), Handler)
        self.mock = MockOneBot(self.server)
        self.server.mock = self.mock
        thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        thread.start()
        self.addCleanup(self.server.server_close)
        self.addCleanup(self.server.shutdown)
        self.url = f'http://127.0.0.1:{self.server.server_port}'
        self.config = tmp / 'config.json'
        self.config.write_text(json.dumps({'onebotHttp': self.url, 'onebotToken': TOKEN}),
                               encoding='utf-8')

    def run_cli(self, *args, token=TOKEN, extra_env=None):
        env = dict(os.environ, QQ_CONFIG_PATH=str(self.config))
        if token != TOKEN:
            config = json.loads(self.config.read_text(encoding='utf-8'))
            config['onebotToken'] = token
            alternate = self.tmp / 'config-alt.json'
            alternate.write_text(json.dumps(config), encoding='utf-8')
            env['QQ_CONFIG_PATH'] = str(alternate)
        env.update(extra_env or {})
        return subprocess.run([sys.executable, str(self.script), *args],
                              capture_output=True, env=env, timeout=120)

    def parse(self, result):
        self.assertEqual(result.returncode, 0, result.stderr.decode('utf-8', 'replace'))
        return json.loads(result.stdout.decode('utf-8'))

    def send_keys(self):
        path = self.tmp / 'state' / 'qq-send-keys.json'
        return json.loads(path.read_text(encoding='utf-8')) if path.exists() else {'keys': {}}


class IdentityTests(QqCliCase):
    def test_get_self_envelope(self):
        payload = self.parse(self.run_cli('contact', 'user', 'get-self'))
        self.assertEqual(payload, {'success': True, 'result': {'userId': TEACHER_UIN,
                                                               'nickname': 'Samuel'}})

    def test_wrong_token_exits_nonzero_with_clear_error(self):
        result = self.run_cli('contact', 'user', 'get-self', token='wrong-token')
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('401', result.stderr.decode('utf-8', 'replace'))

    def test_unknown_command_exits_2(self):
        result = self.run_cli('chat', 'category', 'list-by-conv')
        self.assertEqual(result.returncode, 2)

    def test_contact_search_matches_nickname_and_remark_case_insensitively(self):
        self.mock.friends = [
            {'user_id': 1001, 'nickname': 'Sunny', 'remark': '张梦 Emma'},
            {'user_id': 1002, 'nickname': 'Leo', 'remark': ''},
        ]
        payload = self.parse(self.run_cli('contact', 'user', 'search', '--query', 'EMMA'))
        self.assertEqual(payload['result'], [{'name': '张梦 Emma', 'openDingTalkId': '1001'}])
        payload = self.parse(self.run_cli('contact', 'user', 'search', '--query', 'leo'))
        self.assertEqual(payload['result'], [{'name': 'Leo', 'openDingTalkId': '1002'}])
        payload = self.parse(self.run_cli('contact', 'user', 'search', '--query', 'nobody'))
        self.assertEqual(payload['result'], [])


class ListAllTests(QqCliCase):
    def list_all(self, *extra, start='2026-09-18 00:00:00', end='2030-01-01 00:00:00',
                 extra_env=None):
        return self.run_cli('chat', 'message', 'list-all', '--start', start, '--end', end,
                            *extra, extra_env=extra_env)

    def seed_conversation(self):
        self.mock.friends = [{'user_id': 1001, 'nickname': 'Sunny', 'remark': '张梦 Emma'}]
        self.mock.recent = [
            {'user_id': 1001, 'chatType': 1},
            {'user_id': 1002, 'chatType': 1},          # friend with no messages
            {'group_id': 555, 'chatType': 2, 'remark': 'class group'},
        ]
        # Window is [NOW-1000, NOW]; the old message is outside it.
        self.mock.history = {'1001': [
            make_message(11, 101, NOW - 100, segments=[
                {'type': 'text', 'data': {'text': 'homework 作业 '}},
                {'type': 'image', 'data': {'file': 'img-abc.jpg', 'url': 'http://x/img'}}]),
            make_message(10, 100, NOW - 200, text='here is my answer'),
            make_message(9, 99, NOW - 5000, text='old news'),
        ], '1002': []}
        return NOW - 1000, NOW

    def test_non_chat_and_self_entries_are_skipped_without_aborting_the_scan(self):
        # Live NapCat returns a chatType 8 entry with peerUin "0" whose history
        # cannot be read at all; one of those used to fail the whole scan. The
        # account's own chat must be skipped too (it is never a submission).
        self.mock.friends = [{'user_id': 1001, 'nickname': 'Sunny', 'remark': '张梦 Emma'}]
        self.mock.recent = [
            {'peerUin': '0', 'chatType': 8, 'peerName': ''},
            {'peerUin': str(self.mock.login['user_id']), 'chatType': 1, 'peerName': 'Samuel'},
            {'user_id': 1001, 'chatType': 1, 'remark': '张梦 Emma'},
        ]
        # Production config pins selfQqId to the signed-in account; mirror that
        # so the own-chat skip is exercised.
        config = json.loads(self.config.read_text(encoding='utf-8'))
        config['selfQqId'] = str(self.mock.login['user_id'])
        self.config.write_text(json.dumps(config), encoding='utf-8')
        NOW2 = NOW
        self.mock.history = {'1001': [make_message(20, 1001, NOW2 - 50, text='homework 作业')]}
        lo, hi = NOW2 - 1000, NOW2
        start, end = self.start_end_strings(lo, hi)
        result = self.list_all('--limit', '10', '--cursor', '0', start=start, end=end)
        payload = json.loads(result.stdout.decode('utf-8'))
        self.assertTrue(payload['success'], payload)
        conversations = payload['result']['conversationMessagesList']
        self.assertEqual([c['openConversationId'] for c in conversations], ['qqc2c-1001'])
        # NapCat was never asked for the unreadable or self conversations.
        histories = [call for call in self.mock.actions if call == 'get_friend_msg_history']
        self.assertEqual(len(histories), 1)

    def start_end_strings(self, lo, hi):
        import datetime as dt
        tz = dt.timezone(dt.timedelta(hours=8))
        fmt = '%Y-%m-%d %H:%M:%S'
        return (dt.datetime.fromtimestamp(lo, tz).strftime(fmt),
                dt.datetime.fromtimestamp(hi, tz).strftime(fmt))

    def test_list_all_maps_dialect_and_excludes_groups_and_old_messages(self):
        lo, hi = self.seed_conversation()
        start, end = self.start_end_strings(lo, hi)
        result = self.list_all('--limit', '10', '--cursor', '0', start=start, end=end,
                               extra_env={'PYTHONIOENCODING': 'gbk:replace'})
        # Strict UTF-8 decode: the CJK remark must survive a GBK console.
        text = result.stdout.decode('utf-8')
        self.assertIn('张梦', text)
        payload = json.loads(text)
        self.assertTrue(payload['success'])
        result_data = payload['result']
        self.assertFalse(result_data['hasMore'])
        self.assertNotIn('nextCursor', result_data)
        conversations = result_data['conversationMessagesList']
        self.assertEqual(len(conversations), 1)
        conversation = conversations[0]
        self.assertEqual(conversation['openConversationId'], 'qqc2c-1001')
        self.assertTrue(conversation['singleChat'])
        self.assertEqual(conversation['title'], '张梦 Emma')
        messages = conversation['messages']
        self.assertEqual([m['openMessageId'] for m in messages], ['11', '10'])
        first = messages[0]
        self.assertEqual(first['senderOpenDingTalkId'], '1001')
        self.assertIn('homework 作业', first['text'])
        self.assertIn('[图片消息]', first['content'])
        self.assertEqual(first['resources'], [{'resourceType': 'image',
                                               'resourceId': 'img-abc.jpg',
                                               'url': 'http://x/img'}])
        self.assertRegex(first['createTime'], r'^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$')
        self.assertFalse(first['messageAiSendFlag'])

    def test_list_all_pages_history_until_start_boundary(self):
        lo, hi = self.seed_conversation()
        start, end = self.start_end_strings(lo, hi)
        first = self.parse(self.list_all('--limit', '1', '--cursor', '0', start=start, end=end))
        self.assertTrue(first['result']['hasMore'])
        page1_ids = [m['messageId'] for m in first['result']['conversationMessagesList'][0]['messages']]
        second = self.parse(self.list_all('--limit', '1', '--cursor', first['result']['nextCursor'],
                                          start=start, end=end))
        combined = page1_ids + [m['messageId']
                                for c in second['result']['conversationMessagesList']
                                for m in c['messages']]
        # With limit=1: pages cover messages 11, 10; message 9 is before --start
        # and ends the contact's history walk.
        self.assertEqual(combined[:2], ['11', '10'])
        self.assertNotIn('9', combined)
        cursor = second['result'].get('nextCursor')
        while second['result']['hasMore']:
            second = self.parse(self.list_all('--limit', '1', '--cursor', cursor, start=start, end=end))
            cursor = second['result'].get('nextCursor')

    def test_list_all_stale_or_foreign_cursor_fails(self):
        lo, hi = self.seed_conversation()
        start, end = self.start_end_strings(lo, hi)
        first = self.parse(self.list_all('--limit', '1', '--cursor', '0', start=start, end=end))
        self.assertTrue(first['result']['hasMore'])
        # Simulate the contact snapshot disappearing (or being regenerated by
        # another scan) mid-pagination.
        (self.tmp / 'state' / 'qq-contact-cache.json').unlink()
        result = self.list_all('--limit', '1', '--cursor', first['result']['nextCursor'],
                               start=start, end=end)
        self.assertNotEqual(result.returncode, 0)
        payload = json.loads(result.stdout.decode('utf-8'))
        self.assertFalse(payload['success'])
        self.assertIn('snapshot', payload['error'])

    def test_list_all_maps_file_segments_to_resources(self):
        # NapCat get_msg/get_friend_msg_history shape for a real incoming file:
        # data carries file (name), file_id (download handle), file_size.
        self.mock.recent = [{'user_id': 1001, 'chatType': 1, 'remark': '张梦 Emma'}]
        self.mock.history = {'1001': [make_message(20, 200, NOW - 50, segments=[
            {'type': 'file', 'data': {'file': 'mmexport1789737598409.jpg',
                                      'file_id': '9f8269ec_b37f72be',
                                      'file_size': '121361'}}])]}
        lo, hi = NOW - 1000, NOW
        start, end = self.start_end_strings(lo, hi)
        payload = self.parse(self.list_all('--limit', '10', '--cursor', '0',
                                           start=start, end=end))
        conversation = payload['result']['conversationMessagesList'][0]
        message = conversation['messages'][0]
        self.assertEqual(message['text'], '[File: mmexport1789737598409.jpg]')
        self.assertEqual(message['resources'], [{'resourceType': 'file',
                                                 'resourceId': '9f8269ec_b37f72be',
                                                 'fileName': 'mmexport1789737598409.jpg',
                                                 'fileSize': '121361'}])

    def test_list_all_garbage_cursor_fails(self):
        result = self.list_all('--limit', '10', '--cursor', 'not-a-cursor')
        self.assertNotEqual(result.returncode, 0)


class SendTests(QqCliCase):
    def send(self, *extra):
        return self.run_cli('chat', 'message', 'send', '--open-dingtalk-id', '1001', *extra)

    def test_send_returns_task_id_and_idempotency_key_never_resends(self):
        first = self.parse(self.send('--content', 'Hi Emma', '--idempotency-key', 'K1', '--yes'))
        self.assertTrue(first['success'])
        task = first['result']['openTaskId']
        self.assertEqual(len(self.mock.sent), 1)
        self.assertEqual(self.mock.sent[0]['message'],
                         [{'type': 'text', 'data': {'text': 'Hi Emma'}}])
        replay = self.parse(self.send('--content', 'Hi Emma', '--idempotency-key', 'K1', '--yes'))
        self.assertEqual(replay['result']['openTaskId'], task)
        self.assertEqual(len(self.mock.sent), 1)  # no second HTTP send
        other = self.parse(self.send('--content', 'Hi Emma', '--idempotency-key', 'K2', '--yes'))
        self.assertNotEqual(other['result']['openTaskId'], task)
        self.assertEqual(len(self.mock.sent), 2)

    def test_ambiguous_send_exits_nonzero_and_records_no_key(self):
        self.mock.send_mode = 'http500'
        result = self.send('--content', 'Hi Emma', '--idempotency-key', 'K1', '--yes')
        self.assertNotEqual(result.returncode, 0)
        self.assertNotIn('K1', self.send_keys()['keys'])
        # A later retry with a healthy endpoint does send (caller owns that call).
        self.mock.send_mode = 'ok'
        retry = self.parse(self.send('--content', 'Hi Emma', '--idempotency-key', 'K1', '--yes'))
        self.assertTrue(retry['success'])
        self.assertEqual(len(self.mock.sent), 1)

    def test_query_send_status_confirms_known_and_pends_unknown(self):
        sent = self.parse(self.send('--content', 'Hi', '--idempotency-key', 'K1', '--yes'))
        task = sent['result']['openTaskId']
        status = self.parse(self.run_cli('chat', 'message', 'query-send-status',
                                         '--open-task-id', task))
        self.assertEqual(status['result']['openMessageId'], task)
        self.assertEqual(status['result']['openConversationId'], 'qqc2c-1001')
        unknown = self.parse(self.run_cli('chat', 'message', 'query-send-status',
                                          '--open-task-id', '999999'))
        self.assertTrue(unknown['success'])
        self.assertTrue(unknown['result']['pending'])
        self.assertNotIn('openMessageId', unknown['result'])

    def test_file_card_send_uses_local_image_segment_with_same_idempotency(self):
        image = self.tmp / 'question.png'
        image.write_bytes(b'\x89PNG\r\n\x1a\nfixture')
        args = ['--msg-type', 'file', '--dentry-id', str(image), '--space-id', 'local',
                '--file-name', 'question.png', '--file-type', 'png',
                '--file-size', str(image.stat().st_size), '--file-path', str(image),
                '--title', 'Homework 1', '--idempotency-key', 'KC', '--yes']
        first = self.parse(self.send(*args))
        self.assertTrue(first['success'])
        self.assertEqual(len(self.mock.sent), 1)
        segment = self.mock.sent[0]['message'][0]
        self.assertEqual(segment['type'], 'image')
        self.assertTrue(segment['data']['file'].startswith('file:///'))
        self.assertTrue(segment['data']['file'].endswith('question.png'))
        replay = self.parse(self.send(*args))
        self.assertEqual(replay['result']['openTaskId'], first['result']['openTaskId'])
        self.assertEqual(len(self.mock.sent), 1)


class DownloadMediaTests(QqCliCase):
    def test_download_via_url(self):
        payload_bytes = b'\xff\xd8\xff\xd9 image-bytes'
        self.mock.images['img-1'] = {'urlPath': '/files/img-1'}
        self.mock.file_bytes['/files/img-1'] = payload_bytes
        output = self.tmp / 'out' / 'img1.jpg'
        result = self.run_cli('chat', 'message', 'download-media', '--type', 'mediaId',
                              '--resource-id', 'img-1', '--message-id', '11',
                              '--open-conversation-id', 'qqc2c-1001', '--output', str(output))
        self.assertEqual(result.returncode, 0, result.stderr.decode('utf-8', 'replace'))
        self.assertEqual(output.read_bytes(), payload_bytes)

    def test_download_via_local_file_copy(self):
        local = self.tmp / 'napcat-cache' / 'img-2.jpg'
        local.parent.mkdir()
        local.write_bytes(b'local-image-bytes')
        self.mock.images['img-2'] = {'localPath': str(local)}
        output = self.tmp / 'out' / 'img2.jpg'
        result = self.run_cli('chat', 'message', 'download-media', '--type', 'mediaId',
                              '--resource-id', 'img-2', '--message-id', '12',
                              '--open-conversation-id', 'qqc2c-1001', '--output', str(output))
        self.assertEqual(result.returncode, 0, result.stderr.decode('utf-8', 'replace'))
        self.assertEqual(output.read_bytes(), b'local-image-bytes')

    def test_unknown_resource_fails(self):
        output = self.tmp / 'out' / 'img3.jpg'
        result = self.run_cli('chat', 'message', 'download-media', '--type', 'mediaId',
                              '--resource-id', 'nope', '--message-id', '13',
                              '--open-conversation-id', 'qqc2c-1001', '--output', str(output))
        self.assertNotEqual(result.returncode, 0)
        self.assertFalse(output.exists())

    def download_file(self, file_id, output, *extra):
        return self.run_cli('chat', 'message', 'download-media', '--type', 'fileId',
                            '--resource-id', file_id, '--message-id', '20',
                            '--open-conversation-id', 'qqc2c-1001',
                            '--output', str(output), *extra)

    def test_download_file_via_local_copy(self):
        local = self.tmp / 'napcat-cache' / 'mmexport.jpg'
        local.parent.mkdir(exist_ok=True)
        local.write_bytes(b'file-segment-bytes')
        self.mock.files['fid-local'] = {'localPath': str(local)}
        output = self.tmp / 'out' / 'file1.jpg'
        result = self.download_file('fid-local', output, '--resource-type', 'file')
        self.assertEqual(result.returncode, 0, result.stderr.decode('utf-8', 'replace'))
        self.assertEqual(output.read_bytes(), b'file-segment-bytes')
        self.assertIn('get_file', self.mock.actions)
        self.assertNotIn('get_image', self.mock.actions)

    def test_download_file_via_url(self):
        payload_bytes = b'\xff\xd8 file-url-bytes'
        self.mock.files['fid-url'] = {'urlPath': '/files/fid-url'}
        self.mock.file_bytes['/files/fid-url'] = payload_bytes
        output = self.tmp / 'out' / 'file2.jpg'
        result = self.download_file('fid-url', output, '--resource-type', 'file')
        self.assertEqual(result.returncode, 0, result.stderr.decode('utf-8', 'replace'))
        self.assertEqual(output.read_bytes(), payload_bytes)

    def test_file_resource_without_type_hint_falls_back_to_get_file(self):
        # --type fileId already selects get_file; with no hint at all the image
        # lookup fails first and the file lookup still saves the evidence.
        local = self.tmp / 'napcat-cache' / 'mmexport2.jpg'
        local.parent.mkdir(exist_ok=True)
        local.write_bytes(b'fallback-bytes')
        self.mock.files['fid-fallback'] = {'localPath': str(local)}
        output = self.tmp / 'out' / 'file3.jpg'
        result = self.run_cli('chat', 'message', 'download-media', '--type', 'mediaId',
                              '--resource-id', 'fid-fallback', '--message-id', '21',
                              '--open-conversation-id', 'qqc2c-1001', '--output', str(output))
        self.assertEqual(result.returncode, 0, result.stderr.decode('utf-8', 'replace'))
        self.assertEqual(output.read_bytes(), b'fallback-bytes')
        self.assertEqual(self.mock.actions, ['get_image', 'get_file'])


class DrivePassthroughTests(QqCliCase):
    def test_upload_and_info_are_local_passthrough(self):
        image = self.tmp / 'question.png'
        image.write_bytes(b'png')
        upload = self.parse(self.run_cli('drive', 'upload', '--file', str(image),
                                         '--file-name', 'question.png'))
        self.assertEqual(upload['result']['spaceId'], 'local')
        self.assertEqual(upload['result']['fileId'], str(image.resolve()))
        info = self.parse(self.run_cli('drive', 'info', '--file-id', upload['result']['fileId']))
        self.assertEqual(info['result']['dentryId'], str(image.resolve()))
        self.assertEqual(info['result']['path'], str(image.resolve()))
        self.assertEqual(info['result']['spaceId'], 'local')


if __name__ == '__main__':
    unittest.main()
