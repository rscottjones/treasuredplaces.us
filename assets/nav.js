// Mobile menu toggle. The list starts hidden only if JS is running,
// so the menu still works with scripting turned off.
(function () {
  var btn = document.querySelector(".nav-toggle");
  var list = document.getElementById("site-nav");
  if (!btn || !list) return;

  var mq = window.matchMedia("(min-width: 46rem)");

  function collapse() {
    if (!mq.matches) {
      list.hidden = true;
      btn.setAttribute("aria-expanded", "false");
    } else {
      list.hidden = false;
    }
  }

  collapse();
  mq.addEventListener("change", collapse);

  btn.addEventListener("click", function () {
    var open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!open));
    list.hidden = open;
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") {
      btn.setAttribute("aria-expanded", "false");
      list.hidden = true;
      btn.focus();
    }
  });
})();
