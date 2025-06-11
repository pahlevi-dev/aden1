import { ContainerList } from '@/components/regulations/ContainerList';
import { Loading } from '@/components/ui/loading';
import { DocumentType } from '@/constants/document';
import { IParams } from '@/interface/config/params';
import { IRegulations } from '@/interface/query/regulations';
import { getQueryClientMaster } from '@/lib/graphql/client';
import { queryDocumentList } from '@/lib/graphql/query/regulations/list';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

interface IProps {
  params: Promise<IParams>;
}

export default async function Journals({ params }: IProps) {
  const locale = (await params).locale;
  const t = await getTranslations('Journals');

  const { data } = await getQueryClientMaster<IRegulations>(queryDocumentList, {
    locale: [locale],
    type: DocumentType.Journal,
  });

  return (
    <div className="container mx-auto p-5">
      <div className="md:flex items-center justify-between mb-5">
        <h1 className="max-w-[400px]">{t('title')}</h1>
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
