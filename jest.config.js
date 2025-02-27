/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  testMatch: [
    '**/__test__/**/*.+(ts|tsx|js)',
  ],
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.node.json',
    },
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
};