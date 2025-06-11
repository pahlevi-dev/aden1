import { Collapsible } from '@/components/ui/collapsible';
import { Loading } from '@/components/ui/loading';
import { useTranslations } from 'next-intl';
import { Suspense } from 'react';

export default function FaqPages() {
  const t = useTranslations('FAQ');

  const keys = [
    'question-1',
    'question-2',
    'question-3',
    'question-4',
    'question-5',
  ] as const;

  return (
    <div className="container mx-auto px-5">
      <div className="md:flex items-center justify-between mb-5">
        <h1 className="max-w-[500px]">{t('title')}</h1>
        <div className="max-w-[200px]">
          <p>{t('description')}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5">
        {keys.map((key) => (
          <Suspense key={key} fallback={<Loading />}>
            <Collapsible
              title={t(`faqContents.${key}.question`)}
              description={t(`faqContents.${key}.answer`)}
            />
          </Suspense>
        ))}
      </div>
    </div>
  );
}
