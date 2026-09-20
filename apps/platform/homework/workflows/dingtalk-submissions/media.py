"""Download only image evidence from the pending student submission batch."""
import hashlib
import json
import re
from fetch import CONFIG, ROOT, cli, save

batch = json.loads((ROOT / 'state' / 'pending.json').read_text(encoding='utf-8'))
results = []
for message in batch['messages']:
    # Only verified candidates in this automation's S3.3/S3.4 roster may have
    # evidence downloaded. Unknown and S3.6 identities remain pending.
    candidates = message.get('candidates', [])
    if len(candidates) != 1 or candidates[0].get('class') not in set(CONFIG.get('classes', [])):
        continue
    resource_ids = [r['resourceId'] for r in message['resources'] if r.get('resourceType') == 'image' and r.get('resourceId')]
    if not resource_ids:
        resource_ids = re.findall(r'mediaId=([^\)]+)', message['text'])
    for index, resource in enumerate(resource_ids):
        path = ROOT / 'state' / 'media' / (hashlib.sha256(message['messageId'].encode()).hexdigest()[:16] + f'-{index}.jpg')
        path.parent.mkdir(parents=True, exist_ok=True)
        if not path.exists():
            cli(['chat', 'message', 'download-media', '--type', 'mediaId', '--resource-id', resource, '--message-id', message['messageId'], '--open-conversation-id', message['conversationId'], '--output', str(path)])
        results.append({'messageId': message['messageId'], 'sender': message['sender'], 'path': str(path)})
save(ROOT / 'state' / 'media.json', results)
print(json.dumps(results, ensure_ascii=True))
