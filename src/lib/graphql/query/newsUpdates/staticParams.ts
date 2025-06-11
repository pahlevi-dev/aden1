import { gql } from 'apollo-boost';

export const queryStaticParamsBlog = gql`
  query StaticParamBlogs {
    blogPosts {
      slug
      typePost
    }
  }
`;
