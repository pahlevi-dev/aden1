import { ISEOMetadataProps } from '@/interface/config/metaData';
import { Metadata } from 'next';
import { Config } from './url';

export function customMetaDataGenerator({
  title = '',
  description = '',
  canonicalUrl = '',
  ogType = 'website',
  keywords = ['AMDAL', 'Lingkungan Hidup', 'Konsultan'],
  ogImage = './logo.svg',
  twitterCard = 'summary_large_image',
  icon = './logo.svg',
}: ISEOMetadataProps): Metadata {
  // Create Site Title
  const siteTitle = 'PT AMARA CISADANE';
  const fullTitle = `${title} | ${siteTitle}`;

  return {
    title: fullTitle,
    description,
    verification: {
      google: Config.googleVerification,
    },
    icons: {
      icon,
    },
    keywords: keywords.join(', '),
    openGraph: {
      title: fullTitle,
      description,
      type: ogType,
      url: canonicalUrl,
      images: ogImage,
    },
    twitter: {
      card: twitterCard,
      title: fullTitle,
      description,
      images: ogImage,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}
