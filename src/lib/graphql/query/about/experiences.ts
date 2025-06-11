import { gql } from 'apollo-boost';

export const queryAboutExperience = gql`
  query AboutExperience($slug: String, $year: Int, $first: Int, $skip: Int) {
    experiencesConnection(
      where: {
        serviceDetail: { slugService_contains: $slug }
        AND: { year_gte: $year }
      }
      first: $first
      skip: $skip
    ) {
      edges {
        node {
          company {
            companyName
            companySite
            description
          }
          year
          description
          detailLocation
          serviceDetail {
            name
          }
        }
      }
      aggregate {
        count
      }
      pageInfo {
        hasNextPage
        pageSize
      }
    }
    serviceDetails {
      name
      slugService
    }
    experiences(orderBy: year_ASC, first: 1) {
      year
    }
  }
`;
