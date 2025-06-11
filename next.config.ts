import type { NextConfig } from 'next';
import createNextIntlPlugins from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugins();

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'eu-west-2.graphassets.com',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
