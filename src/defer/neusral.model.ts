import { createId } from "@paralleldrive/cuid2";
import puppeteer, {
  type Browser,
  type Page,
  type ElementHandle,
} from "puppeteer";

export type Nouvelle = {
  id: string;
  neusralId: string | undefined;
  category: string | undefined;
  tag: string | undefined;
  reporter: string | undefined;
  title: string | undefined;
  link: string | undefined;
  realLink: string | undefined;
  date: string | undefined;
  description: string | undefined;
};

type PageCloseOptions =
  | {
      runBeforeUnload?: boolean | undefined;
    }
  | undefined;

const NEUSRAL_URL = "https://www.neusral.com/briefing_subscriptions";

const DESCRIPTION_REGEX =
  /<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/;

const OG_DESCRIPTION_REGEX =
  /<meta[^>]*property="og:description"[^>]*content="([^"]*)"[^>]*>/;

const HANGUL_BREAK_REGEX = /�/;

// 'https://www.neusral.com/r?n=YKCRY7Lyem' => 'YKCRY7Lyem'
const NEUSRAL_N_ID_REGEX = /r\?n=(.*)/;

const ELE_ITEM_CONTAINER = ".item-container";

const ELE_CATEGORY = ".report-header .left .title";

const ELE_TAG = ".tab-name > .tab_input_box";

const ELE_TAB = ".each-tab";

const ELE_ITEM_NEWS = "a[class='news-url']";

const ELE_ITEM_NEWS_TITLE = ".news-title > span";

const ELE_ITEM_NEWS_LINK = ".news-list";

const ELE_ITEM_NEWS_DATE = ".news-date span[class='news-date-text']";

const ELE_ITEM_NEWS_REPORTER = ".news-media-date";

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

const getDescription = (html: string) => {
  let description = html ? matchDescription(html) : undefined;
  if (description && HANGUL_BREAK_REGEX.test(description)) {
    description = undefined;
  }
  return description;
};

class NouvellePage {
  private _page: Page | undefined;

  private _items: Map<string, Nouvelle> = new Map();

  async run(browser: Browser) {
    try {
      this._page = await browser.newPage();

      await this._page.goto(NEUSRAL_URL, { waitUntil: "networkidle0" });

      const $ele1 = await this.$findTargetContainer();

      await this.$findItems($ele1);

      return await this.$getRealItems();
    } catch (error) {
      console.error(error);
      return [];
    } finally {
      await this.close();
    }
  }

  private async $findTargetContainer() {
    if (!this._page) {
      throw new Error("No page found");
    }

    const $ele = await this._page.$$(ELE_ITEM_CONTAINER);
    if (!$ele) {
      throw new Error("No container found");
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
      return e.parentElement?.getAttribute("href");
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
      (el) => el.textContent
    );

    if (!text) {
      return undefined;
    }

    const text_next = text.trim().replace(/\s/g, "");
    const reporter = text_next?.split("|")?.at(0)?.trim();
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
            realLink: undefined,
            category,
            tag,
            reporter,
            title,
            link,
            date,
          } as Nouvelle;

          if (input.link) {
            const neusralId = input.link?.match(NEUSRAL_N_ID_REGEX)?.at(1);
            Object.assign(input, { neusralId });
          }

          this._items.set(input.id, input);
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
    if (this._page) {
      await this._page.close(options);
    }
  }

  cleanup() {
    this._items.clear();
    if (this._page && this._page.isClosed()) {
      this._page = undefined;
    }
  }
}

class NouvellesSite {
  private _browser: Browser | undefined;

  private _nouvellaPage: NouvellePage | undefined;

  async run() {
    // make sure to pass the `--no-sandbox` option
    this._browser = await puppeteer.launch({
      args: ["--no-sandbox"],
      headless: "new",
      timeout: 0,
    });

    try {
      this._nouvellaPage = new NouvellePage();

      return await this._nouvellaPage.run(this._browser);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async close() {
    if (this._nouvellaPage) await this._nouvellaPage.close();
    if (this._browser) await this._browser.close();
  }

  cleanup() {
    if (this._nouvellaPage) {
      this._nouvellaPage.cleanup();
      this._nouvellaPage = undefined;
    }

    if (this._browser) {
      this._browser = undefined;
    }
  }
}

export const nouvellesSite = new NouvellesSite();
