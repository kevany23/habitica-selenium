const { Builder, By, Key, until } = require('selenium-webdriver');
const { SeleniumServer } = require('selenium-webdriver/remote');
const assert = require('assert');
const { runTaskTests } = require('./tests/taskTest.js');
const { runInventoryTests } = require('./tests/inventoryTest.js');
const { runRewardTests } = require('./tests/rewardTest.js');
const { runTavernTests } = require('./tests/tavernTest.js');


describe("Running Selenium Testing", async function () {
  it('Loading Selenium Webdriver and logging in', async function () {
    this.timeout(100000);
    let driver = await new Builder().forBrowser('chrome').build();
    try {
      await driver.get('http://localhost:8080/login');
    } finally {
      try {
        // Login Here
        let usernameInput = await driver.findElement(By.id("usernameInput"));
        usernameInput.sendKeys("seleniumTester");
        let passwordInput = await driver.findElement(By.id("passwordInput"));
        passwordInput.sendKeys("dropper_123");
        let loginButton = await driver.findElement(By.css('button'));
        loginButton.click();

        // Wait for driver to load page
        await driver.wait(until.titleIs('Tasks | Habitica'));
        describe('Testing that login worked correctly', function() {
          it('Url should be the home page now', async function() {
            let currUrl = await driver.getCurrentUrl();
            assert.equal(currUrl, "http://localhost:8080/", "Correct Site");
          })
        });
        runTaskTests(driver);
        runInventoryTests(driver);
        runRewardTests(driver);
        runTavernTests(driver);
      }
      catch (err) {
        console.log("ERROR IN TESTING");
        console.log(err);
      }
    }
  });
}
);