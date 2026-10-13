/* Erika Scaletta, personal site. No requests to external services at load time: all data is static. */
(function () {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const radius = s => parseFloat(getComputedStyle(s).getPropertyValue('--lens')) / 2 || 85; // half of --lens
  const NS = 'http://www.w3.org/2000/svg';
  const el = (n, a, text) => { const e = document.createElementNS(NS, n); for (const k in a) e.setAttribute(k, a[k]); if (text != null) e.textContent = text; return e; };
  const h = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const fmt = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>'); // **word** in the data files becomes bold

  /* ===================== language: English by default, Italian on request ===================== */
  const UI_EN = {
    kinds: { journal: 'Journal', conference: 'Conference', poster: 'Poster' },
    contribution: 'My contribution.', copy: 'Copy BibTeX', copied: 'Copied', show: 'Show details', hide: 'Hide details', link: 'Link',
    outside: 'outside the candidate zones', rules: 'of 7 rules', zones: {}, markers: {}, start: 'start, Melden', top: 'top'
  };
  let lang = 'en';
  try { const saved = localStorage.getItem('lang'); if (saved === 'it' || saved === 'en') lang = saved; } catch (_) { }
  const dict = () => (lang === 'en' ? {} : ((window.I18N || {})[lang] || {}));
  const ui = () => (lang === 'en' ? UI_EN : Object.assign({}, UI_EN, dict().ui || {}));
  const pick = (obj, field) => { const alt = obj[field + '_' + lang]; return alt != null ? alt : obj[field]; }; // field_it in the data files
  const pickIt = (it, field) => (lang !== 'en' && it[lang] && it[lang][field] != null) ? it[lang][field] : it[field]; // "it" object in experience items
  const originals = new Map(); // English innerHTML of every data-i18n element
  document.querySelectorAll('[data-i18n]').forEach(e => originals.set(e, e.innerHTML));
  function applyStatic() {
    const d = dict();
    originals.forEach((orig, e) => { const k = e.dataset.i18n; e.innerHTML = (lang !== 'en' && d[k] != null) ? d[k] : orig; });
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
  }

  /* ===================== effect 1: the name changes colour while scrolling ===================== */
  /* as on wattenberger.com: the name is SVG text inside a clipPath, a div clipped by it carries the
     gradient, and the transition point moves from 6% (top of the page, light) to 84% (after the first scroll, dark) */
  const nameEl = document.getElementById('name'), nameText = document.getElementById('name-text'), nameMeasure = document.getElementById('name-measure');
  const fitName = () => {
    const size = parseFloat(getComputedStyle(nameEl).fontSize);
    [nameText, nameMeasure].forEach(t => { t.setAttribute('font-size', size); t.setAttribute('y', Math.round(size * 0.78)); });
    const box = nameMeasure.getBBox();
    nameEl.style.width = Math.ceil(box.width + size * 0.04) + 'px';
    nameEl.style.height = Math.ceil(size * 0.95) + 'px';
  };
  /* the sweep ends when the name reaches the fixed bar, so it is always visible while it changes */
  let range = 300;
  const measureRange = () => { const top = nameEl.getBoundingClientRect().top + scrollY; range = Math.max(120, Math.min(300, top - 64 - 10)); };
  const bands = [...document.querySelectorAll('.band')];
  const paintName = () => {
    const p = reduced ? 45 : 6 + 78 * Math.min(1, scrollY / range); // light at rest, dark comes in while scrolling
    document.documentElement.style.setProperty('--p', p.toFixed(1) + '%');
    /* each section band sweeps while it rises from the bottom of the screen to the fixed bar */
    bands.forEach(b => {
      const top = b.getBoundingClientRect().top;
      const t = reduced ? 0.5 : Math.min(1, Math.max(0, 1 - (top - 64) / Math.max(1, innerHeight - 64 - b.offsetHeight)));
      b.style.setProperty('--p', (6 + 78 * t).toFixed(1) + '%');
    });
  };
  fitName(); measureRange(); paintName();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { fitName(); measureRange(); paintName(); });
  addEventListener('resize', () => { fitName(); measureRange(); paintName(); });
  if (!reduced) addEventListener('scroll', paintName, { passive: true });

  /* every link that leaves the page opens in a new tab; anchors and email stay */
  const externalise = root => root.querySelectorAll('a[href]').forEach(a => { const href = a.getAttribute('href'); if (href.startsWith('#') || href.startsWith('mailto:')) return; a.target = '_blank'; a.rel = 'noopener'; });

  /* ===================== effect 2: the lens ===================== */
  const LTA = window.LTA_CALTAGIRONE, ROUTE = window.ROUTE_KOPPENBERG;
  const zonePolys = (LTA ? LTA.zones : []).map(z => ({ ...z, poly: z.points.split(' ').map(p => p.split(',').map(Number)) }));
  const routeMarkers = [];
  const zoneLabel = z => (ui().zones[z.id] || z.label);
  function drawMap(svg) {
    if (!LTA) return; svg.innerHTML = '';
    svg.appendChild(el('rect', { width: LTA.w, height: LTA.h, fill: '#f6f9fb' }));
    svg.appendChild(el('image', { href: 'assets/img/caltagirone-roads.svg', width: LTA.w, height: LTA.h }));
    LTA.zones.forEach(z => {
      svg.appendChild(el('polygon', { points: z.points, fill: z.color, 'fill-opacity': '.24', stroke: z.color, 'stroke-width': '3' }));
      const [cx, cy] = z.centroid;
      svg.appendChild(el('text', { x: cx, y: cy - 22, 'text-anchor': 'middle', 'font-size': '16', 'font-weight': '600', fill: z.color }, zoneLabel(z).split(':')[0]));
      const n = z.verdicts.length, w = 24, x0 = cx - (n * w) / 2 + w / 2;
      z.verdicts.forEach((ok, i) => {
        svg.appendChild(el('circle', { cx: x0 + i * w, cy: cy + 6, r: 10, fill: ok ? z.color : '#fff', stroke: z.color, 'stroke-width': '1.5' }));
        svg.appendChild(el('text', { x: x0 + i * w, y: cy + 10, 'text-anchor': 'middle', 'font-size': '11', 'font-weight': '600', fill: ok ? '#fff' : z.color }, String(i + 1)));
      });
      svg.appendChild(el('text', { x: cx, y: cy + 36, 'text-anchor': 'middle', 'font-size': '12', fill: '#063050' }, z.verdicts.filter(Boolean).length + ' ' + ui().rules));
    });
    LTA.parks.forEach(p => svg.appendChild(el('circle', { cx: p.xy[0], cy: p.xy[1], r: 6, fill: '#3fafa3', stroke: '#fff', 'stroke-width': '1.5' })));
  }
  function drawRoute(svg) {
    if (!ROUTE) return; svg.innerHTML = ''; routeMarkers.length = 0;
    svg.appendChild(el('rect', { width: ROUTE.w, height: ROUTE.h, fill: '#f6f9fb' }));
    svg.appendChild(el('image', { href: 'assets/img/flanders-roads.svg', width: ROUTE.w, height: ROUTE.h }));
    svg.appendChild(el('polyline', { points: ROUTE.route.map(p => p.join(',')).join(' '), fill: 'none', stroke: getComputedStyle(document.documentElement).getPropertyValue('--band-2').trim() || '#2B59C3', 'stroke-width': '5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
    const [sx, sy] = ROUTE.route[0], [ex, ey] = ROUTE.route[ROUTE.route.length - 1];
    svg.appendChild(el('text', { x: sx + 12, y: sy + 16, 'font-size': '12', fill: '#063050' }, ui().start));
    svg.appendChild(el('text', { x: ex + 12, y: ey - 8, 'font-size': '12', fill: '#063050' }, ui().top));
    /* illustrative positions along the climb, not IDLab results */
    [[60, 'tight bend', '#d9534f'], [105, 'road narrowing', '#063050'], [150, 'roadside obstacle', '#d9534f']].forEach(([i, key, color]) => {
      const label = ui().markers[key] || key;
      const [x, y] = ROUTE.route[i]; routeMarkers.push({ x, y, label });
      svg.appendChild(el('circle', { cx: x, cy: y, r: 14, fill: 'none', stroke: color, 'stroke-width': '2' }));
      svg.appendChild(el('circle', { cx: x, cy: y, r: 4, fill: color }));
      svg.appendChild(el('text', { x: x + 20, y: y + 4, 'font-size': '13', 'font-weight': '600', fill: color }, label));
    });
  }
  const drawOverlays = () => { document.querySelectorAll('.surface[data-map] svg').forEach(drawMap); document.querySelectorAll('.surface[data-route] svg').forEach(drawRoute); };
  drawOverlays();

  const surfaces = [...document.querySelectorAll('.surface')];
  const surfaceLabel = s => (lang !== 'en' && s.dataset['label' + lang.charAt(0).toUpperCase() + lang.slice(1)]) || s.dataset.label;
  function inside(pt, poly) { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const [xi, yi] = poly[i], [xj, yj] = poly[j]; if (((yi > pt[1]) !== (yj > pt[1])) && (pt[0] < (xj - xi) * (pt[1] - yi) / (yj - yi) + xi)) c = !c; } return c; }
  function toView(s, x, y) { const svg = s.querySelector('svg'); if (!svg) return null; const [, , vw, vh] = svg.getAttribute('viewBox').split(' ').map(Number); const W = s.clientWidth, H = s.clientHeight, k = Math.max(W / vw, H / vh); return [(x - (W - vw * k) / 2) / k, (y - (H - vh * k) / 2) / k]; }
  function labelFor(s, x, y) {
    let label = surfaceLabel(s);
    if (s.dataset.map && zonePolys.length) { const v = toView(s, x, y); const z = v && zonePolys.find(z => inside(v, z.poly)); label = z ? `${zoneLabel(z)} · ${z.verdicts.filter(Boolean).length} ${ui().rules}` : ui().outside; }
    else if (s.dataset.route && routeMarkers.length) { const v = toView(s, x, y); const m = v && routeMarkers.find(m => Math.hypot(m.x - v[0], m.y - v[1]) < 70); if (m) label = m.label; }
    return label;
  }
  const last = new Map(); // last lens position per surface, to refresh labels on a language change
  function reveal(s, x, y) {
    s.querySelector('.reveal').style.clipPath = `circle(${radius(s)}px at ${x}px ${y}px)`;
    const ring = s.querySelector('.ring'); ring.style.left = x + 'px'; ring.style.top = y + 'px'; ring.querySelector('.tag').textContent = labelFor(s, x, y);
    s.classList.add('active'); last.set(s, [x, y]);
  }
  /* when the pointer is not over the image, the lens rests at a fixed spot (data-rest, fractions of width and height; centre by default) */
  function rest(s) { const [fx, fy] = (s.dataset.rest || '0.5 0.5').split(' ').map(Number); reveal(s, s.clientWidth * fx, s.clientHeight * fy); }
  function hide(s) { rest(s); }

  if (fine) {
    surfaces.forEach(s => {
      rest(s);
      s.addEventListener('pointermove', e => { const r = s.getBoundingClientRect(); reveal(s, e.clientX - r.left, e.clientY - r.top); }, { passive: true });
      s.addEventListener('pointerleave', () => rest(s));
    });
    addEventListener('resize', () => surfaces.forEach(s => { if (!s.matches(':hover')) rest(s); }));
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => surfaces.forEach(rest));
    addEventListener('load', () => surfaces.forEach(s => { if (!s.matches(':hover')) rest(s); }));
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
      ? `<div class="card-head">${opts.head}<button class="plus" type="button" aria-expanded="false" aria-label="${esc(ui().show)}">+</button></div><div class="body"><div><div class="body-in">${opts.body}</div></div></div>`
      : `<div class="card-head static">${opts.head}</div>`);
    if (!expandable) li.classList.add('static');
    return li;
  }
  function toggleCard(card, force) {
    const b = card.querySelector('.plus[aria-expanded]'); if (!b) return;
    const open = typeof force === 'boolean' ? card.classList.toggle('open', force) : card.classList.toggle('open');
    b.setAttribute('aria-expanded', String(open)); b.setAttribute('aria-label', open ? ui().hide : ui().show);
  }
  document.addEventListener('click', e => {
    if (e.target.closest('a, .copy')) return;
    const head = e.target.closest('.card-head:not(.static)'); if (!head) return;
    toggleCard(head.closest('.card'));
  });
  function openCard(id) { const c = document.getElementById(id); if (!c) return; toggleCard(c, true); document.querySelectorAll('.card.target').forEach(x => x.classList.remove('target')); c.classList.add('target'); }

  /* ===================== publications ===================== */
  const PUBS = (window.PUBLICATIONS || []).slice();
  const authorsHtml = a => a.map(n => n === 'Scaletta E.' ? `<span class="me">${esc(n)}</span>` : esc(n)).join(', ');
  const pubList = document.getElementById('pub-list');
  function renderPubs() {
    pubList.innerHTML = '';
    PUBS.forEach(p => {
      const links = (p.doi ? `<a class="pill" href="https://doi.org/${esc(p.doi)}">DOI ${esc(p.doi)}</a>` : '') +
        (p.url && !(p.doi && p.url.includes(p.doi)) ? `<a class="pill" href="${esc(p.url)}">${esc(pick(p, 'urlLabel') || ui().link)}</a>` : '') +
        `<button class="btn copy" type="button" data-id="${esc(p.id)}">${esc(ui().copy)}</button>`;
      const head = `<div><p class="meta">${p.year} · ${esc(ui().kinds[p.kind] || p.kind)}</p><p class="authors">${authorsHtml(p.authors)}</p><p class="title">${p.url && (p.doi || p.kind === 'poster' || p.pageIsPaper) ? `<a href="${esc(p.url)}">${esc(p.title)}</a>` : esc(p.title)}</p><p class="sub">${esc(p.venue)}. ${esc(pick(p, 'where'))}</p></div>`;
      const c = pick(p, 'contribution');
      const contrib = c ? `<p><strong>${esc(ui().contribution)}</strong> ${fmt(c)}</p>` : '';
      const fig = p.figure ? `<figure><img src="${esc(p.figure.src)}" alt="${esc(p.figure.alt)}" loading="lazy"></figure>` : '';
      const body = p.featured && p.figure
        ? `<div class="feat">${fig}<div>${contrib}<div class="row">${links}</div></div></div>`
        : `${fig}${contrib}<div class="row">${links}</div>`;
      const li = makeCard({ id: 'pub-' + p.id, cls: p.featured ? 'featured' : '', head, body });
      li.dataset.kind = p.kind; li.dataset.year = p.year;
      pubList.appendChild(li);
    });
    externalise(pubList);
  }
  document.addEventListener('click', e => {
    const b = e.target.closest('.copy'); if (!b) return;
    const p = PUBS.find(x => x.id === b.dataset.id); if (!p) return;
    const done = () => { b.textContent = ui().copied; b.classList.add('done'); setTimeout(() => { b.textContent = ui().copy; b.classList.remove('done'); }, 1600); };
    const fallback = () => { const t = document.createElement('textarea'); t.value = p.bibtex; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); done(); } catch (_) { } t.remove(); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(p.bibtex).then(done).catch(fallback); else fallback();
  });

  /* ===================== experience ===================== */
  const expEl = document.getElementById('exp-list');
  function renderExp() {
    expEl.innerHTML = '';
    (window.EXPERIENCE || []).forEach(sec => {
      const wrap = h('div', 'exp-section'); wrap.id = sec.id;
      wrap.appendChild(h('h3', null, esc(pick(sec, 'title'))));
      const ol = h('ol', 'cards');
      sec.items.forEach(it => {
        const T = f => pickIt(it, f);
        const title = it.titleUrl ? `<a href="${esc(it.titleUrl)}">${esc(T('title'))}</a>` : esc(T('title'));
        const org = it.orgUrl ? `<a href="${esc(it.orgUrl)}">${esc(T('org'))}</a>` : esc(T('org') || '');
        const head = `<div>${T('when') ? `<p class="meta">${esc(T('when'))}</p>` : ''}<p class="title">${title}</p>${it.org ? `<p class="sub">${org}</p>` : ''}${T('summary') ? `<p class="sub">${fmt(T('summary'))}</p>` : ''}</div>`;
        const body = (it.detail || it.link) ? `${T('detail') ? `<p>${fmt(T('detail'))}</p>` : ''}${it.link ? `<p><a href="${esc(it.link)}">${esc(T('linkLabel') || ui().link)}</a></p>` : ''}` : null;
        ol.appendChild(makeCard({ head, body }));
      });
      wrap.appendChild(ol); expEl.appendChild(wrap);
    });
    externalise(expEl);
  }

  /* ===================== apply the language ===================== */
  function applyLang() {
    applyStatic(); renderPubs(); renderExp(); drawOverlays();
    surfaces.forEach(s => { const p = last.get(s); if (p) reveal(s, p[0], p[1]); });
    fitName(); measureRange(); paintName();
  }
  document.querySelectorAll('.lang button').forEach(b => b.addEventListener('click', () => {
    if (b.dataset.lang === lang) return; lang = b.dataset.lang;
    try { localStorage.setItem('lang', lang); } catch (_) { }
    applyLang();
  }));
  externalise(document);
  applyLang();

  /* a publication reached from a link opens itself */
  const followHash = () => { if (location.hash && location.hash.startsWith('#pub-')) openCard(location.hash.slice(1)); };
  addEventListener('hashchange', followHash); followHash();
  setCurrent();
})();
