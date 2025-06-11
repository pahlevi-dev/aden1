'use client';

import { IMenuNavigation } from '@/components/layouts/header/menu.types';
import { Locale, LocaleLabel } from '@/constants/locale';
import { usePathname, useRouter } from '@/i18n/routing';
import { IOptions } from '@/interface/config/option';
import { IParams } from '@/interface/config/params';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export const useMenuHeader = () => {
  const router = useRouter();
  const t = useTranslations('Menu');
  const pathname = usePathname();
  const params = useParams<IParams>();

  const [option] = useState<IOptions<Locale>[]>([
    {
      label: LocaleLabel.en,
      value: Locale.English,
    },
    {
      label: LocaleLabel.id,
      value: Locale.Indonesia,
    },
  ]);

  const changeRoute = (route: string) => {
    return `/${params.locale}${route}`;
  };

  const [menu] = useState<IMenuNavigation[]>([
    {
      title: t('home'),
      href: changeRoute(''),
      active: true,
    },
    {
      title: t('about'),
      href: changeRoute('/about'),
      active: true,
    },
    {
      title: t('services'),
      href: changeRoute('/services'),
      active: true,
    },
    {
      title: t('newsUpdates'),
      href: changeRoute('/'),
      active: true,
      child: [
        {
          title: t('newsResume'),
          href: changeRoute('/news-resume'),
          description: t('newsResumeDesc'),
          active: true,
        },
        {
          title: t('events'),
          href: changeRoute('/events'),
          description: t('eventsDesc'),
          active: true,
        },
      ],
    },
    {
      title: t('gallery'),
      href: changeRoute('/'),
      active: true,
      child: [
        {
          title: t('galleryOperational'),
          description: t('galleryOperationalDesc'),
          href: changeRoute('/gallery/operational'),
          active: true,
        },
        {
          title: t('galleryNonOperational'),
          description: t('galleryNonOperationalDesc'),
          href: changeRoute('/gallery/non-operational'),
          active: true,
        },
      ],
    },
    {
      title: t('policiesDocs'),
      href: changeRoute('/'),
      active: true,
      child: [
        {
          title: t('regulations'),
          href: changeRoute('/regulations'),
          description: t('regulationsDesc'),
          active: true,
        },
        {
          title: t('journals'),
          href: changeRoute('/journals'),
          description: t('journalsDesc'),
          active: true,
        },
      ],
    },
  ]);

  const changeLang = (locale: Locale) => {
    router.replace({ pathname }, { locale: locale });
  };

  const converterLocaleLabel = (value: Locale) => {
    switch (value) {
      case Locale.English:
        return LocaleLabel.en;

      case Locale.Indonesia:
        return LocaleLabel.id;

      default:
        break;
    }
  };

  return {
    menu,
    option,
    changeLang,
    converterLocaleLabel,
    changeRoute,
  };
};
