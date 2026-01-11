/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */
module.exports = {
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  // collectCoverageFrom: undefined,
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!./.next/**',
    '!./coverage/**',
    '!./jest.config.js',
  ],

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  // moduleNameMapper: {},
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  },

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
    '^.+\\.css$': '<rootDir>/test/cssTransform.js',
  },

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  // Had to remove node_modules because we use a lot of ESModules in there that require transformation, blame remark
  transformIgnorePatterns: ['^.+\\.module\\.(css|sass|scss)$'],

  testEnvironment: 'jsdom',
};
