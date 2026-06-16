# Design Principles

## 2.1 The Probabilistic-First Assumption

AITBM inverts the design assumption of existing frameworks. Rather than beginning with a deterministic scoring system and attempting to make it non-deterministic, AITBM assumes that AI systems are inherently probabilistic, stateful, and evolving. Deterministic software components within an AI system are treated as the special case, not the default.

## 2.2 Multi-Dimensionality as Primary Output

The framework produces vector-based profiles, not scalar scores, as its authoritative output. This preserves the visibility of trade-offs that formal results show cannot be resolved in general: common fairness criteria are mutually incompatible except in degenerate cases, and demonstrated accuracy-robustness trade-offs mean that accuracy, adversarial robustness, and fairness cannot in general be maximized simultaneously.

## 2.3 Deterministic Weights via Deployment Tiering

Weight selection is removed from the assessor’s discretion. Organizations classify their deployments into predefined tiers, and weights are deterministically derived from that classification. Two organizations scoring the same system in the same deployment context will produce identical results.

## 2.4 Epistemic Penalty for Opacity

The Assurance Confidence Index (ACI) layer quantifies how much is actually known about the system being scored. Low transparency inflates risk scores rather than being ignored. This incentivizes supply chain transparency and penalizes organizations that cannot demonstrate provenance, evaluation coverage, or temporal freshness.

## 2.5 Continuous Behavioral Monitoring

For stateful and agentic systems, AITBM mandates the establishment of behavioral baselines with continuous drift monitoring. Risk is treated as cumulative rather than isolated, reflecting the reality that multi-turn context poisoning and memory manipulation can degrade security posture without any new external exploit.

## 2.6 Operational Risk Independence

Intrinsic security quality and operational deployment risk are treated as partially independent dimensions. High intrinsic security reduces but cannot fully eliminate operational risk. A system deployed in a high-risk context always carries residual risk regardless of its intrinsic properties.

## 2.7 Reproducibility Through Conflict Resolution

AITBM treats reproducibility as an assessment control. When evidence conflicts, assessors apply fixed precedence rules: quantitative over qualitative, production over staging, and the lower defensible score when uncertainty remains. The applied rule and rationale are recorded for independent reproduction.
