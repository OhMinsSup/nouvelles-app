import React from 'react';
import NeuralTable from '~/components/neural/table';
import BreadCrumb from '~/components/layout/breadcrumb';
import { PAGE_ENDPOINTS } from '~/constants/constants';
import { itemService } from '~/services/api/items/items.server';

const breadcrumbItems = [
  { title: '뉴스럴 관리', link: PAGE_ENDPOINTS.DASHBOARD.NEURAL.ROOT },
];

export default async function Page() {
  const { list } = await itemService.all({
    pageNo: 1,
    limit: 10,
  });

  return (
    <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />
      <NeuralTable data={list} />
    </div>
  );
}
