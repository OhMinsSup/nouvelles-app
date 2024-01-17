'use client';

import type { ColumnDef } from '@tanstack/react-table';
import type { TagSchema } from '~/services/api/tags/tags.model';
import { formatDate } from '@nouvelles/date';
import DataTableColumnHeader from '~/components/table/data-table-column-header';
import DataTableRowActions from '~/components/crawling/data-table-row-actions';
import { DATE_FORMAT } from '~/constants/constants';

export const columns: ColumnDef<TagSchema>[] = [
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
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="태그" />
    ),
    cell: ({ row }) => {
      const value = row.getValue<string>('name');
      return (
        <div className="flex space-x-2">
          <span className="max-w-[100px] truncate font-medium">{value}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'slug',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="태그 슬러그" />
    ),
    cell: ({ row }) => {
      const value = row.getValue<string>('slug');
      return (
        <div className="flex space-x-2">
          <span className="max-w-[100px] truncate font-medium">{value}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
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
    enableSorting: false,
    enableHiding: false,
    // filterFn: (row, id, value) => {
    //   return value.includes(row.getValue(id));
    // },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
