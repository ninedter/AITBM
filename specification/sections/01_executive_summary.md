# Executive Summary

The AI Trust Benchmarking & Maturity Framework (AITBM) is a multi-dimensional, bias-resistant methodology designed to fill the critical gaps in existing AI security scoring systems. Current approaches, including OWASP AIVSS v0.8, inherit foundational assumptions from deterministic software vulnerability scoring (CVSS) that are structurally incompatible with the probabilistic, stateful, and evolving nature of modern AI systems.

AITBM addresses six fundamental deficiencies in the current landscape:

1. Deterministic Anchoring: Existing frameworks bolt AI-specific adjustments onto CVSS, inheriting its inability to score emergent, behavioral, and stateful vulnerabilities.

2. Single-Score Collapse: Flattening multi-dimensional risk into a single 0–10 number hides the trade-offs between accuracy, robustness, and fairness.

3. Subjective Weighting: Configurable weights allow scorer bias to produce incomparable results across organizations; even where weights are fixed (AIVSS v0.8), factor rating relies on coarse three-point anchors without test methods, leaving level selection to assessor discretion.

4. Point-in-Time Blindness: No mechanism exists to quantitatively track behavioral drift or cumulative risk over time in stateful agentic systems; even where memory poisoning is recognized as a scored risk (AIVSS v0.8, Core Risk 6), assessments remain point-in-time snapshots without temporal decay.

5. Epistemic Blindness: Frameworks do not distinguish between high-confidence assessments with full supply chain transparency and low-confidence assessments on opaque systems.

6. Accessibility Gap: No quantitative AI risk-scoring framework offers a tiered assessment pathway for startups and SMEs; tiered participation exists only in attestation programs such as CSA STAR for AI, not in scoring methodologies.

AITBM resolves these through a three-layer architecture: the Intrinsic Vulnerability Profile (IVP), the Operational Risk Posture (ORP), and the Assurance Confidence Index (ACI). The framework produces a multi-dimensional profile as its authoritative output, with a derived Effective Risk Score (ERS) available for operational triage.
