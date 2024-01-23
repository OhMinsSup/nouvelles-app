import mimeFromBuffer from 'mime-tree';
import { BaseError } from '@nouvelles/error';
import { getRequestInDomainInfo } from '@nouvelles/libs';
import { MemoryCache } from '~/services/api/image/image.cache';
import { schema } from '~/services/api/image/image.query';
import type { MimeType } from '~/services/api/image/image.type';
import { logger } from '~/services/logger/logger';
import cors, { commonOriginFunc } from '~/services/server/utils/cors';
import { ASSET_URL } from '~/constants/constants';

const getParsedQuery = (searchParams: URLSearchParams) => {
  return {
    url: searchParams.get('url') ?? undefined,
  };
};

const cache = new MemoryCache({
  maxSize: 5e7,
});

const fetchResolver = async (url: string) => {
  const request = new Request(url, {
    headers: {
      accept: 'image/*',
    },
  });

  const response = await fetch(request);

  if (!response.ok) {
    throw new BaseError('FetchError', 'Failed to fetch image');
  }

  const arrBuff = await response.arrayBuffer();

  if (!arrBuff || arrBuff.byteLength < 2) {
    throw new BaseError('FetchError', 'Invalid image retrieved from resolver');
  }

  const buffer = new Uint8Array(arrBuff);
  const contentType = response.headers.get(
    'content-type',
  ) as unknown as MimeType;

  return {
    buffer,
    contentType,
  };
};

const imageResponse = (
  file: Uint8Array,
  status: number,
  contentType: string,
  cacheControl: string,
): Response => {
  return new Response(file, {
    status,
    headers: {
      'Content-Type': contentType,
      'Cache-Control': cacheControl,
    },
  });
};

export async function GET(request: Request) {
  const response = await cors(request, new Response(), {
    origin: commonOriginFunc,
    methods: ['GET', 'HEAD', 'OPTIONS'],
    credentials: true,
  });

  if (response.status === 204) {
    return response;
  }

  if (!response.headers.has('Access-Control-Allow-Origin')) {
    return response;
  }

  const nextUrl = getRequestInDomainInfo(request);

  const defaultCacheControl = `public, max-age=${60 * 60 * 24 * 365}`;
  const defaultContentType = 'image/png';

  try {
    const { searchParams } = new URL(request.url);
    const query = schema.safeParse(getParsedQuery(searchParams));
    if (!query.success) {
      throw new BaseError('FetchError', 'Invalid query');
    }

    const { url } = query.data;

    if (cache && cache.has(url)) {
      logger.info(`Cache HIT: ${url}`);
      const cacheValue = cache.get(url);

      if (cacheValue) {
        const cacheImg = cacheValue;
        const inputContentType = mimeFromBuffer(cacheImg);
        // 이미지 타입이 아닌 경우 실패처리
        if (!inputContentType?.startsWith('image')) {
          throw new BaseError(
            'FetchError',
            'Invalid image retrieved from cache',
          );
        }

        return imageResponse(
          cacheImg,
          200,
          inputContentType ?? defaultContentType,
          defaultCacheControl,
        );
      }
    } else {
      logger.info(`Cache MISS: ${url}`);
    }

    const { buffer, contentType } = await fetchResolver(url);

    if (cache) {
      cache.set(url, buffer);
    }

    return imageResponse(buffer, 200, contentType, defaultCacheControl);
  } catch (error) {
    const staticFolderUrl = new URL(
      ASSET_URL.PAGE_NOT_FOUND,
      nextUrl.domainUrl,
    );
    const { buffer, contentType } = await fetchResolver(
      staticFolderUrl.toString(),
    );
    return imageResponse(buffer, 200, contentType, defaultCacheControl);
  }
}
