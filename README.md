# Richard Johnson portfolio

```
site/   the public static website (published on Cloudflare Pages at www.utsec.net)
data/   source data and build scripts for the Resume page
```

Open `site/index.html` in a browser to preview the whole site.

## Editing content
- **Resume:** the Resume page reads `site/assets/js/resume-data-v2.js`, which is generated. Edit `data/experience-profile.js` (roles, depth ratings, evidence) and then run `cd data` and `node build-resume-data.js`, then `node build-static-summaries.js` (see Search engines below). Use `**text**` to bold a metric. Keep phone, email and clearance details out of both files. The starting levels in the Resume page's role menu come from `data/role-research.js` (scores per source, written up in `data/role-research.md`); change a score there, run `node role-research.js`, and copy the levels into `targets` in `experience-profile.js`.
- **Older resume versions:** the previous Resume page is saved in `data/archive/`.
- **Other pages:** plain HTML in `site/`.
- **Contact page:** links to LinkedIn and GitHub only. There is no form and no email address anywhere in `site/`. Keep it that way.

## Publishing
The site is a Cloudflare Pages project named `utsec-site` (direct upload, no build step) with `www.utsec.net` as its custom domain.

1. Zip the contents of `site/` (the files themselves, not the folder around them). The zip must include `_headers`.
2. In the Cloudflare dashboard open Workers & Pages, then `utsec-site`, then Create deployment, and upload the zip.

What Pages does for this site: serves `index.html` at `/`, serves `404.html` for unknown addresses, serves `/resume` for `resume.html`, and applies `site/_headers` (security headers and a strict Content Security Policy). Because of that policy, pages may only load scripts and styles from their own files: no inline scripts, no inline styles, no outside resources.

## Search engines (SEO)
- **Head tags:** every page has a title, description, canonical address (`https://www.utsec.net/...`), Open Graph and Twitter tags. The home page also carries JSON-LD `Person`/`WebSite`/`ProfilePage` data (name, public profile links, schools, credentials; no email or phone). JSON-LD is a data block, so it does not conflict with the no-inline-scripts rule.
- **Text versions:** the Resume and Experience pages are built by JavaScript, so each also holds a plain-HTML copy between `<!-- static:start -->` and `<!-- static:end -->` for crawlers and visitors without scripts. It is hidden once scripts run. Never edit between the markers by hand: after changing `experience-profile.js` (then `node build-resume-data.js`) or `timeline-data.js`, run `cd data` and `node build-static-summaries.js`.
- **Sitemap and robots:** `site/sitemap.xml` lists the five pages; update its `lastmod` dates when you publish real content changes. `site/robots.txt` allows everything and points to the sitemap.
- **Share image and icons:** `site/assets/img/og-card.jpg` (1200x630) is the link preview; its source is `data/seo/og-card.html` (`node render-og.js` in that folder re-renders it; needs the `playwright` package). `favicon.ico`, `icon.svg` and `apple-touch-icon.png` sit at the site root.
- **Headers:** `site/_headers` also marks the `*.pages.dev` addresses `noindex` (only www.utsec.net should rank) and caches `/assets/img/*` for 30 days. If you replace an image, give the new file a new name.
- **After publishing:** use the URL Inspection tool in Google Search Console and Bing Webmaster Tools to request indexing of new pages.

## Experience page (timeline)
- `site/experience.html` renders an interactive career timeline (`projects.html` is the Projects page).
- Edit your history in `site/assets/js/timeline-data.js`: each organization is a lane, each project/achievement/cert/degree is an event.
- Events marked `approx: true` have estimated dates. Please confirm them and remove the flag.

## Page backgrounds
- Each visit gets one of 17 background designs at random, kept for the whole browser tab session (a new tab or a later visit gets a new one). `site/assets/js/bg.js` picks it, and only that design's file, `site/assets/css/bg/N.css`, is downloaded. Shared rules are in `site/assets/css/backgrounds.css`.
- To look at a particular design, add `#bg=N` to any page address, for example `index.html#bg=7`. The number sticks for that tab.
- To add or remove a design: edit the files in `site/assets/css/bg/` and change `COUNT` at the top of `bg.js` (designs must be numbered 1 to COUNT with no gaps).

## Local-only folders
`retired-concepts/`, `retired-bg-preview/` and `retired-worker/` hold old experiments and the former Worker-based setup. Git ignores them and nothing uses them, so they are safe to delete.
