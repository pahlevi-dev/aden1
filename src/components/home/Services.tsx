import { IParams } from '@/interface/config/params';
import { IServiceName } from '@/interface/query/services';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { CardServices } from '../service/list/CardServices';
import { Button } from '../ui/button';

interface IProps {
  services: IServiceName<'serviceName' | 'description'>['services'];
  params: IParams;
}

export const ServicesHome = async ({ services, params }: IProps) => {
  const t = await getTranslations('ServiceList');
  return (
    <div className="container mx-auto px-5">
      <div className=" text-background bg-primary px-5 py-10 rounded-xl">
        <div className="flex md:flex-nowrap flex-wrap items-end justify-between">
          <h2 className="max-w-[400px]">
            {t.rich('title', {
              span: (chunks) => <span>{chunks}</span>,
            })}
          </h2>
          <Button
            variant="outline"
            className="border-background hover:bg-background hover:text-primary"
            asChild
          >
            <Link href={`${params.locale}/services`}>{t('btnView')}</Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-5 mt-5">
          {services?.map((item, i) => (
            <CardServices
              key={i}
              name={item.serviceName}
              shortDescription={item.description}
              icon={'book-marked'}
              variant="dark"
              slugService=""
            />
          ))}
        </div>
      </div>
    </div>
  );
};
