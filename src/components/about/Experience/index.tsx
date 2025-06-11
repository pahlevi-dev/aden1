import { IAboutQuery } from '@/app/[locale]/about/type';
import { Loading } from '@/components/ui/loading';
import { IColumn } from '@/interface/config/column';
import { IQuery } from '@/interface/config/params';
import { IExperiencesConnections } from '@/interface/query/experiences';
import { IExperienceTable } from '@/interface/query/experiences/tables';
import { IService } from '@/interface/query/services';
import { useTranslations } from 'next-intl';
import { Suspense } from 'react';
import PaginatedTable from '../../ui/paginatedTable';
import { FilterExperience } from './FilterExperience';

interface IProps {
  searchParams: IQuery<IAboutQuery>;
  services: IService<'name' | 'slugService'>['serviceDetails'];
  experiences: IExperiencesConnections;
  latestYear: number;
}

export const Experience = ({
  searchParams,
  services,
  experiences,
  latestYear,
}: IProps) => {
  const t = useTranslations('About');

  const tableHead: string[] = t.raw('experienceTableHead');

  const selectedYear = searchParams.year || new Date().getFullYear();
  const selectedService = searchParams.service ?? 'amdal';
  const page = Number(searchParams.page) || 1;

  const column: IColumn[] = [
    {
      key: 'company',
      label: tableHead[0],
      width: '20%',
    },
    {
      key: 'description',
      label: tableHead[1],
      width: '40%',
    },
    {
      key: 'detailLocation',
      label: tableHead[2],
      width: '15%',
    },
    {
      key: 'year',
      label: tableHead[3],
      width: '10%',
    },
    {
      key: 'service',
      label: tableHead[4],
      width: '20%',
    },
  ];

  const dataExperience = (
    data: IExperiencesConnections['edges']
  ): IExperienceTable[] => {
    if (data == undefined) return [];

    return data.map(
      (item): IExperienceTable => ({
        year: item.node.year,
        description: item.node.description,
        detailLocation: item.node.detailLocation,
        service: item.node.serviceDetail?.name ?? '',
        company: item.node.company.companyName,
      })
    );
  };

  return (
    <section className="container mx-auto px-5 py-10" id="experience">
      <div className="md:flex justify-between items-center mb-5">
        <h2 className="max-w-[250px]">{t('experienceTitle')}</h2>
        <div className="max-w-[200px]">
          <p>{t('experienceDescription')}</p>
          <FilterExperience
            selectedService={selectedService}
            selectedYear={selectedYear}
            latestYear={latestYear}
            services={services}
          />
        </div>
      </div>

      <Suspense fallback={<Loading />}>
        <PaginatedTable<IExperienceTable>
          columns={column}
          pageSize={10}
          scrollToTop={false}
          totalSize={experiences?.aggregate?.count}
          page={page}
          data={dataExperience(experiences.edges)}
        />
      </Suspense>
    </section>
  );
};
