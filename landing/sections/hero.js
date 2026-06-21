import { formatPrice, calcDiscount, buildWhatsAppUrl, buildButtonAttrs, escapeHtml } from "../utils.js";

export function renderHero(config) {
  const { hero, product, buttons, whatsapp, brand } = config;
  if (!hero?.enabled) return "";

  const discount = product.discount || calcDiscount(product.price, product.comparePrice);
  const waUrl = buildWhatsAppUrl(whatsapp);

  const mediaHtml = hero.video?.enabled && hero.video.src
    ? `<video class="hero__media" ${hero.video.autoplay ? "autoplay" : ""} ${hero.video.muted ? "muted" : ""} ${hero.video.loop ? "loop" : ""} playsinline poster="${escapeHtml(hero.video.poster)}">
         <source src="${escapeHtml(hero.video.src)}" type="video/mp4">
       </video>`
    : `<img class="hero__media" src="${escapeHtml(hero.image.src)}" alt="${escapeHtml(hero.image.alt)}" width="800" height="800" loading="eager" fetchpriority="high">`;

  const badges = [
    hero.badge?.shipping?.enabled && hero.badge.shipping.text
      ? `<span class="badge badge--success">${escapeHtml(hero.badge.shipping.text)}</span>` : "",
    hero.badge?.cod?.enabled && hero.badge.cod.text
      ? `<span class="badge badge--info">${escapeHtml(hero.badge.cod.text)}</span>` : ""
  ].filter(Boolean).join("");

  const sizesHtml = hero.showSizes && product.sizes?.length
    ? `<div class="hero__variants">
         <span class="hero__variants-label">${escapeHtml(product.sizesLabel || "")}</span>
         <div class="variant-pills">${product.sizes.map(s =>
           `<button type="button" class="variant-pill" data-size="${escapeHtml(s)}">${escapeHtml(s)}</button>`
         ).join("")}</div>
       </div>` : "";

  const colorsHtml = hero.showColors && product.colors?.length
    ? `<div class="hero__variants">
         <span class="hero__variants-label">${escapeHtml(product.colorsLabel || "")}</span>
         <div class="color-swatches">${product.colors.map(c =>
           `<button type="button" class="color-swatch" style="--swatch:${escapeHtml(c.hex)}" data-color="${escapeHtml(c.name)}" title="${escapeHtml(c.name)}" aria-label="${escapeHtml(c.name)}"></button>`
         ).join("")}</div>
       </div>` : "";

  const priceHtml = hero.showPrice ? `
    <div class="price-block">
      <span class="price-block__current">${formatPrice(product.price, product.currency)}</span>
      ${product.comparePrice ? `<span class="price-block__compare">${formatPrice(product.comparePrice, product.currency)}</span>` : ""}
      ${hero.showDiscount && discount ? `<span class="price-block__discount">-${discount}%</span>` : ""}
    </div>` : "";

  const stockHtml = hero.showStock && product.stock
    ? `<p class="hero__stock">${escapeHtml(hero.stockLabel)} <strong>${product.stock}</strong></p>` : "";

  return `
    <section class="hero section" id="inicio">
      <div class="container hero__grid">
        <div class="hero__media-wrap">${mediaHtml}</div>
        <div class="hero__content">
          ${brand.category ? `<span class="hero__category">${escapeHtml(brand.category)}</span>` : ""}
          ${badges ? `<div class="hero__badges">${badges}</div>` : ""}
          ${hero.title ? `<h1 class="hero__title">${escapeHtml(hero.title)}</h1>` : ""}
          ${hero.subtitle ? `<p class="hero__subtitle">${escapeHtml(hero.subtitle)}</p>` : ""}
          ${priceHtml}
          ${stockHtml}
          ${sizesHtml}
          ${colorsHtml}
          <div class="hero__actions">
            ${buttons.buy.text ? `<a class="btn btn--primary btn--lg" ${buildButtonAttrs(buttons.buy)}>${escapeHtml(buttons.buy.text)}</a>` : ""}
            ${whatsapp.enabled && whatsapp.buttonText ? `<a class="btn btn--whatsapp btn--lg" href="${waUrl}" target="_blank" rel="noopener noreferrer">${escapeHtml(whatsapp.buttonText)}</a>` : ""}
          </div>
        </div>
      </div>
    </section>`;
}
