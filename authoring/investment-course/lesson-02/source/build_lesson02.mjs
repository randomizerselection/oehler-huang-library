import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FileBlob, PresentationFile } from "@oai/artifact-tool";
import { imageSources, lesson, slides as slideMeta, templateFrameMap } from "./lesson-content.mjs";

const SOURCE_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(SOURCE_DIR, "..", "..");
const TMP_DIR = path.join(ROOT_DIR, "tmp", "lesson02-return-20260903");
const STARTER_PPTX = path.join(SOURCE_DIR, "base", "template-starter.pptx");
const CANDIDATE_PPTX = path.join(TMP_DIR, "Lesson 02 - Return on investment.candidate.pptx");
const PREVIEW_DIR = path.join(TMP_DIR, "final-preview");
const LAYOUT_DIR = path.join(TMP_DIR, "final-layout");
const ASSET_DIR = path.join(SOURCE_DIR, "assets");

const C = {
  navy: "#17232D",
  teal: "#2B5D7E",
  cyan: "#18B7B9",
  blue: "#4C8CF5",
  amber: "#D99100",
  coral: "#F06C5B",
  green: "#2E9F6B",
  white: "#FFFFFF",
};

const FONT = "Arial";
const ZH_FONT = "Microsoft YaHei";
const COURSE_PLAN = "C:\\Users\\oehle\\Documents\\oehler-huang-platform\\authoring\\investment-course\\planning\\2026-27 Semester 1 - Course Plan v6 - Detailed Lesson Structure.docx";
const DESIGN_REFERENCE = path.join(ROOT_DIR, "templates/investment-course-v6/reference.pptx");

function slidesFromPresentation(presentation) {
  if (Array.isArray(presentation.slides?.items)) return presentation.slides.items;
  return Array.from({ length: presentation.slides.count }, (_, index) => presentation.slides.getItem(index));
}

function slideAt(slides, number) {
  const slide = slides[number - 1];
  if (!slide) throw new Error("Missing output slide " + number);
  return slide;
}

function itemByName(items, name, occurrence = 0) {
  const matches = (items || []).filter((item) => item.name === name);
  const item = matches[occurrence];
  if (!item) throw new Error("Missing element named " + name + " occurrence " + occurrence);
  return item;
}

function shapeOn(slides, slideNumber, name, occurrence = 0) {
  return itemByName(slideAt(slides, slideNumber).shapes.items, name, occurrence);
}

function imageOn(slides, slideNumber, name, occurrence = 0) {
  return itemByName(slideAt(slides, slideNumber).images.items, name, occurrence);
}

function run(text, options = {}) {
  const textStyle = {};
  if (options.bold !== undefined) textStyle.bold = options.bold;
  if (options.color) textStyle.color = options.color;
  if (options.fontSize) textStyle.fontSize = String(options.fontSize) + "px";
  if (options.italic !== undefined) textStyle.italic = options.italic;
  if (options.typeface) textStyle.typeface = options.typeface;
  return Object.keys(textStyle).length ? { run: text, textStyle } : { run: text };
}

function paragraph(runs, options = {}) {
  return { runs: Array.isArray(runs) ? runs : [runs], bulletCharacter: "", ...options };
}

function bullet(runs, options = {}) {
  return paragraph(runs, {
    bulletCharacter: "•",
    marginLeft: 24,
    indent: -12,
    spaceAfter: 8,
    ...options,
  });
}

function setText(shape, paragraphs, style = {}) {
  shape.text.style = {
    typeface: FONT,
    color: C.navy,
    alignment: "left",
    verticalAlignment: "top",
    wrap: "square",
    autoFit: "none",
    ...style,
  };
  shape.text.set(paragraphs);
}

function setPlain(shape, text, style = {}) {
  shape.text = text;
  shape.text.style = {
    typeface: FONT,
    color: C.navy,
    wrap: "square",
    autoFit: "none",
    ...style,
  };
}

function setSection(shape, english, chinese = "") {
  const paragraphs = [paragraph([run(english, { bold: true, color: C.white, fontSize: 48 })])];
  if (chinese) {
    paragraphs.push(paragraph([run(chinese, { bold: true, color: C.white, fontSize: 28, typeface: ZH_FONT })]));
  }
  setText(shape, paragraphs, {
    fontSize: 48,
    bold: true,
    color: C.white,
    alignment: "center",
    verticalAlignment: "middle",
  });
}

async function replaceImage(image, source, fit = "cover") {
  const old = {
    frame: image.frame,
    crop: image.crop,
    geometry: image.geometry,
    borderRadius: image.borderRadius,
    rotation: image.rotation,
    flipHorizontal: image.flipHorizontal,
    flipVertical: image.flipVertical,
    lockAspectRatio: image.lockAspectRatio,
  };
  const filePath = path.join(ASSET_DIR, source.file);
  const bytes = await fs.readFile(filePath);
  image.replace({
    blob: new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.byteLength),
    contentType: "image/jpeg",
    alt: source.alt,
    fit,
  });
  image.frame = old.frame;
  image.crop = old.crop;
  image.fit = fit;
  image.geometry = old.geometry;
  image.borderRadius = old.borderRadius;
  image.rotation = old.rotation;
  image.flipHorizontal = old.flipHorizontal;
  image.flipVertical = old.flipVertical;
  image.lockAspectRatio = old.lockAspectRatio;
}

function imageCredit(source) {
  return "Pexels photograph by " + source.creator + ": " + source.page + " (Pexels License).";
}

function notesFor(slideNumber, teachingNote = "", extraSources = [], answerCue = "") {
  const semanticId = slideMeta[slideNumber - 1]?.id || "slide-" + slideNumber;
  const lines = ["Slide ID: " + semanticId];
  if (teachingNote) lines.push("Teaching note: " + teachingNote);
  if (answerCue) lines.push("Answer cue: " + answerCue);
  lines.push("", "[Sources]");
  lines.push("- Lesson scope, objectives, formula and checkpoint: " + COURSE_PLAN);
  lines.push("- Design and pacing reference: " + DESIGN_REFERENCE);
  for (const source of extraSources) lines.push("- " + source);
  lines.push("- Mock-data note: all named cases and CNY amounts are fictional classroom scenarios.");
  lines.push("[/Sources]");
  return lines.join("\n");
}

function addNotes(slide, text) {
  slide.speakerNotes.textFrame.setText(text);
  slide.speakerNotes.setVisible(true);
}

async function writeBlob(filePath, blob) {
  await fs.writeFile(filePath, new Uint8Array(await blob.arrayBuffer()));
}

async function writePlanningFiles() {
  await fs.mkdir(TMP_DIR, { recursive: true });
  await fs.writeFile(path.join(TMP_DIR, "template-frame-map.json"), JSON.stringify(templateFrameMap, null, 2) + "\n", "utf8");
  const imageLines = Object.values(imageSources).map((source) => "- " + source.file + ": " + source.creator + "; " + source.page + "; Pexels License.");
  await fs.writeFile(
    path.join(TMP_DIR, "source-notes.txt"),
    [
      "Primary content source",
      "- " + COURSE_PLAN,
      "",
      "Design reference",
      "- " + DESIGN_REFERENCE,
      "",
      "New original high-resolution photographs downloaded for Lesson 2",
      ...imageLines,
      "",
      "All people and asset values in lesson questions are mock classroom cases.",
      "No personalised investment advice, live prices or short-term trading instructions are included.",
      "",
    ].join("\n"),
    "utf8",
  );
  await fs.writeFile(
    path.join(TMP_DIR, "template-audit.txt"),
    [
      "Reference audit",
      "- 38-slide, 16:9 Lesson 1 v6 reference inspected in full.",
      "- Reusable patterns: photographic title, navy skyline dividers, white content slides, two-column comparison, MCQs, short answers and model answers.",
      "- Typography: Arial-family English with Microsoft YaHei for difficult Chinese terms; large navy headings and restrained teal/blue/amber/coral accents.",
      "- Output is built only by duplicating mapped reference slides and editing inherited objects.",
      "- Structural placeholders named in the validated frame map are filled; unused source patterns are omitted.",
      "- New photographs replace inherited images inside their original frames.",
      "",
    ].join("\n"),
    "utf8",
  );
  await fs.writeFile(
    path.join(TMP_DIR, "deviation-log.txt"),
    [
      "Intentional deviations from the retained v6 reference",
      "1. Four inherited image frames receive fresh, content-specific Pexels photographs for return calculation, fair comparison and evidence recording.",
      "2. Divider titles are white for reliable contrast on the navy skyline.",
      "3. All lesson copy, questions, formulae and notes are replaced to follow the current Lesson 2 scheme entry.",
      "4. A 39th slide reuses the inherited model-answer pattern so the individual exit judgement has a deliberate reveal.",
      "",
    ].join("\n"),
    "utf8",
  );
  console.log(path.join(TMP_DIR, "template-frame-map.json"));
}

function formatCny(value) {
  const sign = value < 0 ? "−" : "";
  return "CNY " + sign + Math.abs(value).toLocaleString("en-US");
}

async function build() {
  await fs.mkdir(PREVIEW_DIR, { recursive: true });
  await fs.mkdir(LAYOUT_DIR, { recursive: true });
  const presentation = await PresentationFile.importPptx(await FileBlob.load(STARTER_PPTX));
  const slides = slidesFromPresentation(presentation);
  if (slides.length !== slideMeta.length) {
    throw new Error("Expected " + slideMeta.length + " slides; found " + slides.length);
  }

  const title1 = shapeOn(slides, 1, "Title 3");
  title1.position = { left: 58, top: 214, width: 650, height: 280 };
  setText(
    title1,
    [
      paragraph([run("Measuring", { bold: true, color: C.white, fontSize: 70 })]),
      paragraph([run("investment return", { bold: true, color: C.cyan, fontSize: 63 })]),
    ],
    { fontSize: 70, bold: true, color: C.white, alignment: "left", verticalAlignment: "middle" },
  );
  await replaceImage(imageOn(slides, 1, "Picture 6"), imageSources.title);
  title1.bringToFront();
  addNotes(slideAt(slides, 1), notesFor(1, "Frame the lesson as measurement, not prediction.", [imageCredit(imageSources.title)]));

  setPlain(shapeOn(slides, 2, "Title 1"), "CNY 200 vs CNY 600—which performed better?", {
    fontSize: 40,
    bold: true,
    color: C.navy,
    alignment: "left",
    verticalAlignment: "middle",
  });
  await replaceImage(imageOn(slides, 2, "Picture 4"), imageSources.comparison);
  addNotes(
    slideAt(slides, 2),
    notesFor(
      2,
      "Students choose A, B or insufficient information and give one reason before any formula is taught. Chinese prompt: 投资A赚200元，投资B赚600元。哪个表现更好？",
      [imageCredit(imageSources.comparison)],
      lesson.opening.answer,
    ),
  );

  setPlain(shapeOn(slides, 3, "Title 1"), "Today", {
    fontSize: 50,
    color: C.white,
    alignment: "center",
    verticalAlignment: "middle",
  });
  setText(
    shapeOn(slides, 3, "Content Placeholder 2"),
    lesson.objectives.map((objective, index) =>
      paragraph(
        [
          run(String(index + 1) + ".  " + objective[0], { bold: true, color: C.white, fontSize: 29 }),
          run("  " + objective[1], { color: C.white, fontSize: 22, typeface: ZH_FONT }),
        ],
        { spaceAfter: index === lesson.objectives.length - 1 ? 0 : 22 },
      ),
    ),
    { fontSize: 29, color: C.white, alignment: "left", verticalAlignment: "top" },
  );
  addNotes(slideAt(slides, 3), notesFor(3, "Read the three objectives as the lesson roadmap."));

  setSection(shapeOn(slides, 4, "Title 1"), "1. Total return", "总回报");
  addNotes(slideAt(slides, 4), notesFor(4));

  setPlain(shapeOn(slides, 5, "Title 1"), "Retrieve: where can return come from?", {
    fontSize: 42,
    bold: true,
    color: C.teal,
    alignment: "left",
    verticalAlignment: "middle",
  });
  setText(
    shapeOn(slides, 5, "Content Placeholder 2"),
    [
      paragraph([run("1.", { bold: true, color: C.blue }), run(" Name the two sources of total return.")], { spaceAfter: 20 }),
      paragraph([run("2.", { bold: true, color: C.blue }), run(" Can total return be negative? Give one example.")]),
    ],
    { fontSize: 31, color: C.navy, verticalAlignment: "middle" },
  );
  addNotes(
    slideAt(slides, 5),
    notesFor(5, "Give 30 seconds of silent recall, then take two examples.", [], "Capital gain or loss plus income; yes, a capital loss can exceed income."),
  );

  setPlain(shapeOn(slides, 6, "Title 1"), "A strong retrieval answer", {
    fontSize: 45,
    bold: true,
    color: C.navy,
    alignment: "left",
    verticalAlignment: "middle",
  });
  setText(
    shapeOn(slides, 6, "Content Placeholder 2"),
    [
      paragraph(
        [
          run("Total return combines "),
          run("capital gain or loss", { bold: true, color: C.teal }),
          run(" with "),
          run("income", { bold: true, color: C.amber }),
          run("."),
        ],
        { spaceAfter: 18 },
      ),
      paragraph([
        run("It is negative when a "),
        run("capital loss", { bold: true, color: C.coral }),
        run(" is larger than the income received."),
      ]),
    ],
    { fontSize: 32, color: C.navy, verticalAlignment: "middle" },
  );
  addNotes(slideAt(slides, 6), notesFor(6, "Reveal after all students have attempted slide 5."));

  setPlain(shapeOn(slides, 7, "Title 3"), "Total return (总回报)", {
    fontSize: 45,
    color: C.teal,
    alignment: "left",
    verticalAlignment: "middle",
    typeface: ZH_FONT,
  });
  setText(
    shapeOn(slides, 7, "Content Placeholder 2"),
    [
      paragraph(
        [run("Total return is the gain or loss over a stated period from the change in value plus income received.", { bold: true })],
        { spaceAfter: 8 },
      ),
      paragraph(
        [run("总回报是在规定期间内，价值变化与收入共同带来的收益或损失。", { color: C.teal, fontSize: 21, typeface: ZH_FONT })],
        { spaceAfter: 14 },
      ),
      bullet([run("Share:", { bold: true, color: C.blue }), run(" price rises CNY 80 and pays a CNY 20 dividend → CNY 100 return.")]),
      bullet([run("Bond:", { bold: true, color: C.blue }), run(" value is unchanged and CNY 50 interest is paid → CNY 50 return.")]),
      bullet([run("Property fund:", { bold: true, color: C.blue }), run(" value falls CNY 120 and pays CNY 40 income → CNY 80 loss.", { color: C.coral })]),
    ],
    { fontSize: 25, color: C.navy },
  );
  addNotes(slideAt(slides, 7), notesFor(7, "Point to value change and income in each example."));

  setPlain(shapeOn(slides, 8, "Title 1"), "Measurement turns an outcome into evidence.", {
    fontSize: 39,
    bold: true,
    color: C.navy,
    alignment: "left",
    verticalAlignment: "middle",
  });
  await replaceImage(imageOn(slides, 8, "Picture 4"), imageSources.formula);
  addNotes(
    slideAt(slides, 8),
    notesFor(8, "Use the calculator and report as a bridge from the idea of return to a reproducible calculation.", [imageCredit(imageSources.formula)]),
  );

  setPlain(shapeOn(slides, 9, "Title 1"), "Build the return formula", {
    fontSize: 38,
    bold: true,
    color: C.navy,
    alignment: "left",
    verticalAlignment: "middle",
  });
  setText(
    shapeOn(slides, 9, "Content Placeholder 2"),
    [
      paragraph([run("Capital gain / loss", { bold: true, color: C.teal }), run(" = ending value − starting value")], { spaceAfter: 18 }),
      paragraph([run("Total return", { bold: true, color: C.teal }), run(" = ending value − starting value + income")], { spaceAfter: 18 }),
      paragraph([run("New deposits or withdrawals are cash flows—not investment return.", { bold: true, color: C.coral })], { spaceAfter: 16 }),
      paragraph([run("Use values from the same stated period.", { bold: true, color: C.blue })]),
    ],
    { fontSize: 29, color: C.navy },
  );
  addNotes(slideAt(slides, 9), notesFor(9, "Students copy both formulas and underline the plus-income term."));

  const worked = lesson.examples.worked;
  setPlain(shapeOn(slides, 10, "Title 3"), "Worked example: separate the two parts", {
    fontSize: 38,
    color: C.teal,
    alignment: "left",
    verticalAlignment: "middle",
  });
  setText(
    shapeOn(slides, 10, "Content Placeholder 2"),
    [
      paragraph([run("Start " + formatCny(worked.start) + "  →  End " + formatCny(worked.end) + "  +  Income " + formatCny(worked.income), { bold: true })], { spaceAfter: 18 }),
      paragraph([run("1. Capital gain:", { bold: true, color: C.blue }), run(" " + formatCny(worked.end) + " − " + formatCny(worked.start) + " = " + formatCny(worked.end - worked.start))], { spaceAfter: 16 }),
      paragraph([run("2. Total return:", { bold: true, color: C.blue }), run(" " + formatCny(worked.end - worked.start) + " + " + formatCny(worked.income) + " = " + formatCny(worked.amount))], { spaceAfter: 18 }),
      paragraph([run("Interpretation: the investment produced a " + formatCny(worked.amount) + " gain over the stated period.", { bold: true, color: C.teal })]),
    ],
    { fontSize: 27, color: C.navy, verticalAlignment: "middle" },
  );
  addNotes(slideAt(slides, 10), notesFor(10, "Model formula, substitution, answer and interpretation in order."));

  const tryOne = lesson.examples.gainPractice;
  setPlain(shapeOn(slides, 11, "Title 1"), "Try first: calculate the return amount", {
    fontSize: 36,
    bold: true,
    color: C.navy,
    alignment: "left",
    verticalAlignment: "middle",
  });
  setText(
    shapeOn(slides, 11, "Content Placeholder 2"),
    [
      paragraph([run("Start " + formatCny(tryOne.start) + "  →  End " + formatCny(tryOne.end) + "  +  Income " + formatCny(tryOne.income), { bold: true })], { spaceAfter: 22 }),
      paragraph([run("Write:", { bold: true, color: C.teal }), run(" formula → substitution → answer → one-sentence interpretation.")], { spaceAfter: 20 }),
      paragraph([run("Do not calculate a percentage yet.", { bold: true, color: C.coral })]),
    ],
    { fontSize: 30, color: C.navy, verticalAlignment: "middle" },
  );
  addNotes(slideAt(slides, 11), notesFor(11, "Give 60 seconds before slide 12.", [], formatCny(tryOne.amount)));

  setPlain(shapeOn(slides, 12, "Title 1"), "A strong answer", {
    fontSize: 46,
    bold: true,
    color: C.navy,
    alignment: "left",
    verticalAlignment: "middle",
  });
  setText(
    shapeOn(slides, 12, "Content Placeholder 2"),
    [
      paragraph([run("Total return", { bold: true, color: C.teal }), run(" = " + formatCny(tryOne.end) + " − " + formatCny(tryOne.start) + " + " + formatCny(tryOne.income))], { spaceAfter: 16 }),
      paragraph([run("= " + formatCny(tryOne.amount), { bold: true, color: C.blue, fontSize: 40 })], { spaceAfter: 16 }),
      paragraph([run("The investment produced a " + formatCny(tryOne.amount) + " gain over the stated period.", { bold: true, color: C.teal })]),
    ],
    { fontSize: 31, color: C.navy, verticalAlignment: "middle" },
  );
  addNotes(slideAt(slides, 12), notesFor(12, "Reveal after students compare their substitution."));

  setSection(shapeOn(slides, 13, "Title 1"), "2. Calculate return", "计算回报");
  addNotes(slideAt(slides, 13), notesFor(13));

  setPlain(shapeOn(slides, 14, "Title 1"), "Use the same four-step method every time", {
    fontSize: 35,
    bold: true,
    color: C.navy,
    alignment: "left",
    verticalAlignment: "middle",
  });
  setText(
    shapeOn(slides, 14, "Content Placeholder 2"),
    [
      paragraph([run("1.", { bold: true, color: C.blue }), run(" Write the total-return formula.")], { spaceAfter: 14 }),
      paragraph([run("2.", { bold: true, color: C.blue }), run(" Substitute ending value, starting value and income.")], { spaceAfter: 14 }),
      paragraph([run("3.", { bold: true, color: C.blue }), run(" Divide total return by starting value and multiply by 100.")], { spaceAfter: 14 }),
      paragraph([run("4.", { bold: true, color: C.blue }), run(" Interpret the sign and size over the stated period.")], { spaceAfter: 20 }),
      paragraph([run("Return % = total return ÷ starting value × 100", { bold: true, color: C.teal, fontSize: 32 })]),
    ],
    { fontSize: 28, color: C.navy },
  );
  addNotes(slideAt(slides, 14), notesFor(14, "Require the four method headings in every worked comparison."));

  setPlain(shapeOn(slides, 15, "Title 1"), "Practice 1: income plus a capital gain", {
    fontSize: 36,
    bold: true,
    color: C.navy,
    alignment: "left",
    verticalAlignment: "middle",
  });
  setText(
    shapeOn(slides, 15, "Content Placeholder 2"),
    [
      paragraph([run("Start " + formatCny(tryOne.start) + "  →  End " + formatCny(tryOne.end) + "  +  Income " + formatCny(tryOne.income), { bold: true })], { spaceAfter: 20 }),
      paragraph([run("Calculate:", { bold: true, color: C.teal }), run(" capital gain, total return and percentage return.")], { spaceAfter: 18 }),
      paragraph([run("Then interpret the result in words.", { bold: true, color: C.blue })]),
    ],
    { fontSize: 30, color: C.navy, verticalAlignment: "middle" },
  );
  addNotes(slideAt(slides, 15), notesFor(15, "Students work independently for 75 seconds.", [], formatCny(tryOne.amount) + " and " + tryOne.percent + "%."));

  setPlain(shapeOn(slides, 16, "Title 1"), "A strong answer", {
    fontSize: 46,
    bold: true,
    color: C.navy,
    alignment: "left",
    verticalAlignment: "middle",
  });
  setText(
    shapeOn(slides, 16, "Content Placeholder 2"),
    [
      paragraph([run("Capital gain: " + formatCny(tryOne.end) + " − " + formatCny(tryOne.start) + " = " + formatCny(tryOne.end - tryOne.start), { bold: true })], { spaceAfter: 14 }),
      paragraph([run("Total return: " + formatCny(tryOne.end - tryOne.start) + " + " + formatCny(tryOne.income) + " = " + formatCny(tryOne.amount), { bold: true, color: C.teal })], { spaceAfter: 14 }),
      paragraph([run("Return %: " + formatCny(tryOne.amount) + " ÷ " + formatCny(tryOne.start) + " × 100 = " + tryOne.percent + "%", { bold: true, color: C.blue })], { spaceAfter: 16 }),
      paragraph([run("Interpretation: a " + tryOne.percent + "% gain over the stated period.", { bold: true, color: C.teal })]),
    ],
    { fontSize: 27, color: C.navy, verticalAlignment: "middle" },
  );
  addNotes(slideAt(slides, 16), notesFor(16, "Trace the four-step method visibly."));

  const loss = lesson.examples.lossPractice;
  setPlain(shapeOn(slides, 17, "Title 1"), "Practice 2: income does not prevent a loss", {
    fontSize: 35,
    bold: true,
    color: C.navy,
    alignment: "left",
    verticalAlignment: "middle",
  });
  setText(
    shapeOn(slides, 17, "Content Placeholder 2"),
    [
      paragraph([run("Start " + formatCny(loss.start) + "  →  End " + formatCny(loss.end) + "  +  Income " + formatCny(loss.income), { bold: true })], { spaceAfter: 20 }),
      paragraph([run("Calculate:", { bold: true, color: C.teal }), run(" capital gain/loss, total return and percentage return.")], { spaceAfter: 18 }),
      paragraph([run("Keep the negative sign.", { bold: true, color: C.coral })]),
    ],
    { fontSize: 30, color: C.navy, verticalAlignment: "middle" },
  );
  addNotes(slideAt(slides, 17), notesFor(17, "Check that students subtract before adding income.", [], formatCny(loss.amount) + " and " + loss.percent + "%."));

  setPlain(shapeOn(slides, 18, "Title 1"), "A strong answer", {
    fontSize: 46,
    bold: true,
    color: C.navy,
    alignment: "left",
    verticalAlignment: "middle",
  });
  setText(
    shapeOn(slides, 18, "Content Placeholder 2"),
    [
      paragraph([run("Capital loss: " + formatCny(loss.end) + " − " + formatCny(loss.start) + " = " + formatCny(loss.end - loss.start), { bold: true, color: C.coral })], { spaceAfter: 14 }),
      paragraph([run("Total return: " + formatCny(loss.end - loss.start) + " + " + formatCny(loss.income) + " = " + formatCny(loss.amount), { bold: true, color: C.coral })], { spaceAfter: 14 }),
      paragraph([run("Return %: " + formatCny(loss.amount) + " ÷ " + formatCny(loss.start) + " × 100 = " + loss.percent + "%", { bold: true, color: C.blue })], { spaceAfter: 16 }),
      paragraph([run("Interpretation: a " + Math.abs(loss.percent) + "% loss over the stated period.", { bold: true, color: C.coral })]),
    ],
    { fontSize: 27, color: C.navy, verticalAlignment: "middle" },
  );
  addNotes(slideAt(slides, 18), notesFor(18, "Emphasise that income can reduce a loss without eliminating it."));

  setPlain(shapeOn(slides, 19, "Title 1"), "Classify each item before calculating", {
    fontSize: 35,
    bold: true,
    color: C.navy,
    alignment: "left",
    verticalAlignment: "middle",
  });
  setText(
    shapeOn(slides, 19, "Content Placeholder 2"),
    [
      paragraph([run("Choose:", { bold: true, color: C.teal }), run(" income • capital gain/loss • new cash flow")], { spaceAfter: 16 }),
      paragraph([run("1.", { bold: true, color: C.blue }), run(" A CNY 40 dividend is paid.")], { spaceAfter: 11 }),
      paragraph([run("2.", { bold: true, color: C.blue }), run(" Market value rises from CNY 1,000 to CNY 1,080.")], { spaceAfter: 11 }),
      paragraph([run("3.", { bold: true, color: C.blue }), run(" The investor adds CNY 300.")], { spaceAfter: 11 }),
      paragraph([run("4.", { bold: true, color: C.blue }), run(" Market value falls by CNY 90.")], { spaceAfter: 11 }),
      paragraph([run("5.", { bold: true, color: C.blue }), run(" CNY 25 interest is received.")]),
    ],
    { fontSize: 26, color: C.navy },
  );
  addNotes(slideAt(slides, 19), notesFor(19, "Students sort first; reveal on slide 20.", [], "1 income; 2 capital gain; 3 new cash flow; 4 capital loss; 5 income."));

  setPlain(shapeOn(slides, 20, "Title 1"), "A strong classification", {
    fontSize: 43,
    bold: true,
    color: C.navy,
    alignment: "left",
    verticalAlignment: "middle",
  });
  setText(
    shapeOn(slides, 20, "Content Placeholder 2"),
    [
      paragraph([run("1. Income", { bold: true, color: C.amber }), run(" — dividend received.")], { spaceAfter: 12 }),
      paragraph([run("2. Capital gain", { bold: true, color: C.teal }), run(" — value rises CNY 80.")], { spaceAfter: 12 }),
      paragraph([run("3. New cash flow", { bold: true, color: C.coral }), run(" — added money is not return.")], { spaceAfter: 12 }),
      paragraph([run("4. Capital loss", { bold: true, color: C.coral }), run(" — value falls CNY 90.")], { spaceAfter: 12 }),
      paragraph([run("5. Income", { bold: true, color: C.amber }), run(" — interest received.")]),
    ],
    { fontSize: 28, color: C.navy, verticalAlignment: "middle" },
  );
  addNotes(slideAt(slides, 20), notesFor(20, "Ask which misclassification would overstate return."));

  const hinge = lesson.examples.hinge;
  setPlain(shapeOn(slides, 21, "Title 1"), "Hinge check: decide before the reveal", {
    fontSize: 35,
    bold: true,
    color: C.navy,
    alignment: "left",
    verticalAlignment: "middle",
  });
  setText(
    shapeOn(slides, 21, "Content Placeholder 2"),
    [
      paragraph([run("CNY " + hinge.start.toLocaleString("en-US") + " becomes CNY " + hinge.end.toLocaleString("en-US") + " and pays CNY " + hinge.income + ". What is the percentage return?", { bold: true })], { spaceAfter: 20 }),
      paragraph([run("A. 10%     B. 12%     C. 20%     D. 120%", { bold: true, color: C.blue, fontSize: 32 })], { spaceAfter: 18 }),
      paragraph([run("Show the substitution—not only the letter.", { bold: true, color: C.teal })]),
    ],
    { fontSize: 29, color: C.navy, verticalAlignment: "middle" },
  );
  addNotes(slideAt(slides, 21), notesFor(21, "Use responses to decide whether to reteach the plus-income term.", [], "B, 12%."));

  setPlain(shapeOn(slides, 22, "Title 1"), "Why the answer is 12%", {
    fontSize: 44,
    bold: true,
    color: C.navy,
    alignment: "left",
    verticalAlignment: "middle",
  });
  setText(
    shapeOn(slides, 22, "Content Placeholder 2"),
    [
      paragraph([run("Total return = " + formatCny(hinge.end) + " − " + formatCny(hinge.start) + " + " + formatCny(hinge.income) + " = " + formatCny(hinge.amount), { bold: true, color: C.teal })], { spaceAfter: 18 }),
      paragraph([run("Return % = " + formatCny(hinge.amount) + " ÷ " + formatCny(hinge.start) + " × 100 = " + hinge.percent + "%", { bold: true, color: C.blue })], { spaceAfter: 18 }),
      paragraph([run("The CNY 20 income must be included.", { bold: true, color: C.coral })]),
    ],
    { fontSize: 30, color: C.navy, verticalAlignment: "middle" },
  );
  addNotes(slideAt(slides, 22), notesFor(22, "If many students chose 10%, repeat one income example."));

  setSection(shapeOn(slides, 23, "Title 3"), "3. Compare fairly", "公平比较");
  addNotes(slideAt(slides, 23), notesFor(23));

  setPlain(shapeOn(slides, 24, "Title 1"), "Amount and percentage answer different questions", {
    fontSize: 35,
    bold: true,
    color: C.navy,
    alignment: "center",
    verticalAlignment: "middle",
  });
  setText(
    shapeOn(slides, 24, "Content Placeholder 3", 0),
    [
      paragraph([run("Return amount", { bold: true, color: C.teal, fontSize: 30 }), run("  回报额", { color: C.teal, fontSize: 21, typeface: ZH_FONT })], { spaceAfter: 16 }),
      bullet([run("Absolute CNY gain or loss")]),
      bullet([run("Useful for the money result")]),
      bullet([run("Affected by starting size", { bold: true, color: C.coral })]),
    ],
    { fontSize: 27, color: C.navy },
  );
  setText(
    shapeOn(slides, 24, "Content Placeholder 3", 1),
    [
      paragraph([run("Percentage return", { bold: true, color: C.teal, fontSize: 30 }), run("  回报率", { color: C.teal, fontSize: 21, typeface: ZH_FONT })], { spaceAfter: 16 }),
      bullet([run("Return relative to starting value")]),
      bullet([run("Supports fair comparison")]),
      bullet([run("Match the same period", { bold: true, color: C.blue })]),
    ],
    { fontSize: 27, color: C.navy },
  );
  addNotes(slideAt(slides, 24), notesFor(24, "Ask which metric answers who earned more money and which compares performance relative to size."));

  const fairA = lesson.examples.fairA;
  const fairB = lesson.examples.fairB;
  setPlain(shapeOn(slides, 25, "Title 1"), "Now reveal the missing evidence", {
    fontSize: 37,
    bold: true,
    color: C.navy,
    alignment: "left",
    verticalAlignment: "middle",
  });
  setText(
    shapeOn(slides, 25, "Content Placeholder 2"),
    [
      paragraph([run("Investment A", { bold: true, color: C.teal }), run(" starts at " + formatCny(fairA.start) + " and earns " + formatCny(fairA.amount) + ".")], { spaceAfter: 18 }),
      paragraph([run("Investment B", { bold: true, color: C.amber }), run(" starts at " + formatCny(fairB.start) + " and earns " + formatCny(fairB.amount) + ".")], { spaceAfter: 22 }),
      paragraph([run("Both results cover the same period.", { bold: true, color: C.blue })], { spaceAfter: 18 }),
      paragraph([run("Which performed better? Show both percentages.", { bold: true, fontSize: 31 })]),
    ],
    { fontSize: 29, color: C.navy, verticalAlignment: "middle" },
  );
  addNotes(slideAt(slides, 25), notesFor(25, "Return to the opening vote and allow students to revise.", [], "A: 10%; B: 6%; A performed better in percentage terms, while B earned more CNY."));

  setPlain(shapeOn(slides, 26, "Title 1"), "A fair comparison changes the judgement", {
    fontSize: 41,
    bold: true,
    color: C.navy,
    alignment: "left",
    verticalAlignment: "middle",
  });
  setText(
    shapeOn(slides, 26, "Content Placeholder 2"),
    [
      paragraph([run("A: " + formatCny(fairA.amount) + " ÷ " + formatCny(fairA.start) + " × 100 = " + fairA.percent + "%", { bold: true, color: C.teal })], { spaceAfter: 16 }),
      paragraph([run("B: " + formatCny(fairB.amount) + " ÷ " + formatCny(fairB.start) + " × 100 = " + fairB.percent + "%", { bold: true, color: C.amber })], { spaceAfter: 20 }),
      paragraph([run("A performed better relative to its starting amount.", { bold: true, color: C.teal })], { spaceAfter: 12 }),
      paragraph([run("B produced the larger CNY return amount.", { bold: true, color: C.amber })]),
    ],
    { fontSize: 30, color: C.navy, verticalAlignment: "middle" },
  );
  addNotes(slideAt(slides, 26), notesFor(26, "Accept both money and percentage statements only when the metric is named."));

  const pairedC = lesson.examples.pairedC;
  const pairedD = lesson.examples.pairedD;
  setPlain(shapeOn(slides, 27, "Title 1"), "Partner check: compare C and D fairly", {
    fontSize: 36,
    bold: true,
    color: C.navy,
    alignment: "left",
    verticalAlignment: "middle",
  });
  setText(
    shapeOn(slides, 27, "Content Placeholder 2"),
    [
      paragraph([run("C:", { bold: true, color: C.teal }), run(" start " + formatCny(pairedC.start) + ", end " + formatCny(pairedC.end) + ", income " + formatCny(pairedC.income) + ".")], { spaceAfter: 14 }),
      paragraph([run("D:", { bold: true, color: C.amber }), run(" start " + formatCny(pairedD.start) + ", end " + formatCny(pairedD.end) + ", income " + formatCny(pairedD.income) + ".")], { spaceAfter: 18 }),
      paragraph([run("Calculate both return amounts and both percentages.", { bold: true })], { spaceAfter: 14 }),
      paragraph([run("Write one sentence that names the fair metric.", { bold: true, color: C.blue })]),
    ],
    { fontSize: 27, color: C.navy, verticalAlignment: "middle" },
  );
  addNotes(slideAt(slides, 27), notesFor(27, "Partners must agree on the conclusion and the evidence.", [], "C: CNY 400, 10%; D: CNY 560, 7%; C performed better in percentage terms."));

  setPlain(shapeOn(slides, 28, "Title 1"), "A strong comparison", {
    fontSize: 45,
    bold: true,
    color: C.navy,
    alignment: "left",
    verticalAlignment: "middle",
  });
  setText(
    shapeOn(slides, 28, "Content Placeholder 2"),
    [
      paragraph([run("C: " + formatCny(pairedC.amount) + " return; " + pairedC.percent + "%", { bold: true, color: C.teal })], { spaceAfter: 16 }),
      paragraph([run("D: " + formatCny(pairedD.amount) + " return; " + pairedD.percent + "%", { bold: true, color: C.amber })], { spaceAfter: 20 }),
      paragraph([
        run("C performed better", { bold: true, color: C.teal }),
        run(" because " + pairedC.percent + "% is higher than " + pairedD.percent + "% over the same period. "),
        run("D earned more CNY", { bold: true, color: C.amber }),
        run(" because its starting amount was larger."),
      ]),
    ],
    { fontSize: 30, color: C.navy, verticalAlignment: "middle" },
  );
  addNotes(slideAt(slides, 28), notesFor(28, "Underline the named metric and matched period."));

  setPlain(shapeOn(slides, 29, "Title 1"), "Stock Market Game: set up a return evidence record", {
    fontSize: 31,
    bold: true,
    color: C.navy,
    alignment: "left",
    verticalAlignment: "middle",
  });
  setText(
    shapeOn(slides, 29, "Content Placeholder 2"),
    [
      paragraph([run("Team record", { bold: true, color: C.teal })], { spaceAfter: 8 }),
      bullet([run("Record the teacher-assigned starting portfolio value and date.")]),
      bullet([run("Choose a later checkpoint date; keep the period identical for every team.")]),
      bullet([run("At that checkpoint, record ending value and any income shown.")]),
      bullet([run("Calculate return amount and percentage return.")]),
      paragraph([run("Individual output:", { bold: true, color: C.blue }), run(" complete today's mock calculation and write one interpretation.")], { spaceAfter: 10 }),
      paragraph([run("No order or security choice is required today.", { bold: true, color: C.coral })]),
    ],
    { fontSize: 22, color: C.navy },
  );
  await replaceImage(imageOn(slides, 29, "Picture 6"), imageSources.evidence);
  addNotes(
    slideAt(slides, 29),
    notesFor(29, "The evidence action establishes a consistent return record; it does not encourage short-term trading.", [imageCredit(imageSources.evidence)]),
  );

  setSection(shapeOn(slides, 30, "Title 3"), "4. Check understanding", "检查理解");
  addNotes(slideAt(slides, 30), notesFor(30));

  const mcqs = [
    {
      slide: 31,
      label: "MCQ 1",
      question: "CNY 1,000 becomes CNY 1,100 and pays CNY 20. What is the return percentage?",
      zh: "回报率是多少？",
      choices: ["10%", "12%", "20%", "120%"],
      answer: "B — 12%.",
    },
    {
      slide: 32,
      label: "MCQ 2",
      question: "CNY 4,000 becomes CNY 3,600 and pays CNY 200 income. What is total return?",
      zh: "总回报是多少？",
      choices: ["CNY 600 gain", "CNY 400 loss", "CNY 200 loss", "CNY 200 gain"],
      answer: "C — a CNY 200 loss.",
    },
    {
      slide: 33,
      label: "MCQ 3",
      question: "Over the same period, A earns CNY 100 on CNY 1,000. B earns CNY 300 on CNY 6,000. Which performed better?",
      zh: "哪个表现更好？",
      choices: ["A, because 10% > 5%", "B, because CNY 300 > CNY 100", "They performed equally", "They cannot be compared because starting values differ"],
      answer: "A — 10% is higher than 5% over the same period.",
    },
    {
      slide: 34,
      label: "MCQ 4",
      question: "Which item is not investment return in the simple formula?",
      zh: "哪一项不是投资回报？",
      choices: ["A CNY 40 dividend", "A CNY 80 capital gain", "A new CNY 500 deposit", "A CNY 30 interest payment"],
      answer: "C — a new deposit is a cash flow.",
    },
    {
      slide: 35,
      label: "MCQ 5",
      question: "What does a −4% return mean?",
      zh: "−4%的回报表示什么？",
      choices: ["A loss equal to 4% of starting value over the period", "A guaranteed 4% loss next period", "Ending value is always zero", "Income was exactly 4%"],
      answer: "A — a loss relative to starting value over the stated period.",
    },
  ];

  for (const item of mcqs) {
    setPlain(shapeOn(slides, item.slide, "Title 1"), item.label, {
      fontSize: 36,
      bold: true,
      color: C.blue,
      alignment: "left",
      verticalAlignment: "middle",
    });
    setText(
      shapeOn(slides, item.slide, "Content Placeholder 2"),
      [
        paragraph(
          [
            run(item.question, { bold: true, fontSize: 28 }),
            run("  " + item.zh, { bold: true, fontSize: 19, typeface: ZH_FONT }),
          ],
          { spaceAfter: 18 },
        ),
        ...item.choices.map((choice, index) =>
          paragraph(
            [run(String.fromCharCode(65 + index) + ".", { bold: true, color: C.blue }), run(" " + choice)],
            { spaceAfter: index === item.choices.length - 1 ? 0 : 13 },
          ),
        ),
      ],
      { fontSize: 25, color: C.navy },
    );
    addNotes(slideAt(slides, item.slide), notesFor(item.slide, "Take a vote, then ask one student to show the decisive evidence.", [], item.answer));
  }

  const shortAnswer = lesson.examples.shortAnswer;
  setPlain(shapeOn(slides, 36, "Title 1"), "Short answer 1: calculate and interpret", {
    fontSize: 35,
    bold: true,
    color: C.navy,
    alignment: "left",
    verticalAlignment: "middle",
  });
  setText(
    shapeOn(slides, 36, "Content Placeholder 2"),
    [
      paragraph([run("Mock investment: start " + formatCny(shortAnswer.start) + ", end " + formatCny(shortAnswer.end) + ", income " + formatCny(shortAnswer.income) + ".", { bold: true })], { spaceAfter: 20 }),
      paragraph([run("Calculate:", { bold: true, color: C.teal }), run(" total return and percentage return.")], { spaceAfter: 16 }),
      paragraph([run("Show:", { bold: true, color: C.blue }), run(" formula → substitution → answer → interpretation.")], { spaceAfter: 16 }),
      paragraph([run("Term bank:", { bold: true }), run(" total return (总回报) • starting value (期初价值) • percentage return (回报率)", { typeface: ZH_FONT })]),
    ],
    { fontSize: 26, color: C.navy, verticalAlignment: "middle" },
  );
  addNotes(slideAt(slides, 36), notesFor(36, "Give 90 seconds of individual writing.", [], formatCny(shortAnswer.amount) + " and " + shortAnswer.percent + "%."));

  setPlain(shapeOn(slides, 37, "Title 1"), "A strong answer", {
    fontSize: 46,
    bold: true,
    color: C.navy,
    alignment: "left",
    verticalAlignment: "middle",
  });
  setText(
    shapeOn(slides, 37, "Content Placeholder 2"),
    [
      paragraph([run("Total return = " + formatCny(shortAnswer.end) + " − " + formatCny(shortAnswer.start) + " + " + formatCny(shortAnswer.income) + " = " + formatCny(shortAnswer.amount), { bold: true, color: C.teal })], { spaceAfter: 16 }),
      paragraph([run("Return % = " + formatCny(shortAnswer.amount) + " ÷ " + formatCny(shortAnswer.start) + " × 100 = " + shortAnswer.percent + "%", { bold: true, color: C.blue })], { spaceAfter: 18 }),
      paragraph([run("The investment produced a " + shortAnswer.percent + "% gain over the stated period.", { bold: true, color: C.teal })]),
    ],
    { fontSize: 30, color: C.navy, verticalAlignment: "middle" },
  );
  addNotes(slideAt(slides, 37), notesFor(37, "Reveal after students exchange and check the four required parts."));

  setPlain(shapeOn(slides, 38, "Title 1"), "Individual exit: resolve the opening dilemma", {
    fontSize: 35,
    bold: true,
    color: C.navy,
    alignment: "left",
    verticalAlignment: "middle",
  });
  setText(
    shapeOn(slides, 38, "Content Placeholder 2"),
    [
      paragraph([run("A earns " + formatCny(fairA.amount) + " on " + formatCny(fairA.start) + ". B earns " + formatCny(fairB.amount) + " on " + formatCny(fairB.start) + ". Same period.", { bold: true })], { spaceAfter: 18 }),
      paragraph([run("Write:", { bold: true, color: C.teal }), run(" both percentages + which performed better + one precise reason.")], { spaceAfter: 16 }),
      paragraph([run("Also state which investment earned the larger CNY amount.", { bold: true, color: C.amber })], { spaceAfter: 16 }),
      paragraph([run("Use:", { bold: true, color: C.blue }), run(" return amount (回报额) • percentage return (回报率)", { typeface: ZH_FONT })]),
    ],
    { fontSize: 27, color: C.navy, verticalAlignment: "middle" },
  );
  addNotes(slideAt(slides, 38), notesFor(38, "Collect every student's answer before showing slide 39.", [], "A: 10%; B: 6%; A performed better relative to starting amount; B earned more CNY."));

  setPlain(shapeOn(slides, 39, "Title 1"), "A strong final judgement", {
    fontSize: 44,
    bold: true,
    color: C.navy,
    alignment: "left",
    verticalAlignment: "middle",
  });
  setText(
    shapeOn(slides, 39, "Content Placeholder 2"),
    [
      paragraph(
        [
          run("A returned " + fairA.percent + "%", { bold: true, color: C.teal }),
          run(", while B returned " + fairB.percent + "% over the same period. "),
          run("A performed better", { bold: true, color: C.teal }),
          run(" because its return was larger relative to its starting value. "),
          run("B still earned the larger CNY amount (" + formatCny(fairB.amount) + ").", { bold: true, color: C.amber }),
        ],
        { spaceAfter: 18 },
      ),
      paragraph([run("Fair comparison requires the starting amount, return and matched period.", { bold: true, color: C.blue })]),
    ],
    { fontSize: 30, color: C.navy, verticalAlignment: "middle" },
  );
  addNotes(slideAt(slides, 39), notesFor(39, "Close by comparing this evidence-based judgement with the opening vote."));

  const snapshot = await presentation.inspect({
    kind: "slide,textbox,shape,image,notes,layout",
    maxChars: 300000,
  });
  await fs.writeFile(path.join(TMP_DIR, "final-inspect.ndjson"), snapshot.ndjson || "", "utf8");

  for (let index = 0; index < slides.length; index += 1) {
    const number = String(index + 1).padStart(2, "0");
    const png = await presentation.export({ slide: slides[index], format: "png", scale: 1 });
    await writeBlob(path.join(PREVIEW_DIR, "slide-" + number + ".png"), png);
    const layout = await slides[index].export({ format: "layout" });
    await fs.writeFile(path.join(LAYOUT_DIR, "slide-" + number + ".layout.json"), await layout.text(), "utf8");
  }

  const montage = await presentation.export({ format: "webp", montage: true, scale: 1 });
  await writeBlob(path.join(TMP_DIR, "lesson02-montage.webp"), montage);

  const pptx = await PresentationFile.exportPptx(presentation);
  await pptx.save(CANDIDATE_PPTX);
  console.log(JSON.stringify({ output: CANDIDATE_PPTX, slides: slides.length, bytes: (await fs.stat(CANDIDATE_PPTX)).size }, null, 2));
}

if (process.argv.includes("--write-frame-map")) {
  await writePlanningFiles();
} else {
  await build();
}
