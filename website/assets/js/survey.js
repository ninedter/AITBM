/* AITBM Quick Yes/No survey — scenario-targeted questions driving the shared ERS engine. */
(function () {
  "use strict";
  var ENG = window.AITBM_ERS;
  var SURVEY = window.AITBM_SURVEY;
  if (!ENG || !SURVEY) return;

  var panel = document.getElementById("survey-panel");
  var archSelect = document.getElementById("survey-arch");
  if (!panel || !archSelect) return;

  var currentArch = SURVEY.archOrder[0];   // default: agentic
  var answers = {};                        // qid -> true(Yes)/false(No), reset per scenario

  function survey() { return SURVEY.surveys[currentArch]; }

  /* ---- Populate the scenario dropdown ---- */
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

  /* ---- (Re)render the current scenario's questions ---- */
  function loadScenario() {
    answers = {};
    survey().questions.forEach(function (q) { answers[q.id] = false; });
    panel.innerHTML = "";

    survey().sections.forEach(function (sec) {
      var block = document.createElement("div");
      block.className = "rounded-xl border border-gray-200 overflow-hidden";
      block.innerHTML =
        '<div class="px-5 py-3 bg-gray-50 border-b border-gray-200">' +
          '<h2 class="font-bold text-navy text-sm">' + sec.title + '</h2>' +
          '<p class="text-xs text-muted mt-0.5">' + sec.blurb + '</p>' +
        '</div>';
      var list = document.createElement("div");
      list.className = "divide-y divide-gray-100";
      survey().questions.filter(function (q) { return q.section === sec.id; }).forEach(function (q) {
        var row = document.createElement("div");
        row.className = "flex items-start gap-3 px-5 py-3";
        row.innerHTML =
          '<p class="text-sm text-gray-700 flex-1">' + q.text + '</p>' +
          '<div class="shrink-0 inline-flex rounded-lg border border-gray-300 overflow-hidden" role="group" data-q="' + q.id + '">' +
            '<button type="button" data-val="yes" class="px-3 py-1.5 text-xs font-semibold text-gray-600">Yes</button>' +
            '<button type="button" data-val="no"  class="px-3 py-1.5 text-xs font-semibold bg-navy text-white">No</button>' +
          '</div>';
        list.appendChild(row);
      });
      block.appendChild(list);
      panel.appendChild(block);
    });

    applyDependencies();
    recalc();
  }

  /* ---- Answer button handling ---- */
  panel.addEventListener("click", function (e) {
    var btn = e.target.closest("button[data-val]");
    if (!btn) return;
    var group = btn.parentElement;
    var qid = group.getAttribute("data-q");
    answers[qid] = btn.getAttribute("data-val") === "yes";
    paintGroup(group, answers[qid]);
    applyDependencies();
    recalc();
  });

  function paintGroup(group, isYes) {
    var yesBtn = group.querySelector('button[data-val="yes"]');
    var noBtn = group.querySelector('button[data-val="no"]');
    yesBtn.className = "px-3 py-1.5 text-xs font-semibold" + (isYes ? " bg-navy text-white" : " text-gray-600");
    noBtn.className = "px-3 py-1.5 text-xs font-semibold" + (!isYes ? " bg-navy text-white" : " text-gray-600");
  }

  /* Disable a question whose dependency (e.g. "recent testing" needs "tested") is No */
  function applyDependencies() {
    survey().questions.forEach(function (q) {
      if (!q.depends_on) return;
      var group = panel.querySelector('[data-q="' + q.id + '"]');
      if (!group) return;
      var locked = !answers[q.depends_on];
      group.style.opacity = locked ? "0.4" : "";
      group.style.pointerEvents = locked ? "none" : "";
      if (locked && answers[q.id]) { answers[q.id] = false; paintGroup(group, false); }
    });
  }

  /* ---- Build engine inputs from answers (architecture = current scenario) ---- */
  function buildInputs(ans) {
    var orp = {}, aci = {}, controlIds = [];
    survey().questions.forEach(function (q) {
      var a = !!ans[q.id];
      if (q.kind === "orp") orp[q.dim] = a ? q.yes : q.no;
      else if (q.kind === "safeguard") { if (a) controlIds = controlIds.concat(q.controls); }
      else if (q.kind === "aci") {
        if (q.depends_on && !ans[q.depends_on]) aci[q.dim] = q.depends_low;
        else aci[q.dim] = a ? q.yes : q.no;
      }
    });
    return { arch: currentArch, controlIds: controlIds, orp: orp, aci: aci };
  }

  /* ---- Recalculate and paint the result ---- */
  function recalc() {
    var inp = buildInputs(answers);
    var res = ENG.computeERS(inp);
    var ers = res.ers;
    var sev = ENG.severity(ers);

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
    document.getElementById("q-crm-bar").style.width = ((res.crm - 0.75) / 1.0 * 100) + "%";
    document.getElementById("q-aci-val").textContent = res.aci.toFixed(2);
    document.getElementById("q-aci-bar").style.width = (res.aci * 100) + "%";

    renderInterpretation(ers, sev);
    renderFixes(ers);
  }

  /* ---- Plain-English interpretation ---- */
  var DRIVER_PHRASES = {
    aa: "it can act on its own without human approval",
    as: "it's exposed to untrusted or public input",
    cp: "a failure could cause serious harm",
    rf: "problems would be slow or hard to fix"
  };

  function renderInterpretation(ers, sev) {
    var el = document.getElementById("q-interpretation");
    var drivers = survey().questions.filter(function (q) {
      return q.kind === "orp" && answers[q.id];
    }).map(function (q) { return DRIVER_PHRASES[q.dim]; });

    var missing = survey().questions.filter(function (q) {
      return (q.kind === "safeguard" || q.kind === "aci") && !answers[q.id] && !(q.depends_on && !answers[q.depends_on]);
    }).length;

    var s = "This looks like a <strong>" + sev.label.toLowerCase() + "</strong> " + survey().label +
            " deployment (ERS " + ers.toFixed(1) + " / 10). ";
    if (drivers.length) {
      s += "The main risk drivers are " + joinList(drivers) + ". ";
    } else {
      s += "Its deployment context is relatively contained. ";
    }
    if (missing > 0) {
      s += missing + (missing === 1 ? " safeguard or piece of evidence is" : " safeguards or pieces of evidence are") + " not yet in place — see the suggestions below.";
    } else {
      s += "You've reported strong safeguards and assurance; the remaining score is the framework's residual-risk floor (risk is never scored to zero).";
    }
    el.innerHTML = s;
  }

  function joinList(items) {
    if (items.length === 1) return items[0];
    if (items.length === 2) return items[0] + " and " + items[1];
    return items.slice(0, -1).join(", ") + ", and " + items[items.length - 1];
  }

  /* ---- Top-3 fixes (scenario-aware, ranked by actual ERS reduction) ---- */
  function renderFixes(ers) {
    var ol = document.getElementById("q-fixes");
    var empty = document.getElementById("q-fixes-empty");
    ol.innerHTML = "";

    var candidates = survey().questions.filter(function (q) {
      if (q.kind !== "safeguard" && q.kind !== "aci") return false;
      if (answers[q.id]) return false;                                  // already in place
      if (q.depends_on && !answers[q.depends_on]) return false;         // dependency unmet — not actionable yet
      return true;
    });

    var scored = candidates.map(function (q) {
      var trial = {};
      Object.keys(answers).forEach(function (k) { trial[k] = answers[k]; });
      trial[q.id] = true;
      var delta = ers - ENG.computeERS(buildInputs(trial)).ers;
      return { q: q, delta: delta };
    }).filter(function (x) { return x.delta > 0.05; });

    scored.sort(function (a, b) { return b.delta - a.delta; });
    var top = scored.slice(0, 3);

    if (!top.length) { empty.classList.remove("hidden"); ol.classList.add("hidden"); return; }
    empty.classList.add("hidden"); ol.classList.remove("hidden");
    top.forEach(function (x) {
      var li = document.createElement("li");
      li.innerHTML = x.q.fix + ' <span class="text-muted whitespace-nowrap">(&minus;' + x.delta.toFixed(1) + " pts)</span>";
      ol.appendChild(li);
    });
  }

  /* ---- Mode toggle (Quick / Detailed) ---- */
  var quickView = document.getElementById("quick-view");
  var detailedView = document.getElementById("detailed-view");
  var btnQuick = document.getElementById("mode-quick");
  var btnDetailed = document.getElementById("mode-detailed");
  function setMode(quick) {
    quickView.classList.toggle("hidden", !quick);
    detailedView.classList.toggle("hidden", quick);
    btnQuick.className = "rounded-md px-3 py-1.5 text-sm font-semibold" + (quick ? " bg-navy text-white" : " text-gray-600");
    btnDetailed.className = "rounded-md px-3 py-1.5 text-sm font-semibold" + (!quick ? " bg-navy text-white" : " text-gray-600");
  }
  if (btnQuick && btnDetailed) {
    btnQuick.addEventListener("click", function () { setMode(true); });
    btnDetailed.addEventListener("click", function () { setMode(false); });
  }

  /* ---- Breakdown toggle ---- */
  var bkToggle = document.getElementById("q-breakdown-toggle");
  var bk = document.getElementById("q-breakdown");
  if (bkToggle && bk) bkToggle.addEventListener("click", function () { bk.classList.toggle("hidden"); });

  loadScenario();
})();
