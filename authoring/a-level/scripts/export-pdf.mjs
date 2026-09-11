// Export one completed view per source slide, with separate question/answer pages.
import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const root = path.resolve(import.meta.dirname, '../../..');
const slug = process.argv[2] || '9-1-1-multiplier';
if (!/^[a-z0-9-]+$/.test(slug)) throw Error('Use a lesson folder slug.');
const base = process.env.ALEVEL_EXPORT_BASE_URL || 'http://127.0.0.1:4173';
const output = path.join(root, 'authoring/a-level/outputs/pdf', `${slug}.pdf`);
const qa = path.join(root, 'authoring/a-level/tmp/pdf', slug);
await fs.mkdir(path.dirname(output), { recursive: true });
await fs.mkdir(qa, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: process.env.ALEVEL_EXPORT_BROWSER || 'msedge' });
try {
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${base}/a-level/lessons/${slug}/index.html`, { waitUntil: 'load' });
  await page.waitForFunction(() => Boolean(window.EconPresentation?.deck));
  await page.emulateMedia({ media: 'screen', reducedMotion: 'reduce' });
  await page.addStyleTag({ content: `
    html,body{margin:0!important;padding:0!important;width:1600px!important;height:auto!important;overflow:visible!important}
    .app-shell{display:block!important;padding:0!important;min-height:0!important;height:auto!important}
    .stage{width:1600px!important;height:900px!important;max-width:none!important;max-height:none!important;aspect-ratio:16/9!important;box-shadow:none!important;container-type:inline-size!important}
    .controls,dialog,#blankScreen,.diagram-controls,.reveal-button{display:none!important}
    /* Full-height photos must not create an inline-image baseline gap. */
    .hook-image img{display:block!important}
    *,*::before,*::after{animation:none!important;transition:none!important;-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}
    @page{size:1600px 900px;margin:0}
    .pdf-page{position:relative!important;break-inside:avoid;break-after:page;page-break-after:always}
    .pdf-page:last-child{break-after:auto;page-break-after:auto}
  ` });
  await page.evaluate(async () => {
    await document.fonts.ready;
    document.querySelectorAll('img').forEach(image => image.loading = 'eager');
    await Promise.all([...document.images].map(image => image.decode()));
  });
  const manifest = await page.evaluate(() => {
    const deck = window.EconPresentation.deck;
    const sourceStage = document.querySelector('#stage');
    const pages = [], records = [];
    function capture(slide, index, state, step) {
      const source = sourceStage.querySelector(`[data-index="${index}"]`);
      const clone = source.cloneNode(true);
      clone.hidden = false;
      // Keep the consumption and equality labels clear of both plotted lines.
      if (slide.id === 'consumption-function-graph') {
        for (const [selector, x, y] of [['.consumption-label', 630, 165], ['.equality-label', 490, 48]]) {
          const label = clone.querySelector(selector);
          label.setAttribute('x', x);
          label.setAttribute('y', y);
          label.setAttribute('text-anchor', 'end');
        }
      }
      // The final rounds curve rises through the source's y-axis heading.
      // Give that heading its own space without moving economic geometry.
      if (slide.scene?.model === 'adas' && slide.scene?.mode === 'rounds') {
        const svg = clone.querySelector('svg');
        const view = svg.viewBox.baseVal;
        svg.setAttribute('viewBox', `${view.x} ${view.y - 36} ${view.width} ${view.height + 36}`);
        svg.querySelector('.axis-title').setAttribute('y', '-10');
        // Keep pound-value labels legible where projection guides or curves
        // pass behind them, without changing their associated arrow positions.
        svg.querySelectorAll('.round-label').forEach(label => {
          label.style.paintOrder = 'stroke fill';
          label.style.stroke = 'var(--paper)';
          label.style.strokeWidth = '5px';
          label.style.strokeLinejoin = 'round';
        });
      }
      // Exported slides must never share SVG marker/title IDs. Chromium
      // otherwise resolves url(#...) against another page, losing arrowheads.
      const prefix = `pdf-${pages.length + 1}-`, idMap = new Map();
      for (const element of [clone, ...clone.querySelectorAll('[id]')]) {
        if (element.id) { idMap.set(element.id, prefix + element.id); element.id = prefix + element.id; }
      }
      for (const element of [clone, ...clone.querySelectorAll('*')]) {
        for (const attribute of [...element.attributes]) {
          let value = attribute.value;
          for (const [oldId, newId] of idMap) {
            value = value.replaceAll(`url(#${oldId})`, `url(#${newId})`);
            if (['aria-labelledby','aria-describedby'].includes(attribute.name)) value = value.split(' ').map(x => x === oldId ? newId : x).join(' ');
            if (['href','xlink:href'].includes(attribute.name) && value === `#${oldId}`) value = `#${newId}`;
          }
          if (value !== attribute.value) element.setAttribute(attribute.name, value);
        }
      }
      const folio = clone.querySelector('.folio');
      folio.textContent += state === 'answer' ? ' · Answer' : '';
      const wrapper = document.createElement('div');
      wrapper.className = 'stage pdf-page';
      wrapper.append(clone);
      pages.push(wrapper);
      records.push({ page: pages.length, slide: index + 1, id: slide.id, title: slide.title, kind: slide.kind, state, step: state === 'diagram' ? step + 1 : null, totalSteps: state === 'diagram' ? slide.scene.steps.length : null });
    }
    deck.lesson.slides.forEach((slide, index) => {
      if (slide.kind === 'diagram') {
        const step = slide.scene.steps.length - 1;
        deck.show(index, step);
        capture(slide, index, 'diagram', step);
      } else {
        deck.show(index, 0);
        deck.show(index, deck.maxStep);
        capture(slide, index, 'slide', 0);
        const current = sourceStage.querySelector(`[data-index="${index}"]`);
        const reveal = current.querySelector('[data-reveal]');
        if (reveal) { reveal.click(); capture(slide, index, 'answer', 0); }
        else if (slide.kind === 'mcq') {
          current.querySelector(`[data-option="${slide.answer}"]`).click();
          capture(slide, index, 'answer', 0);
        }
      }
    });
    document.body.replaceChildren(...pages);
    document.title = `${deck.lesson.meta.title} - student PDF`;
    return { convention: 'completed-slide-with-answer-reveals', sourceSlides: deck.lesson.slides.length, pages: records };
  });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map(image => image.decode()));
  });
  const audit = await page.evaluate(() => {
    const issues = [];
    const ids = [...document.querySelectorAll('[id]')].map(x => x.id);
    if (new Set(ids).size !== ids.length) issues.push('Duplicate IDs');
    for (const [i, wrapper] of [...document.querySelectorAll('.pdf-page')].entries()) {
      const slide = wrapper.querySelector('.slide'), bounds = slide.getBoundingClientRect();
      if (Math.abs(bounds.width - 1600) > 1 || Math.abs(bounds.height - 900) > 1) issues.push(`Page ${i + 1}: wrong slide size`);
      if (slide.scrollHeight > slide.clientHeight + 2) issues.push(`Page ${i + 1}: vertical overflow`);
      for (const element of slide.querySelectorAll('h1,h2,p,td,th,svg,img')) {
        if (!element.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) continue;
        const box = element.getBoundingClientRect();
        if (box.bottom > bounds.bottom + 2 || box.top < bounds.top - 2 || box.left < bounds.left - 2 || box.right > bounds.right + 2) issues.push(`Page ${i + 1}: ${element.tagName} outside slide`);
      }
      for (const element of slide.querySelectorAll('[marker-end]')) {
        const id = /url\(#(.+)\)/.exec(element.getAttribute('marker-end'))?.[1];
        if (id && !slide.querySelector(`[id="${id}"]`)) issues.push(`Page ${i + 1}: missing local SVG marker`);
      }
    }
    return { issues, imageCount: document.images.length, diagramPages: document.querySelectorAll('.econ-svg').length };
  });
  await fs.writeFile(path.join(qa, 'manifest.json'), JSON.stringify({ ...manifest, audit, errors }, null, 2));
  if (errors.length || audit.issues.length) throw Error(JSON.stringify({ errors, audit }, null, 2));
  await page.pdf({ path: output, width: '1600px', height: '900px', margin: { top: 0, right: 0, bottom: 0, left: 0 }, printBackground: true, preferCSSPageSize: true });
  // Browser references for independent comparison with the PDF renderer.
  for (const record of manifest.pages.filter(record => record.kind === 'diagram')) {
    // Isolate the page so long-document scrolling cannot clip the reference.
    await page.evaluate(pageNumber => {
      document.querySelectorAll('.pdf-page').forEach((wrapper, index) => {
        wrapper.hidden = index !== pageNumber - 1;
      });
      window.scrollTo(0, 0);
    }, record.page);
    await page.locator('.pdf-page').nth(record.page - 1).screenshot({ path: path.join(qa, `browser-${String(record.page).padStart(3, '0')}.png`) });
  }
  console.log(JSON.stringify({ output, sourceSlides: manifest.sourceSlides, pdfPages: manifest.pages.length, diagramPages: audit.diagramPages, qa }, null, 2));
} finally { await browser.close(); }
