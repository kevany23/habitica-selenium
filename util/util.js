/**
 * Basic function to wait for a certain period of time
 */
var waitFunction= function (time) {
  return new Promise((res) => {
    setTimeout(res, time);
  });
}

/**
 * Basic function to scroll to an element
 */
var scrollToElement = function (driver, element) {
  driver.executeScript("arguments[0].scrollIntoView()", element);
}

/**
 * A more robust approach to clicking an element, as opposed to
 * element.click().
 * Takes the element's rectangles, moves to the coordinates,
 * and clicks accordingly insetad of clicking directly, thus
 * avoiding issues with unseletable elements.
 */
var clickByLocation = async function(driver, element) {
  let rect = await element.getRect();
  await driver.actions().move({
    origin: element,
    x: rect.width / 2,
    y: rect.height / 2,
  }).click().perform();
}

module.exports = {
  waitFunction: waitFunction,
  scrollToElement: scrollToElement,
  clickByLocation, clickByLocation
}