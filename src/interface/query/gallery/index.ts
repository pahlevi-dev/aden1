import { GalleryType } from '@/constants/gallery';
import { IThumbnail } from '../common/thumbnail';

export interface IGalleryPost {
  image: IThumbnail | null;
  title: string;
  type: GalleryType;
  shortDescription: string;
}

export interface IGallery<T extends keyof IGalleryPost = keyof IGalleryPost> {
  gallery?: Pick<IGalleryPost, T>;
  galleries?: Pick<IGalleryPost, T>[];
}
