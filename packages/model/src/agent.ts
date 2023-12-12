const neusralURL = new URL('https://www.neusral.com');

export const agent = {
  neusral: new URL('briefing_subscriptions', neusralURL).toString(),
};
