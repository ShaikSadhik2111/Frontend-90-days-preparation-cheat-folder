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

**Try it** (run with `node file.js` or in the browser console):

```js
const trie = new Trie();
trie.insert("apple");
console.log(trie.search("apple")); // → true
console.log(trie.search("app")); // → false
console.log(trie.startsWith("app")); // → true
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

---

## Full solutions — code, complexity, LeetCode

A trie node is `{ children: Map/obj, isEnd }`. Insert and search cost O(L) for a word of length L, independent of how many words are stored.

> **How to run any solution:** copy the helper (if shown), the function and its **Try it** lines into a file such as `practice.js`, then run `node practice.js` in the VS Code terminal. Or paste them into the browser console (F12 → Console). Each `console.log` shows the expected output in the comment after `→`.

### Design Add and Search Words Data Structure — [LeetCode 211](https://leetcode.com/problems/design-add-and-search-words-data-structure/)

**Idea:** Normal trie insert. For search, `.` means **try every child** — DFS over the trie.

```js
class WordDictionary {
  constructor() { this.root = { children: {}, isEnd: false }; }
  addWord(word) {
    let node = this.root;
    for (const ch of word) node = node.children[ch] ??= { children: {}, isEnd: false };
    node.isEnd = true;
  }
  search(word) {
    const dfs = (node, i) => {
      if (i === word.length) return node.isEnd;
      const ch = word[i];
      if (ch === ".") return Object.values(node.children).some((child) => dfs(child, i + 1));
      return !!node.children[ch] && dfs(node.children[ch], i + 1);
    };
    return dfs(this.root, 0);
  }
}
```

**Try it:**

```js
const w=new WordDictionary();
["bad","dad","mad"].forEach(x=>w.addWord(x));
console.log(w.search("pad")); // → false
console.log(w.search("bad")); // → true
console.log(w.search(".ad")); // → true
console.log(w.search("b..")); // → true
console.log(w.search("ba")); // → false
```

**Complexity:** addWord O(L) · search O(L) without dots, up to O(26^L) with many dots.  
**Edge cases:** "." can't match an empty position; prefix of a word isn't a word.

### Replace Words — [LeetCode 648](https://leetcode.com/problems/replace-words/)

**Idea:** Insert all roots in a trie. For each word, walk the trie and stop at the **first** node that ends a root.

```js
function replaceWords(dictionary, sentence) {
  const root = {};
  for (const w of dictionary) {
    let node = root;
    for (const ch of w) node = node[ch] ??= {};
    node.end = w;
  }
  return sentence.split(" ").map((word) => {
    let node = root;
    for (const ch of word) {
      node = node[ch];
      if (!node) break;
      if (node.end) return node.end;          // shortest root wins
    }
    return word;
  }).join(" ");
}
```

**Try it:**

```js
console.log(JSON.stringify(replaceWords(["cat","bat","rat"],"the cattle was rattled by the battery"))); // → "the cat was rat by the bat"
console.log(JSON.stringify(replaceWords(["a","b","c"],"aadsfasf absbs bbab cadsfafs"))); // → "a a b c"
```

**Complexity:** Time O(total characters) · Space O(dictionary characters).  
**Edge cases:** No root matches → keep the word.

### Word Search II — [LeetCode 212](https://leetcode.com/problems/word-search-ii/)

**Idea:** Put all words in a trie, then DFS the board **once**, walking the trie at the same time. Store the full word at its end node; delete it after finding to avoid duplicates.

```js
function findWords(board, words) {
  const root = {};
  for (const w of words) {
    let node = root;
    for (const ch of w) node = node[ch] ??= {};
    node.word = w;
  }
  const rows = board.length, cols = board[0].length, found = [];
  const dfs = (r, c, parent) => {
    const ch = board[r][c];
    const node = parent[ch];
    if (!node) return;
    if (node.word) { found.push(node.word); node.word = null; }   // avoid duplicates
    board[r][c] = "#";
    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nc >= 0 && nr < rows && nc < cols && board[nr][nc] !== "#") dfs(nr, nc, node);
    }
    board[r][c] = ch;
  };
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) dfs(r, c, root);
  return found;
}
```

**Try it:**

```js
console.log(JSON.stringify(findWords([["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]],["oath","pea","eat","rain"]).sort())); // → ["eat","oath"]
console.log(JSON.stringify(findWords([["a","b"],["c","d"]],["abcb"]))); // → []
```

**Complexity:** Time O(m·n·4^L) worst case, much faster in practice thanks to trie pruning · Space O(total word characters).  
**Edge cases:** Same word reachable twice; words sharing prefixes.
