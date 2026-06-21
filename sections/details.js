import { escapeHtml, renderSectionHeader, buildButtonAttrs } from "../utils.js";

export function renderDetails(config) {
  const { details } = config;
  if (!details?.enabled || !details.blocks?.length) return "";

  const blocks = details.blocks.filter(b => b.title || b.description || b.image?.src).map(block => {
    const reverse = block.imagePosition === "right";
    return `
      <div class="detail-block${reverse ? " detail-block--reverse" : ""}">
        ${block.image?.src ? `
          <div class="detail-block__media">
            <img src="${escapeHtml(block.image.src)}" alt="${escapeHtml(block.image.alt || "")}" loading="lazy">
          </div>` : ""}
        <div class="detail-block__content">
          ${block.title ? `<h3 class="detail-block__title">${escapeHtml(block.title)}</h3>` : ""}
          ${block.description ? `<p class="detail-block__text">${escapeHtml(block.description)}</p>` : ""}
          ${block.button?.text ? `<a class="btn btn--primary" ${buildButtonAttrs(block.button)}>${escapeHtml(block.button.text)}</a>` : ""}
        </div>
      </div>`;
  }).join("");

  if (!blocks) return "";

  return `
    <section class="details section">
      <div class="container">
        ${renderSectionHeader(details.title, details.subtitle)}
        <div class="details__stack">${blocks}</div>
      </div>
    </section>`;
}
