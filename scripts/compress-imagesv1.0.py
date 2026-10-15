"""Convert large published bitmaps to responsive WebP; retain source attribution."""
from pathlib import Path
import sys,json,hashlib,csv,re
try:from PIL import Image,ImageOps
except ImportError:
 for p in (Path.home()/'.cache/codex-runtimes/codex-primary-runtime/dependencies/python/lib').glob('python*/site-packages'):sys.path.insert(0,str(p))
 from PIL import Image,ImageOps
root=Path(__file__).resolve().parents[1];dest=root/'data/image-variantsv1.0.json';manifest=json.loads(dest.read_text()) if dest.exists() else {'version':'2026-10-15','quality':80,'variants':{},'converted':[]}
mapping={};before=after=0
for p in sorted([*(root/'assets').rglob('*'),*(root/'orthopaedics/assets').rglob('*')]):
 if not p.is_file() or p.suffix.lower() not in ['.png','.jpg','.jpeg','.gif'] or p.stat().st_size<=500000:continue
 original=p.relative_to(root).as_posix();before+=p.stat().st_size;oldsha=hashlib.sha256(p.read_bytes()).hexdigest()
 im=ImageOps.exif_transpose(Image.open(p));im=im.convert('RGBA' if im.mode=='RGBA' else 'RGB');variants=[]
 for width in [800,1600]:
  size=im.copy();size.thumbnail((width,width),Image.Resampling.LANCZOS);out=p.with_name(p.stem.replace('_','-')+'-'+str(width)+'v1.0.webp');size.save(out,'WEBP',quality=80,method=6);after+=out.stat().st_size
  if out.stat().st_size>600000:raise SystemExit('WebP still exceeds 600 KB: '+str(out.relative_to(root)))
  variants.append({'path':out.relative_to(root).as_posix(),'width':size.width,'height':size.height,'bytes':out.stat().st_size,'sha256':hashlib.sha256(out.read_bytes()).hexdigest()})
 mapping[original]=variants[0]['path'];manifest['variants'][variants[0]['path']]={'small':variants[0],'large':variants[1]};manifest['converted'].append({'original':original,'originalSha256':oldsha,'originalBytes':p.stat().st_size,'variants':variants})
# Rewrite only repository-local path strings; remote copyright/source URLs are unchanged.
for p in root.rglob('*'):
 if any(x in ['.git','node_modules','.superpowers'] for x in p.parts) or not p.is_file() or p.suffix not in ['.html','.json','.js','.mjs','.css','.md','.py']:continue
 if p==dest or p==Path(__file__):continue
 s=p.read_text();t=s
 for old,new in mapping.items():t=t.replace(old,new)
 # Validators occasionally build a path from separate arguments.
 if p.name=='validate.mjs' and 'assets/xabcde-case-hub.png' in mapping:t=t.replace("'xabcde-case-hub.png'",repr(Path(mapping['assets/xabcde-case-hub.png']).name))
 if s!=t:p.write_text(t)
csvp=root/'sources/core-source-backed/media-sources.csv'
with csvp.open(newline='') as f:reader=csv.DictReader(f);fields=reader.fieldnames;rows=list(reader)
newrows=[]
for row in rows:
 old='assets/source-backed/'+row['filename']
 if old not in mapping:newrows.append(row);continue
 record=next(c for c in manifest['converted'] if c['original']==old)
 for v in record['variants']:
  n=row.copy();n['filename']=Path(v['path']).name;n['sha256']=v['sha256'];n['changes']='WebP quality80, EXIF removed, proportional '+str(v['width'])+'x'+str(v['height'])+'; original SHA256 '+record['originalSha256']+'; attribution unchanged';newrows.append(n)
with csvp.open('w',newline='') as f:w=csv.DictWriter(f,fieldnames=fields,lineterminator="\n");w.writeheader();w.writerows(newrows)
for old in mapping:(root/old).unlink()
# Size metadata also covers small unchanged bitmaps and SVG viewboxes.
metadata={}
for p in [*(root/'assets').rglob('*'),*(root/'orthopaedics/assets').rglob('*')]:
 if not p.is_file():continue
 if p.suffix.lower() in ['.png','.jpg','.jpeg','.webp','.gif']:
  with Image.open(p) as im:metadata[p.relative_to(root).as_posix()]=[im.width,im.height,p.stat().st_size]
 elif p.suffix=='.svg':
  s=p.read_text();m=re.search(r'viewBox=["\']([\d. -]+)',s)
  if m:
   vals=m.group(1).split();metadata[p.relative_to(root).as_posix()]=[float(vals[2]),float(vals[3]),p.stat().st_size]
manifest['metadata']=metadata;dest.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n');print(json.dumps({'converted':len(mapping),'originalBytes':before,'twoVariantBytes':after,'remainingBitmaps':sum(1 for k in metadata if not k.endswith('.svg'))}))
