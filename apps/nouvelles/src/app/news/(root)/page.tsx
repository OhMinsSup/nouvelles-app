import Link from 'next/link';
import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';
import { PAGE_ENDPOINTS } from '~/constants/constants';
import Card from '~/components/shared/card';

export default function Page() {
  return (
    <div className="mx-auto md:max-w-[600px] md:border-l md:border-r w-full">
      <div className="hidden md:block md:border-b">
        <div className="flex flex-row items-center justify-between px-[18px] py-3">
          <Link
            className="scroll-m-20 text-xl font-semibold tracking-tight"
            href={PAGE_ENDPOINTS.NEWS.ROOT}
          >
            Nouvelles
          </Link>
          <Button variant="ghost">
            <Icons.settings />
          </Button>
        </div>
      </div>
      <Card />
    </div>
  );
}
