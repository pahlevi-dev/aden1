import { StaticImageData } from 'next/image';
import React from 'react';

export interface IBaseMenuNavigation {
  title: string;
  href: string;
  icon?: React.ReactNode;
  active: boolean;
}

export interface IMenuNavigation extends IBaseMenuNavigation {
  child?: IMenuChildNavigation[];
}

export interface IMenuChildNavigation extends IBaseMenuNavigation {
  description?: string;
}

export interface ISocmed {
  title: string;
  href: string;
  icon: StaticImageData;
  width?: number;
  height?: number;
}

export interface IPropsMenuComponent {
  data: IMenuNavigation[];
}
