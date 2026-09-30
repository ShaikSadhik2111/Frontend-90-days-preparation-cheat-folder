# Edge Cases
Always test rapid clicks, double submit, empty data, huge data, slow/failed network, stale responses, unmount during async work, keyboard-only use and mobile layout.

Write the invariant first, e.g. obsolete response cannot overwrite active results.

Challenge: intentionally break autocomplete with out-of-order responses and fix it.