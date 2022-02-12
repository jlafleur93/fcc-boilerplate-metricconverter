"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  const convertHandler = new ConvertHandler();
  app.route("/api/convert").get(function (req, res) {
    let input = req.query.input;
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    let retUnit = convertHandler.getReturnUnit(initUnit);
    let convertedUnit = convertHandler.convert(initNum, initUnit);
    let getString = convertHandler.getString(
      initNum,
      initUnit,
      convertedUnit,
      retUnit,
    );
    let convertedHandle = {};
    convertedHandle["initNum"] = initNum;
    convertedHandle["initUnit"] = initUnit;
    convertedHandle["returnUnit"] = retUnit;
    convertedHandle["returnNum"] = convertedUnit;
    convertedHandle["string"] = getString;
    if (initNum === "invalid number" && initUnit === "invalid unit") {
      res.json("invalid number and unit");
    } else if (initNum === "invalid number" && initUnit !== "invalid unit") {
      res.json("invalid number");
    } else if (initUnit === "invalid unit" && initNum !== "invalid number") {
      res.json("invalid unit");
    }

    res.json(convertedHandle);
  });
};
