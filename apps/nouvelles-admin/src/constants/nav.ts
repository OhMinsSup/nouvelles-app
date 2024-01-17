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
  {
    id: 3,
    title: '뉴스럴 관리',
    href: PAGE_ENDPOINTS.DASHBOARD.NEURAL.ROOT,
    icon: 'layoutList',
    label: 'neural',
  },
  {
    id: 4,
    title: '태그 관리',
    href: PAGE_ENDPOINTS.DASHBOARD.TAGS.ROOT,
    icon: 'tag',
    label: 'tags',
  },
  {
    id: 5,
    title: '카테고리 관리',
    href: PAGE_ENDPOINTS.DASHBOARD.CATEGORIES.ROOT,
    icon: 'tag',
    label: 'categories',
  },
  {
    id: 6,
    title: '신문사 관리',
    href: PAGE_ENDPOINTS.DASHBOARD.NEWSPAPERS.ROOT,
    icon: 'newspaper',
    label: 'newspapers',
  },
];
