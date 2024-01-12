import type { Icons } from '~/components/icons';
import { PAGE_ENDPOINTS } from './constants';

export interface NavItem {
  id: number;
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export const navItems: NavItem[] = [
  {
    id: 1,
    title: '대시보드',
    href: PAGE_ENDPOINTS.DASHBOARD.ROOT,
    icon: 'dashboard',
    label: 'dashboard',
  },
  {
    id: 2,
    title: '크롤링 관리',
    href: PAGE_ENDPOINTS.DASHBOARD.CRAWLING.ROOT,
    icon: 'combine',
    label: 'crawling',
  },
];
