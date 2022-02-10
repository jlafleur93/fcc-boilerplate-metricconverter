const res = require("express/lib/response");

const regEx = /[a-z]+|[^a-z]+/gi;
function ConvertHandler() {
  const units = ["gal", "L", "km", "mi", "lbs", "kg"];
  this.getNum = function (input) {
    console.log(`getNum`,input)
    let result = "";
    if(input.length === 1){
      result = input.match(regEx)[0];
    }
    result = "1"
    console.log(result)

    return result;
  };

  this.getUnit = function (input) {
    let result;
    if(input.length === 0){
      result = input.match(regEx)[1];
      
    }
    result = input.match(regEx)[0]
    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    switch (initUnit) {
      case "gal":
        result = "L";
        break;
      case "L":
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
      case "L":
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
    const number = Number(initNum)
    let result;
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    switch(initUnit){
      case "gal":
        result = number * galToL
        break;
      case "lbs":
        result = number * lbsToKg
        break;
      case "mi":
        result = number * miToKm
        break;
      case "km": 
      result = number / miToKm
      break;
      case "kg":
      result = number /lbsToKg; 
      break;
      case "L": 
      result = number / galToL
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

module.exports = ConvertHandler;
