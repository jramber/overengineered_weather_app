import type { Config } from 'jest'
const config: Config = {
  verbose: true,
  testEnvironment: 'jsdom',
  transform: {
    '\\.[jt]sx?$': ['ts-jest',  { useESM: false }]
  },
  moduleNameMapper: {
    '(.+)\\.js': '$1'
  },
  extensionsToTreatAsEsm: ['.ts'],
};

export default config;
