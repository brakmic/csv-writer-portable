module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/src/test/**/*.ts'
  ],
  transform: {
    '^.+\\.ts?$': ['ts-jest', {
      tsconfig: 'tsconfig.jest.json'
    }],
  },
  testPathIgnorePatterns: [
    "/node_modules/",
    "/helper.ts$",
    "/delimiter.ts$",
    "/mocks/"
  ]
};
