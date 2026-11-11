import json, re, subprocess, html
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import MSO_ANCHOR

src = open('script.js', encoding='utf-8').read()
m = re.search(r'var confessionSections = (\[.*?\n      \]);', src, re.S)
secs = json.loads(subprocess.check_output(['node', '-e', "console.log(JSON.stringify(" + m.group(1) + "))"]))
clean = lambda s: html.unescape(re.sub(r'<[^>]+>', '', s))

C = lambda h: RGBColor.from_string(h)
NAVY, INK, MUTED, ACCENT, SOFT, RULE, CODE_FG, CODE_CM = C('0F172A'), C('111827'), C('6B7280'), C('2563EB'), C('F3F4F6'), C('E5E7EB'), C('E5E7EB'), C('64748B')

p = Presentation(); p.slide_width, p.slide_height = Inches(13.333), Inches(7.5)
n = [0]

def rect(s, x, y, w, h, fill):
    r = s.shapes.add_shape(1, Inches(x), Inches(y), Inches(w), Inches(h))
    r.fill.solid(); r.fill.fore_color.rgb = fill; r.line.fill.background(); r.shadow.inherit = False
    return r

def text(s, x, y, w, h, t, size, color=INK, bold=False, font='Calibri', anchor=None):
    tb = s.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h)); tf = tb.text_frame
    tf.word_wrap = True
    if anchor: tf.vertical_anchor = anchor
    r = tf.paragraphs[0].add_run(); r.text = t
    r.font.size, r.font.bold, r.font.name, r.font.color.rgb = Pt(size), bold, font, color
    return tf

def slide(bg=None):
    s = p.slides.add_slide(p.slide_layouts[6]); n[0] += 1
    if bg: rect(s, 0, 0, 13.333, 7.5, bg)
    return s

def footer(s, dark=False):
    c = CODE_CM if dark else MUTED
    text(s, .8, 6.95, 6, .3, 'State and Effect', 11, c)
    text(s, 11.5, 6.95, 1.03, .3, str(n[0]), 11, c).paragraphs[0].alignment = 3

def header(s, num, label, title, sub=None):
    text(s, .8, .55, 8, .35, label.upper(), 12, ACCENT, True)
    text(s, .8, .9, 10.5, .8, title, 34, INK, True)
    text(s, 10.3, .45, 2.23, 1.2, num, 66, RULE, True).paragraphs[0].alignment = 3
    if sub: text(s, .8, 1.65, 11.7, .4, sub, 16, MUTED)
    rect(s, .8, 2.2, 11.73, .02, RULE)

# title
s = slide(NAVY)
rect(s, .8, 2.6, .9, .07, ACCENT)
text(s, .8, 2.8, 11.7, 1.3, 'State and Effect', 60, C('FFFFFF'), True)
text(s, .8, 4.1, 11.7, .6, 'React state, re-rendering and useEffect', 22, C('94A3B8'))

# outline
topics = {}
for x in secs: topics.setdefault(x['topicBadge'].split('\u2022')[1].strip(), []).append(x)
s = slide(); text(s, .8, .55, 8, .35, 'OUTLINE', 12, ACCENT, True); text(s, .8, .9, 10, .8, 'Three topics', 34, INK, True)
rect(s, .8, 2.2, 11.73, .02, RULE)
for i, (t, items) in enumerate(topics.items()):
    x0 = .8 + i * 4.0
    text(s, x0, 2.5, 3.6, .9, str(i + 1), 54, RULE, True)
    text(s, x0, 3.5, 3.6, .5, t, 20, INK, True)
    tf = text(s, x0, 4.1, 3.6, 2, items[0]['secNum'] + '  ' + items[0]['title'], 14, MUTED)
    for it in items[1:]:
        r = tf.add_paragraph().add_run(); r.text = it['secNum'] + '  ' + it['title']
        r.font.size, r.font.color.rgb, r.font.name = Pt(14), MUTED, 'Calibri'
        tf.paragraphs[-1].space_before = Pt(6)
footer(s)

for x in secs:
    label = x['topicBadge'].split('\u2022')[1].strip()
    s = slide(); header(s, x['secNum'], label, x['title'], x['subtitle'])
    rect(s, .8, 2.5, .06, 1.25, ACCENT)
    text(s, 1.1, 2.45, 11.4, 1.3, clean(x['definition']), 19, INK, anchor=MSO_ANCHOR.MIDDLE)
    text(s, .8, 3.95, 11.7, 1.2, clean(x['explanation']), 14, MUTED)
    for i, t in enumerate(x['takeaways']):
        head, _, body = clean(t).partition(':')
        cx = .8 + i * 3.95
        rect(s, cx, 5.3, 3.8, 1.45, SOFT)
        text(s, cx + .15, 5.35, 3.5, .35, head.strip(), 13, ACCENT, True)
        text(s, cx + .15, 5.68, 3.5, 1.05, body.strip(), 11.5, INK)
    footer(s)

    s = slide(NAVY)
    text(s, .8, .55, 8, .35, f"{x['secNum']}  {label}".upper(), 12, C('60A5FA'), True)
    text(s, .8, .9, 11, .8, x['codeTitle'], 30, C('FFFFFF'), True, 'Consolas')
    rect(s, .8, 1.85, 11.73, 4.85, C('1E293B'))
    tf = s.shapes.add_textbox(Inches(1.1), Inches(2.05), Inches(11.1), Inches(4.5)).text_frame; tf.word_wrap = True
    for i, line in enumerate(x['code'].split('\n')):
        para = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        code, sep, cm = line.partition('//')
        for part, col in ((code, CODE_FG), (sep + cm, CODE_CM)):
            if part:
                r = para.add_run(); r.text = part
                r.font.size, r.font.name, r.font.color.rgb = Pt(15), 'Consolas', col
    footer(s, True)

p.save('State-and-Effect-Designed.pptx'); print(n[0], 'slides')
