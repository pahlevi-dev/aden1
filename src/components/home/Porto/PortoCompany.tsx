import BgAdendum from '@/app/assets/image/addendum_andal.png';
import BgAmdal from '@/app/assets/image/amdal.png';
import BgAndalalin from '@/app/assets/image/andalalin.png';
import BgDll from '@/app/assets/image/dll.png';
import BgKajianLingkungan from '@/app/assets/image/kajian_lingkungan.png';
import BgDefault from '@/app/assets/image/pexels-lisa-baker-336803-944407.jpg';
import BgRintekLb3 from '@/app/assets/image/rintek_lb3.png';
import BgUklUpl from '@/app/assets/image/ukl_upl.png';
import { IParams } from '@/interface/config/params';
import { IThumbnail } from '@/interface/query/common/thumbnail';
import { IExperienceShort } from '@/interface/query/home';
import { IService } from '@/interface/query/services';
import { useTranslations } from 'next-intl';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { CardPorto } from './CardPorto';

interface IProps {
  serviceDetails: IService<
    'name' | 'experience' | 'thumbnail' | 'description' | 'icon' | 'slugService'
  >['serviceDetails'];
  params: IParams;
}

export const PortoCompany = ({ serviceDetails, params }: IProps) => {
  const t = useTranslations('About');

  const renderImage = (
    service: string,
    thumbnail: IThumbnail | null
  ): StaticImport | string => {
    switch (service) {
      case 'AMDAL':
        return BgAmdal;

      case 'Addendum ANDAL & RKL-RPL':
        return BgAdendum;

      case 'UKL-UPL':
        return BgUklUpl;

      case 'ANDALALIN':
        return BgAndalalin;

      case 'Others':
        return BgDll;

      case 'Rintek LB3':
        return BgRintekLb3;

      case 'Kajian Lingkungan':
        return BgKajianLingkungan;

      default:
        if (!thumbnail) return BgDefault;
        return thumbnail.url!;
    }
  };

  const mappedPorto: IExperienceShort[] = [];

  serviceDetails?.map((item, i) => {
    const positionIndex = (i + 1) % 7 || 7;
    if (positionIndex === 4 || positionIndex === 5) {
      mappedPorto.push({
        name:
          item.experience.length > 0
            ? `${item.name} - ${item.experience[0]?.company?.companyName}`
            : item.name,
        description: item.experience[0]?.description || item.description || '',
        image: item.thumbnail?.url ?? BgDefault,
        clients: undefined,
        isShowBtn: false,
        icon: null,
        slug: undefined,
      });
    } else {
      mappedPorto.push({
        name: item.name,
        description: item.description ?? '',
        image: renderImage(item.name, item.thumbnail),
        clients: item.experience.length,
        isShowBtn: true,
        icon: item.icon,
        slug: item.slugService,
      });
    }
  });

  return (
    <div className="container mx-auto py-10 px-5 space-y-5">
      <h2 className="max-w-[350px]">{t('experienceTitle')}</h2>
      <p className="max-w-[300px]">{t('experienceDescription')}</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 justify-items-stretch">
        {mappedPorto?.map((item, i) => (
          <CardPorto
            locale={params.locale}
            key={i}
            data={item}
            index={i}
            length={mappedPorto.length}
          />
        ))}
      </div>
    </div>
  );
};
