# Flagship: Autocomplete / typeahead (60 min)

## Prompt
"Build a search box that suggests users from an API as the user types."

## Clarifying questions
API shape & latency? Max suggestions? Min characters? Mouse + keyboard? What happens on select? Cache allowed? Library allowed?

## Requirements
1. Debounced requests (300 ms), min 1–2 chars, trimmed query.
2. Max 8 suggestions with highlighted match.
3. Loading / empty / error states.
4. ↑ ↓ (wrap), Enter selects, Escape closes; hover highlights; click selects.
5. Close on outside click.
6. Old responses never overwrite newer ones.
7. ARIA combobox pattern.

## State design
`query` (input) · `debouncedQuery` (derived via hook) · `results` · `status` · `open` · `activeIndex`. Selected item reported via `onSelect`.

## Edge cases
Fast typing (race) · empty string clears results · API error then success · very long labels · special regex chars in query (use `indexOf`, not `new RegExp(query)`) · IME input · mobile.

## Follow-ups
Cache per query (LRU) · recent searches · grouped results · virtualized long results · server-side highlighting · analytics on no-result queries.

Reference + tests: `code/machine-coding/src/components/Autocomplete`.
