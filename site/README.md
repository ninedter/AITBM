# AITBM Website

Static introduction site for the **AI Trust Benchmarking and Maturity Framework (AITBM)**.

**Date:** 2026-06-02
**Purpose:** Public-facing launch site introducing AITBM, its three-layer architecture, the gap analysis, and project resources
**Status:** Initial build

---

## Structure

| Path | Purpose |
|------|---------|
| `index.html` | Overview / landing page |
| `framework.html` | Three-layer architecture, 21 sub-metrics, Cn-5 rubric, ERS and tiers |
| `gap-analysis.html` | Twelve structural gaps and 2025–2026 evidence |
| `resources.html` | Documentation, standards alignment, project information |
| `404.html` | Styled not-found page |
| `robots.txt` | Crawler directives (allow all) |
| `assets/favicon.svg` | Site icon (navy "AI" monogram) |
| `assets/css/site.css` | Shared styles layered on Tailwind |
| `assets/js/site.js` | Mobile navigation and footer year |
| `.nojekyll` | Disables Jekyll processing on GitHub Pages |

The site is fully **static and host-agnostic** — every path is relative, so the `site/`
directory can be served as-is from GitHub Pages, Netlify, Cloudflare Pages, a GoDaddy/static
host, or any web server, with no build step.

## Tech

- Hand-written static HTML with [Tailwind CSS](https://tailwindcss.com/) via the Play CDN — **no build step**.
- Brand palette: `#1F3864` (navy), `#2E5090` (navy-light), `#555555` (muted body text).
- Typography: Arial-forward sans-serif stack, matching the AITBM document standard.

## Local preview

Serve the folder over HTTP (the Tailwind CDN and relative assets need a server, not `file://`):

```bash
cd site
python3 -m http.server 8080
# open http://localhost:8080
```

### Run in Docker

A `Dockerfile` (nginx) and `docker-compose.yml` are included for a production-like local run:

```bash
cd site
docker compose up --build
# open http://localhost:8080   (Ctrl+C to stop, or: docker compose down)
```

Or without compose:

```bash
cd site
docker build -t aitbm-site:local .
docker run --rm -p 8080:80 aitbm-site:local
```

The nginx config serves the styled `404.html` for unknown routes and sets basic security
headers. If your network blocks Docker Hub, see the mirror note in the `Dockerfile`.

## Deployment

The site is host-agnostic and ships with no deployment automation. To publish, upload the
contents of `site/` to any static host or custom domain (e.g. GoDaddy, Netlify, Cloudflare
Pages, or a plain web server). No build step is required.

## Before launching on a custom domain

1. In each page's `<head>`, set the absolute `og:url` and `og:image`, and add a
   `<link rel="canonical">` (placeholders are marked with an HTML comment).
2. Add an absolute `Sitemap:` line to `robots.txt` and, optionally, a `sitemap.xml`.
3. Point the host's custom 404 to `404.html` (GitHub Pages does this automatically).

## Notes

- The Tailwind Play CDN prints a console notice that it is intended for development. For a
  high-traffic production launch, consider pre-compiling Tailwind to a static stylesheet; the
  markup here is already compatible with that change.
- Documentation links point at the GitHub repository's `main` branch.
