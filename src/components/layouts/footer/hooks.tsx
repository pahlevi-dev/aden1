'use client';

import {
  IMenuNavigation,
  ISocmed,
} from '@/components/layouts/header/menu.types';
import { socmed as media } from '@/constants/socmed';
import { useState } from 'react';

export const useFooter = () => {
  const [socmed] = useState<ISocmed[]>(media);

  const [amdal] = useState<IMenuNavigation[]>([
    {
      title: 'LPJP',
      href: 'https://pusfaster.bsilhk.menlhk.go.id/index.php/database-lpjp-amdal/',
      active: false,
    },
  ]);

  return {
    socmed,
    amdal,
  };
};
