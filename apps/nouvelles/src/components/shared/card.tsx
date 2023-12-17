'use client';
import Link from 'next/link';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip';
import { cn } from '~/utils/utils';
import { TipTapEditor } from '../editor/tiptap-editor';

export default function Card() {
  return (
    <div className=" pr-[15px] pl-[10px] border-b cursor-pointer overflow-hidden">
      <div className="my-2" />
      <div className="mt-[1px] gap-[10px] flex flex-row">
        <div className="pl-2">
          <Avatar>
            <AvatarImage />
            <AvatarFallback>N</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-1">
          <div className="z-[1] gap-1 flex-1 flex-row flex items-center pb-[2px]">
            <div className="max-w-[80%]">
              123123 &nbsp;
              <span className="truncate max-w-full text-sm font-normal text-muted-foreground">
                asddas
              </span>
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
                    className="truncate max-w-full text-sm font-normal text-muted-foreground"
                    href={'/'}
                    aria-label="Dec 14, 2023 at 오전 9:26"
                  >
                    3dy
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Dec 14, 2023 at 오전 9:26</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div>
            <TipTapEditor
              className={cn(
                'prose prose-brand prose-headings:font-display font-default focus:outline-none',
              )}
              customClassName="p-0"
              debouncedUpdatesEnabled={false}
              editable={false}
              name={`thraed-text`}
              noBorder
              value={'123123123'}
            />
          </div>

          <div className="flex items-center justify-end space-x-4 py-4">
            <div className="flex items-center space-x-1">
              {/* {item.Category ? (
                <Link
                  className={buttonVariants({
                    variant: 'secondary',
                    size: 'xxs',
                    className: 'text-xs',
                  })}
                  href={categoryUrl}
                  prefetch={false}
                  replace
                >
                  {item.Category.name}
                </Link>
              ) : null}
              {item.ItemTag.map((data) => (
                <Link
                  className={buttonVariants({
                    variant: 'secondary',
                    size: 'xxs',
                  })}
                  href={tagUrl}
                  key={data.tag.id}
                  prefetch={false}
                  replace
                >
                  {data.tag.name}
                </Link>
              ))} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
