import { isDependency } from '@/helpers/is-dependency';
import { isNextEnabled } from '@/helpers/is-next-enabled';
import { isStrict } from '@/helpers/is-strict';

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
    // Overridden by plugin:@typescript-eslint/recommended-type-checked in Typescript files because of @typescript-eslint/no-unused-vars.
    'no-unused-vars': [
      'error',
      {
        args: 'none',
      },
    ],
    // Overridden manually in Typescript files because of @typescript-eslint/require-await.
    'require-await': ['warn'],

    'object-shorthand': ['error', 'always'],
    'no-use-before-define': ['error'],

    'unicorn/prefer-node-protocol': 'error',
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase',
        // Allow all-uppercase filenames
        ignore: ['^[A-Z]+.*\\.(ts|tsx|js|jsx)$'],
      },
    ],

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
      extends: ['plugin:@typescript-eslint/recommended-type-checked'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      rules: {
        'require-await': ['off'],

        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            args: 'none',
          },
        ],
        '@typescript-eslint/require-await': 'warn',

        '@typescript-eslint/no-misused-promises': [
          'error',
          {
            checksVoidReturn: {
              attributes: false,
            },
          },
        ],
        '@typescript-eslint/no-floating-promises': 'warn',

        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            fixStyle: 'inline-type-imports',
          },
        ],

        ...(isStrict() && {
          '@typescript-eslint/no-unnecessary-condition': 'error',
        }),
      },
    },
  ],
};

module.exports = config;
export default config;
