
const EVENT_TYPES = {
    CART_SUBMITTED: 'CartSubmitted',
    JEWEL_ADDED: 'JewelAdded'
}

class State {
    constructor() {
        this.submitted = false
    }

    apply (event) {
        if (event.type === EVENT_TYPES.CART_SUBMITTED) {
            this.submitted = true;
        }
    }
}

class Cart {

    constructor({ history = [], publisher = [] }) {
        this.state = new State();
        history.forEach(event => this.state.apply(event));
        this.publisher = publisher;
    }

    _pushEvent(event) {
        this.publisher.push(event);
        this.state.apply(event);
    }

    submit () {
        if (!this.state.submitted) {
            const event = { type: EVENT_TYPES.CART_SUBMITTED, submitAt: new Date() };
            this._pushEvent(event);
        }
    }

    add (data) {
        const event = Object.assign({
            type: EVENT_TYPES.JEWEL_ADDED,
            submitAt: new Date()
        }, data);
        this._pushEvent(event);
    }
}

Cart.EVENT_TYPES = EVENT_TYPES;

module.exports.Cart = Cart;
