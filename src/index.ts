import isDependency from '@/helpers/is-dependency';
import { isNextEnabled } from '@/helpers/is-next-enabled';

const truthyArray = (array: Array<unknown>) => array.filter(Boolean);

const config = {
  root: true,

  plugins: truthyArray([
    'unicorn',
    isDependency('react') && 'react',
    isDependency('react') && 'react-hooks',
    isDependency('drizzle-orm') && 'drizzle',
  ]),

  extends: truthyArray([
    'eslint:recommended',
    isDependency('react') && 'plugin:react/jsx-runtime',
    isDependency('react') && 'plugin:react-hooks/recommended',
    isNextEnabled() && 'plugin:@next/next/recommended',
    'prettier',
  ]),

  settings: {
    ...(isDependency('react') && {
      react: {
        version: 'detect',
      },
    }),
  },

  rules: {
    'no-unused-vars': [
      'error',
      {
        args: 'none',
      },
    ],
    'unicorn/prefer-node-protocol': 'error',
    'unicorn/filename-case': 'error',

    ...(isDependency('drizzle-orm') && {
      'drizzle/enforce-delete-with-where': [
        'error',
        {
          drizzleObjectName: ['drizzle', 'tx'],
        },
      ],
      'drizzle/enforce-update-with-where': [
        'error',
        {
          drizzleObjectName: ['drizzle', 'tx'],
        },
      ],
    }),
  },

  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-type-checked',
      ],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            args: 'none',
          },
        ],

        '@typescript-eslint/no-misused-promises': [
          'error',
          {
            checksVoidReturn: {
              attributes: false,
            },
          },
        ],

        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            fixStyle: 'inline-type-imports',
          },
        ],

        '@typescript-eslint/require-await': 'warn',
        '@typescript-eslint/no-floating-promises': 'warn',
      },
    },
  ],
};

module.exports = config;
export default config;
