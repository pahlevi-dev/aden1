import BgBased from '@/app/assets/image/pexels-lisa-baker-336803-944407.jpg';
import { IGalleryPost } from '@/interface/query/gallery';
import Image from 'next/image';
import { BaseCard } from '../ui/card';

interface IProps extends Omit<IGalleryPost, 'type'> {
  index: number;
  hover?: boolean; // Menambahkan props hover dengan default true
}

export const CardGallery = ({
  index,
  title,
  shortDescription,
  image,
  hover = true,
}: IProps) => {
  const positionIndex = (index + 1) % 4;
  const gridPosition =
    positionIndex === 1 ? 'md:col-span-3 col-span-2' : 'col-span-1';

  return (
    <BaseCard className={`relative h-[80vh] md:h-[50vh] group ${gridPosition}`}>
      <Image
        src={image?.url ?? BgBased}
        alt={title}
        width={1400}
        height={500}
        className="w-full h-full object-cover rounded-md"
      />
      <div className="absolute top-0 left-0 w-full h-full flex items-end">
        <div
          className={`
            w-full transition-all overflow-hidden
            ${
              hover
                ? 'h-[0%] group-hover:h-[30%] opacity-0 group-hover:opacity-100'
                : 'h-[30%] opacity-100'
            }
            bg-black/40 p-5 rounded-b-md text-white backdrop-blur-sm
          `}
        >
          <h3 className="text-2xl font-semibold mb-3 line-clamp-2">{title}</h3>
          <p className={positionIndex === 1 ? 'line-clamp-3' : 'line-clamp-2'}>
            {shortDescription}
          </p>
        </div>
      </div>
    </BaseCard>
  );
};
