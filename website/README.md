# AITBM Website

**Date:** 2026-08-02
**Purpose:** Document the public static website for the AI Trust Benchmarking and Maturity Framework
**Status:** Active; publication requires the project publishing procedure

## Site Inventory

The site contains ten public pages plus a not-found page:

| Path | Purpose |
|---|---|
| `index.html` | Framework overview and project entry point |
| `framework.html` | IVP, ORP, ACI, ERS, tiers, and assessment pathways |
| `submetrics.html` | All 23 IVP sub-metrics |
| `use-cases.html` | Evidence-bounded AIDEFEND in Action companion scenarios |
| `gap-analysis.html` | Twelve-gap analysis and remediation status |
| `aidefend.html` | AIDEFEND integration and control-to-evidence guidance |
| `mappings.html` | External framework mappings |
| `calculator.html` | Quick and detailed scoring calculators |
| `glossary.html` | Framework terminology |
| `resources.html` | Documents, references, and project resources |
| `404.html` | Styled not-found response |

Shared assets are under `assets/`. The site uses precompiled Tailwind CSS, project CSS, vanilla JavaScript, SVG logo assets, an Open Graph image, the generated `assets/data/use-case-scores.json` dataset, and the generated global search index.

## Runtime and URL Model

The website is static. Cloudflare Pages serves the public site with extensionless URLs such as `/framework`; each page carries an absolute canonical URL and matching Open Graph URL for `https://aitbm.org`.

The included nginx and Docker files provide a production-like local preview with clean URL handling and the project security headers. The public deployment configuration is managed by the `publish-AITBM` procedure rather than this source directory alone.

## Local Preview

From the repository root:

```bash
python3 scripts/site/serve_local.py --port 8090
```

Then open `http://localhost:8090`.

For an nginx-based preview:

```bash
cd site
docker compose up --build
```

## Generated Content and Assets

Use the repository scripts rather than editing generated data by hand:

```bash
python3 scripts/site/build_use_cases_page.py
python3 scripts/site/build_survey_data_js.py
python3 scripts/site/apply_shared_navigation.py
python3 scripts/site/build_search_index.py
python3 scripts/site/generate_sitemap.py
python3 scripts/site/cachebust.py site
```

- Run `generate_sitemap.py` after adding or removing a public page.
- Edit `scripts/site/fragments/site_header.html`, then run `apply_shared_navigation.py`; do not hand-edit repeated page headers.
- Run `build_search_index.py` after changing public page content, use-case data, or search indexing logic.
- Run `cachebust.py` after changing any local JavaScript or CSS file. It stamps the first eight hexadecimal characters of each asset's SHA-1 digest into every HTML reference.
- Rebuild the use-case page and JSON together when the scenario workpapers or scoring outputs change.

## Validation

Run the deterministic site and repository audit before committing:

```bash
python3 scripts/analysis/audit_repository.py
```

It verifies the eleven-page inventory, local links, fragment targets, unique IDs, canonical and Open Graph URLs, sitemap parity, asset hashes, shared-header equivalence, global-search coverage and result targets, required collaboration files, and canonical deliverables.

The scoring engines have separate tests:

```bash
node tests/ers-engine.test.cjs
python3 tests/test_survey_engine.py
python3 scripts/analysis/validate_use_cases.py
```

## Analytics

Google Analytics is configured with measurement ID `G-K7VDS29BQ0`. Cloudflare Web Analytics uses the platform's automatic setup. Do not restore the retired manual Cloudflare beacon snippet; cross-origin ingestion did not record visits and the repository audit rejects the old token.

## Publishing

Publishing is a separate, user-approved operation to the public `ninedter/AITBM` repository. Use the `publish-AITBM` procedure, which stages the allowlisted deliverables, checks source completeness, removes assistant-specific material, validates links and anchors, and records the public commit. A commit to `AITBM-SRC` does not publish the public site.
