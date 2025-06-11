import ImgOrganization from '@/app/assets/image/organization.png';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export const Organization = () => {
  const t = useTranslations('About');
  return (
    <div className="container mx-auto text-center py-10 px-5">
      <h2>{t('organization')}</h2>
      <Image src={ImgOrganization} alt="organization" />
    </div>
  );
};
