import { escapeHtml, renderSectionHeader } from "../utils.js";

export function renderGallery(config) {
  const { gallery } = config;
  if (!gallery?.enabled || !gallery.items?.length) return "";

  const slides = gallery.items.map((item, i) => {
    if (item.type === "video") {
      const isEmbed = item.embed || item.type === "embed";
      const content = isEmbed
        ? `<iframe src="${escapeHtml(item.src)}" title="${escapeHtml(item.alt || "")}" allowfullscreen loading="lazy"></iframe>`
        : `<video controls playsinline poster="${escapeHtml(item.poster || "")}" preload="metadata">
             <source src="${escapeHtml(item.src)}" type="video/mp4">
           </video>`;
      return `<div class="gallery__slide${i === 0 ? " is-active" : ""}" data-index="${i}" data-type="video">
                <div class="gallery__media">${content}</div>
              </div>`;
    }
    return `<div class="gallery__slide${i === 0 ? " is-active" : ""}" data-index="${i}" data-type="image">
              <img class="gallery__img" src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt || "")}" loading="${i === 0 ? "eager" : "lazy"}" data-zoom="${gallery.enableZoom}">
            </div>`;
  }).join("");

  const thumbs = gallery.enableThumbnails ? `
    <div class="gallery__thumbs">${gallery.items.map((item, i) => {
      const thumb = item.thumbnail || item.poster || item.src;
      return `<button type="button" class="gallery__thumb${i === 0 ? " is-active" : ""}" data-index="${i}" aria-label="Ver imagen ${i + 1}">
                <img src="${escapeHtml(thumb)}" alt="" loading="lazy">
                ${item.type === "video" ? `<span class="gallery__thumb-play">▶</span>` : ""}
              </button>`;
    }).join("")}</div>` : "";

  return `
    <section class="gallery section section--alt" id="${escapeHtml(gallery.id || "galeria")}">
      <div class="container">
        ${renderSectionHeader(gallery.title, gallery.subtitle)}
        <div class="gallery__wrapper" data-autoplay="${gallery.autoplay}" data-interval="${gallery.autoplayInterval || 5000}">
          <button type="button" class="gallery__nav gallery__nav--prev" aria-label="Anterior">&#8249;</button>
          <div class="gallery__viewport">
            <div class="gallery__track">${slides}</div>
          </div>
          <button type="button" class="gallery__nav gallery__nav--next" aria-label="Siguiente">&#8250;</button>
          <div class="gallery__dots">${gallery.items.map((_, i) =>
            `<button type="button" class="gallery__dot${i === 0 ? " is-active" : ""}" data-index="${i}" aria-label="Slide ${i + 1}"></button>`
          ).join("")}</div>
        </div>
        ${thumbs}
      </div>
    </section>`;
}

export function initGallery() {
  const wrapper = document.querySelector(".gallery__wrapper");
  if (!wrapper) return;

  const slides = [...wrapper.querySelectorAll(".gallery__slide")];
  const dots = [...document.querySelectorAll(".gallery__dot")];
  const thumbs = [...document.querySelectorAll(".gallery__thumb")];
  let current = 0;
  let autoplayTimer;

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle("is-active", i === current));
    dots.forEach((d, i) => d.classList.toggle("is-active", i === current));
    thumbs.forEach((t, i) => t.classList.toggle("is-active", i === current));
  }

  wrapper.querySelector(".gallery__nav--prev")?.addEventListener("click", () => goTo(current - 1));
  wrapper.querySelector(".gallery__nav--next")?.addEventListener("click", () => goTo(current + 1));
  dots.forEach(d => d.addEventListener("click", () => goTo(+d.dataset.index)));
  thumbs.forEach(t => t.addEventListener("click", () => goTo(+t.dataset.index)));

  if (wrapper.dataset.autoplay === "true") {
    const interval = +wrapper.dataset.interval || 5000;
    autoplayTimer = setInterval(() => goTo(current + 1), interval);
    wrapper.addEventListener("mouseenter", () => clearInterval(autoplayTimer));
  }

  document.querySelectorAll(".gallery__img[data-zoom='true']").forEach(img => {
    img.addEventListener("click", () => {
      window.LandingApp?.openLightbox?.(current);
    });
  });

  let touchStartX = 0;
  wrapper.addEventListener("touchstart", e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  wrapper.addEventListener("touchend", e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
  }, { passive: true });
}
