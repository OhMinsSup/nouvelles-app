import React, { Suspense } from 'react';
import MainLayout from '~/components/layout/main-layout';
import Sidebar from '~/components/layout/sidebar';
import SidebarCategories from '~/components/layout/sidebar-categories';

interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <MainLayout
      sidebar={
        <Sidebar
          categories={
            <Suspense fallback={<>Loading..</>}>
              <SidebarCategories />
            </Suspense>
          }
        />
      }
    >
      {children}
    </MainLayout>
  );
}
