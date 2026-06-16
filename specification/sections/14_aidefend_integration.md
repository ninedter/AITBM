# AIDEFEND Integration

Mapping AIDEFEND Defensive Techniques to AITBM Sub-Metrics

## Overview

AIDEFEND (https://aidefend.net/) is a structured knowledge base of defensive countermeasures for AI systems. The AIDEFEND data reviewed for this section (June 12, 2026) uses schema 2.0 and data version 2026.06.11. It contains 86 top-level defensive techniques and 210 sub-techniques, for 296 total defensive records across tactics, pillars, lifecycle phases, and external framework mappings. This section maps AIDEFEND evidence to AITBM's 21 sub-metrics, enabling organizations to use AIDEFEND as the operational evaluation layer and AITBM as the scoring framework.

1. Translate defensive implementations into AITBM scores — Organizations implementing AIDEFEND controls can objectively score their security posture

2. Identify control gaps — By cross-referencing AIDEFEND coverage against AITBM sub-metrics, security teams can pinpoint missing defensive layers

3. Prioritize defensive investments — Understanding which AIDEFEND techniques impact multiple AITBM axes helps optimize security resource allocation

4. Bridge CVE/CVSS to AI-specific risk — AIDEFEND maps to traditional vulnerability frameworks, while AITBM provides AI-specific risk quantification

## AIDEFEND Tactical Structure

The reviewed data version organizes 86 top-level defensive techniques and 210 sub-techniques across 7 tactics:

*Table 60: AIDEFEND Tactical Structure*

| Tactic | Code | Techniques | Purpose |
| --- | --- | --- | --- |
| Model | M | 10 | Comprehensive understanding and mapping of AI assets, data flows, dependencies, behavior, and lifecycle state. |
| Harden | H | 35 | Preventive hardening of models, data paths, agents, tools, gateways, skills, code, MCP servers, and execution surfaces. |
| Detect | D | 16 | Runtime monitoring, attestation, anomaly detection, policy enforcement, and threat hunting. |
| Isolate | I | 8 | Containment of execution, memory, network, browser, interaction, and session boundaries. |
| Deceive | DV | 7 | Canaries, decoys, telemetry traps, and controlled deception for high-confidence detection. |
| Evict | E | 5 | Credential, session, process, state, and malicious artifact removal after compromise. |
| Restore | R | 5 | Return to known-good models, data, vector indexes, identity state, and operating configuration. |

## Mapping Methodology

Each AITBM sub-metric is mapped to one or more AIDEFEND techniques based on:

• Direct impact — The AIDEFEND technique directly improves the security property measured by the AITBM sub-metric

• Evidence generation — The AIDEFEND technique produces artifacts or telemetry required to score the AITBM sub-metric

• Test coverage — The AIDEFEND technique enables testing methods specified in AITBM rubrics

Scoring Guidance: Implementation of mapped AIDEFEND techniques contributes evidence for AITBM sub-metric scoring on the 0.00-1.00 rubric scale. Top-level technique coverage establishes scope; sub-technique evidence, telemetry, and AITBM required test results determine the defensible score. Multiple techniques provide defense-in-depth, but the final score is determined by measured effectiveness rather than control presence.

## Current AIDEFEND Depth Review

The current AIDEFEND structure is deeper than a flat control catalog. Each AIDEFEND record can carry tactic, pillar, phase, threat-framework, keyword, implementation guidance, tool, and sub-technique metadata. AITBM uses this structure to decide not only which defensive technique is relevant, but also which evidence artifact must be inspected and which AITBM layer is affected.

The mapping rule is intentionally conservative: AIDEFEND identifies measurable defensive evidence, while AITBM assigns the score. A technique or sub-technique may support a score only when its implementation produces evidence that satisfies the relevant AITBM required test method.

*Table 61: Current AIDEFEND Depth Review*

| Profile Element | Current AIDEFEND Value | AITBM Assessment Use |
| --- | --- | --- |
| Source baseline | Schema 2.0; data version 2026.06.11; public AIDEFEND data source. | Records the baseline used for traceable AITBM mapping and future drift review. |
| Technique depth | 86 top-level techniques; 210 sub-techniques; 296 total defensive records. | Top-level techniques define control families; sub-techniques define concrete evidence selectors. |
| Strategic views | Tactics, pillars, phases, and framework mappings. | Allows AITBM to map evidence by security objective, protected component, lifecycle timing, and threat rationale. |
| Tactics | Model 10; Harden 35; Detect 16; Isolate 8; Deceive 7; Evict 5; Restore 5. | Separates preventive IVP evidence from operational ORP evidence and freshness-supporting ACI evidence. |
| Pillars | Data, Model, Infrastructure, and Application. | Aligns evidence collection to AITBM axes: Robustness, Fairness, Transparency, Privacy, and Containment. |
| Lifecycle phases | Scoping, building, validation, operation, response, and improvement. | Determines when evidence must be collected and whether it remains fresh enough for ACI. |
| External mappings | MITRE ATLAS, MAESTRO, OWASP LLM 2025, OWASP ML 2023, OWASP Agentic AI 2026, NIST AML 2025, Cisco AI Security, Google SAIF 2.0, and Databricks DASF 3.0. | Supports threat traceability; does not replace AITBM scoring thresholds. |

### Depth Mapping Model

AITBM interprets AIDEFEND through six mapping layers. The deeper layers are used to prevent over-scoring when a broad technique exists but the specific evidence needed by the AITBM rubric is missing.

*Table 62: Depth Mapping Model*

| Mapping Layer | AIDEFEND Field | AITBM Use | Scoring Rule |
| --- | --- | --- | --- |
| L1 Control Family | Top-level technique ID and name. | Identifies candidate AITBM sub-metrics affected by the defensive control. | Never score on L1 presence alone. |
| L2 Evidence Selector | Sub-technique, implementation guidance, tool output, or control artifact. | Defines the specific evidence to inspect or test. | Score cannot exceed 0.50 when L2 evidence is absent or unverified. |
| L3 Defensive Function | Tactic: Model, Harden, Detect, Isolate, Deceive, Evict, Restore. | Separates prevention, detection, containment, response, and recovery effects. | Preventive tactics primarily support IVP; response tactics primarily support ORP and ACI unless tied to a sub-metric test. |
| L4 Protected Component | Pillar: Data, Model, Infrastructure, Application. | Determines which asset boundary and AITBM axis are in scope. | Evidence must cover the protected component actually used by the assessed system. |
| L5 Lifecycle Timing | Phase: scoping, building, validation, operation, response, improvement. | Determines whether evidence is design-time, validation-time, runtime, or post-incident. | Runtime or post-change evidence is required for 0.75 or 1.00 in high-risk tiers when the sub-metric depends on live behavior. |
| L6 Threat Traceability | Mapped external framework items. | Documents why the technique is relevant to the threat model. | Threat mapping supports rationale but does not substitute for AITBM measurement. |

### AITBM Layer Interpretation

AIDEFEND tactics are not all scored the same way inside AITBM. Some tactics directly improve IVP sub-metrics, while others primarily reduce operational uncertainty, improve reassessment triggers, or support confidence in the evidence package.

*Table 63: AITBM Layer Interpretation*

| AIDEFEND Tactic | Primary AITBM Layer | Direct Scoring Use | ORP / ACI Use |
| --- | --- | --- | --- |
| Model | IVP and ACI | Supports lineage, baseline, threat-model, dependency, and lifecycle evidence. | Improves provenance completeness and reassessment traceability. |
| Harden | IVP | Supports robustness, privacy, containment, and prevention-oriented rubric thresholds. | May reduce ORP control gaps when implemented in production. |
| Detect | IVP, ORP, and ACI | Supports detection-rate, drift, audit, monitoring, and behavioral attestation tests. | Provides continuous evidence for temporal freshness and operational controls maturity. |
| Isolate | IVP and ORP | Supports containment, side-channel, tenant isolation, browser isolation, and inference isolation tests. | Reduces blast radius and response severity. |
| Deceive | ORP and ACI | Supports canary, decoy, and telemetry-trap evidence for detecting poisoning, exfiltration, and misuse. | Improves detection confidence; direct IVP credit only when tied to the sub-metric test. |
| Evict | ORP and ACI | Supports response, revocation, state purging, and malicious artifact removal. | Reduces operational exposure and defines reassessment triggers after compromise. |
| Restore | ORP and ACI | Supports recovery to known-good models, data, indexes, identity state, and hardened configuration. | Improves recovery maturity and post-incident evidence freshness. |

### Current Mapping Updates

The current AIDEFEND data adds or clarifies several agentic, gateway, generated-code, browser-isolation, lifecycle-governance, and MCP server runtime boundary controls that should be reflected in AITBM scoring. These updates strengthen the Containment, Privacy, Transparency, and Robustness mappings.

*Table 64: Current Mapping Updates*

| Current AIDEFEND Update | AITBM Mapping Change | Reason |
| --- | --- | --- |
| AID-M-010 AI Asset Retirement, Transfer & End-of-Life Governance | Added to Tr-4 and Pr-3. | End-of-life records, transfer records, cryptographic erasure, and ownership change evidence directly affect lineage and data minimization. |
| AID-H-031 Agentic Skill Admission Security Analysis & Control Pipeline | Added to Ro-1, Tr-3, Cn-1, Cn-2, and Cn-5. | Skill manifest validation, semantic security analysis, loader hardening, and continuous re-scan evidence address prompt, permission, identity, and audit gaps in agentic systems. |
| AID-H-032 AI-Generated Code Admission Control & Safe Promotion | Added to Ro-1, Tr-3, Cn-2, and Cn-3. | Generated-code provenance, static gates, sandbox validation, and evidence-bound promotion reduce unsafe code execution and escalation risk. |
| AID-H-034 AI Gateway Routing Integrity & Policy-Preserving Failover | Added to Ro-3, Tr-3, Pr-3, Cn-1, Cn-2, and Cn-3. | Requested-vs-effective model binding, no silent safety downgrade, residency-aware routing, and route policy rollback support output consistency, auditability, privacy, and containment. |
| AID-H-035 MCP Server Runtime Boundary & Tool Exposure Governance | Added to Tr-3, Cn-1, Cn-2, and Cn-5. | Server-side tool invocation validation, OAuth token audience and delegation safety, governed publication of the model-visible tool and descriptor surface, and structured session and telemetry hooks provide measurable scope, escalation, identity, and audit evidence for MCP server deployments. |
| AID-I-008 Task-Scoped Browser Session & Origin Isolation for Agents | Added to Pr-2, Cn-1, and Cn-4. | Ephemeral browser contexts, origin segmentation, and download or clipboard quarantine provide measurable containment and leakage-resistance evidence. |
| AID-DV-007 Poisoning Detection Canaries & Decoy Data | Used for Ro-4 and Pr-1; replaces the obsolete Deceive-family poisoning reference. | The current data uses AID-DV-007 for canary and decoy data evidence supporting poisoning detection and leakage assessment. |
| AID-E-005 Compromised Session Termination & State Purging and AID-M-010 | Replace the obsolete Evict-family minimization reference for Pr-3. | State purging and lifecycle governance are the current evidence sources for retention, deletion, and minimization controls. |

### Sub-Technique Evidence Examples

The examples below show how AIDEFEND sub-techniques become measurable AITBM evidence. The assessor should record the specific sub-technique, observed artifact, test result, timestamp, owner, and any unresolved exception.

*Table 65: Sub-Technique Evidence Examples*

| AITBM Area | Current AIDEFEND Sub-Technique Evidence | Measurement Use |
| --- | --- | --- |
| Ro-1 / Cn-2 | AID-H-031.002 Instruction-Layer Semantic Security Analysis; AID-H-032.003 Dynamic Promotion Validation with Ephemeral Sandboxes. | Measure attack success rate against malicious skills, injected instructions, and generated-code promotion attempts. |
| Ro-3 / Tr-3 | AID-H-034.001 Requested-vs-Effective Model Binding Records; AID-H-034.004 Route Policy Bundle Versioning, Approval, Canary & Rollback. | Verify output consistency, model routing integrity, policy rollback, and audit trail completeness. |
| Ro-4 | AID-H-021.001 Chunk-Level Integrity Signing; AID-DV-007 Poisoning Detection Canaries & Decoy Data. | Measure poisoning detection rate, corpus tamper detection, and canary-trigger coverage. |
| Pr-2 / Cn-4 | AID-I-004.002 Persistent Memory Partitioning (Trust & Tenant Isolation); AID-I-008.001 Ephemeral Browser Context Lifecycle & Storage Partitioning. | Measure tenant, memory, browser-session, and origin-isolation leakage under adversarial tests. |
| Pr-3 | AID-H-030.003 Consent Scope Tracking, Expiry Enforcement & Withdrawal Response; AID-M-010.001 Cryptographic Erasure & Media Sanitization. | Verify data-use authorization, deletion, consent expiry, and minimization evidence. |
| Cn-1 / Cn-5 | AID-H-019.007 Skill-Level Permission Manifest Validation & Runtime Enforcement; AID-H-029.001 MCP Server Authenticity Validation & Connection Pinning. | Measure tool-scope enforcement, MCP identity validation, and unauthorized tool invocation failure rate. |
| Cn-5 / ACI | AID-M-001.003 Agentic Skill Asset Inventory & Lifecycle Governance; AID-I-004.006 Agent Identity & Persistent State File Write Protection. | Verify agent or skill inventory completeness, identity binding, ownership, stale-skill remediation, and persistent-state protection. |

## AIDEFEND-to-AITBM Evaluation Process

AIDEFEND is used as the evaluation-metrics and evidence layer for AITBM. AIDEFEND identifies defensive techniques, expected artifacts, and telemetry that can be inspected or tested. AITBM remains the scoring framework: the assessor assigns the AITBM sub-metric score only after measuring whether the mapped AIDEFEND controls actually produce the security property required by the AITBM rubric.

Control presence alone is not sufficient for a high AITBM score. A deployed AIDEFEND technique creates candidate evidence; the AITBM required test method determines whether the evidence is complete, current, and effective. If an AIDEFEND control exists but fails the AITBM test, the score must follow the observed test result rather than the claimed implementation.

*Table 66: AIDEFEND-to-AITBM Evaluation Process*

| Layer | Primary Function | Assessment Output |
| --- | --- | --- |
| AIDEFEND Technique Mapping | Identifies defensive techniques relevant to each AITBM sub-metric. | Candidate control and telemetry checklist. |
| AIDEFEND Evidence Review | Verifies whether mapped techniques are implemented, configured, monitored, and producing artifacts. | Evidence package: architecture, configuration, logs, alerts, test outputs, and control ownership. |
| AITBM Required Test Method | Measures whether the implemented controls resist the threat condition defined by the sub-metric. | Observed metric result such as ASR, PASR, ECE, ISSR, MTTQ, or leakage rate. |
| AITBM Rubric Assignment | Maps measured results to the five-level AITBM scoring rubric. | Sub-metric score from 0.00 to 1.00, with rationale and residual gaps. |
| ACI Treatment | Evaluates evidence completeness, coverage, and freshness. | Pc, Ec, and Tf adjustments to confidence in the score. |

### Evidence-to-Score Workflow

The following workflow should be used whenever AIDEFEND is treated as the operational evaluation source for AITBM scoring. The workflow preserves AITBM's bias-resistant scoring model by preventing assessors from awarding points merely because a named control exists.

*Table 67: Evidence-to-Score Workflow*

| Step | Evaluation Action | Required Output |
| --- | --- | --- |
| 1. Scope | Classify architecture, deployment tier, data sensitivity, autonomy level, and relevant AITBM sub-metrics. | Assessment scope and applicable AITBM rubric set. |
| 2. Map | Select AIDEFEND techniques mapped to each in-scope AITBM sub-metric. | Technique-to-sub-metric evidence matrix. |
| 3. Collect Evidence | Gather design records, AIBOM/SBOM artifacts, configuration, policy, logs, alerts, test reports, and ownership records. | Evidence package with provenance and timestamps. |
| 4. Test Effectiveness | Run the AITBM required test method using AIDEFEND telemetry and control outputs where applicable. | Measured result for the primary test metric and supporting metrics. |
| 5. Score | Assign the AITBM score from the observed result and rubric threshold, applying the lower defensible score when evidence conflicts. | 0.00, 0.25, 0.50, 0.75, or 1.00 sub-metric score with rationale. |
| 6. Adjust Confidence | Evaluate whether AIDEFEND evidence is complete, independently verified, and fresh enough for the assessment tier. | ACI Pc, Ec, and Tf inputs, plus any reassessment trigger. |

### AIDEFEND Evidence-to-AITBM Score Guide

The score guide below is a translation aid. It does not replace the specific AITBM rubric thresholds. When a sub-metric has a quantitative threshold, the quantitative threshold governs. The AIDEFEND evidence condition establishes the maximum defensible score when test data is incomplete.

*Table 68: AIDEFEND Evidence-to-AITBM Score Guide*

| AITBM Score | AIDEFEND Evidence Condition | Assessor Rule |
| --- | --- | --- |
| 0.00 | No mapped AIDEFEND control, no relevant telemetry, or control absent in production. | Assign 0.00 unless independent test evidence proves the security property exists. |
| 0.25 | Control exists in design or partial deployment, but monitoring, enforcement, or test evidence is weak. | Score cannot exceed 0.25 without production evidence or repeatable test results. |
| 0.50 | Control is implemented and produces evidence, but coverage is incomplete or effectiveness is only partially validated. | Use 0.50 when the core threat is mitigated for common cases but bypasses remain plausible. |
| 0.75 | Control is implemented, monitored, and tested against the AITBM required method with strong but not exhaustive coverage. | Use 0.75 when measured outcomes meet the rubric threshold but continuous attestation or full automation is incomplete. |
| 1.00 | Control is continuously monitored, regression-tested, independently verifiable, and tied to automated response or release gates. | Use 1.00 only when the AITBM test result, evidence freshness, and operational enforcement all support full assurance. |

### Worked Example: Scoring Cn-5 Agent Identity Integrity

Scenario: Finbot is assessed as an agentic/MCP financial assistant that invokes payment, CRM, and document-retrieval tools. The AIDEFEND evidence review identifies the eleven mapped Cn-5 techniques listed in the Cn-5 mapping table; the seven that produce inspectable evidence for this deployment are reviewed below. The assessor uses those techniques as the evidence source, then applies the AITBM Cn-5 required test method to determine the score.

*Table 69: Worked Example: Scoring Cn-5 Agent Identity Integrity*

| AIDEFEND Technique | Evidence Observed | AITBM Measurement Use |
| --- | --- | --- |
| AID-H-004 Identity & Access Management (IAM) for AI Systems | Agents and tools use scoped OIDC identities; shared emergency API key still exists for one legacy connector. | Supports identity verification evidence but creates a residual replay and exception-management gap. |
| AID-H-018 Secure Agent Architecture | Agent roles, tool permissions, and delegation boundaries are documented and enforced by policy middleware. | Supports scoped delegation and least-privilege review for Cn-5. |
| AID-H-022 AI Agent Configuration Integrity & Hardening | Signed agent manifests are used for production agents; staging agents are not consistently signed. | Supports configuration integrity but limits confidence for cross-environment consistency. |
| AID-D-011 Agent Behavioral Attestation & Rogue Detection | Runtime agent behavior is compared against baseline action patterns; rogue behavior alerts are generated. | Provides detection-rate evidence for identity misuse and rogue-agent scenarios. |
| AID-D-016 Rogue Agent Discovery, Reputation & Quarantine Pipeline | Unknown agent identifiers are quarantined automatically, but quarantine notification is manual. | Provides MTTQ evidence and response-gap evidence. |
| AID-H-029 MCP & Tool Client Security Hardening | MCP clients pin trusted tool endpoints and enforce allowlisted tool schemas. | Supports tool identity and tool-resolution integrity. |
| AID-H-025 Tool & MCP Resolution Integrity | Tool manifests are hashed and reviewed during deployment; continuous attestation is not yet enabled. | Supports signed tool-call evidence but prevents a full 1.00 score. |

Observed test result: identity spoofing succeeded in 3 of 25 attempts (ISSR = 12%). Detection occurred in 22 of 25 attempts (88%). Mean Time to Quarantine was 8 minutes. Token replay attempts failed for signed production agents, but one legacy connector still used an emergency shared key. Continuous attestation was implemented for production agents but not for all MCP servers.

Table : Worked Example: Cn-5 Scoring Interpretation70

| Scoring Factor | Observed Result | Scoring Interpretation |
| --- | --- | --- |
| Identity verification | Scoped OIDC identities and signed production manifests. | Exceeds the 0.50 evidence cap because verified production L2 evidence (scoped OIDC identities, signed manifests) is present. |
| Delegation and tool identity | Tool allowlists, pinned MCP endpoints, and hashed manifests. | Supports 0.75 because signed tool and delegation controls are present. |
| Continuous attestation | Partial; not enabled for all MCP servers. | Prevents 1.00 because attestation is not complete across the trust boundary. |
| Detection and quarantine | 88% detection; MTTQ = 8 minutes; one legacy shared-key exception. | Supports 0.75 but records residual risk and a remediation requirement. |
| Final Cn-5 score | 0.75 | Final score is 0.75. Full 1.00 requires continuous attestation for every MCP server and removal of shared-key exceptions. |

Resulting AITBM treatment: the Cn-5 sub-metric score is set to 0.75. The unresolved shared-key exception and incomplete MCP attestation are recorded as residual gaps. In ACI, provenance completeness is reduced if the shared-key exception lacks an owner or expiration date, evaluation coverage is reduced if only production agents were tested, and temporal freshness follows the Tier-specific drift rule because identity evidence can become stale quickly in agentic environments.

#### Axis: Robustness

##### Ro-1: Adversarial Input Resistance

Mapped AIDEFEND Techniques (10):

*Table 71: Ro-1 - AIDEFEND Mapping*

| AIDEFEND ID | Defensive Technique Name |
| --- | --- |
| AID-H-001 | Adversarial Robustness Training |
| AID-H-002 | AI-Contextualized Data Sanitization & Input Validation |
| AID-H-010 | Transformer Architecture Defenses |
| AID-H-015 | Ensemble Methods for Robustness |
| AID-H-016 | Certified Defenses |
| AID-H-017 | System Prompt Hardening |
| AID-D-001 | Adversarial Input & Prompt Injection Detection |
| AID-H-027 | Continuous Closed-Loop Hardening of Retrainable Prompt Injection Detectors |
| AID-H-031 | Agentic Skill Admission Security Analysis & Control Pipeline |
| AID-H-032 | AI-Generated Code Admission Control & Safe Promotion |

##### Ro-2: Distribution Shift Resilience

Mapped AIDEFEND Techniques (5):

*Table 72: Ro-2 - AIDEFEND Mapping*

| AIDEFEND ID | Defensive Technique Name |
| --- | --- |
| AID-M-003 | Model Behavior Baseline & Documentation |
| AID-D-002 | AI Model Anomaly & Performance Drift Detection |
| AID-H-015 | Ensemble Methods for Robustness |
| AID-M-008 | Automated Agentic Security Benchmarking |
| AID-D-014 | RAG Content & Relevance Monitoring |

##### Ro-3: Output Consistency

Mapped AIDEFEND Techniques (6):

*Table 73: Ro-3 - AIDEFEND Mapping*

| AIDEFEND ID | Defensive Technique Name |
| --- | --- |
| AID-H-006 | AI Output Hardening & Sanitization |
| AID-D-003 | AI Output Monitoring & Policy Enforcement |
| AID-D-007 | Multimodal Inconsistency Detection |
| AID-D-009 | Cross-Agent Fact Verification & Hallucination Cascade Detection |
| AID-D-014 | RAG Content & Relevance Monitoring |
| AID-H-034 | AI Gateway Routing Integrity & Policy-Preserving Failover |

##### Ro-4: Poisoning Attack Resistance

Mapped AIDEFEND Techniques (13):

*Table 74: Ro-4 - AIDEFEND Mapping*

| AIDEFEND ID | Defensive Technique Name |
| --- | --- |
| AID-M-002 | Data Provenance & Lineage Tracking |
| AID-H-003 | Secure ML Supply Chain Management |
| AID-H-007 | Secure & Resilient Training Process Hardening |
| AID-H-012 | Graph Neural Network (GNN) Poisoning Defense |
| AID-H-014 | Proactive Data Perturbation & Watermarking |
| AID-H-021 | RAG Index Hygiene & Signing |
| AID-H-028 | Inference Cache Integrity, Isolation & Poisoning Prevention |
| AID-D-004 | Model & AI Artifact Integrity Monitoring, Audit & Tamper Detection |
| AID-D-012 | Graph Anomaly & Backdoor Detection |
| AID-DV-007 | Poisoning Detection Canaries & Decoy Data |
| AID-E-003 | AI Backdoor & Malicious Artifact Removal |
| AID-R-001 | Secure AI Model Restoration & Retraining |
| AID-R-002 | Data Integrity Recovery for AI Systems |

#### Axis: Fairness

##### Fa-1: Demographic Parity

Mapped AIDEFEND Techniques (4):

*Table 75: Fa-1 - AIDEFEND Mapping*

| AIDEFEND ID | Defensive Technique Name |
| --- | --- |
| AID-M-004 | AI Threat Modeling & Risk Assessment |
| AID-M-007 | AI Use Case & Safety Boundary Modeling |
| AID-D-002 | AI Model Anomaly & Performance Drift Detection |
| AID-H-002 | AI-Contextualized Data Sanitization & Input Validation |

##### Fa-2: Calibration Consistency

Mapped AIDEFEND Techniques (3):

*Table 76: Fa-2 - AIDEFEND Mapping*

| AIDEFEND ID | Defensive Technique Name |
| --- | --- |
| AID-M-003 | Model Behavior Baseline & Documentation |
| AID-D-015 | User Trust Calibration & High-Risk Action Confirmation |
| AID-D-002 | AI Model Anomaly & Performance Drift Detection |

##### Fa-3: Representation Bias

Mapped AIDEFEND Techniques (3):

*Table 77: Fa-3 - AIDEFEND Mapping*

| AIDEFEND ID | Defensive Technique Name |
| --- | --- |
| AID-H-002 | AI-Contextualized Data Sanitization & Input Validation |
| AID-M-002 | Data Provenance & Lineage Tracking |
| AID-M-001 | AI Asset Inventory & Mapping |

##### Fa-4: Counterfactual Fairness

Mapped AIDEFEND Techniques (3):

*Table 78: Fa-4 - AIDEFEND Mapping*

| AIDEFEND ID | Defensive Technique Name |
| --- | --- |
| AID-D-006 | Explainability (XAI) Manipulation Detection |
| AID-M-003 | Model Behavior Baseline & Documentation |
| AID-M-004 | AI Threat Modeling & Risk Assessment |

#### Axis: Transparency

##### Tr-1: Explainability Depth

Mapped AIDEFEND Techniques (3):

*Table 79: Tr-1 - AIDEFEND Mapping*

| AIDEFEND ID | Defensive Technique Name |
| --- | --- |
| AID-M-003 | Model Behavior Baseline & Documentation |
| AID-D-006 | Explainability (XAI) Manipulation Detection |
| AID-M-004 | AI Threat Modeling & Risk Assessment |

##### Tr-2: Confidence Calibration

Mapped AIDEFEND Techniques (3):

*Table 80: Tr-2 - AIDEFEND Mapping*

| AIDEFEND ID | Defensive Technique Name |
| --- | --- |
| AID-D-015 | User Trust Calibration & High-Risk Action Confirmation |
| AID-M-003 | Model Behavior Baseline & Documentation |
| AID-D-002 | AI Model Anomaly & Performance Drift Detection |

##### Tr-3: Audit Trail Completeness

Mapped AIDEFEND Techniques (8):

*Table 81: Tr-3 - AIDEFEND Mapping*

| AIDEFEND ID | Defensive Technique Name |
| --- | --- |
| AID-M-002 | Data Provenance & Lineage Tracking |
| AID-D-005 | AI Activity Logging, Monitoring & Threat Hunting |
| AID-D-004 | Model & AI Artifact Integrity Monitoring, Audit & Tamper Detection |
| AID-H-004 | Identity & Access Management (IAM) for AI Systems |
| AID-H-031 | Agentic Skill Admission Security Analysis & Control Pipeline |
| AID-H-032 | AI-Generated Code Admission Control & Safe Promotion |
| AID-H-034 | AI Gateway Routing Integrity & Policy-Preserving Failover |
| AID-H-035 | MCP Server Runtime Boundary & Tool Exposure Governance |

##### Tr-4: Model Lineage Disclosure

Mapped AIDEFEND Techniques (4):

*Table 82: Tr-4 - AIDEFEND Mapping*

| AIDEFEND ID | Defensive Technique Name |
| --- | --- |
| AID-M-001 | AI Asset Inventory & Mapping |
| AID-M-002 | Data Provenance & Lineage Tracking |
| AID-H-003 | Secure ML Supply Chain Management |
| AID-M-010 | AI Asset Retirement, Transfer & End-of-Life Governance |

#### Axis: Privacy

##### Pr-1: Training Data Leakage Risk

Mapped AIDEFEND Techniques (5):

*Table 83: Pr-1 - AIDEFEND Mapping*

| AIDEFEND ID | Defensive Technique Name |
| --- | --- |
| AID-H-005 | Privacy-Preserving Machine Learning (PPML) Techniques |
| AID-H-014 | Proactive Data Perturbation & Watermarking |
| AID-DV-007 | Poisoning Detection Canaries & Decoy Data |
| AID-H-030 | AI Data-Use Authorization & Lifecycle-Stage Boundary Enforcement |
| AID-M-010 | AI Asset Retirement, Transfer & End-of-Life Governance |

##### Pr-2: Inference Attack Resistance

Mapped AIDEFEND Techniques (5):

*Table 84: Pr-2 - AIDEFEND Mapping*

| AIDEFEND ID | Defensive Technique Name |
| --- | --- |
| AID-H-033 | Multi-Tenant Inference Isolation & Leakage Prevention |
| AID-I-001 | AI Execution Sandboxing & Runtime Isolation |
| AID-H-028 | Inference Cache Integrity, Isolation & Poisoning Prevention |
| AID-I-004 | Agent Memory & State Isolation |
| AID-I-008 | Task-Scoped Browser Session & Origin Isolation for Agents |

##### Pr-3: Data Minimization Compliance

Mapped AIDEFEND Techniques (5):

*Table 85: Pr-3 - AIDEFEND Mapping*

| AIDEFEND ID | Defensive Technique Name |
| --- | --- |
| AID-H-030 | AI Data-Use Authorization & Lifecycle-Stage Boundary Enforcement |
| AID-M-002 | Data Provenance & Lineage Tracking |
| AID-M-010 | AI Asset Retirement, Transfer & End-of-Life Governance |
| AID-E-005 | Compromised Session Termination & State Purging |
| AID-H-034 | AI Gateway Routing Integrity & Policy-Preserving Failover |

##### Pr-4: Re-identification Risk

Mapped AIDEFEND Techniques (4):

*Table 86: Pr-4 - AIDEFEND Mapping*

| AIDEFEND ID | Defensive Technique Name |
| --- | --- |
| AID-H-005 | Privacy-Preserving Machine Learning (PPML) Techniques |
| AID-H-033 | Multi-Tenant Inference Isolation & Leakage Prevention |
| AID-I-004 | Agent Memory & State Isolation |
| AID-H-030 | AI Data-Use Authorization & Lifecycle-Stage Boundary Enforcement |

#### Axis: Containment

##### Cn-1: Scope Enforcement

Mapped AIDEFEND Techniques (8):

*Table 87: Cn-1 - AIDEFEND Mapping*

| AIDEFEND ID | Defensive Technique Name |
| --- | --- |
| AID-M-007 | AI Use Case & Safety Boundary Modeling |
| AID-H-019 | Tool Authorization & Capability Scoping |
| AID-M-009 | Agent Autonomy & Authority Governance |
| AID-D-003 | AI Output Monitoring & Policy Enforcement |
| AID-H-031 | Agentic Skill Admission Security Analysis & Control Pipeline |
| AID-H-034 | AI Gateway Routing Integrity & Policy-Preserving Failover |
| AID-I-008 | Task-Scoped Browser Session & Origin Isolation for Agents |
| AID-H-035 | MCP Server Runtime Boundary & Tool Exposure Governance |

##### Cn-2: Escalation Prevention

Mapped AIDEFEND Techniques (8):

*Table 88: Cn-2 - AIDEFEND Mapping*

| AIDEFEND ID | Defensive Technique Name |
| --- | --- |
| AID-D-010 | AI Goal Integrity Monitoring & Deviation Detection |
| AID-H-013 | Reinforcement Learning (RL) Reward Hacking Prevention |
| AID-D-013 | RL Reward & Policy Manipulation Detection |
| AID-M-006 | Human-in-the-Loop (HITL) Control Point Mapping |
| AID-H-031 | Agentic Skill Admission Security Analysis & Control Pipeline |
| AID-H-032 | AI-Generated Code Admission Control & Safe Promotion |
| AID-H-034 | AI Gateway Routing Integrity & Policy-Preserving Failover |
| AID-H-035 | MCP Server Runtime Boundary & Tool Exposure Governance |

##### Cn-3: Output Filtering Robustness

Mapped AIDEFEND Techniques (5):

*Table 89: Cn-3 - AIDEFEND Mapping*

| AIDEFEND ID | Defensive Technique Name |
| --- | --- |
| AID-H-006 | AI Output Hardening & Sanitization |
| AID-D-003 | AI Output Monitoring & Policy Enforcement |
| AID-H-026 | Unsafe Code Execution Prevention |
| AID-H-032 | AI-Generated Code Admission Control & Safe Promotion |
| AID-H-034 | AI Gateway Routing Integrity & Policy-Preserving Failover |

##### Cn-4: Side-Channel Resistance

Mapped AIDEFEND Techniques (5):

*Table 90: Cn-4 - AIDEFEND Mapping*

| AIDEFEND ID | Defensive Technique Name |
| --- | --- |
| AID-H-009 | AI Accelerator & Hardware Integrity |
| AID-I-002 | Network Segmentation & Isolation for AI Systems |
| AID-I-004 | Agent Memory & State Isolation |
| AID-I-008 | Task-Scoped Browser Session & Origin Isolation for Agents |
| AID-H-033 | Multi-Tenant Inference Isolation & Leakage Prevention |

##### Cn-5: Agent Identity Integrity

Mapped AIDEFEND Techniques (11):

*Table 91: Cn-5 - AIDEFEND Mapping*

| AIDEFEND ID | Defensive Technique Name |
| --- | --- |
| AID-H-004 | Identity & Access Management (IAM) for AI Systems |
| AID-H-018 | Secure Agent Architecture |
| AID-H-022 | AI Agent Configuration Integrity & Hardening |
| AID-D-011 | Agent Behavioral Attestation & Rogue Detection |
| AID-D-016 | Rogue Agent Discovery, Reputation & Quarantine Pipeline |
| AID-H-029 | MCP & Tool Client Security Hardening |
| AID-H-025 | Tool & MCP Resolution Integrity |
| AID-H-031 | Agentic Skill Admission Security Analysis & Control Pipeline |
| AID-M-009 | Agent Autonomy & Authority Governance |
| AID-M-001 | AI Asset Inventory & Mapping |
| AID-H-035 | MCP Server Runtime Boundary & Tool Exposure Governance |

## Operational Guidance for Using This Mapping

### For Security Assessors:

1. Review implemented AIDEFEND controls in the target system

2. Cross-reference against AITBM sub-metric mappings

3. Use AIDEFEND implementation depth as evidence for AITBM rubric scoring

4. Document control gaps where AIDEFEND coverage is missing

### For Security Engineers:

1. Identify AITBM sub-metrics with low scores

2. Review mapped AIDEFEND techniques for that sub-metric

3. Prioritize AIDEFEND implementations that impact multiple AITBM axes

4. Validate improvements through AITBM re-assessment
