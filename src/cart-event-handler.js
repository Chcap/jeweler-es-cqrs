const eventTypes = require('./event-types');

function apply (cart, event) {

  if (event.type === eventTypes.JEWEL_ADDED) {
    return [...cart, event.data];
  } else if (event.type === eventTypes.JEWEL_REMOVED) {
    return cart.filter(jewel => jewel.id !== event.data.id)
  }
  return cart;
}

function handle (event, history = []) {

  const cart = [...history, event].reduce(apply, []);
  return {cart};
}

module.exports = { handle }
