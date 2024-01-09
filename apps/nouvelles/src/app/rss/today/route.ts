import { itemService } from '~/services/api/items/items.server';
import type { ItemSchema } from '~/services/api/items/items.model';

export async function GET() {
  const feeds = await itemService.getRssFeedToday();

  const generateRssItem = (item: ItemSchema) => `
    <item>
      <guid>${item.id}</guid>
      <title>${item.title}</title>
      <link>${item.link}</link>
      <description>${item.description}</description>
      <pubDate>${new Date(
        item.publishedAt ?? item.createdAt,
      ).toUTCString()}</pubDate>
    </item>
  `;

  const rssItems = feeds
    .filter((i) => i.publishedAt)
    .map(generateRssItem)
    .join('');

  const rss = `
    <rss version="2.0">
      <channel>
        <title>Les nouvelles</title>
        <link>https://lesnouvelles.cc</link>
        <description>Les nouvelles</description>
        <language>fr</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        ${rssItems}
      </channel>
    </rss>
  `;

  return new Response(rss, {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}
