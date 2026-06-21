import { escapeHtml, renderSectionHeader } from "../utils.js";

export function renderGuarantees(config) {
  const { guarantees } = config;
  if (!guarantees?.enabled || !guarantees.items?.length) return "";

  const cards = guarantees.items.filter(g => g.title || g.description).map(item => `
    <article class="guarantee-card">
      ${item.icon ? `<div class="guarantee-card__icon"><img src="${escapeHtml(item.icon)}" alt="" width="48" height="48" loading="lazy"></div>` : ""}
      ${item.title ? `<h3 class="guarantee-card__title">${escapeHtml(item.title)}</h3>` : ""}
      ${item.description ? `<p class="guarantee-card__text">${escapeHtml(item.description)}</p>` : ""}
    </article>
  `).join("");

  if (!cards) return "";

  return `
    <section class="guarantees section">
      <div class="container">
        ${renderSectionHeader(guarantees.title, guarantees.subtitle)}
        <div class="guarantees__grid">${cards}</div>
      </div>
    </section>`;
}
