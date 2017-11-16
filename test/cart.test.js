const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const Cart = require('../src/cart').Cart;

chai.use(sinonChai);
chai.should();

const FAKE_TIME = new Date('2017/10/12');

describe.skip('OldCart', function () {

    beforeEach(function () {
        this.clock = sinon.useFakeTimers(FAKE_TIME);
    });

    afterEach(function () {
        this.clock.restore();
    });

    describe('#submit()', function () {
        it('should emit event', function () {
            // given
            const publisher = [];
            const cart = new Cart({ publisher });

            // when
            cart.submit();

            // then
            publisher.should.deep.equal([{
                type: Cart.EVENT_TYPES.CART_SUBMITTED,
                submitAt: FAKE_TIME
            }]);
        });

        it('should not emit event when already submitted', function () {
            // given
            const publisher = [];
            const cart = new Cart({
                publisher,
                history: [{
                    type: Cart.EVENT_TYPES.CART_SUBMITTED,
                    submitAt: FAKE_TIME
                }]
            });

            // when
            cart.submit();

            // then
            publisher.should.be.empty;
        });
    });

    describe('#add()', function () {
        it('should emit event', function () {
            // given
            const publisher = [];
            const cart = new Cart({ publisher });

            // when
            cart.add({data: 'some jewel data'});

            // then
            publisher.should.deep.equal([{
                type: Cart.EVENT_TYPES.JEWEL_ADDED,
                submitAt: FAKE_TIME,
                data: 'some jewel data'
            }]);
        });
    });
});