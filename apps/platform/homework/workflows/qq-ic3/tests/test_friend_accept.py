"""Friend-request auto-accept: the listener, its OneBot call, and its audit log.

The listener runs as a subprocess against a fixture config (temp state, fixture
SQLite, mock OneBot endpoint). The real listener port, the real database and the
real state/ tree are never touched.
"""
import json
import os
import socket
import subprocess
import sys
import threading
import time
import unittest
import urllib.error
import urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

from fixtures import EMMA, LEO, WENDY, build_workspace, load_state, shutil, REAL_DIR

TOKEN = 'webhook-token'


def free_port():
    with socket.socket() as probe:
        probe.bind(('127.0.0.1', 0))
        return probe.getsockname()[1]


class MockOneBot:
    def __init__(self, mode='ok'):
        self.mode = mode
        self.approvals = []
        self.actions = []
        holder = self

        class Handler(BaseHTTPRequestHandler):
            def do_POST(self):
                length = int(self.headers.get('Content-Length') or 0)
                body = json.loads(self.rfile.read(length) or b'{}')
                holder.actions.append(self.path.strip('/').split('?')[0])
                if self.path.split('?')[0] == '/set_friend_add_request':
                    if holder.mode == 'fail':
                        payload = {'status': 'failed', 'retcode': 100, 'message': 'nope'}
                    else:
                        holder.approvals.append(body)
                        payload = {'status': 'ok', 'retcode': 0, 'data': {}}
                    self._reply(payload)
                    return
                self._reply({'status': 'ok', 'retcode': 0, 'data': {}})

            def _reply(self, payload):
                raw = json.dumps(payload).encode('utf-8')
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Content-Length', str(len(raw)))
                self.end_headers()
                self.wfile.write(raw)

            def log_message(self, *args):
                pass

        self.server = ThreadingHTTPServer(('127.0.0.1', 0), Handler)
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()

    @property
    def url(self):
        return f'http://127.0.0.1:{self.server.server_address[1]}'

    def stop(self):
        self.server.shutdown()
        self.server.server_close()


def post(url, payload, token=TOKEN):
    request = urllib.request.Request(url, data=json.dumps(payload).encode('utf-8'),
                                     headers={'Content-Type': 'application/json',
                                              'Authorization': f'Bearer {token}'})
    try:
        with urllib.request.urlopen(request, timeout=15) as response:
            return response.status, json.loads(response.read() or b'{}')
    except urllib.error.HTTPError as error:
        return error.code, json.loads(error.read() or b'{}')


class FriendAcceptTests(unittest.TestCase):
    def start(self, onebot_mode='ok'):
        fixture = build_workspace(self, {})
        config_path = fixture.ws / 'config.json'
        config = json.loads(config_path.read_text(encoding='utf-8'))
        onebot = MockOneBot(onebot_mode)
        self.addCleanup(onebot.stop)
        port = free_port()
        config.update({'webhookToken': TOKEN, 'friendAcceptPort': port, 'onebotHttp': onebot.url,
                       'onebotToken': 'onebot-token'})
        config_path.write_text(json.dumps(config, indent=2), encoding='utf-8')
        shutil.copy(REAL_DIR / 'friend_accept_server.py', fixture.ws / 'friend_accept_server.py')
        env = dict(os.environ, QQ_CONFIG_PATH=str(config_path), QQ_FRIEND_ACCEPT_PORT=str(port))
        process = subprocess.Popen([sys.executable, str(fixture.ws / 'friend_accept_server.py')],
                                   cwd=fixture.ws, env=env, stdout=subprocess.PIPE,
                                   stderr=subprocess.STDOUT, text=True, encoding='utf-8')
        self.addCleanup(self.stop_process, process)
        url = f'http://127.0.0.1:{port}/'
        for _ in range(100):
            try:
                with urllib.request.urlopen(url + 'health', timeout=2):
                    break
            except (urllib.error.URLError, OSError):
                time.sleep(0.1)
        else:
            self.fail('listener did not start')
        return fixture, onebot, url

    def stop_process(self, process):
        if process.poll() is None:
            process.terminate()
            try:
                process.wait(timeout=10)
            except subprocess.TimeoutExpired:
                process.kill()

    def request_event(self, user_id, flag='flag-1'):
        return {'post_type': 'request', 'request_type': 'friend', 'user_id': user_id,
                'comment': 'I am a student', 'flag': flag, 'time': 1800000000}

    def test_linked_student_is_approved_with_remark(self):
        fixture, onebot, url = self.start()
        status, _ = post(url, self.request_event(EMMA['qqId']))
        self.assertEqual(status, 200)
        self.assertEqual(len(onebot.approvals), 1, onebot.actions)
        approval = onebot.approvals[0]
        self.assertEqual(approval['flag'], 'flag-1')
        self.assertTrue(approval['approve'])
        self.assertEqual(approval['remark'], 'Emma IC3.1')
        audit = load_state(fixture, 'friend-requests.json')
        entry = audit['requests']['flag-1']
        self.assertEqual(entry['decision'], 'accepted')
        self.assertEqual(entry['matchedStudent']['accountId'], EMMA['accountId'])

    def test_unlinked_and_out_of_scope_senders_are_ignored(self):
        fixture, onebot, url = self.start()
        post(url, self.request_event('999999999', flag='flag-unknown'))
        post(url, self.request_event(WENDY['qqId'], flag='flag-scope'))   # S3.6, outside config classes
        self.assertEqual(onebot.approvals, [])
        audit = load_state(fixture, 'friend-requests.json')
        self.assertEqual(audit['requests']['flag-unknown']['decision'], 'ignored')
        self.assertEqual(audit['requests']['flag-scope']['decision'], 'ignored')

    def test_repeat_delivery_does_not_call_onebot_twice(self):
        fixture, onebot, url = self.start()
        post(url, self.request_event(EMMA['qqId'], flag='flag-dup'))
        post(url, self.request_event(EMMA['qqId'], flag='flag-dup'))
        self.assertEqual(len(onebot.approvals), 1)

    def test_bad_token_is_rejected(self):
        fixture, onebot, url = self.start()
        status, _ = post(url, self.request_event(EMMA['qqId']), token='wrong')
        self.assertEqual(status, 401)
        self.assertEqual(onebot.actions, [])

    def test_approve_failure_is_logged_without_crashing(self):
        fixture, onebot, url = self.start(onebot_mode='fail')
        status, _ = post(url, self.request_event(EMMA['qqId'], flag='flag-fail'))
        self.assertEqual(status, 200)
        audit = load_state(fixture, 'friend-requests.json')
        self.assertEqual(audit['requests']['flag-fail']['decision'], 'approve_failed')
        self.assertIn('nope', audit['requests']['flag-fail']['error'])
        # The listener survives and keeps serving.
        with urllib.request.urlopen(url + 'health', timeout=5) as response:
            self.assertTrue(json.loads(response.read())['ok'])


    def test_loopback_post_without_authorization_is_accepted(self):
        # NapCat 4.18 pushes without an Authorization header even when the client
        # config carries a token (verified live 19 Sep 2026); loopback binding is
        # the control that matters, so an unauthenticated loopback push must work.
        fixture, onebot, url = self.start()
        request = urllib.request.Request(url, data=json.dumps(self.request_event(EMMA['qqId'], flag='flag-noauth')).encode('utf-8'),
                                         headers={'Content-Type': 'application/json'})
        with urllib.request.urlopen(request, timeout=15) as response:
            self.assertEqual(response.status, 200)
        self.assertEqual(len(onebot.approvals), 1)
        audit = load_state(fixture, 'friend-requests.json')
        self.assertEqual(audit['requests']['flag-noauth']['decision'], 'accepted')

    def test_wrong_token_is_still_rejected(self):
        fixture, onebot, url = self.start()
        status, _ = post(url, self.request_event(EMMA['qqId'], flag='flag-wrong'), token='not-the-token')
        self.assertEqual(status, 401)
        self.assertEqual(onebot.approvals, [])

    def test_message_events_are_ignored_without_audit_noise(self):
        fixture, onebot, url = self.start()
        status, _ = post(url, {"post_type": "message", "message_type": "private", "user_id": EMMA["qqId"]})
        self.assertEqual(status, 200)
        self.assertEqual(onebot.actions, [])
        self.assertFalse((fixture.state / 'friend-requests.json').exists())


if __name__ == '__main__':
    unittest.main()