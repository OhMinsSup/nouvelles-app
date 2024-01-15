'use client';
import { Separator } from '~/components/ui/separator';
import { Heading } from '~/components/ui/heading';
import DataTable from '~/components/table/data-table';
import { columns } from '~/components/neural/columns';
import type { ItemSchema } from '~/services/api/items/items.model';

interface NeuralTableProps {
  data: ItemSchema[];
}

export default function NeuralTable({ data }: NeuralTableProps) {
  console.log(data);
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          description="뉴스럴에서 수집한 데이터를 확인할 수 있습니다."
          title={`뉴스럴 (${data.length})`}
        />
      </div>
      <Separator />
      <DataTable columns={columns} data={data} />
    </>
  );
}
