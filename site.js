/* ===========================================================================
   Site behaviour: mobile nav, project rendering + filtering, back-to-top.
   Depends on projects.data.js (PROJECTS, CATEGORIES) being loaded first.
=========================================================================== */

/* ---- Mobile nav -------------------------------------------------------- */
function toggleNav() {
  document.querySelector('.nav-links')?.classList.toggle('open');
}

/* ---- Card template ----------------------------------------------------- */
function cardHTML(p) {
  const catLabel = (typeof CATEGORIES !== 'undefined' && CATEGORIES[p.category]) || p.category;
  const stack = (p.stack || []).map(s => `<span>${s}</span>`).join('');
  const isLink = !!p.link;

  let badge = '';
  if (p.status === 'ongoing') badge = '<div class="badge ongoing">Ongoing</div>';
  else if (p.status === 'soon') badge = '<div class="badge">Coming soon</div>';

  const go = isLink
    ? `<span class="go">View project <span class="arrow">&rarr;</span></span>`
    : `<span class="go muted">Write-up coming</span>`;

  const attrs = isLink
    ? `class="card is-link" role="link" tabindex="0" data-link="${p.link}"`
    : `class="card"`;

  return `
    <article ${attrs} data-cat="${p.category}">
      ${badge}
      <div class="cat">${catLabel}</div>
      <h3>${p.title}</h3>
      <p>${p.blurb}</p>
      <div class="stack">${stack}</div>
      ${go}
    </article>`;
}

/* ---- Render a grid ----------------------------------------------------- */
function renderProjects(targetId, list) {
  const el = document.getElementById(targetId);
  if (!el) return;
  el.innerHTML = list.length
    ? list.map(cardHTML).join('')
    : `<div class="empty-note">Nothing here yet — new work lands soon.</div>`;
  wireCards(el);
}

function wireCards(scope) {
  scope.querySelectorAll('.card.is-link').forEach(card => {
    const go = () => { window.location.href = card.dataset.link; };
    card.addEventListener('click', go);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
    });
  });
}

/* ---- Filter bar (work page) ------------------------------------------- */
function buildFilters() {
  const bar = document.getElementById('filters');
  if (bar) {
    const used = [...new Set(PROJECTS.map(p => p.category))];
    const cats = Object.keys(CATEGORIES).filter(c => used.includes(c));
    bar.innerHTML =
      `<button class="chip active" data-filter="all">All</button>` +
      cats.map(c => `<button class="chip" data-filter="${c}">${CATEGORIES[c]}</button>`).join('');
    bar.addEventListener('click', e => {
      const btn = e.target.closest('.chip');
      if (!btn) return;
      bar.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      renderProjects('projectGrid', f === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === f));
    });
  }
}

/* ---- Carousel ---------------------------------------------------------- */
function initCarousel() {
  const root = document.querySelector('.carousel');
  if (!root) return;
  const slides = [...root.querySelectorAll('.slide')];
  const dots   = [...root.querySelectorAll('.dots button')];
  const caps   = slides.map(s => ({ eyebrow: s.dataset.eyebrow || '', title: s.dataset.title || '' }));
  const capEyebrow = root.querySelector('.caption .eyebrow');
  const capTitle   = root.querySelector('.caption h2');
  let i = 0, timer;

  function show(n) {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle('active', k === i));
    dots.forEach((d, k) => d.classList.toggle('active', k === i));
    if (capEyebrow) capEyebrow.textContent = caps[i].eyebrow;
    if (capTitle)   capTitle.textContent   = caps[i].title;
  }
  function next() { show(i + 1); }
  function prev() { show(i - 1); }
  function play() { stop(); timer = setInterval(next, 5000); }
  function stop() { if (timer) clearInterval(timer); }

  root.querySelector('.arrow-btn.next')?.addEventListener('click', () => { next(); play(); });
  root.querySelector('.arrow-btn.prev')?.addEventListener('click', () => { prev(); play(); });
  dots.forEach((d, k) => d.addEventListener('click', () => { show(k); play(); }));
  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', play);

  show(0);
  play();
}

/* ---- Back to top ------------------------------------------------------- */
function initToTop() {
  const btn = document.getElementById('toTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.style.display = window.scrollY > 400 ? 'block' : 'none';
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---- Boot -------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  if (document.getElementById('projectGrid')) {
    renderProjects('projectGrid', PROJECTS);
    buildFilters();
  }
  if (document.getElementById('featuredGrid')) {
    renderProjects('featuredGrid', PROJECTS.filter(p => p.featured));
  }
  initCarousel();
  initToTop();
});
