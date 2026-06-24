/* AITBM ERS scoring engine — shared by the detailed calculator and the quick survey.
   Pure functions only: no DOM. UMD-lite so it loads in the browser and in Node tests. */
(function (root, factory) {
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.AITBM_ERS = api;
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var METRICS = {
    "Ro-1": { name: "Adversarial Input Resistance",   axis: "Ro", base: 0.20 },
    "Ro-2": { name: "Distribution Shift Resilience",   axis: "Ro", base: 0.50 },
    "Ro-3": { name: "Output Consistency",              axis: "Ro", base: 0.25 },
    "Ro-4": { name: "Poisoning Attack Resistance",     axis: "Ro", base: 0.15 },
    "Fa-1": { name: "Demographic Parity",              axis: "Fa", base: 0.50 },
    "Fa-2": { name: "Calibration Consistency",         axis: "Fa", base: 0.50 },
    "Fa-3": { name: "Representation Bias",             axis: "Fa", base: 0.50 },
    "Fa-4": { name: "Counterfactual Fairness",         axis: "Fa", base: 0.50 },
    "Tr-1": { name: "Explainability Depth",            axis: "Tr", base: 0.50 },
    "Tr-2": { name: "Confidence Calibration",          axis: "Tr", base: 0.30 },
    "Tr-3": { name: "Audit Trail Completeness",        axis: "Tr", base: 0.40 },
    "Tr-4": { name: "Model Lineage Disclosure",        axis: "Tr", base: 0.00 },
    "Pr-1": { name: "Training Data Leakage Risk",      axis: "Pr", base: 0.25 },
    "Pr-2": { name: "Inference Attack Resistance",     axis: "Pr", base: 0.30 },
    "Pr-3": { name: "Data Minimization Compliance",    axis: "Pr", base: 0.30 },
    "Pr-4": { name: "Re-identification Risk",          axis: "Pr", base: 0.50 },
    "Cn-1": { name: "Scope Enforcement",               axis: "Cn", base: 0.10 },
    "Cn-2": { name: "Escalation Prevention",           axis: "Cn", base: 0.15 },
    "Cn-3": { name: "Output Filtering Robustness",     axis: "Cn", base: 0.10 },
    "Cn-4": { name: "Side-Channel Resistance",         axis: "Cn", base: 0.20 },
    "Cn-5": { name: "Agent Identity Integrity",        axis: "Cn", base: 0.20 }
  };

  var WEIGHTS = {
    agentic:    { Ro: 0.15, Fa: 0.10, Tr: 0.15, Pr: 0.15, Cn: 0.45 },
    rag:        { Ro: 0.25, Fa: 0.10, Tr: 0.15, Pr: 0.30, Cn: 0.20 },
    standalone: { Ro: 0.25, Fa: 0.20, Tr: 0.20, Pr: 0.20, Cn: 0.15 }
  };

  var CONTROLS = [
    { id: "AID-M-001", name: "AI Asset Inventory & Mapping",              tactic: "Model",   impacts: { "Tr-4": 0.75, "Cn-1": 0.60 }, ers: 2.6 },
    { id: "AID-M-002", name: "Data Provenance & Lineage Tracking",        tactic: "Model",   impacts: { "Ro-4": 0.70, "Tr-4": 0.80, "Pr-3": 0.70 }, ers: 3.7 },
    { id: "AID-M-003", name: "Model Behavior Baseline & Documentation",   tactic: "Model",   impacts: { "Ro-3": 0.70, "Tr-1": 0.60, "Tr-2": 0.75 }, ers: 2.9 },
    { id: "AID-M-006", name: "Human-in-the-Loop Control Points",          tactic: "Model",   impacts: { "Cn-2": 0.70, "Cn-1": 0.75 }, ers: 4.3 },
    { id: "AID-M-009", name: "Agent Autonomy Level Governance",           tactic: "Model",   impacts: { "Cn-1": 0.80, "Cn-2": 0.75, "Cn-5": 0.70 }, ers: 5.4 },
    { id: "AID-H-001", name: "Adversarial Robustness Training",           tactic: "Harden",  impacts: { "Ro-1": 0.70, "Ro-4": 0.65 }, ers: 3.4 },
    { id: "AID-H-002", name: "Input Sanitization & Validation",           tactic: "Harden",  impacts: { "Ro-1": 0.65, "Cn-3": 0.60 }, ers: 3.3 },
    { id: "AID-H-006", name: "Output Content Filtering & Validation",     tactic: "Harden",  impacts: { "Cn-3": 0.75, "Pr-1": 0.60, "Tr-2": 0.70 }, ers: 3.5 },
    { id: "AID-H-019", name: "Agent Permission & Capability Restriction", tactic: "Harden",  impacts: { "Cn-1": 0.80, "Cn-2": 0.75, "Cn-5": 0.70 }, ers: 5.8 },
    { id: "AID-H-021", name: "Secure RAG Pipeline Implementation",        tactic: "Harden",  impacts: { "Ro-4": 0.70, "Pr-2": 0.65, "Cn-3": 0.70 }, ers: 3.9 },
    { id: "AID-H-031", name: "Agentic Skill Admission Control",           tactic: "Harden",  impacts: { "Cn-1": 0.65, "Ro-4": 0.55 }, ers: 1.8 },
    { id: "AID-H-032", name: "AI-Generated Code Admission Control",       tactic: "Harden",  impacts: { "Cn-3": 0.65, "Ro-4": 0.55 }, ers: 1.6 },
    { id: "AID-H-034", name: "AI Gateway Routing Integrity",              tactic: "Harden",  impacts: { "Cn-1": 0.60, "Cn-4": 0.55 }, ers: 1.4 },
    { id: "AID-D-001", name: "Real-Time Prompt Injection Detection",      tactic: "Detect",  impacts: { "Ro-1": 0.75, "Tr-3": 0.65 }, ers: 1.4 },
    { id: "AID-D-002", name: "Model Drift & Anomaly Detection",           tactic: "Detect",  impacts: { "Ro-3": 0.65, "Ro-4": 0.55, "Tr-2": 0.60 }, ers: 2.6 },
    { id: "AID-D-003", name: "Sensitive Data Leakage Detection",          tactic: "Detect",  impacts: { "Pr-1": 0.70, "Pr-3": 0.65, "Cn-3": 0.70 }, ers: 3.0 },
    { id: "AID-D-011", name: "Agent Behavior Monitoring & Attestation",   tactic: "Detect",  impacts: { "Cn-1": 0.75, "Cn-2": 0.70, "Cn-5": 0.80 }, ers: 3.6 },
    { id: "AID-I-002", name: "AI System Network Segmentation",            tactic: "Isolate", impacts: { "Cn-1": 0.60, "Cn-4": 0.55 }, ers: 1.4 },
    { id: "AID-I-007", name: "Client-Side AI Execution Isolation",        tactic: "Isolate", impacts: { "Cn-1": 0.70, "Cn-3": 0.65, "Cn-4": 0.60 }, ers: 2.6 },
    { id: "AID-I-008", name: "Browser Session & Origin Isolation",        tactic: "Isolate", impacts: { "Cn-1": 0.65, "Cn-4": 0.60 }, ers: 1.5 },
    { id: "AID-DV-001", name: "AI Honeypot & Canary Deployment",          tactic: "Deceive", impacts: { "Tr-3": 0.75 }, ers: 0.7 },
    { id: "AID-E-005", name: "Automated Threat Response & Termination",   tactic: "Evict",   impacts: { "Cn-2": 0.65 }, ers: 1.1 }
  ];

  function severity(ers) {
    if (ers >= 9.0) return { label: "Critical",      bg: "bg-red-600",    text: "text-white",     tier: "Tier I — Full assessment required" };
    if (ers >= 7.0) return { label: "High",          bg: "bg-orange-500", text: "text-white",     tier: "Tier I/II — Comprehensive assessment" };
    if (ers >= 5.0) return { label: "Moderate",      bg: "bg-yellow-500", text: "text-gray-900",  tier: "Tier II — Standard assessment" };
    if (ers >= 3.0) return { label: "Low-Moderate",  bg: "bg-emerald-500",text: "text-white",     tier: "Tier III — Simplified assessment" };
    return                 { label: "Low",          bg: "bg-green-600",  text: "text-white",     tier: "Tier III — Minimal assessment" };
  }

  function severityColor(ers) {
    if (ers >= 9.0) return "#dc2626";
    if (ers >= 7.0) return "#f97316";
    if (ers >= 5.0) return "#eab308";
    if (ers >= 3.0) return "#10b981";
    return "#16a34a";
  }

  /* input: { arch, controlIds:[ids], orp:{aa,as,cp,rf} in 0..1, aci:{pc,ec,tf} in 0..1 } */
  function computeERS(input) {
    var w = WEIGHTS[input.arch] || WEIGHTS.agentic;

    var controlMap = {};
    CONTROLS.forEach(function (c) { controlMap[c.id] = c; });

    var vals = {};
    Object.keys(METRICS).forEach(function (m) { vals[m] = METRICS[m].base; });
    (input.controlIds || []).forEach(function (id) {
      var ctrl = controlMap[id];
      if (!ctrl) return;
      Object.keys(ctrl.impacts).forEach(function (m) {
        if (ctrl.impacts[m] > vals[m]) vals[m] = ctrl.impacts[m];
      });
    });

    var axes = { Ro: [], Fa: [], Tr: [], Pr: [], Cn: [] };
    Object.keys(vals).forEach(function (m) { axes[METRICS[m].axis].push(vals[m]); });
    var axisScores = {};
    Object.keys(axes).forEach(function (ax) {
      var arr = axes[ax];
      axisScores[ax] = arr.reduce(function (s, v) { return s + v; }, 0) / arr.length;
    });

    var ivp = 0;
    Object.keys(w).forEach(function (ax) { ivp += w[ax] * axisScores[ax]; });

    var o = input.orp;
    var avg = (o.aa + o.as + o.cp + o.rf) / 4;
    var nElev = (o.aa > 0.75 ? 1 : 0) + (o.as > 0.75 ? 1 : 0) + (o.cp > 0.75 ? 1 : 0) + (o.rf > 0.75 ? 1 : 0);
    var crm = Math.max(0.75, Math.min(1.75, -0.129 + 1.882 * avg + 0.05 * nElev));

    var a = input.aci;
    var aci = Math.pow(Math.max(a.pc, 0.01) * Math.max(a.ec, 0.01) * Math.max(a.tf, 0.01), 1 / 3);
    var aciMod = 1.1 - 0.525 * aci;

    var ers = Math.max(1.5, Math.min(10.0, 1.5 + 8.5 * (1 - ivp) * crm * aciMod));

    return { ers: ers, ivp: ivp, crm: crm, aci: aci, axisScores: axisScores };
  }

  return { METRICS: METRICS, WEIGHTS: WEIGHTS, CONTROLS: CONTROLS, computeERS: computeERS, severity: severity, severityColor: severityColor };
});
