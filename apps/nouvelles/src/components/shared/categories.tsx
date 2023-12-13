'use client';
import React, { useMemo } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import type { Category } from '@nouvelles/database';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '~/utils/utils';
import { buttonVariants } from '~/components/ui/button';

interface CategoriesProps {
  categories: Category[];
}

export default function Categories({ categories }: CategoriesProps) {
  return (
    <ScrollArea.Root className="overflow-hidden">
      <ScrollArea.Viewport>
        {categories.map((category) => (
          <Categories.Category
            category={category}
            key={`category-${category.id}`}
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
      className={buttonVariants({
        variant: 'ghost',
        className: cn({
          'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50':
            isEquals,
        }),
      })}
      href={url}
      prefetch={false}
      replace
    >
      {category.name}
    </Link>
  );
};
