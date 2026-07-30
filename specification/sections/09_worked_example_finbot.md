# Worked Example: The Finbot Scenario

Applying the full AITBM framework to Finbot: an AI finance assistant compromised through multi-stage RAG-based memory poisoning leading to unauthorized financial transactions.

Assigned Tier: Tier 1 — Critical (autonomous financial transaction execution)

Architecture Classification: Agentic / MCP System (Decision Tree Q2: YES - autonomous multi-step workflow with RAG and tool calls)

## 9.1 IVP Assessment

The IVP assessment scores each of Finbot's five axes, comparing the score against the Tier-1 MVT and noting the key finding per axis.

*Table 65: 9.1 IVP Assessment*

| Axis | Score | MVT | Result | Key Finding |
| --- | --- | --- | --- | --- |
| Robustness | 0.45 | 0.60 | FAIL - Major | Susceptible to indirect prompt injection via RAG |
| Fairness | 0.82 | 0.60 | PASS | Meets demographic parity per JPGR (US) |
| Transparency | 0.60 | 0.55 | PASS | Audit trail incomplete for tool calls |
| Privacy | 0.55 | 0.60 | FAIL - Minor | Email ingested without PII scrubbing |
| Containment | 0.30 | 0.65 | FAIL - Critical | No permission broker for transactions; no reversibility classification beyond the fixed >$50K approval threshold (Cn-6 = 0.25, ad-hoc) |

MVT Severity: Critical - Containment is 0.35 below the Tier 1 MVT and three axes fall below required thresholds.

## 9.2 ORP Assessment

The ORP assessment scores Finbot's four operational dimensions, which combine via the weight profile and the Compound Risk Multiplier.

*Table 66: 9.2 ORP Assessment*

| Dimension | Score | Justification |
| --- | --- | --- |
| Autonomy Amplification (Aa) | 0.95 | Finbot executes financial transactions autonomously without per-transaction human approval. Escalation only for exceptions exceeding $50K. |
| Attack Surface Exposure (As) | 0.85 | Internet-facing chatbot ingesting external email via RAG pipeline. Email sources are partially trusted but not adversarially validated. |
| Cascade Potential (Cp) | 1.00 | Graph-derived: all four stack layers reachable (LRR = 1.00); ungated sub-$50K autonomous transaction path reaches a delegated-irreversible terminal (g_P = 1.00); the documented RAG memory-poisoning compromise is a full-depth taint trace (FIBR > 0.60). |
| Remediation Feasibility (Rf) | 0.70 | RAG poisoning requires corpus purge and revalidation (weeks). Prompt injection mitigated by guardrails but not eliminable. |

CRM Assessment: N_elevated = 3 (Aa=0.95, As=0.85, Cp=1.00 all > 0.75). CRM = 1.35. Compound Risk Alert triggered — architectural decomposition recommended.

## 9.3 ACI Assessment

The ACI assessment scores how much is known about Finbot's evidence across provenance, evaluation coverage, and temporal freshness.

*Table 67: 9.3 ACI Assessment*

| Component | Score | Justification |
| --- | --- | --- |
| Provenance Completeness (Pc) | 0.60 | Partial AIBOM exists: base model documented (GPT-4 via API), but RAG corpus provenance incomplete. Email ingestion pipeline has no data lineage. Completeness ~60%. |
| Evaluation Coverage (Ec) | 0.37 | Self-assessed (Independence Multiplier = 0.60) with Base_Coverage approximately 0.73 (16 of 22 sub-metrics tested) in staging environment (Fidelity Factor = 0.85). Ec = 0.73 x 0.60 x 0.85 = 0.372, rounded to 0.37. |
| Temporal Freshness (Tf) | 0.71 | Assessment evidence is 5 days old. Tier 1 lambda = 0.0231, so T_calendar = e^(-0.0231 x 5) = 0.891. Agentic architecture: containment staleness floor T_containment = e^(-2.0 x 0.0231 x 5) = 0.794. Writable RAG memory trips the Behavioral Attestation Window checklist; no BAB program exists, so delta_t_beh = 5 and the behavioral staleness floor T_behavior = e^(-3.0 x 0.0231 x 5) = 0.71. Behavioral instrumentation is limited to the >$50K exception gate plus a staging-time drift baseline: C_behavior Band 2 (cap 0.75). Unresolved identity/tool gaps cap C_evidence at 0.85. Tf = min(0.891, 0.794, 0.71, 0.75, 0.85) = 0.71. |

## 9.4 ERS Calculation

The three layers are combined to produce Finbot's Effective Risk Score. Each step below substitutes the values assessed in Sections 9.1–9.3:

```
W_(orp) · ORP = (0.35)(0.95)+(0.25)(0.85)+(0.25)(1.00)+(0.15)(0.70) = 0.900
```

CRM: N_elevated = 3, therefore CRM = 1.35.

```
ORP_(effective) = 0.900 × 1.35 = 1.215
W_(ivp) · IVP = (0.30)(0.45)+(0.25)(0.82)+(0.15)(0.60)+(0.20)(0.55)+(0.10)(0.30) = 0.570
ACI_(composite) = (0.60 × 0.37 × 0.71)^(1/3) = 0.54
IVPmitigation = 0.516;ERS = min(10,1.215 × 0.516 × 1.852 × 10) = 10.0.
```

Finbot therefore scores ERS = 10.0 — the maximum value and a Critical MVT — driven by the compound operational risk (CRM = 1.35), the containment failure (including ad-hoc reversibility gating, Cn-6), and the low assurance confidence (ACI = 0.54; no behavioral attestation program — T_behavior binds Tf).
