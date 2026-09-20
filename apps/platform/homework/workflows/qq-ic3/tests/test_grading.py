"""Marked-essay grading: score/feedback validation, commit, and feedback delivery."""
import json
import sqlite3
import unittest
from unittest.mock import patch

from fixtures import (EMMA, HEADER, LEO, build_workspace, empty_pages, fresh_import,
                      homework_row, insert_homework, load_state, message, read_log,
                      run_script, save_state, write_decisions, write_pending)


def insert_submission(fixture, student=EMMA):
    """An already-recorded QQ submission with no score yet."""
    insert_homework(fixture.db, student, 'submitted', row_id='hw-recorded')


def seed_graded(fixture, student=EMMA, mid='m1', score=5, score_max=8,
                feedback='Develop the second side of the argument.',
                status='submitted', attachment=True):
    connection = sqlite3.connect(fixture.db)
    connection.execute(
        'INSERT OR IGNORE INTO homework_submissions (id,class_id,student_account_id,assignment_title,'
        'assigned_on,status,score,score_max,feedback,graded_at,recorded_at,updated_at) '
        "VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
        ('hw-graded', 'class-ic31', student['accountId'], 'Inflationary gap (Q19)', '2026-09-15', status,
         score, score_max, feedback, '2026-09-19T00:00:00+00:00', '2026-09-19T00:00:00+00:00', '2026-09-19T00:00:00+00:00'))
    connection.commit()
    connection.close()
    save_state(fixture, 'ledger.json', {'processed': {mid: {
        'action': 'submitted', 'studentKey': student['key'], 'assignment': HEADER,
        'senderId': student['qqId'], 'responseFormat': 'worked', 'workingPhotoPresent': True,
        'score': score, 'scoreMax': score_max, 'feedback': feedback}}})
    save_state(fixture, 'feedback.json', {'enabledAt': '2026-09-19T00:00:00+08:00', 'deliveries': {}})
    if not attachment:
        (fixture.ws / 'attachments' / 'model-answer.png').unlink()


def incoming(message_id='m1', student=EMMA, mid='m1'):
    return message(message_id, student['qqId'], candidates=[{'key': student['key']}],
                   conversation_id='conv-' + student['accountId'], title=student['key'])


class GradingValidationTests(unittest.TestCase):
    def prepare(self, fixture, decision, **extra):
        write_pending(fixture, [incoming()])
        write_decisions(fixture, [decision], batch_id='batch-1')
        return run_script(fixture, 'update.py', 'prepare')

    def base_decision(self, **overrides):
        decision = {'messageId': 'm1', 'action': 'submitted', 'studentKey': EMMA['key'],
                    'assignment': HEADER, 'evidence': 'photo of worked answer',
                    'responseFormat': 'worked', 'workingPhotoPresent': True, 'contextReviewed': True}
        decision.update(overrides)
        return decision

    def test_commit_records_score_and_feedback(self):
        fixture = build_workspace(self, {'pages': empty_pages()})
        result = self.prepare(fixture, self.base_decision(score=6,
                                                          feedback='Explain the mechanism behind the subsidy.'))
        self.assertEqual(result.returncode, 0, result.stderr + result.stdout)
        plan = load_state(fixture, 'plan.json')
        write = plan['homeworkWrites'][0]
        self.assertEqual((write['score'], write['scoreMax'], write['gradedAt'] is not None), (6, 8, True))
        commit = run_script(fixture, 'update.py', 'commit')
        self.assertEqual(commit.returncode, 0, commit.stderr + commit.stdout)
        verification = json.loads(commit.stdout)
        self.assertTrue(verification['commitVerified'])
        self.assertEqual(verification['homeworkVerified'], 1)
        row = homework_row(fixture.db)
        self.assertEqual(row['score'], 6)
        self.assertEqual(row['score_max'], 8)
        self.assertEqual(row['feedback'], 'Explain the mechanism behind the subsidy.')
        self.assertTrue(row['graded_at'])

    def test_commit_readback_detects_corrupted_grade_and_does_not_advance_ledger(self):
        fixture = build_workspace(self, {'pages': empty_pages()})
        result = self.prepare(fixture, self.base_decision(score=6, feedback='Explain the mechanism.'))
        self.assertEqual(result.returncode, 0, result.stderr)
        with sqlite3.connect(fixture.db) as db:
            db.execute('''CREATE TRIGGER corrupt_saved_grade AFTER INSERT ON homework_submissions
                BEGIN UPDATE homework_submissions SET score=1 WHERE id=NEW.id; END''')
        commit = run_script(fixture, 'update.py', 'commit')
        self.assertNotEqual(commit.returncode, 0)
        self.assertIn('Post-commit grade verification failed', commit.stderr)
        self.assertFalse((fixture.state / 'ledger.json').exists())
        self.assertEqual(read_log(fixture, 'sends.log'), [])

    def test_score_requires_feedback_within_range_and_submitted_status(self):
        cases = [
            ({'score': 6}, 'needs one sentence of feedback'),
            ({'score': 9, 'feedback': 'Too high.'}, 'between 0 and 8'),
            ({'score': -1, 'feedback': 'Too low.'}, 'between 0 and 8'),
            ({'score': 6.5, 'feedback': 'Fractional.'}, 'whole number'),
            ({'score': 6, 'feedback': 'Add evaluation. Then conclude.'}, 'one sentence'),
            ({'score': 6, 'feedback': '补充评估。'}, 'English-only'),
            ({'feedback': 'Feedback without a score.'}, 'without a score'),
        ]
        for overrides, expected in cases:
            fixture = build_workspace(self, {'pages': empty_pages()})
            result = self.prepare(fixture, self.base_decision(**overrides))
            self.assertNotEqual(result.returncode, 0, f"accepted {overrides}")
            self.assertIn(expected, result.stderr + result.stdout)

    def test_ignore_decisions_cannot_be_graded(self):
        fixture = build_workspace(self, {'pages': empty_pages()})
        decision = {'messageId': 'm1', 'action': 'ignore', 'studentKey': EMMA['key'],
                    'evidence': 'not homework', 'score': 4, 'feedback': 'Not applicable.'}
        result = self.prepare(fixture, decision)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('Only submitted work can be graded', result.stderr + result.stdout)


class FeedbackDeliveryTests(unittest.TestCase):
    def test_saved_denominator_and_feedback_override_stale_ledger_copies(self):
        fixture = build_workspace(self, {'pages': empty_pages()})
        seed_graded(fixture)
        ledger = load_state(fixture, 'ledger.json')
        ledger['processed']['m1'].update(scoreMax=100, feedback='Stale remark.')
        save_state(fixture, 'ledger.json', ledger)
        result = run_script(fixture, 'feedback.py', '--send')
        self.assertEqual(result.returncode, 0, result.stderr)
        text = read_log(fixture, 'sends.log')[0]['content']
        self.assertIn('5/8', text)
        self.assertIn('Develop the second side', text)
        self.assertNotIn('Stale', text)

    def test_confirmed_text_is_not_resent_or_requeried_while_image_is_pending(self):
        fixture = build_workspace(self, {'pages': empty_pages()})
        seed_graded(fixture)
        module = fresh_import(fixture, 'feedback')
        item = load_state(fixture, 'ledger.json')['processed']['m1']
        key = module.feedback_key(item)
        save_state(fixture, 'feedback.json', {'deliveries': {key: {
            'status': 'text-sent', 'textConfirmedAt': '2026-09-19T00:00:00+08:00',
            'image': {'status': 'awaiting-confirmation', 'openTaskId': 'image-task'}}}})
        calls = []
        def cli(args):
            calls.append(args)
            self.assertEqual(args[:3], ['chat', 'message', 'query-send-status'])
            self.assertEqual(args[-1], 'image-task')
            return {'openMessageId': 'confirmed', 'openConversationId': 'chat'}
        with patch.object(module, 'cli', cli):
            self.assertEqual(module.run(send=True)['sent'], 1)
        self.assertEqual(len(calls), 1)

    def test_text_send_intent_is_durable_and_uncertain_send_is_not_retried(self):
        fixture = build_workspace(self, {'pages': empty_pages()})
        seed_graded(fixture)
        module = fresh_import(fixture, 'feedback')
        def cli(args):
            saved = next(iter(load_state(fixture, 'feedback.json')['deliveries'].values()))
            self.assertEqual(saved['status'], 'sending')
            self.assertTrue(saved['idempotencyKey'])
            self.assertIn('5/8', saved['text'])
            raise RuntimeError('fixture ambiguous send')
        with patch.object(module, 'cli', cli) as api:
            self.assertEqual(len(module.run(send=True)['needsAttention']), 1)
        with patch.object(module, 'cli') as api:
            self.assertEqual(len(module.run(send=True)['needsAttention']), 1)
            api.assert_not_called()

    def test_sends_score_remark_and_model_answer_once(self):
        fixture = build_workspace(self, {'pages': empty_pages(),
                                         'send': {'openTaskId': 'task-1'},
                                         'querySendStatus': {'mode': 'confirmed'}})
        seed_graded(fixture)
        result = run_script(fixture, 'feedback.py', '--send')
        self.assertEqual(result.returncode, 0, result.stderr + result.stdout)
        report = json.loads(result.stdout)
        self.assertEqual(report['sent'], 1)
        sends = read_log(fixture, 'sends.log')
        self.assertEqual(len(sends), 2, sends)
        self.assertEqual(sends[0]['content'], 'Hi Emma, Homework 1 — Inflationary gap (Q19): 5/8. Next step: Develop the second side of the argument. The model answer follows.')
        self.assertEqual(sends[0]['openDingTalkId'], EMMA['qqId'])
        self.assertEqual(sends[1]['msgType'], 'file')
        self.assertTrue(sends[1]['filePath'].endswith('model-answer.png'), sends[1])
        state = load_state(fixture, 'feedback.json')
        self.assertEqual(list(state['deliveries'].values())[0]['status'], 'sent')
        again = run_script(fixture, 'feedback.py', '--send')
        self.assertEqual(json.loads(again.stdout)['sent'], 0)
        self.assertEqual(len(read_log(fixture, 'sends.log')), 2)

    def test_requires_matching_saved_score(self):
        fixture = build_workspace(self, {'pages': empty_pages(),
                                         'send': {'openTaskId': 'task-1'},
                                         'querySendStatus': {'mode': 'confirmed'}})
        seed_graded(fixture, score=3)
        ledger = load_state(fixture, 'ledger.json')
        ledger['processed']['m1']['score'] = 7
        save_state(fixture, 'ledger.json', ledger)
        result = run_script(fixture, 'feedback.py', '--send')
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('does not match the graded decision', result.stderr + result.stdout)

    def test_missing_attachment_is_refused(self):
        fixture = build_workspace(self, {'pages': empty_pages(),
                                         'send': {'openTaskId': 'task-1'},
                                         'querySendStatus': {'mode': 'confirmed'}})
        seed_graded(fixture, attachment=False)
        result = run_script(fixture, 'feedback.py', '--send')
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('attachment is missing', result.stderr + result.stdout)
        self.assertEqual(len(read_log(fixture, 'sends.log')), 0)

    def test_out_of_scope_student_is_refused(self):
        fixture = build_workspace(self, {'pages': empty_pages(),
                                         'send': {'openTaskId': 'task-1'},
                                         'querySendStatus': {'mode': 'confirmed'}})
        seed_graded(fixture, student=LEO)
        connection = sqlite3.connect(fixture.db)
        connection.execute("UPDATE classes SET name='S3.6' WHERE id='class-ic31'")
        connection.commit()
        connection.close()
        result = run_script(fixture, 'feedback.py', '--send')
        self.assertNotEqual(result.returncode, 0)
        # A student outside the configured classes is never reachable: the roster
        # lookup fails closed before any send is attempted.
        self.assertIn('lacks a unique student', result.stderr + result.stdout)
        self.assertEqual(len(read_log(fixture, 'sends.log')), 0)

    def test_initialize_marks_existing_grades_as_pre_existing(self):
        fixture = build_workspace(self, {'pages': empty_pages()})
        seed_graded(fixture)
        (fixture.state / 'feedback.json').unlink()
        result = run_script(fixture, 'feedback.py', '--initialize')
        self.assertEqual(result.returncode, 0, result.stderr + result.stdout)
        self.assertEqual(json.loads(result.stdout)['preExistingGraded'], 1)
        state = load_state(fixture, 'feedback.json')
        self.assertEqual(list(state['deliveries'].values())[0]['status'], 'pre-existing')


class RetroactiveGradingTests(unittest.TestCase):
    def test_teacher_authorized_grade_updates_a_recorded_submission(self):
        fixture = build_workspace(self, {'pages': empty_pages()})
        insert_submission(fixture)
        write_pending(fixture, [])
        write_decisions(fixture, [{
            'messageId': 'm1', 'action': 'submitted', 'studentKey': EMMA['key'], 'assignment': HEADER,
            'score': 6, 'feedback': 'Explain the mechanism behind the weaker side.',
            'teacherException': True, 'authorizedBy': 'Samuel',
            'evidence': 'Retroactive grade of the saved essay.'}], batch_id='batch-1')
        prepared = run_script(fixture, 'update.py', 'prepare')
        self.assertEqual(prepared.returncode, 0, prepared.stderr + prepared.stdout)
        write = load_state(fixture, 'plan.json')['homeworkWrites'][0]
        # A teacher-authorized grade keeps the status the submission earned.
        self.assertEqual((write['status'], write['oldStatus'], write['score']), ('submitted', 'submitted', 6))
        committed = run_script(fixture, 'update.py', 'commit')
        self.assertEqual(committed.returncode, 0, committed.stderr + committed.stdout)
        row = homework_row(fixture.db)
        self.assertEqual((row['status'], row['score'], row['score_max']), ('submitted', 6, 8))

    def test_teacher_write_does_not_downgrade_a_late_submission(self):
        fixture = build_workspace(self, {'pages': empty_pages()})
        insert_submission(fixture)
        connection = sqlite3.connect(fixture.db)
        connection.execute("UPDATE homework_submissions SET status='late' WHERE id='hw-recorded'")
        connection.commit()
        connection.close()
        write_pending(fixture, [])
        write_decisions(fixture, [{
            'messageId': 'm1', 'action': 'submitted', 'studentKey': EMMA['key'], 'assignment': HEADER,
            'score': 5, 'feedback': 'Explain the mechanism behind the weaker side.',
            'teacherException': True, 'authorizedBy': 'Samuel', 'evidence': 'Grade a late submission.'}],
            batch_id='batch-1')
        self.assertEqual(run_script(fixture, 'update.py', 'prepare').returncode, 0)
        write = load_state(fixture, 'plan.json')['homeworkWrites'][0]
        self.assertEqual(write['status'], 'late')
        self.assertEqual(run_script(fixture, 'update.py', 'commit').returncode, 0)
        row = homework_row(fixture.db)
        self.assertEqual((row['status'], row['score']), ('late', 5))

    def test_feedback_uses_the_linked_qq_when_the_decision_has_no_sender(self):
        fixture = build_workspace(self, {'pages': empty_pages(),
                                         'send': {'openTaskId': 'task-1'},
                                         'querySendStatus': {'mode': 'confirmed'}})
        seed_graded(fixture)
        ledger = load_state(fixture, 'ledger.json')
        ledger['processed']['m1'].pop('senderId')
        save_state(fixture, 'ledger.json', ledger)
        result = run_script(fixture, 'feedback.py', '--send')
        self.assertEqual(result.returncode, 0, result.stderr + result.stdout)
        sends = read_log(fixture, 'sends.log')
        self.assertEqual(len(sends), 2)
        self.assertEqual(sends[0]['openDingTalkId'], EMMA['qqId'])


class ListOnlyAnswerTests(unittest.TestCase):
    def prepare(self, fixture, decision):
        write_pending(fixture, [incoming()])
        write_decisions(fixture, [decision], batch_id='batch-1')
        return run_script(fixture, 'update.py', 'prepare')

    def base_decision(self, **overrides):
        decision = {'messageId': 'm1', 'action': 'submitted', 'studentKey': EMMA['key'],
                    'assignment': HEADER, 'evidence': 'photo of answer',
                    'responseFormat': 'worked', 'workingPhotoPresent': True, 'contextReviewed': True}
        decision.update(overrides)
        return decision

    def test_list_only_answer_is_not_an_accepted_submission(self):
        fixture = build_workspace(self, {'pages': empty_pages()})
        result = self.prepare(fixture, self.base_decision(responseFormat='list_only'))
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('list of points without full sentences', result.stderr + result.stdout)

    def test_list_only_recorded_as_needs_work_is_awaiting_working_without_receipt(self):
        fixture = build_workspace(self, {'pages': empty_pages()})
        decision = {'messageId': 'm1', 'action': 'needs_work', 'studentKey': EMMA['key'],
                    'assignment': HEADER, 'evidence': 'headings and fragments only, no sentences',
                    'responseFormat': 'list_only'}
        result = self.prepare(fixture, decision)
        self.assertEqual(result.returncode, 0, result.stderr + result.stdout)
        self.assertEqual(load_state(fixture, 'plan.json')['homeworkWrites'][0]['status'], 'awaiting_working')
        self.assertEqual(run_script(fixture, 'update.py', 'commit').returncode, 0)
        self.assertEqual(homework_row(fixture.db)['status'], 'awaiting_working')
        receipts = run_script(fixture, 'receipts.py', '--initialize')
        self.assertEqual(receipts.returncode, 0, receipts.stderr)
        receipts = run_script(fixture, 'receipts.py', '--send')
        self.assertEqual(receipts.returncode, 0, receipts.stderr)
        self.assertEqual(json.loads(receipts.stdout)['sent'], 0)
        self.assertEqual(len(read_log(fixture, 'sends.log')), 0)


if __name__ == '__main__':
    unittest.main()
