import { escapeHtml, renderSectionHeader } from "../utils.js";

export function renderCounter(config) {
  const { counter, timer } = config;
  if (!counter?.enabled) return "";

  const timerHtml = counter.showTimer && timer?.enabled ? `
    <div class="countdown" data-end="${escapeHtml(timer.endDate)}" data-expired="${escapeHtml(timer.expiredMessage || "")}">
      <div class="countdown__item"><span class="countdown__value" data-unit="days">00</span><span class="countdown__label">${escapeHtml(timer.labels?.days || "")}</span></div>
      <div class="countdown__sep">:</div>
      <div class="countdown__item"><span class="countdown__value" data-unit="hours">00</span><span class="countdown__label">${escapeHtml(timer.labels?.hours || "")}</span></div>
      <div class="countdown__sep">:</div>
      <div class="countdown__item"><span class="countdown__value" data-unit="minutes">00</span><span class="countdown__label">${escapeHtml(timer.labels?.minutes || "")}</span></div>
      <div class="countdown__sep">:</div>
      <div class="countdown__item"><span class="countdown__value" data-unit="seconds">00</span><span class="countdown__label">${escapeHtml(timer.labels?.seconds || "")}</span></div>
    </div>` : "";

  return `
    <section class="counter section">
      <div class="container counter__inner">
        ${renderSectionHeader(counter.title, counter.subtitle, "counter__header")}
        ${timerHtml}
      </div>
    </section>`;
}

export function initCounter() {
  const el = document.querySelector(".countdown");
  if (!el || !el.dataset.end) return;

  const end = new Date(el.dataset.end).getTime();
  if (isNaN(end)) return;

  const units = ["days", "hours", "minutes", "seconds"];

  function tick() {
    const diff = end - Date.now();
    if (diff <= 0) {
      el.innerHTML = `<p class="countdown__expired">${el.dataset.expired}</p>`;
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const values = [d, h, m, s];
    units.forEach((u, i) => {
      const node = el.querySelector(`[data-unit="${u}"]`);
      if (node) node.textContent = String(values[i]).padStart(2, "0");
    });
  }

  tick();
  setInterval(tick, 1000);
}
