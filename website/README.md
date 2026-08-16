# AITBM Website

**Date:** 2026-08-16
**Purpose:** Document the public static website for the AI Trust Benchmarking and Maturity Framework
**Status:** Active; publication requires the project publishing procedure

## Site Inventory

The site contains fifteen discovery/application pages, 111 dedicated reference pages,
and a not-found page. The sitemap therefore contains 126 indexable URLs.

| Path | Purpose |
|---|---|
| `index.html` | Framework overview and project entry point |
| `ai-safety-benchmark.html` | Deployed-system AI safety benchmark guide |
| `ai-security-assessment.html` | AI security assessment methodology guide |
| `ai-evaluation-methods.html` | Safety and security evaluation-method selection guide |
| `ai-framework-comparison.html` | Neutral comparison of framework roles and AITBM's measurement layer |
| `ai-security-use-cases.html` | Topic hub for the 64-record incident reference library |
| `framework.html` | IVP, ORP, ACI, ERS, tiers, and assessment pathways |
| `submetrics.html` | Discovery hub for all 23 IVP sub-metrics |
| `submetrics/*.html` | 23 canonical definitions, five-level rubrics, and required test methods |
| `use-cases.html` | Search and discovery hub for public-evidence cases |
| `use-cases/*.html` | 64 complete case-study or research-note evidence records |
| `use-case-topics/*.html` | 8 evidence-rich collections for agentic AI, MCP, prompt injection, data exposure, supply chain, coding agents, RAG, and model security |
| `gap-analysis.html` | Twelve-gap analysis and remediation status |
| `aidefend.html` | AIDEFEND integration and control-to-evidence guidance |
| `mappings.html` | Discovery hub for external framework mappings |
| `mappings/*.html` | 16 reviewed framework crosswalks with dedicated canonical URLs |
| `calculator.html` | Quick and detailed scoring calculators |
| `glossary.html` | Framework terminology |
| `resources.html` | Documents, references, and project resources |
| `404.html` | Styled not-found response |

Shared assets are under `assets/`. Generated machine-readable files include the
use-case scores, the global search index, the sub-metric JSON/CSV reference, and the
framework-mapping JSON/CSV index. `feed.xml` publishes use-case discovery updates.

## Runtime and URL Model

The website is static. Cloudflare Pages serves extensionless URLs such as `/framework`,
`/use-cases/<slug>`, `/mappings/<slug>`, and `/submetrics/<slug>`. Every public page
carries one absolute canonical URL, a matching Open Graph URL, one H1, descriptive
metadata, an explicit indexing/snippet policy, breadcrumbs, and JSON-LD. The detail
pages use `Article` or `TechArticle` semantics without claiming unsupported rich-result
features. Topic pages use `CollectionPage` and `ItemList`; the use-case hub also carries
Google-compatible `Dataset` metadata for the published JSON distribution.

The canonical hostname is `https://aitbm.org`. Cloudflare must maintain a zone-level
permanent redirect from `www.aitbm.org` to the apex while preserving path and query.
Cloudflare Pages `_redirects` cannot perform hostname redirects, so this is a dashboard
or API setting and is verified after every public release.

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

Run the complete deterministic build rather than editing generated HTML or data by hand:

```bash
python3 scripts/site/build_all.py
```

- `build_mapping_pages.py` uses the reviewed website fragments under
  `scripts/site/fragments/mappings/` and produces the mapping hub, 16 detail pages,
  and JSON/CSV indexes.
- `build_submetric_pages.py` reads the canonical working specification and produces
  the sub-metric hub, all 23 rubric pages, and JSON/CSV references.
- `build_use_cases_page.py` reads `docs/use-cases/*.json` and produces the use-case
  hub, all 64 detail pages, the score dataset, Dataset/ItemList metadata, and RSS feed.
- `build_search_intent_pages.py` produces four assessment guides, the case-reference
  topic hub, and eight evidence-rich topic collections from the same generated case data.
- Edit `scripts/site/fragments/site_header.html`, then run `apply_shared_navigation.py`; do not hand-edit repeated page headers.
- `build_all.py` then rebuilds global search, recursively stamps CSS/JS hashes, and
  regenerates the 126-URL sitemap with content-aware modification dates.
- `_headers` gives versioned CSS/JS immutable caching, shorter data-file caching, and
  `noindex, nofollow` protection to Cloudflare Pages preview hostnames.

## Validation

Run the deterministic site and repository audit before committing:

```bash
python3 scripts/analysis/audit_repository.py
```

It verifies the 127-file HTML inventory, exact detail-page counts, local links,
fragment targets, unique IDs, one H1 per public URL, canonical and Open Graph URLs,
structured data, indexing/snippet policy, 126-URL sitemap parity and last-modified dates, asset hashes,
shared-header equivalence, global-search coverage, preview noindex/cache rules,
required collaboration files, and canonical deliverables.

The scoring engines have separate tests:

```bash
node tests/ers-engine.test.cjs
python3 tests/test_survey_engine.py
python3 scripts/analysis/validate_use_cases.py
```

## Analytics

Google Analytics is configured with measurement ID `G-K7VDS29BQ0`. Cloudflare Web Analytics uses the platform's automatic setup. Do not restore the retired manual Cloudflare beacon snippet; cross-origin ingestion did not record visits and the repository audit rejects the old token.

## Publishing

Publishing is a separate, user-approved operation to the public `ninedter/AITBM`
repository. Use the `publish-AITBM` procedure. It rebuilds and validates the SEO tree,
stages only allowlisted deliverables, checks the public hostname redirect and live
canonical URLs after deployment, and calls out sitemap resubmission in Google Search
Console after material URL changes. A commit to `AITBM-SRC` does not publish the site.
