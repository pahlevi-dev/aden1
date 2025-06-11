import { gql } from 'apollo-boost';

export const queryDetailNewsUpdate = gql`
  query DetailNewsUpdateActivities($slug: String, $type: [TypePost]) {
    blogPosts(first: 5, where: { typePost_in: $type }) {
      headline
      typePost
      shortDescription
      slug
      thumbnail {
        url
      }
    }
    blogPost(where: { slug: $slug }) {
      headline
      slug
      thumbnail {
        url
      }
      typePost
      shortDescription
      articles {
        raw
      }
      publishedBy {
        name
      }
      publishedAt
    }
  }
`;
