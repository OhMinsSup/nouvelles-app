'use client';
import { Separator } from '~/components/ui/separator';
import { Heading } from '~/components/ui/heading';
import DataTable from '~/components/table/data-table';
import { columns } from '~/components/tags/columns';
import type { TagSchema } from '~/services/api/tags/tags.model';

interface TagsTableProps {
  data: TagSchema[];
}

export default function TagsTable({ data }: TagsTableProps) {
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          description="태그를 확인할 수 있습니다."
          title={`태그 (${data.length})`}
        />
      </div>
      <Separator />
      <DataTable columns={columns} data={data} />
    </>
  );
}
