'use client';
import React from 'react';
import { AspectRatio } from '~/components/ui/aspect-ratio';
import CardImage from '~/components/skeleton/card-image';

export default function Card() {
  return (
    <div className=" pr-[15px] pl-[10px] border-b cursor-pointer overflow-hidden border-x">
      <div className="my-2" />
      <div className="mt-[1px] gap-[10px] flex flex-row">
        <div className="pl-2">
          <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
        </div>
        <div className="flex-1">
          <div className="z-[1] gap-1 flex-1 flex-row flex items-center pb-[2px]">
            <div className="max-w-[80%]">
              <div className="w-24 h-4 bg-gray-200 rounded-full animate-pulse" />
            </div>
            <div className="text-sm font-normal text-muted-foreground">·</div>
            <div className="w-24 h-4 bg-gray-200 rounded-full animate-pulse" />
          </div>
          <div className="flex flex-col gap-4 md:gap-5 w-full">
            <div className="w-full flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-6 justify-between">
              <div className="flex flex-col gap-1 ">
                <div>
                  <div className="w-24 h-4 bg-gray-200 rounded-full animate-pulse" />
                </div>
                <div className="hidden md:block">
                  <div className="w-24 h-4 bg-gray-200 rounded-full animate-pulse" />
                </div>
              </div>
              <div className="w-full rounded-xl md:rounded-lg bg-slate-100 dark:bg-slate-800 relative cursor-pointer md:basis-[180px] md:h-[108px] md:shrink-0">
                <div className="md:hidden">
                  <AspectRatio ratio={16 / 9}>
                    <div className="w-full h-full overflow-hidden rounded-xl md:rounded-lg focus:outline-none focus:ring focus:ring-offset-2 focus:ring-offset-white focus:dark:ring-offset-slate-800">
                      <CardImage />
                    </div>
                  </AspectRatio>
                </div>
                <div className="hidden md:block w-full h-full">
                  <div className="w-full h-full overflow-hidden rounded-xl md:rounded-lg focus:outline-none focus:ring focus:ring-offset-2 focus:ring-offset-white focus:dark:ring-offset-slate-800">
                    <CardImage />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end space-x-4 py-4">
            <div className="flex items-center space-x-1">
              <div className="w-24 h-4 bg-gray-200 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
