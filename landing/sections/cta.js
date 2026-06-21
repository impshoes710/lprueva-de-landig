import { formatPrice, calcDiscount, buildButtonAttrs, escapeHtml } from "../utils.js";

export function renderCta(config) {
  const { cta, product, buttons } = config;
  if (!cta?.enabled) return "";

  const discount = product.discount || calcDiscount(product.price, product.comparePrice);

  const priceHtml = cta.showPrice && product.price ? `
    <div class="price-block price-block--light">
      <span class="price-block__current">${formatPrice(product.price, product.currency)}</span>
      ${product.comparePrice ? `<span class="price-block__compare">${formatPrice(product.comparePrice, product.currency)}</span>` : ""}
      ${discount ? `<span class="price-block__discount">-${discount}%</span>` : ""}
    </div>` : "";

  return `
    <section class="cta-final section" id="${escapeHtml(cta.id || "comprar")}" style="--cta-overlay:${cta.overlay ?? 0.55}">
      <div class="cta-final__bg">
        <img src="${escapeHtml(cta.backgroundImage)}" alt="" loading="lazy">
      </div>
      <div class="container cta-final__content">
        ${cta.title ? `<h2 class="cta-final__title">${escapeHtml(cta.title)}</h2>` : ""}
        ${cta.subtitle ? `<p class="cta-final__subtitle">${escapeHtml(cta.subtitle)}</p>` : ""}
        ${priceHtml}
        ${buttons.buy.text ? `<a class="btn btn--accent btn--lg" ${buildButtonAttrs(buttons.buy)}>${escapeHtml(buttons.buy.text)}</a>` : ""}
      </div>
    </section>`;
}
