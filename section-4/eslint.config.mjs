import js from '@eslint/js';
import globals from 'globals';
import prettierPlugin from 'eslint-plugin-prettier';
import securityPlugin from 'eslint-plugin-security';
export default [
  { ignores: ['node_modules'] },
  {
    files: ['**/*.{js,mjs,cjs}'],
    ...js.configs.recommended,
    plugins: {
      prettier: prettierPlugin,
      security: securityPlugin,
    },
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      'no-console': 'error',
      'consistent-return': 'off',
      'func-names': 'off',
    },
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: globals.node,
    },
  },
];
