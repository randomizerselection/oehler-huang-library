"""Receipt delivery tests with a fake CLI; never contact students."""
import datetime as dt
import json
import subprocess
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch
import receipts as r
from fetch import save
from fetch import cli as real_cli

class ReceiptTests(unittest.TestCase):
    def test_transient_read_failure_is_retried_but_send_is_not(self):
        failure={'error':{'message':'[NETWORK_UNREACHABLE] TLS handshake failed'}}
        success={'success':True,'result':{'conversationMessagesList':[],'hasMore':False}}
        responses=[
            subprocess.CompletedProcess([],1,json.dumps(failure),''),
            subprocess.CompletedProcess([],0,json.dumps(success),''),
        ]
        with patch('fetch.subprocess.run',side_effect=responses) as api, patch('fetch.time.sleep'):
            self.assertTrue(real_cli(['chat','message','list-all'])['success'])
            self.assertEqual(api.call_count,2)
        responses=[
            subprocess.CompletedProcess([],1,json.dumps(failure),''),
            subprocess.CompletedProcess([],0,json.dumps(success),''),
        ]
        with patch('fetch.subprocess.run',side_effect=responses) as api, patch('fetch.time.sleep'):
            with self.assertRaises(RuntimeError):
                real_cli(['chat','message','send'])
            self.assertEqual(api.call_count,1)

    def test_async_cli_envelope_is_accepted(self):
        response={'ok':True,'outcome':'pending','data':{'success':True,'result':{'openTaskId':'task'}}}
        with patch('fetch.subprocess.run',return_value=subprocess.CompletedProcess([],0,json.dumps(response),'')):
            self.assertEqual(r.field(real_cli(['chat','message','send']),'openTaskId'),'task')
    def test_failed_async_cli_envelope_is_rejected(self):
        response={'ok':True,'data':{'success':False,'errorMsg':'failed'}}
        with patch('fetch.subprocess.run',return_value=subprocess.CompletedProcess([],0,json.dumps(response),'')):
            with self.assertRaises(RuntimeError):real_cli(['chat','message','send'])
    def test_outbound_student_text_rejects_chinese_characters(self):
        with patch('fetch.subprocess.run') as api:
            with self.assertRaises(ValueError):
                real_cli(['chat','message','send','--content','Hi 王同学'])
            api.assert_not_called()
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory()
        self.state=Path(self.tmp.name)/'receipts.json'
        self.item={'studentKey':'S3.4|31|student','assignment':'assignment','senderId':'student-id','sourceMessageId':'source-id'}
        self.key=r.receipt_key(self.item)
        save(self.state,{'enabledAt':'2026-09-15','receipts':{}})
        self.patches=[patch.object(r,'STATE',self.state),patch.object(r,'submitted_records',return_value={self.key:self.item}),patch.object(r,'verify_saved'),patch.object(r,'mark_confirmation'),patch.object(r,'roster',return_value=[{'key':self.item['studentKey'],'english':'Liam','name':'Chinese name'}])]
        for p in self.patches: p.start()
    def tearDown(self):
        for p in reversed(self.patches):p.stop()
        self.tmp.cleanup()
    def test_sends_once_and_checks_delivery(self):
        calls=[]
        def fake(args):
            calls.append(args)
            return {'result':{'openTaskId':'task'}} if args[2]=='send' else {'result':{'openMessageId':'msg','openConversationId':'conv'}}
        with patch.object(r,'cli',side_effect=fake):
            self.assertEqual(r.run(send=True)['sent'],1)
            self.assertEqual(r.run(send=True)['eligible'],0)
        self.assertEqual(len(calls),2)
        self.assertIn('--ai-tag=true',calls[0])
        self.assertIn("Hi Liam, thanks for sending your assignment. I've marked it as submitted. — Adam, Samuel's automated teaching assistant.",calls[0])
        self.assertIn('student-id',calls[0])
    def test_numbered_homework_receipt_uses_catalog_without_changing_key(self):
        root=Path(self.tmp.name)
        save(root/'assignments.json',[{'header':'assignment','displayName':'Homework 2'}])
        with patch.object(r,'ROOT',root):
            self.assertEqual(r.receipt_text(self.item),"Hi Liam, thanks for sending Homework 2. I've marked it as submitted. — Adam, Samuel's automated teaching assistant.")
            self.assertEqual(r.receipt_key(self.item),self.key)
    def test_missing_english_name_uses_neutral_english_greeting(self):
        with patch.object(r,'roster',return_value=[{'key':self.item['studentKey'],'english':'','name':'王同学'}]):
            text=r.receipt_text(self.item)
        self.assertEqual(text,"Hi, thanks for sending your assignment. I've marked it as submitted. — Adam, Samuel's automated teaching assistant.")
        self.assertNotIn('王同学',text)
    def test_never_sends_before_saved_verification(self):
        with patch.object(r,'verify_saved',side_effect=ValueError('not saved')),patch.object(r,'cli') as api:
            with self.assertRaises(ValueError):r.run(send=True)
            api.assert_not_called()
    def test_pending_task_is_queried_without_resending(self):
        original = 'Hi Liam, your homework has been recorded.'
        save(self.state,{'receipts':{self.key:{'status':'awaiting-confirmation','openTaskId':'task','text':original}}})
        with patch.object(r,'cli',return_value={'result':{'openMessageId':'msg','openConversationId':'conv'}}) as api:
            self.assertEqual(r.run(send=True)['sent'],1)
            self.assertEqual(api.call_args.args[0][2],'query-send-status')
            self.assertEqual(api.call_count,1)
        self.assertEqual(json.loads(self.state.read_text())['receipts'][self.key]['text'], original)
    def test_expired_uncertain_attempt_is_not_retried(self):
        old=(dt.datetime.now(r.TZ)-dt.timedelta(days=2)).isoformat()
        save(self.state,{'receipts':{self.key:{'status':'sending','attemptedAt':old}}})
        with patch.object(r,'cli') as api:
            self.assertEqual(len(r.run(send=True)['needsAttention']),1)
            api.assert_not_called()
    def test_preexisting_is_skipped(self):
        save(self.state,{'receipts':{self.key:{'status':'pre-existing'}}})
        with patch.object(r,'cli') as api:
            self.assertEqual(r.run(send=True)['eligible'],0)
            api.assert_not_called()

class IncompleteSubmissionTests(unittest.TestCase):
    def test_incomplete_answer_blocks_receipt_and_later_work_has_distinct_key(self):
        with tempfile.TemporaryDirectory() as directory:
            root=Path(directory)
            item={'studentKey':'S3.4|1|Ryan','assignment':'Q19','senderId':'student-id'}
            incomplete={**item,'action':'needs_work','responseFormat':'letter_only','workingPhotoPresent':False}
            ledger={'processed':{'letter':incomplete}}
            save(root/'state/ledger.json',ledger)
            with patch.object(r,'ROOT',root):
                self.assertEqual(r.submitted_records(),{})
                ledger['processed']['photo']={**item,'action':'submitted','workingPhotoPresent':True}
                save(root/'state/ledger.json',ledger)
                records=r.submitted_records()
                self.assertEqual(list(records),[r.receipt_key(item)+'-working-complete'])
                self.assertEqual(next(iter(records.values()))['sourceMessageId'],'photo')
    def test_letter_only_mislabeled_submitted_cannot_receive_completion(self):
        with tempfile.TemporaryDirectory() as directory:
            root=Path(directory)
            item={'studentKey':'S3.4|1|Ryan','assignment':'Q19','senderId':'student-id','action':'submitted','responseFormat':'letter_only','workingPhotoPresent':False}
            save(root/'state/ledger.json',{'processed':{'letter':item}})
            with patch.object(r,'ROOT',root):self.assertEqual(r.submitted_records(),{})

if __name__=='__main__':unittest.main()
