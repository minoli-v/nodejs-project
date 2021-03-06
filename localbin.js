const webdriver = require('selenium-webdriver');
const { By } = require('selenium-webdriver');
const assert = require('assert');
const browserstack = require('browserstack-local');

const username = process.env.BROWSERSTACK_USERNAME;
const accessKey = process.env.BROWSERSTACK_ACCESS_KEY;
const buildName = process.env.BROWSERSTACK_BUILD_NAME;
const browserstackLocal = process.env.BROWSERSTACK_LOCAL;


// Input capabilities
const capabilities = {
 'os_version' : '10',
 'resolution' : '1920x1080',
 'browserName' : 'Chrome',
 'browser_version' : 'latest',
 'os' : 'Windows',
 'name': 'BStack-[NodeJS] Local Test', // test name
 'build': buildName,
 'browserstack.user' : username,
 'browserstack.key' : accessKey,
 'browserstack.local' : browserstackLocal,
  
  
}

async function runTestWithCaps () {
  let driver = new webdriver.Builder().usingServer("https://hub.browserstack.com/wd/hub").withCapabilities(capabilities).build();

  try{
    await driver.get("http://bs-local.com:45691/check");

    const body = await driver.wait(
      webdriver.until.elementLocated(By.css('body'))
    , 10000);

    const bodyText =  await driver.wait(
      webdriver.until.elementIsVisible(body , 10000)
    ).getText();

    assert(bodyText == 'Up and running');
    //marking the test as local is up
    await driver.executeScript(
      'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Local test is successful"}}'
    );
  } catch(e) {
    //marking the local test as Failed 
    console.log("Error:", e.message)
    await driver.executeScript(
      'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "Couldn\'t connect to local"}}'
    );
  } finally {
    if(driver){
      await driver.quit();
    }
  }

}
runTestWithCaps(); 
