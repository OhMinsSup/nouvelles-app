'use client';

import type { ColumnDef } from '@tanstack/react-table';
import type { CrawlerDateCollected } from '@nouvelles/database';
import { formatDate } from '@nouvelles/date';
import DataTableColumnHeader from '~/components/table/data-table-column-header';
import DataTableRowActions from '~/components/crawling/data-table-row-actions';
import { DATE_FORMAT } from '~/constants/constants';

export const columns: ColumnDef<CrawlerDateCollected>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="순서" />
    ),
    cell: ({ row }) => {
      return <div className="w-[80px]">{row.index + 1}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'collectingDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="수집일" />
    ),
    cell: ({ row }) => {
      const value = row.getValue<string>('collectingDate');
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {formatDate(value, DATE_FORMAT.KO.DATE)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="생성일" />
    ),
    cell: ({ row }) => {
      const value = row.getValue<string>('createdAt');
      return (
        <div className="flex items-center">
          <span>{formatDate(value, DATE_FORMAT.KO.DATE)}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="업데이트일" />
    ),
    cell: ({ row }) => {
      const value = row.getValue<string>('updatedAt');
      return (
        <div className="flex items-center">
          <span>{formatDate(value, DATE_FORMAT.KO.DATE)}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
