# AITBM -- AI Trust Benchmarking and Maturity Framework

**Quantify AI security risk with constrained, evidence-backed judgment.**

AITBM is a bias-resistant, multi-dimensional evaluation framework for AI system security. It constrains subjective "low / medium / high" judgments with granular five-level scoring rubrics, a three-layer architecture that preserves signal, and a mathematically grounded composite score.

| | |
|---|---|
| **23** IVP sub-metrics | **5** security axes |
| **3** assessment layers | **0.00--1.00** rubric with fixed anchors |

---

## The Problem AITBM Solves

The AITBM comparison identifies recurring limitations across CVSS-based AI adaptations, OWASP AIVSS, and threat catalogs such as the OWASP Top 10 for LLMs. These artifacts have different scopes, so a limitation in a scoring capability is not necessarily a defect in the source framework:

- **Assessor subjectivity:** In the largest published CVSS consistency study, 68% of assessors changed at least one metric when re-scoring identical vulnerabilities (Wunder et al., IEEE S&amp;P 2024).
- **Context blindness:** A Base-only or otherwise context-blind score can assign the same result to a medical-diagnosis model and a recipe chatbot with identical intrinsic flaws despite different operational consequences.
- **Scope blindness:** Static-model assumptions miss agentic and MCP threats -- tool poisoning, rogue agents, identity spoofing.
- **Zero-risk fallacy:** Some scoring formulations permit a zero-risk result after controls; AITBM instead retains an explicit residual-risk floor.

AITBM addresses six fundamental deficiencies:

1. **Rubric Anchoring:** CVSS-based AI extensions inherit a vulnerability-centric model that does not directly score emergent, behavioral, and stateful system properties.
2. **Single-Score Collapse:** Flattening multi-dimensional risk into a single 0--10 number hides trade-offs among robustness, fairness, privacy, transparency, and containment.
3. **Subjective Weighting:** Where weights are assessor-configurable, the same evidence can produce incomparable results across organizations.
4. **Point-in-Time Blindness:** Most comparison frameworks lack a standing mechanism for evidence-freshness decay across behavioral drift, memory poisoning, or cumulative stateful risk.
5. **Epistemic Blindness:** Most do not score the distinction between high-confidence assessments with full supply-chain transparency and low-confidence assessments on opaque systems.
6. **Accessibility Gap:** Most do not define a reduced-depth pathway for startups and SMEs within the same scoring architecture.

---

## Three-Layer Architecture

Single scores collapse important trade-offs. AITBM keeps the signal across three distinct layers, then composes them transparently.

### Layer 1: IVP -- Intrinsic Vulnerability Profile

23 sub-metrics across five axes. Each is scored at one of five normalized anchors from 0.00 to 1.00 against a fully specified rubric, narrowing the space for assessor interpretation while keeping evidence and judgment traceable. Architecture-specific weights apply -- agentic and MCP systems weight Containment more heavily; RAG systems weight Privacy.

| Axis | Sub-Metrics |
|---|---|
| **Robustness (Ro)** | Ro-1 Adversarial Input Resistance, Ro-2 Distribution Shift Resilience, Ro-3 Output Consistency, Ro-4 Poisoning Attack Resistance |
| **Fairness (Fa)** | Fa-1 Demographic Parity, Fa-2 Calibration Consistency, Fa-3 Representation Bias, Fa-4 Counterfactual Fairness |
| **Transparency (Tr)** | Tr-1 Explainability Depth, Tr-2 Confidence Calibration, Tr-3 Audit Trail Completeness, Tr-4 Model Lineage Disclosure |
| **Privacy (Pr)** | Pr-1 Training Data Leakage Risk, Pr-2 Inference Attack Resistance, Pr-3 Data Minimization Compliance, Pr-4 Re-identification Risk |
| **Containment (Cn)** | Cn-1 Scope Enforcement, Cn-2 Escalation Prevention, Cn-3 Output Filtering Robustness, Cn-4 Side-Channel Resistance, Cn-5 Agent Identity Integrity, Cn-6 Action Reversibility Classification Rate, Cn-7 Resource and Execution-Loop Containment |

### Layer 2: ORP -- Operational Risk Posture

Four deployment-context dimensions produce a Compound Risk Multiplier (CRM). The normative step table ranges from 1.00 to 1.60; 1.75 is reserved as an absolute framework cap:

1. Autonomy Amplification (Aa)
2. Attack Surface Exposure (As)
3. Cascade Potential (Cp)
4. Remediation Feasibility (Rf)

### Layer 3: ACI -- Assurance Confidence Index

Beta-Binomial-informed temporal decay models how evidence goes stale, with tier-specific re-assessment triggers:

- **Provenance Completeness (Pc)** -- supply chain and AIBOM documentation
- **Evaluation Coverage (Ec)** -- breadth and independence of testing
- **Temporal Freshness (Tf)** -- evidence age with exponential decay

### Effective Risk Score (ERS)

```
ERS = min(10, k x ORP_effective x (alpha + (1 - alpha) x (1 - W_ivp . IVP)) / ACI_composite)

where alpha = 0.15 (residual risk floor -- AI risk cannot be zeroed out)
```

---

## What Makes AITBM Different

- **Rubric-constrained scoring** -- Five fully specified levels per sub-metric narrow inter-assessor variance and make disagreements auditable.
- **Multi-dimensional signal** -- IVP / ORP / ACI are never silently collapsed into one number without justification.
- **Operational context, mathematically** -- The CRM encodes deployment risk so critical systems separate from low-stakes ones.
- **Agentic-native** -- Cn-5 (Agent Identity Integrity), Cn-6 (Action Reversibility Classification Rate), Cn-7 (Resource and Execution-Loop Containment), and the wider Containment axis address MCP, tool-use, and multi-agent threats.
- **Evidence-aware** -- The ACI penalizes opaque systems and stale assessments rather than trusting them at face value.
- **Tiered pathways** -- Full, Standard, and Lite assessment tracks so startups and SMEs can participate alongside enterprises.
- **AIDEFEND integration** -- 77 of AIDEFEND's 92 technique families (data version 2026.08.05) contribute 168 evidence placements spanning all 23 sub-metrics; Cn-7 routes to 29 actionable selectors across 16 families.
- **Complementary framework crosswalks** -- Sixteen external frameworks and standards are crosswalked to relevant AITBM sub-metrics and evidence roles; the mappings do not imply endorsement or replace the source frameworks.

---

## Framework Comparison

This is a scope comparison, not a claim that one framework supersedes another.

| Capability | CVSS 4.0 | OWASP AIVSS v0.8 | AITBM |
|---|---|---|---|
| Primary assessment unit | Discrete software vulnerability | Agentic AI vulnerability | Deployed AI system |
| AI-specific factors | No | Yes | Yes |
| Multi-dimensional system profile | No | No | Yes: IVP / ORP / ACI |
| Dedicated agent-identity treatment | No | Dynamic Identity and Agent Identity Impersonation | Cn-5 Agent Identity Integrity |
| Evidence-confidence and freshness decay | No | No | Yes |
| Tiered assessment pathways | No | No | Full / Standard / Lite |
| Explicit non-zero floor | No | 0.67 mitigation floor | alpha = 0.15 residual-risk floor |

---

## Validation Anchor

The **Finbot** worked example is the framework's internal calculation anchor and exercises the full pipeline:

- **Scenario:** AI finance assistant compromised through multi-stage RAG-based memory poisoning
- **Tier:** Tier 1 -- Critical (autonomous financial transaction execution)
- **Architecture:** Agentic / MCP System
- **Result:** ERS = 10.0, CRM = 1.35, Severity = Critical MVT
- Containment failure (Cn = 0.30 vs MVT 0.65) and compound operational risk drive the maximum score.

See [specification/sections/09_worked_example_finbot.md](specification/sections/09_worked_example_finbot.md) for the full worked example.

---

## Repository Structure

```
AITBM/
├── README.md                          This file
├── specification/                     The framework specification, in every form
│   ├── AITBM_Framework_Specification.pdf        Read it as one document
│   ├── AITBM_Framework_Specification.docx       Editable Word source
│   └── sections/                                The same spec, section by section (Markdown)
│       ├── README.md                            Section index
│       ├── 00_revision_history.md
│       ├── 01_executive_summary.md
│       ├── 02_design_principles.md
│       ├── 03_three_layer_architecture.md
│       ├── 04_deployment_tier_classification.md
│       ├── 05_effective_risk_score.md
│       ├── 06_minimum_viability_thresholds.md
│       ├── 07_behavioral_baseline_deviation.md
│       ├── 08_tiered_assessment_pathways.md
│       ├── 09_worked_example_finbot.md
│       ├── 10_framework_comparison.md
│       ├── 11_implementation_roadmap.md
│       ├── 12_conclusion.md
│       ├── 13_references.md
│       ├── 14_aidefend_integration.md
│       └── external_framework_mappings.md          Sixteen external frameworks mapped to AITBM
└── website/                           Project website (static HTML + Tailwind CSS)
    ├── index.html            Overview and landing page
    ├── ai-safety-benchmark.html      Deployed-system AI safety benchmark guide
    ├── ai-security-assessment.html   AI security assessment methodology
    ├── ai-evaluation-methods.html    Safety and security evaluation methods
    ├── ai-framework-comparison.html  Neutral comparison of framework roles
    ├── ai-security-use-cases.html    Topic hub for the 64-record case library
    ├── framework.html        Three-layer architecture (IVP/ORP/ACI/ERS)
    ├── submetrics.html       The 23 sub-metrics reference
    ├── use-cases.html        Evidence-bounded incident scenarios with uncertainty ranges
    ├── use-cases/            64 complete case-study and research-note records
    ├── use-case-topics/      Eight threat and architecture reference collections
    ├── mappings/             Sixteen complete external-framework crosswalks
    ├── submetrics/           Twenty-three canonical rubric and test-method pages
    ├── gap-analysis.html     12 structural gaps across 4 domains
    ├── aidefend.html         AIDEFEND mapping and worked examples
    ├── mappings.html         Sixteen external frameworks mapped to AITBM
    ├── calculator.html       ERS calculator -- quick yes/no survey + detailed mode
    ├── glossary.html         AI security terms and acronyms
    ├── resources.html        Documentation links and standards alignment
    ├── assets/               CSS and JavaScript assets
    ├── Dockerfile            Docker container configuration
    └── docker-compose.yml    Local development (docker compose up --build)
```

---

## Running the Website Locally

```bash
cd website
docker compose up --build -d
```

Then open http://localhost:8080.

The site is static HTML with Tailwind CSS (CDN) and vanilla JavaScript -- no build step required.

---

## Standards Alignment

| Framework | Relationship to AITBM |
|---|---|
| OWASP AISVS | Requirement-verification evidence source |
| OWASP Top 10 for LLMs 2026 | Current ten-risk evidence and test-selection crosswalk |
| OWASP Agentic AI — Threats and Mitigations v1.1 | T1--T17 threat-taxonomy crosswalk; companion ASI01--ASI10 Top 10 alignment |
| MITRE ATLAS v2026.07 | All 16 tactics routed for test selection; 178 techniques, 37 mitigations, and 68 case studies tracked |
| OWASP AIVSS | Prior art for agentic vulnerability severity; AITBM separately assesses broader system properties |
| ISO 42001 / 42005 | Governance alignment; impact assessment methodology |
| NIST AI RMF | Risk management framework alignment |
| NIST Cyber AI Profile IR 8596 | Cyber-AI intersection alignment |
| EU AI Act | Regulatory crosswalk and potential evidence support; not a compliance determination |
| AIDEFEND | Defensive countermeasure evidence mapping (168 placements / 77 of 92 technique families, data version 2026.08.05); 64 AIDEFEND in Action analyses represented on the website |
| D3FEND 1.0 | Version-pinned defensive countermeasure crosswalk; latest 1.5.0 release status is disclosed separately |

All of the above — plus AIUC-1, CSA AI Security, AIMA, COMPASS, CVSS, and the GPAI Code of Practice — are crosswalked to relevant AITBM sub-metrics and evidence roles on the [Framework Mappings](website/mappings.html) page and in the [External Framework Mappings](specification/sections/external_framework_mappings.md) section of the specification.

---

## Author

**Henry Hu** -- CEO & Founder, Auriga Security, Inc. / OWASP Taiwan Chapter Leader

---

## License

This is a volunteer/community project. Target community: OWASP practitioners, AI security assessors, ML engineers, and compliance teams.
