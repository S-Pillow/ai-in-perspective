// AIIP-RISKS-01 — Progressive enhancement only. No external calls or telemetry.
const root = document.querySelector("[data-risks-root]");
if (root) {
  const filters = [...root.querySelectorAll("[data-rs-filter]")];
  const cards = [...root.querySelectorAll("[data-rs-risk]")];
  const panels = [...root.querySelectorAll("[data-rs-panel]")];
  const count = root.querySelector("[data-rs-count]");
  const known = new Set(panels.map(panel => panel.dataset.rsPanel));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let selected = cards[0]?.dataset.rsRisk || "";
  let group = "all";

  const showRisk = (id, jump = false) => {
    if (!known.has(id)) return;
    selected = id;
    cards.forEach(card => card.setAttribute("aria-pressed", String(card.dataset.rsRisk === id)));
    let activePanel = null;
    panels.forEach(panel => {
      panel.hidden = panel.dataset.rsPanel !== id;
      if (panel.dataset.rsPanel === id) activePanel = panel;
    });
    if (jump && activePanel) {
      activePanel.focus({ preventScroll: true });
      activePanel.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    }
  };

  const showGroup = (id) => {
    if (id !== "all" && !cards.some(card => card.dataset.rsGroup === id)) return;
    group = id;
    filters.forEach(filter => filter.setAttribute("aria-pressed", String(filter.dataset.rsFilter === group)));
    const visible = [];
    cards.forEach(card => {
      card.hidden = group !== "all" && card.dataset.rsGroup !== group;
      if (!card.hidden) visible.push(card);
    });
    if (count) count.textContent = group === "all"
      ? "Showing all " + visible.length + " risks"
      : "Showing " + visible.length + " risks in " + filters.find(f => f.dataset.rsFilter === group)?.textContent.trim();
    if (!visible.some(card => card.dataset.rsRisk === selected) && visible[0]) showRisk(visible[0].dataset.rsRisk);
  };

  cards.forEach(card => card.addEventListener("click", () => showRisk(card.dataset.rsRisk, true)));
  filters.forEach(filter => filter.addEventListener("click", () => showGroup(filter.dataset.rsFilter)));
  showRisk(selected);
  showGroup("all");
}
