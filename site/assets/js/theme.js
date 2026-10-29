/* Theme: "dark" (default Neon Sunset) or "darker". Applied early from <head> so there is no flash. */
(function () {
  var KEY = 'rj-theme', root = document.documentElement, cur = 'dark';
  try { if (localStorage.getItem(KEY) === 'darker') { cur = 'darker'; } } catch (e) {}
  function apply(t) {
    cur = t === 'darker' ? 'darker' : 'dark';
    if (cur === 'darker') { root.setAttribute('data-theme', 'darker'); } else { root.removeAttribute('data-theme'); }
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) { m.setAttribute('content', cur === 'darker' ? '#020106' : '#1a0b2e'); }
    Array.prototype.forEach.call(document.querySelectorAll('.theme button'), function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-theme') === cur));
    });
  }
  apply(cur);
  document.addEventListener('DOMContentLoaded', function () {
    apply(cur);
    Array.prototype.forEach.call(document.querySelectorAll('.theme button'), function (b) {
      b.addEventListener('click', function () {
        apply(b.getAttribute('data-theme'));
        try { localStorage.setItem(KEY, cur); } catch (e) {}
      });
    });
  });
})();
