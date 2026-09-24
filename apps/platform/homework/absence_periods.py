"""Conservative extraction of explicit student-reported absence periods."""
import datetime as dt
import re


ABSENCE_CATEGORIES = (
    ('health', (
        r'\b(?:ill|illness|sick|unwell|fever|medical|doctor|hospital|clinic|injur(?:y|ed)|headache|migraine|pain|covid|flu)\b',
        r'(?:生病|发烧|发热|不舒服|医院|医生|看病|身体|受伤|感冒|头痛)',
    )),
    ('academic', (
        r'\b(?:exam|examination|test|sat|study|studying|revision|application|interview|university)\b',
        r'(?:考试|备考|复习|学习|申请|面试|大学)',
    )),
    ('school_activity', (
        r'\b(?:competition|tournament|match|school\s+(?:event|activity|trip)|performance|rehearsal|extracurricular)\b',
        r'(?:比赛|竞赛|校内活动|学校活动|演出|彩排|课外活动)',
    )),
    ('family_personal', (
        r'\b(?:family|funeral|bereavement|relative|personal\s+(?:matter|reason)|family\s+emergency)\b',
        r'(?:家庭|家里|家事|亲人|葬礼|丧事|个人原因)',
    )),
    ('travel_transport', (
        r'\b(?:travel|trip|flight|airport|train|traffic|transport|visa|passport)\b',
        r'(?:旅行|出行|航班|机场|火车|交通|签证|护照)',
    )),
    ('appointment', (
        r'\b(?:appointment|counsell?or|counselling|administrative|official\s+business)\b',
        r'(?:预约|咨询师|辅导员|行政事务|办理手续)',
    )),
)


ACKNOWLEDGMENT_ONLY = re.compile(
    r'(?i)(?:(?:ok)+|okay|k|yes|yep|yeah|sure|thanks?|thank\s+you|'
    r'received|got\s+it|noted|好的|收到|知道了|谢谢|嗯+|可以)(?:\s*'
    r'(?:(?:ok)+|okay|k|yes|yep|yeah|sure|thanks?|thank\s+you|'
    r'received|got\s+it|noted|好的|收到|知道了|谢谢|嗯+|可以))*'
)


def is_substantive_absence_reason(reason):
    """Reject empty and acknowledgment-only replies before recording a reason."""
    text = re.sub(r'[\s\W_]+', ' ', (reason or '').strip(), flags=re.UNICODE).strip()
    return bool(text) and not bool(ACKNOWLEDGMENT_ONLY.fullmatch(text))


def classify_absence_reason(reason):
    """Return a stable, conservative category for a verified reason text."""
    text = (reason or '').strip()
    if not text:
        return None
    for category, patterns in ABSENCE_CATEGORIES:
        if any(re.search(pattern, text, re.I) for pattern in patterns):
            return category
    return 'other'


MONTHS = {
    name: number
    for number, names in enumerate((
        (), ('january', 'jan'), ('february', 'feb'), ('march', 'mar'),
        ('april', 'apr'), ('may',), ('june', 'jun'), ('july', 'jul'),
        ('august', 'aug'), ('september', 'sep', 'sept'),
        ('october', 'oct'), ('november', 'nov'), ('december', 'dec'),
    ))
    for name in names
}
MONTH_PATTERN = '|'.join(sorted(MONTHS, key=len, reverse=True))


def _date(year, month, day):
    try:
        return dt.date(year, month, day)
    except ValueError:
        return None


def _mentions(text, reference_year):
    """Return non-overlapping explicit date mentions in textual order."""
    matches = []

    def add(match, value, year_explicit):
        if value:
            matches.append((match.start(), match.end(), value, year_explicit))

    for match in re.finditer(r'(?<!\d)(20\d{2})[-/.](\d{1,2})[-/.](\d{1,2})(?!\d)', text):
        add(match, _date(int(match.group(1)), int(match.group(2)), int(match.group(3))), True)
    for match in re.finditer(r'(?:(20\d{2})\s*年\s*)?(\d{1,2})\s*月\s*(\d{1,2})\s*日?', text):
        year = int(match.group(1)) if match.group(1) else reference_year
        add(match, _date(year, int(match.group(2)), int(match.group(3))), bool(match.group(1)))
    for match in re.finditer(
            rf'(?<!\w)(\d{{1,2}})(?:st|nd|rd|th)?\s+({MONTH_PATTERN})(?:[\s,]+(20\d{{2}}))?(?!\w)',
            text, re.I):
        year = int(match.group(3)) if match.group(3) else reference_year
        add(match, _date(year, MONTHS[match.group(2).lower()], int(match.group(1))), bool(match.group(3)))
    for match in re.finditer(
            rf'(?<!\w)({MONTH_PATTERN})\s+(\d{{1,2}})(?:st|nd|rd|th)?(?:[\s,]+(20\d{{2}}))?(?!\w)',
            text, re.I):
        year = int(match.group(3)) if match.group(3) else reference_year
        add(match, _date(year, MONTHS[match.group(1).lower()], int(match.group(2))), bool(match.group(3)))
    for match in re.finditer(r'(?<!\d)(\d{1,2})[-/.](\d{1,2})(?:[-/.](20\d{2}))?(?!\d)', text):
        first, second = int(match.group(1)), int(match.group(2))
        if first <= 12 and second <= 12:
            continue  # Ambiguous 9/10-style dates are never guessed.
        month, day = (first, second) if first <= 12 else (second, first)
        year = int(match.group(3)) if match.group(3) else reference_year
        add(match, _date(year, month, day), bool(match.group(3)))

    selected = []
    for item in sorted(matches, key=lambda value: (value[0], -(value[1] - value[0]))):
        if any(item[0] < existing[1] and existing[0] < item[1] for existing in selected):
            continue
        selected.append(item)
    return sorted(selected)


def _local_date(value, timezone):
    if isinstance(value, dt.date) and not isinstance(value, dt.datetime):
        return value
    parsed = dt.datetime.fromisoformat(str(value).replace('Z', '+00:00'))
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=timezone)
    return parsed.astimezone(timezone).date()


def extract_absence_period(reason, attendance_marked_at, responded_at, timezone):
    """Return an inclusive (start, end) ISO range only when the text is explicit.

    Accepted forms include two unambiguous dates, an ``until <date>`` statement,
    and exact durations such as ``for 10 days`` or ``for 2 weeks``. Single-day
    reasons and ambiguous numeric dates are intentionally ignored.
    """
    text = (reason or '').strip()
    if not text:
        return None
    attendance = _local_date(attendance_marked_at, timezone)
    response = _local_date(responded_at, timezone)
    mentions = _mentions(text, response.year)
    dates = [(value, explicit) for _start, _end, value, explicit in mentions]
    if len(dates) >= 2:
        start, end = dates[0][0], dates[1][0]
        if end < start and not dates[1][1]:
            end = _date(end.year + 1, end.month, end.day)
    elif len(dates) == 1 and re.search(
            r'(?:\b(?:until|through|thru)\b|(?:直到|至))\s*$', text[:mentions[0][0]], re.I):
        start, end = attendance, dates[0][0]
        if end < start and not dates[0][1]:
            end = _date(end.year + 1, end.month, end.day)
    else:
        duration = re.search(r'\b(?:for|away\s+for|absent\s+for)\s+(\d{1,3})\s*(day|days|week|weeks)\b', text, re.I)
        if not duration:
            duration = re.search(r'(\d{1,3})\s*(天|周|星期)', text)
        if not duration:
            return None
        count = int(duration.group(1))
        unit = duration.group(2).lower()
        days = count * 7 if unit in ('week', 'weeks', '周', '星期') else count
        if days < 2:
            return None
        start, end = attendance, attendance + dt.timedelta(days=days - 1)
    if not start or not end or end <= start or (end - start).days > 366:
        return None
    return start.isoformat(), end.isoformat()
