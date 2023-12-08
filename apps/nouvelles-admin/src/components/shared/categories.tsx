'use client';
import React, { useMemo } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { buttonVariants } from '~/components/ui/button';
import type { Category } from '@prisma/client';
import Link from 'next/link';
import { cn } from '~/utils/utils';
import { usePathname, useSearchParams } from 'next/navigation';

interface CategoriesProps {
  categories: Category[];
}

export default function Categories({ categories }: CategoriesProps) {
  return (
    <ScrollArea.Root className="overflow-hidden">
      <ScrollArea.Viewport>
        {categories.map((category) => (
          <Categories.Category
            key={`category-${category.id}`}
            category={category}
          />
        ))}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="horizontal">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar orientation="vertical">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea.Root>
  );
}

interface CategoryProps {
  category: Category;
}

Categories.Category = function Item({ category }: CategoryProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const url = useMemo(() => {
    const _searchParams = new URLSearchParams(searchParams);
    if (_searchParams.has('category')) {
      _searchParams.delete('category');
    } else {
      _searchParams.set('category', category.name);
    }
    return `${pathname}?${_searchParams.toString()}`;
  }, [category, pathname]);

  const isEquals = useMemo(() => {
    const _category = searchParams.get('category');
    if (!_category) return false;
    return decodeURIComponent(_category) === category.name;
  }, [searchParams]);

  return (
    <Link
      replace
      href={url}
      prefetch={false}
      className={buttonVariants({
        variant: 'ghost',
        className: cn({
          'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50':
            isEquals,
        }),
      })}
    >
      {category.name}
    </Link>
  );
};
