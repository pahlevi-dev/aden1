import BgHero from '@/app/assets/image/bg-hero.png';
import ClipImage from '@/app/assets/image/clip-rounded.svg';
import { socmed } from '@/constants/socmed';
import { IParams } from '@/interface/config/params';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';

interface IProps {
  params: IParams;
}

const HeroSection = ({ params }: IProps) => {
  const t = useTranslations('HomePage');

  return (
    <div className="container mx-auto p-5 relative">
      <div className="w-full relative rounded-[20px] overflow-hidden">
        <Image
          src={BgHero} // Ganti dengan path dinamis jika diperlukan
          alt="Background"
          className="w-full min-h-[70vh] object-cover object-center"
        />
        <div className="absolute w-full h-full bg-primary opacity-[59%] top-0 left-0 "></div>
        <div className="absolute w-1/2 aspect-[4/1] md:aspect-[9/1] rounded-t-[10px] md:rounded-t-[20px] bg-background bottom-0 left-1/2 -translate-x-1/2">
          <div className="relative w-full h-full ">
            <Image
              src={ClipImage}
              alt=""
              className="absolute bottom-0 w-8 left-0 -translate-x-[90%]"
            />

            <Image
              src={ClipImage}
              alt=""
              className="absolute bottom-0 w-8 scale-x-[-1] right-0 translate-x-[90%]"
            />
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full text-white p-5 flex items-center">
        <div className="md:w-[90%] w-full mx-auto p-5">
          <div className="md:flex items-end justify-between">
            <div className="md:max-w-[450px] max-w-[300px]">
              <h1 className="md:text-6xl">{t('title')}</h1>
              <Button
                variant="outline"
                className="border-background hover:bg-background hover:text-primary my-8 md:hidden"
                size="lg"
              >
                {t('getStarted')}
              </Button>
            </div>
            <div className="max-w-[200px]">
              <div className="w-3/4 h-5 rounded-full  bg-gradient-to-r from-background mb-5"></div>
              <p>{t('description')}</p>
            </div>
          </div>
          <div className="md:inline hidden">
            <Button
              variant="outline"
              className="border-background hover:bg-background hover:text-primary my-8 p-0"
              size="lg"
              asChild
            >
              <div>
                <Link href={`${params.locale}/services`} className="px-8 py-3">
                  {t('getStarted')}
                </Link>
              </div>
            </Button>
          </div>
          <div className="md:flex hidden items-center gap-14">
            {socmed.map((item, i) => (
              <Link
                href={item.href}
                key={i}
                target="_blank"
                className="hover:underline text-lg transition-all font-light"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
