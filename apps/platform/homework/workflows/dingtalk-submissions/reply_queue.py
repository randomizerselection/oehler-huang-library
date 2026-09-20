"""Persistent personal-reply triage. Never sends messages or marks chats read."""
import argparse
import datetime as dt
import hashlib
import html
import json
import os
from pathlib import Path
from fetch import ROOT, CONFIG, TZ, cli, roster, save

STATE = ROOT / 'state/personal-replies.json'
REPORT = ROOT / 'Needs-my-reply.html'

def load_state():
    return json.loads(STATE.read_text(encoding='utf-8')) if STATE.exists() else {
        'conversations': {}, 'reviews': {}, 'managedConversations': [], 'nativeEnabled': False,
        'authorizedSenderIds': [], 'outOfScopeSenderIds': []}

def key(cid, mid):
    return hashlib.sha256((cid+'\n'+mid).encode()).hexdigest()[:24]

def capture(snapshot, end, authorized_sender_ids=None, out_of_scope_sender_ids=None):
    if snapshot.get('complete') is not True or snapshot.get('result',{}).get('hasMore') is not False:
        raise ValueError('Personal reply queue requires a complete inbox scan')
    state=load_state()
    if authorized_sender_ids is None:
        authorized_sender_ids = state.get('authorizedSenderIds') or {
            student['dingtalkId'] for student in roster() if student.get('dingtalkId')}
    if authorized_sender_ids is not None:
        state['authorizedSenderIds']=sorted(set(authorized_sender_ids))
    if out_of_scope_sender_ids is not None:
        state['outOfScopeSenderIds']=sorted(set(out_of_scope_sender_ids))
    verified_out_of_scope=set(state.get('outOfScopeSenderIds',[]))
    for conv in snapshot['result']['conversationMessagesList']:
        if not conv.get('singleChat'): continue
        cid=conv['openConversationId']
        target=state['conversations'].setdefault(cid,{'title':conv.get('title',''),'messages':{}})
        target['title']=conv.get('title') or target['title']
        for m in conv['messages']:
            mid=m.get('openMessageId') or m.get('messageId')
            if mid:
                target['messages'][mid]=m
                if m.get('senderOpenDingTalkId') in verified_out_of_scope:
                    review_key=key(cid,mid)
                    previous=state['reviews'].get(review_key)
                    if previous and previous.get('status')!='out_of_scope':
                        state.setdefault('history',[]).append({
                            'key':review_key,'previous':previous,
                            'at':dt.datetime.now(TZ).isoformat(),
                            'reason':'Platform scope revalidation'})
                    state['reviews'][review_key]={
                        'key':review_key,'status':'out_of_scope',
                        'reason':'Verified platform identity belongs outside S3.3/S3.4.'}
    # Older reviews sometimes used a chat title or self-identification as class
    # evidence. Remove those classifications when the current platform database
    # does not verify the sender as out of scope; the raw message remains durable
    # and receives no native queue action or automatic response.
    sources={key(cid,mid):m for cid,c in state['conversations'].items() for mid,m in c['messages'].items()}
    for review_key,review in list(state['reviews'].items()):
        if review.get('status')!='out_of_scope':
            continue
        source=sources.get(review_key,{})
        if source.get('senderOpenDingTalkId') not in verified_out_of_scope:
            state.setdefault('history',[]).append({
                'key':review_key,'previous':review,'at':dt.datetime.now(TZ).isoformat(),
                'reason':'Removed unverified out-of-scope classification after platform scope revalidation'})
            del state['reviews'][review_key]
    state['checkedThrough']=end
    save(STATE,state)
    return state

def all_incoming(state):
    return {key(cid,mid): {'conversationId':cid,'title':c['title'],'messageId':mid,**m}
        for cid,c in state['conversations'].items() for mid,m in c['messages'].items()
        if m.get('senderOpenDingTalkId')!=CONFIG['selfOpenDingTalkId']}

def incoming(state):
    authorized=set(state.get('authorizedSenderIds',[]))
    return {k:m for k,m in all_incoming(state).items() if m.get('senderOpenDingTalkId') in authorized}

def capture_fresh(snapshot,end,authorized_sender_ids=None,out_of_scope_sender_ids=None):
    lock=ROOT/'state/personal-replies.lock'
    handle=os.open(lock,os.O_CREAT|os.O_EXCL|os.O_WRONLY)
    try:return capture(snapshot,end,authorized_sender_ids=authorized_sender_ids,
                       out_of_scope_sender_ids=out_of_scope_sender_ids)
    finally:os.close(handle);lock.unlink()

def automated_ids():
    ids=set()
    for filename in ('receipts.json','working-followups.json','english-name-updates.json','reminder-plan.json','absence-followup-deliveries.json'):
        path=ROOT/'state'/filename
        if not path.exists():continue
        def visit(v):
            if isinstance(v,dict):
                if v.get('openMessageId'): ids.add(v['openMessageId'])
                for child in v.values():visit(child)
            elif isinstance(v,list):
                for child in v:visit(child)
        visit(json.loads(path.read_text(encoding='utf-8')))
    return ids

def apply_reviews(state, decisions):
    messages=all_incoming(state); active=incoming(state); automated=automated_ids(); changes=[]
    if len({d['key'] for d in decisions})!=len(decisions):raise ValueError('Duplicate triage decisions')
    for d in decisions:
        if d['key'] not in messages:raise ValueError('Unknown source message')
        status=d['status']
        if status not in ('open','routine','answered','out_of_scope'):raise ValueError('Invalid review status')
        if not d.get('reason'):raise ValueError('Review needs factual evidence')
        if status=='out_of_scope' and messages[d['key']].get('senderOpenDingTalkId') not in set(state.get('outOfScopeSenderIds',[])):
            raise ValueError('Out-of-scope review requires a platform-verified sender outside S3.3/S3.4')
        if status!='out_of_scope' and d['key'] not in active:
            raise ValueError('Only verified S3.3/S3.4 senders may enter the personal reply queue')
        old=state['reviews'].get(d['key'],{})
        if old.get('status')=='open' and status=='routine':
            raise ValueError('Open requests need an evidenced answer, not routine dismissal')
        if status=='open' and not d.get('summary'):raise ValueError('Open item needs a short action summary')
        if status=='answered':
            source=messages[d['key']]
            reply=state['conversations'][source['conversationId']]['messages'].get(d.get('answeredByMessageId'),{})
            if (reply.get('senderOpenDingTalkId')!=CONFIG['selfOpenDingTalkId'] or
                reply.get('messageAiSendFlag') or d.get('answeredByMessageId') in automated or
                reply.get('createTime','')<=source.get('createTime','')):
                raise ValueError('Answer must reference a later personal reply in the same chat')
        if old.get('status')!=status and (status=='open' or old.get('status')=='open'):
            changes.append({'key':d['key'],'status':status,'title':messages[d['key']]['title'],'summary':d.get('summary') or old.get('summary','')})
        if old and old!=d:
            state.setdefault('history',[]).append({'key':d['key'],'previous':old,'at':dt.datetime.now(TZ).isoformat()})
        state['reviews'][d['key']]=d
    return changes

def render(state):
    messages=incoming(state); cards=[]
    active=[(k,m,state['reviews'].get(k,{})) for k,m in messages.items()
            if state['reviews'].get(k,{}).get('status') in (None,'open')]
    active.sort(key=lambda x:(x[2].get('status')!='open',x[1].get('createTime','')))
    for k,m,d in active:
        status='Needs your reply' if d.get('status')=='open' else 'Awaiting review'
        text=m.get('content') or m.get('text') or '[Attachment]'
        # Hide opaque media download parameters in the user-facing excerpt.
        if text.startswith('[图片消息]'):text='[Image attachment — see the original DingTalk chat]'
        elif ' fileId:' in text:text=text.split(' fileId:')[0]
        e=html.escape
        cards.append(f'<article><div class="status">{status}</div><h2>{e(m["title"])}</h2>'
            f'<time>{e(m.get("createTime",""))}</time><p><strong>{e(d.get("summary","Review this message in context."))}</strong></p>'
            f'<blockquote>{e(text)}</blockquote><p>{e(d.get("reason",""))}</p></article>')
    count=sum(d.get('status')=='open' for _,_,d in active)
    page='''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Needs my reply</title>
<style>body{font:17px/1.5 system-ui;margin:40px auto;max-width:900px;padding:0 24px;background:#f3f6fa;color:#172c45}h1{margin-bottom:0}h2{margin:8px 0}article{background:white;border:1px solid #d7e0ea;border-radius:12px;padding:24px;margin:18px 0}.status{color:#9b3c00;font-weight:650}time{color:#596879;font-size:14px}blockquote{white-space:pre-wrap;border-left:3px solid #abc1d8;margin:15px 0;padding-left:16px}header p{color:#596879}</style><header><h1>Needs my reply</h1>'''
    page+=f'<p>{count} open requests · {len(active)-count} awaiting review<br>Checked through {html.escape(state.get("checkedThrough",""))} (China time)</p>'
    page+='<p>Reply in the original DingTalk conversation. Items stay here until a personal reply addresses them. Automated receipts do not clear requests. This local page updates after each scheduled check; reopen or refresh it to see changes.</p></header>'
    page+=''.join(cards) or '<article>No personal replies currently outstanding.</article>'
    REPORT.write_text(page+'</html>',encoding='utf-8')

def prepare():
    snapshot=json.loads((ROOT/'state/latest-response.json').read_text(encoding='utf-8'))
    batch=json.loads((ROOT/'state/pending.json').read_text(encoding='utf-8'))
    if not snapshot.get('batchId') or snapshot.get('batchId') != batch.get('batchId') or batch.get('complete') is not True:
        raise RuntimeError('Reply queue requires a matching complete durable fetch batch')
    state=capture(snapshot,batch['end']);messages=incoming(state)
    work=[]
    for cid,conv in state['conversations'].items():
        targets=[{'key':k,'review':state['reviews'].get(k),'messageId':m['messageId']}
                 for k,m in messages.items() if m['conversationId']==cid and state['reviews'].get(k,{}).get('status') in (None,'open')]
        if targets:work.append({'conversationId':cid,'title':conv['title'],'targets':targets,
             'messages':sorted(conv['messages'].values(),key=lambda m:m.get('createTime',''))})
    save(ROOT/'state/personal-reply-review.json',work);render(state)
    return {'unreviewed':sum(k not in state['reviews'] for k in messages),'open':sum(d['status']=='open' for d in state['reviews'].values()),'reviewFile':str(ROOT/'state/personal-reply-review.json')}

def categories(response):
    result=response.get('result',{})
    if not isinstance(result,dict) or not isinstance(result.get('categories'),list):raise ValueError('Unexpected category response')
    return result['categories']

def sync_native(state):
    if not state.get('nativeEnabled'):return {'enabled':False}
    category_id=state.get('categoryId')
    if category_id is None:raise ValueError('Native category has not been configured')
    messages=incoming(state)
    desired={messages[k]['conversationId'] for k,d in state['reviews'].items() if d['status']=='open'}
    managed=set(state.get('managedConversations',[]))
    for cid in sorted(desired|managed):
        existing=categories(cli(['chat','category','list-by-conv','--conversation-id',cid]))
        ids={str(c['categoryId']) for c in existing}
        if cid in desired and str(category_id) not in ids:
            # Persist intent before the network call, so a crash cannot orphan membership.
            managed.add(cid);state['managedConversations']=sorted(managed);save(STATE,state)
            # Include all current memberships so an API move cannot erase other categories.
            cli(['chat','category','add-conv','--conversation-id',cid,'--category-ids',','.join(sorted(ids|{str(category_id)}))])
            actual={str(c['categoryId']) for c in categories(cli(['chat','category','list-by-conv','--conversation-id',cid]))}
            if not ids|{str(category_id)}<=actual:raise RuntimeError('Category memberships did not verify')
        elif cid not in desired and cid in managed:
            if str(category_id) in ids:
                cli(['chat','category','remove-conv','--conversation-id',cid,'--category-ids',str(category_id)])
                actual={str(c['categoryId']) for c in categories(cli(['chat','category','list-by-conv','--conversation-id',cid]))}
                if str(category_id) in actual or not ids-{str(category_id)}<=actual:raise RuntimeError('Category removal did not verify')
            managed.remove(cid);state['managedConversations']=sorted(managed);save(STATE,state)
    return {'enabled':True,'openConversations':len(desired)}

def main():
    parser=argparse.ArgumentParser();parser.add_argument('command',choices=['prepare','apply','sync','render'])
    parser.add_argument('--decisions',default=str(ROOT/'state/personal-reply-decisions.json'))
    args=parser.parse_args();lock=ROOT/'state/personal-replies.lock'
    handle=os.open(lock,os.O_CREAT|os.O_EXCL|os.O_WRONLY)
    try:
        if args.command=='prepare':result=prepare()
        else:
            state=load_state();result={}
            if args.command=='apply':
                decisions_path=Path(args.decisions)
                result['changes']=apply_reviews(state,json.loads(decisions_path.read_text(encoding='utf-8')))
                save(STATE,state)
            if args.command in ('sync','apply'):
                try:
                    result['native']=sync_native(state)
                except Exception as error:
                    # Keep the local queue authoritative for pending personal
                    # replies and report native category limitations truthfully.
                    result['native']={'enabled':bool(state.get('nativeEnabled')),'error':str(error)[:500],
                                      'localQueuePreserved':True}
            render(state)
            if args.command=='apply':
                save(decisions_path,[])
        print(json.dumps(result,ensure_ascii=False))
    finally:os.close(handle);lock.unlink()

if __name__=='__main__':main()
