const { Builder, By, Key, until } = require('selenium-webdriver');
const { SeleniumServer } = require('selenium-webdriver/remote');
const { waitFunction } = require('../util/util');
const assert = require('assert');

var runTavernTests = async function(driver) {
  describe('Running tests on tavern chat', function() {
    it('Navigating to Tavern Page', async function() {
      await driver.get('http://localhost:8080/groups/tavern')
    });
    it('Testing messaging', async function() {
      let chatText = await driver.findElement(
        By.css('textarea')
      );
      // Write a message in the chat
      let num =  Math.floor(Math.random() * (9999 - 1000) + 1000);
      let testMessage = 'Test Message ' + num;
      await chatText.sendKeys(testMessage);
      let sendButton = await driver.findElement(By.xpath(
        "//button[contains(text(), 'Send')]"
      ));
      await sendButton.click();
      await waitFunction(1000);
      // Test message: Is there an element with the same message?
        let newMessage = await driver.findElement(By.xpath(
          `//p[contains(text(), '${testMessage}')]`
        ));
        let text = await newMessage.getText();
        assert.equal(text, testMessage);
      
    })
  })
};

module.exports = {
  runTavernTests: runTavernTests
}