"""Scenario group 8: working-photo follow-up timing and suppression."""
import datetime as dt
import json
import unittest

from fixtures import (EMMA, HEADER, TZ, build_workspace, conversation,
                      empty_pages, load_state, now_local, read_log, run_script,
                      save_state, wire_message)


def seed_awaiting_working(fixture, received_at, teacher_accepted=False):
    from fixtures import insert_homework
    insert_homework(fixture.db, EMMA, 'awaiting_working',
                    teacher_accepted=1 if teacher_accepted else 0)
    entry = {'action': 'needs_work', 'studentKey': EMMA['key'], 'assignment': HEADER,
             'senderId': EMMA['dingtalkId'], 'responseFormat': 'letter_only',
             'workingPhotoPresent': False, 'contextReviewed': True,
             'workingCheckEvidence': 'answer photo without working',
             'receivedAt': received_at}
    if teacher_accepted:
        entry['teacherAccepted'] = True
    save_state(fixture, 'ledger.json', {'processed': {'m1': entry}})


def run_working(fixture):
    return run_script(fixture, 'working_followups.py')


class WorkingTimingTests(unittest.TestCase):
    def test_one_minute_old_letter_only_is_deferred(self):
        fixture = build_workspace(self, {'pages': empty_pages()})
        received = now_local(dt.timedelta(minutes=-1))
        seed_awaiting_working(fixture, received)
        result = run_working(fixture)
        self.assertEqual(result.returncode, 0, result.stderr)
        report = json.loads(result.stdout)
        self.assertEqual(report['deferred'], 1)
        self.assertEqual(report['sent'], 0)
        self.assertEqual(read_log(fixture, 'sends.log'), [])
        # eligibleAfter is persisted as a timezone-aware +08:00 instant.
        followups = load_state(fixture, 'working-followups.json')['followups']
        self.assertEqual(len(followups), 1)
        eligible_after = next(iter(followups.values()))['eligibleAfter']
        self.assertTrue(eligible_after.endswith('+08:00'), eligible_after)
        expected = (dt.datetime.strptime(received, '%Y-%m-%d %H:%M:%S').replace(tzinfo=TZ)
                    + dt.timedelta(minutes=2))
        self.assertEqual(dt.datetime.fromisoformat(eligible_after), expected)

    def test_stored_timer_is_never_restarted_by_later_runs(self):
        fixture = build_workspace(self, {'pages': empty_pages()})
        received = now_local(dt.timedelta(minutes=-1))
        seed_awaiting_working(fixture, received)
        self.assertEqual(json.loads(run_working(fixture).stdout)['deferred'], 1)
        first = next(iter(load_state(fixture, 'working-followups.json')['followups'].values()))['eligibleAfter']
        # A second run right away keeps the same timer.
        self.assertEqual(json.loads(run_working(fixture).stdout)['deferred'], 1)
        second = next(iter(load_state(fixture, 'working-followups.json')['followups'].values()))['eligibleAfter']
        self.assertEqual(first, second)
        # Even if the ledger copy of receivedAt is edited to look older, the
        # stored timer still governs (not yet reached), so nothing sends.
        seed_awaiting_working(fixture, now_local(dt.timedelta(minutes=-3)))
        self.assertEqual(json.loads(run_working(fixture).stdout)['deferred'], 1)
        third = next(iter(load_state(fixture, 'working-followups.json')['followups'].values()))['eligibleAfter']
        self.assertEqual(first, third)
        self.assertEqual(read_log(fixture, 'sends.log'), [])

    def test_eligible_record_sends_once_context_is_ready(self):
        fixture = build_workspace(self, {'pages': empty_pages()})
        seed_awaiting_working(fixture, now_local(dt.timedelta(minutes=-3)))
        result = run_working(fixture)
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(json.loads(result.stdout)['sent'], 1)
        sends = read_log(fixture, 'sends.log')
        self.assertEqual(len(sends), 1)
        self.assertEqual(sends[0]['content'],
                         'Hi Emma, I received your answer for Homework 1 — Inflationary gap (Q19). Please send a clear photo showing your working so I can record a complete submission.')
        followups = load_state(fixture, 'working-followups.json')['followups']
        self.assertEqual(next(iter(followups.values()))['status'], 'sent')
        # Idempotent on the next run.
        self.assertEqual(json.loads(run_working(fixture).stdout)['sent'], 0)
        self.assertEqual(len(read_log(fixture, 'sends.log')), 1)

    def test_working_arriving_between_fetch_and_send_suppresses(self):
        new_message = wire_message('m-working', 'DING_EMMA', now_local(),
                                   content='here is my working 图片消息 fileId:abc')
        fixture = build_workspace(self, {'pages': [
            {'cursor': '0', 'hasMore': False,
             'conversations': [conversation('conv-emma', [new_message])]}]})
        seed_awaiting_working(fixture, now_local(dt.timedelta(minutes=-5)))
        result = run_working(fixture)
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(json.loads(result.stdout)['deferred'], 1)
        self.assertEqual(read_log(fixture, 'sends.log'), [])

    def test_teacher_accepted_is_never_eligible(self):
        fixture = build_workspace(self, {'pages': empty_pages()})
        seed_awaiting_working(fixture, now_local(dt.timedelta(minutes=-5)), teacher_accepted=True)
        result = run_working(fixture)
        self.assertEqual(result.returncode, 0, result.stderr)
        report = json.loads(result.stdout)
        self.assertEqual(report['sent'], 0)
        self.assertEqual(report['deferred'], 0)
        state_path = fixture.state / 'working-followups.json'
        if state_path.exists():
            self.assertEqual(load_state(fixture, 'working-followups.json')['followups'], {})
        self.assertEqual(read_log(fixture, 'sends.log'), [])


if __name__ == '__main__':
    unittest.main()
