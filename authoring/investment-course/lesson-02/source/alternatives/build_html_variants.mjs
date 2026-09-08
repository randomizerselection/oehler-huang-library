import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Presentation, PresentationFile } from "@oai/artifact-tool";
import { coursePlan, lesson, slides as slideData } from "./variants-content.mjs";
import { imageCredit, imageSets } from "./image-manifest.mjs";

const SOURCE_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(SOURCE_DIR, "..", "..", "..");
const TMP_DIR = path.join(ROOT_DIR, "tmp", "lesson02-alternatives-20260903");
const HTML_METHOD_SOURCE = "C:\\Users\\oehle\\Documents\\oehler-huang-platform\\apps\\library\\assets\\js\\lesson-slides.js";
const HTML_THEME_SOURCE = "C:\\Users\\oehle\\Documents\\oehler-huang-platform\\apps\\library\\assets\\css\\theme.css";

const outputs = {
  v1: {
    file: path.join(ROOT_DIR, "lesson-02", "Lesson 02 - Return on investment - Version 1 - Economics HTML method.pptx"),
    preview: path.join(TMP_DIR, "v1-preview"),
    layout: path.join(TMP_DIR, "v1-layout"),
  },
  v2: {
    file: path.join(ROOT_DIR, "lesson-02", "Lesson 02 - Return on investment - Version 2 - Investment visual identity.pptx"),
    preview: path.join(TMP_DIR, "v2-preview"),
    layout: path.join(TMP_DIR, "v2-layout"),
  },
};

const styles = {
  v1: {
    bg: "#07111F", panel: "#10233A", panel2: "#0C1B2D", text: "#F5F8FF", dim: "#DBE7F6", muted: "#9DB0CC",
    primary: "#56D8FF", secondary: "#FFD166", warm: "#FF9F43", good: "#7EF0B5", bad: "#FF6B8A", violet: "#B79CFF",
    titleFont: "Arial", bodyFont: "Arial", zhFont: "Microsoft YaHei", rounded: true, left: 64, width: 1152,
  },
  v2: {
    bg: "#F4F0E7", panel: "#FFFDF8", panel2: "#E6DED0", text: "#15231F", dim: "#324A43", muted: "#6D756F",
    primary: "#1E5B52", secondary: "#C56B3F", warm: "#D3A63C", good: "#2F8065", bad: "#B94C45", violet: "#6C557D",
    titleFont: "Arial", bodyFont: "Arial", zhFont: "Microsoft YaHei", rounded: false, left: 92, width: 1110,
  },
};

function lineFill(fill) { return { style: "solid", fill, width: 1 }; }

function addShape(slide, name, position, fill, options = {}) {
  return slide.shapes.add({
    geometry: options.geometry || "rect",
    name,
    position,
    fill,
    line: options.line || { style: "solid", fill: "none", width: 0 },
    ...(options.borderRadius ? { borderRadius: options.borderRadius } : {}),
    ...(options.shadow ? { shadow: options.shadow } : {}),
  });
}

function addText(slide, name, text, position, style = {}) {
  const shape = slide.shapes.add({
    geometry: "textbox",
    name,
    position,
    fill: "none",
    line: { style: "solid", fill: "none", width: 0 },
  });
  shape.text = text;
  shape.text.style = {
    typeface: style.typeface || "Arial",
    fontSize: style.fontSize || 24,
    bold: style.bold || false,
    italic: style.italic || false,
    color: style.color || "#111111",
    alignment: style.alignment || "left",
    verticalAlignment: style.verticalAlignment || "top",
    autoFit: style.autoFit || "shrinkText",
    wrap: "square",
    insets: style.insets || { left: 0, right: 0, top: 0, bottom: 0 },
  };
  return shape;
}

async function bytesFor(filePath) {
  const b = await fs.readFile(filePath);
  return new Uint8Array(b.buffer, b.byteOffset, b.byteLength);
}

async function addImage(slide, source, position, options = {}) {
  return slide.images.add({
    blob: await bytesFor(path.join(SOURCE_DIR, source.file)),
    contentType: "image/jpeg",
    alt: source.alt,
    fit: options.fit || "cover",
    position,
    geometry: options.geometry || "rect",
    ...(options.borderRadius ? { borderRadius: options.borderRadius } : {}),
  });
}

function addNotes(slide, data, version, imageSource) {
  const lines = [
    `Slide ID: ${data.id}`,
    `Teaching note: ${data.note || "Advance after checking student understanding."}`,
    "",
    "[Sources]",
    `- Lesson scope, formulae and checkpoint: ${coursePlan}`,
    `- Economics HTML teaching method: ${HTML_METHOD_SOURCE}`,
    `- Economics HTML visual tokens: ${HTML_THEME_SOURCE}`,
    version === "v2" ? "- Layout identity: original investment-course ledger/editorial adaptation of the HTML method." : "- Layout identity: close PowerPoint adaptation of the Economics HTML lesson system.",
    ...(imageSource ? [`- ${imageCredit(imageSource)}`] : []),
    "- Mock-data note: all asset labels and CNY amounts are fictional classroom scenarios.",
    "[/Sources]",
  ];
  slide.speakerNotes.textFrame.setText(lines.join("\n"));
  slide.speakerNotes.setVisible(true);
}

function addChrome(slide, s, version, page, title, section = "MEASURE RETURN") {
  if (version === "v1") {
    addText(slide, "eyebrow", `INVESTMENT ANALYSIS  ·  LESSON 02  ·  ${section}`, { left: 64, top: 24, width: 760, height: 22 }, { typeface: s.bodyFont, fontSize: 13, bold: true, color: s.primary });
    addText(slide, "folio", String(page).padStart(2, "0"), { left: 1166, top: 24, width: 50, height: 22 }, { typeface: s.bodyFont, fontSize: 13, bold: true, color: s.muted, alignment: "right" });
    addText(slide, "title", title, { left: 64, top: 62, width: 1120, height: 76 }, { typeface: s.titleFont, fontSize: 46, bold: true, color: s.text, verticalAlignment: "middle" });
    addShape(slide, "title-rule", { left: 64, top: 140, width: 1152, height: 2 }, s.panel);
  } else {
    addShape(slide, "identity-rail", { left: 0, top: 0, width: 24, height: 720 }, s.primary);
    addShape(slide, "chapter-marker", { left: 54, top: 60, width: 16, height: 16 }, s.secondary);
    addText(slide, "eyebrow", `LESSON 02  /  ${section}`, { left: 92, top: 58, width: 560, height: 20 }, { typeface: s.bodyFont, fontSize: 12, bold: true, color: s.secondary });
    addText(slide, "folio", `RETURN / ${String(page).padStart(2, "0")}`, { left: 952, top: 58, width: 250, height: 20 }, { typeface: s.bodyFont, fontSize: 12, bold: true, color: s.muted, alignment: "right" });
    // Use a fixed title frame so renderers do not reposition long headings.
    addText(slide, "title", title, { left: 92, top: 86, width: 1080, height: 62 }, { typeface: s.titleFont, fontSize: 36, bold: true, color: s.text, verticalAlignment: "top", autoFit: "none" });
    addShape(slide, "title-rule", { left: 92, top: 151, width: 1110, height: 2 }, s.primary);
  }
}

function addCard(slide, s, name, position, options = {}) {
  return addShape(slide, name, position, options.fill || s.panel, {
    geometry: s.rounded ? "roundRect" : "rect",
    borderRadius: s.rounded ? "rounded-2xl" : undefined,
    line: options.line || (s.rounded ? lineFill("#203A56") : lineFill(s.panel2)),
    shadow: options.shadow || (s.rounded ? "shadow-sm" : undefined),
  });
}

function cardText(slide, s, name, text, position, options = {}) {
  return addText(slide, name, text, position, {
    typeface: options.typeface || s.bodyFont,
    fontSize: options.fontSize || 24,
    bold: options.bold || false,
    italic: options.italic || false,
    color: options.color || s.text,
    alignment: options.alignment || "left",
    verticalAlignment: options.verticalAlignment || "middle",
    insets: options.insets || { left: 20, right: 20, top: 12, bottom: 12 },
  });
}

function sectionFor(id) {
  if (id.includes("compare") || id.includes("opening") || id.includes("partner") || id.includes("evidence") || id.includes("mcq") || id.includes("short") || id.includes("exit")) return "COMPARE & CHECK";
  if (id.includes("method") || id.includes("worked") || id.includes("practice") || id.includes("yesno") || id.includes("calculate")) return "CALCULATE";
  return "TOTAL RETURN";
}

async function renderSlide(presentation, data, index, version) {
  const s = styles[version];
  const images = imageSets[version];
  const slide = presentation.slides.add();
  slide.background.fill = s.bg;
  const W = 1280, H = 720;
  let usedImage = null;

  if (data.kind === "visual") {
    usedImage = images[data.image];
    await addImage(slide, usedImage, { left: 0, top: 0, width: W, height: H });
    if (version === "v2") addShape(slide, "identity-edge", { left: 0, top: 0, width: 24, height: H }, s.secondary);
    addNotes(slide, data, version, usedImage);
    return slide;
  }

  if (data.kind === "hero") {
    usedImage = images[data.image];
    if (version === "v1") {
      addShape(slide, "hero-accent", { left: 0, top: 0, width: 20, height: H }, s.primary);
      addText(slide, "hero-kicker", "INVESTMENT ANALYSIS · LESSON 02", { left: 70, top: 72, width: 520, height: 30 }, { typeface: s.bodyFont, fontSize: 16, bold: true, color: s.primary });
      addText(slide, "hero-title", data.title, { left: 70, top: 142, width: 600, height: 180 }, { typeface: s.titleFont, fontSize: 64, bold: true, color: s.text, verticalAlignment: "middle" });
      addText(slide, "hero-zh", data.zh, { left: 70, top: 330, width: 560, height: 50 }, { typeface: s.zhFont, fontSize: 28, bold: true, color: s.secondary });
      addText(slide, "hero-subtitle", data.subtitle, { left: 70, top: 425, width: 510, height: 80 }, { typeface: s.bodyFont, fontSize: 24, color: s.dim });
      await addImage(slide, usedImage, { left: 710, top: 0, width: 570, height: 720 });
      addShape(slide, "image-boundary", { left: 690, top: 0, width: 20, height: 720 }, s.secondary);
    } else {
      addShape(slide, "identity-rail", { left: 0, top: 0, width: 24, height: H }, s.primary);
      await addImage(slide, usedImage, { left: 638, top: 0, width: 642, height: 720 });
      addShape(slide, "hero-rule", { left: 92, top: 82, width: 110, height: 5 }, s.secondary);
      addText(slide, "hero-kicker", "INVESTMENT FIELD NOTES  /  02", { left: 92, top: 112, width: 480, height: 24 }, { typeface: s.bodyFont, fontSize: 14, bold: true, color: s.secondary });
      addText(slide, "hero-title", data.title, { left: 92, top: 174, width: 500, height: 170 }, { typeface: s.titleFont, fontSize: 55, bold: true, color: s.text, verticalAlignment: "middle" });
      addText(slide, "hero-zh", data.zh, { left: 92, top: 365, width: 490, height: 46 }, { typeface: s.zhFont, fontSize: 25, bold: true, color: s.primary });
      addText(slide, "hero-subtitle", data.subtitle, { left: 92, top: 468, width: 470, height: 70 }, { typeface: s.bodyFont, fontSize: 22, color: s.dim });
      addText(slide, "hero-folio", "RETURN / 01", { left: 92, top: 650, width: 250, height: 20 }, { typeface: s.bodyFont, fontSize: 12, bold: true, color: s.muted });
    }
    addNotes(slide, data, version, usedImage);
    return slide;
  }

  if (data.kind === "section") {
    if (version === "v1") {
      addShape(slide, "section-band", { left: 0, top: 0, width: 24, height: H }, s.secondary);
      addText(slide, "section-number", data.section, { left: 72, top: 84, width: 270, height: 160 }, { typeface: s.titleFont, fontSize: 118, bold: true, color: s.primary, verticalAlignment: "middle" });
      addText(slide, "section-title", data.title, { left: 72, top: 288, width: 1040, height: 100 }, { typeface: s.titleFont, fontSize: 54, bold: true, color: s.text });
      addText(slide, "section-zh", data.zh, { left: 72, top: 410, width: 850, height: 62 }, { typeface: s.zhFont, fontSize: 30, bold: true, color: s.secondary });
      addShape(slide, "section-rule", { left: 72, top: 520, width: 1120, height: 3 }, s.panel);
    } else {
      addShape(slide, "identity-rail", { left: 0, top: 0, width: 24, height: H }, s.primary);
      addText(slide, "section-number", data.section, { left: 84, top: 52, width: 260, height: 190 }, { typeface: s.titleFont, fontSize: 124, bold: true, color: s.secondary });
      addShape(slide, "section-rule", { left: 94, top: 278, width: 1088, height: 3 }, s.primary);
      addText(slide, "section-title", data.title, { left: 94, top: 320, width: 970, height: 95 }, { typeface: s.titleFont, fontSize: 51, bold: true, color: s.text });
      addText(slide, "section-zh", data.zh, { left: 94, top: 438, width: 840, height: 58 }, { typeface: s.zhFont, fontSize: 29, bold: true, color: s.primary });
      addText(slide, "section-label", "A MEASUREMENT CHAPTER", { left: 94, top: 630, width: 360, height: 20 }, { typeface: s.bodyFont, fontSize: 12, bold: true, color: s.muted });
    }
    addNotes(slide, data, version);
    return slide;
  }

  addChrome(slide, s, version, index + 1, data.title, sectionFor(data.id));
  const contentTop = version === "v1" ? 172 : 182;

  if (data.kind === "discussion") {
    addText(slide, "prompt", data.prompt, { left: s.left, top: contentTop, width: s.width, height: 72 }, { typeface: s.bodyFont, fontSize: 29, bold: true, color: s.dim, alignment: "center", verticalAlignment: "middle" });
    const cardW = 430, gap = 52, x = (W - (cardW * 2 + gap)) / 2;
    [data.left, data.right].forEach((txt, i) => {
      addCard(slide, s, `choice-${i + 1}`, { left: x + i * (cardW + gap), top: contentTop + 105, width: cardW, height: 235 }, { fill: i === 0 ? s.panel : s.panel2 });
      cardText(slide, s, `choice-text-${i + 1}`, txt, { left: x + i * (cardW + gap), top: contentTop + 105, width: cardW, height: 235 }, { fontSize: 38, bold: true, color: i === 0 ? s.primary : s.secondary, alignment: "center" });
    });
    addText(slide, "discussion-footer", data.footer, { left: s.left + 120, top: 570, width: s.width - 240, height: 58 }, { typeface: s.bodyFont, fontSize: 21, color: s.muted, alignment: "center", verticalAlignment: "middle" });
  } else if (data.kind === "objectives") {
    lesson.objectives.forEach(([en, zh], i) => {
      const y = contentTop + i * 142;
      addShape(slide, `objective-number-bg-${i + 1}`, { left: s.left, top: y, width: 68, height: 100 }, i === 1 ? s.secondary : s.primary, { geometry: s.rounded ? "roundRect" : "rect", borderRadius: s.rounded ? "rounded-xl" : undefined });
      addText(slide, `objective-number-${i + 1}`, `0${i + 1}`, { left: s.left, top: y, width: 68, height: 100 }, { typeface: s.bodyFont, fontSize: 23, bold: true, color: version === "v1" ? s.bg : "#FFFFFF", alignment: "center", verticalAlignment: "middle" });
      addCard(slide, s, `objective-card-${i + 1}`, { left: s.left + 86, top: y, width: s.width - 86, height: 100 }, { fill: s.panel });
      addText(slide, `objective-en-${i + 1}`, en, { left: s.left + 112, top: y + 16, width: 720, height: 34 }, { typeface: s.bodyFont, fontSize: 25, bold: true, color: s.text });
      addText(slide, `objective-zh-${i + 1}`, zh, { left: s.left + 112, top: y + 55, width: 720, height: 28 }, { typeface: s.zhFont, fontSize: 18, color: s.muted });
    });
  } else if (data.kind === "recall") {
    addText(slide, "prompt", data.prompt, { left: s.left, top: contentTop, width: s.width, height: 48 }, { typeface: s.bodyFont, fontSize: 22, color: s.muted });
    data.items.forEach(([term, def], i) => {
      const y = contentTop + 76 + i * 128;
      addCard(slide, s, `recall-card-${i + 1}`, { left: s.left, top: y, width: s.width, height: 102 }, { fill: data.reveal ? (version === "v1" ? "#0D2F31" : "#E8F0E9") : s.panel });
      addText(slide, `recall-term-${i + 1}`, term, { left: s.left + 24, top: y + 16, width: 210, height: 70 }, { typeface: s.titleFont, fontSize: 25, bold: true, color: data.reveal ? s.good : s.secondary, verticalAlignment: "middle" });
      addText(slide, `recall-def-${i + 1}`, def, { left: s.left + 255, top: y + 16, width: s.width - 284, height: 70 }, { typeface: s.bodyFont, fontSize: 23, color: s.text, verticalAlignment: "middle" });
    });
  } else if (data.kind === "definition") {
    addText(slide, "term-label", "KEY TERM  ·  关键词", { left: s.left, top: contentTop, width: 260, height: 30 }, { typeface: s.bodyFont, fontSize: 14, bold: true, color: s.secondary });
    addCard(slide, s, "definition-surface", { left: s.left, top: contentTop + 55, width: s.width, height: 280 }, { fill: data.reveal ? (version === "v1" ? "#0B2A37" : "#E8F0E9") : s.panel });
    cardText(slide, s, "definition", data.prompt, { left: s.left + 24, top: contentTop + 80, width: s.width - 48, height: 225 }, { typeface: s.titleFont, fontSize: 37, bold: true, color: data.reveal ? s.primary : s.text, alignment: "center" });
    addText(slide, "clue", data.clue, { left: s.left + 80, top: contentTop + 380, width: s.width - 160, height: 72 }, { typeface: data.reveal ? s.zhFont : s.bodyFont, fontSize: 23, bold: data.reveal, color: s.muted, alignment: "center", verticalAlignment: "middle" });
  } else if (data.kind === "three") {
    const gap = 24, w = (s.width - 2 * gap) / 3;
    data.items.forEach(([label, body], i) => {
      const x = s.left + i * (w + gap);
      addCard(slide, s, `example-${i + 1}`, { left: x, top: contentTop + 35, width: w, height: 345 }, { fill: i === 1 ? s.panel2 : s.panel });
      addShape(slide, `example-accent-${i + 1}`, { left: x, top: contentTop + 35, width: w, height: 8 }, [s.primary, s.secondary, s.violet][i]);
      addText(slide, `example-label-${i + 1}`, label, { left: x + 26, top: contentTop + 82, width: w - 52, height: 48 }, { typeface: s.titleFont, fontSize: 29, bold: true, color: [s.primary, s.secondary, s.violet][i], alignment: "center" });
      addText(slide, `example-body-${i + 1}`, body, { left: x + 22, top: contentTop + 160, width: w - 44, height: 140 }, { typeface: s.bodyFont, fontSize: 29, bold: true, color: s.text, alignment: "center", verticalAlignment: "middle" });
    });
  } else if (data.kind === "classify") {
    const statements = ["Share price rises by CNY 80", "Dividend of CNY 20", "You add CNY 500", "Fund value falls by CNY 60", "Bond interest of CNY 35"];
    if (data.prompt) addText(slide, "prompt", data.prompt, { left: s.left, top: contentTop, width: s.width, height: 36 }, { typeface: s.bodyFont, fontSize: 19, color: s.muted });
    statements.forEach((statement, i) => {
      const y = contentTop + 55 + i * 82;
      addCard(slide, s, `class-row-${i + 1}`, { left: s.left, top: y, width: s.width, height: 65 }, { fill: i % 2 ? s.panel2 : s.panel });
      addText(slide, `class-item-${i + 1}`, `${i + 1}.  ${statement}`, { left: s.left + 18, top: y, width: 660, height: 65 }, { typeface: s.bodyFont, fontSize: 20, color: s.text, verticalAlignment: "middle" });
      addText(slide, `class-answer-${i + 1}`, data.reveal ? data.items[i] : "________________", { left: s.left + 720, top: y, width: s.width - 742, height: 65 }, { typeface: s.bodyFont, fontSize: 20, bold: data.reveal, color: data.reveal ? (i === 2 ? s.bad : s.good) : s.muted, alignment: "right", verticalAlignment: "middle" });
    });
  } else if (data.kind === "flow") {
    addText(slide, "prompt", data.prompt, { left: s.left, top: contentTop, width: s.width, height: 42 }, { typeface: s.bodyFont, fontSize: 20, color: s.muted, alignment: "center" });
    const gap = 18, w = (s.width - gap * 3) / 4;
    data.steps.forEach((step, i) => {
      const x = s.left + i * (w + gap);
      addCard(slide, s, `flow-step-${i + 1}`, { left: x, top: contentTop + 95, width: w, height: 190 }, { fill: data.reveal && i > 0 ? (version === "v1" ? "#0D2F31" : "#E8F0E9") : s.panel });
      addText(slide, `flow-number-${i + 1}`, `0${i + 1}`, { left: x + 18, top: contentTop + 112, width: 50, height: 28 }, { typeface: s.bodyFont, fontSize: 14, bold: true, color: [s.primary, s.secondary, s.warm, s.good][i] });
      addText(slide, `flow-text-${i + 1}`, step, { left: x + 20, top: contentTop + 155, width: w - 40, height: 88 }, { typeface: s.bodyFont, fontSize: 24, bold: true, color: s.text, alignment: "center", verticalAlignment: "middle" });
      if (i < 3) addText(slide, `flow-arrow-${i + 1}`, "→", { left: x + w, top: contentTop + 160, width: gap, height: 48 }, { typeface: s.bodyFont, fontSize: 28, bold: true, color: s.muted, alignment: "center" });
    });
    if (data.reveal) addText(slide, "formula-line", data.prompt, { left: s.left + 80, top: contentTop + 350, width: s.width - 160, height: 68 }, { typeface: s.bodyFont, fontSize: 27, bold: true, color: s.primary, alignment: "center", verticalAlignment: "middle" });
  } else if (data.kind === "mcq") {
    addCard(slide, s, "question-surface", { left: s.left, top: contentTop, width: s.width, height: 142 }, { fill: s.panel });
    cardText(slide, s, "question", data.question, { left: s.left + 20, top: contentTop + 10, width: s.width - 40, height: 122 }, { fontSize: 25, bold: true, color: s.text, alignment: "center" });
    const gap = 22, w = (s.width - gap) / 2;
    data.options.forEach((option, i) => {
      const row = Math.floor(i / 2), col = i % 2, x = s.left + col * (w + gap), y = contentTop + 178 + row * 116;
      const isAnswer = data.reveal && i === data.answer;
      addCard(slide, s, `option-${i + 1}`, { left: x, top: y, width: w, height: 91 }, { fill: isAnswer ? (version === "v1" ? "#16433C" : "#DDEDE3") : s.panel2, line: isAnswer ? { style: "solid", fill: s.good, width: 3 } : lineFill(s.panel2) });
      cardText(slide, s, `option-text-${i + 1}`, option, { left: x, top: y, width: w, height: 91 }, { fontSize: 23, bold: isAnswer, color: isAnswer ? s.good : s.text, alignment: "center" });
    });
  } else if (data.kind === "method") {
    data.steps.forEach(([n, label], i) => {
      const y = contentTop + 20 + i * 105;
      addShape(slide, `method-number-bg-${i + 1}`, { left: s.left, top: y, width: 74, height: 74 }, i % 2 ? s.secondary : s.primary, { geometry: "ellipse" });
      addText(slide, `method-number-${i + 1}`, n, { left: s.left, top: y, width: 74, height: 74 }, { typeface: s.bodyFont, fontSize: 25, bold: true, color: version === "v1" ? s.bg : "#FFFFFF", alignment: "center", verticalAlignment: "middle" });
      addText(slide, `method-label-${i + 1}`, label, { left: s.left + 105, top: y, width: s.width - 105, height: 74 }, { typeface: s.bodyFont, fontSize: 27, bold: true, color: data.reveal ? s.text : s.dim, verticalAlignment: "middle" });
      if (i < 3) addShape(slide, `method-line-${i + 1}`, { left: s.left + 36, top: y + 74, width: 2, height: 31 }, s.panel2);
    });
  } else if (data.kind === "worked") {
    addCard(slide, s, "data-card", { left: s.left, top: contentTop + 10, width: 330, height: 402 }, { fill: s.panel2 });
    addText(slide, "data-label", "CASE DATA", { left: s.left + 24, top: contentTop + 40, width: 280, height: 24 }, { typeface: s.bodyFont, fontSize: 13, bold: true, color: s.secondary });
    addText(slide, "data", data.data.join("\n\n"), { left: s.left + 24, top: contentTop + 92, width: 282, height: 260 }, { typeface: s.bodyFont, fontSize: 23, bold: true, color: s.text, verticalAlignment: "middle" });
    addCard(slide, s, "method-card", { left: s.left + 360, top: contentTop + 10, width: s.width - 360, height: 402 }, { fill: s.panel });
    data.steps.forEach((step, i) => {
      addText(slide, `worked-step-${i + 1}`, `${i + 1}.  ${step}`, { left: s.left + 390, top: contentTop + 42 + i * 86, width: s.width - 420, height: 62 }, { typeface: s.bodyFont, fontSize: 21, bold: i === 3, color: i === 3 ? s.good : s.text, verticalAlignment: "middle" });
    });
  } else if (data.kind === "practice") {
    addCard(slide, s, "practice-main", { left: s.left, top: contentTop + 15, width: s.width, height: 410 }, { fill: data.reveal ? (version === "v1" ? "#0B2A37" : "#E8F0E9") : s.panel });
    addText(slide, "practice-data", data.data.join("\n\n"), { left: s.left + 38, top: contentTop + 46, width: 500, height: 290 }, { typeface: s.bodyFont, fontSize: data.reveal ? 24 : 27, bold: true, color: data.reveal ? s.text : s.primary, verticalAlignment: "middle" });
    addShape(slide, "practice-divider", { left: s.left + 560, top: contentTop + 55, width: 2, height: 270 }, s.panel2);
    addText(slide, "practice-question", data.question, { left: s.left + 600, top: contentTop + 72, width: s.width - 640, height: 240 }, { typeface: s.bodyFont, fontSize: 25, bold: data.reveal, color: data.reveal ? s.good : s.text, verticalAlignment: "middle" });
  } else if (data.kind === "yesno") {
    data.items.forEach((item, i) => {
      const y = contentTop + 20 + i * 103;
      addCard(slide, s, `yn-row-${i + 1}`, { left: s.left, top: y, width: s.width, height: 78 }, { fill: i % 2 ? s.panel2 : s.panel });
      if (data.reveal) {
        addText(slide, `yn-answer-${i + 1}`, item[0], { left: s.left + 20, top: y, width: 105, height: 78 }, { typeface: s.bodyFont, fontSize: 21, bold: true, color: item[0] === "YES" ? s.good : s.bad, alignment: "center", verticalAlignment: "middle" });
        addText(slide, `yn-text-${i + 1}`, item[1], { left: s.left + 145, top: y, width: s.width - 170, height: 78 }, { typeface: s.bodyFont, fontSize: 22, color: s.text, verticalAlignment: "middle" });
      } else {
        addText(slide, `yn-text-${i + 1}`, item, { left: s.left + 24, top: y, width: s.width - 220, height: 78 }, { typeface: s.bodyFont, fontSize: 22, color: s.text, verticalAlignment: "middle" });
        addText(slide, `yn-choice-${i + 1}`, "YES / NO", { left: s.left + s.width - 185, top: y, width: 155, height: 78 }, { typeface: s.bodyFont, fontSize: 17, bold: true, color: s.secondary, alignment: "center", verticalAlignment: "middle" });
      }
    });
  } else if (data.kind === "compare") {
    const gap = 30, w = (s.width - gap) / 2;
    [data.left, data.right].forEach((col, i) => {
      const x = s.left + i * (w + gap), accent = i === 0 ? s.secondary : s.primary;
      addCard(slide, s, `compare-${i + 1}`, { left: x, top: contentTop + 20, width: w, height: 390 }, { fill: i === 0 ? s.panel2 : s.panel });
      addShape(slide, `compare-accent-${i + 1}`, { left: x, top: contentTop + 20, width: w, height: 10 }, accent);
      addText(slide, `compare-head-${i + 1}`, col[0], { left: x + 28, top: contentTop + 64, width: w - 56, height: 48 }, { typeface: s.titleFont, fontSize: 29, bold: true, color: accent, alignment: "center" });
      addText(slide, `compare-body-${i + 1}`, col.slice(1).join("\n\n"), { left: x + 32, top: contentTop + 132, width: w - 64, height: 220 }, { typeface: s.bodyFont, fontSize: 23, bold: data.reveal, color: s.text, alignment: "center", verticalAlignment: "middle" });
    });
  } else if (data.kind === "case") {
    addText(slide, "case-prompt", data.prompt, { left: s.left, top: contentTop, width: s.width, height: 62 }, { typeface: s.bodyFont, fontSize: 23, bold: data.reveal, color: data.reveal ? s.good : s.muted, alignment: "center", verticalAlignment: "middle" });
    const gap = 28, w = (s.width - gap) / 2;
    [data.left, data.right].forEach((col, i) => {
      const x = s.left + i * (w + gap), accent = i === 0 ? s.primary : s.secondary;
      addCard(slide, s, `case-${i + 1}`, { left: x, top: contentTop + 92, width: w, height: 305 }, { fill: data.reveal && i === 0 ? (version === "v1" ? "#0D2F31" : "#E8F0E9") : s.panel });
      addText(slide, `case-title-${i + 1}`, col[0], { left: x + 26, top: contentTop + 116, width: w - 52, height: 46 }, { typeface: s.titleFont, fontSize: 29, bold: true, color: accent, alignment: "center" });
      addText(slide, `case-body-${i + 1}`, col.slice(1).join("\n\n"), { left: x + 28, top: contentTop + 174, width: w - 56, height: 190 }, { typeface: s.bodyFont, fontSize: 23, bold: data.reveal, color: s.text, alignment: "center", verticalAlignment: "middle" });
    });
  } else if (data.kind === "record") {
    usedImage = images[data.image];
    addCard(slide, s, "record-panel", { left: s.left, top: contentTop + 10, width: 620, height: 420 }, { fill: s.panel });
    addText(slide, "record-fields", data.fields.map((f, i) => `${String(i + 1).padStart(2, "0")}  ${f}`).join("\n"), { left: s.left + 32, top: contentTop + 37, width: 555, height: 360 }, { typeface: s.bodyFont, fontSize: 20, color: s.text, verticalAlignment: "middle" });
    await addImage(slide, usedImage, { left: s.left + 650, top: contentTop + 10, width: s.width - 650, height: 420 }, { geometry: s.rounded ? "roundRect" : "rect", borderRadius: s.rounded ? "rounded-2xl" : undefined });
  } else if (data.kind === "short" || data.kind === "exit") {
    addCard(slide, s, `${data.kind}-surface`, { left: s.left, top: contentTop + 26, width: s.width, height: 395 }, { fill: data.reveal ? (version === "v1" ? "#0B2A37" : "#E8F0E9") : s.panel });
    addText(slide, `${data.kind}-prompt`, data.prompt, { left: s.left + 44, top: contentTop + 60, width: s.width - 88, height: 320 }, { typeface: s.bodyFont, fontSize: data.kind === "exit" ? 27 : 28, bold: data.reveal, color: data.reveal ? s.good : s.text, alignment: data.kind === "exit" ? "left" : "center", verticalAlignment: "middle" });
  } else {
    throw new Error(`Unsupported slide kind: ${data.kind}`);
  }

  addNotes(slide, data, version, usedImage);
  return slide;
}

async function writeArtifacts(presentation, output, version) {
  await fs.mkdir(output.preview, { recursive: true });
  await fs.mkdir(output.layout, { recursive: true });
  for (let i = 0; i < presentation.slides.items.length; i += 1) {
    const n = String(i + 1).padStart(2, "0");
    const slide = presentation.slides.items[i];
    const png = await presentation.export({ slide, format: "png", scale: 1 });
    await fs.writeFile(path.join(output.preview, `slide-${n}.png`), new Uint8Array(await png.arrayBuffer()));
    const layout = await slide.export({ format: "layout" });
    await fs.writeFile(path.join(output.layout, `slide-${n}.layout.json`), await layout.text(), "utf8");
  }
  const pptx = await PresentationFile.exportPptx(presentation);
  await pptx.save(output.file);
  await fs.writeFile(path.join(TMP_DIR, `${version}-semantic-map.json`), JSON.stringify(slideData.map((s, i) => ({ slide: i + 1, id: s.id, kind: s.kind })), null, 2) + "\n", "utf8");
}

async function build(version) {
  const presentation = Presentation.create({ slideSize: { width: 1280, height: 720 } });
  const s = styles[version];
  presentation.theme.colorScheme = {
    name: version === "v1" ? "Economics HTML Dark" : "Investment Ledger",
    themeColors: { accent1: s.primary, accent2: s.secondary, accent3: s.warm, accent4: s.bad, accent5: s.violet, accent6: s.good, bg1: s.bg, bg2: s.panel, tx1: s.text, tx2: s.muted, dk1: "#000000", dk2: s.text, lt1: "#FFFFFF", lt2: s.panel2, hlink: s.primary, folHlink: s.violet },
  };
  for (let i = 0; i < slideData.length; i += 1) {
    await renderSlide(presentation, slideData[i], i, version);
  }
  await writeArtifacts(presentation, outputs[version], version);
  return { file: outputs[version].file, slides: presentation.slides.items.length };
}

await fs.mkdir(TMP_DIR, { recursive: true });
const sourceNotes = [
  "Version 1 and Version 2 shared pedagogy",
  `- ${HTML_METHOD_SOURCE}`,
  `- ${HTML_THEME_SOURCE}`,
  "- Hero -> discussion -> exactly three bilingual objectives.",
  "- Retrieval uses attempt/reveal states.",
  "- Each major section uses divider -> image-only visual pause -> teaching -> formative check.",
  "- Definitions, formula flows, comparisons and exit ticket use meaningful fill-in-the-blanks followed by reveals.",
  "- Varied checks: classification, yes/no, MCQ, partner calculation and short answer.",
  "",
  "Version 1 visual identity",
  "- Faithful dark Economics HTML system: deep navy, translucent-feeling dark panels, cyan/gold accents and rounded surfaces.",
  "",
  "Version 2 visual identity",
  "- Same lesson method and slide sequence with an original investment ledger/editorial identity: warm paper, forest ink, copper markers, serif headings and a vertical course rail.",
  "",
  "Image source pages",
  ...Object.entries(imageSets).flatMap(([version, set]) => Object.values(set).map((src) => `- ${version}: ${imageCredit(src)}`)),
  "",
].join("\n");
await fs.writeFile(path.join(TMP_DIR, "html-variants-source-notes.txt"), sourceNotes, "utf8");

const results = [];
for (const version of ["v1", "v2"]) results.push(await build(version));
console.log(JSON.stringify(results, null, 2));
