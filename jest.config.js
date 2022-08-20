module.exports = {
  verbose: true,
  rootDir: "src",
  collectCoverage: true,
  coverageDirectory: "../coverage/",
  testPathIgnorePatterns: ["/node_modules/", ".*fixture.js"],
  coveragePathIgnorePatterns: ["/node_modules/", ".*fixture.js"],
};
