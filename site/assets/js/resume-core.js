/* Shared helpers for the resume concepts. Reads window.RESUME (resume-data-v2.js). */
(function () {
  var D = window.RESUME, T = D.tags, KEYS = Object.keys(T), DEP = D.depth, VERB = D.verb;

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function fmt(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'); }
  function plain(s) { return String(s).replace(/\*\*/g, ''); }

  /* Flat list of every highlight, newest role first (data order). */
  var items = [];
  D.roles.forEach(function (r, ri) {
    r.bullets.forEach(function (b, bi) {
      items.push({ id: ri + '.' + bi, ri: ri, bi: bi, order: items.length, role: r, b: b, tags: b.tags, top: !!b.top, vr: VERB[b.v] || 1 });
    });
  });

  function shortName(ri) { return D.roleShort[ri] || D.roles[ri].org; }

  /* How the highlight ranks for a set of weights {area: 0..3}: matching areas, then signature results, then how hands-on I was. */
  function score(it, W) {
    var s = 0; it.tags.forEach(function (t) { s += (W[t] || 0); });
    return s > 0 ? s + (it.top ? 0.6 : 0) + it.vr * 0.12 : 0;
  }

  /* Headline numbers. Each one is already stated in a highlight; tags say when it is relevant. */
  var STATS = D.stats;
  function pickStats(weights, n) {
    var ranked = STATS.map(function (s, i) {
      var sc = 0; s.tags.forEach(function (t) { sc += (weights[t] || 0); });
      return { s: s, sc: sc, i: i };
    }).sort(function (a, b) { return b.sc - a.sc || a.i - b.i; });
    var any = ranked.some(function (x) { return x.sc > 0; });
    return ranked.filter(function (x) { return !any || x.sc > 0; }).slice(0, n).map(function (x) { return x.s; });
  }
  function statsHtml(list) {
    return '<div class="ro-stats">' + list.map(function (s) {
      return '<div class="ro-stat"><div class="ro-big">' + esc(s.big) + (s.unit ? '<small> ' + esc(s.unit) + '</small>' : '') + '</div><div class="ro-lab">' + esc(s.label) + '</div></div>';
    }).join('') + '</div>';
  }

  /* Depth: five dots, filled up to my rating for the area. */
  function dots(level, label) {
    var h = '<span class="dp" role="img" aria-label="Depth ' + level + ' of 5: ' + esc(label) + '">';
    for (var i = 1; i <= 5; i++) { h += '<i' + (i <= level ? ' class="on"' : '') + '></i>'; }
    return h + '</span>';
  }
  function dotsFor(k) { var d = DEP[k]; return dots(d.level, d.label); }
  function lastUsed(d) { return d.last === 'now' ? 'active now' : 'last used ' + d.last; }
  /* One block per area: rating, where it comes from, and the reason for the rating. */
  function depthPanel(keys, title) {
    if (!keys.length) { return ''; }
    var h = '<section class="card ro-depth"><h3>' + esc(title || 'How deep I go') + '</h3><ul>';
    keys.forEach(function (k) {
      var d = DEP[k];
      h += '<li><div class="dp-h"><strong>' + esc(T[k]) + '</strong>' + dots(d.level, d.label) + '<span class="dp-l">' + esc(d.label) + '</span></div>' +
        '<div class="dp-m">Since ' + d.since + ' · ' + d.employers + ' employer' + (d.employers === 1 ? '' : 's') + ' · ' + esc(lastUsed(d)) + '</div>' +
        '<p>' + esc(d.why) + '</p></li>';
    });
    return h + '</ul></section>';
  }

  /* Compact list: area, dots, rating. */
  function depthGrid(keys) {
    return '<ul class="ro-dgrid">' + keys.map(function (k) {
      var d = DEP[k]; return '<li><span>' + esc(T[k]) + '</span>' + dots(d.level, d.label) + '<em>' + esc(d.label) + '</em></li>';
    }).join('') + '</ul>';
  }
  function byDepth() { return KEYS.slice().sort(function (a, b) { return DEP[b].level - DEP[a].level || KEYS.indexOf(a) - KEYS.indexOf(b); }); }

  var VLAB = { used: 'Used', advised: 'Advised', operated: 'Operated', wrote: 'Wrote it', taught: 'Taught', led: 'Led', built: 'Built', owned: 'Owned', method: 'Set the method' };
  function tagChips(list, it) {
    var h = '';
    if (it) { h += '<span class="vb' + (it.top ? ' top' : '') + '">' + (it.top ? 'Signature · ' : '') + esc(VLAB[it.b.v] || '') + '</span>'; }
    if (list.length) { h += list.map(function (t) { return '<span>' + esc(T[t]) + '</span>'; }).join(''); }
    return h ? '<span class="tg">' + h + '</span>' : '';
  }
  function bulletLi(it, hits, dim, textHtml) {
    return '<li' + (dim ? ' class="dim"' : '') + '>' + (textHtml || fmt(it.b.t)) + tagChips(hits || [], dim ? null : it) + '</li>';
  }
  /* Same markup as the live resume page, so the site CSS applies. */
  function roleCard(ri, shown, rest) {
    var r = D.roles[ri];
    var note = [r.lead && r.lead.note, r.note].filter(Boolean).map(function (x) { return /[.!?]$/.test(x) ? x : x + '.'; }).join(' ');
    var h = '<article class="role card"><header><div><h3>' + esc(r.title) + '</h3><div class="org">' + esc(r.org) + '</div></div><div class="dates">' + esc(r.dates) + '</div></header>' +
      (note ? '<p class="ro-lead">' + esc(note) + '</p>' : '') + '<ul>';
    shown.forEach(function (x) { h += bulletLi(x.it, x.hits, false, x.html); });
    h += '</ul>';
    if (rest && rest.length) {
      h += '<details class="ro-more"><summary>' + rest.length + ' more highlight' + (rest.length > 1 ? 's' : '') + ' from this role</summary><ul>';
      rest.forEach(function (x) { h += bulletLi(x.it, [], true); });
      h += '</ul></details>';
    }
    return h + '</article>';
  }
  /* entries: [{it, hits, html?}] already ordered. Groups by role, newest first. */
  function groupedRoles(entries, restEntries) {
    var by = {}; entries.forEach(function (e) { (by[e.it.ri] = by[e.it.ri] || []).push(e); });
    var rest = {}; (restEntries || []).forEach(function (e) { (rest[e.it.ri] = rest[e.it.ri] || []).push(e); });
    var out = '';
    D.roles.forEach(function (r, ri) { if (by[ri]) { out += roleCard(ri, by[ri], rest[ri]); } });
    return out;
  }
  /* Evidence card used by the ranked (flat) views. */
  function evCard(it, hits, html, score, max) {
    var bar = (score != null && max) ? '<div class="ro-bar" data-w="' + Math.round(100 * score / max) + '"></div>' : '';
    return '<article class="ro-ev card' + (it.top ? ' top' : '') + '"><div class="ro-ev-h"><span>' + esc(shortName(it.ri)) + '</span><span>' + esc(it.role.title) + '</span><span>' + esc(it.role.dates) + '</span></div><p>' + (html || fmt(it.b.t)) + '</p>' + tagChips(hits || [], it) + bar + '</article>';
  }
  function applyBars(root) {
    [].forEach.call(root.querySelectorAll('.ro-bar[data-w]'), function (b) { b.style.setProperty('--w', b.getAttribute('data-w') + '%'); });
  }

  function frameworksCard() {
    return '<article class="card ro-fullres"><h3>Frameworks, and how I have used each</h3><ul class="ro-fw">' +
      D.frameworks.map(function (f) { return '<li><strong>' + esc(f.name) + '</strong><span>' + esc(f.level) + (f.where ? ' · ' + esc(f.where) : '') + '</span></li>'; }).join('') + '</ul></article>';
  }
  function toolsCard() {
    return '<article class="card ro-fullres"><h3>Tools I have run</h3><p class="ro-tl">' +
      D.tools.map(function (t) { return '<span class="pill">' + esc(t.n) + (t.y ? ' · ' + t.y + ' yrs' : '') + '</span>'; }).join('') + '</p></article>';
  }
  function scaleLegend() {
    return '<details class="ro-scale"><summary>How I rate my depth</summary><ol>' +
      D.scale.map(function (s) { return '<li>' + dots(s[0], s[1]) + '<strong>' + esc(s[1]) + '</strong><span>' + esc(s[2]) + '</span></li>'; }).join('') + '</ol></details>';
  }

  function mountStatic() {
    var s = document.getElementById('summary'); if (s && !s.hasAttribute('data-keep')) { s.textContent = D.summary; }
    var a = document.getElementById('areas'); if (a) {
      a.innerHTML = a.hasAttribute('data-keep') ? '' : D.keyAreas.map(function (x) { return '<span class="pill">' + esc(x) + '</span>'; }).join('');
      a.insertAdjacentHTML('afterend', scaleLegend());
    }
    var e = document.getElementById('edu'); if (e) { e.innerHTML = D.education.map(function (x) { return '<li><span>' + esc(x[0]) + '</span><span>' + esc(x[1]) + '</span></li>'; }).join(''); }
    var fr = document.querySelector('.ro-fullres'); if (fr) { fr.insertAdjacentHTML('beforebegin', frameworksCard() + toolsCard()); }
  }

  var HASH = {
    get: function () { var o = {}; location.hash.replace(/^#/, '').split('&').forEach(function (p) { if (p) { var kv = p.split('='); o[kv[0]] = decodeURIComponent(kv[1] || ''); } }); return o; },
    set: function (o) {
      try {
        var s = Object.keys(o).filter(function (k) { return o[k] !== '' && o[k] != null; }).map(function (k) { return k + '=' + encodeURIComponent(o[k]); }).join('&');
        history.replaceState(null, '', s ? '#' + s : location.pathname + location.search);
      } catch (e) { /* file:// or sandboxed */ }
    }
  };

  /* Concept switcher (review aid only; remove when one is chosen). */
  var CONCEPTS = [['b', 'B', 'Dial it in'], ['c', 'C', 'Career matrix'], ['d', 'D', 'Paste the job'], ['f', 'F', 'Follow a skill'], ['g', 'G', 'The arc'], ['h', 'H', 'My brief'], ['i', 'I', 'Results ledger'], ['j', 'J', 'Level check']];
  function switcher(cur) {
    var main = document.getElementById('main'); if (!main) { return; }
    var nav = document.createElement('nav'); nav.className = 'ro-switch'; nav.setAttribute('aria-label', 'Resume concepts');
    var h = '<div class="wrap"><span>Resume concepts</span>';
    CONCEPTS.forEach(function (c) {
      h += '<a href="resume-' + c[0] + '.html"' + (c[0] === cur ? ' aria-current="true"' : '') + '><b>' + c[1] + '</b> ' + c[2] + '</a>';
    });
    h += '<a class="old" href="resume.html">Current page</a></div>';
    nav.innerHTML = h; main.insertBefore(nav, main.firstChild);
  }
  function printBtn(id) { var b = document.getElementById(id); if (b) { b.addEventListener('click', function () { window.print(); }); } }

  window.RC = { VLAB: VLAB, D: D, T: T, KEYS: KEYS, DEP: DEP, items: items, esc: esc, fmt: fmt, plain: plain, shortName: shortName, score: score, STATS: STATS, pickStats: pickStats, statsHtml: statsHtml,
    dots: dots, dotsFor: dotsFor, depthPanel: depthPanel, depthGrid: depthGrid, byDepth: byDepth, tagChips: tagChips, bulletLi: bulletLi, roleCard: roleCard, groupedRoles: groupedRoles, evCard: evCard, applyBars: applyBars,
    mountStatic: mountStatic, HASH: HASH, switcher: switcher, printBtn: printBtn };
})();
