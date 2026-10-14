from pathlib import Path
import sys,json,html
try:from reportlab.pdfgen import canvas
except ModuleNotFoundError:
 sys.path.insert(0,str(Path.home()/'.cache/codex-runtimes/codex-primary-runtime/dependencies/python/lib/python3.12/site-packages'))
 from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from pypdf import PdfReader
ROOT=Path(__file__).resolve().parents[1]
DATA=json.loads((ROOT/'data/skill-standardsv1.0.json').read_text())
LEDGER=json.loads((ROOT/'data/clinical-pockets.json').read_text())
SOURCES=LEDGER['sources']
fonts=[Path('/System/Library/Fonts/Supplemental/Arial Unicode.ttf'),Path('/Library/Fonts/Arial Unicode.ttf')]
font=next((p for p in fonts if p.exists()),None)
if not font:raise RuntimeError('Unicode font unavailable; OSCE build not completed')
pdfmetrics.registerFont(TTFont('OSCEUnicode',str(font)))
for lang,col in [('zh',0),('en',1)]:
 file=ROOT/('output/pdf/trauma-skills-osce-zh.pdf' if lang=='zh' else 'output/pdf/trauma-skills-osce-env1.0.pdf');file.parent.mkdir(parents=True,exist_ok=True)
 c=canvas.Canvas(str(file),pagesize=(595,842),pageCompression=1,invariant=1);c.setTitle('Trauma skills OSCE '+LEDGER['version']+' '+lang)
 def para(text,y,size=11,width=515):
  style=ParagraphStyle('osce',fontName='OSCEUnicode',fontSize=size,leading=size*1.45,textColor=HexColor('#173d42'))
  p=Paragraph(html.escape(text),style);_,h=p.wrap(width,700);p.drawOn(c,40,y-h);return y-h
 for id,s in DATA.items():
  y=800;y=para(s['title'][col]+' · OSCE',y,18)-14
  y=para(('学员：____________  教师：____________  日期：____________' if col==0 else 'Learner:____________  Instructor:____________  Date:____________'),y)-10
  y=para(('模拟限时：' if col==0 else 'Simulation limit: ')+str(s['timeLimitSeconds'])+' s · '+s['model'][col],y)-14
  scale='0 未做/不安全；1 提示后完成；2 独立完成；满分10；关键失败否决。' if col==0 else '0 omitted/unsafe;1 prompted;2 independent;total10;critical failure overrides.'
  y=para(scale,y)-15
  for i,criterion in enumerate(s['criteria']):
   y=para(str(i+1)+'. '+criterion[col],y,11)-5
   y=para('□0  □1  □2     '+('行为证据：____________________________________' if col==0 else 'Observed evidence:____________________________________'),y,10)-18
  y=para(('合计：____ / 10   关键失败：' if col==0 else 'Total:____ / 10   Critical failure: ')+s['critical'][col],y)-16
  y=para(('反馈与下一轮改进：________________________________' if col==0 else 'Feedback / next improvement:________________________________'),y)-18
  y=para(('来源：' if col==0 else 'Sources: ')+', '.join(SOURCES[id].get('shortTitle',SOURCES[id]['title'])[col] for id in s['references']),y,9)-10
  y=para('以本院规范为准；监督下模型训练，评分不替代真实操作授权。' if col==0 else 'Follow institutional policy; supervised trainer practice. Scores do not authorize real procedures.',y,9)
  if y<40:raise RuntimeError('OSCE page overflow: '+id+' '+lang)
  c.showPage()
 c.save()
 reader=PdfReader(file);assert len(reader.pages)==9
 norm=lambda s:''.join(s.split()).replace('□','')
 for page,s in zip(reader.pages,DATA.values()):
  text=norm(page.extract_text());assert all(norm(row[col]) in text for row in s['criteria']);assert norm(s['critical'][col]) in text;assert norm(scale) in text;assert '/10' in text
 print(lang,'9 OSCE pages,45 criteria/scale/critical-failure text verified')
