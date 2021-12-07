const { Builder, By, Key, until } = require('selenium-webdriver');
const { deleteElement, scrollToElement } = require('./util.js');
/**
 * File for getting common elements and items
 */


/**
 * Get user's current amount of health
 */
var getHealth = async function(driver) {
  let healthDisplay = await driver.findElement(By.xpath(
    "//span[contains(text(), '/ 50')]"
  ));
  let healthText = await healthDisplay.getText();
  let currHealth = parseInt(healthText.split('/')[0]);
  return currHealth;
}

/**
 * Get user's current amount of gold
 */
var getGold = async function(driver) {
  let goldElement = await driver.findElement(
    By.xpath("//div[@class='item-with-icon gold']/descendant::span")
  );
  let amount = parseInt(await goldElement.getText());
  return amount;
}

/**
 * Get user's current amount of gems
 */
var getGems = async function(driver) {
  let gemsElement = await driver.findElement(
    By.xpath("//a[@class='top-menu-icon svg-icon gem']" +
      "/following-sibling::span")
  );
  let numGems = parseInt(await gemsElement.getText());
  return numGems;
}

var hideSkillPanel = async function(driver) {
  // check if skillPanel exists
  let panel = await driver.findElement(
    By.xpath(
      "//div[contains(text(), 'Skills')]"
    )
  );
  await panel.click();
}

var deletePanel = async function(driver) {
  deleteElement(driver, 'drawer-container');
}

var expandInventory = async function(driver) {
  let buttons = await driver.findElements(
    By.xpath("//span[contains(text(), 'Show More')]")
  );
  for (let button of buttons) {
    scrollToElement(driver, button);
    await button.click();
  }
}

module.exports = {
  getHealth: getHealth,
  getGold: getGold,
  getGems: getGems,
  hideSkillPanel: hideSkillPanel,
  expandInventory: expandInventory,
  deletePanel: deletePanel
}