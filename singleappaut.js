var wd = require('wd');
var assert = require('assert');
var asserters = wd.asserters;

userName = process.env.BROWSERSTACK_USERNAME
accessKey = process.env.BROWSERSTACK_ACCESS_KEY
browserstackLocal = process.env.BROWSERSTACK_LOCAL
buildName = process.env.BROWSERSTACK_BUILD_NAME;
browserstackLocalIdentifier = process.env.BROWSERSTACK_LOCAL_IDENTIFIER
app = process.env.BROWSERSTACK_APP_ID

desiredCaps = {
   "browserstack.user" : userName,
    "browserstack.key" : accessKey,
    "app" : app,
    "build" : buildName,
    "device" : "Samsung Galaxy S8",
    "browserstack.local" : browserstackLocal,
    "browserstack.localIdentifier" : browserstackLocalIdentifier
}

driver = wd.promiseRemote("http://hub-cloud.browserstack.com/wd/hub");

driver
  .init(desiredCaps)
  .then(function () {
    return driver.waitForElementByAccessibilityId('Search Wikipedia', asserters.isDisplayed && asserters.isEnabled, 30000);
  })
  .then(function (searchElement) {
    return searchElement.click();
  })
  .then(function () {
    return driver.waitForElementById('org.wikipedia.alpha:id/search_src_text', asserters.isDisplayed && asserters.isEnabled, 30000);
  })
  .then(function (searchInput) {
    return searchInput.sendKeys("BrowserStack");
  })
  .then(function () {
    return driver.elementsByClassName('android.widget.TextView');   
  })
  .then(function (search_results) {
    assert(search_results.length > 0);
  })
  .fin(function() { return driver.quit(); })
  .done();
