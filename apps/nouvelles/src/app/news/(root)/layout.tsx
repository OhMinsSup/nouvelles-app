import React from 'react';
import MainLayout from '~/components/layout/main-layout';
import { SidebarDesktop, SidebarTablet } from '~/components/layout/sidebar';
import RightSidebar from '~/components/layout/right-sidebar';
import NavigationArea from '~/components/layout/navigation-area';
import MobileHeaderArea from '~/components/layout/mobile-header-area';

interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <MainLayout
      className="overflow-hidden"
      desktopSidebar={<SidebarDesktop />}
      mobileFooter={<NavigationArea />}
      mobileHeader={<MobileHeaderArea />}
      rightSidebar={<RightSidebar />}
      tabletSidebar={<SidebarTablet />}
    >
      {children}
    </MainLayout>
  );
}
