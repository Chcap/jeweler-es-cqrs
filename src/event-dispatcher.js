
class EventDispatcher {

  constructor() {
    this.store = {}
    this.handlers = {};
  }

  publish (event) {
    if (this.store[event.cartId] === undefined) {
      this.store[event.cartId] = [];
    }
    this.store[event.cartId].push(event);

    if (this.handlers[event.type]) {
      this.handlers[event.type].forEach(handler => handler(event))
    }
  }

  getEvents (id) {
    return this.store[id] || [];
  }

  subscribe (eventType, handler) {
    if (this.handlers[eventType] === undefined) {
      this.handlers[eventType] = []
    }
    this.handlers[eventType].push(handler);
  }
}


module.exports = EventDispatcher;
