from __future__ import annotations

import re
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
SOURCE_MD = ROOT / "companion-textbook" / "chapter-01.md"
OUTPUT_PDF = ROOT / "output" / "pdf" / "investment-analysis-chapter-01-textbook.pdf"

PAGE_WIDTH, PAGE_HEIGHT = A4
LEFT_MARGIN = 17 * mm
RIGHT_MARGIN = 17 * mm
TOP_MARGIN = 18 * mm
BOTTOM_MARGIN = 17 * mm
CONTENT_WIDTH = PAGE_WIDTH - LEFT_MARGIN - RIGHT_MARGIN

INK = colors.HexColor("#17202a")
MUTED = colors.HexColor("#55616f")
NAVY = colors.HexColor("#0f2437")
CYAN = colors.HexColor("#1d8fa3")
AMBER = colors.HexColor("#c78114")
PALE_BLUE = colors.HexColor("#eef7f9")
PALE_AMBER = colors.HexColor("#fff7e8")
GRID = colors.HexColor("#cbd5df")


def register_fonts() -> tuple[str, str]:
    regular = Path(r"C:\Windows\Fonts\Deng.ttf")
    bold = Path(r"C:\Windows\Fonts\Dengb.ttf")
    if regular.exists() and bold.exists():
        pdfmetrics.registerFont(TTFont("TextbookSans", str(regular)))
        pdfmetrics.registerFont(TTFont("TextbookSans-Bold", str(bold)))
        return "TextbookSans", "TextbookSans-Bold"

    pdfmetrics.registerFont(TTFont("TextbookSans", r"C:\Windows\Fonts\NotoSans-Regular.ttf"))
    pdfmetrics.registerFont(TTFont("TextbookSans-Bold", r"C:\Windows\Fonts\NotoSans-Bold.ttf"))
    return "TextbookSans", "TextbookSans-Bold"


FONT, FONT_BOLD = register_fonts()


def make_styles() -> dict[str, ParagraphStyle]:
    base = ParagraphStyle(
        "Base",
        fontName=FONT,
        fontSize=9.8,
        leading=14.1,
        textColor=INK,
        spaceAfter=5,
    )
    return {
        "cover_eyebrow": ParagraphStyle(
            "CoverEyebrow",
            parent=base,
            fontName=FONT_BOLD,
            fontSize=10,
            leading=13,
            textColor=CYAN,
            alignment=TA_CENTER,
            spaceAfter=8,
        ),
        "cover_title": ParagraphStyle(
            "CoverTitle",
            parent=base,
            fontName=FONT_BOLD,
            fontSize=26,
            leading=31,
            textColor=NAVY,
            alignment=TA_CENTER,
            spaceAfter=9,
        ),
        "cover_subtitle": ParagraphStyle(
            "CoverSubtitle",
            parent=base,
            fontSize=12,
            leading=17,
            textColor=MUTED,
            alignment=TA_CENTER,
            spaceAfter=18,
        ),
        "h1": ParagraphStyle(
            "Heading1",
            parent=base,
            fontName=FONT_BOLD,
            fontSize=19,
            leading=24,
            textColor=NAVY,
            spaceBefore=3,
            spaceAfter=11,
        ),
        "h2": ParagraphStyle(
            "Heading2",
            parent=base,
            fontName=FONT_BOLD,
            fontSize=13.6,
            leading=17,
            textColor=NAVY,
            spaceBefore=11,
            spaceAfter=5,
        ),
        "body": base,
        "small": ParagraphStyle(
            "Small",
            parent=base,
            fontSize=8.2,
            leading=11,
            textColor=MUTED,
        ),
        "quote": ParagraphStyle(
            "Quote",
            parent=base,
            fontName=FONT_BOLD,
            fontSize=10.8,
            leading=15.5,
            textColor=NAVY,
            leftIndent=2 * mm,
            rightIndent=2 * mm,
            spaceAfter=0,
        ),
        "list": ParagraphStyle(
            "List",
            parent=base,
            leftIndent=0,
            firstLineIndent=0,
            spaceAfter=2,
        ),
        "table_header": ParagraphStyle(
            "TableHeader",
            parent=base,
            fontName=FONT_BOLD,
            fontSize=8.1,
            leading=10.3,
            textColor=colors.white,
            spaceAfter=0,
        ),
        "table_cell": ParagraphStyle(
            "TableCell",
            parent=base,
            fontSize=7.9,
            leading=10.4,
            spaceAfter=0,
        ),
    }


STYLES = make_styles()


def inline_markup(text: str) -> str:
    text = escape(text.strip())
    text = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", text)
    return text


def paragraph(text: str, style: str = "body") -> Paragraph:
    return Paragraph(inline_markup(text), STYLES[style])


def quote_box(text: str) -> Table:
    table = Table(
        [[Paragraph(inline_markup(text), STYLES["quote"])]],
        colWidths=[CONTENT_WIDTH],
        hAlign="LEFT",
    )
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), PALE_BLUE),
                ("BOX", (0, 0), (-1, -1), 0.6, CYAN),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    return table


def parse_table(lines: list[str]) -> list[list[str]]:
    rows: list[list[str]] = []
    for line in lines:
        parts = [part.strip() for part in line.strip().strip("|").split("|")]
        if all(re.fullmatch(r":?-{3,}:?", part) for part in parts):
            continue
        rows.append(parts)
    return rows


def col_widths(column_count: int) -> list[float]:
    if column_count == 2:
        return [CONTENT_WIDTH * 0.64, CONTENT_WIDTH * 0.36]
    if column_count == 3:
        return [CONTENT_WIDTH * 0.27, CONTENT_WIDTH * 0.36, CONTENT_WIDTH * 0.37]
    return [CONTENT_WIDTH / max(1, column_count)] * column_count


def table_flowable(table_lines: list[str]) -> Table:
    rows = parse_table(table_lines)
    if not rows:
        return Table([[""]])
    width_count = max(len(row) for row in rows)
    normalised = [row + [""] * (width_count - len(row)) for row in rows]
    data = []
    for row_idx, row in enumerate(normalised):
        style = STYLES["table_header"] if row_idx == 0 else STYLES["table_cell"]
        data.append([Paragraph(inline_markup(cell), style) for cell in row])
    table = Table(data, colWidths=col_widths(width_count), repeatRows=1, hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), NAVY),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("GRID", (0, 0), (-1, -1), 0.35, GRID),
                ("BACKGROUND", (0, 1), (-1, -1), colors.white),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 5),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                ("TOPPADDING", (0, 0), (-1, -1), 4.5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4.5),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f7fafc")]),
            ]
        )
    )
    return table


def list_flowable(items: list[str], ordered: bool = False) -> Table:
    rows = []
    for item_index, item in enumerate(items, start=1):
        marker = f"{item_index}." if ordered else "-"
        rows.append(
            [
                Paragraph(inline_markup(marker), STYLES["list"]),
                Paragraph(inline_markup(item), STYLES["list"]),
            ]
        )
    table = Table(rows, colWidths=[7 * mm, CONTENT_WIDTH - 7 * mm], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 2),
                ("TOPPADDING", (0, 0), (-1, -1), 0.8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0.8),
                ("FONTNAME", (0, 0), (0, -1), FONT_BOLD),
            ]
        )
    )
    return table


def build_story(markdown: str) -> list:
    lines = markdown.splitlines()
    title = lines[0].removeprefix("#").strip()
    body_lines = lines[1:]
    story: list = []

    cover_blurb = (
        "Student companion textbook | Unit 1 Lesson 1 | Investment, speculation and shares"
    )
    cover_note = (
        "A first chapter for defining investment analysis, assets, shares, "
        "risk, return and share price before later calculations."
    )
    story.extend(
        [
            Spacer(1, 42 * mm),
            Paragraph("Grade 9 Investment Analysis", STYLES["cover_eyebrow"]),
            Paragraph(title, STYLES["cover_title"]),
            Paragraph(cover_blurb, STYLES["cover_subtitle"]),
            quote_box(cover_note),
            Spacer(1, 8 * mm),
            Paragraph(
                "Educational use only. This textbook does not provide personal investment advice.",
                STYLES["small"],
            ),
            PageBreak(),
            Paragraph(title, STYLES["h1"]),
        ]
    )

    idx = 0
    paragraph_buffer: list[str] = []

    def flush_paragraph() -> None:
        nonlocal paragraph_buffer
        if paragraph_buffer:
            story.append(paragraph(" ".join(paragraph_buffer)))
            paragraph_buffer = []

    while idx < len(body_lines):
        line = body_lines[idx].rstrip()

        if not line.strip():
            flush_paragraph()
            idx += 1
            continue

        if line.startswith("## "):
            flush_paragraph()
            story.append(Paragraph(inline_markup(line[3:]), STYLES["h2"]))
            idx += 1
            continue

        if line.startswith("> "):
            flush_paragraph()
            quote_lines = []
            while idx < len(body_lines) and body_lines[idx].startswith("> "):
                quote_lines.append(body_lines[idx][2:].strip())
                idx += 1
            story.append(quote_box(" ".join(quote_lines)))
            story.append(Spacer(1, 4))
            continue

        if line.startswith("|"):
            flush_paragraph()
            table_lines = []
            while idx < len(body_lines) and body_lines[idx].startswith("|"):
                table_lines.append(body_lines[idx])
                idx += 1
            story.append(table_flowable(table_lines))
            story.append(Spacer(1, 6))
            continue

        if line.startswith("- "):
            flush_paragraph()
            items = []
            while idx < len(body_lines) and body_lines[idx].startswith("- "):
                items.append(body_lines[idx][2:].strip())
                idx += 1
            story.append(list_flowable(items))
            story.append(Spacer(1, 3))
            continue

        ordered_match = re.match(r"^(\d+)\.\s+(.*)$", line)
        if ordered_match:
            flush_paragraph()
            items = []
            while idx < len(body_lines):
                match = re.match(r"^\d+\.\s+(.*)$", body_lines[idx].rstrip())
                if not match:
                    break
                items.append(match.group(1).strip())
                idx += 1
            story.append(list_flowable(items, ordered=True))
            story.append(Spacer(1, 3))
            continue

        paragraph_buffer.append(line.strip())
        idx += 1

    flush_paragraph()
    return story


def draw_page(canvas, doc) -> None:
    canvas.saveState()
    canvas.setStrokeColor(colors.HexColor("#d6e1e8"))
    canvas.setLineWidth(0.5)
    canvas.line(LEFT_MARGIN, PAGE_HEIGHT - 13 * mm, PAGE_WIDTH - RIGHT_MARGIN, PAGE_HEIGHT - 13 * mm)
    canvas.setFont(FONT_BOLD, 8.5)
    canvas.setFillColor(NAVY)
    canvas.drawString(LEFT_MARGIN, PAGE_HEIGHT - 10 * mm, "Investment Analysis")
    canvas.setFont(FONT, 8.5)
    canvas.setFillColor(MUTED)
    canvas.drawRightString(PAGE_WIDTH - RIGHT_MARGIN, PAGE_HEIGHT - 10 * mm, "Chapter 1")
    canvas.drawCentredString(PAGE_WIDTH / 2, 9.5 * mm, str(doc.page))
    canvas.restoreState()


def build_pdf() -> Path:
    OUTPUT_PDF.parent.mkdir(parents=True, exist_ok=True)
    markdown = SOURCE_MD.read_text(encoding="utf-8")
    doc = BaseDocTemplate(
        str(OUTPUT_PDF),
        pagesize=A4,
        leftMargin=LEFT_MARGIN,
        rightMargin=RIGHT_MARGIN,
        topMargin=TOP_MARGIN,
        bottomMargin=BOTTOM_MARGIN,
        title="Investment Analysis Chapter 1 Student Textbook",
        author="Oehler-Huang Library",
        subject="Investment Analysis companion student textbook",
    )
    frame = Frame(
        LEFT_MARGIN,
        BOTTOM_MARGIN,
        CONTENT_WIDTH,
        PAGE_HEIGHT - TOP_MARGIN - BOTTOM_MARGIN,
        id="normal",
        showBoundary=0,
    )
    doc.addPageTemplates([PageTemplate(id="chapter", frames=[frame], onPage=draw_page)])
    doc.build(build_story(markdown))
    return OUTPUT_PDF


if __name__ == "__main__":
    print(build_pdf())
