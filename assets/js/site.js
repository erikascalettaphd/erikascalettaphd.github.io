/* Erika Scaletta, personal site. No requests to external services at load time: all data is static. */
(function () {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const R = 85; // lens radius in px; keep in sync with --lens in the CSS
  const NS = 'http://www.w3.org/2000/svg';
  const el = (n, a, text) => { const e = document.createElementNS(NS, n); for (const k in a) e.setAttribute(k, a[k]); if (text != null) e.textContent = text; return e; };
  const h = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ===================== effect 1: the name changes colour while scrolling ===================== */
  const name = document.getElementById('name');
  const paintName = () => { const max = Math.max(1, document.documentElement.scrollHeight - innerHeight); const p = Math.min(1, scrollY / max); name.style.backgroundPosition = (p * 100) + '% 50%'; };
  if (!reduced) { addEventListener('scroll', paintName, { passive: true }); addEventListener('resize', paintName); paintName(); }

  /* ===================== effect 2: the lens ===================== */
  const LTA = window.LTA_CALTAGIRONE, ROUTE = window.ROUTE_KOPPENBERG;
  const zonePolys = (LTA ? LTA.zones : []).map(z => ({ ...z, poly: z.points.split(' ').map(p => p.split(',').map(Number)) }));
  const routeMarkers = [];
  function drawMap(svg) {
    if (!LTA) return;
    svg.appendChild(el('rect', { width: LTA.w, height: LTA.h, fill: '#f6f9fb' }));
    svg.appendChild(el('image', { href: 'assets/img/caltagirone-roads.svg', width: LTA.w, height: LTA.h }));
    LTA.zones.forEach(z => {
      svg.appendChild(el('polygon', { points: z.points, fill: z.color, 'fill-opacity': '.24', stroke: z.color, 'stroke-width': '3' }));
      const [cx, cy] = z.centroid;
      svg.appendChild(el('text', { x: cx, y: cy - 22, 'text-anchor': 'middle', 'font-size': '16', 'font-weight': '600', fill: z.color }, z.short));
      const n = z.verdicts.length, w = 24, x0 = cx - (n * w) / 2 + w / 2;
      z.verdicts.forEach((ok, i) => {
        svg.appendChild(el('circle', { cx: x0 + i * w, cy: cy + 6, r: 10, fill: ok ? z.color : '#fff', stroke: z.color, 'stroke-width': '1.5' }));
        svg.appendChild(el('text', { x: x0 + i * w, y: cy + 10, 'text-anchor': 'middle', 'font-size': '11', 'font-weight': '600', fill: ok ? '#fff' : z.color }, String(i + 1)));
      });
      svg.appendChild(el('text', { x: cx, y: cy + 36, 'text-anchor': 'middle', 'font-size': '12', fill: '#063050' }, z.verdicts.filter(Boolean).length + ' of 7 rules'));
    });
    LTA.parks.forEach(p => svg.appendChild(el('circle', { cx: p.xy[0], cy: p.xy[1], r: 6, fill: '#3fafa3', stroke: '#fff', 'stroke-width': '1.5' })));
  }
  function drawRoute(svg) {
    if (!ROUTE) return;
    svg.appendChild(el('rect', { width: ROUTE.w, height: ROUTE.h, fill: '#f6f9fb' }));
    svg.appendChild(el('image', { href: 'assets/img/flanders-roads.svg', width: ROUTE.w, height: ROUTE.h }));
    svg.appendChild(el('polyline', { points: ROUTE.route.map(p => p.join(',')).join(' '), fill: 'none', stroke: '#2B59C3', 'stroke-width': '5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
    const [sx, sy] = ROUTE.route[0], [ex, ey] = ROUTE.route[ROUTE.route.length - 1];
    svg.appendChild(el('text', { x: sx + 12, y: sy + 16, 'font-size': '12', fill: '#063050' }, 'start, Melden'));
    svg.appendChild(el('text', { x: ex + 12, y: ey - 8, 'font-size': '12', fill: '#063050' }, 'top'));
    /* illustrative positions along the climb, not IDLab results */
    [[60, 'tight bend', '#d9534f'], [105, 'road narrowing', '#063050'], [150, 'roadside obstacle', '#d9534f']].forEach(([i, label, color]) => {
      const [x, y] = ROUTE.route[i]; routeMarkers.push({ x, y, label });
      svg.appendChild(el('circle', { cx: x, cy: y, r: 14, fill: 'none', stroke: color, 'stroke-width': '2' }));
      svg.appendChild(el('circle', { cx: x, cy: y, r: 4, fill: color }));
      svg.appendChild(el('text', { x: x + 20, y: y + 4, 'font-size': '13', 'font-weight': '600', fill: color }, label));
    });
  }
  document.querySelectorAll('.surface[data-map] svg').forEach(drawMap);
  document.querySelectorAll('.surface[data-route] svg').forEach(drawRoute);

  const surfaces = [...document.querySelectorAll('.surface')];
  function inside(pt, poly) { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const [xi, yi] = poly[i], [xj, yj] = poly[j]; if (((yi > pt[1]) !== (yj > pt[1])) && (pt[0] < (xj - xi) * (pt[1] - yi) / (yj - yi) + xi)) c = !c; } return c; }
  function toView(s, x, y) { const svg = s.querySelector('svg'); if (!svg) return null; const [, , vw, vh] = svg.getAttribute('viewBox').split(' ').map(Number); const W = s.clientWidth, H = s.clientHeight, k = Math.max(W / vw, H / vh); return [(x - (W - vw * k) / 2) / k, (y - (H - vh * k) / 2) / k]; }
  function labelFor(s, x, y) {
    let label = s.dataset.label;
    if (s.dataset.map && zonePolys.length) { const v = toView(s, x, y); const z = v && zonePolys.find(z => inside(v, z.poly)); label = z ? `${z.label} · ${z.verdicts.filter(Boolean).length} of 7 rules` : 'outside the candidate zones'; }
    else if (s.dataset.route && routeMarkers.length) { const v = toView(s, x, y); const m = v && routeMarkers.find(m => Math.hypot(m.x - v[0], m.y - v[1]) < 70); if (m) label = m.label; }
    return label;
  }
  function reveal(s, x, y) {
    s.querySelector('.reveal').style.clipPath = `circle(${R}px at ${x}px ${y}px)`;
    const ring = s.querySelector('.ring'); ring.style.left = x + 'px'; ring.style.top = y + 'px'; ring.querySelector('.tag').textContent = labelFor(s, x, y);
    s.classList.add('active');
  }
  function hide(s) { s.querySelector('.reveal').style.clipPath = 'circle(0px at 50% 50%)'; s.classList.remove('active'); }

  if (fine) {
    surfaces.forEach(s => {
      s.addEventListener('pointermove', e => { const r = s.getBoundingClientRect(); reveal(s, e.clientX - r.left, e.clientY - r.top); }, { passive: true });
      s.addEventListener('pointerleave', () => hide(s));
    });
  } else {
    /* touch: the lens sweeps with the scroll, a touch takes it over */
    surfaces.forEach(s => {
      let touched = false;
      const sweep = () => { if (touched) return; const r = s.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return; const p = Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight + r.height))); reveal(s, r.width * (0.15 + 0.7 * p), r.height * (0.2 + 0.6 * p)); };
      if (reduced) reveal(s, s.clientWidth / 2, s.clientHeight / 2);
      else { addEventListener('scroll', sweep, { passive: true }); addEventListener('resize', sweep); sweep(); }
      s.addEventListener('pointerdown', e => { touched = true; const r = s.getBoundingClientRect(); reveal(s, e.clientX - r.left, e.clientY - r.top); });
      s.addEventListener('pointermove', e => { if (!touched) return; const r = s.getBoundingClientRect(); reveal(s, e.clientX - r.left, e.clientY - r.top); }, { passive: true });
    });
  }
  /* keyboard: arrows move the lens on a focused surface */
  surfaces.forEach(s => {
    let kx = 0, ky = 0;
    s.addEventListener('focus', () => { kx = s.clientWidth / 2; ky = s.clientHeight / 2; reveal(s, kx, ky); });
    s.addEventListener('blur', () => hide(s));
    s.addEventListener('keydown', e => {
      const step = e.shiftKey ? 60 : 20; let ok = true;
      if (e.key === 'ArrowLeft') kx -= step; else if (e.key === 'ArrowRight') kx += step; else if (e.key === 'ArrowUp') ky -= step; else if (e.key === 'ArrowDown') ky += step; else ok = false;
      if (!ok) return; e.preventDefault();
      kx = Math.max(0, Math.min(s.clientWidth, kx)); ky = Math.max(0, Math.min(s.clientHeight, ky)); reveal(s, kx, ky);
    });
  });

  /* ===================== navigation: current section ===================== */
  const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  const toggle = document.querySelector('.nav-toggle'), list = document.getElementById('nav-links');
  toggle.addEventListener('click', () => { const open = list.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); });
  list.addEventListener('click', e => { if (e.target.closest('a')) { list.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); } });
  const sections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const setCurrent = () => {
    const y = scrollY + innerHeight * 0.35; let cur = null;
    sections.forEach(s => { if (s.offsetTop <= y) cur = s; });
    if (scrollY + innerHeight >= document.documentElement.scrollHeight - 2) cur = sections[sections.length - 1];
    navLinks.forEach(a => { const on = !!cur && a.getAttribute('href') === '#' + cur.id; a.classList.toggle('current', on); if (on) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current'); });
  };
  addEventListener('scroll', setCurrent, { passive: true }); addEventListener('resize', setCurrent);

  /* ===================== effect 3: entries that expand ===================== */
  function makeCard(opts) {
    const li = h('li', 'card' + (opts.cls ? ' ' + opts.cls : '')); if (opts.id) li.id = opts.id;
    const expandable = !!opts.body;
    li.innerHTML = (expandable
      ? `<button class="card-head" type="button" aria-expanded="false">${opts.head}<span class="plus" aria-hidden="true">+</span></button><div class="body"><div><div class="body-in">${opts.body}</div></div></div>`
      : `<div class="card-head">${opts.head}</div>`);
    if (!expandable) li.classList.add('static');
    return li;
  }
  document.addEventListener('click', e => {
    const b = e.target.closest('.card-head[aria-expanded]'); if (!b) return;
    const card = b.closest('.card'); const open = card.classList.toggle('open'); b.setAttribute('aria-expanded', String(open));
  });
  function openCard(id) { const c = document.getElementById(id); if (!c) return; c.classList.add('open'); const b = c.querySelector('.card-head[aria-expanded]'); if (b) b.setAttribute('aria-expanded', 'true'); document.querySelectorAll('.card.target').forEach(x => x.classList.remove('target')); c.classList.add('target'); }

  /* ===================== publications, with filters (effect 5) ===================== */
  const PUBS = (window.PUBLICATIONS || []).slice();
  const KINDS = { journal: 'Journal', conference: 'Conference', poster: 'Poster' };
  const authorsHtml = a => a.map(n => n === 'Scaletta E.' ? `<span class="me">${esc(n)}</span>` : esc(n)).join(', ');
  const pubList = document.getElementById('pub-list');
  PUBS.forEach(p => {
    const links = (p.doi ? `<a class="pill" href="https://doi.org/${esc(p.doi)}">DOI ${esc(p.doi)}</a>` : '') +
      (p.url && !(p.doi && p.url.includes(p.doi)) ? `<a class="pill" href="${esc(p.url)}">${esc(p.urlLabel || 'Link')}</a>` : '') +
      `<button class="btn copy" type="button" data-id="${esc(p.id)}">Copy BibTeX</button>`;
    const head = `<div><p class="meta">${p.year} · ${esc(KINDS[p.kind] || p.kind)}</p><p class="authors">${authorsHtml(p.authors)}</p><p class="title">${esc(p.title)}</p><p class="sub">${esc(p.venue)}. ${esc(p.where)}</p></div>`;
    const contrib = p.contribution ? `<p><strong>My contribution.</strong> ${esc(p.contribution)}</p>` : '';
    const fig = p.figure ? `<figure><img src="${esc(p.figure.src)}" alt="${esc(p.figure.alt)}" loading="lazy"></figure>` : '';
    const body = p.featured && p.figure
      ? `<div class="feat">${fig}<div>${contrib}<div class="row">${links}</div><pre>${esc(p.bibtex)}</pre></div></div>`
      : `${fig}${contrib}<div class="row">${links}</div><pre>${esc(p.bibtex)}</pre>`;
    const li = makeCard({ id: 'pub-' + p.id, cls: p.featured ? 'featured' : '', head, body });
    li.dataset.kind = p.kind; li.dataset.year = p.year;
    pubList.appendChild(li);
  });
  const years = [...new Set(PUBS.map(p => p.year))].sort((a, b) => b - a);
  const state = { kind: 'all', year: 'all' };
  const mkFilter = (group, key, label) => { const b = h('button', 'pill' + (key === 'all' ? ' is-on' : ''), esc(label)); b.type = 'button'; b.dataset.group = group; b.dataset.key = key; b.setAttribute('aria-pressed', String(key === 'all')); return b; };
  const ft = document.getElementById('filter-type'), fy = document.getElementById('filter-year');
  ft.appendChild(mkFilter('kind', 'all', 'All')); Object.keys(KINDS).forEach(k => { if (PUBS.some(p => p.kind === k)) ft.appendChild(mkFilter('kind', k, KINDS[k])); });
  fy.appendChild(mkFilter('year', 'all', 'All')); years.forEach(y => fy.appendChild(mkFilter('year', String(y), String(y))));
  const note = document.getElementById('pub-note');
  function applyFilters() {
    let n = 0;
    pubList.querySelectorAll('.card').forEach(c => { const ok = (state.kind === 'all' || c.dataset.kind === state.kind) && (state.year === 'all' || c.dataset.year === state.year); c.classList.toggle('hide', !ok); if (ok) n++; });
    note.textContent = `${n} of ${PUBS.length} shown. Click an entry to expand it.`;
  }
  document.querySelectorAll('.filter-row').forEach(row => row.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    state[b.dataset.group] = b.dataset.key;
    row.querySelectorAll('button').forEach(x => { const on = x === b; x.classList.toggle('is-on', on); x.setAttribute('aria-pressed', String(on)); });
    applyFilters();
  }));
  applyFilters();
  document.addEventListener('click', e => {
    const b = e.target.closest('.copy'); if (!b) return;
    const p = PUBS.find(x => x.id === b.dataset.id); if (!p) return;
    const done = () => { b.textContent = 'Copied'; b.classList.add('done'); setTimeout(() => { b.textContent = 'Copy BibTeX'; b.classList.remove('done'); }, 1600); };
    const fallback = () => { const t = document.createElement('textarea'); t.value = p.bibtex; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); done(); } catch (_) { } t.remove(); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(p.bibtex).then(done).catch(fallback); else fallback();
  });

  /* ===================== experience ===================== */
  const expEl = document.getElementById('exp-list');
  (window.EXPERIENCE || []).forEach(sec => {
    const wrap = h('div', 'exp-section'); wrap.id = sec.id;
    wrap.appendChild(h('h3', null, esc(sec.title)));
    const ol = h('ol', 'cards');
    sec.items.forEach(it => {
      const head = `<div>${it.when ? `<p class="meta">${esc(it.when)}</p>` : ''}<p class="title">${esc(it.title)}</p>${it.org ? `<p class="sub">${esc(it.org)}</p>` : ''}${it.summary ? `<p class="sub">${esc(it.summary)}</p>` : ''}</div>`;
      const body = (it.detail || it.link) ? `${it.detail ? `<p>${esc(it.detail)}</p>` : ''}${it.link ? `<p><a href="${esc(it.link)}">${esc(it.linkLabel || 'Link')}</a></p>` : ''}` : null;
      ol.appendChild(makeCard({ head, body }));
    });
    wrap.appendChild(ol); expEl.appendChild(wrap);
  });

  /* a publication reached from a link opens itself */
  const followHash = () => { if (location.hash && location.hash.startsWith('#pub-')) openCard(location.hash.slice(1)); };
  addEventListener('hashchange', followHash); followHash();
  setCurrent();
})();
