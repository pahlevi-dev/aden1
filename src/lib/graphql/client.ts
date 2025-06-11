import {
  ApolloClient,
  ApolloQueryResult,
  DocumentNode,
  HttpLink,
  InMemoryCache,
  MaybeMasked,
  OperationVariables,
} from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support';
import { Config } from '../config/url';

// Client master: It must be changed and only 1 client when using strapi as backend
const { getClient: clientMaster } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: Config.url ?? '',
      headers: {
        Authorization: `Bearer ${Config.token}`,
      },
    }),
  });
});

const { getClient: clientBlogs } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: Config.urlBlog ?? '',
      headers: {
        Authorization: `Bearer ${Config.tokenBlog}`,
      },
    }),
  });
});

export const getQueryClientMaster = async <T>(
  query: DocumentNode,
  variables?: OperationVariables
): Promise<ApolloQueryResult<MaybeMasked<T>>> => {
  const response = await clientMaster().query<T>({ query: query, variables });

  return response;
};

export const getQueryClientBlogs = async <T>(
  query: DocumentNode,
  variables?: OperationVariables
): Promise<ApolloQueryResult<MaybeMasked<T>>> => {
  const response = await clientBlogs().query<T>({ query: query, variables });

  return response;
};
