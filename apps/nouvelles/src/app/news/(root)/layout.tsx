import React from 'react';
import MainLayout from '~/components/layout/main-layout';
import { SidebarDesktop, SidebarTablet } from '~/components/layout/sidebar';
import RightSidebar from '~/components/layout/right-sidebar';
import MainNav from '~/components/layout/main-nav';
import MainHeader from '~/components/layout/main-header';

interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <MainLayout
      desktopSidebar={<SidebarDesktop />}
      mobileFooter={<MainNav />}
      mobileHeader={<MainHeader />}
      rightSidebar={<RightSidebar />}
      tabletSidebar={<SidebarTablet />}
    >
      {children}
    </MainLayout>
  );
}
