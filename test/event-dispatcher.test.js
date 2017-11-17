const chai = require('chai');
const sinon = require('sinon');
const EventDispatcher = require('../src/event-dispatcher');
const cart = require('../src/cart-func');
const cartEventHandler = require('../src/cart-event-handler');
const EVENT_TYPES = require('../src/event-types');

chai.should();

describe('Event Dispatcher', function () {

  describe('#publish()', function () {
    it('should store events ', function () {
      const eventDispatcher = new EventDispatcher();
      eventDispatcher.publish({
        cartId: 'foo',
        type: EVENT_TYPES.JEWEL_ADDED
      })
      eventDispatcher.publish({
        cartId: 'foo',
        type: EVENT_TYPES.JEWEL_REMOVED
      })
      eventDispatcher.publish({
        cartId: 'foo',
        type: EVENT_TYPES.CART_SUBMITTED
      })
      eventDispatcher.publish({
        cartId: 'bar',
        type: EVENT_TYPES.JEWEL_ADDED
      })

      eventDispatcher.getEvents('foo').should.deep.equal([{
        cartId: 'foo',
        type: EVENT_TYPES.JEWEL_ADDED
      }, {
        cartId: 'foo',
        type: EVENT_TYPES.JEWEL_REMOVED
      }, {
        cartId: 'foo',
        type: EVENT_TYPES.CART_SUBMITTED
      }
      ])
    })

    it('should call subscribed handler', function () {
      // given
      const eventDispatcher = new EventDispatcher();
      const handler = sinon.spy();
      eventDispatcher.subscribe(handler);

      // when
      eventDispatcher.publish({
        cartId: 'foo',
        type: EVENT_TYPES.JEWEL_ADDED
      })

      handler.should.have.been.calledWith({
        cartId: 'foo',
        type: EVENT_TYPES.JEWEL_ADDED
      })
    })
  })

  describe('with card and card projection', function () {
    it('should display updated projection when send command', function () {
      // given
      const eventDispatcher = new EventDispatcher();
      const repository = {}
      function handle (event, history) {
        cartEventHandler.handle(event, repository, history);
      }
      eventDispatcher.subscribe(handle);

      // when
      cart
        .add({ id: 'myjewelId', cartId: 'myCartId' })
        .forEach(event => eventDispatcher.publish(event));

      // then
      repository.cartDescription.should.deep.equal({
        cart: [{ id: 'myjewelId', cartId: 'myCartId' }]
      })
    })
  });

})
