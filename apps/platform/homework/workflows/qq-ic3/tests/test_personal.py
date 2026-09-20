"""Scenario group 10: S3.6 personal-request attention report (read-only)."""
import json
import subprocess
import sys
import unittest

from fixtures import (build_workspace, load_state, run_script, save_state,
                      wire_message)


def seed_archive(fixture, conversations):
    save_state(fixture, 'personal-replies.json', {
        'conversations': conversations, 'reviews': {},
        'managedConversations': [], 'nativeEnabled': False,
        'checkedThrough': '2026-09-18 09:00:00'})


def emma_conversation(messages):
    return {'title': '张梦 Emma', 'messages': {m['openMessageId']: m for m in messages}}


class PersonalRequestTests(unittest.TestCase):
    def test_new_open_item_then_stable_then_closed_by_personal_reply(self):
        fixture = build_workspace(self)
        question = wire_message('q1', 'QQ_EMMA', '2026-09-18 08:30:00',
                                content='Mr Oehler, could you check question 3 for me?')
        seed_archive(fixture, {'conv-emma': emma_conversation([question]),
                               'conv-other': {'title': 'Someone else', 'messages': {
                                   'x1': wire_message('x1', 'QQ_STRANGER', '2026-09-18 08:31:00',
                                                      content='hello there')}}})

        first = run_script(fixture, 'personal_requests.py', 'report')
        self.assertEqual(first.returncode, 0, first.stderr)
        report = json.loads(first.stdout)
        self.assertEqual(len(report['new']), 1)
        self.assertEqual(report['changed'], [])
        self.assertEqual(report['openCount'], 1)
        item = report['new'][0]
        self.assertEqual(item['conversationId'], 'conv-emma')
        self.assertEqual(item['messageId'], 'q1')
        self.assertEqual(item['title'], '张梦 Emma')
        self.assertIn('question 3', item['excerpt'])
        self.assertEqual(item['status'], 'open')
        self.assertEqual(item['firstSeenAt'], item['lastSeenAt'])

        second = run_script(fixture, 'personal_requests.py', 'report')
        report = json.loads(second.stdout)
        self.assertEqual(report['new'], [])
        self.assertEqual(report['changed'], [])
        self.assertEqual(report['openCount'], 1)

        # A later personal (non-automated, non-AI) reply from self closes it.
        reply = wire_message('r1', 'SELF', '2026-09-18 08:45:00', content='Sure, here you go.')
        seed_archive(fixture, {'conv-emma': emma_conversation([question, reply])})
        third = run_script(fixture, 'personal_requests.py', 'report')
        report = json.loads(third.stdout)
        self.assertEqual(report['openCount'], 0)
        stored = load_state(fixture, 'personal-attention.json')['items']
        self.assertEqual(len(stored), 1)
        self.assertEqual(next(iter(stored.values()))['status'], 'closed')

    def test_automated_and_ai_replies_do_not_close_items(self):
        fixture = build_workspace(self)
        question = wire_message('q1', 'QQ_EMMA', '2026-09-18 08:30:00', content='help please')
        automated = wire_message('a1', 'SELF', '2026-09-18 08:40:00',
                                 content="Hi Emma, thanks for sending your assignment. I've marked it as submitted.")
        ai_reply = wire_message('a2', 'SELF', '2026-09-18 08:41:00', content='ai reply',
                                ai_flag=True)
        seed_archive(fixture, {'conv-emma': emma_conversation([question, automated, ai_reply])})
        # The automated receipt is excluded via the recorded openMessageId.
        save_state(fixture, 'receipts.json', {'enabledAt': '2026-09-17T00:00:00+08:00',
                                              'receipts': {'k': {'status': 'sent', 'openMessageId': 'a1'}}})
        report = json.loads(run_script(fixture, 'personal_requests.py', 'report').stdout)
        self.assertEqual(report['openCount'], 1)
        stored = load_state(fixture, 'personal-attention.json')['items']
        self.assertEqual(next(iter(stored.values()))['status'], 'open')

    def test_new_student_message_is_a_material_change_reported_once(self):
        fixture = build_workspace(self)
        first_message = wire_message('q1', 'QQ_EMMA', '2026-09-18 08:30:00', content='first question')
        seed_archive(fixture, {'conv-emma': emma_conversation([first_message])})
        report = json.loads(run_script(fixture, 'personal_requests.py', 'report').stdout)
        self.assertEqual(len(report['new']), 1)

        follow_up = wire_message('q2', 'QQ_EMMA', '2026-09-18 08:50:00', content='and another thing')
        seed_archive(fixture, {'conv-emma': emma_conversation([first_message, follow_up])})
        report = json.loads(run_script(fixture, 'personal_requests.py', 'report').stdout)
        self.assertEqual(report['new'], [])
        self.assertEqual(len(report['changed']), 1)
        self.assertEqual(report['changed'][0]['messageId'], 'q2')
        self.assertEqual(report['openCount'], 1)
        # The superseded item kept its original firstSeenAt.
        stored = load_state(fixture, 'personal-attention.json')['items']
        self.assertEqual(len(stored), 1)
        report = json.loads(run_script(fixture, 'personal_requests.py', 'report').stdout)
        self.assertEqual(report['new'], [])
        self.assertEqual(report['changed'], [])
        self.assertEqual(report['openCount'], 1)

    def test_report_prints_emoji_and_cjk_under_gbk_console(self):
        # Production crash vector: ensure_ascii=False output on a GBK console
        # raised UnicodeEncodeError after the state file was already saved.
        fixture = build_workspace(self)
        question = wire_message('q1', 'QQ_EMMA', '2026-09-18 08:30:00',
                                content='老师，这样对吗 👌')
        seed_archive(fixture, {'conv-emma': emma_conversation([question])})
        env = dict(fixture.env, PYTHONIOENCODING='gbk:replace')
        result = subprocess.run([sys.executable, str(fixture.ws / 'personal_requests.py'), 'report'],
                                capture_output=True, env=env, cwd=fixture.ws, timeout=120)
        self.assertEqual(result.returncode, 0, result.stderr)
        text = result.stdout.decode('utf-8')  # strict: the fetch.py pin must win
        self.assertIn('👌', text)
        self.assertIn('老师', text)
        self.assertEqual(json.loads(text)['openCount'], 1)


if __name__ == '__main__':
    unittest.main()
