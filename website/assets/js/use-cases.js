// AITBM use-cases page — discovery search, category navigation, and deep links.
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var dataNode = document.getElementById("use-case-search-data");
    var data = { cases: [], notScored: [], submetrics: [] };
    if (dataNode) {
      try { data = JSON.parse(dataNode.textContent); } catch (error) {
        console.error("Use-case search data could not be loaded", error);
      }
    }

    var directory = document.querySelector("[data-directory]");
    var rows = directory ? Array.prototype.slice.call(directory.querySelectorAll("[data-case-row]")) : [];
    var casesBySlug = Object.create(null);
    var rowsBySlug = Object.create(null);
    data.cases.forEach(function (item) {
      item.searchText = normalize([
        item.title, item.architecture, item.summary, item.finding,
        (item.tags || []).join(" "),
        (item.techniques || []).map(function (technique) {
          return [technique.id, technique.name, (technique.submetrics || []).join(" ")].join(" ");
        }).join(" ")
      ].join(" "));
      casesBySlug[item.slug] = item;
    });
    rows.forEach(function (row) { rowsBySlug[row.dataset.slug] = row; });

    var state = {
      query: "",
      filter: "",
      filterLabel: "",
      sort: "ers-desc",
      page: 1,
      pageSize: 10,
      view: "list"
    };

    wireMvtTooltip();
    moveMethodAfterDirectory();
    wireMethodDisclosure();
    wireSearch(data, state, casesBySlug, rows, directory);
    wireBrowse(state, rows, directory);
    wireDirectory(state, rows, directory);
    wireDeepLinks();
    wireSectionNavigation();
    updateDirectory(state, rows, directory);
  });

  function wireMvtTooltip() {
    var tooltip = document.getElementById("mvt-tooltip");
    var triggers = Array.prototype.slice.call(document.querySelectorAll("[data-mvt-info]"));
    var active = null;
    if (!tooltip || !triggers.length) return;

    function position(trigger) {
      tooltip.hidden = false;
      tooltip.style.left = "0px";
      tooltip.style.top = "0px";
      var triggerRect = trigger.getBoundingClientRect();
      var tooltipRect = tooltip.getBoundingClientRect();
      var left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
      left = Math.max(12, Math.min(left, window.innerWidth - tooltipRect.width - 12));
      var top = triggerRect.bottom + 8;
      if (top + tooltipRect.height > window.innerHeight - 12) {
        top = triggerRect.top - tooltipRect.height - 8;
      }
      top = Math.max(12, top);
      tooltip.style.left = Math.round(left) + "px";
      tooltip.style.top = Math.round(top) + "px";
    }

    function show(trigger) {
      if (active && active !== trigger && active.matches("button")) {
        active.setAttribute("aria-expanded", "false");
      }
      active = trigger;
      if (trigger.matches("button")) trigger.setAttribute("aria-expanded", "true");
      position(trigger);
    }

    function hide(trigger) {
      if (trigger && active !== trigger) return;
      if (active && active.matches("button")) active.setAttribute("aria-expanded", "false");
      active = null;
      tooltip.hidden = true;
    }

    triggers.forEach(function (trigger) {
      trigger.addEventListener("mouseenter", function () { show(trigger); });
      trigger.addEventListener("mouseleave", function () {
        if (document.activeElement !== trigger) hide(trigger);
      });
      if (trigger.matches("button")) {
        trigger.addEventListener("focus", function () { show(trigger); });
        trigger.addEventListener("blur", function () { hide(trigger); });
        trigger.addEventListener("click", function (event) {
          event.stopPropagation();
          show(trigger);
        });
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape" || !active) return;
      var prior = active;
      hide();
      if (prior.matches("button")) prior.blur();
    });
    window.addEventListener("resize", function () { if (active) position(active); });
    document.addEventListener("scroll", function () { if (active) position(active); }, true);
  }

  function normalize(value) {
    return String(value || "").toLowerCase().normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
  }

  function moveMethodAfterDirectory() {
    var method = document.getElementById("method");
    var overview = document.getElementById("overview");
    if (method && overview && overview.nextElementSibling !== method) {
      overview.insertAdjacentElement("afterend", method);
    }
  }

  function wireMethodDisclosure() {
    document.querySelectorAll('a[href="#method"]').forEach(function (link) {
      link.addEventListener("click", function () {
        var details = document.querySelector("#method details");
        if (details) details.open = true;
      });
    });
    if (location.hash === "#method") {
      var initial = document.querySelector("#method details");
      if (initial) initial.open = true;
    }
  }

  function collectTechniques(cases) {
    var map = Object.create(null);
    cases.forEach(function (item) {
      (item.techniques || []).forEach(function (technique) {
        var key = technique.id + "\u0000" + technique.name;
        if (!map[key]) {
          map[key] = { id: technique.id, name: technique.name, slugs: [], submetrics: [] };
        }
        if (map[key].slugs.indexOf(item.slug) === -1) map[key].slugs.push(item.slug);
        (technique.submetrics || []).forEach(function (submetric) {
          if (map[key].submetrics.indexOf(submetric) === -1) map[key].submetrics.push(submetric);
        });
      });
    });
    return Object.keys(map).map(function (key) {
      var item = map[key];
      item.searchText = normalize(item.id + " " + item.name + " " + item.submetrics.join(" "));
      return item;
    });
  }

  function caseRank(item, query) {
    var title = normalize(item.title);
    var architecture = normalize(item.architecture);
    if (title.indexOf(query) === 0) return 120;
    if (title.indexOf(query) !== -1) return 100;
    if (architecture.indexOf(query) !== -1) return 72;
    var techniqueHit = (item.techniques || []).some(function (technique) {
      return normalize(technique.id + " " + technique.name).indexOf(query) !== -1;
    });
    if (techniqueHit) return 82;
    if (item.searchText.indexOf(query) !== -1) return 45;
    return -1;
  }

  function appendHighlighted(node, text, query) {
    var raw = String(text || "");
    var index = raw.toLowerCase().indexOf(String(query || "").toLowerCase());
    if (!query || index < 0) {
      node.appendChild(document.createTextNode(raw));
      return;
    }
    node.appendChild(document.createTextNode(raw.slice(0, index)));
    var mark = document.createElement("mark");
    mark.textContent = raw.slice(index, index + query.length);
    node.appendChild(mark);
    node.appendChild(document.createTextNode(raw.slice(index + query.length)));
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function wireSearch(data, state, casesBySlug, rows, directory) {
    var wrap = document.querySelector("[data-case-search]");
    if (!wrap) return;
    var input = document.getElementById("case-search-input");
    var panel = document.getElementById("case-search-panel");
    var clear = wrap.querySelector("[data-search-clear]");
    var techniques = collectTechniques(data.cases);
    var activeIndex = -1;

    function closePanel() {
      panel.classList.add("hidden");
      input.setAttribute("aria-expanded", "false");
      input.removeAttribute("aria-activedescendant");
      activeIndex = -1;
    }

    function optionNodes() {
      return Array.prototype.slice.call(panel.querySelectorAll('[role="option"]'));
    }

    function setActive(index) {
      var options = optionNodes();
      if (!options.length) return;
      activeIndex = (index + options.length) % options.length;
      options.forEach(function (option, optionIndex) {
        option.classList.toggle("active", optionIndex === activeIndex);
      });
      input.setAttribute("aria-activedescendant", options[activeIndex].id);
      options[activeIndex].scrollIntoView({ block: "nearest" });
    }

    function addGroup(label) {
      panel.appendChild(el("div", "search-group-label", label));
    }

    function addCaseOption(item, query, index) {
      var option = el("button", "search-option search-case-option");
      option.type = "button";
      option.id = "case-search-option-" + index;
      option.setAttribute("role", "option");
      option.dataset.slug = item.slug;

      var top = el("span", "search-option-top");
      var title = el("strong");
      appendHighlighted(title, item.title, query);
      top.appendChild(title);
      top.appendChild(el("span", "search-option-ers", item.ers.toFixed(1) + " ERS"));
      option.appendChild(top);
      option.appendChild(el("span", "search-option-meta", item.architecture + " · Tier " + item.tier));
      var source = item.finding || item.summary || "";
      var clean = source.length > 150 ? source.slice(0, 147).replace(/\s+\S*$/, "") + "…" : source;
      var snippet = el("span", "search-option-snippet");
      appendHighlighted(snippet, clean, query);
      option.appendChild(snippet);
      option.addEventListener("click", function () {
        closePanel();
        openCase(item.slug);
      });
      panel.appendChild(option);
    }

    function addTechniqueOption(item, query, index) {
      var option = el("button", "search-option search-technique-option");
      option.type = "button";
      option.id = "case-search-technique-" + index;
      option.setAttribute("role", "option");
      var top = el("span", "search-option-top");
      top.appendChild(el("strong", "", item.id + "  " + item.name));
      top.appendChild(el("span", "search-option-count", item.slugs.length + " cases"));
      option.appendChild(top);
      option.appendChild(el("span", "search-option-meta",
        "AIDEFEND " + data.aidefendDataVersion + (item.submetrics.length ? " · " + item.submetrics.join(", ") : "")));
      option.addEventListener("click", function () {
        input.value = item.id;
        state.query = normalize(item.id);
        state.page = 1;
        clear.classList.remove("hidden");
        closePanel();
        updateDirectory(state, rows, directory);
        scrollToDirectory();
      });
      panel.appendChild(option);
    }

    function addSubmetricOption(item, index) {
      var option = el("button", "search-option search-technique-option");
      option.type = "button";
      option.id = "case-search-submetric-" + index;
      option.setAttribute("role", "option");
      option.appendChild(el("strong", "", item.id + "  " + item.name));
      option.appendChild(el("span", "search-option-meta", "AITBM IVP sub-metric"));
      option.addEventListener("click", function () {
        input.value = item.id;
        state.query = normalize(item.id);
        state.page = 1;
        clear.classList.remove("hidden");
        closePanel();
        updateDirectory(state, rows, directory);
        scrollToDirectory();
      });
      panel.appendChild(option);
    }

    function renderSuggestions() {
      var query = normalize(input.value);
      panel.textContent = "";
      activeIndex = -1;
      if (!query) {
        var hints = el("div", "search-hints");
        hints.appendChild(el("span", "search-group-label", "Try searching"));
        ["prompt injection", "RAG", "Cn-5", "AID-H-002.002"].forEach(function (hint) {
          var button = el("button", "search-hint", hint);
          button.type = "button";
          button.addEventListener("click", function () {
            input.value = hint;
            input.dispatchEvent(new Event("input", { bubbles: true }));
          });
          hints.appendChild(button);
        });
        panel.appendChild(hints);
        panel.classList.remove("hidden");
        input.setAttribute("aria-expanded", "true");
        return;
      }

      var matches = data.cases.map(function (item) {
        return { item: item, rank: caseRank(item, query) };
      }).filter(function (entry) { return entry.rank >= 0; })
        .sort(function (a, b) { return b.rank - a.rank || b.item.ers - a.item.ers; });
      var techniqueMatches = techniques.filter(function (item) {
        return item.searchText.indexOf(query) !== -1;
      }).sort(function (a, b) { return b.slugs.length - a.slugs.length; }).slice(0, 3);
      if (!techniqueMatches.length && matches.length) {
        var matchedSlugs = matches.map(function (entry) { return entry.item.slug; });
        techniqueMatches = techniques.map(function (item) {
          return {
            id: item.id,
            name: item.name,
            slugs: item.slugs,
            submetrics: item.submetrics,
            relatedHits: item.slugs.filter(function (slug) {
              return matchedSlugs.indexOf(slug) !== -1;
            }).length
          };
        }).filter(function (item) { return item.relatedHits > 0; })
          .sort(function (a, b) { return b.relatedHits - a.relatedHits || b.slugs.length - a.slugs.length; })
          .slice(0, 3);
      }
      var submetricMatches = (data.submetrics || []).filter(function (item) {
        return normalize(item.id + " " + item.name).indexOf(query) !== -1;
      }).slice(0, 3);

      if (matches.length) {
        addGroup("Incidents");
        matches.slice(0, 5).forEach(function (entry, index) {
          addCaseOption(entry.item, input.value.trim(), index);
        });
      }
      if (techniqueMatches.length) {
        addGroup("AIDEFEND techniques");
        techniqueMatches.forEach(function (item, index) { addTechniqueOption(item, query, index); });
      }
      if (submetricMatches.length) {
        addGroup("AITBM sub-metrics");
        submetricMatches.forEach(function (item, index) { addSubmetricOption(item, index); });
      }

      var footer = el("button", "search-view-all");
      footer.type = "button";
      footer.id = "case-search-view-all";
      footer.setAttribute("role", "option");
      footer.appendChild(el("span", "", matches.length ?
        "View all " + matches.length + " matching cases" : "No case title matches — search the full evidence text"));
      footer.appendChild(el("span", "", "View directory →"));
      footer.addEventListener("click", function () {
        closePanel();
        scrollToDirectory();
      });
      panel.appendChild(footer);

      var keyboard = el("div", "search-keyboard-help", "Use ↑↓ to navigate · Enter to select · Esc to close");
      panel.appendChild(keyboard);
      panel.classList.remove("hidden");
      input.setAttribute("aria-expanded", "true");
    }

    input.addEventListener("focus", renderSuggestions);
    input.addEventListener("input", function () {
      state.query = normalize(input.value);
      state.page = 1;
      clear.classList.toggle("hidden", !input.value);
      renderSuggestions();
      updateDirectory(state, rows, directory);
    });
    input.addEventListener("keydown", function (event) {
      var options = optionNodes();
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActive(activeIndex + 1);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setActive(activeIndex - 1);
      } else if (event.key === "Enter" && activeIndex >= 0 && options[activeIndex]) {
        event.preventDefault();
        options[activeIndex].click();
      } else if (event.key === "Escape") {
        closePanel();
      }
    });
    clear.addEventListener("click", function () {
      input.value = "";
      state.query = "";
      state.page = 1;
      clear.classList.add("hidden");
      updateDirectory(state, rows, directory);
      input.focus();
      renderSuggestions();
    });
    var initialQuery = new URLSearchParams(location.search).get("search");
    if (initialQuery) {
      input.value = initialQuery;
      state.query = normalize(initialQuery);
      clear.classList.remove("hidden");
      updateDirectory(state, rows, directory);
    }
    document.addEventListener("click", function (event) {
      if (!wrap.contains(event.target)) closePanel();
    });
  }

  function openCase(slug) {
    var target = document.getElementById(slug);
    if (!target) return;
    if (target.tagName === "DETAILS") target.open = true;
    history.pushState(null, "", "#" + slug);
    target.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  function scrollToDirectory() {
    var directory = document.getElementById("case-directory");
    if (directory) directory.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  function wireBrowse(state, rows, directory) {
    var buttons = document.querySelectorAll("[data-browse]");
    var toggle = document.querySelector("[data-category-toggle]");
    var body = document.querySelector("[data-category-body]");
    if (toggle && body) {
      toggle.addEventListener("click", function () {
        var open = body.classList.toggle("mobile-open");
        toggle.setAttribute("aria-expanded", String(open));
      });
    }

    buttons.forEach(function (button) {
      button.setAttribute("aria-pressed", "false");
      button.addEventListener("click", function () {
        var key = button.dataset.browse;
        if (key === "not-scored") {
          var section = document.getElementById("not-scored");
          if (section) section.scrollIntoView({ block: "start", behavior: "smooth" });
          return;
        }
        var reselect = state.filter === key;
        state.filter = reselect ? "" : key;
        state.filterLabel = reselect ? "" : button.querySelector("strong").textContent;
        state.page = 1;
        buttons.forEach(function (item) {
          var pressed = !reselect && item === button;
          item.classList.toggle("active", pressed);
          item.setAttribute("aria-pressed", String(pressed));
        });
        updateDirectory(state, rows, directory);
        scrollToDirectory();
      });
    });

    var clearFilter = document.querySelector("[data-clear-filter]");
    if (clearFilter) clearFilter.addEventListener("click", function () {
      state.filter = "";
      state.filterLabel = "";
      state.page = 1;
      buttons.forEach(function (button) {
        button.classList.remove("active");
        button.setAttribute("aria-pressed", "false");
      });
      updateDirectory(state, rows, directory);
    });

    var clearAll = document.querySelector("[data-clear-all]");
    if (clearAll) clearAll.addEventListener("click", function () {
      state.filter = "";
      state.filterLabel = "";
      state.query = "";
      state.page = 1;
      var input = document.getElementById("case-search-input");
      if (input) input.value = "";
      var searchClear = document.querySelector("[data-search-clear]");
      if (searchClear) searchClear.classList.add("hidden");
      buttons.forEach(function (button) {
        button.classList.remove("active");
        button.setAttribute("aria-pressed", "false");
      });
      updateDirectory(state, rows, directory);
    });
  }

  function wireDirectory(state, rows, directory) {
    if (!directory) return;
    var sort = document.querySelector("[data-directory-sort]");
    if (sort) sort.addEventListener("change", function () {
      state.sort = sort.value;
      state.page = 1;
      updateDirectory(state, rows, directory);
    });
    document.querySelectorAll("[data-directory-view]").forEach(function (button) {
      button.addEventListener("click", function () {
        state.view = button.dataset.directoryView;
        directory.classList.toggle("cards", state.view === "cards");
        document.querySelectorAll("[data-directory-view]").forEach(function (item) {
          var active = item === button;
          item.classList.toggle("active", active);
          item.setAttribute("aria-pressed", String(active));
        });
      });
    });
    var prev = document.querySelector("[data-page-prev]");
    var next = document.querySelector("[data-page-next]");
    if (prev) prev.addEventListener("click", function () {
      if (state.page > 1) {
        state.page -= 1;
        updateDirectory(state, rows, directory);
        scrollToDirectory();
      }
    });
    if (next) next.addEventListener("click", function () {
      state.page += 1;
      updateDirectory(state, rows, directory);
      scrollToDirectory();
    });
  }

  function updateDirectory(state, rows, directory) {
    if (!directory) return;
    var matched = rows.filter(function (row) {
      var item = row.dataset.slug;
      var dataNode = document.getElementById("use-case-search-data");
      var tags = (row.dataset.tags || "").split(/\s+/);
      var filterMatch = !state.filter || tags.indexOf(state.filter) !== -1;
      if (!filterMatch) return false;
      if (!state.query) return true;
      var searchData = window.__aitbmSearchCases;
      if (!searchData && dataNode) {
        try {
          searchData = JSON.parse(dataNode.textContent).cases.reduce(function (map, entry) {
            map[entry.slug] = normalize([
              entry.title, entry.architecture, entry.summary, entry.finding,
              (entry.tags || []).join(" "),
              (entry.techniques || []).map(function (technique) {
                return [technique.id, technique.name, (technique.submetrics || []).join(" ")].join(" ");
              }).join(" ")
            ].join(" "));
            return map;
          }, Object.create(null));
          window.__aitbmSearchCases = searchData;
        } catch (error) { searchData = Object.create(null); }
      }
      return searchData && (searchData[item] || "").indexOf(state.query) !== -1;
    });

    matched.sort(function (a, b) {
      if (state.sort === "date-desc") return b.dataset.date.localeCompare(a.dataset.date);
      if (state.sort === "title-asc") {
        return a.querySelector(".case-directory-title").textContent.localeCompare(
          b.querySelector(".case-directory-title").textContent);
      }
      return Number(b.dataset.ers) - Number(a.dataset.ers) || b.dataset.date.localeCompare(a.dataset.date);
    });
    matched.forEach(function (row) { directory.appendChild(row); });

    var pages = Math.max(1, Math.ceil(matched.length / state.pageSize));
    if (state.page > pages) state.page = pages;
    var start = (state.page - 1) * state.pageSize;
    var end = Math.min(start + state.pageSize, matched.length);
    rows.forEach(function (row) { row.hidden = true; });
    matched.slice(start, end).forEach(function (row) { row.hidden = false; });

    var count = document.getElementById("directory-count");
    var status = document.getElementById("directory-status");
    var searchTotal = document.querySelector(".case-search-total");
    if (count) count.textContent = matched.length + " result" + (matched.length === 1 ? "" : "s");
    if (searchTotal) searchTotal.textContent = matched.length + " result" + (matched.length === 1 ? "" : "s");
    if (status) {
      var parts = [];
      if (state.filterLabel) parts.push(state.filterLabel);
      if (state.query) parts.push('search "' + state.query + '"');
      status.textContent = parts.length ? parts.join(" · ") : "All case-study scenarios";
    }

    var active = document.querySelector("[data-active-filter]");
    if (active) {
      active.classList.toggle("hidden", !state.filterLabel);
      var label = active.querySelector("span");
      if (label) label.textContent = state.filterLabel ? "Filtered by " + state.filterLabel : "";
    }
    var empty = document.querySelector("[data-directory-empty]");
    var pagination = document.querySelector("[data-directory-pagination]");
    if (empty) empty.classList.toggle("hidden", matched.length !== 0);
    if (pagination) pagination.classList.toggle("hidden", matched.length === 0);
    var pageStatus = document.querySelector("[data-page-status]");
    if (pageStatus) pageStatus.textContent = matched.length ?
      "Showing " + (start + 1) + "–" + end + " of " + matched.length : "No results";
    var prev = document.querySelector("[data-page-prev]");
    var next = document.querySelector("[data-page-next]");
    if (prev) prev.disabled = state.page <= 1;
    if (next) next.disabled = state.page >= pages;
  }

  function openTarget(hash) {
    if (!hash || hash.length < 2) return;
    var target;
    try { target = document.querySelector(hash); } catch (error) { return; }
    if (target && target.tagName === "DETAILS") {
      target.open = true;
      target.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }

  function wireDeepLinks() {
    document.addEventListener("click", function (event) {
      var link = event.target.closest && event.target.closest('a[href^="#"]');
      if (!link) return;
      var hash = link.getAttribute("href");
      var target;
      try { target = document.querySelector(hash); } catch (error) { return; }
      if (target && target.tagName === "DETAILS") target.open = true;
    });
    window.addEventListener("hashchange", function () { openTarget(location.hash); });
    openTarget(location.hash);
  }

  function wireSectionNavigation() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".local-section-links a"));
    var sections = links.map(function (link) {
      try { return document.querySelector(link.getAttribute("href")); } catch (error) { return null; }
    }).filter(Boolean);
    if (!("IntersectionObserver" in window) || !sections.length) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) {
          link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-24% 0px -68% 0px", threshold: 0 });
    sections.forEach(function (section) { observer.observe(section); });
  }
})();
