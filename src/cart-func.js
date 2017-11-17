
const EVENT_TYPES = require('./event-types');

function submit (history = []) {

  const state = history.reduce((acc, event) => {
      if (event.type === EVENT_TYPES.CART_SUBMITTED) {
        acc.submitted = true;
      } else if (event.type === EVENT_TYPES.JEWEL_ADDED) {
        acc.hasJewel = true;
      }
      return acc;
  }, {submitted: false, hasJewel: false});

  if (!state.submitted && state.hasJewel) {
    return [{
      type: EVENT_TYPES.CART_SUBMITTED,
      submitAt: new Date()
    }]
  }

  return [];
}

function add (jewel) {
  return [{
    type: EVENT_TYPES.JEWEL_ADDED,
    submitAt: new Date(),
    data: jewel
  }];
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
