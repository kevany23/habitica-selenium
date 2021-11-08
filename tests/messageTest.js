const { Builder, By, Key, until } = require('selenium-webdriver');
const { SeleniumServer } = require('selenium-webdriver/remote');
const { navigatePage, waitFunction, generateMessage } = require('../util/util');
const assert = require('assert');

var runMessageTests = async function(driver) {
  describe('Private Message Tests in messageTest.js', function() {
    this.timeout(10000);
    beforeEach(async function () {
      navigatePage(driver, 'http://localhost:8080/private-messages');
      await waitFunction(3000);
    });
    it('Send Message Test', async function() {
      // Use self messages
      let conversation = await driver.findElement(
        By.xpath(
        "//div[contains(text(), 'seleniumTester')]/ancestor::div[@class='conversation']"
      ));
      await conversation.click();
    });
  })
};

module.exports = {
  runMessageTests: runMessageTests
}