/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  packageManager: "npm",
  reporters: ["html", "clear-text", "progress"],
  testRunner: "jest",
  coverageAnalysis: 'perTest', // Coverage analysis is supported
  tsconfigFile: 'tsconfig.json', // Location of your tsconfig.json file
  // This makes mutation testing significantly slower 
  // but without this we run into port conflict issues
  // because of Talkback...
  concurrency: 1,
  timeoutMS: 10000
};
