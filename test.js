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
        let result = usernameInput.sendKeys("seleniumTester");
        let passwordInput = await driver.findElement(By.id("passwordInput"));
        result = passwordInput.sendKeys("dropper_123");
        //console.log(result);
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
        let t1 = await runTaskTests(driver);
        // For some reason if I just call runInventoryTests(),
        // it loads the pages before task tests finish
        describe('Inventory Test', function() {
          it('Calling Inventory Tests', async function() {
            runInventoryTests(driver);
          })
        });
        
        describe('Reward Tests', function() {
          it('Calling Reward Tests', async function() {
            runRewardTests(driver);
          })
        });

        describe('Tavern Tests', function() {
          it('Calling Tavern Tests', async function() {
            runTavernTests(driver);
          })
        });
      }
      catch (err) {
        console.log("ERROR IN TESTING");
        console.log(err);
      }
    }
  });
}
);