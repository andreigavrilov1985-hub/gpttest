"""Extract raw Notion page markdown from saved Notion-fetch tool results (JSONL logs).

Usage: python3 tools/extract_notion_raw.py OUT_DIR LOG.jsonl [...]
Writes OUT_DIR/<page-id>.md with the exact <content> of each fetched page
and OUT_DIR/index.json (id -> title, last edited). Text is copied byte-for-byte.
"""
import json
import os
import re
import sys

out = sys.argv[1]
os.makedirs(out, exist_ok=True)
found = {}


def handle(text):
    try:
        d = json.loads(text)
    except Exception:
        return
    if not isinstance(d, dict) or 'text' not in d or 'url' not in d:
        return
    m = re.search(r'/p/([0-9a-f]{32})', str(d['url']))
    c = re.search(r'<content>\n(.*)\n</content>', str(d['text']), re.S)
    if not m or not c:
        return
    pid = m.group(1)
    with open(os.path.join(out, pid + '.md'), 'w', encoding='utf-8') as f:
        f.write(c.group(1))
    found[pid] = {'title': d.get('title'), 'last_edited': d.get('page_last_edited_at')}


def walk(o):
    if isinstance(o, dict):
        if o.get('type') == 'tool_result':
            cc = o.get('content')
            if isinstance(cc, str):
                handle(cc)
            elif isinstance(cc, list):
                for x in cc:
                    if isinstance(x, dict) and x.get('type') == 'text':
                        handle(x.get('text', ''))
        for v in o.values():
            walk(v)
    elif isinstance(o, list):
        for v in o:
            walk(v)


for p in sys.argv[2:]:
    with open(p, encoding='utf-8') as f:
        for line in f:
            try:
                walk(json.loads(line))
            except Exception:
                pass

ip = os.path.join(out, 'index.json')
idx = json.load(open(ip, encoding='utf-8')) if os.path.exists(ip) else {}
idx.update(found)
json.dump(idx, open(ip, 'w', encoding='utf-8'), ensure_ascii=False, indent=1, sort_keys=True)
print(len(found), 'pages extracted;', len(idx), 'in index')
