import React from 'react';

interface MainLayoutProps {
  sidebar?: React.ReactNode;
  children: React.ReactNode;
}

export default function MainLayout({ children, sidebar }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-[#f7f9fc]">
      {sidebar}
      {children}
    </div>
  );
}
