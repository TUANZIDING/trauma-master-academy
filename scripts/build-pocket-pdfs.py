"""Generate one source-qualified card per A5 page, in separate languages."""
import json,sys
from pathlib import Path
from xml.sax.saxutils import escape
try:
 import reportlab
except ImportError:
 for package_dir in (Path.home()/'.cache/codex-runtimes/codex-primary-runtime/dependencies/python/lib').glob('python*/site-packages'):
  sys.path.insert(0,str(package_dir))
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
ROOT=Path(__file__).resolve().parents[1]
DATA=json.loads((ROOT/'data/clinical-pockets.json').read_text());OUT=ROOT/'docs/pocket-cards';OUT.mkdir(parents=True,exist_ok=True)
fonts=[Path('/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc'),Path('/usr/share/fonts/noto-cjk/NotoSansCJK-Regular.ttc'),Path('/System/Library/Fonts/Supplemental/Arial Unicode.ttf')]
for font in fonts:
 if font.is_file():
  try:pdfmetrics.registerFont(TTFont('PocketUnicode',str(font)));break
  except Exception:continue
else:raise SystemExit('No usable Unicode font found; install a listed font with supported outlines.')
W,H=419.53,595.28
TEAL,INK,MUTED,RED=map(HexColor,['#0d5156','#172e32','#4b6067','#a32129'])
def build(lang):
 c=canvas.Canvas(str(OUT/f'trauma-pocket-cards-{lang}.pdf'),pagesize=(W,H),pageCompression=1)
 c.setTitle('TraumaMaster Academy pocket cards '+lang);c.setAuthor('TraumaMaster Academy');c.setSubject('Source-qualified teaching recall; clinical review ongoing; '+DATA['version'])
 li=0 if lang=='zh' else 1
 for number,card in enumerate(DATA['cards'],1):
  specs=[(card['title'][li],18,TEAL,12),(card['scope'][li],9,MUTED,10)]
  for i,row in enumerate(card['rows']):specs.append((row[li],12 if i==0 else 10.5,RED if i==0 and card['axis'] in ['x','c'] else TEAL if i==0 else INK,10))
  for claim_id in card['claimIds']:
   claim=next(cl for cl in DATA['claims'] if cl['id']==claim_id);specs.append((claim['comparisonNote'][li],8,MUTED,7))
  for source_id in card['references']:
   source=DATA['sources'][source_id];specs.append((source.get('shortTitle',source['title'])[li],7.5,TEAL,3))
  for scale in [1,.95,.9,.85]:
   paragraphs=[];height=0
   for text,size,color,gap in specs:
    st=ParagraphStyle('p',fontName='PocketUnicode',fontSize=size*scale,leading=size*scale*1.5,textColor=color,wordWrap='CJK' if li==0 else None)
    paragraph=Paragraph(escape(text),st);_,ph=paragraph.wrap(W-50,H);paragraphs.append((paragraph,ph,gap));height+=ph+gap
   if H-70-height>=62:break
  else:raise RuntimeError(f'Pocket overflow: {lang} {card["id"]}')
  c.setFillColor(TEAL);c.rect(0,H-44,W,44,fill=1,stroke=0);c.setFillColor(HexColor('#ffffff'));c.setFont('PocketUnicode',10);c.drawString(25,H-27,'TraumaMaster Academy / '+DATA['version'])
  y=H-70
  for i,(paragraph,ph,gap) in enumerate(paragraphs):
   before=y;paragraph.drawOn(c,25,y-ph);y-=ph+gap
   if i>=len(paragraphs)-len(card['references']):
    source_id=card['references'][i-(len(paragraphs)-len(card['references']))];c.linkURL(DATA['sources'][source_id]['url'],(25,y,W-25,before),relative=0,thickness=0)
  c.setFont('PocketUnicode',7.5);c.setFillColor(MUTED);c.drawString(25,43,'以本院规范为准 · 医学教育与监督下训练' if li==0 else 'Follow institutional policy. Medical education and supervised training.')
  c.drawString(25,29,'临床审核进行中' if li==0 and number==1 else 'Clinical review ongoing' if li==1 and number==1 else '')
  c.drawRightString(W-25,29,f'{number}/{len(DATA["cards"])}');c.showPage()
 c.save();print(lang,len(DATA['cards']),'pages')
for lang in ['zh','en']:build(lang)
