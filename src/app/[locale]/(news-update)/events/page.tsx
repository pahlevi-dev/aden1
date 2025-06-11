'use server';

import { CarouselActivities } from '@/components/newsUpdates/CarouselActivities';
import { ContainerListNews } from '@/components/newsUpdates/ContainerListNews';
import { Loading } from '@/components/ui/loading';
import { PostType } from '@/constants/posts';
import { IParams, IQuery } from '@/interface/config/params';
import { INewsResumeActivity } from '@/interface/query/newsUpdate/responseApi';
import { customMetaDataGenerator } from '@/lib/config/metadataGenerator';
import { Config } from '@/lib/config/url';
import { getQueryClientBlogs } from '@/lib/graphql/client';
import { queryNewsUpdateList } from '@/lib/graphql/query/newsUpdates/newsUpdateList';
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
    namespace: 'Activities',
  });

  const metadata: Metadata = customMetaDataGenerator({
    title: t('title'),
    description: t('description'),
    icon: '../../logo.svg',
    canonicalUrl: Config.origin + `/${locale}/events`,
  });

  return metadata;
}

export default async function EventsPageList({ params, searchParams }: IProps) {
  const search = await searchParams;
  const pageSize = 12;
  const page = search.page || 1;
  const t = await getTranslations('Activities');
  const locale = (await params).locale;

  const { data } = await getQueryClientBlogs<INewsResumeActivity>(
    queryNewsUpdateList,
    {
      first: pageSize,
      skip: pageSize * (page - 1),
      type: [PostType.Activity],
    }
  );

  return (
    <div className="container mx-auto px-5 space-y-5">
      <div className="md:flex items-center justify-between mb-5">
        <h1 className="max-w-[500px]">{t('title')}</h1>
        <div className="max-w-[200px]">
          <p>{t('description')}</p>
        </div>
      </div>
      <Suspense fallback={<Loading />}>
        <CarouselActivities data={data.blogPosts} locale={locale} />
      </Suspense>

      <Suspense fallback={<Loading type="cards" />}>
        <ContainerListNews
          item={data.blogPostsConnection.edges}
          pageSize={pageSize}
          totalSize={10}
          page={page}
          locale={locale}
        />
      </Suspense>
    </div>
  );
}
