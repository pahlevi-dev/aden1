import BgDefault from '@/app/assets/image/pexels-lisa-baker-336803-944407.jpg';
import { Button } from '@/components/ui/button';
import { BaseCard } from '@/components/ui/card';
import { Icon } from '@/components/ui/icons';
import { IExperienceShort } from '@/interface/query/home';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

interface IProps {
  data: IExperienceShort;
  index: number;
  length: number;
  locale: string;
}

export const CardPorto = ({ data, index, length, locale }: IProps) => {
  const t = useTranslations('ServiceList');
  const styleText = (service: string) => {
    switch (service) {
      case 'Addendum ANDAL & RKL-RPL':
      case 'UKL-UPL':
      case 'ANDALALIN':
      case 'Others':
        return 'text-primary';

      default:
        return 'text-background';
    }
  };

  let className = 'md:h-[40vh] h-[60vh]';

  const positionIndex = (index + 1) % 7 || 7;
  if (positionIndex === 4) {
    className = 'md:h-[400px] h-[60vh] md:col-span-3 col-span-2 ';
  } else if (positionIndex === 5) {
    className = 'md:h-auto h-[60vh] col-span-2 row-span-2';
  } else if (positionIndex === 3) {
    className = 'md:h-[40vh] h-[60vh] md:col-span-1 col-span-2';
  } else if (positionIndex < 3 && index + 1 === length) {
    className = `md:h-[40vh] h-[60vh] md:col-span-${positionIndex}`;
  }

  const cardClass =
    typeof data?.image === 'string' || data.image === BgDefault
      ? 'bg-black/50'
      : '';

  const cardClassInner = data?.isShowBtn
    ? 'md:justify-between md:items-center md:flex-nowrap flex-wrap gap-5'
    : 'justify-center text-center items-center';

  return (
    <BaseCard
      className={`bg-secondary rounded-md relative overflow-hidden ${className}`}
    >
      <Image
        src={data?.image ?? BgDefault}
        alt={data?.name}
        width={1400}
        height={800}
        className="absolute w-full h-full top-0 left-0 object-cover object-center z-0"
      />
      <div
        className={`p-2.5 md:p-5 absolute ${styleText(
          data?.name
        )} flex  top-0 left-0 w-full h-full ${cardClass} ${cardClassInner}`}
      >
        <div
          className={
            data?.isShowBtn
              ? 'md:h-[90%] h-[70%] flex flex-col md:justify-between gap-3'
              : ''
          }
        >
          {data?.icon && (
            <div className="bg-white mb-3 w-10 aspect-square flex items-center justify-center rounded-md">
              <Icon
                name={data?.icon}
                color="#191919"
                size={15}
                strokeWidth={1}
              />
            </div>
          )}
          <p className="font-semibold max-w-[300px] md:line-clamp-none line-clamp-3 text-lg md:text-2xl mb-4">
            {data?.name}
          </p>
          <p className="max-w-[300px] md:text-sm mx-auto line-clamp-3 mb-3">
            {data?.description}
          </p>
          {data?.isShowBtn && (
            <div>
              <Button
                variant="outline"
                className={
                  styleText(data?.name) === 'text-primary'
                    ? ''
                    : 'border-background hover:bg-background hover:text-primary'
                }
                asChild
              >
                <Link href={`${locale}/services/${data.slug}`}>
                  {t('btnText')}
                </Link>
              </Button>
            </div>
          )}
        </div>
        {data?.clients !== undefined && (
          <div className="md:text-center md:mt-0 mt-auto">
            <p className="text-4xl font-semibold text-nowrap">
              {data?.clients >= 25 ? `${data?.clients} +` : data?.clients}
            </p>
            <p className="text-lg">{t('portoClients')}</p>
          </div>
        )}
      </div>
    </BaseCard>
  );
};
