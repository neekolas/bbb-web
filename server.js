const { send } = require('micro'),
      { promisify } = require('util'),
      fs = require('fs'),
    puppeteer = require('puppeteer');

const readFile = promisify(fs.readFile);
module.exports = async (request, response) => {
  try {
    console.log('Trying')
    const browser = await puppeteer.launch({
      args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('https://developers.google.com/web/tools/puppeteer');
    await page.screenshot({path: __dirname+'/public/puppeteer.png'});
    await browser.close();
    console.log('Closing')
    response.setHeader('Content-Type', 'image/png')
    return readFile(__dirname+'/public/puppeteer.png').then(data => send(response, 200, data))
  } catch (error) {
    console.log(error);
  }
};