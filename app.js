/**
 * Landing Page — App principal
 * Orquesta secciones, tema, interacciones y CTA sticky
 */

import { renderHero } from "./sections/hero.js";
import { renderGallery, initGallery } from "./sections/gallery.js";
import { renderBenefits } from "./sections/benefits.js";
import { renderFeatures } from "./sections/features.js";
import { renderDetails } from "./sections/details.js";
import { renderComparison } from "./sections/comparison.js";
import { renderTestimonials } from "./sections/testimonials.js";
import { renderVideoTestimonials } from "./sections/videoTestimonials.js";
import { renderCounter, initCounter } from "./sections/counter.js";
import { renderOffer } from "./sections/offer.js";
import { renderFaq } from "./sections/faq.js";
import { renderGuarantees } from "./sections/guarantees.js";
import { renderCta } from "./sections/cta.js";
import { renderFooter } from "./sections/footer.js";
import { formatPrice, buildWhatsAppUrl, buildButtonAttrs, escapeHtml } from "./utils.js";

const SECTION_RENDERERS = {
  hero: renderHero,
  benefits: renderBenefits,
  gallery: renderGallery,
  features: renderFeatures,
  details: renderDetails,
  comparison: renderComparison,
  testimonials: renderTestimonials,
  videoTestimonials: renderVideoTestimonials,
  counter: renderCounter,
  offer: renderOffer,
  faq: renderFaq,
  guarantees: renderGuarantees,
  cta: renderCta,
  footer: renderFooter
};

function applyTheme(config) {
  const { theme } = config;
  const root = document.documentElement;
  const c = theme.colors;

  root.style.setProperty("--font-family", `'${theme.fontFamily}', system-ui, -apple-system, sans-serif`);
  root.style.setProperty("--radius", theme.borderRadius);
  root.style.setProperty("--max-width", theme.maxWidth);

  Object.entries(c).forEach(([key, val]) => {
    root.style.setProperty(`--color-${camelToKebab(key)}`, val);
  });

  const fontLink = document.getElementById("theme-font");
  if (fontLink && theme.fontUrl) fontLink.href = theme.fontUrl;

  document.documentElement.lang = config.meta?.lang || "es";
}

function applyMeta(config) {
  const { meta, brand, product } = config;
  const title = meta.title || [product.name, brand.name].filter(Boolean).join(" | ");
  document.title = title;

  setMeta('meta[name="description"]', meta.description);
  setMeta('meta[name="keywords"]', meta.keywords);
  setMeta('meta[property="og:title"]', title);
  setMeta('meta[property="og:description"]', meta.description);
  setMeta('meta[property="og:image"]', meta.ogImage);

  const favicon = document.getElementById("favicon");
  if (favicon && meta.favicon) favicon.href = meta.favicon;
}

function setMeta(selector, content) {
  const el = document.querySelector(selector);
  if (el && content) el.setAttribute("content", content);
}

function camelToKebab(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

function renderPage(config) {
  const order = config.sectionOrder || Object.keys(SECTION_RENDERERS);
  const app = document.getElementById("app");
  app.innerHTML = order
    .map(key => SECTION_RENDERERS[key]?.(config) || "")
    .join("");
}

function renderStickyCta(config) {
  const { stickyCta, product, buttons, whatsapp } = config;
  const el = document.getElementById("sticky-cta");
  if (!stickyCta?.enabled || !el) return;

  el.innerHTML = `
    <div class="sticky-cta__inner">
      ${stickyCta.showPrice && product.price ? `<span class="sticky-cta__price">${formatPrice(product.price, product.currency)}</span>` : ""}
      <div class="sticky-cta__actions">
        ${buttons.buy.text ? `<a class="btn btn--accent btn--sm" ${buildButtonAttrs(buttons.buy)}>${escapeHtml(buttons.buy.text)}</a>` : ""}
        ${whatsapp.enabled && whatsapp.buttonText ? `<a class="btn btn--whatsapp btn--sm" href="${buildWhatsAppUrl(whatsapp)}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">💬</a>` : ""}
      </div>
    </div>`;

  const threshold = stickyCta.showOnScroll || 400;
  let visible = false;

  function onScroll() {
    const show = window.scrollY > threshold;
    if (show !== visible) {
      visible = show;
      el.classList.toggle("is-visible", show);
      el.setAttribute("aria-hidden", String(!show));
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function initVariantSelectors() {
  document.querySelectorAll(".variant-pill").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.closest(".variant-pills")?.querySelectorAll(".variant-pill").forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
    });
  });

  document.querySelectorAll(".color-swatch").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.closest(".color-swatches")?.querySelectorAll(".color-swatch").forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
    });
  });
}

function initLightbox(config) {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox || !config.gallery?.enableZoom) return;

  const content = lightbox.querySelector(".lightbox__content");
  const items = config.gallery.items || [];
  let current = 0;

  function show(index) {
    current = (index + items.length) % items.length;
    const item = items[current];
    if (!item) return;

    if (item.type === "video") {
      content.innerHTML = item.embed
        ? `<iframe src="${escapeHtml(item.src)}" allowfullscreen></iframe>`
        : `<video controls autoplay playsinline src="${escapeHtml(item.src)}"></video>`;
    } else {
      content.innerHTML = `<img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt || "")}">`;
    }
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function close() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    content.innerHTML = "";
    document.body.style.overflow = "";
  }

  lightbox.querySelector(".lightbox__close")?.addEventListener("click", close);
  lightbox.querySelector(".lightbox__nav--prev")?.addEventListener("click", () => show(current - 1));
  lightbox.querySelector(".lightbox__nav--next")?.addEventListener("click", () => show(current + 1));
  lightbox.addEventListener("click", e => { if (e.target === lightbox) close(); });
  document.addEventListener("keydown", e => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });

  window.LandingApp = { ...(window.LandingApp || {}), openLightbox: show, closeLightbox: close };
}

function initScrollAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  document.querySelectorAll(".section, .offer-banner").forEach(el => {
    el.classList.add("animate-in");
    observer.observe(el);
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

function init() {
  const config = window.LANDING_CONFIG;
  if (!config) {
    console.error("LANDING_CONFIG no encontrado. Verifica que config.js esté cargado.");
    return;
  }

  applyTheme(config);
  applyMeta(config);
  renderPage(config);
  renderStickyCta(config);
  initGallery();
  initCounter();
  initVariantSelectors();
  initLightbox(config);
  initScrollAnimations();
  initSmoothScroll();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
