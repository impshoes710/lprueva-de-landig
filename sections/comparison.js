import { escapeHtml, renderSectionHeader } from "../utils.js";

function renderCheck(value) {
  return value
    ? `<span class="comparison__check comparison__check--yes" aria-label="Sí">✓</span>`
    : `<span class="comparison__check comparison__check--no" aria-label="No">✗</span>`;
}

export function renderComparison(config) {
  const { comparison } = config;
  if (!comparison?.enabled || !comparison.features?.length) return "";

  const rows = comparison.features.filter(f => f.name).map(f => `
    <tr>
      <td>${escapeHtml(f.name)}</td>
      <td class="comparison__col-ours">${renderCheck(f.ours)}</td>
      <td class="comparison__col-comp">${renderCheck(f.competitor)}</td>
    </tr>
  `).join("");

  if (!rows) return "";

  return `
    <section class="comparison section section--alt">
      <div class="container">
        ${renderSectionHeader(comparison.title, comparison.subtitle)}
        <div class="comparison__table-wrap">
          <table class="comparison__table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col" class="comparison__col-ours">${escapeHtml(comparison.ourProductLabel)}</th>
                <th scope="col" class="comparison__col-comp">${escapeHtml(comparison.competitorLabel)}</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>
    </section>`;
}
