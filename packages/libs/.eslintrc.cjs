const config = require('@nouvelles/lintconfig/eslint-library');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  ...config,
  rules: {
    ...config.rules,
    'eslint-comments/require-description': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
