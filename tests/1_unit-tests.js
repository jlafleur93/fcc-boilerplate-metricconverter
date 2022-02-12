const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("should read a whole number correctly", function () {
    assert.equal(32, convertHandler.getNum("32L"));
  });
  test("Should read a decimal number", function () {
    assert.equal(0.01, convertHandler.getNum("0.01l"));
  });
  test("Should read a fractional input", function (done) {
    const input = "6/4mi";
    assert.equal(convertHandler.getNum(input), 1.5);
    done();
  });
  test("Should read a fractional input w/ a decimal", function (done) {
    const input = "6.2/4mi";
    assert.equal(convertHandler.getNum(input), 1.55);
    done();
  });
  test("Should return an error on a double fraction", function () {
    assert.equal(convertHandler.getNum("3/2/3"), "invalid number");
  });
  test("L to Gal", function (done) {
    var input = [5, "L"];
    var expected = 1.32086;
    assert.approximately(
      convertHandler.convert(input[0], input[1]),
      expected,
      0.1,
    ); //0.1 tolerance
    done();
  });
  test("Check each unit for a return", function () {
    const input = ["gal", "l", "mi", "km", "lbs", "kg"];
    const expect = ["l", "gal", "km", "mi", "kg", "lbs"];
    input.forEach(function (element, i) {
      assert.equal(convertHandler.getReturnUnit(element), expect[i]);
    });
  });
  test("Invalid unit gives back a string", function () {
    let input = "horse";
    let expect = "invalid unit";
    assert.equal(convertHandler.getUnit(32 + input), expect);
  });
  test("check if each unit is spelt out correctly", function () {
    let input = ["gal", "l", "mi", "km", "lbs", "kg"];
    let expect = [
      "gallon(s)",
      "litre(s)",
      "mile(s)",
      "kilometre(s)",
      "pound(s)",
      "kilogram(s)",
    ];
    input.forEach(function (ele, i) {
      assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
    });
  });
  test("No Numerical Input", function () {
    const input = "kg";
    assert.equal(convertHandler.getNum(input), 1);
  });
  test("error on wrong input", function () {
    const input = "grub";
    assert.equal(convertHandler.getUnit(input), "invalid unit");
  });
  test("Correctly converts gal to L", function () {
    assert.equal(convertHandler.convert(1, "gal"), 3.78541);
  });
  test("correctly converts L to gal", function () {
    assert.equal(convertHandler.convert(1, "L"), 0.26417);
  });
  test("correctly converts mi to km", function () {
    assert.equal(convertHandler.convert(1, "mi"), 1.60934);
  });
  test("correctly converts km to mi", function () {
    assert.equal(convertHandler.convert(1, "km"), 0.62137);
  });
  test("correctly converts lbs to kg", function () {
    assert.equal(convertHandler.convert(1, "lbs"), 0.45359);
  });
  test("correctly converts kg to lbs", function () {
    assert.equal(convertHandler.convert(1, "kg"), 2.20462);
  });
});
