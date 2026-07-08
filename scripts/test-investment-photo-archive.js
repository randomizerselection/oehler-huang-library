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

function fail(message) {
  throw new Error(message);
}

function main() {
  const photos = loadPhotos();
  const categoryIds = new Set(archive.categories.map((category) => category.id));
  const seenKeys = new Set();
  const duplicateKeys = [];

  if (!archive.entries.length) fail("photo archive has no entries");

  for (const entry of archive.entries) {
    if (seenKeys.has(entry.key)) duplicateKeys.push(entry.key);
    seenKeys.add(entry.key);

    if (!entry.key) fail("archive entry is missing key");
    if (!categoryIds.has(entry.category)) fail(`${entry.key} has unknown category ${entry.category}`);
    if (!Array.isArray(entry.tags) || !entry.tags.length) fail(`${entry.key} needs at least one tag`);
    if (!Array.isArray(entry.uses) || !entry.uses.length) fail(`${entry.key} needs at least one slide use`);
    if (!entry.deckHint) fail(`${entry.key} needs a deck hint`);

    const photo = photos[entry.key];
    if (!photo) fail(`${entry.key} is not defined in assets/js/investment-photos.js`);
    if (!photo.src) fail(`${entry.key} has no resolved image src`);
    if (!photo.alt) fail(`${entry.key} has no alt text`);
    if (!photo.caption) fail(`${entry.key} has no caption`);
    if (!photo.credit) fail(`${entry.key} has no credit`);

    if (!/^https?:/i.test(photo.src)) {
      const localPath = path.resolve(root, "investment-analysis", photo.src);
      if (!fs.existsSync(localPath)) {
        fail(`${entry.key} image file does not exist: ${path.relative(root, localPath)}`);
      }
    }
  }

  if (duplicateKeys.length) fail(`duplicate archive keys: ${duplicateKeys.join(", ")}`);

  const uncategorised = Object.keys(photos).filter((key) => !seenKeys.has(key));
  if (uncategorised.length) {
    fail(`catalogue keys missing from archive: ${uncategorised.join(", ")}`);
  }

  console.log(`Validated ${archive.entries.length} archived investment photos across ${archive.categories.length} categories.`);
}

main();
