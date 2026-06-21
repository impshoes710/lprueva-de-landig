import { escapeHtml, renderSectionHeader } from "../utils.js";

export function renderFeatures(config) {
  const { features } = config;
  if (!features?.enabled || !features.items?.length) return "";

  const items = features.items.filter(f => f.title || f.description).map(item => `
    <article class="feature-card">
      ${item.image ? `<div class="feature-card__image"><img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title || "")}" loading="lazy"></div>` : ""}
      <div class="feature-card__body">
        ${item.title ? `<h3 class="feature-card__title">${escapeHtml(item.title)}</h3>` : ""}
        ${item.description ? `<p class="feature-card__text">${escapeHtml(item.description)}</p>` : ""}
      </div>
    </article>
  `).join("");

  if (!items) return "";

  return `
    <section class="features section section--alt">
      <div class="container">
        ${renderSectionHeader(features.title, features.subtitle)}
        <div class="features__grid">${items}</div>
      </div>
    </section>`;
}
