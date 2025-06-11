'use server';

import { CardServices } from '@/components/service/list/CardServices';
import { FilterSearch } from '@/components/service/list/FilterSearch';
import { Loading } from '@/components/ui/loading';
import { IOptions } from '@/interface/config/option';
import { IParams, IQuery } from '@/interface/config/params';
import { IServiceListResponse } from '@/interface/query/services/list';
import { customMetaDataGenerator } from '@/lib/config/metadataGenerator';
import { Config } from '@/lib/config/url';
import { getQueryClientMaster } from '@/lib/graphql/client';
import { queryServiceList } from '@/lib/graphql/query/services/servicesList';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

interface IProps {
  params: Promise<IParams>;
  searchParams: Promise<IQuery>;
}

export async function generateMetadata({
  params,
}: Omit<IProps, 'searchParams'>) {
  const locale = (await params).locale;
  const t = await getTranslations({
    locale: locale,
    namespace: 'ServiceList',
  });

  const metadata: Metadata = customMetaDataGenerator({
    title: t('pageTitle'),
    description: t('description'),
    icon: '../../logo.svg',
    canonicalUrl: Config.url + `/${locale}/services`,
    keywords: t.raw('keywords'),
  });

  return metadata;
}

export default async function ServicesPage({ params, searchParams }: IProps) {
  const t = await getTranslations('ServiceList');
  const locale = (await params).locale;
  const search = (await searchParams).search ?? '';

  const { data } = await getQueryClientMaster<IServiceListResponse>(
    queryServiceList,
    {
      service: search,
      locale: [locale],
    }
  );

  const options: IOptions<string>[] = [
    {
      label: t('filterAll'),
      value: '',
    },
  ];

  data.services?.map((item) => {
    options.push({
      label: item.serviceName,
      value: item.serviceName,
    });
  });

  return (
    <div className="container mx-auto p-5">
      <div className="md:flex items-center justify-between">
        <h1 className="max-w-[500px]">
          {t.rich('title', {
            span: (chunks) => <span className="text-[#00CCFF]">{chunks}</span>,
          })}
        </h1>
        <div className="md:max-w-[300px]">
          <p>{t('description')}</p>
          <Suspense fallback={<Loading />}>
            <FilterSearch options={options} defaultValue={search} />
          </Suspense>
        </div>
      </div>
      <Suspense fallback={<Loading />}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 justify-items-stretch mt-4">
          {data.serviceDetailsConnection.edges?.map((item, i) => (
            <CardServices key={i} {...item.node!} btnText={t('btnText')} />
          ))}
        </div>
      </Suspense>
    </div>
  );
}
