"""Send one request for a working photo after an evidence-reviewed letter-only answer."""
import datetime as dt
import argparse
import json
import os
from fetch import ROOT, TZ, cli, ensure_english_only, processed_message_ids, roster, save
import student_messages
from receipts import receipt_key, verify_saved, field, assignment_label, greeting

STATE=ROOT/'state/working-followups.json'

def context_ready(item,now=None):
    now=now or dt.datetime.now(TZ)
    batch=json.loads((ROOT/'state/pending.json').read_text(encoding='utf-8'))
    received=dt.datetime.fromisoformat(item['receivedAt']).replace(tzinfo=TZ)
    checked=dt.datetime.fromisoformat(batch['end']).replace(tzinfo=TZ)
    # Students often send the letter and upload their working in separate messages.
    if not dt.timedelta(minutes=2)<=now-received:return False
    if not dt.timedelta(0)<=now-checked<=dt.timedelta(minutes=2):return False
    ledger=json.loads((ROOT/'state/ledger.json').read_text(encoding='utf-8'))
    processed=processed_message_ids(ledger)
    return not any(m['senderId']==item['senderId'] and m['messageId'] not in processed for m in batch['messages'])

def eligible_records():
    ledger=json.loads((ROOT/'state/ledger.json').read_text(encoding='utf-8'))
    groups={}
    for mid,item in ledger['processed'].items():
        if item.get('action') in ('submitted','needs_work'):
            groups.setdefault(receipt_key(item),[]).append({**item,'sourceMessageId':item.get('messageId') or mid.split('#',1)[0]})
    result={}
    for key,items in groups.items():
        # A previously or subsequently inspected working photo satisfies the request.
        if any(i.get('workingPhotoPresent') is True or i.get('teacherAccepted') is True for i in items):continue
        candidates=[i for i in items if i.get('responseFormat')=='letter_only'
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
    for key,item in records.items():
        entry=state['followups'].get(key,{})
        if entry.get('status')=='sent':continue
        if entry.get('status') in ('uncertain','failed'):
            result['needsAttention'].append({'studentKey':item['studentKey'],'reason':f"Delivery is {entry['status']}; inspect the DingTalk chat before any retry"})
            continue
        verify_saved(item,expected_status='Awaiting working' if item['action']=='needs_work' else None)
        student=students[item['studentKey']]
        text=student_messages.dingtalk_text(student_messages.working_text(item, student, assignment_label(item)))
        task=entry.get('openTaskId')
        if not task:
            if not context_ready(item):
                result['deferred']+=1
                continue
            now=dt.datetime.now(TZ)
            if entry.get('status') == 'sending':
                entry.update(status='uncertain',lastError='Process stopped after send intent was saved but before a task ID was persisted')
                save(STATE,state)
                result['needsAttention'].append({'studentKey':item['studentKey'],'reason':'Uncertain prior send; inspect chat before any retry'})
                continue
            text=entry.get('text') or text
            verify_saved(item,expected_status='Awaiting working' if item['action']=='needs_work' else None)
            entry.update(status='sending',attemptedAt=now.isoformat(),
                         sourceMessageId=item['sourceMessageId'],senderId=item['senderId'],
                         idempotencyKey='working-photo-'+key,text=text)
            state['followups'][key]=entry;save(STATE,state)
            try:
                response=cli(['chat','message','send','--open-dingtalk-id',item['senderId'],
                              '--content',text,'--ai-tag=true','--idempotency-key',entry['idempotencyKey'],'--yes'])
            except Exception as error:
                entry.update(status='uncertain',lastError=str(error)[:500]);save(STATE,state)
                result['needsAttention'].append({'studentKey':item['studentKey'],'reason':'DingTalk send outcome is uncertain; no automatic retry will occur'})
                continue
            task=field(response,'openTaskId')
            if not task:
                entry.update(status='uncertain',lastError='Send response lacks openTaskId');save(STATE,state)
                result['needsAttention'].append({'studentKey':item['studentKey'],'reason':'DingTalk accepted no trackable task ID; inspect chat before any retry'})
                continue
            entry.update(openTaskId=task,status='awaiting-confirmation');save(STATE,state)
        try:
            response=cli(['chat','message','query-send-status','--open-task-id',task])
        except Exception as error:
            entry['lastError']=str(error)[:500];save(STATE,state)
            result['needsAttention'].append({'studentKey':item['studentKey'],'reason':'Could not reconcile the existing DingTalk send task'})
            continue
        mid,cid=field(response,'openMessageId'),field(response,'openConversationId')
        if mid and cid:
            entry.update(status='sent',openMessageId=mid,openConversationId=cid,confirmedAt=dt.datetime.now(TZ).isoformat())
            result['sent']+=1
        else:
            remote_status=str(field(response,'status') or field(response,'sendStatus') or '').lower()
            if remote_status in ('failed','failure','error','rejected'):
                entry.update(status='failed',lastError=f'DingTalk task status: {remote_status}')
                result['needsAttention'].append({'studentKey':item['studentKey'],'reason':'DingTalk reported a failed send task'})
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
