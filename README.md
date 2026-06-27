# AITBM -- AI Trust Benchmarking and Maturity Framework

**Quantify AI security risk -- without assessor guesswork.**

AITBM is a bias-resistant, multi-dimensional evaluation framework for AI system security. It replaces subjective "low / medium / high" judgments with granular five-level scoring rubrics, a three-layer architecture that preserves signal, and a mathematically grounded composite score.

| | |
|---|---|
| **21** IVP sub-metrics | **5** security axes |
| **3** assessment layers | **0--4** rubric, no discretion |

---

## The Problem AITBM Solves

Existing AI security methodologies -- CVSS adaptations, OWASP AIVSS, the OWASP Top 10 for LLMs -- share structural failure modes:

- **Assessor subjectivity:** Ambiguous severity language drives 15--30% inter-assessor variance on the same system.
- **Context blindness:** A medical-diagnosis model and a recipe chatbot with identical flaws score identically.
- **Scope blindness:** Static-model assumptions miss agentic and MCP threats -- tool poisoning, rogue agents, identity spoofing.
- **Zero-risk fallacy:** Frameworks imply sufficient controls eliminate risk. Emergent behavior makes that structurally impossible.

AITBM addresses six fundamental deficiencies:

1. **Deterministic Anchoring:** Existing frameworks bolt AI-specific adjustments onto CVSS, inheriting its inability to score emergent, behavioral, and stateful vulnerabilities.
2. **Single-Score Collapse:** Flattening multi-dimensional risk into a single 0--10 number hides the trade-offs between robustness, fairness, and efficiency.
3. **Subjective Weighting:** Configurable weights allow scorer bias to produce incomparable results across organizations.
4. **Point-in-Time Blindness:** No mechanism exists to track behavioral drift, memory poisoning, or cumulative risk in stateful agentic systems.
5. **Epistemic Blindness:** Frameworks do not distinguish between high-confidence assessments with full supply chain transparency and low-confidence assessments on opaque systems.
6. **Accessibility Gap:** No tiered pathway exists for startups and SMEs to participate in standardized assessment.

---

## Three-Layer Architecture

Single scores collapse important trade-offs. AITBM keeps the signal across three distinct layers, then composes them transparently.

### Layer 1: IVP -- Intrinsic Vulnerability Profile

21 sub-metrics across five axes. Each is scored 0--4 against a fully specified five-level rubric, so the score reflects the system, not the assessor. Architecture-specific weights apply -- agentic and MCP systems weight Containment more heavily; RAG systems weight Privacy.

| Axis | Sub-Metrics |
|---|---|
| **Robustness (Ro)** | Ro-1 Adversarial Input Resistance, Ro-2 Distribution Shift Resilience, Ro-3 Output Consistency, Ro-4 Poisoning Attack Resistance |
| **Fairness (Fa)** | Fa-1 Demographic Parity, Fa-2 Calibration Consistency, Fa-3 Representation Bias, Fa-4 Counterfactual Fairness |
| **Transparency (Tr)** | Tr-1 Explainability Depth, Tr-2 Confidence Calibration, Tr-3 Audit Trail Completeness, Tr-4 Model Lineage Disclosure |
| **Privacy (Pr)** | Pr-1 Training Data Leakage Risk, Pr-2 Inference Attack Resistance, Pr-3 Data Minimization Compliance, Pr-4 Re-identification Risk |
| **Containment (Cn)** | Cn-1 Scope Enforcement, Cn-2 Escalation Prevention, Cn-3 Output Filtering Robustness, Cn-4 Side-Channel Resistance, Cn-5 Agent Identity Integrity |

### Layer 2: ORP -- Operational Risk Posture

Four deployment-context dimensions produce a Compound Risk Multiplier (CRM) in the 0.75--1.75 range that intrinsic scoring cannot capture:

1. Autonomy Amplification (Aa)
2. Attack Surface Exposure (As)
3. Cascade Potential (Cp)
4. Remediation Feasibility (Rf)

### Layer 3: ACI -- Assurance Confidence Index

Beta-Binomial-informed temporal decay models how evidence goes stale, with tier-specific re-assessment triggers:

- **Provenance Completeness (Pc)** -- supply chain and AIBOM documentation
- **Evaluation Coverage (Ec)** -- breadth and independence of testing
- **Temporal Freshness (Tf)** -- evidence age with exponential decay

### Evaluated Risk Score (ERS)

```
ERS = min(10, k x ORP_effective x (alpha + (1 - alpha) x (1 - W_ivp . IVP)) / ACI_composite)

where alpha = 0.15 (residual risk floor -- AI risk cannot be zeroed out)
```

---

## What Makes AITBM Different

- **Deterministic rubrics** -- Five fully specified levels per sub-metric drive inter-assessor variance toward zero.
- **Multi-dimensional signal** -- IVP / ORP / ACI are never silently collapsed into one number without justification.
- **Operational context, mathematically** -- The CRM encodes deployment risk so critical systems separate from low-stakes ones.
- **Agentic-native** -- Cn-5 (Agent Identity Integrity) and the Containment axis address MCP, tool-use, and multi-agent threats.
- **Evidence-aware** -- The ACI penalizes opaque systems and stale assessments rather than trusting them at face value.
- **Tiered pathways** -- Full, Standard, and Lite assessment tracks so startups and SMEs can participate alongside enterprises.
- **AIDEFEND integration** -- AIDEFEND's 86-technique defensive catalog mapped to all 21 sub-metrics for evidence-based scoring.
- **Governing quantification layer** -- Sixteen external frameworks (OWASP Top 10 for LLMs and for Agentic Applications, OWASP AISVS, MITRE ATLAS, AIUC-1, AIDEFEND, NIST AI RMF, ISO/IEC 42001 & 42005, the EU AI Act, CSA AI Security, NIST Cyber AI Profile, AIMA, COMPASS, MITRE D3FEND, CVSS, and the GPAI Code of Practice) mapped element-by-element into AITBM sub-metrics and the ERS.

---

## Framework Comparison

| Capability | CVSS 4.0 | AIVSS v0.5 | RAISE | AITBM |
|---|---|---|---|---|
| AI-native (non-deterministic) | No | Partial | Yes | Yes |
| Multi-dimensional profile | No | No | Yes | Yes |
| Deterministic weights | N/A | No | Partial | Yes |
| Epistemic confidence scoring | No | No | No | Yes |
| Behavioral drift monitoring | No | No | No | Yes |
| Supply chain integration (AIBOM) | No | No | No | Yes |
| Tiered SME pathway | N/A | No | No | Yes |
| Stateful/agentic risk modeling | No | Yes | No | Yes |
| Residual deployment risk floor | No | No | No | Yes |

---

## Validation Anchor

The **Finbot** worked example validates the full framework pipeline:

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
    ├── framework.html        Three-layer architecture (IVP/ORP/ACI/ERS)
    ├── submetrics.html       The 21 sub-metrics reference
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
| OWASP AISVS | Control checklist input layer |
| OWASP Top 10 for LLMs | Threat coverage alignment |
| OWASP Top 10 for Agentic Applications 2026 | Scope reference for agentic threat coverage |
| MITRE ATLAS | Threat taxonomy alignment; case study sourcing |
| OWASP AIVSS | Predecessor framework -- AITBM addresses its structural gaps |
| ISO 42001 / 42005 | Governance alignment; impact assessment methodology |
| NIST AI RMF | Risk management framework alignment |
| NIST Cyber AI Profile IR 8596 | Cyber-AI intersection alignment |
| EU AI Act | Regulatory compliance mapping |
| AIDEFEND | Defensive countermeasure mapping (86 techniques) |
| D3FEND 1.0 | Defensive countermeasure taxonomy |

All of the above — plus AIUC-1, CSA AI Security, AIMA, COMPASS, CVSS, and the GPAI Code of Practice — are mapped element-by-element into AITBM sub-metrics on the [Framework Mappings](website/mappings.html) page and in the [External Framework Mappings](specification/sections/external_framework_mappings.md) section of the specification.

---

## Author

**Henry Hu** -- CEO & Founder, Auriga Security, Inc. / OWASP Taiwan Chapter Leader

---

## License

This is a volunteer/community project. Target community: OWASP practitioners, AI security assessors, ML engineers, and compliance teams.
