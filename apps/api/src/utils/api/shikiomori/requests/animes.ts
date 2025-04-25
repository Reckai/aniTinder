import { TypedDocumentString } from 'generated/shikiomori/graphql';
import { shikiomoriApi } from '../instance';
import axios from 'axios';
import { graphql } from '../../../../../generated/shikiomori/gql';

/**
 * Execute a GraphQL query using the shikiomori API
 */
export async function execute<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) {
  try {
    const response = await shikiomoriApi.post('/api/graphql', {
      query,
      variables: variables || {},
    });

    return response.data as TResult;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`GraphQL request failed: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Interface for anime search parameters
 */
export interface AnimeSearchParams {
  page?: number;
  limit?: number;
  search?: string;
  kind?: string;
  status?: string;
}

/**
 * Get a list of animes with optional filtering
 */
export const getAnimes = async (params: AnimeSearchParams = {}) => {
  const { page = 1, limit = 10 } = params;

  // Используем graphql тег для правильного распознавания CodeGen
  const animesQuery = graphql(`
    query GetAnimes(
      $page: PositiveInt!
      $limit: PositiveInt!
      $search: String
      $kind: AnimeKindString
      $status: AnimeStatusString
    ) {
      animes(
        page: $page
        limit: $limit
        search: $search
        kind: $kind
        status: $status
      ) {
        russian
        english
        episodes
        poster {
          originalUrl
        }
        genres {
          name
          russian
        }
        studios {
          name
        }
        description
      }
    }
  `);

  return execute(animesQuery, {
    page,
    limit,
    search: params.search,
    kind: params.kind,
    status: params.status,
  });
};
