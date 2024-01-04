import puppeteer, { type Browser } from 'puppeteer';
import { NeusralPage } from './neusral-page.model';

export class NeusralSite {
  private _browser: Browser | undefined;

  private _page: NeusralPage | undefined;

  async run(executablePath?: string) {
    // make sure to pass the `--no-sandbox` option
    this._browser = await puppeteer.launch({
      executablePath,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
      ignoreDefaultArgs: ['--disable-extensions'],
      headless: 'new',
      timeout: 0,
      ignoreHTTPSErrors: true,
    });

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
