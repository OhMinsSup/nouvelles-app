import Link from 'next/link';
import React from 'react';
import { cn } from '~/utils/utils';
import { Icons } from '~/components/icons';
import { PAGE_ENDPOINTS } from '~/constants/constants';

interface BreadCrumbType {
  title: string;
  link: string;
}

interface BreadCrumbPropsType {
  items: BreadCrumbType[];
}

export default function BreadCrumb({ items }: BreadCrumbPropsType) {
  return (
    <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
      <Link
        className="overflow-hidden text-ellipsis whitespace-nowrap"
        href={PAGE_ENDPOINTS.DASHBOARD.ROOT}
      >
        대시보드
      </Link>
      {items?.map((item: BreadCrumbType, index: number) => (
        <React.Fragment key={item.title}>
          <Icons.chevronRight className="h-4 w-4" />
          <Link
            className={cn(
              'font-medium',
              index === items.length - 1
                ? 'text-foreground pointer-events-none'
                : 'text-muted-foreground',
            )}
            href={item.link}
          >
            {item.title}
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
}
