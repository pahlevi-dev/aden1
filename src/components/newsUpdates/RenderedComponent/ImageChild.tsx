import { IChildrenRaw } from '@/interface/query/common/richText/raw';
import Image from 'next/image';

export const ImageChild = ({ src, width, height, title }: IChildrenRaw) => {
  if (!src) return null;
  return (
    <Image
      src={src}
      alt={title ?? 'rendered image'}
      width={width}
      height={height}
      className="rounded-md w-full"
    />
  );
};
