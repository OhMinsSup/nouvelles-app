import React from 'react';
import Header from '~/components/layout/header';
import Sidebar from '~/components/layout/sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="w-full pt-16">{children}</main>
      </div>
    </>
  );
}
