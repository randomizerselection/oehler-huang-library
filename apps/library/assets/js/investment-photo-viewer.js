(function () {
  const data = window.INVEST_PHOTO_ARCHIVE_DATA;
  const photos = window.INVEST?.photos || {};

  if (!data) return;

  const categoryById = new Map(data.categories.map((category) => [category.id, category]));
  const archivedKeys = new Set(data.entries.map((entry) => entry.key));
  const missingEntries = data.entries.filter((entry) => !photos[entry.key]);
  const uncategorisedKeys = Object.keys(photos).filter((key) => !archivedKeys.has(key));

  const state = {
    category: "all",
    lesson: "all",
    use: "all",
    query: ""
  };

  const controls = {
    categoryList: document.querySelector("[data-photo-category-list]"),
    lessonSelect: document.querySelector("[data-photo-lesson-select]"),
    useSelect: document.querySelector("[data-photo-use-select]"),
    searchInput: document.querySelector("[data-photo-search]"),
    resetButton: document.querySelector("[data-photo-reset]"),
    stats: document.querySelector("[data-photo-stats]"),
    grid: document.querySelector("[data-photo-grid]"),
    empty: document.querySelector("[data-photo-empty]")
  };

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function humaniseKey(key) {
    return key
      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  function entryLabel(entry) {
    return entry.label || photos[entry.key]?.caption || humaniseKey(entry.key);
  }

  function entrySearchText(entry) {
    const photo = photos[entry.key] || {};
    const category = categoryById.get(entry.category);
    return [
      entry.key,
      entryLabel(entry),
      entry.lesson,
      entry.deckHint,
      category?.label,
      category?.description,
      photo.alt,
      photo.caption,
      photo.credit,
      photo.source,
      ...(entry.tags || []),
      ...(entry.uses || []).map((use) => data.useCases[use] || use)
    ].join(" ").toLowerCase();
  }

  function getLessons() {
    return [...new Set(data.entries.map((entry) => entry.lesson).filter(Boolean))].sort((a, b) => a.localeCompare(b));
  }

  function renderCategoryButtons() {
    if (!controls.categoryList) return;

    const counts = data.categories.map((category) => ({
      ...category,
      count: data.entries.filter((entry) => entry.category === category.id).length
    }));

    controls.categoryList.innerHTML = [
      `<button class="photoArchiveFilter is-active" type="button" data-category-filter="all">All <span>${data.entries.length}</span></button>`,
      ...counts.map((category) => `
        <button class="photoArchiveFilter" type="button" data-category-filter="${escapeHtml(category.id)}">
          ${escapeHtml(category.label)}
          <span>${category.count}</span>
        </button>
      `)
    ].join("");

    controls.categoryList.addEventListener("click", (event) => {
      const button = event.target.closest("[data-category-filter]");
      if (!button) return;
      state.category = button.dataset.categoryFilter;
      controls.categoryList.querySelectorAll("[data-category-filter]").forEach((item) => {
        item.classList.toggle("is-active", item.dataset.categoryFilter === state.category);
      });
      render();
    });
  }

  function renderSelectOptions() {
    if (controls.lessonSelect) {
      controls.lessonSelect.innerHTML = [
        `<option value="all">All lessons</option>`,
        ...getLessons().map((lesson) => `<option value="${escapeHtml(lesson)}">${escapeHtml(lesson)}</option>`)
      ].join("");
      controls.lessonSelect.addEventListener("change", () => {
        state.lesson = controls.lessonSelect.value;
        render();
      });
    }

    if (controls.useSelect) {
      controls.useSelect.innerHTML = [
        `<option value="all">All slide uses</option>`,
        ...Object.entries(data.useCases).map(([key, label]) => `<option value="${escapeHtml(key)}">${escapeHtml(label)}</option>`)
      ].join("");
      controls.useSelect.addEventListener("change", () => {
        state.use = controls.useSelect.value;
        render();
      });
    }
  }

  function filteredEntries() {
    const query = state.query.trim().toLowerCase();

    return data.entries
      .filter((entry) => state.category === "all" || entry.category === state.category)
      .filter((entry) => state.lesson === "all" || entry.lesson === state.lesson)
      .filter((entry) => state.use === "all" || (entry.uses || []).includes(state.use))
      .filter((entry) => !query || entrySearchText(entry).includes(query));
  }

  function renderStats(entries) {
    if (!controls.stats) return;

    const missing = missingEntries.length;
    const uncategorised = uncategorisedKeys.length;
    controls.stats.innerHTML = `
      <strong>${entries.length}</strong> shown
      <span>${data.entries.length} archived</span>
      <span>${data.categories.length} categories</span>
      <span>${missing} missing keys</span>
      <span>${uncategorised} uncategorised catalogue keys</span>
    `;
  }

  function renderCard(entry) {
    const photo = photos[entry.key] || {};
    const category = categoryById.get(entry.category) || {};
    const useLabels = (entry.uses || []).map((use) => data.useCases[use] || use);
    const generatorKey = `window.INVEST.photos?.${entry.key}`;
    const source = photo.source && /^https?:/i.test(photo.source)
      ? `<a href="${escapeHtml(photo.source)}" target="_blank" rel="noopener">Source</a>`
      : `<span>${escapeHtml(photo.source || "Local source")}</span>`;

    return `
      <article class="photoArchiveCard" data-photo-card data-key="${escapeHtml(entry.key)}">
        <div class="photoArchiveImage">
          ${photo.src ? `<img src="${escapeHtml(photo.src)}" alt="${escapeHtml(photo.alt || "")}" loading="lazy" />` : `<div class="photoArchiveMissing">Missing image key</div>`}
        </div>
        <div class="photoArchiveBody">
          <div class="photoArchiveTopline">
            <span>${escapeHtml(category.label || entry.category)}</span>
            <span>${escapeHtml(entry.lesson)}</span>
          </div>
          <h2>${escapeHtml(entryLabel(entry))}</h2>
          <p>${escapeHtml(photo.alt || entry.deckHint)}</p>
          <div class="photoArchiveChips" aria-label="Photo tags">
            ${(entry.tags || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
          </div>
          <div class="photoArchiveUses" aria-label="Suggested slide uses">
            ${useLabels.map((label) => `<span>${escapeHtml(label)}</span>`).join("")}
          </div>
          <p class="photoArchiveHint">${escapeHtml(entry.deckHint)}</p>
          <dl class="photoArchiveMeta">
            <div><dt>Key</dt><dd>${escapeHtml(entry.key)}</dd></div>
            <div><dt>Credit</dt><dd>${escapeHtml(photo.credit || "Local classroom asset")}</dd></div>
            <div><dt>Source</dt><dd>${source}</dd></div>
          </dl>
          <div class="photoArchiveCode">
            <code>${escapeHtml(generatorKey)}</code>
            <button type="button" data-copy-key="${escapeHtml(generatorKey)}">Copy</button>
          </div>
        </div>
      </article>
    `;
  }

  function render() {
    const entries = filteredEntries();
    renderStats(entries);

    if (controls.empty) {
      controls.empty.hidden = entries.length > 0;
    }

    if (controls.grid) {
      controls.grid.innerHTML = entries.map(renderCard).join("");
    }
  }

  if (controls.searchInput) {
    controls.searchInput.addEventListener("input", () => {
      state.query = controls.searchInput.value;
      render();
    });
  }

  if (controls.resetButton) {
    controls.resetButton.addEventListener("click", () => {
      state.category = "all";
      state.lesson = "all";
      state.use = "all";
      state.query = "";
      if (controls.searchInput) controls.searchInput.value = "";
      if (controls.lessonSelect) controls.lessonSelect.value = "all";
      if (controls.useSelect) controls.useSelect.value = "all";
      controls.categoryList?.querySelectorAll("[data-category-filter]").forEach((item) => {
        item.classList.toggle("is-active", item.dataset.categoryFilter === "all");
      });
      render();
    });
  }

  document.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-copy-key]");
    if (!button) return;

    const value = button.dataset.copyKey;
    try {
      await navigator.clipboard.writeText(value);
      button.textContent = "Copied";
      window.setTimeout(() => {
        button.textContent = "Copy";
      }, 1400);
    } catch {
      button.textContent = "Select";
      button.previousElementSibling?.focus?.();
    }
  });

  renderCategoryButtons();
  renderSelectOptions();
  render();
})();
