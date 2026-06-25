# EXTERNAL FRAMEWORK MAPPINGS

AITBM is a governing quantification layer for AI security: it does not replace the frameworks below, it scores them. This section summarizes how each of the sixteen external frameworks AITBM aligns to maps into its scoring system, where the mapping direction is always External framework element → AITBM sub-metric(s) → 0–10 Effective Risk Score (ERS). The full per-framework mappings — detailed tables, five-level scoring guidance, bidirectional gap analysis, and worked examples — are maintained in the project repository under docs/framework-mappings/.

## Mapping Summary

The sixteen mapped frameworks span threat taxonomies, control verification standards, certification regimes, governance and regulatory instruments, maturity models, defensive ontologies, and prior-art scoring systems. The summary table below lists each framework with its tier, category, and the AITBM sub-metrics it most directly exercises; per-tier detail follows.

*Table 92: External Framework Mapping Summary*

| Framework | Tier | Framework Type | Representative AITBM Sub-Metrics |
| --- | --- | --- | --- |
| OWASP Top 10 for LLMs | Tier 1 | Vulnerability catalogue | Ro-1, Cn-3, Pr-1, Pr-3, Tr-4, Ro-4 |
| OWASP Top 10 for Agentic Applications | Tier 1 | Agentic threat taxonomy | Ro-4, Cn-1, Cn-2, Ro-3, Tr-2, Ro-1 |
| OWASP AISVS | Tier 1 | Control verification standard | Ro-4, Tr-4, Pr-1, Ro-1, Cn-1, Cn-3 |
| MITRE ATLAS | Tier 1 | Adversarial threat landscape | Cn-5, Pr-2, Ro-1, Ro-4, Cn-1, Cn-3 |
| AIUC-1 | Tier 1 | Certification + insurance standard for AI agents | Pr-1, Pr-2, Pr-3, Pr-4, Ro-1, Cn-1 |
| AIDEFEND | Tier 1 | Defensive technique catalogue | Tr-4, Ro-4, Cn-1, Cn-2, Cn-5, Ro-1 |
| NIST AI RMF | Tier 2 | Risk management framework | Ro-2, Ro-3, Tr-2, Cn-1, Cn-3, Cn-2 |
| ISO/IEC 42001 and 42005 | Tier 2 | AI management system | Cn-1, Ro-1, Ro-2, Ro-3, Pr-1, Pr-3 |
| EU AI Act | Tier 2 | Regulatory framework (binding law) | Pr-1, Pr-3, Pr-4, Fa-3, Tr-4, Tr-3 |
| CSA AI Security | Tier 2 | Cloud AI security framework (threat model + controls) | Ro-1, Ro-4, Pr-1, Pr-2, Cn-1, Ro-2 |
| NIST Cyber AI Profile (IR 8596) | Tier 3 | Cyber-AI CSF profile | Ro-1, Ro-4, Cn-1, Cn-2, Cn-4, Pr-1 |
| AIMA | Tier 3 | Maturity model | Fa-1, Fa-2, Fa-3, Fa-4, Tr-1, Tr-3 |
| COMPASS | Tier 3 | Security maturity / scoring (threat prioritization workflow) | Ro-1, Cn-1, Pr-1, Pr-4, Cn-2, Cn-5 |
| MITRE D3FEND | Tier 3 | Defensive countermeasure ontology | Tr-4, Cn-1, Ro-1, Cn-3, Cn-5, Cn-4 |
| CVSS | Tier 3 | Vulnerability scoring (prior art) | Pr-1, Pr-2, Pr-4, Cn-3, Ro-3, Ro-4 |
| GPAI Code of Practice | Tier 4 | GPAI governance | Tr-4, Tr-1, Tr-3, Pr-1, Pr-3, Ro-1 |

## Tier 1: Critical Frameworks

Tier 1 frameworks are the core threat taxonomies, control standards, and certification regimes most directly relevant to AITBM positioning and to the OWASP submission.

### OWASP Top 10 for LLMs

OWASP Top 10 for LLM Applications. Maintained by OWASP Foundation.

The OWASP Top 10 for LLMs provides a qualitative catalogue of the ten most critical LLM application vulnerabilities, and AITBM adds quantitative 0-10 ERS scoring, multi-dimensional IVP profiles, operational-context amplification (ORP/CRM), and temporal confidence decay (ACI) on top of it.

*Table 93: OWASP Top 10 for LLMs to AITBM Mapping*

| OWASP LLM Risk | Primary AITBM Sub-Metrics | ERS / Notes |
| --- | --- | --- |
| LLM01 Prompt Injection | Ro-1, Cn-3 | ERS 8.2 (High) |
| LLM02 Sensitive Information Disclosure | Pr-1, Pr-3 | ERS 8.5 (High) |
| LLM03 Supply Chain | Tr-4, Ro-4 | ERS 7.8 (High) |
| LLM04 Data and Model Poisoning | Ro-4, Fa-3 | ERS 8.7 (High) |
| LLM05 Improper Output Handling | Cn-3, Cn-1 | ERS 8.0 (High) |
| LLM06 Excessive Agency | Cn-1, Cn-2 | ERS 8.9 (High, near Critical) |
| LLM07 System Prompt Leakage | Pr-1, Tr-1 | ERS 7.2 (High) |
| LLM08 Vector and Embedding Weaknesses | Ro-2, Pr-3 | ERS 7.5 (High) |
| LLM09 Misinformation | Tr-2, Ro-3 | ERS 7.0 (Moderate-High) |
| LLM10 Unbounded Consumption | Cn-4, Ro-2 | ERS 6.8 (Moderate-High) |

Key findings:

- All 10 LLM risks map cleanly to AITBM sub-metrics; average unmitigated ERS is 7.95 (High), with controls yielding an average 3.6-point (~45%) reduction.

- LLM06 Excessive Agency is the highest-risk item (ERS 8.9) and is driven by a Containment-axis collapse; its worked example brings in Cn-5 (Agent Identity Integrity) alongside Cn-1/Cn-2, showing agentic identity as a load-bearing factor.

- AITBM extends the catalogue with a Fairness dimension (Fa-1..Fa-4) that OWASP does not systematically address, plus ACI temporal decay for the otherwise-static OWASP classification.

- The residual risk floor (alpha=0.15) means even fully mitigated risks retain a non-zero ERS, reflecting irreducible operational risk.

### OWASP Top 10 for Agentic Applications

OWASP Agentic AI - Threats and Mitigations (T1-T15 taxonomy; companion OWASP Top 10 for Agentic Applications 2026, ASI01-ASI10). Maintained by OWASP GenAI Security Project - Agentic Security Initiative (ASI).

The OWASP agentic taxonomy enumerates fifteen threats specific to autonomous, tool-calling, memory-bearing, and multi-agent systems, and AITBM adds deterministic five-level scoring, multi-dimensional IVP/ORP/ACI quantification, and a comparable 0-10 ERS per threat with remediation measured as an ERS delta.

*Table 94: OWASP Top 10 for Agentic Applications to AITBM Mapping*

| Agentic Threat | Primary AITBM Sub-Metrics | ERS / Notes |
| --- | --- | --- |
| T1 Memory Poisoning | Ro-4, Cn-1 | ERS 7.0 (High) |
| T3 Privilege Compromise | Cn-2, Cn-1 | ERS 7.9 (High) |
| T5 Cascading Hallucination Attacks | Ro-3, Tr-2 | ERS 6.6 (Moderate) |
| T6 Intent Breaking & Goal Manipulation | Cn-1, Ro-1 | ERS 7.0 (High) |
| T9 Identity Spoofing & Impersonation | Cn-5, Cn-2 | ERS 8.3 (highest in taxonomy) |
| T11 Unexpected RCE and Code Attacks | Cn-1, Cn-3 | ERS 8.1 (High) |
| T12 Agent Communication Poisoning | Cn-5, Ro-4 | ERS 7.1 (High) |
| T13 Rogue Agents in Multi-Agent Systems | Cn-5, Cn-1 | ERS 8.2 (second-highest) |
| T15 Human Manipulation | Cn-3, Tr-2 | ERS 5.8 (Moderate) |

Key findings:

- The three highest-ERS threats - T9 Identity Spoofing (8.3), T13 Rogue Agents (8.2), and T11 RCE (8.1) - are all Containment-dominated, and the top two are specifically Cn-5 (Agent Identity Integrity)-led, the strongest external validation of the Cn-5 sub-metric.

- Eleven of the fifteen threats land primarily or secondarily on the Containment axis, empirically justifying the agentic architecture weight of Cn=0.45 (versus 0.15-0.20 for non-agentic classes).

- Cascade-and-autonomy threats (T5, T13, T14) are modeled via ORP Aa (Autonomy Amplification) and Cp (Cascade Potential) with CRM stepping 1.00/1.15/1.35/1.60 as N_elevated rises, so identity/RCE threats reach N=4 (CRM 1.60).

- The companion OWASP Top 10 for Agentic Applications 2026 (ASI01-ASI10, released Dec 9 2025) is a strict subset crosswalked to T1-T15; ASI03/ASI07/ASI10 are Cn-5-led, and ASI04 (supply chain) is flagged tentative with no dedicated T-item.

### OWASP AISVS

OWASP AI Security Verification Standard (AISVS). Maintained by OWASP Foundation.

AISVS is a community-driven catalogue of testable AI security requirements (14 chapters, 170+ controls, levels L1/L2/L3) answering 'what controls should exist', and AITBM consumes its control-verification evidence to score 'how risky is this system', turning binary checklists into quantitative ERS and selecting assessment tier from AISVS level.

*Table 95: OWASP AISVS to AITBM Mapping*

| AISVS Chapter | Primary AITBM Sub-Metrics | ERS / Notes |
| --- | --- | --- |
| C1 Training Data Integrity & Traceability | Ro-4, Tr-4, Pr-1 | ~3.7-point reduction |
| C2 User Input Validation | Ro-1, Cn-1, Cn-3 | ~5.9-point reduction (highest) |
| C5 Access Control & Identity | Cn-5, Cn-1, Pr-2 | ~3.0-3.5-point reduction |
| C6 Supply Chain Security | Ro-4, Tr-4, ACI Pc | ~2.0-2.5 + ACI Pc gain |
| C9 Autonomous Orchestration & Agentic Action | Cn-1, Cn-2, Cn-5 | ~7.0-point reduction (agentic) |
| C10 Model Context Protocol (MCP) Security | Cn-5, Ro-1, Cn-2 | ~4.0-5.0-point reduction |
| C11 Adversarial Robustness & Attack Resistance | Ro-1, Ro-2, Ro-4, Pr-2 | ~5.0-point reduction |
| C12 Privacy Protection & Personal Data | Pr-1, Pr-2, Pr-3, Pr-4 | ~2.5-3.5-point reduction |
| C13 Monitoring, Logging & Anomaly Detection | Tr-3, ACI Ec, ACI Tf | ~1.5-2.0 + ACI freshness |

Key findings:

- AISVS gives strong coverage of 17/21 AITBM sub-metrics (81%), partial on 3 (Fa-1/Fa-2/Fa-3, security-relevant bias only), and a single intentional gap at Fa-4 counterfactual fairness, which AISVS defers to ISO 42001 / NIST AI RMF.

- AISVS C5, C9.4, and C10.2 directly target Cn-5 (Agent Identity Integrity), confirming AITBM's decision to add agent identity as a first-class sub-metric; C9+C10 are 87 requirements (~48% of the standard), validating the elevated agentic Containment weight.

- Worked example: full AISVS L3 compliance on an agentic/RAG/MCP financial-advisory system drops ERS from 10.0 (Critical MVT) to 1.63 (Low), an 8.4-point reduction; the result stays above 0 because of the alpha=0.15 residual risk floor.

- AISVS levels map to AITBM tiers (L1->Tier III, L2->Tier II, L3->Tier I), and C6 (AIBOM) + C13 (continuous monitoring) drive the ACI provenance (Pc) and temporal-freshness (Tf) terms.

### MITRE ATLAS

MITRE ATLAS (Adversarial Threat Landscape for Artificial Intelligence Systems). Maintained by MITRE Corporation.

MITRE ATLAS is an ATT&CK-style knowledge base of adversarial AI tactics, techniques, and real-world case studies (14 tactics, 50+ techniques), and AITBM serves as its quantification layer, converting each tactic/technique into a 0-10 ERS with multi-dimensional IVP profiles, ORP amplification, and ACI temporal decay.

*Table 96: MITRE ATLAS to AITBM Mapping*

| ATLAS Tactic | Primary AITBM Sub-Metrics | ERS / Notes |
| --- | --- | --- |
| AML.TA0002 Initial Access | Cn-5, Pr-2 | ERS 7.0-8.5 |
| AML.TA0003 ML Attack Staging | Ro-1, Ro-4 | ERS 7.5-9.5 |
| AML.TA0004 Execution | Cn-1, Cn-3 | ERS 7.0-9.0 |
| AML.TA0006 Privilege Escalation | Cn-2, Cn-5 | ERS 8.0-9.5 |
| AML.TA0007 Defense Evasion | Cn-4, Tr-2, Tr-3 | ERS 7.0-8.5 |
| AML.TA0008 Credential Access | Cn-5, Pr-2 | ERS 8.5-9.5 |
| AML.TA0011 ML Model Access | Pr-1, Pr-2, Tr-4 | ERS 7.5-9.0 |
| AML.TA0012 Exfiltration | Pr-1, Pr-4, Tr-3 | ERS 8.0-10.0 |
| AML.TA0013 Impact | Ro-2, Ro-3, Ro-4 | ERS 8.0-10.0 |

Key findings:

- Technique-level scoring spans the full range: AML.T0051 LLM Prompt Injection at ERS 8.8 and AML.T0018 Backdoor ML Model at ERS 9.1, with controls typically cutting 4-6 ERS points.

- The emerging MCP technique Agent Identity Spoofing scores Cn-5=0.00 and ERS 9.7, and remediating Cn-5 to full PKI/SPIFFE (1.00) yields a 6.9-point drop, the single largest remediation impact in the framework, validating Cn-5.

- Case-study retrospectives align with real severities: CVE-2025-32711 EchoLeak (CVSS 9.3) scores ERS 9.2 and the Postmark MCP supply-chain breach scores ERS 9.5, both driven by Containment/Cn-5 collapse and reaching CRM 1.60-1.75.

- ATLAS has thin coverage of Fairness/Transparency attacks; AITBM fills this with the Fa axis (e.g., AML.T0048 Societal Harm maps to Fa-1/Fa-2/Fa-3) and adds ACI temporal-freshness decay the static ATLAS catalogue lacks.

### AIUC-1

AIUC-1 (Artificial Intelligence Underwriting Company Standard 1). Maintained by Artificial Intelligence Underwriting Company (AIUC).

AIUC-1 is a pass/fail, Lloyd's-insured certification standard for AI agents that attests controls have been independently verified; AITBM adds the quantitative, multi-dimensional, confidence-graded risk score (IVP/ORP/ACI to ERS) that a binary certificate cannot express.

*Table 97: AIUC-1 to AITBM Mapping*

| AIUC-1 Domain | Primary AITBM Sub-Metrics | ERS / Notes |
| --- | --- | --- |
| A - Data & Privacy (7 req / 20 controls) | Pr-1, Pr-2, Pr-3, Pr-4 | Data sensitivity raises deployment tier |
| B - Security (9 req / 29 controls) | Ro-1, Cn-1, Cn-2 | B001 quarterly adversarial test feeds Ro-1 ASR |
| C - Safety (12 req / 29 controls) | Cn-3, Fa-1, Fa-2, Fa-3, Fa-4, Ro-3 | C003 bias testing feeds fairness rubrics |
| D - Reliability (4 req / 10 controls) | Ro-3, Cn-1, Cn-2 | D002 hallucination rate is direct Ro-3 input; quarterly resets ACI Tf |
| E - Accountability (17 req / 37 controls) | Tr-1, Tr-3, Tr-4 | E015 logging feeds Tr-3; improves ORP Rf |
| F - Society (2 req / 4 controls) | Cn-2, Cn-3, Tr-4 | Catastrophic-misuse exposure informs tier + ACI threat override |

Key findings:

- AIUC-1 validates AITBM's residual-risk floor (alpha=0.15): its entire insurance business model exists because controls cannot eliminate AI-agent risk, encoding the same truth financially that AITBM encodes mathematically.

- The official AIVSS-AIUC-1 crosswalk maps ZERO controls to Agent Identity Impersonation and Multi-Agent Orchestration, and AIUC-1 is explicitly single-agent scoped (26 of 51 requirements have no AIVSS core-risk mapping) - a measured blind spot that AITBM's Cn-5 (Agent Identity Integrity) and agentic/MCP weighting directly address.

- AIUC-1's quarterly third-party re-testing cadence (B001, C010, D002, D004) is a natural BBD/ACI refresh trigger: each quarterly report resets Temporal Freshness (Tf) for covered sub-metrics, complementing AITBM's continuous temporal decay versus AIUC-1's mechanical 12-month validity.

- Division of labor mirrors AISVS: AIUC-1 answers whether controls are implemented/verified and who pays if they fail (binary cert + Lloyd's-backed insurance up to $50M); AITBM answers how risky the system is, across dimensions, with what confidence, over time.

### AIDEFEND

AIDEFEND (AI Defense Framework). Maintained by Edward Lee (independent, community-driven; CC BY 4.0).

AIDEFEND is an open-source catalogue of 86 defensive techniques across 7 tactics (aligned to MITRE D3FEND) answering what controls should exist; AITBM is the universal quantification layer that translates each deployed control into a measurable change in a multi-dimensional risk score (ERS).

*Table 98: AIDEFEND to AITBM Mapping*

| AIDEFEND Tactic | Primary AITBM Sub-Metrics | ERS / Notes |
| --- | --- | --- |
| Model (10 techniques) | Tr-4, Ro-4, Cn-1, Cn-2, Cn-5 | AID-M-009 Autonomy Governance: -5.4 ERS |
| Harden (35 techniques) | Ro-1, Cn-1, Cn-2, Cn-3, Cn-5 | AID-H-019 Permission Restriction: -5.8 ERS (top control) |
| Detect (16 techniques) | Ro-1, Ro-3, Cn-1, Cn-2, Cn-5, Tr-3 | AID-D-011 Agent Behavior Monitoring: -3.6 ERS |
| Isolate (8 techniques) | Cn-1, Cn-4 | Primarily reduces ORP/CRM, not IVP |
| Deceive (7 techniques) | Tr-3 | Honeypots: modest -0.7 ERS, high detection ROI |
| Evict (5 techniques) | Cn-2 | AID-E-005 auto session termination lowers ORP Rf |
| Restore (5 techniques) | Cn-2, Tr-4 | AID-R-001 versioning/rollback improves ORP Rf |

Key findings:

- Agentic containment controls (Cn-1, Cn-2, Cn-5) deliver the highest risk reduction: the 6 agentic-focused techniques account for ~55% of total ERS-reduction capacity; the top two controls (AID-H-019 Permission Restriction -5.8, AID-M-009 Autonomy Governance -5.4) both validate Cn-5.

- Worked example (financial-services agentic RAG, Tier I): a 12-control AIDEFEND stack drops ERS from 9.7 (Critical MVT) to 3.2 (Low-Moderate), a -6.5 / 67% reduction, with IVP +113%, CRM 1.60 to 1.00, and ACI +125%.

- Drift/anomaly detection (AID-D-002) and Restore techniques are essential for sustaining the ACI Temporal Freshness (Tf) and ORP Remediation Feasibility (Rf) components, linking controls to AITBM's temporal model.

- AIDEFEND has weak Fairness coverage (only ~2 of 86 techniques address bias/fairness), a flagged gap; current catalogue is data version 2026.06.11, reconciled adding AID-H-035 (MCP Server Runtime Boundary) mapped to Tr-3/Cn-1/Cn-2/Cn-5.

## Tier 2: High-Priority Frameworks

Tier 2 frameworks are governance, risk-management, and regulatory regimes with significant complementary scope.

### NIST AI RMF

NIST Artificial Intelligence Risk Management Framework (AI RMF 1.0). Maintained by National Institute of Standards and Technology (NIST), U.S. Department of Commerce.

The NIST AI RMF is a voluntary, qualitative governance framework that names seven trustworthiness characteristics and a MEASURE function but prescribes no metrics; AITBM supplies the deterministic quantitative measurement instrument (21 rubrics, IVP/ORP/ACI to ERS) that the MEASURE function calls for but does not itself provide.

*Table 99: NIST AI RMF to AITBM Mapping*

| RMF Trustworthiness Characteristic | Primary AITBM Sub-Metrics | ERS / Notes |
| --- | --- | --- |
| Valid and Reliable | Ro-2, Ro-3, Tr-2 | Foundational; affects all axes |
| Safe | Cn-1, Cn-3, Cn-2, Ro-3 | High for agentic/user-facing |
| Secure and Resilient | Ro-1, Ro-4, Cn-2, Cn-4, Cn-5 | High; spans Robustness + Containment |
| Accountable and Transparent | Tr-3, Tr-4 | Moderate; also feeds ORP Rf |
| Explainable and Interpretable | Tr-1, Tr-2 | Moderate |
| Privacy-Enhanced | Pr-1, Pr-3, Pr-2, Pr-4 | High for personal-data systems |
| Fair - with Harmful Bias Managed | Fa-1, Fa-3, Fa-2, Fa-4 | Moderate; full Fairness axis |

Key findings:

- MEASURE is the decisive interface: the AI RMF deliberately under-specifies measurement (no score, no thresholds, no aggregation), and AITBM fills exactly that gap, mapping the 4 Core functions to its workflow (GOVERN to tier/pathway + Tr-3/ORP Rf; MAP to architecture preset + ORP As/Cp; MEASURE to IVP + ACI Ec; MANAGE to ERS sensitivity + ACI decay).

- AI RMF 1.0 does not specifically address agent identity/impersonation; AITBM's Cn-5 (Agent Identity Integrity) covers this frontier gap and should be scored explicitly for Agentic-MCP systems even when the RMF assessment is silent.

- AITBM's deterministic rubrics narrow inter-assessor variance and make MEASURE outputs comparable across teams/systems/time (it narrows variance, it does not eliminate it), and its ACI temporal decay supplies the decay model the RMF's continuous-monitoring expectation lacks.

- Worked example (Agentic-MCP bank assistant, RMF done as process only): AITBM converts a qualitative 'treatment in progress' into ERS 7.1 (High) to 3.1 (Low-Moderate) after sensitivity-ranked remediation, with the residual floor (alpha=0.15) preventing a zero score; Containment (Cn-5, Cn-1) is the dominant weakness at 45% agentic weight.

### ISO/IEC 42001 and 42005

ISO/IEC 42001:2023 (with ISO/IEC 42005:2025 impact assessment). Maintained by ISO/IEC JTC 1/SC 42.

ISO/IEC 42001 certifies an organization's AI management system and ISO/IEC 42005 structures a per-system impact assessment, while AITBM adds the quantitative, multi-dimensional, time-aware residual-risk measurement (IVP/ORP/ACI to ERS) those processes call for but do not themselves produce.

*Table 100: ISO/IEC 42001 and 42005 to AITBM Mapping*

| ISO 42001 Annex A Control Objective | Primary AITBM Sub-Metrics | ERS / Notes |
| --- | --- | --- |
| A.2 Policies related to AI | ORP Aa, Cn-1 | Sets autonomy and scope baseline; tier selection |
| A.5 Assessing impacts of AI systems | ORP Cp, ACI Pc | Anchors ERS severity band; bridges to ISO/IEC 42005 |
| A.6 AI system life cycle | Ro-1, Ro-2, Ro-3 | V&V and monitoring raise robustness and freshness |
| A.7 Data for AI systems | Pr-1, Pr-3, Pr-4, Fa-3, Ro-4 | Data controls feed privacy, representation, poisoning resistance |
| A.8 Information for interested parties | Tr-1, Tr-4, Tr-3 | Disclosures and model cards raise transparency |
| A.9 Use of AI systems | Cn-1, Cn-2, Cn-3, Cn-5 | Human oversight and use boundaries raise containment, lower Aa |
| A.10 Third-party and customer relationships | Tr-4, Ro-4, ORP Cp | Supply-chain lineage, poisoning resistance, cascade scope |
| 42005 Severity rating (1-5) | ORP Cp | Sets the expected ERS severity band |
| 42005 impact-assessment record (whole) | ACI Pc, ACI Tf | First-class provenance evidence; monitoring sustains freshness |

Key findings:

- Neither ISO standard contains an agentic-identity control, so AITBM's Cn-5 (Agent Identity Integrity) measures a blind spot ISO governance cannot close - in the agentic underwriting worked example Cn-5=0.25 is the single largest drag on the agentic-weighted Containment axis.

- ISO/IEC 42005 deliberately refuses to collapse impact into one score, mirroring AITBM's architecture (IVP preserves five-axis signal; ORP and ACI stay separate) - AITBM is the quantitative impact-assessment instrument 42005 conceptually calls for.

- ISO certification raises confidence in the evidence chain (better ACI Pc/Ec/Tf) but never lowers a system's intrinsic risk; the alpha=0.15 residual-risk floor applies regardless of certification.

- AITBM is not an accredited certification and defines no governance clauses; ISO produces no quantitative ERS, no temporal-decay model, and no architecture-specific weighting - the two are genuinely complementary at different altitudes.

### EU AI Act

Artificial Intelligence Act - Regulation (EU) 2024/1689. Maintained by European Union (European Parliament and Council of the EU).

The EU AI Act is binding law establishing risk tiers and provider obligations enforced through conformity assessment and CE marking, while AITBM is a technical-risk quantification framework that helps providers prioritise and evidence the Act's Article 9 and Article 15 technical duties without ever certifying legal conformity.

*Table 101: EU AI Act to AITBM Mapping*

| EU AI Act Obligation | Primary AITBM Sub-Metrics | ERS / Notes |
| --- | --- | --- |
| Risk-management system | Whole IVP, ORP, ERS | Full AITBM assessment re-run on tier cadence |
| Data and data governance | Pr-1, Pr-3, Pr-4, Fa-3 | Dataset bias and representation testing; minimisation |
| Technical documentation (Annex IV) | Tr-4, ACI Pc | Model lineage; documentation completeness |
| Record-keeping (logging) | Tr-3 | Audit-trail coverage and tamper-evidence |
| Transparency to deployers | Tr-1 | Explainability depth; instructions for use |
| Human oversight | Cn-2, ORP Aa (inverse) | Intervention/override controls lower autonomy |
| Accuracy, robustness and cybersecurity | Ro-1, Ro-2, Ro-3, Cn-1, Cn-3, Cn-4 | Attack-success-rate; shift/consistency; security controls |
| Limited-risk transparency obligations | Tr-1, Tr-3 | AI-interaction disclosure; synthetic-content labelling |
| GPAI systemic-risk assessment | ORP Cp, ORP Aa | Systemic risk maps to cascade potential, elevating CRM |

Key findings:

- The EU AI Act is binding law and AITBM is not: a favourable ERS does not certify conformity, replace conformity assessment, CE marking, or registration, and carries no legal standing - AITBM only supports the conformity dossier as a due-diligence artifact.

- Legal tier and technical risk are different axes: the transparency-tier agentic customer-service assistant scores ERS 5.2 (Moderate), higher than the high-risk CV-screening system at 4.9, because weak Containment (Cn-1/Cn-2/Cn-5) plus elevated autonomy and attack surface make it technically riskier despite a lighter legal burden.

- AITBM converts the Act's qualitative 'appropriate / state-of-the-art' expectations under Article 9 and Article 15 into deterministic 0.00-1.00 rubric scores, and ACI temporal decay forcing re-measurement directly evidences the Act's continuous-risk-management and post-market-monitoring requirements.

- The Act is technology-neutral and predates agentic/MCP identity threats, so it largely lacks the Cn-5 agent-identity-integrity and architecture-specific weighting that AITBM provides; the Digital Omnibus political agreement (7 May 2026) defers high-risk start dates but leaves transparency obligations intact.

### CSA AI Security

CSA AI Security (MAESTRO + AI Controls Matrix). Maintained by Cloud Security Alliance (CSA).

CSA supplies cloud-specific AI security via MAESTRO (7-layer agentic threat taxonomy) and the AI Controls Matrix (18 domains / 243 control objectives); AITBM quantifies MAESTRO threats into IVP sub-metric scores and maps AICM controls into ORP/CRM, adding a deterministic 0-10 ERS and temporal decay for cloud deployments.

*Table 102: CSA AI Security to AITBM Mapping*

| MAESTRO Layer / AICM Domain | Primary AITBM Sub-Metrics | ERS / Notes |
| --- | --- | --- |
| L1 Foundation Models | Ro-1, Ro-4, Pr-1, Pr-2, Cn-1 | Unmitigated ERS ~8.1 (High) |
| L2 Data Operations | Ro-2, Ro-4, Pr-1, Pr-3 | Multi-tenant vector DB ~7.9 (High) |
| L3 Agent Frameworks | Cn-1, Cn-2, Cn-3, Cn-5, Ro-1 | Tool misuse ~9.2 (Critical) to 5.3 mitigated |
| L4 Deployment & Infrastructure | Cn-2, Cn-4, Pr-1, Pr-2 | Multi-tenant GPU side-channel ~8.9 to 4.6 |
| L5 Evaluation & Observability | Tr-2, Tr-3, Pr-1, Cn-2 | Weak observability ~7.2 (High) |
| L6 Security & Compliance | Cn-5 (mainly ORP Dim 4) | Strong controls cut CRM 1.40 to 1.15 |
| L7 Agent Ecosystem | Cn-1, Cn-2, Cn-5, Ro-3 | Multi-agent collusion ~9.6 (Critical) to 6.1 |

Key findings:

- MAESTRO Layer 7 (Agent Ecosystem) drives Containment collapse (Cn composite ~0.12, ERS up to 9.6 Critical); SPIFFE/SPIRE agent-to-agent identity attestation raises Cn-5 from 0.10 to 0.85, directly validating AITBM's Cn-5 and its agentic Containment weighting (30-45%).

- Cloud-specific threats quantified across 4 worked examples: multi-tenant GPU timing/NVBleed (8.9 to 4.6), cross-border data transfer (6.0 to 3.8), AI supply-chain compromise (6.4 to 4.2), and multi-agent collusion (9.0 to 5.8); average AICM-driven reduction ~-3.0 ERS.

- ORP validation: 7 of 8 CSA cloud risk factors (87.5%) fully covered by AITBM's four ORP dimensions; the one gap (supply-chain trust boundary) prompts a proposed ORP Dimension 2 sub-factor.

- AICM Fairness & Bias Management domain maps to the full AITBM Fairness axis (Fa-1 through Fa-4), and the AIBOM/supply-chain transparency domain feeds the ACI Provenance Completeness (Pc) component.

## Tier 3: Specialized Frameworks

Tier 3 frameworks are specialized cyber profiles, maturity models, defensive ontologies, and prior-art scoring systems.

### NIST Cyber AI Profile (IR 8596)

NIST IR 8596 - Cybersecurity Framework Profile for Artificial Intelligence (Cyber AI Profile). Maintained by National Institute of Standards and Technology (NIST), with NCCoE and MITRE contributors.

NIST IR 8596 is a qualitative CSF 2.0 community profile naming which cybersecurity outcomes to pursue when AI is a target, a defensive tool, and an adversary capability, while AITBM supplies the deterministic, multi-dimensional, time-aware ERS that the Profile's 'measure/assess' outcomes leave open.

*Table 103: NIST Cyber AI Profile (IR 8596) to AITBM Mapping*

| Cyber AI Profile Focus Area / CSF Function | Primary AITBM Sub-Metrics | ERS / Notes |
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

- The Profile's principal acknowledged gap - agentic, multi-agent, inter-agent authentication and least-agency - is exactly the territory of AITBM's Cn-5 (Agent Identity Integrity) and agentic architecture weighting.

- The 'Thwart' lens flows through ORP (As elevator) and ACI (faster Tf decay) rather than IVP: AI-enabled adversaries should raise Attack Surface Exposure (e.g. 0.50 to 0.80), lifting N_elevated and CRM - operational and temporal dimensions a qualitative profile cannot express numerically.

- Coverage is strongest where AITBM's Robustness and Containment axes live (Secure): 8/21 sub-metrics strong, 8/21 partial, 5/21 gaps (Fa-1, Fa-3, Fa-4, Pr-4, Cn-5); the Fairness axis sits outside a cybersecurity profile's scope and DETECT explicitly names model drift (Ro-3) and data poisoning (Ro-4).

- IR 8596 is a preliminary draft (Dec 16, 2025) with no quantitative score or residual-risk floor; AITBM is the common quantitative denominator that turns its CSF outcomes into a comparable, confidence-graded ERS.

### AIMA

OWASP AI Maturity Assessment (AIMA). Maintained by OWASP Foundation.

OWASP AIMA grades an organization's AI-program maturity qualitatively across eight lifecycle domains, while AITBM operationalizes that maturity quantitatively - turning the maturity grade into Tiered Assessment Pathway eligibility and, through the ACI components (Pc/Ec/Tf), into the confidence and freshness of a per-system ERS.

*Table 104: AIMA to AITBM Mapping*

| AIMA Domain | Primary AITBM Sub-Metrics | ERS / Notes |
| --- | --- | --- |
| Responsible AI | Fa-1, Fa-2, Fa-3, Fa-4, Tr-1 | Fairness/explainability artifacts; raises Ec |
| Governance | Tr-3, Tr-4, ORP Rf | Pc and deployment-tier assignment |
| Data Management | Pr-1, Pr-3, Ro-4 | Data lineage is the canonical Pc source |
| Privacy | Pr-1, Pr-2, Pr-3, Pr-4 | Privacy-by-design; Ec and tier assignment |
| Design | Cn-1, Cn-2, Ro-2 | Threat modeling sets containment boundaries |
| Implementation | Cn-3, Cn-4, Cn-5 | Secure build provenance; agentic identity binding |
| Verification | Ro-1, Ro-3, Cn-3, Cn-5 | Red-team/eval reports; strongest Ec + Tf driver |
| Operations | Tr-3, ORP Rf, ORP As | Monitoring keeps Tf fresh; incident-response improves Rf |

Key findings:

- AIMA maturity maps to measurement confidence, not intrinsic risk: Level 1 to Lite/ACI ~0.30-0.55, Level 2 to Standard/ACI ~0.55-0.75, Level 3 to Full/ACI ~0.78-0.95 - a high AIMA score never zeros out a system's residual risk (alpha=0.15 floor stands), it makes the ERS complete, comparable, and current.

- The two-org worked example isolates the mechanism: an identical RAG system scores ERS ~4.9 at a Level-1 org versus ~4.0 at a Level-3 org purely through the ACI term (0.45 vs 0.90), since IVP and CRM are held identical - Level-1's score is fragile and decays fast while Level-3's is tight and self-refreshing.

- AIMA's SAMM-derived streams map cleanly to ACI: 'Measure & Improve' is a direct Tf/Ec generator and 'Create & Promote' feeds Pc - this is the CVE/CVSS-vs-drift problem ACI exists to solve, since a one-time deep assessment from an immature org goes stale.

- The two frameworks barely overlap in output, so they compose cleanly: AIMA grades the organization and process; AITBM measures the deployed system. AIMA v1.0 lacks a quantitative ERS, multi-dimensional profile, ORP/CRM, temporal decay, and an explicit Cn-5 agent-identity practice. (Spot-check flag in source: secondary sources disagree on AIMA's maturity-level count and 5-vs-8 domain set; mapping is by domain name so it holds either way.)

### COMPASS

OWASP Threat Defense COMPASS. Maintained by OWASP GenAI Security Project.

COMPASS supplies a fast OODA-loop threat-prioritization workflow that ranks known AI threats by Impact x Likelihood; AITBM adds the deterministic, multi-dimensional, confidence-graded ERS that quantifies each prioritized row across five axes instead of collapsing it into one priority cell.

*Table 105: COMPASS to AITBM Mapping*

| COMPASS Dimension / Threat Class | Primary AITBM Sub-Metrics | ERS / Notes |
| --- | --- | --- |
| Impact (1-5) dimension | IVP sub-metric severity + ORP Cp | Input construct; COMPASS blends failure severity with blast radius that AITBM separates |
| Likelihood (1-5) dimension | IVP sub-metric exposure + ORP As | Input construct; maps to exploitability and deployment exposure |
| Prompt injection (LLM01) | Ro-1, Cn-1 | ERS 6.5-8.5 (High); adversarial ASR + unauthorized-action rate |
| Sensitive disclosure (LLM02) | Pr-1, Pr-4 | ERS 6.0-8.0 (High); membership-inference / leakage probes |
| Excessive agency (LLM06) | Cn-1, Cn-2, Cn-5 | ERS 7.0-9.0 (High-Critical); unauthorized-action + identity-spoofing rate |
| Misinformation / hallucination (LLM09) | Ro-3, Tr-2 | ERS 5.0-7.0 (Moderate-High); hallucination rate + calibration error |
| Bias / discriminatory output | Fa-1, Fa-3, Fa-4 | ERS 4.5-6.5; demographic-parity + counterfactual-fairness tests |
| Agent impersonation / multi-agent trust | Cn-5 | ERS 7.0-9.0 (High-Critical); identity-spoofing success rate (ISSR), MTTQ |
| OODA cadence (continuous re-run) | ACI Tf (Temporal Freshness) | Each re-run resets Tf; BBD decay erodes confidence between runs |

Key findings:

- COMPASS scores individual threat rows on two assessor-estimated 1-5 scales (Impact, Likelihood); AITBM replaces the lossy 1-25 priority cell with a deterministic 0-10 ERS plus a preserved per-axis profile.

- A COMPASS Impact x Likelihood cell entangles failure severity, deployment context, and confidence; AITBM separates these into IVP, ORP/CRM, and ACI so remediation can target the weakest axis (e.g. Cn-1, Cn-5) rather than an opaque '4x4'.

- There is no priority-to-ERS numeric crosswalk: COMPASS ranks one threat, ERS scores a whole system. The integration is evidence flow (score each row's sub-metric -> compose to ERS) and writing ERS-derived severity back into COMPASS.

- Agentic worked example: two interchangeable-looking 4x4 rows resolve to ERS 7.3 (High), with the Cn axis (0.34, driven by Cn-1 and Cn-5) dominating under Agentic 45% Containment weighting; remediation drops it to ~3.9.

### MITRE D3FEND

MITRE D3FEND (Detection, Denial, and Disruption Framework Empowering Network Defense). Maintained by The MITRE Corporation.

D3FEND supplies a formal seven-tactic ontology of general defensive countermeasures (the defensive counterpart to ATT&CK); AITBM turns the fact of each control's implementation into deterministic sub-metric evidence and a measurable ERS reduction, acting as the single quantification layer for D3FEND and its AI-specific specialization AIDEFEND.

*Table 106: MITRE D3FEND to AITBM Mapping*

| D3FEND Tactic | Primary AITBM Sub-Metrics | ERS / Notes |
| --- | --- | --- |
| Model (Asset Inventory, System Mapping) | Tr-4, ACI Pc, Cn-1 | Enables AIBOM; Pc 0.20->0.85; 2-3 pt as enabler |
| Harden (Message/App Hardening, Agent Authentication) | Ro-1, Cn-3, Cn-5, Cn-4, Ro-4 | Highest IVP leverage; 3-5 pt in agentic; Cn-5 0.20->0.75 |
| Detect (Process/User Behavior Analysis, Monitoring) | Tr-3, Ro-3, Cn-1, Cn-2 | 1.4-2.6 pt; sustains ACI Tf freshness |
| Isolate (Execution Isolation, Network Isolation) | Cn-1, Cn-4 / ORP As, Cp | 2-2.6 pt + CRM step down (1.60->1.35->...) |
| Deceive (Decoy Environment, Decoy Object) | Tr-3, Cn-2 / ORP Rf | 0.5-1 pt; high-ROI detection multiplier and Rf improver |
| Evict (Process/Credential Eviction) | ORP Rf, Cn-2 | 1-1.5 pt; collapses MTTQ, steps CRM down |
| Restore (Restore Object/rollback, Restore Access) | ORP Rf | ~1.4 pt; turns weeks of retraining into hours of rollback |
| Harden :: Agent Authentication (1.x) [standout] | Cn-5 | ISSR + attestation coverage; the dimension certification schemes under-measure |

Key findings:

- A D3FEND countermeasure is not a score but an implementable control: AITBM converts implementation into sub-metric rubric evidence (0.00-1.00) that flows through IVP/ORP/ACI into a measurable ERS drop.

- D3FEND (general cyber defense) and AIDEFEND (AI-specialized, modeled on D3FEND's same seven tactics) are concentric, not redundant; a D3FEND control and its AIDEFEND twin targeting the same sub-metric are scored once, never double-counted.

- Harden and Isolate carry the most IVP-moving weight (especially Agent Authentication -> Cn-5), while Detect/Deceive/Evict/Restore act largely through the ORP layer (Rf, As, Cp) and by sustaining ACI freshness.

- Worked example: a full D3FEND stack on an agentic Tier-I system drops ERS from 10.0 (Critical) to 3.2 (Low-Moderate) - IVP 0.27->0.69, CRM 1.60->1.00, ACI 0.43->0.90 - with Agent Authentication (Cn-5) the single highest-leverage control.

### CVSS

Common Vulnerability Scoring System (CVSS). Maintained by FIRST.org (CVSS Special Interest Group).

CVSS is the dominant prior-art 0-10 severity standard for discrete, patchable software vulnerabilities; AITBM is the AI-specific successor that improves on it by adding temporal decay, fairness/transparency/AI-privacy axes, poisoning and drift measurement, agent identity, and deployment-context weighting that CVSS structurally cannot represent.

*Table 107: CVSS to AITBM Mapping*

| CVSS Metric Group | Primary AITBM Sub-Metrics | ERS / Notes |
| --- | --- | --- |
| Vulnerable System Confidentiality (VC/C) | Pr-1, Pr-2, Pr-4, Cn-3 | Loose; CVSS has no membership-inference / extraction concept |
| Vulnerable System Integrity (VI/I) | Ro-3, Ro-4, Cn-1 | Loose; no probabilistic / poisoning corruption in CVSS |
| Subsequent System / Scope (SC-SI-SA / S) | ORP Cp, Cn-5 | Partial; ORP Cp models multi-agent blast radius, not a binary flag |
| Attack Vector / Complexity / Requirements (AV/AC/AT) | ORP As, Ro-1 | Partial; AI exploitability is empirical (attack-success-rate) |
| Exploit Maturity (E, Threat group) | ACI Tf | Inverted; CVSS ages the exploit, ACI ages the defender's evidence |
| Environmental group (Security Reqs, Modified Base) | ORP CRM + architecture-specific IVP weights | Closest analogue but rarely populated in CVSS practice |
| Supplemental: Safety / Automatable / Recovery (v4.0) | ORP Aa, Cp, Rf | Gestural and non-scoring in CVSS; first-class scoring inputs in AITBM |
| (No CVSS metric) | Fa-1..Fa-4 (Fairness), Tr-1..Tr-4 (Transparency) | No correspondence; CVSS has no bias or explainability axis |
| (No CVSS metric) | Ro-2 (Distribution Shift), ACI Pc/Ec | No correspondence; CVSS cannot represent drift or assessment provenance |

Key findings:

- Why insufficient for AI: CVSS is static/point-in-time while AI drifts; it has no axis for fairness, transparency, or AI-specific privacy leakage; it cannot represent probabilistic poisoning or distribution-shift failure; it has no agent identity (Cn-5) or multi-agent blast radius; it collapses signal to one number; and its fixed weights ignore deployment context.

- Founding motivation: a CVSS Base score is computed once and frozen, but a model's robustness/fairness/containment posture decays continuously; AITBM's ACI (BBD-informed temporal decay) is the direct structural answer.

- Complementary, not competitive: CVSS remains correct for conventional CVEs inside an AI stack (an unpatched serving-stack CVE even feeds AITBM's ORP As); AITBM scores the AI-specific risk layer that has no CVE, patch, or static severity. Never average a CVSS Base score with an ERS.

- Worked contrast (EchoLeak-class agentic injection): CVSS reports a frozen 9.3 forever and codes the Cn-5 root cause away as PR:None/SC:High; AITBM yields ERS 7.1 that climbs 6.7 -> 7.6 as evidence ages, surfaces Cn-5=0.10 as the load-bearing failure, and quantifies remediation to 4.0.

## Tier 4: Governance Reference

Tier 4 is a general-purpose AI governance reference, mapped for completeness.

### GPAI Code of Practice

General-Purpose AI Code of Practice (GPAI CoP). Maintained by European Commission / EU AI Office.

The GPAI Code of Practice is the voluntary EU governance instrument through which GPAI model providers operationalize AI Act Articles 53-55 commitments; AITBM adds the technical-risk quantification beneath it, converting each commitment's evidence artifact into deterministic rubric scores and a graduated ERS - without ever signing the Code or discharging any legal obligation.

*Table 108: GPAI Code of Practice to AITBM Mapping*

| GPAI CoP Chapter | Primary AITBM Sub-Metrics | ERS / Notes |
| --- | --- | --- |
| Transparency - Documentation / Model Documentation Form | Tr-4, Tr-1, Tr-3 | ACI Pc; Tr axis + confidence; Art 53 |
| Copyright - copyright policy, TDM opt-out, lawful crawling | Pr-1, Pr-3, Tr-4 | ACI Pc; Pr axis; Art 53 (legal lawfulness not scored) |
| Safety & Security - model evaluations + adversarial testing | Ro-1, Ro-4, Ro-3 | ACI Ec + Tf reset on each re-run; Art 55 |
| Safety & Security - systemic-risk identification / analysis / acceptance | no equivalent (drives ORP) | ORP Cp >=0.90, Rf; CRM; Art 55 |
| Safety & Security - safety mitigations (harmful output) | Cn-2, Cn-3, Fa-1..Fa-4 | Cn / Fa axes; Art 55 |
| Safety & Security - security mitigations (model-weight cybersecurity) | Cn-4, Cn-1, Cn-5 | Cn axis; Art 55 |
| Safety & Security - serious-incident reporting + documentation | Tr-3, Tr-4 | ACI Pc; confidence; Art 55 |
| Safety and Security Model Report | Tr-3, Tr-4 | ACI Pc; consolidated evidence package; Art 55 |

Key findings:

- The Code answers 'has the provider committed to the right governance practices?' while AITBM answers 'how risky is the model, across dimensions, with what confidence, and how stale is the evidence?'; the Code invokes 'state-of-the-art' but prescribes no measurement methodology, which AITBM supplies.

- Each commitment produces a concrete artifact (Model Documentation Form, copyright policy, evaluation/red-team reports, Safety and Security Model Report, incident logs) that an assessor consumes as objective evidence, reducing assessor discretion; recurring evaluations are the ideal ACI Tf refresh input.

- Boundary discipline: a favourable ERS does NOT demonstrate adherence, discharge any AI Act obligation, or carry standing before the AI Office; AITBM scores the evidence, not the signatory commitment - two signatories can have very different ERS profiles.

- Worked example (systemic-risk frontier model, Standalone weights): full Code adoption lowers ERS from 6.9 to 5.0, but it stays Moderate (not Low) because systemic risk holds Cp at 0.90 / CRM at 1.35 and the alpha=0.15 floor applies - good governance narrows and lowers risk but never zeroes it.
