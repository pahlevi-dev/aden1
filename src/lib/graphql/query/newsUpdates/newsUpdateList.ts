import { gql } from 'apollo-boost';

export const queryNewsUpdateList = gql`
  query NewsUpdateList($first: Int, $skip: Int, $type: [TypePost]) {
    blogPosts(
      first: 5
      where: { typePost_in: $type, thumbnail: { id_not: null } }
    ) {
      headline
      thumbnail {
        url
      }
      shortDescription
    }
    blogPostsConnection(
      first: $first
      skip: $skip
      where: { typePost_in: $type }
    ) {
      aggregate {
        count
      }
      edges {
        node {
          headline
          thumbnail {
            url
          }
          typePost
          shortDescription
          slug
        }
        cursor
      }
      pageInfo {
        pageSize
      }
    }
  }
`;
