const { Builder, By, Key, until, WebDriver, Origin } = require('selenium-webdriver');
const { SeleniumServer } = require('selenium-webdriver/remote');
const { waitFunction, scrollToElement, clickByLocation, navigatePage, getUrl } = require('../util/util.js');
const { expandInventory, hideSkillPanel, deletePanel } = require('../util/common.js')
const assert = require('assert');

/**
 * Tests some inventory page functionality
 * 
 * Setup Required:
 * Must have leather armor and sword
 * Must be warrior class
 * 
 * Note: some of the events and interactions here are flakier than
 * a lot of other tests
 */

var runInventoryTests = async function(driver) {
  describe('Inventory page tests in inventoryTest.js', function() {
    this.timeout(15000);
    beforeEach(async function () {
      navigatePage(driver, getUrl('inventory/equipment'));
      await waitFunction(2000)
    });
    it('Testing inventory/equipment functionality with Sword', async function() {
      // let page finish loading to avoid flakiness
      await waitFunction(1600);
      deletePanel(driver);
      // expand all item lists
      await expandInventory(driver);
      // Profile Div
      let profile = await driver.findElement(
        By.className('avatar background_violet')
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
      // Make sure character is warrior class
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
        By.className('avatar background_violet')
      );
      await clickByLocation(driver, profile);
      await waitFunction(500);
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
      await waitFunction(800);
      // Equip armor
      let armorElement = await driver.findElement(
        By.xpath(
          "//span[@class='item-content shop_armor_warrior_1']"
        )
      );
      // for some reason this element is very hard to click properly
      scrollToElement(driver, armorElement);
      clickByLocation(driver, armorElement);
      await waitFunction(400);
      // now we finally have the element clicked
      let equipBtn = await driver.findElement(
        By.xpath(
          "//span[contains(text(), 'Equip')]" +
          "/ancestor::button[@class='btn with-icon mt-4 btn-primary']"
        )
      );
      await equipBtn.click();
      await driver.actions().sendKeys(Key.ESCAPE).perform();
      
      profile = await driver.findElement(
        By.className('avatar background_violet')
      );
      await profile.click();
      statsTab = await driver.findElement(
        By.xpath("//div[contains(text(), 'Stats')]")
      );
      await statsTab.click();
      consElement = await driver.findElement(
        By.xpath(
          "//div[@class='stat-title con']/following-sibling::strong[@class='number']"
        )
      );
      let currCons = await consElement.getText();
      await driver.actions().sendKeys(Key.ESCAPE).perform();
      assert.equal(currCons, initialCons + 4);

      // We finish by unequiping the leather armor
      scrollToElement(driver, armorElement);
      clickByLocation(driver, armorElement);
      await waitFunction(400);
      let unequipBtn = await driver.findElement(
        By.xpath(
          "//span[contains(text(), 'Unequip')]" +
          "/parent::button[@class='btn with-icon mt-4 btn-secondary']"
        )
      );
      await unequipBtn.click();
      await waitFunction(400);
      
    })
  })
};

module.exports = {
  runInventoryTests: runInventoryTests
}