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
        this.skip()
    })
    test('L to Gal', function(done) {
        var input = [5, 'L'];
        var expected = 1.32086;
        assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
        done();
      });
      test('Check each unit for a return', function(done){
          const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
          const expect = ['l', 'gal', 'km', 'mi', 'kg', 'lbs'];
          input.forEach(function(element, i){
              assert.equal(convertHandler.getReturnUnit(element), expect[i])
          })
          done();
      })

});