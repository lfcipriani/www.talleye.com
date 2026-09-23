import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';
import jest from 'eslint-plugin-jest';
import testingLibrary from 'eslint-plugin-testing-library';
import jestDom from 'eslint-plugin-jest-dom';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    ignores: ['.next/', 'out/', 'build/', 'coverage/', 'node_modules/'],
  },
  js.configs.recommended,
  react.configs.flat.recommended,
  prettierConfig,
  testingLibrary.configs['flat/dom'],
  testingLibrary.configs['flat/react'],
  jestDom.configs['flat/recommended'],
  {
    plugins: { prettier, jest },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        React: 'writable',
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // Disable prop-types as we use TypeScript for type checking
      'react/prop-types': 'off',
      'prettier/prettier': 'error',
      // needed for NextJS's jsx without react import
      'react/react-in-jsx-scope': 'off',
      'react/no-unescaped-entities': 0,
      // styled-jsx uses jsx attribute
      'react/no-unknown-property': ['error', { ignore: ['jsx', 'global'] }],
      // jest rules
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
    },
  },
];
