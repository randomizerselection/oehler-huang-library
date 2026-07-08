const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const archive = require(path.join(root, "investment-analysis", "photo-archive-data.js"));

function loadPhotos() {
  const source = fs.readFileSync(path.join(root, "assets", "js", "investment-photos.js"), "utf8");
  const context = {
    window: {
      location: { pathname: "/investment-analysis/photo-archive.html" },
      INVEST: {}
    }
  };
  vm.runInNewContext(source, context, { filename: "assets/js/investment-photos.js" });
  return context.window.INVEST.photos || {};
}

function parseArgs(argv) {
  const options = {
    format: "json",
    category: "",
    lesson: "",
    use: "",
    query: ""
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--format") options.format = argv[++index] || options.format;
    else if (arg === "--category") options.category = argv[++index] || "";
    else if (arg === "--lesson") options.lesson = argv[++index] || "";
    else if (arg === "--use") options.use = argv[++index] || "";
    else if (arg === "--query") options.query = argv[++index] || "";
    else if (arg === "--help") {
      console.log([
        "Usage: node scripts/export-investment-photo-archive.js [options]",
        "",
        "Options:",
        "  --format json|md       Output format. Defaults to json.",
        "  --category <id>        Filter by archive category id.",
        "  --lesson <text>        Filter by lesson label.",
        "  --use <key>            Filter by slide-use key, such as visualPause.",
        "  --query <text>         Filter by key, label, credit, tag or caption."
      ].join("\n"));
      process.exit(0);
    }
  }

  if (!["json", "md"].includes(options.format)) {
    throw new Error(`Unsupported --format ${options.format}. Use json or md.`);
  }

  return options;
}

function resolveEntries(photos) {
  const categoryById = new Map(archive.categories.map((category) => [category.id, category]));
  return archive.entries.map((entry) => {
    const photo = photos[entry.key] || {};
    const category = categoryById.get(entry.category) || {};
    return {
      key: entry.key,
      label: photo.caption || entry.key,
      category: entry.category,
      categoryLabel: category.label || entry.category,
      lesson: entry.lesson,
      tags: entry.tags || [],
      uses: entry.uses || [],
      deckHint: entry.deckHint,
      generatorReference: `window.INVEST.photos?.${entry.key}`,
      src: photo.src || "",
      alt: photo.alt || "",
      caption: photo.caption || "",
      credit: photo.credit || "",
      source: photo.source || ""
    };
  });
}

function matches(entry, options) {
  if (options.category && entry.category !== options.category) return false;
  if (options.lesson && entry.lesson !== options.lesson) return false;
  if (options.use && !entry.uses.includes(options.use)) return false;

  const query = options.query.trim().toLowerCase();
  if (!query) return true;

  return [
    entry.key,
    entry.label,
    entry.categoryLabel,
    entry.lesson,
    entry.deckHint,
    entry.alt,
    entry.caption,
    entry.credit,
    entry.source,
    ...entry.tags,
    ...entry.uses
  ].join(" ").toLowerCase().includes(query);
}

function printMarkdown(entries) {
  const lines = [
    `# ${archive.title}`,
    "",
    `Version: ${archive.version}`,
    "",
    `Generator pattern: \`${archive.generatorPattern}\``,
    "",
    `Entries: ${entries.length}`,
    ""
  ];

  for (const entry of entries) {
    lines.push(`## ${entry.label}`);
    lines.push("");
    lines.push(`- Key: \`${entry.key}\``);
    lines.push(`- Generator reference: \`${entry.generatorReference}\``);
    lines.push(`- Category: ${entry.categoryLabel}`);
    lines.push(`- Lesson fit: ${entry.lesson}`);
    lines.push(`- Slide uses: ${entry.uses.join(", ")}`);
    lines.push(`- Tags: ${entry.tags.join(", ")}`);
    lines.push(`- Credit: ${entry.credit || "Local classroom asset"}`);
    lines.push(`- Source: ${entry.source || "Local source"}`);
    lines.push(`- Deck hint: ${entry.deckHint}`);
    lines.push("");
  }

  console.log(lines.join("\n"));
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const photos = loadPhotos();
  const entries = resolveEntries(photos).filter((entry) => matches(entry, options));

  if (options.format === "md") {
    printMarkdown(entries);
    return;
  }

  console.log(JSON.stringify({
    title: archive.title,
    version: archive.version,
    generatorPattern: archive.generatorPattern,
    categories: archive.categories,
    useCases: archive.useCases,
    entries
  }, null, 2));
}

main();
