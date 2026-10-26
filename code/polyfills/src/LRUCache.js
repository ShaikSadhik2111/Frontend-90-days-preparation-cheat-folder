// LRU cache (LeetCode 146) using Map insertion order. get/put are O(1).
// Frontend use: caching API responses / computed results with bounded memory.
export class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }
  get(key) {
    if (!this.map.has(key)) return -1;
    const value = this.map.get(key);
    this.map.delete(key);      // move to "most recently used" end
    this.map.set(key, value);
    return value;
  }
  put(key, value) {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, value);
    if (this.map.size > this.capacity) {
      const oldest = this.map.keys().next().value; // first key = least recently used
      this.map.delete(oldest);
    }
  }
}
