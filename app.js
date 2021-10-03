const {Builder, By, Key, until} = require('selenium-webdriver');
const { SeleniumServer } = require('selenium-webdriver/remote');

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
      console.log(result);
      let loginButton = await driver.findElement(By.css('button'));
      loginButton.click();
    }
    catch(err) {
      console.log("ERROR IN TESTING");
      console.log(err);
    }
  }
})();