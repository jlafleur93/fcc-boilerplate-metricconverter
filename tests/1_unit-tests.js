const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test('should read a whole number correctly', function(){
        assert.equal(32, convertHandler.getNum("32L"))
    })
    test('Should read a decimal number', function(){
        assert.equal(0.01, convertHandler.getNum("0.01"))
    })
    test('Should read a fractional input', function(){
        assert.equal(1/2, convertHandler.getNum("1/2"))
    })
    test('Should return an error on a double fraction', function(){
        assert.fail(3/2/3, convertHandler.getNum("3/2/3"))
    })

});