import type { Table } from '@tanstack/react-table';
import { Button } from '~/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Icons } from '~/components/icons';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export default function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{' '}
        {table.getFilteredRowModel().rows.length} 행이 선택되었습니다.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">페이지당 행 수</p>
          <Select
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
            value={`${table.getState().pagination.pageSize}`}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          페이지 {table.getState().pagination.pageIndex + 1} /{' '}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            className="hidden h-8 w-8 p-0 lg:flex"
            disabled={!table.getCanPreviousPage()}
            onClick={() => {
              table.setPageIndex(0);
            }}
            variant="outline"
          >
            <span className="sr-only">처음 페이지로 이동</span>
            <Icons.chevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            className="h-8 w-8 p-0"
            disabled={!table.getCanPreviousPage()}
            onClick={() => {
              table.previousPage();
            }}
            variant="outline"
          >
            <span className="sr-only">이전 페이지로 이동</span>
            <Icons.chevronLeft className="h-4 w-4" />
          </Button>
          <Button
            className="h-8 w-8 p-0"
            disabled={!table.getCanNextPage()}
            onClick={() => {
              table.nextPage();
            }}
            variant="outline"
          >
            <span className="sr-only">다음 페이지로 이동</span>
            <Icons.chevronRight className="h-4 w-4" />
          </Button>
          <Button
            className="hidden h-8 w-8 p-0 lg:flex"
            disabled={!table.getCanNextPage()}
            onClick={() => {
              table.setPageIndex(table.getPageCount() - 1);
            }}
            variant="outline"
          >
            <span className="sr-only">마지막 페이지로 이동</span>
            <Icons.chevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
