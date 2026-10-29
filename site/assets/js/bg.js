/* Page background: one of 17 designs, chosen at random for each browsing session.
   The choice is kept in sessionStorage, so it stays the same on every page of the site for as long as the tab is open,
   and a visitor who closes the tab and comes back later gets a new one. Loaded from <head> so there is no flash.
   Only the chosen design's stylesheet (assets/css/bg/N.css) is downloaded.
   To look at a particular one, open any page with #bg=N on the end, for example index.html#bg=7. */
(function () {
  var COUNT = 17, KEY = 'rj-bg', root = document.documentElement;
  function valid(v) { v = parseInt(v, 10); return v >= 1 && v <= COUNT ? v : 0; }
  function read() { try { return valid(window.sessionStorage.getItem(KEY)); } catch (e) { return 0; } }
  function write(v) { try { window.sessionStorage.setItem(KEY, String(v)); return true; } catch (e) { return false; } }
  var m = /(?:^|[#&])bg=(\d+)/.exec(location.hash), n = m ? valid(m[1]) : 0;
  if (n) { write(n); } else { n = read(); }
  if (!n) {
    n = 1 + Math.floor(Math.random() * COUNT);
    // If the browser will not keep session data, use a design that changes only once a day so pages still match each other.
    if (!write(n)) { n = 1 + (Math.floor(Date.now() / 86400000) * 7 + 3) % COUNT; }
  }
  root.setAttribute('data-bg', String(n));
  var s = document.currentScript, base = s && s.src ? s.src.replace(/js\/[^\/]*$/, '') : 'assets/';
  var href = base + 'css/bg/' + n + '.css';
  if (document.readyState === 'loading') {
    document.write('<link rel="stylesheet" href="' + href + '">');   // parser-inserted, so the page waits for it and never flashes
  } else {
    var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = href; document.head.appendChild(l);
  }
})();
