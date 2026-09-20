"""One-off, explicitly authorized personalized Q19 reminders and original image."""
import datetime as dt
import argparse
import hashlib
import json
import os
from pathlib import Path
import subprocess
import sys
from fetch import ROOT, CONFIG, TZ, cli, roster, save
from platform_db import homework_row
from receipts import field

PLAN = ROOT/'state/reminder-plan.json'
STATE = ROOT/'state/reminder-deliveries.json'

def still_missing(recipient, assignment):
    matches=[s for s in roster() if s['key']==recipient['student']['key']]
    if len(matches)!=1: raise ValueError('Roster identity changed')
    s=matches[0]
    if s['class'] not in ('S3.3','S3.4'): raise ValueError('Unauthorized class')
    pending=json.loads((ROOT/'state/pending.json').read_text(encoding='utf-8'))
    if any(m['senderId']==recipient['recipientId'] for m in pending['messages']):
        return False
    row=homework_row(s,assignment)
    if row is None: raise ValueError('Assignment is missing from the platform database')
    if row['status'] in ('submitted','late','awaiting_working'): return False
    if row['status']!='missing': raise ValueError('Unexpected platform homework status')
    return True

def deliver(state,key,recipient,args,state_path=STATE):
    entry=state['messages'].get(key,{})
    if entry.get('status')=='sent':return True
    if not entry.get('openTaskId'):
        now=dt.datetime.now(TZ)
        if entry.get('status')=='sending' or entry.get('attemptedAt'):
            entry.update(status='uncertain',lastError='A prior send intent has no persisted task ID')
            state['messages'][key]=entry;save(state_path,state)
            raise RuntimeError('Uncertain delivery; inspect the DingTalk chat before any retry')
        entry.update(status='sending',attemptedAt=entry.get('attemptedAt') or now.isoformat(),recipientId=recipient['recipientId'],studentKey=recipient['student']['key'],idempotencyKey=key)
        state['messages'][key]=entry;save(state_path,state)
        try:
            response=cli(['chat','message','send','--open-dingtalk-id',recipient['recipientId'],*args,'--ai-tag=true','--idempotency-key',key,'--yes'])
        except Exception as error:
            entry.update(status='uncertain',lastError=str(error)[:500]);save(state_path,state)
            raise RuntimeError('DingTalk send outcome is uncertain; inspect the chat before any retry') from error
        task=field(response,'openTaskId')
        if not task:
            entry.update(status='uncertain',lastError='Send response lacks openTaskId');save(state_path,state)
            raise RuntimeError('Missing send task; do not blindly retry')
        entry.update(openTaskId=task,status='awaiting-confirmation');save(state_path,state)
    status=cli(['chat','message','query-send-status','--open-task-id',entry['openTaskId']])
    mid,cid=field(status,'openMessageId'),field(status,'openConversationId')
    if mid and cid:
        entry.update(status='sent',openMessageId=mid,openConversationId=cid,confirmedAt=dt.datetime.now(TZ).isoformat())
    save(state_path,state)
    return entry['status']=='sent'

def main(plan_path=PLAN,state_path=STATE,campaign='reminder-2026-09-16',allow_completed=False):
    plan=json.loads(plan_path.read_text(encoding='utf-8'))
    allowed={'authorized'} | ({'completed'} if allow_completed else set())
    if plan.get('status') not in allowed:raise RuntimeError('Reminder plan is not authorized')
    image=Path(plan['attachment'])
    if hashlib.sha256(image.read_bytes()).hexdigest()!=plan['attachmentSha256']:raise ValueError('Attachment changed')
    state=json.loads(state_path.read_text(encoding='utf-8')) if state_path.exists() else {'messages':{},'skipped':{}}
    complete=0
    for index,r in enumerate(plan['recipients']):
        if index%10==0:
            subprocess.run([sys.executable,str(Path(__file__).with_name('fetch.py'))],check=True,capture_output=True,timeout=300)
        digest=hashlib.sha256((CONFIG['profile']+'\n'+r['student']['key']+'\n'+plan['assignment']+'\n'+campaign).encode()).hexdigest()
        keys=['reminder-text-'+digest,'reminder-image-'+digest]
        if all(state['messages'].get(k,{}).get('status')=='sent' for k in keys):
            complete+=1;continue
        if not still_missing(r,plan['assignment']):
            state['skipped'][r['student']['key']]='Now submitted or has a new message needing review';save(state_path,state)
            print(json.dumps({'skipped':r['student']['key']},ensure_ascii=True),flush=True);continue
        text_ok=deliver(state,keys[0],r,['--content',r['message']],state_path)
        if not text_ok:raise RuntimeError('Text delivery pending; resume by querying its task')
        image_ok=deliver(state,keys[1],r,['--msg-type','file','--file',str(image)],state_path)
        if not image_ok:raise RuntimeError('Image delivery pending; resume by querying its task')
        complete+=1
        print(json.dumps({'completedRecipients':complete,'studentKey':r['student']['key']},ensure_ascii=True),flush=True)
    state.update(status='completed',campaign=campaign,completedAt=dt.datetime.now(TZ).isoformat())
    save(state_path,state)
    print(json.dumps({'completedRecipients':complete,'skipped':len(state['skipped']),'totalPlanned':len(plan['recipients'])}),flush=True)

if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--plan',type=Path,default=PLAN)
    parser.add_argument('--state',type=Path,default=STATE)
    parser.add_argument('--campaign',default='reminder-2026-09-16')
    parser.add_argument('--allow-completed',action='store_true')
    args=parser.parse_args()
    lock=ROOT/'state'/f"reminders-{hashlib.sha256(args.campaign.encode()).hexdigest()[:12]}.lock"
    handle=os.open(lock,os.O_CREAT|os.O_EXCL|os.O_WRONLY)
    try:main(args.plan,args.state,args.campaign,args.allow_completed)
    finally:os.close(handle);lock.unlink()
