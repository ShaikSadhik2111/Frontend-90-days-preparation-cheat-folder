# 20 — Trie

## Purpose
A trie stores strings by shared prefixes.

For word length L:
insert/search/prefix check are O(L), assuming child lookup is O(1)-ish.

## Node
Each node has child references and an end-of-word flag.

## Use cases
Autocomplete, prefix search, dictionary lookup, word matching.

## Trade-off
Tries can consume much more memory than a Set because many nodes and child maps are stored.

## Interview decision
Use a trie when prefixes are central. Use a Set/Map when only exact membership is needed.

## Challenge
Implement insert, search, startsWith, then extend it to autocomplete suggestions. Explain what happens at every character insertion.