'use client';
import Link from 'next/link';
import React, { useMemo } from 'react';
import { formatDate } from '@nouvelles/date';
import { ClientOnly, ErrorBoundary } from '@nouvelles/react-components';
import Avatars from '~/components/shared/avatars';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip';
import { cn } from '~/utils/utils';
import type { ItemSchema } from '~/services/api/items/items.model';
import { TipTapEditor } from '~/components/editor/tiptap-editor';
import { buttonVariants } from '~/components/ui/button';
import { AspectRatio } from '~/components/ui/aspect-ratio';
import { ASSET_URL, PAGE_ENDPOINTS } from '~/constants/constants';
import ResourceLoader from '~/utils/resource';
import SkeletonCardImage from '~/components/skeleton/card-image';

interface CardProps {
  item: ItemSchema;
}

export default function Card({ item }: CardProps) {
  const date = useMemo(() => {
    if (!item) return null;
    if (!item.publishedAt) return null;
    return {
      formatted: formatDate(item.publishedAt, 'YYYY년 MM월 DD일'),
    };
  }, [item]);

  const url = useMemo(() => {
    const _link = item?.realLink ?? item?.link ?? null;
    if (!_link) return null;
    return new URL(_link);
  }, [item]);

  const description = useMemo(() => {
    if (item?.description) {
      return item?.description ?? '';
    }
    return item?.title ?? '';
  }, [item]);

  const link = useMemo(() => {
    if (!url) {
      return {
        label: 'No link',
        href: '#',
      };
    }
    return {
      label: url.hostname,
      href: url.href,
    };
  }, [url]);

  const newspaperLink = useMemo(() => {
    if (!item?.Newspaper?.slug) {
      return PAGE_ENDPOINTS.NEWS.HOME;
    }
    return PAGE_ENDPOINTS.NEWS.NEWS_PAPERS.ID(item?.Newspaper?.slug);
  }, [item]);

  return (
    <div
      className="pr-[15px] pl-[10px] border-b cursor-pointer overflow-hidden border-x"
      data-name="card-item"
    >
      <div className="my-2" />
      <div className="mt-[1px] gap-[10px] flex flex-row">
        <div className="pl-2">
          <Avatars
            alt={`${item?.Newspaper?.name} profile picture`}
            fallback="N"
            src={undefined}
          />
        </div>
        <div className="flex-1">
          <div className="z-[1] gap-1 flex-1 flex-row flex items-center pb-[2px]">
            <div className="max-w-[80%]">
              <Link
                aria-label={link.label}
                className="p-0 text-md font-semibold underline-offset-4 hover:underline"
                href={newspaperLink}
              >
                {item?.Newspaper?.name}
              </Link>
            </div>
            <div
              className="text-sm font-normal text-muted-foreground"
              dir="auto"
            >
              ·
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    className="truncate max-w-full text-sm font-normal text-muted-foreground underline-offset-4 hover:underline"
                    href={link.href}
                  >
                    {date?.formatted}
                  </Link>
                </TooltipTrigger>
                <TooltipContent>{date?.formatted}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex flex-col gap-4 md:gap-5 w-full">
            <div className="w-full flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-6 justify-between">
              <div className="flex flex-col gap-1 ">
                <div>
                  <a
                    aria-label={link.label}
                    href={link.href}
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    <h1 className="font-heading text-base sm:text-xl font-semibold sm:font-bold  text-slate-700 dark:text-slate-200 hn-break-words cursor-pointer">
                      {item?.title}
                    </h1>
                  </a>
                </div>
                <div className="hidden md:block">
                  <a
                    aria-label={link.label}
                    href={link.href}
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    <TipTapEditor
                      className={cn(
                        'text-base hidden font-normal text-slate-500 dark:text-slate-400 hn-break-words cursor-pointer md:line-clamp-2 max-h-[50px]',
                      )}
                      customClassName="p-0"
                      debouncedUpdatesEnabled={false}
                      editable={false}
                      name="thread-text"
                      noBorder
                      value={description}
                    />
                  </a>
                </div>
              </div>
              {item?.image ? (
                <div className="w-full rounded-xl md:rounded-lg bg-slate-100 dark:bg-slate-800 relative cursor-pointer md:basis-[180px] md:h-[108px] md:shrink-0">
                  <div className="md:hidden">
                    <AspectRatio ratio={16 / 9}>
                      <a
                        aria-label={link.label}
                        className="block w-full h-full overflow-hidden rounded-xl md:rounded-lg focus:outline-none focus:ring focus:ring-offset-2 focus:ring-offset-white focus:dark:ring-offset-slate-800"
                        href={link.href}
                        rel="noreferrer noopener"
                        target="_blank"
                      >
                        <SuspenseImage item={item} />
                      </a>
                    </AspectRatio>
                  </div>
                  <div className="hidden md:block w-full h-full">
                    <a
                      aria-label={link.label}
                      className="block w-full h-full overflow-hidden rounded-xl md:rounded-lg focus:outline-none focus:ring focus:ring-offset-2 focus:ring-offset-white focus:dark:ring-offset-slate-800"
                      href={link.href}
                      rel="noreferrer noopener"
                      target="_blank"
                    >
                      <SuspenseImage item={item} />
                    </a>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex items-center justify-end space-x-4 py-4">
            <div className="flex items-center space-x-1">
              {item?.Category ? (
                <Link
                  className={buttonVariants({
                    variant: 'secondary',
                    size: 'xxs',
                    className: 'text-xs truncate',
                  })}
                  href={PAGE_ENDPOINTS.NEWS.CATEGORIES.ID(item.Category.slug)}
                >
                  {item.Category.name}
                </Link>
              ) : null}
              {item?.ItemTag?.map((data) => (
                <Link
                  className={buttonVariants({
                    variant: 'secondary',
                    size: 'xxs',
                    className: 'truncate',
                  })}
                  href={PAGE_ENDPOINTS.NEWS.TAGS.ID(data.tag.slug)}
                  key={data.tag.id}
                >
                  {data.tag.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Card.End = function CardEnd() {
  return (
    <div className="w-full py-5">
      <p className="text-md text-center text-slate-700 dark:text-slate-300">
        더 이상의 콘텐츠가 없습니다. 👋
      </p>
    </div>
  );
};

function SuspenseImage({ item }: CardProps) {
  return (
    <ClientOnly fallback={<SkeletonCardImage />}>
      <ErrorBoundary fallback={<Card.ImageError />}>
        <React.Suspense fallback={<SkeletonCardImage />}>
          <Card.Image item={item} />
        </React.Suspense>
      </ErrorBoundary>
    </ClientOnly>
  );
}

Card.Image = function Item({ item }: CardProps) {
  const src = item?.image ? `/api/assets/image?url=${item.image}` : undefined;
  const alt = item?.title ?? '뉴스 이미지가 없습니다.';

  if (src) {
    const resource = ResourceLoader(src, () => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          resolve(src);
        };
        img.onerror = () => {
          resolve(ASSET_URL.PAGE_NOT_FOUND);
        };
        img.src = src;
      });
    });
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    resource.load();
    resource.read();
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt}
      className="object-cover w-full h-full rounded-xl md:rounded-lg"
      loading="lazy"
      src={src}
    />
  );
};

Card.ImageError = function Item() {
  return null;
};
