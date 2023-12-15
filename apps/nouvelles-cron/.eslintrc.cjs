const config = require('@nouvelles/lintconfig/eslint-node');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  ...config,
  rules: {
    ...config.rules,
    'no-console': 'off',
    'eslint-comments/require-description': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/require-await': 'off',
  },
};
