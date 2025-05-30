/* eslint-disable */
import * as types from './graphql';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  '\n    query GetAnimes(\n      $page: PositiveInt!\n      $limit: PositiveInt!\n      $search: String\n      $kind: AnimeKindString\n      $status: AnimeStatusString\n    ) {\n      animes(\n        page: $page\n        limit: $limit\n        search: $search\n        kind: $kind\n        status: $status\n      ) {\n        russian\n        english\n        episodes\n        poster {\n          originalUrl\n        }\n        genres {\n          name\n          russian\n        }\n        studios {\n          name\n        }\n        description\n      }\n    }\n  ': typeof types.GetAnimesDocument;
};
const documents: Documents = {
  '\n    query GetAnimes(\n      $page: PositiveInt!\n      $limit: PositiveInt!\n      $search: String\n      $kind: AnimeKindString\n      $status: AnimeStatusString\n    ) {\n      animes(\n        page: $page\n        limit: $limit\n        search: $search\n        kind: $kind\n        status: $status\n      ) {\n        russian\n        english\n        episodes\n        poster {\n          originalUrl\n        }\n        genres {\n          name\n          russian\n        }\n        studios {\n          name\n        }\n        description\n      }\n    }\n  ':
    types.GetAnimesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query GetAnimes(\n      $page: PositiveInt!\n      $limit: PositiveInt!\n      $search: String\n      $kind: AnimeKindString\n      $status: AnimeStatusString\n    ) {\n      animes(\n        page: $page\n        limit: $limit\n        search: $search\n        kind: $kind\n        status: $status\n      ) {\n        russian\n        english\n        episodes\n        poster {\n          originalUrl\n        }\n        genres {\n          name\n          russian\n        }\n        studios {\n          name\n        }\n        description\n      }\n    }\n  ',
): typeof import('./graphql').GetAnimesDocument;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
