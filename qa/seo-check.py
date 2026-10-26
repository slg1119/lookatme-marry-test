"""Crawler-visible SEO assertions. Uses curl, never JavaScript execution."""
import argparse, json, re, struct, subprocess, tempfile
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse
from xml.etree import ElementTree as ET

p=argparse.ArgumentParser()
p.add_argument('--origin',default='http://127.0.0.1:4173')
p.add_argument('--site')
p.add_argument('--public',action='store_true')
p.add_argument('--out',default='qa/seo-after.json')
a=p.parse_args()

class Page(HTMLParser):
 def __init__(self, html):
  super().__init__(); self.meta={}; self.links=[]; self.canonical=None; self.text=[]; self.h1=0; self.title=''; self.in_title=False; self.hidden=0; self.ld=False; self.ld_text=''; self.schemas=[]; self.feed(html)
 def handle_starttag(self,tag,attrs):
  d=dict(attrs)
  if tag=='meta': self.meta[d.get('name') or d.get('property')]=d.get('content','')
  if tag=='link' and d.get('rel')=='canonical': self.canonical=d.get('href')
  if tag=='a': self.links.append(d.get('href',''))
  if tag=='h1': self.h1+=1
  if tag=='title': self.in_title=True
  if tag in ['script','style']:
   self.hidden+=1
   if d.get('type')=='application/ld+json': self.ld=True; self.ld_text=''
 def handle_endtag(self,tag):
  if tag=='title': self.in_title=False
  if tag in ['script','style']:
   if self.ld: self.schemas.append(json.loads(self.ld_text)); self.ld=False
   self.hidden=max(0,self.hidden-1)
 def handle_data(self,data):
  if self.in_title:self.title+=data
  if self.ld:self.ld_text+=data
  if not self.hidden:self.text.append(data)

with tempfile.TemporaryDirectory() as temp:
 def get(route):
  body=Path(temp)/'body'; head=Path(temp)/'headers'
  status=subprocess.check_output(['curl','--silent','--show-error','--max-time','20','--output',str(body),'--dump-header',str(head),'--write-out','%{http_code}',a.origin+route],text=True)
  return int(status),body.read_bytes(),head.read_text()
 report={'mode':'public fixture' if a.public else 'unconfigured local','origin':a.origin,'site':a.site,'routes':[]}
 home_status,home_body,_=get('/')
 assert home_status==200
 home=Page(home_body.decode()); assert home.h1==1
 assert '어떤 사람과,' in ''.join(home.text)
 _,body,_=get('/about'); about=Page(body.decode())
 types=sorted(set(x for x in about.links if x.startswith('/type/')))
 assert len(types)==8,types
 assert about.h1==1
 faq=next(x for x in about.schemas if x.get('@type')=='FAQPage')
 visible=re.sub(r'\s+',' ',''.join(about.text))
 for item in faq['mainEntity']:
  assert item['name'] in visible
  assert item['acceptedAnswer']['text'] in visible
 assert len(faq['mainEntity'])==5
 titles=[]
 for route in ['/', '/about']+types:
  status,body,headers=get(route);page=Page(body.decode())
  assert status==200 and page.h1==1 and page.schemas
  assert page.meta.get('description')
  assert page.meta.get('og:image') and page.meta.get('twitter:card')=='summary_large_image'
  if a.public:
   assert 'noindex' not in page.meta.get('robots',''),route
   assert 'noindex' not in headers.lower(),route
   # Next normalizes the root canonical without a trailing slash; both name /.
   expected=a.site.rstrip('/')+route
   assert page.canonical and page.canonical.rstrip('/')==expected.rstrip('/'), (route,page.canonical)
   assert page.meta['og:image'].startswith(a.site.rstrip('/')+'/og/'),route
  else:
   assert 'noindex' in page.meta.get('robots','')
   assert page.canonical is None
  titles.append(page.title)
  report['routes'].append({'path':route,'status':status,'title':page.title,'canonical':page.canonical,'robots':page.meta.get('robots'),'h1':page.h1,'structuredData':[s['@type'] for s in page.schemas]})
 assert len(set(titles))==10
 for route in ['/test','/result']:
  status,body,headers=get(route);page=Page(body.decode())
  assert status==200 and 'noindex' in page.meta['robots'] and 'x-robots-tag: noindex' in headers.lower()
 status,body,_=get('/sitemap.xml'); assert status==200
 urls=[e.text for e in ET.fromstring(body).iter() if e.tag.endswith('loc')]
 assert len(urls)==(10 if a.public else 0),urls
 if a.public: assert set(urls)=={a.site.rstrip('/')+route for route in ['/', '/about']+types},urls
 assert all(urlparse(u).path not in ['/result','/test'] for u in urls)
 status,body,_=get('/robots.txt'); assert status==200
 robots=body.decode()
 assert ('Sitemap: '+a.site.rstrip('/')+'/sitemap.xml') in robots if a.public else 'Disallow: /' in robots
 status,body,_=get('/llms.txt'); assert status==200 and '심리 진단' in body.decode()
 for route in ['/not-a-real-page', '/type/not-a-profile', '/og/not-a-profile']:
  assert get(route)[0]==404,route
 for image_id in ['home']+[u.rsplit('/',1)[-1] for u in types]:
  status,body,headers=get('/og/'+image_id)
  assert status==200 and body[1:4]==b'PNG' and struct.unpack('>II',body[16:24])==(1200,630),image_id
  if image_id in ['home','everyday-soulmate']:Path('qa/seo-og-'+image_id+'.png').write_bytes(body)
 report.update({'sitemapCount':len(urls),'faqMatches':5,'socialImages':9,'invalidRoutes404':3,'privateRoutesNoindex':2,'passed':True})
 Path(a.out).write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
 print(json.dumps({k:v for k,v in report.items() if k!='routes'},ensure_ascii=False))
