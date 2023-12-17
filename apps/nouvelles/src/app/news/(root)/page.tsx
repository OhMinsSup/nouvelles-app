import Link from 'next/link';
import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';
import { PAGE_ENDPOINTS } from '~/constants/constants';

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
      sdasdassadsadasdsa
    </div>
  );
}

// background-color: rgb(255, 255, 255);
// flex-direction: row;
// align-items: center;
// justify-content: space-between;
// padding: 12px 18px;
