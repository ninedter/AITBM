// AITBM site — minimal interactivity (mobile nav + footer year)
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.querySelector("[data-nav-toggle]");
    var menu = document.querySelector("[data-nav-menu]");
    if (toggle && menu) {
      toggle.addEventListener("click", function () {
        var open = menu.classList.toggle("hidden") === false;
        toggle.setAttribute("aria-expanded", String(open));
      });
    }
    var yearEl = document.querySelector("[data-year]");
    if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
  });
})();
