import { gql } from 'apollo-boost';

export const queryServiceList = gql`
  query ServiceList($service: String, $locale: [Locale!]!) {
    serviceDetailsConnection(
      where: { service: { serviceName_contains: $service } }
      locales: $locale
      first: 17
    ) {
      aggregate {
        count
      }
      edges {
        node {
          name
          slugService
          shortDescription
          icon
        }
      }
    }
    services {
      serviceName
    }
  }
`;
