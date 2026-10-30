/*
 * Writes the plain-HTML text versions of the Resume and Experience pages (for search engines and visitors
 * without JavaScript). Visitors with JavaScript never see them (CSS hides them), but crawlers that do not run
 * scripts read them. They are generated from the same data the interactive pages use, so they cannot drift.
 *
 * Run from this folder after changing either data file:
 *     node build-resume-data.js        (only if you edited experience-profile.js)
 *     node build-static-summaries.js
 * Reads  ../site/assets/js/resume-data-v2.js and ../site/assets/js/timeline-data.js
 * Writes between the <!-- static:start --> and <!-- static:end --> markers in ../site/resume.html and ../site/experience.html
 */
const fs = require('fs'), path = require('path');
global.window = {};
const SITE = path.join(__dirname, '..', 'site');
require(path.join(SITE, 'assets', 'js', 'resume-data-v2.js'));
require(path.join(SITE, 'assets', 'js', 'timeline-data.js'));
const R = window.RESUME, T = window.TIMELINE;

const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// resume bullets use **text** for bold metrics
const rich = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const ym = (d, approx) => {
  if (!d) return '';
  const [y, m] = String(d).split('-');
  return (m && !approx) ? MON[+m - 1] + ' ' + y : y;
};
const span = (a, b) => (a ? ym(a) : '') + (a || b ? ' – ' : '') + (b ? ym(b) : (a ? 'Present' : ''));

function resumeHtml() {
  const o = [];
  o.push('<h2>Resume summary</h2>');
  o.push('<p>' + esc(R.summary) + '</p>');
  o.push('<h3>Key areas</h3><ul>' + R.keyAreas.map(a => '<li>' + esc(a) + '</li>').join('') + '</ul>');
  o.push('<h3>Experience</h3>');
  R.roles.forEach(r => {
    o.push('<h4>' + esc(r.title) + ', ' + esc(r.org) + '</h4>');
    o.push('<p class="meta">' + esc(r.dates) + ' · ' + esc(r.sector) + '</p>');
    const top = (r.bullets || []).filter(b => b.top).slice(0, 5);
    if (top.length) { o.push('<ul>' + top.map(b => '<li>' + rich(b.t) + '</li>').join('') + '</ul>'); }
  });
  o.push('<h3>Selected results</h3><ul>' + R.stats.map(s => '<li><strong>' + esc(s.big + (s.unit ? ' ' + s.unit : '')) + '</strong> ' + esc(s.label) + '</li>').join('') + '</ul>');
  o.push('<h3>Education and training</h3><ul>' + R.education.map(e => '<li>' + esc(e[0]) + ' (' + esc(e[1]) + ')</li>').join('') + '</ul>');
  return o.join('\n');
}

function experienceHtml() {
  const o = [];
  o.push('<h2>Career timeline (text version)</h2>');
  T.lanes.forEach(l => {
    const dates = span(l.from, l.to);
    o.push('<h3>' + esc(l.org) + (l.role ? ': ' + esc(l.role) : '') + '</h3>');
    o.push('<p class="meta">' + [dates, l.sector].filter(Boolean).map(esc).join(' · ') + '</p>');
    if (l.summary) { o.push('<p>' + esc(l.summary) + '</p>'); }
    if (l.points && l.points.length) { o.push('<ul>' + l.points.map(p => '<li>' + esc(p) + '</li>').join('') + '</ul>'); }
    const ev = T.events.filter(e => e.lane === l.id).sort((a, b) => String(b.date).localeCompare(String(a.date)));
    if (ev.length) {
      o.push('<ul>' + ev.map(e => {
        const body = e.result || e.summary || e.challenge || '';
        return '<li><strong>' + esc(e.title) + '</strong> (' + esc(ym(e.date, e.approx)) + ')' + (body ? ': ' + esc(body) : '') + '</li>';
      }).join('') + '</ul>');
    }
  });
  return o.join('\n');
}

function inject(file, html) {
  const p = path.join(SITE, file);
  let s = fs.readFileSync(p, 'utf8');
  const re = /<!-- static:start -->[\s\S]*?<!-- static:end -->/;
  if (!re.test(s)) { throw new Error(file + ' is missing the <!-- static:start --> / <!-- static:end --> markers'); }
  s = s.replace(re, () => '<!-- static:start -->\n' + html + '\n<!-- static:end -->');
  fs.writeFileSync(p, s);
  console.log('updated', file, '(' + html.length + ' characters)');
}

inject('resume.html', resumeHtml());
inject('experience.html', experienceHtml());
