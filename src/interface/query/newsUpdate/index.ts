import { PostType } from '@/constants/posts';
import { IAggregate, IEdges } from '../common/edgesModel';
import { IPublished } from '../common/publish';
import { IRichText } from '../common/richText';
import { IThumbnail } from '../common/thumbnail';

export interface IBlogPost extends IPublished {
  headline: string;
  thumbnail: IThumbnail | null;
  typePost: PostType;
  shortDescription: string;
  articles: IRichText[] | null;
  slug: string;
}

export interface INewsUpdate<T extends keyof IBlogPost = keyof IBlogPost> {
  blogPost?: Pick<IBlogPost, T>;
  blogPosts?: Pick<IBlogPost, T>[];
}

export interface IBlogPostConnection {
  aggregate: IAggregate;
  edges: IEdges<
    INewsUpdate<
      'headline' | 'thumbnail' | 'typePost' | 'shortDescription' | 'slug'
    >['blogPost']
  >[];
}
