'use client';

import type { ColumnDef } from '@tanstack/react-table';
import type { ItemSchema } from '~/services/api/items/items.model';
import { formatDate } from '@nouvelles/date';
import { Badge } from '~/components/ui/badge';
import DataTableColumnHeader from '~/components/table/data-table-column-header';
import DataTableRowActions from '~/components/crawling/data-table-row-actions';
import { DATE_FORMAT } from '~/constants/constants';

export const columns: ColumnDef<ItemSchema>[] = [
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
    accessorKey: 'neusralId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="뉴스럴 아이디" />
    ),
    cell: ({ row }) => {
      const value = row.getValue<string>('neusralId');
      return <div className="w-[100px]">{value}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="제목" />
    ),
    cell: ({ row }) => {
      const value = row.getValue<string>('title');
      return (
        <div className="flex space-x-2">
          <span className="max-w-[250px] truncate font-medium">{value}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'link',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="뉴스럴 링크" />
    ),
    cell: ({ row }) => {
      const value = row.getValue<string>('link');
      return (
        <div className="flex space-x-2">
          <span className="max-w-[150px] truncate font-medium">
            <a
              className="p-0 text-md font-semibold underline-offset-4 hover:underline"
              href={value}
              rel="noopener"
              target="_blank"
            >
              {value}
            </a>
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'realLink',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="뉴스 링크" />
    ),
    cell: ({ row }) => {
      const value = row.getValue<string>('realLink');
      return (
        <div className="flex space-x-2">
          <span className="max-w-[150px] truncate font-medium">
            <a
              className="p-0 text-md font-semibold underline-offset-4 hover:underline"
              href={value}
              rel="noopener"
              target="_blank"
            >
              {value}
            </a>
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="설명" />
    ),
    cell: ({ row }) => {
      const value = row.getValue<string>('description');
      return (
        <div className="flex items-center">
          <span className="max-w-[150px] truncate font-medium">{value}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'publishedAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="발행일" />
    ),
    cell: ({ row }) => {
      const value = row.getValue<string>('publishedAt');
      return (
        <div className="flex items-center">
          <span className="max-w-[150px] truncate font-medium">
            {formatDate(value, DATE_FORMAT.KO.DATE)}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: 'Newspaper',
    accessorFn: (row) => {
      return row.Newspaper;
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="신문사" />
    ),
    cell: ({ row }) => {
      const value = row.getValue<ItemSchema['Newspaper']>('Newspaper');
      return (
        <div className="flex items-center">
          <span className="font-medium max-w-[110px] truncate">
            {value?.name}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const data = row.getValue<ItemSchema['Newspaper']>(id);
      return value.includes(data.name);
    },
  },
  {
    id: 'Category',
    accessorFn: (row) => {
      return row.Category;
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="카테고리" />
    ),
    cell: ({ row }) => {
      const value = row.getValue<ItemSchema['Category']>('Category');
      return (
        <div className="flex items-center">
          <span className="font-medium">
            <Badge className="max-w-[110px] truncate">{value?.name}</Badge>
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const data = row.getValue<ItemSchema['Category']>(id);
      return value.includes(data.name);
    },
  },
  {
    id: 'Tags',
    accessorFn: (row) => {
      return row.ItemTag;
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="태그" />
    ),
    cell: ({ row }) => {
      const value = row.getValue<ItemSchema['ItemTag']>('Tags');
      return (
        <div className="flex items-center">
          <span className="font-medium space-x-2">
            {value?.map((item) => (
              <Badge className="max-w-[110px] truncate" key={item.tag.id}>
                {item.tag.name}
              </Badge>
            ))}
          </span>
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
