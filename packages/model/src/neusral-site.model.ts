import puppeteer, { type Browser } from 'puppeteer';
import { NeusralPage } from './neusral-page.model';
import type { NeusralSiteConstructorOptions } from './neusral.types';

export class NeusralSite {
  private _browser: Browser | undefined;

  private _page: NeusralPage | undefined;

  async run(opts?: NeusralSiteConstructorOptions) {
    if (opts?.browserWSEndpoint) {
      this._browser = await puppeteer.connect({
        browserWSEndpoint: opts.browserWSEndpoint,
        ignoreHTTPSErrors: true,
      });
    } else {
      // make sure to pass the `--no-sandbox` option
      this._browser = await puppeteer.launch({
        executablePath: opts?.executablePath,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
        ],
        headless: 'new',
        timeout: 0,
        ignoreHTTPSErrors: true,
      });
    }

    try {
      this._page = new NeusralPage();
      const items = await this._page.run(this._browser);
      return items;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async close() {
    if (this._page) await this._page.close();
    if (this._browser) await this._browser.close();
  }

  cleanup() {
    if (this._page) {
      this._page.cleanup();
      this._page = undefined;
    }

    if (this._browser) {
      this._browser = undefined;
    }
  }
}
