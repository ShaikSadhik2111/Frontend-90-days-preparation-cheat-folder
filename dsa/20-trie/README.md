# 20 — Trie

A trie stores strings by shared prefixes.

Each node represents a prefix; terminal state indicates a complete word.

## Problem 1 — Implement Trie

```js
class TrieNode {
  constructor() {
    this.children = new Map();
    this.isWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;

    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char);
    }

    node.isWord = true;
  }

  search(word) {
    const node = this.find(word);
    return node !== null && node.isWord;
  }

  startsWith(prefix) {
    return this.find(prefix) !== null;
  }

  find(text) {
    let node = this.root;

    for (const char of text) {
      node = node.children.get(char);
      if (!node) return null;
    }

    return node;
  }
}
```

For word length L, lookup is O(L), independent of the number of stored words.

## Problem 2 — Add and Search Words

Support a wildcard '.' that can match any one character. Normal characters follow one child; '.' branches over all children.

## Problem 3 — Replace Words

For each sentence word, walk the trie and return the first terminal prefix.

## Problem 4 — Word Search II

Combine trie traversal with grid backtracking so prefixes that cannot form any dictionary word are pruned immediately.

## Recognition
Autocomplete, prefix search, dictionary prefix matching, many words sharing prefixes.

## Trade-off
Tries trade memory for predictable prefix lookup.

## Pitfalls
Confusing a prefix node with a complete word; forgetting terminal state; excessive object allocation.

## Connection
Trie + backtracking demonstrates how data structures can prune a search space.
