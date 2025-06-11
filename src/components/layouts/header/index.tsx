'use client';

import LogoKlh from '@/app/assets/logo/klh_bplh.png';
import LogoAmc from '@/app/assets/logo/logo_amc.png';
import { useMenuHeader } from '@/components/layouts/header/hook';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Locale } from '@/constants/locale';
import { DropdownMenuRadioItem } from '@radix-ui/react-dropdown-menu';
import { Globe } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { DesktopMenu } from './DesktopMenu';
import { MobileMenu } from './MobileMenu';

export const HeaderMenu = () => {
  const { menu, option, changeLang } = useMenuHeader();

  const t = useTranslations('SwitchButtonLanguage');
  const cta = useTranslations('CTA');
  return (
    <div>
      <div className="container mx-auto flex justify-between px-1 py-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-gray-500">
              {t('label')} <Globe />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Language</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              onValueChange={(e) => changeLang(e as Locale)}
            >
              {option.map((item) => (
                <DropdownMenuRadioItem
                  key={item.label}
                  value={item.value}
                  className="cursor-pointer outline-none"
                >
                  {item.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <div>
          <Button variant="link" className="text-gray-400 font-normal" asChild>
            <Link href="/faq">FAQ</Link>
          </Button>
          {/* <Button variant="link" className="text-gray-400 font-normal">
            Terms & Conditions
          </Button> */}
        </div>
      </div>
      <div className="mx-auto container flex justify-between px-5">
        <div className="flex gap-2 items-center">
          <Image src={LogoAmc} alt="AMC" className="w-20" />
          <Image src={LogoKlh} alt="KLH" className="w-20" />
        </div>
        <DesktopMenu data={menu} />
        <MobileMenu data={menu} />
        <div className="lg:flex hidden items-center gap-2">
          {/* <Button variant="ghost" className="text-primary">
            <Search />
          </Button> */}
          <Button variant="outline" asChild>
            <Link href="https://wa.me/6281288338655" target="_blank">
              {cta('label')}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
