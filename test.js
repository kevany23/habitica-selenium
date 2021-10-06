const {Builder, By, Key, until} = require('selenium-webdriver');
const { SeleniumServer } = require('selenium-webdriver/remote');
const assert = require('assert');

describe("Testing With Selenium", async function() {
  it('should return -1 when the value is not present', function() {
    console.log("Mocha should be loaded");
    assert.equal([1, 2, 3].indexOf(4), -1);
  });
  (async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
      await driver.get('http://localhost:8080/login');
    } finally {
      //await driver.quit();
      try {
        let usernameInput = await driver.findElement(By.id("usernameInput"));
        let result = usernameInput.sendKeys("seleniumTester");
        let passwordInput = await driver.findElement(By.id("passwordInput"));
        result = passwordInput.sendKeys("dropper_123");
        //console.log(result);
        let loginButton = await driver.findElement(By.css('button'));
        loginButton.click();
        assert.equal([1, 2, 3].indexOf(0), -1);
        it('should return -1 when the value is not present gg', function() {
          console.log("Mocha should be loaded inside selenium");
          assert.equal([1, 2, 3].indexOf(4), -1);
        });
        describe('Selenium Test 1', function() {
          it('should return -1 when the value is not present', function() {
            console.log("Mocha should be loaded inside selenium");
            assert.equal([1, 2, 3].indexOf(4), -1);
          });
        });
      }
      catch(err) {
        console.log("ERROR IN TESTING");
        console.log(err);
      }
    }
  })();
});

describe('#indexOf()', function() {
  
});
