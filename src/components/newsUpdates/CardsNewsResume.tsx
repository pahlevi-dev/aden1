import BasicImage from '@/app/assets/image/pexels-lisa-baker-336803-944407.jpg';
import { BaseCard } from '@/components/ui/card';
import { Chips } from '@/components/ui/chips';
import { PostType } from '@/constants/posts';
import { IBlogPost } from '@/interface/query/newsUpdate';
import Image from 'next/image';
import Link from 'next/link';

interface IProps
  extends Omit<IBlogPost, 'articles' | 'publishedBy' | 'publishedAt'> {
  index: number;
  locale: string;
}

export const CardNewsResume = ({
  typePost,
  index,
  headline,
  shortDescription,
  slug,
  thumbnail,
  locale,
}: IProps) => {
  const number = index + 1;
  const href = `/${locale}/post/${slug}`;

  const baseCardPost = () => {
    return (
      <BaseCard className="border hover:shadow-lg transition-all bg-[#ECECEC] overflow-hidden group relative h-[60vh] border-[#D9D9D9]">
        <div className="h-[75%] relative">
          <div className="absolute transition-all w-full h-full top-0 left-0 bg-primary opacity-25 group-hover:opacity-10"></div>
          <Image
            src={thumbnail?.url ?? BasicImage}
            alt={headline}
            width={500}
            height={248}
            className="object-cover h-full w-full transition-all rounded-md"
          />
        </div>

        <div className="absolute w-full top-2 flex px-2 justify-between items-center">
          <Chips className="py-3 font-semibold text-primary bg-background md:block hidden">
            <div>{number}</div>
          </Chips>

          <Chips className="border text-white bg-transparent">
            <div>{typePost}</div>
          </Chips>
        </div>

        <div className="relative flex items-center text-primary justify-between">
          <div className="p-5">
            <p className="text-xl font-semibold mb-2 line-clamp-1">
              {headline}
            </p>
            <p className="line-clamp-2 md:line-clamp-3">{shortDescription}</p>
          </div>
        </div>
      </BaseCard>
    );
  };

  if (typePost === PostType.Activity) return baseCardPost();
  return <Link href={href}>{baseCardPost()}</Link>;
};
