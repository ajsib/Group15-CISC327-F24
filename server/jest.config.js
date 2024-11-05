// jest.config.js
export default {
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'mjs'],
    testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)', '**/?(*.)+(spec|test).mjs'],
    transform: {
      '^.+\\.m?js$': 'babel-jest',  // Use babel-jest to transform JavaScript files
    },
  };
  