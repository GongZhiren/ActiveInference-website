const BIBTEX_TEXT = `@inproceedings{
zhiren2026learning,
title={Learning Human Habits with Rule-Guided Active Inference},
author={GONG ZHIREN and Chao Yang and Wendi Ren and Shuang Li},
booktitle={The Fourteenth International Conference on Learning Representations},
year={2026},
url={https://openreview.net/forum?id=FZXwkBH6s7}
}`;

async function copyTextWithFeedback(button, text, success = "Copied") {
  if (!button) return;
  const original = button.textContent;
  try {
    await navigator.clipboard.writeText(text);
    button.textContent = success;
  } catch (_) {
    button.textContent = "Copy failed";
  }
  setTimeout(() => {
    button.textContent = original;
  }, 1400);
}

function initCitationButtons() {
  const heroBtn = document.getElementById("copyCiteHero");
  const bibBtn = document.getElementById("copyBib");
  const bib = document.getElementById("bib");
  if (heroBtn) {
    heroBtn.addEventListener("click", () => copyTextWithFeedback(heroBtn, BIBTEX_TEXT, "Citation copied"));
  }
  if (bibBtn && bib) {
    bibBtn.addEventListener("click", () => copyTextWithFeedback(bibBtn, bib.innerText, "Copied"));
  }
}

function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const closeBtn = document.getElementById("lightboxClose");
  if (!lightbox || !lightboxImg || !closeBtn) return;

  const imgs = document.querySelectorAll("img[data-full]");
  imgs.forEach((img) => {
    img.addEventListener("click", () => {
      const src = img.getAttribute("data-full");
      if (!src) return;
      lightboxImg.src = src;
      lightbox.classList.add("show");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("show");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
    document.body.style.overflow = "";
  }

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("show")) closeLightbox();
  });
}

function initNavHighlight() {
  const links = Array.from(document.querySelectorAll(".nav nav a[href^='#']"));
  if (!links.length) return;
  const map = new Map();
  links.forEach((link) => {
    const id = link.getAttribute("href")?.slice(1);
    if (!id) return;
    const sec = document.getElementById(id);
    if (sec) map.set(sec, link);
  });
  const sections = Array.from(map.keys());
  if (!sections.length) return;

  function setActive(link) {
    links.forEach((item) => item.classList.remove("active"));
    if (link) link.classList.add("active");
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (!visible.length) return;
      setActive(map.get(visible[0].target));
    },
    { rootMargin: "-30% 0px -55% 0px", threshold: [0.15, 0.35, 0.5] }
  );

  sections.forEach((section) => observer.observe(section));
  setActive(map.get(sections[0]));
}

function initMethodPanels() {
  const toggles = Array.from(document.querySelectorAll(".method-toggle"));
  toggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.target;
      if (!targetId) return;
      const panel = document.getElementById(targetId);
      if (!panel) return;
      const willShow = !panel.classList.contains("show");
      panel.classList.toggle("show", willShow);
      btn.textContent = willShow
        ? btn.textContent.replace("Show", "Hide")
        : btn.textContent.replace("Hide", "Show");
    });
  });
}

function initDatasetTabs() {
  const tabs = Array.from(document.querySelectorAll(".tab-btn"));
  const panels = Array.from(document.querySelectorAll(".tab-panel"));
  if (!tabs.length || !panels.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.panel;
      tabs.forEach((t) => t.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));
      tab.classList.add("active");
      const panel = document.getElementById(target);
      if (panel) panel.classList.add("active");
    });
  });
}

initCitationButtons();
initLightbox();
initNavHighlight();
initMethodPanels();
initDatasetTabs();
