import { IBlogPostConnection, INewsUpdate } from '.';

export interface INewsResumeActivity {
  blogPosts: INewsUpdate<
    'headline' | 'thumbnail' | 'slug' | 'shortDescription'
  >['blogPosts'];
  blogPostsConnection: IBlogPostConnection;
}
