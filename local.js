const webdriver = require('selenium-webdriver');
const { By } = require('selenium-webdriver');
const assert = require('assert');
const browserstack = require('browserstack-local');

const username = process.env.BROWSERSTACK_USERNAME;
const accessKey = process.env.BROWSERSTACK_ACCESS_KEY;
const buildName = process.env.BROWSERSTACK_BUILD_NAME;

// Input capabilities
const capabilities = {
 'device' : 'iPhone 11 Pro Max',
 'realMobile' : 'true',
 'os_version' : '13',
 'browserName' : 'iphone',
 'name': 'BStack-[NodeJS] Local Test', // test name
 'build': buildName,
  'browserstack.user' : username,
	'browserstack.key' : accessKey
  
  
}
//creates an instance of Local
const bs_local = new browserstack.Local();

const bs_local_args = { 'key': accessKey };

// starts the Local instance with the required arguments
bs_local.start(bs_local_args, function() {
  console.log("Started BrowserStackLocal");
  runTestWithCaps(); 
});

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

  // stop the Local instance
  bs_local.stop(function() {
      console.log("Stopped BrowserStackLocal");
  });
}
