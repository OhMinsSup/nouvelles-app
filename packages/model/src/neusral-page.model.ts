import { createId } from '@paralleldrive/cuid2';
import { formatForNeusralDate } from '@nouvelles/date';
import { agent } from './agent';
import { getDescription, getOgImage } from './utils';
import type { Browser, Page } from 'puppeteer';
import type {
  InitNeusralItem,
  NeusralItem,
  PageCloseOptions,
} from './neusral.types';
import dayjs from 'dayjs';

const ELE_ITEM_CONTAINER = '.item-container';

const ELE_CATEGORY = '.report-header .left .title';

const ELE_TAG = '.tab-name > .tab_input_box';

const ELE_TAB = '.each-tab';

const ELE_ITEM_NEWS_LINK = "a[class='news-url']";

const ELE_ITEM_NEWS_TITLE = '.news-title > span';

const ELE_ITEM_NEWS_DATE = ".news-date span[class='news-date-text']";

const ELE_ITEM_NEWS_REPORTER = '.news-media-date';

export class NeusralPage {
  private _page: Page | undefined;

  async run(browser: Browser) {
    try {
      this._page = await browser.newPage();

      const evaluateVar = {
        $ELE_ITEM_CONTAINER: ELE_ITEM_CONTAINER,
        $ELE_CATEGORY: ELE_CATEGORY,
        $ELE_TAG: ELE_TAG,
        $ELE_TAB: ELE_TAB,
        $ELE_ITEM_NEWS_TITLE: ELE_ITEM_NEWS_TITLE,
        $ELE_ITEM_NEWS_LINK: ELE_ITEM_NEWS_LINK,
        $ELE_ITEM_NEWS_DATE: ELE_ITEM_NEWS_DATE,
        $ELE_ITEM_NEWS_REPORTER: ELE_ITEM_NEWS_REPORTER,
      };

      await this._page.goto(agent.neusral.toString(), {
        waitUntil: 'networkidle0',
      });

      const results = await this._page.evaluateHandle(
        ({
          $ELE_ITEM_CONTAINER,
          $ELE_CATEGORY,
          $ELE_TAG,
          $ELE_TAB,
          $ELE_ITEM_NEWS_TITLE,
          $ELE_ITEM_NEWS_LINK,
          $ELE_ITEM_NEWS_DATE,
          $ELE_ITEM_NEWS_REPORTER,
        }) => {
          const _items: InitNeusralItem[] = [];

          const $items =
            document.querySelectorAll<HTMLDivElement>($ELE_ITEM_CONTAINER);

          $items.forEach(($item) => {
            const $category =
              $item.querySelector<HTMLDivElement>($ELE_CATEGORY);
            const category = $category?.textContent?.trim();
            const $tabs = $item.querySelectorAll<HTMLDivElement>($ELE_TAB);

            $tabs.forEach(($tab) => {
              const $tag = $tab.querySelector<HTMLDivElement>($ELE_TAG);
              const tag = $tag?.textContent?.trim();
              const $news =
                $tab.querySelectorAll<HTMLDivElement>($ELE_ITEM_NEWS_LINK);

              $news.forEach(($new) => {
                const $title =
                  $new.querySelector<HTMLDivElement>($ELE_ITEM_NEWS_TITLE);
                const title = $title?.textContent?.trim();

                const link = $new.getAttribute('href');

                const $date =
                  $new.querySelector<HTMLDivElement>($ELE_ITEM_NEWS_DATE);
                const date = $date?.textContent?.trim();

                const $reporter = $new.querySelector<HTMLDivElement>(
                  $ELE_ITEM_NEWS_REPORTER,
                );
                const reporter = $reporter?.textContent
                  ?.trim()
                  ?.replace(/\s/g, '')
                  ?.split('|')
                  ?.at(0)
                  ?.trim();

                const input = {
                  id: 'none',
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
                } as InitNeusralItem;

                if (input.link) {
                  const neusralId = /r\?n=(.*)/.exec(input.link)?.at(1);
                  Object.assign(input, { neusralId });
                }

                _items.push(input);
              });
            });
          });

          return _items;
        },
        evaluateVar,
      );

      const data = await results.jsonValue();

      await results.dispose();

      const items = await this.$getRealItems(data);

      return items;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  private async $getRealItems(collectItems: InitNeusralItem[]) {
    const itemMap = new Map<string, InitNeusralItem>(
      [...collectItems].map((item) => {
        const id = createId();
        return [id, { ...item, id }];
      }),
    );
    const validateMap = new Map<string, NeusralItem>();

    const serverTime = new Date();
    const tzTime = dayjs(serverTime).tz().startOf('day').toDate();

    for (const item of itemMap.values()) {
      const data = item as unknown as InitNeusralItem;

      // 필터 조건
      if (data.id === 'none' || !data.title || !data.date || !data.neusralId) {
        continue;
      }

      const date = formatForNeusralDate(data.date);
      const tzDate = dayjs(date).tz().toDate();
      //현재 시간보다 이전 시간의 데이터는 제외
      if (dayjs(tzDate).isBefore(tzTime)) {
        continue;
      }

      // 이미 아이디가 있는 경우 제외
      if (validateMap.has(data.id)) {
        continue;
      }

      const newItem = data as unknown as NeusralItem;

      validateMap.set(data.id, newItem);

      if (data.link) {
        const response = await fetch(data.link).catch(() => {
          return undefined;
        });
        if (response) {
          const html = await response.text();
          Object.assign(newItem, {
            realLink: response.url,
            image: getOgImage(html),
            description: getDescription(html),
          });
          validateMap.set(data.id, newItem);
        } else {
          continue;
        }
      }
    }

    return [...validateMap.values()] as NeusralItem[];
  }

  async close(options?: PageCloseOptions) {
    if (this._page) {
      await this._page.close(options);
      this._page = undefined;
    }
  }
}
