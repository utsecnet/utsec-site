/* Project screenshot rows: arrow buttons scroll the row; a tap opens a viewer with caption and prev/next. */
(function () {
  var dlg = document.getElementById('shot-box');
  var big = dlg && dlg.querySelector('img'), capT = dlg && dlg.querySelector('.sb-t'), capD = dlg && dlg.querySelector('.sb-d');
  var bp = dlg && dlg.querySelector('.sb-prev'), bn = dlg && dlg.querySelector('.sb-next');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var set = [], cur = 0;
  function show(i) {
    cur = (i + set.length) % set.length;
    var s = set[cur], im = s.querySelector('img'), fc = s.parentNode.querySelector('figcaption');
    var t = fc && fc.querySelector('strong'), d = fc && fc.querySelector('span');
    big.src = im.currentSrc || im.src; big.alt = im.alt;
    capT.textContent = t ? t.textContent : ''; capD.textContent = d ? d.textContent : '';
    bp.hidden = bn.hidden = set.length < 2;
  }
  Array.prototype.forEach.call(document.querySelectorAll('.pd-shots'), function (box) {
    var row = box.querySelector('.shots'), prev = box.querySelector('[data-dir="-1"]'), next = box.querySelector('[data-dir="1"]'), cnt = box.querySelector('.shot-count');
    var figs = row.querySelectorAll('figure'), shots = Array.prototype.slice.call(row.querySelectorAll('.shot'));
    function upd() {
      var max = row.scrollWidth - row.clientWidth;
      prev.disabled = row.scrollLeft <= 2; next.disabled = row.scrollLeft >= max - 2;
      var idx = 1, i; for (i = 0; i < figs.length; i++) { if (figs[i].offsetLeft - row.offsetLeft <= row.scrollLeft + 20) { idx = i + 1; } }
      if (cnt) { cnt.textContent = idx + ' / ' + figs.length; }
    }
    [prev, next].forEach(function (b) {
      b.addEventListener('click', function () { row.scrollBy({ left: +b.getAttribute('data-dir') * row.clientWidth * 0.8, behavior: reduce ? 'auto' : 'smooth' }); });
    });
    row.addEventListener('scroll', function () { window.requestAnimationFrame(upd); }, { passive: true });
    window.addEventListener('resize', upd); upd();
    shots.forEach(function (s, n) {
      s.addEventListener('click', function () {
        if (!dlg || typeof dlg.showModal !== 'function') { return; }
        set = shots; show(n); dlg.showModal();
      });
    });
  });
  if (dlg) {
    bp.addEventListener('click', function (e) { e.stopPropagation(); show(cur - 1); });
    bn.addEventListener('click', function (e) { e.stopPropagation(); show(cur + 1); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg || e.target === big) { dlg.close(); } });
    dlg.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(cur - 1); } else if (e.key === 'ArrowRight') { e.preventDefault(); show(cur + 1); }
    });
    dlg.addEventListener('close', function () { if (set[cur]) { set[cur].scrollIntoView({ block: 'nearest', inline: 'nearest' }); set[cur].focus(); } });
  }
})();
