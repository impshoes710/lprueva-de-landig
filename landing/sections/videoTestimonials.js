import { escapeHtml, renderSectionHeader } from "../utils.js";

export function renderVideoTestimonials(config) {
  const { videoTestimonials } = config;
  if (!videoTestimonials?.enabled || !videoTestimonials.items?.length) return "";

  const cards = videoTestimonials.items.filter(v => v.src || v.poster).map(item => {
    const isEmbed = item.type === "embed";
    const media = isEmbed
      ? `<iframe src="${escapeHtml(item.src)}" title="${escapeHtml(item.name || "")}" allowfullscreen loading="lazy"></iframe>`
      : `<video controls playsinline poster="${escapeHtml(item.poster || "")}" preload="none">
           <source src="${escapeHtml(item.src)}" type="video/mp4">
         </video>`;

    return `
      <article class="video-testimonial">
        <div class="video-testimonial__media">${media}</div>
        <div class="video-testimonial__info">
          ${item.name ? `<strong>${escapeHtml(item.name)}</strong>` : ""}
          ${item.city ? `<span>${escapeHtml(item.city)}</span>` : ""}
        </div>
      </article>`;
  }).join("");

  if (!cards) return "";

  return `
    <section class="video-testimonials section section--alt">
      <div class="container">
        ${renderSectionHeader(videoTestimonials.title, videoTestimonials.subtitle)}
        <div class="video-testimonials__grid">${cards}</div>
      </div>
    </section>`;
}
