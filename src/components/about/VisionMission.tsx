import BgSection from '@/app/assets/image/bg-visi-misi.png';
import Ornament from '@/app/assets/image/ornament-visi.png';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export const VisionMission = () => {
  const t = useTranslations('About');
  return (
    <div className="relative min-h-[50vh] overflow-hidden flex items-center">
      <Image
        src={BgSection}
        alt="background"
        className="absolute w-full h-full -z-20"
      />

      <Image
        src={Ornament}
        alt="background"
        className="absolute md:bottom-0 -z-10 md:left-[20%] bottom-[40%] -left-20 md:w-[28vw] md:translate-y-20"
      />

      <div className="container mx-auto z-20 px-5 py-10 grid md:grid-cols-2 gap-5">
        <div className="md:min-h-auto min-h-[50vh]">
          <h2>{t('visionTitle')}</h2>
          <p className="md:max-w-[400px] text-lg">{t('visionDescription')}</p>
        </div>
        <div>
          <h2>{t('missionTitle')}</h2>
          <div
            dangerouslySetInnerHTML={{ __html: t.raw('missionDescription') }}
            className="about text-lg"
          />
        </div>
      </div>
    </div>
  );
};
