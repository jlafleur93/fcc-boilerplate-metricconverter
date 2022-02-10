const regEx = /[a-z]+|[^a-z]+/gi;
function ConvertHandler() {
  const units = ["gal", "L", "km", "mi", "lbs", "kg"];
  this.getNum = function (input) {
    let result = "";
    result = input.match(regEx)[0];
    return result;
  };

  this.getUnit = function (input) {
    let result;
    result = input.match(regEx)[1];
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

    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;

    return result;
  };
}

module.exports = ConvertHandler;
