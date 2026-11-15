// Benefits visual study: progressive enhancement, no external services or tracking.
const root = document.querySelector("[data-benefits-root]");
if (root) {
  const cards = [...root.querySelectorAll("[data-benefits-card]")];
  const panels = [...root.querySelectorAll("[data-benefits-panel]")];
  const available = new Set(panels.map(panel => panel.dataset.benefitsPanel));

  const show = (topic) => {
    if (!available.has(topic)) return;
    root.dataset.topic = topic;
    cards.forEach(card => card.setAttribute("aria-pressed", String(card.dataset.benefitsCard === topic)));
    panels.forEach(panel => { panel.hidden = panel.dataset.benefitsPanel !== topic; });
  };
  cards.forEach(card => card.addEventListener("click", () => show(card.dataset.benefitsCard)));
  show(root.dataset.topic || "healthcare");

  const motionButton = root.querySelector("[data-benefits-motion]");
  let motionEnabled = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const updateMotion = () => {
    root.dataset.motion = motionEnabled ? "on" : "off";
    if (motionButton) motionButton.textContent = motionEnabled ? "Pause ambient motion" : "Play ambient motion";
  };
  motionButton?.addEventListener("click", () => {
    motionEnabled = !motionEnabled;
    updateMotion();
  });
  updateMotion();
}
