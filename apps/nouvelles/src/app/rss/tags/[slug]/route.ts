import { getRequestInDomainInfo } from '@nouvelles/libs';
import { itemService } from '~/services/api/items/items.server';
import type { ItemSchema } from '~/services/api/items/items.model';
import { PAGE_ENDPOINTS, SITE_CONFIG } from '~/constants/constants';
import { escapeHTMLEntities } from '~/utils/utils';

interface Context {
  params: {
    slug: string;
  };
}

export async function GET(request: Request, { params }: Context) {
  const slug = params.slug;
  const { domainUrl } = getRequestInDomainInfo(request);
  const pathnames = PAGE_ENDPOINTS.NEWS.TAGS.ID(slug);
  const url = new URL(pathnames, domainUrl);

  const feeds = await itemService.getRssFeedTags(slug);

  const generateRssItem = (item: ItemSchema) => {
    const tit = item?.title?.slice(0, 200) as unknown as string;

    const desc = item?.description?.slice(0, 200) as unknown as string;

    const link = encodeURIComponent(item?.realLink as unknown as string);

    const pubDate = new Date(item.publishedAt as unknown as Date).toUTCString();
    return `
    <item>
    <guid>${item.id}</guid>
    <title>${escapeHTMLEntities(tit)}</title>
    <link>${link}</link>
    <description>${escapeHTMLEntities(desc)}</description>
    <pubDate>${pubDate}</pubDate>
  </item>
  `;
  };

  const rssItems = feeds.map(generateRssItem).join('');
  const link = decodeURIComponent(url.toString());

  const rss = `
    <rss version="2.0">
      <channel>
      <title>${SITE_CONFIG.title}</title>
      <link>${link}</link>
      <description>${SITE_CONFIG.description}</description>
      <language>ko</language>
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
