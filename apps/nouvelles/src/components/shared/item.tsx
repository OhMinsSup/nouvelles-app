"use client";
import { useMemo } from "react";
import { Card } from "~/components/ui/card";
import Avatars from "~/components/shared/avatars";
import {
  Button,
  buttonVariants,
} from "~/components/ui/button";
import { TipTapEditor } from "~/components/editor/tiptap-editor";
import { cn, getDateFormatted } from "~/utils/utils";

import type { ItemSchema } from "~/server/items/items.model";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface ItemProps {
  item: ItemSchema;
}

export default function Item({ item }: ItemProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const date =
    item && item.pulbishedAt ? getDateFormatted(item.pulbishedAt) : null;

  const link = useMemo(() => {
    const _link = item.realLink ?? item.link ?? "#";
    if (_link === "#") {
      return {
        label: "No link",
        href: "#",
      };
    } else if (_link.startsWith("http") || _link.startsWith("https")) {
      return {
        label: _link,
        href: _link,
      };
    }
    return {
      label: "Invalid link",
      href: "#",
    };
  }, [item]);

  const categoryUrl = useMemo(() => {
    const _searchParams = new URLSearchParams(searchParams);
    if (_searchParams.has("category")) {
      _searchParams.delete("category");
    } else {
      if (item.Category) _searchParams.set("category", item.Category.name);
    }
    return `${pathname}?${_searchParams.toString()}`;
  }, [searchParams, pathname]);

  const tagUrl = useMemo(() => {
    const _searchParams = new URLSearchParams(searchParams);
    if (_searchParams.has("tag")) {
      _searchParams.delete("tag");
    } else {
      const firstTag = item.ItemTag.at(0);
      if (firstTag && firstTag.tag) _searchParams.set("tag", firstTag.tag.name);
    }
    return `${pathname}?${_searchParams.toString()}`;
  }, [searchParams, pathname]);

  return (
    <Card className="m-3 mx-auto overflow-hidden rounded-none border-x-0 border-b border-t-0 shadow-none">
      <div className="md:flex">
        <div className="md:shrink-0">
          <span className="h-[192px] w-[192px] rounded-md bg-muted object-cover md:w-48" />
        </div>
        <div className="w-full py-2">
          <div className="flex items-center justify-between">
            <div className="flex w-full items-center">
              <Avatars
                src={undefined}
                alt={`${item?.reporter} profile picture`}
                fallback="T"
              />
              <div className="ml-4 flex w-full flex-row items-center">
                <div className="text-base font-semibold tracking-wide text-black dark:text-white">
                  {item?.reporter}
                </div>
                <div className="flex flex-1 justify-end space-x-3">
                  <div
                    className="text-sm text-gray-400 dark:text-gray-300"
                    suppressHydrationWarning
                  >
                    {date}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="py-4">
            <Button
              variant="link"
              className="p-0 text-2xl font-semibold"
              asChild
            >
              <a
                target="_blank"
                rel="noopener"
                aria-label={link.label}
                href={link.href}
              >
                {item.title}
              </a>
            </Button>
          </div>
          <div className="py-4">
            <TipTapEditor
              editable={false}
              debouncedUpdatesEnabled={false}
              name={`thraed-text-${item?.id}`}
              value={item.description ? item.description : ""}
              noBorder
              className={cn(
                "prose prose-brand prose-headings:font-display font-default focus:outline-none"
              )}
              customClassName="p-0 mt-4"
            />
          </div>
          <div className="flex items-center justify-end space-x-4 py-4">
            <div className="flex items-center space-x-1">
              {item.Category ? (
                <Link
                  href={categoryUrl}
                  replace
                  prefetch={false}
                  className={buttonVariants({
                    variant: "secondary",
                    size: "xxs",
                    className: "text-xs",
                  })}
                >
                  {item.Category.name}
                </Link>
              ) : null}
              {item.ItemTag.map((data) => (
                <Link
                  href={tagUrl}
                  replace
                  prefetch={false}
                  key={data.tag.id}
                  className={buttonVariants({
                    variant: "secondary",
                    size: "xxs",
                  })}
                >
                  {data.tag.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
