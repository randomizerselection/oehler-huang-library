from __future__ import annotations

from pathlib import Path
from typing import Iterable

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
ASSET_DIR = ROOT / "output" / "reports" / "assets"

WIDTH = 2400
HEIGHT = 2850
BACKGROUND = "#FFFFFF"
INK = "#1E2832"
MUTED = "#5F6973"
LINE = "#6E7781"
LIGHT_FILL = "#F7F8F9"
TEACHER_FILL = "#E8EEF5"
TEACHER_LINE = "#294F73"
EXCEPTION_FILL = "#FBFBFB"

FONT_DIR = Path("C:/Windows/Fonts")


def load_fonts(language: str) -> dict[str, ImageFont.FreeTypeFont]:
    if language == "zh":
        regular = FONT_DIR / "msyh.ttc"
        bold = FONT_DIR / "msyhbd.ttc"
    else:
        regular = FONT_DIR / "times.ttf"
        bold = FONT_DIR / "timesbd.ttf"
    return {
        "node": ImageFont.truetype(str(regular), 33),
        "node_bold": ImageFont.truetype(str(bold), 34),
        "small": ImageFont.truetype(str(regular), 27),
        "small_bold": ImageFont.truetype(str(bold), 28),
        "stage": ImageFont.truetype(str(FONT_DIR / ("msyhbd.ttc" if language == "zh" else "arialbd.ttf")), 27),
        "legend": ImageFont.truetype(str(regular), 25),
    }


def text_width(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont) -> int:
    box = draw.textbbox((0, 0), text, font=font)
    return box[2] - box[0]


def wrap_line(
    draw: ImageDraw.ImageDraw,
    text: str,
    font: ImageFont.FreeTypeFont,
    max_width: int,
    language: str,
) -> list[str]:
    if not text:
        return [""]
    units = list(text) if language == "zh" else text.split()
    spacer = "" if language == "zh" else " "
    lines: list[str] = []
    current = ""
    for unit in units:
        candidate = unit if not current else f"{current}{spacer}{unit}"
        if text_width(draw, candidate, font) <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = unit
    if current:
        lines.append(current)
    return lines


def wrap_text(
    draw: ImageDraw.ImageDraw,
    text: str,
    font: ImageFont.FreeTypeFont,
    max_width: int,
    language: str,
) -> list[str]:
    lines: list[str] = []
    for explicit_line in text.split("\n"):
        lines.extend(wrap_line(draw, explicit_line, font, max_width, language))
    return lines


def draw_centered_text(
    draw: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    text: str,
    font: ImageFont.FreeTypeFont,
    language: str,
    fill: str = INK,
    padding: int = 34,
    line_gap: int = 8,
) -> None:
    x1, y1, x2, y2 = box
    lines = wrap_text(draw, text, font, x2 - x1 - 2 * padding, language)
    heights = []
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=font)
        heights.append(bbox[3] - bbox[1])
    total_height = sum(heights) + line_gap * max(0, len(lines) - 1)
    y = y1 + (y2 - y1 - total_height) / 2
    for line, height in zip(lines, heights):
        bbox = draw.textbbox((0, 0), line, font=font)
        width = bbox[2] - bbox[0]
        draw.text((x1 + (x2 - x1 - width) / 2, y - bbox[1]), line, font=font, fill=fill)
        y += height + line_gap


def dashed_line(
    draw: ImageDraw.ImageDraw,
    start: tuple[int, int],
    end: tuple[int, int],
    fill: str,
    width: int = 4,
    dash: int = 18,
    gap: int = 12,
) -> None:
    x1, y1 = start
    x2, y2 = end
    if x1 == x2:
        direction = 1 if y2 >= y1 else -1
        cursor = y1
        while (cursor - y2) * direction < 0:
            stop = cursor + direction * min(dash, abs(y2 - cursor))
            draw.line((x1, cursor, x2, stop), fill=fill, width=width)
            cursor = stop + direction * gap
    elif y1 == y2:
        direction = 1 if x2 >= x1 else -1
        cursor = x1
        while (cursor - x2) * direction < 0:
            stop = cursor + direction * min(dash, abs(x2 - cursor))
            draw.line((cursor, y1, stop, y2), fill=fill, width=width)
            cursor = stop + direction * gap
    else:
        draw.line((x1, y1, x2, y2), fill=fill, width=width)


def arrowhead(
    draw: ImageDraw.ImageDraw,
    start: tuple[int, int],
    end: tuple[int, int],
    fill: str,
    size: int = 16,
) -> None:
    x1, y1 = start
    x2, y2 = end
    if abs(x2 - x1) >= abs(y2 - y1):
        if x2 >= x1:
            points = [(x2, y2), (x2 - size, y2 - size // 2), (x2 - size, y2 + size // 2)]
        else:
            points = [(x2, y2), (x2 + size, y2 - size // 2), (x2 + size, y2 + size // 2)]
    elif y2 >= y1:
        points = [(x2, y2), (x2 - size // 2, y2 - size), (x2 + size // 2, y2 - size)]
    else:
        points = [(x2, y2), (x2 - size // 2, y2 + size), (x2 + size // 2, y2 + size)]
    draw.polygon(points, fill=fill)


def draw_arrow(
    draw: ImageDraw.ImageDraw,
    points: Iterable[tuple[int, int]],
    *,
    dashed: bool = False,
    fill: str = LINE,
    width: int = 4,
) -> None:
    pts = list(points)
    for start, end in zip(pts, pts[1:]):
        if dashed:
            dashed_line(draw, start, end, fill, width)
        else:
            draw.line((*start, *end), fill=fill, width=width)
    arrowhead(draw, pts[-2], pts[-1], fill)


def dashed_rectangle(
    draw: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    fill: str,
    width: int = 4,
) -> None:
    x1, y1, x2, y2 = box
    dashed_line(draw, (x1, y1), (x2, y1), fill, width)
    dashed_line(draw, (x2, y1), (x2, y2), fill, width)
    dashed_line(draw, (x2, y2), (x1, y2), fill, width)
    dashed_line(draw, (x1, y2), (x1, y1), fill, width)


def draw_box(
    draw: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    text: str,
    font: ImageFont.FreeTypeFont,
    language: str,
    *,
    teacher: bool = False,
    exception: bool = False,
) -> None:
    fill = TEACHER_FILL if teacher else (EXCEPTION_FILL if exception else LIGHT_FILL)
    outline = TEACHER_LINE if teacher else LINE
    draw.rounded_rectangle(box, radius=10, fill=fill)
    if exception:
        dashed_rectangle(draw, box, outline, width=4)
    else:
        draw.rounded_rectangle(box, radius=10, outline=outline, width=4)
    draw_centered_text(draw, box, text, font, language)


def draw_diamond(
    draw: ImageDraw.ImageDraw,
    center: tuple[int, int],
    width: int,
    height: int,
    text: str,
    font: ImageFont.FreeTypeFont,
    language: str,
) -> tuple[int, int, int, int]:
    cx, cy = center
    points = [(cx, cy - height // 2), (cx + width // 2, cy), (cx, cy + height // 2), (cx - width // 2, cy)]
    draw.polygon(points, fill="#FFFFFF", outline=LINE)
    draw.line(points + [points[0]], fill=LINE, width=4, joint="curve")
    box = (cx - width // 3, cy - height // 3, cx + width // 3, cy + height // 3)
    draw_centered_text(draw, box, text, font, language, padding=0)
    return (cx - width // 2, cy - height // 2, cx + width // 2, cy + height // 2)


def draw_stage(
    draw: ImageDraw.ImageDraw,
    y: int,
    label: str,
    font: ImageFont.FreeTypeFont,
) -> None:
    draw.text((110, y), label, font=font, fill=TEACHER_LINE)
    label_width = text_width(draw, label, font)
    draw.line((140 + label_width, y + 18, 2290, y + 18), fill="#C6CCD2", width=2)


def label_on_line(
    draw: ImageDraw.ImageDraw,
    xy: tuple[int, int],
    text: str,
    font: ImageFont.FreeTypeFont,
) -> None:
    bbox = draw.textbbox((0, 0), text, font=font)
    pad_x = 8
    pad_y = 4
    x, y = xy
    draw.rectangle(
        (x - pad_x, y - pad_y, x + bbox[2] - bbox[0] + pad_x, y + bbox[3] - bbox[1] + pad_y),
        fill="#FFFFFF",
    )
    draw.text((x, y - bbox[1]), text, font=font, fill=MUTED)


def content(language: str) -> dict[str, str]:
    if language == "zh":
        return {
            "stage_a": "A  输入与图像验证",
            "stage_b": "B  已确认或通过门槛的评分输入",
            "stage_c": "C  证据约束型评分",
            "stage_d": "D  分歧处理与置信度控制",
            "stage_e": "E  受控终审与永久输出",
            "input": "同一道结构化题目 + 已确认评分标准\n单份或服务器配置容量的手写作答",
            "image": "图片接收与质量检查",
            "usable": "图像可用？",
            "reject": "拒绝 / 重新拍摄\n不生成分数",
            "transcription": "视觉转写（保留拼写、删除线与不确定片段）",
            "confirm_transcript": "人工确认，或高置信度 OCR 通过自动门槛",
            "rubric": "解析指令词、满分、等级、可给分内容与上限",
            "confirm_rubric": "教师确认评分标准为唯一依据",
            "score": "证据抽取 + 初评分\n每项给分绑定原文引句与评分标准",
            "review": "独立复核：检查过度给分、重复证据与错误推断",
            "difference": "初评分与复核分\n差异多大？",
            "adjudication": "相差 1 分\n独立裁定",
            "confidence": "置信度门控\n转写确定性、标准完整性、评分一致性与证据覆盖",
            "manual": "相差 ≥2 分 / 跨等级\n或低置信度 / 风险标记\n教师人工复核",
            "provisional": "暂定分数 + 可追溯证据表",
            "feedback": "等价中英反馈 + 两个优先改进点 + 1-2 道巩固问题",
            "decision": "人工终审，或满足全部门槛的版本化自动终审",
            "output": "账户永久记录：原图、最终分数、反馈打印包与审计数据",
            "yes": "是",
            "no": "否",
            "zero": "0 分",
            "one": "1 分",
            "large": "≥2 分 / 跨等级",
            "low": "低置信度 / 风险",
            "legend": "图例：蓝色框 = 输入确认或终审控制；实线 = 主流程；虚线 = 拒绝、修正或人工复核路径。",
        }
    return {
        "stage_a": "A  INPUT AND IMAGE VALIDATION",
        "stage_b": "B  CONFIRMED OR SAFELY GATED INPUTS",
        "stage_c": "C  EVIDENCE-CONSTRAINED SCORING",
        "stage_d": "D  DISAGREEMENT AND CONFIDENCE CONTROL",
        "stage_e": "E  CONTROLLED FINALISATION AND STORAGE",
        "input": "One structured question + confirmed rubric\nOne response or a server-configured class batch",
        "image": "Image intake and quality validation",
        "usable": "Image usable?",
        "reject": "Reject / recapture\nNo mark produced",
        "transcription": "Vision transcription (preserve spelling, deletions, and uncertainty)",
        "confirm_transcript": "Human confirmation or high-confidence automatic OCR gate",
        "rubric": "Parse command word, total, levels, creditworthy content, and caps",
        "confirm_rubric": "Teacher confirms the rubric as the sole authority",
        "score": "Evidence extraction + primary scoring\nEvery credit cites the response and rubric",
        "review": "Independent review for over-crediting, duplication, and unsupported inference",
        "difference": "Primary-reviewer\ndifference?",
        "adjudication": "One-mark difference\nIndependent adjudication",
        "confidence": "Confidence gate\nTranscription, rubric, scorer agreement, and evidence coverage",
        "manual": "Two or more marks / level shift\nor low confidence / risk flag\nTeacher manual review",
        "provisional": "Provisional mark + traceable evidence table",
        "feedback": "Equivalent English-Chinese feedback + two priorities + 1-2 questions",
        "decision": "Human finalisation or versioned auto-policy after all gates pass",
        "output": "Permanent account record: image, mark, printable feedback, and audit data",
        "yes": "Yes",
        "no": "No",
        "zero": "0 marks",
        "one": "1 mark",
        "large": "≥2 marks / level",
        "low": "Low confidence / risk",
        "legend": "Legend: blue boxes = input confirmation or finalisation control; solid = main flow; dashed = rejection, correction, or manual review.",
    }


def build_figure(language: str, path: Path) -> None:
    labels = content(language)
    fonts = load_fonts(language)
    image = Image.new("RGB", (WIDTH, HEIGHT), BACKGROUND)
    draw = ImageDraw.Draw(image)

    main_x1, main_x2 = 610, 1790
    side_left = (100, 1845, 650, 1975)
    side_right = (1750, 1825, 2300, 1995)

    draw_stage(draw, 25, labels["stage_a"], fonts["stage"])
    input_box = (main_x1, 75, main_x2, 190)
    image_box = (main_x1, 245, main_x2, 350)
    usable = (1200, 465)
    reject_box = (1840, 405, 2320, 530)
    draw_box(draw, input_box, labels["input"], fonts["node"], language)
    draw_box(draw, image_box, labels["image"], fonts["node"], language)
    usable_box = draw_diamond(draw, usable, 740, 170, labels["usable"], fonts["node_bold"], language)
    draw_box(draw, reject_box, labels["reject"], fonts["small_bold"], language, exception=True)
    draw_arrow(draw, [(1200, 190), (1200, 245)])
    draw_arrow(draw, [(1200, 350), (1200, usable_box[1])])
    draw_arrow(draw, [(usable_box[2], 465), (1840, 465)], dashed=True)
    label_on_line(draw, (1665, 427), labels["no"], fonts["small"])
    draw_arrow(draw, [(2320, 435), (2345, 435), (2345, 130), (1790, 130)], dashed=True)

    draw_stage(draw, 570, labels["stage_b"], fonts["stage"])
    transcription_box = (main_x1, 625, main_x2, 735)
    confirm_transcript_box = (main_x1, 785, main_x2, 900)
    rubric_box = (main_x1, 950, main_x2, 1060)
    confirm_rubric_box = (main_x1, 1110, main_x2, 1225)
    draw_box(draw, transcription_box, labels["transcription"], fonts["node"], language)
    draw_box(draw, confirm_transcript_box, labels["confirm_transcript"], fonts["node_bold"], language, teacher=True)
    draw_box(draw, rubric_box, labels["rubric"], fonts["node"], language)
    draw_box(draw, confirm_rubric_box, labels["confirm_rubric"], fonts["node_bold"], language, teacher=True)
    draw_arrow(draw, [(1200, usable_box[3]), (1200, 625)])
    label_on_line(draw, (1220, 563), labels["yes"], fonts["small"])
    draw_arrow(draw, [(1200, 735), (1200, 785)])
    draw_arrow(draw, [(1200, 900), (1200, 950)])
    draw_arrow(draw, [(1200, 1060), (1200, 1110)])

    draw_stage(draw, 1260, labels["stage_c"], fonts["stage"])
    score_box = (main_x1, 1315, main_x2, 1435)
    review_box = (main_x1, 1485, main_x2, 1605)
    draw_box(draw, score_box, labels["score"], fonts["node"], language)
    draw_box(draw, review_box, labels["review"], fonts["node"], language)
    draw_arrow(draw, [(1200, 1225), (1200, 1315)])
    draw_arrow(draw, [(1200, 1435), (1200, 1485)])
    difference_box = draw_diamond(draw, (1200, 1720), 760, 180, labels["difference"], fonts["node_bold"], language)
    draw_arrow(draw, [(1200, 1605), (1200, difference_box[1])])

    draw_stage(draw, 1810, labels["stage_d"], fonts["stage"])
    draw_box(draw, side_left, labels["adjudication"], fonts["small_bold"], language)
    confidence_box = (750, 1845, 1650, 1975)
    draw_box(draw, confidence_box, labels["confidence"], fonts["small_bold"], language)
    draw_box(draw, side_right, labels["manual"], fonts["small_bold"], language, exception=True)
    draw_arrow(draw, [(difference_box[0], 1720), (375, 1720), (375, 1845)])
    label_on_line(draw, (470, 1680), labels["one"], fonts["small"])
    draw_arrow(draw, [(1200, difference_box[3]), (1200, 1845)])
    label_on_line(draw, (1220, 1790), labels["zero"], fonts["small"])
    draw_arrow(draw, [(difference_box[2], 1720), (2025, 1720), (2025, 1825)], dashed=True)
    label_on_line(draw, (1790, 1680), labels["large"], fonts["small"])
    draw_arrow(draw, [(650, 1910), (750, 1910)])

    provisional_box = (main_x1, 2040, main_x2, 2150)
    feedback_box = (main_x1, 2200, main_x2, 2315)
    draw_box(draw, provisional_box, labels["provisional"], fonts["node"], language)
    draw_box(draw, feedback_box, labels["feedback"], fonts["node"], language)
    draw_arrow(draw, [(1200, 1975), (1200, 2040)])
    draw_arrow(draw, [(1650, 1910), (1700, 1910), (1700, 2095), (1790, 2095)], dashed=True)
    label_on_line(draw, (1715, 1990), labels["low"], fonts["small"])
    draw_arrow(draw, [(1200, 2150), (1200, 2200)])

    draw_stage(draw, 2355, labels["stage_e"], fonts["stage"])
    decision_box = (main_x1, 2410, main_x2, 2525)
    output_box = (main_x1, 2580, main_x2, 2705)
    draw_box(draw, decision_box, labels["decision"], fonts["node_bold"], language, teacher=True)
    draw_box(draw, output_box, labels["output"], fonts["node"], language)
    draw_arrow(draw, [(1200, 2315), (1200, 2410)])
    draw_arrow(draw, [(2025, 1995), (2025, 2468), (1790, 2468)], dashed=True)
    draw_arrow(draw, [(1200, 2525), (1200, 2580)])

    # Redraw the stage bands last so routed branch lines never obscure their labels.
    for y, label in (
        (25, labels["stage_a"]),
        (570, labels["stage_b"]),
        (1260, labels["stage_c"]),
        (1810, labels["stage_d"]),
        (2355, labels["stage_e"]),
    ):
        bbox = draw.textbbox((110, y), label, font=fonts["stage"])
        draw.rectangle((96, y - 5, bbox[2] + 18, bbox[3] + 6), fill=BACKGROUND)
        draw_stage(draw, y, label, fonts["stage"])

    legend_y = 2780
    draw.rectangle((110, legend_y - 2, 150, legend_y + 28), fill=TEACHER_FILL, outline=TEACHER_LINE, width=3)
    draw.text((175, legend_y - 4), labels["legend"], font=fonts["legend"], fill=MUTED)

    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, format="PNG", dpi=(300, 300), optimize=True)


def main() -> None:
    ASSET_DIR.mkdir(parents=True, exist_ok=True)
    targets = {
        "zh": ASSET_DIR / "econmark-workflow-journal-zh.png",
        "en": ASSET_DIR / "econmark-workflow-journal-en.png",
    }
    for language, path in targets.items():
        build_figure(language, path)
        print(path)


if __name__ == "__main__":
    main()
