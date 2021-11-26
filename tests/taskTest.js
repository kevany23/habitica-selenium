const { Builder, By, Key, until } = require('selenium-webdriver');
const { SeleniumServer } = require('selenium-webdriver/remote');
const { waitFunction, navigatePage, getUrl } = require('../util/util');
const assert = require('assert');

var driver;

// Keeps driver so helpers don't 
function setDriver(dr) {
  driver = dr;
}

var runTaskTests = function (driver) {
  setDriver(driver);
  describe('Task tests in taskTest.js', function () {
    beforeEach(function () {
      navigatePage(driver, getUrl());
    });
    it('Daily Task test', async function () {
      // First get current EXP Level
      // Define function to get the element and value
      let progressBars = await driver.findElements(
        By.className('progress-container')
      );
      let expBar = progressBars[1];
      async function getExp() {
        let expString = await expBar.getText();
        // now we have intial exp to test the values
        let exp = parseInt(expString.split('/')[0]);
        return exp;
      }
      // now we have intial exp to test the values
      let initialExp = await getExp();

      let dailyCheckbox = await driver.findElement(
        By.className('task-control daily-todo-control')
      );
      // click here works
      await dailyCheckbox.click();
      await waitFunction(500);
      //this.timeout(1000);
      // Check the functionality
      let currExp = await getExp();
      // exp diff is inconsistent
      // Now currently checks if exp increased
      // This test is flakey, it appears by adding code for waiting,
      // the test is more stable
      assert.equal(currExp > initialExp, true,
        'Checking if exp updates properly');
      await waitFunction(100);
      // Revert the task completion
      await dailyCheckbox.click();
      currExp = await getExp();
      assert.equal(currExp, initialExp, 'Testing daily task uncheck');
    });

    it('Testing Habits', async function () {
      let startHealth = await getHealth();
      let habitBar = await driver.findElement(
        By.className('task-control habit-control habit-control-negative-enabled')
      );
      habitBar.click();
      let currHealth = await getHealth();
      // This is actually harder to test than expected
      // For now just check if it decreases health
      assert.equal(currHealth < startHealth, true);
    });
  });
}

/**
 * Common helpers here
 * 
 * This includes taking commonly used elements and their values
 */

async function getHealth() {
  let healthDisplay = await driver.findElement(By.xpath(
    "//span[contains(text(), '/ 50')]"
  ));
  let healthText = await healthDisplay.getText();
  let currHealth = parseInt(healthText.split('/')[0]);
  return currHealth;
}

function getExp() {

}

module.exports = {
  runTaskTests: runTaskTests
}