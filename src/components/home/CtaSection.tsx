import BgCTA from '@/app/assets/image/bg-interest.png';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';

export const CtaSection = () => {
  const t = useTranslations('HomePage');
  return (
    <div className="container mx-auto px-5">
      <div className="cta rounded-lg min-h-[60vh] relative overflow-hidden flex items-center justify-center">
        <Image
          src={BgCTA}
          alt="interest"
          className="w-full absolute top-1/2 -translate-y-1/2 left-0 md:aspect-[3/1] md:block hidden object-cover object-center"
        />
        <div className="text-background z-10 text-center p-5">
          <h2>{t('interestTitle')}</h2>
          <p className="max-w-[500px] mx-auto">{t('interestDescription')}</p>
          <div className="grid md:grid-cols-2 items-center gap-5 mt-3 justify-center md:w-[250px] mx-auto">
            <Button
              variant="outline"
              className="border-background hover:bg-background hover:text-primary"
              asChild
            >
              <Link href="mailto:amaracisadane@gmail.com">Email</Link>
            </Button>
            <Button
              variant="outline"
              className="border-background hover:bg-background hover:text-primary"
              asChild
            >
              <Link href="https://wa.me/6281288338655" target="_blank">
                Whatsapp
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
