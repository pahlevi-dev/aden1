import { ContainerGallery } from '@/components/gallery/ContainerGallery';
import { Loading } from '@/components/ui/loading';
import { GalleryType } from '@/constants/gallery';
import { IParams, IQuery } from '@/interface/config/params';
import { IGallery } from '@/interface/query/gallery';
import { GalleryParamsConvert } from '@/lib/config/galleryParamsConverter';
import { locales } from '@/lib/config/locales';
import { customMetaDataGenerator } from '@/lib/config/metadataGenerator';
import { Config } from '@/lib/config/url';
import { getQueryClientBlogs } from '@/lib/graphql/client';
import { queryGalleryList } from '@/lib/graphql/query/gallery/galleryList';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import { IGalleryParams } from '../type';

interface IProps {
  params: Promise<IParams<IGalleryParams>>;
  searchParams: Promise<IQuery>;
}
export async function generateMetadata({
  params,
}: Omit<IProps, 'searchParams'>) {
  const locale = (await params).locale;
  const query = (await params).slug;

  const typeGallery = GalleryParamsConvert(query);

  const t = await getTranslations({
    locale: locale,
    namespace: 'Gallery',
  });

  const metadata: Metadata = customMetaDataGenerator({
    title:
      typeGallery === GalleryType.Operational
        ? t('titleOperational')
        : t('titleNonOperational'),
    description:
      typeGallery === GalleryType.Operational
        ? t('descriptionOperational')
        : t('descriptionNonOperational'),
    icon: '../../logo.svg',
    canonicalUrl: Config.origin + `/${locale}/news-resume`,
  });

  return metadata;
}

export const revalidate = 86400;

export const dynamicParams = false;

export async function generateStaticParams() {
  const slug = ['operational', 'non-operational'];
  const params = locales.flatMap((locale) =>
    slug.map((item) => ({
      locale,
      slug: item,
    }))
  );

  return params;
}

export default async function Galleries({ params, searchParams }: IProps) {
  const param = (await params).slug;
  const query = await searchParams;
  const pageSize = 9;
  const page = query.page || 1;

  const t = await getTranslations('Gallery');
  const typeGallery = GalleryParamsConvert(param);

  const { data } = await getQueryClientBlogs<IGallery>(queryGalleryList, {
    type: typeGallery,
    first: page,
    skip: pageSize * (page - 1),
  });

  return (
    <div className="container mx-auto p-5">
      {typeGallery === GalleryType.Operational ? (
        <div className="md:flex items-center justify-between mb-5">
          <h1 className="max-w-[500px]">{t('titleOperational')}</h1>
          <div className="max-w-[200px]">
            <p>{t('descriptionOperational')}</p>
          </div>
        </div>
      ) : (
        <div className="md:flex items-center justify-between mb-5">
          <h1 className="max-w-[500px]">{t('titleNonOperational')}</h1>
          <div className="max-w-[200px]">
            <p>{t('descriptionNonOperational')}</p>
          </div>
        </div>
      )}

      <Suspense fallback={<Loading type="cards" />}>
        <ContainerGallery
          data={data.galleries}
          pageSize={pageSize}
          totalSize={data.galleries?.length ?? 0}
          page={page}
        />
      </Suspense>
    </div>
  );
}
