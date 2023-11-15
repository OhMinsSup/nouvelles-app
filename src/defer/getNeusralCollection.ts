// the `defer()` helper will be used to define a background function
import { defer } from "@defer/client";
import puppeteer, {
  type Browser,
  type Page,
  type ElementHandle,
} from "puppeteer";
import hash from "stable-hash";

type Item = {
  id: string;
  parentCategory: string | undefined;
  childCategory: string | undefined;
  reporter: string | undefined;
  title: string | undefined;
  link: string | undefined;
  date: string | undefined;
  description: string | undefined;
};

class Nouvelles {
  private _URL = "https://www.neusral.com/briefing_subscriptions";

  private _browser: Browser | undefined;

  private _page: Page | undefined;

  private _$targetContainer: ElementHandle<Element>[] | undefined;

  constructor() {
    this.init();
  }

  async init() {
    // make sure to pass the `--no-sandbox` option
    this._browser = await puppeteer.launch({ args: ["--no-sandbox"] });

    try {
      this._page = await this._browser.newPage();

      // pass the following `waitUntil` option to avoid
      // unnecessary blocking when loading a page
      await this._page.goto(this._URL, { waitUntil: "networkidle0" });

      // ".slick-list draggable" is the selector of the element
      const $ele1 = await this._findTargetContainer();

      const items = await this._findNews($ele1);
    } catch (error) {
      console.error(error);
    } finally {
      await this.dispose();
    }
  }

  private async _findTargetContainer() {
    if (!this._page) {
      throw new Error("No page found");
    }

    const $ele = await this._page.$$(".slick-list.draggable");
    if (!$ele) {
      throw new Error("No container found");
    }

    return $ele;
  }

  private async _findByParentCategory($ele: ElementHandle<Element>) {
    const text = await $ele.$eval(
      ".report-header .left .title",
      (el) => el.textContent
    );

    if (!text) {
      return undefined;
    }

    return text.trim();
  }

  private async _findByChildCategory($ele: ElementHandle<Element>) {
    const text = await $ele.$eval(
      ".tab-name > .tab_input_box",
      (el) => el.textContent
    );

    if (!text) {
      return undefined;
    }

    return text.trim();
  }

  private async _findByReporter($ele: ElementHandle<Element>) {
    const text = await $ele.$eval(
      ".report-header .left .reporter",
      (el) => el.textContent
    );

    if (!text) {
      return undefined;
    }

    return text.trim();
  }

  private async _findByEachTab($ele: ElementHandle<Element>) {
    const $tabs = await $ele.$$(".each-tab");
    if (!$tabs) {
      return [];
    }
    return $tabs;
  }

  private async _findByNews($ele: ElementHandle<Element>) {
    const $tabs = await $ele.$$("a[class='news-url']");
    if (!$tabs) {
      return [];
    }
    return $tabs;
  }

  private async _findByTitle($ele: ElementHandle<Element>) {
    const text = await $ele.$eval(".news-title > span", (el) => el.textContent);

    if (!text) {
      return undefined;
    }

    return text.trim();
  }

  private async _findByLink($ele: ElementHandle<Element>) {
    const text = await $ele.$eval(".news-list", (e) => {
      return e.parentElement?.getAttribute("href");
    });

    if (!text) {
      return undefined;
    }

    return text.trim();
  }

  private async _findByDate($ele: ElementHandle<Element>) {
    const text = await $ele.$eval(
      ".news-date span[class='news-date-text']",
      (el) => el.textContent
    );

    if (!text) {
      return undefined;
    }

    return text.trim();
  }

  private async _findByDescription($ele: ElementHandle<Element>) {
    const text = await $ele.$eval(".news-description", (el) => el.textContent);

    if (!text) {
      return undefined;
    }

    return text.trim();
  }

  private async _findNews($eles: ElementHandle<Element>[]) {
    const items: Map<string, Item> = new Map();

    for (const $item of $eles) {
      const parentCategory = await this._findByParentCategory($item);
      const reporter = await this._findByReporter($item);
      const $tabs = await this._findByEachTab($item);

      for (const $tab of $tabs) {
        const childCategory = await this._findByChildCategory($tab);
        const $news = await this._findByNews($tab);

        for (const $new of $news) {
          const title = await this._findByTitle($new);
          const link = await this._findByLink($new);
          const date = await this._findByDate($new);
          const description = await this._findByDescription($new);

          const input = {
            parentCategory,
            childCategory,
            reporter,
            title,
            link,
            date,
            description,
          };

          const id = hash(input);
          const nextInput = {
            id,
            ...input,
          };

          if (!items.has(id)) {
            items.set(id, nextInput);
          }
        }
      }
    }

    return Array.from(items.values());
  }

  async dispose() {
    if (this._browser) {
      await this._browser.close();
    }
  }
}

// a background function must be `async`
async function getNeusralCollection() {
  const url = "https://www.neusral.com/briefing_subscriptions";
  // make sure to pass the `--no-sandbox` option
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });

  try {
    const page = await browser.newPage();

    // pass the following `waitUntil` option to avoid
    //   unnecessary blocking when loading a page
    await page.goto(url, { waitUntil: "networkidle0" });

    // ".slick-list draggable" is the selector of the element
    const $container = await page.$(".slick-list.draggable");
    if (!$container) {
      throw new Error("No container found");
    }

    const item = new Map<string, Item>();

    const $items = await $container.$$(".item-container");
    for (const $item of $items) {
      const parentCategory =
        (await $item.$eval(
          ".report-header .left .title",
          (el) => el.textContent
        )) || undefined;
      const reporter =
        (await $item.$eval(
          ".report-header .left .reporter",
          (el) => el.textContent
        )) || undefined;
      const $tabs = (await $item.$$(".each-tab")) ?? [];
      for (const $tab of $tabs) {
        const childCategory =
          (await $tab.$eval(
            ".tab-name > .tab_input_box",
            (el) => el.textContent
          )) || undefined;

        const $newList = (await $tab.$$("a[class='news-url']")) ?? [];
        for (const $new of $newList) {
          const newsTitle =
            (await $new.$eval(".news-title > span", (el) => el.textContent)) ||
            undefined;
          const newsLink =
            (await $new.$eval(".news-list", (e) => {
              return e.parentElement?.getAttribute("href");
            })) || undefined;
          const newsDate =
            (await $new.$eval(
              ".news-date span[class='news-date-text']",
              (el) => el.textContent
            )) || undefined;
          const newsDescription =
            (await $new.$eval(".news-description", (el) => el.textContent)) ||
            undefined;

          const input = {
            parentCategory: parentCategory?.trim(),
            childCategory: childCategory?.trim(),
            reporter: reporter?.trim(),
            title: newsTitle?.trim(),
            link: newsLink?.trim(),
            date: newsDate?.trim(),
            description: newsDescription?.trim(),
          };

          const id = hash(input);
          const nextInput = {
            id,
            ...input,
          };

          if (!item.has(id)) {
            item.set(id, nextInput);
          }
        }
      }
    }

    const result = Array.from(item.values());
    console.log(JSON.stringify(result));
    return result;
  } catch (error) {
    console.error(error);
  } finally {
    await browser.close();
  }
}

// the function must be wrapped with `defer()` and exported as default

// cron expression: 매일 아침 8시에 실행
// cron expression: every day at 8:00 AM
// const cron = "0 8 * * *";
// cron expression: every 10 seconds
const cron = "*/10 * * * * *";

export default defer.cron(getNeusralCollection, cron, {
  retry: 5,
});
