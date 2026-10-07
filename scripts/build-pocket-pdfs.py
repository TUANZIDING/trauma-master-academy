"""One pocket per page; Chinese and English are separate editable-source editions."""
import json
from pathlib import Path
from xml.sax.saxutils import escape
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / 'data/clinical-pockets.json').read_text())
OUT = ROOT / 'docs/pocket-cards'
OUT.mkdir(parents=True, exist_ok=True)
FONT = '/System/Library/Fonts/Supplemental/Arial Unicode.ttf'
pdfmetrics.registerFont(TTFont('PocketUnicode', FONT))
W, H = 419.53, 595.28  # A5 portrait
TEAL, INK, MUTED, RED = map(HexColor, ['#0d5156', '#172e32', '#4b6067', '#a32129'])

def build(lang):
    filename = OUT / f'trauma-pocket-cards-{lang}.pdf'
    c = canvas.Canvas(str(filename), pagesize=(W, H), pageCompression=1)
    c.setTitle('TraumaMaster Academy — pocket cards — ' + lang)
    c.setAuthor('TraumaMaster Academy')
    c.setSubject('Source-qualified teaching recall; clinical signoff unsigned; 2026-10-08')
    li = 0 if lang == 'zh' else 1
    for number, card in enumerate(DATA['cards'], 1):
        c.setFillColor(TEAL); c.rect(0, H-44, W, 44, fill=1, stroke=0)
        c.setFillColor(HexColor('#ffffff')); c.setFont('PocketUnicode', 10)
        c.drawString(25, H-27, 'TraumaMaster Academy  /  2026-10-08')
        y = H-68
        def para(text, size=11, color=INK, gap=9):
            nonlocal y
            style = ParagraphStyle('p',fontName='PocketUnicode',fontSize=size,leading=size*1.5,
                                   textColor=color,wordWrap='CJK' if lang=='zh' else None)
            p = Paragraph(escape(text), style)
            _, height = p.wrap(W-50, H)
            p.drawOn(c,25,y-height);y-=height+gap
        para(card['title'][li], 18, TEAL, 14)
        para(card['scope'][li], 9, MUTED, 12)
        for i,row in enumerate(card['rows']):
            c.setStrokeColor(HexColor('#ccd8dc'));c.setLineWidth(.5);c.line(25,y,W-25,y);y-=10
            color = RED if i==0 and card['axis'] in ['x','c'] else TEAL if i==0 else INK
            para(row[li], 12 if i==0 else 10.5, color, 10)
        for claim_id in card['claimIds']:
            cl=next(x for x in DATA['claims'] if x['id']==claim_id)
            para(cl['comparisonNote'][li], 8, MUTED, 8)
        for source_id in card['references']:
            s=DATA['sources'][source_id]
            before=y
            para(s['title'][li], 7.5, TEAL, 3)
            c.linkURL(s['url'],(25,y,W-25,before),relative=0,thickness=0)
        if y<62:
            raise RuntimeError(f'Pocket overflow: {lang} {card["id"]} y={y:.1f}')
        c.setFont('PocketUnicode',7.5);c.setFillColor(MUTED)
        line='以本院为准 · 来源核对：Codex辅助；临床审核人/日期：未签署' if lang=='zh' else 'Local policy applies. Source check: Codex-assisted; clinical reviewer/date: unsigned.'
        c.drawString(25,43,line)
        c.drawString(25,29,'医学教育与监督下训练' if lang=='zh' else 'Medical education and supervised training')
        c.drawRightString(W-25,29,f'{number}/{len(DATA["cards"])}')
        c.showPage()
    c.save()
    print(filename.name, len(DATA['cards']), 'pages')
for language in ['zh','en']:
    build(language)
