var Demo = require('../../src/demo').Demo;
var chai = require('chai');

chai.should();
var myStepDefinitionsWrapper = function () {

    var demo;
    var result;
    this.Given(/^A demo$/, function (callback) {
        demo = new Demo();
        callback();
    });


    this.When(/^I test$/, function ( callback) {
        result = demo.test();
        callback();
    });

    this.Then(/^I should get "(\d+)"$/, function (expectedResult, callback) {
        result.should.equal(parseInt(expectedResult, 10));
        callback();
    });
};
module.exports = myStepDefinitionsWrapper;