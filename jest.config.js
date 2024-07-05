// module.exports = {
//     testEnvironment: 'node',
//     setupFilesAfterEnv: ['./jest.setup.js'],
//   };
module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.js'],
  testMatch: ['**/tests/**/*.test.js?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
};
