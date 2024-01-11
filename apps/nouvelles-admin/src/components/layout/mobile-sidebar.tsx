'use client';
import { useState } from 'react';
import { Icons } from '~/components/icons';
import { Sheet, SheetContent, SheetTrigger } from '~/components/ui/sheet';
import { navItems } from '~/constants/nav';
import DashboardNav from '~/components/layout/dashboard-nav';

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        <Icons.menu />
      </SheetTrigger>
      <SheetContent className="!px-0" side="left">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Overview
            </h2>
            <div className="space-y-1">
              <DashboardNav items={navItems} setOpen={setOpen} />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
