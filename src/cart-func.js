
const EVENT_TYPES = require('./event-types');

function submit (history = []) {

  const submitted = history.some(event => event.type === EVENT_TYPES.CART_SUBMITTED);
  const hasJewel = history.some(event => event.type === EVENT_TYPES.JEWEL_ADDED);
  if (!submitted && hasJewel) {
    return [{
      type: EVENT_TYPES.CART_SUBMITTED,
      submitAt: new Date()
    }]
  }

  return [];
}

function add (jewel) {
  return [Object.assign({
    type: EVENT_TYPES.JEWEL_ADDED,
    submitAt: new Date()
  }, jewel)];
}

function remove () {
  return []
}

function builder (history = []) {
  return {
    submit () { return builder(submit(history)) },
    add (jewel) { return builder(add(jewel, history)) },
    remove (jewelId) { return builder(remove(jewelId, history)) },
    history
  };
}

module.exports = {
  submit,
  add,
  builder,
  EVENT_TYPES
};
