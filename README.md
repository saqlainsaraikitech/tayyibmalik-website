# Tayyib Malik & Co. — React Website (Redesign v1)

Full redesign of tayyibmalik.co in **React 19 + Vite + React Router**, built from the
live WordPress site's own content. Same data, same photos, same brand colors
(navy `#0B1C2D`, footer `#1A2632`, gold `#C9A14A` / `#D4AF37` / `#DF9A2B`) and same
fonts (Playfair Display headings, Open Sans body).

## Pages (7)

Home `/`, About `/about`, Practice Area `/practice-area`, Our Team `/our-team`,
About Tayyib Malik `/about-tayyib-malik`, Pro Bono Services `/pro-bono-services`,
Contact `/contact`. Old WordPress-style links (`/about/`) redirect to the
no-slash form; `/pro-bono/` redirects to `/pro-bono-services`.

## Develop

```bash
npm install
npm run dev      # local preview at http://localhost:5173
npm run build    # production build -> dist/
npm run preview  # serve the production build locally
```

## Upload to Hostinger (public_html)

1. **Back up the WordPress site first** (files + database) — keep the backup.
2. Upload the contents of `dist/` (after `npm run build`) into `public_html`
   — `index.html`, `assets/`, `images/`, `robots.txt`, `sitemap.xml` and the
   hidden `.htaccess` file. Make sure hidden files are shown in File Manager
   so `.htaccess` is actually uploaded: without it, only the home page loads.
3. The `.htaccess` serves `index.html` for every route (SPA fallback) and
   redirects the old `/pro-bono/` link. No Node.js hosting is needed — the
   built files are plain static files.

## Preview on your own PC (before uploading)

Do NOT open `index.html` by double-clicking it — browsers block React apps
opened straight from disk, so the page stays blank. Instead:

- **Windows:** unzip anywhere on your PC and double-click `PREVIEW.bat`. It serves
  the site and opens http://localhost:3000 in your browser. Requires Node.js.
- **Any computer:** inside the built folder, run `npx serve -s .` (or
  `python -m http.server 8000`, then open http://localhost:8000 — note the
  Python server does not fall back to the home page on refresh for inner
  routes, so prefer `npx serve -s`).

On Hostinger the site works normally once uploaded — no server setup needed.

## Notes

- Forms (appointment + newsletter) have no backend: they open the visitor's
  email app addressed to info@tayyibmalik.co. Connect FormSubmit/Formspree
  later if direct inbox delivery is wanted.
- Content lives in `src/data.js` — one place to edit text, team, practices.
- Counters (1,364+ / 1,450+ / 95%) are the rendered values from the live
  site; confirm with the client.
- Iqra Naz has no photo on the live site — her card uses a gold "IN"
  monogram. Swap in a real photo in `src/data.js` + `public/images/` when
  available.
- The live site's social icons linked nowhere, so none are included.
