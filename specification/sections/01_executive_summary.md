# Executive Summary

The AI Trust Benchmarking & Maturity Framework (AITBM) is a multi-dimensional, bias-resistant methodology designed to address gaps identified in the project's comparison of AI security scoring systems. OWASP AIVSS v0.8 extends a CVSS 4.0 baseline for agentic vulnerability severity; AITBM addresses additional system properties such as probabilistic behavior, accumulated state, deployment context, and evidence confidence.

AITBM addresses six fundamental deficiencies in the current landscape:

1. Rubric Anchoring: CVSS-based AI extensions remain vulnerability-centered and do not directly score emergent, behavioral, accumulated-state, and evidence-confidence properties of an assessed system.

2. Single-Score Collapse: Flattening multi-dimensional risk into a single 0-10 number can hide trade-offs among robustness, fairness, transparency, privacy, and containment.

3. Subjective Weighting: Configurable weights allow scorer bias to produce incomparable results across organizations; even where weights are fixed (AIVSS v0.8), factor rating relies on coarse three-point anchors without test methods, leaving level selection to assessor discretion.

4. Point-in-Time Blindness: The compared scoring methodologies do not provide a standing mechanism to decay assessment confidence as behavioral evidence ages or accumulated state changes. CVSS 4.0's Threat metric group (renamed from the v3.x Temporal group and reduced to a single Exploit Maturity value) records a known vulnerability's exploitation state, set from threat intelligence and carrying no decay function; even where memory poisoning is recognized as a scored risk (AIVSS v0.8, Core Risk 6), the score does not decay with the age of the assessment evidence.

Clarification on CVSS temporal metrics. A common objection holds that CVSS already accounts for time. CVSS does carry a time-varying dimension - the v3.x Temporal metric group, renamed in CVSS 4.0 to the Threat group and reduced to a single Exploit Maturity metric (Not Defined, Attacked, Proof-of-Concept, Unreported). That dimension records the current exploitation state of a known vulnerability - whether public exploit code or active attacks exist - and is populated manually by the consumer from threat intelligence, defaulting to the worst case when unset. It contains no decay function and no model of assessment freshness, evidence confidence, or behavioral drift: a CVSS score does not age on its own and changes only when an analyst re-scores Exploit Maturity. This is categorically different from the AITBM Assurance Confidence Index, which continuously discounts assessment confidence as evidence becomes stale and the assessed system drifts. The two are complementary rather than equivalent; AITBM's temporal-confidence layer is the dimension CVSS has never provided.

5. Epistemic Blindness: Most compared frameworks do not score the distinction between high-confidence assessments with complete supply-chain evidence and low-confidence assessments of opaque systems.

6. Accessibility Gap: Among the compared scoring methodologies, none offers reduced-depth assessment pathways for startups and SMEs within the same scoring architecture; tiered participation is more common in attestation programs such as CSA STAR for AI.

AITBM resolves these through a three-layer architecture: the Intrinsic Vulnerability Profile (IVP), the Operational Risk Posture (ORP), and the Assurance Confidence Index (ACI). The framework produces a multi-dimensional profile as its authoritative output, with a derived Effective Risk Score (ERS) available for operational triage.
