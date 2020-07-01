module.exports = {
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  collectCoverageFrom: ['**/src/**/*.js', '!**src/main/index.js'],
  preset: '@shelf/jest-mongodb'
}
