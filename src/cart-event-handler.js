const eventTypes = require('./event-types');

function apply (jewels, event) {

  if (event.type === eventTypes.JEWEL_ADDED) {
    return [...jewels, event.data];
  } else if (event.type === eventTypes.JEWEL_REMOVED) {
    return jewels.filter(jewel => jewel.id !== event.data.id)
  }
  return jewels;
}

function handle (event, repository = {}, history = []) {
  const cart = [...history, event].reduce(apply, []);
  repository.cartDescription = {cart};
}

module.exports = { handle }
