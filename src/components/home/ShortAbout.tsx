import BgShort from '@/app/assets/image/bg-short-about.png';
import { IParams } from '@/interface/config/params';
import { ICompany } from '@/interface/query/company';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Icon } from '../ui/icons';

interface IProps {
  supports: Pick<ICompany, 'companyName' | 'logo' | 'companySite' | 'type'>[];
  params: IParams;
}

export const ShortAbout = async ({ supports, params }: IProps) => {
  const t = await getTranslations('About');
  return (
    <div className="container mx-auto p-5 flex items-center justify-between min-h-[70vh]">
      <div>
        <h2 className="flex items-center gap-5">
          {t('shortTitle')}{' '}
          <span>
            <Icon name="arrow-up-right" />
          </span>
        </h2>
        <Image
          src={BgShort}
          alt="amara_office"
          className="rounded-md md:hidden my-5"
        />

        <p className="max-w-[400px] mb-4">
          {t.rich('shortDescription', {
            a: (chunk) => (
              <Link className="underline text-[#32A2F2]" href="/">
                {chunk}
              </Link>
            ),
          })}
        </p>
        <Button asChild variant="outline">
          <Link href={`${params.locale}/about`}>{t('CTA')}</Link>
        </Button>
        <div className="mt-4">
          <h3>{t('supports')}</h3>
          <div className="flex items-center gap-5 flex-wrap">
            {supports.map((item, i) => (
              <Link href={item.companySite ?? ''} key={i}>
                {item.logo.url ? (
                  <Image
                    src={item.logo.url}
                    alt={item.companyName}
                    className="w-[100%] saturate-0 hover:filter-none transition-all"
                    width={100}
                    height={100}
                  />
                ) : (
                  item.companyName
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Image
        src={BgShort}
        alt="amara_office"
        className="rounded-md md:block hidden"
      />
    </div>
  );
};
