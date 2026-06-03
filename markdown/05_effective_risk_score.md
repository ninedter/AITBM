# The Effective Risk Score (ERS)

When organizations require a single number for dashboards and triage, the ERS is derived from the three layers. It is explicitly a derived convenience metric; the multi-dimensional profiles remain the authoritative output.

## 5.1 The ERS Formula

```
ERS_(raw) = ORP_(effective) × [alpha+(1-alpha) × (1-W_(ivp) × IVP)] × (1/ACI_(composite)) × S
ERS = min(10.0,ERS_(raw))
```

Where:

ORP_(effective)=(W_(orp)·ORP)×CRM (compound-risk-adjusted operational score)

α=0.15 (Residual Risk Floor: minimum fraction of operational risk that persists regardless of intrinsic security)

S=10 (scaling constant to normalize to 0–10 range)

How the Residual Risk Floor Works:

When W_ivp · IVP = 0 (no intrinsic security): mitigation factor = 1.0 (full operational risk). When W_ivp · IVP = 1.0 (perfect): mitigation factor = 0.15 (15% of operational risk always persists). This ensures a system deployed with high operational risk always registers meaningful ERS regardless of intrinsic quality.

Boundary Conditions: ERS is capped at 10.0. Perfect IVP cannot reduce operational risk below the alpha floor. If ACI approaches zero, the assessment is invalid and must be refreshed rather than treated as precise risk inflation.
