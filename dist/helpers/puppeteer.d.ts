import { Browser, Page } from 'puppeteer';
export declare const launchBrowser: () => Promise<Browser>;
export declare const openNewpage: (browser?: Browser) => Promise<Page>;
export declare const getBrowserUrls: (browser: Browser) => Promise<string[]>;
