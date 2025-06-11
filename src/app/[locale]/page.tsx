import { ContainerNewsResumeHome } from '@/components/home/ContainerNewsResumeHome';
import { CtaSection } from '@/components/home/CtaSection';
import HeroSection from '@/components/home/HeroSection';
import { PortoCompany } from '@/components/home/Porto/PortoCompany';
import { SectionActivitiesHome } from '@/components/home/SectionActivitiesHome';
import { ServicesHome } from '@/components/home/Services';
import { ShortAbout } from '@/components/home/ShortAbout';
import { MarqueeLogo } from '@/components/ui/marqueeLogo';
import { CompanyType } from '@/constants/companyType';
import { IParams } from '@/interface/config/params';
import { IHomeResponse } from '@/interface/query/home';
import { INewsResumeActivity } from '@/interface/query/newsUpdate/responseApi';
import {
  getQueryClientBlogs,
  getQueryClientMaster,
} from '@/lib/graphql/client';
import { queryHomeHeadlineBlog } from '@/lib/graphql/query/home/headlineHomeBlog';
import { queryHome } from '@/lib/graphql/query/home/queryHome';

interface IProps {
  params: Promise<IParams>;
}

export default async function Home({ params }: IProps) {
  const param = await params;
  const locale = param.locale;

  const { data: dataMaster } = await getQueryClientMaster<IHomeResponse>(
    queryHome,
    {
      locale: [locale],
    }
  );

  const { data: dataBlog } = await getQueryClientBlogs<INewsResumeActivity>(
    queryHomeHeadlineBlog
  );

  const internalCompanies = dataMaster.companies.filter(
    (item) => item.type === CompanyType.Internal
  );

  const clientCompanies = dataMaster.companies.filter(
    (item) => item.type === CompanyType.Client
  );

  return (
    <div>
      <HeroSection params={param} />
      <ShortAbout supports={internalCompanies} params={param} />
      <ServicesHome services={dataMaster.services} params={param} />
      <PortoCompany serviceDetails={dataMaster.serviceDetails} params={param} />
      <MarqueeLogo data={clientCompanies} />

      <SectionActivitiesHome locale={locale} data={dataBlog.blogPosts} />

      <ContainerNewsResumeHome
        data={dataBlog.blogPostsConnection.edges}
        locale={locale}
      />
      <CtaSection />
    </div>
  );
}
