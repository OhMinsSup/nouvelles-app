import React from 'react';
import SidebarMenu from './sidebar-menu';

export default function Sidebar() {
  return (
    <div className="flex flex-col w-64 h-full bg-white p-5 border-r">
      <SidebarMenu />
    </div>
  );
}
