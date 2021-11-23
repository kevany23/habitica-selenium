const { Builder, By, Key, until } = require('selenium-webdriver');
const { SeleniumServer } = require('selenium-webdriver/remote');
const { Options } = require('selenium-webdriver/chrome');
const assert = require('assert');
const { LOGIN } = require('./config/config.js');
const { getUrl, waitFunction } = require('./util/util.js');
const { runTaskTests } = require('./tests/taskTest.js');
const { runInventoryTests } = require('./tests/inventoryTest.js');
const { runRewardTests } = require('./tests/rewardTest.js');
const { runTavernTests } = require('./tests/tavernTest.js');
const { runGuildTests } = require('./tests/guildTest.js');
const { runMessageTests } = require('./tests/messageTest.js');
const { runProfileTests } = require('./tests/profileTest.js');
const { runPartyTests } = require('./tests/partyTest.js');


describe("Running Selenium Testing", async function () {
  it('Loading Selenium Webdriver and logging in', async function () {
    this.timeout(100000);
    let options = new Options();
    options.addArguments('log-level=3');
    let driver = await new Builder().forBrowser('chrome').withCapabilities(options).build();
    try {
      await driver.get(getUrl('login'));
    } finally {
      try {
        // Login Here
        await waitFunction(1000);
        let usernameInput = await driver.findElement(By.id("usernameInput"));
        usernameInput.sendKeys(LOGIN.USERNAME);
        let passwordInput = await driver.findElement(By.id("passwordInput"));
        passwordInput.sendKeys(LOGIN.PASSWORD);
        let loginButton = await driver.findElement(By.css('button'));
        loginButton.click();

        // Wait for driver to load page
        await driver.wait(until.titleIs('Tasks | Habitica'));
        let currUrl = await driver.getCurrentUrl();
        assert.equal(currUrl, getUrl(), "Login did not work");

        // Run all the tests here
        runTaskTests(driver);
        runInventoryTests(driver);
        runRewardTests(driver);
        runGuildTests(driver);
        runTavernTests(driver);
        runMessageTests(driver);
        runProfileTests(driver);
        runPartyTests(driver);
      }
      catch (err) {
        console.log("ERROR IN TESTING");
        console.log(err);
        throw new Error('Error with Selenium');
      }
    }
  });
});