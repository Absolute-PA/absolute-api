"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBrowserUrls = exports.openNewpage = exports.launchBrowser = void 0;
const puppeteer_1 = require("puppeteer");
const launchBrowser = async () => {
    return puppeteer_1.default.launch({
        headless: true,
        args: [
            '--autoplay-policy=no-user-gesture-required',
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ],
        ignoreDefaultArgs: ['--mute-audio'],
        executablePath: process.env.CHROME_PATH,
        ignoreHTTPSErrors: true,
    });
};
exports.launchBrowser = launchBrowser;
const openNewpage = async (browser) => {
    if (browser)
        return browser.newPage();
    return browser.newPage();
};
exports.openNewpage = openNewpage;
const getBrowserUrls = async (browser) => {
    const contexts = browser.browserContexts();
    const pagesPromises = [];
    contexts.map((context) => {
        pagesPromises.push(context.pages());
    });
    const pages = await Promise.all(pagesPromises);
    const urls = [];
    pages.forEach((page) => {
        page.forEach((p) => urls.push(p.url()));
    });
    return urls;
};
exports.getBrowserUrls = getBrowserUrls;
//# sourceMappingURL=puppeteer.js.map