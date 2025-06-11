import { INewsUpdate } from '@/interface/query/newsUpdate';
import { IService } from '@/interface/query/services';
import { locales } from '@/lib/config/locales';
import { Config } from '@/lib/config/url';
import {
  getQueryClientBlogs,
  getQueryClientMaster,
} from '@/lib/graphql/client';
import { queryStaticParamsBlog } from '@/lib/graphql/query/newsUpdates/staticParams';
import { queryServicesSlug } from '@/lib/graphql/query/services/serviceSlug';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: servicesData } = await getQueryClientMaster<
    IService<'slugService' | 'updatedAt'>
  >(queryServicesSlug);

  const { data: newsResumeData } = await getQueryClientBlogs<
    INewsUpdate<'slug' | 'typePost'>
  >(queryStaticParamsBlog);

  const services: MetadataRoute.Sitemap = [];
  const newsResumes: MetadataRoute.Sitemap = [];

  servicesData.serviceDetails?.forEach((service) => {
    const alternates = locales.reduce((acc, locale) => {
      acc[locale] = `${Config.origin}/${locale}/${service.slugService}`;
      return acc;
    }, {} as Record<string, string>);

    services.push({
      url: `${Config.origin}/services/${service.slugService}`, // URL utama
      lastModified: new Date(service.updatedAt!),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: {
        languages: alternates, // Alternates dengan bahasa
      },
    });
  });

  newsResumeData.blogPosts?.forEach((post) => {
    const alternates = locales.reduce((acc, locale) => {
      acc[locale] = `${Config.origin}/${locale}/${post.slug}`;
      return acc;
    }, {} as Record<string, string>);

    newsResumes.push({
      url: `${Config.origin}/post/${post.typePost}/${post.slug}`, // URL utama
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: {
        languages: alternates, // Alternates dengan bahasa
      },
    });
  });

  return Config.env === 'production'
    ? [
        {
          url: Config.origin as string,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 1,
          alternates: {
            languages: {
              en: `${Config.origin}/en`,
              id: `${Config.origin}/id`,
            },
          },
        },
        {
          url: Config.origin + '/about',
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 1,
          alternates: {
            languages: {
              en: `${Config.origin}/en/about`,
              id: `${Config.origin}/id/about`,
            },
          },
        },
        {
          url: Config.origin + '/services',
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 1,
          alternates: {
            languages: {
              en: `${Config.origin}/en/services`,
              id: `${Config.origin}/id/services`,
            },
          },
        },
        {
          url: Config.origin + '/regulations',
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 1,
          alternates: {
            languages: {
              en: `${Config.origin}/en/regulations`,
              id: `${Config.origin}/id/regulations`,
            },
          },
        },
        {
          url: Config.origin + '/journals',
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 1,
          alternates: {
            languages: {
              en: `${Config.origin}/en/journals`,
              id: `${Config.origin}/id/journals`,
            },
          },
        },
        {
          url: Config.origin + '/gallery/operational',
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 1,
          alternates: {
            languages: {
              en: `${Config.origin}/en/gallery/operational`,
              id: `${Config.origin}/id/gallery/operational`,
            },
          },
        },
        {
          url: Config.origin + '/gallery/non-operational',
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 1,
          alternates: {
            languages: {
              en: `${Config.origin}/en/gallery/non-operational`,
              id: `${Config.origin}/id/gallery/non-operational`,
            },
          },
        },
        {
          url: Config.origin + '/activities',
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 1,
          alternates: {
            languages: {
              en: `${Config.origin}/en/activities`,
              id: `${Config.origin}/id/activities`,
            },
          },
        },
        {
          url: Config.origin + '/news-resume',
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 1,
          alternates: {
            languages: {
              en: `${Config.origin}/en/news-resume`,
              id: `${Config.origin}/id/news-resume`,
            },
          },
        },
        ...services,
        ...newsResumes,
      ]
    : [];
}
