import { createId } from '@paralleldrive/cuid2';
import { agent } from './agent';
import { getDescription, getOgImage } from './utils';
import type { Browser, Page, ElementHandle } from 'puppeteer';
import type { NeusralItem, PageCloseOptions } from './neusral.types';

// 'https://www.neusral.com/r?n=YKCRY7Lyem' => 'YKCRY7Lyem'
const NEUSRAL_N_ID_REGEX = /r\?n=(.*)/;

const ELE_ITEM_CONTAINER = '.item-container';

const ELE_CATEGORY = '.report-header .left .title';

const ELE_TAG = '.tab-name > .tab_input_box';

const ELE_TAB = '.each-tab';

const ELE_ITEM_NEWS = "a[class='news-url']";

const ELE_ITEM_NEWS_TITLE = '.news-title > span';

const ELE_ITEM_NEWS_LINK = '.news-list';

const ELE_ITEM_NEWS_DATE = ".news-date span[class='news-date-text']";

const ELE_ITEM_NEWS_REPORTER = '.news-media-date';

export class NeusralPage {
  private _page: Page | undefined;

  private _items = new Map<string, NeusralItem>();

  async run(browser: Browser) {
    try {
      this._page = await browser.newPage();

      await this._page.goto(agent.neusral.toString(), {
        waitUntil: 'networkidle0',
      });

      const $ele1 = await this.$findTargetContainer();

      await this.$findItems($ele1);

      return this.$getRealItems();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  private async $findTargetContainer() {
    if (!this._page) {
      throw new Error('No page found');
    }

    const $ele = await this._page.$$(ELE_ITEM_CONTAINER);

    return $ele;
  }

  private async $findByCategory($ele: ElementHandle) {
    const text = await $ele.$eval(ELE_CATEGORY, (el) => el.textContent);

    if (!text) {
      return undefined;
    }

    return text.trim();
  }

  private async $findByTag($ele: ElementHandle) {
    const text = await $ele.$eval(ELE_TAG, (el) => el.textContent);

    if (!text) {
      return undefined;
    }

    return text.trim();
  }

  private async $findByEachTab($ele: ElementHandle) {
    const $tabs = await $ele.$$(ELE_TAB);
    return $tabs;
  }

  private async $findByNews($ele: ElementHandle) {
    const $tabs = await $ele.$$(ELE_ITEM_NEWS);
    return $tabs;
  }

  private async $findByTitle($ele: ElementHandle) {
    const text = await $ele.$eval(ELE_ITEM_NEWS_TITLE, (el) => el.textContent);

    if (!text) {
      return undefined;
    }

    return text.trim();
  }

  private async $findByLink($ele: ElementHandle) {
    const text = await $ele.$eval(ELE_ITEM_NEWS_LINK, (e) => {
      return e.parentElement?.getAttribute('href');
    });

    if (!text) {
      return undefined;
    }

    return text.trim();
  }

  private async $findByDate($ele: ElementHandle) {
    const text = await $ele.$eval(ELE_ITEM_NEWS_DATE, (el) => el.textContent);

    if (!text) {
      return undefined;
    }

    return text.trim();
  }

  private async $findByReporter($ele: ElementHandle) {
    const text = await $ele.$eval(
      ELE_ITEM_NEWS_REPORTER,
      (el) => el.textContent,
    );

    if (!text) {
      return undefined;
    }

    const text_next = text.trim().replace(/\s/g, '');
    const reporter = text_next.split('|').at(0)?.trim();
    return reporter;
  }

  private async $findItems($eles: ElementHandle[]) {
    for (const $item of $eles) {
      const [category, $tabs] = await Promise.all([
        this.$findByCategory($item),
        this.$findByEachTab($item),
      ]);

      for (const $tab of $tabs) {
        const [tag, $news] = await Promise.all([
          this.$findByTag($tab),
          this.$findByNews($tab),
        ]);

        for (const $new of $news) {
          const [title, link, date, reporter] = await Promise.all([
            this.$findByTitle($new),
            this.$findByLink($new),
            this.$findByDate($new),
            this.$findByReporter($new),
          ]);

          const input = {
            id: createId(),
            neusralId: undefined,
            description: undefined,
            image: undefined,
            realLink: undefined,
            category,
            tag,
            reporter,
            title,
            link,
            date,
          } as NeusralItem;

          if (input.link) {
            const neusralId = NEUSRAL_N_ID_REGEX.exec(input.link)?.at(1);
            Object.assign(input, { neusralId });
          }

          this._items.set(input.id, input);

          console.log(input);
        }
      }
    }
  }

  private async $getRealItems() {
    for (const item of this._items.values()) {
      const data = item as NeusralItem;
      if (data.link) {
        const response = await fetch(data.link).catch(() => {
          return undefined;
        });

        if (response && this._items.has(data.id)) {
          const html = await response.text();
          this._items.set(data.id, {
            ...data,
            realLink: response.url,
            image: getOgImage(html),
            description: getDescription(html),
          });
        } else {
          continue;
        }
      } else {
        continue;
      }
    }

    return [...this._items.values()] as NeusralItem[];
  }

  async close(options?: PageCloseOptions) {
    if (this._page) await this._page.close(options);
  }

  cleanup() {
    this._items.clear();
    if (this._page && this._page.isClosed()) {
      this._page = undefined;
    }
  }
}
