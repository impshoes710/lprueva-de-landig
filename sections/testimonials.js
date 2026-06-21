import { escapeHtml, renderSectionHeader, renderStars } from "../utils.js";

export function renderTestimonials(config) {
  const { testimonials } = config;
  if (!testimonials?.enabled || !testimonials.items?.length) return "";

  const cards = testimonials.items.filter(t => t.comment || t.name).map(item => `
    <article class="testimonial-card">
      <div class="testimonial-card__header">
        ${item.photo ? `<img class="testimonial-card__photo" src="${escapeHtml(item.photo)}" alt="${escapeHtml(item.name || "")}" loading="lazy" width="56" height="56">` : ""}
        <div>
          ${item.name ? `<strong class="testimonial-card__name">${escapeHtml(item.name)}</strong>` : ""}
          ${item.city ? `<span class="testimonial-card__city">${escapeHtml(item.city)}</span>` : ""}
        </div>
      </div>
      ${item.rating ? `<div class="testimonial-card__stars">${renderStars(item.rating)}</div>` : ""}
      ${item.comment ? `<blockquote class="testimonial-card__comment">${escapeHtml(item.comment)}</blockquote>` : ""}
    </article>
  `).join("");

  if (!cards) return "";

  return `
    <section class="testimonials section">
      <div class="container">
        ${renderSectionHeader(testimonials.title, testimonials.subtitle)}
        <div class="testimonials__grid">${cards}</div>
      </div>
    </section>`;
}
