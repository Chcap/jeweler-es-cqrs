const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const cart = require('../src/cart-func');

chai.use(sinonChai);
chai.should();

const FAKE_TIME = new Date('2017/10/12');

describe('Cart-func', function () {

  beforeEach(function () {
    this.clock = sinon.useFakeTimers(FAKE_TIME);
  });

  afterEach(function () {
    this.clock.restore();
  });

  describe('#submit()', function () {
    it('should emit submitted event when cart is not empty', function () {
      // given

      // when
      const result = cart.submit([{ type: cart.EVENT_TYPES.JEWEL_ADDED }]);

      // then
      result.should.deep.equal([{
        type: cart.EVENT_TYPES.CART_SUBMITTED,
        submitAt: FAKE_TIME
      }]);
    });

    it('should not emit event when already submitted', function () {
      // given

      // when
      const result = cart.submit([{
        type: cart.EVENT_TYPES.CART_SUBMITTED,
        submitAt: FAKE_TIME
      }]);

      // then
      result.should.be.empty;
    });

    it('should not emit event when submitting twice', function () {
      // given

      // when
      const firstResult = cart.submit();
      const secondResult = cart.submit(firstResult)

      // then
      secondResult.should.be.empty;
    });

    it('should not emit event when cart is empty', function () {
      // given

      // when
      const result = cart.submit();

      // then
      result.should.be.empty;
    });

    it('should not submit when add two jewels and remove two jewels', function () {
      // given

      // when
      const history = cart.builder().add({}).submit().history

      // then
      history.should.deep.equal([{
        type: cart.EVENT_TYPES.CART_SUBMITTED,
        submitAt: FAKE_TIME
      }]);
    });
  });

  describe('#add()', function () {
    it('should emit event', function () {
      // given

      // when
      const result = cart.add({ data: 'some jewel data' });

      // then
      result.should.deep.equal([{
        type: cart.EVENT_TYPES.JEWEL_ADDED,
        submitAt: FAKE_TIME,
        data: 'some jewel data'
      }]);

    });
  });
});
