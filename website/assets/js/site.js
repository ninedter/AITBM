// AITBM site — minimal interactivity (mobile nav, active link, footer year)
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    // Mobile nav toggle
    var toggle = document.querySelector("[data-nav-toggle]");
    var menu = document.querySelector("[data-nav-menu]");
    if (toggle && menu) {
      toggle.addEventListener("click", function () {
        var open = menu.classList.toggle("hidden") === false;
        toggle.setAttribute("aria-expanded", String(open));
      });
    }

    // Auto-highlight the active nav link by current filename
    var file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    var key = file.replace(/\.html$/, "") || "index";
    document.querySelectorAll("[data-nav]").forEach(function (a) {
      if (a.getAttribute("data-nav") === key) {
        a.classList.add("active");
        if (a.classList.contains("mobile-link")) {
          a.classList.add("active");
        } else {
          a.classList.add("text-navy");
        }
      }
    });

    // Footer year
    var yearEl = document.querySelector("[data-year]");
    if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
  });
})();
