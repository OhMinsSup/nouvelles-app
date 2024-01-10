import puppeteer, { type Browser } from 'puppeteer';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';

import { DEFAULT_TIME_ZONE } from './constants';
import { NeusralPage } from './neusral-page.model';
import type {
  NeusralSiteConstructorOptions,
  NeusralSiteOptions,
} from './neusral.types';

export class NeusralSite {
  private _browser: Browser | undefined;

  private _page: NeusralPage | undefined;

  constructor(opts?: NeusralSiteConstructorOptions) {
    dayjs.extend(customParseFormat);
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.tz.setDefault(opts?.timezone || DEFAULT_TIME_ZONE);
  }

  async run(opts?: NeusralSiteOptions) {
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
      throw error;
    }
  }

  async close() {
    if (this._page) {
      await this._page.close();
      this._page = undefined;
    }

    if (this._browser) {
      await this._browser.close();
      this._browser = undefined;
    }
  }
}
