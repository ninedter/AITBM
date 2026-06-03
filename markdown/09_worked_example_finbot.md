# Worked Example: The Finbot Scenario

Applying the full AITBM framework to Finbot: an AI finance assistant compromised through multi-stage RAG-based memory poisoning leading to unauthorized financial transactions.

Assigned Tier: Tier 1 — Critical (autonomous financial transaction execution)

Architecture Classification: Agentic / MCP System (Decision Tree Q2: YES - autonomous multi-step workflow with RAG and tool calls)

## 9.1 IVP Assessment

The IVP assessment scores each of Finbot's five axes, comparing the score against the Tier-1 MVT and noting the key finding per axis.

*Table 56: 9.1 IVP Assessment*

| Axis | Score | MVT | Result | Key Finding |
| --- | --- | --- | --- | --- |
| Robustness | 0.45 | 0.60 | FAIL - Major | Susceptible to indirect prompt injection via RAG |
| Fairness | 0.82 | 0.60 | PASS | Meets demographic parity per JPGR (US) |
| Transparency | 0.60 | 0.55 | PASS | Audit trail incomplete for tool calls |
| Privacy | 0.55 | 0.60 | FAIL - Minor | Email ingested without PII scrubbing |
| Containment | 0.30 | 0.65 | FAIL - Critical | No permission broker for transactions |

MVT Severity: Critical - Containment is 0.35 below the Tier 1 MVT and three axes fall below required thresholds.

## 9.2 ORP Assessment

The ORP assessment scores Finbot's four operational dimensions, which combine via the weight profile and the Compound Risk Multiplier.

*Table 57: 9.2 ORP Assessment*

| Dimension | Score | Justification |
| --- | --- | --- |
| Autonomy Amplification (Aa) | 0.95 | Finbot executes financial transactions autonomously without per-transaction human approval. Escalation only for exceptions exceeding $50K. |
| Attack Surface Exposure (As) | 0.85 | Internet-facing chatbot ingesting external email via RAG pipeline. Email sources are partially trusted but not adversarially validated. |
| Cascade Potential (Cp) | 0.80 | Outputs directly trigger financial transactions via banking APIs. Compromise affects customer accounts across the platform. |
| Remediation Feasibility (Rf) | 0.70 | RAG poisoning requires corpus purge and revalidation (weeks). Prompt injection mitigated by guardrails but not eliminable. |

CRM Assessment: N_elevated = 3 (Aa=0.95, As=0.85, Cp=0.80 all > 0.75). CRM = 1.35. Compound Risk Alert triggered — architectural decomposition recommended.

## 9.3 ACI Assessment

The ACI assessment scores how much is known about Finbot's evidence across provenance, evaluation coverage, and temporal freshness.

*Table 58: 9.3 ACI Assessment*

| Component | Score | Justification |
| --- | --- | --- |
| Provenance Completeness (Pc) | 0.60 | Partial AIBOM exists: base model documented (GPT-4 via API), but RAG corpus provenance incomplete. Email ingestion pipeline has no data lineage. Completeness ~55%. |
| Evaluation Coverage (Ec) | 0.40 | Self-assessed (Independence Multiplier = 0.60) with Base_Coverage approximately 0.76 (16 of 21 sub-metrics tested) in staging environment (Fidelity Factor = 0.85). Ec = 0.76 x 0.60 x 0.85 = 0.388, rounded to 0.40. |
| Temporal Freshness (Tf) | 0.85 | Assessment evidence is 5 days old. Tier 1 lambda = 0.0231, so T_calendar = e^(-0.0231 x 5) = 0.891. Because unresolved identity/tool evidence caps confidence at C_evidence = 0.85, Tf = min(0.891, 0.85) = 0.85. |

## 9.4 ERS Calculation

The three layers are combined to produce Finbot's Effective Risk Score. Each step below substitutes the values assessed in Sections 9.1–9.3:

```
W_(orp) · ORP = (0.35)(0.95)+(0.25)(0.85)+(0.25)(0.80)+(0.15)(0.70) = 0.850
```

CRM: N_elevated = 3, therefore CRM = 1.35.

```
ORP_(effective) = 0.850 × 1.35 = 1.148
W_(ivp) · IVP = (0.30)(0.45)+(0.25)(0.82)+(0.15)(0.60)+(0.20)(0.55)+(0.10)(0.30) = 0.570
ACI_(composite) = (0.60 × 0.40 × 0.85)^(1/3) = 0.589
IVPmitigation = 0.516;ERS = min(10,1.148 × 0.516 × 1.697 × 10) = 10.0.
```

Finbot therefore scores ERS = 10.0 — the maximum value and a Critical MVT — driven by the compound operational risk (CRM = 1.35), the containment failure, and the low assurance confidence (ACI = 0.589).
