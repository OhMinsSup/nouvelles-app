import React from 'react';
import { isEmpty } from '@nouvelles/libs';
import Categories from '~/components/shared/categories';
import { categoriesService } from '~/server/categories/categories.server';

interface LayoutProps {
  children: React.ReactNode;
}
export default async function Layout({ children }: LayoutProps) {
  const categories = await categoriesService.findMany();

  return (
    <>
      {isEmpty(categories) ? null : (
        <div className="pt-5 relative">
          <div className="flex items-center flex-row">
            <div className="relative text-center">
              <Categories categories={categories} />
            </div>
          </div>
        </div>
      )}
      {children}
    </>
  );
}
