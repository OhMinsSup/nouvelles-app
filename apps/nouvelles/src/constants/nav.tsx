'use client';
import type { LucideIcon } from 'lucide-react';
import { PAGE_ENDPOINTS } from '~/constants/constants';
import { Icons } from '~/components/icons';

export interface NavItem {
  id: 'home' | 'search' | 'recent' | 'setting';
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
      title: '홈',
      href: PAGE_ENDPOINTS.NEWS.HOME,
      icon: Icons.home,
    },
    {
      id: 'recent',
      type: 'link',
      title: '오늘의 뉴스',
      href: PAGE_ENDPOINTS.NEWS.TODAY,
      icon: Icons.today,
    },
    {
      id: 'search',
      type: 'link',
      title: '검색',
      href: PAGE_ENDPOINTS.NEWS.SEARCH,
      icon: Icons.search,
    },
  ] as NavItem[],
};
