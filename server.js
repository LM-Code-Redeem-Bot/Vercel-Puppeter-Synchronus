const express = require('express'),
    app = express();
const chromium = require('chrome-aws-lambda');
const playwright = require('playwright-core');

app.get("/:id/:code", async (request, response) => {
    try {
  chromium.puppeteer.launch({
    args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
    ignoreDefaultArgs: ['--disable-extensions'],
  }).then(browser => {
  browser.newPage()
      .then(page => page.goto('https://lordsmobile.igg.com/gifts/'))
      .then(page => page.type('#iggid', request.params.id))
      .then(page => page.type('#cdkey_1', request.params.code))
      .then(page => page.click('#btn_claim_1'))
      .then(page => .then(resp => page.screenshot({fullPage : true}))
      .then(page => page.click('#btn_msg_close'))
      .then(buffer => browser.close());
}); 
  } catch (error) {
    console.log(error);
  }
});

app.get("/", async (request, response) => {
     response.send('🔰 Hey Buddy.. 🚀 I am On...✔');  
});


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

module.exports = app;
