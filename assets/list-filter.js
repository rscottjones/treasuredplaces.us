// Filters the Treasured Places table in the browser. No dependencies.
(function () {
  var table = document.getElementById("places");
  if (!table) return;

  var q = document.getElementById("f-name");
  var type = document.getElementById("f-type");
  var state = document.getElementById("f-state");
  var manager = document.getElementById("f-manager");
  var count = document.getElementById("f-count");
  var rows = Array.prototype.slice.call(table.tBodies[0].rows);
  var total = rows.length;

  // Build the dropdowns from the table itself, so they stay in sync
  // whenever rows are added or removed.
  function fill(select, values) {
    values.sort().forEach(function (v) {
      var o = document.createElement("option");
      o.value = v;
      o.textContent = v;
      select.appendChild(o);
    });
  }

  function splitList(value) {
    return value.split(",").map(function (x) { return x.trim(); }).filter(Boolean);
  }

  var types = {}, states = {}, managers = {};
  rows.forEach(function (r) {
    types[r.dataset.type] = true;
    splitList(r.dataset.states).forEach(function (s) { states[s] = true; });
    splitList(r.dataset.managers || "").forEach(function (m) { managers[m] = true; });
  });
  fill(type, Object.keys(types));
  fill(state, Object.keys(states));
  fill(manager, Object.keys(managers));

  function apply() {
    var needle = q.value.trim().toLowerCase();
    var t = type.value;
    var s = state.value;
    var m = manager.value;
    var shown = 0;

    rows.forEach(function (r) {
      var ok =
        (!needle || r.dataset.name.toLowerCase().indexOf(needle) !== -1) &&
        (!t || r.dataset.type === t) &&
        (!s || splitList(r.dataset.states).indexOf(s) !== -1) &&
        (!m || splitList(r.dataset.managers || "").indexOf(m) !== -1);
      r.hidden = !ok;
      if (ok) shown++;
    });

    count.textContent =
      shown === total
        ? "Showing all " + total + " places"
        : "Showing " + shown + " of " + total + " places";
  }

  [q, type, state, manager].forEach(function (el) {
    el.addEventListener("input", apply);
  });

  apply();
})();
