"""Copy 2023-2025 IGCSE 0455 Paper 1 PDFs into the workspace and scan for population questions."""
import re
import shutil
import sys
from pathlib import Path

SRC = Path(r"C:\Users\oehle\Documents\past-papers\economics_0455_igcse_paper1")
DEST = Path(__file__).parent / "papers"
DEST.mkdir(parents=True, exist_ok=True)

SESSIONS = ("s23", "w23", "m24", "s24", "w24", "m25", "s25", "w25")
KEYWORDS = re.compile(
    r"birth rate|death rate|population|migration|immigrat|emigrat|life expectancy|ageing|aging|fertility",
    re.IGNORECASE,
)

sys.path.insert(0, str(Path(sys.executable).parent.parent.parent))
from pypdf import PdfReader  # noqa: E402

pdfs = sorted(p for p in SRC.rglob("*.pdf") if any(f"_{s}_" in p.name for s in SESSIONS))
print(f"found {len(pdfs)} pdfs")
for p in pdfs:
    target = DEST / p.name
    if not target.exists():
        shutil.copy2(p, target)

for qp in sorted(DEST.glob("*qp*.pdf")):
    try:
        reader = PdfReader(str(qp))
    except Exception as exc:  # noqa: BLE001
        print(f"!! cannot read {qp.name}: {exc}")
        continue
    for i, page in enumerate(reader.pages, start=1):
        text = page.extract_text() or ""
        if KEYWORDS.search(text):
            print(f"\n===== {qp.name} page {i} =====")
            print(text)
