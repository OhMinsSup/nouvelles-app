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
  const pathnames = PAGE_ENDPOINTS.NEWS.NEWS_PAPERS.ID(slug);
  const url = new URL(pathnames, domainUrl);

  const feeds = await itemService.getRssFeedNewspaper(slug);

  const link = decodeURIComponent(url.toString());

  return new Response(
    generateRssTemplate(link, feeds.map(generateRssItemTemplate).join('')),
    {
      headers: {
        'Content-Type': 'text/xml',
      },
    },
  );
}
