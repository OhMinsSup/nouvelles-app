// the `defer()` helper will be used to define a background function
import { defer } from "@defer/client";
import { getNeusralCollection } from "./getNeusralCollection";

// the function must be wrapped with `defer()` and exported as default

// cron expression: 매일 아침 8시에 실행
// cron expression: every day at 8:00 AM
// const cron = "0 8 * * *";
// cron expression: every 10 seconds
const cron = "*/10 * * * * *";

export default defer.cron(getNeusralCollection, cron, {
  retry: 5,
});
