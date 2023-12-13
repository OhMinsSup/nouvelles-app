const config = require('@nouvelles/lintconfig/eslint-react');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  ...config,
  rules: {
    ...config.rules,
    'func-names': 'off',
    'unicorn/filename-case': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-dynamic-delete': 'off',
  },
};
