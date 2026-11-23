/* Progressive enhancement: without JS, all six complete topics remain visible. */
function initializeCommunityImpact() {
  document.querySelectorAll("[data-community-section]").forEach((section) => {
    const buttons = Array.from(section.querySelectorAll("[data-community-topic]"));
    const panels = Array.from(section.querySelectorAll("[data-community-panel]"));
    if (buttons.length !== 6 || panels.length !== 6) return;
    const select = (id) => {
      buttons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.communityTopic === id)));
      panels.forEach(panel => { panel.hidden = panel.dataset.communityPanel !== id; });
    };
    buttons.forEach(button => button.addEventListener("click", () => select(button.dataset.communityTopic)));
    select(buttons[0].dataset.communityTopic);
    const scene = section.querySelector("[data-community-scene]");
    const scopeButtons = Array.from(section.querySelectorAll("[data-community-scope]"));
    const explanation = section.querySelector("[data-community-scope-explanation]");
    const descriptions = {
      one: "One project can affect a shared electricity network and local water resources. Its effects depend on the actual design and location.",
      cluster: "Multiple proposed facilities may draw on the same regional infrastructure. Their combined timing, demand and effects need separate assessment, not simply the sum of announcements."
    };
    if (scene && explanation && scopeButtons.length === 2) {
      scopeButtons.forEach(button => button.addEventListener("click", () => {
        const scope = button.dataset.communityScope;
        if (!(scope in descriptions)) return;
        scene.dataset.scope = scope;
        scopeButtons.forEach(item => item.setAttribute("aria-pressed", String(item === button)));
        explanation.textContent = descriptions[scope];
      }));
    }
    section.classList.add("community-impact--enhanced");
  });
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initializeCommunityImpact, { once: true });
else initializeCommunityImpact();
