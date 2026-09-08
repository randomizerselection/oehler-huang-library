import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FileBlob, PresentationFile } from "@oai/artifact-tool";
import JSZip from "jszip";
import { coursePlan, slides as slideData, sourceDeck } from "./multiplier-content.mjs";
import { imageCredit, imageSets } from "../image-manifest.mjs";

const SOURCE_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(SOURCE_DIR, "..", "..", "..", "..");
const WORK_DIR = path.join(ROOT_DIR, "tmp", "lesson02-alternatives-20260903", "v3-template");
const starterPptxPath = path.join(SOURCE_DIR, "base", "template-starter.pptx");
const outputPptxPath = path.join(ROOT_DIR, "lesson-02", "Lesson 02 - Return on investment - Version 3 - A-level analytical style.pptx");
const PREVIEW_DIR = path.join(WORK_DIR, "final-preview");
const LAYOUT_DIR = path.join(WORK_DIR, "final-layout");
const ASSET_ROOT = path.resolve(SOURCE_DIR, "..");
const images = imageSets.v3;

function slideItems(presentation) {
  if (Array.isArray(presentation.slides?.items)) return presentation.slides.items;
  return Array.from({ length: presentation.slides.count }, (_, i) => presentation.slides.getItem(i));
}

function byName(slide, name) {
  return (slide.shapes.items || []).find((item) => item.name === name);
}

function setText(slide, name, text, options = {}) {
  const shape = byName(slide, name);
  if (!shape) {
    if (options.required !== false) throw new Error(`Missing inherited shape ${name}`);
    return;
  }
  shape.text = text ?? "";
  shape.text.autoFit = "shrinkText";
  if (options.typeface) shape.text.typeface = options.typeface;
  if (options.fontSize) shape.text.fontSize = options.fontSize;
  if (options.color) shape.text.color = options.color;
  if (options.bold !== undefined) shape.text.bold = options.bold;
  if (options.alignment) shape.text.alignment = options.alignment;
  if (options.verticalAlignment) shape.text.verticalAlignment = options.verticalAlignment;
}

function setTitle(slide, title, options = {}) {
  const titleShape = (slide.shapes.items || []).find((item) => String(item.name || "").startsWith("slide-"));
  if (!titleShape) throw new Error(`Missing inherited title shape for ${title}`);
  titleShape.text = title;
  titleShape.text.autoFit = "shrinkText";
  if (options.fontSize) titleShape.text.fontSize = options.fontSize;
}

function setFolio(slide, sourceSlide, outputSlide) {
  let name = "Rectangle 3";
  if (sourceSlide === 1 || sourceSlide === 4) name = "Rectangle 8";
  if ([2, 3, 6, 11, 16, 26, 30].includes(sourceSlide)) return;
  setText(slide, name, String(outputSlide).padStart(2, "0"), { required: false });
}

function tableOn(slide) {
  const table = slide.tables?.items?.[0];
  if (!table) throw new Error("Missing inherited table");
  return table;
}

function fillTable(slide, values) {
  const table = tableOn(slide);
  const rows = table.rows?.length ?? values.length;
  const cols = table.columns?.count ?? Math.max(...values.map((row) => row.length));
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      table.getCell(r, c).value = values[r]?.[c] ?? "";
    }
  }
}

async function fileBytes(filePath) {
  const data = await fs.readFile(filePath);
  return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
}

async function replaceFirstImage(slide, source) {
  const image = slide.images?.items?.[0];
  if (!image) throw new Error(`Missing inherited image for ${source.file}`);
  const old = {
    frame: image.frame,
    crop: image.crop,
    fit: image.fit,
    geometry: image.geometry,
    borderRadius: image.borderRadius,
    rotation: image.rotation,
    flipHorizontal: image.flipHorizontal,
    flipVertical: image.flipVertical,
    lockAspectRatio: image.lockAspectRatio,
  };
  image.replace({
    blob: await fileBytes(path.join(ASSET_ROOT, source.file)),
    contentType: "image/jpeg",
    alt: source.alt,
    fit: "cover",
  });
  image.frame = old.frame;
  image.crop = old.crop;
  image.fit = "cover";
  image.geometry = old.geometry;
  image.borderRadius = old.borderRadius;
  image.rotation = old.rotation;
  image.flipHorizontal = old.flipHorizontal;
  image.flipVertical = old.flipVertical;
  image.lockAspectRatio = old.lockAspectRatio;
}

function addNotes(slide, data, imageSource) {
  const lines = [
    `Slide ID: ${data.id}`,
    `Teaching note: ${data.note}`,
    "",
    "[Sources]",
    `- Lesson scope and calculations: ${coursePlan}`,
    `- Analytical design and pedagogy reference: ${sourceDeck}`,
    ...(imageSource ? [`- ${imageCredit(imageSource)}`] : []),
    "- Mock-data note: all asset labels and CNY figures are fictional classroom scenarios.",
    "[/Sources]",
  ];
  slide.speakerNotes.textFrame.setText(lines.join("\n"));
  slide.speakerNotes.setVisible(true);
}

async function editSlide(slide, data, index) {
  setFolio(slide, data.source, index + 1);
  let imageSource = null;

  switch (data.id) {
    case "title":
      setText(slide, "Rectangle 9", data.small);
      setText(slide, "Rectangle 1", data.title);
      setText(slide, "Rectangle 2", data.subtitle);
      setText(slide, "Rectangle 4", "Lesson 02");
      setText(slide, "Rectangle 8", "01");
      imageSource = images.hero;
      await replaceFirstImage(slide, imageSource);
      break;
    case "opening-question":
      setText(slide, "TextBox 4", data.title);
      imageSource = images.calculation;
      await replaceFirstImage(slide, imageSource);
      break;
    case "objectives":
      setTitle(slide, data.title);
      ["Rectangle 8", "Rectangle 11", "Rectangle 14", "Rectangle 17"].forEach((name, i) => setText(slide, name, data.items[i]));
      break;
    case "part-one":
      setText(slide, "Rectangle 9", "LESSON 2");
      setText(slide, "Rectangle 1", data.title);
      setText(slide, "Rectangle 2", data.subtitle);
      setText(slide, "Rectangle 8", "04");
      imageSource = images.comparison;
      await replaceFirstImage(slide, imageSource);
      break;
    case "measurement-problem":
      setTitle(slide, data.title);
      setText(slide, "Rectangle 4", data.lead);
      setText(slide, "Rectangle 5", data.body);
      imageSource = images.evidence;
      await replaceFirstImage(slide, imageSource);
      break;
    case "definition":
    case "part-two":
    case "part-three":
    case "part-four":
    case "analytical-principle":
      setTitle(slide, data.title, { fontSize: 56 });
      break;
    case "decomposition":
      setTitle(slide, data.title);
      ["Rectangle 8", "Rectangle 10", "Rectangle 12"].forEach((name, i) => setText(slide, name, data.labels[i]));
      ["Rectangle 9", "Rectangle 11", "Rectangle 13"].forEach((name, i) => setText(slide, name, data.bodies[i]));
      setText(slide, "Rectangle 14", data.footer);
      break;
    case "component-table":
      setTitle(slide, data.title);
      setText(slide, "Rectangle 4", data.lead);
      fillTable(slide, data.table);
      setText(slide, "Rectangle 6", data.footer, { fontSize: 20 });
      break;
    case "return-flow":
      setTitle(slide, data.title);
      setText(slide, "Rectangle 7", data.center);
      setText(slide, "Rectangle 8", data.leftHead);
      setText(slide, "Rectangle 9", data.leftBody);
      setText(slide, "Rectangle 10", data.rightHead);
      setText(slide, "Rectangle 11", data.rightBody);
      break;
    case "return-formula":
      setTitle(slide, data.title);
      setText(slide, "Rectangle 5", "FORMULA");
      setText(slide, "Rectangle 6", data.formula);
      setText(slide, "Rectangle 7", data.label);
      setText(slide, "Rectangle 8", data.body);
      setText(slide, "Rectangle 9", data.example);
      break;
    case "metrics":
      setTitle(slide, data.title);
      setText(slide, "Rectangle 6", data.leftHead);
      setText(slide, "Rectangle 7", "money gained or lost");
      setText(slide, "Rectangle 8", data.leftBody);
      setText(slide, "Rectangle 9", data.rightHead);
      setText(slide, "Rectangle 10", "return relative to size");
      setText(slide, "Rectangle 11", data.rightBody);
      break;
    case "data-requirements":
      setTitle(slide, data.title);
      fillTable(slide, data.table);
      break;
    case "percentage-formula":
      setTitle(slide, data.title);
      setText(slide, "Rectangle 4", data.lead);
      fillTable(slide, data.table);
      setText(slide, "Rectangle 6", data.footer);
      break;
    case "fair-comparison":
    case "limits":
      setTitle(slide, data.title);
      setText(slide, "Rectangle 5", data.leftHead);
      setText(slide, "Rectangle 6", data.leftBig);
      setText(slide, "Rectangle 7", data.leftBody);
      setText(slide, "Rectangle 9", data.rightHead);
      setText(slide, "Rectangle 10", data.rightBig);
      setText(slide, "Rectangle 11", data.rightBody);
      setText(slide, "Rectangle 12", data.footer);
      break;
    case "four-step-method":
      setTitle(slide, data.title);
      ["Rectangle 6", "Rectangle 9", "Rectangle 12", "Rectangle 15"].forEach((name, i) => setText(slide, name, data.labels[i]));
      ["Rectangle 7", "Rectangle 10", "Rectangle 13", "Rectangle 16"].forEach((name, i) => setText(slide, name, data.bodies[i]));
      setText(slide, "Rectangle 17", data.footer);
      break;
    case "worked-example":
      setTitle(slide, data.title);
      setText(slide, "Rectangle 4", "GIVEN");
      setText(slide, "Rectangle 5", data.given.replace(/^GIVEN\n/, ""));
      setText(slide, "Rectangle 7", data.method);
      setText(slide, "Rectangle 8", data.footer);
      break;
    case "practice-one":
      setTitle(slide, data.title);
      fillTable(slide, data.table);
      setText(slide, "Rectangle 5", data.lead);
      setText(slide, "Rectangle 6", data.body);
      break;
    case "practice-one-solution":
      setTitle(slide, data.title);
      setText(slide, "Rectangle 4", data.lead);
      fillTable(slide, data.table);
      setText(slide, "Rectangle 6", data.footer);
      break;
    case "practice-set":
      setTitle(slide, data.title);
      ["Rectangle 7", "Rectangle 10", "Rectangle 13"].forEach((name, i) => setText(slide, name, data.heads[i]));
      ["Rectangle 8", "Rectangle 11", "Rectangle 14"].forEach((name, i) => setText(slide, name, data.bodies[i]));
      break;
    case "practice-set-check":
      setTitle(slide, data.title);
      ["Rectangle 4", "Rectangle 8", "Rectangle 12"].forEach((name, i) => setText(slide, name, data.numbers[i]));
      ["Rectangle 5", "Rectangle 9", "Rectangle 13"].forEach((name, i) => setText(slide, name, data.answers[i]));
      ["Rectangle 7", "Rectangle 11", "Rectangle 15"].forEach((name, i) => setText(slide, name, data.reasons[i]));
      break;
    case "loss-example":
    case "compare-example":
      setTitle(slide, data.title);
      setText(slide, "Rectangle 5", data.qHead);
      setText(slide, "Rectangle 6", data.question);
      setText(slide, "Rectangle 8", data.mHead);
      setText(slide, "Rectangle 9", data.method);
      break;
    case "work-backwards":
      setTitle(slide, data.title);
      setText(slide, "Rectangle 4", data.prompt);
      ["Rectangle 7", "Rectangle 10", "Rectangle 13", "Rectangle 16"].forEach((name, i) => setText(slide, name, data.labels[i]));
      ["Rectangle 8", "Rectangle 11", "Rectangle 14", "Rectangle 17"].forEach((name, i) => setText(slide, name, data.bodies[i]));
      setText(slide, "Rectangle 18", data.footer);
      break;
    case "sensitivity":
      setTitle(slide, data.title);
      setText(slide, "Rectangle 11", data.yAxis);
      setText(slide, "Rectangle 12", data.xAxis);
      setText(slide, "Rectangle 13", data.diagonal);
      setText(slide, "Rectangle 14", data.lineA);
      setText(slide, "Rectangle 15", data.lineB);
      setText(slide, "Rectangle 16", data.start);
      setText(slide, "Rectangle 17", data.end);
      setText(slide, "Rectangle 18", data.label);
      setText(slide, "Rectangle 19", data.body);
      setText(slide, "Rectangle 20", data.footer);
      break;
    case "mcq-one":
    case "mcq-two":
    case "mcq-three":
      setTitle(slide, data.title);
      setText(slide, "Rectangle 5", data.question);
      ["Rectangle 6", "Rectangle 7", "Rectangle 8", "Rectangle 9"].forEach((name, i) => setText(slide, name, data.options[i]));
      break;
    case "mcq-feedback":
      setTitle(slide, data.title);
      ["Rectangle 4", "Rectangle 8", "Rectangle 12"].forEach((name, i) => setText(slide, name, data.numbers[i]));
      ["Rectangle 5", "Rectangle 9", "Rectangle 13"].forEach((name, i) => setText(slide, name, data.heads[i]));
      ["Rectangle 6", "Rectangle 10", "Rectangle 14"].forEach((name, i) => setText(slide, name, data.bodies[i]));
      break;
    case "analysis-question":
      setTitle(slide, data.title);
      setText(slide, "Rectangle 5", data.question);
      setText(slide, "Rectangle 6", "MARK TARGET");
      setText(slide, "Rectangle 7", data.mark.replace("MARK TARGET\n", ""));
      break;
    case "analysis-model":
      setTitle(slide, data.title);
      ["Rectangle 7", "Rectangle 9", "Rectangle 11", "Rectangle 13"].forEach((name, i) => setText(slide, name, data.labels[i]));
      ["Rectangle 8", "Rectangle 10", "Rectangle 12", "Rectangle 14"].forEach((name, i) => setText(slide, name, data.bodies[i]));
      setText(slide, "Rectangle 15", data.footer);
      break;
    case "self-assess":
      setTitle(slide, data.title);
      setText(slide, "Rectangle 5", data.prompt);
      ["Rectangle 6", "Rectangle 7", "Rectangle 8", "Rectangle 9"].forEach((name, i) => setText(slide, name, data.items[i]));
      break;
    case "synthesis":
      setTitle(slide, data.title);
      ["Rectangle 6", "Rectangle 9", "Rectangle 12"].forEach((name, i) => setText(slide, name, data.labels[i]));
      ["Rectangle 7", "Rectangle 10", "Rectangle 13"].forEach((name, i) => setText(slide, name, data.bodies[i]));
      setText(slide, "Rectangle 14", data.footer);
      break;
    default:
      throw new Error(`Unhandled analytical slide ${data.id}`);
  }
  addNotes(slide, data, imageSource);
}

async function writeBlob(filePath, blob) {
  await fs.writeFile(filePath, new Uint8Array(await blob.arrayBuffer()));
}

async function restoreReferenceThemes(referencePptxPath, targetPptxPath) {
  const [referenceZip, targetZip] = await Promise.all([
    JSZip.loadAsync(await fs.readFile(referencePptxPath)),
    JSZip.loadAsync(await fs.readFile(targetPptxPath)),
  ]);
  for (const name of Object.keys(targetZip.files).filter((entry) => entry.startsWith("ppt/theme/"))) {
    targetZip.remove(name);
  }
  const themeNames = Object.keys(referenceZip.files).filter((entry) => entry.startsWith("ppt/theme/") && !referenceZip.files[entry].dir);
  for (const name of themeNames) {
    targetZip.file(name, await referenceZip.files[name].async("uint8array"));
  }
  await fs.writeFile(targetPptxPath, await targetZip.generateAsync({ type: "nodebuffer", compression: "DEFLATE", compressionOptions: { level: 6 } }));
}

await fs.mkdir(PREVIEW_DIR, { recursive: true });
await fs.mkdir(LAYOUT_DIR, { recursive: true });
const presentation = await PresentationFile.importPptx(await FileBlob.load(starterPptxPath));
const slides = slideItems(presentation);
if (slides.length !== slideData.length) throw new Error(`Starter has ${slides.length} slides; expected ${slideData.length}`);

for (let i = 0; i < slides.length; i += 1) await editSlide(slides[i], slideData[i], i);

for (let i = 0; i < slides.length; i += 1) {
  const n = String(i + 1).padStart(2, "0");
  await writeBlob(path.join(PREVIEW_DIR, `slide-${n}.png`), await presentation.export({ slide: slides[i], format: "png", scale: 1 }));
  const layout = await slides[i].export({ format: "layout" });
  await fs.writeFile(path.join(LAYOUT_DIR, `slide-${n}.layout.json`), await layout.text(), "utf8");
}

const sourceNotes = [
  `Content source: ${coursePlan}`,
  `Design and analytical pedagogy source: ${sourceDeck}`,
  "New high-resolution image sources:",
  ...Object.values(images).map((source) => `- ${imageCredit(source)}`),
  "All classroom examples use fictional data.",
  "",
].join("\n");
await fs.writeFile(path.join(WORK_DIR, "source-notes.txt"), sourceNotes, "utf8");

const exported = await PresentationFile.exportPptx(presentation);
await exported.save(outputPptxPath);
await restoreReferenceThemes(sourceDeck, outputPptxPath);
console.log(JSON.stringify({ output: outputPptxPath, slides: slides.length }, null, 2));
