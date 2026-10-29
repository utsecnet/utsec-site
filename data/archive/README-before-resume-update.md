# Richard Johnson portfolio

```
site/     the public static website (upload this to R2)
worker/   a Cloudflare Worker that serves the site from R2 and handles the private contact form
```

Open `site/index.html` in a browser to preview everything except the contact form.

## Editing content
- **Resume:** edit `site/assets/js/resume-data.js`. Each bullet has `tags`; the page rebuilds itself. Use `**text**` to bold a metric.
- **Other pages:** plain HTML in `site/`.
- Nothing in `site/` contains your email address or phone number. Keep it that way.

## Deploy (one time)
Needs Node.js and a Cloudflare account with your domain on Cloudflare.

1. `cd worker` then `npx wrangler login`
2. Create the bucket: `npx wrangler r2 bucket create richard-johnson-site`
3. Upload the site: `.\upload-site.ps1` (PowerShell)
4. **Email:** in the Cloudflare dashboard, open your domain, then Email, then Email Routing. Enable it and add and verify your private inbox as a destination address.
5. In `wrangler.toml`, set `FROM_EMAIL` to an address on that domain (for example `site@yourdomain.com`) and uncomment the `routes` line with your domain.
6. **Spam protection (recommended):** create a free Turnstile widget, paste its *site key* into `site/contact.html` (the `data-sitekey` attribute), then re-upload that page.
7. Store the private values as secrets (they never appear in code):
   ```
   npx wrangler secret put TO_EMAIL          # your private inbox address
   npx wrangler secret put TURNSTILE_SECRET  # from the Turnstile widget
   ```
8. `npx wrangler deploy`

After a content change, re-run `.\upload-site.ps1`. HTML is cached for 5 minutes and other files for a day.

## How the contact form stays private
The browser posts to `/api/contact` on your own domain. The Worker validates the message, checks a hidden honeypot field and Turnstile, and emails it using the `TO_EMAIL` secret. The address is not in the HTML, JavaScript, or Git.

## Not yet tested
The Worker has not been run against a live Cloudflare account. Send yourself a test message after deploying.

## Experience page (timeline)
- `site/experience.html` renders an interactive career timeline (replaces the old Projects page; `projects.html` now redirects).
- Edit your history in `site/assets/js/timeline-data.js`: each organization is a lane, each project/achievement/cert/degree is an event.
- Events marked `approx: true` have estimated dates. Please confirm them and remove the flag.
