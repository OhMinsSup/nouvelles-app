// the `defer()` helper will be used to define a background function
import { defer } from "@defer/client";
import puppeteer from "puppeteer";
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
