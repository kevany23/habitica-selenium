const { Builder, By, Key, until } = require('selenium-webdriver');
const { SeleniumServer } = require('selenium-webdriver/remote');
const assert = require('assert');

var runTaskTests = function(driver) {
  describe('Now Running tests on taskTest.js', function() {
    it('Example test', async function() {
      assert.equal(1, 1);
      let debugButton = await driver.findElement(By.xpath(
        "//button[contains(text(), 'Toggle Debug Menu')]"
      ));
      await debugButton.click();
      let debugGroup = await driver.findElement(
        By.className('debug-group')
      );
      let health1Button = await driver.findElement(By.xpath(
        "//a[contains(text(), 'Health = 1')]"
      ));
      await health1Button.click();
      let healButton = await driver.findElement(By.xpath(
        "//a[contains(text(), '+ 10HP')]"
      ));
      for (let i = 0; i < 5; i++) {
        await healButton.click();
      }
      // Should find health display div first
      // Check health here
      let healthDisplay = await driver.findElement(By.xpath(
        "//span[contains(text(), '/ 50')]"
      ));
      let healthText = await healthDisplay.getText();
      let currHealth = parseInt(healthText.split('/')[0]);
      describe('Testing health value', function() {
        it('Should be 51 HP', function() {
          assert.equal(currHealth, 51);
        })
      });
    });
  });
  return 1;
}

module.exports = {
  runTaskTests: runTaskTests
}