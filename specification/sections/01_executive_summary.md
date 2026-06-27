# Executive Summary

The AI Trust Benchmarking & Maturity Framework (AITBM) is a multi-dimensional, bias-resistant methodology designed to fill the critical gaps in existing AI security scoring systems. Current approaches, including OWASP AIVSS v0.8, inherit foundational assumptions from deterministic software vulnerability scoring (CVSS) that are structurally incompatible with the probabilistic, stateful, and evolving nature of modern AI systems.

AITBM addresses six fundamental deficiencies in the current landscape:

1. Deterministic Anchoring: Existing frameworks bolt AI-specific adjustments onto CVSS, inheriting its inability to score emergent, behavioral, and stateful vulnerabilities.

2. Single-Score Collapse: Flattening multi-dimensional risk into a single 0–10 number hides the trade-offs between accuracy, robustness, and fairness.

3. Subjective Weighting: Configurable weights allow scorer bias to produce incomparable results across organizations; even where weights are fixed (AIVSS v0.8), factor rating relies on coarse three-point anchors without test methods, leaving level selection to assessor discretion.

4. Point-in-Time Blindness: No mechanism exists to quantitatively track behavioral drift, evidence freshness, or cumulative risk over time in stateful agentic systems. CVSS 4.0's Threat metric group (renamed from the v3.x Temporal group and reduced to a single Exploit Maturity value) records only a known vulnerability's exploitation state, set manually from threat intelligence and carrying no decay function; even where memory poisoning is recognized as a scored risk (AIVSS v0.8, Core Risk 6), assessments remain point-in-time snapshots without temporal decay of assessment confidence.

Clarification on CVSS temporal metrics. A common objection holds that CVSS already accounts for time. CVSS does carry a time-varying dimension - the v3.x Temporal metric group, renamed in CVSS 4.0 to the Threat group and reduced to a single Exploit Maturity metric (Not Defined, Attacked, Proof-of-Concept, Unreported). That dimension records the current exploitation state of a known vulnerability - whether public exploit code or active attacks exist - and is populated manually by the consumer from threat intelligence, defaulting to the worst case when unset. It contains no decay function and no model of assessment freshness, evidence confidence, or behavioral drift: a CVSS score does not age on its own and changes only when an analyst re-scores Exploit Maturity. This is categorically different from the AITBM Assurance Confidence Index, which continuously discounts assessment confidence as evidence becomes stale and the assessed system drifts. The two are complementary rather than equivalent; AITBM's temporal-confidence layer is the dimension CVSS has never provided.

5. Epistemic Blindness: Frameworks do not distinguish between high-confidence assessments with full supply chain transparency and low-confidence assessments on opaque systems.

6. Accessibility Gap: No quantitative AI risk-scoring framework offers a tiered assessment pathway for startups and SMEs; tiered participation exists only in attestation programs such as CSA STAR for AI, not in scoring methodologies.

AITBM resolves these through a three-layer architecture: the Intrinsic Vulnerability Profile (IVP), the Operational Risk Posture (ORP), and the Assurance Confidence Index (ACI). The framework produces a multi-dimensional profile as its authoritative output, with a derived Effective Risk Score (ERS) available for operational triage.
