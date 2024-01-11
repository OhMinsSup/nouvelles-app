import { type ClassValue, clsx } from 'clsx';
import noop from 'lodash-es/noop';
import { twMerge } from 'tailwind-merge';
import { isEmpty, isNull, isUndefined } from '@nouvelles/libs';
import { CORS_WHITELIST, SITE_CONFIG } from '~/constants/constants';
import type { ItemSchema } from '~/services/api/items/items.model';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function optimizeAnimation(callback: () => void) {
  let ticking = false;

  return () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        callback();
        ticking = false;
      });
    }
  };
}

export const createSearchParams = (params?: Record<string, any>) => {
  const searchParams = new URLSearchParams();
  if (!params || isEmpty(params)) return searchParams;

  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined || params[key] !== null) {
      if (Array.isArray(params[key])) {
        searchParams.append(key, params[key].join(','));
      } else {
        if (isUndefined(params[key]) || isNull(params[key])) return;
        const hasToString = Object.prototype.hasOwnProperty.call(
          params[key],
          'toString',
        );
        if (hasToString) {
          searchParams.append(key, params[key].toString());
        } else {
          searchParams.append(key, params[key]);
        }
      }
    }
  });

  return searchParams;
};

export const delayPromise = (ms: number) => {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let rejectFn: (reason?: any) => void = noop;
  const promise = new Promise((resolve, reject) => {
    timer = setTimeout(resolve, ms);
    rejectFn = reject;
  });

  return {
    promise,
    cancel: () => {
      clearTimeout(timer);
      rejectFn(new Error('Cancelled'));
    },
    close: () => {
      clearTimeout(timer);
      timer = undefined;
      rejectFn = noop;
    },
  };
};

// 렌더링 후 상태 업데이트를 예약하는 데 사용되는 함수
export function scheduleMicrotask(callback: () => void): void {
  Promise.resolve()
    .then(callback)
    .catch((error) =>
      setTimeout(() => {
        throw error;
      }),
    );
}

export function validateOrigin(origin: string) {
  const corsWhitelist: RegExp[] = CORS_WHITELIST.ORIGIN;

  const isAllowed = corsWhitelist.some((regex) => regex.test(origin));

  return isAllowed;
}

export function escapeHTMLEntities(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .trim();
}

export function generateRssItemTemplate(item: ItemSchema) {
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
  </item>`.trim();
}

export function generateRssTemplate(link: string, rssItems: string) {
  const date = new Date().toUTCString();
  return `
  <rss version="2.0">
    <channel>
      <title>${SITE_CONFIG.title}</title>
      <link>${link}</link>
      <description>${SITE_CONFIG.description}</description>
      <language>ko</language>
      <lastBuildDate>${date}</lastBuildDate>
      ${rssItems}
    </channel>
  </rss>
`;
}
