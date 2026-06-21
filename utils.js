export function escapeHtml(str) {
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function formatPrice(price, currency = "$") {
  if (!price && price !== 0) return "";
  const formatted = Number(price).toLocaleString("es", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  return `${currency}${formatted}`;
}

export function calcDiscount(price, comparePrice) {
  if (!comparePrice || !price || comparePrice <= price) return 0;
  return Math.round(((comparePrice - price) / comparePrice) * 100);
}

export function buildWhatsAppUrl(whatsapp) {
  if (!whatsapp?.phone) return "#";
  const phone = whatsapp.phone.replace(/\D/g, "");
  const msg = encodeURIComponent(whatsapp.message || "");
  return `https://wa.me/${phone}?text=${msg}`;
}

export function buildButtonAttrs(btn) {
  if (!btn) return "";
  const url = btn.url || "#";
  const target = btn.openInNewTab ? ' target="_blank" rel="noopener noreferrer"' : "";
  return `href="${escapeHtml(url)}"${target}`;
}

export function renderStars(rating) {
  const r = Math.min(5, Math.max(0, Math.round(rating)));
  return Array.from({ length: 5 }, (_, i) =>
    `<span class="star${i < r ? " star--filled" : ""}">★</span>`
  ).join("");
}

export function renderSectionHeader(title, subtitle, className = "section-header") {
  if (!title && !subtitle) return "";
  return `
    <header class="${className}">
      ${title ? `<h2 class="${className}__title">${escapeHtml(title)}</h2>` : ""}
      ${subtitle ? `<p class="${className}__subtitle">${escapeHtml(subtitle)}</p>` : ""}
    </header>`;
}
