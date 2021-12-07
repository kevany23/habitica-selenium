const { Builder, By, Key, until } = require('selenium-webdriver');
const { SeleniumServer } = require('selenium-webdriver/remote');
const { waitFunction, getUrl, navigatePage } = require('../util/util');
const assert = require('assert');

var runPlayerClassTests = async function(driver) {
  describe('Running tests on tavern chat', function() {
    this.timeout(10000);
    beforeEach(async function() {
      navigatePage(driver, getUrl('user/settings/site'));
      await waitFunction(2000);
    })
    it('Testing Different Classes', async function() {
      
      
    })
  })
};

module.exports = {
  runPlayerClassTests: runPlayerClassTests
}