"""Download only image evidence from the pending student submission batch."""
import hashlib
import json
import re
import urllib.request
from fetch import ROOT, cli, save


def download_url(envelope):
    """On this CLI version download-media returns a signed downloadUrl (1h
    expiry) inside a compat envelope instead of saving the file itself."""
    node = envelope
    for key in ('response', 'content', 'result'):
        if not isinstance(node, dict):
            return None
        node = node.get(key)
    if isinstance(node, dict):
        url = node.get('downloadUrl')
        # Only URLs from the parsed envelope, never from message text.
        if isinstance(url, str) and url.startswith(('http://', 'https://', 'file://')):
            return url
    return None


def download(url, path):
    with urllib.request.urlopen(url, timeout=120) as response:
        data = response.read()
    tmp = path.with_suffix(path.suffix + '.tmp')
    tmp.write_bytes(data)
    tmp.replace(path)


batch = json.loads((ROOT / 'state' / 'pending.json').read_text(encoding='utf-8'))
results = []
for message in batch['messages']:
    resource_ids = [r['resourceId'] for r in message['resources'] if r.get('resourceType') == 'image' and r.get('resourceId')]
    if not resource_ids:
        resource_ids = re.findall(r'mediaId=([^\)]+)', message['text'])
    for index, resource in enumerate(resource_ids):
        path = ROOT / 'state' / 'media' / (hashlib.sha256(message['messageId'].encode()).hexdigest()[:16] + f'-{index}.jpg')
        path.parent.mkdir(parents=True, exist_ok=True)
        if not path.exists():
            response = cli(['chat', 'message', 'download-media', '--type', 'mediaId', '--resource-id', resource, '--message-id', message['messageId'], '--open-conversation-id', message['conversationId'], '--output', str(path)])
            url = download_url(response)
            if url:
                download(url, path)
            if not path.exists():
                raise RuntimeError(f'download-media neither saved {path.name} nor returned a downloadUrl')
        results.append({'messageId': message['messageId'], 'sender': message['sender'], 'path': str(path)})
save(ROOT / 'state' / 'media.json', results)
print(json.dumps(results, ensure_ascii=True))
