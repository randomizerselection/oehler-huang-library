from __future__ import annotations

from pathlib import Path

from docx import Document
from docx.enum.section import WD_ORIENT
from docx.enum.table import WD_CELL_VERTICAL_ALIGNMENT, WD_TABLE_ALIGNMENT
from docx.enum.text import (
    WD_ALIGN_PARAGRAPH,
    WD_BREAK,
    WD_LINE_SPACING,
    WD_TAB_ALIGNMENT,
    WD_TAB_LEADER,
)
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "output" / "reports"
ASSET_DIR = OUTPUT_DIR / "assets"

ZH_PATH = OUTPUT_DIR / "EconMark-参赛作品说明书-中文.docx"
EN_PATH = OUTPUT_DIR / "EconMark-Competition-Report-English.docx"

IMAGES = {
    "workflow_zh": ASSET_DIR / "econmark-workflow-journal-zh.png",
    "workflow_en": ASSET_DIR / "econmark-workflow-journal-en.png",
    "home": ASSET_DIR / "econmark-home-zh.png",
    "evidence": ASSET_DIR / "econmark-evidence-zh.png",
    "feedback": ASSET_DIR / "econmark-feedback-zh.png",
    "batch": ASSET_DIR / "econmark-batch-results-zh.png",
    "pack": ASSET_DIR / "econmark-feedback-pack-zh.png",
}

COLORS = {
    # Restrained monochrome palette modelled on a LaTeX journal article.
    "ink": "000000",
    "teal": "000000",
    "coral": "000000",
    "gold": "333333",
    "cream": "F2F2F2",
    "mint": "F7F7F7",
    "pale": "FFFFFF",
    "line": "707070",
    "gray": "4D4D4D",
    "white": "FFFFFF",
}

FONT_EN = "Times New Roman"
FONT_CJK = "SimSun"
FONT_HEADING_EN = "Times New Roman"
FONT_HEADING_CJK = "SimSun"
FONT_MATH = "Cambria Math"


def set_cell_shading(cell, fill: str) -> None:
    tc_pr = cell._tc.get_or_add_tcPr()
    shd = tc_pr.find(qn("w:shd"))
    if shd is None:
        shd = OxmlElement("w:shd")
        tc_pr.append(shd)
    shd.set(qn("w:fill"), fill)


def set_cell_margins(cell, top=100, start=120, bottom=100, end=120) -> None:
    tc = cell._tc
    tc_pr = tc.get_or_add_tcPr()
    tc_mar = tc_pr.first_child_found_in("w:tcMar")
    if tc_mar is None:
        tc_mar = OxmlElement("w:tcMar")
        tc_pr.append(tc_mar)
    for margin, value in (("top", top), ("start", start), ("bottom", bottom), ("end", end)):
        node = tc_mar.find(qn(f"w:{margin}"))
        if node is None:
            node = OxmlElement(f"w:{margin}")
            tc_mar.append(node)
        node.set(qn("w:w"), str(value))
        node.set(qn("w:type"), "dxa")


def set_cell_border(cell, color=COLORS["line"], size="4") -> None:
    tc_pr = cell._tc.get_or_add_tcPr()
    borders = tc_pr.first_child_found_in("w:tcBorders")
    if borders is None:
        borders = OxmlElement("w:tcBorders")
        tc_pr.append(borders)
    for edge in ("top", "left", "bottom", "right", "insideH", "insideV"):
        tag = f"w:{edge}"
        element = borders.find(qn(tag))
        if element is None:
            element = OxmlElement(tag)
            borders.append(element)
        element.set(qn("w:val"), "single")
        element.set(qn("w:sz"), size)
        element.set(qn("w:color"), color)


def set_table_width(table, widths_dxa: list[int], indent_dxa=120) -> None:
    table.autofit = False
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_pr = table._tbl.tblPr
    tbl_w = tbl_pr.find(qn("w:tblW"))
    if tbl_w is None:
        tbl_w = OxmlElement("w:tblW")
        tbl_pr.append(tbl_w)
    tbl_w.set(qn("w:type"), "dxa")
    tbl_w.set(qn("w:w"), str(sum(widths_dxa)))

    tbl_ind = tbl_pr.find(qn("w:tblInd"))
    if tbl_ind is None:
        tbl_ind = OxmlElement("w:tblInd")
        tbl_pr.append(tbl_ind)
    tbl_ind.set(qn("w:type"), "dxa")
    tbl_ind.set(qn("w:w"), str(indent_dxa))

    grid = table._tbl.tblGrid
    for child in list(grid):
        grid.remove(child)
    for width in widths_dxa:
        col = OxmlElement("w:gridCol")
        col.set(qn("w:w"), str(width))
        grid.append(col)

    for row in table.rows:
        tr_pr = row._tr.get_or_add_trPr()
        cant_split = OxmlElement("w:cantSplit")
        tr_pr.append(cant_split)
        for idx, cell in enumerate(row.cells):
            tc_w = cell._tc.get_or_add_tcPr().find(qn("w:tcW"))
            if tc_w is None:
                tc_w = OxmlElement("w:tcW")
                cell._tc.get_or_add_tcPr().append(tc_w)
            tc_w.set(qn("w:type"), "dxa")
            tc_w.set(qn("w:w"), str(widths_dxa[idx]))
            set_cell_margins(cell)
            cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER


def set_cell_edge(cell, edge: str, color="000000", size="8", value="single") -> None:
    """Apply one explicit border edge for booktabs-style tables."""
    tc_pr = cell._tc.get_or_add_tcPr()
    borders = tc_pr.first_child_found_in("w:tcBorders")
    if borders is None:
        borders = OxmlElement("w:tcBorders")
        tc_pr.append(borders)
    node = borders.find(qn(f"w:{edge}"))
    if node is None:
        node = OxmlElement(f"w:{edge}")
        borders.append(node)
    node.set(qn("w:val"), value)
    node.set(qn("w:sz"), size)
    node.set(qn("w:color"), color)


def clear_cell_borders(cell) -> None:
    tc_pr = cell._tc.get_or_add_tcPr()
    borders = tc_pr.first_child_found_in("w:tcBorders")
    if borders is None:
        borders = OxmlElement("w:tcBorders")
        tc_pr.append(borders)
    for edge in ("top", "left", "bottom", "right", "insideH", "insideV"):
        set_cell_edge(cell, edge, value="nil", size="0", color="FFFFFF")


def repeat_header(row) -> None:
    tr_pr = row._tr.get_or_add_trPr()
    tbl_header = OxmlElement("w:tblHeader")
    tbl_header.set(qn("w:val"), "true")
    tr_pr.append(tbl_header)


def set_repeat_table_header(row) -> None:
    repeat_header(row)


def set_run_font(
    run,
    size=None,
    bold=None,
    italic=None,
    color=None,
    name=FONT_EN,
    east_asia=FONT_CJK,
) -> None:
    run.font.name = name
    if size is not None:
        run.font.size = Pt(size)
    if bold is not None:
        run.bold = bold
    if italic is not None:
        run.italic = italic
    if color is not None:
        run.font.color.rgb = RGBColor.from_string(color)
    r_pr = run._element.get_or_add_rPr()
    r_fonts = r_pr.rFonts
    if r_fonts is None:
        r_fonts = OxmlElement("w:rFonts")
        r_pr.insert(0, r_fonts)
    r_fonts.set(qn("w:ascii"), name)
    r_fonts.set(qn("w:hAnsi"), name)
    r_fonts.set(qn("w:eastAsia"), east_asia)


def configure_style(
    style,
    name,
    size,
    color=COLORS["ink"],
    bold=False,
    italic=False,
    east_asia=FONT_CJK,
) -> None:
    style.font.name = name
    style.font.size = Pt(size)
    style.font.bold = bold
    style.font.italic = italic
    style.font.color.rgb = RGBColor.from_string(color)
    r_pr = style._element.get_or_add_rPr()
    r_fonts = r_pr.rFonts
    if r_fonts is None:
        r_fonts = OxmlElement("w:rFonts")
        r_pr.insert(0, r_fonts)
    r_fonts.set(qn("w:ascii"), name)
    r_fonts.set(qn("w:hAnsi"), name)
    r_fonts.set(qn("w:eastAsia"), east_asia)


def set_style_spacing(style, before=0, after=0, line=1.2, keep_next=False) -> None:
    pf = style.paragraph_format
    pf.space_before = Pt(before)
    pf.space_after = Pt(after)
    pf.line_spacing = line
    pf.keep_with_next = keep_next


def add_field(run, instruction: str) -> None:
    fld_char1 = OxmlElement("w:fldChar")
    fld_char1.set(qn("w:fldCharType"), "begin")
    instr_text = OxmlElement("w:instrText")
    instr_text.set(qn("xml:space"), "preserve")
    instr_text.text = instruction
    fld_char2 = OxmlElement("w:fldChar")
    fld_char2.set(qn("w:fldCharType"), "end")
    run._r.extend([fld_char1, instr_text, fld_char2])


def build_document(language: str) -> Document:
    doc = Document()
    section = doc.sections[0]
    # A4 with a 6.5-inch text block: familiar to Chinese academic submissions
    # while preserving the exact 9360-DXA geometry used by report tables.
    section.page_width = Inches(8.27)
    section.page_height = Inches(11.69)
    section.orientation = WD_ORIENT.PORTRAIT
    section.top_margin = Inches(0.86)
    section.bottom_margin = Inches(0.82)
    section.left_margin = Inches(0.885)
    section.right_margin = Inches(0.885)
    section.header_distance = Inches(0.492)
    section.footer_distance = Inches(0.492)
    section.different_first_page_header_footer = True

    styles = doc.styles
    configure_style(styles["Normal"], FONT_EN, 10.5)
    set_style_spacing(styles["Normal"], after=4, line=1.18)
    styles["Normal"].paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    styles["Normal"].paragraph_format.widow_control = True

    configure_style(
        styles["Title"], FONT_HEADING_EN, 22, COLORS["ink"], bold=True, east_asia=FONT_HEADING_CJK
    )
    set_style_spacing(styles["Title"], after=6, line=1.05, keep_next=True)
    title_p_pr = styles["Title"]._element.get_or_add_pPr()
    title_border = title_p_pr.find(qn("w:pBdr"))
    if title_border is not None:
        title_p_pr.remove(title_border)
    configure_style(
        styles["Subtitle"], FONT_HEADING_EN, 13, COLORS["gray"], bold=False, east_asia=FONT_HEADING_CJK
    )
    set_style_spacing(styles["Subtitle"], after=12, line=1.1, keep_next=True)
    configure_style(
        styles["Heading 1"], FONT_HEADING_EN, 14, COLORS["ink"], bold=True, east_asia=FONT_HEADING_CJK
    )
    set_style_spacing(styles["Heading 1"], before=16, after=8, line=1.1, keep_next=True)
    styles["Heading 1"].paragraph_format.page_break_before = False
    configure_style(
        styles["Heading 2"], FONT_HEADING_EN, 12, COLORS["ink"], bold=True, east_asia=FONT_HEADING_CJK
    )
    set_style_spacing(styles["Heading 2"], before=12, after=6, line=1.1, keep_next=True)
    configure_style(
        styles["Heading 3"], FONT_HEADING_EN, 10.5, COLORS["ink"], bold=True, east_asia=FONT_HEADING_CJK
    )
    set_style_spacing(styles["Heading 3"], before=8, after=4, line=1.1, keep_next=True)
    configure_style(styles["Caption"], FONT_EN, 9, COLORS["ink"], italic=False)
    set_style_spacing(styles["Caption"], before=4, after=8, line=1.1)

    for list_name in ("List Bullet", "List Number"):
        configure_style(styles[list_name], FONT_EN, 10.5)
        set_style_spacing(styles[list_name], after=4, line=1.208)
        styles[list_name].paragraph_format.left_indent = Inches(0.375)
        styles[list_name].paragraph_format.first_line_indent = Inches(-0.194)

    header = section.header
    p = header.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    label = "EconMark：证据约束型智能评阅系统" if language == "zh" else "EconMark: Evidence-Constrained Intelligent Assessment"
    run = p.add_run(label)
    set_run_font(run, size=8, italic=True, color=COLORS["gray"])

    footer = section.footer
    fp = footer.paragraphs[0]
    fp.alignment = WD_ALIGN_PARAGRAPH.CENTER
    page_run = fp.add_run()
    set_run_font(page_run, size=9, color=COLORS["ink"])
    add_field(page_run, "PAGE")

    core = doc.core_properties
    core.author = "EconMark"
    core.title = (
        "EconMark 参赛作品说明书（中文）"
        if language == "zh"
        else "EconMark Competition Report (English)"
    )
    core.subject = "Teacher-first, evidence-locked IGCSE Economics marking assistant"
    core.keywords = "EconMark, IGCSE Economics, handwriting, evidence-locked marking, teacher review"
    return doc


def add_text(doc, text, style=None, bold_lead=None, align=None, color=None):
    p = doc.add_paragraph(style=style)
    if bold_lead and text.startswith(bold_lead):
        r1 = p.add_run(bold_lead)
        set_run_font(r1, bold=True, color=color)
        r2 = p.add_run(text[len(bold_lead):])
        set_run_font(r2, color=color)
    else:
        r = p.add_run(text)
        set_run_font(r, color=color)
    if align is not None:
        p.alignment = align
    return p


def add_kicker(doc, text):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_after = Pt(10)
    p.paragraph_format.keep_with_next = True
    r = p.add_run(text.upper())
    set_run_font(
        r,
        size=9,
        bold=True,
        color=COLORS["ink"],
    )
    r.font.small_caps = True
    return p


def add_horizontal_rule(doc, color=COLORS["line"], size="8", after=14):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(after)
    p_pr = p._p.get_or_add_pPr()
    borders = p_pr.find(qn("w:pBdr"))
    if borders is None:
        borders = OxmlElement("w:pBdr")
        p_pr.append(borders)
    bottom = OxmlElement("w:bottom")
    bottom.set(qn("w:val"), "single")
    bottom.set(qn("w:sz"), size)
    bottom.set(qn("w:space"), "1")
    bottom.set(qn("w:color"), color)
    borders.append(bottom)
    return p


def add_labeled_text(doc, label: str, text: str):
    p = doc.add_paragraph()
    p.paragraph_format.keep_together = True
    r = p.add_run(label)
    set_run_font(
        r,
        bold=True,
        color=COLORS["ink"],
    )
    r = p.add_run(text)
    set_run_font(r)
    return p


def add_contents_page(doc, language: str, page_numbers: list[int]):
    if language == "zh":
        kicker = "报告导航"
        title = "目录"
        intro = "本报告依照研究与设计报告的逻辑组织，并将比赛四项评分维度分别落实到可核验的产品、测试与提交证据。"
        entries = [
            ("摘要", "研究目的、方法、现阶段结果与结论"),
            ("1", "研究背景、问题界定与功能定位"),
            ("2", "设计思路与技术方法"),
            ("3", "创新机制"),
            ("4", "应用场景与使用说明"),
            ("5", "实际效果与评价方法"),
            ("6", "完整性、数据治理与风险控制"),
            ("7", "推广价值与可迁移性"),
            ("8", "评审指标对照与提交证据"),
            ("9", "结论"),
            ("参考", "参考与证据来源"),
            ("附录 A", "评价指标的操作性定义"),
        ]
        note_title = "阅读说明"
        note_body = "“已完成”仅指功能验证或文档证据已经形成；真实学生基准测试、公开分享链接和过程性开发截图仍按第 8 节所列状态执行。"
    else:
        kicker = "REPORT NAVIGATION"
        title = "Contents"
        intro = "The report follows a research-and-design structure and links each competition dimension to inspectable product, testing, and submission evidence."
        entries = [
            ("Abstract", "Purpose, method, current results, and conclusion"),
            ("1", "Background, problem definition, and functional scope"),
            ("2", "Design rationale and technical method"),
            ("3", "Innovative mechanisms"),
            ("4", "Application scenarios and operating instructions"),
            ("5", "Demonstrated effects and evaluation method"),
            ("6", "Completeness, data governance, and risk control"),
            ("7", "Promotion value and transferability"),
            ("8", "Competition rubric and submission evidence"),
            ("9", "Conclusion"),
            ("References", "Evidence provenance"),
            ("Appendix A", "Operational definitions of evaluation metrics"),
        ]
        note_title = "Reading note"
        note_body = "‘Complete’ refers only to functional or documentary evidence already produced. The real-student benchmark, public share link, and development-process screenshots retain the statuses stated in Section 8."

    add_kicker(doc, kicker)
    add_heading(doc, title, 1)
    add_text(doc, intro)
    for (number, heading), page in zip(entries, page_numbers):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(5)
        p.paragraph_format.keep_together = True
        p.paragraph_format.tab_stops.add_tab_stop(
            Inches(6.15), WD_TAB_ALIGNMENT.RIGHT, WD_TAB_LEADER.DOTS
        )
        r = p.add_run(f"{number}  ")
        set_run_font(
            r,
            bold=True,
            color=COLORS["coral"],
            name=FONT_HEADING_EN,
            east_asia=FONT_HEADING_CJK,
        )
        r = p.add_run(heading)
        set_run_font(r)
        r = p.add_run(f"\t{page}")
        set_run_font(r, color=COLORS["gray"])
    add_callout(doc, note_title, note_body, fill=COLORS["cream"], accent=COLORS["teal"])
    add_page_break(doc)


def add_heading(doc, text, level=1):
    p = doc.add_heading(text, level=level)
    p.paragraph_format.keep_with_next = True
    sizes = {1: 14, 2: 12, 3: 10.5}
    for run in p.runs:
        set_run_font(
            run,
            size=sizes.get(level, 10.5),
            bold=True,
            color=COLORS["ink"],
            name=FONT_EN,
            east_asia=FONT_CJK,
        )
    return p


def add_callout(doc, heading, body, fill=COLORS["mint"], accent=COLORS["teal"]):
    table = doc.add_table(rows=1, cols=1)
    set_table_width(table, [9360], indent_dxa=120)
    cell = table.cell(0, 0)
    set_cell_shading(cell, fill)
    set_cell_border(cell, color="777777", size="6")
    cell.text = ""
    p = cell.paragraphs[0]
    p.paragraph_format.space_after = Pt(4)
    p.paragraph_format.keep_with_next = True
    r = p.add_run(heading)
    set_run_font(r, size=10.5, bold=True, color=COLORS["ink"])
    p2 = cell.add_paragraph()
    p2.paragraph_format.space_after = Pt(0)
    r2 = p2.add_run(body)
    set_run_font(r2, size=10, color=COLORS["ink"])
    doc.add_paragraph().paragraph_format.space_after = Pt(0)
    return table


def add_bullets(doc, items, numbered=False):
    style = "List Number" if numbered else "List Bullet"
    num_id = create_numbering_id(doc) if numbered else None
    for item in items:
        p = doc.add_paragraph(style=style)
        if num_id is not None:
            p_pr = p._p.get_or_add_pPr()
            num_pr = p_pr.find(qn("w:numPr"))
            if num_pr is None:
                num_pr = OxmlElement("w:numPr")
                p_pr.append(num_pr)
            ilvl = OxmlElement("w:ilvl")
            ilvl.set(qn("w:val"), "0")
            num_id_node = OxmlElement("w:numId")
            num_id_node.set(qn("w:val"), str(num_id))
            num_pr.extend([ilvl, num_id_node])
        r = p.add_run(item)
        set_run_font(r)


def create_numbering_id(doc) -> int:
    numbering = doc.part.numbering_part.element
    abstract_id = None
    for abstract in numbering.findall(qn("w:abstractNum")):
        level = abstract.find(qn("w:lvl"))
        if level is None:
            continue
        num_fmt = level.find(qn("w:numFmt"))
        if num_fmt is not None and num_fmt.get(qn("w:val")) == "decimal":
            abstract_id = abstract.get(qn("w:abstractNumId"))
            break
    if abstract_id is None:
        raise RuntimeError("The default DOCX template has no decimal numbering definition.")

    existing = [int(node.get(qn("w:numId"))) for node in numbering.findall(qn("w:num"))]
    num_id = max(existing, default=0) + 1
    num = OxmlElement("w:num")
    num.set(qn("w:numId"), str(num_id))
    abstract_ref = OxmlElement("w:abstractNumId")
    abstract_ref.set(qn("w:val"), abstract_id)
    num.append(abstract_ref)
    override = OxmlElement("w:lvlOverride")
    override.set(qn("w:ilvl"), "0")
    start = OxmlElement("w:startOverride")
    start.set(qn("w:val"), "1")
    override.append(start)
    num.append(override)
    numbering.append(num)
    return num_id


def add_table(doc, headers, rows, widths_dxa, status_col=None):
    table = doc.add_table(rows=1, cols=len(headers))
    set_table_width(table, widths_dxa)
    hdr = table.rows[0]
    set_repeat_table_header(hdr)
    for idx, label in enumerate(headers):
        cell = hdr.cells[idx]
        clear_cell_borders(cell)
        set_cell_edge(cell, "top", size="12")
        set_cell_edge(cell, "bottom", size="8")
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.paragraph_format.space_after = Pt(0)
        r = p.add_run(label)
        set_run_font(r, size=9, bold=True, color=COLORS["ink"])
    for row_idx, values in enumerate(rows):
        cells = table.add_row().cells
        for idx, value in enumerate(values):
            clear_cell_borders(cells[idx])
            if row_idx == len(rows) - 1:
                set_cell_edge(cells[idx], "bottom", size="12")
            p = cells[idx].paragraphs[0]
            p.paragraph_format.space_after = Pt(0)
            is_status = status_col is not None and idx == status_col
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER if is_status else WD_ALIGN_PARAGRAPH.LEFT
            r = p.add_run(str(value))
            set_run_font(r, size=9, bold=is_status, color=COLORS["ink"])
    doc.add_paragraph().paragraph_format.space_after = Pt(0)
    return table


def add_table_caption(doc, caption: str):
    p = doc.add_paragraph(style="Caption")
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.keep_with_next = True
    p.paragraph_format.space_before = Pt(6)
    p.paragraph_format.space_after = Pt(4)
    r = p.add_run(caption)
    set_run_font(r, size=9, color=COLORS["ink"])
    return p


def add_figure(doc, image_path: Path, caption: str, width=5.95):
    if not image_path.exists():
        raise FileNotFoundError(image_path)
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before = Pt(4)
    p.paragraph_format.space_after = Pt(1)
    p.paragraph_format.keep_with_next = True
    run = p.add_run()
    shape = run.add_picture(str(image_path), width=Inches(width))
    doc_pr = shape._inline.docPr
    doc_pr.set("descr", caption)
    cp = doc.add_paragraph(style="Caption")
    cp.alignment = WD_ALIGN_PARAGRAPH.CENTER
    cr = cp.add_run(caption)
    set_run_font(cr, size=8.5, color=COLORS["ink"])


def add_equation(doc, expression: str, number: int):
    """Add a centered display equation with a right-aligned equation number."""
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before = Pt(6)
    p.paragraph_format.space_after = Pt(6)
    p.paragraph_format.keep_together = True
    p.paragraph_format.tab_stops.add_tab_stop(Inches(6.25), WD_TAB_ALIGNMENT.RIGHT)
    r = p.add_run(expression)
    set_run_font(r, size=10.5, name=FONT_MATH, east_asia=FONT_CJK)
    r.italic = True
    n = p.add_run(f"\t({number})")
    set_run_font(n, size=10, name=FONT_EN, east_asia=FONT_CJK)
    return p


def add_page_break(doc):
    p = doc.add_paragraph()
    p.add_run().add_break(WD_BREAK.PAGE)


def remove_trailing_empty_paragraphs(doc):
    while doc.paragraphs and not doc.paragraphs[-1].text.strip():
        paragraph = doc.paragraphs[-1]
        parent = paragraph._element.getparent()
        parent.remove(paragraph._element)


def add_cover(doc, language):
    if language == "zh":
        kicker = "苏外教育集团首届教师智能体设计大赛"
        subtitle = "IGCSE 经济学论述题智评助手"
        report = "参赛作品说明书 · 中文版"
        promise = "从手写作答到有据可查的评分"
        detail = "证据锁定 · 可配置批量评分 · 双语反馈 · 永久账户审计 · 模型 API 可切换"
        date = "版本 2.0 · 2026 年 8 月 4 日"
    else:
        kicker = "SUWAI EDUCATION GROUP · FIRST TEACHER AGENT DESIGN COMPETITION"
        subtitle = "IGCSE Economics Essay Marking Assistant"
        report = "Competition Report · English Companion"
        promise = "From handwritten response to evidence-based provisional mark"
        detail = "Teacher-first · evidence-locked · 30-script batches · bilingual feedback · provider-neutral APIs"
        date = "Version 3.0 · 9 August 2026"

    doc.add_paragraph().paragraph_format.space_after = Pt(30)
    add_kicker(doc, kicker)
    title = doc.add_paragraph(style="Title")
    run = title.add_run("EconMark")
    set_run_font(run, size=32, bold=True, color=COLORS["teal"])
    sub = doc.add_paragraph(style="Subtitle")
    r = sub.add_run(subtitle)
    set_run_font(r, size=15, color=COLORS["coral"])
    rep = doc.add_paragraph()
    rep.paragraph_format.space_after = Pt(22)
    rr = rep.add_run(report)
    set_run_font(rr, size=11, bold=True, color=COLORS["gray"])

    table = doc.add_table(rows=1, cols=1)
    set_table_width(table, [9120], indent_dxa=120)
    cell = table.cell(0, 0)
    set_cell_shading(cell, COLORS["teal"])
    set_cell_border(cell, color=COLORS["teal"], size="12")
    cell.text = ""
    p = cell.paragraphs[0]
    p.paragraph_format.space_after = Pt(6)
    pr = p.add_run(promise)
    set_run_font(pr, size=16, bold=True, color=COLORS["white"])
    p2 = cell.add_paragraph()
    p2.paragraph_format.space_after = Pt(0)
    p2r = p2.add_run(detail)
    set_run_font(p2r, size=9.5, color="DDEDE8")

    doc.add_paragraph().paragraph_format.space_after = Pt(24)
    date_p = doc.add_paragraph()
    date_p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    date_r = date_p.add_run(date)
    set_run_font(date_r, size=9.5, color=COLORS["gray"])
    add_page_break(doc)


def add_academic_cover(doc, language):
    if language == "zh":
        competition = "苏外教育集团首届教师智能体设计大赛"
        title = "EconMark"
        subtitle = "面向 IGCSE 经济学手写论述题的证据约束型智能评阅系统"
        report = "参赛作品说明书（中文版）"
        metadata = [
            ["参赛方向", "教学辅助类", "主要用户", "IGCSE 经济学教师"],
            ["适用题型", "Analyse [6] / Discuss [8]", "系统形态", "自建智能体 + 可替换模型 API"],
            ["研究方法", "设计研究 + 功能验证", "证据状态", "合成验证完成；真实基准待完成"],
            ["报告版本", "3.0", "编制日期", "2026 年 8 月 9 日"],
        ]
        statement = "以教师确认、逐项证据和独立复核为方法约束，研究如何提高同题手写作答的批改与形成性反馈效率。"
    else:
        competition = "SUWAI EDUCATION GROUP · FIRST TEACHER AGENT DESIGN COMPETITION"
        title = "EconMark"
        subtitle = "An Evidence-Constrained Intelligent Assessment System for Handwritten IGCSE Economics Essays"
        report = "Competition Report (English Companion)"
        metadata = [
            ["Category", "Teaching Support", "Primary user", "IGCSE Economics teacher"],
            ["Supported tasks", "Analyse [6] / Discuss [8]", "System form", "Custom agent + replaceable model APIs"],
            ["Method", "Design research + functional validation", "Evidence status", "Synthetic validation complete; real benchmark pending"],
            ["Report version", "3.0", "Date", "9 August 2026"],
        ]
        statement = "Teacher confirmation, traceable evidence, and independent review constrain the investigation of more efficient marking and formative feedback for handwritten responses."

    doc.add_paragraph().paragraph_format.space_after = Pt(54)
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_after = Pt(14)
    r = p.add_run(competition)
    set_run_font(
        r,
        size=10.5,
        bold=True,
        color=COLORS["ink"],
    )

    p = doc.add_paragraph(style="Title")
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p.add_run(title)
    set_run_font(
        r,
        size=26,
        bold=True,
        color=COLORS["ink"],
        name=FONT_EN,
        east_asia=FONT_CJK,
    )

    p = doc.add_paragraph(style="Subtitle")
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p.add_run(subtitle)
    set_run_font(
        r,
        size=14,
        color=COLORS["ink"],
        name=FONT_EN,
        east_asia=FONT_CJK,
    )

    add_horizontal_rule(doc, color=COLORS["ink"], size="4", after=12)

    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_after = Pt(20)
    r = p.add_run(report)
    set_run_font(r, size=11, color=COLORS["ink"])

    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.left_indent = Inches(0.45)
    p.paragraph_format.right_indent = Inches(0.45)
    p.paragraph_format.space_after = Pt(24)
    r = p.add_run(statement)
    set_run_font(r, size=11, color=COLORS["ink"])

    table = doc.add_table(rows=len(metadata), cols=4)
    set_table_width(table, [1500, 3180, 1500, 3180], indent_dxa=120)
    for row_idx, values in enumerate(metadata):
        for col_idx, value in enumerate(values):
            cell = table.rows[row_idx].cells[col_idx]
            clear_cell_borders(cell)
            if row_idx == 0:
                set_cell_edge(cell, "top", size="12")
            if row_idx == len(metadata) - 1:
                set_cell_edge(cell, "bottom", size="12")
            p = cell.paragraphs[0]
            p.alignment = WD_ALIGN_PARAGRAPH.LEFT
            p.paragraph_format.space_after = Pt(0)
            r = p.add_run(value)
            set_run_font(
                r,
                size=9.5,
                bold=col_idx in (0, 2),
                color=COLORS["ink"],
            )

    add_page_break(doc)


def build_chinese() -> Document:
    doc = build_document("zh")
    add_academic_cover(doc, "zh")

    add_kicker(doc, "作品摘要")
    add_heading(doc, "一套能真正用于周末作业的教师评分工作流", 1)
    add_text(
        doc,
        "EconMark 面向 Cambridge IGCSE Economics 0455 的手写结构化论述题。它把作答图片转写为可核对文本，确认题目与评分标准，再将每一项得分锁定到学生原文和评分标准，输出暂定分数、中英双语反馈以及针对弱点的巩固问题。系统支持单份精细复核和服务器容量可配置的周末作业批量处理，并为每名已终审学生恰好生成一份可直接发放的反馈评分单，支持逐人、每页两份及每人一页打印。",
    )
    add_callout(
        doc,
        "核心承诺",
        "机器只提出“暂定分数”。未经教师认可、调整或拒绝，系统不会生成最终成绩；低置信度、评分器分歧或缺失证据会进入异常优先审核队列。",
    )
    add_table(
        doc,
        ["维度", "当前设计"],
        [
            ["教育痛点", "一道结构化题通常对应约 30 份手写答案；逐份记录证据、写反馈和准备巩固题耗时且易重复。"],
            ["核心产出", "暂定分数、逐项原文证据、置信度、双语反馈、1—2 道针对性巩固题、教师审核记录与打印包。"],
            ["部署路线", "自建 EconMark 网页应用连接可替换的模型 API；Coze 可作为可选展示或发布层，但不是系统依赖。"],
            ["当前状态", "61 项自动化测试通过；默认自动批量入口、单份与 30 人合成流程、学生批注隔离、账户隔离、永久图片、可见先决条件提示和自动终审均已验证；真实学生基准测试尚待执行。"],
        ],
        [1900, 7220],
    )

    add_heading(doc, "1. 智能体名称及功能介绍", 1)
    add_heading(doc, "1.1 产品定位", 2)
    add_text(doc, "名称：EconMark — IGCSE 经济学论述题智评助手。主要用户是教师；学生是反馈接收者，而不是评分决策者。V1 只支持 Cambridge IGCSE Economics 0455 的 6 分 Analyse 和 8 分 Discuss，不自动处理图表题、计算题、多题边界不清、未确认转写或缺少评分标准的情况。")
    add_bullets(
        doc,
        [
            "图片优先：上传匿名手写作答，保留原有拼写、删除线和可见修改。",
            "双确认关口：教师必须确认转写文本，以及题目、指令词、满分与评分标准。",
            "证据锁定：每一项拟给分必须同时包含学生原文摘录和评分标准引用，且禁止同一证据重复计分。",
            "独立复核：初评分与复核分相差 1 分时进入裁定；相差 2 分或跨等级时强制人工审核。",
            "反馈闭环：固定分数后生成等价的英文和简体中文反馈、两个优先改进点及 1—2 道针对性问题。",
            "批量作业：人数、文件量和并发均由服务器配置，单份失败不会中止全班。",
        ],
    )

    add_heading(doc, "1.2 教师优先工作流", 2)
    add_table(
        doc,
        ["步骤", "系统动作", "教师控制点"],
        [
            ["1. 图片接收", "检查文件类型、页数与基本可用性。", "只上传匿名作答；模糊或边界不清时重新拍摄。"],
            ["2. 视觉转写", "保留原文并标记不确定片段。", "逐字核对并确认，未确认不评分。"],
            ["3. 评分标准解析", "识别指令词、满分、等级、上限与可给分内容。", "确认题目和评分标准为唯一依据。"],
            ["4. 证据与评分", "抽取因果链、反方、评价和判断，并锁定原文。", "检查引用与评分标准是否对应。"],
            ["5. 独立复核", "第二评分器查找过度给分、重复证据和术语错误。", "分歧过大时必须人工裁决。"],
            ["6. 反馈与决定", "生成双语反馈、改进提纲和巩固题。", "认可、调整或拒绝后才形成最终记录。"],
        ],
        [1050, 3930, 4140],
    )

    add_page_break(doc)
    add_heading(doc, "中文优先的公开演示界面", 2)
    add_text(doc, "评委进入页面后不需要配置模型或登录即可理解完整流程。中文是主要信息层，英文只保留为 Cambridge 指令词、评分概念和未来国际化使用的辅助说明。公开模式只使用原创合成作答，并明确提示不得上传带有学生身份信息的真实作业。")
    add_figure(doc, IMAGES["home"], "图 1　中文优先的公开演示首页：范围、隐私提醒与五步教师审核流程", width=5.75)

    add_page_break(doc)
    add_heading(doc, "2. 设计思路与创新点", 1)
    add_heading(doc, "2.1 从“模型给分”转向“证据可审查”", 2)
    add_text(doc, "EconMark 的核心不是让大模型模仿教师给出一个数字，而是把评分变成可追踪的证据表。每条得分记录都包含原文引句、评分标准编号、经济学理由、分值和质量标记；程序再验证引句确实存在于已确认转写中，并阻止同一片段被重复计分。这使教师可以快速判断“为什么得这分”，而不是接受无法解释的黑箱结论。")
    add_heading(doc, "2.2 双评分器、裁定器与置信度闸门", 2)
    add_text(doc, "初评分和独立复核采用隔离的评分过程。复核器主动寻找过度给分、无依据推断、重复证据、单边讨论以及经济术语误用。结果分歧 1 分时进入裁定；分歧 2 分或跨等级时不自动调和，而是显示范围并要求教师复核。置信度还综合转写质量、评分标准完整性和证据覆盖率。")
    add_heading(doc, "2.3 模型供应商中立", 2)
    add_text(doc, "系统把转写、评分、复核、裁定和反馈拆成独立角色，并通过服务器端适配层连接模型 API。教师可按角色选择 Qwen、Kimi 或 DeepSeek 等兼容服务：视觉转写只能选择具备图像能力的模型；文本评分可单独路由；复核可使用另一家模型以降低同源偏差。API 密钥只保存在服务器环境变量中，不进入浏览器或导出记录。")
    add_callout(doc, "为什么不把 Coze 设为核心依赖", "比赛允许其他主流智能体平台，只要功能完整并能提供可访问的分享链接。自建前端与标准化数据合同能避免平台锁定、便于批量处理和打印，也能在未来更换模型。若需要，Coze 仍可作为轻量演示入口或工作流镜像。", fill=COLORS["cream"], accent=COLORS["coral"])
    add_heading(doc, "2.4 中文优先、双语可用", 2)
    add_text(doc, "公开界面、操作提示、审核状态和打印包均以中文为主，减少中国评委和教师的理解成本；学生原文与 Cambridge 指令词保持英文，反馈同时提供英文和简体中文。翻译节点不得改变分数，也不得添加学生没有写出的经济观点。")

    add_page_break(doc)
    add_heading(doc, "评分证据与中文反馈界面", 2)
    add_figure(doc, IMAGES["evidence"], "图 2　每一项拟给分均锁定到学生原文，并显示初评分、复核分与裁定分", width=5.75)
    add_page_break(doc)
    add_figure(doc, IMAGES["feedback"], "图 3　中文反馈保留原文证据，并提供两个优先改进点和针对性巩固方向", width=5.75)

    add_page_break(doc)
    add_heading(doc, "3. 应用场景与使用说明", 1)
    add_heading(doc, "3.1 比赛公开演示", 2)
    add_text(doc, "评委可从三份原创合成手写样例中选择基础、中等或优秀作答。样例已预置原创题目和评分标准，不含 Cambridge 官方材料，也不需要 API 密钥。评委依次确认转写、确认评分标准、运行证据锁定评分、查看中文反馈，并体验教师认可、调整或拒绝。")
    add_heading(doc, "3.2 未来周末作业场景", 2)
    add_text(doc, "教师每周只需建立一个作业批次：同一道结构化题、同一份评分标准和整班手写答案。系统按服务器配置并行处理，优先呈现异常、失败、低置信度和评分分歧；人工模式可批量认可无风险结果，全自动模式只自动终审通过硬性门槛的结果。最终生成全班 CSV/JSON 审计记录和双栏 A4 反馈包。")
    add_bullets(
        doc,
        [
            "输入题目、指令词、满分和教师评分标准，并确认本批次设置。",
            "拖入服务器容量允许的 JPG、PNG 或 WEBP；文件名自动生成可编辑的学生代号。",
            "启动批量评分；界面显示每份进度，单份错误不影响其他学生。",
            "先审核异常队列，再批量认可无风险的高置信度结果。",
            "对需要调整的作答填写教师分数和原因；所有最终分仍由教师决定。",
            "自动核对打印覆盖率，为每名已终审学生生成一份个性化反馈评分单；可逐人打印、每页两份裁切发放，或每人一页。",
        ],
        numbered=True,
    )

    add_heading(doc, "3.3 反馈设计", 2)
    add_text(doc, "每份反馈单包括暂定或教师最终分、已有优点、两个优先改进点以及 1—2 道与本题主题直接相关的巩固问题。巩固题不是通用模板，而是根据缺失机制、评价不足或判断不充分等具体弱点选择。V1 不直接生成完整替代作文，以避免学生只抄答案而没有针对性重写。")

    add_page_break(doc)
    add_heading(doc, "30 份批量审核与异常优先", 2)
    add_figure(doc, IMAGES["batch"], "图 4　30 份合成作答已全部处理：20 份高置信度结果可批量认可，10 份保留人工复核", width=6.15)
    add_page_break(doc)
    add_heading(doc, "可直接打印的全班反馈包", 2)
    add_figure(doc, IMAGES["pack"], "图 5　已审核结果按每页两份排版，包含中英反馈和针对性巩固问题", width=6.15)

    add_page_break(doc)
    add_heading(doc, "4. 实际效果、测试结果与诚实边界", 1)
    add_text(doc, "截至 2026 年 8 月 4 日，以下结果来自自动化测试和原创合成浏览器演示。它们证明流程、数据合同、教师闸门和批量打印能够工作，但不能替代真实学生作答上的准确率与节时验证。")
    add_table(
        doc,
        ["验证项目", "结果", "证据含义"],
        [
            ["自动化合同与工作流测试", "61/61 通过", "覆盖默认批量入口、评分范围、原文证据、学生批注隔离、重复计分、双语一致、账户所有权、永久图片、可见先决条件提示、批量并发、失败隔离和终审来源。"],
            ["单份中等合成作答", "初评 5/8；复核 4/8；裁定 5/8", "证明独立复核和 1 分分歧裁定链路可以被观察，而不是静默覆盖。"],
            ["30 份合成批量作答", "30/30 完成", "20 份高置信度无风险结果进入批量认可；10 份中置信度结果保留教师复核。"],
            ["反馈打印包", "30/30 份学生单；节纸模式 15 张 A4", "每名已终审学生恰好一份；显示覆盖缺口，并支持逐人、每页两份或每人一页打印。"],
            ["真实学生基准测试", "尚未完成", "不得据此声称真实准确率、教师节时比例或课堂效果。"],
            ["真实模型 API 对比", "配置已实现，待密钥与固定样本", "需在相同 10 份开发样本上比较转写和评分质量后再冻结模型。"],
        ],
        [2300, 1900, 4920],
        status_col=1,
    )
    add_heading(doc, "4.1 提交前的真实样本评价门槛", 2)
    add_bullets(
        doc,
        [
            "50 份匿名真实作答：25 份 Analyse、25 份 Discuss；覆盖至少 10 道题和弱、中、强三个水平。",
            "精确分一致率至少 75%，一分以内一致率至少 95%，加权 Cohen’s kappa 至少 0.80。",
            "清晰作答转写准确率至少 98%，总体至少 95%；不可辨认片段单独标记。",
            "至少 10 份作答比较纯手工评分和系统辅助审核时间，目标节省至少 50%。",
            "反馈的准确性、具体性、可操作性和语气由教师评分，平均至少 4.5/5。",
        ],
    )
    add_callout(doc, "发布原则", "任何门槛未达标时，应缩小支持范围并公开限制，不隐藏评分分歧，也不把合成样例结果包装成真实教学成效。", fill=COLORS["cream"], accent=COLORS["coral"])

    add_heading(doc, "5. 完整性、数据治理与风险控制", 1)
    add_heading(doc, "5.1 公开比赛模式", 2)
    add_bullets(
        doc,
        [
            "无需登录，只展示原创题目、原创评分标准和三份合成手写作答。",
            "页面警示评委和访客不得上传含学生姓名、班级或其他身份信息的真实作业。",
            "公开提交不持久化，官方 Cambridge 材料不进入公开知识库。",
            "所有输出标注为暂定分数；教师审核前最终分字段保持为空。",
        ],
    )
    add_heading(doc, "5.2 统一账户与永久审计", 2)
    add_text(doc, "任何访客均可运行原创合成样例；创建同等功能账户后可上传真实作答。密码采用 Argon2id，状态变更使用 HttpOnly 会话、同源与 CSRF 保护。原图、转写、评分标准哈希、提示词与模型版本、证据表、终审来源和覆盖理由永久保存于 VPS，并由服务器按账户所有权隔离；达到容量配额时拒绝新增而不删除旧记录。")
    add_heading(doc, "5.3 明确失败状态", 2)
    add_text(doc, "系统对模糊、旋转、裁切、缺页、多名学生同图、题目与满分冲突、图表依赖、学生提示注入、跨批次数据泄漏和导出失败等情形设置拒绝或人工复核路径。失败时给出恢复建议，而不是强行生成分数。")

    add_heading(doc, "6. 推广价值与可持续架构", 1)
    add_text(doc, "EconMark 目前有意保持经济学专用：高质量、可解释的窄范围工具比过早扩展到多个学科更有说服力。与此同时，评分标准、证据记录、教师决定、审计记录和反馈输出均采用版本化 JSON Schema。其他学科教师未来只需替换评分标准解析和学科反馈描述，不必重建图片接收、确认闸门、异常队列、审计、导出和打印。")
    add_table(
        doc,
        ["层", "可替换内容", "保持稳定的内容"],
        [
            ["模型层", "Qwen、Kimi、DeepSeek 或其他兼容 API；各角色可单独选择。", "角色输入输出、结构化校验、重试与置信度闸门。"],
            ["发布层", "自建网页、校内服务器、Dify、Coze 入口或其他国内可访问平台。", "核心评分合同、提示词版本、评估集和审计记录。"],
            ["学科层", "题型、评分标准、术语检查和反馈描述。", "图片—确认—证据—复核—教师决定—导出流程。"],
        ],
        [1600, 3700, 3820],
    )

    add_heading(doc, "7. 对照比赛评分标准的证据规划", 1)
    add_table(
        doc,
        ["评分维度", "作品证据", "提交前补强"],
        [
            ["实用性 35%", "单份与 30 份批量流程、异常优先审核、打印反馈包、教师最终决定。", "完成 50 份真实作答盲评和至少 10 份节时测试。"],
            ["创新性 25%", "转写确认、证据锁定、独立复核/裁定、模型供应商中立、双语反馈与审计链。", "展示早期版本中过度给分和转写错误如何被闸门纠正。"],
            ["完整性 20%", "61 项测试通过；三份合成样例；30 人自动批量入口；逐人批注稿；账户与永久图片；可见先决条件提示；失败隔离；JSON/CSV/打印导出。", "上线统一公开链接并完成 20 次连续演示、手机和校网测试。"],
            ["推广价值 20%", "版本化通用数据合同和可替换发布/模型层；经济学范围保持聚焦。", "附一页“迁移到另一学科”的评分标准替换模板。"],
        ],
        [1550, 4270, 3300],
    )

    add_page_break(doc)
    add_heading(doc, "8. 提交前完成清单", 1)
    add_bullets(
        doc,
        [
            "使用教师自有 API 密钥完成固定 10 份开发样本的模型对比并冻结角色配置。",
            "完成 50 份匿名真实作答的盲评、复评、准确率、kappa、转写与节时统计。",
            "部署中国境内可访问的免登录合成演示链接，在校网、手机和桌面完成 20 次连续测试。",
            "在报名材料中补齐参赛人、校区等身份信息，并把关键流程、测试和优化截图嵌入最终提交包。",
            "录制 3 分钟演示视频：痛点 → 图片与确认 → 证据锁定 → 30 份批量 → 打印反馈 → 实测结果。",
        ],
        numbered=True,
    )
    add_callout(doc, "结论", "EconMark 的竞争力不在于承诺“自动替代教师”，而在于把教师最耗时、最重复的证据整理和反馈制作变成可审查、可批量、可打印且可持续升级的工作流。", fill=COLORS["teal"], accent=COLORS["teal"])
    # Recolor the last callout body for its dark background.
    for table in doc.tables[-1:]:
        for paragraph in table.cell(0, 0).paragraphs:
            for run in paragraph.runs:
                set_run_font(run, color=COLORS["white"])

    add_heading(doc, "附录：版本与证据来源", 1)
    add_text(doc, "本说明书依据《关于举办苏外教育集团首届教师智能体设计大赛的通知》要求组织，覆盖名称与功能、设计思路与创新、应用场景与使用说明、实际效果及推广价值，并嵌入当前运行界面的过程证据。")
    add_bullets(
        doc,
        [
            "应用版本：econmark/4.0.0；工作流：econmark-workflow/3.0.0；提示词：econmark-prompts/3.0.0。",
            "功能验证日期：2026 年 8 月 9 日；自动化测试：61 项全部通过。",
            "界面截图均来自本机实际运行的公开合成模式，不包含真实学生资料。",
            "官方 Cambridge 题目与评分标准仅限经批准的登录账户流程，不嵌入公开知识库。",
        ],
    )
    return doc


def build_english() -> Document:
    doc = build_document("en")
    add_cover(doc, "en")

    add_kicker(doc, "EXECUTIVE SUMMARY")
    add_heading(doc, "A teacher-first workflow for handwritten weekend homework", 1)
    add_text(doc, "EconMark is designed for handwritten Cambridge IGCSE Economics 0455 structured essays. It transcribes an answer image, confirms or safely gates the transcript and rubric, locks every proposed credit to the student’s own words and supplied criteria, and produces a provisional mark with bilingual feedback and targeted follow-up questions. It supports careful single-answer review and server-configured weekend-homework batches, followed by exactly one printable feedback and mark sheet per finalized student, with individual, two-up, and full-page print modes.")
    add_callout(doc, "Core promise", "The system never creates a final mark by itself. A final record exists only after the teacher approves, adjusts, or rejects the provisional result. Low confidence, scorer disagreement, and missing evidence remain in an exception-first review queue.")
    add_table(
        doc,
        ["Dimension", "Current design"],
        [
            ["Teaching problem", "One structured question can mean roughly 30 handwritten answers, each requiring evidence checks, feedback, and follow-up practice."],
            ["Outputs", "Provisional mark, verbatim evidence, confidence, bilingual feedback, one or two targeted questions, teacher decision, and printable audit records."],
            ["Deployment", "A custom EconMark web application connected to switchable model APIs. Coze may be used as an optional presentation layer but is not a dependency."],
            ["Current status", "All 61 automated tests pass, including the automated-batch landing route, visible readiness blockers, isolated marker remarks, account ownership, permanent images, configurable batches, and automatic approval. Real-student benchmarking remains outstanding."],
        ],
        [1900, 7220],
    )

    add_heading(doc, "1. Agent name and functional scope", 1)
    add_heading(doc, "1.1 Positioning", 2)
    add_text(doc, "Name: EconMark — IGCSE Economics Essay Marking Assistant. The teacher is the primary user and final decision-maker. Version 1 supports only Cambridge IGCSE Economics 0455 Analyse [6] and Discuss [8] responses. It does not automatically mark diagrams, calculations, unclear multi-question pages, unconfirmed transcripts, or answers without a supplied mark scheme.")
    add_bullets(
        doc,
        [
            "Image-first intake that preserves spelling, deletions, paragraphing, and visible corrections.",
            "Two mandatory confirmation gates: transcript, then question and rubric.",
            "Evidence-locked scoring: every credit needs a verbatim quotation and rubric reference; duplicate credit is rejected.",
            "Independent review: a one-mark difference is adjudicated, while a two-mark or whole-level difference requires manual review.",
            "Bilingual feedback with two stable improvement priorities and one or two topic-linked questions.",
            "Batch homework: server-configured capacity and concurrency, with failure isolation for each student.",
        ],
    )

    add_heading(doc, "1.2 Teacher-first workflow", 2)
    add_table(
        doc,
        ["Stage", "System action", "Teacher control"],
        [
            ["1. Intake", "Validate files and basic image usability.", "Upload anonymised work; recapture unusable pages."],
            ["2. Transcription", "Preserve the student’s original wording and flag uncertainty.", "Correct and confirm before any marking occurs."],
            ["3. Rubric parsing", "Extract command word, maximum mark, levels, caps, and creditworthy content.", "Confirm the uploaded rubric as the sole authority."],
            ["4. Evidence and mark", "Extract chains, counterarguments, evaluation, and judgement with exact quotations.", "Check that each quotation supports the proposed credit."],
            ["5. Independent review", "Challenge over-crediting, duplicated evidence, one-sided discussion, and terminology errors.", "Resolve large disagreements manually."],
            ["6. Feedback and decision", "Generate bilingual feedback, an outline, and follow-up questions.", "Approve, adjust, or reject before a final record exists."],
        ],
        [1050, 3930, 4140],
    )

    add_page_break(doc)
    add_heading(doc, "Chinese-first public demonstration", 2)
    add_text(doc, "Judges can understand the complete product without logging in or configuring a model. Chinese is the primary interface language; English remains as a secondary layer for Cambridge command words and future international use. Public mode uses original synthetic answers only and warns visitors not to upload identifiable student work.")
    add_figure(doc, IMAGES["home"], "Figure 1. Chinese-first public home page with scope, privacy notice, and five teacher-controlled stages", width=5.75)

    add_page_break(doc)
    add_heading(doc, "2. Design rationale and innovations", 1)
    add_heading(doc, "2.1 Auditable evidence instead of a black-box number", 2)
    add_text(doc, "EconMark does not simply ask a model to imitate a teacher and return a score. It creates an evidence table in which each proposed credit has a student quotation, rubric reference, economic reason, mark value, and quality flags. Programmatic checks verify that the quotation occurs in the teacher-confirmed transcript and that the same evidence is not credited twice.")
    add_heading(doc, "2.2 Independent scoring, adjudication, and confidence gates", 2)
    add_text(doc, "The primary scorer and independent reviewer operate in isolated passes. The reviewer actively searches for unsupported assumptions, duplicated evidence, over-crediting, one-sided discussion, and misuse of economics terminology. A one-mark difference goes to adjudication; a difference of two or more marks or a whole level is shown to the teacher rather than silently reconciled.")
    add_heading(doc, "2.3 Provider-neutral model routing", 2)
    add_text(doc, "Transcription, primary scoring, review, adjudication, and feedback are separate roles behind a server-side adapter. The teacher can route roles to Qwen, Kimi, DeepSeek, or another compatible service. Only vision-capable models may handle transcription; text marking can use another provider; the reviewer can deliberately use a different model to reduce common-mode error. API keys remain on the server.")
    add_callout(doc, "Why Coze is optional", "The competition permits other mainstream agent platforms when the work is complete and accessible through a share link. A custom front end and versioned contracts reduce platform lock-in and better support batches and print layouts. Coze can still serve as a lightweight entry page or mirrored workflow.", fill=COLORS["cream"], accent=COLORS["coral"])
    add_heading(doc, "2.4 Chinese-first and genuinely bilingual", 2)
    add_text(doc, "The public interface, controls, statuses, review queue, and print pack prioritise Chinese for the competition audience. Student evidence and Cambridge command words remain in English, while feedback is produced in equivalent English and Simplified Chinese. Translation cannot change the mark or introduce economic points that were not present in the student answer.")

    add_page_break(doc)
    add_heading(doc, "Evidence and feedback screens", 2)
    add_figure(doc, IMAGES["evidence"], "Figure 2. Every proposed mark is tied to verbatim evidence; primary, reviewer, and adjudicated marks remain visible", width=5.75)
    add_page_break(doc)
    add_figure(doc, IMAGES["feedback"], "Figure 3. Chinese feedback preserves the evidence trail and presents two priorities plus targeted practice", width=5.75)

    add_page_break(doc)
    add_heading(doc, "3. Application scenarios and instructions", 1)
    add_heading(doc, "3.1 Public competition mode", 2)
    add_text(doc, "A judge selects one of three original synthetic handwritten examples: weak, middle, or strong. The demo includes an original question and original rubric, uses no official Cambridge material, and requires no API key. The judge confirms the transcript and rubric, runs evidence-locked marking, reads Chinese feedback, and tries the teacher approval, adjustment, or rejection controls.")
    add_heading(doc, "3.2 Future weekend-homework mode", 2)
    add_text(doc, "Each weekly batch contains one structured question, one teacher-supplied rubric, and approximately 30 anonymised handwritten answers. After parallel processing, failures, medium confidence, and disagreement are placed first. High-confidence results without risk flags may be approved in bulk; the remaining answers are reviewed individually. The teacher then exports audit data and prints the class feedback pack.")
    add_bullets(
        doc,
        [
            "Enter and confirm the question, command word, maximum mark, and rubric.",
            "Add the server-configured number of JPG, PNG, or WEBP images; editable references are derived from filenames.",
            "Start the batch; progress remains visible and one failed answer does not stop the class.",
            "Review exceptions first, then bulk-approve only unflagged high-confidence results.",
            "Adjust individual marks with a reason where needed; the teacher remains responsible for every final mark.",
            "Verify print coverage, then print one finalized feedback and mark sheet per student individually, two-up, or one student per page.",
        ],
        numbered=True,
    )
    add_heading(doc, "3.3 Feedback design", 2)
    add_text(doc, "Each slip contains the provisional or teacher-final mark, demonstrated strengths, two priorities, and one or two questions directly linked to the essay topic and the individual weakness. Version 1 deliberately avoids writing a full replacement essay so that students must improve their own reasoning rather than copy a model response.")

    add_page_break(doc)
    add_heading(doc, "Thirty-answer review and exception-first triage", 2)
    add_figure(doc, IMAGES["batch"], "Figure 4. All 30 synthetic answers completed: 20 unflagged high-confidence results approved in bulk, 10 retained for review", width=6.15)
    add_page_break(doc)
    add_heading(doc, "Printable class feedback pack", 2)
    add_figure(doc, IMAGES["pack"], "Figure 5. Reviewed results are laid out two per A4 page with bilingual priorities and targeted questions", width=6.15)

    add_page_break(doc)
    add_heading(doc, "4. Demonstrated effects, tests, and honest limits", 1)
    add_text(doc, "As of 9 August 2026, the results below come from automated contract tests and original synthetic demonstrations. They establish workflow integrity, account isolation, and persistence behaviour; they do not substitute for accuracy and time-saving evidence on real student responses.")
    add_table(
        doc,
        ["Validation", "Result", "What it proves"],
        [
            ["Automated contracts and workflows", "61/61 pass", "Coverage includes landing routes, visible readiness blockers, isolated marker remarks, scope, verbatim evidence, bilingual consistency, accounts, CSRF, ownership, permanent images, concurrency, and decision provenance."],
            ["One middle synthetic answer", "Primary 5/8; reviewer 4/8; adjudicated 5/8", "The isolated reviewer and one-mark adjudication path are observable rather than silently overwritten."],
            ["Thirty synthetic answers", "30/30 complete", "Twenty unflagged high-confidence results were eligible for bulk approval; ten medium-confidence results remained for teacher review."],
            ["Feedback pack", "20 reviewed students; 10 A4 pages", "Only approved or adjusted results appear; two slips fit on each page with Chinese-first and English-secondary feedback."],
            ["Real-student benchmark", "Not yet completed", "No claim is made yet about real accuracy, teacher time saved, or classroom impact."],
            ["Live provider comparison", "Adapter complete; keys and fixed sample pending", "Model roles must be compared on the same ten-answer development set before configuration is frozen."],
        ],
        [2300, 1900, 4920],
        status_col=1,
    )
    add_heading(doc, "4.1 Real-data release gates", 2)
    add_bullets(
        doc,
        [
            "Fifty anonymised real answers: 25 Analyse and 25 Discuss across at least ten questions and weak, middle, and strong performance.",
            "At least 75% exact agreement, 95% within one mark, and weighted Cohen’s kappa of at least 0.80.",
            "Transcription accuracy of at least 98% on clear scripts and 95% overall, with genuinely illegible spans separated.",
            "A timed comparison on at least ten answers, targeting at least a 50% reduction in teacher review time.",
            "Average teacher feedback rating of at least 4.5/5 for accuracy, specificity, actionability, and tone.",
        ],
    )
    add_callout(doc, "Release principle", "If any gate fails, the supported scope should be narrowed and the limitation documented. Disagreement must never be hidden, and synthetic results must not be presented as classroom effectiveness.", fill=COLORS["cream"], accent=COLORS["coral"])

    add_heading(doc, "5. Completeness, governance, and risk controls", 1)
    add_heading(doc, "5.1 Public competition mode", 2)
    add_bullets(doc, [
        "No login; original question, rubric, and three synthetic handwritten answers only.",
        "A prominent warning not to upload work containing names, classes, or other identifiers.",
        "No persistent public submissions and no official Cambridge material in a public knowledge base.",
        "Every result remains provisional; the final-mark field is null until a teacher decision.",
    ])
    add_heading(doc, "5.2 Private teacher mode", 2)
    add_text(doc, "The unified system allows public synthetic samples without login and open registration for equal-feature accounts. Argon2id passwords, HttpOnly sessions, CSRF, and server-side ownership protect permanent source images, transcripts, rubric hashes, evidence, model traces, and decisions. New uploads are rejected at quota rather than deleting history; real-student use still requires school approval.")
    add_heading(doc, "5.3 Explicit failure states", 2)
    add_text(doc, "Blur, rotation, cropping, missing pages, multiple students in one image, conflicts between stated totals, diagram dependence, prompt injection in student text, cross-run leakage, and export failure all lead to rejection or manual review with a recovery message rather than a forced score.")

    add_heading(doc, "6. Promotion value and sustainable architecture", 1)
    add_text(doc, "EconMark intentionally remains Economics-specific during the competition. A narrow, explainable tool with measured quality is more credible than premature multi-subject expansion. However, the rubric, evidence, teacher decision, audit, and feedback outputs use versioned JSON Schemas. Another subject can later replace rubric parsing and discipline-specific feedback without rebuilding image intake, confirmation, exception triage, audit, export, and printing.")
    add_table(
        doc,
        ["Layer", "Replaceable", "Stable"],
        [
            ["Model", "Qwen, Kimi, DeepSeek, or another compatible API; each role may be routed separately.", "Role contracts, structured validation, retry logic, and confidence gates."],
            ["Deployment", "Custom hosting, a school server, Dify, a Coze entry page, or another China-accessible platform.", "Scoring contracts, prompt versions, evaluation set, and audit trail."],
            ["Subject", "Question types, rubric parsing, terminology checks, and feedback descriptors.", "Image → confirmation → evidence → review → teacher decision → export."],
        ],
        [1600, 3700, 3820],
    )

    add_heading(doc, "7. Evidence against the competition rubric", 1)
    add_table(
        doc,
        ["Dimension", "Current evidence", "Required before submission"],
        [
            ["Practicality 35%", "Single and 30-answer flows, exception-first review, printable feedback, and teacher-final decisions.", "Complete the fifty-answer blind benchmark and timed ten-answer comparison."],
            ["Innovation 25%", "Transcript confirmation, evidence locking, independent review/adjudication, provider neutrality, bilingual feedback, and audit trail.", "Show how gates corrected early over-marking and transcription failure cases."],
            ["Completeness 20%", "Fifty-five tests, three synthetic examples, account ownership, permanent images, failure isolation, and multi-format export.", "Deploy the unified public link and complete twenty consecutive desktop, phone, and school-network runs."],
            ["Promotion value 20%", "Versioned contracts and replaceable model/deployment layers while Economics remains focused.", "Add a one-page template explaining how another subject replaces the rubric layer."],
        ],
        [1550, 4270, 3300],
    )

    add_page_break(doc)
    add_heading(doc, "8. Remaining submission work", 1)
    add_bullets(
        doc,
        [
            "Use teacher-owned API keys to compare models on the same ten-answer development set and freeze role assignments.",
            "Complete the fifty-answer anonymised benchmark, blind re-mark, agreement, kappa, transcription, feedback, and time-saving measurements.",
            "Deploy a China-accessible no-login synthetic demo and complete twenty consecutive phone, desktop, and school-network tests.",
            "Add entrant and campus details to the registration package and include final prompt, workflow, testing, and optimisation evidence.",
            "Record a three-minute demonstration: problem → image and confirmation → evidence → batch → print pack → measured results.",
        ],
        numbered=True,
    )
    add_callout(doc, "Conclusion", "EconMark is strongest when it does not claim to replace the teacher. It converts the most repetitive parts of evidence collection and feedback production into an auditable, batch-ready, printable, and provider-flexible workflow.", fill=COLORS["teal"], accent=COLORS["teal"])
    for table in doc.tables[-1:]:
        for paragraph in table.cell(0, 0).paragraphs:
            for run in paragraph.runs:
                set_run_font(run, color=COLORS["white"])

    add_heading(doc, "Appendix: versions and evidence provenance", 1)
    add_text(doc, "This report follows the notice requirements for name and function, design and innovation, scenarios and instructions, demonstrated effect, and promotion value. All process screenshots are from the current locally running synthetic public mode.")
    add_bullets(doc, [
        "Application: econmark/4.0.0; workflow: econmark-workflow/3.0.0; prompts: econmark-prompts/3.0.0.",
        "Functional verification date: 9 August 2026; automated tests: 61 passed.",
        "Screenshots contain no real student information.",
        "Official Cambridge questions and mark schemes remain outside the public knowledge base and are reserved for an approved private teacher workflow.",
    ])
    return doc


def build_chinese_academic() -> Document:
    doc = build_document("zh")
    add_academic_cover(doc, "zh")
    add_contents_page(doc, "zh", [3, 4, 4, 8, 11, 13, 13, 14, 14, 15, 15, 15])

    add_kicker(doc, "摘要与评审导读")
    add_heading(doc, "摘要", 1)
    add_labeled_text(
        doc,
        "研究目的：",
        "探讨在保留教师最终决策权和评分可解释性的前提下，智能体工作流能否降低 IGCSE 经济学手写论述题批改中的重复劳动。",
    )
    add_labeled_text(
        doc,
        "研究方法：",
        "采用设计研究方法，将图片转写、评分标准解析、证据抽取、独立复核、置信度控制、双语反馈和教师决策构造成可审计流程；研究范围限定为 Cambridge IGCSE Economics 0455 的 Analyse [6] 与 Discuss [8]。",
    )
    add_labeled_text(
        doc,
        "现阶段结果：",
        "系统已完成 61 项自动化合同与工作流测试，并以原创合成数据验证默认自动批量入口、可见先决条件提示、单份审核、30 人批量处理、逐人批注、账户隔离、永久图片，以及每名已终审学生恰好一份且覆盖率可核对的反馈评分单流程；真实学生作答上的准确率、教师节时和课堂效果尚待基准测试。",
    )
    add_labeled_text(
        doc,
        "结论：",
        "EconMark 的合理定位是证据约束型教师辅助系统，而非自动评分替代方案。其竞争价值取决于可追踪证据、人工闸门、可复现评价和真实样本验证能否共同成立。",
    )
    p = doc.add_paragraph()
    r = p.add_run("关键词：")
    set_run_font(r, bold=True, color=COLORS["teal"])
    r = p.add_run("教师在环；手写作答；证据约束评分；形成性评价；批量反馈；模型供应商中立")
    set_run_font(r)
    add_callout(
        doc,
        "项目的核心贡献",
        "将大模型的整体评分转化为受教师确认、原文证据、评分标准、独立复核和置信度闸门共同约束的过程；所有机器结果均为暂定分数，最终成绩只能由教师认可、调整或拒绝后形成。",
    )
    add_table_caption(doc, "表 1  比赛评审维度与报告证据索引")
    add_table(
        doc,
        ["评审维度", "本项目的核心证据", "主要章节"],
        [
            ["实用性 35%", "单份与 30 份批量流程、异常优先审核、个性化打印反馈、教师最终决定。", "第 1、4、5 节"],
            ["创新性 25%", "转写确认、证据约束评分、独立复核与裁定、模型角色解耦、双语反馈。", "第 2、3 节"],
            ["完整性 20%", "61 项自动化测试、默认自动批量入口、可见先决条件提示、逐人批注、账户隔离、永久图片、失败隔离、JSON/CSV/打印导出与审计字段。", "第 5、6、8 节"],
            ["推广价值 20%", "版本化数据合同、可替换模型与发布层、可迁移的确认和审计流程。", "第 7 节"],
        ],
        [1350, 5220, 2790],
    )

    add_page_break(doc)
    add_heading(doc, "1. 研究背景、问题界定与功能定位", 1)
    add_heading(doc, "1.1 教学问题与用户需求", 2)
    add_text(
        doc,
        "在周末作业场景中，一名教师通常需要批改约 30 份针对同一道结构化问题的手写作答。高质量批改不仅需要判断分数，还包括核对原文、依据评分标准定位证据、识别因果链与评价质量、撰写差异化反馈，并设计后续巩固任务。上述工作重复度高，但又不能脱离教师的专业判断。因此，本项目将研究问题界定为：在不削弱教师控制权和评分可解释性的前提下，如何以智能体工作流提高同题手写作答的批改与反馈效率。",
    )
    add_heading(doc, "1.2 智能体名称与支持范围", 2)
    add_text(
        doc,
        "智能体名称为 EconMark - IGCSE 经济学论述题智评助手。主要用户为经济学教师，学生是反馈接收者而非评分决策者。V1 的自动评分范围严格限定为 Cambridge IGCSE Economics 0455 的 Analyse [6] 与 Discuss [8]。图表、计算题、缺少评分标准、未经教师确认的转写、多题边界不清或其他分值题型均进入拒绝或人工处理路径。",
    )
    add_heading(doc, "1.3 功能输出", 2)
    add_bullets(
        doc,
        [
            "可核对的手写作答转写及不确定片段提示；",
            "逐项对应学生原文与评分标准的证据记录；",
            "初评分、独立复核分、必要时的裁定分与置信度说明；",
            "等价的英文与简体中文形成性反馈、两个优先改进点及 1-2 道针对性巩固问题；",
            "教师认可、调整或拒绝记录，以及 JSON、CSV 和打印输出。",
        ],
    )

    add_heading(doc, "2. 设计思路与技术方法", 1)
    add_heading(doc, "2.1 教师在环与证据约束", 2)
    add_text(
        doc,
        "系统采用教师在环设计。视觉模型产生的转写文本在教师确认前不得进入评分；题目、指令词、满分与评分标准也必须由教师确认。评分节点不得依据模型记忆补充评分规则，每一项拟给分均须附学生原文引句和评分标准引用。程序进一步检查引句是否存在于已确认转写中，并阻止同一证据重复计分。",
    )
    add_page_break(doc)
    add_heading(doc, "2.2 分层工作流与人工控制点", 2)
    workflow_intro = add_text(
        doc,
        "图 1 概括单份或服务器容量允许的同题作答所采用的可审计评分链；批量处理只并行重复学生级工作流，不共享学生上下文。",
    )
    workflow_intro.paragraph_format.keep_with_next = True
    add_figure(
        doc,
        IMAGES["workflow_zh"],
        "图 1  EconMark 证据约束型评分工作流与教师决策闸门。蓝色框表示教师确认或决定；实线表示主流程；虚线表示拒绝、修正或人工复核路径（来源：作者根据 EconMark 系统规范绘制）",
        width=5.6,
    )
    add_page_break(doc)
    add_table_caption(doc, "表 2  EconMark 工作流、系统任务与教师控制点")
    add_table(
        doc,
        ["阶段", "系统任务", "教师控制点"],
        [
            ["图片接收", "验证格式、页数、方向、清晰度与作答边界。", "仅提交匿名作答；不可用图片重新拍摄。"],
            ["视觉转写", "保留拼写、删除线、段落及可见修改，并标记不确定片段。", "逐字核对并确认；未确认不评分。"],
            ["标准解析", "提取指令词、满分、等级描述、可给分内容与上限。", "确认评分标准为唯一权威依据。"],
            ["证据评分", "识别知识、应用、因果链、反方、评价和判断，并锁定原文。", "检查每项证据与评分规则是否对应。"],
            ["独立复核", "检查过度给分、重复证据、无依据推断、术语错误与单边讨论。", "较大分歧必须人工处理。"],
            ["反馈与决定", "生成双语反馈、改进重点和巩固问题。", "认可、调整或拒绝后才形成最终记录。"],
        ],
        [1350, 4370, 3640],
    )
    add_heading(doc, "2.3 模型角色解耦与平台选择", 2)
    add_text(
        doc,
        "转写、初评分、复核、裁定与反馈被定义为相互独立的角色，并通过服务器端适配层连接模型 API。视觉转写只能路由到具备图像能力的模型；文本评分与复核可分别选择 Qwen、Kimi、DeepSeek 或其他兼容服务。该结构既允许不同模型承担最适合的任务，也便于使用不同供应商进行交叉复核。API 密钥仅保存在服务器环境变量中，不进入浏览器或导出文件。",
    )
    add_heading(doc, "2.4 与比赛技术要求的对应", 2)
    add_text(
        doc,
        "比赛优先推荐 Coze，但允许使用其他主流智能体平台，前提是功能完整且分享链接可访问。本项目选择自建 EconMark 作为核心运行界面，并保留 Coze 作为可选入口或工作流镜像。版本化提示词对应工作流节点；教师上传的评分标准构成运行时知识来源；模型适配层承担插件式外部服务调用；JSON Schema 对节点输入输出进行结构化约束。该方案既满足智能体工作流特征，又降低单一平台锁定风险。",
    )
    add_table_caption(doc, "表 3  系统技术分层与主要职责")
    add_table(
        doc,
        ["技术层", "主要构成", "设计职责"],
        [
            ["表现层", "单份评分页、批量作业页与反馈打印视图", "中文优先、进度可见、异常优先和教师决策。"],
            ["工作流层", "转写、标准解析、初评、复核、裁定与反馈节点", "角色隔离、人工确认闸门和低置信度路由。"],
            ["合同层", "版本化 JSON Schema、评分不变量与审计字段", "结构校验、证据存在性、重复计分防护和版本追踪。"],
            ["模型适配层", "服务器端供应商适配器与角色路由", "密钥不进入浏览器，并按视觉或文本能力切换模型。"],
        ],
        [1500, 3400, 4460],
    )

    add_page_break(doc)
    add_heading(doc, "中文优先的比赛演示界面", 2)
    add_text(doc, "界面将中文设置为主要信息层，英文仅用于 Cambridge 指令词、学生原文和必要的国际化说明。比赛演示配置使用原创题目、原创评分标准和三份合成手写作答，不要求评委登录或配置模型。")
    add_figure(doc, IMAGES["home"], "图 2  中文优先的比赛演示首页：支持范围、隐私提示与教师审核流程（来源：EconMark 原创合成演示）", width=5.65)

    section_three = add_heading(doc, "3. 创新机制", 1)
    section_three.paragraph_format.page_break_before = True
    add_heading(doc, "3.1 转写确认闸门", 2)
    add_text(doc, "手写识别错误会直接影响后续评分，因此系统不把视觉转写视为自动成立的事实。教师须在图像与文本对照界面中修正并确认，系统同时记录确认后的转写版本，评分节点只能读取该版本。")
    add_heading(doc, "3.2 证据约束评分", 2)
    add_text(doc, "评分输出不是单一数字，而是由证据条目构成。每个条目包含原文引句、评分标准引用、经济学理由、分值和质量标记。该设计使教师能够复核“给了什么分、依据是什么、是否重复”，从而提高可解释性与纠错效率。")
    add_heading(doc, "3.3 独立复核、裁定与置信度", 2)
    add_text(doc, "初评分与复核评分在隔离条件下运行。两者相差 1 分时进入裁定；相差 2 分以上或跨越完整等级时，系统不静默合并，而是要求教师人工复核。置信度综合转写确定性、评分标准完整性、评分器一致性和证据覆盖率，用于决定批量认可资格。")
    add_heading(doc, "3.4 反馈与针对性巩固", 2)
    add_text(doc, "分数固定后，系统才生成内容等价的中英文反馈。反馈包括已表现出的能力、尚缺少的发展、两个优先改进点、改进段落提纲和 1-2 道与本题主题直接相关的巩固问题。V1 不生成完整替代作文，以保持反馈的形成性功能。")
    add_heading(doc, "3.5 创新主张的可检验性", 2)
    add_bullets(doc, [
        "未经教师确认的转写或评分标准必须被工作流阻断；",
        "原文中不存在或已被使用的证据必须被合同校验拒绝；",
        "评分器相差 2 分以上或跨等级时必须转入人工复核；",
        "中英文反馈必须保持相同的分数与改进优先级。",
    ])

    add_page_break(doc)
    add_figure(doc, IMAGES["evidence"], "图 3  评分证据界面：初评分、复核分和裁定分均可追踪，每项得分锁定到学生原文（来源：EconMark 原创合成演示）", width=5.65)
    add_labeled_text(doc, "判读要点：", "评委可先比较三次评分结果，再逐项核对原文引句、评分标准引用与经济学理由，从而将模型结论转化为可审核的评分证据。")
    add_page_break(doc)
    add_figure(doc, IMAGES["feedback"], "图 4  中文反馈界面：保留证据链，并提供优先改进点与针对性巩固方向（来源：EconMark 原创合成演示）", width=5.65)
    add_labeled_text(doc, "形成性原则：", "反馈只在分数固定后生成，不改变评分结果，也不替学生完成整篇重写；其功能是明确下一步可执行的改进任务。")

    add_page_break(doc)
    add_heading(doc, "4. 应用场景与使用说明", 1)
    add_heading(doc, "4.1 比赛演示场景", 2)
    add_text(doc, "评委可从基础、中等和优秀三份原创合成样例中选择一份，依次体验转写确认、评分标准确认、证据评分、中文反馈与教师决策。公开演示不嵌入 Cambridge 官方材料，不保存真实学生信息，也不要求 API 密钥。")
    add_heading(doc, "4.2 周末作业批量场景", 2)
    add_text(doc, "周末作业模式以“同一道结构化题、同一评分标准、整班手写答案”为一个批次。人数、文件量和并发均由服务器配置，并保持每份进度可见；单份失败不会中止全班。人工模式按异常优先复核，全自动模式仅在 OCR、评分标准、双评分与置信度全部通过硬性门槛时形成最终成绩。")
    add_heading(doc, "4.3 操作程序", 2)
    add_bullets(
        doc,
        [
            "输入并确认题目、指令词、满分和教师提供的评分标准；",
            "上传服务器容量允许的 JPG、PNG 或 WEBP，使用文件名生成可编辑学生代号；",
            "启动批量处理并观察各份作答的转写、评分和异常状态；",
            "先复核异常结果，再批量认可无风险的高置信度结果；",
            "对需要调整的作答记录教师分数与覆盖理由；",
            "导出审计数据，并打印仅包含已审核结果的个性化反馈包。",
        ],
        numbered=True,
    )
    add_callout(
        doc,
        "批量审核原则",
        "批量处理只并行执行重复步骤，不转移教师责任。系统先呈现失败、风险、低置信度和评分分歧结果；批量认可仅适用于已完成转写与标准确认、无风险标记且高置信度的作答。",
        fill=COLORS["cream"],
        accent=COLORS["teal"],
    )

    add_page_break(doc)
    add_figure(doc, IMAGES["batch"], "图 5  批量审核界面：30 份合成作答全部完成，异常结果保留教师逐份复核（来源：EconMark 原创合成演示）", width=6.2)
    add_figure(doc, IMAGES["pack"], "图 6  全班反馈打印包：每页两份，含中英反馈与针对性巩固问题（来源：EconMark 原创合成演示）", width=6.2)

    add_page_break(doc)
    add_heading(doc, "5. 实际效果与评价方法", 1)
    add_heading(doc, "5.1 已完成的功能验证", 2)
    add_text(doc, "截至 2026 年 8 月 4 日，当前证据来自自动化测试和原创合成浏览器演示，用于验证流程完整性、数据约束和界面行为；这些结果不等同于真实学生作答上的评分准确率或课堂成效。")
    add_table_caption(doc, "表 4  已完成的功能验证及其证据边界")
    add_table(
        doc,
        ["验证项目", "结果", "可支持的结论", "证据性质"],
        [
            ["自动化合同与工作流", "61/61 通过", "默认批量入口、可见先决条件提示、逐人批注隔离、评分范围、原文证据、双语一致、账户登录、CSRF、所有权、永久图片、并发与终审来源按设计运行。", "自动化测试"],
            ["单份中等合成作答", "5/8；复核 4/8；裁定 5/8", "独立复核与 1 分分歧裁定链路可以被观察和审计。", "合成演示"],
            ["30 份合成批次", "30/30 完成", "20 份无风险高置信度结果可批量认可；10 份中置信度结果保留复核。", "合成演示"],
            ["学生反馈评分单", "30/30 份；节纸模式 15 页 A4", "每名已终审学生恰好一份；支持逐人、每页两份和每人一页打印。", "合成演示"],
        ],
        [1900, 1500, 3840, 2120],
        status_col=1,
    )
    add_heading(doc, "5.2 真实学生基准测试设计", 2)
    add_text(doc, "提交前计划采用 50 份匿名真实作答进行盲评验证，其中 Analyse 与 Discuss 各 25 份，覆盖至少 10 道题以及弱、中、强三个表现水平。教师先独立评分，再在至少 7 天后对 10 份作答盲目复评，以估计个人评分一致性。最终测试集在提示词和工作流冻结后使用。")
    add_bullets(
        doc,
        [
            "精确分一致率不低于 75%，一分以内一致率不低于 95%，加权 Cohen's kappa 不低于 0.80；",
            "清晰作答的转写准确率不低于 98%，总体不低于 95%，不可辨认片段单独标记；",
            "至少 10 份作答比较纯手工与系统辅助审核时间，目标节省不低于 50%；",
            "反馈在准确性、具体性、可操作性和语气方面的教师评分平均不低于 4.5/5；",
            "最终测试集每份作答重复运行 3 次，分数波动保持在 1 分以内。",
        ],
    )
    add_heading(doc, "5.3 局限性与效度边界", 2)
    add_text(doc, "当前版本尚未完成真实学生基准测试、真实模型 API 对比、课堂试点和公开部署。因此，报告不主张已达到真实评分准确率或节时目标。若任一门槛未达标，应缩小支持范围并记录限制，不得隐藏评分分歧或以合成演示替代真实教学证据。")

    add_heading(doc, "6. 完整性、数据治理与风险控制", 1)
    add_heading(doc, "6.1 统一系统、公开样例与账户数据", 2)
    add_text(doc, "比赛使用同一真实系统。原创合成样例免登录且不持久化；任何访客可创建同等功能账户后上传。成功作答的原图、证据、反馈和终审记录永久保存于 VPS，使用 Argon2id、HttpOnly 会话、CSRF 与账户所有权校验保护；账户满额时拒绝新增而不删除历史。")
    add_heading(doc, "6.2 审计与版本控制", 2)
    add_text(doc, "每次运行记录已确认转写、评分标准哈希、证据表、暂定分数、反馈、教师决定，以及 Schema、提示词、工作流和模型版本。教师调整分数时必须填写理由，最终分在教师决策前保持为空。该记录支持问题复现、版本比较和后续模型迁移。")
    add_heading(doc, "6.3 失败与安全边界", 2)
    add_text(doc, "模糊、旋转、裁切、缺页、多名学生同图、满分冲突、图表依赖、学生文本中的提示注入、跨批次数据泄漏、导出失败等情况均进入拒绝或人工复核路径。系统提供恢复建议，而不是强行生成分数。")

    add_heading(doc, "7. 推广价值与可迁移性", 1)
    add_text(doc, "比赛版本有意保持经济学专用，以便对窄范围任务开展可解释和可测量的质量控制。与此同时，图片接收、确认闸门、证据记录、教师决定、审计和导出采用版本化数据合同。其他学科未来只需替换评分标准解析、学科术语校验和反馈描述，无需重建基础流程。")
    add_table_caption(doc, "表 5  可替换层与稳定能力")
    add_table(
        doc,
        ["架构层", "可替换内容", "保持稳定的能力"],
        [
            ["模型层", "Qwen、Kimi、DeepSeek 或其他兼容 API；各角色可独立配置。", "结构化输入输出、校验、重试、证据约束和置信度闸门。"],
            ["发布层", "自建网页、校内服务器、Dify、Coze 入口或其他国内可访问平台。", "评分合同、提示词版本、评估集和审计记录。"],
            ["学科层", "题型、评分标准、术语检查和反馈描述。", "图片接收、确认、证据、复核、教师决定、导出与打印。"],
        ],
        [1500, 3860, 4000],
    )

    add_heading(doc, "8. 评审指标对照与提交证据", 1)
    add_heading(doc, "8.1 四项评分指标的证据闭环", 2)
    add_table_caption(doc, "表 6  评分指标、现有证据与提交前补强")
    add_table(
        doc,
        ["维度", "现有证据", "提交前补强"],
        [
            ["实用性 35%", "单份与 30 份批量工作流、异常优先复核、打印反馈包、教师最终决策。", "完成 50 份真实作答盲评与至少 10 份计时比较。"],
            ["创新性 25%", "转写确认、证据约束评分、独立复核与裁定、模型角色解耦、双语形成性反馈。", "展示早期版本中的转写错误和过度给分如何被闸门纠正。"],
            ["完整性 20%", "61 项测试、三份合成样例、30 人默认自动入口、可见先决条件提示、逐人批注、账户历史、永久图片、失败隔离和多格式输出。", "部署统一公开链接并完成 20 次连续演示、手机和校网测试。"],
            ["推广价值 20%", "版本化数据合同、可替换模型与发布层、可迁移的确认和审计机制。", "附一页其他学科评分标准替换模板。"],
        ],
        [1350, 4010, 4000],
    )
    add_heading(doc, "8.2 提交材料与过程性证据", 2)
    add_table_caption(doc, "表 7  比赛提交要件与当前状态")
    add_table(
        doc,
        ["提交要件", "当前状态", "最终提交动作"],
        [
            ["公开分享链接", "待部署", "部署中国境内可访问的合成演示，并完成 20 次连续测试。"],
            ["作品说明书", "已完成", "使用本中文版；补充参赛人和校区信息。"],
            ["过程性证据", "部分完成", "现有界面和功能测试截图之外，补充提示词迭代、工作流配置、模型对比和优化前后截图。"],
            ["演示视频（可选）", "待录制", "以 3 分钟展示教学痛点、确认闸门、证据评分、30 份批量、打印反馈和真实评价结果。"],
        ],
        [2300, 1760, 5300],
        status_col=1,
    )

    add_heading(doc, "9. 结论", 1)
    add_text(doc, "EconMark 的价值不在于自动替代教师，而在于将手写作答批改中最重复的证据整理、双重检查、差异化反馈和打印准备转化为可审计、可批量且可迁移的工作流。项目以明确的范围限制和真实样本评价门槛约束技术主张，使创新性建立在教学责任、评分透明度和可验证效果之上。")

    add_heading(doc, "参考与证据来源", 1)
    add_bullets(
        doc,
        [
            "苏州市苏外教育投资集团有限公司：《关于举办苏外教育集团首届教师智能体设计大赛的通知》，2026 年 7 月 28 日。",
            "EconMark：《EconMark 4.0 系统规范》（econmark-spec/4.0.0），包含功能边界、账户权限、评分不变量、数据合同与发布门槛。",
            "EconMark 项目内部资料：版本化 JSON Schema、提示词、工作流、模型适配器与自动化测试。",
            "本报告中的界面截图均来自 2026 年 8 月 4 日在本机运行的原创合成演示，不包含真实学生资料。",
        ],
        numbered=True,
    )
    add_heading(doc, "证据边界与复现信息", 2)
    add_bullets(
        doc,
        [
            "应用、工作流、提示词和数据合同的基准版本统一记录为 3.0.0；本说明书版本为 3.0。",
            "功能验证日期为 2026 年 8 月 9 日；自动化合同与工作流测试共 61 项，全部通过。",
            "报告所示成绩、批次和反馈均属于原创合成演示，不得解释为真实学生效果证据。",
            "Cambridge 官方题目与评分标准仅由教师在私有运行时上传，不进入公开知识库或比赛样例。",
        ],
    )
    add_heading(doc, "附录 A  评价指标的操作性定义", 1)
    add_text(doc, "为避免以笼统的“准确”或“高效”替代可检验结论，真实学生基准测试采用以下预先定义的指标。")
    add_equation(doc, "A_exact = (1/N) Σᵢ I(mᵢᴬ = mᵢᵀ) × 100%", 1)
    add_equation(doc, "A_±1 = (1/N) Σᵢ I(|mᵢᴬ − mᵢᵀ| ≤ 1) × 100%", 2)
    add_equation(doc, "S_time = (t_manual − t_assisted) / t_manual × 100%", 3)
    add_text(doc, "其中，N 为样本数，mᵢᴬ 为智能体暂定分数，mᵢᵀ 为教师基准分数，t 为每份作答的平均处理时间。")
    add_table_caption(doc, "表 8  真实样本评价指标、计算口径与判定用途")
    add_table(
        doc,
        ["指标", "操作性定义", "判定用途"],
        [
            ["精确一致率", "智能体暂定分与教师基准分完全相同的作答比例。", "检验系统能否复现教师的具体分值判断。"],
            ["一分内一致率", "两者绝对分差不超过 1 分的作答比例。", "识别评分是否处于可接受的邻近范围。"],
            ["加权 Cohen's kappa", "按分值距离给予不同惩罚的评分一致性系数。", "在扣除偶然一致后评价总体评分稳定性。"],
            ["转写准确率", "确认文本中正确识别词数占可辨认词数的比例；不可辨认片段另行报告。", "区分视觉识别误差与评分推理误差。"],
            ["教师节时比例", "（纯手工平均用时－系统辅助平均用时）÷纯手工平均用时。", "评价工具是否产生具有课堂意义的效率收益。"],
        ],
        [1800, 4540, 3020],
    )
    add_callout(
        doc,
        "解释规则",
        "上述门槛属于发布条件，而非宣传性目标。任一关键指标未达到预设标准时，系统应缩小自动评分范围，并在比赛材料和后续教学使用中明确披露限制。",
        fill=COLORS["cream"],
        accent=COLORS["teal"],
    )
    remove_trailing_empty_paragraphs(doc)
    return doc


def build_english_academic() -> Document:
    doc = build_document("en")
    add_academic_cover(doc, "en")
    add_contents_page(doc, "en", [3, 4, 4, 8, 11, 13, 13, 14, 14, 15, 15, 15])

    add_kicker(doc, "ABSTRACT AND REVIEW GUIDE")
    add_heading(doc, "Abstract", 1)
    add_labeled_text(
        doc,
        "Purpose: ",
        "To investigate whether an agent workflow can reduce repetitive work in marking handwritten IGCSE Economics essays while preserving teacher authority and the interpretability of each mark.",
    )
    add_labeled_text(
        doc,
        "Method: ",
        "A design-research approach integrates image transcription, rubric parsing, evidence extraction, independent review, confidence control, bilingual feedback, and teacher decisions into an auditable workflow. The study scope is restricted to Cambridge IGCSE Economics 0455 Analyse [6] and Discuss [8].",
    )
    add_labeled_text(
        doc,
        "Current results: ",
        "Sixty-one automated contract and workflow tests pass, and original synthetic data verify the single-answer, thirty-student batch, account-ownership, permanent-image, and coverage-guaranteed student feedback-sheet workflows. Accuracy, teacher time saving, and classroom impact on real student work remain to be benchmarked.",
    )
    add_labeled_text(
        doc,
        "Conclusion: ",
        "EconMark is appropriately framed as an evidence-constrained teacher-support system rather than an autonomous replacement for professional marking. Its value depends on traceable evidence, human gates, reproducible evaluation, and validation with real responses.",
    )
    p = doc.add_paragraph()
    r = p.add_run("Keywords: ")
    set_run_font(r, bold=True, color=COLORS["teal"])
    r = p.add_run("human-in-the-loop assessment; handwriting; evidence-constrained marking; formative feedback; batch processing; provider-neutral models")
    set_run_font(r)
    add_callout(
        doc,
        "Principal contribution",
        "EconMark converts holistic model scoring into a process constrained by teacher confirmation, verbatim evidence, the supplied rubric, independent review, and confidence gates. Machine outputs remain provisional until a teacher approves, adjusts, or rejects them.",
    )
    add_table_caption(doc, "Table 1. Competition dimensions and report evidence index")
    add_table(
        doc,
        ["Dimension", "Core project evidence", "Main sections"],
        [
            ["Practicality 35%", "Single and 30-answer workflows, exception-first review, printable feedback, and teacher-final decisions.", "Sections 1, 4, and 5"],
            ["Innovation 25%", "Transcript confirmation, evidence-constrained scoring, independent review and adjudication, model-role separation, and bilingual feedback.", "Sections 2 and 3"],
            ["Completeness 20%", "Fifty-five automated tests, account ownership, permanent images, failure isolation, review states, multi-format export, and audit fields.", "Sections 5, 6, and 8"],
            ["Promotion value 20%", "Versioned contracts, replaceable model and deployment layers, and reusable confirmation and audit mechanisms.", "Section 7"],
        ],
        [1350, 5220, 2790],
    )

    add_page_break(doc)
    add_heading(doc, "1. Background, problem definition, and functional scope", 1)
    add_heading(doc, "1.1 Teaching problem and user need", 2)
    add_text(doc, "A weekend-homework task may require one teacher to assess approximately 30 handwritten answers to the same structured question. High-quality marking involves more than assigning a number: the teacher must verify the response, interpret the rubric, locate evidence, assess causal development and evaluation, write differentiated feedback, and identify useful follow-up practice. These activities are repetitive but cannot be separated from professional judgement. The project therefore asks how an agent can improve the efficiency of handwritten essay marking without reducing teacher control or the interpretability of the mark.")
    add_heading(doc, "1.2 Agent name and supported scope", 2)
    add_text(doc, "The agent is named EconMark - IGCSE Economics Essay Marking Assistant. The teacher is the primary user and final decision-maker; the student receives feedback but does not control the mark. Version 1 supports only Cambridge IGCSE Economics 0455 Analyse [6] and Discuss [8]. Diagrams, calculations, missing rubrics, unconfirmed transcripts, unclear multi-question pages, and other mark allocations are rejected or routed to manual handling.")
    add_heading(doc, "1.3 Outputs", 2)
    add_bullets(doc, [
        "a teacher-verifiable transcription with uncertainty indicators;",
        "criterion-level records linking each proposed credit to student wording and the supplied rubric;",
        "a primary mark, independent review, adjudication where required, and confidence reasons;",
        "equivalent English and Simplified Chinese feedback, two priorities, and one or two targeted follow-up questions;",
        "teacher approval, adjustment, or rejection records, together with JSON, CSV, and printable outputs.",
    ])

    add_heading(doc, "2. Design rationale and technical method", 1)
    add_heading(doc, "2.1 Human-in-the-loop and evidence constraints", 2)
    add_text(doc, "The workflow requires teacher confirmation at two points. Vision transcription cannot enter the marking stage until it has been corrected and confirmed; the question, command word, maximum mark, and rubric must also be confirmed. Marking nodes may not supplement the rubric from model memory. Every proposed credit needs a verbatim quotation and rubric reference, and programmatic checks reject quotations absent from the confirmed transcript or evidence reused for a second credit.")
    add_page_break(doc)
    add_heading(doc, "2.2 Layered workflow and teacher checkpoints", 2)
    workflow_intro = add_text(doc, "Figure 1 summarises the auditable chain used for one answer or a batch of up to thirty answers to the same question. Batching parallelises repeated system operations but leaves responsibility for the final mark with the teacher.")
    workflow_intro.paragraph_format.keep_with_next = True
    add_figure(
        doc,
        IMAGES["workflow_en"],
        "Figure 1. Evidence-constrained EconMark workflow and teacher decision gates. Blue boxes indicate teacher confirmation or decision; solid lines show the main flow; dashed lines show rejection, correction, or manual-review paths (source: author-generated from the EconMark system specification)",
        width=5.6,
    )
    add_page_break(doc)
    add_table_caption(doc, "Table 2. EconMark workflow, system tasks, and teacher checkpoints")
    add_table(
        doc,
        ["Stage", "System task", "Teacher checkpoint"],
        [
            ["Image intake", "Validate format, pages, orientation, clarity, and answer boundaries.", "Use anonymised work and recapture unusable pages."],
            ["Transcription", "Preserve spelling, deletions, paragraphing, and visible corrections; flag uncertainty.", "Correct and confirm; no marking before confirmation."],
            ["Rubric parsing", "Extract command word, maximum mark, levels, creditworthy content, and caps.", "Confirm the rubric as the sole authority."],
            ["Evidence scoring", "Identify knowledge, application, causal chains, counterarguments, evaluation, and judgement.", "Check that each quotation supports the proposed credit."],
            ["Independent review", "Challenge over-crediting, duplicated evidence, unsupported inference, terminology errors, and one-sided discussion.", "Resolve material disagreements manually."],
            ["Feedback and decision", "Generate bilingual feedback, priorities, and follow-up questions.", "Approve, adjust, or reject before a final record exists."],
        ],
        [1350, 4370, 3640],
    )
    add_heading(doc, "2.3 Model-role separation and platform choice", 2)
    add_text(doc, "Transcription, primary scoring, review, adjudication, and feedback are separate roles behind a server-side adapter. Only a vision-capable model may process images, while text roles may be routed independently to Qwen, Kimi, DeepSeek, or another compatible service. A second provider can be used for review to reduce common-mode error. API credentials remain in server environment variables and are excluded from browser code and exported records.")
    add_heading(doc, "2.4 Alignment with the competition's technical requirements", 2)
    add_text(doc, "The competition prefers Coze but permits other mainstream agent platforms when the work is complete and accessible through a share link. EconMark therefore uses a custom application as the primary runtime and treats Coze as an optional entry page or workflow mirror. Versioned prompts correspond to workflow nodes; the teacher-supplied rubric is the runtime knowledge source; the model adapter provides plugin-like external calls; and JSON Schemas constrain node inputs and outputs. This preserves agentic workflow features while limiting platform lock-in.")
    add_page_break(doc)
    add_table_caption(doc, "Table 3. Technical layers and principal responsibilities")
    add_table(
        doc,
        ["Layer", "Main components", "Design responsibility"],
        [
            ["Presentation", "Single-answer marking, batch homework, and feedback-printing views", "Chinese-first interaction, visible progress, exception priority, and teacher decisions."],
            ["Workflow", "Transcription, rubric parsing, primary scoring, review, adjudication, and feedback nodes", "Role isolation, human confirmation gates, and low-confidence routing."],
            ["Contract", "Versioned JSON Schemas, scoring invariants, and audit fields", "Structural validation, evidence existence, duplicate-credit prevention, and version tracing."],
            ["Model adapter", "Server-side provider adapters and role routing", "Keep credentials out of the browser and switch models according to vision or text capability."],
        ],
        [1500, 3400, 4460],
    )

    add_heading(doc, "Chinese-first competition interface", 2)
    add_text(doc, "Chinese is the primary information layer for judges and teachers. English remains where required for Cambridge command words, student evidence, and international use. Competition mode uses an original question, original rubric, and three synthetic handwritten responses, with no login or model configuration required for the demonstration.")
    add_figure(doc, IMAGES["home"], "Figure 2. Chinese-first competition home page showing scope, privacy notice, and teacher-controlled stages (source: original EconMark synthetic demonstration)", width=5.65)

    section_three = add_heading(doc, "3. Innovative mechanisms", 1)
    section_three.paragraph_format.page_break_before = True
    add_heading(doc, "3.1 Transcript confirmation gate", 2)
    add_text(doc, "Because handwriting-recognition errors can alter the mark, a vision transcription is never treated as automatically authoritative. The teacher corrects and confirms it in an image-to-text comparison view. The confirmed transcript is versioned, and downstream marking can read only that version.")
    add_heading(doc, "3.2 Evidence-constrained scoring", 2)
    add_text(doc, "The output is not a single unsupported score. Each evidence record contains a verbatim quotation, rubric reference, economic reason, mark value, and quality flags. The teacher can therefore inspect what received credit, why it received credit, and whether any evidence has been duplicated.")
    add_heading(doc, "3.3 Independent review, adjudication, and confidence", 2)
    add_text(doc, "Primary and reviewer passes operate independently. A one-mark difference triggers adjudication; a difference of two or more marks or a whole level requires teacher review rather than silent reconciliation. Confidence combines transcription certainty, rubric completeness, scorer agreement, and evidence coverage, and determines whether a result can be considered for bulk approval.")
    add_heading(doc, "3.4 Formative feedback and targeted consolidation", 2)
    add_text(doc, "Only after the mark is fixed does the system generate equivalent English and Chinese feedback. It identifies demonstrated strengths, missing development, two priorities, an improved paragraph outline, and one or two questions linked directly to the essay topic and individual weakness. Version 1 deliberately avoids producing a full replacement essay.")
    add_heading(doc, "3.5 Testability of the innovation claims", 2)
    add_bullets(doc, [
        "an unconfirmed transcript or rubric must be blocked by the workflow;",
        "evidence absent from the response or already used must fail contract validation;",
        "a difference of two or more marks or a whole level must enter teacher review;",
        "English and Chinese feedback must preserve the same mark and improvement priorities.",
    ])

    add_page_break(doc)
    add_figure(doc, IMAGES["evidence"], "Figure 3. Evidence screen showing traceable primary, reviewer, and adjudicated marks with verbatim support (source: original EconMark synthetic demonstration)", width=5.65)
    add_labeled_text(doc, "Interpretive note: ", "A judge can compare all three scoring outcomes and then inspect the quotation, rubric reference, and economic reason for each credit, converting a model conclusion into reviewable assessment evidence.")
    add_page_break(doc)
    add_figure(doc, IMAGES["feedback"], "Figure 4. Chinese feedback preserving the evidence trail and presenting priorities and targeted practice (source: original EconMark synthetic demonstration)", width=5.65)
    add_labeled_text(doc, "Formative principle: ", "Feedback is generated only after the mark is fixed. It neither changes the score nor writes a complete replacement essay; its purpose is to specify the next actionable improvement task.")

    add_page_break(doc)
    add_heading(doc, "4. Application scenarios and operating instructions", 1)
    add_heading(doc, "4.1 Competition demonstration", 2)
    add_text(doc, "A judge selects a weak, middle, or strong original synthetic answer and then experiences transcript confirmation, rubric confirmation, evidence scoring, Chinese feedback, and the teacher decision controls. Public demonstration material contains no official Cambridge content, retains no real student information, and requires no API key.")
    add_heading(doc, "4.2 Weekend-homework batch use", 2)
    add_text(doc, "Weekend mode defines a batch as one structured question, one confirmed rubric, and a server-configured number of handwritten answers. Configured concurrency keeps each answer's progress visible, and one failure does not terminate the class run. Human-review mode prioritises exceptions; full-auto mode finalises only results that pass OCR, rubric, dual-scoring, and confidence gates.")
    add_heading(doc, "4.3 Operating procedure", 2)
    add_bullets(doc, [
        "enter and confirm the question, command word, maximum mark, and teacher rubric;",
        "upload the server-configured number of JPG, PNG, or WEBP images and derive editable references from filenames;",
        "start the batch and monitor transcription, marking, and exception states;",
        "review exceptions first and bulk-approve only unflagged high-confidence results;",
        "record a teacher mark and reason for every adjustment;",
        "export the audit data and print feedback only for reviewed results.",
    ], numbered=True)
    add_callout(
        doc,
        "Batch-review principle",
        "Batch processing parallelises repetitive operations but does not transfer teacher responsibility. Failures, risk flags, low confidence, and scorer disagreement appear first; bulk approval is limited to answers with confirmed inputs, no risk flag, and high confidence.",
        fill=COLORS["cream"],
        accent=COLORS["teal"],
    )

    add_page_break(doc)
    add_figure(doc, IMAGES["batch"], "Figure 5. Batch review screen: all 30 synthetic answers completed while exceptions remained for individual review (source: original EconMark synthetic demonstration)", width=6.2)
    add_figure(doc, IMAGES["pack"], "Figure 6. Class feedback pack: two slips per page with bilingual feedback and targeted questions (source: original EconMark synthetic demonstration)", width=6.2)

    add_page_break(doc)
    add_heading(doc, "5. Demonstrated effects and evaluation method", 1)
    add_heading(doc, "5.1 Completed functional validation", 2)
    add_text(doc, "As of 9 August 2026, the available evidence comes from automated tests and original synthetic demonstrations. It establishes workflow integrity, contract enforcement, account ownership, and persistence behaviour; it does not establish accuracy or classroom impact on real student answers.")
    add_table_caption(doc, "Table 4. Completed functional validation and evidential limits")
    add_table(
        doc,
        ["Validation", "Result", "Supported conclusion", "Evidence type"],
        [
            ["Automated contracts and workflows", "61/61 pass", "Landing routes, visible readiness blockers, isolated marker remarks, scope, verbatim evidence, bilingual parity, accounts, CSRF, ownership, permanent images, concurrency, and decision provenance behave as designed.", "Automated tests"],
            ["One middle synthetic answer", "5/8; reviewer 4/8; adjudicated 5/8", "Independent review and one-mark adjudication are observable and auditable.", "Synthetic demo"],
            ["Thirty synthetic answers", "30/30 complete", "Twenty unflagged high-confidence results were eligible for bulk approval; ten remained for review.", "Synthetic demo"],
            ["Student feedback sheets", "30/30 sheets; 15 A4 pages in two-up mode", "Exactly one sheet per finalized student, with individual, two-up, and one-student-per-page printing.", "Synthetic demo"],
        ],
        [1900, 1500, 3840, 2120],
        status_col=1,
    )
    add_heading(doc, "5.2 Real-student benchmark design", 2)
    add_text(doc, "Before submission, the planned benchmark contains 50 anonymised real answers: 25 Analyse and 25 Discuss responses across at least ten questions and weak, middle, and strong performance. The teacher marks all answers before viewing agent results and blindly re-marks ten after at least seven days to estimate personal consistency. The final set is used only after prompts and workflow are frozen.")
    add_bullets(doc, [
        "at least 75% exact agreement, 95% within one mark, and weighted Cohen's kappa of at least 0.80;",
        "transcription accuracy of at least 98% for clear scripts and 95% overall, with illegible spans separated;",
        "a timed comparison on at least ten scripts, targeting at least a 50% reduction in teacher review time;",
        "an average teacher rating of at least 4.5/5 for feedback accuracy, specificity, actionability, and tone;",
        "three repeated runs per final case with mark variation no greater than one mark.",
    ])
    add_heading(doc, "5.3 Limitations and validity boundaries", 2)
    add_text(doc, "The real-student benchmark, live model comparison, classroom pilot, and public deployment are not yet complete. The report therefore makes no claim that accuracy or time-saving targets have already been achieved. If a gate fails, the supported scope must be narrowed and the limitation documented; synthetic results must not be presented as real teaching effectiveness.")

    add_heading(doc, "6. Completeness, data governance, and risk control", 1)
    add_heading(doc, "6.1 Public demonstration and private teacher modes", 2)
    add_text(doc, "The same competition system offers original synthetic data without login and open account registration for uploads. Successful uploads and results are permanently stored on the VPS, protected by Argon2id login, CSRF, and account ownership checks. Real-student use remains subject to school approval of the VPS, providers, and permanent-storage arrangement.")
    add_heading(doc, "6.2 Auditability and version control", 2)
    add_text(doc, "Each run records the confirmed transcript, rubric hash, evidence table, provisional mark, feedback, teacher decision, and schema, prompt, workflow, and model versions. An adjusted mark requires a reason, and the final-mark field remains null before a teacher decision. These records support reproducibility, version comparison, and model migration.")
    add_heading(doc, "6.3 Failure and safety boundaries", 2)
    add_text(doc, "Blur, rotation, cropping, missing pages, multiple students in one image, conflicting totals, diagram dependence, prompt injection in student text, cross-run leakage, and export failure all lead to rejection or manual review with a recovery message rather than a forced mark.")

    add_heading(doc, "7. Promotion value and transferability", 1)
    add_text(doc, "The competition version deliberately remains Economics-specific so that a narrow task can be evaluated transparently. At the same time, image intake, confirmation gates, evidence records, teacher decisions, audit, and export use versioned contracts. Another subject can later replace rubric parsing, terminology checks, and feedback descriptors without rebuilding the underlying workflow.")
    add_table_caption(doc, "Table 5. Replaceable layers and stable capabilities")
    add_table(
        doc,
        ["Layer", "Replaceable content", "Stable capability"],
        [
            ["Model", "Qwen, Kimi, DeepSeek, or another compatible API; roles configured independently.", "Structured contracts, validation, retry, evidence constraints, and confidence gates."],
            ["Deployment", "Custom hosting, a school server, Dify, a Coze entry page, or another China-accessible platform.", "Scoring contracts, prompt versions, evaluation set, and audit trail."],
            ["Subject", "Question types, rubric parsing, terminology checks, and feedback descriptors.", "Image intake, confirmation, evidence, review, teacher decision, export, and printing."],
        ],
        [1500, 3860, 4000],
    )

    add_heading(doc, "8. Competition rubric and submission evidence", 1)
    add_heading(doc, "8.1 Evidence loop for the four scoring dimensions", 2)
    add_table_caption(doc, "Table 6. Scoring dimensions, current evidence, and required reinforcement")
    add_table(
        doc,
        ["Dimension", "Current evidence", "Required before submission"],
        [
            ["Practicality 35%", "Single and 30-answer workflows, exception-first review, printable feedback, and teacher-final decisions.", "Complete the 50-answer blind benchmark and timed comparison on at least ten scripts."],
            ["Innovation 25%", "Transcript confirmation, evidence-constrained scoring, independent review and adjudication, model-role separation, and bilingual formative feedback.", "Show how gates corrected early transcription errors and over-crediting."],
            ["Completeness 20%", "Fifty-five tests, three synthetic examples, account ownership, permanent images, failure isolation, and multi-format outputs.", "Deploy the unified public link and complete twenty consecutive desktop, phone, and school-network runs."],
            ["Promotion value 20%", "Versioned contracts, replaceable model and deployment layers, and reusable confirmation and audit mechanisms.", "Add a one-page rubric-replacement template for another subject."],
        ],
        [1350, 4010, 4000],
    )
    add_heading(doc, "8.2 Submission materials and process evidence", 2)
    add_table_caption(doc, "Table 7. Competition submission requirements and current status")
    add_table(
        doc,
        ["Requirement", "Status", "Final submission action"],
        [
            ["Public share link", "Pending", "Deploy a China-accessible synthetic demonstration and complete twenty consecutive runs."],
            ["Project report", "Complete", "Use the Chinese report and add entrant and campus details."],
            ["Process evidence", "Partly complete", "In addition to product and functional-test screens, add prompt iterations, workflow configuration, model comparison, and before/after optimisation evidence."],
            ["Demonstration video (optional)", "Pending", "Use three minutes to show the teaching problem, confirmation gates, evidence scoring, thirty-answer batch, print pack, and measured results."],
        ],
        [2300, 1760, 5300],
        status_col=1,
    )

    add_heading(doc, "9. Conclusion", 1)
    add_text(doc, "EconMark does not seek to replace the teacher. It converts the most repetitive parts of handwritten essay marking - evidence organisation, independent checking, differentiated feedback, and print preparation - into an auditable, batch-ready, and transferable workflow. Clear scope limits and real-data release gates ensure that innovation remains subordinate to professional responsibility, marking transparency, and measurable educational value.")

    add_heading(doc, "References and evidence provenance", 1)
    add_bullets(doc, [
        "Suzhou Suwai Education Investment Group Co., Ltd. Notice on the First Suwai Education Group Teacher Agent Design Competition, 28 July 2026.",
        "EconMark. EconMark 4.0 System Specification (econmark-spec/4.0.0): scope, account permissions, scoring invariants, data contracts, and release gates.",
        "EconMark internal artefacts: versioned JSON Schemas, prompts, workflows, provider adapters, and automated tests.",
        "All interface screenshots in this report were captured from the locally running synthetic demonstration on 4 August 2026 and contain no real student information.",
    ], numbered=True)
    add_heading(doc, "Evidence boundaries and reproducibility", 2)
    add_bullets(doc, [
        "The application, workflow, prompts, and data contracts share baseline version 3.0.0; this report is Version 3.0.",
        "Functional verification was updated on 9 August 2026; all fifty-five automated contract and workflow tests passed.",
        "Marks, batches, and feedback shown in the report are original synthetic demonstrations and are not evidence of real-student impact.",
        "Official Cambridge questions and mark schemes are uploaded only by the teacher at private runtime and are excluded from the public knowledge base and competition examples.",
    ])
    add_heading(doc, "Appendix A. Operational definitions of evaluation metrics", 1)
    add_text(doc, "To avoid substituting broad claims of accuracy or efficiency for testable conclusions, the real-student benchmark uses the following pre-specified metrics.")
    add_equation(doc, "A_exact = (1/N) Σᵢ I(mᵢᴬ = mᵢᵀ) × 100%", 1)
    add_equation(doc, "A_±1 = (1/N) Σᵢ I(|mᵢᴬ − mᵢᵀ| ≤ 1) × 100%", 2)
    add_equation(doc, "S_time = (t_manual − t_assisted) / t_manual × 100%", 3)
    add_text(doc, "Here N is the sample size, mᵢᴬ is the agent's provisional mark, mᵢᵀ is the teacher benchmark mark, and t is the mean processing time per response.")
    add_table_caption(doc, "Table 8. Real-response evaluation metrics, calculation rules, and decision uses")
    add_table(
        doc,
        ["Metric", "Operational definition", "Decision use"],
        [
            ["Exact agreement", "Percentage of responses for which the provisional agent mark equals the teacher benchmark mark.", "Tests whether the system reproduces the teacher's specific mark decision."],
            ["Within-one agreement", "Percentage of responses with an absolute mark difference no greater than one.", "Identifies whether scoring remains within an acceptable adjacent range."],
            ["Weighted Cohen's kappa", "Chance-corrected agreement coefficient that applies greater penalties to larger mark differences.", "Evaluates overall scoring stability beyond chance agreement."],
            ["Transcription accuracy", "Correctly recognised words divided by legible words in the confirmed transcript; illegible spans are reported separately.", "Separates vision-recognition error from marking-reasoning error."],
            ["Teacher time saving", "(Mean manual time - mean assisted time) divided by mean manual time.", "Tests whether the tool produces an educationally meaningful efficiency gain."],
        ],
        [1800, 4540, 3020],
    )
    add_callout(
        doc,
        "Interpretation rule",
        "These thresholds are release conditions rather than promotional targets. If any critical metric fails, the supported automatic-marking scope must be narrowed and the limitation disclosed in competition materials and later classroom use.",
        fill=COLORS["cream"],
        accent=COLORS["teal"],
    )
    remove_trailing_empty_paragraphs(doc)
    return doc


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    for image in IMAGES.values():
        if not image.exists():
            raise FileNotFoundError(f"Missing report image: {image}")

    zh = build_chinese_academic()
    zh.save(ZH_PATH)
    en = build_english_academic()
    en.save(EN_PATH)
    print(ZH_PATH)
    print(EN_PATH)


if __name__ == "__main__":
    main()
