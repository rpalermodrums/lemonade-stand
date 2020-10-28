import { calculateChange, getBillKeyByAmount, validateBillDenominations } from './utils';

export default class LemonadeStandQueue {
  constructor (queue = []) {
    // Set instance properties
    this.register = new CashRegister();
    this.queue = validateBillDenominations(queue) && queue;
    
    // Bind methods to instance
    this.serveQueue = this.serveQueue.bind(this);
  }

  // Serve each customer in the queue until the register state becomes invalid or all customers have been served
  serveQueue () {
    return this.queue.every(this.register.sellItemToCustomer);
  }
}

class CashRegister {
  constructor () {
    // Set instance properties
    this.fives = this.tens = this.twenties = ZERO;
    
    // Bind methods to instance
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
