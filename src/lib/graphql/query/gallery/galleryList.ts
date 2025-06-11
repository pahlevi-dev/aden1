import { gql } from 'apollo-boost';

export const queryGalleryList = gql`
  query GalleriesList($type: GalleryType, $first: Int, $skip: Int) {
    galleries(where: { type: $type }, first: $first, skip: $skip) {
      image {
        url
      }
      title
      type
      shortDescription
    }
  }
`;
