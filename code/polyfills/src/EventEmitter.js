// Pub/sub — asked at almost every product company.
export class EventEmitter {
  #events = new Map(); // name -> Set of listeners

  on(name, listener) {
    if (!this.#events.has(name)) this.#events.set(name, new Set());
    this.#events.get(name).add(listener);
    return () => this.off(name, listener); // unsubscribe function
  }

  once(name, listener) {
    const wrapper = (...args) => { this.off(name, wrapper); listener(...args); };
    return this.on(name, wrapper);
  }

  off(name, listener) {
    this.#events.get(name)?.delete(listener);
  }

  emit(name, ...args) {
    const listeners = this.#events.get(name);
    if (!listeners || listeners.size === 0) return false;
    [...listeners].forEach((l) => l(...args)); // copy: listeners may unsubscribe while emitting
    return true;
  }

  listenerCount(name) {
    return this.#events.get(name)?.size ?? 0;
  }
}
