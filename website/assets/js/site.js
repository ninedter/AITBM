// AITBM site — shared navigation, global search, and footer behavior.
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    wireMobileNavigation();
    wireExploreMenu();
    highlightActiveNavigation();
    wireGlobalSearch();

    var yearEl = document.querySelector("[data-year]");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });

  function wireMobileNavigation() {
    var toggle = document.querySelector("[data-nav-toggle]");
    var menu = document.querySelector("[data-nav-menu]");
    if (!toggle || !menu) return;
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("hidden") === false;
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  function wireExploreMenu() {
    var wrap = document.querySelector("[data-explore-menu]");
    if (!wrap) return;
    var toggle = wrap.querySelector("[data-explore-toggle]");
    var panel = wrap.querySelector("[data-explore-panel]");
    if (!toggle || !panel) return;

    function close(restoreFocus) {
      panel.classList.add("hidden");
      toggle.setAttribute("aria-expanded", "false");
      if (restoreFocus) toggle.focus();
    }

    toggle.addEventListener("click", function () {
      var opening = panel.classList.contains("hidden");
      panel.classList.toggle("hidden", !opening);
      toggle.setAttribute("aria-expanded", String(opening));
    });
    document.addEventListener("click", function (event) {
      if (!wrap.contains(event.target)) close(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !panel.classList.contains("hidden")) close(true);
    });
  }

  function highlightActiveNavigation() {
    var file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    var key = file.replace(/\.html$/, "") || "index";
    if (key === "submetrics") key = "framework";
    var activeLinks = document.querySelectorAll('[data-nav="' + key + '"]');
    activeLinks.forEach(function (link) {
      link.classList.add("active");
      if (!link.classList.contains("mobile-link")) link.classList.add("text-navy");
      var explorePanel = link.closest("[data-explore-panel]");
      if (explorePanel) {
        var exploreToggle = document.querySelector("[data-explore-toggle]");
        if (exploreToggle) exploreToggle.classList.add("active", "text-navy");
      }
    });
  }

  function normalize(value) {
    return String(value || "").toLowerCase().normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
  }

  function element(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function appendHighlighted(node, text, rawQuery) {
    var source = String(text || "");
    var query = String(rawQuery || "").trim();
    if (!query) {
      node.textContent = source;
      return;
    }
    var index = source.toLowerCase().indexOf(query.toLowerCase());
    if (index < 0) {
      node.textContent = source;
      return;
    }
    node.appendChild(document.createTextNode(source.slice(0, index)));
    var mark = element("mark");
    mark.textContent = source.slice(index, index + query.length);
    node.appendChild(mark);
    node.appendChild(document.createTextNode(source.slice(index + query.length)));
  }

  function searchRank(item, normalizedQuery, terms) {
    var title = normalize(item.title);
    var category = normalize(item.category);
    var excerpt = normalize(item.excerpt);
    var keywords = normalize(item.keywords);
    var haystack = [title, category, excerpt, keywords].join(" ");
    if (!terms.every(function (term) { return haystack.indexOf(term) !== -1; })) return -1;

    var score = 0;
    if (title === normalizedQuery) score += 240;
    else if (title.indexOf(normalizedQuery) === 0) score += 180;
    else if (title.indexOf(normalizedQuery) !== -1) score += 130;
    terms.forEach(function (term) {
      if (title.indexOf(term) === 0) score += 44;
      else if (title.indexOf(term) !== -1) score += 28;
      if (category.indexOf(term) !== -1) score += 16;
      if (excerpt.indexOf(term) !== -1) score += 9;
      if (keywords.indexOf(term) !== -1) score += 4;
    });
    if (item.url.indexOf("#") === -1) score += 6;
    return score;
  }

  function wireGlobalSearch() {
    var triggers = Array.prototype.slice.call(document.querySelectorAll("[data-site-search-open]"));
    if (!triggers.length) return;
    var metadata = window.AITBM_SEARCH_INDEX_META || { entries: 0, url: "assets/data/site-search-index.json" };
    var index = [];
    var indexPromise = null;
    var priorFocus = null;
    var activeIndex = -1;
    var mobileMenu = document.querySelector("[data-nav-menu]");
    var mobileToggle = document.querySelector("[data-nav-toggle]");

    var overlay = element("div", "site-search-overlay hidden");
    overlay.setAttribute("data-site-search-overlay", "");
    overlay.setAttribute("role", "presentation");
    var dialog = element("section", "site-search-dialog");
    dialog.id = "site-search-dialog";
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    dialog.setAttribute("aria-labelledby", "site-search-title");

    var headingRow = element("div", "site-search-heading");
    var headingCopy = element("div");
    var eyebrow = element("span", "site-search-eyebrow", "SEARCH THE FRAMEWORK");
    var title = element("h2", "site-search-title", "Find anything in AITBM");
    title.id = "site-search-title";
    headingCopy.appendChild(eyebrow);
    headingCopy.appendChild(title);
    var closeButton = element("button", "site-search-close");
    closeButton.type = "button";
    closeButton.setAttribute("aria-label", "Close search");
    var closeIcon = element("i", "ph ph-x");
    closeIcon.setAttribute("aria-hidden", "true");
    closeButton.appendChild(closeIcon);
    headingRow.appendChild(headingCopy);
    headingRow.appendChild(closeButton);

    var inputWrap = element("div", "site-search-input-wrap");
    var searchIcon = element("i", "ph ph-magnifying-glass");
    searchIcon.setAttribute("aria-hidden", "true");
    var input = element("input", "site-search-input");
    input.type = "search";
    input.id = "site-search-input";
    input.autocomplete = "off";
    input.spellcheck = false;
    input.placeholder = "Search concepts, metrics, mappings, controls, or incidents";
    input.setAttribute("role", "combobox");
    input.setAttribute("aria-autocomplete", "list");
    input.setAttribute("aria-controls", "site-search-results");
    input.setAttribute("aria-expanded", "true");
    var shortcut = element("kbd", "", "ESC");
    inputWrap.appendChild(searchIcon);
    inputWrap.appendChild(input);
    inputWrap.appendChild(shortcut);

    var status = element("p", "site-search-status");
    status.setAttribute("aria-live", "polite");
    var results = element("div", "site-search-results");
    results.id = "site-search-results";
    results.setAttribute("role", "listbox");
    results.setAttribute("aria-label", "AITBM search results");

    dialog.appendChild(headingRow);
    dialog.appendChild(inputWrap);
    dialog.appendChild(status);
    dialog.appendChild(results);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    function optionNodes() {
      return Array.prototype.slice.call(results.querySelectorAll('[role="option"]'));
    }

    function setActive(nextIndex) {
      var options = optionNodes();
      if (!options.length) return;
      activeIndex = (nextIndex + options.length) % options.length;
      options.forEach(function (option, optionIndex) {
        option.classList.toggle("active", optionIndex === activeIndex);
        option.setAttribute("aria-selected", String(optionIndex === activeIndex));
      });
      input.setAttribute("aria-activedescendant", options[activeIndex].id);
      options[activeIndex].scrollIntoView({ block: "nearest" });
    }

    function addResult(item, query, resultIndex) {
      var option = element("a", "site-search-result");
      option.href = item.url;
      option.id = "site-search-result-" + resultIndex;
      option.setAttribute("role", "option");
      option.setAttribute("aria-selected", "false");
      var top = element("span", "site-search-result-top");
      var resultTitle = element("strong");
      appendHighlighted(resultTitle, item.title, query);
      top.appendChild(resultTitle);
      top.appendChild(element("span", "site-search-category", item.category));
      option.appendChild(top);
      var excerpt = element("span", "site-search-excerpt");
      appendHighlighted(excerpt, item.excerpt, query);
      option.appendChild(excerpt);
      option.addEventListener("click", closeSearch);
      results.appendChild(option);
    }

    function renderWelcome() {
      activeIndex = -1;
      results.textContent = "";
      status.textContent = index.length + " indexed topics across the complete public site.";
      var intro = element("div", "site-search-welcome");
      intro.appendChild(element("strong", "", "Popular searches"));
      var hints = element("div", "site-search-hints");
      ["Effective Risk Score", "Cn-5", "AIDEFEND", "MITRE ATLAS", "prompt injection", "assessment tiers"]
        .forEach(function (label) {
          var button = element("button", "site-search-hint", label);
          button.type = "button";
          button.addEventListener("click", function () {
            input.value = label;
            renderResults();
            input.focus();
          });
          hints.appendChild(button);
        });
      intro.appendChild(hints);
      results.appendChild(intro);
    }

    function renderLoading() {
      results.textContent = "";
      status.textContent = "Loading the complete AITBM search index…";
      var loading = element("div", "site-search-empty");
      var loadingIcon = element("i", "ph ph-circle-notch site-search-spinner");
      loadingIcon.setAttribute("aria-hidden", "true");
      loading.appendChild(loadingIcon);
      loading.appendChild(element("strong", "", "Preparing site search"));
      loading.appendChild(element("span", "", "Framework sections, mappings, controls, and use cases are being indexed."));
      results.appendChild(loading);
    }

    function renderLoadError() {
      input.disabled = true;
      results.textContent = "";
      status.textContent = "Search could not be loaded.";
      var empty = element("div", "site-search-empty");
      var emptyIcon = element("i", "ph ph-warning-circle");
      emptyIcon.setAttribute("aria-hidden", "true");
      empty.appendChild(emptyIcon);
      empty.appendChild(element("strong", "", "Site search is temporarily unavailable"));
      empty.appendChild(element("span", "", "Close this window and try again after refreshing the page."));
      results.appendChild(empty);
    }

    function loadIndex() {
      if (index.length) return Promise.resolve(index);
      if (indexPromise) return indexPromise;
      indexPromise = window.fetch(metadata.url, { credentials: "same-origin" })
        .then(function (response) {
          if (!response.ok) throw new Error("Search index request failed: " + response.status);
          return response.json();
        }).then(function (payload) {
          index = Array.isArray(payload) ? payload : [];
          return index;
        });
      return indexPromise;
    }

    function renderResults() {
      var rawQuery = input.value.trim();
      var normalizedQuery = normalize(rawQuery);
      input.removeAttribute("aria-activedescendant");
      activeIndex = -1;
      if (!normalizedQuery) {
        renderWelcome();
        return;
      }
      var terms = normalizedQuery.split(" ").filter(Boolean);
      var matches = index.map(function (item) {
        return { item: item, rank: searchRank(item, normalizedQuery, terms) };
      }).filter(function (entry) { return entry.rank >= 0; })
        .sort(function (a, b) {
          return b.rank - a.rank || a.item.title.localeCompare(b.item.title);
        });

      results.textContent = "";
      status.textContent = matches.length + " result" + (matches.length === 1 ? "" : "s") +
        " across AITBM" + (matches.length > 12 ? "; showing the 12 strongest matches." : ".");
      if (!matches.length) {
        var empty = element("div", "site-search-empty");
        var emptyIcon = element("i", "ph ph-magnifying-glass");
        emptyIcon.setAttribute("aria-hidden", "true");
        empty.appendChild(emptyIcon);
        empty.appendChild(element("strong", "", "No matching AITBM content"));
        empty.appendChild(element("span", "", "Try a metric ID, framework name, control, or broader phrase."));
        results.appendChild(empty);
        return;
      }
      matches.slice(0, 12).forEach(function (entry, resultIndex) {
        addResult(entry.item, rawQuery, resultIndex);
      });
    }

    function openSearch() {
      priorFocus = document.activeElement;
      overlay.classList.remove("hidden");
      document.body.classList.add("site-search-open");
      triggers.forEach(function (trigger) { trigger.setAttribute("aria-expanded", "true"); });
      if (mobileMenu) mobileMenu.classList.add("hidden");
      if (mobileToggle) mobileToggle.setAttribute("aria-expanded", "false");
      input.value = "";
      if (index.length) {
        input.disabled = false;
        renderWelcome();
        window.setTimeout(function () { input.focus(); }, 0);
      } else {
        input.disabled = true;
        renderLoading();
        loadIndex().then(function () {
          input.disabled = false;
          renderWelcome();
          input.focus();
        }).catch(function (error) {
          console.error("AITBM site search could not load", error);
          renderLoadError();
        });
      }
    }

    function closeSearch() {
      if (overlay.classList.contains("hidden")) return;
      overlay.classList.add("hidden");
      document.body.classList.remove("site-search-open");
      triggers.forEach(function (trigger) { trigger.setAttribute("aria-expanded", "false"); });
      input.removeAttribute("aria-activedescendant");
      if (priorFocus && priorFocus.offsetParent !== null && typeof priorFocus.focus === "function") {
        priorFocus.focus();
      } else if (mobileToggle) {
        mobileToggle.focus();
      }
    }

    triggers.forEach(function (trigger) { trigger.addEventListener("click", openSearch); });
    closeButton.addEventListener("click", closeSearch);
    overlay.addEventListener("click", function (event) {
      if (event.target === overlay) closeSearch();
    });
    input.addEventListener("input", renderResults);
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
      }
    });
    dialog.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeSearch();
      }
      if (event.key !== "Tab") return;
      var focusable = Array.prototype.slice.call(dialog.querySelectorAll("a[href], button, input"))
        .filter(function (node) { return !node.disabled && node.offsetParent !== null; });
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
    document.addEventListener("keydown", function (event) {
      var target = event.target;
      var editing = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" || target.isContentEditable);
      var commandK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      if ((!editing && event.key === "/") || commandK) {
        event.preventDefault();
        openSearch();
      }
    });
  }
})();
