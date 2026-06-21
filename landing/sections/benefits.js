import { escapeHtml, renderSectionHeader } from "../utils.js";

export function renderBenefits(config) {
  const { benefits } = config;
  if (!benefits?.enabled || !benefits.items?.length) return "";

  const cards = benefits.items.filter(b => b.title || b.description).map(item => `
    <article class="benefit-card">
      ${item.icon ? `<div class="benefit-card__icon"><img src="${escapeHtml(item.icon)}" alt="" width="48" height="48" loading="lazy"></div>` : ""}
      ${item.title ? `<h3 class="benefit-card__title">${escapeHtml(item.title)}</h3>` : ""}
      ${item.description ? `<p class="benefit-card__text">${escapeHtml(item.description)}</p>` : ""}
    </article>
  `).join("");

  if (!cards) return "";

  return `
    <section class="benefits section">
      <div class="container">
        ${renderSectionHeader(benefits.title, benefits.subtitle)}
        <div class="benefits__grid">${cards}</div>
      </div>
    </section>`;
}
