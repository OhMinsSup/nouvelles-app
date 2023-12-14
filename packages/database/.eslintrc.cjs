const config = require('@nouvelles/lintconfig/eslint-node');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  ...config,
  rules: {
    ...config.rules,
    'no-console': 'off',
    'eslint-comments/require-description': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
};
