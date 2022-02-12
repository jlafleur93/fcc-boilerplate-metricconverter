const res = require("express/lib/response");

function ConvertHandler() {
  const regEx = /[a-z]+|[^a-z]+/gi;

  this.getNum = function (input) {
    const findNum = /\d+/g;

    let result;

    result = input.match(regEx)[0];

    if (findNum.test(result) === false) {
      result = 1;
    }
    if (result.toString().includes("/")) {
      let newRet = result.toString().split("/");
      if (newRet.length != 2) {
        return "invalid number";
      }
      newRet[0] = parseFloat(newRet[0]);
      newRet[1] = parseFloat(newRet[1]);
      result = parseFloat((newRet[0] / newRet[1]).toFixed(5));
    }
    if (!input.match(regEx)[0] && input.match(regEx)[1]) {
      result = 1;
    }
    if (isNaN(result)) {
      return "invalid number";
    }
    return result;
  };

  this.getUnit = function (input) {
    let result;
    result = input.match(regEx)[1];
    if (!result) {
      result = input.match(regEx)[0];
    }
    switch (result) {
      case "KM":
      case "km":
        return "km";
      case "MI":
      case "mi":
        return "mi";
      case "LBs":
      case "lbs":
        return "lbs";
      case "KG":
      case "kg":
        return "kg";
      case "L":
      case "l":
        return "L";
      case "GAL":
      case "gal":
        return "gal";
      default:
        return "invalid unit";
    }
  };

  this.getReturnUnit = function (initUnit) {
    switch (initUnit.toLowerCase()) {
      case "gal":
        return "L";
      case "l":
        return "gal";
      case "mi":
        return "km";
      case "km":
        return "mi";
      case "lbs":
        return "kg";
      case "kg":
        return "lbs";
      default:
        return undefined;
    }
  };

  this.spellOutUnit = function (unit) {
    let result;
    console.log(`spellOutUnit here--`, unit);
    switch (unit) {
      case "gal":
        return "gallons";
      case "l":
        return "liters";
      case "mi":
        return "miles";
      case "km":
        return "kilometers";
      case "lbs":
        return "pounds";
      case "kg":
        return "kilograms";
    }

    return result;
  };

  this.convert = function (initNum, initUnit) {
    const strConv = initUnit.toLowerCase();
    let result;
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    switch (strConv) {
      case "gal":
        result = parseFloat((initNum * galToL).toFixed(5));
        break;
      case "lbs":
        result = parseFloat((initNum * lbsToKg).toFixed(5));
        break;
      case "mi":
        result = parseFloat((initNum * miToKm).toFixed(5));
        break;
      case "km":
        result = parseFloat((initNum / miToKm).toFixed(5));
        break;
      case "kg":
        result = parseFloat((initNum / lbsToKg).toFixed(5));
        break;
      case "l":
        result = parseFloat((initNum / galToL).toFixed(5));
        break;
    }

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    console.log("init num", initNum);
    let result;
    result = `${initNum} ${this.spellOutUnit(
      initUnit,
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
}

module.exports = ConvertHandler;
