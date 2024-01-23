import React from 'react';
import { KakaoSDKLoader } from '~/services/providers/kakao';
import { env } from 'env.mjs';
import CopyButton from './copy-button';
import RssFeedButton from './rss-feed-button';
import ShareButton from './share-button';

interface TodayHeaderProps {
  id: number;
  count: number;
}

export default function TodayHeader({ count, id }: TodayHeaderProps) {
  return (
    <KakaoSDKLoader clientId={env.KAKAO_SDK_CLIENT_ID}>
      <div className="w-full relative flex flex-col gap-1 items-start p-6 overflow-hidden border-b border-x">
        <div className="sm:hidden flex flex-row justify-end w-full items-start">
          <div className="flex flex-row gap-2 justify-end z-10">
            <ShareButton id={id} />
            <CopyButton />
            <RssFeedButton type="today" />
          </div>
        </div>
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-col justify-start gap-0.5">
            <div className="font-heading text-2xl text-slate-700 dark:text-slate-200 font-semibold z-10">
              오늘의 뉴스
            </div>
            <div className="flex-row gap-2 hidden sm:flex">
              <div className="flex flex-row gap-2 z-10 text-slate-500 dark:text-slate-400">
                <span>{count}개의 뉴스</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center w-full justify-between sm:hidden">
          <div className="flex flex-row gap-2 z-10 text-slate-500 dark:text-slate-400">
            <span>{count}개의 뉴스</span>
          </div>
        </div>
        <div className="flex flex-row gap-2 items-center z-10 w-full">
          <div className="sm:flex hidden w-full">
            <div className="flex flex-row gap-2 justify-end z-10 w-full">
              <ShareButton id={id} />
              <CopyButton />
              <RssFeedButton type="today" />
            </div>
          </div>
        </div>
      </div>
    </KakaoSDKLoader>
  );
}
