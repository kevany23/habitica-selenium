const { Builder, By, Key, until, WebDriver, Origin } = require('selenium-webdriver');
const { SeleniumServer } = require('selenium-webdriver/remote');
const { waitFunction, scrollToElement, clickByLocation } = require('../util/util');
const assert = require('assert');

// Use dependencies to determine ordering
const { runTaskTests } = require('./taskTest.js');

var runInventoryTests = async function(driver) {
  describe('Running tests in inventory page', function() {
    this.timeout(100000);
    it('Loading equipment page', async function() {
      await driver.get('http://localhost:8080/inventory/equipment');
      let currUrl = await driver.getCurrentUrl();
      assert.equal(currUrl, 'http://localhost:8080/inventory/equipment', 'URL test');
    });
    it('Testing inventory/equipment functionality with Sword', async function() {

      // Profile Div
      let profile = await driver.findElement(
        By.className('avatar background_blue')
      );
      await profile.click();
      let statsTab = await driver.findElement(
        By.xpath("//div[contains(text(), 'Stats')]")
      );
      await statsTab.click();
      let strengthElement = await driver.findElement(
        By.xpath(
          "//div[@class='stat-title str']/following-sibling::strong[@class='number']"
        )
      );
      let equipStrength = await strengthElement.getText();
      equipStrength = parseInt(equipStrength)
      await driver.actions().sendKeys(Key.ESCAPE).perform();
      // Account is initially wielding sword
      // item-content shop_weapon_warrior_1
      let swordElement = await driver.findElement(
        By.xpath(
          "//span[@class='item-content shop_weapon_warrior_1']" +
          "/ancestor::div[@class='item transition']"
        )
      );
      await swordElement.click();

      // Unequip
      let unequip = await driver.findElement(
        By.xpath(
          "//span[contains(text(), 'Unequip')]" +
          "/ancestor::button[@class='btn with-icon mt-4 btn-secondary']"
        )
      );
      await unequip.click();
      
      // Check stats again
      await profile.click();
      statsTab = await driver.findElement(
        By.xpath("//div[contains(text(), 'Stats')]")
      );
      await statsTab.click();
      strengthElement = await driver.findElement(
        By.xpath(
          "//div[@class='stat-title str']/following-sibling::strong[@class='number']"
        )
      );
      let currStrength = await strengthElement.getText();
      currStrength = parseInt(currStrength);
      // Finally, we make the strength test assertion here
      assert.equal(currStrength, equipStrength - 4);
      await driver.actions().sendKeys(Key.ESCAPE).perform();

      // re-equip sword
      swordElement = await driver.findElement(
        By.xpath(
          "//span[@class='item-content shop_weapon_warrior_1']" +
          "/ancestor::div[@class='item transition']"
        )
      );
      await swordElement.click();
      let equipBtn = await driver.findElement(
        By.xpath(
          "//span[contains(text(), 'Equip')]" +
          "/ancestor::button[@class='btn with-icon mt-4 btn-primary']"
        )
      );
      await equipBtn.click();
    });
    it('Testing equpping with armor', async function() {
      // Leather armor is unequipped initially
      // Check stats first
      
      let profile = await driver.findElement(
        By.className('avatar background_blue')
      );
      await profile.click();
      let statsTab = await driver.findElement(
        By.xpath("//div[contains(text(), 'Stats')]")
      );
      await statsTab.click();
      let consElement = await driver.findElement(
        By.xpath(
          "//div[@class='stat-title con']/following-sibling::strong[@class='number']"
        )
      );
      let initialCons = await consElement.getText();
      initialCons = parseInt(initialCons)
      await driver.actions().sendKeys(Key.ESCAPE).perform();
      await waitFunction(200);
      // Equip armor
      let armorElement = await driver.findElement(
        By.xpath(
          "//span[@class='item-content shop_armor_warrior_1']"
        )
      );
      // for some reason this element is very hard to click properly
      scrollToElement(driver, armorElement);
      let rect = await armorElement.getRect();
      /*await driver.actions().move({
        origin: armorElement,
        x: rect.width / 2,
        y: rect.height / 2
      }).click().perform();*/
      clickByLocation(driver, armorElement);
      
      // and we finally have the element clicked

      
      

    })
  })
};

module.exports = {
  runInventoryTests: runInventoryTests
}