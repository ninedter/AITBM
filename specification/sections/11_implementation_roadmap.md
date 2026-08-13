# Implementation Roadmap

Phase 1: Foundation (Months 1–3)

Publish IVP test battery specifications for Transformer LLMs, traditional ML classifiers, and agentic systems. Establish public baseline reference repository with 10+ models per architecture. Release open-source AITBM Scoring Calculator. Publish initial JPGR covering US, EU, UK, India, Brazil, and 5 additional jurisdictions. Publish Architecture Classification Decision Tree validator tool.

Phase 2: Validation (Months 4–6)

Conduct pilot assessments with 5+ organizations across tiers. Implement BBD monitoring proof-of-concept with cold-start protocol. Cross-validate ERS against AIVSS v0.8 and CVSS 4.0.

Inter-Rater Reliability Study: Multiple assessors independently score the same systems across tiers; targets are inter-assessor ERS variance below 0.5 and weighted-kappa agreement of at least 0.75 per sub-metric before rubric freeze.

Validate CRM calibration against MITRE ATLAS incident severity data. Validate α = 0.15 residual risk floor via sensitivity analysis.

Phase 3: Expansion (Months 7–12)

Develop industry-specific tier calibrations for healthcare, financial services, and critical infrastructure. Publish Lite Assessment pathway including Tier 2 Conditional. Integrate AIBOM Generator into ACI pipeline. Submit for OWASP community project consideration and begin NIST AI RMF / ISO 42001 alignment.

Rubric Refinement: Based on Phase 2 IRR results, refine sub-metric rubrics below target thresholds.

Sub-Metric Coverage Review: Evaluate candidate extensions surfaced by current agentic risk research without disturbing the validated Finbot anchor. Execution-autonomy gating is implemented as Cn-6 — Current. Resource and execution-loop containment is implemented as Cn-7 — Current. Cross-layer cascade amplification is modeled by graph-derived Cascade Potential — Current. Behavioral evidence staleness is modeled by the Behavioral Attestation Window — Current. Runtime memory and retrieval-context poisoning resistance and self-modification containment remain under review.

Weight Validation: Based on pilot data, validate or adjust architecture-specific weights with statistical justification.

Expand JPGR to 20+ jurisdictions including APAC, Middle East, and Africa.
