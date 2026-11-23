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
      one: "A data center may draw electricity and water from systems that nearby homes and businesses also rely on. The actual effect depends on where and how it's built.",
      cluster: "When several data centers are planned in the same area, they may all need electricity from the same power grid and water from nearby sources. Looking at one project at a time can miss the bigger picture, especially if several are built around the same time. Plans can also change, so it matters which projects are actually likely to happen."
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
