import { IBlogPostConnection } from '@/interface/query/newsUpdate';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { CardNewsResume } from '../newsUpdates/CardsNewsResume';
import { Button } from '../ui/button';

interface IProps {
  data: IBlogPostConnection['edges'];
  locale: string;
}

export const ContainerNewsResumeHome = async ({ data, locale }: IProps) => {
  const tEmpty = await getTranslations('Empty');
  const tHome = await getTranslations('HomePage');
  const tCta = await getTranslations('CTA');

  if (data?.length === 0 || !data)
    return (
      <div className="container p-5 mx-auto">
        <div className="w-full h-full flex justify-center items-center">
          <div className="text-center">
            <p className="text-2xl">{tEmpty('title')}</p>
            <p>{tEmpty('description')}</p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="container p-5 mx-auto">
      <div className="md:flex items-center justify-between mb-5 gap-5">
        <div>
          <h1 className="max-w-[500px]">{tHome('newsResumeTitle')}</h1>
          <p className="max-w-[200px]">{tHome('newsResumeDescription')}</p>
        </div>
        <div className="md:max-w-[200px] md:mt-0 mt-3">
          <Button asChild>
            <Link href={`${locale}/news-resume`}>{tCta('viewMore')}</Link>
          </Button>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {data?.map((item, i) => (
          <CardNewsResume
            key={i}
            locale={locale}
            slug={`${item.node!.typePost}/${item.node!.slug}`}
            index={i}
            typePost={item.node!.typePost}
            headline={item.node!.headline}
            shortDescription={item.node!.shortDescription}
            thumbnail={item.node!.thumbnail}
          />
        ))}
      </div>
    </div>
  );
};
