'use client';

import IconGoogle from '@/app/assets/logo/google_maps_icon_130921 1.png';
import logoAmc from '@/app/assets/logo/logo_amc.png';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { IServiceName } from '@/interface/query/services';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import packageInfo from '../../../../package.json';
import { useMenuHeader } from '../header/hook';
import { useFooter } from './hooks';

interface IProps {
  services: IServiceName['services'];
  locale: string;
}

export const Footer = ({ services, locale }: IProps) => {
  const { menu } = useMenuHeader();
  const { socmed, amdal } = useFooter();
  const t = useTranslations('CTA');

  return (
    <div>
      <div className="container p-5 mx-auto grid gap-2 md:grid-cols-4">
        <div className="col-span-2">
          <Image src={logoAmc} alt="AMC" className="w-24" />
          <div>
            <Link
              href="https://maps.app.goo.gl/cUrmTiMDQx2UJZCd8"
              target="_blank"
            >
              <Image src={IconGoogle} alt="google" className="w-7" />
            </Link>

            <p className="text-left max-w-[300px] my-5">
              Perkantoran Nova Casa Square No 17, Jl. Raya Serpong KM2, RT.
              001/008 Kec. Serpong Kel. Serpong, Kota Tangerang Selatan, 15311
            </p>

            <p className="font-medium mb-3">{t('socmed')}</p>
          </div>
          <div className="flex gap-5">
            {socmed.map((item, i) => (
              <TooltipProvider key={i}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className="px-3 py-5 rounded-md bg-white shadow-none"
                      variant="secondary"
                      asChild
                    >
                      <Link href={item.href} target="_blank">
                        <Image src={item.icon} alt={item.title} />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{item.title}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
        <div className="grid md:col-span-2 md:grid-cols-3 gap-5 md:text-right md:mt-0 mt-4">
          <div>
            <h4 className="font-semibold">Services</h4>
            <div className="grid gap-2 mt-3 justify-items-start md:justify-items-end">
              {services?.map((item, i) => (
                <Button
                  key={i}
                  variant="link"
                  className="text-left p-0"
                  asChild
                >
                  <Link
                    replace
                    href={`/${locale}/services?search=${item.serviceName}`}
                    legacyBehavior
                    passHref
                  >
                    {item.serviceName}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold">AMDAL</h4>
            <div className="grid gap-2 mt-3 justify-items-start md:justify-items-end">
              {amdal.map((item, i) => (
                <Button
                  key={i}
                  variant="link"
                  className="text-left p-0"
                  asChild
                >
                  <Link href={item.href} target="_blank">
                    {item.title}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold">Menus</h4>
            <div className="grid gap-2 justify-items-start md:justify-items-end mt-3">
              {menu.map((item, i) => {
                if (item.active === false) return null;
                if (item.child?.length === undefined) {
                  return (
                    <Button
                      key={i}
                      variant="link"
                      className="text-left p-0"
                      asChild
                    >
                      <Link href={item.href} legacyBehavior passHref>
                        {item.title}
                      </Link>
                    </Button>
                  );
                }

                return item.child.map((el, idx) => {
                  if (el.active === false) return null;
                  return (
                    <Button
                      key={idx}
                      variant="link"
                      className="text-left p-0"
                      asChild
                    >
                      <Link href={item.href} legacyBehavior passHref>
                        {el.title}
                      </Link>
                    </Button>
                  );
                });
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between container mx-auto px-5 py-3 flex-wrap">
        <div>
          © {new Date().getUTCFullYear()} PT.Amara Cisadane All rights reserved.
        </div>
        <div>Version {packageInfo.version}</div>
      </div>
    </div>
  );
};
