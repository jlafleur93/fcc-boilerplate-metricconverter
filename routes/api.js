"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  const convertHandler = new ConvertHandler();
  app.route("/api/convert").get(function (req, res) {
    let convertedHandle = {};
    let input = req.query.input;
    let getNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    let retUnit = convertHandler.getReturnUnit(initUnit);
    let spellUnit = convertHandler.spellOutUnit(initUnit);
    let convertedUnit = convertHandler.convert(getNum, initUnit)
    convertedHandle["input"] = input;
    convertedHandle["initUnit"] = initUnit;
    convertedHandle["returnUnit"] = retUnit;
    convertedHandle["spellUnit"] = spellUnit;
    convertedHandle["convertUnit"] = convertedUnit

    res.json(convertedHandle);
  }); 
};
