# The Effective Risk Score (ERS)

When organizations require a single number for dashboards and triage, the ERS is derived from the three layers. It is explicitly a derived convenience metric; the multi-dimensional profiles remain the authoritative output.

## 5.1 The ERS Formula

```
ERS_(raw) = ORP_(effective) × [alpha+(1-alpha) × (1-W_(ivp) × IVP)] × (1/ACI_(composite)) × S
ERS = min(10.0,ERS_(raw))
```

Basis. The ERS starts from operational risk, reduces it by intrinsic security but only down to a floor (never to zero), inflates it for low assurance confidence, scales the result to a 0-10 range, and caps it at 10. Each layer plays a distinct role: ORP sets the stakes, IVP mitigates, and ACI adjusts for how much is actually known.

Variables. ORP_effective is the compound-risk-adjusted operational score; W_ivp . IVP is the architecture-weighted intrinsic-security scalar (0-1, where higher is more secure); alpha = 0.15 is the residual risk floor; 1 / ACI_composite is the epistemic inflation term; S = 10 is the scaling constant; and the min(., 10) operator is the hard cap.

Why this form. The mitigation bracket alpha + (1 - alpha)(1 - W_ivp . IVP) is a linear map from intrinsic security to a factor on the [alpha, 1] interval: it equals 1.0 at zero intrinsic security (full operational risk) and alpha = 0.15 at perfect intrinsic security (15% irreducible), encoding the principle that intrinsic quality reduces but cannot eliminate operational risk (Design Principle 2.6). The floor exists because probabilistic, emergent systems cannot be proven risk-free, so a zero would be a false guarantee. Dividing by ACI_composite implements the epistemic penalty (Design Principle 2.4): the same IVP and ORP with half the assurance confidence yields double the risk, so opacity inflates the score rather than being ignored, and division makes that penalty proportional to the risk at stake. S = 10 maps the normalized product onto the familiar 0-10 scale, and the min cap keeps ERS bounded and prevents a near-zero ACI from producing a meaningless blow-up; if ACI approaches zero the assessment is treated as invalid and refreshed, not as infinitely risky. The value alpha = 0.15 is calibrated against the Finbot anchor and is the subject of explicit sensitivity validation in the roadmap: large enough that high-risk deployments never score trivially, small enough that strong intrinsic security is still rewarded.

Where:

ORP_(effective)=(W_(orp)·ORP)×CRM (compound-risk-adjusted operational score)

α=0.15 (Residual Risk Floor: minimum fraction of operational risk that persists regardless of intrinsic security)

S=10 (scaling constant to normalize to 0–10 range)

How the Residual Risk Floor Works:

When W_ivp · IVP = 0 (no intrinsic security): mitigation factor = 1.0 (full operational risk). When W_ivp · IVP = 1.0 (perfect): mitigation factor = 0.15 (15% of operational risk always persists). This ensures a system deployed with high operational risk always registers meaningful ERS regardless of intrinsic quality.

Boundary Conditions: ERS is capped at 10.0. Perfect IVP cannot reduce operational risk below the alpha floor. If ACI approaches zero, the assessment is invalid and must be refreshed rather than treated as precise risk inflation.
