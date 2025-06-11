import { locales } from '@/lib/config/locales';
import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: locales,
  defaultLocale: 'id',
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
