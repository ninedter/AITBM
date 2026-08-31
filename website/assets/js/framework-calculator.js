/* Full-pathway AITBM framework calculation UI. No input is persisted. */
(function () {
  "use strict";

  var ENGINE = window.AITBM_NORMATIVE;
  if (!ENGINE) return;

  var AXIS_NAMES = { Ro: "Robustness", Fa: "Fairness", Tr: "Transparency", Pr: "Privacy", Cn: "Containment" };
  var ORP = {
    Aa: { name: "Autonomy Amplification", definition: "Degree of independent decision-making authority granted to the system.", criteria: [
      [0, "Fully human-in-the-loop: suggestions only; every output reviewed; no tool-calling or write permissions."],
      [0.25, "Human-gated execution: prepares actions but requires explicit confirmation for each action."],
      [0.5, "Human-on-the-loop: routine actions execute within predefined boundaries; high-value actions escalate."],
      [0.75, "Supervised autonomy: most actions execute with asynchronous oversight; escalation is exception-only."],
      [1, "Full autonomous execution: consequential decisions and actions occur without human approval."]
    ]},
    As: { name: "Attack Surface Exposure", definition: "Exposure to untrusted, adversarial, or unvalidated inputs.", criteria: [
      [0, "Air-gapped or closed-loop; curated internal data; no user-facing interface."],
      [0.25, "Controlled internal users and inputs; no external data ingestion; single-agent."],
      [0.5, "Internet-facing with validation, rate limiting, and content filtering; single-agent."],
      [0.75, "Internet-facing with external RAG, scraping, email, or API data that is only partially trusted."],
      [1, "Maximum exposure: untrusted RAG, external multi-agent communication, and/or MCP tool integration."]
    ]},
    Cp: { name: "Cascade Potential", definition: "Maximum downstream impact, graph-derived from the verified System Dependency Graph; the worst indicator governs.", criteria: [
      [0, "DGC ≥ 0.95 and GVR passes; origin layer only, PAD 0, FIBR 0; human-only consumption."],
      [0.25, "DGC ≥ 0.95; LRR ≤ 0.50; terminal P1–P2, PAD 0; FIBR ≤ 0.10; external gates CBR ≥ 0.95."],
      [0.5, "DGC ≥ 0.90; LRR ≤ 0.75; PAD ≤ 1; no P4 reachable; FIBR ≤ 0.30."],
      [0.75, "LRR 1.00, PAD 2, or gated P3 reachability with CBR ≥ 0.95; FIBR ≤ 0.60."],
      [1, "Ungated P3/P4 or delegated-irreversible path, PAD ≥ 3, FIBR > 0.60, GVR failure, no SDG, or DGC < 0.90."]
    ]},
    Rf: { name: "Remediation Feasibility", definition: "Practical difficulty of fixing or mitigating a vulnerability once identified.", criteria: [
      [0, "Deterministic code, configuration, dependency, or patch fix is available."],
      [0.25, "Model-adjacent infrastructure change; days to implement; no model change."],
      [0.5, "Retraining or fine-tuning required; weeks to fix; effectiveness probabilistic."],
      [0.75, "Guardrail mitigation only; fundamental model property can be reduced but not eliminated."],
      [1, "Inherent and only boundable through deployment constraints."]
    ]}
  };
  var TDI = { stable: 0.6, normal: 1, elevated: 1.5, significant: 3, critical: 3 };
  var THREAT = {
    normal: { multiplier: 1, eventCap: 1 },
    high: { multiplier: 1.5, eventCap: 1 },
    exploited: { multiplier: 1.5, eventCap: 0.5 },
    active: { multiplier: 1.5, eventCap: 0.1 }
  };
  var BAW_ITEM_IDS = ["memory", "agents", "self-modifying", "feedback"];
  var ARCH_REQUIRES_CONTAINMENT = ["Multi-Agent / MCP System", "Agentic / MCP System", "Tool-Calling LLM / Connected GenAI"];
  var submetrics = [];
  var lastResult = null;

  function byId(id) { return document.getElementById(id); }
  function create(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }
  function nonempty(id) { return Boolean((byId(id).value || "").trim()); }
  function numeric(id) { return byId(id).value === "" ? null : Number(byId(id).value); }
  function daysSince(value) {
    if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
    var selected = new Date(value + "T00:00:00Z");
    if (!Number.isFinite(selected.getTime()) || selected.toISOString().slice(0, 10) !== value) return null;
    var now = new Date();
    var today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    var days = Math.floor((today - selected.getTime()) / 86400000);
    return days < 0 ? null : days;
  }
  function scoreColor(ers) {
    if (ers >= 9) return "#dc2626";
    if (ers >= 7) return "#f97316";
    if (ers >= 5) return "#eab308";
    if (ers >= 3) return "#4773bd";
    return "#059669";
  }
  function setPageMode(mode) {
    ["quick", "detailed", "framework"].forEach(function (name) {
      var active = name === mode;
      var button = byId("mode-" + name);
      var view = byId(name + "-view");
      button.setAttribute("aria-selected", active ? "true" : "false");
      button.className = "rounded-md px-3 py-1.5 text-sm font-semibold" + (active ? " bg-navy text-white" : " text-gray-600");
      view.classList.toggle("hidden", !active);
    });
  }

  function scoreSlider(id, prefix) {
    var wrap = create("div", "mt-2");
    var statusRow = create("div", "flex items-center justify-between gap-3");
    var status = create("span", "rounded bg-gray-100 px-2 py-1 text-xs font-bold text-gray-600", "Unresolved — move slider");
    status.id = prefix + "-value-" + id;
    var clear = create("button", "fw-clear-score hidden text-xs font-semibold text-navy underline", "Clear score");
    clear.type = "button";
    clear.dataset.target = prefix + "-score-" + id;
    statusRow.appendChild(status);
    statusRow.appendChild(clear);
    wrap.appendChild(statusRow);
    var range = create("input", "fw-score-range mt-3 w-full accent-navy opacity-40");
    range.id = prefix + "-score-" + id;
    range.dataset.item = id;
    range.dataset.resolved = "false";
    range.type = "range";
    range.min = "0";
    range.max = "1";
    range.step = "0.25";
    range.value = "0.5";
    range.setAttribute("aria-label", id + " resolved score");
    range.setAttribute("aria-valuetext", "Unresolved; move the slider to select a score");
    wrap.appendChild(range);
    var ticks = create("div", "mt-1 flex justify-between text-[10px] text-muted");
    ["0.00", "0.25", "0.50", "0.75", "1.00"].forEach(function (value) { ticks.appendChild(create("span", "", value)); });
    wrap.appendChild(ticks);
    return wrap;
  }

  function renderCriteriaList(criteria) {
    var details = create("details", "mt-3 rounded border border-gray-200 bg-gray-50 p-3");
    details.appendChild(create("summary", "cursor-pointer text-xs font-semibold text-navy", "Review all five rubric anchors"));
    var list = create("div", "mt-3 space-y-2");
    criteria.forEach(function (row) {
      var item = create("div", "grid gap-1 text-xs sm:grid-cols-[3rem_minmax(0,1fr)]");
      item.appendChild(create("span", "font-bold text-navy", Number(row.score == null ? row[0] : row.score).toFixed(2)));
      item.appendChild(create("span", "leading-relaxed text-gray-700", row.criteria == null ? row[1] : row.criteria));
      list.appendChild(item);
    });
    details.appendChild(list);
    return details;
  }

  function renderIvp() {
    var panel = byId("fw-ivp-panel");
    panel.textContent = "";
    ENGINE.AXES.forEach(function (axis) {
      var axisSection = create("section", "overflow-hidden rounded-xl border border-gray-200");
      var header = create("button", "flex w-full items-center justify-between bg-gray-50 px-4 py-3 text-left", AXIS_NAMES[axis] + " (" + axis + ")");
      header.type = "button";
      header.setAttribute("aria-expanded", "true");
      header.classList.add("font-bold", "text-navy");
      var body = create("div", "space-y-4 p-4");
      header.addEventListener("click", function () {
        body.classList.toggle("hidden");
        header.setAttribute("aria-expanded", body.classList.contains("hidden") ? "false" : "true");
      });
      submetrics.filter(function (metric) { return metric.axis_id === axis; }).forEach(function (metric) {
        var article = create("article", "rounded-lg border border-gray-200 p-4");
        article.dataset.metric = metric.id;
        var heading = create("div", "flex flex-wrap items-start justify-between gap-2");
        var titleWrap = create("div");
        titleWrap.appendChild(create("h4", "font-bold text-navy", metric.id + " — " + metric.name));
        titleWrap.appendChild(create("p", "mt-1 text-xs leading-relaxed text-muted", metric.definition));
        heading.appendChild(titleWrap);
        var link = create("a", "text-xs font-semibold text-navy underline underline-offset-2", "Open reference");
        link.href = metric.url;
        heading.appendChild(link);
        article.appendChild(heading);
        var method = create("p", "mt-3 rounded bg-blue-50/50 p-3 text-xs leading-relaxed text-gray-700");
        method.appendChild(create("strong", "text-navy", "Required test method: "));
        method.appendChild(document.createTextNode(metric.test_method));
        article.appendChild(method);
        article.appendChild(renderCriteriaList(metric.rubric));

        var fields = create("div", "mt-4 grid gap-3 sm:grid-cols-2");
        var scoreWrap = create("div");
        var scoreLabel = create("label", "text-xs font-semibold text-gray-700", "Resolved score");
        scoreLabel.htmlFor = "fw-score-" + metric.id;
        scoreWrap.appendChild(scoreLabel);
        scoreWrap.appendChild(scoreSlider(metric.id, "fw"));
        fields.appendChild(scoreWrap);
        var naWrap = create("div", "rounded border border-gray-200 bg-gray-50 p-3");
        var naLabel = create("label", "flex items-start gap-2 text-xs font-semibold text-gray-700");
        var na = document.createElement("input");
        na.type = "checkbox";
        na.id = "fw-na-" + metric.id;
        na.dataset.item = metric.id;
        na.className = "fw-na mt-0.5";
        naLabel.appendChild(na);
        naLabel.appendChild(document.createTextNode("NOT APPLICABLE — exclude and redistribute weight"));
        naWrap.appendChild(naLabel);
        naWrap.appendChild(create("p", "mt-1 text-[11px] text-muted", "Use only for an architecture-supported exclusion. This is not an unknown-evidence option, and every axis must retain at least one metric."));
        fields.appendChild(naWrap);
        article.appendChild(fields);
        body.appendChild(article);
      });
      axisSection.appendChild(header);
      axisSection.appendChild(body);
      panel.appendChild(axisSection);
    });
  }

  function renderOrp() {
    var panel = byId("fw-orp-panel");
    panel.textContent = "";
    Object.keys(ORP).forEach(function (dim) {
      var item = ORP[dim];
      var article = create("article", "rounded-lg border border-gray-200 p-4");
      article.dataset.orp = dim;
      article.appendChild(create("h3", "font-bold text-navy", dim + " — " + item.name));
      article.appendChild(create("p", "mt-1 text-xs text-muted", item.definition));
      article.appendChild(renderCriteriaList(item.criteria));
      var grid = create("div", "mt-4 grid gap-3 sm:grid-cols-2");
      var scoreWrap = create("div");
      var label = create("label", "text-xs font-semibold text-gray-700", "Resolved ORP score");
      label.htmlFor = "fw-orp-score-" + dim;
      scoreWrap.appendChild(label);
      scoreWrap.appendChild(scoreSlider(dim, "fw-orp"));
      grid.appendChild(scoreWrap);
      var unknownWrap = create("div", "rounded border border-gray-200 bg-gray-50 p-3");
      var unknownLabel = create("label", "flex items-start gap-2 text-xs font-semibold text-gray-700");
      var unknown = document.createElement("input");
      unknown.type = "checkbox";
      unknown.id = "fw-orp-unknown-" + dim;
      unknown.dataset.item = dim;
      unknown.className = "fw-orp-unknown mt-0.5";
      unknownLabel.appendChild(unknown);
      unknownLabel.appendChild(document.createTextNode(dim === "Cp" ? "No verified SDG / unknown indicators — assign 1.00 worst-case" : "Unknown / no admissible basis — assign 1.00 worst-case"));
      unknownWrap.appendChild(unknownLabel);
      unknownWrap.appendChild(create("p", "mt-1 text-[11px] text-muted", "Use this conservative default instead of guessing a lower score."));
      grid.appendChild(unknownWrap);
      article.appendChild(grid);
      panel.appendChild(article);
    });
  }

  function selectedScore(prefix, id) {
    if (prefix === "fw-orp" && byId("fw-orp-unknown-" + id).checked) return 1;
    var range = byId(prefix + "-score-" + id);
    if (!range || range.dataset.resolved !== "true") return null;
    return Number(range.value);
  }

  function metricResolved(metric) {
    var id = metric.id;
    if (byId("fw-na-" + id).checked) return true;
    return selectedScore("fw", id) != null;
  }
  function orpResolved(dim) {
    return selectedScore("fw-orp", dim) != null;
  }
  function containmentApplies() { return ARCH_REQUIRES_CONTAINMENT.includes(byId("fw-architecture").value); }
  function bawItems() {
    return BAW_ITEM_IDS.filter(function (item) { return byId("fw-baw-" + item).checked; });
  }
  function bawApplies() { return bawItems().length > 0; }
  function monitorCapValue() {
    var state = byId("fw-cap-monitor").value;
    if (!state) return null;
    if (state === "none") return Number(byId("fw-tier").value) <= 2 ? 0.6 : 0.7;
    return Number(state);
  }
  function threatState() { return THREAT[byId("fw-threat").value] || null; }
  function pcValue() {
    return byId("fw-pc").dataset.resolved === "true" ? Number(byId("fw-pc").value) : null;
  }
  function setupReady() {
    return nonempty("fw-architecture") && nonempty("fw-tier");
  }
  function aciReady() {
    var base = ["fw-independence", "fw-fidelity", "fw-signoff-date", "fw-tdi-band", "fw-threat", "fw-cap-event", "fw-cap-monitor", "fw-cap-evidence"].every(nonempty);
    if (!base || pcValue() == null || daysSince(byId("fw-signoff-date").value) == null) return false;
    if (!byId("fw-baw-confirmed").checked || !threatState() || monitorCapValue() == null) return false;
    if (byId("fw-tdi-band").value === "stable" && monitorCapValue() !== 1) return false;
    if (containmentApplies() && (daysSince(byId("fw-containment-date").value) == null)) return false;
    if (bawApplies() && (!nonempty("fw-cap-behavior") || daysSince(byId("fw-behavior-date").value) == null)) return false;
    return true;
  }
  function axesValid() {
    return ENGINE.AXES.every(function (axis) {
      return submetrics.some(function (metric) { return metric.axis_id === axis && !byId("fw-na-" + metric.id).checked; });
    });
  }

  function assessmentState() {
    var resolvedIvp = submetrics.filter(metricResolved).length;
    var resolvedOrp = Object.keys(ORP).filter(orpResolved).length;
    return {
      scope: setupReady(),
      ivp: submetrics.length === 23 && resolvedIvp === 23,
      orp: resolvedOrp === 4,
      aci: aciReady(),
      axes: submetrics.length === 23 && resolvedIvp === 23 && axesValid(),
      resolvedIvp: resolvedIvp,
      resolvedOrp: resolvedOrp
    };
  }

  function readinessItem(label, complete, detail) {
    var li = create("li", "flex items-start justify-between gap-3");
    var copy = create("span");
    copy.appendChild(create("span", "font-semibold text-gray-700", label));
    if (detail) copy.appendChild(create("span", "block text-muted", detail));
    li.appendChild(copy);
    li.appendChild(create("span", "shrink-0 rounded px-2 py-0.5 font-semibold " + (complete ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-600"), complete ? "Complete" : "Pending"));
    return li;
  }

  function collectInputs() {
    var ivp = {};
    var notApplicable = [];
    ENGINE.AXES.forEach(function (axis) { ivp[axis] = {}; });
    submetrics.forEach(function (metric) {
      var id = metric.id;
      if (byId("fw-na-" + id).checked) {
        notApplicable.push(id);
      } else {
        var score = selectedScore("fw", id);
        ivp[metric.axis_id][id] = score;
      }
    });
    var orp = {};
    Object.keys(ORP).forEach(function (dim) {
      orp[dim] = selectedScore("fw-orp", dim);
    });
    var tdiBand = byId("fw-tdi-band").value;
    var threat = threatState();
    var capEvidence = numeric("fw-cap-evidence");
    if (tdiBand === "critical" && capEvidence != null) capEvidence = Math.min(capEvidence, 0.1);
    var selectedEventCap = numeric("fw-cap-event");
    var caps = {
      C_event: selectedEventCap == null || !threat ? selectedEventCap : Math.min(selectedEventCap, threat.eventCap),
      C_monitor: monitorCapValue(),
      C_evidence: capEvidence
    };
    if (bawApplies()) caps.C_behavior = numeric("fw-cap-behavior");
    var aci = {
      pc: pcValue(),
      independence: numeric("fw-independence"),
      fidelity: numeric("fw-fidelity"),
      dtDays: daysSince(byId("fw-signoff-date").value),
      agentic: containmentApplies(),
      dtCn: containmentApplies() ? daysSince(byId("fw-containment-date").value) : null,
      baw: bawApplies(),
      dtBeh: bawApplies() ? daysSince(byId("fw-behavior-date").value) : null,
      mTdi: TDI[tdiBand],
      mThreat: threat ? threat.multiplier : null,
      caps: caps
    };
    return {
      architecture: byId("fw-architecture").value,
      tier: Number(byId("fw-tier").value),
      pathway: "Full",
      ivp: ivp,
      notApplicable: notApplicable,
      orp: orp,
      aci: aci
    };
  }

  function renderResult(result) {
    lastResult = result;
    byId("fw-results-breakdown").classList.remove("hidden");
    byId("fw-ers").textContent = result.ers.toFixed(1);
    var ring = byId("fw-score-ring");
    ring.setAttribute("stroke-dashoffset", String(440 - 440 * result.ers / 10));
    ring.setAttribute("stroke", scoreColor(result.ers));
    var severity = byId("fw-severity");
    severity.textContent = result.severity;
    severity.className = "mt-4 inline-block rounded-full px-4 py-1.5 text-sm font-bold " + (result.ers >= 7 ? "text-white" : "text-gray-900");
    severity.style.backgroundColor = scoreColor(result.ers);
    byId("fw-result-status").textContent = "Complete — all calculation inputs resolved";
    byId("fw-result-status").className = "status-complete mt-2 text-xs font-semibold";
    byId("fw-qualification").textContent = "Normative result from user-selected criteria; this is not an assessment of record or approval.";
    byId("fw-ivp-result").textContent = result.ivpComposite.toFixed(4);
    byId("fw-worp-result").textContent = result.worpDot.toFixed(4);
    byId("fw-crm-result").textContent = result.crm.toFixed(2) + " / " + result.nElevated;
    byId("fw-orp-effective").textContent = result.orpEffective.toFixed(4);
    byId("fw-aci-vector").textContent = result.pc.toFixed(2) + " / " + result.ec.toFixed(4) + " / " + result.tf.toFixed(4);
    byId("fw-aci-result").textContent = result.aci.toFixed(4) + " / " + result.aciStatus;
    var alert = byId("fw-alert");
    alert.classList.toggle("hidden", !result.compoundRiskAlert);
    alert.textContent = result.compoundRiskAlert ? "Compound Risk Alert: " + result.nElevated + " ORP dimensions exceed 0.75. Architectural decomposition is recommended." : "";
    var axisPanel = byId("fw-axis-results");
    axisPanel.textContent = "";
    ENGINE.AXES.forEach(function (axis) {
      var row = create("div");
      var labels = create("div", "flex justify-between text-xs");
      labels.appendChild(create("span", "text-muted", AXIS_NAMES[axis] + " (MVT " + result.mvtThresholds[axis].toFixed(2) + ")"));
      labels.appendChild(create("span", "font-bold text-navy", result.axes[axis].toFixed(4)));
      row.appendChild(labels);
      var track = create("div", "mt-1 h-1.5 rounded-full bg-gray-200");
      var bar = create("div", "h-1.5 rounded-full bg-navy");
      bar.style.width = (result.axes[axis] * 100) + "%";
      track.appendChild(bar);
      row.appendChild(track);
      axisPanel.appendChild(row);
    });
    var mvt = byId("fw-mvt-result");
    var breachText = Object.keys(result.mvtBreaches).map(function (axis) { return axis + " −" + result.mvtBreaches[axis].toFixed(4); }).join(", ");
    mvt.textContent = "MVT: " + result.mvtSeverity + (breachText ? " — " + breachText : " — all axes meet the tier floor");
    mvt.className = "mt-3 text-xs font-semibold " + (result.mvtSeverity === "PASS" ? "text-emerald-700" : "text-red-700");
    var tfPanel = byId("fw-tf-results");
    tfPanel.textContent = "";
    Object.keys(result.tfTerms).forEach(function (key) {
      var row = create("div", "flex justify-between gap-3");
      row.appendChild(create("dt", key === result.tfBinding ? "font-bold text-red-700" : "text-muted", key + (key === result.tfBinding ? " (binding)" : "")));
      row.appendChild(create("dd", "font-semibold text-navy", result.tfTerms[key].toFixed(4)));
      tfPanel.appendChild(row);
    });
    byId("fw-formula-values").textContent = "ORP effective " + result.orpEffective.toFixed(4) + " × mitigation " + result.mitigation.toFixed(4) + " × assurance inflation " + (1 / result.aci).toFixed(4) + " × 10 = raw " + result.ersRaw.toFixed(4) + (result.capped ? ", capped at 10.0." : ".");
  }

  function clearResult(message) {
    lastResult = null;
    byId("fw-results-breakdown").classList.add("hidden");
    byId("fw-ers").textContent = "—";
    byId("fw-score-ring").setAttribute("stroke-dashoffset", "440");
    byId("fw-score-ring").setAttribute("stroke", "#1F3864");
    byId("fw-severity").textContent = "Not calculated";
    byId("fw-severity").className = "mt-4 inline-block rounded-full bg-gray-200 px-4 py-1.5 text-sm font-bold text-gray-700";
    byId("fw-result-status").textContent = message || "Incomplete — resolve every required input";
    byId("fw-result-status").className = "status-pending mt-2 text-xs font-semibold";
    byId("fw-qualification").textContent = "Planning calculation only; evidence validation and approval occur outside this page.";
  }

  function recalculate() {
    if (submetrics.length !== 23) return;
    var state = assessmentState();
    byId("fw-ivp-count").textContent = state.resolvedIvp + " / 23 resolved";
    byId("fw-orp-count").textContent = state.resolvedOrp + " / 4 resolved";
    var gates = [state.scope, state.ivp, state.orp, state.aci, state.axes];
    var completed = gates.filter(Boolean).length;
    var percent = Math.round(completed / gates.length * 100);
    byId("fw-progress-label").textContent = completed + " of 5 calculation gates complete";
    byId("fw-progress-percent").textContent = percent + "%";
    byId("fw-progress-bar").style.width = percent + "%";
    var progress = byId("fw-progress-bar").parentElement;
    progress.setAttribute("aria-valuenow", String(percent));
    var readiness = byId("fw-readiness");
    readiness.textContent = "";
    readiness.appendChild(readinessItem("Profile selected", state.scope, "Architecture and deployment tier"));
    readiness.appendChild(readinessItem("IVP scores resolved", state.ivp, state.resolvedIvp + " of 23 sub-metrics"));
    readiness.appendChild(readinessItem("ORP scores resolved", state.orp, state.resolvedOrp + " of 4 dimensions"));
    readiness.appendChild(readinessItem("ACI inputs resolved", state.aci, "Pc, Ec multipliers, dates, BAW checklist, drift/threat state, monitoring, and caps"));
    readiness.appendChild(readinessItem("Every axis remains applicable", state.axes, "N/A exclusions cannot remove an entire IVP axis"));
    if (!gates.every(Boolean)) {
      clearResult("Incomplete — " + completed + " of 5 calculation gates complete");
      return;
    }
    try {
      var inputs = collectInputs();
      renderResult(ENGINE.compute(inputs));
    } catch (error) {
      clearResult("Complete inputs, but calculation is invalid: " + error.message);
    }
  }

  function updateVisibility(target) {
    if (target.classList.contains("fw-score-range")) {
      var scorePrefix = target.id.indexOf("fw-orp-") === 0 ? "fw-orp" : "fw";
      var status = byId(scorePrefix + "-value-" + target.dataset.item);
      var resolved = target.dataset.resolved === "true";
      status.textContent = resolved ? Number(target.value).toFixed(2) : "Unresolved — move slider";
      target.setAttribute("aria-valuetext", resolved ? Number(target.value).toFixed(2) : "Unresolved; move the slider to select a score");
      status.className = "rounded px-2 py-1 text-xs font-bold " + (resolved ? "bg-navy/10 text-navy" : "bg-gray-100 text-gray-600");
      target.classList.toggle("opacity-40", !resolved);
      var clear = target.parentElement.querySelector(".fw-clear-score");
      if (clear) clear.classList.toggle("hidden", !resolved);
    }
    if (target.classList.contains("fw-na")) {
      var id = target.dataset.item;
      byId("fw-score-" + id).disabled = target.checked;
      byId("fw-score-" + id).parentElement.classList.toggle("opacity-50", target.checked);
    }
    if (target.classList.contains("fw-orp-unknown")) {
      var dimension = target.dataset.item;
      byId("fw-orp-score-" + dimension).disabled = target.checked;
      byId("fw-orp-score-" + dimension).parentElement.classList.toggle("opacity-50", target.checked);
    }
  }
  function updateArchitectureFields() {
    byId("fw-containment-date-wrap").classList.toggle("hidden", !containmentApplies());
  }
  function updateBawFields() {
    var applies = bawApplies();
    byId("fw-behavior-date-wrap").classList.toggle("hidden", !applies);
    byId("fw-cap-behavior-wrap").classList.toggle("hidden", !applies);
  }

  function resetAssessment(force) {
    if (!force && !window.confirm("Clear every selection in this framework calculation?")) return;
    var fields = byId("framework-view").querySelectorAll("input, select");
    fields.forEach(function (field) {
      if (field.type === "checkbox") field.checked = false;
      else if (field.type === "range") {
        field.value = "0.5";
        field.dataset.resolved = "false";
      }
      else field.value = "";
    });
    byId("framework-view").querySelectorAll(".fw-score-range, .fw-na, .fw-orp-unknown").forEach(updateVisibility);
    byId("fw-pc-value").textContent = "Unresolved";
    byId("fw-pc-value").className = "rounded bg-gray-100 px-2 py-1 text-xs font-bold text-gray-600";
    byId("fw-pc").classList.add("opacity-40");
    byId("fw-pc").setAttribute("aria-valuetext", "Unresolved; move the slider to select a score");
    byId("fw-pc-clear").classList.add("hidden");
    updateArchitectureFields();
    updateBawFields();
    recalculate();
  }

  function attachEvents() {
    byId("mode-framework").addEventListener("click", function () { setPageMode("framework"); });
    byId("mode-quick").addEventListener("click", function () { setPageMode("quick"); });
    byId("mode-detailed").addEventListener("click", function () { setPageMode("detailed"); });
    window.addEventListener("aitbm:quick-to-detailed", function () { setPageMode("detailed"); });
    byId("framework-view").addEventListener("input", function (event) {
      if (event.target.classList.contains("fw-score-range")) event.target.dataset.resolved = "true";
      if (event.target.id === "fw-pc") {
        event.target.dataset.resolved = "true";
        byId("fw-pc-value").textContent = Number(event.target.value).toFixed(2);
        byId("fw-pc-value").className = "rounded bg-navy/10 px-2 py-1 text-xs font-bold text-navy";
        event.target.classList.remove("opacity-40");
        event.target.setAttribute("aria-valuetext", Number(event.target.value).toFixed(2));
        byId("fw-pc-clear").classList.remove("hidden");
      }
      updateVisibility(event.target);
      recalculate();
    });
    byId("framework-view").addEventListener("change", function (event) {
      updateVisibility(event.target);
      if (event.target.id === "fw-architecture") updateArchitectureFields();
      if (event.target.classList.contains("fw-baw-item")) updateBawFields();
      recalculate();
    });
    byId("framework-view").addEventListener("click", function (event) {
      if (!event.target.classList.contains("fw-clear-score")) return;
      var range = byId(event.target.dataset.target);
      range.dataset.resolved = "false";
      range.value = "0.5";
      updateVisibility(range);
      recalculate();
    });
    byId("fw-pc-clear").addEventListener("click", function () {
      byId("fw-pc").dataset.resolved = "false";
      byId("fw-pc").value = "0.5";
      byId("fw-pc-value").textContent = "Unresolved";
      byId("fw-pc-value").className = "rounded bg-gray-100 px-2 py-1 text-xs font-bold text-gray-600";
      byId("fw-pc").classList.add("opacity-40");
      byId("fw-pc").setAttribute("aria-valuetext", "Unresolved; move the slider to select a score");
      this.classList.add("hidden");
      recalculate();
    });
    byId("fw-reset").addEventListener("click", function () { resetAssessment(false); });
  }

  function init() {
    renderOrp();
    attachEvents();
    updateArchitectureFields();
    updateBawFields();
    fetch("assets/data/submetrics.json")
      .then(function (response) { if (!response.ok) throw new Error("HTTP " + response.status); return response.json(); })
      .then(function (data) {
        if (!data || !Array.isArray(data.submetrics) || data.submetrics.length !== 23) throw new Error("canonical rubric inventory is not 23 sub-metrics");
        submetrics = data.submetrics;
        renderIvp();
        recalculate();
      })
      .catch(function (error) {
        var notice = byId("fw-load-error");
        notice.textContent = "The canonical rubric data could not be loaded. Framework scoring is disabled: " + error.message;
        notice.classList.remove("hidden");
        byId("fw-ivp-panel").textContent = "";
      });
  }

  init();
})();
