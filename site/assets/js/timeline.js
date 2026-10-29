/* Interactive career timeline. Reads window.TIMELINE (see timeline-data.js).
   Companies are horizontal lines; projects, achievements, certifications and degrees are dots on them.
   Click a dot or a line to show its story in the pane above. No libraries; layout uses DOM + CSSOM (CSP-safe). */
(function () {
  var D = window.TIMELINE;
  var pane = document.getElementById('tl-pane'), scroll = document.getElementById('tl-scroll'), inner = document.getElementById('tl-inner');
  if (!D || !pane || !scroll || !inner) { return; }

  var MON = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var TYPE = { project: 'Project', achievement: 'Achievement', cert: 'Certification & training', degree: 'Degree' };
  var ZM = [1, 1.4, 2, 2.8, 4], zi = 0, fitPpy = 60;
  var STEP = 16, TIERS = [0, -1, 1, -2, 2, -3, 3];
  var narrowMQ = window.matchMedia('(max-width: 700px)');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var laneById = {}, evById = {}, dotEl = {}, laneEl = {};
  var sel = { kind: 'e', id: D.defaultId }, rove = D.defaultId;
  var show = { project: true, achievement: true, cert: true, degree: true };
  var LW = 320, ppy = 60, minYear = 2006, maxYear = 2027;

  D.lanes.forEach(function (l, i) { l.order = i; l.events = []; laneById[l.id] = l; });
  var now = new Date(), nowF = now.getFullYear() + (now.getMonth() + now.getDate() / 31) / 12;

  function pt(s) { var p = s.split('-'), y = +p[0]; return p.length === 1 ? y + 0.5 : y + (+p[1] - 0.5) / 12; }
  function bs(s) { var p = s.split('-'); return +p[0] + (+p[1] - 1) / 12; }
  function be(s) { var p = s.split('-'); return +p[0] + (+p[1]) / 12; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function fmt(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'); }
  function mon3(m) { return MON[m - 1].slice(0, 3); }
  function evWhen(e) {
    var p = e.date.split('-'), y = p[0];
    if (e.when) { return e.when; }
    if (e.approx) { return 'Approx. ' + y; }
    return p.length === 1 ? y : MON[+p[1] - 1] + ' ' + y;
  }
  function laneWhen(l) {
    if (!l.from) { return ''; }
    var a = l.from.split('-'), s = mon3(+a[1]) + ' ' + a[0];
    if (!l.to) { return s + ' – Present'; }
    var b = l.to.split('-'); return s + ' – ' + mon3(+b[1]) + ' ' + b[0];
  }
  function mk(tag, cls) { var e = document.createElement(tag); if (cls) { e.className = cls; } return e; }

  D.events.forEach(function (e) { e.t = pt(e.date); evById[e.id] = e; if (laneById[e.lane]) { laneById[e.lane].events.push(e); } });
  var allOrdered = D.events.slice().sort(function (a, b) { return a.t - b.t || laneById[a.lane].order - laneById[b.lane].order; });

  function computeRange() {
    var lo = 9999;
    D.lanes.forEach(function (l) { if (l.from) { lo = Math.min(lo, bs(l.from)); } });
    D.events.forEach(function (e) { lo = Math.min(lo, e.t); });
    minYear = Math.floor(lo); maxYear = Math.ceil(nowF);
  }
  function X(t) { return LW + (t - minYear) * ppy; }

  /* ---------------- build the chart ---------------- */
  function build() {
    LW = narrowMQ.matches ? 8 : 240; computeRange();
    fitPpy = Math.max(narrowMQ.matches ? 44 : 40, (scroll.clientWidth - LW - 40) / (maxYear - minYear)); ppy = fitPpy * ZM[zi];
    var W = Math.max(scroll.clientWidth, Math.round(X(maxYear) + (narrowMQ.matches ? 80 : 30)));
    inner.textContent = ''; inner.style.width = W + 'px'; dotEl = {}; laneEl = {};

    var grid = mk('div', 'tl-grid'), axis = mk('div', 'tl-axis'), yrStep = ppy < 52 ? 2 : 1;
    for (var y = minYear; y <= maxYear; y++) {
      var gl = mk('i', 'tl-gl'); gl.style.left = X(y) + 'px'; grid.appendChild(gl);
      if ((y - minYear) % yrStep === 0 && y < maxYear) { var yl = mk('span', 'tl-yr'); yl.textContent = y; yl.style.left = (X(y) + 6) + 'px'; axis.appendChild(yl); }
    }
    var nowLine = mk('i', 'tl-now'); nowLine.style.left = X(nowF) + 'px'; grid.appendChild(nowLine);
    var hd = mk('div', 'tl-head'); hd.style.width = LW + 'px'; hd.innerHTML = '<span>Organization</span>'; axis.appendChild(hd);
    inner.appendChild(grid); inner.appendChild(axis);

    D.lanes.forEach(function (l) {
      var list = l.events.slice().sort(function (a, b) { return a.t - b.t; });
      var last = {}, minT = 0, maxT = 0;
      list.forEach(function (e) {
        var x = X(e.t), tier = 0, k;
        for (k = 0; k < TIERS.length; k++) { var cand = TIERS[k]; if (last[cand] === undefined || x - last[cand] >= 18) { tier = cand; break; } }
        last[tier] = x; e.tier = tier; minT = Math.min(minT, tier); maxT = Math.max(maxT, tier);
      });
      var nar, above = -minT, below = maxT, nar = narrowMQ.matches, barY = (nar ? 11 : 9) + above * STEP, H = nar ? barY + (below ? 30 + (below - 1) * STEP + 11 : 25) : Math.max(28, barY + below * STEP + 9);
      var row = mk('div', 'tl-row k-' + l.kind); row.style.height = H + 'px'; row.style.width = W + 'px';

      var lab = mk('button', 'tl-label' + (l.from ? '' : ' nodate')); if (!narrowMQ.matches) { lab.style.width = LW + 'px'; } lab.type = 'button'; lab.setAttribute('data-lane', l.id);
      lab.innerHTML = '<span class="lb-org"><strong>' + esc(l.short || l.org) + '</strong></span>'; lab.title = l.org + (l.from ? ' · ' + laneWhen(l) : '');
      lab.addEventListener('click', function () { select('l', l.id, true); });
      if (!nar) { row.appendChild(lab); } laneEl[l.id] = [lab];

      var bar;
      if (l.from) {
        var x0 = X(bs(l.from)), x1 = X(l.to ? be(l.to) : nowF);
        bar = mk('button', 'tl-bar' + (l.to ? '' : ' present')); bar.type = 'button'; bar.tabIndex = -1;
        bar.style.left = x0 + 'px'; bar.style.width = Math.max(8, x1 - x0) + 'px'; bar.style.top = (barY - 4) + 'px';
        bar.setAttribute('aria-label', l.org + ', ' + laneWhen(l)); bar.title = l.org + ' · ' + laneWhen(l);
      } else {
        bar = mk('button', 'tl-track'); bar.type = 'button'; bar.tabIndex = -1;
        bar.style.left = LW + 'px'; bar.style.width = (W - LW - 12) + 'px'; bar.style.top = (barY - 4) + 'px';
        bar.setAttribute('aria-label', l.org); bar.title = l.org;
      }
      if (l.from && !l.to) {
        var weld = mk('div', 'tl-weld'); weld.setAttribute('aria-hidden', 'true'); weld.style.left = X(nowF) + 'px'; weld.style.top = barY + 'px';
        weld.appendChild(mk('i', 'wg'));
        for (var s = 1; s <= 5; s++) { weld.appendChild(mk('i', 'sp s' + s)); }
        row.appendChild(weld);
      }
      bar.addEventListener('click', function () { select('l', l.id, false); });
      row.appendChild(bar); laneEl[l.id].push(bar);
      if (nar) {
        var lw = mk('div', 'tl-lw'); lw.style.left = bar.style.left; lw.style.width = bar.style.width; lw.style.top = (barY + 7) + 'px';
        lw.appendChild(lab); row.appendChild(lw);
      }

      list.forEach(function (e) {
        var x = X(e.t), off = nar && e.tier > 0 ? 30 + (e.tier - 1) * STEP : e.tier * STEP;
        if (e.tier !== 0) { var st = mk('i', 'tl-stem'); st.style.left = x + 'px'; st.style.top = (barY + Math.min(0, off)) + 'px'; st.style.height = Math.abs(off) + 'px'; row.appendChild(st); }
        var d = mk('button', 'tl-dot t-' + e.type); d.type = 'button'; d.setAttribute('data-id', e.id);
        d.style.left = x + 'px'; d.style.top = (barY + off) + 'px';
        d.innerHTML = '<i class="shape"></i>';
        d.setAttribute('aria-label', TYPE[e.type] + ': ' + e.title + ', ' + evWhen(e) + ', ' + l.org);
        d.title = e.title + ' · ' + evWhen(e);
        d.addEventListener('click', function () { select('e', e.id, false); });
        d.addEventListener('keydown', onKey);
        row.appendChild(d); dotEl[e.id] = d;
      });
      inner.appendChild(row);
    });
    applyFilters(); mark();
  }

  /* ---------------- selection + pane ---------------- */
  function visibleOrder() { return allOrdered.filter(function (e) { return show[e.type]; }); }

  function mark() {
    Object.keys(dotEl).forEach(function (id) {
      var on = sel.kind === 'e' && sel.id === id;
      dotEl[id].classList.toggle('sel', on); dotEl[id].setAttribute('aria-current', on ? 'true' : 'false');
      dotEl[id].tabIndex = id === rove ? 0 : -1;
    });
    Object.keys(laneEl).forEach(function (id) { var on = sel.kind === 'l' && sel.id === id; laneEl[id][0].classList.toggle('sel', on); laneEl[id][1].classList.toggle('sel', on); });
    var cur = sel.kind === 'e' ? evById[sel.id] : null;
    if (cur) { var row = dotEl[cur.id] && dotEl[cur.id].parentNode; Array.prototype.forEach.call(inner.querySelectorAll('.tl-row.cur'), function (r) { r.classList.remove('cur'); }); if (row) { row.classList.add('cur'); } }
  }

  function applyFilters() {
    Object.keys(dotEl).forEach(function (id) { dotEl[id].classList.toggle('off', !show[evById[id].type]); dotEl[id].disabled = !show[evById[id].type]; });
    Array.prototype.forEach.call(inner.querySelectorAll('.tl-stem'), function (s) { /* stems follow their dot's row; fine to leave visible */ });
  }

  function renderPane() {
    var h = '', navBtns = '';
    if (sel.kind === 'e') {
      var e = evById[sel.id], l = laneById[e.lane], ord = visibleOrder(), i = ord.indexOf(e);
      navBtns = '<div class="pane-nav"><button type="button" id="tl-prev" aria-label="Previous item on the timeline"' + (i <= 0 ? ' disabled' : '') + '>&#9664; Earlier</button>' +
        '<button type="button" id="tl-next" aria-label="Next item on the timeline"' + (i < 0 || i >= ord.length - 1 ? ' disabled' : '') + '>Later &#9654;</button></div>';
      h += '<div class="pane-head"><span class="badge t-' + e.type + '"><i class="shape"></i>' + TYPE[e.type] + '</span>' + navBtns + '</div>';
      h += '<h2>' + esc(e.title) + '</h2><div class="pane-meta">' + esc(l.org) + (l.sector ? ' · ' + esc(l.sector) : '') + ' · ' + esc(evWhen(e)) + '</div>';
      if (e.challenge || e.approach || e.result) {
        h += '<dl>';
        if (e.challenge) { h += '<dt>Challenge</dt><dd>' + fmt(e.challenge) + '</dd>'; }
        if (e.approach) { h += '<dt>Approach</dt><dd>' + fmt(e.approach) + '</dd>'; }
        if (e.result) { h += '<dt>Result</dt><dd>' + fmt(e.result) + '</dd>'; }
        h += '</dl>';
      } else if (e.summary) { h += '<p class="pane-sum">' + fmt(e.summary) + '</p>'; }
      if (e.link && /^https:\/\//.test(e.link.url)) { h += '<p class="pane-link"><a href="' + esc(e.link.url) + '" target="_blank" rel="noopener noreferrer">' + esc(e.link.label || 'Learn more') + ' &#8599;</a></p>'; }
      if (e.tags && e.tags.length) { h += '<div class="pane-pills">' + e.tags.map(function (t) { return '<span class="pill">' + esc(t) + '</span>'; }).join('') + '</div>'; }
    } else {
      var L = laneById[sel.id], kindLabel = L.kind === 'job' ? 'Employer' : L.kind === 'edu' ? 'School' : L.kind === 'svc' ? 'Volunteer service' : 'Credentials';
      h += '<div class="pane-head"><span class="badge t-lane"><i class="shape"></i>' + kindLabel + '</span></div>';
      h += '<h2>' + esc(L.org) + '</h2><div class="pane-meta">' + esc(L.role) + (L.sector ? ' · ' + esc(L.sector) : '') + (L.from ? ' · ' + esc(laneWhen(L)) : '') + '</div>';
      h += '<p class="pane-sum">' + fmt(L.summary) + '</p>';
      if (L.points && L.points.length) { h += '<ul class="pane-points">' + L.points.map(function (p) { return '<li>' + fmt(p) + '</li>'; }).join('') + '</ul>'; }
      var ev = L.events.slice().sort(function (a, b) { return b.t - a.t; });
      if (ev.length) { h += '<div class="pane-on"><span>On this line:</span>' + ev.map(function (x) { return '<button type="button" class="chip" data-id="' + esc(x.id) + '">' + esc(x.title) + '</button>'; }).join('') + '</div>'; }
    }
    pane.innerHTML = h;
    var pv = document.getElementById('tl-prev'), nx = document.getElementById('tl-next');
    if (pv) { pv.addEventListener('click', function () { step(-1); }); }
    if (nx) { nx.addEventListener('click', function () { step(1); }); }
    Array.prototype.forEach.call(pane.querySelectorAll('.pane-on .chip'), function (b) { b.addEventListener('click', function () { select('e', b.getAttribute('data-id'), false); }); });
  }

  function reveal(el) {
    if (!el) { return; }
    var x = el.offsetLeft, left = scroll.scrollLeft, w = scroll.clientWidth;
    if (x < left + LW + 30 || x > left + w - 50) { scroll.scrollTo({ left: Math.max(0, x - (w + LW) / 2), behavior: reduce ? 'auto' : 'smooth' }); }
  }

  function select(kind, id, fromLabel) {
    if (kind === 'e' && !evById[id]) { return; } if (kind === 'l' && !laneById[id]) { return; }
    sel = { kind: kind, id: id };
    if (kind === 'e') { rove = id; } else { var f = laneById[id].events[0]; if (f) { rove = f.id; } }
    mark(); renderPane();
    if (kind === 'e') { reveal(dotEl[id]); }
    var pr = pane.getBoundingClientRect();
    if (pr.top > window.innerHeight - 140) { window.scrollTo({ top: window.pageYOffset + pr.top - 84, behavior: reduce ? 'auto' : 'smooth' }); }
    try { history.replaceState(null, '', '#' + (kind === 'e' ? 'e=' : 'l=') + id); } catch (x) { /* file:// or sandboxed */ }
  }

  function step(dir) {
    if (sel.kind !== 'e') { return; }
    var ord = visibleOrder(), i = ord.indexOf(evById[sel.id]), n = ord[i + dir];
    if (n) { select('e', n.id, false); if (dotEl[n.id]) { dotEl[n.id].focus({ preventScroll: true }); } }
  }

  function onKey(ev) {
    var k = ev.key, ord = visibleOrder(), cur = evById[ev.currentTarget.getAttribute('data-id')], i = ord.indexOf(cur), n = null;
    if (k === 'ArrowLeft' || k === 'ArrowUp') { n = ord[i - 1]; } else if (k === 'ArrowRight' || k === 'ArrowDown') { n = ord[i + 1]; }
    else if (k === 'Home') { n = ord[0]; } else if (k === 'End') { n = ord[ord.length - 1]; } else { return; }
    ev.preventDefault();
    if (n) { select('e', n.id, false); dotEl[n.id].focus({ preventScroll: true }); }
  }

  /* ---------------- controls ---------------- */
  function bindControls() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-type]'), function (b) {
      b.addEventListener('click', function () {
        var t = b.getAttribute('data-type'); show[t] = !show[t]; b.setAttribute('aria-pressed', show[t] ? 'true' : 'false');
        applyFilters(); renderPane();
      });
    });
    function zoom(d) {
      var n = Math.max(0, Math.min(ZM.length - 1, zi + d)); if (n === zi) { return; }
      var centerT = minYear + (scroll.scrollLeft + (scroll.clientWidth + LW) / 2 - LW) / ppy, was = zi;
      zi = n; build();
      scroll.scrollLeft = zi === 0 ? 0 : Math.max(0, LW + (centerT - minYear) * ppy - (scroll.clientWidth + LW) / 2);
      zb();
    }
    var zin = document.getElementById('tl-zin'), zout = document.getElementById('tl-zout'), nowB = document.getElementById('tl-latest');
    function zb() { if (zin) { zin.disabled = zi === ZM.length - 1; } if (zout) { zout.disabled = zi === 0; } }
    if (zin) { zin.addEventListener('click', function () { zoom(1); }); }
    if (zout) { zout.addEventListener('click', function () { zoom(-1); }); }
    if (nowB) { nowB.addEventListener('click', function () { scroll.scrollTo({ left: scroll.scrollWidth, behavior: reduce ? 'auto' : 'smooth' }); }); }
    zb();
    var lastNarrow = narrowMQ.matches;
    var lastW = scroll.clientWidth, rt;
    window.addEventListener('resize', function () {
      clearTimeout(rt); rt = setTimeout(function () {
        if (narrowMQ.matches !== lastNarrow || (zi === 0 && Math.abs(scroll.clientWidth - lastW) > 30)) { lastNarrow = narrowMQ.matches; lastW = scroll.clientWidth; var l = scroll.scrollLeft; build(); scroll.scrollLeft = zi === 0 ? 0 : l; }
      }, 150);
    });
  }

  /* ---------------- start ---------------- */
  var m = /[#&]([el])=([\w-]+)/.exec(location.hash);
  if (m && ((m[1] === 'e' && evById[m[2]]) || (m[1] === 'l' && laneById[m[2]]))) { sel = { kind: m[1], id: m[2] }; rove = m[1] === 'e' ? m[2] : (laneById[m[2]].events[0] || {}).id || rove; }
  if (!evById[rove]) { rove = D.defaultId; }
  build(); bindControls(); renderPane();
  if (sel.kind === 'e' && evById[sel.id]) { reveal(dotEl[sel.id]); }
})();
