/* Dynamic resume: pick a role and/or what you value; matching experience rises to the top. */
(function () {
  var D = window.RESUME, TAGS = D.tags;
  var sel = {};            // selected tag keys
  var showAll = false;
  var presetBox = document.getElementById('presets'), tagBox = document.getElementById('tagchips');
  var out = document.getElementById('roles'), status = document.getElementById('status');
  var showAllEl = document.getElementById('showall'), clearBtn = document.getElementById('clear');
  var activePreset = null;

  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function fmt(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'); }

  function chip(label, pressed, onclick) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'chip'; b.textContent = label;
    b.setAttribute('aria-pressed', pressed ? 'true' : 'false');
    b.addEventListener('click', onclick);
    return b;
  }

  function buildControls() {
    D.presets.forEach(function (p) {
      var b = chip(p.label, false, function () {
        if (activePreset === p.id) { activePreset = null; sel = {}; }
        else { activePreset = p.id; sel = {}; p.tags.forEach(function (t) { sel[t] = 1; }); }
        sync();
      });
      b.dataset.id = p.id; presetBox.appendChild(b);
    });
    Object.keys(TAGS).forEach(function (k) {
      var b = chip(TAGS[k], false, function () {
        if (sel[k]) delete sel[k]; else sel[k] = 1;
        activePreset = null; sync();
      });
      b.dataset.id = k; tagBox.appendChild(b);
    });
  }

  function sync() {
    [].forEach.call(presetBox.children, function (b) { b.setAttribute('aria-pressed', b.dataset.id === activePreset ? 'true' : 'false'); });
    [].forEach.call(tagBox.children, function (b) { b.setAttribute('aria-pressed', sel[b.dataset.id] ? 'true' : 'false'); });
    render();
    try {
      var keys = Object.keys(sel);
      history.replaceState(null, '', keys.length ? '#v=' + keys.join(',') : location.pathname + location.search);
    } catch (e) { /* file:// or sandboxed: ignore */ }
  }

  function render() {
    var keys = Object.keys(sel), filtering = keys.length > 0;
    var shown = 0, total = 0, html = '';
    D.roles.forEach(function (r) {
      var items = r.bullets.map(function (b, i) {
        var hits = filtering ? b.tags.filter(function (t) { return sel[t]; }) : [];
        return { b: b, i: i, hits: hits, score: hits.length };
      });
      total += items.length;
      var visible;
      if (!filtering) { visible = items; }
      else {
        items.sort(function (a, c) { return c.score - a.score || a.i - c.i; });
        visible = showAll ? items : items.filter(function (x) { return x.score > 0; });
      }
      var matched = items.filter(function (x) { return x.score > 0; }).length;
      shown += filtering ? matched : items.length;
      if (!visible.length) { return; }
      html += '<article class="role card"><header><div><h3>' + esc(r.title) + '</h3><div class="org">' + esc(r.org) + '</div></div><div class="dates">' + esc(r.dates) + '</div></header><ul>';
      visible.forEach(function (x) {
        var dim = filtering && x.score === 0 ? ' class="dim"' : '';
        var tg = x.hits.length ? '<span class="tg">' + x.hits.map(function (t) { return '<span>' + esc(TAGS[t]) + '</span>'; }).join('') + '</span>' : '';
        html += '<li' + dim + '>' + fmt(x.b.t) + tg + '</li>';
      });
      html += '</ul></article>';
    });
    out.innerHTML = html || '<p class="mut">No experience matches that combination. Try removing a filter.</p>';
    status.textContent = filtering ? shown + ' of ' + total + ' highlights match what you value' : 'Showing the full resume (' + total + ' highlights)';
  }

  function renderStatic() {
    document.getElementById('summary').textContent = D.summary;
    document.getElementById('areas').innerHTML = D.keyAreas.map(function (a) { return '<span class="pill">' + esc(a) + '</span>'; }).join('');
    document.getElementById('edu').innerHTML = D.education.map(function (e) { return '<li><span>' + esc(e[0]) + '</span><span>' + esc(e[1]) + '</span></li>'; }).join('');
  }

  function fromHash() {
    var m = /[#&]v=([a-z,]+)/.exec(location.hash);
    if (!m) return;
    m[1].split(',').forEach(function (k) { if (TAGS[k]) sel[k] = 1; });
  }

  buildControls(); renderStatic(); fromHash();
  showAllEl.addEventListener('change', function () { showAll = showAllEl.checked; render(); });
  clearBtn.addEventListener('click', function () { sel = {}; activePreset = null; showAll = false; showAllEl.checked = false; sync(); });
  document.getElementById('print').addEventListener('click', function () { window.print(); });
  sync();
})();
