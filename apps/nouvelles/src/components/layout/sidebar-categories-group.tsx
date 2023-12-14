import React from 'react';
import { Button } from '~/components/ui/button';
import { Icons } from '~/components/icons';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '~/components/ui/collapsible';

interface SidebarCategoriesGroupProps {
  children: React.ReactNode;
}

export default function SidebarCategoriesGroup({
  children,
}: SidebarCategoriesGroupProps) {
  return (
    <Collapsible className="px-3 py-2" defaultOpen>
      <div className="flex items-center justify-between space-x-4">
        <h2 className="text-lg font-semibold tracking-tight">카테고리</h2>
        <CollapsibleTrigger asChild>
          <Button size="sm" variant="ghost">
            <Icons.chevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="flex flex-col space-y-3">
        <div className="sr-only">공백 영역</div>
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}
