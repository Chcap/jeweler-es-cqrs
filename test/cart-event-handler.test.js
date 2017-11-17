const chai = require('chai');
const cartEventHandler = require('../src/cart-event-handler');
const cart = require('../src/cart-func');

chai.should();


describe('Cart Event handler', function () {

  describe('#handle()', function () {
    it('should return cart with one jewel when handling event JewelAdded ', function () {
      const repository = {};
      const event = {
        type: cart.EVENT_TYPES.JEWEL_ADDED,
        data: {
          id: 'foo'
        }
      }
      cartEventHandler.handle(event, repository);

      repository.cartDescription.should.deep.equal({
        cart: [{ id: 'foo' }]
      });
    })

    it('should return empty cart when handling event JewelRemoved given Cart with one jewel ', function () {
      const event = {
        type: cart.EVENT_TYPES.JEWEL_REMOVED,
        data: {
          id: 'foo'
        }
      };
      const repository = [];
      const history = [{
        type: cart.EVENT_TYPES.JEWEL_ADDED,
        data: {
          id: 'foo'
        }
      }];

      cartEventHandler.handle(event, repository, history );

      repository.cartDescription.should.deep.equal({
        cart: []
      })
    })
  })
})
