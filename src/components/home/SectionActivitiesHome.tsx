import { IBlogPost } from '@/interface/query/newsUpdate';
import { useTranslations } from 'next-intl';
import { Suspense } from 'react';
import { CarouselActivities } from '../newsUpdates/CarouselActivities';
import { Loading } from '../ui/loading';

interface IProps {
  data?: Pick<
    IBlogPost,
    'headline' | 'thumbnail' | 'slug' | 'shortDescription'
  >[];
  locale: string;
}

export const SectionActivitiesHome = ({ data, locale }: IProps) => {
  const tHome = useTranslations('HomePage');
  return (
    <div className="container px-5 mx-auto md:mt-0 mt-10">
      <div className="md:flex items-center justify-between mb-5">
        <div className="max-w-[500px]">
          <h1>{tHome('activitiesTitle')}</h1>
          <p className="max-w-[400px]">{tHome('activitiesDescription')}</p>
        </div>
      </div>
      <Suspense fallback={<Loading />}>
        <CarouselActivities locale={locale} data={data} isDirected />
      </Suspense>
    </div>
  );
};
