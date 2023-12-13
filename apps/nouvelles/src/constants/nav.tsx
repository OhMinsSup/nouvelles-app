'use client';
import type { LucideIcon } from 'lucide-react';
import { PAGE_ENDPOINTS } from './constants';
import { Icons } from '~/components/icons';

export interface NavItem {
  id: 'home' | 'search' | 'thread' | 'activity' | 'myPage';
  type: 'link' | 'myPage';
  title: string;
  href?: string;
  disabled?: boolean;
  icon: LucideIcon;
}

export const NAV_CONFIG = {
  mainNav: [
    {
      id: 'home',
      type: 'link',
      title: 'Home',
      href: PAGE_ENDPOINTS.ROOT,
      icon: Icons.home,
    },
    {
      id: 'recent',
      type: 'link',
      title: 'Today',
      href: PAGE_ENDPOINTS.TODAY,
      icon: Icons.today,
    },
    {
      id: 'search',
      type: 'link',
      title: 'Search',
      href: PAGE_ENDPOINTS.SEARCH,
      icon: Icons.search,
    },
  ] as NavItem[],
};
