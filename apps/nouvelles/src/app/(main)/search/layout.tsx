import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative flex grow flex-col self-center py-4">
      {children}
    </div>
  );
}
