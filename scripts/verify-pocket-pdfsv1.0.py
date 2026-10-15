"""Compare card text, page count and embedded Unicode font in each PDF."""
from pathlib import Path
import json,re,sys
try:from pypdf import PdfReader
except ImportError:
 for package_dir in (Path.home()/'.cache/codex-runtimes/codex-primary-runtime/dependencies/python/lib').glob('python*/site-packages'):sys.path.insert(0,str(package_dir))
 from pypdf import PdfReader
ROOT=Path(__file__).resolve().parents[1];D=json.loads((ROOT/'data/clinical-pockets.json').read_text())
normalize=lambda text:re.sub(r'\s+','',text)
for lang,index in [('zh',0),('en',1)]:
 reader=PdfReader(ROOT/f'docs/pocket-cards/trauma-pocket-cards-{lang}.pdf');assert len(reader.pages)==len(D['cards'])
 for card,page in zip(D['cards'],reader.pages):
  text=normalize(page.extract_text() or '')
  for value in [card['title'],card['scope'],*card['rows'],card['footer']]:assert normalize(value[index]) in text,f'{lang} {card["id"]}: text mismatch'
  fonts=page['/Resources']['/Font'].get_object()
  assert any('/FontFile2' in font.get_object().get('/FontDescriptor',{}).get_object() for font in fonts.values() if '/FontDescriptor' in font.get_object()),f'{lang} {card["id"]}: embedded font missing'
 print(lang,len(reader.pages),'pages: card text and font verified')
