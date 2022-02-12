const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  test("Convert 10L (valid input)", function () {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "10L" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, "L");
        assert.approximately(res.body.returnNum, 2.64172, 0.1);
        assert.equal(res.body.returnUnit, "gal");
      });
  });

  test("Convert 3/7.2/4kg (invalid number)", function () {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "3/7.2/4kg" })
      .end(function (err, res) {
        assert.equal(res.body, "invalid number");
      });
  });
  test("Convert 10L (valid input)", function () {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "10L" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, "L");
        assert.approximately(res.body.returnNum, 2.64172, 0.1);
        assert.equal(res.body.returnUnit, "gal");
      });
  });
  test("Convert 3/7.2/4kilmegagram (invalid number and unit)", function () {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "3/7.2/4kilomegagram" })
      .end(function (err, res) {
        assert.equal(res.body, "invalid number and unit");
      });
  });
  test("Convert kg (no number)", function () {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "kg" })
      .end(function (err, res) {
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, "kg");
      });
  });
});
