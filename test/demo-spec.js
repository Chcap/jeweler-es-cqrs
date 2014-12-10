var chai = require('chai');
var Demo = require('../src/demo').Demo;

chai.should();
describe('Demo', function() {
    describe('#test()', function(){
        it('should return 42', function(){
            var demo = new Demo();
            demo.test().should.equal(42);
        })
    });

    describe('#anotherTest()', function(){
        it('should return 0 with positive input', function(){
            var demo = new Demo();
            demo.anotherTest(12).should.equal(0);
        })
    });
});