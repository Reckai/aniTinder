import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  // Используем локальный файл схемы вместо URL
  schema: './generated/shikiomori/schema.graphql',
  documents: ['src/**/*.ts'],
  ignoreNoDocuments: true,
  generates: {
    './generated/shikiomori/': {
      preset: 'client',
      config: {
        documentMode: 'string',
      },
    },
  },
};

export default config;
