import Facebook from '@/app/assets/logo/facebook.svg';
import Instagram from '@/app/assets/logo/instagram.png';
import LinkedIn from '@/app/assets/logo/linkedin.png';
import Tiktok from '@/app/assets/logo/tiktok.png';
import { ISocmed } from '@/components/layouts/header/menu.types';

export const socmed: ISocmed[] = [
  {
    title: 'linkedin',
    href: 'https://id.linkedin.com/company/ptamaracisadane',
    icon: LinkedIn,
  },
  {
    title: 'instagram',
    href: 'https://www.instagram.com/pt_amaracisadane/profilecard/?igsh=MXM2bnhxMmptejc0OQ==',
    icon: Instagram,
  },
  {
    title: 'tiktok',
    href: 'https://www.tiktok.com/@ptamaracisadane?_t=8sToWQT6bGp&_r=1',
    icon: Tiktok,
  },
  {
    title: 'facebook',
    href: 'https://www.facebook.com/konsultanlingkunganAMC/',
    icon: Facebook,
  },
];
