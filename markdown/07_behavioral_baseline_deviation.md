# Behavioral Baseline Deviation (BBD) Protocol

For stateful and agentic systems, AITBM mandates continuous behavioral monitoring to detect cumulative risk from multi-turn context poisoning, memory manipulation, or gradual goal hijacking.

Tier Applicability: BBD monitoring is mandatory for Tier 1, recommended for Tier 2, optional for Tier 3, and not required for Tier 4 (Research). Tier 4 systems operating in sandboxed, non-production environments with no external users do not generate sufficient operational data for statistically valid baselines. However, Tier 4 systems being evaluated for promotion to Tier 3 or higher should begin BBD data collection at least 30 days before the target promotion date to satisfy cold-start requirements.

## 7.1 Baseline Establishment

At initial deployment and after each full assessment, a behavioral baseline is established by recording: decision pattern distributions, tool-calling frequency and target distributions, output semantic intent profiles, and memory/state access patterns.

Minimum Baseline Validity Requirements

*Table 53: 7.1 Baseline Establishment*

| Requirement | Tier 1 | Tier 2 | Tier 3 |
| --- | --- | --- | --- |
| Minimum observation period | 14 days | 21 days | 30 days |
| Minimum decision samples | 1,000 | 500 | 200 |
| Minimum unique user sessions | 100 | 50 | 20 |
| Minimum JS divergence confidence | 95% (p < 0.05) | 90% (p < 0.10) |  |

Cold-Start Protocol

## 7.2 Drift Detection

Behavioral drift is quantified as the Jensen–Shannon divergence between the baseline and current behavior distributions, then classified against the thresholds in the table below:

```
BBD(t) = D_(JS)(P_(baseline)||P_(current)(t))
```

Basis. Behavioral drift is measured as the statistical distance between how the system behaved when it was assessed and how it behaves now: zero means identical, higher means diverging. Crossing the thresholds (0.15, 0.35, 0.60) triggers escalating action, up to automated quarantine.

Variables. P_baseline is the behavioral distribution recorded at assessment (decision patterns, tool-call targets, output intent, and memory-access patterns); P_current(t) is the same set of distributions measured at time t; D_JS is the Jensen-Shannon divergence between them.

Why this form. Jensen-Shannon divergence is chosen over alternatives such as Kullback-Leibler divergence for three reasons. It is symmetric, so drift measured baseline-to-current equals current-to-baseline, which matters when neither distribution is privileged as 'true'. It is bounded on the [0, 1] interval (with log base 2), so fixed thresholds such as 0.15, 0.35, and 0.60 stay stable and comparable across systems, whereas an unbounded measure could not anchor them. And it stays finite even when one distribution assigns zero probability to an event the other allows, a common situation when a new tool-call target or a novel output appears, where Kullback-Leibler divergence would diverge to infinity. This operationalizes the principle that risk is cumulative and monitored continuously, not captured only at assessment time (Design Principle 2.5).

*Table 54: 7.2 Drift Detection*

| BBD Threshold | Classification | Automated Action | ACI Impact |
| --- | --- | --- | --- |
| BBD < 0.15 | Normal Variance | Continue monitoring | Tf decay slowed if < 0.10 |
| 0.15 <= BBD < 0.35 | Elevated Deviation | Alert + increased monitoring | Tf reduced by 25% |
| 0.35 <= BBD < 0.60 | Significant Drift | Alert + mandatory reassessment 72h | Tf reduced by 60% |
| BBD >= 0.60 | Critical Deviation | Alert + auto quarantine (HITL) + full reassessment | Tf reset to 0.10 |
