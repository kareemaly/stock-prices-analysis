// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // Stop running tests after the first failure
  bail: false,

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // An array of directory names to be searched recursively up from the requiring module's location
  moduleDirectories: [
    "node_modules"
  ],

  // A list of paths to directories that Jest should use to search for files in
  roots: [
    "src"
  ],

  // The test environment that will be used for testing
  testEnvironment: "node",

  // Whether to use watchman for file crawling
  watchman: true,
};
