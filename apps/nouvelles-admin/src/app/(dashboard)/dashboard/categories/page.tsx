import React from 'react';
import CrawlingTable from '~/components/crawling/table';
import BreadCrumb from '~/components/layout/breadcrumb';
import { PAGE_ENDPOINTS } from '~/constants/constants';
import { crawlingService } from '~/services/api/crawling/crawling.server';

const breadcrumbItems = [
  { title: '크롤링 관리', link: PAGE_ENDPOINTS.DASHBOARD.CRAWLING.ROOT },
];

export default async function Page() {
  const data = await crawlingService.all();
  return (
    <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />
      <CrawlingTable data={data} />
    </div>
  );
}
