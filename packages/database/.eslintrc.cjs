const config = require('@nouvelles/lintconfig/eslint-node');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  ...config,
  rules: {
    ...config.rules,
    'eslint-comments/require-description': 'off',
  },
};
