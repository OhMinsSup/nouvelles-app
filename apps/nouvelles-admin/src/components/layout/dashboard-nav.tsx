'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Dispatch, SetStateAction } from 'react';
import type { NavItem } from '~/constants/nav';
import { cn } from '~/utils/utils';
import { Icons } from '~/components/icons';

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export default function DashboardNav({ items, setOpen }: DashboardNavProps) {
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item) => {
        const Icon = item.icon ? Icons[item.icon] : null;
        return (
          <React.Fragment key={item.id}>
            {item.href ? (
              <Link
                href={item.disabled ? '/' : item.href}
                key={item.href}
                onClick={() => {
                  if (setOpen) setOpen(false);
                }}
              >
                <span
                  className={cn(
                    'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                    path === item.href ? 'bg-accent' : 'transparent',
                    item.disabled && 'cursor-not-allowed opacity-80',
                  )}
                >
                  {Icon ? <Icon className="mr-2 h-4 w-4" /> : null}
                  <span>{item.title}</span>
                </span>
              </Link>
            ) : null}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
