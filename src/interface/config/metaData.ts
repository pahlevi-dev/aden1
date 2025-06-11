import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

export interface ISEOMetadataProps {
  title: string;
  description?: string;
  canonicalUrl?: string;
  ogType?:
    | 'article'
    | 'website'
    | 'book'
    | 'profile'
    | 'music.song'
    | 'music.album'
    | 'music.playlist'
    | 'music.radio_station'
    | 'video.movie'
    | 'video.episode'
    | 'video.tv_show'
    | 'video.other';
  ogImage?: OpenGraph['images'];
  twitterCard?: 'summary' | 'summary_large_image' | 'player' | 'app';
  keywords?: string[];
  icon?: string;
}
