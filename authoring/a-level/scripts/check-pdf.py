"""Check a PDF export and build contact sheets from independent Poppler renders.

Run pdftoppm -r 96 -png OUTPUT.pdf QA_DIR/pdf before this script.
Uses Pillow and pypdf; both are in the Codex bundled Python runtime.
"""
import json
import sys
from pathlib import Path
from PIL import Image, ImageChops, ImageStat, ImageDraw
from pypdf import PdfReader

root = Path(__file__).resolve().parents[3]
slug = sys.argv[1] if len(sys.argv) > 1 else '9-1-1-multiplier'
qa = root / 'authoring/a-level/tmp/pdf' / slug
pdf = root / 'authoring/a-level/outputs/pdf' / f'{slug}.pdf'
manifest = json.loads((qa / 'manifest.json').read_text(encoding='utf-8'))
reader = PdfReader(pdf)
assert len(reader.pages) == len(manifest['pages']), 'PDF page count differs from export manifest'
renders = sorted(qa.glob('pdf-*.png'))
assert len(renders) == len(reader.pages), 'Render every PDF page before checking'
comparisons = []
for record, pdf_page, render in zip(manifest['pages'], reader.pages, renders):
    assert abs(float(pdf_page.mediabox.width) - 1200) < 1
    assert abs(float(pdf_page.mediabox.height) - 675) < 1
    assert len(pdf_page.extract_text().strip()) > 10, f"Blank page {record['page']}"
    if record['kind'] == 'diagram':
        reference = Image.open(qa / f"browser-{record['page']:03}.png").convert('RGB')
        actual = Image.open(render).convert('RGB')
        # Chromium quantizes CSS page height to 675.12 pt; Poppler rounds the
        # resulting 900.16 pixels up to 901. Ignore only that trailing edge pixel.
        assert actual.width == reference.width and abs(actual.height - reference.height) <= 1, f"Wrong raster size: {actual.size}"
        actual = actual.crop((0, 0, reference.width, reference.height))
        difference = ImageChops.difference(reference, actual)
        mae = sum(ImageStat.Stat(difference).mean) / 3
        comparisons.append({'page': record['page'], 'id': record['id'], 'step': record['step'], 'mean_pixel_difference': round(mae, 3)})
        # Independent engines differ slightly in text antialiasing. A missing
        # diagram, wrong container scale or omitted curve exceeds this tolerance.
        assert mae < 4, f"Diagram differs from browser on page {record['page']}: {mae}"
        assert b' m' in pdf_page.get_contents().get_data(), 'Expected vector drawing commands'

for offset in range(0, len(renders), 12):
    sheet = Image.new('RGB', (1600, 3 * 255), '#dadada')
    draw = ImageDraw.Draw(sheet)
    for item, render in enumerate(renders[offset:offset + 12]):
        thumb = Image.open(render).convert('RGB')
        thumb.thumbnail((400, 225))
        x, y = (item % 4) * 400, (item // 4) * 255
        sheet.paste(thumb, (x, y))
        record = manifest['pages'][offset + item]
        draw.text((x + 8, y + 230), f"PDF {record['page']} | Slide {record['slide']} | {record['state']}" + (f" {record['step']}" if record['step'] else ''), fill='black')
    sheet.save(qa / f'contact-{offset // 12 + 1:02}.jpg', quality=90)
report = {'pages': len(reader.pages), 'diagram_states_compared': len(comparisons), 'maximum_mean_pixel_difference': max(x['mean_pixel_difference'] for x in comparisons), 'comparisons': comparisons}
(qa / 'pdf-check.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
print(json.dumps({key: value for key, value in report.items() if key != 'comparisons'}, indent=2))
