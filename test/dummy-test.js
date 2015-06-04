/*jshint expr: true*/

"use strict";

//noinspection JSUnresolvedVariable
var chai = require("chai"),
    expect = chai.expect,
    should = require("mocha-should");

describe("Dummy test", function() {
  should("Run test", function() {
    expect(1).to.equal(1);
  });
});