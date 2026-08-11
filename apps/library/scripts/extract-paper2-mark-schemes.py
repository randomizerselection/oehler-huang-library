"""Build a topic-first Paper 2 mark-scheme archive from the merged PDF.

The output is intended as a teacher/Codex planning reference. It keeps source
provenance on every entry while grouping questions by current 0455 syllabus
topic for future lesson creation.
"""

from __future__ import annotations

import argparse
import re
import unicodedata
from dataclasses import dataclass, field
from pathlib import Path

from pypdf import PdfReader


DEFAULT_OUT_DIR = Path("references/paper-2-mark-schemes-2023-2025")

TOPICS = {
    "1": ("1-basic-economic-problem.md", "1 The Basic Economic Problem"),
    "2": ("2-allocation-of-resources.md", "2 The Allocation of Resources"),
    "3": ("3-microeconomic-decision-makers.md", "3 Microeconomic Decision-Makers"),
    "4": ("4-government-and-macroeconomy.md", "4 Government and the Macroeconomy"),
    "5": ("5-economic-development.md", "5 Economic Development"),
    "6": (
        "6-international-trade-globalisation.md",
        "6 International Trade and Globalisation",
    ),
}

GROUP_TITLES = {
    "1.1": "The basic economic problem",
    "1.2": "Factors of production",
    "1.3": "Opportunity cost",
    "1.4": "Production possibility curves",
    "2.1": "How markets work",
    "2.2": "Demand",
    "2.3": "Supply",
    "2.4": "Price mechanism and equilibrium",
    "2.5": "Causes and consequences of price changes",
    "2.6": "Price elasticity of demand",
    "2.7": "Price elasticity of supply",
    "2.8": "Market economic system",
    "2.9": "Market failure",
    "2.10": "Mixed economy and government intervention",
    "3.1": "Money and banking",
    "3.2": "Household decisions",
    "3.3": "Workers, wages and labour markets",
    "3.4": "Firms and scale",
    "3.5": "Production and productivity",
    "3.6": "Costs and revenue",
    "3.7": "Market structure",
    "4.1": "Macroeconomic aims",
    "4.2": "Government budget, taxation and fiscal policy",
    "4.3": "Monetary policy",
    "4.4": "Supply-side policy",
    "4.5": "Economic growth and recession",
    "4.6": "Employment and unemployment",
    "4.7": "Inflation and deflation",
    "5.1": "Living standards",
    "5.2": "Poverty and redistribution",
    "5.3": "Population",
    "5.4": "Differences in development",
    "6.1": "Specialisation and free trade",
    "6.2": "Globalisation and trade restrictions",
    "6.3": "Foreign exchange rates",
    "6.4": "Current account and balance of payments",
}

REF_RULES = [
    ("1.1", ["scarcity", "finite resources", "infinite wants", "economic good", "free good", "basic economic problem"]),
    ("1.2", ["factor of production", "factors of production", "land", "labour", "capital", "enterprise", "entrepreneur", "resource quality", "resource quantity"]),
    ("1.3", ["opportunity cost", "next best alternative"]),
    ("1.4", ["production possibility", "ppc", "productive capacity", "unemployed resources"]),
    ("2.2", ["demand curve", "quantity demanded", "market demand", "increase in demand", "decrease in demand", "complement", "substitute"]),
    ("2.3", ["define supply", "supply curve", "quantity supplied", "market supply", "increase in supply", "decrease in supply", "costs of production"]),
    ("2.4", ["price mechanism", "market equilibrium", "equilibrium price", "shortage", "surplus"]),
    ("2.5", ["market price", "price changes", "sales", "demand and supply diagram"]),
    ("2.6", ["price elasticity of demand", "ped", "elastic demand", "inelastic demand", "total revenue", "expenditure"]),
    ("2.7", ["price elasticity of supply", "pes", "elastic supply", "inelastic supply", "spare capacity", "stocks"]),
    ("2.8", ["market economic system", "market economy", "private sector", "consumer sovereignty", "profit incentive", "competition"]),
    ("2.9", ["market failure", "external cost", "external benefit", "social cost", "social benefit", "public good", "merit good", "demerit good", "monopoly power", "pollution"]),
    ("2.10", ["public sector", "mixed economy", "maximum price", "minimum price", "indirect tax", "subsidy", "regulation", "privatisation", "nationalisation", "quota", "government intervention"]),
    ("3.1", ["money", "central bank", "commercial bank", "banking", "medium of exchange", "store of value"]),
    ("3.2", ["household", "saving", "borrowing", "consumer expenditure", "confidence", "disposable income"]),
    ("3.3", ["occupation", "wage", "trade union", "minimum wage", "labour market", "mobility of labour", "division of labour", "specialisation of workers"]),
    ("3.4", ["primary-sector", "primary sector", "secondary sector", "tertiary sector", "small firm", "large firm", "merger", "economies of scale", "diseconomies of scale"]),
    ("3.5", ["productivity", "production", "labour-intensive", "capital-intensive", "investment in capital", "factor productivity"]),
    ("3.6", ["fixed cost", "variable cost", "average cost", "total cost", "average revenue", "total revenue"]),
    ("3.7", ["competitive market", "monopoly", "number of firms", "market structure"]),
    ("4.1", ["macroeconomic aim", "macroeconomic aims", "low unemployment", "low inflation", "stable prices", "balance of payments stability", "redistribution", "environmental sustainability"]),
    ("4.2", ["government spending", "taxation", "tax revenue", "fiscal policy", "budget deficit", "budget surplus", "direct tax", "income tax", "corporation tax", "indirect tax", "state benefits"]),
    ("4.3", ["monetary policy", "interest rate", "money supply", "central bank", "exchange-rate measure"]),
    ("4.4", ["supply-side", "supply side", "deregulation", "privatisation", "training", "infrastructure", "productive capacity"]),
    ("4.5", ["economic growth", "real gdp", "gdp", "recession", "living standards", "output", "income per head"]),
    ("4.6", ["unemployment", "employment", "unemployed", "frictional", "structural unemployment", "cyclical unemployment", "seasonal unemployment", "labour force"]),
    ("4.7", ["inflation", "deflation", "consumer prices index", "cpi", "demand-pull", "cost-push", "purchasing power", "price stability"]),
    ("5.1", ["access to electricity", "living standards", "hdi", "human development index", "real gdp per head", "life expectancy"]),
    ("5.2", ["poverty", "absolute poverty", "relative poverty", "income distribution", "redistribute income", "minimum wage", "state benefit"]),
    ("5.3", ["aged 18", "aged under", "age distribution", "population", "birth rate", "death rate", "net migration", "immigration", "emigration", "optimum population", "ageing population"]),
    ("5.4", ["development", "developing country", "developed country", "productivity gap", "healthcare", "education"]),
    ("6.1", ["specialisation", "free trade", "international trade", "comparative advantage"]),
    ("6.2", ["globalisation", "multinational", "mnc", "tariff", "quota", "embargo", "protectionism", "trade restriction", "import restriction", "export subsidy", "subsidy on exports", "infant industry", "dumping"]),
    ("6.3", ["foreign exchange market", "exchange rate", "foreign currency", "appreciation", "depreciation", "floating exchange", "currency value"]),
    ("6.4", ["current account", "balance of payments", "exports", "imports", "trade in goods", "trade in services", "current account deficit", "current account surplus"]),
]

TAG_RULES = {
    "macroeconomic aims": ["macroeconomic aim", "economic growth", "inflation", "unemployment", "current account", "redistribution", "sustainability"],
    "policy evaluation": ["discuss whether", "policy", "government should", "central bank should", "advantages", "disadvantages"],
    "current account": ["current account", "balance of payments", "exports", "imports"],
    "employment": ["employment", "unemployment", "jobs", "workers"],
    "inflation": ["inflation", "deflation", "price stability", "cpi"],
    "opportunity cost": ["opportunity cost", "alternative forgone"],
    "diagram": ["diagram", "curve", "shift"],
    "calculation": ["calculate", "work out", "formula"],
    "definitions": ["define", "definition", "what is meant"],
}

PROMPT_STOP = re.compile(
    r"^(logical|coherent|award|answers? may|accept|one mark|two marks|up to|"
    r"demand and supply diagram|supply and demand diagram|diagram:|correct|"
    r"calculation|application|analysis|reasons?|examples?|a definition|"
    r"candidates may|in assessing|level description|indicative content)\b",
    re.I,
)

SKIP_SCHEME_LINES = re.compile(
    r"^(question answer marks guidance|level description marks|in assessing each answer,"
    r"|use the table opposite|apply this example to all questions|generic example mark"
    r"|each point may be credited only once|no marks? for possible effects"
    r"|if more than|if the answer also|marks? guidance)$",
    re.I,
)


@dataclass
class Paper:
    component: str
    series: str
    year: str
    start_page: int
    end_page: int
    question_numbers: list[str] = field(default_factory=list)

    @property
    def code(self) -> str:
        prefix = {
            "February/March": "FM",
            "May/June": "MJ",
            "October/November": "ON",
        }.get(self.series, self.series[:2].upper())
        return f"{self.year}{prefix}-{self.component}"


@dataclass
class Entry:
    paper: Paper
    label: str
    source_page: int
    body_lines: list[str]
    prompt: str = ""
    command: str = ""
    marks: str = "Review marks"
    primary_ref: str = "Review mapping"
    secondary_refs: list[str] = field(default_factory=list)
    tags: list[str] = field(default_factory=list)
    scheme_lines: list[str] = field(default_factory=list)
    lesson_use: str = ""

    @property
    def anchor(self) -> str:
        label = self.label.lower()
        label = label.replace("(", "").replace(")", "")
        return f"{self.paper.code.lower()}-q{label}"

    @property
    def title(self) -> str:
        focus = self.prompt.rstrip(".?")
        if len(focus) > 96:
            focus = focus[:93].rstrip() + "..."
        return f"{self.paper.code} Q{self.label} - {focus or 'Review extracted question focus'}"


def ascii_text(value: str) -> str:
    value = value.replace("\u2022", "-")
    value = value.replace("\u2013", "-").replace("\u2014", "-")
    value = value.replace("\u2018", "'").replace("\u2019", "'")
    value = value.replace("\u201c", '"').replace("\u201d", '"')
    value = value.replace("\u2122", "")
    value = unicodedata.normalize("NFKD", value)
    return value.encode("ascii", "ignore").decode("ascii")


def tidy_line(line: str) -> str:
    line = ascii_text(line)
    line = re.sub(r"\s+", " ", line).strip()
    line = line.replace("scare resources", "scarce resources")
    return line


def find_papers(reader: PdfReader) -> list[Paper]:
    starts: list[tuple[int, str, str, str]] = []
    cover = re.compile(
        r"ECONOMICS\s+0455/(\d+)\s+Paper 2 Structured Questions\s+"
        r"(February/March|May/June|October/November)\s+(\d{4})\s+MARK SCHEME"
    )
    for index, page in enumerate(reader.pages):
        flat = " ".join(tidy_line(page.extract_text() or "").split())
        match = cover.search(flat)
        if match:
            component, series, year = match.groups()
            starts.append((index + 1, component, series, year))

    papers: list[Paper] = []
    for idx, (start, component, series, year) in enumerate(starts):
        end = starts[idx + 1][0] - 1 if idx + 1 < len(starts) else len(reader.pages)
        papers.append(Paper(component, series, year, start, end))
    return papers


def clean_page_lines(text: str) -> list[str]:
    lines: list[str] = []
    for raw in text.splitlines():
        line = tidy_line(raw)
        if not line:
            lines.append("")
            continue
        if re.match(r"^0455/\d+ Cambridge IGCSE", line):
            continue
        if line in {"PUBLISHED", "Published"}:
            continue
        if re.match(r"^(February/March|May/June|October/November) \d{4}$", line):
            continue
        if re.match(r"^UCLES \d{4} Page \d+ of \d+$", line):
            continue
        if re.match(r"^Cambridge University Press & Assessment \d{4} Page \d+ of \d+$", line):
            continue
        if line in {"[Turn over", "This document consists of 28 printed pages."}:
            continue
        if line == "Question Answer Marks Guidance":
            continue
        lines.append(line)
    return lines


def extract_entries(reader: PdfReader, paper: Paper) -> list[Entry]:
    label_re = re.compile(r"^(\d\([a-h]\)(?:\([ivx]+\))?)\s*(.*)$", re.I)
    entries: list[Entry] = []
    current: Entry | None = None
    seen_labels: dict[str, Entry] = {}
    in_answers = False

    for page_no in range(paper.start_page, paper.end_page + 1):
        text = reader.pages[page_no - 1].extract_text() or ""
        for line in clean_page_lines(text):
            if "Question Answer Marks Guidance" in line:
                in_answers = True
                continue
            match = label_re.match(line)
            if match:
                in_answers = True
                label, rest = match.groups()
                if label in seen_labels:
                    current = seen_labels[label]
                    if rest:
                        current.body_lines.append(rest)
                    continue
                current = Entry(paper=paper, label=label, source_page=page_no, body_lines=[])
                if rest:
                    current.body_lines.append(rest)
                entries.append(current)
                seen_labels[label] = current
                continue
            if current and in_answers:
                current.body_lines.append(line)

    numbers = sorted({re.match(r"^(\d)", e.label).group(1) for e in entries})
    paper.question_numbers = [f"Q{number}" for number in numbers]
    return entries


def extract_prompt(lines: list[str]) -> str:
    prompt_lines: list[str] = []
    for line in lines:
        clean = tidy_line(line)
        if not clean:
            if prompt_lines:
                break
            continue
        if prompt_lines and PROMPT_STOP.search(clean):
            break
        if not prompt_lines and PROMPT_STOP.search(clean):
            break
        prompt_lines.append(clean)
        if "?" in clean and len(prompt_lines) >= 1:
            break
        if len(prompt_lines) >= 4:
            break
    return " ".join(prompt_lines).strip()


def command_from_prompt(prompt: str) -> str:
    if not prompt:
        return "Review command"
    first = re.split(r"\s+", prompt.strip(), maxsplit=1)[0]
    return first.strip(":,.;").capitalize()


def extract_marks(lines: list[str]) -> str:
    for line in lines:
        clean = tidy_line(line)
        standalone = re.match(r"^([1-9]|10)$", clean)
        if standalone:
            return standalone.group(1)
        leading = re.match(
            r"^([1-9]|10)\s+(Accept|Allow|Reward|If|Cambridge|One mark|Award|May|Alternatively|Apply|Level|No |Do not|Answers?|Candidates?)\b",
            clean,
            re.I,
        )
        if leading:
            return leading.group(1)
    return "Review marks"


def fallback_marks(label: str) -> str:
    match = re.match(r"^(\d)\(([a-h])\)", label)
    if not match:
        return "Review marks"
    question, part = match.groups()
    if question == "1":
        return {
            "a": "1",
            "b": "2",
            "c": "2",
            "d": "4",
            "e": "4",
            "f": "5",
            "g": "6",
            "h": "6",
        }.get(part, "Review marks")
    return {"a": "2", "b": "4", "c": "6", "d": "8"}.get(part, "Review marks")


def scheme_points(lines: list[str], prompt: str, marks: str) -> list[str]:
    output: list[str] = []
    started = False
    for line in lines:
        clean = tidy_line(line)
        if not started:
            if not clean:
                if prompt:
                    started = True
                continue
            if prompt and clean.lower().rstrip(".?") in prompt.lower().rstrip(".?"):
                continue
            started = True
        if not clean:
            continue
        if SKIP_SCHEME_LINES.search(clean):
            continue
        if "Cambridge University Press & Assessment" in clean:
            continue
        if marks != "Review marks" and re.match(rf"^{re.escape(marks)}(\s|$)", clean):
            clean = re.sub(rf"^{re.escape(marks)}\s*", "", clean).strip()
            if not clean:
                continue
        if clean in {"Level Description Marks", "Guidance"}:
            continue
        output.append(clean)
    return output[:45] or ["Review extracted mark-scheme wording against the source PDF."]


def score_refs(text: str) -> list[tuple[str, int]]:
    lower = text.lower()
    scores: dict[str, int] = {}
    for ref, keywords in REF_RULES:
        score = 0
        for keyword in keywords:
            if keyword in lower:
                score += 3 if " " in keyword else 1
        if score:
            scores[ref] = scores.get(ref, 0) + score
    return sorted(scores.items(), key=lambda item: (-item[1], item[0]))


def refs_for_entry(entry: Entry) -> tuple[str, list[str]]:
    scored = score_refs(" ".join([entry.prompt] + entry.body_lines))
    if not scored:
        return "Review mapping", []
    primary, primary_score = scored[0]
    secondary = [ref for ref, score in scored[1:5] if score >= 3]
    if primary_score < 3:
        return primary, secondary
    return primary, secondary


def tags_for_entry(entry: Entry) -> list[str]:
    lower = " ".join([entry.prompt] + entry.scheme_lines).lower()
    tags = [tag for tag, keywords in TAG_RULES.items() if any(k in lower for k in keywords)]
    scored = score_refs(" ".join([entry.prompt] + entry.body_lines))
    if scored and scored[0][1] < 3:
        tags.append("review mapping")
    if entry.command.lower() in {"discuss", "analyse", "explain", "calculate", "define", "state", "identify", "give", "describe"}:
        tags.append(entry.command.lower())
    return sorted(set(tags))


def lesson_use_for(entry: Entry) -> str:
    command = entry.command.lower()
    refs = ", ".join([entry.primary_ref] + entry.secondary_refs)
    if command == "define":
        return f"Use this wording to align term slides, flashcards and quiz accepted answers for {refs}."
    if command == "calculate":
        return f"Use as a calculation model: include formula setup, substitution and unit/interpretation checks for {refs}."
    if command in {"discuss"}:
        return f"Use as an exam-practice frame: build both sides, then require a supported judgement linked to {refs}."
    if command in {"analyse", "explain"}:
        return f"Use the cause-effect chains as slide explanations and short-answer quiz feedback for {refs}."
    if command in {"state", "identify", "give", "describe"}:
        return f"Use as retrieval wording for quick checks and low-stakes quiz items for {refs}."
    return f"Use the mark-scheme vocabulary when creating lesson examples and exam practice for {refs}."


def enrich_entries(entries: list[Entry]) -> None:
    for entry in entries:
        entry.prompt = extract_prompt(entry.body_lines)
        entry.command = command_from_prompt(entry.prompt)
        entry.marks = extract_marks(entry.body_lines)
        if entry.marks == "Review marks":
            entry.marks = fallback_marks(entry.label)
        entry.scheme_lines = scheme_points(entry.body_lines, entry.prompt, entry.marks)
        entry.primary_ref, entry.secondary_refs = refs_for_entry(entry)
        entry.tags = tags_for_entry(entry)
        entry.lesson_use = lesson_use_for(entry)


def group_key(ref: str) -> str:
    match = re.match(r"^(\d+\.\d+)", ref)
    if match:
        return match.group(1)
    return "Review mapping"


def topic_for_ref(ref: str) -> str:
    match = re.match(r"^(\d)", ref)
    return match.group(1) if match else "1"


def ref_display(entry: Entry) -> str:
    if entry.primary_ref == "Review mapping":
        if entry.secondary_refs:
            return "Review mapping; possible refs: " + ", ".join(entry.secondary_refs)
        return "Review mapping"
    if entry.secondary_refs:
        return f"{entry.primary_ref} primary; {', '.join(entry.secondary_refs)} secondary"
    return f"{entry.primary_ref} primary"


def md_list(lines: list[str]) -> str:
    rendered: list[str] = []
    for line in lines:
        clean = line.strip()
        if clean.startswith("- "):
            rendered.append(clean)
        else:
            rendered.append(f"- {clean}")
    return "\n".join(rendered)


def marks_display(entry: Entry) -> str:
    if entry.marks == "Review marks":
        return f"{entry.command}, Review marks"
    label = "mark" if entry.marks == "1" else "marks"
    return f"{entry.command}, {entry.marks} {label}"


def write_index(out_dir: Path, source_pdf: Path, papers: list[Paper], all_entries: list[Entry]) -> None:
    source_for_yaml = ascii_text(str(source_pdf)).replace("\\", "/")
    lines = [
        "---",
        'title: "Cambridge IGCSE Economics 0455 Paper 2 Mark-Scheme Archive"',
        'course: "Cambridge IGCSE Economics"',
        'syllabus_code: "0455"',
        'document_type: "topic_first_mark_scheme_archive"',
        'source_years: "2023-2025"',
        f"source_file: '{source_for_yaml}'",
        "---",
        "",
        "# Paper 2 Mark-Scheme Archive, 2023-2025",
        "",
        "This archive reorganises recent Cambridge IGCSE Economics 0455 Paper 2 mark schemes by syllabus topic for lesson planning. It is a teacher/Codex planning reference, not a replacement for the official Cambridge mark schemes.",
        "",
        "Use it after checking the syllabus and definitions references:",
        "",
        "1. Start with `../igcse-economics-syllabus-2027-2029.md` for current syllabus coverage.",
        "2. Check `../igcse-economics-definitions-2026.md` for precise definition wording.",
        "3. Use this archive for recent Paper 2 answer patterns, command-word expectations and exam-ready phrasing.",
        "",
        "Broad questions are placed once under their most useful primary lesson topic. Other relevant topics receive cross-reference pointers rather than duplicate entries.",
        "",
        "## Topic Files",
        "",
    ]
    for _, (filename, title) in TOPICS.items():
        count = sum(1 for entry in all_entries if topic_for_ref(entry.primary_ref) == title[0])
        lines.append(f"- [{title}]({filename}) - {count} full entries")
    lines.extend(
        [
            "- [Source papers](source-papers.md) - paper chronology and PDF page starts",
            "",
            "## Coverage",
            "",
            f"- Source mark schemes detected: {len(papers)}",
            f"- Extracted question entries: {len(all_entries)}",
            "- Components: 0455/21, 0455/22 and 0455/23 where present in the merged PDF",
            "- Series: February/March, May/June and October/November from 2023 to 2025",
            "",
            "## Entry Metadata",
            "",
            "- `Source` gives series, component, question label and merged-PDF page.",
            "- `Command/marks` records the question command word and available mark total.",
            "- `Syllabus refs` gives a primary placement plus secondary links for cross-syllabus questions.",
            "- `Tags` support search across recurring lesson needs such as inflation, current account, policy evaluation and diagrams.",
            "- `Lesson use` explains how to convert the mark-scheme wording into teaching material.",
            "",
        ]
    )
    out_dir.joinpath("index.md").write_text("\n".join(lines), encoding="utf-8")


def write_source_papers(out_dir: Path, source_pdf: Path, papers: list[Paper]) -> None:
    lines = [
        "# Source Papers",
        "",
        f"Source PDF: `{ascii_text(str(source_pdf))}`",
        "",
        "| Series | Component | PDF pages | Questions detected |",
        "| --- | --- | ---: | --- |",
    ]
    for paper in papers:
        questions = ", ".join(paper.question_numbers) if paper.question_numbers else "Review extraction"
        lines.append(
            f"| {paper.series} {paper.year} | 0455/{paper.component} | {paper.start_page}-{paper.end_page} | {questions} |"
        )
    lines.append("")
    out_dir.joinpath("source-papers.md").write_text("\n".join(lines), encoding="utf-8")


def write_topic_files(out_dir: Path, entries: list[Entry]) -> None:
    by_topic: dict[str, list[Entry]] = {key: [] for key in TOPICS}
    for entry in entries:
        by_topic.setdefault(topic_for_ref(entry.primary_ref), []).append(entry)

    for topic, (filename, title) in TOPICS.items():
        topic_entries = by_topic.get(topic, [])
        lines = [
            "---",
            f'title: "{title} - Paper 2 Mark-Scheme References"',
            'course: "Cambridge IGCSE Economics"',
            'syllabus_code: "0455"',
            'source_years: "2023-2025"',
            "---",
            "",
            f"# {title}",
            "",
            "Question entries are placed under the best primary lesson topic. Cross-topic references at the end point to entries stored in other files.",
            "",
        ]

        grouped: dict[str, list[Entry]] = {}
        for entry in topic_entries:
            grouped.setdefault(group_key(entry.primary_ref), []).append(entry)

        for group in sorted(grouped, key=lambda key: (key == "Review mapping", key)):
            heading = GROUP_TITLES.get(group, group)
            lines.extend([f"## {group} {heading}", ""])
            for entry in sorted(grouped[group], key=lambda e: (e.paper.year, e.paper.series, e.paper.component, e.label)):
                lines.extend(
                    [
                        f'<a id="{entry.anchor}"></a>',
                        "",
                        f"### {entry.title}",
                        "",
                        f"- Source: {entry.paper.series} {entry.paper.year}, 0455/{entry.paper.component}, Q{entry.label}, merged PDF p. {entry.source_page}",
                        f"- Command/marks: {marks_display(entry)}",
                        f"- Syllabus refs: {ref_display(entry)}",
                        f"- Tags: {', '.join(entry.tags) if entry.tags else 'Review tags'}",
                        "",
                        f"Question focus: {entry.prompt or 'Review extracted question focus.'}",
                        "",
                        "Mark-scheme points:",
                        md_list(entry.scheme_lines),
                        "",
                        f"Lesson use: {entry.lesson_use}",
                        "",
                    ]
                )

        cross_refs: list[str] = []
        for entry in entries:
            if entry in topic_entries:
                continue
            secondary_topics = {topic_for_ref(ref) for ref in entry.secondary_refs}
            if topic in secondary_topics:
                primary_topic = TOPICS.get(topic_for_ref(entry.primary_ref), TOPICS["1"])
                cross_refs.append(
                    f"- See [{entry.paper.code} Q{entry.label}: {entry.prompt}]({primary_topic[0]}#{entry.anchor}) for {ref_display(entry)}."
                )
        if cross_refs:
            lines.extend(["## Cross-Topic References", ""])
            lines.extend(sorted(cross_refs))
            lines.append("")

        out_dir.joinpath(filename).write_text("\n".join(lines), encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("pdf", type=Path, help="Merged Paper 2 mark-scheme PDF")
    parser.add_argument("--out", type=Path, default=DEFAULT_OUT_DIR)
    args = parser.parse_args()

    reader = PdfReader(str(args.pdf))
    papers = find_papers(reader)
    all_entries: list[Entry] = []
    for paper in papers:
        entries = extract_entries(reader, paper)
        enrich_entries(entries)
        all_entries.extend(entries)

    args.out.mkdir(parents=True, exist_ok=True)
    write_index(args.out, args.pdf, papers, all_entries)
    write_source_papers(args.out, args.pdf, papers)
    write_topic_files(args.out, all_entries)

    print(f"Detected source papers: {len(papers)}")
    print(f"Extracted question entries: {len(all_entries)}")
    print(f"Wrote archive: {args.out}")


if __name__ == "__main__":
    main()
