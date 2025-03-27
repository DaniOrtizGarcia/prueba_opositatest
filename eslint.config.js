import js from '@eslint/js'
import tseslint from 'typescript-eslint'

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        node: true,
        browser: true,
      },
    },
    rules: {
      'no-console': 'error',
      'no-unused-vars': 'error',
      'eqeqeq': ['error', 'always'],
      '@typescript-eslint/no-explicit-any': 'warn',
      'multiline-comment-style': ['warn', 'starred-block'],
      'eol-last': ['error', 'always'],
      'indent': ['error', 2]
    },
  },
]
