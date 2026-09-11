"""Build the iPad student handout from question slides only in the current PPTX."""
from pathlib import Path
from zipfile import ZipFile
from xml.sax.saxutils import escape
import re
from lxml import etree
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / 'outputs/Multiplier-Classroom-Starter.pptx'
OUTPUT = ROOT / 'outputs/pdf/Multiplier-Student-Tasks.pdf'
NS = {'p': 'http://schemas.openxmlformats.org/presentationml/2006/main',
      'a': 'http://schemas.openxmlformats.org/drawingml/2006/main'}
content = {}
with ZipFile(SOURCE) as archive:
    # Explicit allow-list: no answer slides, speaker notes or other package text.
    for i in (1, 2):
        root = etree.fromstring(archive.read(f'ppt/slides/slide{i}.xml'))
        for shape in root.findall('.//p:sp', NS):
            name = shape.find('p:nvSpPr/p:cNvPr', NS).get('name')
            paragraphs = shape.findall('p:txBody/a:p', NS)
            content[name] = '\n'.join(''.join(p.xpath('.//a:t/text()', namespaces=NS)) for p in paragraphs)

pdfmetrics.registerFont(TTFont('Arial', 'C:/Windows/Fonts/arial.ttf'))
pdfmetrics.registerFont(TTFont('Arial-Bold', 'C:/Windows/Fonts/arialbd.ttf'))
pdfmetrics.registerFontFamily('Arial', normal='Arial', bold='Arial-Bold')
W, H, M = 612, 816, 44
NAVY, INK, BLUE, GREY = '#102D46', '#172D3C', '#126A8C', '#52616C'
body = ParagraphStyle('body', fontName='Arial', fontSize=20, leading=27,
                      textColor=INK, spaceAfter=0)
title = ParagraphStyle('title', fontName='Arial-Bold', fontSize=28, leading=34,
                       textColor=NAVY)
small = ParagraphStyle('small', fontName='Arial', fontSize=11, leading=15,
                       textColor=GREY)
OUTPUT.parent.mkdir(parents=True, exist_ok=True)
c = canvas.Canvas(str(OUTPUT), pagesize=(W, H), pageCompression=1)
c.setTitle('The multiplier - student tasks')
c.setAuthor('Economics')
c.setSubject('Independent practice: the multiplier process, MPC and government spending')
c.setViewerPreference('DisplayDocTitle', 'true')

def paragraph(text, top, style=body, x=M, width=W-2*M):
    p = Paragraph(escape(text).replace('\n', '<br/>'), style)
    _, height = p.wrap(width, H)
    assert top + height < H - 72, (text, top, height)
    p.drawOn(c, x, H-top-height)
    return top+height

def start(number, heading, optional=False):
    c.bookmarkPage(f'q{number}')
    c.addOutlineEntry(heading, f'q{number}', level=0)
    y = 43
    if optional:
        c.setFillColor(BLUE)
        c.setFont('Arial-Bold', 13)
        c.drawString(M, H-y-13, 'OPTIONAL EXTENSION')
        y += 29
    return paragraph(f'{number}  {heading}', y, title)+29

def finish(number, reference):
    p = Paragraph(escape(reference), small)
    _, height = p.wrap(W-2*M-35, 50)
    p.drawOn(c, M, 30+30-height)
    c.setFont('Arial', 10)
    c.setFillColor(GREY)
    c.drawRightString(W-M, 31, f'{number}/3')
    c.showPage()

refs = content['core-source'].split('     /     ')
for number, key, heading in [
    (1, 'consumption', 'Multiplier process'),
    (2, 'multiplier', 'Multiplier and MPC'),
]:
    y = start(number, heading)
    stem = content[f'{key}-stem']
    for part in stem.split('\n\n'):
        y = paragraph(part, y)+18
    y += 2
    for i in range(4):
        option = content[f'core-{key}-option-{i}']
        label, value = option.split('   ', 1)
        c.setFillColor(INK)
        c.setFont('Arial-Bold', 20)
        # Equal visual treatment of every choice; no answer highlighting.
        c.drawString(M, H-y-20, label)
        y = paragraph(value, y, x=M+34, width=W-2*M-34)+17
    finish(number, refs[number-1])

y = start(3, content['optional-written-title'], optional=True)
y = paragraph(content['context'], y)+36
prep_style = ParagraphStyle('preparation', parent=body, fontName='Arial-Bold', textColor=BLUE)
y = paragraph(content['written-question'], y, prep_style)
finish(3, content['written-source'])
c.save()

# Confirm text fidelity and that the student file contains no answer content.
reader = PdfReader(OUTPUT)
assert len(reader.pages) == 3
normal = lambda s: re.sub(r'\s+', '', s)
texts = [page.extract_text() for page in reader.pages]
for number, key in [(1, 'consumption'), (2, 'multiplier')]:
    text = normal(texts[number-1])
    assert normal(content[f'{key}-stem']) in text
    for i in range(4):
        assert normal(content[f'core-{key}-option-{i}']) in text
assert normal(content['context']) in normal(texts[2])
assert normal(content['written-question']) in normal(texts[2])
all_text = '\n'.join(texts).lower()
for forbidden in ('official answer', 'model answer', 'teacher reveal', 'mpc = 0.80',
                  'apc =', 'mps =', 'mark scheme', 'feedback', 'correct answer'):
    assert forbidden not in all_text, forbidden
for page in reader.pages:
    assert tuple(map(float, page.mediabox[2:])) == (612.0, 816.0)
    assert not page.get('/Annots')
print(f'Created {OUTPUT}\n3 portrait pages; all original questions and options verified; no solutions or annotations.')
