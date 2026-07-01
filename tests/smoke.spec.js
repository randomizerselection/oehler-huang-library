const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { TextDecoder } = require('util');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const pageUrl = (relativePath) => pathToFileURL(path.join(root, relativePath)).toString();
const remoteUrlPattern = /^https?:\/\//i;
const deckTitleTranslations = {
  'External costs and benefits': '外部成本与外部收益',
  'Merit and demerit goods': '有益品与有害品',
  'Public goods': '公共物品',
  'Monopoly power and evaluation': '垄断力量与评价',
  'Market economic system': '市场经济体制',
  'Price mechanism': '价格机制',
  'Arguments for markets': '支持市场的论点',
  'Arguments against markets': '反对市场的论点',
  'Macroeconomic aims': '宏观经济目标',
  'Government budget and spending': '政府预算与支出',
  'Taxation foundations': '税收基础',
  'Tax structures': '税收结构',
  'Expansionary and contractionary fiscal policy': '扩张性与紧缩性财政政策',
  'Effects on macroeconomic aims': '对宏观经济目标的影响',
  'Money supply and monetary policy': '货币供应与货币政策',
  'Interest rates': '利率',
  'Money supply and exchange rates': '货币供应与汇率',
  'Effects of monetary policy': '货币政策的影响',
  'Productive capacity and total supply': '生产能力与总供给',
  'Interventionist supply-side policies': '干预型供给侧政策',
  'Market-based supply-side policies': '市场型供给侧政策',
  'Effects and evaluation': '影响与评价',
};
const hierarchyTitleTranslations = {
  section: {
    'IGCSE Economics Lesson Library': 'IGCSE经济学课程库',
  },
  units: {
    'The basic economic problem': '基本经济问题',
    'The allocation of resources': '资源配置',
    'Microeconomic decision makers': '微观经济决策者',
    'Government and the macroeconomy': '政府与宏观经济',
    'Economic development': '经济发展',
    'International trade and globalisation': '国际贸易与全球化',
  },
  topics: {
    'Market economic system and market arguments': '市场经济体制与市场论点',
    'Market failure': '市场失灵',
    'Macroeconomic aims': '宏观经济目标',
    'Fiscal policy': '财政政策',
    'Monetary policy': '货币政策',
    'Supply-side policy': '供给侧政策',
  },
};
const protectedChineseLabels = [
  '核心定义',
  '教学理念',
  '经济学核心定义',
  '复习要点',
  '待补充',
  '离堂小测',
  ...Object.values(deckTitleTranslations),
  ...Object.values(hierarchyTitleTranslations.section),
  ...Object.values(hierarchyTitleTranslations.units),
  ...Object.values(hierarchyTitleTranslations.topics),
];
const gbkDecoder = new TextDecoder('gbk');

function corruptUtf8AsGbk(value) {
  return gbkDecoder.decode(Buffer.from(value, 'utf8'));
}

function findHtmlFiles(dir, base = dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === 'node_modules' || entry.name === '.git') return [];

    const absolutePath = path.join(dir, entry.name);
    if (entry.isDirectory()) return findHtmlFiles(absolutePath, base);
    if (!entry.name.endsWith('.html')) return [];

    return [path.relative(base, absolutePath).replace(/\\/g, '/')];
  });
}

function findTextFiles(dir, base = dir) {
  const textExtensions = new Set(['.css', '.html', '.js', '.json', '.kt', '.kts', '.md', '.svg', '.txt', '.xml']);

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (['.git', '.gradle', 'build', 'node_modules', 'test-results'].includes(entry.name)) return [];
    if (entry.name === 'package-lock.json') return [];

    const absolutePath = path.join(dir, entry.name);
    if (entry.isDirectory()) return findTextFiles(absolutePath, base);
    if (!textExtensions.has(path.extname(entry.name))) return [];

    return [path.relative(base, absolutePath).replace(/\\/g, '/')];
  });
}

function findFlashcardFiles(dir, base = dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === '_template') return [];

    const absolutePath = path.join(dir, entry.name);
    if (entry.isDirectory()) return findFlashcardFiles(absolutePath, base);
    if (!/^flashcards.*\.js$/.test(entry.name)) return [];

    return [path.relative(base, absolutePath).replace(/\\/g, '/')];
  });
}

function findSlideFiles(dir, base = dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'test-results') return [];

    const absolutePath = path.join(dir, entry.name);
    if (entry.isDirectory()) return findSlideFiles(absolutePath, base);
    if (!/^slides.*\.js$/.test(entry.name)) return [];

    return [path.relative(base, absolutePath).replace(/\\/g, '/')];
  });
}

function deepProxy() {
  return new Proxy(function noop() {}, {
    get(_target, property) {
      if (property === Symbol.toPrimitive) return () => '';
      return deepProxy();
    },
    apply() {
      return deepProxy();
    }
  });
}

function readLesson(relativePath) {
  const source = fs.readFileSync(path.join(root, relativePath), 'utf8');
  const IGCSE = { photos: deepProxy(), renderVisual: () => '' };
  const context = { window: { IGCSE }, IGCSE, console };
  context.window.window = context.window;
  vm.runInNewContext(source, context, { filename: relativePath });
  return context.window.IGCSE.lesson;
}

function factPanels(slide) {
  return [
    (slide.context || slide.question || slide.fact || slide.country) ? slide : null,
    slide.facts?.left,
    slide.facts?.china,
    ...(Array.isArray(slide.facts) ? slide.facts.map((item) => typeof item === 'string' ? { fact: item } : item) : []),
  ].filter(Boolean);
}

const targetFiscalMonetarySlideFiles = [
  'lessons/unit-4-government/4-2-fiscal-policy/slides-lesson-4.js',
  'lessons/unit-4-government/4-2-fiscal-policy/slides-lesson-5.js',
  'lessons/unit-4-government/4-3-monetary-policy/slides-lesson-1.js',
  'lessons/unit-4-government/4-3-monetary-policy/slides-lesson-2.js',
  'lessons/unit-4-government/4-3-monetary-policy/slides-lesson-3.js',
  'lessons/unit-4-government/4-3-monetary-policy/slides-lesson-4.js',
];

const businessUnit5Decks = [
  {
    path: 'business/unit-5-financial-information-decisions/5-1-1-finance-needs/index.html',
    slideFile: 'business/unit-5-financial-information-decisions/5-1-1-finance-needs/slides.js',
    heading: /The need for business finance/i,
  },
  {
    path: 'business/unit-5-financial-information-decisions/5-1-2-sources-of-finance/index.html',
    slideFile: 'business/unit-5-financial-information-decisions/5-1-2-sources-of-finance/slides.js',
    heading: /Sources of finance/i,
  },
  {
    path: 'business/unit-5-financial-information-decisions/5-2-1-cash-flow-forecasts/index.html',
    slideFile: 'business/unit-5-financial-information-decisions/5-2-1-cash-flow-forecasts/slides.js',
    heading: /Cash-flow forecasts/i,
  },
];

function readFlashcards(relativePath) {
  const source = fs.readFileSync(path.join(root, relativePath), 'utf8');
  const context = { window: {} };
  context.window.IGCSE = {};
  context.IGCSE = context.window.IGCSE;
  vm.runInNewContext(source, context, { filename: relativePath });
  return context.window.IGCSE.flashcards;
}

function definitionRows() {
  const source = fs.readFileSync(path.join(root, 'references/igcse-economics-definitions-2026.md'), 'utf8');
  return [...source.matchAll(/^\|\s*([^|]*?)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*$/gm)]
    .map((match) => ({
      ref: match[1].trim(),
      term: match[2].trim(),
      definition: match[3].trim(),
    }))
    .filter((row) => row.term && row.term !== 'Term' && !/^---+$/.test(row.ref) && !/^---+$/.test(row.term));
}

function definitionTerms() {
  return new Set(definitionRows().map((row) => row.term));
}

async function expectNoHorizontalOverflow(page) {
  const metrics = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth
  }));

  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth + 1);
}

async function expectMinimumVisibleFontSize(page, rootSelector, minimum = 24) {
  const offenders = await page.evaluate(({ rootSelector, minimum }) => {
    const rootNode = document.querySelector(rootSelector);
    if (!rootNode) return [`Missing root ${rootSelector}`];

    return [rootNode, ...rootNode.querySelectorAll('*')]
      .filter((node) => {
        const text = (node.innerText || node.textContent || '').trim();
        if (!text) return false;

        const style = window.getComputedStyle(node);
        const rect = node.getBoundingClientRect();
        return style.display !== 'none'
          && style.visibility !== 'hidden'
          && rect.width > 0
          && rect.height > 0;
      })
      .map((node) => ({
        tag: node.tagName.toLowerCase(),
        className: node.className || '',
        text: (node.innerText || node.textContent || '').trim().slice(0, 60),
        size: parseFloat(window.getComputedStyle(node).fontSize)
      }))
      .filter((item) => item.size < minimum - 0.1)
      .map((item) => `${item.tag}.${String(item.className).replace(/\s+/g, '.')} ${item.size}px "${item.text}"`);
  }, { rootSelector, minimum });

  expect(offenders).toEqual([]);
}

async function expectInvestmentSlideFits(page, label = 'investment slide') {
  const metrics = await page.evaluate(() => {
    const slide = document.querySelector('.invSlide.is-active');
    const body = slide?.querySelector('.invSlideBody');
    const stage = document.querySelector('.invDeckStage');

    if (!slide || !stage) return { missing: true };

    const slideRect = slide.getBoundingClientRect();
    const stageRect = stage.getBoundingClientRect();

    return {
      missing: false,
      slideClientHeight: slide.clientHeight,
      slideScrollHeight: slide.scrollHeight,
      slideClientWidth: slide.clientWidth,
      slideScrollWidth: slide.scrollWidth,
      bodyClientHeight: body?.clientHeight || 0,
      bodyScrollHeight: body?.scrollHeight || 0,
      bodyClientWidth: body?.clientWidth || 0,
      bodyScrollWidth: body?.scrollWidth || 0,
      slideBottom: slideRect.bottom,
      stageBottom: stageRect.bottom,
      slideRight: slideRect.right,
      stageRight: stageRect.right,
    };
  });

  expect(metrics.missing, `${label}: active investment slide exists`).toBe(false);
  expect(metrics.slideScrollWidth, `${label}: slide has no horizontal clipping`).toBeLessThanOrEqual(metrics.slideClientWidth + 4);
  expect(metrics.bodyScrollWidth, `${label}: slide body has no horizontal clipping`).toBeLessThanOrEqual(metrics.bodyClientWidth + 4);
  expect(metrics.slideScrollHeight, `${label}: slide has no vertical clipping`).toBeLessThanOrEqual(metrics.slideClientHeight + 8);
  expect(metrics.bodyScrollHeight, `${label}: slide body has no vertical clipping`).toBeLessThanOrEqual(metrics.bodyClientHeight + 8);
  expect(metrics.slideBottom, `${label}: slide stays inside stage`).toBeLessThanOrEqual(metrics.stageBottom + 2);
  expect(metrics.slideRight, `${label}: slide stays inside stage horizontally`).toBeLessThanOrEqual(metrics.stageRight + 2);
}

const investmentTeachingTextSelector = [
  '.invSlideHeader h1',
  '.invSlideHeader h2',
  '.invVisualPauseText h1',
  '.invLead',
  '.invHeroKicker',
  '.invZhTitle',
  '.invBigQuestion',
  '.invPromptZh',
  '.invObjective strong',
  '.invObjectiveZh',
  '.invSectionNumber',
  '.invSectionList span',
  '.invTermWord',
  '.invTermDefinition',
  '.invTermZh',
  '.invTermNote strong',
  '.invTermNote p',
  '.invCheckItem',
  '.invCheckNumber',
  '.invCheckItem .invZhLine',
  '.invStepNum',
  '.invStep strong',
  '.invStep .invZhLine',
  '.invChoice',
  '.invQuizFeedback',
  '.invMetric strong',
  '.invMetricValue',
  '.invTicker',
  '.invTickerStrip span',
  '.invDataFocusCard span',
  '.invDataFocusCard strong',
  '.invDataPrompt h2',
  '.invDataPrompt p',
  '.invDataTask strong',
  '.invDataTask span',
  '.invEvidence strong',
  '.invEvidence p',
  '.invRiskItem strong',
  '.invRiskItem p',
  '.invFormula',
  '.invWorked',
  '.invTryIt',
  '.invExamBox h3',
  '.invKeyword',
  '.invModelCue strong',
  '.invModelCue span',
  '.invModelParas p'
].join(',');

async function expectInvestmentTeachingTextAtLeast(page, minimumPx, label = 'investment slide') {
  const offenders = await page.evaluate(({ minimumPx, selector }) => {
    const slide = document.querySelector('.invSlide.is-active');
    if (!slide) return ['missing active slide'];

    return [...slide.querySelectorAll(selector)]
      .filter((node) => {
        const text = (node.innerText || node.textContent || '').trim();
        if (!text) return false;
        const style = window.getComputedStyle(node);
        if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) return false;
        const rect = node.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      })
      .map((node) => {
        const style = window.getComputedStyle(node);
        return {
          tag: node.tagName.toLowerCase(),
          className: node.className || '',
          text: (node.innerText || node.textContent || '').trim().slice(0, 80),
          size: parseFloat(style.fontSize),
        };
      })
      .filter((item) => item.size < minimumPx - 0.1)
      .map((item) => `${item.tag}.${String(item.className).replace(/\s+/g, '.')} ${item.size}px "${item.text}"`);
  }, { minimumPx, selector: investmentTeachingTextSelector });

  expect(offenders, `${label}: teaching text is at least ${minimumPx}px`).toEqual([]);
}

async function expectInvestmentCompactTeachingScale(page, label = 'investment slide') {
  const offenders = await page.evaluate(({ selector }) => {
    const slide = document.querySelector('.invSlide.is-active');
    if (!slide) return ['missing active slide'];

    const allowedSizes = [32, 48];
    return [...slide.querySelectorAll(selector)]
      .filter((node) => {
        const text = (node.innerText || node.textContent || '').trim();
        if (!text) return false;
        const style = window.getComputedStyle(node);
        if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) return false;
        const rect = node.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      })
      .map((node) => {
        const style = window.getComputedStyle(node);
        return {
          tag: node.tagName.toLowerCase(),
          className: node.className || '',
          text: (node.innerText || node.textContent || '').trim().slice(0, 80),
          size: parseFloat(style.fontSize),
          family: style.fontFamily,
        };
      })
      .filter((item) => {
        const usesAllowedSize = allowedSizes.some((size) => Math.abs(item.size - size) <= 0.5);
        const usesMonoTeachingFont = /Cascadia|Consolas|Mono/i.test(item.family);
        return !usesAllowedSize || usesMonoTeachingFont;
      })
      .map((item) => `${item.tag}.${String(item.className).replace(/\s+/g, '.')} ${item.size}px ${item.family} "${item.text}"`);
  }, { selector: investmentTeachingTextSelector });

  expect(offenders, `${label}: teaching text uses only the 32px/48px classroom scale`).toEqual([]);
}

async function expectInvestmentNoUltraBold(page, label = 'investment slide') {
  const offenders = await page.evaluate(() => {
    const slide = document.querySelector('.invSlide.is-active');
    if (!slide) return ['missing active slide'];

    return [...slide.querySelectorAll('*')]
      .filter((node) => {
        const text = (node.innerText || node.textContent || '').trim();
        if (!text) return false;
        const style = window.getComputedStyle(node);
        if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) return false;
        const rect = node.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      })
      .map((node) => {
        const style = window.getComputedStyle(node);
        return {
          tag: node.tagName.toLowerCase(),
          className: node.className || '',
          text: (node.innerText || node.textContent || '').trim().slice(0, 80),
          weight: parseInt(style.fontWeight, 10),
        };
      })
      .filter((item) => Number.isFinite(item.weight) && item.weight > 700)
      .map((item) => `${item.tag}.${String(item.className).replace(/\s+/g, '.')} ${item.weight} "${item.text}"`);
  });

  expect(offenders, `${label}: visible slide text avoids ultra-bold weights`).toEqual([]);
}

async function expectInvestmentBlankVisualState(page, label = 'investment blank') {
  const state = await page.locator('.invSlide.is-active .blank').first().evaluate((blank) => {
    const style = window.getComputedStyle(blank);
    const rect = blank.getBoundingClientRect();
    const container = blank.closest('.invCheckText, .invTermDefinition, .invStep strong, .invBigQuestion, .invPanel') || blank.parentElement;
    const text = (blank.textContent || '').trim();
    return {
      answer: blank.getAttribute('data-answer') || text,
      className: blank.className,
      display: style.display,
      width: rect.width,
      parentWidth: container?.getBoundingClientRect().width || rect.width,
      height: rect.height,
      borderBottomWidth: parseFloat(style.borderBottomWidth),
      borderBottomColor: style.borderBottomColor,
      backgroundImage: style.backgroundImage,
      backgroundColor: style.backgroundColor,
      color: style.color,
    };
  });

  expect(state.answer, `${label}: answer metadata exists`).not.toHaveLength(0);
  expect(state.display, `${label}: blank slot keeps grid display before reveal`).toMatch(/grid/);
  expect(state.width, `${label}: blank slot is visibly wide`).toBeGreaterThanOrEqual(58);
  expect(state.width, `${label}: blank slot does not expand across the line before reveal`).toBeLessThan(state.parentWidth * 0.8);
  expect(state.height, `${label}: blank slot has visible height`).toBeGreaterThan(20);
  expect(state.borderBottomWidth, `${label}: blank has a clear underline`).toBeGreaterThanOrEqual(3);
  expect(`${state.backgroundImage} ${state.backgroundColor}`, `${label}: blank has a visible fill`).not.toMatch(/none rgba\(0, 0, 0, 0\)/);
}

async function expectInvestmentBlankRevealedVisualState(page, label = 'investment blank') {
  const state = await page.locator('.invSlide.is-active .blank').first().evaluate((blank) => {
    const style = window.getComputedStyle(blank);
    const rect = blank.getBoundingClientRect();
    const container = blank.closest('.invCheckText, .invTermDefinition, .invStep strong, .invBigQuestion, .invPanel') || blank.parentElement;
    return {
      text: (blank.textContent || '').trim(),
      display: style.display,
      width: rect.width,
      parentWidth: container?.getBoundingClientRect().width || rect.width,
      color: style.color,
      borderBottomColor: style.borderBottomColor,
    };
  });

  expect(state.text, `${label}: revealed answer text exists`).not.toHaveLength(0);
  expect(state.display, `${label}: revealed blank keeps grid display`).toMatch(/grid/);
  expect(state.width, `${label}: revealed blank does not expand across the line`).toBeLessThan(state.parentWidth * 0.8);
  expect(state.color, `${label}: revealed answer is visibly colored`).not.toMatch(/rgba?\(0, 0, 0(, 0)?\)/);
  expect(state.borderBottomColor, `${label}: revealed underline remains visible`).not.toMatch(/rgba?\(0, 0, 0(, 0)?\)/);
}

async function expectInvestmentAllBlanksInline(page, label = 'investment blanks') {
  const states = await page.evaluate(() => [...document.querySelectorAll('.invSlide.is-active .blank')]
    .map((blank) => {
      const style = window.getComputedStyle(blank);
      const rect = blank.getBoundingClientRect();
      const container = blank.closest('.invCheckText, .invTermDefinition, .invStep strong, .invBigQuestion, .invPanel') || blank.parentElement;

      return {
        text: (blank.textContent || '').trim(),
        className: blank.className,
        display: style.display,
        width: rect.width,
        containerWidth: container?.getBoundingClientRect().width || rect.width,
      };
    }));

  expect(states.length, `${label}: slide has blanks`).toBeGreaterThan(0);
  expect(
    states.filter((state) => !/grid/.test(state.display)),
    `${label}: every blank keeps grid display instead of becoming block-level`
  ).toEqual([]);
  expect(
    states.filter((state) => state.width >= state.containerWidth * 0.8),
    `${label}: no blank expands across its text container`
  ).toEqual([]);
}

async function findInvestmentSlideNumber(page, match) {
  return page.evaluate(({ title, type, occurrence = 1 }) => {
    let seen = 0;
    const slides = window.INVEST?.lesson?.slides || [];

    for (let index = 0; index < slides.length; index += 1) {
      const slide = slides[index];
      if (title && slide.title !== title) continue;
      if (type && slide.type !== type) continue;
      seen += 1;
      if (seen === occurrence) return index + 1;
    }

    return 0;
  }, match);
}

async function goToInvestmentSlide(page, match) {
  const slideNumber = await findInvestmentSlideNumber(page, match);
  expect(slideNumber, `investment slide exists: ${match.type || '*'} ${match.title || ''}`).toBeGreaterThan(0);
  await page.goto(pageUrl('investment-analysis/unit-1/lesson-1/index.html') + `#${slideNumber}`);
  await expect(page.locator('.invSlide.is-active')).toHaveAttribute('data-idx', String(slideNumber - 1));
  await page.evaluate(() => document.querySelectorAll('.sourceList[open]').forEach((node) => node.removeAttribute('open')));
  return slideNumber;
}

function expectColorNotNearWhite(color) {
  const channels = String(color).match(/[\d.]+/g)?.slice(0, 3).map(Number);
  expect(channels, `Could not parse CSS colour ${color}`).toHaveLength(3);
  expect(Math.max(...channels), `Text colour ${color} is too close to white for the Business light theme`).toBeLessThan(245);
}

async function expectTextNotNearWhite(page, selector) {
  const target = page.locator(selector).first();
  await expect(target).toBeVisible();
  const color = await target.evaluate((node) => getComputedStyle(node).color);
  expectColorNotNearWhite(color);
}

async function expectCompactCardGridFits(page, options = {}) {
  await expect(page.locator('.slide.is-active .cardgrid.is-compactVisual')).toBeVisible();
  await expect(page.locator('.slide.is-active .cardTitleZh').first()).toBeVisible();

  const layout = await page.evaluate(() => {
    const slide = document.querySelector('.slide.is-active');
    const grid = slide?.querySelector('.cardgrid.is-compactVisual');
    const gridRect = grid?.getBoundingClientRect();

    return {
      grid: gridRect ? {
        left: gridRect.left,
        right: gridRect.right,
        width: gridRect.width,
        scrollWidth: grid.scrollWidth,
      } : null,
      cards: [...(grid?.querySelectorAll('.card') || [])].map((card) => {
        const cardRect = card.getBoundingClientRect();
        const titleRect = card.querySelector('.cardTitle')?.getBoundingClientRect();
        const zhRect = card.querySelector('.cardTitleZh')?.getBoundingClientRect();

        return {
          cardLeft: cardRect.left,
          cardRight: cardRect.right,
          titleLeft: titleRect?.left ?? 0,
          titleRight: titleRect?.right ?? 0,
          zhLeft: zhRect?.left ?? 0,
          zhRight: zhRect?.right ?? 0,
          hasZh: Boolean(zhRect),
        };
      }),
      rows: [...new Set([...(grid?.querySelectorAll('.card') || [])]
        .map((card) => Math.round(card.getBoundingClientRect().top)))].length,
    };
  });

  expect(layout.grid).not.toBeNull();
  expect(layout.grid.scrollWidth).toBeLessThanOrEqual(layout.grid.width + 1);
  if (options.rows) expect(layout.rows).toBe(options.rows);

  for (const card of layout.cards) {
    expect(card.hasZh).toBe(true);
    expect(card.titleLeft).toBeGreaterThanOrEqual(card.cardLeft - 1);
    expect(card.titleRight).toBeLessThanOrEqual(card.cardRight + 1);
    expect(card.zhLeft).toBeGreaterThanOrEqual(card.cardLeft - 1);
    expect(card.zhRight).toBeLessThanOrEqual(card.cardRight + 1);
  }
}

async function expectLessonModeTabs(page, activeMode) {
  const tabs = page.locator('.lessonModeTabs');
  await expect(tabs.getByRole('link', { name: /^Slides$/i })).toBeVisible();
  await expect(tabs.getByRole('link', { name: /^Handout$/i })).toBeVisible();
  await expect(tabs.getByRole('link', { name: /^Quiz$/i })).toBeVisible();
  await expect(tabs.getByRole('link', { name: /^Flashcards$/i })).toBeVisible();
  await expect(tabs.getByRole('link', { name: new RegExp(`^${activeMode}$`, 'i') })).toHaveAttribute('aria-current', 'page');
}

async function expectLessonModeTabsOnly(page, activeMode, labels) {
  const tabs = page.locator('.lessonModeTabs');
  for (const label of labels) {
    await expect(tabs.getByRole('link', { name: new RegExp(`^${label}$`, 'i') })).toBeVisible();
  }
  await expect(tabs.getByRole('link')).toHaveText(labels);
  await expect(tabs.getByRole('link', { name: new RegExp(`^${activeMode}$`, 'i') })).toHaveAttribute('aria-current', 'page');
}

async function openLessonModeMenu(page) {
  await page.locator('.lessonModeMenuButton').click();
}

async function expectNoRemoteImageAssets(page) {
  const remoteAssets = await page.evaluate(() => {
    const isRemote = (value) => /(^|,\s*)https?:\/\//i.test(String(value || ''));
    const assets = [];

    document.querySelectorAll('img, source').forEach((node) => {
      ['currentSrc', 'src', 'srcset'].forEach((attr) => {
        const value = node[attr] || node.getAttribute(attr);
        if (isRemote(value)) assets.push(value);
      });
    });

    document.querySelectorAll('*').forEach((node) => {
      const backgroundImage = window.getComputedStyle(node).backgroundImage;
      if (/url\(["']?https?:\/\//i.test(backgroundImage)) assets.push(backgroundImage);
    });

    return assets;
  });

  expect(remoteAssets).toEqual([]);
}

function loadPhotoCatalogue() {
  const source = fs.readFileSync(path.join(root, 'assets/js/photos.js'), 'utf8');
  const context = { window: {} };
  context.window.IGCSE = {};
  context.IGCSE = context.window.IGCSE;
  vm.runInNewContext(source, context, { filename: 'assets/js/photos.js' });
  return context.window.IGCSE.photos;
}

function flattenPhotoCatalogue(catalogue) {
  return Object.entries(catalogue).flatMap(([namespace, photos]) =>
    Object.entries(photos).map(([key, photo]) => ({ namespace, key, photo }))
  );
}

async function fillPerfectMacroeconomicAimsQuiz(page) {
  await page.locator('.quizQuestion').nth(0).getByLabel('The whole economy').check();
  await page.locator('.quizQuestion').nth(1).getByLabel('Answer').fill('real GDP');
  await page.locator('.quizQuestion').nth(2).getByLabel('Stable prices').check();
  await page.locator('.quizQuestion').nth(3).getByLabel('Answer').fill('employment');
  await page.locator('.quizQuestion').nth(4).getByLabel('Balance of payments stability').check();
  await page.locator('.quizQuestion').nth(5).getByLabel('Answer').fill('income');
  await page.locator('.quizQuestion').nth(6).getByLabel('More output may use more resources and create more pollution.').check();
  await page.locator('.quizQuestion').nth(7).getByLabel('Answer').fill('payments');
}

test.describe('site smoke', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('https://hm.baidu.com/**', (route) => route.abort());
    await page.route('https://oehlerhuang.com/', async (route) => {
      if (route.request().method() === 'POST') {
        await route.fulfill({ status: 200, body: 'ok' });
        return;
      }

      await route.continue();
    });
  });

  test('@smoke home page exposes the primary learning paths', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name.includes('phone'), 'Covered by the dedicated responsive smoke test.');

    await page.goto(pageUrl('index.html'));

    await expect(page.getByRole('heading', { name: /Oehler-Huang Library/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /^Key definitions \/ 核心定义$/i })).toHaveAttribute('href', 'definitions.html');
    await expect(page.getByRole('heading', { name: /^Investment Analysis$/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /^Course home$/i })).toHaveAttribute('href', 'investment-analysis/index.html');
    await expect(page.getByRole('link', { name: /^30-lesson map$/i })).toHaveAttribute('href', 'investment-analysis/syllabus.html');
    await expect(page.getByRole('link', { name: /^Start Lesson 1$/i })).toHaveAttribute('href', 'investment-analysis/unit-1/lesson-1/index.html');
    await expect(page.getByRole('link', { name: /Slide view/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /Handout view/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /^Quiz$/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /^Flashcards$/i }).first()).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });

  test('@smoke editable site text does not contain protected Chinese mojibake', () => {
    const signatures = new Set(
      protectedChineseLabels
        .flatMap((label) => label.match(/\p{Script=Han}+/gu) || [])
        .map((label) => corruptUtf8AsGbk(label))
        .filter((signature) => signature && !signature.includes('\uFFFD'))
    );
    const failures = [];

    for (const file of findTextFiles(root, root)) {
      const source = fs.readFileSync(path.join(root, file), 'utf8');
      for (const signature of signatures) {
        if (source.includes(signature)) failures.push(`${file}: ${signature}`);
      }
    }

    expect(failures).toEqual([]);
  });

  test('@smoke definitions page opens and filters cards', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name.includes('phone'), 'Covered by the dedicated responsive smoke test.');

    await page.goto(pageUrl('definitions.html'));

    await expect(page.getByRole('heading', { name: /^Key Definitions$/i })).toBeVisible();
    await expect(page.locator('.definition-card').first()).toBeVisible();

    await page.getByRole('searchbox', { name: /Search definitions/i }).fill('Market failure');
    await expect(page.locator('.definition-card').filter({ has: page.getByRole('heading', { name: 'Market failure', exact: true }) })).toBeVisible();
    await expect(page.locator('.definition-card').filter({ has: page.getByRole('heading', { name: 'Opportunity cost', exact: true }) })).toBeHidden();
    await expectNoHorizontalOverflow(page);
  });

  test('@smoke representative lesson views load', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name.includes('phone'), 'Covered by the dedicated responsive smoke test.');

    const lessonPath = 'lessons/unit-4-government/4-1-macroeconomic-aims/index.html';

    await page.goto(pageUrl(lessonPath));
    await expect(page.locator('.slide.is-active')).toBeVisible();
    await expectLessonModeTabs(page, 'Slides');

    await page.goto(pageUrl(lessonPath) + '?view=print');
    await expect(page.locator('.handoutDocument')).toBeVisible();
    await expectLessonModeTabs(page, 'Handout');

    await page.goto(pageUrl(lessonPath) + '?view=quiz');
    await expect(page.locator('.quizDeck')).toBeVisible();
    await expect(page.locator('.quizQuestion')).toHaveCount(8);
    await expectLessonModeTabs(page, 'Quiz');

    await page.goto(pageUrl(lessonPath) + '?view=flashcards');
    await expect(page.locator('.flashcardDeck')).toBeVisible();
    await expect(page.locator('.flashcardPosition')).toHaveText('8 left');
    await expectLessonModeTabs(page, 'Flashcards');
    await expectNoHorizontalOverflow(page);
  });

  test('@responsive phone layout keeps core pages usable', async ({ page }, testInfo) => {
    test.skip(!testInfo.project.name.includes('phone'), 'Responsive smoke is phone-only.');

    await page.goto(pageUrl('index.html'));
    await expect(page.getByRole('heading', { name: /Oehler-Huang Library/i })).toBeVisible();
    await expectNoHorizontalOverflow(page);

    await page.goto(pageUrl('lessons/unit-4-government/4-1-macroeconomic-aims/index.html'));
    await expect(page.locator('.slide.is-active')).toBeVisible();
    await expect(page.getByRole('button', { name: /^Student selector$/i })).toBeHidden();
    await expect(page.locator('.lessonModeMenu')).toBeHidden();
    await expectNoHorizontalOverflow(page);
  });

  test('landing page renders at desktop and phone widths', async ({ page }) => {
    await page.goto(pageUrl('index.html'));

    await expect(page.getByRole('heading', { name: /Oehler-Huang Library/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /^Review lessons$/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /^Investment Analysis$/i })).toHaveAttribute('href', 'investment-analysis/index.html');
    await expect(page.getByText(/A separate Grade 9 course/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /^Course home$/i })).toHaveAttribute('href', 'investment-analysis/index.html');
    await expect(page.getByRole('link', { name: /^30-lesson map$/i })).toHaveAttribute('href', 'investment-analysis/syllabus.html');
    await expect(page.getByRole('link', { name: /^Start Lesson 1$/i })).toHaveAttribute('href', 'investment-analysis/unit-1/lesson-1/index.html');
    await expect(page.getByRole('link', { name: /Business 0264/i })).toHaveCount(0);
    await expect(page.locator('a[href^="business/"]')).toHaveCount(0);
    await expect(page.getByRole('link', { name: /^Key definitions \/ 核心定义$/i })).toHaveAttribute('href', 'definitions.html');
    await expect(page.getByRole('link', { name: /Teaching philosophy \/ 教学理念/i }).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: /^IGCSE Economics Lesson Library$/i })).toBeVisible();
    await expect(page.getByRole('img', { name: /Samuel Oehler-Huang/i })).toBeVisible();
    await expect(page.getByText(/Economics teacher, Suzhou Foreign Language School/i)).toBeVisible();
    await expect(page.getByText(/Not endorsed by Cambridge International Education/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /Slide view/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /Handout view/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /^Quiz$/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /^Flashcards$/i }).first()).toBeVisible();
    await expect(page.locator('.section-title-zh')).toHaveText(hierarchyTitleTranslations.section['IGCSE Economics Lesson Library']);

    for (const [title, translation] of Object.entries(hierarchyTitleTranslations.units)) {
      const unit = page.locator('.unit-summary').filter({ has: page.getByRole('heading', { name: title }) });
      await expect(unit.locator('.unit-title-zh')).toHaveText(translation);
    }

    for (const [title, translation] of Object.entries(hierarchyTitleTranslations.topics)) {
      const topic = page.locator('.topic-copy').filter({ has: page.getByRole('heading', { name: title, level: 4 }) });
      await expect(topic.locator('.topic-title-zh')).toHaveText(translation);
    }

    const macroLessonCard = page.locator('.lesson-card').filter({ hasText: /4\.1\.1/i });
    await expect(macroLessonCard.getByRole('heading', { name: /Macroeconomic aims/i })).toBeVisible();
    await expect(macroLessonCard.locator('.deck-title-zh')).toHaveText(deckTitleTranslations['Macroeconomic aims']);

    for (const translation of Object.values(deckTitleTranslations)) {
      await expect(page.locator('.lesson-card .deck-title-zh', { hasText: translation }).first()).toBeVisible();
    }

    await expect(page.getByRole('link', { name: /Slide view/i })).toHaveCount(24);
    await expect(page.getByRole('link', { name: /Handout view/i })).toHaveCount(24);
    await expect(page.getByRole('link', { name: /^Quiz$/i })).toHaveCount(22);
    await expect(page.getByRole('link', { name: /^Flashcards$/i })).toHaveCount(22);
    await expect(page.getByRole('link', { name: /Handout view/i }).first()).toHaveAttribute('href', /view=print/);
    await expect(page.getByRole('link', { name: /^Quiz$/i }).first()).toHaveAttribute('href', /view=quiz/);
    await expect(page.getByRole('link', { name: /^Flashcards$/i }).first()).toHaveAttribute('href', /view=flashcards/);

    await expectNoHorizontalOverflow(page);

    const macroHeadingBox = await page
      .locator('.lesson-card')
      .filter({ hasText: /4\.1\.1/i })
      .getByRole('heading', { name: /Macroeconomic aims/i })
      .boundingBox();
    const viewport = page.viewportSize();

    expect(macroHeadingBox).not.toBeNull();
    expect(macroHeadingBox.x).toBeGreaterThanOrEqual(0);
    expect(macroHeadingBox.x + macroHeadingBox.width).toBeLessThanOrEqual(viewport.width + 1);
  });

  test('@smoke investment course page and lesson interactions work', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    test.skip(testInfo.project.name.includes('phone'), 'Phone coverage is handled by the responsive investment test.');

    await page.goto(pageUrl('investment-analysis/index.html'));
    await expect(page.getByRole('heading', { name: /^Investment Analysis$/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /^30-lesson map$/i }).first()).toHaveAttribute('href', 'syllabus.html');
    await expect(page.getByRole('link', { name: /^Start Lesson 1$/i }).first()).toHaveAttribute('href', 'unit-1/lesson-1/index.html');
    await expect(page.getByRole('link', { name: /^Lesson 1 quiz$/i }).first()).toHaveAttribute('href', 'unit-1/lesson-1/index.html?view=quiz');
    await expect(page.getByText(/What you will learn/i)).toBeVisible();
    await expect(page.getByText(/Read a share/i)).toBeVisible();
    await expect(page.getByText(/30-lesson course map/i)).toBeVisible();
    await expectNoHorizontalOverflow(page);

    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(pageUrl('investment-analysis/unit-1/lesson-1/index.html'));
    await expect(page.locator('body')).toHaveClass(/investment-deck/);
    await expect(page.locator('.invSlide.is-active')).toHaveAttribute('data-idx', '0');
    await expect(page.locator('.invCounter')).toHaveText('1 / 43');
    await expect(page.locator('.invSlide.is-active')).toContainText(/Lesson overview/i);
    await expect(page.getByRole('heading', { name: /^What is a share\?$/i })).toBeVisible();
    await expect(page.locator('.invSlide.is-active')).toHaveAttribute('style', /trading-desk-laptops-2025\.jpg/);
    await expectInvestmentSlideFits(page, 'hero slide desktop');
    const investmentPhotoRefCount = await page.evaluate(() =>
      document.querySelectorAll('img[src*="assets/images/investment-analysis/"], [style*="assets/images/investment-analysis/"]').length
    );
    expect(investmentPhotoRefCount).toBeGreaterThanOrEqual(20);
    const completePhotoMetadataCount = await page.evaluate(() =>
      Object.values(window.INVEST.photos || {}).filter((photo) =>
        photo.src && photo.alt && photo.caption && photo.credit && photo.source
      ).length
    );
    expect(completePhotoMetadataCount).toBeGreaterThanOrEqual(20);
    const investmentVisualChecks = await page.evaluate(() => {
      const slides = window.INVEST?.lesson?.slides || [];
      const slideVisualFiles = slides.map((slide) => slide.visual?.src || '').filter(Boolean);
      const requiredModernFiles = [
        'trading-desk-laptops-2025.jpg',
        'smartphone-market-chart-2025.jpg',
        'tablet-financial-chart-2026.jpg',
        'investor-chart-screens-2026.jpg',
        'financial-analysis-desk-2024.jpg',
        'tencent-binhai-towers-2023.jpg',
        'business-charts-paper-2021.jpg',
        'finance-chart-whiteboard-2021.jpg',
        'stock-report-calculator-2021.jpg',
        'investor-meeting-report-2021.jpg'
      ];

      return {
        visualPauseCount: slides.filter((slide) => slide.type === 'visualPause').length,
        hasOldStockCertificate: slideVisualFiles.some((src) => /stock-certificate\.jpg/i.test(src)),
        missingModernFiles: requiredModernFiles.filter((file) => !slideVisualFiles.some((src) => src.includes(file)))
      };
    });
    expect(investmentVisualChecks.visualPauseCount).toBeGreaterThanOrEqual(10);
    expect(investmentVisualChecks.hasOldStockCertificate).toBe(false);
    expect(investmentVisualChecks.missingModernFiles).toEqual([]);
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('.invSlide.is-active')).toHaveAttribute('data-idx', '1');
    await expect(page.getByRole('heading', { name: /What do you own when you buy one share/i })).toBeVisible();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('.invSlide.is-active')).toHaveAttribute('data-idx', '2');
    await expect(page.getByRole('heading', { name: /Why not just keep money as cash/i })).toBeVisible();
    await expect(page.locator('.invSlide.is-active .invBigQuestion')).toContainText(/why might someone still choose to invest/i);
    await expectInvestmentSlideFits(page, 'why invest foundation slide');

    await goToInvestmentSlide(page, { type: 'flow', title: 'Saving, investing, speculating, trading' });
    await expect(page.locator('.invSlide.is-active .invStep')).toHaveCount(4);
    await expect(page.locator('.invSlide.is-active')).toContainText(/expected return and risk/i);
    await expectInvestmentSlideFits(page, 'saving investing flow slide');

    await goToInvestmentSlide(page, { type: 'peerTask', title: 'Sort the money decision' });
    await expect(page.locator('.invSlide.is-active')).toContainText(/saving, investing, speculating or trading/i);
    await expect(page.locator('.invSlide.is-active')).toContainText(/D: buy and sell/i);
    await expectInvestmentSlideFits(page, 'money decision sort slide');

    await goToInvestmentSlide(page, { type: 'quiz', title: 'Investing or speculating?' });
    await expect(page.locator('.invSlide.is-active .invQuizFeedback')).toBeHidden();
    await page.locator('.invSlide.is-active .invChoice').nth(1).click();
    await expect(page.locator('.invSlide.is-active .invQuizFeedback')).toBeVisible();
    await expect(page.locator('.invSlide.is-active .invChoice').nth(1)).toHaveClass(/is-correct/);
    await expectInvestmentSlideFits(page, 'investing or speculating quiz slide');

    await goToInvestmentSlide(page, { type: 'discussion', title: 'One share, one claim' });
    await expect(page.locator('.invSlide.is-active .invBigQuestion')).toContainText(/A student owns one Tencent share/i);
    await expect(page.locator('.invSlide.is-active img[src*="investment-analysis/"]')).toHaveCount(0);
    await expectNoHorizontalOverflow(page);

    await goToInvestmentSlide(page, { type: 'term', title: 'Share' });
    await expect(page.locator('.invSlide.is-active .invTitleBlock h1')).toHaveCount(0);
    await expect(page.locator('.invSlide.is-active .invTermWord')).toHaveText('Share');
    await expectInvestmentTeachingTextAtLeast(page, 32, 'term definition slide classroom');
    await expectInvestmentNoUltraBold(page, 'term definition slide');
    await expect(page.locator('.invSlide.is-active .blank').first()).not.toHaveClass(/is-revealed/);
    await expectInvestmentBlankVisualState(page, 'term definition blank');
    await page.keyboard.press('Space');
    await expect(page.locator('.invSlide.is-active .invTermWord')).toHaveText('Share');
    await expect(page.locator('.invSlide.is-active .blank').first()).toHaveClass(/is-revealed/);
    await expectInvestmentBlankRevealedVisualState(page, 'term definition revealed blank');

    await page.locator('.invSlide.is-active .sourceList summary').click();
    await expect(page.locator('.invSlide.is-active .invTermWord')).toHaveText('Share');
    await expect(page.locator('.invSlide.is-active .sourceList')).toHaveAttribute('open', '');
    await expect(page.locator('.invSlide.is-active .sourcePanel')).toContainText(/Tencent investor relations/i);

    await goToInvestmentSlide(page, { type: 'answer', title: 'Fill in the blanks', occurrence: 1 });
    await expect(page.locator('.invSlide.is-active .blank').first()).not.toHaveClass(/is-revealed/);
    await expectInvestmentBlankVisualState(page, 'fill blanks slide 8 blank');
    await page.keyboard.press('Space');
    await expect(page.locator('.invSlide.is-active .blank').first()).toBeVisible();
    await expect(page.locator('.invSlide.is-active .blank').first()).toHaveClass(/is-revealed/);
    await expectInvestmentBlankRevealedVisualState(page, 'fill blanks slide 8 revealed blank');

    await page.keyboard.press('N');
    await expect(page.locator('.invNotes')).toBeVisible();
    await page.keyboard.press('N');
    await expect(page.locator('.invNotes')).toBeHidden();

    await goToInvestmentSlide(page, { type: 'quiz', title: 'Share or shareholder?' });
    await expectInvestmentSlideFits(page, 'quiz slide desktop');
    await expect(page.locator('.invSlide.is-active .invQuizFeedback')).toBeHidden();
    await page.locator('.invSlide.is-active .invChoice').nth(1).click();
    await expect(page.locator('.invSlide.is-active .invQuizFeedback')).toBeVisible();
    await expect(page.locator('.invSlide.is-active .invChoice').nth(1)).toHaveClass(/is-correct/);

    await page.setViewportSize({ width: 1366, height: 768 });
    await goToInvestmentSlide(page, { type: 'answer', title: 'Fill in the blanks', occurrence: 3 });
    await expectInvestmentTeachingTextAtLeast(page, 32, 'fill blanks classroom');
    await expectInvestmentNoUltraBold(page, 'fill blanks classroom');
    await expectInvestmentBlankVisualState(page, 'fill blanks classroom blank');
    await expectInvestmentSlideFits(page, 'fill blanks classroom');
    const fillBlankSize = await page.locator('.invSlide.is-active .invCheckItem').first().evaluate((node) =>
      parseFloat(window.getComputedStyle(node).fontSize)
    );

    await goToInvestmentSlide(page, { type: 'flow', title: 'Why share prices move' });
    await expectInvestmentTeachingTextAtLeast(page, 32, 'why share prices move classroom');
    await expectInvestmentNoUltraBold(page, 'why share prices move classroom');
    await expectInvestmentSlideFits(page, 'why share prices move classroom');
    const flowTextSize = await page.locator('.invSlide.is-active .invStep strong').first().evaluate((node) =>
      parseFloat(window.getComputedStyle(node).fontSize)
    );
    expect(Math.abs(fillBlankSize - flowTextSize), 'fill blanks and flow slides use the same classroom task size').toBeLessThanOrEqual(1);

    const blankSlideNumbers = await page.evaluate(() => (window.INVEST.lesson.slides || [])
      .map((slide, index) => ({ slide, slideNumber: index + 1 }))
      .filter(({ slide }) => slide.mode === 'fillBlanks' || /class="blank/.test(slide.definition || ''))
      .map(({ slideNumber }) => slideNumber));

    for (const slideNumber of blankSlideNumbers) {
      await page.goto(pageUrl('investment-analysis/unit-1/lesson-1/index.html') + `#${slideNumber}`);
      await expect(page.locator('.invSlide.is-active')).toHaveAttribute('data-idx', String(slideNumber - 1));
      await page.evaluate(() => document.querySelectorAll('.sourceList[open]').forEach((node) => node.removeAttribute('open')));
      await page.evaluate(() => document.querySelectorAll('.invSlide.is-active .invReveal.is-revealed')
        .forEach((node) => node.classList.remove('is-revealed')));
      await expectInvestmentAllBlanksInline(page, `investment slide ${slideNumber} blanks before reveal`);

      const blankCount = await page.locator('.invSlide.is-active .blank').count();
      for (let revealIndex = 0; revealIndex < blankCount; revealIndex += 1) {
        await page.keyboard.press('Space');
      }

      await expect(page.locator('.invSlide.is-active .blank.is-revealed')).toHaveCount(blankCount);
      await expectInvestmentAllBlanksInline(page, `investment slide ${slideNumber} blanks after reveal`);
      await expectInvestmentSlideFits(page, `investment slide ${slideNumber} revealed blanks`);
    }

    await goToInvestmentSlide(page, { type: 'dataSnapshot', title: 'Tencent: frozen company snapshot' });
    await expect(page.locator('.invSlide.is-active .invDataFocusCard')).toHaveCount(3);
    await expect(page.locator('.invSlide.is-active .invDataReadItem')).toHaveCount(0);
    await expect(page.locator('.invSlide.is-active .invDataPrompt h2')).toHaveCount(0);
    await expect(page.locator('.invSlide.is-active .invDataTask')).toContainText(/Find the stock code/i);
    await expectInvestmentTeachingTextAtLeast(page, 32, 'data snapshot classroom');
    await expectInvestmentNoUltraBold(page, 'data snapshot classroom');
    await expectInvestmentSlideFits(page, 'data snapshot classroom');
    await expectNoHorizontalOverflow(page);

    await goToInvestmentSlide(page, { type: 'analystBoard', title: 'Three evidence blocks before judgement' });
    await expect(page.locator('.invSlide.is-active .invEvidence')).toHaveCount(3);
    await expectInvestmentSlideFits(page, 'analyst board classroom');

    await goToInvestmentSlide(page, { type: 'riskRegister', title: 'A good company can still be a risky share' });
    await expect(page.locator('.invSlide.is-active .invRiskItem')).toHaveCount(4);
    await expectInvestmentSlideFits(page, 'risk register classroom');

    await goToInvestmentSlide(page, { type: 'exam', title: 'Explain why high revenue does not prove that a share is a good investment. [4]' });
    await expect(page.locator('.invSlide.is-active .invExamKeywords .invKeyword')).toHaveCount(6);
    await expectInvestmentSlideFits(page, 'exam slide classroom');

    await goToInvestmentSlide(page, { type: 'modelAnswer', title: 'Explain why high revenue does not prove that a share is a good investment. [4]' });
    await page.keyboard.press('Space');
    await page.keyboard.press('Space');
    await expect(page.locator('.invSlide.is-active .invModelParas p.is-revealed')).toHaveCount(2);
    await expectInvestmentSlideFits(page, 'model answer classroom');

    for (let slideNumber = 1; slideNumber <= 43; slideNumber += 1) {
      await page.goto(pageUrl('investment-analysis/unit-1/lesson-1/index.html') + `?classroom-fit=${slideNumber}#${slideNumber}`);
      await expect(page.locator('.invSlide.is-active')).toHaveAttribute('data-idx', String(slideNumber - 1));
      await expectInvestmentSlideFits(page, `investment slide ${slideNumber} classroom`);
      await expectInvestmentTeachingTextAtLeast(page, 32, `investment slide ${slideNumber} classroom`);
      await expectInvestmentCompactTeachingScale(page, `investment slide ${slideNumber} classroom`);
      await expectInvestmentNoUltraBold(page, `investment slide ${slideNumber} classroom`);
    }

    await page.goto(pageUrl('investment-analysis/unit-1/lesson-1/index.html') + '?view=quiz');
    await expect(page.locator('.invQuizDeck')).toBeVisible();
    await expect(page.locator('.invQuizQuestion')).toHaveCount(10);
    await expect(page.locator('.invQuizScore')).toHaveText('0/10 answered');
    await expect(page.locator('.invQuizQuestion').filter({ hasText: /Which choice best describes investing/i })).toHaveCount(1);
    await expect(page.locator('.invQuizQuestion').filter({ hasText: /short video says it will jump tomorrow/i })).toHaveCount(1);
    await page.locator('.invQuizQuestion').first().getByLabel('One unit of ownership in a company').check();
    await page.getByRole('button', { name: /Mark quiz/i }).click();
    await expect(page.locator('.invQuizScore')).toContainText('/10');
    await expectNoHorizontalOverflow(page);
  });

  test('@smoke investment course map page works', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name.includes('phone'), 'Phone coverage is handled by the responsive investment course map test.');

    await page.goto(pageUrl('investment-analysis/syllabus.html'));
    await expect(page.getByRole('heading', { name: /^30-Lesson Course Map$/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /^30-lesson company knowledge map$/i })).toBeVisible();
    await expect(page.getByText(/Why invest at all/i)).toBeVisible();
    await expect(page.getByText(/saving, investing, speculating and trading/i).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: /^How lessons are built$/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /^Six exams across the year$/i })).toBeVisible();
    await expect(page.locator('[data-syllabus-lesson]')).toHaveCount(30);
    await expect(page.locator('[data-exam-checkpoint]')).toHaveCount(6);
    await expect(page.locator('[data-syllabus-lesson]').first()).toContainText(/Tencent/i);
    await expect(page.locator('[data-syllabus-lesson]').first()).toContainText(/If you buy one Tencent share/i);
    await expect(page.locator('[data-syllabus-lesson][data-lesson="1"]')).toContainText(/speculating/i);
    await expect(page.locator('[data-syllabus-lesson][data-lesson="1"]')).toContainText(/Sort scenarios/i);
    await expect(page.locator('[data-syllabus-lesson][data-lesson="2"]')).toContainText(/liquidity/i);
    await expect(page.locator('[data-syllabus-lesson][data-lesson="2"]')).toContainText(/limit order/i);
    await expect(page.locator('[data-syllabus-lesson][data-lesson="3"]')).toContainText(/bid-ask spread/i);
    await expect(page.locator('[data-syllabus-lesson][data-lesson="3"]')).toContainText(/spread = ask price - bid price/i);
    await expect(page.locator('[data-syllabus-lesson][data-lesson="20"]')).toContainText(/ChinaAMC CSI 300 ETF/i);
    await expect(page.locator('[data-syllabus-lesson][data-lesson="20"]')).toContainText(/index fund/i);
    await expect(page.locator('[data-syllabus-lesson][data-lesson="20"]')).toContainText(/expense ratio/i);
    await expect(page.locator('[data-syllabus-lesson]').last()).toContainText(/Costco/i);
    await expect(page.getByText(/Short team tasks/i)).toBeVisible();
    await expect(page.getByText(/ETF vs single-stock comparisons/i)).toBeVisible();
    await expect(page.locator('body')).not.toContainText(/team project|team portfolio|final project/i);
    const syllabusCompleteness = await page.evaluate(() => [...document.querySelectorAll('[data-syllabus-lesson]')].map((lesson) => ({
      lesson: lesson.getAttribute('data-lesson'),
      hasQuestion: Boolean(lesson.querySelector('h3')?.textContent?.trim()),
      termCount: lesson.querySelectorAll('.investment-lesson-terms li').length,
      hasDefinition: / - /.test(lesson.querySelector('.investment-lesson-terms')?.textContent || ''),
      hasFormula: Boolean(lesson.querySelector('.investment-lesson-formula')?.textContent?.trim()),
      hasEvidence: Boolean(lesson.querySelector('.investment-lesson-evidence')?.textContent?.trim()),
      hasCheck: Boolean(lesson.querySelector('.investment-lesson-check')?.textContent?.trim())
    })));
    expect(syllabusCompleteness.every((lesson) =>
      lesson.hasQuestion &&
      lesson.termCount >= 3 &&
      lesson.hasDefinition &&
      lesson.hasFormula &&
      lesson.hasEvidence &&
      lesson.hasCheck
    ), JSON.stringify(syllabusCompleteness.filter((lesson) =>
      !lesson.hasQuestion ||
      lesson.termCount < 3 ||
      !lesson.hasDefinition ||
      !lesson.hasFormula ||
      !lesson.hasEvidence ||
      !lesson.hasCheck
    ))).toBe(true);
    await expectNoHorizontalOverflow(page);
  });

  test('@responsive investment course map fits phone width', async ({ page }, testInfo) => {
    test.skip(!testInfo.project.name.includes('phone'), 'Responsive investment course map coverage is phone-only.');

    await page.goto(pageUrl('investment-analysis/syllabus.html'));
    await expect(page.getByRole('heading', { name: /^30-Lesson Course Map$/i })).toBeVisible();
    await expect(page.locator('[data-syllabus-lesson]')).toHaveCount(30);
    await expect(page.locator('[data-exam-checkpoint]')).toHaveCount(6);
    await expect(page.locator('.investment-lesson-formula')).toHaveCount(30);
    await expect(page.getByText(/Why invest at all/i)).toBeVisible();
    await expect(page.locator('[data-syllabus-lesson][data-lesson="20"]')).toContainText(/ChinaAMC CSI 300 ETF/i);
    await expectNoHorizontalOverflow(page);
  });

  test('@responsive investment course and quiz fit phone width', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    test.skip(!testInfo.project.name.includes('phone'), 'Responsive investment smoke is phone-only.');

    await page.goto(pageUrl('investment-analysis/index.html'));
    await expect(page.getByRole('heading', { name: /^Investment Analysis$/i })).toBeVisible();
    await expectNoHorizontalOverflow(page);

    await page.goto(pageUrl('investment-analysis/unit-1/lesson-1/index.html'));
    await expect(page.locator('.invSlide.is-active')).toBeVisible();
    await expect(page.locator('.invCounter')).toHaveText('1 / 43');
    await expectInvestmentSlideFits(page, 'hero slide phone');
    await expectInvestmentTeachingTextAtLeast(page, 24, 'hero slide phone');
    await expectNoHorizontalOverflow(page);

    const phoneChecks = [
      { type: 'flow', title: 'Saving, investing, speculating, trading' },
      { type: 'peerTask', title: 'Sort the money decision' },
      { type: 'visualPause', title: 'First identify the company' },
      { type: 'visualPause', title: 'The old price is the base' },
      { type: 'dataSnapshot', title: 'Tencent: frozen company snapshot' },
      { type: 'answer', title: 'Fill in the blanks', occurrence: 3 },
      { type: 'flow', title: 'Why share prices move' },
      { type: 'visualPause', title: 'Evidence comes before judgement' },
      { type: 'answer', title: 'Exit ticket' }
    ];

    for (const match of phoneChecks) {
      const slideNumber = await goToInvestmentSlide(page, match);
      if (match.title === 'Exit ticket') await expect(page.locator('.invSlide.is-active')).toHaveClass(/invExitTicketSlide/);
      await expectInvestmentSlideFits(page, `investment slide ${slideNumber} phone`);
      await expectInvestmentTeachingTextAtLeast(page, 24, `investment slide ${slideNumber} phone`);
      await expectInvestmentNoUltraBold(page, `investment slide ${slideNumber} phone`);
      const blankCount = await page.locator('.invSlide.is-active .blank').count();
      if (blankCount > 0) {
        await page.evaluate(() => document.querySelectorAll('.invSlide.is-active .invReveal.is-revealed')
          .forEach((node) => node.classList.remove('is-revealed')));
        await expectInvestmentAllBlanksInline(page, `investment slide ${slideNumber} phone blanks before reveal`);
        for (let revealIndex = 0; revealIndex < blankCount; revealIndex += 1) {
          await page.keyboard.press('Space');
        }
        await expect(page.locator('.invSlide.is-active .blank.is-revealed')).toHaveCount(blankCount);
        await expectInvestmentAllBlanksInline(page, `investment slide ${slideNumber} phone blanks after reveal`);
        await expectInvestmentSlideFits(page, `investment slide ${slideNumber} phone revealed blanks`);
      }
      await expectNoHorizontalOverflow(page);
    }

    await page.goto(pageUrl('investment-analysis/unit-1/lesson-1/index.html') + '?view=quiz');
    await expect(page.locator('.invQuizDeck')).toBeVisible();
    await expect(page.locator('.invQuizQuestion')).toHaveCount(10);
    await expectNoHorizontalOverflow(page);
  });

  test('@responsive business landing page renders an extendable syllabus roadmap', async ({ page }) => {
    await page.goto(pageUrl('business/index.html'));

    await expect(page.getByRole('heading', { name: /^Business 0264 study hub$/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /^How Unit 5 helps you score marks$/i })).toBeVisible();
    await expect(page.locator('.business-paper-label', { hasText: /^Paper 1$/i })).toBeVisible();
    await expect(page.locator('.business-paper-label', { hasText: /^Paper 2$/i })).toBeVisible();
    await expect(page.getByText(/Application is 30% of both papers/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /^Main library$/i })).toHaveAttribute('href', '../index.html');
    await expect(page.getByRole('link', { name: /^Economics page$/i })).toHaveAttribute('href', '../index.html#course-map');
    await expect(page.getByRole('link', { name: /^Course map$/i })).toHaveAttribute('href', '#business-course-map');
    await expect(page.getByRole('heading', { name: /^Business syllabus roadmap$/i })).toBeVisible();
    await expect(page.locator('.business-unit-step')).toHaveCount(6);
    await expect(page.locator('.business-unit-step.is-live')).toHaveCount(1);
    await expect(page.locator('.business-unit-step.is-planned')).toHaveCount(5);
    await expect(page.getByRole('heading', { name: /^Understanding business activity$/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /^Financial information and decisions$/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /^External influences on business activity$/i })).toBeVisible();
    await expect(page.locator('.business-status.live', { hasText: /^Ready to study$/i })).toBeVisible();
    await expect(page.locator('.business-status', { hasText: /^Coming later$/i })).toHaveCount(5);
    await expect(page.locator('.business-topic-group')).toHaveCount(3);
    await expect(page.locator('.business-lesson-card')).toHaveCount(3);
    await expect(page.getByRole('link', { name: /^Slides$/i })).toHaveCount(3);
    await expect(page.getByRole('link', { name: /^Handout$/i })).toHaveCount(3);
    await expect(page.locator('.business-case-kicker', { hasText: /^Harbor Phone Repair$/i })).toBeVisible();
    await expect(page.getByText(/original classroom teaching case/i)).toBeVisible();
    await expect(page.locator('body')).not.toContainText(/IGCSE Economics Lesson Library/i);
    await expectNoHorizontalOverflow(page);
  });

  test('@smoke archived Business HTML pages opt out of indexing', () => {
    const businessHtmlFiles = findHtmlFiles(path.join(root, 'business'))
      .map((relativePath) => `business/${relativePath}`);

    expect(businessHtmlFiles.length).toBeGreaterThan(0);

    for (const relativePath of businessHtmlFiles) {
      const html = fs.readFileSync(path.join(root, relativePath), 'utf8');
      expect(html, `${relativePath} should stay archived`).toMatch(/<meta name="robots" content="noindex,nofollow" \/>/);
    }
  });

  test('@smoke Business CSS uses local Investment Desk palette without external fonts', () => {
    const cssPaths = [
      'assets/css/business.css',
      'assets/css/business-presentation.css',
    ];
    const requiredTokens = [
      '--business-desk-black: #10161D',
      '--business-deep-petrol: #0B3640',
      '--business-warm-paper: #F6F1E7',
      '--business-paper-white: #FFFDF8',
      '--business-carbon-ink: #151922',
      '--business-mist-text: #F4EFE6',
      '--business-evidence-emerald: #0C7C68',
      '--business-calculation-amber: #B88416',
      '--business-risk-brick: #B2493B',
      '--business-executive-violet: #4A4356',
      '--business-font-main:',
      '--business-font-numeric:',
    ];
    const forbiddenFontSources = [
      /@font-face/i,
      /fonts\.googleapis/i,
      /fonts\.gstatic/i,
      /https?:\/\/[^)\s'"]+font/i,
      /url\(["']?https?:\/\//i,
    ];
    const oldPrimaryPalette = [
      '#3157f0',
      '#008a72',
      '#e05247',
      '#b88a00',
      '#edf3ff',
      '#eaf8f4',
      '#fff0ee',
      '#fff7da',
      '49,87,240',
      '49, 87, 240',
      '0,138,114',
      '0, 138, 114',
      '224,82,71',
      '224, 82, 71',
      '184,138,0',
      '184, 138, 0',
    ];

    for (const cssPath of cssPaths) {
      const source = fs.readFileSync(path.join(root, cssPath), 'utf8');
      for (const token of requiredTokens) {
        expect(source, `${cssPath} should define ${token}`).toContain(token);
      }
      for (const pattern of forbiddenFontSources) {
        expect(source, `${cssPath} should not load external fonts`).not.toMatch(pattern);
      }
      for (const colour of oldPrimaryPalette) {
        expect(source.toLowerCase(), `${cssPath} should not keep old Business palette value ${colour}`).not.toContain(colour);
      }
    }
  });

  test('@smoke Business Unit 5 decks include valid Paper 1 and Paper 2 exam specs', () => {
    const validSkills = new Set(['k', 'app', 'an', 'eval']);

    for (const deck of businessUnit5Decks) {
      const lesson = readLesson(deck.slideFile);
      const examSlides = (lesson.slides || []).filter((slide) => slide.type === 'exam' && slide.examSpec);
      const modelSlides = (lesson.slides || []).filter((slide) => slide.type === 'modelAnswer' && slide.examSpec);

      expect(examSlides.some((slide) => slide.examSpec.paper === 'P1'), `${deck.slideFile} needs Paper 1 practice`).toBe(true);
      expect(examSlides.some((slide) => slide.examSpec.paper === 'P2'), `${deck.slideFile} needs Paper 2 practice`).toBe(true);
      expect(modelSlides.length, `${deck.slideFile} should pair exam questions with model answers`).toBeGreaterThanOrEqual(examSlides.length);

      for (const slide of [...examSlides, ...modelSlides]) {
        expect(['P1', 'P2']).toContain(slide.examSpec.paper);
        expect(Number.isFinite(slide.examSpec.marks), `${slide.title} needs numeric marks`).toBe(true);
        expect(slide.examSpec.marks).toBeGreaterThan(0);
        expect(slide.examSpec.command, `${slide.title} needs a command word`).toEqual(expect.any(String));
        expect(slide.examSpec.pattern, `${slide.title} needs a pattern label`).toEqual(expect.any(String));
        expect(slide.examSpec.skills.length, `${slide.title} needs at least one skill`).toBeGreaterThan(0);
        for (const skill of slide.examSpec.skills) expect(validSkills.has(skill), `${slide.title} has invalid skill ${skill}`).toBe(true);
        expect(slide.title, `${slide.title} should show mark size`).toContain(`[${slide.examSpec.marks}]`);
      }
    }
  });

  test('@smoke Business Unit 5 Paper 2 12-mark model answers reject an alternative', () => {
    const recommendationPattern = /recommend|recommendation|conclusion|overall|i would justify/i;
    const rejectionPattern = /reject|less suitable|better than|rather than|instead of|weaker alternative/i;

    for (const deck of businessUnit5Decks) {
      const lesson = readLesson(deck.slideFile);
      const models = (lesson.slides || [])
        .filter((slide) => slide.type === 'modelAnswer' && slide.examSpec?.paper === 'P2' && slide.examSpec?.marks === 12);

      for (const slide of models) {
        const answerText = [...(slide.paragraphs || []), slide.answer || '', slide.markSchemeNote || ''].join(' ');
        expect(answerText, `${slide.title} needs a recommendation or conclusion`).toMatch(recommendationPattern);
        expect(answerText, `${slide.title} needs explicit rejection of an alternative`).toMatch(rejectionPattern);
      }
    }
  });

  test('@smoke Business Unit 5 decks cite syllabus and exam-requirements references', () => {
    for (const deck of businessUnit5Decks) {
      const lesson = readLesson(deck.slideFile);
      const sources = lesson.meta?.sources || [];
      const sourceText = sources.map((source) => `${source.label} ${source.ref} ${source.note}`).join('\n');

      expect(sourceText, `${deck.slideFile} needs the Business syllabus source`).toMatch(/igcse business 0264 syllabus|Cambridge IGCSE Business 0264 syllabus/i);
      expect(sourceText, `${deck.slideFile} needs the exam requirements source`).toMatch(/igcse-business-0264-exam-requirements\.md/i);
      expect(sourceText, `${deck.slideFile} should keep Harbor separate from Cambridge sources`).not.toMatch(/Harbor Phone Repair.*Cambridge source/i);
    }
  });

  test('@responsive business Unit 5 decks render with Business-only identity and slide handout views', async ({ page }, testInfo) => {
    for (const deck of businessUnit5Decks) {
      await page.goto(pageUrl(deck.path));
      await expect(page.locator('body')).toHaveClass(/subject-business/);
      await expect(page.locator('link[href*="business-presentation.css"]')).toHaveCount(1);
      await expect(page.locator('.slide.is-active h1')).toHaveText(deck.heading);
      await expect(page.locator('.slide.is-active .slide-footer')).toContainText('Cambridge IGCSE Business 0264');
      await expect(page.locator('body')).not.toContainText(/IGCSE Economics|Government and the macroeconomy|The allocation of resources/i);
      await expectLessonModeTabsOnly(page, 'Slides', ['Slides', 'Handout']);
      await expectNoHorizontalOverflow(page);

      if (!testInfo.project.name.includes('phone')) {
        await openLessonModeMenu(page);
        await expect(page.getByRole('link', { name: /^Business index$/i })).toHaveAttribute('href', /business\/index\.html$/);
      }

      await page.goto(pageUrl(deck.path) + '?view=print');
      await expect(page.locator('body')).toHaveClass(/subject-business/);
      await expect(page.locator('.handoutDocument')).toBeVisible();
      await expectLessonModeTabsOnly(page, 'Handout', ['Slides', 'Handout']);
      await expect(page.locator('.handoutKicker')).toContainText('Unit 5 - Financial information and decisions');
      await expect(page.locator('.handoutBlock')).not.toHaveCount(0);
      await expect(page.locator('.handoutExamSpec').first()).toBeVisible();
      await expect(page.locator('.handoutBlock.is-exam')).not.toHaveCount(0);
      await expect(page.locator('.handoutBlock.is-model-answer')).not.toHaveCount(0);
      await expect(page.locator('body')).not.toContainText(/IGCSE Economics|Government and the macroeconomy|The allocation of resources/i);
      await expectNoHorizontalOverflow(page);
    }
  });

  test('@responsive business slide components keep readable light-theme text', async ({ page }) => {
    const componentChecks = [
      { type: 'paperExtract', selector: '.paperExtractText p' },
      { type: 'term', selector: '.termDefinitionText' },
      { type: 'cards', selector: '.cardTitleZh' },
      { type: 'exam', selector: '.examSpecChip' },
      { type: 'modelAnswer', selector: '.modelAnswerText' },
      { type: 'dataTable', selector: '.dataTable td' },
    ];
    const coveredTypes = Object.fromEntries(componentChecks.map((check) => [check.type, 0]));

    for (const deck of businessUnit5Decks) {
      const lesson = readLesson(deck.slideFile);

      for (const check of componentChecks) {
        const slideIndex = (lesson.slides || []).findIndex((slide) => slide.type === check.type);
        if (slideIndex < 0) continue;
        coveredTypes[check.type] += 1;
        await page.goto(`${pageUrl(deck.path)}#${slideIndex + 1}`);
        await expect(page.locator('.slide.is-active')).toHaveAttribute('data-idx', String(slideIndex));
        await expectTextNotNearWhite(page, `.slide.is-active ${check.selector}`);
      }

      await page.goto(`${pageUrl(deck.path)}#1`);
      const sourceSummary = page.locator('.slide.is-active .slideSourceControl summary').first();
      if (await sourceSummary.count()) {
        await expectTextNotNearWhite(page, '.slide.is-active .slideSourceControl summary');
        await sourceSummary.click();
        await expectTextNotNearWhite(page, '.slide.is-active .slideSourceControl .sourceItem');
      }
    }

    for (const check of componentChecks) {
      expect(coveredTypes[check.type], `Business batch should include a checked ${check.type} slide`).toBeGreaterThan(0);
    }
  });

  test('@responsive business decision slides render exam chips without overflow', async ({ page }) => {
    for (const deck of businessUnit5Decks) {
      const lesson = readLesson(deck.slideFile);
      const decisionIndex = (lesson.slides || []).findIndex((slide) => slide.variant === 'businessDecision' && slide.examSpec);
      if (decisionIndex < 0) continue;

      await page.goto(`${pageUrl(deck.path)}#${decisionIndex + 1}`);
      await expect(page.locator('.slide.is-active .examBlock.is-businessdecision')).toBeVisible();
      await expect(page.locator('.slide.is-active .examSpecChip')).toHaveCount(5);
      await expect(page.locator('.slide.is-active .examSpecChip.is-paper')).toContainText('P2');
      await expectNoHorizontalOverflow(page);
    }
  });

  test('definitions revision page renders searchable bilingual cards', async ({ page }) => {
    const expectedRows = definitionRows();
    await page.goto(pageUrl('definitions.html'));

    await expect(page.getByRole('heading', { name: /^Key Definitions$/i })).toBeVisible();
    await expect(page.getByText(/IGCSE 经济学核心定义/i)).toBeVisible();
    await expect(page.getByText(/revise for quizzes, class tests, and IGCSE Economics exams/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /Back to library/i })).toHaveAttribute('href', 'index.html');
    await expect(page.locator('[data-definition-count]')).toHaveText(String(expectedRows.length));
    await expect(page.locator('.definition-card')).toHaveCount(expectedRows.length);
    await expect(page.locator('.definition-card:visible')).toHaveCount(expectedRows.length);
    await expect(page.locator('.section-nav')).toBeVisible();
    await expect(page.getByRole('button', { name: /Study definitions/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Study definitions/i })).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('[data-study-all]')).toBeHidden();
    await expect(page.locator('[data-flashcard-shell]')).toBeHidden();
    await expect(page.locator('.definition-zh').filter({ hasText: /复习要点|待补充/i })).toHaveCount(0);

    await expect(page.locator('.definition-card').filter({ hasText: /Opportunity cost/ }).first()).toBeVisible();
    await expect(page.locator('.definition-card').filter({ hasText: /市场失灵/ }).first()).toBeVisible();
    await expect(page.locator('.definition-card').filter({ hasText: /Fiscal policy/ }).first()).toBeVisible();
    await expect(page.locator('.definition-card').filter({ has: page.getByRole('heading', { name: 'PED', exact: true }) })).toBeVisible();

    const navLayout = await page.locator('.section-link').evaluateAll((links) => links.map((link) => {
      const title = link.querySelector('span')?.getBoundingClientRect();
      const translation = link.querySelector('small')?.getBoundingClientRect();
      const count = link.querySelector('b')?.getBoundingClientRect();
      return {
        titleRight: title?.right ?? 0,
        translationRight: translation?.right ?? 0,
        countLeft: count?.left ?? 0,
      };
    }));

    for (const item of navLayout) {
      expect(item.countLeft).toBeGreaterThanOrEqual(Math.max(item.titleRight, item.translationRight) + 6);
    }

    await page.getByRole('searchbox', { name: /Search definitions/i }).fill('Market failure');
    await expect(page.locator('.definition-card').filter({ has: page.getByRole('heading', { name: 'Market failure', exact: true }) })).toBeVisible();
    await expect(page.locator('.definition-card').filter({ has: page.getByRole('heading', { name: 'Opportunity cost', exact: true }) })).toBeHidden();

    await page.getByRole('searchbox', { name: /Search definitions/i }).fill('');
    await page.getByRole('button', { name: /Unit 4/i }).click();
    await expect(page.locator('.definition-card').filter({ has: page.getByRole('heading', { name: 'Fiscal policy', exact: true }) })).toBeVisible();
    await expect(page.locator('.definition-card').filter({ has: page.getByRole('heading', { name: 'Market failure', exact: true }) })).toBeHidden();

    await page.getByRole('button', { name: /Formulas/i }).click();
    await expect(page.locator('.definition-card').filter({ has: page.getByRole('heading', { name: 'PED', exact: true }) })).toBeVisible();
    await expect(page.locator('.definition-card').filter({ has: page.getByRole('heading', { name: 'Fiscal policy', exact: true }) })).toBeHidden();

    await expectNoHorizontalOverflow(page);
  });

  test('definitions flashcard picker studies selected syllabus parts', async ({ page }) => {
    test.setTimeout(60000);

    const expectedRows = definitionRows();
    const unitCount = (unit) => expectedRows.filter((row) => row.ref.startsWith(`${unit}.`)).length;
    const topicCount = (topic) => expectedRows.filter((row) => row.ref.startsWith(`${topic}.`)).length;
    await page.goto(pageUrl('definitions.html'));

    const studyButton = page.getByRole('button', { name: /Study definitions/i });
    await studyButton.click();
    await expect(studyButton).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByLabel(/All definitions/i)).toBeChecked();
    await expect(page.locator('[data-study-count]')).toHaveText(String(expectedRows.length));
    await expect(page.getByRole('button', { name: /Start flashcard test/i })).toBeEnabled();

    await page.getByLabel(/All definitions/i).uncheck();
    await expect(page.locator('[data-study-count]')).toHaveText('0');
    await expect(page.getByRole('button', { name: /Start flashcard test/i })).toBeDisabled();

    await page.getByLabel(/Whole Unit 2/i).check();
    await expect(page.locator('[data-study-count]')).toHaveText(String(unitCount('2')));
    await page.getByLabel(/Whole Unit 2/i).uncheck();
    await expect(page.locator('[data-study-count]')).toHaveText('0');

    await page.locator('[data-study-topic="2.7"]').check();
    await expect(page.locator('[data-study-count]')).toHaveText(String(topicCount('2.7')));
    await page.locator('[data-study-topic="4.3"]').check();
    await expect(page.locator('[data-study-count]')).toHaveText(String(topicCount('2.7') + topicCount('4.3')));
    await studyButton.click();
    await expect(page.locator('[data-study-all]')).toBeHidden();
    await studyButton.click();
    await expect(page.locator('[data-study-count]')).toHaveText(String(topicCount('2.7') + topicCount('4.3')));
    await page.locator('[data-study-topic="2.7"]').uncheck();
    await page.locator('[data-study-topic="4.3"]').uncheck();

    await page.getByRole('searchbox', { name: /Search definitions/i }).fill('no visible card should match this');
    await page.getByLabel(/Whole Unit 2/i).check();
    await page.getByRole('button', { name: /Start flashcard test/i }).click();
    await expect(page.locator('[data-flashcard-left]')).toHaveText(String(unitCount('2')));
    await expect(page.locator('[data-flashcard-card]')).toBeVisible();
    await expect(page.locator('[data-flashcard-ref]')).toContainText(/^2\./);
    await page.getByRole('button', { name: /Show Answer/i }).click();
    await expect(page.locator('[data-flashcard-definition]')).toContainText(/\S/);
    await expect(page.locator('[data-flashcard-definition-zh]')).toContainText(/\S/);
    await page.getByRole('button', { name: /^Again$/i }).click();
    await expect(page.locator('[data-flashcard-left]')).toHaveText(String(unitCount('2')));
    await expect(page.locator('[data-flashcard-again]')).toHaveText('1');
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-flashcard-definition]')).toContainText(/\S/);
    await page.keyboard.press('2');
    await expect(page.locator('[data-flashcard-left]')).toHaveText(String(unitCount('2') - 1));
    await expect(page.locator('[data-flashcard-known]')).toHaveText('1');
    await page.getByRole('button', { name: /Shuffle/i }).click();
    await expect(page.locator('[data-flashcard-left]')).toHaveText(String(unitCount('2') - 1));
    await page.getByRole('button', { name: /Reset/i }).click();
    await expect(page.locator('[data-flashcard-left]')).toHaveText(String(unitCount('2')));
    await expect(page.locator('[data-flashcard-known]')).toHaveText('0');
    await page.getByRole('button', { name: /Back to definitions/i }).click();
    await expect(page.getByRole('searchbox', { name: /Search definitions/i })).toHaveValue('no visible card should match this');

    await page.getByLabel(/Whole Unit 2/i).uncheck();
    await page.locator('[data-study-topic="4.1"]').check();
    await expect(page.locator('[data-study-count]')).toHaveText('1');
    await page.getByRole('button', { name: /Start flashcard test/i }).click();
    await page.keyboard.press(' ');
    await page.keyboard.press('2');
    await expect(page.locator('[data-flashcard-complete]')).toBeVisible();
    await expect(page.locator('[data-flashcard-known]')).toHaveText('1');
    await page.getByRole('button', { name: /Study again/i }).click();
    await expect(page.locator('[data-flashcard-left]')).toHaveText('1');
    await expectNoHorizontalOverflow(page);
  });

  test('unit deck menus show subordinate Chinese deck titles', async ({ page }) => {
    const menus = [
      {
        path: 'lessons/unit-2-allocation/2-8-market-economic-system/index.html',
        titles: [
          'Market economic system',
          'Price mechanism',
          'Arguments for markets',
          'Arguments against markets',
        ],
      },
      {
        path: 'lessons/unit-2-allocation/2-9-market-failure/index.html',
        titles: [
          'External costs and benefits',
          'Merit and demerit goods',
          'Public goods',
          'Monopoly power and evaluation',
        ],
      },
      {
        path: 'lessons/unit-4-government/4-2-fiscal-policy/index.html',
        titles: [
          'Government budget and spending',
          'Taxation foundations',
          'Tax structures',
          'Expansionary and contractionary fiscal policy',
          'Effects on macroeconomic aims',
        ],
      },
      {
        path: 'lessons/unit-4-government/4-3-monetary-policy/index.html',
        titles: [
          'Money supply and monetary policy',
          'Interest rates',
          'Money supply measures',
          'Effects and evaluation',
        ],
      },
      {
        path: 'lessons/unit-4-government/4-4-supply-side-policy/index.html',
        titles: [
          'Productive capacity and total supply',
          'Interventionist supply-side policies',
          'Market-based supply-side policies',
          'Effects and evaluation',
        ],
      },
    ];

    for (const menu of menus) {
      await page.goto(pageUrl(menu.path));

      for (const title of menu.titles) {
        const card = page.locator('.deck-card').filter({ has: page.getByRole('heading', { name: title }) });
        await expect(card.locator('.deck-title-zh')).toHaveText(deckTitleTranslations[title]);
      }

      await expectNoHorizontalOverflow(page);
    }
  });

  test('shared photo catalogue uses complete local image metadata', () => {
    const entries = flattenPhotoCatalogue(loadPhotoCatalogue());

    expect(entries.length).toBeGreaterThan(0);
    for (const { namespace, key, photo } of entries) {
      expect(photo.type, `${namespace}.${key} type`).toBe('photo');
      expect(photo.src, `${namespace}.${key} src`).not.toMatch(remoteUrlPattern);
      expect(photo.alt, `${namespace}.${key} alt`).toBeTruthy();
      expect(photo.caption, `${namespace}.${key} caption`).toBeTruthy();
      expect(photo.credit, `${namespace}.${key} credit`).toBeTruthy();
      expect(photo.source, `${namespace}.${key} source`).toBeTruthy();

      const localPath = photo.src.replace(/^(\.\.\/){3}/, '');
      expect(fs.existsSync(path.join(root, localPath)), `${namespace}.${key} file`).toBe(true);
    }
  });

  test('discussion slide data includes Chinese translations and possible answers', () => {
    const slideFiles = findSlideFiles(path.join(root, 'lessons'), root);
    const discussionSlides = [];

    for (const slideFile of slideFiles) {
      const lesson = readLesson(slideFile);
      for (const [index, slide] of (lesson.slides || []).entries()) {
        if (slide.type === 'discussion') discussionSlides.push({ slideFile, index, slide });
      }
    }

    expect(discussionSlides.length).toBeGreaterThan(0);
    for (const { slideFile, index, slide } of discussionSlides) {
      const label = `${slideFile} slide ${index + 1}`;
      expect(slide.zh, `${label} zh`).toBeTruthy();
      expect(slide.answer, `${label} answer`).toBeTruthy();
      expect(slide.answerZh, `${label} answerZh`).toBeTruthy();
      expect(`${slide.zh} ${slide.answerZh}`, `${label} encoded Chinese`).not.toMatch(/\?{4,}/);
    }
  });

  test('all opening hero slides include Chinese deck titles', () => {
    const slideFiles = findSlideFiles(path.join(root, 'lessons'), root)
      .filter((slideFile) => !slideFile.includes('/_template/'));
    const missingZhTitles = [];

    for (const slideFile of slideFiles) {
      const lesson = readLesson(slideFile);
      const heroSlide = (lesson.slides || []).find((slide) => slide.type === 'hero');
      if (!heroSlide?.zhTitle) {
        missingZhTitles.push(slideFile);
        continue;
      }

      expect(heroSlide.zhTitle, `${slideFile} hero zhTitle`).not.toMatch(/\?{2,}/);
    }

    expect(missingZhTitles).toEqual([]);
  });

  test('complete lesson decks include fact and discussion slides', () => {
    const slideFiles = findSlideFiles(path.join(root, 'lessons'), root)
      .filter((slideFile) => !slideFile.includes('/_template/'));
    const missingCoverage = [];

    for (const slideFile of slideFiles) {
      const lesson = readLesson(slideFile);
      const slides = lesson.slides || [];
      const hasFact = slides.some((slide) => slide.type === 'fact');
      const hasDiscussion = slides.some((slide) => slide.type === 'discussion');

      if (!hasFact) missingCoverage.push(`${slideFile}: missing fact slide`);
      if (!hasDiscussion) missingCoverage.push(`${slideFile}: missing discussion slide`);
    }

    expect(missingCoverage).toEqual([]);
  });

  test('exit ticket answer slides use the bilingual final-check standard', () => {
    const slideFiles = findSlideFiles(path.join(root, 'lessons'), root);
    const failures = [];

    for (const slideFile of slideFiles) {
      const lesson = readLesson(slideFile);
      for (const [index, slide] of (lesson.slides || []).entries()) {
        if (slide.type !== 'answer') continue;

        if (slide.eyebrow === 'Exit ticket') {
          failures.push(`${slideFile} slide ${index + 1}: uses Exit ticket as eyebrow`);
        }

        if (slide.title === 'Exit ticket') {
          if (slide.eyebrow !== 'Check') {
            failures.push(`${slideFile} slide ${index + 1}: Exit ticket title must use Check eyebrow`);
          }
          if (slide.zhTitle !== '离堂小测') {
            failures.push(`${slideFile} slide ${index + 1}: Exit ticket title must include zhTitle`);
          }
        }
      }
    }

    expect(failures).toEqual([]);
  });

  test('market failure decks keep three bilingual objectives and three lesson parts', () => {
    const slideFiles = findSlideFiles(path.join(root, 'lessons/unit-2-allocation/2-9-market-failure'), root);

    for (const slideFile of slideFiles) {
      const lesson = readLesson(slideFile);
      const outcomes = (lesson.slides || []).filter((slide) => slide.type === 'outcomes');
      const sections = (lesson.slides || []).filter((slide) => slide.type === 'section');

      expect(outcomes, `${slideFile} outcomes`).toHaveLength(1);
      expect(outcomes[0].bullets, `${slideFile} objective count`).toHaveLength(3);
      expect(outcomes[0].zhBullets, `${slideFile} zh objective count`).toHaveLength(3);
      outcomes[0].zhBullets.forEach((bullet, i) => {
        expect(bullet, `${slideFile} zh objective ${i + 1}`).toEqual(expect.any(String));
        expect(bullet.trim(), `${slideFile} zh objective ${i + 1}`).not.toHaveLength(0);
      });

      expect(sections, `${slideFile} section count`).toHaveLength(3);
    }
  });

  test('market failure taught steps are followed by formative checks', () => {
    const slideFiles = findSlideFiles(path.join(root, 'lessons/unit-2-allocation/2-9-market-failure'), root);
    const taughtTypes = new Set([
      'compare',
      'flow',
      'marketFailureExternalitySim',
      'monopolyPowerSim',
      'publicGoodFreeRiderSim',
      'socialEffectsVenn',
      'term',
    ]);
    const formativeTypes = new Set(['answer', 'classificationTask', 'exam', 'peerTask', 'quiz', 'yesNoCheck']);
    const missingChecks = [];

    for (const slideFile of slideFiles) {
      const lesson = readLesson(slideFile);
      const slides = lesson.slides || [];
      for (const [index, slide] of slides.entries()) {
        if (!taughtTypes.has(slide.type)) continue;
        const nextSlide = slides[index + 1];
        if (!formativeTypes.has(nextSlide?.type)) {
          missingChecks.push(`${slideFile} slide ${index + 1} ${slide.type} -> ${nextSlide?.type || 'end'}`);
        }
      }
    }

    expect(missingChecks).toEqual([]);
  });

  test('market failure term slides use definition blanks with bilingual vocabulary notes', () => {
    const slideFiles = findSlideFiles(path.join(root, 'lessons/unit-2-allocation/2-9-market-failure'), root);
    const missingNotes = [];

    for (const slideFile of slideFiles) {
      const lesson = readLesson(slideFile);
      for (const [index, slide] of (lesson.slides || []).entries()) {
        if (slide.type !== 'term') continue;
        const keyTerms = slide.keyTerms || slide.termNotes || [];
        if (!keyTerms.length) {
          missingNotes.push(`${slideFile} slide ${index + 1}: no keyTerms`);
          continue;
        }

        for (const item of keyTerms) {
          const term = Array.isArray(item) ? item[0] : item.term;
          const zh = Array.isArray(item) ? item[1] : item.zh;
          const note = Array.isArray(item) ? item[2] : item.note;
          expect(String(slide.definition || '').toLowerCase(), `${slideFile} slide ${index + 1} includes ${term}`).toContain(String(term).toLowerCase());
          expect(zh, `${slideFile} slide ${index + 1} ${term} zh`).toEqual(expect.any(String));
          expect(note, `${slideFile} slide ${index + 1} ${term} note`).toEqual(expect.any(String));
        }
      }
    }

    expect(missingNotes).toEqual([]);
  });

  test('market failure lesson 1 includes full private and external cost benefit definitions', () => {
    const lesson = readLesson('lessons/unit-2-allocation/2-9-market-failure/slides-lesson-1.js');
    const termSlides = new Map((lesson.slides || [])
      .filter((slide) => slide.type === 'term')
      .map((slide) => [String(slide.term || '').toLowerCase(), slide.definition]));

    expect(termSlides.get('private cost')).toBe('A cost incurred by the consumer or producer of a product.');
    expect(termSlides.get('external cost')).toBe('A cost suffered by a third party who is not directly involved in the consumption or production of the product.');
    expect(termSlides.get('private benefit')).toBe('A benefit enjoyed by the consumer or producer of a product, e.g. better future job prospects from education or profits earned by a firm.');
    expect(termSlides.get('external benefit')).toBe('A benefit gained by a third party who is not directly involved in the consumption or production of the product.');
  });

  test('market failure lesson 1 teaches private and external effects before social totals', () => {
    const lesson = readLesson('lessons/unit-2-allocation/2-9-market-failure/slides-lesson-1.js');
    const slides = lesson.slides || [];
    const titles = slides.map((slide) => slide.title).filter(Boolean);

    expect(titles).not.toContain('Write the formula in words');
    expect(titles).not.toContain('Predict the market problem');

    const termIndex = (term) => slides.findIndex((slide) => slide.type === 'term' && String(slide.term).toLowerCase() === term);
    const privateCost = termIndex('private cost');
    const externalCost = termIndex('external cost');
    const privateBenefit = termIndex('private benefit');
    const externalBenefit = termIndex('external benefit');
    const externalBenefitCheck = slides.findIndex((slide, index) => index > externalBenefit && slide.type === 'peerTask');
    const firstSocialTotal = slides.findIndex((slide) => /\bsocial (cost|benefit|totals)\b/i.test(JSON.stringify(slide)));

    expect(privateCost).toBeGreaterThan(0);
    expect(externalCost).toBeGreaterThan(privateCost);
    expect(privateBenefit).toBeGreaterThan(externalCost);
    expect(externalBenefit).toBeGreaterThan(privateBenefit);
    expect(externalBenefitCheck).toBeGreaterThan(externalBenefit);
    expect(firstSocialTotal).toBeGreaterThan(externalBenefitCheck);
  });

  test('market failure flow and contrast slides use bilingual fill-blank scaffolds', () => {
    const slideFiles = findSlideFiles(path.join(root, 'lessons/unit-2-allocation/2-9-market-failure'), root);
    const badFlows = [];
    const badCompares = [];

    for (const slideFile of slideFiles) {
      const lesson = readLesson(slideFile);
      for (const [index, slide] of (lesson.slides || []).entries()) {
        if (slide.type === 'flow') {
          const nodes = Array.isArray(slide.nodes?.[0]) ? slide.nodes[0] : slide.nodes || [];
          nodes.forEach((node, nodeIndex) => {
            const text = Array.isArray(node) ? node[0] : node?.text;
            const zh = Array.isArray(node) ? node[1] : node?.zh;
            if (!text || !zh) badFlows.push(`${slideFile} slide ${index + 1} node ${nodeIndex + 1}`);
          });
        }

        if (slide.type === 'compare') {
          if (slide.mode !== 'fillBlanks') badCompares.push(`${slideFile} slide ${index + 1}: missing fillBlanks mode`);
          for (const side of ['left', 'right']) {
            for (const [itemIndex, item] of (slide[side] || []).entries()) {
              const statement = Array.isArray(item) ? item[1] : String(item);
              const answer = Array.isArray(item) ? item[2] : '';
              if (!statement.includes('__________') || !answer) {
                badCompares.push(`${slideFile} slide ${index + 1} ${side} item ${itemIndex + 1}`);
              }
            }
          }
          expect(slide.partialReview || [], `${slideFile} slide ${index + 1}`).toHaveLength(0);
        }
      }
    }

    expect(badFlows).toEqual([]);
    expect(badCompares).toEqual([]);
  });

  test('market failure decks avoid chain in slide titles', () => {
    const slideFiles = findSlideFiles(path.join(root, 'lessons/unit-2-allocation/2-9-market-failure'), root);
    const badTitles = [];

    for (const slideFile of slideFiles) {
      const lesson = readLesson(slideFile);
      for (const [index, slide] of (lesson.slides || []).entries()) {
        if (/\bchain\b/i.test(String(slide.title || ''))) {
          badTitles.push(`${slideFile} slide ${index + 1}: ${slide.title}`);
        }
      }
    }

    expect(badTitles).toEqual([]);
  });

  test('target fiscal and monetary decks keep three bilingual objectives and three lesson parts', () => {
    const slideFiles = [
      'lessons/unit-4-government/4-2-fiscal-policy/slides-lesson-4.js',
      'lessons/unit-4-government/4-2-fiscal-policy/slides-lesson-5.js',
      'lessons/unit-4-government/4-3-monetary-policy/slides-lesson-1.js',
      'lessons/unit-4-government/4-3-monetary-policy/slides-lesson-2.js',
      'lessons/unit-4-government/4-3-monetary-policy/slides-lesson-3.js',
      'lessons/unit-4-government/4-3-monetary-policy/slides-lesson-4.js',
    ];

    for (const slideFile of slideFiles) {
      const lesson = readLesson(slideFile);
      const outcomes = (lesson.slides || []).filter((slide) => slide.type === 'outcomes');
      const sections = (lesson.slides || []).filter((slide) => slide.type === 'section');

      expect(outcomes, `${slideFile} outcomes`).toHaveLength(1);
      expect(outcomes[0].bullets, `${slideFile} English objectives`).toHaveLength(3);
      expect(outcomes[0].zhBullets, `${slideFile} Chinese objectives`).toHaveLength(3);
      outcomes[0].zhBullets.forEach((bullet, i) => {
        expect(bullet, `${slideFile} zh objective ${i + 1}`).toEqual(expect.any(String));
        expect(bullet.trim(), `${slideFile} zh objective ${i + 1}`).not.toHaveLength(0);
      });

      expect(sections, `${slideFile} section count`).toHaveLength(3);
    }
  });

  test('target fiscal and monetary definition slides use fill-in vocabulary notes', () => {
    const slideFiles = [
      'lessons/unit-4-government/4-2-fiscal-policy/slides-lesson-4.js',
      'lessons/unit-4-government/4-2-fiscal-policy/slides-lesson-5.js',
      'lessons/unit-4-government/4-3-monetary-policy/slides-lesson-1.js',
      'lessons/unit-4-government/4-3-monetary-policy/slides-lesson-2.js',
      'lessons/unit-4-government/4-3-monetary-policy/slides-lesson-3.js',
      'lessons/unit-4-government/4-3-monetary-policy/slides-lesson-4.js',
    ];
    const failures = [];

    for (const slideFile of slideFiles) {
      const lesson = readLesson(slideFile);
      for (const [index, slide] of (lesson.slides || []).entries()) {
        if (slide.type !== 'term') continue;
        const keyTerms = slide.keyTerms || slide.termNotes || [];
        if (!keyTerms.length) {
          failures.push(`${slideFile} slide ${index + 1}: missing keyTerms`);
          continue;
        }
        if (slide.showExamples !== false) failures.push(`${slideFile} slide ${index + 1}: examples should be hidden`);
        if (slide.visual) failures.push(`${slideFile} slide ${index + 1}: definition slide should not use a visual`);

        for (const item of keyTerms) {
          const term = Array.isArray(item) ? item[0] : item.term;
          const zh = Array.isArray(item) ? item[1] : item.zh;
          const note = Array.isArray(item) ? item[2] : item.note;
          const needsBottomExplanation = Array.isArray(item) ? true : item.explain !== false;
          if (!String(slide.definition || '').toLowerCase().includes(String(term || '').toLowerCase())) {
            failures.push(`${slideFile} slide ${index + 1}: definition does not include ${term}`);
          }
          if (!zh) failures.push(`${slideFile} slide ${index + 1}: ${term} missing zh`);
          if (needsBottomExplanation && !note) failures.push(`${slideFile} slide ${index + 1}: ${term} missing note`);
        }
      }
    }

    expect(failures).toEqual([]);
  });

  test('definition recall checks use taught model definitions @smoke', () => {
    const expectedRecallDefinitions = [
      {
        slideFile: 'lessons/unit-4-government/4-3-monetary-policy/slides-lesson-2.js',
        entries: {
          'Money supply': 'Money supply is the amount of money in an economy at a particular time.',
          'Central bank': 'A central bank manages money and credit conditions for the whole economy.',
          'Monetary policy': 'Monetary policy is central-bank policy using interest rates, money supply and foreign exchange rates to influence economic activity and macroeconomic aims.',
        },
      },
      {
        slideFile: 'lessons/unit-4-government/4-3-monetary-policy/slides-lesson-3.js',
        entries: {
          'Fiscal policy': 'Fiscal policy is the use of government spending and taxation to influence economic activity, aggregate demand and macroeconomic aims.',
          'Monetary policy': 'Monetary policy is central-bank policy using interest rates, money supply and foreign exchange rates to influence economic activity and macroeconomic aims.',
          'Interest rate': 'An interest rate is the cost of borrowing and the reward for saving, expressed as a percentage.',
        },
      },
      {
        slideFile: 'lessons/unit-4-government/4-3-monetary-policy/slides-lesson-4.js',
        entries: {
          'Contractionary monetary policy': 'Contractionary monetary policy uses higher interest rates or reduced money supply to reduce consumer expenditure, investment, aggregate demand and inflationary pressure.',
          'Bank lending': 'Bank lending means banks provide loans to households or firms that want to borrow money.',
          'Foreign exchange rate': 'A foreign exchange rate is the price of one currency in terms of another currency.',
        },
      },
      {
        slideFile: 'lessons/unit-2-allocation/2-9-market-failure/slides-lesson-3.js',
        entries: {
          'Merit good': 'A merit good is a beneficial good that may be under-consumed because consumers may not recognise its full benefits.',
          'Demerit good': 'A demerit good is a harmful good that may be over-consumed because consumers may not recognise its full costs.',
          'Market failure': 'Market failure is an inefficient allocation of resources in a free market; production or consumption is not efficient.',
        },
      },
    ];
    const failures = [];

    for (const { slideFile, entries } of expectedRecallDefinitions) {
      const lesson = readLesson(slideFile);
      const recallSlide = (lesson.slides || []).find((slide) => slide.taskType === 'definitionRecall');
      if (!recallSlide) {
        failures.push(`${slideFile}: missing definition recall slide`);
        continue;
      }
      const actualEntries = new Map((recallSlide.definitionItems || []).map((item) => [item.term, item.answer]));
      for (const [term, expectedAnswer] of Object.entries(entries)) {
        if (actualEntries.get(term) !== expectedAnswer) {
          failures.push(`${slideFile}: ${term} recall definition drifted`);
        }
      }
    }

    expect(failures).toEqual([]);
  });

  test('target fiscal and monetary taught steps are immediately followed by formative checks', () => {
    const slideFiles = [
      'lessons/unit-4-government/4-2-fiscal-policy/slides-lesson-4.js',
      'lessons/unit-4-government/4-2-fiscal-policy/slides-lesson-5.js',
      'lessons/unit-4-government/4-3-monetary-policy/slides-lesson-1.js',
      'lessons/unit-4-government/4-3-monetary-policy/slides-lesson-2.js',
      'lessons/unit-4-government/4-3-monetary-policy/slides-lesson-3.js',
      'lessons/unit-4-government/4-3-monetary-policy/slides-lesson-4.js',
    ];
    const taughtTypes = new Set(['term', 'flow', 'compare', 'cards']);
    const formativeTypes = new Set(['answer', 'classificationTask', 'peerTask', 'quiz', 'yesNoCheck']);
    const failures = [];

    for (const slideFile of slideFiles) {
      const lesson = readLesson(slideFile);
      const slides = lesson.slides || [];
      for (const [index, slide] of slides.entries()) {
        if (!taughtTypes.has(slide.type)) continue;
        const nextSlide = slides[index + 1];
        if (!formativeTypes.has(nextSlide?.type)) {
          failures.push(`${slideFile} slide ${index + 1} ${slide.type} -> ${nextSlide?.type || 'end'}`);
        }
      }
    }

    expect(failures).toEqual([]);
  });

  test('target fiscal and monetary flows and contrasts use bilingual scaffolds', () => {
    const slideFiles = targetFiscalMonetarySlideFiles;
    const failures = [];
    const textFields = ['title', 'question', 'prompt', 'footer', 'sharePrompt', 'markSchemeNote'];

    for (const slideFile of slideFiles) {
      const lesson = readLesson(slideFile);
      for (const [index, slide] of (lesson.slides || []).entries()) {
        for (const field of textFields) {
          if (/\b(?:stance|route|chain)\b/i.test(String(slide[field] || ''))) {
            failures.push(`${slideFile} slide ${index + 1}: ${field} uses unclear wording`);
          }
        }
        for (const answer of slide.sampleAnswers || []) {
          if (/\b(?:stance|route|chain)\b/i.test(String(answer || ''))) {
            failures.push(`${slideFile} slide ${index + 1}: sample answer uses unclear wording`);
          }
        }
        for (const card of slide.cards || []) {
          const cardText = Array.isArray(card) ? card.join(' ') : Object.values(card || {}).join(' ');
          if (/\b(?:stance|route|chain)\b/i.test(cardText)) {
            failures.push(`${slideFile} slide ${index + 1}: card uses unclear wording`);
          }
        }

        if (slide.type === 'flow') {
          const nodes = Array.isArray(slide.nodes?.[0]) ? slide.nodes[0] : slide.nodes || [];
          if (slide.mode !== 'fillBlanks') failures.push(`${slideFile} slide ${index + 1}: flow missing fillBlanks mode`);
          if ((slide.partialReview || []).includes('.flowRow > .flowChip')) {
            failures.push(`${slideFile} slide ${index + 1}: flow chips should not be partial reveal items`);
          }
          nodes.forEach((node, nodeIndex) => {
            const text = node?.text;
            const zh = node?.zh;
            const answer = node?.answer;
            if (!text || !text.includes('______') || !answer || !zh) {
              failures.push(`${slideFile} slide ${index + 1} node ${nodeIndex + 1}`);
            }
          });
        }

        if (slide.type === 'compare') {
          if (slide.variant === 'examDiscussion') {
            if (!/\[\d+\]/.test(slide.title || '')) failures.push(`${slideFile} slide ${index + 1}: exam discussion title should include marks`);
            if ((slide.partialReview || []).join(' ') !== '.splitCols .card .choice') {
              failures.push(`${slideFile} slide ${index + 1}: exam discussion should reveal keyword rows`);
            }
            if (slide.mode === 'fillBlanks') failures.push(`${slideFile} slide ${index + 1}: exam discussion should not be a fill-blank compare`);
            continue;
          }
          if (slide.variant === 'policyDirection') {
            if (slide.title) failures.push(`${slideFile} slide ${index + 1}: policy direction compare should not have title`);
            if (slide.leftVisual || slide.rightVisual || slide.visual) failures.push(`${slideFile} slide ${index + 1}: policy direction compare should stay text-only unless visuals add clear value`);
            if ((slide.partialReview || []).length) failures.push(`${slideFile} slide ${index + 1}: policy direction compare should not use partialReview`);
            continue;
          }
          if (slide.mode !== 'fillBlanks') failures.push(`${slideFile} slide ${index + 1}: compare missing fillBlanks`);
          if (slide.title) failures.push(`${slideFile} slide ${index + 1}: compare should not have title`);
          if ((slide.partialReview || []).length) failures.push(`${slideFile} slide ${index + 1}: compare should not use partialReview`);
          if (slide.visual) failures.push(`${slideFile} slide ${index + 1}: compare should not use visual`);

          for (const side of ['left', 'right']) {
            for (const [itemIndex, item] of (slide[side] || []).entries()) {
              const statement = Array.isArray(item) ? item[1] : String(item);
              const answer = Array.isArray(item) ? item[2] : '';
              if (!statement.includes('__________') || !answer) {
                failures.push(`${slideFile} slide ${index + 1} ${side} item ${itemIndex + 1}`);
              }
            }
          }
        }
      }
    }

    expect(failures).toEqual([]);
  });

  test('fact slides use one context sentence followed by one question', () => {
    const failures = [];

    for (const slideFile of findSlideFiles(path.join(root, 'lessons'), root)) {
      const lesson = readLesson(slideFile);
      for (const [index, slide] of (lesson.slides || []).entries()) {
        if (slide.type !== 'fact') continue;

        for (const panel of factPanels(slide)) {
          const context = String(panel.context || '').trim();
          const question = String(panel.question || '').trim();
          const fact = String(panel.fact || '').trim();

          if (fact) failures.push(`${slideFile} slide ${index + 1}: still uses legacy fact text`);
          if (!context) failures.push(`${slideFile} slide ${index + 1}: missing context`);
          if (!question) failures.push(`${slideFile} slide ${index + 1}: missing question`);
          if (!panel.questionZh) failures.push(`${slideFile} slide ${index + 1}: missing Chinese question`);
          if (!panel.answer) failures.push(`${slideFile} slide ${index + 1}: missing possible answer`);
          if (context.includes('?')) failures.push(`${slideFile} slide ${index + 1}: context is a question`);
          if (question && !question.endsWith('?')) failures.push(`${slideFile} slide ${index + 1}: question does not end with ?`);
          if ((context.match(/[.!?](?=\s|$)/g) || []).length > 1) {
            failures.push(`${slideFile} slide ${index + 1}: context has more than one sentence`);
          }
        }
      }
    }

    expect(failures).toEqual([]);
  });

  test('target dense card grids use full-width layouts without right-side visuals', () => {
    const denseGridTitles = new Set([
      'Fiscal policy and macro aims',
      'When fiscal policy works',
      'Central-bank functions',
      'Macroeconomic aims link',
      'Expansionary monetary policy',
      'Contractionary monetary policy',
      'Money supply measures',
      'Policy tools to first effects',
      'Current account: only the bridge for now',
      'What decides effectiveness?',
    ]);
    const failures = [];

    for (const slideFile of targetFiscalMonetarySlideFiles) {
      const lesson = readLesson(slideFile);
      for (const [index, slide] of (lesson.slides || []).entries()) {
        if (slide.type !== 'cards' || !denseGridTitles.has(slide.title)) continue;
        if (slide.visual) failures.push(`${slideFile} slide ${index + 1}: dense card grid still has visual`);
      }
    }

    expect(failures).toEqual([]);
  });

  test('target fiscal and monetary peer tasks are self-contained sample-only reveals', () => {
    const failures = [];
    const vagueReferences = /\b(?:this slide|previous slide|part 2|part two|from part|above)\b/i;
    const hiddenTaskSelectors = new Set(['.steps > .step', '.peerTaskShare']);

    for (const slideFile of targetFiscalMonetarySlideFiles) {
      const lesson = readLesson(slideFile);
      for (const [index, slide] of (lesson.slides || []).entries()) {
        if (slide.type !== 'peerTask') continue;
        const isDefinitionRecall = slide.taskType === 'definitionRecall';
        if (slide.taskType !== 'missingSentence' && (!slide.prompt || slide.prompt.trim().length < 24)) {
          failures.push(`${slideFile} slide ${index + 1}: missing clear prompt`);
        }
        if (!isDefinitionRecall && (slide.steps || []).length !== 3) {
          failures.push(`${slideFile} slide ${index + 1}: must have exactly three visible steps`);
        }
        if (slide.taskType !== 'missingSentence' && !slide.sharePrompt) failures.push(`${slideFile} slide ${index + 1}: missing share prompt`);

        const taskText = [
          slide.prompt,
          slide.sharePrompt,
          ...(slide.steps || []).map((step) => Array.isArray(step) ? step[1] : step),
          ...(slide.definitionItems || []).map((item) => `${item.term || ''} ${item.answer || ''}`),
        ].join(' ');
        if (vagueReferences.test(taskText)) {
          failures.push(`${slideFile} slide ${index + 1}: depends on another slide instead of the task surface`);
        }

        if (slide.taskType === 'missingSentence') {
          if (slide.title !== 'Complete the missing sentence') {
            failures.push(`${slideFile} slide ${index + 1}: missing-sentence task needs the standard title`);
          }
          if (!slide.zhPrompt) {
            failures.push(`${slideFile} slide ${index + 1}: missing-sentence task should keep Chinese task translation`);
          }
          if (slide.prompt || slide.sharePrompt) {
            failures.push(`${slideFile} slide ${index + 1}: missing-sentence task should not repeat English prompt/footer`);
          }
          if ((slide.sampleAnswers || []).length) {
            failures.push(`${slideFile} slide ${index + 1}: missing-sentence task should not show a model-answer panel`);
          }
          if ((slide.partialReview || []).length) {
            failures.push(`${slideFile} slide ${index + 1}: missing-sentence task should use a blank answer, not partial reveals`);
          }
          const stepIndex = Number(slide.missingSentenceStep || 0) - 1;
          const missingStep = (slide.steps || [])[stepIndex];
          const missingText = Array.isArray(missingStep) ? missingStep[1] : String(missingStep || '');
          const missingAnswer = slide.missingSentenceAnswer || (Array.isArray(missingStep) ? missingStep[2] : '');
          if (!missingText.includes('__________') || !missingAnswer) {
            failures.push(`${slideFile} slide ${index + 1}: missing-sentence task needs one hidden blank answer`);
          }
          const answerWordCount = String(missingAnswer).trim().split(/\s+/).filter(Boolean).length;
          if (answerWordCount < 7 || !/[.!?]$/.test(String(missingAnswer).trim())) {
            failures.push(`${slideFile} slide ${index + 1}: missing-sentence answer should be a full sentence`);
          }
        } else if (isDefinitionRecall) {
          if ((slide.definitionItems || []).length !== 3) {
            failures.push(`${slideFile} slide ${index + 1}: definition recall needs exactly three definition items`);
          }
          for (const item of slide.definitionItems || []) {
            if (!item.label || !item.term || !item.answer) {
              failures.push(`${slideFile} slide ${index + 1}: definition recall item needs label, term and answer`);
              continue;
            }
            const wordCount = String(item.answer).trim().split(/\s+/).filter(Boolean).length;
            if (wordCount < 10 || !/[.!?]$/.test(String(item.answer).trim())) {
              failures.push(`${slideFile} slide ${index + 1}: definition recall answer is not a full model definition`);
            }
          }
        } else {
          if (!(slide.sampleAnswers || []).length) failures.push(`${slideFile} slide ${index + 1}: missing sample answer`);
          for (const selector of slide.partialReview || []) {
            if (hiddenTaskSelectors.has(selector)) failures.push(`${slideFile} slide ${index + 1}: hides task instructions`);
          }
          if (!(slide.partialReview || []).includes('.peerTaskSamples > .choice')) {
            failures.push(`${slideFile} slide ${index + 1}: sample answer should be the reveal target`);
          }

          for (const answer of slide.sampleAnswers || []) {
            const wordCount = String(answer).trim().split(/\s+/).filter(Boolean).length;
            if (wordCount < 12 || !/[.!?]$/.test(String(answer).trim())) {
              failures.push(`${slideFile} slide ${index + 1}: sample answer is not a full model answer`);
            }
          }
        }
      }
    }

    expect(failures).toEqual([]);
  });

  test('monetary policy classification tasks use the dedicated classification slide type', () => {
    const slideFiles = [
      'lessons/unit-4-government/4-3-monetary-policy/slides-lesson-1.js',
      'lessons/unit-4-government/4-3-monetary-policy/slides-lesson-2.js',
      'lessons/unit-4-government/4-3-monetary-policy/slides-lesson-3.js',
    ];
    const failures = [];
    let classificationCount = 0;
    let yesNoCheckCount = 0;

    for (const slideFile of slideFiles) {
      const lesson = readLesson(slideFile);
      for (const [index, slide] of (lesson.slides || []).entries()) {
        if (slide.type === 'peerTask' && /\bclassify\b/i.test(`${slide.prompt || ''} ${slide.sharePrompt || ''}`)) {
          failures.push(`${slideFile} slide ${index + 1}: classify task still uses peerTask`);
        }
        if (slide.type === 'yesNoCheck') {
          yesNoCheckCount += 1;
          if (!slide.title || !slide.prompt || (slide.items || []).length < 3) {
            failures.push(`${slideFile} slide ${index + 1}: yes/no check is missing title, prompt or items`);
          }
          for (const [itemIndex, item] of (slide.items || []).entries()) {
            if (!item.statement || typeof item.answer !== 'boolean' || !item.reason) {
              failures.push(`${slideFile} slide ${index + 1} item ${itemIndex + 1}: missing statement, boolean answer or reason`);
            }
          }
        }
        if (slide.type !== 'classificationTask') continue;
        classificationCount += 1;
        if (!slide.title || !slide.prompt || !slide.zhPrompt) {
          failures.push(`${slideFile} slide ${index + 1}: missing title, prompt or zhPrompt`);
        }
        if ((slide.categories || []).length < 2) {
          failures.push(`${slideFile} slide ${index + 1}: needs at least two visible categories`);
        }
        if ((slide.items || []).length !== 3) {
          failures.push(`${slideFile} slide ${index + 1}: should classify exactly three cases`);
        }
        for (const [itemIndex, item] of (slide.items || []).entries()) {
          if (!item.text || !item.answer || !item.reason) {
            failures.push(`${slideFile} slide ${index + 1} item ${itemIndex + 1}: missing text, answer or reason`);
          }
          if (String(item.reason || '').trim().split(/\s+/).filter(Boolean).length < 7) {
            failures.push(`${slideFile} slide ${index + 1} item ${itemIndex + 1}: reason is too thin`);
          }
        }
      }
    }

    expect(classificationCount).toBe(5);
    expect(yesNoCheckCount).toBe(1);
    expect(failures).toEqual([]);
  });

  test('fiscal policy lesson 4 uses varied checks and avoids unclear student-facing wording', () => {
    const lesson = readLesson('lessons/unit-4-government/4-2-fiscal-policy/slides-lesson-4.js');
    const slides = lesson.slides || [];
    const taughtTypes = new Set(['term', 'flow', 'cards']);
    const formativeTypes = new Set(['answer', 'classificationTask', 'peerTask', 'quiz', 'yesNoCheck']);
    const formativeSeen = new Set();
    const failures = [];

    for (const [index, slide] of slides.entries()) {
      for (const field of ['title', 'question', 'prompt']) {
        if (/\b(?:stance|route|chain)\b/i.test(String(slide[field] || ''))) {
          failures.push(`slide ${index + 1}: ${field} uses unclear wording`);
        }
      }
      for (const objective of slide.type === 'outcomes' ? slide.bullets || [] : []) {
        if (/\b(?:stance|route|chain)\b/i.test(objective)) failures.push(`objective uses unclear wording: ${objective}`);
      }

      if (formativeTypes.has(slide.type)) formativeSeen.add(slide.type);

      if (taughtTypes.has(slide.type)) {
        const nextSlide = slides[index + 1];
        if (!formativeTypes.has(nextSlide?.type)) {
          failures.push(`slide ${index + 1} ${slide.type} -> ${nextSlide?.type || 'end'}`);
        }
      }

      if (slide.type === 'term') {
        if (slide.eyebrow === 'Definition') failures.push(`slide ${index + 1}: repeated Definition eyebrow`);
        if (slide.definitionCue === 'Definition') failures.push(`slide ${index + 1}: repeated Definition cue`);
        if ((slide.partialReview || []).includes('.termBox')) failures.push(`slide ${index + 1}: termBox should not be hidden`);
      }
    }

    expect(formativeSeen.has('answer')).toBe(true);
    expect(formativeSeen.has('peerTask')).toBe(true);
    expect(formativeSeen.has('quiz')).toBe(true);
    expect(failures).toEqual([]);
  });

  test('exam chain slides are followed by mark-scheme model answers', () => {
    const slideFiles = findSlideFiles(path.join(root, 'lessons'), root)
      .filter((slideFile) => !slideFile.includes('/_template/'));
    const missingModelAnswers = [];

    for (const slideFile of slideFiles) {
      const lesson = readLesson(slideFile);
      const slides = lesson.slides || [];

      for (const [index, slide] of slides.entries()) {
        if (slide.type !== 'exam') continue;

        const nextSlide = slides[index + 1];
        const label = `${slideFile} slide ${index + 1}`;
        if (nextSlide?.type !== 'modelAnswer') {
          missingModelAnswers.push(`${label}: next slide is not modelAnswer`);
          continue;
        }

        expect(nextSlide.question, `${label} model question`).toBe(slide.question);
        expect(nextSlide.answer, `${label} model answer`).toEqual(expect.any(String));
        expect(nextSlide.answer.trim(), `${label} model answer`).not.toHaveLength(0);
        expect(nextSlide.markSchemeNote, `${label} markSchemeNote`).toEqual(expect.any(String));
        expect(nextSlide.markSchemeNote, `${label} markSchemeNote`).toMatch(/\b(?:explain|analyse|discuss|mark|scheme|level|chain|judgement|transmission)\b/i);

        for (const keyword of slide.keywords || []) {
          expect(nextSlide.links || [], `${label} links include ${keyword}`).toContain(keyword);
        }
      }
    }

    expect(missingModelAnswers).toEqual([]);
  });

  test('exam practice planning keywords are visible immediately', async ({ page }) => {
    const lessonPath = 'lessons/unit-4-government/4-3-monetary-policy/lesson-2.html';
    await page.goto(pageUrl(lessonPath));
    const slideNumber = await page.evaluate(() => window.IGCSE.lesson.slides
      .findIndex((slide) => slide.type === 'exam' && /higher interest rates may reduce inflation/i.test(slide.question || '')) + 1);

    expect(slideNumber).toBeGreaterThan(0);
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto(`${pageUrl(lessonPath)}#${slideNumber}`);

    await expect(page.locator('.slide.is-active .examBlock')).toBeVisible();
    await expect(page.locator('.slide.is-active .examBlock .card')).toHaveCount(5);
    await expect(page.locator('.slide.is-active .examBlock .card').first()).toBeVisible();
    await expect(page.locator('.slide.is-active .examBlock .prompt')).toBeVisible();
    await expect(page.locator('.slide.is-active .partial-item')).toHaveCount(0);
    await expectNoHorizontalOverflow(page);
  });

  test('yes/no checks reveal one statement then its answer', async ({ page }) => {
    const lessonPath = 'lessons/unit-4-government/4-3-monetary-policy/lesson-2.html';
    await page.goto(pageUrl(lessonPath));
    const slideNumber = await page.evaluate(() => window.IGCSE.lesson.slides
      .findIndex((slide) => slide.type === 'yesNoCheck') + 1);

    expect(slideNumber).toBeGreaterThan(0);
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto(`${pageUrl(lessonPath)}#${slideNumber}`);

    await expect(page.locator('.slide.is-active .yesNoRow')).toHaveCount(4);
    await expect(page.locator('.slide.is-active .yesNoRow.is-visible')).toHaveCount(0);
    await expect(page.locator('.slide.is-active .yesNoAnswer.is-visible')).toHaveCount(0);
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('.slide.is-active .yesNoRow.is-visible')).toHaveCount(1);
    await expect(page.locator('.slide.is-active .yesNoAnswer.is-visible')).toHaveCount(0);
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('.slide.is-active .yesNoRow.is-visible')).toHaveCount(1);
    await expect(page.locator('.slide.is-active .yesNoAnswer.is-visible')).toHaveCount(1);
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('.slide.is-active .yesNoRow.is-visible')).toHaveCount(2);
    await expect(page.locator('.slide.is-active .yesNoAnswer.is-visible')).toHaveCount(1);
    await expectNoHorizontalOverflow(page);
  });

  test('fact slide text keeps source attribution in source lines', () => {
    const slideFiles = findSlideFiles(path.join(root, 'lessons'), root);
    const badFacts = [];
    const sourceAttributionPattern = /\b(?:according to|the world bank|world bank|who estimates|unesco estimated|ilo reported|starbucks reported)\b/i;

    for (const slideFile of slideFiles) {
      const lesson = readLesson(slideFile);
      for (const [index, slide] of (lesson.slides || []).entries()) {
        if (slide.type !== 'fact') continue;

        for (const panel of factPanels(slide)) {
          const visibleText = [panel.context, panel.question].filter(Boolean).join(' ');
          if (sourceAttributionPattern.test(visibleText)) {
            badFacts.push(`${slideFile} slide ${index + 1}: ${visibleText}`);
          }
        }
      }
    }

    expect(badFacts).toEqual([]);
  });

  test('fact slides render context and question without overflow', async ({ page }) => {
    const targets = [
      { htmlFile: 'lessons/unit-2-allocation/2-8-market-economic-system/lesson-1.html', slideNumber: 5 },
      { htmlFile: 'lessons/unit-2-allocation/2-8-market-economic-system/lesson-3.html', slideNumber: 14 },
      { htmlFile: 'lessons/unit-2-allocation/2-9-market-failure/lesson-3.html', slideNumber: 14 },
      { htmlFile: 'lessons/unit-2-allocation/2-review-cocoa-chocolate-section-a/index.html', slideNumber: 2 },
      { htmlFile: 'lessons/unit-4-government/4-2-fiscal-policy/lesson-4.html', slideNumber: 7 },
      { htmlFile: 'lessons/unit-4-government/4-3-monetary-policy/lesson-4.html', slideNumber: 5 },
      { htmlFile: 'lessons/unit-4-government/4-4-supply-side-policy/lesson-3.html', slideNumber: 8 },
    ];

    let checkedFactInteraction = false;
    for (const target of targets) {
      await page.goto(`${pageUrl(target.htmlFile)}#${target.slideNumber}`, { waitUntil: 'domcontentloaded' });
      await expect(page.locator('.slide.is-active .factContext').first()).toBeVisible();
      await expect(page.locator('.slide.is-active .factQuestion').first()).toBeVisible();
      await expect(page.locator('.slide.is-active .factQuestionZh').first()).toBeVisible();
      await expect(page.locator('.slide.is-active .chinaCompareButton')).toHaveCount(0);
      await expect(page.locator('.slide.is-active .factCompareSlider')).toHaveCount(0);
      await expect(page.locator('.slide.is-active .factAnswerButton')).toBeVisible();
      await expectNoHorizontalOverflow(page);

      if (!checkedFactInteraction) {
        const chinaButton = page.locator('.slide.is-active .factSwitchButton[data-fact-target="china"]');
        if (await chinaButton.count()) {
          await expect(page.locator('.slide.is-active .factSwitchButton[data-fact-target="example"]')).toHaveAttribute('aria-pressed', 'true');
          await expect(page.locator('.slide.is-active .factPanelStack .factCountry')).toHaveCount(0);
          await chinaButton.click();
          await expect(chinaButton).toHaveAttribute('aria-pressed', 'true');
          await expect(page.locator('.slide.is-active .factPanel.is-china.is-active')).toBeVisible();
        }
        await page.locator('.slide.is-active .factAnswerButton').click();
        await expect(page.getByRole('dialog', { name: /^Possible answer$/i })).toBeVisible();
        await page.getByRole('button', { name: /^Close possible answer$/i }).click();
        checkedFactInteraction = true;
      }

      const metrics = await page.evaluate(() => {
        const slide = document.querySelector('.slide.is-active');
        const factBlock = slide?.querySelector('.factBlock');
        const visual = slide?.querySelector('.visual');
        const hasSwitcher = Boolean(slide?.querySelector('.factCountrySwitch'));
        const slideRect = slide?.getBoundingClientRect();
        const factRect = factBlock?.getBoundingClientRect();
        const visualRect = visual?.getBoundingClientRect();

        return {
          factBottom: factRect?.bottom ?? 0,
          visualBottom: visualRect?.bottom ?? 0,
          slideBottom: slideRect?.bottom ?? window.innerHeight,
          factWidth: factRect?.width ?? 0,
          slideWidth: slideRect?.width ?? window.innerWidth,
          countryBadges: slide?.querySelectorAll('.factPanelStack .factCountry').length ?? 0,
          hasSwitcher,
        };
      });

      expect(metrics.factBottom, `${target.htmlFile}#${target.slideNumber}`).toBeLessThanOrEqual(metrics.slideBottom + 2);
      expect(metrics.visualBottom, `${target.htmlFile}#${target.slideNumber}`).toBeLessThanOrEqual(metrics.slideBottom + 2);
      if (metrics.hasSwitcher) {
        expect(metrics.countryBadges, `${target.htmlFile}#${target.slideNumber}`).toBe(0);
      } else {
        expect(metrics.countryBadges, `${target.htmlFile}#${target.slideNumber}`).toBeGreaterThan(0);
      }
      if (metrics.slideWidth > 960) {
        expect(metrics.factWidth, `${target.htmlFile}#${target.slideNumber}`).toBeGreaterThan(620);
      }
    }
  });

  test('section divider subtitles stay student-facing when present', () => {
    const slideFiles = findSlideFiles(path.join(root, 'lessons'), root);
    const badSubtitles = [];
    const syllabusPrefix = /^\d+(?:\.\d+)*(?:-\d+(?:\.\d+)*)?\s+-/;
    const formulaicBreadcrumb = /\b(?:advantages|disadvantages)\s+include\b/i;
    const normalize = (value) => String(value || '').replace(/\s+/g, ' ').trim().toLowerCase();

    for (const slideFile of slideFiles) {
      const lesson = readLesson(slideFile);
      for (const [index, slide] of (lesson.slides || []).entries()) {
        if (slide.type !== 'section' || !slide.subtitle) continue;

        const subtitle = String(slide.subtitle).trim();
        const normalizedSubtitle = normalize(subtitle);
        const normalizedTitle = normalize(slide.title);
        const label = `${slideFile} slide ${index + 1}: ${subtitle}`;

        if (syllabusPrefix.test(subtitle)) badSubtitles.push(`${label} starts with a syllabus code`);
        if (formulaicBreadcrumb.test(subtitle)) badSubtitles.push(`${label} uses formulaic breadcrumb wording`);
        if (normalizedSubtitle === normalizedTitle) badSubtitles.push(`${label} repeats the title`);
      }
    }

    expect(badSubtitles).toEqual([]);
  });

  test('section divider titles name the concept being taught', () => {
    const slideFiles = findSlideFiles(path.join(root, 'lessons'), root);
    const vagueTitles = new Set(['too much', 'too little', 'none', 'part 1', 'part 2', 'next idea']);
    const badTitles = [];

    for (const slideFile of slideFiles) {
      const lesson = readLesson(slideFile);
      for (const [index, slide] of (lesson.slides || []).entries()) {
        if (slide.type !== 'section') continue;

        const title = String(slide.title || '').replace(/\s+/g, ' ').trim().toLowerCase();
        if (vagueTitles.has(title)) {
          badTitles.push(`${slideFile} slide ${index + 1}: ${slide.title}`);
        }
      }
    }

    expect(badTitles).toEqual([]);
  });

  test('important key-term title slides include Chinese titles', () => {
    const slideFiles = findSlideFiles(path.join(root, 'lessons'), root);
    const missingZhTitles = [];
    const keyFlowTitles = new Set([
      'Demand rises',
      'Demand falls',
      'Inequality',
      'External costs',
      'External benefits',
      'Public goods may be under-provided',
      'Over-consumption',
      'Under-consumption',
      'Non-provision',
      'Restricted monopoly supply',
      'Growth can raise living standards',
      'Stable prices protect confidence',
      '1. Provide merit goods',
      '2. Provide public goods',
      '3. Invest in infrastructure',
      '4. Support key industries',
      '5. Reduce inequality',
      '6. Manage the macroeconomy',
      '1. Raise revenue',
      '2. Reduce demerit goods',
      '3. Reduce imports',
      '4. Redistribute income',
      '5. Influence demand',
      '6. Encourage sustainability',
      'Indirect tax on tobacco',
      'Why a sales tax can be regressive',
      'Sales tax can be regressive',
      'Expansionary policy',
      'Contractionary policy',
      'Economic growth',
      'Employment',
      'Price stability',
      'Redistribution',
      'Balance of payments',
      'Sustainability',
      'Lower rates and spending',
      'Lower rates and investment',
      'Higher rates and spending',
      'Higher rates and saving',
      'Increasing money supply',
      'Reducing money supply',
      'Lower exchange rate',
      'Higher exchange rate',
      'Spending and borrowing',
      'Investment and output',
      'Saving and spending',
      'Borrowing and investment',
      'Inflation',
      'Imports effect',
      'Exchange-rate effect',
    ]);
    const normalize = (value) => String(value || '').replace(/\s+/g, ' ').trim();

    for (const slideFile of slideFiles) {
      const lesson = readLesson(slideFile);
      for (const [index, slide] of (lesson.slides || []).entries()) {
        const title = normalize(slide.title);
        const requiresZhTitle = slide.type === 'section'
          || slide.type === 'term'
          || (slide.type === 'flow' && keyFlowTitles.has(title));

        if (requiresZhTitle && !slide.zhTitle) {
          missingZhTitles.push(`${slideFile} slide ${index + 1}: ${slide.type} "${title}"`);
        }
      }
    }

    expect(missingZhTitles).toEqual([]);
  });

  test('discussion slides reveal bilingual possible answers without advancing', async ({ page }) => {
    await page.goto(pageUrl('lessons/unit-4-government/4-2-fiscal-policy/lesson-4.html') + '#2');

    const expected = await page.evaluate(() => {
      const slide = window.IGCSE.lesson.slides[1];
      return {
        zh: slide.zh,
        answer: slide.answer,
        answerZh: slide.answerZh
      };
    });

    await expect(page.locator('.slide.is-active')).toHaveAttribute('data-idx', '1');
    await expect(page.locator('.slide.is-active .discussionPrompt .zh')).toHaveText(expected.zh);
    await page.getByRole('button', { name: /^Show possible answer$/i }).click();

    const dialog = page.getByRole('dialog', { name: /^Possible answer$/i });
    await expect(dialog).toBeVisible();
    await expect(dialog.locator('.discussionAnswerText')).toHaveText(expected.answer);
    await expect(dialog.locator('.discussionAnswerZh')).toHaveText(expected.answerZh);

    await page.keyboard.press('ArrowRight');
    await expect(page.locator('.slide.is-active')).toHaveAttribute('data-idx', '1');
    await expect(dialog).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(page.locator('.slide.is-active')).toHaveAttribute('data-idx', '1');
    await expectNoHorizontalOverflow(page);
  });

  test('market failure section progress shows three lesson parts', async ({ page }) => {
    const lessonPaths = [
      'lessons/unit-2-allocation/2-9-market-failure/lesson-1.html',
      'lessons/unit-2-allocation/2-9-market-failure/lesson-2.html',
      'lessons/unit-2-allocation/2-9-market-failure/lesson-3.html',
      'lessons/unit-2-allocation/2-9-market-failure/lesson-4.html',
    ];

    for (const lessonPath of lessonPaths) {
      await page.goto(pageUrl(lessonPath));
      const sectionNumbers = await page.evaluate(() => window.IGCSE.lesson.slides
        .map((slide, index) => slide.type === 'section' ? index + 1 : null)
        .filter(Boolean));

      expect(sectionNumbers, lessonPath).toHaveLength(3);
      for (const sectionNumber of sectionNumbers) {
        await page.goto(`${pageUrl(lessonPath)}#${sectionNumber}`);
        await expect(page.locator('.slide.is-active .sectionProgress span')).toHaveCount(3);
        await expectNoHorizontalOverflow(page);
      }
    }
  });

  test('target fiscal and monetary section progress shows three lesson parts', async ({ page }) => {
    const lessonPaths = [
      'lessons/unit-4-government/4-2-fiscal-policy/lesson-4.html',
      'lessons/unit-4-government/4-2-fiscal-policy/lesson-5.html',
      'lessons/unit-4-government/4-3-monetary-policy/lesson-1.html',
      'lessons/unit-4-government/4-3-monetary-policy/lesson-2.html',
      'lessons/unit-4-government/4-3-monetary-policy/lesson-3.html',
      'lessons/unit-4-government/4-3-monetary-policy/lesson-4.html',
    ];

    for (const lessonPath of lessonPaths) {
      await page.goto(pageUrl(lessonPath));
      const sectionNumbers = await page.evaluate(() => window.IGCSE.lesson.slides
        .map((slide, index) => slide.type === 'section' ? index + 1 : null)
        .filter(Boolean));

      expect(sectionNumbers, lessonPath).toHaveLength(3);
      for (const sectionNumber of sectionNumbers) {
        await page.goto(`${pageUrl(lessonPath)}#${sectionNumber}`);
        await expect(page.locator('.slide.is-active .sectionProgress span')).toHaveCount(3);
        await expectNoHorizontalOverflow(page);
      }
    }
  });

  test('target fiscal and monetary decks render slide and handout views without overflow', async ({ page }) => {
    const lessonPaths = [
      'lessons/unit-4-government/4-2-fiscal-policy/lesson-4.html',
      'lessons/unit-4-government/4-2-fiscal-policy/lesson-5.html',
      'lessons/unit-4-government/4-3-monetary-policy/lesson-3.html',
    ];

    for (const lessonPath of lessonPaths) {
      await page.setViewportSize({ width: 1366, height: 768 });
      await page.goto(pageUrl(lessonPath));
      const slideNumbers = await page.evaluate(() => {
        const slides = window.IGCSE.lesson.slides;
        return {
          peerTask: slides.findIndex((slide) => slide.type === 'peerTask') + 1,
          classificationTask: slides.findIndex((slide) => slide.type === 'classificationTask') + 1,
          term: slides.findIndex((slide) => slide.type === 'term') + 1,
          compare: slides.findIndex((slide) => slide.type === 'compare') + 1,
          flow: slides.findIndex((slide) => slide.type === 'flow') + 1,
          denseCards: slides.findIndex((slide) => slide.type === 'cards' && [
            'Fiscal policy and macro aims',
            'Money supply measures',
          ].includes(slide.title)) + 1,
        };
      });

      for (const slideNumber of [slideNumbers.peerTask, slideNumbers.classificationTask, slideNumbers.term, slideNumbers.compare, slideNumbers.flow, slideNumbers.denseCards].filter(Boolean)) {
        await page.goto(`${pageUrl(lessonPath)}#${slideNumber}`);
        await expectNoHorizontalOverflow(page);
      }

      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${pageUrl(lessonPath)}#${slideNumbers.peerTask || slideNumbers.term}`);
      await expectNoHorizontalOverflow(page);

      await page.setViewportSize({ width: 1200, height: 900 });
      await page.goto(pageUrl(lessonPath) + '?view=print');
      await expect(page.locator('.handoutDocument')).toBeVisible();
      await expect(page.locator('.handoutSources')).toHaveCount(0);
      await expect(page.locator('.handoutDocument')).not.toContainText(/^Sources$/);
      const repeatedDefinitionLabels = await page.locator('.handoutBlock.is-definition').evaluateAll((blocks) => blocks
        .map((block) => ({
          heading: block.querySelector('h3')?.textContent?.trim().toLowerCase() || '',
          nestedTerm: block.querySelector('.handoutDefinition > b')?.textContent?.trim().toLowerCase() || '',
        }))
        .filter((item) => item.heading && item.nestedTerm && item.heading === item.nestedTerm));
      expect(repeatedDefinitionLabels).toEqual([]);
      await expectNoHorizontalOverflow(page);

      await page.emulateMedia({ media: 'print' });
      const printPaginationStyles = await page.locator('.handoutDocument').evaluate((documentEl) => {
        const section = document.querySelector('.handoutSection');
        const body = document.querySelector('.handoutSectionBody');
        const block = document.querySelector('.handoutBlock');
        return {
          documentDisplay: getComputedStyle(documentEl).display,
          sectionDisplay: section ? getComputedStyle(section).display : '',
          bodyDisplay: body ? getComputedStyle(body).display : '',
          blockBreakInside: block ? getComputedStyle(block).breakInside : '',
        };
      });
      expect(printPaginationStyles).toEqual({
        documentDisplay: 'block',
        sectionDisplay: 'block',
        bodyDisplay: 'block',
        blockBreakInside: 'auto',
      });
      await page.emulateMedia({ media: 'screen' });
    }
  });

  test('target fiscal and monetary fill-blank flows reveal only keyword blanks', async ({ page }) => {
    const lessonPaths = [
      'lessons/unit-4-government/4-2-fiscal-policy/lesson-4.html',
      'lessons/unit-4-government/4-2-fiscal-policy/lesson-5.html',
      'lessons/unit-4-government/4-3-monetary-policy/lesson-2.html',
    ];

    for (const lessonPath of lessonPaths) {
      await page.setViewportSize({ width: 1366, height: 768 });
      await page.goto(pageUrl(lessonPath));
      const flowSlideNumber = await page.evaluate(() => window.IGCSE.lesson.slides
        .findIndex((slide) => slide.type === 'flow') + 1);

      await page.goto(`${pageUrl(lessonPath)}#${flowSlideNumber}`);
      await expect(page.locator('.slide.is-active .flowChip')).toHaveCount(4);
      await expect(page.locator('.slide.is-active .flowChip.partial-item')).toHaveCount(0);
      await expect(page.locator('.slide.is-active .flowTextZh')).toHaveCount(4);
      await expect(page.locator('.slide.is-active .flowText .blankAnswer')).toHaveCount(4);
      await expect(page.locator('.slide.is-active .flowText .blankAnswer.is-revealed')).toHaveCount(0);

      await page.locator('.slide.is-active .flowText .blankAnswer').first().click();
      await expect(page.locator('.slide.is-active .flowText .blankAnswer.is-revealed')).toHaveCount(1);
      await expectNoHorizontalOverflow(page);

      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${pageUrl(lessonPath)}#${flowSlideNumber}`);
      await expectNoHorizontalOverflow(page);

      await page.setViewportSize({ width: 1200, height: 900 });
      await page.goto(pageUrl(lessonPath) + '?view=print');
      await expect(page.locator('.handoutBlock.is-flow .handoutFlow li').first().locator('.handoutBlank')).toHaveCount(1);
      const blankWidth = await page.locator('.handoutBlock.is-flow .handoutBlank').first().evaluate((blank) => blank.getBoundingClientRect().width);
      expect(blankWidth).toBeGreaterThanOrEqual(95);
      await expect(page.locator('.handoutBlock.is-flow .blankAnswer')).toHaveCount(0);
      await expectNoHorizontalOverflow(page);
    }
  });

  test('@smoke @responsive handout fill-blank answers can be toggled', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 900 });
    await page.goto(pageUrl('lessons/unit-4-government/4-3-monetary-policy/lesson-2.html') + '?view=print');

    await expect(page.locator('.handoutDocument')).toBeVisible();
    await expect(page.locator('.handoutToolbar')).toBeVisible();
    await expect(page.locator('.handoutAnswerToggle')).toBeVisible();
    const checkbox = page.locator('[data-handout-answer-toggle]');
    await expect(checkbox).not.toBeChecked();

    const answerBlankCount = await page.locator('.handoutBlank[data-answer]').count();
    expect(answerBlankCount).toBeGreaterThan(0);
    const firstAnswerBlank = page.locator('.handoutBlank[data-answer]').first();
    const readBlankState = () => firstAnswerBlank.evaluate((blank) => {
      const style = window.getComputedStyle(blank);
      const afterStyle = window.getComputedStyle(blank, '::after');
      return {
        answer: blank.getAttribute('data-answer') || '',
        ariaLabel: blank.getAttribute('aria-label') || '',
        afterContent: afterStyle.content || '',
        borderBottomWidth: style.borderBottomWidth,
        width: blank.getBoundingClientRect().width,
      };
    });

    const hiddenState = await readBlankState();
    expect(hiddenState.answer).toBeTruthy();
    expect(hiddenState.ariaLabel).toBe('blank');
    expect(hiddenState.afterContent).not.toContain(hiddenState.answer);
    expect(parseFloat(hiddenState.borderBottomWidth)).toBeGreaterThan(0);

    await page.locator('.handoutAnswerToggle').click();
    await expect(checkbox).toBeChecked();
    await expect(page.locator('#deck')).toHaveClass(/is-showing-answers/);
    const shownState = await readBlankState();
    expect(shownState.afterContent).toContain(shownState.answer);
    expect(shownState.ariaLabel).toContain(`answer: ${shownState.answer}`);
    expect(parseFloat(shownState.borderBottomWidth)).toBe(0);

    await page.emulateMedia({ media: 'print' });
    await expect(page.locator('.handoutToolbar')).toBeHidden();
    const printState = await readBlankState();
    expect(printState.afterContent).toContain(printState.answer);
    expect(parseFloat(printState.borderBottomWidth)).toBe(0);
    await page.emulateMedia({ media: 'screen' });

    await page.locator('.handoutAnswerToggle').click();
    await expect(checkbox).not.toBeChecked();
    const restoredState = await readBlankState();
    expect(restoredState.afterContent).not.toContain(restoredState.answer);
    expect(restoredState.ariaLabel).toBe('blank');
    expect(parseFloat(restoredState.borderBottomWidth)).toBeGreaterThan(0);

    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.locator('.handoutAnswerToggle')).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });

  test('fiscal policy lesson 4 reveals term notes and peer examples only after the task', async ({ page }) => {
    const lessonPath = 'lessons/unit-4-government/4-2-fiscal-policy/lesson-4.html';
    await page.goto(pageUrl(lessonPath));
    const slideNumbers = await page.evaluate(() => {
      const slides = window.IGCSE.lesson.slides;
      return {
        term: slides.findIndex((slide) => slide.type === 'term') + 1,
        peerTask: slides.findIndex((slide) => slide.type === 'peerTask') + 1,
      };
    });

    expect(slideNumbers.term).toBeGreaterThan(0);
    await page.goto(`${pageUrl(lessonPath)}#${slideNumbers.term}`);
    await expect(page.locator('.slide.is-active .termDefinitionText')).toBeVisible();
    await expect(page.locator('.slide.is-active .termDefinitionText .blankAnswer')).toHaveCount(3);
    await expect(page.locator('.slide.is-active .definitionTermNote')).toHaveCount(3);
    await expect(page.locator('.slide.is-active .definitionTermNote.partial-item.is-visible')).toHaveCount(0);
    await expect(page.locator('.slide.is-active .termBox.partial-item')).toHaveCount(0);
    const visibleDefinitionLabels = await page.evaluate(() => {
      const active = document.querySelector('.slide.is-active');
      const visibleText = [...active.querySelectorAll('*')]
        .filter((el) => {
          const style = getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          return style.visibility !== 'hidden' && style.display !== 'none' && rect.width > 0 && rect.height > 0;
        })
        .map((el) => el.textContent.trim())
        .join(' ');
      return (visibleText.match(/\bDefinition\b/g) || []).length;
    });
    expect(visibleDefinitionLabels).toBe(0);
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('.slide.is-active .definitionTermNote.partial-item.is-visible')).toHaveCount(1);

    expect(slideNumbers.peerTask).toBeGreaterThan(0);
    await page.goto(`${pageUrl(lessonPath)}#${slideNumbers.peerTask}`);
    await expect(page.locator('.slide.is-active .peerTaskBlock')).toBeVisible();
    await expect(page.locator('.slide.is-active .peerTaskBlock > h2')).toHaveCount(0);
    await expect(page.locator('.slide.is-active .steps .step')).toHaveCount(3);
    await expect(page.locator('.slide.is-active .steps .step.partial-item')).toHaveCount(0);
    await expect(page.locator('.slide.is-active .peerTaskShare')).toBeVisible();
    await expect(page.locator('.slide.is-active .peerTaskShare.partial-item')).toHaveCount(0);
    await expect(page.locator('.slide.is-active .peerTaskSampleLabel')).toBeVisible();
    await expect(page.locator('.slide.is-active .peerTaskSamples .choice')).toHaveCount(1);
    await expect(page.locator('.slide.is-active .peerTaskSamples .choice.is-visible')).toHaveCount(0);
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('.slide.is-active .peerTaskSamples .choice.is-visible')).toHaveCount(1);
    await expectNoHorizontalOverflow(page);
  });

  test('monetary policy classification tasks reveal answer reasons after classification', async ({ page }) => {
    const lessonPath = 'lessons/unit-4-government/4-3-monetary-policy/lesson-1.html';
    await page.goto(pageUrl(lessonPath));
    const slideNumber = await page.evaluate(() => window.IGCSE.lesson.slides
      .findIndex((slide) => slide.type === 'classificationTask') + 1);

    expect(slideNumber).toBeGreaterThan(0);
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto(`${pageUrl(lessonPath)}#${slideNumber}`);
    await expect(page.locator('.slide.is-active .classificationTaskBlock')).toBeVisible();
    await expect(page.locator('.slide.is-active .classificationTaskBlock .lead')).toHaveCount(0);
    await expect(page.locator('.slide.is-active .classificationZh')).toHaveCount(0);
    await expect(page.locator('.slide.is-active .classificationCategory')).toHaveCount(0);
    await expect(page.locator('.slide.is-active .classificationItem')).toHaveCount(3);
    await expect(page.locator('.slide.is-active .classificationResult')).toHaveCount(3);
    await expect(page.locator('.slide.is-active .classificationResult.partial-item.is-visible')).toHaveCount(0);
    await expect(page.locator('.slide.is-active .classificationShare.partial-item')).toHaveCount(0);
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('.slide.is-active .classificationResult.partial-item.is-visible')).toHaveCount(1);
    await expectNoHorizontalOverflow(page);

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${pageUrl(lessonPath)}#${slideNumber}`);
    await expect(page.locator('.slide.is-active .classificationItem')).toHaveCount(3);
    await expectNoHorizontalOverflow(page);
  });

  test('lesson MCQ explanations reveal only after a choice is selected', async ({ page }) => {
    const lessonPath = 'lessons/unit-4-government/4-3-monetary-policy/lesson-2.html';
    await page.goto(pageUrl(lessonPath));
    const slideNumber = await page.evaluate(() => window.IGCSE.lesson.slides
      .findIndex((slide) => slide.type === 'quiz') + 1);

    expect(slideNumber).toBeGreaterThan(0);
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto(`${pageUrl(lessonPath)}#${slideNumber}`);

    await expect(page.locator('.slide.is-active .quizBlock')).toBeVisible();
    await expect(page.locator('.slide.is-active .mcqExplanation')).toBeHidden();
    await page.locator('.slide.is-active .choices.is-mcq .choice').first().click();
    await expect(page.locator('.slide.is-active .mcqExplanation')).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });

  test('peer task slides render pair checks without overflow', async ({ page }) => {
    await page.goto(pageUrl('lessons/unit-2-allocation/2-9-market-failure/lesson-1.html'));
    const peerTaskNumber = await page.evaluate(() => window.IGCSE.lesson.slides.findIndex((slide) => slide.type === 'peerTask') + 1);

    expect(peerTaskNumber).toBeGreaterThan(0);
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto(`${pageUrl('lessons/unit-2-allocation/2-9-market-failure/lesson-1.html')}#${peerTaskNumber}`);

    await expect(page.locator('.slide.is-active .peerTaskBlock')).toBeVisible();
    await expect(page.locator('.slide.is-active .peerTaskZh')).toBeVisible();
    await expect(page.locator('.slide.is-active .peerTaskPanelLabel')).toHaveText(/Task steps/i);
    await expect(page.locator('.slide.is-active .peerTaskSampleLabel')).toBeVisible();
    await expect(page.locator('.slide.is-active .steps .step')).toHaveCount(3);
    const desktopLayout = await page.evaluate(() => {
      const grid = document.querySelector('.slide.is-active .peerTaskGrid');
      const steps = [...document.querySelectorAll('.slide.is-active .steps .step')]
        .map((step) => step.getBoundingClientRect());
      const columns = getComputedStyle(grid).gridTemplateColumns.split(' ').filter(Boolean).length;
      const stepOverlap = steps.some((rect, index) => index > 0 && rect.top < steps[index - 1].bottom - 1);
      return { columns, stepOverlap };
    });
    expect(desktopLayout.columns).toBeGreaterThanOrEqual(2);
    expect(desktopLayout.stepOverlap).toBe(false);
    await expectNoHorizontalOverflow(page);

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${pageUrl('lessons/unit-2-allocation/2-9-market-failure/lesson-1.html')}#${peerTaskNumber}`);
    const phoneLayout = await page.evaluate(() => {
      const grid = document.querySelector('.slide.is-active .peerTaskGrid');
      const columns = getComputedStyle(grid).gridTemplateColumns.split(' ').filter(Boolean).length;
      return { columns };
    });
    expect(phoneLayout.columns).toBe(1);
    await expectNoHorizontalOverflow(page);
  });

  test('term slides render as clear definition moments with fill-in vocabulary', async ({ page }) => {
    await page.goto(pageUrl('lessons/unit-2-allocation/2-9-market-failure/lesson-1.html'));
    const termNumber = await page.evaluate(() => window.IGCSE.lesson.slides.findIndex((slide) => slide.type === 'term') + 1);

    expect(termNumber).toBeGreaterThan(0);
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto(`${pageUrl('lessons/unit-2-allocation/2-9-market-failure/lesson-1.html')}#${termNumber}`);

    await expect(page.locator('.slide.is-active .definitionCue')).toBeVisible();
    await expect(page.locator('.slide.is-active .termDefinitionText')).toBeVisible();
    await expect(page.locator('.slide.is-active .termDefinitionText .blankAnswer')).toHaveCount(3);
    await expect(page.locator('.slide.is-active .termDefinitionText .blankAnswer').first()).toBeVisible();
    await page.locator('.slide.is-active .termDefinitionText .blankAnswer').first().click();
    await expect(page.locator('.slide.is-active .termDefinitionText .blankAnswer').first()).toHaveClass(/is-revealed/);
    await expect(page.locator('.slide.is-active .definitionTermNote')).toHaveCount(3);
    await expect(page.locator('.slide.is-active .definitionTermNote.partial-item.is-visible')).toHaveCount(0);
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('.slide.is-active .definitionTermNote.partial-item.is-visible')).toHaveCount(1);
    await expect(page.locator('.slide.is-active .visual')).toBeHidden();
    const definitionLayout = await page.evaluate(() => {
      const text = document.querySelector('.slide.is-active .termDefinitionText');
      const box = document.querySelector('.slide.is-active .termBox');
      return {
        fontSize: Number.parseFloat(getComputedStyle(text).fontSize),
        borderLeftWidth: Number.parseFloat(getComputedStyle(box).borderLeftWidth),
      };
    });
    expect(definitionLayout.fontSize).toBeGreaterThanOrEqual(30);
    expect(definitionLayout.borderLeftWidth).toBeGreaterThanOrEqual(6);
    await expectNoHorizontalOverflow(page);
  });

  test('market failure flow chains and concept contrasts render bilingual blanks', async ({ page }) => {
    await page.goto(pageUrl('lessons/unit-2-allocation/2-9-market-failure/lesson-1.html'));
    const slideNumbers = await page.evaluate(() => ({
      flow: window.IGCSE.lesson.slides.findIndex((slide) => slide.type === 'flow') + 1,
      compare: window.IGCSE.lesson.slides.findIndex((slide) => slide.type === 'compare') + 1,
    }));

    expect(slideNumbers.flow).toBeGreaterThan(0);
    await page.goto(`${pageUrl('lessons/unit-2-allocation/2-9-market-failure/lesson-1.html')}#${slideNumbers.flow}`);
    await expect(page.locator('.slide.is-active .flowTextZh')).toHaveCount(5);
    await expectNoHorizontalOverflow(page);

    expect(slideNumbers.compare).toBeGreaterThan(0);
    await page.goto(`${pageUrl('lessons/unit-2-allocation/2-9-market-failure/lesson-1.html')}#${slideNumbers.compare}`);
    await expect(page.locator('.slide.is-active h2')).toHaveCount(0);
    await expect(page.locator('.slide.is-active .compareBlock.is-fillBlanks')).toBeVisible();
    await expect(page.locator('.slide.is-active .blankAnswer')).toHaveCount(8);
    await page.locator('.slide.is-active .blankAnswer').first().click();
    await expect(page.locator('.slide.is-active .blankAnswer').first()).toHaveClass(/is-revealed/);
    await expectNoHorizontalOverflow(page);
  });

  test('side-by-side contrast slides render full-width without pictures', async ({ page }) => {
    await page.goto(pageUrl('lessons/unit-2-allocation/2-8-market-economic-system/lesson-1.html'));
    const slideNumber = await page.evaluate(() => {
      const contrastTypes = new Set(['compare', 'split', 'systemCompare']);
      return window.IGCSE.lesson.slides.findIndex((slide) => contrastTypes.has(slide.type) && slide.visual) + 1;
    });

    expect(slideNumber).toBeGreaterThan(0);
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto(`${pageUrl('lessons/unit-2-allocation/2-8-market-economic-system/lesson-1.html')}#${slideNumber}`);

    await expect(page.locator('.slide.is-active .visual')).toHaveCount(0);
    await expect(page.locator('.slide.is-active .content')).toHaveClass(/is-full/);
    const compareText = await page.evaluate(() => {
      const firstChoice = document.querySelector('.slide.is-active .compareBlock .choice');
      const firstHeading = document.querySelector('.slide.is-active .compareBlock .card > b');
      return {
        choiceSize: Number.parseFloat(getComputedStyle(firstChoice).fontSize),
        headingSize: Number.parseFloat(getComputedStyle(firstHeading).fontSize),
      };
    });
    expect(compareText.choiceSize).toBeGreaterThanOrEqual(20);
    expect(compareText.headingSize).toBeGreaterThanOrEqual(24);
    await expectNoHorizontalOverflow(page);
  });

  test('teaching philosophy page renders bilingual pedagogy at desktop and phone widths', async ({ page }) => {
    await page.goto(pageUrl('pedagogy.html'));

    await expect(page.getByRole('link', { name: /Library index/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Teaching Philosophy/i })).toBeVisible();
    await expect(page.getByText('教学理念', { exact: true })).toBeVisible();
    await expect(page.getByRole('img', { name: /Samuel Oehler-Huang/i })).toBeVisible();
    await expect(page.getByText(/Economics teacher, Suzhou Foreign Language School/i)).toBeVisible();
    await expect(page.getByText(/苏州外国语学校经济学教师/)).toBeVisible();
    await expect(page.getByRole('heading', { name: /What the materials show/i })).toHaveCount(0);
    await expect(page.getByText(/Economics is not learned by memorising definitions alone/i)).toBeVisible();
    await expect(page.getByRole('heading', { name: /From economic problem to transferable judgement/i })).toBeVisible();
    await expect(page.getByText('经济问题', { exact: true })).toBeVisible();
    await expect(page.getByText(/从稀缺、激励、市场变化或政策选择出发/)).toBeVisible();
    await expect(page.getByRole('heading', { name: /Aligned with Cambridge teaching principles/i })).toBeVisible();
    await expect(page.getByText(/Confident 自信/)).toBeVisible();
    await expect(page.getByText(/Cambridge teaching principles: active learning/i)).toBeVisible();
    await expect(page.getByRole('heading', { name: /Active learning/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Assessment for learning/i })).toBeVisible();
    await expect(page.getByText(/课程以 Cambridge IGCSE Economics 0455 和剑桥教学原则为核心/)).toBeVisible();
    await expect(page.getByRole('heading', { name: /For parents/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /面向家长/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /For teachers/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /面向教师/i })).toBeVisible();
    await expect(page.getByText(/Effective Economics revision is active skill practice/i)).toBeVisible();
    await expect(page.getByText(/does not claim formal endorsement/i)).toBeVisible();

    await expectNoHorizontalOverflow(page);
  });

  test('macroeconomic aims deck renders at desktop and phone widths', async ({ page }, testInfo) => {
    await page.goto(pageUrl('lessons/unit-4-government/4-1-macroeconomic-aims/index.html'));

    await expect(page.locator('.slide.is-active')).toBeVisible();
    await expect(page.locator('.slide.is-active h1')).toHaveText(/Macroeconomic aims/i);
    await expect(page.locator('#progress')).toBeVisible();
    await expectLessonModeTabs(page, 'Slides');
    if (testInfo.project.name.includes('phone')) {
      await expect(page.getByRole('button', { name: /^Student selector$/i })).toBeHidden();
      await expect(page.locator('.lessonModeMenu')).toBeHidden();
      const navBox = await page.locator('.lessonModeSwitch').boundingBox();
      expect(navBox.height).toBeLessThanOrEqual(60);
    } else {
      await expect(page.getByRole('button', { name: /^Student selector$/i })).toBeVisible();
      await expect(page.locator('.lessonModeSelectorToggle')).toHaveText('Selector');
      await expect(page.getByRole('button', { name: /^Student selector$/i })).toHaveAttribute('aria-pressed', 'false');
      await expect(page.locator('.lessonModeMenuButton')).toBeVisible();
      await expect(page.getByRole('link', { name: /Library index/i })).toBeHidden();
      await openLessonModeMenu(page);
      await expect(page.getByRole('link', { name: /Library index/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /Lesson start/i })).toBeVisible();
    }

    await expectNoHorizontalOverflow(page);

    const titleBox = await page.locator('.slide.is-active h1').boundingBox();
    const viewport = page.viewportSize();

    expect(titleBox).not.toBeNull();
    expect(titleBox.x).toBeGreaterThanOrEqual(0);
    expect(titleBox.x + titleBox.width).toBeLessThanOrEqual(viewport.width + 1);

    if (testInfo.project.name.includes('phone')) {
      const mobileLayout = await page.evaluate(() => {
        const slide = document.querySelector('.slide.is-active');
        const slideStyle = window.getComputedStyle(slide);

        return {
          bodyOverflowY: window.getComputedStyle(document.body).overflowY,
          slideOverflow: slideStyle.overflow,
          slidePosition: slideStyle.position,
          documentHeight: document.documentElement.scrollHeight,
          viewportHeight: window.innerHeight
        };
      });

      expect(mobileLayout.bodyOverflowY).toBe('auto');
      expect(mobileLayout.slideOverflow).toBe('visible');
      expect(mobileLayout.slidePosition).toBe('relative');
      expect(mobileLayout.documentHeight).toBeGreaterThanOrEqual(mobileLayout.viewportHeight);
    }
  });

  test('slide counter selects direct slide numbers', async ({ page }) => {
    await page.goto(pageUrl('lessons/unit-4-government/4-1-macroeconomic-aims/index.html'));

    const activeSlide = page.locator('.slide.is-active');
    const activeJump = page.locator('.slide.is-active [data-slide-jump]');
    const total = await page.evaluate(() => window.IGCSE.lesson.slides.length);

    await expect(activeJump).toHaveValue('1');
    await expect(activeJump.locator('option')).toHaveCount(total);
    await activeJump.selectOption('5');
    await expect(activeSlide).toHaveAttribute('data-idx', '4');
    await expect(page).toHaveURL(/#5$/);
    await expect(activeJump).toHaveValue('5');

    await activeJump.selectOption(String(total));
    await expect(activeSlide).toHaveAttribute('data-idx', String(total - 1));
    await expect(page).toHaveURL(new RegExp(`#${total}$`));
    await expect(activeJump).toHaveValue(String(total));

    await expectNoHorizontalOverflow(page);
  });

  test('lesson start link returns slide view to the first slide', async ({ page }, testInfo) => {
    await page.goto(pageUrl('lessons/unit-4-government/4-1-macroeconomic-aims/index.html') + '#5');

    await expect(page.locator('.slide.is-active h2')).toHaveText(/The six macroeconomic aims/i);
    if (testInfo.project.name.includes('phone')) {
      await expectLessonModeTabs(page, 'Slides');
      await expect(page.locator('.lessonModeMenu')).toBeHidden();
      return;
    }

    await openLessonModeMenu(page);
    await page.getByRole('link', { name: /Lesson start/i }).click();
    await expect(page.locator('.slide.is-active h1')).toHaveText(/Macroeconomic aims/i);
    await expect(page).toHaveURL(/#1$/);
  });

  test('bilingual term titles keep translations below the English heading', async ({ page }) => {
    await page.goto(pageUrl('lessons/unit-2-allocation/2-8-market-economic-system/lesson-1.html') + '#7');

    await expect(page.locator('.slide.is-active h2')).toHaveText(/Market economic system/);
    await expect(page.locator('.slide.is-active h2 .inlineZh')).toBeVisible();
    await expectNoHorizontalOverflow(page);

    const titleLayout = await page.locator('.slide.is-active h2').evaluate((heading) => {
      const englishNode = [...heading.childNodes]
        .find((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
      const zh = heading.querySelector('.inlineZh');
      const englishRange = document.createRange();
      englishRange.selectNodeContents(englishNode);
      const englishRect = englishRange.getBoundingClientRect();
      const zhRect = zh.getBoundingClientRect();
      const headingRect = heading.getBoundingClientRect();

      return {
        zhDisplay: window.getComputedStyle(zh).display,
        englishBottom: englishRect.bottom,
        zhTop: zhRect.top,
        zhLeft: zhRect.left,
        zhRight: zhRect.right,
        headingLeft: headingRect.left,
        headingRight: headingRect.right,
      };
    });

    expect(titleLayout.zhDisplay).toBe('block');
    expect(titleLayout.zhTop).toBeGreaterThanOrEqual(titleLayout.englishBottom - 1);
    expect(titleLayout.zhLeft).toBeGreaterThanOrEqual(titleLayout.headingLeft - 1);
    expect(titleLayout.zhRight).toBeLessThanOrEqual(titleLayout.headingRight + 1);
  });

  test('exit ticket answer slides render the Chinese title', async ({ page }) => {
    await page.goto(pageUrl('lessons/unit-2-allocation/2-9-market-failure/lesson-1.html'));
    const slideNumber = await page.evaluate(() => window.IGCSE.lesson.slides.findIndex((slide) => (
      slide.type === 'answer' && slide.title === 'Exit ticket'
    )) + 1);

    expect(slideNumber).toBeGreaterThan(0);
    await page.goto(`${pageUrl('lessons/unit-2-allocation/2-9-market-failure/lesson-1.html')}#${slideNumber}`);

    await expect(page.locator('.slide.is-active h2')).toHaveText(/Exit ticket/);
    await expect(page.locator('.slide.is-active h2 .inlineZh')).toHaveText('离堂小测');
    await expect(page.locator('.slide.is-active h2 .inlineZh')).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });

  test('compact bilingual card slides fit without horizontal clipping', async ({ page }, testInfo) => {
    const checks = [
      {
        path: 'lessons/unit-4-government/4-1-macroeconomic-aims/index.html',
        hash: '#5',
        title: /The six macroeconomic aims/i,
        rows: testInfo.project.name.includes('phone') ? 3 : 2,
      },
      {
        path: 'lessons/unit-4-government/4-2-fiscal-policy/lesson-1.html',
        hash: '#14',
        title: /Main areas of spending/i,
        rows: testInfo.project.name.includes('phone') ? 3 : 2,
      },
      {
        path: 'lessons/unit-4-government/4-2-fiscal-policy/lesson-1.html',
        hash: '#17',
        title: /Why governments spend/i,
        rows: testInfo.project.name.includes('phone') ? 3 : 2,
      },
      {
        path: 'lessons/unit-4-government/4-2-fiscal-policy/lesson-5.html',
        hash: '#5',
        title: /The six macroeconomic aims/i,
        rows: testInfo.project.name.includes('phone') ? 3 : 2,
      },
      {
        path: 'lessons/unit-4-government/4-3-monetary-policy/lesson-1.html',
        hash: '#11',
        title: /Central-bank functions/i,
      },
      {
        path: 'lessons/unit-4-government/4-4-supply-side-policy/lesson-2.html',
        hash: '#5',
        title: /Government builds capacity/i,
      },
      {
        path: 'lessons/unit-2-allocation/2-8-market-economic-system/lesson-1.html',
        hash: '#8',
        title: /Four core features/i,
      },
    ];

    for (const check of checks) {
      await page.goto(pageUrl(check.path) + check.hash);
      await expect(page.locator('.slide.is-active h2')).toHaveText(check.title);
      await expectNoHorizontalOverflow(page);
      await expectCompactCardGridFits(page, { rows: check.rows });
    }

    if (!testInfo.project.name.includes('phone')) {
      await page.setViewportSize({ width: 2048, height: 576 });
      await page.goto(pageUrl('lessons/unit-4-government/4-1-macroeconomic-aims/index.html') + '#5');
      await expect(page.locator('.slide.is-active h2')).toHaveText(/The six macroeconomic aims/i);
      await expectNoHorizontalOverflow(page);
      await expect(page.locator('.slide.is-active .cardgrid')).toHaveClass(/is-balancedGrid/);
      await expectCompactCardGridFits(page, { rows: 2 });
    }
  });

  test('student selector opens on demand from lesson slides', async ({ page }, testInfo) => {
    if (testInfo.project.name.includes('phone')) {
      await page.goto(pageUrl('lessons/unit-2-allocation/2-8-market-economic-system/lesson-1.html'));
      await expectLessonModeTabs(page, 'Slides');
      await expect(page.getByRole('button', { name: /^Student selector$/i })).toBeHidden();
      return;
    }

    await page.route('https://randomizerselection.github.io/studentselector/selector.css', async (route) => {
      await route.fulfill({ status: 200, contentType: 'text/css', body: '.selector-overlay-host{position:fixed;inset:0;z-index:9999;background:#fff}' });
    });
    await page.route('https://randomizerselection.github.io/studentselector/selector.js', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/javascript',
        body: `
          window.StudentSelector = {
            mount(container, options = {}) {
              window.__studentSelectorMountOptions = options;
              container.innerHTML = \`
                <main class="selector-root">
                  <div class="selector-shell">
                    <section class="selector-dock" aria-label="Selector controls">
                      <div class="selector-titlebar">
                        <div class="selector-brand">
                          <img alt="" />
                          <div><h1>Random Student Selector</h1><p>27 left | 0 graded</p></div>
                        </div>
                        <button type="button" class="selector-close" data-close-selector>Close</button>
                      </div>
                      <label class="selector-section"><span class="selector-section-label">Class</span><select class="selector-class-select"><option>IC 1.1</option></select></label>
                      <div class="selector-metrics">
                        <div class="selector-metric"><strong>27</strong><span>Remaining</span></div>
                        <div class="selector-metric"><strong>0</strong><span>Graded</span></div>
                        <div class="selector-metric"><strong>0</strong><span>No Grade</span></div>
                        <div class="selector-metric"><strong>0</strong><span>Absent</span></div>
                      </div>
                      <div class="selector-segmented">
                        <button class="selector-time-button">5 sec</button>
                        <button class="selector-time-button">30 sec</button>
                        <button class="selector-time-button">1 min</button>
                        <button class="selector-time-button">2 min</button>
                      </div>
                      <div class="selector-toggle-row"><button class="selector-toggle">Sound</button><button class="selector-toggle">Slot Effect</button></div>
                      <div class="selector-actions"><button class="selector-button">Attendance</button><button class="selector-button">View Summary</button><button class="selector-button">Play Intro</button><button class="selector-button">Play Closing</button></div>
                      <button class="selector-button selector-primary" data-action="start">START SELECTION</button>
                    </section>
                    <section class="selector-stage" aria-label="Selection stage">
                      <header class="selector-stage-header"><div><h2>IC 1.1</h2><p class="selector-meta">27 left | 0 graded</p></div><div class="selector-pill-row"><span class="selector-pill">5 sec</span><span class="selector-pill">Slot effect</span></div></header>
                      <div class="selector-reel">
                        <div class="selector-reel-window" data-test-reel>
                          <div class="selector-name-stack">
                            <div class="selector-name">Student A</div>
                            <div class="selector-name is-current" data-current-name>Ready</div>
                            <div class="selector-name">Student C</div>
                          </div>
                        </div>
                        <div class="selector-progress"><span></span></div>
                      </div>
                      <footer class="selector-stage-footer"><p class="selector-help">Ask, think, select.</p></footer>
                    </section>
                  </div>
                </main>\`;
              container.querySelector('[data-close-selector]').addEventListener('click', () => options.onClose?.());
              container.querySelector('[data-action="start"]').addEventListener('click', () => {
                container.querySelector('[data-current-name]').textContent = 'Selected Student';
                container.querySelector('.selector-stage-footer').innerHTML = \`
                  <div class="selector-outcomes" aria-label="Outcome controls">
                    <button class="selector-outcome" type="button" data-action="rate" data-rating="A*">A*<span>Excellent</span></button>
                    <button class="selector-outcome" type="button" data-action="rate" data-rating="A">A<span>Strong</span></button>
                    <button class="selector-outcome" type="button" data-action="rate" data-rating="B">B<span>Secure</span></button>
                    <button class="selector-outcome" type="button" data-action="rate" data-rating="C">C<span>Needs support</span></button>
                    <button class="selector-outcome" type="button" data-action="no-grade">No Grade<span>Skip grading</span></button>
                    <button class="selector-outcome" type="button" data-action="absent">Absent<span>Remove for today</span></button>
                  </div>
                \`;
              });
              return { destroy() { container.innerHTML = ''; } };
            }
          };
        `,
      });
    });

    await page.goto(pageUrl('lessons/unit-2-allocation/2-8-market-economic-system/lesson-1.html'));
    await page.addStyleTag({ content: 'body { color: rgb(17, 24, 39); }' });
    const activeHeading = page.locator('.slide.is-active h1, .slide.is-active h2').first();
    await expect(activeHeading).toHaveText(/Market economic system/i);
    await expect(activeHeading).toHaveCSS('color', 'rgb(245, 248, 255)');

    await page.getByRole('button', { name: /^Student selector$/i }).click();
    await expect(page.locator('.studentSelectorSidePanel')).toBeVisible();
    await expect(page.getByRole('button', { name: /^Student selector$/i })).toHaveAttribute('aria-pressed', 'true');
    const openNavFit = await page.evaluate(() => {
      const toggle = document.querySelector('.lessonModeSelectorToggle').getBoundingClientRect();
      const panel = document.querySelector('.studentSelectorSidePanel').getBoundingClientRect();
      const deck = document.querySelector('#deck').getBoundingClientRect();
      const activeSlide = document.querySelector('.slide.is-active').getBoundingClientRect();
      return {
        toggleRight: toggle.right,
        panelLeft: panel.left,
        deckRight: deck.right,
        slideRight: activeSlide.right,
      };
    });
    expect(openNavFit.toggleRight).toBeLessThanOrEqual(openNavFit.panelLeft - 6);
    expect(openNavFit.deckRight).toBeLessThanOrEqual(openNavFit.panelLeft + 1);
    expect(openNavFit.slideRight).toBeLessThanOrEqual(openNavFit.panelLeft + 1);
    await expect(page.locator('.studentSelectorSidePanel').getByRole('heading', { name: /Random Student Selector/i })).toBeVisible();
    await expect(page.locator('.studentSelectorSidePanel .selector-titlebar .selector-close')).toBeHidden();
    await expect(page.getByLabel('Close student selector')).toBeVisible();
    await expect(activeHeading).toHaveCSS('color', 'rgb(245, 248, 255)');
    await expect(page.locator('.studentSelectorSidePanel .selector-class-select option').first()).toHaveCSS('color', 'rgb(7, 17, 31)');
    await expect(page.locator('.studentSelectorSidePanel .selector-class-select option').first()).toHaveCSS('background-color', 'rgb(255, 255, 255)');
    await expect(page.locator('.studentSelectorSidePanel')).not.toHaveClass(/is-stage-overlay/);
    await expect(page.locator('[data-test-reel]')).toBeHidden();
    await expect(page.locator('link[href*="randomizerselection.github.io/studentselector/selector.css"]')).toHaveCount(0);
    await expect.poll(() => page.evaluate(() => window.__studentSelectorMountOptions?.skipStyles)).toBe(true);

    const startButton = page.locator('.studentSelectorSidePanel').getByRole('button', { name: /START SELECTION/i });
    await startButton.hover();
    const startHoverStyle = await startButton.evaluate((button) => {
      const style = window.getComputedStyle(button);
      return { color: style.color, backgroundImage: style.backgroundImage };
    });
    expect(startHoverStyle.color).toBe('rgb(7, 17, 31)');
    expect(startHoverStyle.backgroundImage).toContain('linear-gradient');

    await startButton.click();
    await expect(page.locator('.studentSelectorSidePanel')).toHaveClass(/is-stage-overlay/);
    await expect(page.locator('[data-test-reel]')).toBeVisible();

    const panelFit = await page.locator('.studentSelectorSidePanel').evaluate((panel) => ({
      clientHeight: panel.clientHeight,
      scrollHeight: panel.scrollHeight,
      reelBottom: panel.querySelector('[data-test-reel]').getBoundingClientRect().bottom,
      panelBottom: panel.getBoundingClientRect().bottom,
      dockOpacity: window.getComputedStyle(panel.querySelector('.selector-dock')).opacity,
      outcomeWidth: panel.querySelector('.selector-outcomes').getBoundingClientRect().width,
      stageWidth: panel.querySelector('.selector-stage').getBoundingClientRect().width,
      stagePaddingLeft: parseFloat(window.getComputedStyle(panel.querySelector('.selector-stage')).paddingLeft),
      stagePaddingRight: parseFloat(window.getComputedStyle(panel.querySelector('.selector-stage')).paddingRight),
      closeLeft: panel.querySelector('.studentSelectorPanelClose').getBoundingClientRect().left,
      pillRight: panel.querySelector('.selector-pill-row').getBoundingClientRect().right,
    }));
    expect(panelFit.scrollHeight).toBeLessThanOrEqual(panelFit.clientHeight + 1);
    expect(panelFit.reelBottom).toBeLessThanOrEqual(panelFit.panelBottom + 1);
    expect(panelFit.dockOpacity).toBe('0');
    expect(panelFit.outcomeWidth).toBeGreaterThanOrEqual(panelFit.stageWidth - panelFit.stagePaddingLeft - panelFit.stagePaddingRight - 1);
    expect(panelFit.pillRight).toBeLessThanOrEqual(panelFit.closeLeft - 6);

    await page.keyboard.press('Space');
    await expect(activeHeading).toHaveText(/Market economic system/i);

    await page.getByLabel('Close student selector').click();
    await expect(page.locator('.studentSelectorSidePanel')).toHaveCount(0);
    await expect(page.getByRole('button', { name: /^Student selector$/i })).toHaveAttribute('aria-pressed', 'false');

    await page.getByRole('button', { name: /^Student selector$/i }).click();
    await expect(page.locator('.studentSelectorSidePanel')).toBeVisible();
    await page.getByRole('button', { name: /^Student selector$/i }).click();
    await expect(page.locator('.studentSelectorSidePanel')).toHaveCount(0);
    await expect(page.getByRole('button', { name: /^Student selector$/i })).toHaveAttribute('aria-pressed', 'false');
  });

  test('rapid keyboard navigation advances after the final partial reveal', async ({ page }) => {
    await page.goto(pageUrl('lessons/unit-4-government/4-2-fiscal-policy/lesson-2.html') + '#6');
    await expect(page.locator('.slide.is-active h2')).toHaveText(/Raise revenue/i);

    const partialCount = await page.locator('.slide.is-active .partial-item').count();
    expect(partialCount).toBeGreaterThan(0);

    for (let i = 0; i < partialCount; i += 1) {
      await page.keyboard.press('ArrowRight');
    }

    await expect(page.locator('.slide.is-active .partial-item.is-visible')).toHaveCount(partialCount);
    await expect(page).toHaveURL(/#6$/);

    await page.keyboard.press('ArrowRight');
    await expect(page).toHaveURL(/#7$/);
  });

  test('rapid click navigation advances after the final partial reveal', async ({ page }) => {
    await page.goto(pageUrl('lessons/unit-4-government/4-2-fiscal-policy/lesson-2.html') + '#6');
    await expect(page.locator('.slide.is-active h2')).toHaveText(/Raise revenue/i);

    const partialCount = await page.locator('.slide.is-active .partial-item').count();
    expect(partialCount).toBeGreaterThan(0);
    const viewport = page.viewportSize();
    const clickPoint = {
      x: Math.floor((viewport?.width || 1024) / 2),
      y: Math.floor((viewport?.height || 768) / 2),
    };

    for (let i = 0; i < partialCount; i += 1) {
      await page.mouse.click(clickPoint.x, clickPoint.y);
    }

    await expect(page.locator('.slide.is-active .partial-item.is-visible')).toHaveCount(partialCount);
    await expect(page).toHaveURL(/#6$/);

    await page.mouse.click(clickPoint.x, clickPoint.y);
    await expect(page).toHaveURL(/#7$/);
  });

  test('student print view renders a full lesson handout', async ({ page }, testInfo) => {
    await page.goto(pageUrl('lessons/unit-4-government/4-1-macroeconomic-aims/index.html') + '?view=print');

    await expect(page.getByRole('heading', { name: /Macroeconomic aims/i }).first()).toBeVisible();
    await expectLessonModeTabs(page, 'Handout');
    if (testInfo.project.name.includes('phone')) {
      await expect(page.locator('.lessonModeMenu')).toBeHidden();
    } else {
      await openLessonModeMenu(page);
      await expect(page.getByRole('button', { name: /^Print$/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /Library index/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /Lesson start/i })).toBeVisible();
    }
    await expect(page.locator('.slide')).toHaveCount(0);
    await expect(page.locator('.handoutBlock')).toHaveCount(4);
    await expect(page.locator('.handoutBlock').filter({ hasText: /The six macroeconomic aims/i })).toBeVisible();
    await expect(page.locator('.handoutDocument')).not.toContainText(/Key points/i);
    await expect(page.locator('.handoutSources')).toHaveCount(0);
    await expect(page.locator('.handoutBlock').filter({ hasText: /Choose the priority/i })).toHaveCount(0);

    await expectNoHorizontalOverflow(page);
  });

  test('student handout excludes fact and discussion slides', async ({ page }) => {
    await page.goto(pageUrl('lessons/unit-4-government/4-2-fiscal-policy/lesson-2.html') + '?view=print');

    await expect(page.locator('.slide')).toHaveCount(0);
    await expect(page.locator('.handoutBlock').filter({ hasText: /Denmark had a tax-to-GDP ratio/i })).toHaveCount(0);
    await expect(page.locator('.handoutBlock').filter({ hasText: /Turn and talk/i })).toHaveCount(0);
    await expect(page.locator('.handoutSources')).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Direct tax', exact: true })).toBeVisible();

    await expectNoHorizontalOverflow(page);
  });

  test('cocoa review deck shows verbatim question paper extracts on slides and handout', async ({ page }) => {
    const deckPath = 'lessons/unit-2-allocation/2-review-cocoa-chocolate-section-a/index.html';
    await page.goto(pageUrl(deckPath) + '#5');

    await expect(page.locator('.slide.is-paperExtract')).toHaveCount(5);
    await expect(page.locator('.slide.is-active h2')).toHaveText(/^Q1: Using the information above/);
    await expect(page.locator('.slide.is-active .paperExtractPanel')).toContainText('Cocoa beans are the main raw material used to make chocolate.');
    await expect(page.locator('.paperExtractBlock > .lead')).toHaveCount(0);
    await expect(page.locator('.paperExtractQuestion, .paperExtractQuestions')).toHaveCount(0);
    await expectNoHorizontalOverflow(page);

    await page.goto(pageUrl(deckPath) + '#14');
    await expect(page.locator('.slide.is-active h2')).toHaveText(/^Q3: Draw a demand and supply diagram/);
    await expect(page.locator('.slide.is-active .examQuestion')).toHaveCount(0);
    await expectNoHorizontalOverflow(page);

    await page.goto(pageUrl(deckPath) + '#15');
    await expect(page.locator('.slide.is-active h2')).toHaveText(/^Q3: Draw a demand and supply diagram/);
    await expect(page.locator('.slide.is-active .modelAnswerQuestion')).toHaveCount(0);
    await expectNoHorizontalOverflow(page);

    await page.goto(pageUrl(deckPath) + '?view=print');
    await expect(page.locator('.handoutBlock.is-paper-extract')).toHaveCount(5);
    await expect(page.locator('.handoutBlock.is-paper-extract').first().locator('h3')).toHaveText(/^Q1: Using the information above/);
    await expect(page.locator('.handoutPaperQuestion')).toHaveCount(0);
    await expect(page.locator('.handoutSources')).toHaveCount(0);
    await expect(page.locator('.handoutDocument')).toContainText('In the United States, confectionery sales were US$54.2 billion in 2024');
    await expect(page.locator('.handoutDocument')).toContainText('Explain two advantages of a market economic system. [4]');
    await expectNoHorizontalOverflow(page);

    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(pageUrl(deckPath) + '#5');
    const fittedTitle = await page.locator('.slide.is-active h2').evaluate((title) => {
      const content = title.closest('.slide')?.querySelector('.content');
      const extractText = title.closest('.slide')?.querySelector('.paperExtractText p');
      const titleBox = title.getBoundingClientRect();
      const contentBox = content?.getBoundingClientRect();
      const style = getComputedStyle(title);
      const extractStyle = extractText ? getComputedStyle(extractText) : null;
      return {
        fontSize: Number.parseFloat(style.fontSize),
        height: titleBox.height,
        lineHeight: Number.parseFloat(style.lineHeight),
        width: titleBox.width,
        contentWidth: contentBox?.width || 0,
        extractFontSize: extractStyle ? Number.parseFloat(extractStyle.fontSize) : 0,
      };
    });
    expect(fittedTitle.width).toBeGreaterThan(fittedTitle.contentWidth * 0.98);
    expect(fittedTitle.fontSize).toBeLessThan(38);
    expect(fittedTitle.extractFontSize).toBeGreaterThanOrEqual(20);
    expect(fittedTitle.height).toBeLessThanOrEqual((fittedTitle.lineHeight * 2) + 3);
    await expectNoHorizontalOverflow(page);
  });

  test('@smoke market failure photo review deck loads and avoids live exam examples', async ({ page }) => {
    const deckPath = 'lessons/unit-2-allocation/2-review-market-failure-section-a/index.html';
    const deckSource = [
      fs.readFileSync(path.join(root, 'lessons/unit-2-allocation/2-review-market-failure-section-a/index.html'), 'utf8'),
      fs.readFileSync(path.join(root, 'lessons/unit-2-allocation/2-review-market-failure-section-a/slides.js'), 'utf8'),
    ].join('\n');
    const bannedLiveExamTerms = [
      /Australia/i,
      /\beducation\b/i,
      /school completion/i,
      /cigarettes?/i,
      /\bsmoking\b/i,
      /\bvaping\b/i,
      /\btobacco\b/i,
      /\bnicotine\b/i,
      /passive smoking/i,
      /National Tobacco Campaign/i,
    ];

    for (const pattern of bannedLiveExamTerms) {
      expect(deckSource, `unexpected live-exam term: ${pattern}`).not.toMatch(pattern);
    }
    expect(deckSource).not.toMatch(/money price|Build a 4-mark explanation|Six-mark analysis ladder|Classify the photo clues|Identification rules/i);
    expect(deckSource).toMatch(/price paid/);
    expect(deckSource).toMatch(/energyDrinkFridge/);

    await page.goto(pageUrl(deckPath));
    await expect(page.locator('.slide.is-active')).toBeVisible();
    await expect(page.getByRole('heading', { name: /Market failure review/i })).toBeVisible();
    await expect(page.locator('.slide.is-paperExtract')).toHaveCount(0);
    await expectNoRemoteImageAssets(page);
    await expectNoHorizontalOverflow(page);

    const photoSlideNumbers = await page.evaluate(() => {
      const slides = window.IGCSE.lesson.slides || [];
      return {
        starter: slides.findIndex((slide) => slide.title === 'From the picture, name the problem') + 1,
        sixPhoto: slides.findIndex((slide) => slide.title === 'Six photo clues') + 1,
      };
    });
    expect(photoSlideNumbers.starter).toBeGreaterThan(0);
    await page.locator('.slide.is-active [data-slide-jump]').selectOption(String(photoSlideNumbers.starter));
    await expect(page.locator('.slide.is-active .cardgrid')).toHaveClass(/is-photoGrid/);
    await expect(page.locator('.slide.is-active .cardgrid')).toHaveClass(/is-photoGridFour/);
    await expect(page.locator('.slide.is-active .card')).toHaveCount(4);
    await expectNoHorizontalOverflow(page);

    const sixPhotoSlideNumber = photoSlideNumbers.sixPhoto;
    expect(sixPhotoSlideNumber).toBeGreaterThan(0);
    await page.locator('.slide.is-active [data-slide-jump]').selectOption(String(sixPhotoSlideNumber));
    await expect(page.locator('.slide.is-active .cardgrid')).toHaveClass(/is-photoGrid/);
    await expect(page.locator('.slide.is-active .cardgrid')).toHaveClass(/is-photoGridSix/);
    await expect(page.locator('.slide.is-active .card')).toHaveCount(6);
    await expectNoHorizontalOverflow(page);

    const lessonChecks = await page.evaluate(() => {
      const slides = window.IGCSE.lesson.slides || [];
      const text = slides.map((slide) => [
        slide.title,
        slide.zhTitle,
        slide.prompt,
        slide.footer,
        slide.answer,
        ...(slide.cards || []).flatMap((card) => [card.title, card.zhTitle, card.body]),
        ...(slide.sampleAnswers || []),
        ...(slide.steps || []).flat(),
        ...(slide.nodes || []).flat().map((node) => node?.text || node),
        ...(slide.keywords || []),
      ].filter(Boolean).join(' ')).join(' ');
      const sixPhotoSlide = slides.find((slide) => slide.title === 'Six photo clues') || {};
      const sixPhotoCards = sixPhotoSlide.cards || [];
      const definitionsSlide = slides.find((slide) => slide.title === 'Previously studied definitions') || {};
      const definitionCards = definitionsSlide.cards || [];
      return {
        views: window.IGCSE.lesson.meta.availableViews,
        hasClassification: slides.some((slide) => slide.type === 'classificationTask'),
        hasExplainPractice: /over-consumed|over-consumption/i.test(text),
        hasDemeritExplainChain: /demerit-good chain|demerit good/i.test(text) && /full private costs/i.test(text),
        hasExternalCostExplainChain: /external-cost chain|external cost/i.test(text) && /third parties|third party/i.test(text),
        hasAnalysePractice: /under-used|under-consumption/i.test(text),
        hasDiagramPractice: slides.some((slide) => slide.visual?.kind === 'demand-supply'),
        hasSupplyRightDiagram: slides.some((slide) => slide.visual?.kind === 'demand-supply' && slide.visual?.shift === 'supplyRight'),
        hasDemandLeftDiagram: slides.some((slide) => slide.visual?.kind === 'demand-supply' && slide.visual?.shift === 'demandLeft'),
        hasRewordedClassifyTitle: slides.some((slide) => slide.title === 'External benefit, external cost, merit good or demerit good? [4]'),
        hasStudiedDefinitions: /A cost suffered by a third party/.test(text) && /A harmful good that may be over-consumed/.test(text),
        hasMarkSchemeSlide: /Mark scheme: Explain two reasons/i.test(text) && /price paid/i.test(text),
        hasRemovedAnalysisLadder: !/Six-mark analysis ladder/i.test(text),
        hasSixPhotoChineseTerms: /工厂烟尘/.test(text) && /外部成本/.test(text) && /有害品/.test(text),
        sixPhotoCardsHaveNoBodies: sixPhotoCards.length === 6 && sixPhotoCards.every((card) => !card.body),
        hasNewReusableBagPhoto: /reusable-grocery-bag-doorstep\.jpg/.test(window.IGCSE.photos.marketFailureReview.reusableShoppingBag.src || ''),
        definitionSlideHasCardReveal: (definitionsSlide.partialReview || []).join(' ') === '.cardgrid > .card',
        definitionSlideHighlightsKeyTerms: definitionCards.length === 4 && definitionCards.every((card) => (card.highlightTerms || []).length >= 3),
        givesAwayCampaignDiagram: /information campaign|information-campaign|health information|demand shifts left|leftward shift/i.test(text),
      };
    });

    expect(lessonChecks.views).toEqual(['slides', 'handout']);
    expect(lessonChecks.hasClassification).toBe(true);
    expect(lessonChecks.hasExplainPractice).toBe(true);
    expect(lessonChecks.hasDemeritExplainChain).toBe(true);
    expect(lessonChecks.hasExternalCostExplainChain).toBe(true);
    expect(lessonChecks.hasAnalysePractice).toBe(true);
    expect(lessonChecks.hasDiagramPractice).toBe(true);
    expect(lessonChecks.hasSupplyRightDiagram).toBe(true);
    expect(lessonChecks.hasDemandLeftDiagram).toBe(false);
    expect(lessonChecks.hasRewordedClassifyTitle).toBe(true);
    expect(lessonChecks.hasStudiedDefinitions).toBe(true);
    expect(lessonChecks.hasMarkSchemeSlide).toBe(true);
    expect(lessonChecks.hasRemovedAnalysisLadder).toBe(true);
    expect(lessonChecks.hasSixPhotoChineseTerms).toBe(true);
    expect(lessonChecks.sixPhotoCardsHaveNoBodies).toBe(true);
    expect(lessonChecks.hasNewReusableBagPhoto).toBe(true);
    expect(lessonChecks.definitionSlideHasCardReveal).toBe(true);
    expect(lessonChecks.definitionSlideHighlightsKeyTerms).toBe(true);
    expect(lessonChecks.givesAwayCampaignDiagram).toBe(false);

    await page.goto(pageUrl(deckPath) + '?view=print');
    await expect(page.locator('.handoutDocument')).toBeVisible();
    await expect(page.locator('.handoutBlock.is-paper-extract')).toHaveCount(0);
    await expect(page.locator('.handoutDocument')).toContainText('Six photo clues');
    await expect(page.locator('.handoutDocument')).toContainText('Previously studied definitions');
    await expect(page.locator('.handoutDocument')).toContainText('Two chains: over-consumption');
    await expect(page.locator('.handoutDocument')).toContainText('Cycle helmets: under-consumption');
    await expect(page.locator('.handoutDocument')).not.toContainText(/information campaign|information-campaign|health information|demand shifts left|leftward shift/i);
    await expect(page.locator('.handoutDocument .handoutPairVisual img')).toHaveCount(10);
    await expectNoRemoteImageAssets(page);
    await expectNoHorizontalOverflow(page);
  });

  test('lesson flashcard views render for every available deck', async ({ page }) => {
    test.setTimeout(60000);

    const flashcardPaths = [
      'lessons/unit-2-allocation/2-8-market-economic-system/lesson-1.html',
      'lessons/unit-2-allocation/2-8-market-economic-system/lesson-2.html',
      'lessons/unit-2-allocation/2-8-market-economic-system/lesson-3.html',
      'lessons/unit-2-allocation/2-8-market-economic-system/lesson-4.html',
      'lessons/unit-2-allocation/2-9-market-failure/lesson-1.html',
      'lessons/unit-2-allocation/2-9-market-failure/lesson-2.html',
      'lessons/unit-2-allocation/2-9-market-failure/lesson-3.html',
      'lessons/unit-2-allocation/2-9-market-failure/lesson-4.html',
      'lessons/unit-4-government/4-1-macroeconomic-aims/index.html',
      'lessons/unit-4-government/4-2-fiscal-policy/lesson-1.html',
      'lessons/unit-4-government/4-2-fiscal-policy/lesson-2.html',
      'lessons/unit-4-government/4-2-fiscal-policy/lesson-3.html',
      'lessons/unit-4-government/4-2-fiscal-policy/lesson-4.html',
      'lessons/unit-4-government/4-2-fiscal-policy/lesson-5.html',
      'lessons/unit-4-government/4-3-monetary-policy/lesson-1.html',
      'lessons/unit-4-government/4-3-monetary-policy/lesson-2.html',
      'lessons/unit-4-government/4-3-monetary-policy/lesson-3.html',
      'lessons/unit-4-government/4-3-monetary-policy/lesson-4.html',
      'lessons/unit-4-government/4-4-supply-side-policy/lesson-1.html',
      'lessons/unit-4-government/4-4-supply-side-policy/lesson-2.html',
      'lessons/unit-4-government/4-4-supply-side-policy/lesson-3.html',
      'lessons/unit-4-government/4-4-supply-side-policy/lesson-4.html',
    ];

    for (const flashcardPath of flashcardPaths) {
      await page.goto(pageUrl(flashcardPath) + '?view=flashcards');
      await expect(page.locator('.flashcardDeck')).toBeVisible();
      await expect(page.locator('.flashcardPosition')).toHaveText('8 left');
      await expect(page.locator('.flashcardProgressTrack')).toHaveAttribute('aria-valuemax', '8');
      await expect(page.locator('.flashcardProgressTrack')).toHaveAttribute('aria-valuenow', '0');
      await expect(page.locator('.flashcardTags span').first()).toHaveText(/Definition|Fill in the blank/);
      await expect(page.locator('[data-flashcard-mark="again"]')).toBeHidden();
      await expect(page.locator('[data-flashcard-mark="know"]')).toBeHidden();
      await expect(page.getByRole('button', { name: /^Show Answer$/i })).toBeVisible();
      await expectLessonModeTabs(page, 'Flashcards');
      const cardTypes = await page.evaluate(() => window.IGCSE.flashcards.cards.map((card) => card.type));
      expect(cardTypes.every((type) => ['definition', 'fillBlank'].includes(type))).toBe(true);
      await page.getByRole('button', { name: /^Show Answer$/i }).click();
      await expect(page.locator('.flashcardSources summary').first()).toHaveText('Sources');
      await page.locator('.flashcardSources summary').first().click();
      await expect(page.locator('.flashcardSources').first()).toContainText(/Syllabus source/i);
      await expect(page.locator('.flashcardSources').first()).toContainText(/Definition source|Paper 2 source/i);
      await expectNoHorizontalOverflow(page);
    }
  });

  test('student flashcards reveal, requeue, complete, shuffle and reset', async ({ page }) => {
    await page.goto(pageUrl('lessons/unit-4-government/4-1-macroeconomic-aims/index.html') + '?view=flashcards');

    await expect(page.locator('.flashcardPosition')).toHaveText('8 left');
    await expect(page.locator('.flashcardFaceLabel')).toHaveText('Fill in the blank');
    await expect(page.locator('.flashcardPrompt')).toHaveText(/Macroeconomic aims include/i);
    await expect(page.locator('.flashcardKnownCount')).toHaveText('0');
    await expect(page.locator('.flashcardAgainCount')).toHaveText('0');
    const firstPrompt = await page.locator('.flashcardPrompt').textContent();

    await page.getByRole('button', { name: /^Show Answer$/i }).click();
    await expect(page.locator('.flashcardFaceLabel')).toHaveText('Answer');
    await expect(page.locator('.flashcardPrompt')).toHaveText('sustainability');
    await expect(page.getByRole('button', { name: /^Again$/i })).toBeEnabled();
    await expect(page.getByRole('button', { name: /^Know$/i })).toBeEnabled();
    await expect(page.getByRole('button', { name: /^Show Answer$/i })).toBeHidden();

    await page.getByRole('button', { name: /^Again$/i }).click();
    await expect(page.locator('.flashcardPosition')).toHaveText('8 left');
    await expect(page.locator('.flashcardAgainCount')).toHaveText('1');
    await expect(page.locator('.flashcardPrompt')).not.toHaveText(firstPrompt);

    for (let i = 0; i < 7; i += 1) {
      await page.getByRole('button', { name: /^Show Answer$/i }).click();
      await page.getByRole('button', { name: /^Know$/i }).click();
    }

    await expect(page.locator('.flashcardPosition')).toHaveText('1 left');
    await expect(page.locator('.flashcardPrompt')).toHaveText(firstPrompt);
    await expect(page.locator('.flashcardKnownCount')).toHaveText('7');
    await expect(page.locator('.flashcardAgainCount')).toHaveText('1');

    await page.locator('.flashcardCard').click();
    await page.getByRole('button', { name: /^Know$/i }).click();
    await expect(page.locator('.flashcardPosition')).toHaveText('Complete');
    await expect(page.locator('.flashcardComplete')).toBeVisible();
    await expect(page.locator('.flashcardKnownCount')).toHaveText('8');
    await expect(page.locator('.flashcardAgainCount')).toHaveText('0');
    await expect(page.getByRole('button', { name: /^Study again$/i })).toBeVisible();

    await page.getByRole('button', { name: /^Study again$/i }).click();
    await expect(page.locator('.flashcardPosition')).toHaveText('8 left');
    await page.evaluate(() => document.activeElement.blur());
    await page.keyboard.press('Space');
    await expect(page.locator('.flashcardFaceLabel')).toHaveText('Answer');
    await page.keyboard.press('1');
    await expect(page.locator('.flashcardAgainCount')).toHaveText('1');
    await page.evaluate(() => document.activeElement.blur());
    await page.keyboard.press('Space');
    await page.keyboard.press('2');
    await expect(page.locator('.flashcardKnownCount')).toHaveText('1');

    await page.getByRole('button', { name: /^Shuffle$/i }).click();
    await expect(page.locator('.flashcardPosition')).toHaveText('7 left');
    await page.getByRole('button', { name: /^Reset$/i }).click();
    await expect(page.locator('.flashcardPosition')).toHaveText('8 left');
    await expect(page.locator('.flashcardPrompt')).toHaveText(/Macroeconomic aims include/i);
    await expect(page.locator('.flashcardKnownCount')).toHaveText('0');
    await expect(page.locator('.flashcardAgainCount')).toHaveText('0');
    await expectNoHorizontalOverflow(page);
  });

  test('flashcard definitions use terms from the definitions reference', async () => {
    const terms = definitionTerms();
    const missingTerms = [];

    for (const flashcardPath of findFlashcardFiles(path.join(root, 'lessons'), root)) {
      const cards = readFlashcards(flashcardPath).cards || [];
      cards
        .filter((card) => card.type === 'definition')
        .forEach((card) => {
          if (!terms.has(card.term)) missingTerms.push(`${flashcardPath}: ${card.term}`);
          expect(card.definition).toBeTruthy();
          expect(card.prompt).toBeUndefined();
          expect(card.answer).toBeUndefined();
        });

      cards
        .filter((card) => card.type === 'fillBlank')
        .forEach((card) => {
          expect(card.prompt).toContain('__________');
          expect(card.answer).toBeTruthy();
          expect(card.term).toBeUndefined();
          expect(card.definition).toBeUndefined();
        });
    }

    expect(missingTerms).toEqual([]);
  });

  test('lesson quiz views render for every available deck', async ({ page }) => {
    test.slow();

    const quizPaths = [
      'lessons/unit-2-allocation/2-8-market-economic-system/lesson-1.html',
      'lessons/unit-2-allocation/2-8-market-economic-system/lesson-2.html',
      'lessons/unit-2-allocation/2-8-market-economic-system/lesson-3.html',
      'lessons/unit-2-allocation/2-8-market-economic-system/lesson-4.html',
      'lessons/unit-2-allocation/2-9-market-failure/lesson-1.html',
      'lessons/unit-2-allocation/2-9-market-failure/lesson-2.html',
      'lessons/unit-2-allocation/2-9-market-failure/lesson-3.html',
      'lessons/unit-2-allocation/2-9-market-failure/lesson-4.html',
      'lessons/unit-4-government/4-1-macroeconomic-aims/index.html',
      'lessons/unit-4-government/4-2-fiscal-policy/lesson-1.html',
      'lessons/unit-4-government/4-2-fiscal-policy/lesson-2.html',
      'lessons/unit-4-government/4-2-fiscal-policy/lesson-3.html',
      'lessons/unit-4-government/4-2-fiscal-policy/lesson-4.html',
      'lessons/unit-4-government/4-2-fiscal-policy/lesson-5.html',
      'lessons/unit-4-government/4-3-monetary-policy/lesson-1.html',
      'lessons/unit-4-government/4-3-monetary-policy/lesson-2.html',
      'lessons/unit-4-government/4-3-monetary-policy/lesson-3.html',
      'lessons/unit-4-government/4-3-monetary-policy/lesson-4.html',
    ];

    for (const quizPath of quizPaths) {
      await page.goto(pageUrl(quizPath) + '?view=quiz');
      await expect(page.locator('.quizDeck')).toBeVisible();
      await expect(page.locator('.quizQuestion')).toHaveCount(8);
      await expect(page.locator('.quizAnsweredCount')).toHaveText('0/8 answered');
      await expect(page.locator('.quizProgressTrack')).toHaveAttribute('aria-valuemax', '8');
      await expect(page.getByRole('textbox', { name: /^Name$/i })).toBeVisible();
      await expect(page.getByRole('combobox', { name: /^Class$/i })).toBeVisible();
      await expect(page.getByRole('combobox', { name: /^Class$/i }).locator('option')).toHaveText([
        'Choose class',
        'IC 1.1',
        'IC 1.2',
        'IC 1.3',
        'IC 2.1',
        'IC 2.2',
        'IC 3.1',
        'IC 3.2',
      ]);
      await expect(page.locator('.quizSources')).toHaveCount(0);
      await expectLessonModeTabs(page, 'Quiz');
      await expectNoHorizontalOverflow(page);
    }
  });

  test('active lesson slides expose compact source lines for definitions and exam content', async ({ page }) => {
    const checks = [
      {
        url: 'lessons/unit-2-allocation/2-9-market-failure/lesson-1.html#5',
        expected: /Definitions 2026: Market failure/i,
      },
      {
        url: 'lessons/unit-4-government/4-2-fiscal-policy/lesson-2.html#18',
        expected: /2023ON-21 Q3\(a\)|Definitions 2026: Fiscal policy/i,
        expectedQuestion: /Exam question: 2023ON-21 Q3\(a\): Identify two types of tax\./i,
      },
      {
        url: 'lessons/unit-4-government/4-3-monetary-policy/lesson-1.html#15',
        expected: /Definitions 2026: Monetary policy/i,
      },
      {
        url: 'lessons/unit-4-government/4-2-fiscal-policy/lesson-5.html#32',
        expected: /Paper 2 source/i,
      },
      {
        url: 'lessons/unit-4-government/4-4-supply-side-policy/lesson-1.html#6',
        expected: /Syllabus 4\.4|2025ON-22 Q5\(b\)/i,
        expectedQuestion: /Exam question: 2025ON-22 Q5\(b\): Explain two differences between monetary policy and supply-side policy\./i,
      },
      {
        url: 'lessons/unit-4-government/4-4-supply-side-policy/lesson-1.html#14',
        expected: /2024ON-21 Q1\(f\)|2025MJ-22 Q3\(a\)|2025ON-22 Q2\(b\)/i,
        expectedQuestion: /Exam question: 2024ON-21 Q1\(f\): Analyse, using a production possibility curve \(PPC\) diagram/i,
      },
    ];

    for (const check of checks) {
      const [relativePath, hash] = check.url.split('#');
      await page.goto(`${pageUrl(relativePath)}#${hash}`);
      await expect(page.locator('.slide.is-active')).toHaveAttribute('data-idx', String(Number(hash) - 1));
      await expect(page.locator('.slide.is-active .sourceList summary')).toHaveText('Sources');
      await page.locator('.slide.is-active .sourceList summary').click();
      await expect(page.locator('.slide.is-active')).toHaveAttribute('data-idx', String(Number(hash) - 1));
      await expect(page.locator('.slide.is-active .sourceList')).toHaveAttribute('open', '');
      await expect(page.locator('.slide.is-active .sourceList')).toContainText(/Syllabus source/i);
      await expect(page.locator('.slide.is-active .sourceList')).toContainText(check.expected);
      await expect(page.locator('.slide.is-active .sourceList')).toContainText(/MS basis|Definitions 2026|Paper 2 source/i);
      if (check.expectedQuestion) {
        await expect(page.locator('.slide.is-active .sourceList')).toContainText(check.expectedQuestion);
      }
      await expectNoHorizontalOverflow(page);
    }
  });

  test('supply-side PPC diagram widget renders exam-ready labels', async ({ page }) => {
    await page.goto(pageUrl('lessons/unit-4-government/4-4-supply-side-policy/lesson-1.html') + '#14');

    const diagram = page.locator('.slide.is-active .diagram-ppc');
    await expect(diagram).toBeVisible();
    await expect(diagram).toContainText('PPC1');
    await expect(diagram).toContainText('PPC2');
    await expect(diagram).toContainText('Consumer goods');
    await expect(diagram).toContainText('Capital goods');
    await expect(diagram).toContainText(/curves touch both axes/i);
    await expect(page.locator('.slide.is-active')).not.toContainText(/AD-AS/i);

    const diagramGeometry = await diagram.evaluate((node) => ({
      curves: node.querySelectorAll('.diagramCurve').length,
      axes: node.querySelectorAll('.diagramAxis').length,
      shiftArrowPath: node.querySelector('.diagramShiftArrow')?.getAttribute('d') || '',
    }));

    expect(diagramGeometry.curves).toBeGreaterThanOrEqual(2);
    expect(diagramGeometry.axes).toBe(2);
    expect(diagramGeometry.shiftArrowPath).toBe('M190 156 L190 126');
    await expectNoHorizontalOverflow(page);
  });

  test('term slides include subordinate Chinese definition translations', async ({ page }) => {
    const termSlides = findSlideFiles(root)
      .filter((relativePath) => !relativePath.includes('/_template/'))
      .flatMap((relativePath) => {
        const lesson = readLesson(relativePath);
        return (lesson?.slides || [])
          .map((slide, index) => ({ relativePath, slide, index }))
          .filter(({ slide }) => slide.type === 'term');
      });

    expect(termSlides.length).toBeGreaterThan(0);

    for (const { relativePath, slide, index } of termSlides) {
      expect.soft(slide.definitionZh, `${relativePath} slide ${index + 1}`).toEqual(expect.any(String));
      expect.soft(slide.definitionZh.trim(), `${relativePath} slide ${index + 1}`).not.toHaveLength(0);
    }

    await page.goto(pageUrl('lessons/unit-4-government/4-2-fiscal-policy/lesson-1.html') + '#6');
    await expect(page.locator('.slide.is-active .termDefinitionZh')).toBeVisible();

    const translationStyle = await page.evaluate(() => {
      const termBox = document.querySelector('.slide.is-active .termBox');
      const english = termBox?.querySelector('p:not(.termDefinitionZh)');
      const chinese = termBox?.querySelector('.termDefinitionZh');
      const chineseStyle = window.getComputedStyle(chinese);
      const alphaMatch = chineseStyle.color.match(/rgba?\([^,]+,\s*[^,]+,\s*[^,\s)]+(?:,\s*([^)]+))?\)/);
      return {
        english: parseFloat(window.getComputedStyle(english).fontSize),
        chinese: parseFloat(chineseStyle.fontSize),
        chineseAlpha: alphaMatch?.[1] === undefined ? 1 : parseFloat(alphaMatch[1])
      };
    });

    expect(translationStyle.chinese).toBeLessThan(translationStyle.english);
    expect(translationStyle.chinese).toBeGreaterThanOrEqual(17);
    expect(translationStyle.chineseAlpha).toBeGreaterThanOrEqual(0.8);
    await expectNoHorizontalOverflow(page);
  });

  test('student quiz progress updates and try again unlocks the form', async ({ page }) => {
    await page.goto(pageUrl('lessons/unit-4-government/4-1-macroeconomic-aims/index.html') + '?view=quiz');

    await expect(page.locator('.quizAnsweredCount')).toHaveText('0/8 answered');
    await expect(page.locator('.quizProgressTrack')).toHaveAttribute('aria-valuenow', '0');

    await page.getByRole('textbox', { name: /^Name$/i }).fill('Test Student');
    await page.getByRole('combobox', { name: /^Class$/i }).selectOption('IC 1.1');
    await page.locator('.quizQuestion').nth(0).getByLabel('The whole economy').check();
    await expect(page.locator('.quizAnsweredCount')).toHaveText('1/8 answered');
    await expect(page.locator('.quizProgressTrack')).toHaveAttribute('aria-valuenow', '1');
    await expect(page.locator('.quizQuestion').nth(0)).toHaveClass(/is-answered/);

    await page.locator('.quizQuestion').nth(1).getByLabel('Answer').fill('real GDP');
    await expect(page.locator('.quizAnsweredCount')).toHaveText('2/8 answered');
    await page.locator('.quizQuestion').nth(1).getByLabel('Answer').fill('   ');
    await expect(page.locator('.quizAnsweredCount')).toHaveText('1/8 answered');

    await page.getByRole('button', { name: /Mark quiz/i }).click();
    await expect(page.locator('.quizResult')).toBeHidden();

    await fillPerfectMacroeconomicAimsQuiz(page);
    await expect(page.locator('.quizAnsweredCount')).toHaveText('8/8 answered');
    await page.getByRole('button', { name: /Mark quiz/i }).click();

    await expect(page.locator('.quizScore')).toHaveText('8/8 (100%)');
    await expect(page.locator('.quizCorrectCount')).toHaveText('8/8');
    await expect(page.locator('.quizReviewCount')).toHaveText('0');
    await expect(page.locator('.quizPercent')).toHaveText('100%');
    await expect(page.getByRole('textbox', { name: /^Name$/i })).toBeDisabled();
    await expect(page.locator('.quizQuestion').nth(0).getByLabel('The whole economy')).toBeDisabled();
    await expect(page.getByRole('button', { name: /Mark quiz/i })).toBeDisabled();

    await page.getByRole('button', { name: /Try again/i }).click();
    await expect(page.getByRole('textbox', { name: /^Name$/i })).toBeEnabled();
    await expect(page.getByRole('textbox', { name: /^Name$/i })).toHaveValue('');
    await expect(page.locator('.quizAnsweredCount')).toHaveText('0/8 answered');
    await expect(page.locator('.quizProgressTrack')).toHaveAttribute('aria-valuenow', '0');
    await expect(page.locator('.quizResult')).toBeHidden();
    await expect(page.getByRole('button', { name: /Mark quiz/i })).toBeEnabled();
    await expectNoHorizontalOverflow(page);
  });

  test('student quiz marks answers and preserves score when submission fails', async ({ page }) => {
    await page.route('https://quiz.invalid/submit', async (route) => {
      await route.fulfill({
        status: 500,
        headers: { 'access-control-allow-origin': '*' },
        body: 'failed',
      });
    });

    await page.goto(pageUrl('lessons/unit-4-government/4-1-macroeconomic-aims/index.html') + '?view=quiz');
    await page.evaluate(() => {
      window.IGCSE.quizConfig = {
        submissionEnabled: true,
        submitEndpoint: 'https://quiz.invalid/submit',
      };
    });

    await page.getByRole('textbox', { name: /^Name$/i }).fill('Test Student');
    await page.getByRole('combobox', { name: /^Class$/i }).selectOption('IC 1.1');

    await fillPerfectMacroeconomicAimsQuiz(page);

    await page.getByRole('button', { name: /Mark quiz/i }).click();

    await expect(page.locator('.quizScore')).toHaveText('8/8 (100%)');
    await expect(page.locator('.quizCorrectCount')).toHaveText('8/8');
    await expect(page.locator('.quizReviewCount')).toHaveText('0');
    await expect(page.locator('.quizQuestion.is-correct')).toHaveCount(8);
    await expect(page.locator('.quizCorrection').filter({ hasText: /Correct: gdp/i })).toBeVisible();
    await expect(page.locator('.quizSubmitStatus')).toHaveText(/Submission failed - retry/i);
    await expect(page.getByRole('button', { name: /Retry submission/i })).toBeVisible();
    await expect(page.getByRole('combobox', { name: /^Class$/i })).toBeDisabled();
    await expectNoHorizontalOverflow(page);
  });

  test('student quiz submits to configured Netlify form endpoint', async ({ page }) => {
    let submissionBody = '';
    await page.route('https://example.test/', async (route) => {
      submissionBody = route.request().postData() || '';
      await route.fulfill({ status: 200, body: 'ok' });
    });

    await page.goto(pageUrl('lessons/unit-4-government/4-1-macroeconomic-aims/index.html') + '?view=quiz');
    await page.evaluate(() => {
      window.IGCSE.quizConfig = {
        submissionEnabled: true,
        provider: 'netlify-forms',
        formName: 'quiz-submissions',
        submitEndpoint: 'https://example.test/',
      };
    });

    await page.getByRole('textbox', { name: /^Name$/i }).fill('Test Student');
    await page.getByRole('combobox', { name: /^Class$/i }).selectOption('IC 1.1');

    await fillPerfectMacroeconomicAimsQuiz(page);

    await page.getByRole('button', { name: /Mark quiz/i }).click();

    await expect(page.locator('.quizScore')).toHaveText('8/8 (100%)');
    await expect(page.locator('.quizSubmitStatus')).toHaveText(/Score submitted to your teacher/i);

    const submitted = new URLSearchParams(submissionBody);
    expect(submitted.get('form-name')).toBe('quiz-submissions');
    expect(submitted.get('studentName')).toBe('Test Student');
    expect(submitted.get('studentClass')).toBe('IC 1.1');
    expect(submitted.get('lessonCode')).toBe('4.1.1');
    expect(submitted.get('score')).toBe('8');
    expect(submitted.get('maxScore')).toBe('8');
    expect(submitted.get('responsesJson')).toContain('growth-measure');
  });

  test('fiscal policy menu links back and offers lesson views', async ({ page }) => {
    await page.goto(pageUrl('lessons/unit-4-government/4-2-fiscal-policy/index.html'));

    await expect(page.getByRole('link', { name: /Library index/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Slide view/i })).toHaveCount(4);
    await expect(page.getByRole('link', { name: /Handout view/i })).toHaveCount(4);
    await expect(page.getByRole('link', { name: /^Quiz$/i })).toHaveCount(4);
    await expect(page.getByRole('link', { name: /^Flashcards$/i })).toHaveCount(4);
    await expect(page.getByRole('link', { name: /Handout view/i }).first()).toHaveAttribute('href', /view=print/);
    await expect(page.getByRole('link', { name: /^Quiz$/i }).first()).toHaveAttribute('href', /view=quiz/);
    await expect(page.getByRole('link', { name: /^Flashcards$/i }).first()).toHaveAttribute('href', /view=flashcards/);

    await expectNoHorizontalOverflow(page);
  });

  test('market economic system menu links back and offers lesson views', async ({ page }) => {
    await page.goto(pageUrl('lessons/unit-2-allocation/2-8-market-economic-system/index.html'));

    await expect(page.getByRole('link', { name: /Library index/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Slide view/i })).toHaveCount(4);
    await expect(page.getByRole('link', { name: /Handout view/i })).toHaveCount(4);
    await expect(page.getByRole('link', { name: /^Quiz$/i })).toHaveCount(4);
    await expect(page.getByRole('link', { name: /^Flashcards$/i })).toHaveCount(4);
    await expect(page.getByRole('link', { name: /Handout view/i }).first()).toHaveAttribute('href', /view=print/);
    await expect(page.getByRole('link', { name: /^Quiz$/i }).first()).toHaveAttribute('href', /view=quiz/);
    await expect(page.getByRole('link', { name: /^Flashcards$/i }).first()).toHaveAttribute('href', /view=flashcards/);

    await expectNoHorizontalOverflow(page);
  });

  test('market failure menu links back and offers lesson views', async ({ page }) => {
    await page.goto(pageUrl('lessons/unit-2-allocation/2-9-market-failure/index.html'));

    await expect(page.getByRole('link', { name: /Library index/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Slide view/i })).toHaveCount(4);
    await expect(page.getByRole('link', { name: /Handout view/i })).toHaveCount(4);
    await expect(page.getByRole('link', { name: /^Quiz$/i })).toHaveCount(4);
    await expect(page.getByRole('link', { name: /^Flashcards$/i })).toHaveCount(4);
    await expect(page.getByRole('link', { name: /Handout view/i }).first()).toHaveAttribute('href', /view=print/);
    await expect(page.getByRole('link', { name: /^Quiz$/i }).first()).toHaveAttribute('href', /view=quiz/);
    await expect(page.getByRole('link', { name: /^Flashcards$/i }).first()).toHaveAttribute('href', /view=flashcards/);

    await expectNoHorizontalOverflow(page);
  });

  test('monetary policy menu links back and offers lesson views', async ({ page }) => {
    await page.goto(pageUrl('lessons/unit-4-government/4-3-monetary-policy/index.html'));

    await expect(page.getByRole('link', { name: /Library index/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Slide view/i })).toHaveCount(4);
    await expect(page.getByRole('link', { name: /Handout view/i })).toHaveCount(4);
    await expect(page.getByRole('link', { name: /^Quiz$/i })).toHaveCount(4);
    await expect(page.getByRole('link', { name: /^Flashcards$/i })).toHaveCount(4);
    await expect(page.getByRole('link', { name: /Handout view/i }).first()).toHaveAttribute('href', /view=print/);
    await expect(page.getByRole('link', { name: /^Quiz$/i }).first()).toHaveAttribute('href', /view=quiz/);
    await expect(page.getByRole('link', { name: /^Flashcards$/i }).first()).toHaveAttribute('href', /view=flashcards/);

    await expectNoHorizontalOverflow(page);
  });

  test('supply-side policy menu links back and offers lesson views', async ({ page }) => {
    await page.goto(pageUrl('lessons/unit-4-government/4-4-supply-side-policy/index.html'));

    await expect(page.getByRole('link', { name: /Library index/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Slide view/i })).toHaveCount(4);
    await expect(page.getByRole('link', { name: /Handout view/i })).toHaveCount(4);
    await expect(page.getByRole('link', { name: /^Quiz$/i })).toHaveCount(4);
    await expect(page.getByRole('link', { name: /^Flashcards$/i })).toHaveCount(4);
    await expect(page.getByRole('link', { name: /Handout view/i }).first()).toHaveAttribute('href', /view=print/);
    await expect(page.getByRole('link', { name: /^Quiz$/i }).first()).toHaveAttribute('href', /view=quiz/);
    await expect(page.getByRole('link', { name: /^Flashcards$/i }).first()).toHaveAttribute('href', /view=flashcards/);

    await expectNoHorizontalOverflow(page);
  });

  for (const htmlPath of findHtmlFiles(root)) {
    test(`does not render remote image assets in ${htmlPath}`, async ({ page }) => {
      const remoteImageRequests = [];

      page.on('request', (request) => {
        if (request.resourceType() === 'image' && remoteUrlPattern.test(request.url())) {
          remoteImageRequests.push(request.url());
        }
      });

      await page.goto(pageUrl(htmlPath));
      await expectNoRemoteImageAssets(page);
      expect(remoteImageRequests).toEqual([]);
    });
  }
});
