# Framework Comparison

The table below compares AITBM with prior and adjacent AI security frameworks and shows where AITBM closes their structural gaps. The comparison reflects a June 2026 re-validation against OWASP AIVSS v0.8 (released March 2026) and now includes AIUC-1 (January 2026), the AI-agent certification and insurance standard published by the Artificial Intelligence Underwriting Company.

*Table 59: 10. Framework Comparison*

| Capability | CVSS 4.0 | AIVSS v0.8 | RAISE | AIUC-1 | AITBM |
| --- | --- | --- | --- | --- | --- |
| AI-native (non-deterministic) | No | Partial | Yes |  |  |
| Multi-dimensional profile | No |  | Yes | No | Yes |
| Deterministic weights | N/A | Yes | Partial | N/A | Yes |
| Epistemic confidence scoring | No |  |  |  | Yes |
| Behavioral drift monitoring | No |  |  | Partial | Yes |
| Supply chain integration (AIBOM) | No | Partial | No | Partial | Yes |
| Tiered SME pathway | N/A | No |  | Partial | Yes |
| Stateful/agentic risk modeling | No | Yes | No | Partial | Yes |
| MVT enforcement per dimension | No |  |  | Partial | Yes |
| Compound operational risk | No |  |  |  | Yes |
| Residual deployment risk floor | No | Partial | No | Partial | Yes |
| Graduated MVT severity | No |  |  |  | Yes |
| Jurisdictional fairness | No |  |  | Partial | Yes |
| Architecture classification tree | No | Partial | No | Partial | Yes |
| Inter-rater reliability targets | No |  |  |  | Yes |

Re-validation against AIVSS v0.8 (March 2026). AIVSS v0.8 replaces the v0.5 averaging model with an additive uplift in which the agentic risk score fills the gap between the CVSS 4.0 base score and the maximum score of 10, scaled by a threat multiplier and a mitigation factor; it fixes all ten agentic amplification factors at equal weight and introduces a relative mitigation floor of 0.67 on the grounds that no mitigation can fully eliminate agentic residual risk. These changes close the weight-tuning discretion identified in the prior comparison and are reflected in the updated verdicts above. The structural gaps AITBM addresses remain: the published result is a single 0.0–10.0 score by design, with factor detail demoted to optional supporting evidence; the ten factors are rated on three-point, single-phrase anchors without defined test methods or measurable thresholds; operational context is reduced to two scalar multipliers with no deployment-context, threat-actor, or data-sensitivity model; no evidence-freshness or assurance-confidence layer exists; no tiered assessment pathway is provided; no inter-rater reliability targets are stated; and the agentic track carries no fairness, privacy, or transparency dimensions. The v0.8 mitigation floor is also relative — a maximum 33 percent score reduction, with an absolute score of zero still attainable — in contrast to the absolute ERS residual risk floor of α = 0.15.

Positioning relative to AIUC-1 (January 2026). AIUC-1, published by the Artificial Intelligence Underwriting Company with contributions from more than one hundred Fortune 500 CISOs, MITRE, the Cloud Security Alliance, Orrick, and Stanford, defines 51 requirements and approximately 130 controls across six domains (Data & Privacy, Security, Safety, Reliability, Accountability, Society) and issues a pass/fail certificate backed by accredited third-party audit and Lloyd's of London insurance against agent failures. It is a control-certification and risk-transfer layer, not a risk-measurement layer: it produces no score, no per-domain profile, no deployment-context model, and no confidence gradation, and its January 2026 release is explicitly scoped to single-agent systems. The official AIVSS–AIUC-1 crosswalk maps zero AIUC-1 controls to the Agent Identity Impersonation and Multi-Agent Orchestration risks — precisely the exposure the Cn-5 sub-metric and AITBM's agentic architecture weighting quantify.

Complementary use of AIUC-1. AITBM treats AIUC-1 exactly as it treats AISVS: certification attestations and the standard's quarterly third-party test reports (adversarial robustness, harmful output, hallucination, and tool-call testing) become objective scoring evidence for IVP sub-metrics and natural refresh inputs for ACI temporal freshness, while the ORP layer quantifies the deployment-context risk a binary certificate cannot express. The insurance model is the economic counterpart of the AITBM residual risk floor: AIUC-1 transfers residual risk financially, while AITBM quantifies it mathematically — a certified and insured agent still warrants a full ERS profile, because insurance compensates losses rather than preventing them.
