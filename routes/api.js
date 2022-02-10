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
    convertedHandle["input"] = input;
    convertedHandle["initUnit"] = initUnit;
    res.json(convertedHandle);
  });
};
