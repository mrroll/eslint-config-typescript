import * as semver from 'semver';
import isDependency from '@/helpers/is-dependency';
import isAnyDependency from '@/helpers/is-any-dependency';
import getDependencyVersion from '@/helpers/get-dependency-version';

const config = {
  env: {
    commonjs: true,
    node: true,
    es6: true,
    es2017: true,
    es2020: true,
    ...(isAnyDependency(['next', 'react-dom']) && {
      browser: true,
    }),
  },

  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },

  parser: '@typescript-eslint/parser',

  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    project: 'tsconfig.json',
  },

  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    isDependency('next') && 'plugin:@next/next/recommended',
    isDependency('react') && 'plugin:react/recommended',
    isDependency('react') &&
      semver.gte(getDependencyVersion('react'), '17.0.0') &&
      'plugin:react/jsx-runtime',
    isDependency('react-native') && 'plugin:react-native/all',
    isDependency('react') && 'plugin:react-hooks/recommended',
    isDependency('react') && 'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ].filter(Boolean),

  plugins: [
    'import',
    isDependency('react') && 'react',
    isDependency('react-native') && 'react-native',
    isDependency('react') && 'react-hooks',
    isDependency('react') && 'jsx-a11y',
    '@typescript-eslint',
    'prettier',
  ].filter(Boolean),

  settings: {
    'import/resolver': {
      typescript: {},
    },

    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },

    ...(isDependency('react') && {
      react: {
        version: getDependencyVersion('react'),
      },
    }),
  },

  rules: {
    // https://typescript-eslint.io/rules/no-unused-vars/#how-to-use
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false,
        varsIgnorePattern: '^cx$|^classnames$|^clsx$',
      },
    ],

    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        /**
         * Allow the use of external for matching for classnames/bind which we
         * want near the end of the component's imports together with the
         * ./Component.module.scss file.
         */
        pathGroupsExcludedImportTypes: ['builtin'],
        pathGroups: [
          {
            pattern: 'classnames/bind',
            group: 'sibling',
          },
        ],
      },
    ],
  },
};

export = config;
