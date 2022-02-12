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
    let units = [
      "gal",
      "l",
      "mi",
      "km",
      "lbs",
      "kg",
      "GAL",
      "L",
      "MI",
      "KM",
      "LBS",
      "KG",
    ];
    if (!units.includes(result)) {
      return "invalid unit";
    }

    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    switch (initUnit) {
      case "GAL":
      case "gal":
        result = "l";
        break;
      case "L":
      case "l":
        result = "gal";
        break;
      case "MI":
      case "mi":
        result = "km";
        break;
      case "KM":
      case "km":
        result = "mi";
        break;
      case "LBs":
      case "lbs":
        result = "kg";
        break;
      case "KG":
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
        result = "gallon(s)";
        break;
      case "l":
        result = "litre(s)";
        break;
      case "mi":
        result = "mile(s)";
        break;
      case "km":
        result = "kilometre(s)";
        break;
      case "lbs":
        result = "pound(s)";
        break;
      case "kg":
        result = "kilogram(s)";
        break;
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
    let result;
    result = `${initNum} ${this.spellOutUnit(
      initUnit,
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
}

module.exports = ConvertHandler;
