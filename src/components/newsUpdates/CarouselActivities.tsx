'use client';

import { IBlogPost } from '@/interface/query/newsUpdate';
import Autoplay from 'embla-carousel-autoplay';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRef } from 'react';
import { CardGallery } from '../gallery/CardGallery';
import { BaseCard } from '../ui/card';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';

interface IProps {
  data?: Pick<
    IBlogPost,
    'headline' | 'thumbnail' | 'slug' | 'shortDescription'
  >[];
  locale: string;
  isDirected?: boolean;
}

export const CarouselActivities = ({
  data,
  locale,
  isDirected = false,
}: IProps) => {
  const t = useTranslations('Empty');

  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      {data?.length ? (
        <CarouselContent>
          {data?.map((item, i) => (
            <CarouselItem key={i}>
              {isDirected ? (
                <Link href={`${locale}/events`}>
                  <CardGallery
                    index={i}
                    image={item.thumbnail}
                    title={item.headline}
                    shortDescription={item.shortDescription}
                    hover={false}
                  />
                </Link>
              ) : (
                <CardGallery
                  index={i}
                  image={item.thumbnail}
                  title={item.headline}
                  shortDescription={item.shortDescription}
                  hover={false}
                />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
      ) : (
        <CarouselContent>
          <BaseCard className="flex w-full aspect-square md:aspect-[3/1]  items-center justify-center p-6">
            <div className="border border-secondary bg-[#ECECEC] w-full h-full flex justify-center items-center">
              <div className="text-center">
                <p className="text-4xl font-semibold">{t('title')}</p>
                <p>{t('description')}</p>
              </div>
            </div>
          </BaseCard>
        </CarouselContent>
      )}
    </Carousel>
  );
};
