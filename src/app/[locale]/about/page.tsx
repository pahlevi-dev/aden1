'use server';

import { AboutCompany } from '@/components/about/AboutCompany';
import { Experience } from '@/components/about/Experience';
import { Organization } from '@/components/about/Organization';
import { VisionMission } from '@/components/about/VisionMission';
import { IParams, IQuery } from '@/interface/config/params';
import { IExperienceAboutResponse } from '@/interface/query/experiences/response';
import { customMetaDataGenerator } from '@/lib/config/metadataGenerator';
import { Config } from '@/lib/config/url';
import { getQueryClientMaster } from '@/lib/graphql/client';
import { queryAboutExperience } from '@/lib/graphql/query/about/experiences';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { IAboutQuery } from './type';

interface IProps {
  params: Promise<IParams>;
  searchParams: Promise<IQuery<IAboutQuery>>;
}

export async function generateMetadata({
  params,
}: Omit<IProps, 'searchParams'>) {
  const locale = (await params).locale;
  const t = await getTranslations({
    locale: locale,
    namespace: 'About',
  });

  const keywords = t.raw('keywords');

  const metadata: Metadata = customMetaDataGenerator({
    title: t('pageTitle'),
    description: t('pageDescription'),
    icon: '../../logo.svg',
    canonicalUrl: Config.origin + `/${locale}/about`,
    keywords: keywords,
  });

  return metadata;
}

export default async function About({ searchParams }: IProps) {
  const search = await searchParams;
  const pageSize = 10;
  const page = search.page || 1;
  const slug = search.service || 'amdal';

  const { data } = await getQueryClientMaster<IExperienceAboutResponse>(
    queryAboutExperience,
    {
      slug: slug,
      year: Number(search.year) || new Date().getFullYear() - 2,
      first: pageSize,
      skip: pageSize * (page - 1),
    }
  );

  return (
    <div>
      <AboutCompany />
      <VisionMission />
      <Organization />
      <Experience
        latestYear={data?.experiences?.[0].year}
        searchParams={search}
        services={data.serviceDetails}
        experiences={data.experiencesConnection}
      />
    </div>
  );
}
