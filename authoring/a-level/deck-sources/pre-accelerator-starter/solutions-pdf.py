"""iPad answer edition: original questions with their revealed solutions."""
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
from pypdf import PdfReader, PdfWriter

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / 'outputs/Multiplier-Classroom-Starter.pptx'
OUTPUT = ROOT / 'outputs/pdf/Multiplier-Revealed-Solutions.pdf'
MARK_SCHEME = Path('C:/Users/oehle/Documents/past-papers/economics_9708_a_level/Mark Scheme/2021-oct-nov/Paper 4/9708_w21_ms_41.pdf')
BODY = ROOT / 'tmp/pdfs/pre-accelerator-starter/solutions-body.pdf'
NS = {'p':'http://schemas.openxmlformats.org/presentationml/2006/main',
      'a':'http://schemas.openxmlformats.org/drawingml/2006/main'}
data = {}
with ZipFile(SOURCE) as z:
    for i in range(1, 6):
        root = etree.fromstring(z.read(f'ppt/slides/slide{i}.xml'))
        for sh in root.findall('.//p:sp', NS):
            name = sh.find('p:nvSpPr/p:cNvPr', NS).get('name')
            data[name] = '\n'.join(''.join(p.xpath('.//a:t/text()', namespaces=NS))
                                   for p in sh.findall('p:txBody/a:p', NS))

pdfmetrics.registerFont(TTFont('Arial', 'C:/Windows/Fonts/arial.ttf'))
pdfmetrics.registerFont(TTFont('Arial-Bold', 'C:/Windows/Fonts/arialbd.ttf'))
pdfmetrics.registerFontFamily('Arial', normal='Arial', bold='Arial-Bold')
W, H, M = 612, 816, 42
INK, NAVY, GREEN, GREY, BLUE = '#172D3C', '#102D46', '#146452', '#52616C', '#126A8C'
def style(name, size, leading, font='Arial', color=INK):
    return ParagraphStyle(name, fontName=font, fontSize=size, leading=leading, textColor=color)
body = style('body', 17.5, 23)
option_style = style('option', 16.5, 21)
correct_style = style('correct', 16.5, 21, 'Arial-Bold', GREEN)
heading = style('heading', 27, 33, 'Arial-Bold', NAVY)
answer_heading = style('answer', 21, 27, 'Arial-Bold', GREEN)
equation = style('equation', 18, 24)
compact = style('compact', 16, 21)
small = style('small', 10.5, 14, color=GREY)

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
BODY.parent.mkdir(parents=True, exist_ok=True)
c = canvas.Canvas(str(BODY), pagesize=(W, H), pageCompression=1)
c.setTitle('The multiplier - revealed solutions')
c.setAuthor('Economics')
c.setSubject('Past-paper questions with answers, working and a preparation model')
c.setViewerPreference('DisplayDocTitle', 'true')

def para(text, y, st=body, x=M, width=W-2*M):
    p = Paragraph(escape(text).replace('\n','<br/>'), st)
    _, height = p.wrap(width, H)
    assert y+height <= H-77, (text[:60], y, height)
    p.drawOn(c, x, H-y-height)
    return y+height

def start(number, title):
    c.bookmarkPage(f'answer-{number}')
    c.addOutlineEntry(title, f'answer-{number}', 0)
    return para(f'{number}  {title}', 35, heading)+18

def end(number, reference):
    p=Paragraph(escape(reference), small)
    _, height=p.wrap(W-2*M-28, 50)
    p.drawOn(c, M, 30+30-height)
    c.setFont('Arial',10)
    c.setFillColor(GREY)
    c.drawRightString(W-M,31,f'{number}/4')
    c.showPage()

y=start(1,'Multiplier process')
for part in data['consumption-stem'].split('\n\n'):
    y=para(part,y)+12
for i in range(4):
    label,value=data[f'core-consumption-option-{i}'].split('   ',1)
    y=para(f'{label}   {value}',y,correct_style if i==3 else option_style)+8
y+=9
y=para('Answer D: a larger change in income',y,answer_heading)+12
y=para(data['q1-equations'],y,body)+11
y=para(data['q1-explanation'],y,compact)+12
y=para(data['q1-distractors'].replace('\n\n','\n'),y,compact)
end(1,'9708/31 May/June 2021, Q24 [1]. Official answer: D. Explanation: teacher-written.')

y=start(2,'Multiplier and MPC')
for part in data['multiplier-stem'].split('\n\n'):
    y=para(part,y)+12
# A compact row keeps the complete choice set beside the worked answer.
for i in range(4):
    label,value=data[f'core-multiplier-option-{i}'].split('   ',1)
    para(f'{label}   {value}',y,correct_style if i==1 else option_style,
         x=M+i*132,width=122)
y+=40
y=para('Answer B: MPC = 0.80',y,answer_heading)+13
y=para(data['q2-equations'].replace('\n\n','\n'),y,equation)+16
y=para('A gives MPS, the saving fraction.\nC uses the ratio of income levels: 500 ÷ 600.\nD leaves no saving leakage and no finite multiplier.',y,compact)
end(2,'9708/31 October/November 2021, Q24 [1]. Official answer: B. Explanation: teacher-written.')

y=start(3,'MPC and government spending')
y=para(data['context'],y)+20
y=para(data['written-question'],y,style('prep',16.5,22,'Arial-Bold',BLUE))+25
y=para('Model for the preparation task',y,answer_heading)+16
y=para(data['ghana-model'],y,body)+21
y=para('This model addresses the five-minute task. The full 12-mark essay requires broader analysis and evaluation. The original mark scheme follows on the next page.',y,compact)
end(3,'9708/41 October/November 2021, Q4(a), mark scheme p.10. Teacher-written preparation model.')
c.save()

# Append the complete original question-specific page, without cropping,
# retyping, paraphrasing or omitting its indicative content or level descriptors.
original = PdfReader(MARK_SCHEME)
writer = PdfWriter()
writer.append(PdfReader(BODY))
writer.append(original, pages=[9], import_outline=False)
writer.add_outline_item('Original mark scheme: 9708/41/O/N/21 Q4(a)', 3)
writer.add_metadata({'/Title':'The multiplier - revealed solutions and original mark scheme',
                     '/Author':'Economics',
                     '/Subject':'Questions, revealed solutions and the complete original mark scheme for Q4(a)'})
with OUTPUT.open('wb') as f:
    writer.write(f)

r=PdfReader(OUTPUT)
assert len(r.pages)==4
norm=lambda s: re.sub(r'\s+','',s)
texts=[p.extract_text() for p in r.pages]
for i,key in enumerate(('consumption','multiplier')):
    assert norm(data[key+'-stem']) in norm(texts[i])
    for j in range(4):
        assert norm(data[f'core-{key}-option-{j}']) in norm(texts[i])
assert norm(data['context']) in norm(texts[2])
assert norm(data['written-question']) in norm(texts[2])
assert norm(data['ghana-model']) in norm(texts[2])
assert 'Answer D' in texts[0] and 'Answer B' in texts[1]
assert norm(data['q2-equations']) in norm(texts[1])
assert norm(data['q1-equations']) in norm(texts[0])
assert 'APC' not in ''.join(texts[:3])
for p in r.pages[:3]:
    assert tuple(map(float,p.mediabox[2:]))==(612.0,816.0)
assert r.pages[3].extract_text() == original.pages[9].extract_text()
assert r.pages[3].get_contents().get_data() == original.pages[9].get_contents().get_data()
assert r.pages[3].mediabox == original.pages[9].mediabox
for label in ('4(a)', 'L4', 'L3', 'L2', 'L1'):
    assert label in r.pages[3].extract_text()
print(f'Created {OUTPUT}\nVerified four pages, original questions and solutions, and an exact copy of the complete Q4(a) mark-scheme page.')
