import { BILL_KEYS, FIVE, INVALID_DENOMINATION_ERROR, ONE, TEN, THREE, TWENTY } from './constants';

// Ensure only fives, tens, and twenties are included in the queue
export const validateBillDenominations = (queue) => {
  if (!queue.every(bill => [FIVE, TEN, TWENTY].includes(bill))) {
    throw new Error(INVALID_DENOMINATION_ERROR);
  }
  return true;
};

// Handle change logic based on bill amount and whether there are tens in the register
export const calculateChange = (amount, hasTens) => {
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
export const getBillKeyByAmount = (amount) => {
  return { [FIVE]: BILL_KEYS.FIVES, [TEN]: BILL_KEYS.TENS, [TWENTY]: BILL_KEYS.TWENTIES }[amount];
};
