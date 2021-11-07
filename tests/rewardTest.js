const { Builder, By, Key, until } = require('selenium-webdriver');
const { SeleniumServer } = require('selenium-webdriver/remote');
const { navigatePage } = require('../util/util');
const assert = require('assert');

var runRewardTests = async function(driver) {
  describe('Now Running tests on rewardTest.js', function() {
    this.timeout(10000);
    beforeEach(function () {
      navigatePage(driver, 'http://localhost:8080/');
    });
    it('Navigating back to Task Page', async function(){
      await driver.get('http://localhost:8080/');
    });
    it('Reward tests', async function() {
      // Get amount of gold
      let goldElem = await driver.findElement(
        By.className("item-with-icon gold"),
        By.xpath("//div[@class='item-with-icon gold']//descendant::span")
      );
      let initialGold = Number(await goldElem.getText());

      // Click Reward
      let customReward = await driver.findElement(
        By.xpath(
          "//div[contains(@class, 'task-reward-control-bg')]"
        )
      );
      await customReward.click();

      // Recheck gold
      goldElem = await driver.findElement(
        By.className("item-with-icon gold"),
        By.xpath("//div[@class='item-with-icon gold']//descendant::span")
      );
      let currGold = Number(await goldElem.getText());
      assert.equal(currGold, initialGold - 12);
    });
  });
};

module.exports = {
  runRewardTests: runRewardTests
}