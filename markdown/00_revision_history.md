# Revision History

The major content revisions of this specification are recorded below (styling-only passes are not listed).

| Release | Date | Author | Description | Status |
| --- | --- | --- | --- | --- |
| Initial | March 24, 2026 | Henry Hu | Framework established and renamed from AIVBM to AITBM; scope reframed from vulnerability scoring to trust benchmarking and maturity. | Superseded |
| Revised | March 31, 2026 | Henry Hu | Formal specification: three-layer architecture (IVP / ORP / ACI), 21 sub-metrics with five-level rubrics, ERS formula with residual risk floor (alpha = 0.15), graduated MVT severity, BBD protocol, tiered assessment pathways, and the Finbot worked example (ERS = 10.0). | Superseded |
| Revised | April 5, 2026 | Henry Hu | Added AIDEFEND integration: 84 AIDEFEND defensive techniques mapped across the 21 sub-metrics; cross-referenced with the 12-gap structural analysis. | Superseded |
| Current | June 2, 2026 | Henry Hu | Reconciled AIDEFEND mapping to current upstream (85 techniques; renumbered identifiers; added AID-M-010, AID-H-031, AID-H-032, AID-H-034, AID-I-008); added the six-layer evidence-to-score model and the Cn-5 (Agent Identity Integrity) worked example. | Final |

Index of Tables
Table1: Document Identification	1
Table2: Document Revision History	2
Table3: 3. The Three-Layer Architecture	10
Table4: 3.1.2 Axis 1: Robustness (Ro) Structure	11
Table5: Scoring Rubric - Ro-1	11
Table6: Scoring Rubric - Ro-2	12
Table7: Scoring Rubric - Ro-3	13
Table8: Scoring Rubric - Ro-4	13
Table9: 3.1.3 Axis 2: Fairness (Fa) Structure	14
Table10: 3.1.3 Axis 2: Fairness (Fa)	14
Table11: Scoring Rubric - Fa-1	15
Table12: Scoring Rubric - Fa-2	15
Table13: Scoring Rubric - Fa-3	16
Table14: Scoring Rubric - Fa-4	16
Table15: 3.1.4 Axis 3: Transparency (Tr) Structure	17
Table16: Scoring Rubric - Tr-1	17
Table17: Scoring Rubric - Tr-2	18
Table18: Scoring Rubric - Tr-3	19
Table19: Scoring Rubric - Tr-4	19
Table21: Scoring Rubric - Pr-1	20
Table22: Scoring Rubric - Pr-2	21
Table23: Scoring Rubric - Pr-3	21
Table24: Scoring Rubric - Pr-4	22
Table25: 3.1.6 Axis 5: Containment (Cn) Structure	23
Table26: Scoring Rubric - Cn-1	23
Table27: Scoring Rubric - Cn-2	23
Table28: Scoring Rubric - Cn-3	24
Table29: Scoring Rubric - Cn-4	25
Table30: 3.1.7 Complete IVP Sub-Metric Reference Structure	26
Table31: Scoring Rubric - 3.2.1 ORP Dimension Scoring	27
Table32: Scoring Rubric - 3.2.1 ORP Dimension Scoring	28
Table33: Scoring Rubric - 3.2.1 ORP Dimension Scoring	28
Table34: Scoring Rubric - 3.2.1 ORP Dimension Scoring	29
Table35: 3.2.2 Compound Risk Multiplier (CRM)	29
Table36: 3.2.3 ORP Scoring Summary	30
Table42: 4. Deployment Tier Classification	37
Table43: 4.1 IVP Weight Profiles (W_ivp)	37
Table44: 4.2 ORP Weight Profiles (W_orp)	37
Table45: 6. Minimum Viability Thresholds (MVTs)	43
Table46: 6.1 Graduated MVT Severity Classification	44
Table47: 6.1 Graduated MVT Severity Classification	44
Table48: 7.1 Baseline Establishment	45
Table49: 7.2 Drift Detection	45
Table50: 8. Tiered Assessment Pathways	47
Table51: 9.1 IVP Assessment	48
Table52: 9.2 ORP Assessment	48
Table53: 9.3 ACI Assessment	49
Table54: 10. Framework Comparison	51
Table55: AIDEFEND Tactical Structure	56
Table56: Ro-1 - AIDEFEND Mapping	57
Table57: Ro-2 - AIDEFEND Mapping	58
Table58: Ro-3 - AIDEFEND Mapping	58
Table59: Ro-4 - AIDEFEND Mapping	58
Table60: Fa-1 - AIDEFEND Mapping	59
Table61: Fa-2 - AIDEFEND Mapping	59
Table62: Fa-3 - AIDEFEND Mapping	59
Table63: Fa-4 - AIDEFEND Mapping	59
Table64: Tr-1 - AIDEFEND Mapping	60
Table65: Tr-2 - AIDEFEND Mapping	60
Table66: Tr-3 - AIDEFEND Mapping	60
Table67: Tr-4 - AIDEFEND Mapping	61
Table68: Pr-1 - AIDEFEND Mapping	61
Table69: Pr-2 - AIDEFEND Mapping	61
Table70: Pr-3 - AIDEFEND Mapping	61
Table71: Pr-4 - AIDEFEND Mapping	62
Table72: Cn-1 - AIDEFEND Mapping	62
Table73: Cn-2 - AIDEFEND Mapping	62
Table74: Cn-3 - AIDEFEND Mapping	63
Table75: Cn-4 - AIDEFEND Mapping	63
Table76: Cn-5 - AIDEFEND Mapping	63
