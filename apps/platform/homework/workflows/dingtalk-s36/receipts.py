"""Send authorized AI-labelled private receipts only for saved submissions."""
import argparse
import datetime as dt
import hashlib
import json
import os
from fetch import CONFIG, ROOT, TZ, cli, roster, save
import student_messages
from platform_db import mark_confirmation, verify_homework

TEXT = "{greeting} thanks for sending your assignment. I've marked it as submitted."
STATE = ROOT / 'state' / 'receipts.json'

def source_message_id(ledger_key):
    # Composite ledger keys (one message backing several assignments) carry a
    # '~dup-<hash>' suffix that must not reach external_message_id fields.
    return ledger_key.split('~dup-', 1)[0]

def greeting(student):
    return student_messages.greeting(student)


def assignment_label(item):
    return student_messages.assignment_label(student_messages.assignment_meta(ROOT, item['assignment']))


def receipt_text(item):
    students = [s for s in roster() if s['key'] == item['studentKey']]
    if len(students) != 1:
        raise ValueError('Receipt requires a unique student name')
    return student_messages.receipt_text(item, students[0], assignment_label(item))


def receipt_key(item):
    return hashlib.sha256((CONFIG['profile'] + '\n' + item['studentKey'] + '\n' + item['assignment']).encode()).hexdigest()

def submitted_records():
    ledger=json.loads((ROOT/'state/ledger.json').read_text(encoding='utf-8'))
    result={}
    awaiting_work={}
    for mid,item in ledger['processed'].items():
        if item.get('action')=='needs_work':
            key=receipt_key(item)
            result.pop(key,None)
            result.pop(key+'-working-complete',None)
            awaiting_work[key] = item.get('responseFormat')
        if item.get('action')=='submitted':
            if item.get('responseFormat')=='letter_only' and not item.get('workingPhotoPresent') and not item.get('teacherAccepted'):
                continue
            if item.get('teacherException'):
                # An approved exemption is not a submission: no completion receipt.
                continue
            key=receipt_key(item)
            previous_format = awaiting_work.get(key)
            if key in awaiting_work:
                if item.get('workingPhotoPresent') is True:
                    item = {**item, 'completionKind': 'sentences' if previous_format == 'list_only' else 'working'}
                key += '-working-complete'
            result[key]={**item,'sourceMessageId':source_message_id(mid)}
    return result

def verify_saved(item, expected_status=None):
    students=[s for s in roster() if s['key']==item['studentKey']]
    if len(students)!=1 or not item.get('senderId') or item['senderId']==CONFIG['selfOpenDingTalkId']:
        raise ValueError('Receipt lacks a unique student or valid recipient')
    if students[0]['class'] not in CONFIG['classes']:
        raise ValueError(f"Refusing to send for a student outside {CONFIG['classes']}: {students[0]['class']}")
    legacy_status = {'Awaiting working': 'awaiting_working', 'Submitted': 'submitted'}
    allowed = (legacy_status.get(expected_status, expected_status),) if expected_status else ('submitted', 'late')
    verify_homework(item['studentKey'], item['assignment'], allowed)

def field(data,name):
    if isinstance(data,dict):
        if data.get(name): return data[name]
        for v in data.values():
            found=field(v,name)
            if found: return found
    if isinstance(data,list):
        for v in data:
            found=field(v,name)
            if found: return found
    return None

def run(send=False,initialize=False):
    records=submitted_records()
    if initialize:
        if STATE.exists(): raise RuntimeError('Receipts already initialized; refusing to reset history')
        save(STATE,{'enabledAt':dt.datetime.now(TZ).isoformat(),'receipts':{k:{'status':'pre-existing','sourceMessageId':v['sourceMessageId']} for k,v in records.items()}})
        return {'initialized':True,'preExistingSubmissions':len(records),'message':TEXT}
    if not STATE.exists(): raise RuntimeError('Initialize receipt history explicitly before sending')
    state=json.loads(STATE.read_text(encoding='utf-8'))
    result={'eligible':0,'sent':0,'awaitingConfirmation':0,'needsAttention':[],'message':TEXT}
    for key,item in records.items():
        entry=state['receipts'].get(key,{})
        if entry.get('status') in ('pre-existing','sent'): continue
        verify_saved(item)
        result['eligible']+=1
        if not send: continue
        task=entry.get('openTaskId')
        if not task:
            attempted=entry.get('attemptedAt')
            now=dt.datetime.now(TZ)
            if attempted and now-dt.datetime.fromisoformat(attempted)>dt.timedelta(hours=23):
                result['needsAttention'].append({'studentKey':item['studentKey'],'reason':'Uncertain send is outside safe retry window; inspect chat before resending'})
                continue
            text=entry.get('text') or receipt_text(item)
            entry={**entry,'status':'sending','attemptedAt':attempted or now.isoformat(),'sourceMessageId':item['sourceMessageId'],'senderId':item['senderId'],'idempotencyKey':'submission-'+key,'text':text}
            state['receipts'][key]=entry
            save(STATE,state)
            # Stable recipient comes from the successfully committed source message.
            response=cli(['chat','message','send','--open-dingtalk-id',item['senderId'],'--content',text,'--ai-tag=true','--idempotency-key',entry['idempotencyKey'],'--yes'])
            task=field(response,'openTaskId')
            if not task:
                raise RuntimeError('Send response lacks openTaskId; inspect response and chat before any retry')
            entry['openTaskId']=task
            entry['status']='awaiting-confirmation'
            save(STATE,state)
        status=cli(['chat','message','query-send-status','--open-task-id',str(task)])
        message_id=field(status,'openMessageId')
        conversation_id=field(status,'openConversationId')
        if message_id and conversation_id:
            confirmed_at=dt.datetime.now(TZ).isoformat()
            entry.update({'status':'sent','openMessageId':message_id,'openConversationId':conversation_id,'confirmedAt':confirmed_at})
            mark_confirmation(item['studentKey'],item['assignment'],confirmed_at,item.get('sourceMessageId'))
            result['sent']+=1
        else:
            result['awaitingConfirmation']+=1
        save(STATE,state)
    return result

if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--send',action='store_true')
    parser.add_argument('--initialize',action='store_true')
    args=parser.parse_args()
    if args.send and args.initialize: parser.error('Initialize and send are separate operations')
    lock=ROOT/'state/receipts.lock'
    handle=os.open(lock,os.O_CREAT|os.O_EXCL|os.O_WRONLY)
    try:
        print(json.dumps(run(send=args.send,initialize=args.initialize),ensure_ascii=True))
    finally:
        os.close(handle);lock.unlink()
