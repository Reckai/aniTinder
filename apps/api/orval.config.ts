export default {
  tmdb: {
    input: 'https://developer.themoviedb.org/openapi/64542913e1f86100738e227f',
    output: {
      mode: 'split',
      target: './src/generated/tmdb/api.ts',
      schemas: './generated/tmdb/schemas',
      client: 'axios',
      override: {
        mutator: {
          path: './src/utils/api/tmdb/mutator.ts',
          name: 'customInstance',
        },
      },
    },
  },
};
