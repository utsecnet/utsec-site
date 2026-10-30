/* Renders og-card.html (the link-preview image) to ../../site/assets/img/og-card.jpg.
 * Needs the playwright package:  npm i playwright   then   node render-og.js   (run from this folder) */
const { chromium } = require('playwright'); const path = require('path');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  await p.goto('file://' + path.resolve(__dirname, 'og-card.html')); await p.waitForTimeout(400);
  await p.screenshot({ path: path.resolve(__dirname, '..', '..', 'site', 'assets', 'img', 'og-card.jpg'), type: 'jpeg', quality: 86 });
  await b.close();
})();
