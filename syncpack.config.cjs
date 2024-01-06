/** @type {import("syncpack").RcFile} */
module.exports = {
  customTypes: {
    engines: {
      path: 'engines',
      strategy: 'versionsByName',
    },
    packageManager: {
      path: 'packageManager',
      strategy: 'name@version',
    },
  },
  semverGroups: [
    {
      label: 'packageManager should always use exact dependency ranges',
      dependencyTypes: ['packageManager'],
      dependencies: ['**'],
      packages: ['**'],
      range: '',
    },
    {
      label: 'engines.node should always use >= ranges',
      dependencyTypes: ['engines'],
      dependencies: ['node'],
      packages: ['**'],
      range: '>=',
    },
    {
      label: 'engines.bun should always use 1.x >= ranges',
      dependencyTypes: ['engines'],
      dependencies: ['bun'],
      packages: ['**'],
      range: '>=',
    },
    {
      label:
        'Deps in pnpm overrides can use whatever dependency ranges they need',
      dependencyTypes: ['pnpmOverrides'],
      dependencies: ['**'],
      packages: ['**'],
      isIgnored: true,
    },
    {
      label: 'Dependencies should use caret dependency ranges',
      dependencies: [
        '@builder.io/partytown',
        '@dicebear/collection',
        '@dicebear/core',
        '@hookform/resolvers',
        '@sentry/nextjs',
        '@t3-oss/env-nextjs',
        'clsx',
      ],
      dependencyTypes: ['dev', 'prod'],
      packages: ['**'],
      range: '^',
    },
  ],
  versionGroups: [
    {
      label:
        "Ignore monorepo packages that don't have a version in their package.json",
      isIgnored: true,
      dependencies: [
        '@nouvelles/api',
        '@nouvelles/date',
        '@nouvelles/eli',
        '@nouvelles/database',
        '@nouvelles/error',
        '@nouvelles/libs',
        '@nouvelles/lintconfig',
        '@nouvelles/logger',
        '@nouvelles/react',
        '@nouvelles/react-components',
        '@nouvelles/react-hooks',
        '@nouvelles/tailwind',
        '@nouvelles/tsconfig',
      ],
      packages: [
        '@nouvelles/api',
        '@nouvelles/date',
        '@nouvelles/eli',
        '@nouvelles/database',
        '@nouvelles/error',
        '@nouvelles/libs',
        '@nouvelles/lintconfig',
        '@nouvelles/logger',
        '@nouvelles/react',
        '@nouvelles/react-components',
        '@nouvelles/react-hooks',
        '@nouvelles/tailwind',
        '@nouvelles/tsconfig',
      ],
    },
  ],
};
