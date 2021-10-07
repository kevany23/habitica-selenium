const { Builder, By, Key, until } = require('selenium-webdriver');
const { SeleniumServer } = require('selenium-webdriver/remote');
const assert = require('assert');

var driver;

var runTaskTests = function() {
  return 1;
}
describe("Checking Task Page", async function() {
  it('Another File With Test Cases', function() {
    assert.equal([1, 2, 3].indexOf(1), 2);
  });
});

module.exports = {
  runTaskTests: runTaskTests
}