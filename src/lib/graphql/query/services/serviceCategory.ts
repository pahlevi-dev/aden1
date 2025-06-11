import { gql } from 'apollo-boost';

export const queryServiceCategory = gql`
  query ServiceCategory {
    services {
      serviceName
    }
  }
`;
