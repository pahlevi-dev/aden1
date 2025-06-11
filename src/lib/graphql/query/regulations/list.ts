import { gql } from 'apollo-boost';

export const queryDocumentList = gql`
  query DocumentList($locale: [Locale!]!, $type: DocumentType) {
    documents(locales: $locale, first: 100, where: { type: $type }) {
      name
      fileUrl
      description
    }
  }
`;
