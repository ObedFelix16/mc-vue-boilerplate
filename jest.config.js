module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  setupFiles: ['<rootDir>/tests/unit/setup.ts'],
  testMatch: ['**/(*.)spec.{j,t}s?(x)'],
  moduleNameMapper: require('./aliases.config').jest,
}
