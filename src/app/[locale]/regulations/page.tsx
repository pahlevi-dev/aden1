import { ContainerList } from '@/components/regulations/ContainerList';
import { Loading } from '@/components/ui/loading';
import { DocumentType } from '@/constants/document';
import { IParams } from '@/interface/config/params';
import { IRegulations } from '@/interface/query/regulations';
import { customMetaDataGenerator } from '@/lib/config/metadataGenerator';
import { Config } from '@/lib/config/url';
import { getQueryClientMaster } from '@/lib/graphql/client';
import { queryDocumentList } from '@/lib/graphql/query/regulations/list';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

interface IProps {
  params: Promise<IParams>;
}

export async function generateMetadata({ params }: IProps) {
  const locale = (await params).locale;
  const t = await getTranslations({
    locale: locale,
    namespace: 'Regulations',
  });

  const keywords = t.raw('keywords');

  const metadata: Metadata = customMetaDataGenerator({
    title: t('pageTitle'),
    description: t('description'),
    icon: '../../logo.svg',
    canonicalUrl: Config.origin + `/${locale}/regulations`,
    keywords: keywords,
  });

  return metadata;
}

export default async function Requlations({ params }: IProps) {
  const locale = (await params).locale;
  const t = await getTranslations('Regulations');

  const { data } = await getQueryClientMaster<IRegulations>(queryDocumentList, {
    locale: [locale],
    type: DocumentType.Regulation,
  });

  return (
    <div className="container mx-auto p-5">
      <div className="md:flex items-center justify-between mb-5">
        <h1 className="max-w-[500px]">{t('title')}</h1>
        <div className="max-w-[200px]">
          <p>{t('description')}</p>
        </div>
      </div>

      <Suspense fallback={<Loading type="cards" />}>
        <ContainerList data={data.documents} />
      </Suspense>
    </div>
  );
}
