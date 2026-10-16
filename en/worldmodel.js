// Small homepage interactions; navigation, reveals and lightbox reuse script.js.
document.querySelectorAll('[data-experiment-scroll]').forEach((button) => {
  button.addEventListener('click', () => {
    const ribbon = document.getElementById('experiment-ribbon');
    const card = ribbon?.querySelector('.wm-experiment');
    if (!ribbon || !card) return;
    const gap = parseFloat(getComputedStyle(ribbon).gap) || 0;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    ribbon.scrollBy({ left: Number(button.dataset.experimentScroll) * (card.getBoundingClientRect().width + gap), behavior: reduced ? 'instant' : 'smooth' });
  });
});

[['[data-open-overview]', 'worldir-overview'], ['[data-open-profile]', 'profile-details']].forEach(([selector, id]) => {
  document.querySelectorAll(selector).forEach((link) => {
    link.addEventListener('click', (event) => {
      const details = document.getElementById(id);
      if (!details) return;
      event.preventDefault();
      details.open = true;
      if (location.hash !== `#${id}`) history.pushState(null, '', `#${id}`);
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      details.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'start' });
      const summary = details.querySelector('summary');
      summary?.focus({ preventScroll: true });
    });
  });
});


// Progressive enhancement: without JS, both recorded evidence views remain visible.
const chairControls = document.querySelector('[data-chair-controls]');
if (chairControls) {
  const buttons = [...chairControls.querySelectorAll('[data-chair-view]')];
  const panels = [...document.querySelectorAll('[data-chair-panel]')];
  const showChairView = (view) => {
    buttons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.chairView === view)));
    panels.forEach((panel) => { panel.hidden = panel.dataset.chairPanel !== view; });
  };
  buttons.forEach((button) => button.addEventListener('click', () => showChairView(button.dataset.chairView)));
  showChairView('after');
  chairControls.hidden = false;
}
