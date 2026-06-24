/* AITBM Quick Yes/No survey — renders questions and drives the shared ERS engine. */
(function () {
  "use strict";
  var ENG = window.AITBM_ERS;
  var SURVEY = window.AITBM_SURVEY;
  if (!ENG || !SURVEY) return;

  var panel = document.getElementById("survey-panel");
  if (!panel) return;

  var answers = {};           // qid -> true(Yes)/false(No)
  SURVEY.questions.forEach(function (q) { answers[q.id] = false; });

  /* ---- Render questions grouped by section ---- */
  SURVEY.sections.forEach(function (sec) {
    var block = document.createElement("div");
    block.className = "rounded-xl border border-gray-200 overflow-hidden";
    block.innerHTML =
      '<div class="px-5 py-3 bg-gray-50 border-b border-gray-200">' +
        '<h2 class="font-bold text-navy text-sm">' + sec.title + '</h2>' +
        '<p class="text-xs text-muted mt-0.5">' + sec.blurb + '</p>' +
      '</div>';
    var list = document.createElement("div");
    list.className = "divide-y divide-gray-100";
    SURVEY.questions.filter(function (q) { return q.section === sec.id; }).forEach(function (q) {
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

  /* Disable q18 when its dependency (q17) is No */
  function applyDependencies() {
    SURVEY.questions.forEach(function (q) {
      if (!q.depends_on) return;
      var group = panel.querySelector('[data-q="' + q.id + '"]');
      if (!group) return;
      var locked = !answers[q.depends_on];
      group.style.opacity = locked ? "0.4" : "";
      group.style.pointerEvents = locked ? "none" : "";
      if (locked && answers[q.id]) { answers[q.id] = false; paintGroup(group, false); }
    });
  }

  /* ---- Build engine inputs from answers ---- */
  function buildInputs(ans) {
    var arch = ans.q1 ? "agentic" : (ans.q2 ? "rag" : "standalone");
    var orp = {}, aci = {}, controlIds = [];
    SURVEY.questions.forEach(function (q) {
      var a = !!ans[q.id];
      if (q.kind === "orp") orp[q.dim] = a ? q.yes : q.no;
      else if (q.kind === "safeguard") { if (a) controlIds = controlIds.concat(q.controls); }
      else if (q.kind === "aci") {
        if (q.depends_on && !ans[q.depends_on]) aci[q.dim] = q.depends_low;
        else aci[q.dim] = a ? q.yes : q.no;
      }
    });
    return { arch: arch, controlIds: controlIds, orp: orp, aci: aci };
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

    document.getElementById("q-arch").textContent = inp.arch;
    document.getElementById("q-ivp-val").textContent = res.ivp.toFixed(2);
    document.getElementById("q-ivp-bar").style.width = (res.ivp * 100) + "%";
    document.getElementById("q-crm-val").textContent = res.crm.toFixed(2);
    document.getElementById("q-crm-bar").style.width = ((res.crm - 0.75) / 1.0 * 100) + "%";
    document.getElementById("q-aci-val").textContent = res.aci.toFixed(2);
    document.getElementById("q-aci-bar").style.width = (res.aci * 100) + "%";

    renderInterpretation(ers, sev, inp);
    renderFixes(ers, inp);
  }

  /* ---- Plain-English interpretation ---- */
  var DRIVER_PHRASES = { q3: "it can act on its own without human approval", q4: "it's exposed to untrusted or public input", q5: "a failure could cause serious harm", q6: "problems would be slow or hard to fix" };

  function renderInterpretation(ers, sev, inp) {
    var el = document.getElementById("q-interpretation");
    var drivers = ["q3", "q4", "q5", "q6"].filter(function (id) { return answers[id]; }).map(function (id) { return DRIVER_PHRASES[id]; });

    var missing = SURVEY.questions.filter(function (q) {
      return (q.kind === "safeguard" || q.kind === "aci") && !answers[q.id] && !(q.depends_on && !answers[q.depends_on]);
    }).length;

    var s = "This looks like a <strong>" + sev.label.toLowerCase() + "</strong> deployment (ERS " + ers.toFixed(1) + " / 10). ";
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

  /* ---- Top-3 fixes ---- */
  function renderFixes(ers, inp) {
    var ol = document.getElementById("q-fixes");
    var empty = document.getElementById("q-fixes-empty");
    ol.innerHTML = "";

    var candidates = SURVEY.questions.filter(function (q) {
      if (q.kind !== "safeguard" && q.kind !== "aci") return false;
      if (answers[q.id]) return false;                                  // already in place
      if (q.depends_on && !answers[q.depends_on]) return q.id !== "q18";// q18 only meaningful if q17 Yes
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

  /* ---- Mode toggle ---- */
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

  applyDependencies();
  recalc();
})();
