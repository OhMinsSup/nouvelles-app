// the `defer()` helper will be used to define a background function
// import { Agent } from "undici";
// import crypto from "node:crypto";
import { createId } from "@paralleldrive/cuid2";
import puppeteer, {
  type Browser,
  type Page,
  type ElementHandle,
} from "puppeteer";
import { delayPromise } from "~/utils/utils";

export type Item = {
  id: string;
  neusralId: string | undefined;
  parentCategory: string | undefined;
  childCategory: string | undefined;
  reporter: string | undefined;
  title: string | undefined;
  link: string | undefined;
  date: string | undefined;
  description: string | undefined;
};

const DESCRIPTION_REGEX =
  /<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/;

const OG_DESCRIPTION_REGEX =
  /<meta[^>]*property="og:description"[^>]*content="([^"]*)"[^>]*>/;

const HANGUL_BREAK_REGEX = /�/;

const replaceDescription = (html: string, isOgDescription?: boolean) => {
  return html.replace(
    isOgDescription ? OG_DESCRIPTION_REGEX : DESCRIPTION_REGEX,
    "$1"
  );
};

const matchDescription = (html: string) => {
  const description_html = html.match(DESCRIPTION_REGEX);
  const og_description_html = html.match(OG_DESCRIPTION_REGEX);

  const description = description_html?.at(0);
  const og_description = og_description_html?.at(0);

  // 값을 비교 할 때 값이 존재하는 것을 선택한다.
  if (description && og_description) {
    // 둘을 비교 할 떄 더 긴 것을 선택한다.
    if (description.length > og_description.length) {
      return replaceDescription(description);
    } else {
      return replaceDescription(og_description, true);
    }
  } else if (og_description) {
    return replaceDescription(og_description, true);
  } else if (description) {
    return replaceDescription(description);
  }

  return undefined;
};

class Nouvelles {
  private _URL = "https://www.neusral.com/briefing_subscriptions";

  private _browser: Browser | undefined;

  private _page: Page | undefined;

  private _items: Map<string, Item> = new Map();

  async run() {
    // make sure to pass the `--no-sandbox` option
    this._browser = await puppeteer.launch({
      args: ["--no-sandbox"],
      headless: "new",
    });

    try {
      this._page = await this._browser.newPage();

      // pass the following `waitUntil` option to avoid
      // unnecessary blocking when loading a page
      await this._page.goto(this._URL, { waitUntil: "networkidle0" });

      // ".slick-list draggable" is the selector of the element
      const $ele1 = await this._findTargetContainer();

      await this._findNews($ele1);

      return Array.from(this._items.values());
    } catch (error) {
      console.error(error);
      return [];
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

  private async _findNews($eles: ElementHandle<Element>[]) {
    for (const $item of $eles) {
      const [parentCategory, reporter, $tabs] = await Promise.all([
        this._findByParentCategory($item),
        this._findByReporter($item),
        this._findByEachTab($item),
      ]);

      for (const $tab of $tabs) {
        const [childCategory, $news] = await Promise.all([
          this._findByChildCategory($tab),
          this._findByNews($tab),
        ]);

        for (const $new of $news) {
          const [title, link, date] = await Promise.all([
            this._findByTitle($new),
            this._findByLink($new),
            this._findByDate($new),
          ]);

          const input = {
            id: createId(),
            neusralId: undefined,
            description: undefined,
            parentCategory,
            childCategory,
            reporter,
            title,
            link,
            date,
          };

          if (input.link) {
            // 'https://www.neusral.com/r?n=YKCRY7Lyem' => 'YKCRY7Lyem'
            const neusralId = input.link?.match(/r\?n=(.*)/)?.at(1);
            Object.assign(input, { neusralId });

            const { promise, close } = delayPromise(1000);

            try {
              const response = await fetch(input.link, {
                // dispatcher: new Agent({
                //   connect: {
                //     rejectUnauthorized: false,
                //     secureOptions:
                //       crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
                //   },
                // }),
              });
              const html = await response.text();
              let description = matchDescription(html);
              if (description && HANGUL_BREAK_REGEX.test(description)) {
                description = undefined;
              }
              Object.assign(input, { description });

              await promise;
            } catch (error) {
              console.error(error);
            } finally {
              close();
            }
          }

          if (!this._items.has(input.id)) this._items.set(input.id, input);
        }
      }
    }
  }

  async dispose() {
    if (this._browser) {
      await this._browser.close();
    }
  }
}

export const nouvelles = new Nouvelles();
