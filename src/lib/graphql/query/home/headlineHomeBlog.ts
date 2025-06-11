import { gql } from 'apollo-boost';

export const queryHomeHeadlineBlog = gql`
  query HomeHeadlineBlog {
    blogPosts(where: { typePost: activity }, first: 3) {
      slug
      headline
      thumbnail {
        url
      }
      shortDescription
    }
    blogPostsConnection(first: 3) {
      edges {
        node {
          slug
          headline
          shortDescription
          typePost
          thumbnail {
            url
          }
        }
      }
    }
  }
`;
