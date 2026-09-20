from pathlib import Path
"""Send one request for a working photo after an evidence-reviewed letter-only answer."""
import datetime as dt
import argparse
import json
import os
import subprocess
import sys
from fetch import ROOT, TZ, cli, roster, save
import student_messages
from receipts import receipt_key, verify_saved, field, assignment_label, greeting, source_message_id

STATE=ROOT/'state/working-followups.json'

def refresh_pending():
    # This re-runs fetch.py and overwrites state/pending.json with a new batchId.
    # That is acceptable ONLY because it runs after commit, when every decision
    # for the previous batch has already been applied.
    subprocess.run([sys.executable,str(Path(__file__).with_name('fetch.py'))],capture_output=True,check=True,timeout=300)

def parse_time(value):
    parsed=dt.datetime.fromisoformat(value)
    return parsed if parsed.tzinfo else parsed.replace(tzinfo=TZ)

def context_ready(item,now=None,eligible_after=None):
    now=now or dt.datetime.now(TZ)
    batch=json.loads((ROOT/'state/pending.json').read_text(encoding='utf-8'))
    checked=parse_time(batch['end'])
    # Students often send the letter and upload their working in separate messages.
    # The two-minute timer is persisted as eligibleAfter when the record first
    # becomes a candidate and is never restarted by later fetches.
    eligible=parse_time(eligible_after) if eligible_after else parse_time(item['receivedAt'])+dt.timedelta(minutes=2)
    if now<eligible:return False
    if not dt.timedelta(0)<=now-checked<=dt.timedelta(minutes=2):return False
    ledger=json.loads((ROOT/'state/ledger.json').read_text(encoding='utf-8'))
    return not any(m['senderId']==item['senderId'] and m['messageId'] not in ledger['processed'] for m in batch['messages'])

def eligible_records():
    ledger=json.loads((ROOT/'state/ledger.json').read_text(encoding='utf-8'))
    groups={}
    for mid,item in ledger['processed'].items():
        if item.get('action') in ('submitted','needs_work'):
            groups.setdefault(receipt_key(item),[]).append({**item,'sourceMessageId':source_message_id(mid)})
    result={}
    for key,items in groups.items():
        # A previously or subsequently inspected working photo satisfies the request.
        if any(i.get('workingPhotoPresent') is True or i.get('teacherAccepted') is True for i in items):continue
        candidates=[i for i in items if i.get('responseFormat') in ('letter_only','list_only')
                    and i.get('workingPhotoPresent') is False
                    and i.get('contextReviewed') is True
                    and i.get('workingCheckEvidence')]
        if candidates:result[key]=candidates[-1]
    return result

def run(explicit_request=False, student_key=None):
    state=json.loads(STATE.read_text(encoding='utf-8')) if STATE.exists() else {'followups':{}}
    result={'sent':0,'awaitingConfirmation':0,'deferred':0,'needsAttention':[]}
    students={s['key']:s for s in roster()}
    records=eligible_records()
    if student_key:
        records={k:v for k,v in records.items() if v['studentKey']==student_key}
    if any(state['followups'].get(k,{}).get('status')!='sent' and not state['followups'].get(k,{}).get('openTaskId') for k in records):
        refresh_pending()
    for key,item in records.items():
        entry=state['followups'].get(key,{})
        if entry.get('status')=='sent':continue
        if 'eligibleAfter' not in entry:
            entry['eligibleAfter']=(parse_time(item['receivedAt'])+dt.timedelta(minutes=2)).isoformat()
            state['followups'][key]=entry;save(STATE,state)
        verify_saved(item,expected_status='Awaiting working' if item['action']=='needs_work' else None)
        student=students[item['studentKey']]
        text=student_messages.working_text(item, student, assignment_label(item))
        task=entry.get('openTaskId')
        if not task:
            if not context_ready(item,eligible_after=entry.get('eligibleAfter')):
                result['deferred']+=1
                continue
            now=dt.datetime.now(TZ)
            attempted=entry.get('attemptedAt')
            if attempted and now-dt.datetime.fromisoformat(attempted)>dt.timedelta(hours=23):
                result['needsAttention'].append({'studentKey':item['studentKey'],'reason':'Uncertain send outside safe retry window'})
                continue
            text=entry.get('text') or text
            entry.update(status='sending',attemptedAt=attempted or now.isoformat(),
                         sourceMessageId=item['sourceMessageId'],senderId=item['senderId'],
                         idempotencyKey='working-photo-'+key,text=text)
            state['followups'][key]=entry;save(STATE,state)
            response=cli(['chat','message','send','--open-dingtalk-id',item['senderId'],
                          '--content',text,'--ai-tag=true','--idempotency-key',entry['idempotencyKey'],'--yes'])
            task=field(response,'openTaskId')
            if not task:raise RuntimeError('Send task missing; inspect response before retry')
            entry.update(openTaskId=task,status='awaiting-confirmation');save(STATE,state)
        response=cli(['chat','message','query-send-status','--open-task-id',task])
        mid,cid=field(response,'openMessageId'),field(response,'openConversationId')
        if mid and cid:
            entry.update(status='sent',openMessageId=mid,openConversationId=cid,confirmedAt=dt.datetime.now(TZ).isoformat())
            result['sent']+=1
        else:result['awaitingConfirmation']+=1
        save(STATE,state)
    return result

if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--explicit-reminder-request',action='store_true',help='Legacy compatibility flag; incomplete-submission follow-ups are authorized during regular checks.')
    parser.add_argument('--student-key',help='Limit a targeted correction to one verified student.')
    args=parser.parse_args()
    lock=ROOT/'state/working-followups.lock'
    handle=os.open(lock,os.O_CREAT|os.O_EXCL|os.O_WRONLY)
    try:print(json.dumps(run(explicit_request=args.explicit_reminder_request,student_key=args.student_key),ensure_ascii=True))
    finally:os.close(handle);lock.unlink()
