const EVENT_TYPES = require('./event-types');

function persistCart (repository, cartDescription) {
  repository.cartDescription = cartDescription;
}

function handleJewelAdded (repository, event, cartDescription = {cart: []}) {
  cartDescription.cart.push(event.data);
  persistCart(repository, cartDescription)
}

function handleJewelRemoved (repository, event, cartDescription = {cart: []}) {
  cartDescription.cart = cartDescription.cart.filter(jewel => jewel.id !== event.data.id)
  persistCart(repository, cartDescription)
}

module.exports = {
  [EVENT_TYPES.JEWEL_ADDED]: handleJewelAdded,
  [EVENT_TYPES.JEWEL_REMOVED]: handleJewelRemoved
}
