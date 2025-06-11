import { gql } from 'apollo-boost';

export const queryServicesSlug = gql`
  query SlugServiceDetails {
    serviceDetails {
      slugService
      updatedAt
    }
  }
`;
