import LemonadeStandQueue from './models';

// Add parameterized tests
const testLemonadeStand = (parameters) => {
  parameters.forEach(([testCase, expectedValue]) => {
    try {
      const instance = new LemonadeStandQueue(testCase);
      // Assert expected value matches test output
      if (instance.serveQueue() === expectedValue) {
        console.info(`PASSED: serveQueue([${testCase}]) => ${expectedValue}.`);
      }
      // Throw error on first failing test case
      else {
        console.error(`FAILED: serveQueue([${testCase}]) => ${expectedValue}`);
      }
    }
    // Handle expected validation error test case
    catch (e) {
      // Assert expected validation error is thrown
      if (expectedValue === 'error') {
        console.info(`PASSED: caught exception!`, testCase);
      }
       // Throw error on first unhandled exception
      else {
        console.error(`FAILED: An Error was thrown! ${e}`);
      }
    }
  });
};

// Run tests
testLemonadeStand([
  // passing test cases
  [[5,5,5,10,20], true],
  [[5,5,10], true],
  [[5,5,5,10,10,20], true],
  [[5,5,5,10,10,5,5,5,10,10,20,20], true],
  [[], true],
  [undefined, true],
  // failing test cases
  [[5,5,20,10,20,20,20], false],
  [[10,10], false],
  [[5,5,10,10,20], false],
  // validation error thrown
  [[1, 2, 4], 'error'],
  [[undefined], 'error'],
  [[null], 'error'],
  [null, 'error'],
]);
