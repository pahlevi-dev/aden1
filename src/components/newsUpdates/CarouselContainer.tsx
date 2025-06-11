'use client';

import { IBlogPost } from '@/interface/query/newsUpdate';
import Autoplay from 'embla-carousel-autoplay';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { BaseCard } from '../ui/card';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '../ui/carousel';

interface IProps {
  data?: Pick<IBlogPost, 'headline' | 'thumbnail'>[];
}

export const CarouselContainer = ({ data }: IProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const t = useTranslations('Empty');

  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="space-y-5">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        {data?.length ? (
          <CarouselContent>
            {data?.map((item, i) => (
              <CarouselItem key={i}>
                <BaseCard className="relative flex aspect-[2/3] md:aspect-[3/1] bg-secondary items-center justify-center rounded-lg">
                  <div className="absolute top-0 left-0 w-full h-full bg-primary opacity-20"></div>
                  <Image
                    src={item.thumbnail!.url!}
                    alt={item.headline}
                    width={1400}
                    height={800}
                    className="w-full object-cover aspect-[2/3] md:aspect-[3/1] rounded-lg"
                  />
                </BaseCard>
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
      <div className="w-full flex gap-2 justify-center">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={`w-[100px] h-2 transition-all ease-out rounded-full ${
              i + 1 === current ? 'bg-primary' : 'bg-secondary'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};
