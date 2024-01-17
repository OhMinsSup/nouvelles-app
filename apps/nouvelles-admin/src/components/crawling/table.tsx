'use client';
import type { CrawlerDateCollected } from '@nouvelles/database';
import { Separator } from '~/components/ui/separator';
import { Heading } from '~/components/ui/heading';
import DataTable from '~/components/table/data-table';
import { columns } from '~/components/crawling/columns';

interface CrawlingTableProps {
  data: CrawlerDateCollected[];
}

export default function CrawlingTable({ data }: CrawlingTableProps) {
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          description="크롤링한 날짜를 확인할 수 있습니다."
          title={`크롤링 (${data.length})`}
        />
      </div>
      <Separator />
      <DataTable columns={columns} data={data} />
    </>
  );
}
