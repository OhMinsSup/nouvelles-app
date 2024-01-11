import Link from 'next/link';
import UserNav from '~/components/layout/user-nav';
import ThemeMenu from '~/components/layout/theme-menu';
import MobileSidebar from '~/components/layout/mobile-sidebar';
import { cn } from '~/utils/utils';
import { PAGE_ENDPOINTS } from '~/constants/constants';

export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className="hidden md:block">
          <Link href={PAGE_ENDPOINTS.DASHBOARD.ROOT} target="_blank">
            <svg
              className="mr-2 h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
          </Link>
        </div>
        <div className={cn('block md:!hidden')}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          <UserNav />
          <ThemeMenu />
        </div>
      </nav>
    </div>
  );
}
