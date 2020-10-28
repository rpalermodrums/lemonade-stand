'use strict';

const ZERO = 0;
const ONE = 1;
const THREE = 3;
const FIVE = 5;
const TEN = 10 ;
const TWENTY = 20;
const BILL_KEYS = { FIVES: 'fives', TENS: 'tens', TWENTIES: 'twenties' };
const INVALID_DENOMINATION_ERROR = "Invalid denomination included in queue! Only 5's, 10's, and 20's allowed!";

// Ensure only fives, tens, and twenties are included in the queue
const validateBillDenominations = (queue) => {
  if (!queue.every(bill => [FIVE, TEN, TWENTY].includes(bill))) {
    throw new Error(INVALID_DENOMINATION_ERROR);
  }
  return true;
};

// Handle change logic based on bill amount and whether there are tens in the register
const calculateChange = (amount, hasTens) => {
  switch (amount) {
    // Give customer a five dollar bill if they pay with a ten
    case TEN:
      return { [FIVE]: ONE };
    // Attempt to give customer a ten and a five dollar bill if they pay with a 20
    // If larger bills are unavailable, give the customer three five dollar bills
    case TWENTY:
      if (hasTens) { return { [TEN]: ONE, [FIVE]: ONE }; }
      else { return { [FIVE]: THREE }; }
    // No change if the customer uses a five dollar bill
    default:
      return {};
  }
};

// Get the register's instance variable name for a bill type by supplying the amount
const getBillKeyByAmount = (amount) => {
  return { [FIVE]: BILL_KEYS.FIVES, [TEN]: BILL_KEYS.TENS, [TWENTY]: BILL_KEYS.TWENTIES }[amount];
};

class LemonadeStandQueue {
  constructor (queue = []) {
    this.register = new Register();
    // Validate args and assign queue instance variable from constructor argument
    this.queue = validateBillDenominations(queue) && queue;
    this.serveQueue = this.serveQueue.bind(this);
  }

  // Serve each customer in the queue until the register state becomes invalid or all customers have been served
  serveQueue () {
    return this.queue.every(this.register.sellItemToCustomer);
  }
}

class Register {
  constructor () {
    this.fives = this.tens = this.twenties = ZERO;
    this.sellItemToCustomer = this.sellItemToCustomer.bind(this);
    this.updateRegister = this.updateRegister.bind(this);
    this.makeChangeForCustomer = this.makeChangeForCustomer.bind(this);
  }

  // Add customer's bill to the register, Make change for the customer,
  // and check if the cash register has a valid state. (N.B. This short circuits the serveQueue method)
  sellItemToCustomer (amount) {
    this.updateRegister(amount);
    this.makeChangeForCustomer(amount);
    return this.isValid;
  }

  // Update the amount of any denomination of bill in the register
  updateRegister (amount, numberOfBills = 1) {
    this[getBillKeyByAmount(amount)] += numberOfBills;
  }

  // Calculate the change needed, give customer change, and update the register’s state
  makeChangeForCustomer (amount) {
    const changeEntries = Object.entries(calculateChange(amount, !!this.tens));
    changeEntries.forEach(([amount, numberOfBills]) => this.updateRegister(Number(amount), -numberOfBills));
  }

  // Check that no denomination has a negative cash register balance
  get isValid () {
    return [this.fives, this.tens, this.twenties].every(billCount => billCount >= ZERO);
  }
}

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
