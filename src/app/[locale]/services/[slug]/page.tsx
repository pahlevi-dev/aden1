import BasicImage from '@/app/assets/image/pexels-lisa-baker-336803-944407.jpg';
import StepProcessBg from '@/app/assets/image/step_process.png';
import { CardAdvantages } from '@/components/service/detail/CardAdvantage';
import { StepProcess } from '@/components/service/detail/StepProcess';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icons';
import { IParams } from '@/interface/config/params';
import { IService } from '@/interface/query/services';
import { locales } from '@/lib/config/locales';
import { customMetaDataGenerator } from '@/lib/config/metadataGenerator';
import { getQueryClientMaster } from '@/lib/graphql/client';
import { queryServiceDetail } from '@/lib/graphql/query/services/serviceDetail';
import { queryServicesSlug } from '@/lib/graphql/query/services/serviceSlug';
import { Metadata, ResolvingMetadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  params: Promise<IParams<{ slug: string }>>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
) {
  const { slug, locale } = await params;

  const { data } = await getQueryClientMaster<IService>(queryServiceDetail, {
    slug: slug,
    lang: [locale],
  });

  const previousImages = (await parent).openGraph?.images || [];

  const metadata: Metadata = customMetaDataGenerator({
    title: data.serviceDetail?.name ?? '',
    description: data.serviceDetail?.description,
    ogImage: [data.serviceDetail?.thumbnail?.url ?? '', ...previousImages],
    icon: '../../logo.svg',
    keywords: data.serviceDetail?.keywords ?? [],
  });

  return metadata;
}

export const revalidate = 300;

export const dynamicParams = false;

export async function generateStaticParams() {
  const { data } = await getQueryClientMaster<IService<'slugService'>>(
    queryServicesSlug
  );

  const params = locales.flatMap((locale) =>
    data.serviceDetails?.map((item) => ({
      locale,
      slug: item.slugService,
    }))
  );

  return params;
}

export default async function ServiceDetailPage({ params }: Props) {
  const t = await getTranslations('ServiceDetailPage');
  const { slug, locale } = await params;
  const { data, loading } = await getQueryClientMaster<IService>(
    queryServiceDetail,
    {
      slug: slug,
      lang: [locale],
    }
  );

  if (loading) return loading;
  return (
    <div>
      <div className="container mx-auto p-5">
        <div className="relative min-h-[60vh]">
          <Image
            src={data.serviceDetail?.thumbnail?.url ?? BasicImage}
            alt={data.serviceDetail?.slugService ?? slug}
            className="w-full h-[70vh] object-cover rounded-lg"
            width={1400}
            height={800}
          />
          <div className="absolute top-0 left-0 w-full h-full p-5 text-white flex items-end bg-gradient-to-b from-transparent via-transparent to-[#095B8D] rounded-lg">
            <div className="md:h-40 md:ml-12">
              <h1 className="text-4xl">{data.serviceDetail?.name}</h1>
              <p className="max-w-[300px] md:max-w-[500px]">
                {data.serviceDetail?.description}
              </p>
            </div>
          </div>

          <div className="absolute top-5 left-5">
            <Button variant="ghost" asChild>
              <Link href={`/${locale}/services`} legacyBehavior passHref>
                <div className="cursor-pointer text-white flex items-center gap-2">
                  <Icon name="arrow-left" />
                  <div>{t('buttonBack')}</div>
                </div>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto min-h-[70vh] flex items-center p-5">
        <div className="w-full">
          <h2 className="mb-5">{t('advantagesTitle')}</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {data.serviceDetail?.advantage.map((item, i) => (
              <CardAdvantages
                key={i}
                chipsText={t('advantagesCardDetail')}
                index={i}
                {...item}
              />
            ))}
          </div>
        </div>
      </div>

      {data.serviceDetail?.stepProcess?.length && (
        <div className="relative min-h-[80vh]">
          <Image
            src={StepProcessBg}
            alt="background_process"
            className="absolute right-0 aspect-[3/3] w-auto h-full object-cover object-left -z-10"
          />
          <div className="container mx-auto p-5">
            <h2>{t('stepProcessTitle')}</h2>
            <p className="max-w-[300px]">{t('stepProcessDesc')}</p>
            <StepProcess data={data.serviceDetail?.stepProcess ?? []} />
          </div>
        </div>
      )}
    </div>
  );
}
