const chai = require('chai');
const cartEventHandler = require('../src/cart-event-handler');
const cart = require('../src/cart-func');

chai.should();

describe('Cart Event handler', function () {

  describe('#handle()', function () {
    it('should return cart with one jewel when handling event JewelAdded ', function () {
      const proj = cartEventHandler.handle({
        type: cart.EVENT_TYPES.JEWEL_ADDED,
        data: {
          id: 'foo'
        }
      });

      proj.should.deep.equal({
        cart:[{id: 'foo'}]
      })
    })

    it('should return empty cart when handling event JewelRemoved given Cart with one jewel ', function () {
      const proj = cartEventHandler.handle({
        type: cart.EVENT_TYPES.JEWEL_REMOVED,
        data: {
          id: 'foo'
        }
      }, [{
        type: cart.EVENT_TYPES.JEWEL_ADDED,
        data: {
          id: 'foo'
        }
      }]);

      proj.should.deep.equal({
        cart:[]
      })
    })
  })
})
