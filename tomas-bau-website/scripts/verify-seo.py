"""Read-only SEO smoke test: python3 scripts/verify-seo.py [local origin]."""
import json
import sys
from html.parser import HTMLParser
from urllib.parse import urljoin, urlsplit, unquote
from urllib.request import urlopen
from xml.etree import ElementTree

BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:3000'
ORIGIN = 'https://www.bautomas.de'
PATHS = ['/', '/impressum', '/datenschutz', '/login', '/signup']

class Page(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.tags, self.text, self.jsonld = [], [], []
        self.script = None
        self.in_script = False
        self.feed(source)
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append((tag, attrs))
        if tag == 'script':
            self.in_script = True
            self.script = '' if attrs.get('type') == 'application/ld+json' else None
    def handle_data(self, data):
        if not self.in_script:
            self.text.append(data)
        if self.script is not None:
            self.script += data
    def handle_endtag(self, tag):
        if tag == 'script':
            self.in_script = False
        if tag == 'script' and self.script is not None:
            self.jsonld.append(json.loads(self.script))
            self.script = None
    def attrs(self, tag):
        return [attrs for name, attrs in self.tags if name == tag]

def fetch(path):
    with urlopen(BASE + path) as response:
        assert response.status == 200, path
        assert 'noindex' not in response.headers.get('X-Robots-Tag', '').lower(), path
        return response.read().decode()

pages, titles, descriptions = {}, set(), set()
for path in PATHS:
    source = fetch(path)
    assert 'https://www.tomasbau.de' not in source, path
    page = pages[path] = Page(source)
    metas = {a.get('name', a.get('property')): a.get('content') for a in page.attrs('meta')}
    assert page.attrs('html')[0]['lang'] == 'de', path
    assert 'device-width' in metas['viewport'], path
    for key in ['robots', 'googlebot']:
        assert 'noindex' not in metas[key] and 'index' in metas[key] and 'follow' in metas[key], (path, key)
    assert [a['href'] for a in page.attrs('link') if a.get('rel') == 'canonical'] == [ORIGIN + path], path
    for key in ['description', 'og:title', 'og:description', 'twitter:title', 'twitter:description', 'og:image', 'twitter:image']:
        assert metas.get(key), (path, key)
    assert metas['og:url'] == ORIGIN + path, path
    assert metas['og:description'] == metas['description'] == metas['twitter:description'], path
    assert metas['og:title'] == metas['twitter:title'], path
    assert metas['og:image'].startswith(ORIGIN + '/'), path
    title = source.split('<title>')[1].split('</title>')[0]
    assert title not in titles and metas['description'] not in descriptions, path
    titles.add(title)
    descriptions.add(metas['description'])
    assert all(a.get('alt', '').strip() for a in page.attrs('img')), path
    print('PASS metadata, language, robots, image alt text:', path)

checked = set()
for path, page in pages.items():
    for anchor in page.attrs('a'):
        url = urlsplit(urljoin(ORIGIN + path, anchor.get('href', '')))
        if url.netloc != 'www.bautomas.de' or url.scheme not in ['http', 'https']:
            continue
        target = url.path or '/'
        if target not in pages and target not in checked:
            with urlopen(BASE + target) as response:
                assert response.status == 200, target
            checked.add(target)
        if url.fragment:
            assert target in pages, target
            ids = {a.get('id') for _, a in pages[target].tags}
            assert unquote(url.fragment) in ids, (path, target, url.fragment)
print('PASS all rendered internal links and fragment targets')

robots = fetch('/robots.txt')
assert 'User-Agent: *' in robots and 'Allow: /' in robots and 'Disallow:' not in robots
assert f'Sitemap: {ORIGIN}/sitemap.xml' in robots
sitemap = ElementTree.fromstring(fetch('/sitemap.xml'))
urls = {node.text for node in sitemap.iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')}
assert urls == {ORIGIN + path for path in PATHS}, urls
print('PASS robots.txt and sitemap.xml')

graph = pages['/'].jsonld[0]['@graph']
business, website, faq = graph
assert {'LocalBusiness', 'HomeAndConstructionBusiness'} <= set(business['@type'])
assert business['url'] == website['url'] == ORIGIN + '/'
assert business['name'] == 'Tomas Bau & Sanierung'
assert business['alternateName'] == website['alternateName'] == ['Tomas Bau', 'Bau Tomas']
assert business['address']['addressLocality'] == 'Wuppertal'
visible = ' '.join(pages['/'].text)
for value in [business['name'], business['email'], business['address']['streetAddress']]:
    assert value in visible, value
assert any(a.get('href') == 'tel:' + business['telephone'] for a in pages['/'].attrs('a'))
assert business['openingHoursSpecification'] and business['sameAs'] == ['https://www.instagram.com/tomasbau.de/']
assert website['@type'] == 'WebSite' and faq['@type'] == 'FAQPage'
for question in faq['mainEntity']:
    assert question['name'] in visible and question['acceptedAnswer']['text'] in visible
for offer in business['hasOfferCatalog']['itemListElement']:
    service = offer['itemOffered']
    assert service['name'] in visible and service['description'] in visible
print('PASS JSON-LD business identity, website, services and FAQ/visible-content parity')
