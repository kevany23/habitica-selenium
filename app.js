const {Builder, By, Key, until} = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://localhost:8080');
  } finally {
    //await driver.quit();
    console.log("Connected");
  }
})();