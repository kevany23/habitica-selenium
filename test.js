const { Builder, By, Key, until } = require('selenium-webdriver');
const { SeleniumServer } = require('selenium-webdriver/remote');
const assert = require('assert');
const { runTaskTests } = require('./tests/taskTest.js');


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
        runTaskTests(driver);
        describe('Example Test Case', function () {
          it('Test Case 1', function () {
            assert.equal([1, 2, 3].indexOf(1), 0);
          });
          it('Text Case 2', function () {
            assert.equal([1, 2, 3].indexOf(4), -1);
          });
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