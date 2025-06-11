// import logo from '@/app/assets/logo/logo_amc.png';
import { Footer } from '@/components/layouts/footer';
import { HeaderMenu } from '@/components/layouts/header';
import { IParams } from '@/interface/config/params';
import { IServiceName } from '@/interface/query/services';
import { locales } from '@/lib/config/locales';
import { customMetaDataGenerator } from '@/lib/config/metadataGenerator';
import { Config } from '@/lib/config/url';
import { getQueryClientMaster } from '@/lib/graphql/client';
import { queryServiceCategory } from '@/lib/graphql/query/services/serviceCategory';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { Montserrat } from 'next/font/google';
import { ReactNode } from 'react';
import '../globals.css';

const montserrat = Montserrat({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Arial', 'sans-serif'],
});

type Props = {
  children: ReactNode;
  params: Promise<IParams>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const revalidate = 86400;

export const dynamicParams = false;

export async function generateMetadata({ params }: Omit<Props, 'children'>) {
  const locale = (await params).locale;
  const t = await getTranslations({
    locale: locale,
    namespace: 'HomePage',
  });

  const keywords: string[] = t.raw('keywords');

  const metadata: Metadata = customMetaDataGenerator({
    title: t('title'),
    description: t('description'),
    canonicalUrl: Config.origin + '/' + locale,
    keywords: keywords,
  });

  return metadata;
}

export default async function RootLayout({ children, params }: Props) {
  const locale = (await params).locale;
  // unstable_setRequestLocale(locale);
  const message = await getMessages();

  const { data } = await getQueryClientMaster<IServiceName>(
    queryServiceCategory
  );

  return (
    <html lang={locale}>
      <body className={`${montserrat.className} antialiased`}>
        <NextIntlClientProvider messages={message}>
          <HeaderMenu />
          <div className="min-h-[85vh] py-5">{children}</div>
          <Footer services={data.services} locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
