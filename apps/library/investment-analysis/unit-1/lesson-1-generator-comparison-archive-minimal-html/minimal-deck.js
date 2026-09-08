(function () {
  "use strict";

  function html(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function cueMarkup(slide) {
    return slide.cue ? `<span class="cue">${html(slide.cue)}</span>` : "";
  }

  function renderWord(word) {
    return `<span>${html(word.text)}${word.zh ? `<small class="wordZh">${html(word.zh)}</small>` : ""}</span>`;
  }

  function renderSlide(slide, index, total) {
    let content = "";
    let modifier = slide.type || "words";

    if (modifier === "cover") {
      content = `
        <div class="minimalSlideInner">
          <p class="coverKicker">${html(slide.kicker)}</p>
          <h1 class="coverTitle">${html(slide.title)}</h1>
          <p class="coverZh">${html(slide.zh)}</p>
        </div>`;
    } else if (modifier === "objectives") {
      content = `<div class="minimalSlideInner"><div class="objectiveGrid">${slide.items.map((item, itemIndex) => `
        <p class="objective"><span class="objectiveNumber">0${itemIndex + 1}</span>${html(item)}</p>`).join("")}</div></div>`;
    } else if (modifier === "image") {
      content = `
        <img class="slideImage${slide.fit === "contain" ? " slideImage--contain" : ""}" src="${html(slide.src)}" alt="${html(slide.alt)}" />
        ${slide.question ? `<p class="imageQuestion">${html(slide.question)}${slide.questionSmall ? `<small class="imageQuestionSmall">${html(slide.questionSmall)}</small>` : ""}</p>` : ""}`;
    } else if (modifier === "work") {
      content = `<div class="minimalSlideInner">
        <p class="workPage">${html(slide.page)}</p>
        <p class="workCases">${html(slide.cases)}</p>
        <p class="workAction">${html(slide.action)}</p>
      </div>`;
    } else {
      content = `<div class="minimalSlideInner"><div class="wordStack">
        ${(slide.words || []).map((word) => `<p class="wordLine">${renderWord(word)}</p>`).join("")}
        ${slide.support ? `<p class="support${slide.formula ? " support--formula" : ""}">${html(slide.support)}</p>` : ""}
      </div></div>`;
    }

    return `<section class="minimalSlide minimalSlide--${html(modifier)}" aria-label="Slide ${index + 1} of ${total}" data-index="${index}">
      ${content}
      ${cueMarkup(slide)}
      <span class="slideCount">${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}</span>
    </section>`;
  }

  function mount(host, lesson) {
    if (!host || !lesson || !Array.isArray(lesson.slides) || lesson.slides.length === 0) return;

    host.innerHTML = `<main class="minimalDeck">
      ${lesson.slides.map((slide, index) => renderSlide(slide, index, lesson.slides.length)).join("")}
      <div class="progress" aria-hidden="true"><div class="progressBar"></div></div>
      <aside class="speakerNotes" aria-live="polite"></aside>
    </main>`;

    const slides = [...host.querySelectorAll(".minimalSlide")];
    const notes = host.querySelector(".speakerNotes");
    const progress = host.querySelector(".progressBar");
    let current = 0;

    function indexFromHash() {
      const candidate = Number.parseInt(window.location.hash.slice(1), 10);
      return Number.isFinite(candidate) ? Math.max(0, Math.min(slides.length - 1, candidate - 1)) : 0;
    }

    function show(index, updateHash) {
      current = Math.max(0, Math.min(slides.length - 1, index));
      slides.forEach((slide, slideIndex) => slide.classList.toggle("isActive", slideIndex === current));
      progress.style.width = `${((current + 1) / slides.length) * 100}%`;
      notes.textContent = lesson.slides[current].notes || "";
      document.title = `${lesson.title} — ${current + 1}/${slides.length}`;
      if (updateHash && window.location.hash !== `#${current + 1}`) {
        history.replaceState(null, "", `#${current + 1}`);
      }
    }

    function next() { show(current + 1, true); }
    function previous() { show(current - 1, true); }

    window.addEventListener("keydown", (event) => {
      const key = event.key.toLowerCase();
      if (["arrowright", "pagedown", " ", "enter"].includes(key)) {
        event.preventDefault();
        next();
      } else if (["arrowleft", "pageup", "backspace"].includes(key)) {
        event.preventDefault();
        previous();
      } else if (key === "home") {
        event.preventDefault();
        show(0, true);
      } else if (key === "end") {
        event.preventDefault();
        show(slides.length - 1, true);
      } else if (key === "n") {
        notes.classList.toggle("isOpen");
      }
    });

    host.addEventListener("click", (event) => {
      if (notes.classList.contains("isOpen")) return;
      if (event.clientX < window.innerWidth * 0.38) previous();
      else next();
    });

    window.addEventListener("hashchange", () => show(indexFromHash(), false));
    show(indexFromHash(), true);
  }

  window.MinimalDeck = { mount };
})();
