import isDependency from '@/helpers/is-dependency';

const truthyArray = (array: Array<unknown>) => array.filter(Boolean);

const config = {
  extends: truthyArray([
    'eslint:recommended',
    isDependency('react') && 'plugin:react/jsx-runtime',
    isDependency('react') && 'plugin:react-hooks/recommended',
    isDependency('next') && 'plugin:@next/next/recommended',
  ]),
  overrides: [
    {
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      files: ['**/*.{ts,tsx}'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  plugins: truthyArray([
    '@typescript-eslint',
    isDependency('react') && 'react',
    isDependency('react') && 'react-hooks',
  ]),
  root: true,
  settings: {
    react: {
      version: 'detect',
    },
  },
};

module.exports = config;
export default config;
