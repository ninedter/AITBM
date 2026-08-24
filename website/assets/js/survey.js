/* AITBM Quick Yes/No survey — scenario-targeted questions driving the shared ERS engine. */
(function () {
  "use strict";
  var ENG = window.AITBM_ERS;
  var SURVEY = window.AITBM_SURVEY;
  if (!ENG || !SURVEY) return;

  var panel = document.getElementById("survey-panel");
  var archSelect = document.getElementById("survey-arch");
  if (!panel || !archSelect) return;

  var currentArch = SURVEY.archOrder[0];
  var answers = {}; // qid -> true (Yes), false (No), or null (unanswered)
  var lastResult = null;

  function survey() { return SURVEY.surveys[currentArch]; }

  SURVEY.archOrder.forEach(function (arch) {
    var opt = document.createElement("option");
    opt.value = arch;
    opt.textContent = SURVEY.surveys[arch].label;
    archSelect.appendChild(opt);
  });
  archSelect.value = currentArch;
  archSelect.addEventListener("change", function () {
    currentArch = archSelect.value;
    loadScenario();
  });

  function loadScenario() {
    answers = {};
    survey().questions.forEach(function (q) { answers[q.id] = null; });
    panel.innerHTML = "";

    survey().sections.forEach(function (sec) {
      var block = document.createElement("section");
      block.className = "rounded-xl border border-gray-200 overflow-hidden";
      block.setAttribute("aria-labelledby", "quick-section-" + sec.id);
      block.innerHTML =
        '<div class="px-5 py-3 bg-gray-50 border-b border-gray-200">' +
          '<h2 id="quick-section-' + sec.id + '" class="font-bold text-navy text-sm">' + sec.title + '</h2>' +
          '<p class="text-xs text-muted mt-0.5">' + sec.blurb + '</p>' +
        '</div>';
      var list = document.createElement("div");
      list.className = "divide-y divide-gray-100";
      survey().questions.filter(function (q) { return q.section === sec.id; }).forEach(function (q) {
        var row = document.createElement("div");
        row.className = "quick-question flex items-start gap-3 px-5 py-3";
        row.setAttribute("data-question-row", q.id);
        row.innerHTML =
          '<p id="quick-label-' + q.id + '" class="text-sm text-gray-700 flex-1">' + q.text + '</p>' +
          '<div class="shrink-0 inline-flex rounded-lg border border-gray-300 overflow-hidden" role="group" aria-labelledby="quick-label-' + q.id + '" data-q="' + q.id + '">' +
            '<button type="button" data-val="yes" aria-pressed="false" class="answer-button px-3 py-1.5 text-xs font-semibold text-gray-600">Yes</button>' +
            '<button type="button" data-val="no" aria-pressed="false" class="answer-button px-3 py-1.5 text-xs font-semibold text-gray-600">No</button>' +
          '</div>';
        list.appendChild(row);
      });
      block.appendChild(list);
      panel.appendChild(block);
    });

    applyDependencies();
    recalc();
  }

  panel.addEventListener("click", function (e) {
    var btn = e.target.closest("button[data-val]");
    if (!btn || btn.disabled) return;
    var group = btn.parentElement;
    var qid = group.getAttribute("data-q");
    answers[qid] = btn.getAttribute("data-val") === "yes";
    paintGroup(group, answers[qid]);
    applyDependencies();
    recalc();
  });

  function paintGroup(group, value) {
    var yesBtn = group.querySelector('button[data-val="yes"]');
    var noBtn = group.querySelector('button[data-val="no"]');
    yesBtn.className = "answer-button px-3 py-1.5 text-xs font-semibold" + (value === true ? " bg-navy text-white" : " text-gray-600");
    noBtn.className = "answer-button px-3 py-1.5 text-xs font-semibold" + (value === false ? " bg-navy text-white" : " text-gray-600");
    yesBtn.setAttribute("aria-pressed", value === true ? "true" : "false");
    noBtn.setAttribute("aria-pressed", value === false ? "true" : "false");
  }

  function isLocked(q) {
    return !!q.depends_on && answers[q.depends_on] !== true;
  }

  function applyDependencies() {
    survey().questions.forEach(function (q) {
      if (!q.depends_on) return;
      var group = panel.querySelector('[data-q="' + q.id + '"]');
      var row = panel.querySelector('[data-question-row="' + q.id + '"]');
      if (!group || !row) return;
      var locked = isLocked(q);
      row.classList.toggle("question-locked", locked);
      group.querySelectorAll("button").forEach(function (button) { button.disabled = locked; });
      if (locked && answers[q.id] !== null) {
        answers[q.id] = null;
        paintGroup(group, null);
      }
    });
  }

  function buildInputs(ans) {
    var orp = {}, aci = {}, controlIds = [];
    survey().questions.forEach(function (q) {
      var a = ans[q.id];
      if (q.kind === "orp") orp[q.dim] = a === true ? q.yes : q.no;
      else if (q.kind === "safeguard") {
        if (a === true) controlIds = controlIds.concat(q.controls);
      } else if (q.kind === "aci") {
        if (q.depends_on && ans[q.depends_on] !== true) aci[q.dim] = q.depends_low;
        else aci[q.dim] = a === true ? q.yes : q.no;
      }
    });
    return { arch: currentArch, controlIds: controlIds, orp: orp, aci: aci };
  }

  function completion() {
    var applicable = survey().questions.filter(function (q) { return !isLocked(q); });
    var answered = applicable.filter(function (q) { return answers[q.id] !== null; }).length;
    var contextComplete = survey().questions.filter(function (q) { return q.kind === "orp"; })
      .every(function (q) { return answers[q.id] !== null; });
    return {
      answered: answered,
      total: applicable.length,
      percent: applicable.length ? Math.round(answered / applicable.length * 100) : 0,
      contextComplete: contextComplete,
      complete: answered === applicable.length
    };
  }

  function renderProgress(state) {
    document.getElementById("q-progress-label").textContent = state.answered + " of " + state.total + " applicable questions answered";
    document.getElementById("q-progress-percent").textContent = state.percent + "%";
    document.getElementById("q-progress-bar").style.width = state.percent + "%";
    var progress = document.querySelector('[role="progressbar"][aria-label="Quick assessment progress"]');
    if (progress) progress.setAttribute("aria-valuenow", String(state.percent));
  }

  function clearResult() {
    lastResult = null;
    document.getElementById("q-result-status").textContent = "Answer the four context questions to calculate";
    document.getElementById("q-result-status").className = "status-pending mt-2 text-xs font-semibold";
    document.getElementById("q-ers-value").textContent = "—";
    document.getElementById("q-score-ring").setAttribute("stroke-dashoffset", "440");
    var badge = document.getElementById("q-severity-badge");
    badge.textContent = "Not calculated";
    badge.className = "severity-badge mt-4 inline-block rounded-full px-4 py-1.5 text-sm font-bold bg-gray-200 text-gray-700";
    document.getElementById("q-tier-label").textContent = "No result yet";
    document.getElementById("q-interpretation").textContent = "Complete the four “About your system” questions first. The remaining answers refine the result and recommendations.";
    document.getElementById("q-fixes").classList.add("hidden");
    document.getElementById("q-fixes-empty").classList.add("hidden");
    document.getElementById("q-fixes-pending").classList.remove("hidden");
    document.getElementById("q-download").disabled = true;
    document.getElementById("q-print").disabled = true;
  }

  function recalc() {
    var state = completion();
    renderProgress(state);
    if (!state.contextComplete) {
      clearResult();
      return;
    }

    var inp = buildInputs(answers);
    var res = ENG.computeERS(inp);
    var ers = res.ers;
    var sev = ENG.severity(ers);
    lastResult = { inputs: inp, result: res, completion: state };

    var status = document.getElementById("q-result-status");
    status.textContent = state.complete ? "Quick result complete" : "Provisional — " + state.answered + " of " + state.total + " applicable answers";
    status.className = (state.complete ? "status-complete" : "status-pending") + " mt-2 text-xs font-semibold";
    document.getElementById("q-ers-value").textContent = ers.toFixed(1);
    var ring = document.getElementById("q-score-ring");
    ring.setAttribute("stroke-dashoffset", String(440 - 440 * (ers / 10)));
    ring.setAttribute("stroke", ENG.severityColor(ers));

    var badge = document.getElementById("q-severity-badge");
    badge.textContent = sev.label;
    badge.className = "severity-badge mt-4 inline-block rounded-full px-4 py-1.5 text-sm font-bold " + sev.bg + " " + sev.text;
    document.getElementById("q-tier-label").textContent = sev.tier;
    document.getElementById("q-arch").textContent = survey().label;
    document.getElementById("q-ivp-val").textContent = res.ivp.toFixed(2);
    document.getElementById("q-ivp-bar").style.width = (res.ivp * 100) + "%";
    document.getElementById("q-crm-val").textContent = res.crm.toFixed(2);
    document.getElementById("q-crm-bar").style.width = Math.max(0, Math.min(100, (res.crm - 0.75) * 100)) + "%";
    document.getElementById("q-aci-val").textContent = res.aci.toFixed(2);
    document.getElementById("q-aci-bar").style.width = (res.aci * 100) + "%";

    renderInterpretation(ers, sev, state);
    renderFixes(ers);
    document.getElementById("q-download").disabled = false;
    document.getElementById("q-print").disabled = false;
  }

  var DRIVER_PHRASES = {
    aa: "it can act on its own without human approval",
    as: "it is exposed to untrusted or public input",
    cp: "a failure could cause serious harm",
    rf: "problems would be slow or hard to fix"
  };

  function renderInterpretation(ers, sev, state) {
    var drivers = survey().questions.filter(function (q) {
      return q.kind === "orp" && answers[q.id] === true;
    }).map(function (q) { return DRIVER_PHRASES[q.dim]; });
    var missing = survey().questions.filter(function (q) {
      return (q.kind === "safeguard" || q.kind === "aci") && !isLocked(q) && answers[q.id] !== true;
    }).length;
    var qualification = state.complete ? "complete self-attested" : "provisional";
    var text = "This is a <strong>" + qualification + " " + sev.label.toLowerCase() + "</strong> " + survey().label +
      " estimate (ERS " + ers.toFixed(1) + " / 10). ";
    text += drivers.length ? "The main risk drivers are " + joinList(drivers) + ". " : "Its reported deployment context is relatively contained. ";
    if (missing > 0) text += missing + (missing === 1 ? " safeguard or assurance answer does" : " safeguard or assurance answers do") + " not currently earn credit.";
    else text += "All applicable safeguards and assurance items were reported in place; the residual-risk floor still applies.";
    document.getElementById("q-interpretation").innerHTML = text;
  }

  function joinList(items) {
    if (items.length === 1) return items[0];
    if (items.length === 2) return items[0] + " and " + items[1];
    return items.slice(0, -1).join(", ") + ", and " + items[items.length - 1];
  }

  function renderFixes(ers) {
    var ol = document.getElementById("q-fixes");
    var empty = document.getElementById("q-fixes-empty");
    document.getElementById("q-fixes-pending").classList.add("hidden");
    ol.innerHTML = "";
    var candidates = survey().questions.filter(function (q) {
      return (q.kind === "safeguard" || q.kind === "aci") && answers[q.id] !== true && !isLocked(q);
    });
    var scored = candidates.map(function (q) {
      var trial = {};
      Object.keys(answers).forEach(function (key) { trial[key] = answers[key]; });
      trial[q.id] = true;
      return { q: q, delta: ers - ENG.computeERS(buildInputs(trial)).ers };
    }).filter(function (item) { return item.delta > 0.05; });
    scored.sort(function (a, b) { return b.delta - a.delta; });
    var top = scored.slice(0, 3);
    if (!top.length) {
      empty.classList.remove("hidden");
      ol.classList.add("hidden");
      return;
    }
    empty.classList.add("hidden");
    ol.classList.remove("hidden");
    top.forEach(function (item) {
      var li = document.createElement("li");
      li.innerHTML = item.q.fix + ' <span class="text-muted whitespace-nowrap">(&minus;' + item.delta.toFixed(1) + " pts)</span>";
      ol.appendChild(li);
    });
  }

  function downloadJson(filename, payload) {
    var blob = new Blob([JSON.stringify(payload, null, 2) + "\n"], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  var quickView = document.getElementById("quick-view");
  var detailedView = document.getElementById("detailed-view");
  var btnQuick = document.getElementById("mode-quick");
  var btnDetailed = document.getElementById("mode-detailed");
  function setMode(quick) {
    quickView.classList.toggle("hidden", !quick);
    detailedView.classList.toggle("hidden", quick);
    btnQuick.className = "rounded-md px-3 py-1.5 text-sm font-semibold" + (quick ? " bg-navy text-white" : " text-gray-600");
    btnDetailed.className = "rounded-md px-3 py-1.5 text-sm font-semibold" + (!quick ? " bg-navy text-white" : " text-gray-600");
    btnQuick.setAttribute("aria-selected", quick ? "true" : "false");
    btnDetailed.setAttribute("aria-selected", quick ? "false" : "true");
  }
  btnQuick.addEventListener("click", function () { setMode(true); });
  btnDetailed.addEventListener("click", function () { setMode(false); });

  document.getElementById("q-reset").addEventListener("click", loadScenario);
  document.getElementById("q-open-detailed").addEventListener("click", function () {
    var detail = lastResult ? {
      hasContext: true,
      arch: lastResult.inputs.arch,
      orp: lastResult.inputs.orp,
      aci: lastResult.inputs.aci
    } : { hasContext: false, arch: currentArch, orp: null, aci: null };
    setMode(false);
    window.dispatchEvent(new CustomEvent("aitbm:quick-to-detailed", { detail: detail }));
    document.getElementById("detailed-view").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  document.getElementById("q-download").addEventListener("click", function () {
    if (!lastResult) return;
    downloadJson("aitbm-quick-result.json", {
      schema: "aitbm-one-shot-result",
      mode: "quick",
      qualification: lastResult.completion.complete ? "complete-self-attested-estimate" : "provisional-self-attested-estimate",
      generatedAt: new Date().toISOString(),
      scenario: survey().label,
      answers: answers,
      inputs: lastResult.inputs,
      outputs: lastResult.result,
      disclaimer: "Simplified one-shot estimate; not an assessment of record."
    });
  });
  document.getElementById("q-print").addEventListener("click", function () { if (lastResult) window.print(); });

  var breakdownToggle = document.getElementById("q-breakdown-toggle");
  var breakdown = document.getElementById("q-breakdown");
  breakdownToggle.setAttribute("aria-expanded", "false");
  breakdownToggle.addEventListener("click", function () {
    var opening = breakdown.classList.contains("hidden");
    breakdown.classList.toggle("hidden");
    breakdownToggle.setAttribute("aria-expanded", opening ? "true" : "false");
    breakdownToggle.querySelector("span").textContent = opening ? "Hide the score breakdown" : "Show the score breakdown";
  });

  window.AITBM_QUICK = { setMode: setMode };
  loadScenario();
})();
