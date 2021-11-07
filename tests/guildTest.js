const { Builder, By, Key, until } = require('selenium-webdriver');
const { SeleniumServer } = require('selenium-webdriver/remote');
const { navigatePage } = require('../util/util');
const assert = require('assert');

var runGuildTests = async function(driver) {
  describe('Guild page tests in guildTest.js', function() {
    this.timeout(10000);
    beforeEach(function () {
      navigatePage(driver, 'http://localhost:8080/groups/myGuilds');
    });
    it('Testing my guilds page - filters', function() {
      assert.equal(1, 1);
    });
  })
};

module.exports = {
  runGuildTests: runGuildTests
}