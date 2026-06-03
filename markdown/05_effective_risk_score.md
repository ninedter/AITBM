# The Effective Risk Score (ERS)

When organizations require a single number for dashboards and triage, the ERS is derived from the three layers. It is explicitly a derived convenience metric; the multi-dimensional profiles remain the authoritative output.

## 5.1 The ERS Formula

```
ERS = min(10, k x ORP_effective x (alpha + (1 - alpha) x (1 - W_ivp . IVP)) / ACI_composite)
```

Where:

- **ORP_effective = W_orp . ORP x CRM** -- compound-risk-adjusted operational score
- **alpha = 0.15** -- Residual Risk Floor: minimum fraction of operational risk that persists regardless of intrinsic security
- **k** -- scaling constant to normalize to 0--10 range
- **ACI_composite = (Pc x Ec x Tf)^(1/3)** -- geometric mean of the three ACI components

### How the Residual Risk Floor Works

- When `W_ivp . IVP = 0` (no intrinsic security): mitigation factor = 1.0 (full operational risk).
- When `W_ivp . IVP = 1.0` (perfect intrinsic security): mitigation factor = 0.15 (15% of operational risk always persists).

This ensures a system deployed with high operational risk always registers meaningful ERS regardless of intrinsic quality.

### Boundary Conditions

- ERS is capped at 10.0.
- Perfect IVP cannot reduce operational risk below the alpha floor.
- If ACI approaches zero, the assessment is invalid and must be refreshed rather than treated as precise risk inflation.

### Validation Anchor

Finbot worked example: ERS = 10.0, CRM = 1.35, Severity = Critical MVT.
