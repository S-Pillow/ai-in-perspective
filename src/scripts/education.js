// AIIP-EDU-01: Keep the learning map usable with native, accessible buttons.
// Hidden is applied to non-selected panels on the server; resources and details
// stay readable without JavaScript when filters are unavailable.
const root = document.querySelector("[data-ed-root]");
if (root) {
  const levelButtons = [...root.querySelectorAll("[data-ed-level]")];
  const levelPanels = [...root.querySelectorAll("[data-ed-panel]")];
  const ids = new Set(levelPanels.map(panel => panel.dataset.edPanel));
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

  function showLevel(id, moveFocus = false, scroll = false) {
    if (!ids.has(id)) return;
    levelButtons.forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.edLevel === id));
    });
    let chosen = null;
    levelPanels.forEach(panel => {
      panel.hidden = panel.dataset.edPanel !== id;
      if (!panel.hidden) chosen = panel;
    });
    if (moveFocus && chosen) chosen.focus({ preventScroll: true });
    if (scroll && chosen) chosen.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start"
    });
  }

  levelButtons.forEach(button => button.addEventListener("click", () => {
    showLevel(button.dataset.edLevel, true, true);
  }));
  root.querySelectorAll("[data-ed-next]").forEach(button => {
    button.addEventListener("click", () => showLevel(button.dataset.edNext, true, true));
  });
  root.querySelectorAll("[data-ed-jump]").forEach(link => {
    link.addEventListener("click", event => {
      if (!ids.has(link.dataset.edJump)) return;
      event.preventDefault();
      showLevel(link.dataset.edJump, true, true);
    });
  });

  const filters = [...root.querySelectorAll("[data-ed-filter]")];
  const resources = [...root.querySelectorAll("[data-ed-resource]")];
  const validFilters = new Set(["all", "beginner", "intermediate", "advanced"]);
  function filterResources(level) {
    if (!validFilters.has(level)) return;
    filters.forEach(button => button.setAttribute(
      "aria-pressed", String(button.dataset.edFilter === level)
    ));
    resources.forEach(card => {
      card.hidden = level !== "all" && card.dataset.edResource !== level;
    });
  }
  filters.forEach(button => button.addEventListener("click", () => {
    filterResources(button.dataset.edFilter);
  }));
}
