(function () {
  window.INVEST = window.INVEST || {};

  const INVEST = window.INVEST;
  const interactiveSelector = 'a, button, input, textarea, select, label, summary, details, .sourcePanel, .sourceList, .invOverview, .invHandout, .invDiscussionAnswerOverlay';

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function html(value) {
    return String(value ?? '');
  }

  function photoStyle(photo) {
    if (!photo) return '';
    const styles = [];
    if (photo.objectPosition) styles.push(`--photo-position:${escapeHtml(photo.objectPosition)}`);
    if (photo.objectFit) styles.push(`--photo-fit:${escapeHtml(photo.objectFit)}`);
    if (photo.background) styles.push(`--photo-bg:${escapeHtml(photo.background)}`);
    return styles.length ? ` style="${styles.join(';')}"` : '';
  }

  function backgroundStyle(photo) {
    if (!photo?.src) return '';
    const resolvedSrc = new URL(photo.src, window.location.href).href;
    return ` style="--hero-photo:url('${escapeHtml(resolvedSrc)}');--photo-position:${escapeHtml(photo.objectPosition || 'center')}"`;
  }

  function photoMarkup(photo, className = 'invPhotoFull') {
    if (!photo?.src) return '';
    return `
      <figure class="invPhotoFigure ${escapeHtml(className)}"${photoStyle(photo)}>
        <img src="${escapeHtml(photo.src)}" alt="${escapeHtml(photo.alt || '')}" loading="eager" />
        <figcaption class="invPhotoCaption">
          <span>${escapeHtml(photo.caption || photo.alt || '')}</span>
          ${photo.credit ? `<span class="photoCredit">${escapeHtml(photo.credit)}</span>` : ''}
        </figcaption>
      </figure>`;
  }

  function keywordVisualMarkup(item, fallbackLabel = '', fallbackZh = '', className = '') {
    if (!item) return '';
    const photo = item.src ? item : (item.visual || item.photo);
    if (!photo?.src) return '';
    const label = item.src
      ? fallbackLabel
      : (item.label || item.title || item.visualLabel || fallbackLabel || photo.caption || photo.alt || '');
    const labelZh = item.src
      ? fallbackZh
      : (item.labelZh || item.zhTitle || item.titleZh || item.visualLabelZh || fallbackZh || '');
    return `
      <figure class="invKeywordVisual ${escapeHtml(className)}"${photoStyle(photo)}>
        <img src="${escapeHtml(photo.src)}" alt="${escapeHtml(photo.alt || label || '')}" loading="eager" />
        ${(label || labelZh) ? `
          <figcaption>
            ${label ? `<strong>${escapeHtml(label)}</strong>` : ''}
            ${labelZh ? `<span lang="zh-Hans">${escapeHtml(labelZh)}</span>` : ''}
          </figcaption>` : ''}
      </figure>`;
  }

  function keywordVisualListMarkup(items, className = '') {
    const list = Array.isArray(items) ? items : (items ? [items] : []);
    const visuals = list.map((item) => keywordVisualMarkup(item)).filter(Boolean).join('');
    return visuals ? `<div class="invKeywordVisualList ${escapeHtml(className)}">${visuals}</div>` : '';
  }

  function sourceMarkup(sources) {
    if (!sources || !sources.length) return '';
    return `
      <details class="sourceList">
        <summary>Sources</summary>
        <div class="sourcePanel">
          ${sources.map((source) => `
            <article>
              <h3>${escapeHtml(source.label || 'Source')}</h3>
              ${source.ref ? `<p><strong>Ref:</strong> ${escapeHtml(source.ref)}</p>` : ''}
              ${source.note ? `<p>${escapeHtml(source.note)}</p>` : ''}
              ${source.date ? `<p><strong>Date:</strong> ${escapeHtml(source.date)}</p>` : ''}
              ${source.url ? `<p><a href="${escapeHtml(source.url)}">${escapeHtml(source.url)}</a></p>` : ''}
            </article>
          `).join('')}
        </div>
      </details>`;
  }

  function blankMarkup(answer) {
    const answerText = String(answer ?? '');
    const width = Math.max(4, Math.min(16, answerText.length + 2));
    return `<span class="blank invReveal" data-answer="${escapeHtml(answerText)}" style="--blank-width:${width}ch"><span class="invBlankText">${escapeHtml(answerText)}</span></span>`;
  }

  function fillBlankMarkup(template, answer) {
    return escapeHtml(template).replace(/__________([.,!?%]*)/g, (_match, punctuation = '') => {
      const slot = blankMarkup(answer);
      if (!punctuation) return slot;
      return `<span class="invBlankGroup">${slot}<span class="invBlankPunctuation">${escapeHtml(punctuation)}</span></span>`;
    });
  }

  function applyDefinitionBlanks(definition, blanks = []) {
    let output = String(definition ?? '');
    for (const blank of blanks || []) {
      const search = typeof blank === 'string' ? blank : (blank.text || blank.answer);
      const answer = typeof blank === 'string' ? blank : (blank.answer || blank.text);
      if (!search || !answer) continue;
      output = output.replace(search, blankMarkup(answer));
    }
    return html(output);
  }

  function highlightedMarkup(text, highlights = []) {
    let output = escapeHtml(text);
    for (const highlight of highlights || []) {
      const search = typeof highlight === 'string' ? highlight : highlight.text;
      if (!search) continue;
      const escapedSearch = escapeHtml(search);
      const replacement = `<span class="invObjectiveKeyword">${escapedSearch}</span>`;
      output = output.replace(escapedSearch, replacement);
    }
    return output;
  }

  function alphaLabel(index) {
    return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(index) || String(index + 1);
  }

  function normalizeNumberedItem(item, index) {
    if (Array.isArray(item)) {
      return {
        label: item[0] || String(index + 1),
        text: item[1] || '',
        answer: item[2] || '',
        zh: item[3] || '',
      };
    }
    return {
      label: item?.label || String(index + 1),
      text: item?.text || item?.prompt || '',
      answer: item?.answer || '',
      zh: item?.zh || '',
      answerZh: item?.answerZh || '',
      reason: item?.reason || '',
      reasonZh: item?.reasonZh || '',
      term: item?.term || '',
      termZh: item?.termZh || '',
    };
  }

  function yesNoLabel(value) {
    if (value === true) return 'Yes';
    if (value === false) return 'No';
    return String(value ?? '');
  }

  function handoutBlank(answer, width = null) {
    const answerText = String(answer ?? '');
    const blankWidth = width || Math.max(8, Math.min(24, answerText.length + 4));
    return `<span class="handoutBlank" data-answer="${escapeHtml(answerText)}" style="--handout-blank-width:${blankWidth}ch"><span class="blankAnswer">${escapeHtml(answerText)}</span></span>`;
  }

  function handoutFillBlankMarkup(template, answer) {
    return escapeHtml(template).replace(/__________([.,!?%]*)/g, (_match, punctuation = '') => {
      const slot = handoutBlank(answer);
      return punctuation ? `${slot}${escapeHtml(punctuation)}` : slot;
    });
  }

  function handoutLines(count = 1) {
    return Array.from({ length: count }, () => '<span class="handoutWriteLine"></span>').join('');
  }

  function renderHandoutBlock(block) {
    if (block.type === 'scenario') {
      const facts = (block.realData || []).map((item) => `
        <div class="handoutFact">
          <span>${escapeHtml(item.label || 'Source-backed evidence')}</span>
          <strong>${escapeHtml(item.value || '')}</strong>
          ${item.source ? `<em>${escapeHtml(item.source)}</em>` : ''}
        </div>
      `).join('');
      return `
        <div class="handoutScenario">
          <h3>${escapeHtml(block.title || 'Grounded scenario')}</h3>
          <p>${escapeHtml(block.context || '')}</p>
          ${facts ? `<div class="handoutFactGrid">${facts}</div>` : ''}
          ${block.fictionalElement ? `<p><strong>Mock or anonymised element:</strong> ${escapeHtml(block.fictionalElement)}</p>` : ''}
          ${block.lessonUse ? `<p><strong>Use in this lesson:</strong> ${escapeHtml(block.lessonUse)}</p>` : ''}
          ${block.limitation ? `<p><strong>Limitation:</strong> ${escapeHtml(block.limitation)}</p>` : ''}
        </div>`;
    }

    if (block.type === 'facts') {
      return `
        <div class="handoutFactGrid">
          ${(block.items || []).map((item) => `
            <div class="handoutFact">
              <span>${escapeHtml(item.label)}</span>
              <strong>${escapeHtml(item.value)}</strong>
              ${item.note ? `<em>${escapeHtml(item.note)}</em>` : ''}
            </div>
          `).join('')}
        </div>`;
    }

    if (block.type === 'cases') {
      return `
        <div class="handoutCases">
          ${(block.cases || []).map((item) => `
            <div class="handoutCase">
              <strong>${escapeHtml(item.label)}</strong>
              <span>${escapeHtml(item.text)}</span>
              <div>Category: ${handoutBlank(item.answer || '', 16)}</div>
            </div>
          `).join('')}
        </div>`;
    }

    if (block.type === 'terms') {
      return `
        <div class="handoutTermList">
          ${(block.terms || []).map((item) => `
            <div class="handoutTermItem">
              <strong>${escapeHtml(item.label)}</strong>
              <span>${handoutFillBlankMarkup(item.prompt, item.answer)}</span>
            </div>
          `).join('')}
        </div>`;
    }

    if (block.type === 'table') {
      return `
        <table class="handoutDataTable">
          <thead>
            <tr>${(block.columns || []).map((column) => `<th>${escapeHtml(column)}</th>`).join('')}</tr>
          </thead>
          <tbody>
            ${(block.rows || []).map((row) => {
              if (Array.isArray(row)) {
                return `<tr>${row.map((cell, index) => `<td>${index === 0 ? `<strong>${escapeHtml(cell)}</strong>` : escapeHtml(cell)}</td>`).join('')}</tr>`;
              }
              return `
                <tr>
                  <td><strong>${escapeHtml(row.metric)}</strong><br><span>${escapeHtml(row.value)}</span></td>
                  <td>${escapeHtml(row.shows || '')}${row.showsLines ? handoutLines(row.showsLines) : ''}</td>
                  <td>${escapeHtml(row.limits || '')}${row.limitLines ? handoutLines(row.limitLines) : ''}</td>
                </tr>`;
            }).join('')}
          </tbody>
        </table>`;
    }

    if (block.type === 'calculation') {
      return `
        <div class="handoutCalculation">
          ${block.formula ? `<div><strong>Formula:</strong> ${escapeHtml(block.formula)}</div>` : ''}
          ${block.worked ? `<div><strong>Worked example:</strong> ${escapeHtml(block.worked)}</div>` : ''}
          ${block.task ? `<div><strong>Try it:</strong> ${escapeHtml(block.task)}</div>` : ''}
          ${handoutLines(block.lines || 3)}
        </div>`;
    }

    if (block.type === 'prompts') {
      return `
        <div class="handoutPromptGrid">
          ${(block.prompts || []).map((prompt) => `
            <div class="handoutPrompt">
              <strong>${escapeHtml(prompt.label)}</strong>
              <span>${escapeHtml(prompt.prompt)}</span>
              ${handoutLines(prompt.lines || 1)}
            </div>
          `).join('')}
        </div>`;
    }

    if (block.type === 'sentence') {
      return `
        <div class="handoutSentence">
          <strong>${escapeHtml(block.label || 'Sentence check')}</strong>
          <p>${escapeHtml(block.prompt || '')}</p>
          ${block.keywords ? `<div class="handoutKeywords">${block.keywords.map((keyword) => `<span>${escapeHtml(keyword)}</span>`).join('')}</div>` : ''}
          ${handoutLines(block.lines || 2)}
        </div>`;
    }

    if (block.type === 'writing') {
      return `
        <div class="handoutWriting">
          <strong>${escapeHtml(block.question || '')}</strong>
          ${block.keywords ? `<div class="handoutKeywords">${block.keywords.map((keyword) => `<span>${escapeHtml(keyword)}</span>`).join('')}</div>` : ''}
          ${handoutLines(block.lines || 6)}
        </div>`;
    }

    return '';
  }

  function mountHandout(lesson, target = document.body) {
    const handout = lesson.handout || {};
    const title = handout.title || lesson.meta?.lessonLabel || 'Investment Analysis handout';
    const subtitle = handout.subtitle || lesson.meta?.courseLabel || 'Investment Analysis';
    const sections = handout.sections || [];

    document.body.classList.remove('investment-deck', 'investment-quiz');
    document.body.classList.add('investment-handout');
    target.innerHTML = `
      <main class="invHandout">
        <header class="handoutToolbar">
          <nav class="invModeTabs" aria-label="Lesson views">
            <a href="${escapeHtml(location.pathname)}">Slides</a>
            <a href="${escapeHtml(location.pathname)}?view=print" aria-current="page">Handout</a>
            <a href="${escapeHtml(location.pathname)}?view=quiz">Quiz</a>
            ${lesson.meta?.passportUrl ? `<a href="${escapeHtml(lesson.meta.passportUrl)}">Passport</a>` : ''}
            <a href="../../index.html">Course</a>
          </nav>
          <div class="handoutTools">
            <label class="handoutAnswerToggle">
              <input type="checkbox" data-handout-answer-toggle />
              <span>Answers</span>
            </label>
            <button class="invButton" type="button" data-action="print">Print</button>
          </div>
        </header>
        <article class="handoutDocument">
          <header class="handoutHeader">
            <div>
              <p class="handoutKicker">${escapeHtml(subtitle)}</p>
              <h1>${escapeHtml(title)}</h1>
              ${handout.description ? `<p>${escapeHtml(handout.description)}</p>` : ''}
            </div>
            ${handout.meta ? `<dl class="handoutMeta">
              ${handout.meta.map((item) => `
                <div><dt>${escapeHtml(item.label)}</dt><dd>${escapeHtml(item.value)}</dd></div>
              `).join('')}
            </dl>` : ''}
          </header>
          ${sections.map((section) => `
            <section class="handoutSection">
              <div class="handoutSectionTitle">
                <span>${escapeHtml(section.label || '')}</span>
                <h2>${escapeHtml(section.title || '')}</h2>
                ${section.instruction ? `<p>${escapeHtml(section.instruction)}</p>` : ''}
              </div>
              <div class="handoutSectionBody">
                ${(section.blocks || []).map(renderHandoutBlock).join('')}
              </div>
            </section>
          `).join('')}
          ${handout.sources ? `<footer class="handoutFootnote">${escapeHtml(handout.sources)}</footer>` : ''}
        </article>
      </main>`;

    document.querySelector('[data-handout-answer-toggle]')?.addEventListener('change', (event) => {
      document.querySelector('.handoutDocument')?.classList.toggle('is-showing-answers', event.target.checked);
    });
    document.querySelector('[data-action="print"]')?.addEventListener('click', () => window.print());
  }

  function slideShell(slide, index, lesson, body, extraClass = '', backgroundPhoto = null, options = {}) {
    const sources = slide.sources || lesson.meta?.sources || lesson.sources || [];
    const className = ['invSlide', extraClass].filter(Boolean).join(' ');
    return `
      <section class="${escapeHtml(className)}" data-idx="${index}" data-type="${escapeHtml(slide.type)}" aria-label="${escapeHtml(slide.title || `Slide ${index + 1}`)}"${backgroundStyle(backgroundPhoto)}>
        ${options.hideHeader ? '' : `<header class="invSlideHeader">
          <div class="invTitleBlock">
            ${slide.eyebrow ? `<div class="invEyebrow">${escapeHtml(slide.eyebrow)}</div>` : ''}
            ${slide.title && !options.hideTitle ? `<h1>${html(slide.title)}</h1>` : ''}
            ${slide.zhTitle ? `<div class="invZhTitle" lang="zh-Hans">${escapeHtml(slide.zhTitle)}</div>` : ''}
            ${slide.subtitle ? `<p class="invLead">${html(slide.subtitle)}</p>` : ''}
            ${slide.kicker ? `<p class="invHeroKicker">${escapeHtml(slide.kicker)}</p>` : ''}
          </div>
          ${sourceMarkup(sources)}
        </header>`}
        <div class="invSlideBody">${body}</div>
        <footer class="invSlideFooter">
          ${slide.sourceStamp ? `<div class="invSourceStamp">${escapeHtml(slide.sourceStamp)}</div>` : ''}
        </footer>
      </section>`;
  }

  function formatChartMonth(date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [year, month] = String(date || '').split('-');
    const monthLabel = months[Math.max(0, Math.min(11, Number(month) - 1))] || '';
    return `${monthLabel} ${year || ''}`.trim();
  }

  function formatChartValue(value, currency = '') {
    const number = Number(value);
    if (!Number.isFinite(number)) return '';
    const formatted = number.toLocaleString('en-US', {
      minimumFractionDigits: number % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    });
    return `${currency ? `${currency} ` : ''}${formatted}`;
  }

  function renderPriceChart(slide, index, lesson) {
    const data = slide.data || {};
    const rawPoints = (slide.points || data.points || [])
      .map((point) => ({ date: point.date, close: Number(point.close) }))
      .filter((point) => point.date && Number.isFinite(point.close));

    if (rawPoints.length < 2) {
      const body = `<div class="invPanel"><div class="invBigQuestion">${html(slide.question || slide.title || 'Price chart')}</div></div>`;
      return slideShell(slide, index, lesson, body, 'invPriceChartSlide');
    }

    const width = 1000;
    const height = 560;
    const pad = { top: 46, right: 48, bottom: 58, left: 84 };
    const chartWidth = width - pad.left - pad.right;
    const chartHeight = height - pad.top - pad.bottom;
    const closes = rawPoints.map((point) => point.close);
    const minClose = Math.min(...closes);
    const maxClose = Math.max(...closes);
    const yMin = slide.yMin ?? Math.max(0, Math.floor(minClose / 50) * 50);
    const yMax = slide.yMax ?? Math.ceil(maxClose / 50) * 50;
    const yRange = Math.max(1, yMax - yMin);
    const xFor = (i) => pad.left + (i / Math.max(1, rawPoints.length - 1)) * chartWidth;
    const yFor = (value) => pad.top + ((yMax - value) / yRange) * chartHeight;
    const polyline = rawPoints.map((point, i) => `${xFor(i).toFixed(1)},${yFor(point.close).toFixed(1)}`).join(' ');
    const areaPath = `M ${pad.left},${pad.top + chartHeight} L ${polyline.replaceAll(' ', ' L ')} L ${pad.left + chartWidth},${pad.top + chartHeight} Z`;
    const highPoint = rawPoints.reduce((best, point, i) => point.close > best.point.close ? { point, i } : best, { point: rawPoints[0], i: 0 });
    const lowPoint = rawPoints.reduce((best, point, i) => point.close < best.point.close ? { point, i } : best, { point: rawPoints[0], i: 0 });
    const latestPoint = { point: rawPoints[rawPoints.length - 1], i: rawPoints.length - 1 };
    const annotations = [
      { key: 'high', label: 'High point', item: highPoint, align: 'right' },
      { key: 'low', label: 'Low point', item: lowPoint, align: 'left' },
      { key: 'latest', label: 'Latest monthly close', item: latestPoint, align: 'right' },
    ];
    const yTicks = Array.from({ length: 6 }, (_, i) => yMin + ((yMax - yMin) / 5) * i);
    const xTicks = [0, Math.floor((rawPoints.length - 1) / 4), Math.floor((rawPoints.length - 1) / 2), Math.floor((rawPoints.length - 1) * 3 / 4), rawPoints.length - 1];
    const currency = data.currency || slide.currency || '';
    const labelMarkup = annotations.map(({ key, label, item, align }) => {
      const x = xFor(item.i);
      const y = yFor(item.point.close);
      const labelX = align === 'right' ? Math.max(pad.left + 130, x - 170) : Math.min(pad.left + chartWidth - 190, x + 18);
      const labelY = Math.max(pad.top + 8, Math.min(pad.top + chartHeight - 78, y - 40));
      return `
        <g class="invChartAnnotation invChartAnnotation-${escapeHtml(key)} invReveal">
          <circle class="invChartMarkerDot" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="8" />
          <line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${labelX}" y2="${labelY + 30}" />
          <foreignObject x="${labelX}" y="${labelY}" width="190" height="76">
            <div class="invChartLabel">
              <strong>${escapeHtml(label)}</strong>
              <span>${escapeHtml(formatChartMonth(item.point.date))}</span>
              <em>${escapeHtml(formatChartValue(item.point.close, currency))}</em>
            </div>
          </foreignObject>
        </g>`;
    }).join('');
    const body = `
      <div class="invPriceChartStage">
        <div class="invPriceChartOverlay">
          ${slide.eyebrow ? `<div class="invEyebrow">${escapeHtml(slide.eyebrow)}</div>` : ''}
          <h1>${html(slide.title || '')}</h1>
          ${slide.zhTitle ? `<div class="invZhTitle" lang="zh-Hans">${escapeHtml(slide.zhTitle)}</div>` : ''}
          ${slide.question ? `<p class="invPriceChartQuestion">${html(slide.question)}</p>` : ''}
          ${slide.questionZh ? `<p class="invPromptZh" lang="zh-Hans">${escapeHtml(slide.questionZh)}</p>` : ''}
        </div>
        <svg class="invPriceChartSvg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(slide.alt || slide.title || 'Share price chart')}">
          <defs>
            <linearGradient id="invPriceChartArea-${index}" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stop-color="rgba(57, 217, 145, 0.34)" />
              <stop offset="100%" stop-color="rgba(57, 217, 145, 0.02)" />
            </linearGradient>
          </defs>
          <rect class="invChartPlotBg" x="${pad.left}" y="${pad.top}" width="${chartWidth}" height="${chartHeight}" />
          ${yTicks.map((tick) => {
            const y = yFor(tick);
            return `<g class="invChartGridLine"><line x1="${pad.left}" y1="${y.toFixed(1)}" x2="${pad.left + chartWidth}" y2="${y.toFixed(1)}" /><text x="${pad.left - 14}" y="${(y + 6).toFixed(1)}">${escapeHtml(formatChartValue(tick, currency))}</text></g>`;
          }).join('')}
          ${xTicks.map((tick) => {
            const x = xFor(tick);
            return `<g class="invChartAxisLabel"><line x1="${x.toFixed(1)}" y1="${pad.top + chartHeight}" x2="${x.toFixed(1)}" y2="${pad.top + chartHeight + 8}" /><text x="${x.toFixed(1)}" y="${pad.top + chartHeight + 34}">${escapeHtml(formatChartMonth(rawPoints[tick].date))}</text></g>`;
          }).join('')}
          <path class="invChartArea" d="${escapeHtml(areaPath)}" fill="url(#invPriceChartArea-${index})" />
          <polyline class="invChartLine" points="${escapeHtml(polyline)}" />
          ${annotations.map(({ key, item }) => `<circle class="invChartMarker invChartMarker-${escapeHtml(key)}" cx="${xFor(item.i).toFixed(1)}" cy="${yFor(item.point.close).toFixed(1)}" r="5" />`).join('')}
          ${labelMarkup}
        </svg>
        <div class="invPriceChartFooter">
          <span>${escapeHtml(data.ticker || slide.ticker || '')} ${escapeHtml(data.interval || slide.interval || '')}</span>
          <span>${escapeHtml(data.sourceLabel || slide.sourceLabel || '')}${data.accessed ? ` | accessed ${escapeHtml(data.accessed)}` : ''}</span>
        </div>
      </div>`;

    return slideShell(slide, index, lesson, body, 'invPriceChartSlide', null, { hideHeader: true });
  }

  function renderHero(slide, index, lesson) {
    const photo = slide.visual || slide.photo;
    const hasMarketCard = Boolean(slide.ticker || (slide.metrics || []).length);
    const titleOnly = !hasMarketCard && !slide.question;
    const revealMetricValues = Boolean(slide.revealMetricValues);
    const metrics = (slide.metrics || []).slice(0, 4).map((metric) => `
      <div class="invMetric">
        <strong>${escapeHtml(metric.label)}</strong>
        <span class="invMetricValue${revealMetricValues ? ' invReveal' : ''}">${escapeHtml(metric.value)}</span>
      </div>
    `).join('');

    if (titleOnly) {
      const prominentTitleClass = slide.prominentTitle ? ' invProminentTitleSlide' : '';
      return slideShell(slide, index, lesson, '', `invHeroSlide invTitleOnlySlide${prominentTitleClass}`, photo);
    }

    const body = `
      <div class="invHeroGrid ${hasMarketCard ? '' : 'is-titleOnly'}">
        <div class="invPanel">
          ${slide.ticker ? `<span class="invTicker">${escapeHtml(slide.ticker)}</span>` : ''}
          ${slide.question || slide.kicker ? `<div class="invBigQuestion">${html(slide.question || slide.kicker)}</div>` : ''}
          ${slide.questionZh ? `<p class="invPromptZh" lang="zh-Hans">${escapeHtml(slide.questionZh)}</p>` : ''}
          ${photo?.credit ? `<div class="invHeroPhotoCredit">${escapeHtml(photo.caption || photo.alt || '')} · ${escapeHtml(photo.credit)}</div>` : ''}
        </div>
        ${hasMarketCard ? `<div class="invMarketCard">
          <div class="invMarketHeader">
            <span>${escapeHtml(slide.ticker || 'Case file')}</span>
            <span>${escapeHtml(slide.sourceStamp || 'Frozen classroom snapshot')}</span>
          </div>
          <div class="invMetricGrid">${metrics}</div>
        </div>` : ''}
      </div>`;

    return slideShell(slide, index, lesson, body, 'invHeroSlide', photo);
  }

  function renderOutcomes(slide, index, lesson) {
    const photo = slide.visual || slide.photo;
    const defaultPhases = ['Learn', 'Use', 'Judge'];
    const objectiveCount = (slide.bullets || []).length;
    const body = `
      <div class="invObjectiveGrid" data-count="${objectiveCount}">
        ${(slide.bullets || []).map((bullet, i) => {
          const text = typeof bullet === 'string' ? bullet : (bullet.text || '');
          const zhText = (slide.zhBullets || [])[i] || '';
          const highlights = (slide.highlights || [])[i] || (typeof bullet === 'object' ? bullet.highlights : []) || [];
          const zhHighlights = (slide.zhHighlights || [])[i] || [];
          return `
          <div class="invObjective">
            <span class="invObjectiveStep">${String(i + 1).padStart(2, '0')}</span>
            <span class="invObjectivePhase">${escapeHtml((slide.phases || [])[i] || defaultPhases[i] || 'Step')}</span>
            <strong>${highlightedMarkup(text, highlights)}</strong>
            <span class="invObjectiveZh" lang="zh-Hans">${highlightedMarkup(zhText, zhHighlights)}</span>
          </div>`;
        }).join('')}
      </div>`;
    return slideShell(slide, index, lesson, body, `invOutcomesSlide${photo ? ' invContextPhotoSlide' : ''}`, photo);
  }

  function sectionProgressMarkup(slide) {
    const titles = slide._sectionTitles || [];
    if (!titles.length) return '';
    return `
      <div class="invSectionProgress" aria-label="Lesson section progress">
        ${titles.map((title, i) => {
          const step = i + 1;
          const stateClass = step < slide._sectionStep ? 'is-complete' : step === slide._sectionStep ? 'is-current' : 'is-next';
          return `
            <span class="${escapeHtml(stateClass)}">
              <i>${step}</i>
              <em>${escapeHtml(String(title).replace(/\s+/g, ' '))}</em>
            </span>`;
        }).join('')}
      </div>`;
  }

  function renderSection(slide, index, lesson) {
    const stepLabel = slide.eyebrow || (slide._sectionStep ? `Part ${slide._sectionStep}` : 'Section');
    const body = `
      <div class="invSectionDivider">
        <div class="invSectionKicker">${escapeHtml(stepLabel)}</div>
        <h1>${html(slide.title || '')}</h1>
        ${slide.zhTitle ? `<div class="invSectionZh" lang="zh-Hans">${escapeHtml(slide.zhTitle)}</div>` : ''}
        ${sectionProgressMarkup(slide)}
      </div>`;
    return slideShell(slide, index, lesson, body, 'invSectionSlide', null, { hideHeader: true });
  }

  function renderVisualPause(slide, index, lesson) {
    const photo = slide.visual || slide.photo;
    if (photo?.src) {
      return `
        <section class="invSlide invVisualPauseSlide" data-idx="${index}" data-type="${escapeHtml(slide.type)}" aria-label="${escapeHtml(slide.title || `Slide ${index + 1}`)}">
          <div class="invVisualPauseHero"${photoStyle(photo)}>
            <img src="${escapeHtml(photo.src)}" alt="${escapeHtml(photo.alt || '')}" loading="eager" />
          </div>
        </section>`;
    }
    return `
      <section class="invSlide invVisualPauseSlide" data-idx="${index}" data-type="${escapeHtml(slide.type)}" aria-label="${escapeHtml(slide.title || `Slide ${index + 1}`)}">
        <div class="invVisualPauseHero invVisualPauseHeroEmpty"></div>
      </section>`;
  }

  function renderDiscussion(slide, index, lesson) {
    const photo = slide.visual || slide.photo;
    const questionText = slide.question || slide.prompt || '';
    const questionZh = slide.zh || slide.questionZh || slide.promptZh;
    const hasAnswer = Boolean(slide.revealTitle || slide.revealTitleZh || slide.answer || slide.note);
    const longQuestion = slide.compact || String(questionText).length > 110 || String(questionZh || '').length > 60;
    const className = `invDiscussionSlide${longQuestion ? ' invLongDiscussionSlide' : ''} invContextPhotoSlide`;
    const body = `
      <div class="invDiscussionStage">
        <div class="invDiscussionPrompt">
          ${slide.eyebrow ? `<div class="invDiscussionEyebrow">${escapeHtml(slide.eyebrow)}</div>` : ''}
          <p class="invDiscussionQuestionText">${html(questionText)}</p>
          ${questionZh ? `<p class="invDiscussionQuestionZh" lang="zh-Hans">${escapeHtml(questionZh)}</p>` : ''}
          ${hasAnswer ? `
            <button type="button" class="invDiscussionAnswerButton" data-action="show-discussion-answer" aria-haspopup="dialog">
              <span>Show possible answer</span>
            </button>` : ''}
        </div>
        ${hasAnswer ? `
          <div class="invDiscussionAnswerOverlay invReveal invDiscussionAnswer" role="dialog" aria-modal="true" aria-label="Possible answer">
            <div class="invDiscussionAnswerPanel">
              <button type="button" class="invDiscussionAnswerClose" data-action="close-discussion-answer" aria-label="Close possible answer">&times;</button>
              <div class="invDiscussionAnswerHeader">Possible answer</div>
              ${slide.revealTitle ? `<strong class="invDiscussionAnswerTitle">${escapeHtml(slide.revealTitle)}</strong>` : ''}
              ${slide.revealTitleZh ? `<strong class="invDiscussionAnswerTitleZh" lang="zh-Hans">${escapeHtml(slide.revealTitleZh)}</strong>` : ''}
              ${(slide.answer || slide.note) ? `<p class="invDiscussionAnswerText">${html(slide.answer || slide.note || '')}</p>` : ''}
              ${slide.answerZh ? `<p class="invDiscussionAnswerZh" lang="zh-Hans">${escapeHtml(slide.answerZh)}</p>` : ''}
            </div>
          </div>` : ''}
      </div>`;
    return slideShell(slide, index, lesson, body, className, photo, { hideHeader: true });
  }

  function renderTerm(slide, index, lesson) {
    const photo = slide.visual || slide.photo;
    const keywordVisuals = keywordVisualListMarkup(slide.keywordVisuals || slide.keywordVisual, 'invTermVisuals');
    const termBox = `
      <div class="invTermBox">
        <div class="invTermHeaderBlock">
          <div class="invTermWord">${escapeHtml(slide.term || slide.title)}</div>
          ${slide.termZh ? `<div class="invTermZh" lang="zh-Hans">${escapeHtml(slide.termZh)}</div>` : ''}
          ${keywordVisuals}
        </div>
        <div class="invTermDefinition">
          <div class="invTermDefinitionText">${applyDefinitionBlanks(slide.definition || '', slide.definitionBlanks)}</div>
          ${slide.definitionZh ? `<p class="invTermDefinitionZh" lang="zh-Hans">${escapeHtml(slide.definitionZh)}</p>` : ''}
        </div>
      </div>`;
    const body = termBox;
    return slideShell(slide, index, lesson, body, `invTermSlide${photo ? ' invContextPhotoSlide' : ''}`, photo, { hideTitle: true });
  }

  function renderAnswer(slide, index, lesson) {
    const photo = slide.visual || slide.photo;
    const isExitTicket = /exit ticket/i.test(slide.title || '');
    const items = (slide.items || []).map((item, i) => {
      const zhMarkup = item.zh && item.answerZh
        ? fillBlankMarkup(item.zh, item.answerZh)
        : escapeHtml(item.zh || '');
      return `
        <div class="invCheckItem">
          <span class="invCheckNumber">${i + 1}</span>
          <span class="invCheckText">
            ${fillBlankMarkup(item.prompt, item.answer)}
            ${item.zh ? `<div class="invZhLine" lang="zh-Hans">${zhMarkup}</div>` : ''}
          </span>
        </div>
      `;
    }).join('');
    const body = `<div class="invCheckList${isExitTicket ? ' invExitList' : ''}">${items}</div>`;
    return slideShell(slide, index, lesson, body, `${isExitTicket ? 'invAnswerSlide invExitTicketSlide' : 'invAnswerSlide'}${photo ? ' invContextPhotoSlide' : ''}`, photo);
  }

  function renderFlow(slide, index, lesson) {
    const photo = slide.visual || slide.photo;
    const flowStyle = slide.flowStyle || 'sequence';
    const steps = (slide.steps || []).map((rawStep, i) => {
      const step = normalizeNumberedItem(rawStep, i);
      const title = rawStep?.title || rawStep?.heading || '';
      const bodyText = rawStep?.body || step.text;
      const textMarkup = title
        ? `
          ${keywordVisualMarkup(rawStep?.visual || rawStep?.photo, rawStep?.visualLabel || title, rawStep?.visualLabelZh || rawStep?.titleZh || '', 'invStepVisual')}
          <strong class="invStepTitle">${escapeHtml(title)}</strong>
          ${bodyText ? `<span class="invStepText">${fillBlankMarkup(bodyText, step.answer)}</span>` : ''}`
        : `
          ${keywordVisualMarkup(rawStep?.visual || rawStep?.photo, rawStep?.visualLabel || step.text, rawStep?.visualLabelZh || '', 'invStepVisual')}
          <strong>${fillBlankMarkup(step.text, step.answer)}</strong>`;
      return `
        <div class="invStep">
          <span class="invStepNum">${escapeHtml(step.label || i + 1)}</span>
          ${textMarkup}
          ${step.zh ? `<span class="invZhLine" lang="zh-Hans">${escapeHtml(step.zh)}</span>` : ''}
        </div>
      `;
    }).join('');
    const body = `<div class="invFlow invFlow-${escapeHtml(flowStyle)}">${steps}</div>`;
    return slideShell(slide, index, lesson, body, `invFlowSlide invFlowSlide-${escapeHtml(flowStyle)} invContextPhotoSlide`, photo);
  }

  function renderDataSnapshot(slide, index, lesson) {
    const photo = slide.visual || slide.photo;
    const focus = (slide.focusMetrics || []).map((metric, i) => `
      <div class="invDataFocusCard">
        <span class="invDataIndex">${String(i + 1).padStart(2, '0')}</span>
        <span class="invDataMetricLabel">${escapeHtml(metric.label)}</span>
        <strong>${escapeHtml(metric.value)}</strong>
      </div>
    `).join('');
    const body = `
      <div class="invDataSimple">
        ${focus ? `<div class="invDataFocus">${focus}</div>` : ''}
        <div class="invDataPrompt">
          <p>${escapeHtml(slide.note || 'Use the source, date and key figures before making a judgement.')}</p>
          ${slide.noteZh ? `<p class="invPromptZh" lang="zh-Hans">${escapeHtml(slide.noteZh)}</p>` : ''}
          <div class="invDataTask">
            <strong>Student task</strong>
            <span>${escapeHtml(slide.task || 'Find the stock code, the source date, and one performance number before judging the share.')}</span>
            ${slide.taskZh ? `<span class="invZhLine" lang="zh-Hans">${escapeHtml(slide.taskZh)}</span>` : ''}
          </div>
        </div>
      </div>`;
    return slideShell(slide, index, lesson, body, 'invDataSnapshotSlide invContextPhotoSlide', photo);
  }

  function renderConceptTriad(slide, index, lesson) {
    const photo = slide.visual || slide.photo;
    const revealDetails = Boolean(slide.revealDetails);
    const concepts = (slide.concepts || []).slice(0, 3).map((concept, i) => {
      const rows = [
        ['Purpose', concept.purpose],
        ['Risk', concept.risk],
        ['Time', concept.time],
        ['Example', concept.example],
      ].filter((row) => row[1] !== undefined && row[1] !== null && row[1] !== '');
      return `
        <article class="invConceptCard">
          <span class="invConceptIndex">${String(i + 1).padStart(2, '0')}</span>
          ${concept.tag ? `<span class="invConceptTag">${escapeHtml(concept.tag)}</span>` : ''}
          <strong>${escapeHtml(concept.label || `Concept ${i + 1}`)}</strong>
          ${concept.definition ? `<p class="invConceptDefinition">${html(concept.definition)}</p>` : ''}
          ${concept.definitionZh ? `<p class="invZhLine" lang="zh-Hans">${escapeHtml(concept.definitionZh)}</p>` : ''}
          ${rows.length ? `<div class="invConceptRows${revealDetails ? ' invReveal' : ''}">
            ${rows.map(([label, value]) => `
              <div class="invConceptRow">
                <span>${escapeHtml(label)}</span>
                <em>${escapeHtml(value)}</em>
              </div>
            `).join('')}
          </div>` : ''}
          ${concept.note ? `<p class="invConceptNote${revealDetails ? ' invReveal' : ''}">${html(concept.note)}</p>` : ''}
        </article>`;
    }).join('');
    const body = `
      <div>
        <div class="invConceptTriad">${concepts}</div>
        ${slide.prompt ? `<div class="invFocusPrompt invReveal"><strong>${escapeHtml(slide.prompt)}</strong>${slide.promptZh ? `<div class="invZhLine" lang="zh-Hans">${escapeHtml(slide.promptZh)}</div>` : ''}</div>` : ''}
      </div>`;
    return slideShell(slide, index, lesson, body, 'invConceptTriadSlide invContextPhotoSlide', photo);
  }

  function renderVisualGrid(slide, index, lesson) {
    const revealCardLabels = Boolean(slide.revealCardLabels || slide.revealCardText);
    const showCardNumbers = slide.showCardNumbers !== false;
    const cards = (slide.cards || []).slice(0, 6).map((card, i) => {
      const photo = card.visual || card.photo;
      const textClass = `invVisualGridText${revealCardLabels ? ' invReveal' : ''}`;
      return `
        <article class="invVisualGridCard">
          ${photo?.src ? `
            <div class="invVisualGridImage"${photoStyle(photo)}>
              <img src="${escapeHtml(photo.src)}" alt="${escapeHtml(photo.alt || '')}" loading="eager" />
            </div>` : '<div class="invVisualGridImage invVisualGridImageEmpty"></div>'}
          <div class="${textClass}">
            ${showCardNumbers ? `<span>${String(i + 1).padStart(2, '0')}</span>` : ''}
            <strong>${escapeHtml(card.title || '')}</strong>
            ${card.zhTitle ? `<em lang="zh-Hans">${escapeHtml(card.zhTitle)}</em>` : ''}
            ${card.body ? `<p>${escapeHtml(card.body)}</p>` : ''}
            ${card.bodyZh ? `<p class="invZhLine" lang="zh-Hans">${escapeHtml(card.bodyZh)}</p>` : ''}
          </div>
        </article>`;
    }).join('');
    const body = `
      <div class="invVisualGridWrap">
        ${slide.prompt ? `<div class="invFocusPrompt"><strong>${escapeHtml(slide.prompt)}</strong>${slide.promptZh ? `<div class="invZhLine" lang="zh-Hans">${escapeHtml(slide.promptZh)}</div>` : ''}</div>` : ''}
        <div class="invVisualGrid" data-count="${(slide.cards || []).length}">${cards}</div>
      </div>`;
    return slideShell(slide, index, lesson, body, 'invVisualGridSlide');
  }

  function renderSourceLens(slide, index, lesson) {
    const photo = slide.visual || slide.photo;
    const revealAnswers = Boolean(slide.revealAnswers);
    const metaItems = (slide.metaItems || slide.sourceItems || []).slice(0, 4).map((item, i) => `
      <div class="invSourceMetaItem">
        <span>${escapeHtml(item.label || `Source ${i + 1}`)}</span>
        <strong>${escapeHtml(item.value ?? '')}</strong>
        ${item.note ? `<em>${escapeHtml(item.note)}</em>` : ''}
      </div>
    `).join('');
    const checks = (slide.checks || []).slice(0, 4).map((check, i) => `
      <div class="invSourceCheck">
        <span class="invSourceCheckNum">${i + 1}</span>
        <strong>${escapeHtml(check.label || `Check ${i + 1}`)}</strong>
        <p>${html(check.prompt || '')}</p>
        ${check.zh ? `<p class="invZhLine" lang="zh-Hans">${escapeHtml(check.zh)}</p>` : ''}
        ${check.answer ? `<p class="invSourceAnswer${revealAnswers ? ' invReveal' : ''}"><span>${escapeHtml(slide.answerLabel || 'Strong answer')}</span>${html(check.answer)}${check.answerZh ? `<span class="invZhLine" lang="zh-Hans">${escapeHtml(check.answerZh)}</span>` : ''}</p>` : ''}
      </div>
    `).join('');
    const body = `
      <div class="invSourceLens">
        <div class="invSourceMeta">${metaItems}</div>
        <div class="invSourceChecks">${checks}</div>
        ${slide.task ? `<div class="invFocusPrompt invReveal"><strong>${escapeHtml(slide.task)}</strong>${slide.taskZh ? `<div class="invZhLine" lang="zh-Hans">${escapeHtml(slide.taskZh)}</div>` : ''}</div>` : ''}
      </div>`;
    return slideShell(slide, index, lesson, body, 'invSourceLensSlide invContextPhotoSlide', photo);
  }

  function renderQuoteMap(slide, index, lesson) {
    const photo = slide.visual || slide.photo;
    const revealValues = Boolean(slide.revealValues);
    const fields = (slide.fields || []).slice(0, 6).map((field, i) => {
      const valueClass = (revealValues || field.reveal) ? ' invReveal' : '';
      return `
        <div class="invQuoteField">
          <span class="invQuoteIndex">${String(i + 1).padStart(2, '0')}</span>
          <span class="invQuoteLabel">${escapeHtml(field.label || '')}</span>
          <strong class="invQuoteValue${valueClass}">${escapeHtml(field.value ?? '')}</strong>
          ${field.note ? `<em>${escapeHtml(field.note)}</em>` : ''}
        </div>`;
    }).join('');
    const body = `
      <div class="invQuoteMap">
        <div class="invQuoteScreen">
          <div class="invQuoteHeader">
            <span>${escapeHtml(slide.quoteLabel || 'Quote page')}</span>
            <strong>${escapeHtml(slide.quoteTitle || slide.title || '')}</strong>
          </div>
          <div class="invQuoteFields">${fields}</div>
        </div>
        <div class="invQuoteTask">
          <strong>${html(slide.prompt || 'Read the quote page before making a claim.')}</strong>
          ${slide.promptZh ? `<p class="invZhLine" lang="zh-Hans">${escapeHtml(slide.promptZh)}</p>` : ''}
          ${slide.answer ? `<p class="invReveal">${html(slide.answer)}${slide.answerZh ? `<span class="invZhLine" lang="zh-Hans">${escapeHtml(slide.answerZh)}</span>` : ''}</p>` : ''}
        </div>
      </div>`;
    return slideShell(slide, index, lesson, body, 'invQuoteMapSlide invContextPhotoSlide', photo);
  }

  function renderComparisonMatrix(slide, index, lesson) {
    const photo = slide.visual || slide.photo;
    const columns = (slide.columns || []).slice(0, 3);
    const rows = (slide.rows || slide.criteria || []).slice(0, 4);
    const revealCells = Boolean(slide.revealCells);
    const header = `
      <div class="invCompareCorner">${escapeHtml(slide.cornerLabel || 'Criterion')}</div>
      ${columns.map((column) => `
        <div class="invCompareHead">
          <strong>${escapeHtml(column.label || '')}</strong>
          ${column.note ? `<span>${escapeHtml(column.note)}</span>` : ''}
        </div>
      `).join('')}`;
    const rowMarkup = rows.map((row) => {
      const values = row.values || [];
      return `
        <div class="invCompareCriterion">${escapeHtml(row.label || '')}</div>
        ${columns.map((column, i) => {
          const rawValue = values[i];
          const value = rawValue && typeof rawValue === 'object' && !Array.isArray(rawValue)
            ? rawValue
            : { text: rawValue ?? '' };
          const isPreferred = row.preferred === i || row.preferred === column.label;
          return `
            <div class="invCompareCell${isPreferred ? ' is-preferred' : ''}">
              <strong class="${revealCells || value.reveal ? 'invReveal' : ''}">${escapeHtml(value.text ?? '')}</strong>
              ${value.note ? `<span>${escapeHtml(value.note)}</span>` : ''}
            </div>`;
        }).join('')}`;
    }).join('');
    const body = `
      <div>
        <div class="invCompareMatrix" style="--compare-cols:${Math.max(1, columns.length)}">
          ${header}
          ${rowMarkup}
        </div>
        ${slide.prompt ? `<div class="invFocusPrompt invReveal"><strong>${escapeHtml(slide.prompt)}</strong>${slide.promptZh ? `<div class="invZhLine" lang="zh-Hans">${escapeHtml(slide.promptZh)}</div>` : ''}</div>` : ''}
      </div>`;
    return slideShell(slide, index, lesson, body, 'invComparisonMatrixSlide invContextPhotoSlide', photo);
  }

  function renderEvidenceSimulator(slide, index, lesson) {
    const facts = (slide.facts || []).slice(0, 4);
    const decisionOptions = (slide.decisionOptions || slide.verdicts || []).slice(0, 3);
    const conclusion = slide.conclusion || {};
    const factMarkup = facts.map((fact, factIndex) => `
      <article class="invEvidenceFact" data-fact-index="${factIndex}" data-fact-label="${escapeHtml(fact.label || `Evidence ${factIndex + 1}`)}" aria-expanded="false">
        <span class="invEvidenceFactNumber">${String(factIndex + 1).padStart(2, '0')}</span>
        <div class="invEvidenceFactText">
          <strong>${escapeHtml(fact.label || `Evidence ${factIndex + 1}`)}</strong>
          ${fact.labelZh ? `<span class="invZhLine" lang="zh-Hans">${escapeHtml(fact.labelZh)}</span>` : ''}
          <div class="invEvidenceFactValue" hidden>
            <p>${escapeHtml(fact.value || '')}</p>
            ${fact.valueZh ? `<p class="invZhLine" lang="zh-Hans">${escapeHtml(fact.valueZh)}</p>` : ''}
          </div>
        </div>
        <span class="invEvidenceFactStatus">Hidden</span>
      </article>`).join('');
    const decisionMarkup = decisionOptions.map((option, optionIndex) => `
      <article class="invEvidenceDecisionOption" data-tone="${escapeHtml(option.tone || 'neutral')}">
        <span class="invEvidenceDecisionNumber" aria-hidden="true">${optionIndex + 1}</span>
        <div class="invEvidenceDecisionText">
          <strong>${escapeHtml(option.label || '')}</strong>
          ${option.labelZh ? `<span class="invZhLine" lang="zh-Hans">${escapeHtml(option.labelZh)}</span>` : ''}
          ${option.detail ? `<p>${escapeHtml(option.detail)}</p>` : ''}
          ${option.detailZh ? `<p class="invZhLine" lang="zh-Hans">${escapeHtml(option.detailZh)}</p>` : ''}
        </div>
      </article>`).join('');
    const body = `
      <div class="invEvidenceSimulator" data-stage="0" data-conclusion="false" data-fact-count="${facts.length}">
        <div class="invEvidenceStarter">
          <span>${escapeHtml(slide.promptLabel || 'Starting information')}</span>
          <strong>${html(slide.prompt || '')}</strong>
          ${slide.promptZh ? `<p class="invZhLine" lang="zh-Hans">${escapeHtml(slide.promptZh)}</p>` : ''}
        </div>
        <section class="invEvidenceDecisionGuide" aria-label="Three possible next steps">
          <div class="invEvidencePanelHead">
            <strong>${escapeHtml(slide.decisionLabel || 'Choose one after each clue')}</strong>
            <span>Students show 1, 2 or 3</span>
          </div>
          <div class="invEvidenceDecisionOptions">${decisionMarkup}</div>
        </section>
        <section class="invEvidenceBoard" aria-label="Clues to reveal">
          <div class="invEvidencePanelHead">
            <strong>${escapeHtml(slide.evidenceLabel || 'Clues to reveal')}</strong>
            <span class="invEvidenceProgress">0 / ${facts.length} clues</span>
          </div>
          <div class="invEvidenceFacts">${factMarkup}</div>
        </section>
        <div class="invEvidenceConclusion" data-verdict="${escapeHtml(conclusion.verdict || '')}" data-tone="${escapeHtml(conclusion.tone || 'positive')}" hidden>
          <span>${escapeHtml(slide.conclusionLabel || 'Strongest final judgement')}</span>
          <strong>${escapeHtml(conclusion.label || '')}</strong>
          ${conclusion.labelZh ? `<span class="invZhLine" lang="zh-Hans">${escapeHtml(conclusion.labelZh)}</span>` : ''}
          ${conclusion.text ? `<p>${html(conclusion.text)}</p>` : ''}
          ${conclusion.textZh ? `<p class="invZhLine" lang="zh-Hans">${escapeHtml(conclusion.textZh)}</p>` : ''}
        </div>
        <div class="invEvidenceControls">
          <button class="invEvidenceAction" type="button" data-action="reveal-evidence">Reveal next clue</button>
          <button class="invEvidenceReset" type="button" data-action="reset-evidence">Reset</button>
          <span>${escapeHtml(slide.instruction || 'Students show 1, 2 or 3. The teacher clicks only Reveal next clue.')}</span>
        </div>
      </div>`;
    return slideShell(slide, index, lesson, body, 'invEvidenceSimulatorSlide');
  }

  function renderCatalystTimeline(slide, index, lesson) {
    const photo = slide.visual || slide.photo;
    const revealEffects = Boolean(slide.revealEffects);
    const events = (slide.events || []).slice(0, 4).map((event, i) => `
      <div class="invCatalystEvent">
        <span class="invCatalystStep">${String(i + 1).padStart(2, '0')}</span>
        <span class="invCatalystDate">${escapeHtml(event.date || event.label || '')}</span>
        <strong>${escapeHtml(event.title || '')}</strong>
        <p>${escapeHtml(event.detail || '')}</p>
        ${event.detailZh ? `<p class="invZhLine" lang="zh-Hans">${escapeHtml(event.detailZh)}</p>` : ''}
        ${event.effect ? `<p class="invCatalystEffect${revealEffects ? ' invReveal' : ''}"><span>${escapeHtml(slide.effectLabel || 'Possible link')}</span>${escapeHtml(event.effect)}</p>` : ''}
      </div>
    `).join('');
    const body = `
      <div>
        <div class="invCatalystTimeline">${events}</div>
        ${slide.prompt ? `<div class="invFocusPrompt invReveal"><strong>${escapeHtml(slide.prompt)}</strong>${slide.promptZh ? `<div class="invZhLine" lang="zh-Hans">${escapeHtml(slide.promptZh)}</div>` : ''}</div>` : ''}
      </div>`;
    return slideShell(slide, index, lesson, body, 'invCatalystTimelineSlide invContextPhotoSlide', photo);
  }

  function renderJudgementFrame(slide, index, lesson) {
    const photo = slide.visual || slide.photo;
    const revealAnswers = Boolean(slide.revealAnswers);
    const stages = (slide.stages || []).slice(0, 4).map((stage, i) => `
      <div class="invJudgementStage">
        <span class="invJudgementStep">${String(i + 1).padStart(2, '0')}</span>
        <strong>${escapeHtml(stage.label || '')}</strong>
        <p>${html(stage.prompt || '')}</p>
        ${stage.zh ? `<p class="invZhLine" lang="zh-Hans">${escapeHtml(stage.zh)}</p>` : ''}
        ${stage.answer ? `<p class="invJudgementAnswer${revealAnswers ? ' invReveal' : ''}">${html(stage.answer)}${stage.answerZh ? `<span class="invZhLine" lang="zh-Hans">${escapeHtml(stage.answerZh)}</span>` : ''}</p>` : ''}
      </div>
    `).join('');
    const body = `
      <div class="invJudgementFrame">
        <div class="invJudgementStages">${stages}</div>
        ${slide.finalPrompt ? `<div class="invFocusPrompt invReveal"><strong>${escapeHtml(slide.finalPrompt)}</strong>${slide.finalPromptZh ? `<div class="invZhLine" lang="zh-Hans">${escapeHtml(slide.finalPromptZh)}</div>` : ''}</div>` : ''}
      </div>`;
    return slideShell(slide, index, lesson, body, 'invJudgementFrameSlide invContextPhotoSlide', photo);
  }

  function renderAnalystBoard(slide, index, lesson) {
    const photo = slide.visual || slide.photo;
    const revealBlocks = Boolean(slide.revealBlocks);
    const blocks = (slide.blocks || []).slice(0, 3).map((block, i) => `
      <div class="invEvidence">
        <span class="invEvidenceNumber">${String(i + 1).padStart(2, '0')}</span>
        <span class="invEyebrow">${escapeHtml(block.label)}</span>
        <strong>${escapeHtml(block.title)}</strong>
        <div class="invEvidenceBody${revealBlocks ? ' invReveal' : ''}">
          <p>${escapeHtml(block.body)}</p>
          ${block.zh ? `<p class="invZhLine" lang="zh-Hans">${escapeHtml(block.zh)}</p>` : ''}
        </div>
      </div>
    `).join('');
    const body = `
      <div>
        <div class="invEvidenceGrid">${blocks}</div>
        ${slide.prompt ? `<div class="invFocusPrompt invReveal">${escapeHtml(slide.prompt)}${slide.promptZh ? `<div class="invZhLine" lang="zh-Hans">${escapeHtml(slide.promptZh)}</div>` : ''}</div>` : ''}
      </div>`;
    return slideShell(slide, index, lesson, body, 'invAnalystBoardSlide invContextPhotoSlide', photo);
  }

  function renderCalculationDesk(slide, index, lesson) {
    const photo = slide.visual || slide.photo;
    const rows = (slide.rows || []).map((row) => `
      <div class="invCalcRow">
        <span>${escapeHtml(row.label || '')}</span>
        <strong>${escapeHtml(row.value || '')}</strong>
        ${row.zh ? `<em lang="zh-Hans">${escapeHtml(row.zh)}</em>` : ''}
      </div>
    `).join('');
    const body = `
      <div>
        <div class="invCalcBox">
          ${slide.formula ? `<div class="invFormula">${escapeHtml(slide.formula)}</div>` : ''}
          ${rows ? `<div class="invCalcRows">${rows}</div>` : ''}
          ${slide.worked ? `<div class="invWorked"><strong>Worked example</strong><br>${html(slide.worked)}${slide.workedZh ? `<div class="invZhLine" lang="zh-Hans">${escapeHtml(slide.workedZh)}</div>` : ''}</div>` : ''}
          ${slide.prompt ? `<div class="invTryIt"><strong>Try it</strong><br>${html(slide.prompt)}${slide.promptZh ? `<div class="invZhLine" lang="zh-Hans">${escapeHtml(slide.promptZh)}</div>` : ''}</div>` : ''}
          ${slide.answer ? `<div class="invNotePanel invReveal"><strong>Answer</strong><p>${html(slide.answer)}${slide.answerZh ? `<span class="invZhLine" lang="zh-Hans">${escapeHtml(slide.answerZh)}</span>` : ''}</p></div>` : ''}
        </div>
      </div>`;
    return slideShell(slide, index, lesson, body, 'invCalculationDeskSlide invContextPhotoSlide', photo);
  }

  function renderRiskRegister(slide, index, lesson) {
    const photo = slide.visual || slide.photo;
    const revealEffects = Boolean(slide.revealEffects);
    const rows = (slide.table || []).slice(1).map((row) => `
      <div class="invRiskItem">
        <span class="invRiskMarker"></span>
        <strong>${escapeHtml(row[0])}</strong>
        <p class="invRiskQuestion">${escapeHtml(row[1])}</p>
        <p class="invRiskEffect${revealEffects ? ' invReveal' : ''}"><span class="invEyebrow">${escapeHtml(slide.effectLabel || 'Likely effect')}</span><span>${escapeHtml(row[2])}</span></p>
      </div>
    `).join('');
    const body = `
      <div>
        <div class="invRiskGrid">${rows}</div>
        ${slide.prompt ? `<div class="invFocusPrompt invReveal"><strong>${escapeHtml(slide.prompt)}</strong> ${escapeHtml(slide.answer || '')}${slide.promptZh ? `<div class="invZhLine" lang="zh-Hans">${escapeHtml(slide.promptZh)}</div>` : ''}</div>` : ''}
      </div>`;
    return slideShell(slide, index, lesson, body, 'invRiskRegisterSlide invContextPhotoSlide', photo);
  }

  function renderCompare(slide, index, lesson) {
    const photo = slide.visual || slide.photo;
    const mode = slide.mode || 'list';
    const renderColumn = (title, titleZh, items = [], visual, visualLabel, visualLabelZh) => `
      <section class="invCompareColumn">
        <h2>${escapeHtml(title || '')}${titleZh ? `<span lang="zh-Hans">${escapeHtml(titleZh)}</span>` : ''}</h2>
        ${keywordVisualMarkup(visual, visualLabel || title, visualLabelZh || titleZh, 'invCompareVisual')}
        <div class="invCompareList">
          ${(items || []).map((item, i) => {
            const normalized = normalizeNumberedItem(item, i);
            const text = mode === 'fillBlanks' && normalized.answer
              ? fillBlankMarkup(normalized.text, normalized.answer)
              : html(normalized.text);
            const zhText = mode === 'fillBlanks' && normalized.answerZh
              ? fillBlankMarkup(normalized.zh, normalized.answerZh)
              : escapeHtml(normalized.zh);
            return `
              <div class="invCompareListItem">
                <span>${escapeHtml(normalized.label)}</span>
                <strong>${text}</strong>
                ${normalized.zh ? `<p class="invZhLine" lang="zh-Hans">${zhText}</p>` : ''}
              </div>`;
          }).join('')}
        </div>
      </section>`;
    const promptClass = slide.promptReveal ? ' invReveal' : '';
    const body = `
      <div class="invCompareTwoColumn">
        <div class="invCompareColumns">
          ${renderColumn(slide.leftTitle, slide.leftTitleZh, slide.left, slide.leftVisual || slide.leftPhoto, slide.leftVisualLabel, slide.leftVisualLabelZh)}
          ${renderColumn(slide.rightTitle, slide.rightTitleZh, slide.right, slide.rightVisual || slide.rightPhoto, slide.rightVisualLabel, slide.rightVisualLabelZh)}
        </div>
        ${slide.prompt ? `<div class="invFocusPrompt${promptClass}"><strong>${escapeHtml(slide.prompt)}</strong>${slide.promptZh ? `<div class="invZhLine" lang="zh-Hans">${escapeHtml(slide.promptZh)}</div>` : ''}</div>` : ''}
      </div>`;
    return slideShell(slide, index, lesson, body, 'invCompareSlide invContextPhotoSlide', photo);
  }

  function renderClassificationTask(slide, index, lesson) {
    const photo = slide.visual || slide.photo;
    const revealAnswers = slide.revealAnswers !== false;
    const compactClass = slide.compact ? ' invCompactClassificationSlide' : '';
    const itemCount = (slide.items || []).length;
    const itemColumnCount = Math.max(1, Math.min(itemCount || 1, 4));
    const categoryCount = (slide.categories || []).length;
    const densityClass = itemCount > 6 || slide.dense ? ' is-dense' : ' is-spacious';
    const categories = (slide.categories || []).map((category, i) => {
      const normalized = typeof category === 'string' ? { title: category } : category || {};
      return `
        <div class="invClassificationCategory">
          <span class="invClassificationCategoryMark">${i + 1}</span>
          <div class="invClassificationCategoryText">
            <strong>${escapeHtml(normalized.title || normalized.label || '')}</strong>
            ${normalized.zhTitle ? `<span lang="zh-Hans">${escapeHtml(normalized.zhTitle)}</span>` : ''}
          </div>
          ${keywordVisualMarkup(normalized.visual || normalized.photo, normalized.visualLabel || normalized.title || normalized.label, normalized.visualLabelZh || normalized.zhTitle, 'invClassificationCategoryVisual')}
          ${normalized.clue ? `<em>${escapeHtml(normalized.clue)}</em>` : ''}
        </div>`;
    }).join('');
    const items = (slide.items || []).map((item, i) => {
      const normalized = normalizeNumberedItem(item, i);
      const answerSlug = String(normalized.answer || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      const answerClass = answerSlug ? ` is-answer-${answerSlug}` : '';
      return `
        <article class="invClassificationItem${answerClass}">
          <div class="invClassificationPrompt">
            <span class="invClassificationLabel">${escapeHtml(normalized.label)}</span>
            <div class="invClassificationStatement">
              <strong>${escapeHtml(normalized.text)}</strong>
              ${normalized.zh ? `<p class="invZhLine" lang="zh-Hans">${escapeHtml(normalized.zh)}</p>` : ''}
            </div>
          </div>
          ${(normalized.answer || normalized.reason) ? `
            <div class="invClassificationResult${answerClass}${revealAnswers ? ' invReveal' : ''}">
              ${normalized.answer ? `<span class="invClassificationBadge">${escapeHtml(normalized.answer)}</span>` : ''}
              ${normalized.answerZh ? `<span class="invZhLine" lang="zh-Hans">${escapeHtml(normalized.answerZh)}</span>` : ''}
              <div class="invClassificationReason">
                ${normalized.reason ? `<p>${escapeHtml(normalized.reason)}</p>` : ''}
                ${normalized.reasonZh ? `<p class="invZhLine" lang="zh-Hans">${escapeHtml(normalized.reasonZh)}</p>` : ''}
              </div>
            </div>` : ''}
        </article>`;
    }).join('');
    const body = `
      <div class="invClassificationTask${slide.compact ? ' is-compact' : ''}${densityClass}" style="--classification-count:${itemCount}; --classification-categories:${categoryCount}; --classification-item-cols:${itemColumnCount}">
        ${slide.prompt ? `<div class="invFocusPrompt"><strong>${escapeHtml(slide.prompt)}</strong>${slide.promptZh ? `<div class="invZhLine" lang="zh-Hans">${escapeHtml(slide.promptZh)}</div>` : ''}</div>` : ''}
        ${categories ? `<div class="invClassificationCategories">${categories}</div>` : ''}
        <div class="invClassificationItems">${items}</div>
        ${slide.sharePrompt ? `<div class="invFocusPrompt invReveal"><strong>${escapeHtml(slide.sharePrompt)}</strong>${slide.sharePromptZh ? `<div class="invZhLine" lang="zh-Hans">${escapeHtml(slide.sharePromptZh)}</div>` : ''}</div>` : ''}
      </div>`;
    return slideShell(slide, index, lesson, body, `invClassificationTaskSlide${compactClass} invContextPhotoSlide`, photo);
  }

  function renderYesNoCheck(slide, index, lesson) {
    const photo = slide.visual || slide.photo;
    const revealAnswers = slide.revealAnswers !== false;
    const compactClass = slide.compact ? ' invCompactCheckSlide' : '';
    const itemCount = (slide.items || []).length;
    const densityClass = itemCount > 4 || slide.dense ? ' is-dense' : ' is-spacious';
    const items = (slide.items || []).map((item, i) => {
      const normalized = normalizeNumberedItem(item, i);
      const answer = yesNoLabel(item?.answer);
      const answerValue = item?.answer === true ? 'yes' : item?.answer === false ? 'no' : '';
      const answerClass = item?.answer === true ? ' is-yes' : item?.answer === false ? ' is-no' : '';
      return `
        <article class="invVoteRow" data-answer="${answerValue}">
          <span class="invVoteNumber" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
          <div class="invVoteStatement">
            <strong>${escapeHtml(normalized.text)}</strong>
            ${normalized.zh ? `<p class="invZhLine" lang="zh-Hans">${escapeHtml(normalized.zh)}</p>` : ''}
          </div>
          <div class="invVoteChoices" role="group" aria-label="Vote yes or no">
            <button class="invVoteChoice" type="button" data-vote="yes" aria-pressed="false"><span>Yes</span><small lang="zh-Hans">是</small></button>
            <button class="invVoteChoice" type="button" data-vote="no" aria-pressed="false"><span>No</span><small lang="zh-Hans">否</small></button>
          </div>
          <div class="invVoteAnswer${revealAnswers ? ' invReveal' : ' is-revealed'}" tabindex="-1" aria-live="polite">
            <span class="invVoteVerdict${answerClass}"><span>${escapeHtml(answer)}</span>${normalized.answerZh ? `<small lang="zh-Hans">${escapeHtml(normalized.answerZh)}</small>` : ''}</span>
            <div class="invVoteReason">
              ${normalized.reason ? `<p>${escapeHtml(normalized.reason)}</p>` : ''}
              ${normalized.reasonZh ? `<p class="invZhLine" lang="zh-Hans">${escapeHtml(normalized.reasonZh)}</p>` : ''}
            </div>
          </div>
        </article>`;
    }).join('');
    const body = `
      <div class="invVoteBoard${slide.compact ? ' is-compact' : ''}${densityClass}" style="--vote-count:${itemCount}">
        ${slide.prompt ? `<div class="invVoteInstruction"><span>Vote first</span><div><strong>${escapeHtml(slide.prompt)}</strong>${slide.promptZh ? `<p class="invZhLine" lang="zh-Hans">${escapeHtml(slide.promptZh)}</p>` : ''}</div></div>` : ''}
        <div class="invVoteRows">${items}</div>
      </div>`;
    return slideShell(slide, index, lesson, body, `invYesNoCheckSlide${compactClass} invContextPhotoSlide`, photo);
  }

  function renderDefinitionRecall(slide, index, lesson) {
    const photo = slide.visual || slide.photo;
    const rows = (slide.definitionItems || []).map((item, i) => `
      <article class="invDefinitionRecallRow">
        <div class="invDefinitionRecallTerm">
          <span>${escapeHtml(item.label || String(i + 1))}</span>
          <strong>${escapeHtml(item.term || '')}</strong>
          ${item.termZh ? `<p class="invZhLine" lang="zh-Hans">${escapeHtml(item.termZh)}</p>` : ''}
        </div>
        <div class="invDefinitionRecallAnswer invReveal">
          <strong>${escapeHtml(item.answer || '')}</strong>
          ${item.answerZh ? `<p class="invZhLine" lang="zh-Hans">${escapeHtml(item.answerZh)}</p>` : ''}
        </div>
      </article>
    `).join('');
    const body = `
      <div class="invDefinitionRecall">
        ${slide.prompt ? `<div class="invFocusPrompt"><strong>${escapeHtml(slide.prompt)}</strong>${slide.promptZh ? `<div class="invZhLine" lang="zh-Hans">${escapeHtml(slide.promptZh)}</div>` : ''}</div>` : ''}
        <div class="invDefinitionRecallRows">${rows}</div>
        ${slide.sharePrompt ? `<div class="invFocusPrompt invReveal"><strong>${escapeHtml(slide.sharePrompt)}</strong>${slide.sharePromptZh ? `<div class="invZhLine" lang="zh-Hans">${escapeHtml(slide.sharePromptZh)}</div>` : ''}</div>` : ''}
      </div>`;
    return slideShell(slide, index, lesson, body, `invPeerTaskSlide invDefinitionRecallSlide${photo ? ' invContextPhotoSlide' : ''}`, photo);
  }

  function renderMissingSentence(slide, index, lesson) {
    const photo = slide.visual || slide.photo;
    const missingIndex = Math.max(0, Number(slide.missingSentenceStep || 2) - 1);
    const steps = (slide.steps || []).map((step, i) => {
      const normalized = normalizeNumberedItem(step, i);
      const answer = normalized.answer || (i === missingIndex ? slide.missingSentenceAnswer : '');
      const text = answer ? fillBlankMarkup(normalized.text || '__________', answer) : html(normalized.text || '');
      return `
        <div class="invStep${i === missingIndex ? ' is-missingSentence' : ''}">
          <span class="invStepNum">${escapeHtml(normalized.label)}</span>
          <strong>${text}</strong>
          ${normalized.zh ? `<span class="invZhLine" lang="zh-Hans">${escapeHtml(normalized.zh)}</span>` : ''}
          ${i === missingIndex && slide.missingSentenceAnswerZh ? `<span class="invZhLine invMissingSentenceAnswerZh" lang="zh-Hans">${escapeHtml(slide.missingSentenceAnswerZh)}</span>` : ''}
        </div>`;
    }).join('');
    const body = `
      <div class="invMissingSentence">
        ${slide.prompt ? `<div class="invFocusPrompt"><strong>${escapeHtml(slide.prompt)}</strong>${slide.promptZh || slide.zhPrompt ? `<div class="invZhLine" lang="zh-Hans">${escapeHtml(slide.promptZh || slide.zhPrompt)}</div>` : ''}</div>` : ''}
        <div class="invFlow invFlow-sequence">${steps}</div>
        ${slide.sharePrompt ? `<div class="invFocusPrompt invReveal"><strong>${escapeHtml(slide.sharePrompt)}</strong>${slide.sharePromptZh ? `<div class="invZhLine" lang="zh-Hans">${escapeHtml(slide.sharePromptZh)}</div>` : ''}</div>` : ''}
      </div>`;
    return slideShell(slide, index, lesson, body, `invPeerTaskSlide invMissingSentenceSlide${photo ? ' invContextPhotoSlide' : ''}`, photo);
  }

  function renderRankingTask(slide, index, lesson) {
    const photo = slide.visual || slide.photo;
    const rawItems = slide.items || slide.cases || [];
    const axis = slide.axis || {};
    const requestedCount = Number(slide.slotCount || slide.rankCount || rawItems.length || 4);
    const itemCount = Number.isFinite(requestedCount) ? Math.max(1, requestedCount) : Math.max(1, rawItems.length || 4);
    const lowLabel = axis.low || slide.lowLabel || 'Lower risk';
    const lowLabelZh = axis.lowZh || slide.lowLabelZh || '';
    const highLabel = axis.high || slide.highLabel || 'Higher risk';
    const highLabelZh = axis.highZh || slide.highLabelZh || '';
    const axisNote = axis.note || slide.axisNote || 'Risk can change with the exact asset';
    const axisNoteZh = axis.noteZh || slide.axisNoteZh || '';
    const showAxisNote = axis.showNote !== false && slide.showAxisNote !== false;
    const normalizeRankingItem = (item, i) => {
      if (typeof item === 'string') return { label: alphaLabel(i), text: item };
      return {
        label: item?.label || alphaLabel(i),
        rank: item?.rank || String(i + 1),
        text: item?.text || item?.title || '',
        zh: item?.zh || item?.textZh || '',
        cue: item?.cue || item?.hint || '',
        cueZh: item?.cueZh || item?.hintZh || '',
        reason: item?.reason || '',
        reasonZh: item?.reasonZh || '',
        visual: item?.visual || item?.photo || null,
        visualLabel: item?.visualLabel || item?.title || item?.text || '',
        visualLabelZh: item?.visualLabelZh || item?.zh || item?.textZh || '',
      };
    };
    const items = rawItems.map(normalizeRankingItem);
    const modelOrder = (slide.modelOrder || slide.answerOrder || []).map(normalizeRankingItem);
    const orderedItems = modelOrder.length ? modelOrder : items;
    const promptText = slide.prompt || slide.task || 'Assign each option a rank, then defend the order.';
    const promptZh = slide.promptZh || slide.taskZh || '';
    const itemRows = items.map((item) => `
      <article class="invPriorityOption${item.visual ? ' has-visual' : ''}">
        <span class="invPriorityOptionLabel">${escapeHtml(item.label)}</span>
        ${keywordVisualMarkup(item.visual, item.visualLabel || item.text, item.visualLabelZh || item.zh, 'invPriorityVisual')}
        <div class="invPriorityOptionText">
          <strong>${escapeHtml(item.text)}</strong>
          ${item.zh ? `<p class="invZhLine" lang="zh-Hans">${escapeHtml(item.zh)}</p>` : ''}
          ${item.cue ? `<p>${escapeHtml(item.cue)}${item.cueZh ? `<span class="invZhLine" lang="zh-Hans">${escapeHtml(item.cueZh)}</span>` : ''}</p>` : ''}
        </div>
        <span class="invPriorityRankBlank" aria-label="Assign a rank from 1 to ${itemCount}"><strong>?</strong><small>1–${itemCount}</small></span>
      </article>`).join('');
    const answerRows = orderedItems.map((item, i) => `
      <article class="invPriorityModelRow">
        <span class="invPriorityModelRank">${escapeHtml(item.rank || String(i + 1))}</span>
        <div class="invPriorityModelQuestion">
          ${item.label ? `<span>${escapeHtml(item.label)}</span>` : ''}
          <div>
            <strong>${escapeHtml(item.text)}</strong>
            ${item.zh ? `<p class="invZhLine" lang="zh-Hans">${escapeHtml(item.zh)}</p>` : ''}
          </div>
        </div>
        ${item.reason || item.reasonZh ? `<div class="invPriorityModelReason"><p>${escapeHtml(item.reason || '')}</p>${item.reasonZh ? `<p class="invZhLine" lang="zh-Hans">${escapeHtml(item.reasonZh)}</p>` : ''}</div>` : ''}
      </article>`).join('');
    const body = `
      <div class="invPriorityTask" style="--priority-count:${itemCount}">
        <div class="invPriorityPrompt">
          <span>Set the order</span>
          <div>
            <strong>${escapeHtml(promptText)}</strong>
            ${promptZh ? `<p class="invZhLine" lang="zh-Hans">${escapeHtml(promptZh)}</p>` : ''}
          </div>
        </div>
        <div class="invPriorityAttempt">
          <div class="invPriorityScale">
            <div class="invPriorityEndpoint is-first">
              <span>1</span>
              <div><strong>${escapeHtml(lowLabel)}</strong>${lowLabelZh ? `<small lang="zh-Hans">${escapeHtml(lowLabelZh)}</small>` : ''}</div>
            </div>
            <div class="invPriorityScaleLine">
              <span aria-hidden="true"></span>
              ${showAxisNote ? `<p class="invPriorityScaleNote">${escapeHtml(axisNote)}${axisNoteZh ? `<small lang="zh-Hans">${escapeHtml(axisNoteZh)}</small>` : ''}</p>` : ''}
            </div>
            <div class="invPriorityEndpoint is-last">
              <span>${itemCount}</span>
              <div><strong>${escapeHtml(highLabel)}</strong>${highLabelZh ? `<small lang="zh-Hans">${escapeHtml(highLabelZh)}</small>` : ''}</div>
            </div>
          </div>
          <div class="invPriorityOptions">${itemRows}</div>
        </div>
        <section class="invPriorityModel invReveal">
          <div class="invPriorityModelHead">
            <strong>${escapeHtml(slide.revealLabel || 'One defensible order')}</strong>
            ${slide.revealLabelZh ? `<span lang="zh-Hans">${escapeHtml(slide.revealLabelZh)}</span>` : ''}
          </div>
          <div class="invPriorityModelRows">${answerRows}</div>
          ${slide.caveat || slide.writtenCheck ? `<div class="invPriorityChecks">
            ${slide.caveat ? `<div><strong>${escapeHtml(slide.caveat)}</strong>${slide.caveatZh ? `<span lang="zh-Hans">${escapeHtml(slide.caveatZh)}</span>` : ''}</div>` : ''}
            ${slide.writtenCheck ? `<div><strong>${escapeHtml(slide.writtenCheck)}</strong>${slide.writtenCheckZh ? `<span lang="zh-Hans">${escapeHtml(slide.writtenCheckZh)}</span>` : ''}</div>` : ''}
          </div>` : ''}
        </section>
      </div>`;
    return slideShell(slide, index, lesson, body, 'invRankingTaskSlide invContextPhotoSlide', photo);
  }

  function renderPeerTask(slide, index, lesson) {
    const photo = slide.visual || slide.photo;
    if (slide.taskType === 'definitionRecall') return renderDefinitionRecall(slide, index, lesson);
    if (slide.taskType === 'missingSentence') return renderMissingSentence(slide, index, lesson);

    const sample = slide.sampleAnswer ? `<div class="invNotePanel invReveal"><strong>Sample answer</strong><p>${html(slide.sampleAnswer)}</p>${slide.sampleAnswerZh ? `<p class="invPromptZh" lang="zh-Hans">${escapeHtml(slide.sampleAnswerZh)}</p>` : ''}</div>` : '';
    const steps = (slide.steps || []).map((step, i) => {
      const stepText = typeof step === 'string' ? step : step.text;
      const stepZh = typeof step === 'string' ? '' : step.zh;
      return `
      <div class="invStep">
        <span class="invStepNum">${i + 1}</span>
        <strong>${html(stepText || '')}</strong>
        ${stepZh ? `<span class="invZhLine" lang="zh-Hans">${escapeHtml(stepZh)}</span>` : ''}
      </div>`;
    }).join('');

    if (slide.taskType === 'sort') {
      const categoryCount = Math.max(1, (slide.categories || []).length);
      const categories = (slide.categories || []).map((category) => `<span class="invSortCategory">${escapeHtml(category)}</span>`).join('');
      const cases = (slide.cases || []).map((item) => `
        <div class="invSortCase">
          <span>${escapeHtml(item.label || '')}</span>
          <strong>${escapeHtml(item.text || '')}</strong>
        </div>
      `).join('');
      const body = `
        <div>
          <div class="invPeerBox invSortPeerBox">
            ${steps ? `<div class="invPeerSteps invSortInstructions">${steps}</div>` : ''}
            <div class="invSortBoard" style="--sort-cols:${categoryCount}">
              <div class="invSortCategories">${categories}</div>
              <div class="invSortCases">${cases}</div>
            </div>
            ${sample}
          </div>
        </div>`;
      return slideShell(slide, index, lesson, body, `invPeerTaskSlide invSortTaskSlide${photo ? ' invContextPhotoSlide' : ''}`, photo);
    }

    const body = `
      <div>
        <div class="invPeerBox">
          <div class="invPeerSteps">${steps}</div>
          ${sample}
        </div>
      </div>`;
    return slideShell(slide, index, lesson, body, `invPeerTaskSlide${photo ? ' invContextPhotoSlide' : ''}`, photo);
  }

  function renderQuiz(slide, index, lesson) {
    const photo = slide.visual || slide.photo;
    const choices = (slide.choices || []).map((choice, i) => `
      <button class="invChoice" type="button" data-choice="${i}">
        <span class="invChoiceBadge">${alphaLabel(i)}</span>
        <span>${escapeHtml(choice)}</span>
      </button>
    `).join('');
    const body = `
      <div>
        <div class="invPanel">
          <div class="invBigQuestion">${html(slide.question || '')}</div>
          ${slide.zh ? `<p class="invPromptZh" lang="zh-Hans">${escapeHtml(slide.zh)}</p>` : ''}
          <div class="invQuizChoices">${choices}</div>
          <div class="invQuizFeedback" hidden>${html(slide.explanation || '')}${slide.explanationZh ? `<p class="invPromptZh" lang="zh-Hans">${escapeHtml(slide.explanationZh)}</p>` : ''}</div>
        </div>
      </div>`;
    return slideShell(slide, index, lesson, body, 'invQuizSlide invContextPhotoSlide', photo);
  }

  function renderExam(slide, index, lesson) {
    const photo = slide.visual || slide.photo;
    const revealKeywords = Boolean(slide.revealKeywords);
    const keywords = (slide.keywords || []).map((keyword, i) => `<span class="invKeyword${revealKeywords ? ' invReveal' : ''}"><span>${String(i + 1).padStart(2, '0')}</span>${escapeHtml(keyword)}</span>`).join('');
    const body = `
      <div>
        <div class="invExamBox">
          ${slide.prompt ? `<h3>${html(slide.prompt)}</h3>` : ''}
          <div class="invExamKeywords">${keywords}</div>
          ${slide.zh ? `<p class="invPromptZh" lang="zh-Hans">${escapeHtml(slide.zh)}</p>` : ''}
        </div>
      </div>`;
    return slideShell(slide, index, lesson, body, 'invExamSlide invContextPhotoSlide', photo);
  }

  function renderModelAnswer(slide, index, lesson) {
    const photo = slide.visual || slide.photo;
    const paragraphsZh = slide.paragraphsZh || [];
    const paragraphs = (slide.paragraphs || []).map((paragraph, i) => `
      <div class="invModelPoint" data-point="${i + 1}">
        <p class="invReveal">${html(paragraph)}</p>
        ${paragraphsZh[i] ? `<p class="invPromptZh invReveal" lang="zh-Hans">${escapeHtml(paragraphsZh[i])}</p>` : ''}
      </div>
    `).join('');
    const body = `
      <div class="invModelFrame">
        <div class="invModelCue">
          <strong>${escapeHtml(slide.cueLabel || 'Answer focus')}</strong>
          ${slide.cueLabelZh ? `<span class="invZhLine" lang="zh-Hans">${escapeHtml(slide.cueLabelZh)}</span>` : ''}
          <span>${escapeHtml(slide.cueText || 'Two developed points: one about profit, one about price and risk.')}</span>
          ${slide.cueTextZh ? `<span class="invZhLine" lang="zh-Hans">${escapeHtml(slide.cueTextZh)}</span>` : ''}
        </div>
        <div class="invModelParas">${paragraphs}</div>
        ${slide.markNote ? `<div class="invMarkNote invReveal">${escapeHtml(slide.markNote)}${slide.markNoteZh ? `<span class="invZhLine" lang="zh-Hans">${escapeHtml(slide.markNoteZh)}</span>` : ''}</div>` : ''}
      </div>`;
    return slideShell(slide, index, lesson, body, 'invModelAnswerSlide invContextPhotoSlide', photo);
  }

  const renderers = {
    priceChart: renderPriceChart,
    hero: renderHero,
    marketBrief: renderHero,
    outcomes: renderOutcomes,
    section: renderSection,
    visualPause: renderVisualPause,
    discussion: renderDiscussion,
    term: renderTerm,
    answer: renderAnswer,
    flow: renderFlow,
    dataSnapshot: renderDataSnapshot,
    conceptTriad: renderConceptTriad,
    visualGrid: renderVisualGrid,
    sourceLens: renderSourceLens,
    quoteMap: renderQuoteMap,
    compare: renderCompare,
    comparisonMatrix: renderComparisonMatrix,
    evidenceSimulator: renderEvidenceSimulator,
    catalystTimeline: renderCatalystTimeline,
    judgementFrame: renderJudgementFrame,
    analystBoard: renderAnalystBoard,
    calculationDesk: renderCalculationDesk,
    riskRegister: renderRiskRegister,
    classificationTask: renderClassificationTask,
    yesNoCheck: renderYesNoCheck,
    rankingTask: renderRankingTask,
    peerTask: renderPeerTask,
    quiz: renderQuiz,
    exam: renderExam,
    modelAnswer: renderModelAnswer,
  };

  function renderSlide(slide, index, lesson) {
    const renderer = renderers[slide.type] || renderDiscussion;
    return renderer(slide, index, lesson);
  }

  function prepareSlides(slides) {
    const sectionTitles = slides
      .filter((slide) => slide.type === 'section')
      .map((slide) => slide.title)
      .filter(Boolean);
    let sectionStep = 0;
    return slides.map((slide) => {
      if (slide.type !== 'section') return slide;
      sectionStep += 1;
      return {
        ...slide,
        _sectionStep: sectionStep,
        _sectionTotal: sectionTitles.length,
        _sectionTitles: sectionTitles,
      };
    });
  }

  function updateEvidenceAction(simulator) {
    const stage = Number(simulator.dataset.stage || 0);
    const factCount = Number(simulator.dataset.factCount || 0);
    const conclusionShown = simulator.dataset.conclusion === 'true';
    const action = simulator.querySelector('[data-action="reveal-evidence"]');
    const progress = simulator.querySelector('.invEvidenceProgress');
    if (progress) progress.textContent = `${stage} / ${factCount} clues`;
    if (!action) return;
    if (stage < factCount) {
      action.textContent = 'Reveal next clue';
      action.disabled = false;
    } else if (!conclusionShown) {
      action.textContent = 'Show class conclusion';
      action.disabled = false;
    } else {
      action.textContent = 'Conclusion shown';
      action.disabled = true;
    }
  }

  function resetEvidenceSimulator(simulator) {
    simulator.dataset.stage = '0';
    simulator.dataset.conclusion = 'false';
    simulator.classList.remove('is-conclusion-visible');
    simulator.querySelectorAll('.invEvidenceFact').forEach((fact) => {
      fact.classList.remove('is-revealed');
      fact.setAttribute('aria-expanded', 'false');
      const value = fact.querySelector('.invEvidenceFactValue');
      const status = fact.querySelector('.invEvidenceFactStatus');
      if (value) value.hidden = true;
      if (status) status.textContent = 'Hidden';
    });
    const conclusion = simulator.querySelector('.invEvidenceConclusion');
    if (conclusion) conclusion.hidden = true;
    updateEvidenceAction(simulator);
  }

  function revealNextEvidence(simulator) {
    const stage = Number(simulator.dataset.stage || 0);
    const facts = [...simulator.querySelectorAll('.invEvidenceFact')];
    if (stage < facts.length) {
      const fact = facts[stage];
      fact.classList.add('is-revealed');
      fact.setAttribute('aria-expanded', 'true');
      const value = fact.querySelector('.invEvidenceFactValue');
      const status = fact.querySelector('.invEvidenceFactStatus');
      if (value) value.hidden = false;
      if (status) status.textContent = 'Revealed';
      simulator.dataset.stage = String(stage + 1);
      updateEvidenceAction(simulator);
      return;
    }

    if (simulator.dataset.conclusion !== 'true') {
      simulator.dataset.conclusion = 'true';
      simulator.classList.add('is-conclusion-visible');
      const conclusion = simulator.querySelector('.invEvidenceConclusion');
      if (conclusion) conclusion.hidden = false;
      updateEvidenceAction(simulator);
    }
  }

  function mountLesson(lesson, target = document.body) {
    if (!lesson) return;
    const params = new URLSearchParams(window.location.search);
    const view = params.get('view');
    if ((view === 'print' || view === 'handout') && lesson.handout) {
      mountHandout(lesson, target);
      return;
    }

    if (view === 'quiz' && INVEST.quiz && typeof INVEST.mountQuiz === 'function') {
      document.body.classList.remove('investment-deck');
      document.body.classList.add('investment-quiz');
      INVEST.mountQuiz(INVEST.quiz, target);
      return;
    }

    document.body.classList.add('investment-deck');
    const slides = prepareSlides(lesson.slides || []);
    const title = lesson.meta?.lessonLabel || lesson.title || 'Investment Analysis';
    target.innerHTML = `
      <main class="invApp">
        <header class="invTopbar">
          <div class="invBrand"><span class="invDot"></span><span>${escapeHtml(lesson.meta?.courseLabel || 'Investment Analysis')}</span></div>
          <nav class="invModeTabs" aria-label="Lesson views">
            <a href="${escapeHtml(location.pathname)}" aria-current="page">Slides</a>
            ${lesson.handout ? `<a href="${escapeHtml(location.pathname)}?view=print">Handout</a>` : ''}
            <a href="${escapeHtml(location.pathname)}?view=quiz">Quiz</a>
            ${lesson.meta?.passportUrl ? `<a href="${escapeHtml(lesson.meta.passportUrl)}">Passport</a>` : ''}
            <a href="../../index.html">Course</a>
            <a href="../../../index.html">Library</a>
          </nav>
          <div class="invControls">
            <button class="invButton" type="button" data-action="notes">Notes</button>
            <button class="invButton" type="button" data-action="overview">Overview</button>
          </div>
        </header>
        <div class="invDeckStage">${slides.map((slide, index) => renderSlide(slide, index, lesson)).join('')}</div>
        <footer class="invFooter">
          <span class="invCounter"></span>
          <div class="invProgressTrack" aria-hidden="true"><div class="invProgressFill"></div></div>
          <span class="invProgressText">${escapeHtml(title)}</span>
        </footer>
        <aside class="invNotes" aria-live="polite"></aside>
        <div class="invOverview" role="dialog" aria-modal="true" aria-label="Slide overview">
          <div class="invOverviewPanel">
            <h2>Slide overview</h2>
            <div class="invOverviewGrid">
              ${slides.map((slide, index) => `<button class="invOverviewItem" type="button" data-jump="${index}"><strong>${index + 1}</strong><br>${escapeHtml(slide.title || slide.type)}</button>`).join('')}
            </div>
          </div>
        </div>
      </main>`;

    const state = {
      index: hashIndex(slides.length),
      slides: [...document.querySelectorAll('.invSlide')],
      notesVisible: false,
    };

    document.querySelectorAll('.invEvidenceSimulator').forEach(resetEvidenceSimulator);

    function activeSlide() {
      return state.slides[state.index];
    }

    function hashIndex(count) {
      const raw = Number(String(window.location.hash || '').replace('#', ''));
      if (Number.isFinite(raw) && raw >= 1 && raw <= count) return raw - 1;
      return 0;
    }

    function updateNotes() {
      const notes = document.querySelector('.invNotes');
      const slide = slides[state.index];
      const body = Array.isArray(slide.notes)
        ? `<ul>${slide.notes.map((note) => `<li>${escapeHtml(note)}</li>`).join('')}</ul>`
        : `<p>${escapeHtml(slide.notes || 'No teacher notes for this slide.')}</p>`;
      notes.innerHTML = `<h2>Teacher notes</h2>${body}`;
      notes.classList.toggle('is-visible', state.notesVisible);
    }

    function showSlide(index, options = {}) {
      state.index = Math.max(0, Math.min(slides.length - 1, index));
      state.slides.forEach((node, i) => {
        node.classList.toggle('is-active', i === state.index);
        if (i !== state.index && !options.keepReveals) {
          node.querySelectorAll('.invReveal.is-revealed').forEach((item) => item.classList.remove('is-revealed'));
          node.querySelectorAll('.blank.is-revealed').forEach((item) => item.classList.remove('is-revealed'));
        }
      });
      document.querySelector('.invCounter').textContent = `${state.index + 1} / ${slides.length}`;
      document.querySelector('.invProgressFill').style.width = `${((state.index + 1) / slides.length) * 100}%`;
      if (window.location.hash !== `#${state.index + 1}`) {
        history.replaceState(null, '', `#${state.index + 1}`);
      }
      updateNotes();
    }

    function revealNext() {
      const next = activeSlide()?.querySelector('.invReveal:not(.is-revealed)');
      if (!next) return false;
      next.classList.add('is-revealed');
      if (next.classList.contains('blank')) next.classList.add('is-revealed');
      return true;
    }

    function advance() {
      if (revealNext()) return;
      showSlide(state.index + 1);
    }

    function retreat() {
      showSlide(state.index - 1, { keepReveals: true });
    }

    function toggleNotes() {
      state.notesVisible = !state.notesVisible;
      updateNotes();
    }

    function toggleOverview(force) {
      const overview = document.querySelector('.invOverview');
      overview.classList.toggle('is-visible', typeof force === 'boolean' ? force : !overview.classList.contains('is-visible'));
    }

    document.querySelector('.invDeckStage').addEventListener('click', (event) => {
      if (event.target.closest(interactiveSelector)) return;
      advance();
    });

    document.querySelector('[data-action="notes"]').addEventListener('click', toggleNotes);
    document.querySelector('[data-action="overview"]').addEventListener('click', () => toggleOverview());
    document.querySelector('.invOverview').addEventListener('click', (event) => {
      const jump = event.target.closest('[data-jump]');
      if (jump) {
        showSlide(Number(jump.dataset.jump));
        toggleOverview(false);
      } else if (event.target.classList.contains('invOverview')) {
        toggleOverview(false);
      }
    });

    document.addEventListener('click', (event) => {
      const showDiscussionAnswer = event.target.closest('[data-action="show-discussion-answer"]');
      if (showDiscussionAnswer) {
        event.preventDefault();
        event.stopPropagation();
        const slideNode = showDiscussionAnswer.closest('.invSlide');
        const answer = slideNode?.querySelector('.invDiscussionAnswer.invReveal:not(.is-revealed)');
        if (answer) answer.classList.add('is-revealed');
        return;
      }

      const closeDiscussionAnswer = event.target.closest('[data-action="close-discussion-answer"]');
      const discussionBackdrop = event.target.classList.contains('invDiscussionAnswerOverlay') ? event.target : null;
      if (closeDiscussionAnswer || discussionBackdrop) {
        event.preventDefault();
        event.stopPropagation();
        const answer = (closeDiscussionAnswer || discussionBackdrop).closest('.invDiscussionAnswer');
        answer?.classList.remove('is-revealed');
        return;
      }

      const evidenceReveal = event.target.closest('[data-action="reveal-evidence"]');
      if (evidenceReveal) {
        event.preventDefault();
        event.stopPropagation();
        const simulator = evidenceReveal.closest('.invEvidenceSimulator');
        if (simulator) revealNextEvidence(simulator);
        return;
      }

      const evidenceReset = event.target.closest('[data-action="reset-evidence"]');
      if (evidenceReset) {
        event.preventDefault();
        event.stopPropagation();
        const simulator = evidenceReset.closest('.invEvidenceSimulator');
        if (simulator) resetEvidenceSimulator(simulator);
        return;
      }

      const voteChoice = event.target.closest('.invVoteChoice');
      if (voteChoice) {
        event.preventDefault();
        event.stopPropagation();
        const row = voteChoice.closest('.invVoteRow');
        const correctVote = row?.dataset.answer;
        const selectedVote = voteChoice.dataset.vote;
        if (!row || !correctVote) return;

        row.classList.remove('is-correct', 'is-wrong');
        row.classList.add(selectedVote === correctVote ? 'is-correct' : 'is-wrong');
        row.querySelectorAll('.invVoteChoice').forEach((button) => {
          const isSelected = button === voteChoice;
          const isCorrect = button.dataset.vote === correctVote;
          button.classList.toggle('is-selected', isSelected);
          button.classList.toggle('is-correct', isCorrect);
          button.classList.toggle('is-wrong', isSelected && !isCorrect);
          button.setAttribute('aria-pressed', String(isSelected));
        });

        const answer = row.querySelector('.invVoteAnswer');
        if (answer) {
          answer.classList.add('is-revealed');
          answer.hidden = false;
          answer.setAttribute('aria-label', `${selectedVote === correctVote ? 'Correct' : 'Incorrect'}. ${answer.textContent.trim()}`);
          answer.focus({ preventScroll: true });
        }
        return;
      }

      const choice = event.target.closest('.invChoice');
      if (!choice) return;
      event.stopPropagation();
      const slideNode = choice.closest('.invSlide');
      const slideData = slides[Number(slideNode.dataset.idx)];
      const selected = Number(choice.dataset.choice);
      slideNode.querySelectorAll('.invChoice').forEach((button) => {
        button.classList.remove('is-selected', 'is-correct', 'is-wrong');
        const choiceIndex = Number(button.dataset.choice);
        if (choiceIndex === slideData.answer) button.classList.add('is-correct');
      });
      choice.classList.add('is-selected');
      if (selected !== slideData.answer) choice.classList.add('is-wrong');
      const feedback = slideNode.querySelector('.invQuizFeedback');
      if (feedback) feedback.hidden = false;
    });

    document.addEventListener('keydown', (event) => {
      if (event.target.closest('input, textarea, select, button, a, [contenteditable="true"]')) return;
      if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
        event.preventDefault();
        advance();
      } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault();
        retreat();
      } else if (event.key.toLowerCase() === 'n') {
        event.preventDefault();
        toggleNotes();
      } else if (event.key.toLowerCase() === 'o') {
        event.preventDefault();
        toggleOverview();
      } else if (event.key === 'Escape') {
        const openDiscussionAnswer = activeSlide()?.querySelector('.invDiscussionAnswerOverlay.is-revealed');
        if (openDiscussionAnswer) {
          event.preventDefault();
          openDiscussionAnswer.classList.remove('is-revealed');
          return;
        }
        toggleOverview(false);
      }
    });

    window.addEventListener('hashchange', () => showSlide(hashIndex(slides.length), { keepReveals: true }));
    showSlide(state.index);
  }

  INVEST.mountLesson = mountLesson;
})();
