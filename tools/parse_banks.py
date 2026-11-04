"""Parse the 25 Notion question-bank pages (notion-raw/*.md) into data/*.json.

Usage: python3 tools/parse_banks.py
Outputs:
  data/<subject>-island<N>.json   one file per subject and island
  data/index.json                 list of banks with counts
  reports/parser-report.md        table per page + list of errors (must be empty)

Question and option text is never rewritten: only the surrounding markup
(list dashes, the letter, the ✅ mark, the "Почему:" label) is removed.
The correct answer is stored as an index into `options`, not as a letter.
"""
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, 'notion-raw')
DATA = os.path.join(ROOT, 'data')
REPORTS = os.path.join(ROOT, 'reports')

SUBJECTS = {
    'math': ('Математика', ['40ecfa33-bed4-81c4-8493-c258c60fb073', '40ecfa33-bed4-8133-8f1b-e4aa1d3233d3',
                            '40ecfa33-bed4-812d-ba28-cc39d0752cae', '40ecfa33-bed4-815c-b682-c0d2a3935ace',
                            '40ecfa33-bed4-817d-b17e-d52c170174f9']),
    'english': ('Английский', ['40ecfa33-bed4-81e0-b7b6-e542933179b1', '40ecfa33-bed4-8140-890b-c5c5221cf16d',
                               '40ecfa33-bed4-81ec-9271-f45f49130c2d', '40ecfa33-bed4-81df-9962-e4a5f9c28974',
                               '40ecfa33-bed4-812f-9f75-f3d6502f32ef']),
    'science': ('Наука', ['40ecfa33-bed4-81fe-81cf-fc7f85d419d7', '40ecfa33-bed4-8165-af4c-c14c5d39e1cb',
                          '40ecfa33-bed4-8180-9860-f2387d096e42', '40ecfa33-bed4-8194-a43d-fcbcff73b534',
                          '40ecfa33-bed4-817e-807c-ee285fdaa1eb']),
    'geography': ('География', ['40ecfa33-bed4-812a-bc06-f1c8c2469a5b', '40ecfa33-bed4-81e8-a5a4-e05599be0374',
                                '40ecfa33-bed4-81cf-9c84-c7ddf0333c76', '40ecfa33-bed4-81ba-aa16-c3177f0e5c39',
                                '40ecfa33-bed4-81fb-be19-d029b286462f']),
    'logic': ('Логика', ['40ecfa33-bed4-8188-a49e-c8e443ffb483', '40ecfa33-bed4-814b-8c57-e42390c0d53b',
                         '40ecfa33-bed4-811f-9824-c74f549d3f96', '40ecfa33-bed4-811b-bf8e-d7512f3656ea',
                         '40ecfa33-bed4-815d-8c5d-f4302c34d5ab']),
}

CHECK = '✅'
RE_TOPIC = re.compile(r'^##\s+Тема\s+(\d+)\.\s*(.+?)\s*$')
RE_H2 = re.compile(r'^##\s+')
RE_QUESTION = re.compile(r'^(\d+)\.\s+(.*\S)\s*$')
RE_OPTION = re.compile(r'^\s*-\s+([ABC])(?:\)|\s)\s*(.*?)\s*$')
RE_WHY = re.compile(r'^\s*(?:-\s+)?Почему:\s*(.*?)\s*$')
RE_PASSAGE = re.compile(r'^(Text|Аудио)\s+(\d+)\s*:\s*(.*\S)\s*$')
RE_BR = re.compile(r'\s*<br\s*/?>\s*', re.I)
# Lines in the explanation area that are headings for the developer, not content.
RE_DEV_NOTE = re.compile(r'^Как это работает в игре:')
RE_EXPL_LABEL = re.compile(r'^(?:###\s*)?Объяснение для ребёнка\b')


def clean_inline(s):
    """Unescape Notion markdown escapes only (no wording changes)."""
    return re.sub(r'\\([\\~*_`\[\]()#+\-.!<>|$])', r'\1', s).strip()


def parse_page(text, subject, island, errors, notes):
    label = f'{subject} остров {island}'
    lines = text.split('\n')
    topics = []
    topic = None
    q = None
    passage = None
    in_topic = False

    def err(msg):
        errors.append(f'{label}: {msg}')

    def finish_question():
        nonlocal q
        if q is None:
            return
        where = f'тема {topic["n"]}, вопрос {q["n"]}'
        opts = q.pop('_opts')
        if len(opts) != 3:
            err(f'{where}: вариантов {len(opts)}, нужно 3')
        letters = [o[0] for o in opts]
        if letters != ['A', 'B', 'C'][:len(opts)]:
            err(f'{where}: буквы вариантов {letters}')
        marked = [i for i, o in enumerate(opts) if CHECK in o[1]]
        if len(marked) != 1:
            err(f'{where}: отметок ✅ {len(marked)}, нужна 1')
        if not q.get('why'):
            err(f'{where}: нет строки «Почему»')
        q['options'] = [clean_inline(o[1].replace(CHECK, '').strip()) for o in opts]
        if any(not o for o in q['options']):
            err(f'{where}: пустой вариант')
        q['answer'] = marked[0] if len(marked) == 1 else None
        if q.get('_extra'):
            err(f'{where}: лишние строки внутри вопроса: {q["_extra"]}')
        q.pop('_extra', None)
        topic['questions'].append(q)
        q = None

    def finish_topic():
        nonlocal topic, passage
        finish_question()
        if topic is not None:
            topics.append(topic)
        topic = None
        passage = None

    for raw_line in lines:
        line = raw_line.rstrip()
        if RE_H2.match(line):
            finish_topic()
            m = RE_TOPIC.match(line)
            in_topic = bool(m)
            if m:
                topic = {'n': int(m.group(1)), 'title': clean_inline(m.group(2)),
                         'explanation': [], 'questions': [], 'passages': []}
            continue
        if not in_topic or not line.strip():
            continue

        m = RE_PASSAGE.match(line)
        if m:
            finish_question()
            kind = 'listening' if m.group(1) == 'Аудио' else 'reading'
            passage = {'id': f'{kind[0]}{m.group(2)}', 'kind': kind, 'text': clean_inline(m.group(3))}
            topic['passages'].append(passage)
            continue

        m = RE_QUESTION.match(line)
        if m:
            finish_question()
            q = {'n': int(m.group(1)), 'text': clean_inline(m.group(2)), '_opts': [], 'why': None}
            if passage is not None:
                q['passage'] = passage['id']
            continue

        if q is None:
            # explanation area (before the first question of the topic)
            if topic['questions']:
                err(f'тема {topic["n"]}: текст между вопросами не распознан: {line.strip()[:80]}')
                continue
            s = line.strip()
            if RE_EXPL_LABEL.match(s):
                topic['explanation_label'] = clean_inline(s.lstrip('#').strip())
                continue
            s = re.sub(r'^[-*]\s+', '', s)
            s = s.lstrip('#').strip()
            if RE_DEV_NOTE.match(s):
                topic.setdefault('dev_notes', []).append(clean_inline(s))
                continue
            topic['explanation'].append(clean_inline(s))
            continue

        # inside a question
        parts = RE_BR.split(line)
        head = parts[0]
        tail = parts[1:]
        m = RE_OPTION.match(head)
        if m:
            q['_opts'].append([m.group(1), m.group(2)])
        else:
            w = RE_WHY.match(head)
            if w:
                if q['why']:
                    err(f'тема {topic["n"]}, вопрос {q["n"]}: две строки «Почему»')
                q['why'] = clean_inline(w.group(1))
            elif not q['_opts'] and not head.lstrip().startswith('-'):
                # second line of the question text (rare): keep as a line break
                q['text'] += '\n' + clean_inline(head)
            else:
                q.setdefault('_extra', []).append(head.strip()[:60])
        for t in tail:
            w = RE_WHY.match(t)
            if w:
                if q['why']:
                    err(f'тема {topic["n"]}, вопрос {q["n"]}: две строки «Почему»')
                q['why'] = clean_inline(w.group(1))
            elif t.strip():
                q.setdefault('_extra', []).append(t.strip()[:60])
    finish_topic()

    expected_topics = 5 if subject == 'english' else 4
    if len(topics) != expected_topics:
        err(f'тем {len(topics)}, нужно {expected_topics}')
    for i, t in enumerate(topics, 1):
        if t['n'] != i:
            err(f'номер темы {t["n"]} вместо {i}')
        if len(t['questions']) != 10:
            err(f'тема {t["n"]}: вопросов {len(t["questions"])}, нужно 10')
        nums = [x['n'] for x in t['questions']]
        if nums != list(range(1, len(nums) + 1)):
            err(f'тема {t["n"]}: нумерация вопросов {nums}')
        if not t['explanation']:
            err(f'тема {t["n"]}: нет объяснения')
        kinds = {p['kind'] for p in t['passages']}
        t['type'] = 'listening' if 'listening' in kinds else ('reading' if 'reading' in kinds else 'plain')
        if subject == 'english' and t['n'] == 5 and t['type'] != 'listening':
            err('тема 5 английского не содержит текстов «Аудио»')
        if t['type'] == 'listening':
            for x in t['questions']:
                if 'passage' not in x:
                    err(f'тема {t["n"]}, вопрос {x["n"]}: вопрос аудирования без текста «Аудио»')
        # duplicate options inside a question
        for x in t['questions']:
            if len(set(x['options'])) != len(x['options']):
                err(f'тема {t["n"]}, вопрос {x["n"]}: одинаковые варианты')
        # letter distribution, for the notes list
        dist = [0, 0, 0]
        for x in t['questions']:
            if x['answer'] is not None:
                dist[x['answer']] += 1
        t['_dist'] = dist
    return topics


def main():
    os.makedirs(DATA, exist_ok=True)
    os.makedirs(REPORTS, exist_ok=True)
    errors, notes = [], []
    rows = []
    index = []
    total = 0
    meta = json.load(open(os.path.join(RAW, 'index.json'), encoding='utf-8'))
    for subject, (subject_ru, ids) in SUBJECTS.items():
        for island, pid in enumerate(ids, 1):
            key = pid.replace('-', '')
            path = os.path.join(RAW, key + '.md')
            if not os.path.exists(path):
                errors.append(f'{subject} остров {island}: нет файла {path}')
                continue
            text = open(path, encoding='utf-8').read()
            before = len(errors)
            topics = parse_page(text, subject, island, errors, notes)
            n = sum(len(t['questions']) for t in topics)
            total += n
            title = meta.get(key, {}).get('title', '')
            m = re.search(r'остров\s+(\d+)', title or '')
            if not m or int(m.group(1)) != island:
                errors.append(f'{subject} остров {island}: заголовок страницы не совпадает: {title}')
            dist = [sum(t['_dist'][i] for t in topics) for i in range(3)]
            for t in topics:
                t.pop('_dist', None)
            bank = {
                'subject': subject, 'subjectName': subject_ru, 'island': island,
                'source': {'notionPageId': pid, 'title': title,
                           'lastEdited': meta.get(key, {}).get('last_edited')},
                'topics': [{
                    'id': f'{subject}-{island}-{t["n"]}', 'n': t['n'], 'title': t['title'],
                    'type': t['type'],
                    'explanationLabel': t.get('explanation_label', ''),
                    'explanation': t['explanation'],
                    **({'devNotes': t['dev_notes']} if t.get('dev_notes') else {}),
                    'passages': t['passages'],
                    'questions': [{
                        'id': f'{subject}-{island}-{t["n"]}-{x["n"]}', 'n': x['n'], 'text': x['text'],
                        **({'passage': x['passage']} if 'passage' in x else {}),
                        'options': x['options'], 'answer': x['answer'], 'why': x['why'],
                    } for x in t['questions']],
                } for t in topics],
            }
            fn = f'{subject}-island{island}.json'
            with open(os.path.join(DATA, fn), 'w', encoding='utf-8') as f:
                json.dump(bank, f, ensure_ascii=False, indent=1)
            index.append({'file': fn, 'subject': subject, 'island': island, 'topics': len(topics),
                          'questions': n})
            rows.append((subject_ru, island, title, len(topics), n, dist, len(errors) - before))

    with open(os.path.join(DATA, 'index.json'), 'w', encoding='utf-8') as f:
        json.dump({'total': total, 'banks': index}, f, ensure_ascii=False, indent=1)

    out = ['# Отчёт парсера банков вопросов', '',
           'Генерируется `python3 tools/parse_banks.py` из `notion-raw/*.md`.', '',
           '| Предмет | Остров | Тем | Вопросов | Правильный A/B/C | Ошибок |',
           '|---|---|---|---|---|---|']
    for s, i, title, nt, n, dist, ne in rows:
        out.append(f'| {s} | {i} | {nt} | {n} | {dist[0]}/{dist[1]}/{dist[2]} | {ne} |')
    out += ['', f'**Итого вопросов: {total}** (ожидается 1050). Страниц: {len(rows)} из 25.', '',
            '## Ошибки', '']
    out += [f'- {e}' for e in errors] or ['Нет.']
    with open(os.path.join(REPORTS, 'parser-report.md'), 'w', encoding='utf-8') as f:
        f.write('\n'.join(out) + '\n')
    print('\n'.join(out))
    ok = total == 1050 and not errors and len(rows) == 25
    sys.exit(0 if ok else 1)


if __name__ == '__main__':
    main()
