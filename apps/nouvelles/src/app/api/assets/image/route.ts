import mimeFromBuffer from 'mime-tree';
import { BaseError } from '@nouvelles/error';
import { MemoryCache } from '~/services/api/image/image.cache';
import { schema } from '~/services/api/image/image.query';
import type { MimeType } from '~/services/api/image/image.type';
import { logger } from '~/services/logger/logger';
import cors, { commonOriginFunc } from '~/services/server/utils/cors';

const getParsedQuery = (searchParams: URLSearchParams) => {
  return {
    url: searchParams.get('url') ?? undefined,
  };
};

export const imageResponse = (
  file: Uint8Array,
  status: number,
  contentType: string,
  cacheControl: string,
): Response =>
  new Response(file, {
    status,
    headers: {
      'Content-Type': contentType,
      'Cache-Control': cacheControl,
    },
  });

export const redirectResponse = (location: string): Response =>
  new Response(null, {
    status: 302,
    headers: {
      Location: location,
    },
  });

export const textResponse = (status: number, message = ''): Response =>
  new Response(message, {
    status,
  });

const cache = new MemoryCache({
  maxSize: 5e7,
});

export const fetchResolver = async (url: string) => {
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

  const { searchParams } = new URL(request.url);
  const query = schema.safeParse(getParsedQuery(searchParams));
  if (!query.success) {
    return new Response(
      query.error.issues.map((issue) => issue.message).join('\n'),
      {
        status: 400,
      },
    );
  }

  const { url } = query.data;
  const defaultCacheControl = `public, max-age=${60 * 60 * 24 * 365}`;
  const defaultContentType = 'image/png';

  try {
    if (cache && cache.has(url)) {
      logger.info(`Cache HIT: ${url}`);
      const cacheValue = cache.get(url);

      if (cacheValue) {
        const cacheImg = cacheValue;
        const inputContentType = mimeFromBuffer(cacheImg);

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
    if (error instanceof BaseError) {
      return textResponse(400, error.message);
    }

    if (error instanceof Error) {
      return textResponse(400, error.message);
    }

    return textResponse(400, 'Failed to fetch image');
  }
}
