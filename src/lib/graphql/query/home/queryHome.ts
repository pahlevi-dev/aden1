import { gql } from 'apollo-boost';

export const queryHome = gql`
  query Home($locale: [Locale!]!) {
    serviceDetails(locales: $locale, first: 100) {
      name
      slugService
      experience(first: 25) {
        company {
          companyName
        }
        description
        detailLocation
        year
      }
      description
      thumbnail(locales: en) {
        url
        id
      }
      icon
    }
    services {
      serviceName
      description
    }
    companies(where: { logo: { id_not: null } }, first: 15) {
      companyName
      logo {
        url
      }
      companySite
      type
    }
  }
`;
