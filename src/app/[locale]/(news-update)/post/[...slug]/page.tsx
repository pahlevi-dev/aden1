import BgDefault from '@/app/assets/image/pexels-lisa-baker-336803-944407.jpg';
import { CardNewsResume } from '@/components/newsUpdates/CardsNewsResume';
import { RenderedComponent } from '@/components/newsUpdates/RenderedComponent';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icons';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { PostType } from '@/constants/posts';
import { socmed } from '@/constants/socmed';
import { IParams } from '@/interface/config/params';
import { INewsUpdate } from '@/interface/query/newsUpdate';
import { formatDate } from '@/lib/config/formatDate';
import { locales } from '@/lib/config/locales';
import { customMetaDataGenerator } from '@/lib/config/metadataGenerator';
import { getQueryClientBlogs } from '@/lib/graphql/client';
import { queryDetailNewsUpdate } from '@/lib/graphql/query/newsUpdates/detailNewsUpdate';
import { queryStaticParamsBlog } from '@/lib/graphql/query/newsUpdates/staticParams';
import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { IPostParams } from '../type';

interface IProps {
  params: Promise<IParams<IPostParams>>;
}

export async function generateMetadata(
  { params }: Omit<IProps, 'children'>,
  parent: ResolvingMetadata
) {
  const param = await params;

  const { data } = await getQueryClientBlogs<INewsUpdate>(
    queryDetailNewsUpdate,
    {
      slug: param.slug[1],
      type: [PostType.News, PostType.Resume, PostType.Activity],
    }
  );

  const previousImages = (await parent).openGraph?.images || [];

  const metadata: Metadata = customMetaDataGenerator({
    title: data.blogPost?.headline ?? '',
    description: data.blogPost?.shortDescription,
    ogImage: [data.blogPost?.thumbnail?.url ?? '', ...previousImages],
    icon: '../../../../logo.svg',
  });

  return metadata;
}

export const revalidate = 300;

export const dynamicParams = false;

export async function generateStaticParams() {
  const { data } = await getQueryClientBlogs<INewsUpdate<'slug' | 'typePost'>>(
    queryStaticParamsBlog
  );

  const params = locales.flatMap((locale) =>
    data.blogPosts?.map((item) => ({
      locale,
      slug: [item.typePost, item.slug],
    }))
  );

  return params;
}

export default async function DetailNewsResume({ params }: IProps) {
  const param = await params;

  const { data } = await getQueryClientBlogs<INewsUpdate>(
    queryDetailNewsUpdate,
    {
      slug: param.slug[1],
      type: [PostType.News, PostType.Resume],
    }
  );

  const { month, day, year } = formatDate(data.blogPost?.publishedAt);

  return (
    <div className="container mx-auto p-5 space-y-5">
      <div className="grid justify-items-center gap-5">
        <Image
          src={data.blogPost?.thumbnail?.url ?? BgDefault}
          alt={param.slug[1]}
          width={1400}
          height={800}
          className="w-full aspect-[2/1] md:aspect-[3/1] object-cover rounded-md"
        />
        <div className="flex flex-col items-center gap-2">
          <Icon name="circle-user" size={50} strokeWidth={1} />
          <p className="text-lg">{data.blogPost?.publishedBy.name}</p>
          <p>
            {day} {month} {year}
          </p>
        </div>
      </div>
      <div className="grid md:grid-cols-12 gap-2">
        <div className="col-span-1 self-start md:sticky top-5 md:min-h-[50vh] flex md:flex-col items-center justify-center md:justify-start gap-5 p-2">
          <div className="text-center md:block hidden">
            <p>{month}</p>
            <p className="text-4xl font-semibold">{day}</p>
            <p>{year}</p>
          </div>
          <div className="flex md:flex-col gap-5">
            {socmed.map((item, i) => (
              <TooltipProvider key={i}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className="px-3 py-5 rounded-md bg-white shadow-none"
                      variant="secondary"
                      asChild
                    >
                      <Link href={item.href} target="_blank">
                        <Image src={item.icon} alt={item.title} />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{item.title}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>

        <div className="md:col-span-11 space-y-5">
          <h1>{data.blogPost?.headline}</h1>
          {data?.blogPost?.articles?.map((item, i) => (
            <div key={i} className="space-y-3">
              {item.raw.children.map((child, idx) => (
                <RenderedComponent key={idx} {...child} />
              ))}
            </div>
          ))}

          <h2>Latest News</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {data.blogPosts?.map((item, i) => (
              <CardNewsResume
                key={i}
                locale={param.locale}
                slug={`${item.typePost}/${item.slug}`}
                index={i}
                typePost={item.typePost}
                headline={item.headline}
                shortDescription={item.shortDescription}
                thumbnail={item.thumbnail}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
