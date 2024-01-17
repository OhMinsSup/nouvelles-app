import React from 'react';
import Table from '~/components/tags/table';
import BreadCrumb from '~/components/layout/breadcrumb';
import { PAGE_ENDPOINTS } from '~/constants/constants';
import { tagsService } from '~/services/api/tags/tags.server';

const breadcrumbItems = [
  { title: '태그 관리', link: PAGE_ENDPOINTS.DASHBOARD.TAGS.ROOT },
];

export default async function Page() {
  const data = await tagsService.all({
    pageNo: 1,
    limit: 10,
  });
  return (
    <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />
      <Table data={data.list} />
    </div>
  );
}
