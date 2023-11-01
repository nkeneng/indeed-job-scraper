const puppeteer = require('puppeteer-core');
require('dotenv').config();

const AUTH = process.env.SUPERPROXY_AUTH;

const SBR_WS_ENDPOINT = `wss://${AUTH}@brd.superproxy.io:9222`;

let browser;

async function connectToPuppeteer() {
    browser = await puppeteer.connect({
        browserWSEndpoint: SBR_WS_ENDPOINT,
    });
}

connectToPuppeteer();

//-----------------------------------------------------------------------------

function BrowserPage() {
    this.browser = null;
    this.page = null;
    this.init();
}

//-----------------------------------------------------------------------------

BrowserPage.prototype.init = async function () {
    await connectToPuppeteer();
    this.browser = await browser;
    this.page = await this.createNewBrowserPage();
};

//-----------------------------------------------------------------------------

BrowserPage.prototype.createNewBrowserPage = async function () {
    const browser = await this.browser;
    return browser.newPage();
};

//-----------------------------------------------------------------------------

BrowserPage.prototype.getOpendedPages = async function () {
    const browser = await this.browser;
    return browser.pages();
};

//-----------------------------------------------------------------------------

BrowserPage.prototype.navigate = async function (url, params = {}) {

    if (!this.page) {
        await this.init();
    }
    const page = this.page;
    const finalUrl = typeof url === 'string' ? url : BrowserPage.buildURL(url, params);
    await page.goto(finalUrl, { waitUntil: 'domcontentloaded' });
    return page;
};

//-----------------------------------------------------------------------------

BrowserPage.prototype.getContent = async function (url, params) {
    const page = await this.navigate(url, params);
    // CAPTCHA solving: If you know you are likely to encounter a CAPTCHA on your target page, add the following few lines of code to get the status of Scraping Browser's automatic CAPTCHA solver 
    const client = await page.target().createCDPSession();
    const { status } = await client.send('Captcha.solve', { detectTimeout: 30 * 1000 });
    return page.evaluate(() => document.querySelector('*').outerHTML);
};

//-----------------------------------------------------------------------------

BrowserPage.prototype.exportPDF = async function (url) {
    const page = await this.navigate(url);
    return page.pdf({
        format: 'A4',
        landscape: true,
        timeout: 300000,
        printBackground: true,
        margin: { top: 40, left: 20, right: 20, bottom: 40 },
    });
};

//-----------------------------------------------------------------------------

BrowserPage.prototype.closePage = async function () {
    const page = await this.page;
    return page.close();
};

//-----------------------------------------------------------------------------

BrowserPage.closeBrowser = async function () {
    if (!browser) {
        browser = await this.browser;
    }
    return browser.close();
};

//-----------------------------------------------------------------------------

BrowserPage.buildURL = function (url, params = {}) {
    Object.getOwnPropertyNames(params).forEach((key) =>
        url.searchParams.append(key, params[key])
    );
    return url.href;
};

//-----------------------------------------------------------------------------

module.exports = BrowserPage;
