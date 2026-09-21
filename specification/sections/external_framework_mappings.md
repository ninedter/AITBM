# EXTERNAL FRAMEWORK MAPPINGS

AITBM does not score the external frameworks below. This section summarizes how elements from sixteen frameworks can direct assessors to relevant AITBM evidence and criteria. The mapping direction is external framework element → implemented or observed evidence in the assessed system → applicable IVP rubric, ORP dimension, or ACI term → system-specific ERS. The published tables below state each crosswalk's scope boundary, evidence use, and dated-example limitations.

## Mapping Summary

The sixteen mapped frameworks span threat taxonomies, control verification standards, certification regimes, governance and regulatory instruments, maturity models, defensive ontologies, and prior-art scoring systems. The summary table lists each framework's mapping-priority tier, category, and representative AITBM targets for which the source may guide evidence collection or test selection; per-tier detail follows.

*Table 107: External Framework Mapping Summary*

| Framework | Tier | Framework Type | Representative AITBM Sub-Metrics |
| --- | --- | --- | --- |
| OWASP Top 10 for LLMs | Tier 1 | Vulnerability catalogue | Ro-1, Ro-4, Tr-2, Tr-4, Pr-1, Pr-2, Cn-1, Cn-3, Cn-6, Cn-7 |
| OWASP Agentic AI - Threats and Mitigations | Tier 1 | Seventeen-threat agentic taxonomy; companion crosswalk to ASI01-ASI10 | Ro-4, Cn-1, Cn-2, Ro-3, Tr-2, Ro-1, Cn-7 |
| OWASP AISVS | Tier 1 | Control verification standard | Ro-4, Tr-4, Pr-1, Ro-1, Cn-1, Cn-3, Cn-7 |
| MITRE ATLAS | Tier 1 | Adversarial threat landscape | Cn-5, Pr-2, Ro-1, Ro-4, Cn-1, Cn-3 |
| AIUC-1 | Tier 1 | Certification + insurance standard for AI agents | Pr-1, Pr-2, Pr-3, Pr-4, Ro-1, Cn-1 |
| AIDEFEND | Tier 1 | Defensive technique catalogue | Tr-4, Ro-4, Cn-1, Cn-2, Cn-5, Ro-1, Cn-7 |
| NIST AI RMF | Tier 2 | Risk management framework | Ro-2, Ro-3, Tr-2, Cn-1, Cn-3, Cn-2 |
| ISO/IEC 42001 and 42005 | Tier 2 | AI management system | Cn-1, Ro-1, Ro-2, Ro-3, Pr-1, Pr-3 |
| EU AI Act | Tier 2 | Regulatory framework (binding law) | Pr-1, Pr-3, Pr-4, Fa-3, Tr-4, Tr-3 |
| CSA AI Security | Tier 2 | Cloud AI security framework (threat model + controls) | Ro-1, Ro-4, Pr-1, Pr-2, Cn-1, Ro-2 |
| NIST Cyber AI Profile (IR 8596) | Tier 3 | Cyber-AI CSF profile | Ro-1, Ro-4, Cn-1, Cn-2, Cn-4, Pr-1 |
| AIMA | Tier 3 | Maturity model | Conditional evidence only; no automatic pathway, tier, ACI, CRM, ERS, or score transfer. |
| COMPASS | Tier 3 | Security maturity / scoring (threat prioritization workflow) | Conditional planning evidence only; Likelihood, Impact, OODA, maturity, and priority have no numeric writeback. |
| MITRE D3FEND | Tier 3 | Defensive countermeasure ontology | Tr-4, Cn-1, Ro-1, Cn-3, Cn-5, Cn-4 |
| CVSS | Tier 3 | Vulnerability scoring (prior art) | Conceptual metric context only; no CVSS metric or group transfers automatically to AITBM. |
| GPAI Code of Practice | Tier 4 | GPAI governance | Tr-4, Tr-1, Tr-3, Pr-1, Pr-3, Ro-1 |

## Tier 1: Critical Frameworks

Tier 1 frameworks are the core threat taxonomies, control standards, and certification regimes most directly relevant to AITBM positioning and to the OWASP submission.

### OWASP Top 10 for LLMs

OWASP Top 10 for LLM Applications 2026. Maintained by the OWASP GenAI Security Project.

The released 2026 OWASP Top 10 is a qualitative catalogue of ten LLM application risks. LLM03 through LLM10 changed order or meaning from 2025, Hidden Context Exposure became LLM08, and System Prompt Leakage is no longer a standalone category. AITBM maps every current risk to evidence and test-selection targets; no risk class has an inherent anchor or generic ERS.

*Table 108: OWASP Top 10 for LLMs to AITBM Mapping*

| OWASP LLM 2026 Risk | Primary AITBM Targets | Evidence Use / Boundary |
| --- | --- | --- |
| LLM01:2026 Prompt Injection | Ro-1; Cn-1, Cn-2, Cn-3, Cn-6 | Injection, authority-escape, release-gate, and irreversible-action tests |
| LLM02:2026 Sensitive Information Disclosure | Pr-1, Pr-2, Pr-3, Pr-4; Cn-3 | Leakage, inference, minimization, re-identification, and release evidence |
| LLM03:2026 Excessive Agency | Cn-1, Cn-2, Cn-5, Cn-6, Cn-7; Aa | Authority, identity, approval, reversibility, budget, and autonomy evidence |
| LLM04:2026 Supply Chain | Tr-4, Ro-4; ACI Pc; As, Rf | Artifact, dependency, provenance, supplier, and remediation evidence |
| LLM05:2026 Data and Model Poisoning | Ro-4, Ro-2, Fa-3, Tr-3, Tr-4 | Release-bound poisoning, drift, representation, trace, and lineage tests |
| LLM06:2026 Unbounded Consumption | Cn-7; As, Aa | BEC, RBVR, LTFR, GDSR, and deployment-context evidence |
| LLM07:2026 Misinformation | Ro-3, Tr-1, Tr-2; Cn-3 | Factuality, consistency, explanation, calibration, and release validation |
| LLM08:2026 Hidden Context Exposure | Pr-1, Cn-1, Cn-3; Tr-3 | Hidden-context extraction, deterministic access control, release, and audit tests |
| LLM09:2026 Vector and Embedding Weaknesses | Ro-4, Pr-2, Pr-3, Pr-4, Cn-1; Tr-3, Tr-4 | Inversion, membership, poisoning, segregation, lifecycle, and provenance tests |
| LLM10:2026 Improper Output Handling | Cn-3, Cn-1, Cn-6; Ro-1 | Sanitization, schema, sink-authorization, isolation, and action-gate tests |

Key findings:

- All ten 2026 LLM risks have a current evidence path. The superseded 2025 identifiers and generic risk-class ERS values are not carried forward because a current ERS requires one assessed deployment and complete IVP, ORP, and ACI inputs.

- LLM06:2026 Unbounded Consumption maps directly to Cn-7 aggregate resource and loop-containment measurements. LLM03:2026 Excessive Agency instead selects authority, identity, reversibility, and autonomy evidence; neither category receives a generic score.

- Fairness remains only partially represented through poisoning and misinformation effects, so applicable Fa-1 through Fa-4 tests remain independent. ACI separately grades the completeness and freshness of the deployment evidence.

- The residual-risk floor applies only after the assessed deployment's current inputs are established; an OWASP category alone does not invoke or determine ERS.

### OWASP Agentic AI - Threats and Mitigations

OWASP Agentic AI - Threats and Mitigations v1.1 (T1-T17 taxonomy, December 2025; companion OWASP Top 10 for Agentic Applications 2026, ASI01-ASI10). Maintained by OWASP GenAI Security Project - Agentic Security Initiative (ASI).

The OWASP agentic taxonomy enumerates seventeen threats specific to autonomous, tool-calling, memory-bearing, and multi-agent systems. AITBM maps each threat to five-level sub-metric rubrics and the IVP/ORP/ACI architecture. The T1-T15 ERS values in the table are dated illustrative deployment scenarios retained on their original worked-example basis; T16 and T17 deliberately have no generic score. A current ERS must be derived from the assessed deployment.

*Table 109: OWASP Agentic AI - Threats and Mitigations to AITBM Mapping*

| Agentic Threat | Primary AITBM Sub-Metrics | Illustrative Scenario Effect / Notes |
| --- | --- | --- |
| T1 Memory Poisoning | Ro-4, Cn-1 | ERS 7.0 (High) |
| T3 Privilege Compromise | Cn-2, Cn-1 | ERS 7.9 (High) |
| T4 Resource Overload | Cn-7 | Direct mapping; ERS 5.9 is a dated pre-Cn-7 scenario and is not a generic current score |
| T5 Cascading Hallucination Attacks | Ro-3, Tr-2 | ERS 6.6 (Moderate) |
| T6 Intent Breaking & Goal Manipulation | Cn-1, Ro-1 | ERS 7.0 (High) |
| T9 Identity Spoofing & Impersonation | Cn-5, Cn-2 | ERS 8.3 (highest in dated T1-T15 scenario set) |
| T11 Unexpected RCE and Code Attacks | Cn-1, Cn-3 | ERS 8.1 (High) |
| T12 Agent Communication Poisoning | Cn-5, Ro-4 | ERS 7.1 (High) |
| T13 Rogue Agents in Multi-Agent Systems | Cn-5, Cn-1 | ERS 8.2 (second-highest in dated T1-T15 scenario set) |
| T15 Human Manipulation | Cn-3, Tr-2 | ERS 5.8 (Moderate) |
| T16 Insecure Inter-Agent Protocol Abuse | Cn-5, Cn-1; secondary Ro-1, Tr-3, Cn-6 | Deployment-specific; no generic ERS assigned |
| T17 Supply Chain Compromise | Ro-4, Tr-4; secondary Cn-1, Tr-3, Cn-5 | Deployment-specific; no generic ERS assigned |

Key findings:

- Within the dated T1-T15 illustrative set, T9 Identity Spoofing (8.3), T13 Rogue Agents (8.2), and T11 RCE (8.1) are Containment-dominated, and the top two are Cn-5-led. This is consistent with, but does not independently validate, AITBM's agentic weighting; T16 and T17 remain deployment-specific and are excluded from that ranking.

- Thirteen of the seventeen threats map primarily or secondarily to the Containment axis. This concentration is consistent with AITBM's agentic Containment emphasis, but the OWASP taxonomy does not determine or validate the numeric Cn=0.45 weight.

- Cascade-and-autonomy threats (T5, T13, T14) map to ORP Aa (Autonomy Amplification) and Cp (Cascade Potential). In the dated identity/RCE scenarios, all four ORP dimensions were elevated, producing CRM 1.60 under the step table.

- The companion OWASP Top 10 for Agentic Applications 2026 (ASI01-ASI10, released December 9, 2025) is crosswalked to T1-T17. ASI05 is exactly named Unexpected Code Execution (RCE). Version 1.1 gives ASI04 a direct T17 supply-chain counterpart and extends ASI07 with T16 protocol abuse; ASI03, ASI07, and ASI10 remain Cn-5-led in the AITBM mapping.

### OWASP AISVS

OWASP AI Security Verification Standard (AISVS). Maintained by OWASP Foundation.

AISVS is a community-driven catalogue of testable AI security requirements (12 chapters, 191 verifiable requirements, levels L1/L2/L3) answering 'what controls should exist'. AITBM can consume its control-verification evidence in a system assessment and select an assessment tier from the AISVS level. Numeric effects in the table are illustrative scenario results, not values assigned by OWASP or inherent to a chapter.

*Table 110: OWASP AISVS to AITBM Mapping*

| AISVS Chapter | Primary AITBM Targets | Evidence Use / Boundary |
| --- | --- | --- |
| C1 Training Data Integrity & Traceability | Ro-4, Tr-4, Pr-1 | Integrity, lineage, leakage, and provenance evidence; measured results govern |
| C2 Input Validation | Ro-1, Cn-1, Cn-3 | Injection, scope, and release-gate evidence; no chapter-level score |
| C5 Access Control & Identity | Cn-5, Cn-1, Pr-2 | Identity, authorization, and inference-resistance evidence; effectiveness must be tested |
| C6 Supply Chain Security for Models, Frameworks & Data | Ro-4, Tr-4, ACI Pc | Artifact-integrity, lineage, and ACI provenance evidence |
| C9 Orchestration & Agentic Security | Cn-1, Cn-2, Cn-5, Cn-6, Cn-7 | Observed effectiveness only; no fixed chapter-level ERS reduction |
| C9.1 Execution Budgets, Loop Control, and Circuit Breakers | Cn-7 | Direct evidence: C9.1.1 per-tool quotas/timeouts and C9.1.2 recursion, token, and spend budgets |
| C9.2 High-Impact Action Approval & Irreversibility Controls | Cn-6 | Direct evidence: C9.2.3 classification, C9.2.4 enforcement by class, and C9.2.10 worst-case chain rule |
| C10 Model Context Protocol (MCP) Security | Cn-5, Ro-1, Cn-2 | MCP identity, token-boundary, injection, and privilege evidence |
| C11 Adversarial Robustness | Ro-1, Ro-2, Pr-2, Pr-1 | Representative adversarial and privacy test evidence |
| C12 Monitoring, Logging & Anomaly Detection | Tr-3, Ro-2, Cn-2, ACI Ec, ACI Tf | Audit, anomaly, and eligible ACI evidence; admissibility and freshness rules govern |
| Privacy & personal data (distributed - C1.2.3, C8.2-C8.3, C11.2; no dedicated chapter) | Pr-1, Pr-2, Pr-3, Pr-4 | Distributed privacy-control evidence; AITBM privacy tests remain required |

Key findings:

- AISVS gives strong coverage of 17/23 AITBM sub-metrics (74%), partial coverage of 2/23 (Tr-1 explainability and Pr-3 data minimization), and defers the 4/23 Fairness sub-metrics (Fa-1–Fa-4) by design to ISO 42001, ISO 23894, and NIST AI RMF. C9.1 supplies direct strong evidence for Cn-7, corroborated by C9.3.3/C9.3.4 and C11.2.2.

- AISVS C9.2 (High-Impact Action Approval and Irreversibility Controls) maps directly onto the new Cn-6 (Action Reversibility Classification Rate): C9.2.3 requires reversibility classification, C9.2.4 runtime enforcement by class, and C9.2.10 the worst-case chain composition rule - making Cn-6 the 16th strongly covered sub-metric.

- AISVS C5, C9.4, and C10.2 directly target controls relevant to Cn-5 (Agent Identity Integrity). C9 and C10 contain 57 requirements in total (34 + 23, or 29.8% of the 191 requirements). This is strong scope alignment, not an AISVS endorsement or validation of AITBM's numeric weight.

- The AISVS worked example is retained on its dated 21-sub-metric, pre-GDCP basis. A current assessment must derive Cn-6, Cp, ACI, and ERS under the current specification; AISVS compliance alone does not assign the displayed reduction.

- AITBM uses AISVS levels as one input to its own pathway guidance (L1 to Tier III, L2 to Tier II, L3 to Tier I). C6 and C12 artifacts may support ACI provenance and freshness only when the evidence is applicable, complete, effective, and current.

### MITRE ATLAS

MITRE ATLAS (Adversarial Threat Landscape for Artificial Intelligence Systems). Maintained by MITRE Corporation.

MITRE ATLAS is an ATT&CK-style knowledge base of adversarial AI tactics, techniques, and real-world case studies (released data version 2026.09: 16 tactics, 120 top-level techniques plus 88 sub-techniques, 40 mitigations, and 73 case studies). Relative to v2026.08, the released source adds 6 top-level and 5 sub-techniques (11 total), 1 mitigation, and 1 case; all remain evidence-planning context and create no automatic AITBM score route. The crosswalk maps ATLAS elements to IVP/ORP/ACI evidence for system-specific assessment.

*Table 111: MITRE ATLAS to AITBM Mapping*

| Released ATLAS Tactic | Primary AITBM Targets | Evidence Use / Boundary |
| --- | --- | --- |
| AML.TA0000 AI Model Access | Pr-1, Pr-2, Tr-4; As | Model-access paths select leakage, inference, lineage, and exposure tests |
| AML.TA0001 AI Attack Adaptation | Ro-1, Ro-4, Tr-4 | Selects adversarial-input, poisoning, and provenance tests; widened at v2026.08 to autonomous attack-path adaptation and orchestration, so coverage must include adaptive bypass rate |
| AML.TA0002 Reconnaissance | Tr-3, Tr-4; As | Informs probing visibility and discoverable-origin evidence |
| AML.TA0003 Resource Development | Ro-4, Tr-4; ACI Pc | Identifies malicious artifacts and provenance paths to test |
| AML.TA0004 Initial Access | Cn-1, Cn-5, Pr-2; As | Selects trust-boundary, identity, and exposed-entry tests |
| AML.TA0005 Execution | Cn-1, Cn-2, Cn-3, Cn-6; Aa | Selects authority, output-release, escalation, and action-gating tests |
| AML.TA0006 Persistence | Cn-2, Cn-5, Tr-3; Rf | Selects persistent-state, credential, audit, eviction, and recovery tests |
| AML.TA0007 Defense Evasion | Cn-3, Cn-4, Tr-2, Tr-3; ACI C_monitor | Selects bypass, detection-evasion, logging, and monitoring-health tests |
| AML.TA0008 Discovery | Pr-1, Pr-2, Tr-4; As | Selects model, data, service, and exposure discovery tests |
| AML.TA0009 Collection | Pr-1, Pr-3, Pr-4; Tr-3 | Selects collection, minimization, re-identification, and audit tests |
| AML.TA0010 Exfiltration | Pr-1, Pr-4, Cn-1, Cn-3; Tr-3 | Selects leakage, egress, release-gate, and detection tests |
| AML.TA0011 Impact | Ro-2, Ro-3, Ro-4; Cp, Rf | Selects integrity, availability, behavior, cascade, and recovery tests; Cp remains graph-derived |
| AML.TA0012 Privilege Escalation | Cn-1, Cn-2, Cn-5, Cn-6 | Selects authority, delegated-identity, escalation, and gating tests |
| AML.TA0013 Credential Access | Cn-5, Pr-2, Tr-3 | Selects token, key, workload-identity, and credential-use tests |
| AML.TA0014 Command and Control | Cn-1, Cn-2, Tr-3; As | Selects outbound-control, session, egress, and command-channel tests |
| AML.TA0015 Lateral Movement | Cn-1, Cn-2, Cn-5; Cp | Selects segmentation, delegated-access, identity, and graph-reachability tests |

Key findings:

- Technique examples select applicable AITBM tests. The detailed mapping does not claim an exhaustive 208-technique crosswalk, and no technique has a generic ERS or fixed remediation delta.

- ATLAS threat and case evidence may support test selection and applicability. It does not determine AITBM anchors, weights, calibration, or ERS.

- Case studies can support threat applicability and test design, but a current ERS requires reconstruction of the assessed deployment, evidence date, architecture, SDG, IVP, Aa/As/Cp/Rf, and ACI.

- ATLAS is an adversarial-threat knowledge base, not a general fairness or transparency standard. AITBM evaluates those separate system properties without treating ATLAS's deliberate scope as a defect.

### AIUC-1

AIUC-1 (Artificial Intelligence Underwriting Company Standard 1). Maintained by Artificial Intelligence Underwriting Company (AIUC).

AIUC-1 is a pass/fail certification standard for AI agents. Its current 51 active requirements comprise 43 Mandatory and 8 Supplemental requirements; E007 and E014 are retired historical source units. Current total control counts are not published. AIUC certification and insurance are context only and never convert directly to an AITBM score, tier, pathway, ACI, CRM, or ERS value.

*Table 112: AIUC-1 to AITBM Mapping*

| AIUC-1 Domain | Primary AITBM Sub-Metrics | Evidence Use / Boundary |
| --- | --- | --- |
| A - Data & Privacy (8 requirements) | Pr-1, Pr-2, Pr-3, Pr-4 | Verified evidence may support a rubric only when applicable; certification does not assign a tier or score. |
| B - Security (10 requirements) | Ro-1, Cn-1, Cn-2 | Current adversarial-test evidence may support Ro-1 when coverage and effectiveness requirements are met |
| C - Safety (12 requirements) | Cn-3, Fa-1, Fa-2, Fa-3, Fa-4, Ro-3 | Measured safety and bias-test evidence may support applicable Cn, Fa, and Ro rubrics |
| D - Reliability (4 requirements) | Ro-3, Cn-1, Cn-2 | Reliability testing may support Ro-3 and may refresh covered evidence when AITBM admissibility rules are met |
| E - Accountability (15 requirements) | Tr-1, Tr-3, Tr-4 | Current accountability/logging evidence may be assessed against the applicable rubric; E007/E014 are retired and certification does not set Rf. |
| F - Society (2 requirements) | Cn-2, Cn-3, Tr-4 | Misuse scenarios provide assessment context; they do not assign a tier or ACI cap automatically |

Key findings:

- AIUC's associated insurance offering and AITBM's residual-risk floor address different questions: policy-specific risk transfer versus system-risk quantification. Their coexistence is conceptually consistent with non-zero residual risk, but it does not validate AITBM's selected alpha=0.15 value or establish that insurers use ERS.

- Historical AIUC crosswalk identifiers require quarterly verification: E007 and E014 are retired, and certification or an identifier alone never establishes Cn-5 or another AITBM input. AITBM's Cn-5 requires deployment-specific identity evidence and its own rubric/test-method criteria.

- AIUC-1's quarterly third-party re-testing cadence can provide refresh evidence for covered sub-metrics. Tf resets only when the report satisfies the applicable AITBM evidence-quality, coverage, and event rules.

- AIUC-1 certification and its associated insurance offering address control verification and risk transfer. AITBM separately measures deployment-specific technical risk and evidence confidence; neither output substitutes for the other.

### AIDEFEND

AIDEFEND (AI Defense Framework). Maintained by Edward Lee (independent, community-driven; CC BY 4.0).

AIDEFEND data version 2026.09.20 (schema 2.3) is an independent open-source catalogue of 93 technique families, 272 sub-techniques, 365 records, and 307 actionable controls across seven D3FEND-inspired tactics. Six core controls changed upstream and relationship arrays changed without a count change; the AITBM mapping remains 171 placements across 78 technique families. Its current relationship layer uses OWASP LLM Top 10 2026 and ATLAS v2026.09. Catalog or relationship presence has no inherent anchor or fixed ERS reduction.

*Table 113: AIDEFEND to AITBM Mapping*

| AIDEFEND Tactic | Primary AITBM Sub-Metrics | Evidence Use / Boundary |
| --- | --- | --- |
| Model (10 techniques) | Tr-4, Ro-4, Cn-1, Cn-2, Cn-5, Cn-6, Cn-7 | Asset, authority, provenance, identity, and action-governance evidence; no fixed score |
| Harden (38 techniques) | Ro-1, Cn-1, Cn-2, Cn-3, Cn-5, Cn-6, Cn-7 | Measured hardening evidence only; no fixed anchor or ERS change. 2026.09.20 relationship changes create no placement. |
| Detect (18 techniques) | Ro-1, Ro-3, Cn-1, Cn-2, Cn-5, Tr-3, Cn-6, Cn-7 | Behavior, detection, audit, and monitoring evidence subject to coverage and health rules |
| Isolate (8 techniques) | Cn-1, Cn-4, Cn-7; As; SDG | Isolation informs boundaries, exposure, and graph reachability; Cp remains graph-derived |
| Deceive (7 techniques) | Tr-3; ACI monitoring context | Decoy telemetry may support detection and audit evidence; no fixed ERS change |
| Evict (5 techniques) | Cn-2; Rf | Measured eviction and quarantine performance may inform containment and remediation feasibility |
| Restore (7 techniques) | Cn-2, Tr-4; Rf | Measured rollback, versioning, and recovery evidence may inform Rf and provenance |

Key findings:

- AIDEFEND placements identify evidence relevant to the listed AITBM targets. Technique presence alone does not assign a rubric anchor or ERS reduction; applicability, implementation, effectiveness, coverage, and evidence quality govern.

- The AIDEFEND worked example is retained on its dated pre-Cn-6, pre-GDCP basis. A current assessment must derive all current containment, operational, behavioral, and Section 5 inputs; the displayed reduction is not inherent to the control stack.

- Drift/anomaly-detection and Restore evidence may support ACI monitoring/freshness and ORP Remediation Feasibility when the deployment satisfies the applicable coverage, health, reset, and effectiveness rules.

- AIDEFEND has weak Fairness coverage (only approximately two of the catalog's technique families address bias or fairness), a flagged gap. The AITBM mapping is revalidated against data version 2026.09.20 (93 technique families / 272 sub-techniques / 365 records / 307 actionable controls, schema 2.3). The pinned delta records six changed core controls (AID-D-011.001, AID-H-002.002, AID-H-005.003, AID-H-006.003, AID-H-007.005, and AID-H-021.004) and 348 records with a changed relationship array; no new placement or automatic score credit follows. The synchronized AIDEFEND in Action corpus is 88 analyses (67 scored and 21 unscored).

- The mapping now spans 171 sub-metric placements using 78 distinct technique families (average 7.4 per sub-metric), covering all 23 AITBM sub-metrics. The one new top-level family, AID-H-038 (Inference Serving Runtime Surface and Privileged Capability Governance), is placed on Ro-4, Cn-1, and Cn-2; Cn-7 and Pr-2 were evaluated for it and declined, because it produces none of the BEC, RBVR, LTFR, or GDSR measurements Cn-7 is scored from and its own scope boundary excludes caller identity and network reachability. Cn-6 retains nine families; Cn-7 retains 16 parent-family routing placements and 29 exact actionable selectors. Parent-family or control presence supplies candidate evidence only; observed implementation and effectiveness must satisfy the exact AITBM rubric and BEC, RBVR, LTFR, and GDSR test methods.

## Tier 2: High-Priority Frameworks

Tier 2 frameworks are governance, risk-management, and regulatory regimes with significant complementary scope.

### NIST AI RMF

NIST Artificial Intelligence Risk Management Framework (AI RMF 1.0). Maintained by National Institute of Standards and Technology (NIST), U.S. Department of Commerce.

The NIST AI RMF is a voluntary governance framework that names seven trustworthiness characteristics and a MEASURE function without prescribing one universal scoring method. AITBM is one possible technical measurement companion, using 23 rubrics and IVP/ORP/ACI to produce a system-specific ERS.

*Table 114: NIST AI RMF to AITBM Mapping*

| RMF Trustworthiness Characteristic | Primary AITBM Sub-Metrics | Illustrative Scenario Effect / Notes |
| --- | --- | --- |
| Valid and Reliable | Ro-2, Ro-3, Tr-2 | Foundational; affects all axes |
| Safe | Cn-1, Cn-3, Cn-2, Ro-3 | High for agentic/user-facing |
| Secure and Resilient | Ro-1, Ro-4, Cn-2, Cn-4, Cn-5 | High; spans Robustness + Containment |
| Accountable and Transparent | Tr-3, Tr-4 | Moderate; also feeds ORP Rf |
| Explainable and Interpretable | Tr-1, Tr-2 | Moderate |
| Privacy-Enhanced | Pr-1, Pr-3, Pr-2, Pr-4 | High for personal-data systems |
| Fair - with Harmful Bias Managed | Fa-1, Fa-3, Fa-2, Fa-4 | Moderate; full Fairness axis |

Key findings:

- MEASURE is the principal integration interface in this crosswalk. The AI RMF does not mandate a score, thresholds, or aggregation method; AITBM offers one compatible implementation by mapping GOVERN to tier/pathway and Tr-3/ORP Rf, MAP to architecture and ORP As/Cp, MEASURE to IVP and ACI Ec, and MANAGE to ERS sensitivity and ACI decay.

- AI RMF 1.0 does not define a dedicated agent-identity scoring metric. AITBM's Cn-5 should be assessed for in-scope Agentic-MCP systems; this is a difference in measurement granularity, not a claim that RMF governance cannot address identity risk.

- AITBM's operational rubrics support structured comparison across teams, systems, and time, while ACI supplies an evidence-freshness model for continuous-monitoring records. Reduction in inter-assessor variance remains an explicit validation target rather than an established result.

- The NIST AI RMF worked example is retained on its dated 21-sub-metric, pre-GDCP basis. A current assessment must derive Cn-6, Cp, ACI, and ERS under the current specification; RMF process status does not assign the displayed values.

### ISO/IEC 42001 and 42005

ISO/IEC 42001:2023 (with ISO/IEC 42005:2025 impact assessment). Maintained by ISO/IEC JTC 1/SC 42.

ISO/IEC 42001 specifies an AI management system and ISO/IEC 42005 provides impact-assessment guidance. This public-scope crosswalk describes how operating records may support AITBM evidence; it is not a clause-by-clause crosswalk, does not reproduce the licensed normative text, and does not substitute for either standard.

*Table 115: ISO/IEC 42001 and 42005 to AITBM Mapping*

| Publicly Described ISO Scope / Evidence | Primary AITBM Relationship | Evidence Use / Boundary |
| --- | --- | --- |
| Establishing an AI management system | Tr-3, Tr-4; ACI provenance context | Approved ownership and traceability records may support applicable criteria; system existence is not technical-effectiveness evidence |
| Implementing an AI management system | IVP and ACI evidence, as applicable | Only deployment-specific operating evidence can support a rubric anchor |
| Maintaining an AI management system | ACI Ec, Tf, and monitoring context | Current evaluation and telemetry records remain subject to AITBM coverage, quality, and freshness rules |
| Continually improving an AI management system | Rf; ACI event and freshness context | Exercised corrective-action and reassessment records may inform remediation and evidence refresh |
| AI system impact assessment | SDG inputs for Cp; Rf; ACI provenance | Dependencies and harm scenarios may inform graph construction; impact labels do not set Cp or ERS |
| Impact-assessment dependency records | Graph-derived Cp evidence | Observed nodes, edges, affected parties, and propagation paths must still satisfy GDCP verification |
| Impact-assessment mitigation records | Rf and applicable IVP evidence | Implementation and measured effectiveness govern; a planned mitigation receives no automatic score credit |
| Management-system audit records | Tr-3 and ACI provenance context | Audit evidence may strengthen traceability or independence when applicable; certification is not an AITBM score |
| Certification-body evidence under ISO/IEC 42006 | ACI context only | May support evidence provenance; does not attest every technical rubric or determine ERS |

Key findings:

- AITBM's Cn-5 is a dedicated technical metric for agent identity. This public-scope crosswalk makes no claim that ISO prohibits, omits, or certifies particular agent-identity controls; the licensed normative text and the organization's selected controls govern ISO conformity.

- Certification status and impact-assessment labels do not assign AITBM scores. Impact records may supply dependency, harm-scenario, remediation, and provenance evidence, but Cp remains graph-derived and ERS remains deployment-specific. AITBM does not determine ISO conformity and is not specified or endorsed by ISO or IEC.

- ISO certification raises confidence in the evidence chain (better ACI Pc/Ec/Tf) but never lowers a system's intrinsic risk; the alpha=0.15 residual-risk floor applies regardless of certification.

- AITBM is not an accredited certification and defines no governance clauses; ISO produces no quantitative ERS, no temporal-decay model, and no architecture-specific weighting - the two are genuinely complementary at different altitudes.

### EU AI Act

Artificial Intelligence Act - Regulation (EU) 2024/1689. Maintained by European Union (European Parliament and Council of the EU).

The EU AI Act is binding law establishing risk tiers and provider obligations enforced through conformity assessment and CE marking, while AITBM is a technical-risk quantification framework that helps providers prioritise and evidence the Act's Article 9 and Article 15 technical duties without ever certifying legal conformity.

*Table 116: EU AI Act to AITBM Mapping*

| EU AI Act Obligation | Primary AITBM Sub-Metrics | Evidence Use / Notes |
| --- | --- | --- |
| Risk-management system | Whole IVP, ORP, ERS | May trigger deployment-specific reassessment; the legal duty does not set an AITBM cadence |
| Data and data governance | Pr-1, Pr-3, Pr-4, Fa-3 | Dataset bias and representation testing; minimisation |
| Technical documentation (Annex IV) | Tr-4 | Model lineage; documentation completeness |
| Record-keeping (logging) | Tr-3 | Audit-trail coverage and tamper-evidence |
| Transparency to deployers | Tr-1 | Explainability depth; instructions for use |
| Human oversight | Cn-2 | Intervention and override evidence informs the Aa authority assessment |
| Accuracy, robustness and cybersecurity | Ro-1, Ro-2, Ro-3, Cn-1, Cn-3, Cn-4 | Attack-success-rate, shift, consistency, and security-control evidence |
| Limited-risk transparency obligations | Tr-1, Tr-3 | AI-interaction disclosure and synthetic-content labelling |
| GPAI systemic-risk assessment | ORP Cp, ORP Aa | Risk scenarios and dependency evidence feed the SDG; Cp remains graph-derived |

Key findings:

- The EU AI Act is binding law and AITBM is not: a favourable ERS does not certify conformity, replace conformity assessment, CE marking, or registration, and carries no legal standing - AITBM only supports the conformity dossier as a due-diligence artifact.

- Legal tier and technical risk are different axes: the transparency-tier agentic customer-service assistant scores ERS 5.2 (Moderate), higher than the high-risk CV-screening system at 4.9, because weak Containment (Cn-1/Cn-2/Cn-5) plus elevated autonomy and attack surface make it technically riskier despite a lighter legal burden.

- AITBM maps the Act's qualitative 'appropriate / state-of-the-art' expectations under Articles 9 and 15 into 0.00-1.00 technical rubrics. Reassessment and ACI evidence-freshness records can support, but do not by themselves establish, compliance with continuous risk-management and post-market-monitoring duties.

- The Act is technology-neutral and does not prescribe AITBM's Cn-5 agent-identity metric or architecture-specific weighting. Regulation (EU) 2026/1744, published 24 July and in force 27 July 2026, defers Annex III high-risk duties to 2 December 2027 and Article 6(1)/Annex I duties to 2 August 2028, except Article 6(5). Article 50 generally applies from 2 August 2026, with a 2 December 2026 transition for Article 50(2) on generative systems already marketed before that date; Article 50(7) was also amended.

### CSA AI Security

CSA AI Security (MAESTRO + AI Controls Matrix). Maintained by Cloud Security Alliance (CSA).

CSA supplies cloud-specific AI security through MAESTRO's seven-layer threat model and AICM v1.1's 247 control objectives across 18 domains. This crosswalk routes verified CSA evidence into AITBM's IVP, current Aa/As/Cp/Rf operational dimensions, and ACI. A CSA threat, control, domain, or maturity level has no inherent ERS value or fixed ERS reduction.

*Table 117: CSA AI Security to AITBM Mapping*

| MAESTRO Layer / AICM Domain | Primary AITBM Sub-Metrics | Evidence Use / Notes |
| --- | --- | --- |
| L1 Foundation Models | Ro-1, Ro-2, Ro-3, Ro-4, Pr-1, Pr-2, Tr-4 | Model-level attack paths and provenance evidence |
| L2 Data Operations | Ro-4, Pr-1, Pr-2, Pr-3, Pr-4, Tr-3, Tr-4 | Training, retrieval, memory, data-flow, and SDG evidence |
| L3 Agent Frameworks | Cn-1, Cn-2, Cn-3, Cn-5, Cn-6, Ro-1 | Tool authority, identity, execution, and action-gating evidence; also informs Aa |
| L4 Deployment & Infrastructure | Cn-1, Cn-2, Cn-4, Pr-2 | Exposure informs As; dependencies feed graph-derived Cp; recovery evidence informs Rf |
| L5 Evaluation & Observability | Tr-2, Tr-3, ACI Ec, Tf, C_monitor, C_behavior | Evidence coverage, freshness, and monitoring caps when effectiveness is verified |
| L6 Security & Compliance | Cn-1, Cn-2, Cn-5, Cn-6, Tr-3, ACI Pc, Ec, Rf | Policies and records can support IVP, ACI, and Rf; no controls-maturity ORP dimension |
| L7 Agent Ecosystem | Cn-1, Cn-2, Cn-5, Cn-6, Ro-3, Aa, As, Cp | External-agent identity, authority, behavioral, exposure, and SDG evidence |

Key findings:

- All seven MAESTRO layers and all 18 current AICM domains are routed. This is a layer/domain-level crosswalk, not a claim that all 247 AICM control objectives have identical targets or have been individually validated.

- Multi-tenancy, shared services, and agent marketplaces affect Attack Surface Exposure and the System Dependency Graph. They do not set a generic ERS or Cascade Potential value; Cp remains graph-derived under GDCP.

- AICM controls count as AITBM evidence only when the assessed deployment demonstrates the applicable rubric criterion and test method. Control presence or AISMM maturity does not convert directly into IVP, ORP, ACI, or ERS values.

- AICM governance and impact-assessment artifacts can support Fairness evidence, while supply-chain transparency artifacts can support ACI Provenance Completeness. Each AITBM anchor still requires evidence for the exact assessed deployment.

## Tier 3: Specialized Frameworks

Tier 3 frameworks are specialized cyber profiles, maturity models, defensive ontologies, and prior-art scoring systems.

### NIST Cyber AI Profile (IR 8596)

NIST IR 8596 - Cybersecurity Framework Profile for Artificial Intelligence (Cyber AI Profile). Maintained by National Institute of Standards and Technology (NIST), with NCCoE and MITRE contributors.

NIST IR 8596 is a qualitative CSF 2.0 community profile naming cybersecurity outcomes to pursue when AI is a target, a defensive tool, and an adversary capability. This AITBM-authored crosswalk offers one multi-dimensional, time-aware way to measure selected outcomes; NIST does not prescribe or endorse ERS.

*Table 118: NIST Cyber AI Profile (IR 8596) to AITBM Mapping*

| Cyber AI Profile Focus Area / CSF Function | Primary AITBM Sub-Metrics | Illustrative Scenario Effect / Notes |
| --- | --- | --- |
| Secure: securing AI systems | Ro-1, Ro-4, Cn-1, Cn-2, Cn-4, Pr-1, Pr-2 | ERS 7.0-10.0 if dominant (exposed, autonomous) |
| Defend: AI-enabled cyber defense | Tr-3, Tr-1, Tr-2, Ro-3, ORP Aa | ERS 5.0-7.0 as a scored asset |
| Thwart: thwarting AI-enabled attacks | Ro-1, Ro-2, ORP As, ACI Tf | Drives CRM upward; faster evidence decay |
| GOVERN | Tr-3, Tiered Pathway selection | Governance posture sets assessment depth |
| IDENTIFY | Tr-4, ACI Pc | Architecture classification; provenance/AIBOM |
| PROTECT | Cn-1, Cn-2, Cn-4, Cn-5, Ro-1, Ro-4 | The protective IVP sub-metrics |
| DETECT (model drift, data poisoning) | Ro-2, Ro-3, Ro-4, Tr-3 | Drift and poisoning named explicitly |
| RESPOND | ORP Rf, Cn-2 | Remediation feasibility; containment during response |
| RECOVER (compromised weights/data) | ORP Rf, Tr-4, ACI Pc | Clean-lineage restoration requires provenance |

Key findings:

- The Profile brings agentic, multi-agent, inter-agent authentication, and least-agency outcomes into scope. This crosswalk maps those outcomes to Cn-5 and the agentic architecture profile; the numeric weights remain AITBM design choices.

- The 'Thwart' lens flows through ORP (As elevator) and ACI (faster Tf decay) rather than IVP: AI-enabled adversaries should raise Attack Surface Exposure (e.g. 0.50 to 0.80), lifting N_elevated and CRM - operational and temporal dimensions a qualitative profile cannot express numerically.

- Coverage is strongest where AITBM's Robustness and Containment axes live (Secure): 8/23 sub-metrics strong, 8/23 partial, and 7/23 gaps (Fa-1, Fa-3, Fa-4, Pr-4, Cn-5, Cn-6, Cn-7). The Fairness axis sits outside a cybersecurity profile's scope; Cn-7 requires execution-budget and loop-termination evidence not prescribed by the current profile.

- IR 8596 remains an Initial Preliminary Draft (December 16, 2025) and does not prescribe a quantitative score or residual-risk floor. This crosswalk shows how AITBM can translate selected CSF outcomes into a comparable, confidence-graded ERS; NIST does not designate AITBM as a common denominator.

### AIMA

OWASP AI Maturity Assessment (AIMA). Maintained by OWASP Foundation.

OWASP AIMA grades organizational AI-program maturity across eight lifecycle domains, while AITBM assesses a specific deployed system from measured IVP, ORP, and ACI evidence. AIMA maturity, domains, and practices may identify evidence to inspect but never assign an AITBM pathway, tier, IVP/ORP value, ACI component, CRM, ERS, severity, or confidence band.

*Table 119: AIMA to AITBM Mapping*

| AIMA Domain | Primary AITBM Sub-Metrics | Illustrative Scenario Effect / Notes |
| --- | --- | --- |
| Responsible AI | Tr-1 (conditional) | Only worksheet cells 3.1.2.L2.A and 3.1.2.L3.A may support deployment-specific explanation evidence. |
| Governance | Context only | No automatic provenance, tier, pathway, or Rf value. |
| Data Management | Ro-4; Pr-3 (conditional) | Only retained worksheet cells with assessed-system evidence; no automatic Pc. |
| Privacy | Pr-3 (conditional) | Only retained minimization cells with deployment evidence; no ACI or tier conversion. |
| Design | Context only | Threat modeling identifies scope; it assigns no containment score. |
| Implementation | Context only | Program maturity does not prove deployment controls or identity evidence. |
| Verification | ACI Ec; ACI T_calendar (conditional) | Only cells 3.7.1.L2.B and 3.7.2.L3.A with admissible assessed evidence. |
| Operations | ORP Rf; ACI C_monitor (conditional) | Only cells 3.8.1.L2.A and 3.8.2.L3.A with independently demonstrated conditions. |

Key findings:

- AIMA maturity is context only. The retained conditional routes are limited to deployment-specific evidence for Tr-1 (two cells), Ro-4 (one), Pr-3 (four), ACI Ec, ACI T_calendar, ORP Rf, and ACI C_monitor; every route remains subject to the exact AITBM rubric, evidence, and admissibility requirements.

- No AIMA maturity-to-ACI or maturity-to-ERS worked conversion is valid. An AIMA practice may be complete while an assessed deployment still lacks the measured result, coverage, effectiveness, architecture applicability, or freshness required by AITBM.

- AIMA verification, monitoring, documentation, and governance records may guide evidence collection. They are not direct ACI generators: only the resulting deployment-specific evidence can be evaluated under AITBM's coverage, provenance, calendar, monitoring, and event rules.

- The frameworks operate mainly at different levels: AIMA grades organizational maturity and process, while AITBM measures an assessed deployment. AIMA v1.0 and Toolkit 1.0.1 use eight lifecycle domains and do not provide an ERS, IVP/ORP/ACI profile, or a dedicated Cn-5 agent-identity metric.

### COMPASS

OWASP Threat Defense COMPASS. Maintained by OWASP GenAI Security Project.

COMPASS supplies an OODA-loop threat-prioritization workflow that ranks known AI threats by Impact x Likelihood. AITBM complements it with deployment-specific, measured system assessment. COMPASS threat classes, Likelihood, Impact, OODA workflow, maturity wording, and register priority are planning context only and never convert directly to an AITBM input or ERS.

*Table 120: COMPASS to AITBM Mapping*

| COMPASS Dimension / Threat Class | Primary AITBM Targets | Evidence Use / Boundary |
| --- | --- | --- |
| Impact (1-5) dimension | Context only | Does not set IVP, Cp, or any numeric AITBM input. |
| Likelihood (1-5) dimension | Context only | Does not set As or any numeric AITBM input. |
| Prompt injection (LLM01:2026) | Ro-1, Cn-1 | Evidence input; adversarial ASR and unauthorized-action tests; no generic ERS |
| Sensitive disclosure (LLM02:2026) | Pr-1, Pr-4 | Evidence input; membership-inference and leakage tests; no generic ERS |
| Excessive agency (LLM03:2026) | Cn-1, Cn-2, Cn-5, Cn-6, Cn-7 | Evidence input; authority, identity, reversibility, and budget tests; no generic ERS |
| Misinformation (LLM07:2026) | Ro-3, Tr-2 | Evidence input; factuality, hallucination-rate, and calibration tests; no generic ERS |
| Bias / discriminatory output | Fa-1, Fa-3, Fa-4 | Evidence input; demographic-parity and counterfactual-fairness tests; no generic ERS |
| Agent impersonation / multi-agent trust | Cn-5 | Evidence input; ISSR and MTTQ tests; no generic ERS |
| OODA cadence (continuous re-run) | Process context only | Does not establish Pc, Ec, Tf, pathway, or ERS. |

Key findings:

- COMPASS scores individual threat rows on assessor-estimated 1-5 Impact and Likelihood scales. In a combined workflow, those values select questions and evidence to collect; AITBM independently derives its system profile and ERS from its own measured evidence and formulas.

- No COMPASS field writes back to AITBM. Likelihood and Impact do not set As or graph-derived Cp; OODA records do not set Pc, Ec, Tf, pathway, or ERS; a threat row does not establish a measured resistance outcome.

- There is no priority-to-ERS numeric crosswalk: COMPASS ranks one threat and ERS scores a whole system. The integration is planning context followed by independent AITBM evidence collection; neither score is written back into the other.

- COMPASS legacy labels translate by semantic identity and remain conditional evidence only: LLM01 Prompt Injection→LLM01:2026 (Ro-1, Cn-1, Cn-3; As); LLM02 Sensitive Information Disclosure→LLM02:2026 (Pr-1, Pr-2, Pr-4); LLM03 Supply Chain→LLM04:2026 (Tr-4, Ro-4; Pc); LLM04 Data and Model Poisoning→LLM05:2026 (Ro-4, Ro-2, Tr-3, Tr-4); LLM05 Improper Output Handling→LLM10:2026 (Cn-3, Cn-1, Cn-6, Ro-1); LLM06 Excessive Agency→LLM03:2026 (Cn-1, Cn-2, Cn-5, Cn-6, Cn-7; Aa); LLM07 System Prompt Leakage→LLM08:2026 Hidden Context Exposure (Pr-1, Cn-1, Cn-3, Tr-3); LLM08 Vector and Embedding Weaknesses→LLM09:2026 (Pr-2, Ro-4, Pr-3, Pr-4, Cn-1); LLM09 Misinformation→LLM07:2026 (Ro-3, Tr-1, Tr-2); LLM10 Unbounded Consumption→LLM06:2026 (Cn-7; As, Aa). Each route requires the stated measured evidence; T8 may provide partial Tr-3 evidence only when audit completeness is demonstrated.

### MITRE D3FEND

MITRE D3FEND (Detection, Denial, and Disruption Framework Empowering Network Defense). Maintained by The MITRE Corporation.

D3FEND supplies a formal seven-tactic ontology of general defensive countermeasures. The current ontology is 1.6.0, dated August 31, 2026, and its technique catalogue is unchanged at 271 rows across the same seven tactics, while this disclosed crosswalk remains intentionally pinned to the D3FEND 1.0 baseline. AITBM applies one evidence layer to D3FEND and the AI-specialized AIDEFEND catalogue and counts overlapping evidence only once.

*Table 121: MITRE D3FEND to AITBM Mapping*

| D3FEND Tactic | Primary AITBM Targets | Evidence Use / Boundary |
| --- | --- | --- |
| Model (Asset Inventory, System Mapping) | Tr-4, ACI Pc, Cn-1 | Inventory, topology, and provenance evidence; no automatic AITBM score change |
| Harden (Message/App Hardening, Agent Authentication) | Ro-1, Cn-3, Cn-5, Cn-4, Ro-4 | Measured prevention and hardening effectiveness may support the listed sub-metrics; no fixed anchor or ERS change |
| Detect (Process/User Behavior Analysis, Monitoring) | Tr-3, Ro-3, Cn-1, Cn-2 | Detection, audit, and monitoring evidence may support Tr-3, Ro-3, and eligible ACI inputs; admissibility and freshness rules govern |
| Isolate (Execution Isolation, Network Isolation) | Cn-1, Cn-4 / ORP As, Cp | Isolation evidence may support containment and attack-surface assessment; Cp remains graph-derived |
| Deceive (Decoy Environment, Decoy Object) | Tr-3, Cn-2 / ORP Rf | Decoy telemetry is candidate detection and remediation evidence; no fixed score effect |
| Evict (Process/Credential Eviction) | ORP Rf, Cn-2 | Measured eviction and quarantine evidence may support Cn-2 and Rf; no automatic CRM step |
| Restore (Restore Object/rollback, Restore Access) | ORP Rf | Measured rollback and recovery evidence may support Rf and provenance assessment |
| Harden :: Agent Authentication (1.x) [standout] | Cn-5 | ISSR and attestation-coverage evidence may support Cn-5; AITBM scoring criteria still govern |

Key findings:

- A D3FEND countermeasure is an implementable control, not a score. When deployment evidence demonstrates effectiveness against an AITBM test method, it can support a sub-metric anchor from 0.00 to 1.00 and affect the resulting IVP/ORP/ACI calculation; no fixed ERS reduction is inherent to a control.

- D3FEND (general cyber defense) and AIDEFEND (AI-specialized, modeled on D3FEND's same seven tactics) are concentric, not redundant; a D3FEND control and its AIDEFEND twin targeting the same sub-metric are scored once, never double-counted.

- Harden and Isolate carry the most IVP-moving weight (especially Agent Authentication -> Cn-5), while Detect/Deceive/Evict/Restore act largely through the ORP layer (Rf, As, Cp) and by sustaining ACI freshness.

- Worked example: a full D3FEND stack on an agentic Tier-I system drops ERS from 10.0 (Critical) to 3.2 (Low-Moderate) - IVP 0.27->0.69, CRM 1.60->1.00, ACI 0.43->0.90 - with Agent Authentication (Cn-5) the single highest-leverage control.

### CVSS

Common Vulnerability Scoring System (CVSS). Maintained by FIRST.org (CVSS Special Interest Group).

CVSS is the established 0-10 severity standard for discrete software vulnerabilities. AITBM is a complementary AI-system assessment framework, not a successor to CVSS. CVSS metrics provide vulnerability context only unless separate assessed-system evidence satisfies an AITBM rubric; no CVSS metric or group transfers automatically to an AITBM input.

*Table 122: CVSS to AITBM Mapping*

| CVSS Metric Group | Primary AITBM Sub-Metrics | Illustrative Scenario Effect / Notes |
| --- | --- | --- |
| Vulnerable System Confidentiality (VC/C) | Pr-1, Pr-2, Pr-4, Cn-3 | Conditional conceptual route only; separate assessed-system evidence is required. |
| Vulnerable System Integrity (VI/I) | Ro-3, Ro-4, Cn-1 | Conditional conceptual route only; separate assessed-system evidence is required. |
| Subsequent System / Scope (SC-SI-SA / S) | ORP Cp, Cn-5 | Conceptual context only; it never sets graph-derived Cp or Cn-5. |
| Attack Vector / Complexity / Requirements (AV/AC/AT) | ORP As, Ro-1 | Conditional conceptual route only; AI exploitability remains empirical. |
| Exploit Maturity (E, Threat group) | Context only | Not ACI Tf; E tracks exploit state, whereas ACI evaluates assessment evidence freshness. |
| Environmental group (Security Reqs, Modified Base) | Context only | Never populates CRM, architecture weights, or another AITBM input. |
| Supplemental: Safety / Automatable / Recovery (v4.0) | Context only | Never populates Aa, Cp, Rf, Cn-6, CRM, or another AITBM input. |
| (No CVSS metric) | Fa-1..Fa-4 (Fairness), Tr-1..Tr-4 (Transparency) | No correspondence; CVSS has no bias or explainability axis |
| (No CVSS metric) | Ro-2 (Distribution Shift), ACI Pc/Ec | No correspondence; CVSS cannot represent drift or assessment provenance |

Key findings:

- Scope distinction: CVSS Base, Threat, Environmental, and Supplemental values describe a vulnerability and its context. Vulnerable-system Availability (VA) is context only, not Cn-4; Exploit Maturity (E) is context only, not ACI Tf; Environmental aggregates and Supplemental values never populate CRM, weights, Aa, Cp, Rf, Cn-6, or another AITBM input. AITBM requires independently assessed system evidence.

- Founding motivation: CVSS Threat and Environmental metrics may change with exploitation and deployment context. AITBM's ACI separately decays confidence when evidence supporting an assessed AI system becomes stale; the differing mechanisms are complementary, not a metric conversion.

- Complementary, not competitive: CVSS remains correct for conventional CVEs inside an AI stack (an unpatched serving-stack CVE even feeds AITBM's ORP As); AITBM scores the AI-specific risk layer that has no CVE, patch, or static severity. Never average a CVSS Base score with an ERS.

- Worked contrast (an EchoLeak-class agentic-injection scenario): Microsoft assigned CVSS 9.3 while the NVD Base score is 7.5. Those scores describe the vulnerability under their stated vectors; CVSS Threat and Environmental values can vary. The illustrative AITBM scenario yields ERS 7.1, with an evidence-age interval of 6.7 to 7.6, exposes Cn-5=0.10 as a system-level weakness outside CVSS's scope, and models remediation to ERS 4.0.

## Tier 4: Governance Reference

Tier 4 is a general-purpose AI governance reference, mapped for completeness.

### GPAI Code of Practice

General-Purpose AI Code of Practice (GPAI CoP). Maintained by European Commission / EU AI Office.

The GPAI Code of Practice is the voluntary EU governance instrument through which GPAI model providers operationalize AI Act Articles 53-55 commitments. This AITBM-authored crosswalk offers an optional technical-risk measurement approach for relevant evidence artifacts; it neither signs the Code nor establishes or discharges any legal obligation.

*Table 123: GPAI Code of Practice to AITBM Mapping*

| GPAI CoP Chapter | Primary AITBM Sub-Metrics | Illustrative Scenario Effect / Notes |
| --- | --- | --- |
| Transparency - Documentation / Model Documentation Form | Tr-4, Tr-1, Tr-3 | ACI Pc; Tr axis + confidence; Art 53 |
| Copyright - copyright policy, TDM opt-out, lawful crawling | Pr-1, Pr-3, Tr-4 | ACI Pc; Pr axis; Art 53 (legal lawfulness not scored) |
| Safety & Security - model evaluations + adversarial testing | Ro-1, Ro-4, Ro-3 | ACI Ec + Tf reset on each re-run; Art 55 |
| Safety & Security - systemic-risk identification / analysis / acceptance | ORP Cp, Rf evidence | Scenarios and dependency records feed the SDG; Cp remains graph-derived; Art 55 |
| Safety & Security - safety mitigations (harmful output) | Cn-2, Cn-3, Fa-1..Fa-4 | Cn / Fa axes; Art 55 |
| Safety & Security - security mitigations (model-weight cybersecurity) | Cn-4, Cn-1, Cn-5 | Cn axis; Art 55 |
| Safety & Security - serious-incident reporting + documentation | Tr-3, Tr-4 | ACI Pc; confidence; Art 55 |
| Safety and Security Model Report | Tr-3, Tr-4 | ACI Pc; consolidated evidence package; Art 55 |

Key findings:

- The Code addresses provider commitments, while AITBM assesses technical risk, confidence, and evidence freshness. The Code does not prescribe one residual-risk score; this crosswalk offers AITBM as an optional measurement approach, not one specified or endorsed by the EU AI Office.

- Each commitment produces a concrete artifact (Model Documentation Form, copyright policy, evaluation/red-team reports, Safety and Security Model Report, incident logs) that an assessor consumes as objective evidence, reducing assessor discretion; recurring evaluations are the ideal ACI Tf refresh input.

- Boundary discipline: a favourable ERS does NOT demonstrate adherence, discharge any AI Act obligation, or carry standing before the AI Office; AITBM scores the evidence, not the signatory commitment - two signatories can have very different ERS profiles.

- The dated GPAI worked example predates GDCP and the current ERS composition. A current assessment must rebuild the System Dependency Graph, derive Aa/As/Cp/Rf, and use Section 5; a systemic-risk designation alone does not set Cp.
