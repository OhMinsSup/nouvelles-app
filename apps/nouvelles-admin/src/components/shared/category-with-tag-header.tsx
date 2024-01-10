import React from 'react';
import CopyButton from '~/components/shared/copy-button';
import RssFeedButton from './rss-feed-button';

interface CategoryWithTagHeaderProps {
  type: 'tags' | 'categories';
  name: string;
  slug: string;
  id: number;
  count: number;
}

export default function CategoryWithTagHeader({
  name,
  slug,
  count,
  type,
}: CategoryWithTagHeaderProps) {
  const text = decodeURIComponent(name);
  return (
    <div className="w-full relative flex flex-col gap-1 items-start p-6 overflow-hidden border-b">
      <div className="sm:hidden flex flex-row justify-end w-full items-start">
        <div className="flex flex-row gap-2 justify-end z-10">
          <CopyButton />
          <RssFeedButton slug={slug} type={type} />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-col justify-start gap-0.5">
          <div className="font-heading text-2xl text-slate-700 dark:text-slate-200 font-semibold z-10">
            {text}
          </div>
          <div className="flex-row gap-2 hidden sm:flex">
            <div className="flex flex-row gap-2 z-10 text-slate-500 dark:text-slate-400">
              <span className="z-10">#{slug}</span>
              <span className="font-bold hidden sm:block">·</span>
            </div>
            <div className="flex flex-row gap-2 z-10 text-slate-500 dark:text-slate-400">
              <span>{count}개의 뉴스</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center w-full justify-between sm:hidden">
        <div className="flex flex-row gap-2 z-10 text-slate-500 dark:text-slate-400">
          <span>#{slug}</span>
          <span className="block font-bold">·</span>
          <span>{count}개의 뉴스</span>
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center z-10 w-full">
        <div className="sm:flex hidden w-full">
          <div className="flex flex-row gap-2 justify-end z-10 w-full">
            <CopyButton />
            <RssFeedButton slug={slug} type={type} />
          </div>
        </div>
      </div>
    </div>
  );
}
