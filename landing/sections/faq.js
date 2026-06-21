import { escapeHtml, renderSectionHeader } from "../utils.js";

export function renderFaq(config) {
  const { faq } = config;
  if (!faq?.enabled || !faq.items?.length) return "";

  const items = faq.items.filter(f => f.question && f.answer).map((item, i) => `
    <details class="faq-item" ${i === 0 ? "open" : ""}>
      <summary class="faq-item__question">${escapeHtml(item.question)}</summary>
      <div class="faq-item__answer"><p>${escapeHtml(item.answer)}</p></div>
    </details>
  `).join("");

  if (!items) return "";

  return `
    <section class="faq section section--alt">
      <div class="container">
        ${renderSectionHeader(faq.title, faq.subtitle)}
        <div class="faq__list">${items}</div>
      </div>
    </section>`;
}
