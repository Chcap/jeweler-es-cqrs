
class EventDispatcher {

  constructor() {
    this.store = {}
    this.handlers = [];
  }

  publish(event) {
    if (this.store[event.cartId] === undefined) {
      this.store[event.cartId] = [];
    }
    this.store[event.cartId].push(event);

    this.handlers.forEach(handler => handler(event))
  }

  getEvents(id) {
    return this.store[id] || [];
  }

  subscribe(handler) {
    this.handlers.push(handler);
  }
}


module.exports = EventDispatcher;
