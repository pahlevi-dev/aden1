import { Config } from '@/lib/config/url';
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/api'],
    },
    sitemap: Config.origin + 'sitemap.xml',
  };
}
