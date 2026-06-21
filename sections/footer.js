import { escapeHtml } from "../utils.js";

export function renderFooter(config) {
  const { footer, brand } = config;
  if (!footer?.enabled) return "";

  const social = footer.social?.filter(s => s.url).map(s => `
    <a class="footer__social-link" href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(s.platform)}">
      ${s.icon ? `<img src="${escapeHtml(s.icon)}" alt="" width="32" height="32" loading="lazy">` : escapeHtml(s.platform)}
    </a>
  `).join("") || "";

  const payments = footer.paymentMethods?.enabled ? `
    <div class="footer__payments">
      ${footer.paymentMethods.title ? `<p class="footer__payments-title">${escapeHtml(footer.paymentMethods.title)}</p>` : ""}
      <div class="footer__payment-icons">
        ${(footer.paymentMethods.icons || []).map(icon =>
          `<img src="${escapeHtml(icon)}" alt="" loading="lazy" height="32">`
        ).join("")}
      </div>
    </div>` : "";

  const policies = footer.policies?.filter(p => p.text).map(p =>
    `<a class="footer__policy" href="${escapeHtml(p.url || "#")}">${escapeHtml(p.text)}</a>`
  ).join("") || "";

  return `
    <footer class="footer">
      <div class="container footer__inner">
        ${brand.logo ? `<img class="footer__logo" src="${escapeHtml(brand.logo)}" alt="${escapeHtml(brand.name || "")}" loading="lazy">` : ""}
        ${brand.name && !brand.logo ? `<p class="footer__brand">${escapeHtml(brand.name)}</p>` : ""}
        ${social ? `<div class="footer__social">${social}</div>` : ""}
        ${payments}
        ${policies ? `<nav class="footer__policies">${policies}</nav>` : ""}
        ${footer.copyright ? `<p class="footer__copy">${escapeHtml(footer.copyright)}</p>` : ""}
      </div>
    </footer>`;
}
