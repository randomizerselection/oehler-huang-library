import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch
import reply_queue as q

class ReplyQueueTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory();self.root=Path(self.tmp.name)
        self.patches=[patch.object(q,'ROOT',self.root),patch.object(q,'STATE',self.root/'state/queue.json'),patch.object(q,'REPORT',self.root/'queue.html')]
        for p in self.patches:p.start()
        self.inbound={'openMessageId':'in','senderOpenDingTalkId':'student','createTime':'2026-09-16 09:00:00','content':'May I ask for a reference?'}
        self.reply={'openMessageId':'out','senderOpenDingTalkId':q.CONFIG['selfOpenDingTalkId'],'createTime':'2026-09-16 09:10:00','content':'Yes, I can do that.'}
        self.snapshot={'complete':True,'result':{'hasMore':False,'conversationMessagesList':[{'singleChat':True,'openConversationId':'chat','title':'Student','messages':[self.inbound,self.reply]}]}}
        self.k=q.key('chat','in')
    def tearDown(self):
        for p in reversed(self.patches):p.stop()
        self.tmp.cleanup()
    def state(self):return q.capture(self.snapshot,'2026-09-16 10:00:00',authorized_sender_ids={'student'})
    def test_partial_scan_is_not_treated_as_empty(self):
        self.snapshot['complete']=False
        with self.assertRaises(ValueError):self.state()
        self.assertFalse(q.STATE.exists())
    def test_duplicate_scan_and_aged_out_chat_preserve_open_request(self):
        state=self.state()
        q.apply_reviews(state,[dict(key=self.k,status='open',summary='Reference request',reason='Needs teacher decision')])
        q.save(q.STATE,state)
        self.assertEqual(len(q.incoming(self.state())),1)
        self.snapshot['result']['conversationMessagesList']=[]
        self.assertEqual(self.state()['reviews'][self.k]['status'],'open')
    def test_automatic_reply_cannot_resolve_request(self):
        self.reply['messageAiSendFlag']='DWS'
        state=self.state()
        with self.assertRaises(ValueError):q.apply_reviews(state,[dict(key=self.k,status='answered',reason='Reply exists',answeredByMessageId='out')])
    def test_human_reply_requires_explicit_review_and_correct_chat(self):
        state=self.state()
        self.assertEqual(state['reviews'],{})
        with self.assertRaises(ValueError):q.apply_reviews(state,[dict(key=self.k,status='answered',reason='Answer elsewhere',answeredByMessageId='wrong')])
        q.apply_reviews(state,[dict(key=self.k,status='answered',reason='Samuel agreed to provide the reference',answeredByMessageId='out')])
        self.assertEqual(state['reviews'][self.k]['status'],'answered')
    def test_open_item_cannot_be_silently_dismissed(self):
        state=self.state()
        q.apply_reviews(state,[dict(key=self.k,status='open',summary='Reference',reason='Needs decision')])
        with self.assertRaises(ValueError):q.apply_reviews(state,[dict(key=self.k,status='routine',reason='Ignore')])
    def test_new_question_in_same_chat_reopens_queue(self):
        state=self.state()
        q.apply_reviews(state,[dict(key=self.k,status='answered',reason='Samuel agreed',answeredByMessageId='out')]);q.save(q.STATE,state)
        self.snapshot['result']['conversationMessagesList'][0]['messages'].append({**self.inbound,'openMessageId':'new','content':'Can we meet tomorrow?'})
        state=self.state()
        self.assertNotIn(q.key('chat','new'),state['reviews'])
    def test_render_escapes_student_text(self):
        self.inbound['content']='<script>alert(1)</script>'
        q.render(self.state());page=q.REPORT.read_text(encoding='utf-8')
        self.assertNotIn('<script>',page);self.assertIn('&lt;script&gt;',page)
    def test_membership_sync_preserves_existing_groups_and_is_idempotent(self):
        state=self.state();state.update(nativeEnabled=True,categoryId=10)
        q.apply_reviews(state,[dict(key=self.k,status='open',summary='Reference',reason='Needs decision')])
        memberships={99};calls=[]
        def api(args):
            calls.append(args)
            if args[2]=='list-by-conv':return {'result':{'categories':[{'categoryId':x} for x in memberships]}}
            if args[2]=='add-conv':memberships.update(int(x) for x in args[-1].split(','))
            if args[2]=='remove-conv':memberships.remove(int(args[-1]))
            return {'success':True}
        with patch.object(q,'cli',side_effect=api):
            q.sync_native(state);q.sync_native(state)
            self.assertEqual(memberships,{10,99})
            self.assertEqual(sum(x[2]=='add-conv' for x in calls),1)
            q.apply_reviews(state,[dict(key=self.k,status='answered',reason='Samuel agreed',answeredByMessageId='out')])
            q.sync_native(state);self.assertEqual(memberships,{99})

if __name__=='__main__':unittest.main()
