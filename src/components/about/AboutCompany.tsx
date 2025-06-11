import BgDirector from '@/app/assets/image/director.png';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export const AboutCompany = () => {
  const t = useTranslations('About');
  return (
    <div className="container mx-auto min-h-[50vh] flex flex-wrap items-center justify-between p-5">
      <div className="md:w-1/2">
        <h1 className="md:w-1/2 mb-5">{t('title')}</h1>
        <p className="md:w-2/3">{t('description')}</p>
      </div>
      <Image src={BgDirector} alt="director" className="md:w-1/2" />
    </div>
  );
};
