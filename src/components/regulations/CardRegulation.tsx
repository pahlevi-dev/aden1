import BgCard from '@/app/assets/image/bg-regulations.svg';
import { IDocument } from '@/interface/query/regulations';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { BaseCard } from '../ui/card';
import { Icon } from '../ui/icons';

export const CardRegulation = ({ name, description, fileUrl }: IDocument) => {
  return (
    <BaseCard className="relative flex flex-col bg-primary text-white p-5 group">
      <div className="z-20">
        <div className="bg-secondary w-12 aspect-square flex items-center justify-center rounded-md">
          <Icon name="book-marked" color="#191919" size={18} strokeWidth={1} />
        </div>
      </div>
      <div className="grid gap-3 mt-5 z-20">
        <p className="text-2xl font-semibold line-clamp-2">{name}</p>
        <div className="md:h-[8vh] h-[10vh]">
          <p className="line-clamp-3">{description}</p>
        </div>
        <div>
          <Button asChild variant="secondary">
            <Link href={fileUrl} target="_blank">
              View
            </Link>
          </Button>
        </div>
      </div>

      <div className="absolute transition-opacity ease-in top-0 left-0 w-full opacity-0 group-hover:opacity-100">
        <Image
          src={BgCard}
          alt={name}
          className="w-full aspect-[2/1] object-cover md:object-contain md:object-top"
        />
      </div>
    </BaseCard>
  );
};
