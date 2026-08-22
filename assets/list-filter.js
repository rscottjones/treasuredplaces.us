// Filters the Treasured Places table in the browser. No dependencies.
(function () {
  var table = document.getElementById("places");
  if (!table) return;

  var q = document.getElementById("f-name");
  var type = document.getElementById("f-type");
  var state = document.getElementById("f-state");
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

  var types = {}, states = {};
  rows.forEach(function (r) {
    types[r.dataset.type] = true;
    r.dataset.states.split(",").forEach(function (s) {
      s = s.trim();
      if (s) states[s] = true;
    });
  });
  fill(type, Object.keys(types));
  fill(state, Object.keys(states));

  function apply() {
    var needle = q.value.trim().toLowerCase();
    var t = type.value;
    var s = state.value;
    var shown = 0;

    rows.forEach(function (r) {
      var ok =
        (!needle || r.dataset.name.toLowerCase().indexOf(needle) !== -1) &&
        (!t || r.dataset.type === t) &&
        (!s || r.dataset.states.split(",").map(function (x) { return x.trim(); }).indexOf(s) !== -1);
      r.hidden = !ok;
      if (ok) shown++;
    });

    count.textContent =
      shown === total
        ? "Showing all " + total + " places"
        : "Showing " + shown + " of " + total + " places";
  }

  [q, type, state].forEach(function (el) {
    el.addEventListener("input", apply);
  });

  apply();
})();
