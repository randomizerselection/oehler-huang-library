// Package the maintained source as one portable, offline HTML file.
import fs from 'node:fs/promises';
import path from 'node:path';

const here = import.meta.dirname;
const root = path.resolve(here, '../..');
for (const [slug, filename] of [
  ['9-1-2-aggregate-demand', 'A-Level_Aggregate_Demand_Components.html'],
  ['9-1-2-investment-accelerator', 'A-Level_Investment_and_the_Accelerator.html']
]) {
const source = path.resolve(here, '../../../../apps/library/a-level/lessons', slug);
let html = await fs.readFile(path.join(source, 'index.html'), 'utf8');
html = html.replace(/<script>window\.ALEVEL_STUDENT_SELECTOR_BASE_URL\s*=\s*"\/student-selector\/";<\/script>\s*/g, '');

for (const match of [...html.matchAll(/<link rel="stylesheet" href="([^"]+)">/g)]) {
  const css = await fs.readFile(path.resolve(source, match[1]), 'utf8');
  html = html.replace(match[0], () => `<style>\n${css}\n</style>`);
}

for (const match of [...html.matchAll(/<script src="([^"]+)"><\/script>/g)]) {
  let js = await fs.readFile(path.resolve(source, match[1]), 'utf8');
  if (match[1] === 'slides.js') {
    const imagePaths = [...new Set(
      [...js.matchAll(/image:\s*["']([^"']+)["']/g)]
        .map(imageMatch => imageMatch[1])
        .filter(imagePath => imagePath.startsWith('assets/'))
    )];
    for (const imagePath of imagePaths) {
      const image = await fs.readFile(path.join(source, imagePath));
      const extension = path.extname(imagePath).toLowerCase();
      const mime = extension === '.png' ? 'image/png' : 'image/jpeg';
      const dataUri = `data:${mime};base64,${image.toString('base64')}`;
      js = js.replaceAll(`"${imagePath}"`, JSON.stringify(dataUri));
      js = js.replaceAll(`'${imagePath}'`, JSON.stringify(dataUri));
    }
  }
  html = html.replace(match[0], () => `<script>\n${js.replaceAll('</script', '<\\/script')}\n</script>`);
}

html = html.replace(
  "if(/^https?:$/.test(location.protocol)&&['127.0.0.1','localhost'].includes(location.hostname)){",
  'if(false){'
);

const output = path.join(root, 'outputs/aggregate-demand-html', filename);
await fs.mkdir(path.dirname(output), { recursive: true });
await fs.writeFile(output, html);
console.log(JSON.stringify({ output, bytes: Buffer.byteLength(html), externalDependencies: 0 }));
}
