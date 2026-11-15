// AIIP-HISTORY-01: Accessible disclosure of one era and everyday example at a time.
const root = document.querySelector("[data-history-root]");
if (root) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const groups = [
    { buttons: [...root.querySelectorAll("[data-hi-era]")],
      panels: [...root.querySelectorAll("[data-hi-era-panel]")],
      key: "hiEra" },
    { buttons: [...root.querySelectorAll("[data-hi-everyday]")],
      panels: [...root.querySelectorAll("[data-hi-everyday-panel]")],
      key: "hiEveryday" }
  ];
  groups.forEach(group => {
    const valid = new Set(group.panels.map(p => p.dataset[group.key + "Panel"]));
    function activate(id, moveFocus = false) {
      if (!valid.has(id)) return;
      group.buttons.forEach(b => b.setAttribute("aria-pressed", String(b.dataset[group.key] === id)));
      let active = null;
      group.panels.forEach(p => {
        p.hidden = p.dataset[group.key + "Panel"] !== id;
        if (!p.hidden) active = p;
      });
      if (moveFocus && active) {
        active.focus({ preventScroll: true });
        active.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" });
      }
    }
    group.buttons.forEach(b => b.addEventListener("click", () => activate(b.dataset[group.key], true)));
    if (group.buttons.length) activate(group.buttons[0].dataset[group.key]);
  });
}
