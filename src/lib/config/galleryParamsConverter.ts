import { GalleryType } from '@/constants/gallery';

export const GalleryParamsConvert = (param: string) => {
  switch (param) {
    case 'operational':
      return GalleryType.Operational;

    case 'non-operational':
    default:
      return GalleryType.NonOperational;
  }
};
