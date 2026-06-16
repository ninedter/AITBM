# Tiered Assessment Pathways

AITBM defines tiered assessment pathways calibrated to deployment risk. The table below summarizes each tier's definition, representative examples, and review cadence.

*Table 55: 8. Tiered Assessment Pathways*

| Characteristic | Full Assessment | Standard Assessment | Lite Assessment |
| --- | --- | --- | --- |
| Target Org. | Enterprise / Regulated | Mid-market | Startup / SME |
| IVP Axes | All 5 (full test batteries) | All 5 (reduced batteries) | 3 core: Ro, Pr, Cn |
| ORP Analysis | Full 4-dimension | Full 4-dimension questionnaire | Simplified 2-dim: Aa, As |
| ACI Requirements | Full AIBOM + independent audit | AIBOM + self-assessment | Basic provenance metadata |
| Max Ec Score | 1.0 | 0.75 (capped) | 0.50 (capped) |
| Eligible Tiers | All tiers | Tiers 2–4 | Tiers 3–4 + Conditional Tier 2 |

## 8.1 Conditional Tier 2 Lite Assessment

A Tier 2 deployment may use the Lite pathway if ALL conditions are met:

1. Organization Size: Fewer than 50 employees OR annual revenue below $10M USD.

2. Autonomy Constraint: No autonomous external side effects; human approval required for actions affecting users, money, data deletion, access rights, or system configuration; Aa <= 0.50.

3. Cascade Constraint: No direct health, safety, financial, legal, or infrastructure cascade path; downstream impact is reversible and bounded; Cp <= 0.50.

4. Data Sensitivity: System does not process health, financial, or biometric data.

Mandatory Escalation Triggers: Must upgrade to Standard within 90 days if: (a) MAU exceeds 10,000, (b) Aa increases above 0.50, (c) sensitive data processing begins, or (d) a security incident occurs. Must conduct Standard assessment within 12 months regardless.
