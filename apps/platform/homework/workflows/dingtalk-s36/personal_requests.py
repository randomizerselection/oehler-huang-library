"""Read-only S3.6 personal-request attention report.

The raw archive state/personal-replies.json covers all private chats; triage
and the native DingTalk grouping belong to the Codex automation and are never
touched here. This reporter only surfaces unanswered personal messages from
platform-linked S3.6 students in state/personal-attention.json. It never
sends, answers, or files anything.
"""
import argparse
import datetime as dt
import json
import sys
from fetch import ROOT, CONFIG, TZ, save
from platform_db import roster as platform_roster
import reply_queue

STATE = ROOT / 'state' / 'personal-attention.json'


def excerpt_of(message):
    text = message.get('content') or message.get('text') or ''
    # Hide opaque media download parameters, as reply_queue.render does.
    if text.startswith('[图片消息]'):
        text = '[Image attachment — see the original DingTalk chat]'
    elif ' fileId:' in text:
        text = text.split(' fileId:')[0]
    return text[:200]


def load_previous():
    return json.loads(STATE.read_text(encoding='utf-8')) if STATE.exists() else {'items': {}}


def current_items():
    archive = reply_queue.load_state()
    students = platform_roster()
    linked = {s['dingtalkId'] for s in students if s.get('dingtalkId')}
    automated = reply_queue.automated_ids()
    self_id = CONFIG['selfOpenDingTalkId']
    items = {}
    for cid, conversation in archive['conversations'].items():
        messages = list(conversation.get('messages', {}).values())
        incoming = [m for m in messages
                    if m.get('senderOpenDingTalkId') != self_id
                    and m.get('senderOpenDingTalkId') in linked
                    and (m.get('openMessageId') or m.get('messageId')) not in automated]
        if not incoming:
            continue
        latest = max(incoming, key=lambda m: m.get('createTime', ''))
        latest_id = latest.get('openMessageId') or latest.get('messageId')
        answered = any(
            m.get('senderOpenDingTalkId') == self_id
            and not m.get('messageAiSendFlag')
            and (m.get('openMessageId') or m.get('messageId')) not in automated
            and m.get('createTime', '') > latest.get('createTime', '')
            for m in messages)
        items[reply_queue.key(cid, latest_id)] = {
            'conversationId': cid,
            'messageId': latest_id,
            'title': conversation.get('title', ''),
            'createTime': latest.get('createTime', ''),
            'excerpt': excerpt_of(latest),
            'status': 'closed' if answered else 'open',
        }
    return items


def report():
    previous = load_previous().get('items', {})
    previous_by_conversation = {item['conversationId']: (item_key, item) for item_key, item in previous.items()}
    now_iso = dt.datetime.now(TZ).isoformat()
    items, new, changed = {}, [], []
    for item_key, item in current_items().items():
        old_key, old = previous_by_conversation.get(item['conversationId'], (None, None))
        if old is None:
            item.update({'firstSeenAt': now_iso, 'lastSeenAt': now_iso})
            new.append(item)
        elif old_key != item_key:
            # The conversation moved to a newer latest message: materially changed.
            item.update({'firstSeenAt': old.get('firstSeenAt', now_iso), 'lastSeenAt': now_iso})
            changed.append(item)
        else:
            item.update({'firstSeenAt': old.get('firstSeenAt', now_iso), 'lastSeenAt': now_iso})
            if old.get('status') != item['status']:
                changed.append(item)
        items[item_key] = item
    save(STATE, {'updatedAt': now_iso, 'items': items})
    summary = {'new': new, 'changed': changed,
               'openCount': sum(item['status'] == 'open' for item in items.values())}
    print(json.dumps(summary, ensure_ascii=False))
    return summary


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('command', choices=['report'])
    args = parser.parse_args()
    if args.command == 'report':
        report()


if __name__ == '__main__':
    main()
