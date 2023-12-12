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

  private _items: Map<string, NeusralItem> = new Map();

  async run(browser: Browser) {
    try {
      this._page = await browser.newPage();

      await this._page.goto(agent.neusral.toString(), {
        waitUntil: 'networkidle0',
      });

      const $ele1 = await this.$findTargetContainer();

      await this.$findItems($ele1);

      return await this.$getRealItems();
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
    if (!$ele) {
      throw new Error('No container found');
    }

    return $ele;
  }

  private async $findByCategory($ele: ElementHandle<Element>) {
    const text = await $ele.$eval(ELE_CATEGORY, (el) => el.textContent);

    if (!text) {
      return undefined;
    }

    return text.trim();
  }

  private async $findByTag($ele: ElementHandle<Element>) {
    const text = await $ele.$eval(ELE_TAG, (el) => el.textContent);

    if (!text) {
      return undefined;
    }

    return text.trim();
  }

  private async $findByEachTab($ele: ElementHandle<Element>) {
    const $tabs = await $ele.$$(ELE_TAB);
    if (!$tabs) {
      return [];
    }
    return $tabs;
  }

  private async $findByNews($ele: ElementHandle<Element>) {
    const $tabs = await $ele.$$(ELE_ITEM_NEWS);
    if (!$tabs) {
      return [];
    }
    return $tabs;
  }

  private async $findByTitle($ele: ElementHandle<Element>) {
    const text = await $ele.$eval(ELE_ITEM_NEWS_TITLE, (el) => el.textContent);

    if (!text) {
      return undefined;
    }

    return text.trim();
  }

  private async $findByLink($ele: ElementHandle<Element>) {
    const text = await $ele.$eval(ELE_ITEM_NEWS_LINK, (e) => {
      return e.parentElement?.getAttribute('href');
    });

    if (!text) {
      return undefined;
    }

    return text.trim();
  }

  private async $findByDate($ele: ElementHandle<Element>) {
    const text = await $ele.$eval(ELE_ITEM_NEWS_DATE, (el) => el.textContent);

    if (!text) {
      return undefined;
    }

    return text.trim();
  }

  private async $findByReporter($ele: ElementHandle<Element>) {
    const text = await $ele.$eval(
      ELE_ITEM_NEWS_REPORTER,
      (el) => el.textContent,
    );

    if (!text) {
      return undefined;
    }

    const text_next = text.trim().replace(/\s/g, '');
    const reporter = text_next?.split('|')?.at(0)?.trim();
    return reporter;
  }

  private async $findItems($eles: ElementHandle<Element>[]) {
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
            const neusralId = input.link?.match(NEUSRAL_N_ID_REGEX)?.at(1);
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
      if (item.link) {
        const response = await fetch(item.link).catch((error) => {
          console.error(error);
          return undefined;
        });

        if (response && this._items.has(item.id)) {
          const html = await response.text();
          this._items.set(item.id, {
            ...item,
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

    return [...this._items.values()];
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
