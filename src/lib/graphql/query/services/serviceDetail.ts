import { gql } from 'apollo-boost';

export const queryServiceDetail = gql`
  query ServiceDetail($slug: String, $lang: [Locale!]!) {
    serviceDetail(where: { slugService: $slug }, locales: $lang) {
      id
      locale
      name
      description
      advantage {
        name
        description
        thumbnail(locales: en) {
          id
          url
        }
      }
      thumbnail(locales: en) {
        id
        url
      }
      stepProcess {
        id
        locale
        name
        description {
          html
        }
      }
    }
  }
`;
