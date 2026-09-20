import json
import datetime as dt
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch
import working_followups as w
from fetch import save

class WorkingFollowupsTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory();self.root=Path(self.tmp.name)
        self.item=dict(action='submitted',studentKey='S3.3|1|student',assignment='Q19',senderId='student-id',
                       responseFormat='letter_only',answerMatchesKey=True,workingPhotoPresent=False,
                       contextReviewed=True,workingCheckEvidence='A matches verified key; full conversation inspected, no photo.')
        save(self.root/'state/ledger.json',{'processed':{'msg':self.item}})
        self.real_context_ready=w.context_ready
        self.patches=[patch.object(w,'ROOT',self.root),patch.object(w,'STATE',self.root/'state/followups.json'),patch.object(w,'context_ready',return_value=True),
                      patch.object(w,'verify_saved'),patch.object(w,'roster',return_value=[dict(key=self.item['studentKey'],english='Liam',name='Chinese name')])]
        for p in self.patches:p.start()
    def tearDown(self):
        for p in reversed(self.patches):p.stop()
        self.tmp.cleanup()
    def test_regular_checks_send_incomplete_submission_followup(self):
        with patch.object(w,'cli',side_effect=[{'openTaskId':'task'},{'openMessageId':'sent','openConversationId':'chat'}]):
            self.assertEqual(w.run()['sent'],1)
    def test_letter_only_send_once_personalized_and_native_ai_label(self):
        def api(args):return {'openTaskId':'task'} if args[2]=='send' else {'openMessageId':'sent','openConversationId':'chat'}
        with patch.object(w,'cli',side_effect=api) as api:
            self.assertEqual(w.run(explicit_request=True)['sent'],1);self.assertEqual(w.run(explicit_request=True)['sent'],0)
            self.assertEqual(api.call_count,2)
            self.assertIn('Hi Liam, I received your answer for your assignment. Please send a clear photo showing your working so I can record a complete submission.',api.call_args_list[0].args[0])
            self.assertIn('--ai-tag=true',api.call_args_list[0].args[0])
    def test_numbered_homework_followup_names_the_assignment(self):
        with patch.object(w,'assignment_label',return_value='Homework 2'),patch.object(w,'cli',side_effect=[{'openTaskId':'task'},{'openMessageId':'sent','openConversationId':'chat'}]) as api:
            self.assertEqual(w.run()['sent'],1)
            self.assertIn('Hi Liam, I received your answer for Homework 2. Please send a clear photo showing your working so I can record a complete submission.',api.call_args_list[0].args[0])
    def test_accompanying_or_later_work_photo_suppresses_followup(self):
        save(self.root/'state/ledger.json',{'processed':{'letter':self.item,'photo':{**self.item,'workingPhotoPresent':True}}})
        with patch.object(w,'cli') as api:self.assertEqual(w.run(explicit_request=True)['sent'],0);api.assert_not_called()
    def test_teacher_acceptance_suppresses_followup(self):
        save(self.root/'state/ledger.json',{'processed':{'letter':self.item,'accepted':{**self.item,'teacherAccepted':True}}})
        with patch.object(w,'cli') as api:
            self.assertEqual(w.run()['sent'],0)
            api.assert_not_called()
    def test_missing_context_or_non_letter_answer_does_not_send(self):
        for change in ({'contextReviewed':False},{'responseFormat':'worked_answer'},{'workingPhotoPresent':None}):
            save(self.root/'state/ledger.json',{'processed':{'msg':{**self.item,**change}}})
            self.assertEqual(w.eligible_records(),{})
    def test_incorrect_letter_still_requires_working(self):
        save(self.root/'state/ledger.json',{'processed':{'msg':{**self.item,'answerMatchesKey':False}}})
        self.assertEqual(len(w.eligible_records()),1)
    def test_targeted_run_does_not_message_other_students(self):
        with patch.object(w,'cli') as api:
            self.assertEqual(w.run(student_key='another-student')['sent'],0)
            api.assert_not_called()
    def test_old_submissions_without_assessment_are_not_retroactively_messaged(self):
        old={k:v for k,v in self.item.items() if k in ('action','studentKey','assignment','senderId')}
        save(self.root/'state/ledger.json',{'processed':{'msg':old}})
        self.assertEqual(w.eligible_records(),{})
    def test_existing_delivery_task_is_queried_not_resent(self):
        save(w.STATE,{'followups':{w.receipt_key(self.item):{'status':'awaiting-confirmation','openTaskId':'task'}}})
        with patch.object(w,'cli',return_value={'openMessageId':'sent','openConversationId':'chat'}) as api:
            self.assertEqual(w.run(explicit_request=True)['sent'],1);self.assertEqual(api.call_count,1)
            self.assertEqual(api.call_args.args[0][2],'query-send-status')
    def test_waits_for_photo_upload_and_ignores_processed_messages(self):
        now=dt.datetime(2026,9,16,10,0,tzinfo=w.TZ)
        save(self.root/'state/pending.json',{'end':'2026-09-16 10:00:00','messages':[]})
        self.assertFalse(self.real_context_ready({**self.item,'receivedAt':'2026-09-16 09:59:30'},now))
        item={**self.item,'receivedAt':'2026-09-16 09:55:00'}
        self.assertTrue(self.real_context_ready(item,now))
        save(self.root/'state/pending.json',{'end':'2026-09-16 10:00:00','messages':[{'messageId':'new-photo','senderId':'student-id'}]})
        self.assertFalse(self.real_context_ready(item,now))
        save(self.root/'state/pending.json',{'end':'2026-09-16 10:00:00','messages':[{'messageId':'msg','senderId':'student-id'}]})
        self.assertTrue(self.real_context_ready(item,now))
    def test_stale_inbox_blocks_working_request(self):
        save(self.root/'state/pending.json',{'end':'2026-09-16 09:55:00','messages':[]})
        self.assertFalse(self.real_context_ready({**self.item,'receivedAt':'2026-09-16 09:50:00'},dt.datetime(2026,9,16,10,0,tzinfo=w.TZ)))

if __name__=='__main__':unittest.main()
