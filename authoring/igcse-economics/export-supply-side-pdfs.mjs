// Classroom exports: complete each diagram once; keep attempts before feedback.
import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const root = path.resolve(import.meta.dirname, '../..');
const out = path.join(root, 'output/pdf');
const qa = path.join(root, 'tmp/pdfs/supply-side-policy');
await fs.mkdir(out, { recursive: true });
await fs.mkdir(qa, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  for (const n of process.argv.length > 2 ? process.argv.slice(2).map(Number) : [1, 2, 3, 4]) {
    if (![1, 2, 3, 4].includes(n)) throw Error('Choose lesson numbers 1–4.');
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`http://127.0.0.1:4173/lessons/unit-4-government/4-4-supply-side-policy/lesson-${n}.html`);
    await page.emulateMedia({ media: 'screen', reducedMotion: 'reduce' });
    await page.evaluate(async () => {
      await document.fonts.ready;
      document.querySelectorAll('img').forEach(img => img.loading = 'eager');
      await Promise.all([...document.images].map(img => img.decode()));
    });
    const manifest = await page.evaluate(() => {
      const specs = IGCSE.lesson.slides;
      if (specs.some(s => s.ppcTeaching?.mode === 'use' || s.visual?.mode === 'insideToOn')) throw Error('Movement diagram remains');
      window.dispatchEvent(new Event('beforeprint'));
      const pages = [], records = [];
      const feedbackSelector = '.classificationResult,.yesNoAnswer,.definitionRecallAnswer,.peerTaskSamples,.mcqExplanation';
      function capture(source, spec, index, state) {
        const clone = source.cloneNode(true);
        clone.classList.add('is-active', 'pdf-page');
        clone.querySelectorAll('.partial-item').forEach(el => { el.classList.add('is-visible'); el.setAttribute('aria-hidden', 'false'); });
        clone.querySelectorAll('.sspPpcControls,.discussionAnswerButton,.sourcePanel').forEach(el => el.remove());
        if (state === 'question') {
          clone.querySelectorAll(feedbackSelector).forEach(el => el.style.visibility = 'hidden');
          if (spec.type === 'answer' && spec.partialReview && spec.steps) clone.querySelectorAll('.steps').forEach(el => el.style.visibility = 'hidden');
        } else {
          clone.querySelectorAll('.blankAnswer').forEach(el => { el.classList.add('is-revealed'); el.setAttribute('aria-expanded', 'true'); });
          clone.querySelectorAll(feedbackSelector).forEach(el => { el.hidden = false; el.style.visibility = 'visible'; });
          clone.querySelectorAll('.choice[data-correct="true"]').forEach(el => el.classList.add('is-correct'));
          if (spec.type === 'discussion' && spec.answer) {
            const panel = document.createElement('div');
            panel.className = 'pdf-discussion-answer';
            const heading = document.createElement('h2'); heading.textContent = 'Possible answer';
            const text = document.createElement('p'); text.textContent = spec.answer;
            panel.append(heading, text);
            if (spec.answerZh || spec.zhAnswer) { const zh = document.createElement('p'); zh.textContent = spec.answerZh || spec.zhAnswer; panel.append(zh); }
            clone.append(panel);
          }
        }
        const prefix = `pdf-${pages.length + 1}-`, ids = new Map();
        for (const el of [clone, ...clone.querySelectorAll('[id]')]) if (el.id) { ids.set(el.id, prefix + el.id); el.id = prefix + el.id; }
        for (const el of [clone, ...clone.querySelectorAll('*')]) for (const attr of [...el.attributes]) {
          let value = attr.value;
          for (const [oldId, newId] of ids) value = value.replaceAll(`url(#${oldId})`, `url(#${newId})`);
          if (value !== attr.value) el.setAttribute(attr.name, value);
        }
        const folio = document.createElement('div'); folio.className = 'pdf-folio';
        folio.textContent = `Slide ${index + 1} / ${specs.length}${state === 'answer' ? ' · Answer' : ''}`;
        clone.append(folio); pages.push(clone);
        records.push({ page: pages.length, slide: index + 1, title: spec.title || spec.question, type: spec.type, state, ppc: !!spec.ppcTeaching });
      }
      [...document.querySelectorAll('#deck > .slide')].forEach((slide, index) => {
        const spec = specs[index];
        const feedback = !!slide.querySelector(`${feedbackSelector},.blankAnswer`) || (spec.type === 'discussion' && !!spec.answer) || (spec.type === 'answer' && !!spec.partialReview && !!spec.steps);
        capture(slide, spec, index, feedback ? 'question' : 'complete');
        if (feedback) capture(slide, spec, index, 'answer');
      });
      document.body.replaceChildren(...pages);
      return { sourceSlides: specs.length, pages: records };
    });
    await page.addStyleTag({ content: `
      html,body{width:1440px!important;height:auto!important;overflow:visible!important;margin:0!important;padding:0!important}
      .pdf-page{position:relative!important;inset:auto!important;display:grid!important;width:1440px!important;height:900px!important;min-height:900px!important;max-height:900px!important;break-after:page!important;page-break-after:always!important;break-inside:avoid!important;background:var(--bg-0)}
      .pdf-page:last-child{break-after:auto!important;page-break-after:auto!important}
      .pdf-folio{position:absolute!important;bottom:12px;right:30px;font:14px Arial;color:var(--muted);z-index:6!important}
      .pdf-discussion-answer{position:absolute!important;inset:330px 110px 85px;padding:30px 40px;background:#f8f7f3;color:#17242e;border-radius:12px;display:flex;flex-direction:column;justify-content:center;gap:18px;z-index:5!important}
      .pdf-page:has(.pdf-discussion-answer) .discussionContent{align-self:start!important;margin-top:20px!important}
      .pdf-page:has(.pdf-discussion-answer) .discussionPrompt p{font-size:28px!important;line-height:1.25!important;max-width:1100px!important}
      .pdf-page:has(.pdf-discussion-answer) .discussionPrompt .zh{font-size:20px!important}
      .pdf-discussion-answer h2{font-size:32px;color:#17242e}.pdf-discussion-answer p{font-size:27px;line-height:1.45;color:#17242e!important;text-shadow:none!important}
      .discussionAnswerButton,.sspPpcControls{display:none!important}
      *,*::before,*::after{animation:none!important;transition:none!important;-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}
      @page{size:1440px 900px;margin:0}
    ` });
    const audit = await page.evaluate(() => {
      const issues = [];
      for (const [i, slide] of [...document.querySelectorAll('.pdf-page')].entries()) {
        const box = slide.getBoundingClientRect();
        for (const el of slide.querySelectorAll('h1,h2,h3,p,td,th,.sspPpc,.sspPpcPanel,.flowRow,.examBlock,.modelAnswerBlock,.pdf-discussion-answer')) {
          if (!el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) continue;
          const r = el.getBoundingClientRect();
          if (r.width && (r.top < box.top - 2 || r.bottom > box.bottom + 2 || r.left < box.left - 2 || r.right > box.right + 2)) issues.push({ page: i + 1, tag: el.tagName, cls: el.className, text: el.textContent.slice(0,90) });
        }
      }
      return { issues, brokenImages: [...document.images].filter(img => !img.complete || !img.naturalWidth).length };
    });
    await fs.writeFile(path.join(qa, `lesson-${n}-manifest.json`), JSON.stringify({ ...manifest, audit, errors }, null, 2));
    if (audit.issues.length || audit.brokenImages || errors.length) throw Error(JSON.stringify({ n, audit, errors }));
    const output = path.join(out, `Supply-side policy - Lesson ${n}.pdf`);
    await page.pdf({ path: output, width: '1440px', height: '900px', printBackground: true, preferCSSPageSize: true, margin: { top:0, bottom:0, left:0, right:0 } });
    console.log(JSON.stringify({ n, output, slides: manifest.sourceSlides, pages: manifest.pages.length, audit, errors }));
    await page.close();
  }
} finally { await browser.close(); }
