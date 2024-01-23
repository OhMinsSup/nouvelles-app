import Link from 'next/link';
import { PAGE_ENDPOINTS } from '~/constants/constants';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="mx-auto md:max-w-[600px] w-full">
      <div className="hidden md:block md:border-b md:border-l md:border-r">
        <div className="flex flex-row items-center justify-between px-[18px] py-3">
          <Link
            className="scroll-m-20 text-xl font-semibold tracking-tight"
            href={PAGE_ENDPOINTS.NEWS.ROOT}
          >
            Nouvelles
          </Link>
          {/* <Button variant="ghost">
            <Icons.settings />
          </Button> */}
        </div>
      </div>
      {children}
    </div>
  );
}
