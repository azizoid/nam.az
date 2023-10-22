const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

/* @type {import('jest').Config} */
const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  rootDir: '..',
  setupFilesAfterEnv: ['<rootDir>/config/jest-setup.ts'],
  preset: 'ts-jest',
  coverageThreshold: {
    global: {
      lines: 90,
    },
  },
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
}

module.exports = createJestConfig(customJestConfig)
