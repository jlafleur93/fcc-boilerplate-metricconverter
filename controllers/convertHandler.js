const res = require("express/lib/response");

function ConvertHandler() {
  const regEx = /[a-z]+|[^a-z]+/gi;
  const units = ["gal", "l", "km", "mi", "lbs", "kg"];
  const findNum =  /\d+/g;
  this.getNum = function (input) {
    let result = "";
    const fractionStrToDecimal = str => str.split('/').reduce((p, c) => p / c);
    if(input.match(findNum)){
      const numResult = fractionStrToDecimal(input.match(regEx)[0])
      result = numResult
      return result;

    }
    result = "1"
    return result;
  };

  this.getUnit = function (input) {
    let result;
    const findUnit = input.match(regEx)[1]
    result = findUnit
    return result
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    switch (initUnit) {
      case "gal":
        result = "l";
        break;
      case "l":
        result = "gal";
        break;
      case "mi":
        result = "km";
        break;
      case "km":
        result = "mi";
        break;
      case "lbs":
        result = "kg";
        break;
      case "kg":
        result = "lbs";
        break;
    }
    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;
    switch (unit) {
      case "gal":
        result = "galons";
        break;
      case "l":
        result = "liters";
        break;
      case "mi":
        result = "miles";
        break;
      case "km":
        result = "kilometers";
        break;
      case "lbs":
        result = "pounds";
        break;
      case "kg":
        result = "kilograms";
        break;
    }

    return result;
  };

  this.convert = function (initNum, initUnit) {
    const strConv = initUnit.toLowerCase()
    let result;
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    switch(strConv){
      case "gal":
        result = parseFloat((initNum * galToL).toFixed(5))
        break;
      case "lbs":
        result = parseFloat((initNum * lbsToKg).toFixed(5))
        break;
      case "mi":
        result = parseFloat((initNum * miToKm).toFixed(5))
        break;
      case "km": 
      result = parseFloat((initNum / miToKm).toFixed(5))
      break;
      case "kg":
      result = parseFloat((initNum /lbsToKg).toFixed(5)); 
      break;
      case "l": 
      result = parseFloat((initNum / galToL).toFixed(5))
      break;
    }

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
    return result;
  };
}
let convert = new ConvertHandler()
console.log(convert.getReturnUnit("kg"));
module.exports = ConvertHandler;
