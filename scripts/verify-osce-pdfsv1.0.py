from pathlib import Path
import sys,json
try:from pypdf import PdfReader
except ModuleNotFoundError:
 sys.path.insert(0,str(Path.home()/'.cache/codex-runtimes/codex-primary-runtime/dependencies/python/lib/python3.12/site-packages'))
 from pypdf import PdfReader
ROOT=Path(__file__).resolve().parents[1]
DATA=json.loads((ROOT/'data/skill-standardsv1.0.json').read_text())
norm=lambda s:''.join(s.split()).replace('□','')
for lang,col in [('zh',0),('en',1)]:
 file=ROOT/('output/pdf/trauma-skills-osce-zh.pdf' if col==0 else 'output/pdf/trauma-skills-osce-env1.0.pdf')
 pages=PdfReader(file).pages;assert len(pages)==len(DATA)==9
 scale='0 未做/不安全；1 提示后完成；2 独立完成；满分10；关键失败否决。' if col==0 else '0 omitted/unsafe;1 prompted;2 independent;total10;critical failure overrides.'
 for page,s in zip(pages,DATA.values()):
  text=norm(page.extract_text());assert norm(s['title'][col]) in text
  assert all(norm(row[col]) in text for row in s['criteria']);assert norm(s['critical'][col]) in text;assert norm(scale) in text;assert '/10' in text
 print(lang,'9 OSCE pages:45 behaviors,scale and critical failures verified')
