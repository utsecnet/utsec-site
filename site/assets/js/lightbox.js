/* Click the family photo to view it larger. Esc, the Close button, or a click anywhere closes it. */
(function () {
  var btn = document.querySelector('.zoom'), dlg = document.getElementById('lightbox');
  if (!btn || !dlg || typeof dlg.showModal !== 'function') { return; }
  var big = dlg.querySelector('img');
  btn.addEventListener('click', function () {
    var src = btn.querySelector('img');
    big.src = src.currentSrc || src.src;
    big.alt = src.alt;
    dlg.showModal();
  });
  dlg.addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('close', function () { btn.focus(); });
})();
