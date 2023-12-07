/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@nouvelles/lintconfig/library.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
