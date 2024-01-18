import { getRequestInDomainInfo } from '@nouvelles/libs';
import { itemService } from '~/services/api/items/items.server';
import { PAGE_ENDPOINTS } from '~/constants/constants';
import { generateRssItemTemplate, generateRssTemplate } from '~/utils/utils';

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

  const link = decodeURIComponent(url.toString());

  return new Response(
    generateRssTemplate(link, feeds.map(generateRssItemTemplate).join('')),
    {
      headers: {
        'Cache-Control': `public, max-age=${60 * 10}, s-maxage=${60 * 60 * 24}`,
        'Content-Type': 'text/xml',
      },
    },
  );
}
