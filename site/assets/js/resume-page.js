/* Resume page: set how much each area matters; experience re-ranks and a radar shows the overlap. */
(function () {
  var RC = window.RC, D = RC.D, T = RC.T, KEYS = RC.KEYS, DEP = RC.DEP;
  var LEVEL = ['Not needed', 'Nice to have', 'Important', 'Critical'];
  var W = {}; KEYS.forEach(function (k) { W[k] = 0; });
  var rows = document.getElementById('rb-rows'), res = document.getElementById('rb-out'), radar = document.getElementById('rb-radar'), status = document.getElementById('rb-status');
  var pre = document.getElementById('rb-pre'), showAll = false;

  /* My depth, 1..5, scaled onto the radar's 0..3. */
  function strength(k) { return 3 * DEP[k].level / 5; }

  /* Controls */
  var inputs = {}, outs = {};
  KEYS.forEach(function (k) {
    var row = document.createElement('div'); row.className = 'rb-row';
    var id = 'rb-' + k;
    row.innerHTML = '<label for="' + id + '">' + RC.esc(T[k]) + '</label><output id="' + id + '-o" for="' + id + '">' + LEVEL[0] + '</output><div class="rb-mine-dp">' + RC.dotsFor(k) + '<span>My depth: ' + RC.esc(DEP[k].label) + '</span></div><input type="range" id="' + id + '" min="0" max="3" step="1" value="0" aria-valuetext="' + LEVEL[0] + '">';
    rows.appendChild(row);
    var inp = row.querySelector('input'), o = row.querySelector('output');
    inputs[k] = inp; outs[k] = o;
    inp.addEventListener('input', function () { W[k] = +inp.value; pre.value = ''; update(); });
  });
  D.presets.forEach(function (p) { var o = document.createElement('option'); o.value = p.id; o.textContent = p.label; pre.appendChild(o); });
  pre.addEventListener('change', function () {
    var p = D.presets.filter(function (x) { return x.id === pre.value; })[0];
    KEYS.forEach(function (k) { W[k] = 0; });
    if (p) { KEYS.forEach(function (k) { W[k] = p.w[k] || 0; }); }
    sync(); update();
  });
  document.getElementById('rb-reset').addEventListener('click', function () { KEYS.forEach(function (k) { W[k] = 0; }); pre.value = ''; showAll = false; sync(); update(); });
  function sync() { KEYS.forEach(function (k) { inputs[k].value = W[k]; inputs[k].setAttribute('aria-valuetext', LEVEL[W[k]]); outs[k].textContent = LEVEL[W[k]]; outs[k].className = 'l' + W[k]; }); }

  /* Radar */
  var NS = 'http://www.w3.org/2000/svg', C = 150, R = 100;
  function pt(i, v) { var a = -Math.PI / 2 + i * 2 * Math.PI / KEYS.length; return [C + R * v / 3 * Math.cos(a), C + R * v / 3 * Math.sin(a)]; }
  function poly(vals) { return vals.map(function (v, i) { return pt(i, v).join(','); }).join(' '); }
  function mk(n, a) { var e = document.createElementNS(NS, n); Object.keys(a).forEach(function (k) { e.setAttribute(k, a[k]); }); return e; }
  var wPoly, sPoly;
  (function buildRadar() {
    [1, 2, 3].forEach(function (r) { radar.appendChild(mk('polygon', { points: poly(KEYS.map(function () { return r; })), class: 'rb-ring' })); });
    KEYS.forEach(function (k, i) {
      var p = pt(i, 3); radar.appendChild(mk('line', { x1: C, y1: C, x2: p[0], y2: p[1], class: 'rb-ring' }));
      var l = pt(i, 3.4), t = mk('text', { x: l[0], y: l[1], class: 'rb-lab', 'text-anchor': l[0] < C - 8 ? 'end' : (l[0] > C + 8 ? 'start' : 'middle'), 'dominant-baseline': 'middle' });
      t.textContent = D.short[k]; radar.appendChild(t);
    });
    sPoly = mk('polygon', { points: poly(KEYS.map(strength)), class: 'rb-mine' }); radar.appendChild(sPoly);
    wPoly = mk('polygon', { points: poly(KEYS.map(function () { return 0; })), class: 'rb-want' }); radar.appendChild(wPoly);
  })();

  /* Plain-language fit check for the areas marked Important or Critical. */
  function fitHtml() {
    var need = KEYS.filter(function (k) { return W[k] >= 2; });
    if (!need.length) { return ''; }
    var deep = need.filter(function (k) { return DEP[k].level >= 4; }).length;
    var stale = need.filter(function (k) { return DEP[k].last !== 'now' && DEP[k].last <= 2022; });
    var h = '<div class="card rb-fit"><strong>' + (deep === need.length ? (need.length === 1 ? 'The area' : 'All ' + need.length + ' areas') + ' you marked Important or Critical' : deep + ' of the ' + need.length + ' areas you marked Important or Critical') + (need.length === 1 ? ' is one' : ' are ones') + ' where I have built it or set the method (Builder or Authority).</strong>';
    if (stale.length) {
      h += '<p class="mut">Not current: ' + stale.map(function (k) { return RC.esc(T[k]) + ' (' + (DEP[k].last === 'now' ? 'active' : 'last used ' + DEP[k].last) + ')'; }).join('; ') + '.</p>';
    }
    return h + '</div>';
  }

  function update() {
    KEYS.forEach(function (k) { outs[k].textContent = LEVEL[W[k]]; outs[k].className = 'l' + W[k]; inputs[k].setAttribute('aria-valuetext', LEVEL[W[k]]); });
    wPoly.setAttribute('points', poly(KEYS.map(function (k) { return W[k]; })));
    var any = KEYS.some(function (k) { return W[k] > 0; });
    var scored = RC.items.map(function (it) {
      var hits = it.tags.filter(function (t) { return W[t] > 0; });
      return { it: it, hits: hits, sc: RC.score(it, W) };
    });
    var html = '';
    if (!any) {
      status.textContent = 'Move any slider and my experience re-ranks around it.';
      html = RC.statsHtml(RC.pickStats({}, 4)) + RC.groupedRoles(scored);
    } else {
      var m = scored.filter(function (x) { return x.sc > 0; }).sort(function (a, b) { return b.sc - a.sc || a.it.order - b.it.order; });
      var top = m[0] ? m[0].sc : 1, limit = showAll ? m.length : 6;
      var strong = m.filter(function (x) { return x.hits.some(function (t) { return W[t] >= 2; }); });
      var roles = {}; (strong.length ? strong : m).forEach(function (x) { roles[x.it.ri] = 1; });
      status.textContent = strong.length
        ? strong.length + ' of ' + RC.items.length + ' highlights touch what you marked Important or Critical, from ' + Object.keys(roles).length + ' of ' + D.roles.length + ' roles. Strongest first.'
        : m.length + ' of ' + RC.items.length + ' highlights match, from ' + Object.keys(roles).length + ' of ' + D.roles.length + ' roles. Strongest first.';
      var wanted = KEYS.filter(function (k) { return W[k] >= 2; }).sort(function (a, b) { return W[b] - W[a] || DEP[b].level - DEP[a].level; }).slice(0, 5);
      html = RC.statsHtml(RC.pickStats(W, 4)) + fitHtml() + RC.depthPanel(wanted, 'How deep I go in what you marked Important or Critical');
      html += m.slice(0, limit).map(function (x) { return RC.evCard(x.it, x.hits, null, x.sc, top); }).join('');
      if (m.length > limit) { html += '<button type="button" class="btn ghost ro-showall" id="rb-more">Show the other ' + (m.length - limit) + ' matches</button>'; }
    }
    res.innerHTML = html; RC.applyBars(res);
    var more = document.getElementById('rb-more'); if (more) { more.addEventListener('click', function () { showAll = true; update(); }); }
    RC.HASH.set({ w: KEYS.filter(function (k) { return W[k]; }).map(function (k) { return k + ':' + W[k]; }).join(',') });
  }

  RC.mountStatic(); RC.printBtn('print');
  var g = RC.HASH.get().w; if (g) { g.split(',').forEach(function (p) { var kv = p.split(':'); if (T[kv[0]]) { W[kv[0]] = Math.max(0, Math.min(3, +kv[1] || 0)); } }); sync(); }
  update();
})();
