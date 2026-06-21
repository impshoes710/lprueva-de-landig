import { escapeHtml } from "../utils.js";

export function renderOffer(config) {
  const { offer } = config;
  if (!offer?.enabled) return "";

  const style = [
    offer.backgroundColor ? `--offer-bg:${offer.backgroundColor}` : "",
    offer.textColor ? `--offer-text:${offer.textColor}` : ""
  ].filter(Boolean).join(";");

  return `
    <section class="offer-banner section--compact" ${style ? `style="${style}"` : ""}>
      <div class="container offer-banner__inner">
        ${offer.highlight ? `<span class="offer-banner__highlight">${escapeHtml(offer.highlight)}</span>` : ""}
        ${offer.title ? `<h2 class="offer-banner__title">${escapeHtml(offer.title)}</h2>` : ""}
        ${offer.subtitle ? `<p class="offer-banner__subtitle">${escapeHtml(offer.subtitle)}</p>` : ""}
      </div>
    </section>`;
}
