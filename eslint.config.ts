import nextPlugin from '@next/eslint-plugin-next'
import tsParser from '@typescript-eslint/parser'

import importPlugin from 'eslint-plugin-import'
import jestDomPlugin from 'eslint-plugin-jest-dom'
import reactPlugin from 'eslint-plugin-react'
import testingLibraryPlugin from 'eslint-plugin-testing-library'

export default [
  {
    ignores: ['src/utilities/prayertime/prayertime.js', '.next/', 'node_modules/'],
  },
  {
    plugins: {
      '@next/next': nextPlugin,
      react: reactPlugin,
      import: importPlugin,
      'jest-dom': jestDomPlugin,
      'testing-library': testingLibraryPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      ...reactPlugin.configs.recommended.rules,
      ...jestDomPlugin.configs.recommended.rules,
      ...testingLibraryPlugin.configs.react.rules,
      ...importPlugin.configs.typescript.rules,
      'react/react-in-jsx-scope': 'off',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'next/*',
              group: 'external',
            },
            {
              pattern: '@/**',
              group: 'internal',
            },
            {
              pattern: '*',
              group: 'external',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxEOF: 0,
          maxBOF: 0,
        },
      ],
      'no-console': 'error',
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      'no-mixed-spaces-and-tabs': 'error',
      'no-trailing-spaces': 'error',
      'no-multi-spaces': 'error',
      'arrow-spacing': 'error',
      'prefer-arrow-callback': 'error',
      'brace-style': [
        'error',
        '1tbs',
        {
          allowSingleLine: true,
        },
      ],
      'no-use-before-define': 'error',
      'prefer-const': 'error',
      'no-unneeded-ternary': 'error',
      'no-shadow': 'error',
    },
    settings: {
      tailwindcss: {
        callees: ['cn'],
        config: 'tailwind.config.js',
      },
      next: {
        rootDir: true,
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
    },
  },
]