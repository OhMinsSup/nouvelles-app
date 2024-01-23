'use client';
import React from 'react';
import Card from '~/components/skeleton/card';
import { Icons } from '~/components/icons';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import CopyButton from '~/components/shared/copy-button';
import RssFeedButton from '~/components/shared/rss-feed-button';

export default function CardList() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Card key={`card-skeleton-${index}`} />
      ))}
    </>
  );
}

interface CardListWithHeaderSkeletonProps {
  type?: 'default' | 'today';
}

export function CardListWithHeaderSkeleton({
  type,
}: CardListWithHeaderSkeletonProps) {
  return (
    <>
      <CardListHeaderSkeleton type={type} />
      <CardList />
    </>
  );
}

export function CardListWithSearhHeaderSkeleton() {
  return (
    <>
      <section className="py-5 md:py-8 px-6 border-x">
        <form>
          <div className="relative">
            <Icons.search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              autoComplete="off"
              className="pl-8"
              name="q"
              placeholder="검색어를 입력하세요"
              type="search"
            />
          </div>
        </form>
      </section>
      <CardList />
    </>
  );
}

interface CardListHeaderSkeletonProps {
  type?: 'default' | 'today';
}

export function CardListHeaderSkeleton({ type }: CardListHeaderSkeletonProps) {
  return (
    <div className="w-full relative flex flex-col gap-1 items-start p-6 overflow-hidden border-b border-x">
      <div className="sm:hidden flex flex-row justify-end w-full items-start">
        <div className="flex flex-row gap-2 justify-end z-10">
          {type === 'today' ? (
            <Button size="icon" type="submit" variant="outline">
              <Icons.share />
            </Button>
          ) : null}
          <CopyButton />
          <RssFeedButton type="placeholders" />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-col justify-start gap-0.5">
          <div className="font-heading text-2xl text-slate-700 dark:text-slate-200 font-semibold z-10">
            <span className="bg-gray-200 rounded-sm animate-pulse text-transparent">
              placeholder
            </span>
          </div>
          <div className="flex-row gap-2 hidden sm:flex">
            <div className="flex flex-row gap-2 z-10 text-slate-500 dark:text-slate-400">
              <span className="bg-gray-200 rounded-sm animate-pulse text-transparent">
                placeholder
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center w-full justify-between sm:hidden">
        <div className="flex flex-row gap-2 z-10 text-slate-500 dark:text-slate-400">
          <span className="bg-gray-200 rounded-sm animate-pulse text-transparent">
            placeholder
          </span>
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center z-10 w-full">
        <div className="sm:flex hidden w-full">
          <div className="flex flex-row gap-2 justify-end z-10 w-full">
            {type === 'today' ? (
              <Button size="icon" type="submit" variant="outline">
                <Icons.share />
              </Button>
            ) : null}
            <CopyButton />
            <RssFeedButton type="placeholders" />
          </div>
        </div>
      </div>
    </div>
  );
}
