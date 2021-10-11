const { Builder, By, Key, until } = require('selenium-webdriver');
const { SeleniumServer } = require('selenium-webdriver/remote');
const assert = require('assert');

var runInventoryTests = async function(driver) {
  describe('Running tests in inventory page', function() {
    this.timeout(100000);
    it('Loading equipment page', async function() {
      await driver.get('http://localhost:8080/inventory/equipment');
      let currUrl = await driver.getCurrentUrl();
      assert.equal(currUrl, 'http://localhost:8080/inventory/equipment', 'URL test');
    })
    it('Testing inventory/equipment functionality', async function() {
      // Account is initially wielding sword
      // item-content shop_weapon_warrior_1
      let swordElement = await driver.findElement(
        By.className('item-content shop_weapon_warrior_1')
      );
      swordElement.click();

    })
  })
};

module.exports = {
  runInventoryTests: runInventoryTests
}