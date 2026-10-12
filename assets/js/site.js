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

  /* ===================== overlays drawn from static data ===================== */
  const LTA = window.LTA_CALTAGIRONE, ROUTE = window.ROUTE_KOPPENBERG;
  const zonePolys = (LTA ? LTA.zones : []).map(z => ({ ...z, poly: z.points.split(' ').map(p => p.split(',').map(Number)) }));
  const routeMarkers = [];

  function drawMap(svg, withRules) {
    if (!LTA) return;
    svg.appendChild(el('rect', { width: LTA.w, height: LTA.h, fill: '#f6f9fb' }));
    svg.appendChild(el('image', { href: 'assets/img/caltagirone-roads.svg', width: LTA.w, height: LTA.h }));
    LTA.zones.forEach(z => {
      svg.appendChild(el('polygon', { points: z.points, fill: z.color, 'fill-opacity': '.24', stroke: z.color, 'stroke-width': '3' }));
      const [cx, cy] = z.centroid;
      svg.appendChild(el('text', { x: cx, y: cy - (withRules ? 22 : 0), 'text-anchor': 'middle', 'font-size': '16', 'font-weight': '600', fill: z.color }, z.short));
      if (!withRules) return;
      const n = z.verdicts.length, w = 24, x0 = cx - (n * w) / 2 + w / 2;
      z.verdicts.forEach((ok, i) => {
        svg.appendChild(el('circle', { cx: x0 + i * w, cy: cy + 6, r: 10, fill: ok ? z.color : '#fff', stroke: z.color, 'stroke-width': '1.5' }));
        svg.appendChild(el('text', { x: x0 + i * w, y: cy + 10, 'text-anchor': 'middle', 'font-size': '11', 'font-weight': '600', fill: ok ? '#fff' : z.color }, String(i + 1)));
      });
      svg.appendChild(el('text', { x: cx, y: cy + 36, 'text-anchor': 'middle', 'font-size': '12', fill: '#1c4665' }, z.verdicts.filter(Boolean).length + ' of 7 rules'));
    });
    LTA.parks.forEach(p => svg.appendChild(el('circle', { cx: p.xy[0], cy: p.xy[1], r: 6, fill: '#3fafa3', stroke: '#fff', 'stroke-width': '1.5' })));
  }
  function drawRoute(svg, withMarkers) {
    if (!ROUTE) return;
    svg.appendChild(el('rect', { width: ROUTE.w, height: ROUTE.h, fill: '#f6f9fb' }));
    svg.appendChild(el('image', { href: 'assets/img/flanders-roads.svg', width: ROUTE.w, height: ROUTE.h }));
    svg.appendChild(el('polyline', { points: ROUTE.route.map(p => p.join(',')).join(' '), fill: 'none', stroke: '#e8a23e', 'stroke-width': '5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
    const [sx, sy] = ROUTE.route[0], [ex, ey] = ROUTE.route[ROUTE.route.length - 1];
    svg.appendChild(el('text', { x: sx + 12, y: sy + 16, 'font-size': '12', fill: '#1c4665' }, 'start · melden'));
    svg.appendChild(el('text', { x: ex + 12, y: ey - 8, 'font-size': '12', fill: '#1c4665' }, 'top'));
    if (!withMarkers) return;
    /* illustrative positions along the climb, not IDLab results */
    const feats = [[60, 'tight bend', '#d9534f'], [105, 'road funnel', '#1c4665'], [150, 'roadside obstacle', '#d9534f']];
    feats.forEach(([i, label, color]) => {
      const [x, y] = ROUTE.route[i]; routeMarkers.push({ x, y, label });
      svg.appendChild(el('circle', { cx: x, cy: y, r: 14, fill: 'none', stroke: color, 'stroke-width': '2' }));
      svg.appendChild(el('circle', { cx: x, cy: y, r: 4, fill: color }));
      svg.appendChild(el('text', { x: x + 20, y: y + 4, 'font-size': '13', 'font-weight': '600', fill: color }, label));
    });
  }
  document.querySelectorAll('.surface[data-map] svg').forEach(s => drawMap(s, s.closest('.surface').dataset.map === 'rules'));
  document.querySelectorAll('.surface[data-route] svg').forEach(s => drawRoute(s, s.closest('.surface').dataset.route === 'markers'));

  /* ===================== the lens ===================== */
  const lens = document.getElementById('lens'), lensTag = lens.querySelector('.tag');
  const surfaces = [...document.querySelectorAll('.surface')];

  function inside(pt, poly) { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const [xi, yi] = poly[i], [xj, yj] = poly[j]; if (((yi > pt[1]) !== (yj > pt[1])) && (pt[0] < (xj - xi) * (pt[1] - yi) / (yj - yi) + xi)) c = !c; } return c; }
  function toView(s, x, y) { const svg = s.querySelector('svg'); if (!svg) return null; const [, , vw, vh] = svg.getAttribute('viewBox').split(' ').map(Number); const W = s.clientWidth, H = s.clientHeight, k = Math.max(W / vw, H / vh); return [(x - (W - vw * k) / 2) / k, (y - (H - vh * k) / 2) / k]; }
  function labelFor(s, x, y) {
    let label = s.dataset.label;
    if (s.dataset.map && zonePolys.length) { const v = toView(s, x, y); const z = v && zonePolys.find(z => inside(v, z.poly)); label = z ? `${z.label.toLowerCase()} · ${z.verdicts.filter(Boolean).length} of 7 rules` : 'outside the candidate zones'; }
    else if (s.dataset.route === 'markers' && routeMarkers.length) { const v = toView(s, x, y); const m = v && routeMarkers.find(m => Math.hypot(m.x - v[0], m.y - v[1]) < 70); if (m) label = m.label; }
    return label;
  }
  function reveal(s, x, y) {
    s.querySelector('.reveal').style.clipPath = `circle(${R}px at ${x}px ${y}px)`;
    const ring = s.querySelector('.ring'); if (ring) { ring.style.left = x + 'px'; ring.style.top = y + 'px'; ring.querySelector('.tag').textContent = labelFor(s, x, y); }
  }
  function hide(s) { s.querySelector('.reveal').style.clipPath = 'circle(0px at 50% 50%)'; }

  if (fine) {
    document.body.classList.add('has-lens');
    let mx = innerWidth / 2, my = innerHeight / 2, tx = mx, ty = my, raf = null;
    const tick = () => { if (reduced) { mx = tx; my = ty; } else { mx += (tx - mx) * .4; my += (ty - my) * .4; } lens.style.left = mx + 'px'; lens.style.top = my + 'px'; if (Math.abs(tx - mx) + Math.abs(ty - my) > .3) raf = requestAnimationFrame(tick); else raf = null; };
    addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; lens.classList.remove('hidden'); if (!raf) raf = requestAnimationFrame(tick); }, { passive: true });
    document.documentElement.addEventListener('mouseleave', () => lens.classList.add('hidden'));
    /* every clickable thing is announced by the lens too */
    addEventListener('pointerover', e => { const t = e.target.closest('a, button, summary, .filters .pill'); lens.classList.toggle('hover', !!t); lens.classList.toggle('on-night', !!e.target.closest('.night')); }, { passive: true });
    surfaces.forEach(s => {
      s.addEventListener('pointerenter', () => { lens.classList.add('open'); lensTag.textContent = s.dataset.label; });
      s.addEventListener('pointermove', e => { const r = s.getBoundingClientRect(); const x = e.clientX - r.left, y = e.clientY - r.top; reveal(s, x, y); lensTag.textContent = labelFor(s, x, y); }, { passive: true });
      s.addEventListener('pointerleave', () => { lens.classList.remove('open'); hide(s); });
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
    s.addEventListener('focus', () => { kx = s.clientWidth / 2; ky = s.clientHeight / 2; reveal(s, kx, ky); if (fine) { lens.classList.add('open'); const r = s.getBoundingClientRect(); lens.style.left = (r.left + kx) + 'px'; lens.style.top = (r.top + ky) + 'px'; lensTag.textContent = labelFor(s, kx, ky); lens.classList.remove('hidden'); } });
    s.addEventListener('blur', () => { hide(s); if (fine) lens.classList.remove('open'); });
    s.addEventListener('keydown', e => {
      const step = e.shiftKey ? 60 : 20; let ok = true;
      if (e.key === 'ArrowLeft') kx -= step; else if (e.key === 'ArrowRight') kx += step; else if (e.key === 'ArrowUp') ky -= step; else if (e.key === 'ArrowDown') ky += step; else ok = false;
      if (!ok) return; e.preventDefault();
      kx = Math.max(0, Math.min(s.clientWidth, kx)); ky = Math.max(0, Math.min(s.clientHeight, ky)); reveal(s, kx, ky);
      if (fine) { const r = s.getBoundingClientRect(); lens.style.left = (r.left + kx) + 'px'; lens.style.top = (r.top + ky) + 'px'; lensTag.textContent = labelFor(s, kx, ky); }
    });
  });

  /* ===================== navigation ===================== */
  const nav = document.querySelector('.nav'), navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  const toggle = document.querySelector('.nav-toggle'), list = document.getElementById('nav-links');
  toggle.addEventListener('click', () => { const open = list.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); });
  list.addEventListener('click', e => { if (e.target.closest('a')) { list.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); } });
  const sections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const setCurrent = () => {
    const y = scrollY + 90; let cur = null;
    sections.forEach(s => { if (s.offsetTop <= y) cur = s; });
    navLinks.forEach(a => a.classList.toggle('current', cur && a.getAttribute('href') === '#' + cur.id));
    const overNight = cur && cur.classList.contains('night');
    nav.classList.toggle('over-night', !!overNight);
  };
  addEventListener('scroll', setCurrent, { passive: true }); addEventListener('resize', setCurrent);

  /* ===================== scroll transitions ===================== */
  const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { threshold: .08, rootMargin: '0px 0px -24px 0px' });
  const observeReveals = () => document.querySelectorAll('.reveal:not(.in)').forEach(r => io.observe(r));

  /* ===================== publications ===================== */
  const PUBS = (window.PUBLICATIONS || []).slice();
  const authorsHtml = a => a.map(n => n === 'Scaletta E.' ? `<span class="me">${esc(n)}</span>` : esc(n)).join(', ');
  function pubLinks(p) {
    let s = '';
    if (p.doi) s += `<a class="pill" href="https://doi.org/${esc(p.doi)}">DOI ${esc(p.doi)}</a>`;
    if (p.url && !(p.doi && p.url.includes(p.doi))) s += `<a class="pill pill-light" href="${esc(p.url)}">${esc(p.urlLabel || 'Link')}</a>`;
    s += `<button class="btn copy" type="button" data-id="${esc(p.id)}">copy bibtex</button>`;
    return s;
  }
  function pubMore(p) {
    return `<details class="more"><summary>my contribution and bibtex</summary>${p.contribution ? `<p>${esc(p.contribution)}</p>` : ''}<pre>${esc(p.bibtex)}</pre></details>`;
  }
  const feat = PUBS.find(p => p.featured);
  if (feat) {
    document.getElementById('pub-featured').innerHTML = `<article class="pub-featured pub" id="pub-${esc(feat.id)}">
      <figure><img src="${esc(feat.figure.src)}" alt="${esc(feat.figure.alt)}" loading="lazy" width="785" height="840"></figure>
      <div><p class="pub-year">${feat.year} · ${esc(feat.type)}</p><p class="authors">${authorsHtml(feat.authors)}</p><h3>${esc(feat.title)}</h3>
      <p class="venue">${esc(feat.venue)}. ${esc(feat.where)}</p><div class="row">${pubLinks(feat)}</div>${pubMore(feat)}</div></article>`;
  }
  const listEl = document.getElementById('pub-list');
  PUBS.filter(p => !p.featured).forEach(p => {
    const li = h('li', 'pub reveal'); li.id = 'pub-' + p.id;
    li.innerHTML = `<p class="pub-year">${p.year} · ${esc(p.type)}</p><p class="authors">${authorsHtml(p.authors)}</p><h3>${esc(p.title)}</h3><p class="venue">${esc(p.venue)}. ${esc(p.where)}</p><div class="row">${pubLinks(p)}</div>${pubMore(p)}`;
    listEl.appendChild(li);
  });
  document.getElementById('pub-count').textContent = `${PUBS.filter(p => p.type === 'paper').length} papers · ${PUBS.filter(p => p.type === 'poster').length} poster`;
  document.addEventListener('click', e => {
    const b = e.target.closest('.copy'); if (!b) return;
    const p = PUBS.find(x => x.id === b.dataset.id); if (!p) return;
    const done = () => { b.textContent = 'copied'; b.classList.add('done'); setTimeout(() => { b.textContent = 'copy bibtex'; b.classList.remove('done'); }, 1600); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(p.bibtex).then(done).catch(() => fallback());
    else fallback();
    function fallback() { const t = document.createElement('textarea'); t.value = p.bibtex; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); done(); } catch (_) { } t.remove(); }
  });
  /* highlight a publication reached from a research link */
  const markTarget = () => { document.querySelectorAll('.pub.target').forEach(x => x.classList.remove('target')); const t = location.hash && document.querySelector(location.hash + '.pub'); if (t) t.classList.add('target'); };
  addEventListener('hashchange', markTarget); markTarget();

  /* ===================== timeline ===================== */
  const TYPES = { education: 'education', research: 'research', publication: 'publications', talk: 'talks', teaching: 'teaching', outreach: 'outreach' };
  const items = [];
  (window.TIMELINE || []).forEach(t => items.push({ type: t.type, date: t.date, when: t.when, title: t.title, org: t.org, detail: t.detail, link: t.link, linkLabel: t.linkLabel }));
  PUBS.forEach(p => items.push({ type: 'publication', date: p.date, when: p.year, title: p.title, org: p.venue, detail: p.contribution || '', link: '#pub-' + p.id, linkLabel: 'See the publication' }));
  (window.TALKS || []).forEach(t => items.push({ type: t.kind === 'visit' ? 'research' : t.kind === 'school' ? 'education' : 'talk', date: t.date, when: t.when, title: t.title, org: `${t.kind} · ${t.event}, ${t.where}`, detail: t.detail }));
  items.sort((a, b) => b.date.localeCompare(a.date));
  const tl = document.getElementById('tl-list'), filters = document.getElementById('tl-filters');
  const counts = {}; items.forEach(i => counts[i.type] = (counts[i.type] || 0) + 1);
  const mkFilter = (key, label, n) => { const b = h('button', 'pill', `${esc(label)} <span class="n">${n}</span>`); b.type = 'button'; b.dataset.type = key; b.setAttribute('aria-pressed', key === 'all' ? 'true' : 'false'); if (key === 'all') b.classList.add('is-on'); return b; };
  filters.appendChild(mkFilter('all', 'all', items.length));
  Object.keys(TYPES).forEach(k => { if (counts[k]) filters.appendChild(mkFilter(k, TYPES[k], counts[k])); });
  let lastYear = null;
  items.forEach(i => {
    const year = i.date.slice(0, 4);
    if (year !== lastYear) { const y = h('li', 'tl-year reveal', year); y.dataset.year = year; tl.appendChild(y); lastYear = year; }
    const li = h('li', `tl-item t-${i.type} reveal`); li.dataset.type = i.type; li.dataset.year = year;
    li.innerHTML = `<span class="date mono">${esc(i.when)}</span><details><summary><span class="type">${esc(TYPES[i.type])}</span><span>${esc(i.title)}<span class="org">${esc(i.org || '')}</span></span><span class="plus" aria-hidden="true">+</span></summary><div class="body">${i.detail ? `<p>${esc(i.detail)}</p>` : ''}${i.link ? `<p><a href="${esc(i.link)}">${esc(i.linkLabel || 'Link')}</a></p>` : ''}</div></details>`;
    tl.appendChild(li);
  });
  filters.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    filters.querySelectorAll('button').forEach(x => { x.classList.toggle('is-on', x === b); x.setAttribute('aria-pressed', String(x === b)); });
    const t = b.dataset.type;
    tl.querySelectorAll('.tl-item').forEach(li => li.classList.toggle('hide', t !== 'all' && li.dataset.type !== t));
    tl.querySelectorAll('.tl-year').forEach(y => { const any = tl.querySelector(`.tl-item[data-year="${y.dataset.year}"]:not(.hide)`); y.classList.toggle('hide', !any); y.style.display = any ? '' : 'none'; });
  });

  /* ===================== talks ===================== */
  const talksEl = document.getElementById('talks-list');
  (window.TALKS || []).slice().sort((a, b) => b.date.localeCompare(a.date)).forEach(t => {
    const li = h('li', `reveal k-${t.kind}`); li.innerHTML = `<span class="kind">${esc(t.kind)}</span><div><p class="meta mono">${esc(t.when)} · ${esc(t.where)}</p><h3>${esc(t.title)}</h3><p>${esc(t.event)}. ${esc(t.detail)}</p></div>`; talksEl.appendChild(li);
  });

  /* ===================== news ===================== */
  const news = document.getElementById('news-list');
  (window.NEWS || []).slice().sort((a, b) => b.sort.localeCompare(a.sort)).forEach(n => {
    const li = h('li', 'reveal'); li.innerHTML = `<span class="date mono">${esc(n.date)}</span><span>${esc(n.text)}</span><span class="link">${n.url ? `<a href="${esc(n.url)}">LinkedIn post</a>` : '<span class="mono muted">linkedin post to come</span>'}</span>`; news.appendChild(li);
  });

  observeReveals(); setCurrent();

  /* ===================== easter egg one: the face ===================== */
  const photo = document.getElementById('photo'), det = photo.querySelector('.det'), lab = det.querySelector('.lab');
  let detTimer = null;
  const detOn = () => { lab.textContent = 'person 0.99'; det.classList.add('on'); clearTimeout(detTimer); detTimer = setTimeout(() => { lab.textContent = 'PhD researcher 0.97'; }, reduced ? 0 : 900); };
  const detOff = () => { det.classList.remove('on'); clearTimeout(detTimer); };
  photo.addEventListener('pointerenter', detOn); photo.addEventListener('pointerleave', detOff);
  photo.addEventListener('focus', detOn); photo.addEventListener('blur', detOff);
  if (!fine) photo.addEventListener('click', () => det.classList.contains('on') ? detOff() : detOn());

  /* ===================== easter egg two: detection mode ===================== */
  let typed = '';
  const cross = document.getElementById('cross'), ch = cross.querySelector('.h'), cv = cross.querySelector('.v'), cxy = cross.querySelector('.xy');
  const toast = h('div', 'ytoast', ''); document.body.appendChild(toast);
  const ybox = h('div', 'ybox', '<span class="lab"></span>'); document.body.appendChild(ybox);
  let yoloOn = false, cur = null;
  const classOf = t => t.dataset.det || ({ H1: 'name', H2: 'section', H3: 'heading', A: 'link', IMG: 'image', FIGURE: 'image', BUTTON: 'button', SUMMARY: 'toggle', P: 'text', LI: 'item', SPAN: 'label', TIME: 'date', PRE: 'bibtex' }[t.tagName] || t.tagName.toLowerCase());
  const confOf = t => (0.80 + (((t.textContent || '').length * 7 + t.tagName.length) % 19) / 100).toFixed(2);
  const colorOf = t => ({ A: '#4f9ff5', IMG: '#c454bd', FIGURE: '#c454bd', H1: '#e8a23e', H2: '#e8a23e', H3: '#e8a23e', BUTTON: '#3fafa3', SUMMARY: '#3fafa3' }[t.tagName] || '#1c4665');
  function yoloTarget(e) {
    const t = e.target.closest('h1, h2, h3, a, button, summary, img, figure, pre, time, .pill, .card, .block, .pub, .tl-item summary, p, li');
    if (t === cur) return; cur = t;
    if (!t) { ybox.classList.remove('on'); return; }
    const r = t.getBoundingClientRect();
    ybox.style.setProperty('--c', colorOf(t)); ybox.style.left = (r.left + scrollX - 3) + 'px'; ybox.style.top = (r.top + scrollY - 3) + 'px'; ybox.style.width = (r.width + 6) + 'px'; ybox.style.height = (r.height + 6) + 'px';
    ybox.querySelector('.lab').textContent = `${classOf(t)} ${confOf(t)}`; ybox.classList.add('on');
  }
  function yoloMove(e) { const x = e.clientX, y = e.clientY; ch.style.top = y + 'px'; cv.style.left = x + 'px'; cxy.style.left = x + 'px'; cxy.style.top = y + 'px'; cxy.textContent = (x / innerWidth).toFixed(3) + ' ' + (y / innerHeight).toFixed(3); yoloTarget(e); }
  function setYolo(on) {
    yoloOn = on; document.body.classList.toggle('yolo', on);
    if (on) { addEventListener('pointermove', yoloMove, { passive: true }); toast.textContent = 'detection mode · esc to exit'; toast.classList.add('on'); setTimeout(() => toast.classList.remove('on'), 2600); }
    else { removeEventListener('pointermove', yoloMove); ybox.classList.remove('on'); cur = null; toast.classList.remove('on'); }
  }
  addEventListener('keydown', e => {
    if (e.key === 'Escape' && yoloOn) { setYolo(false); return; }
    if (e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) return;
    typed = (typed + e.key.toLowerCase()).slice(-4);
    if (typed === 'yolo' && !yoloOn) { typed = ''; setYolo(true); }
  });
})();
