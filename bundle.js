'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var ONE = 1;
var THREE = 3;
var FIVE = 5;
var TEN = 10;
var TWENTY = 20;
var BILL_KEYS = {
  FIVES: 'fives',
  TENS: 'tens',
  TWENTIES: 'twenties'
};
var INVALID_DENOMINATION_ERROR = "Invalid denomination included in queue! Only 5's, 10's, and 20's allowed!";

var validateBillDenominations = function validateBillDenominations(queue) {
  if (!queue.every(function (bill) {
    return [FIVE, TEN, TWENTY].includes(bill);
  })) {
    throw new Error(INVALID_DENOMINATION_ERROR);
  }

  return true;
}; // Handle change logic based on bill amount and whether there are tens in the register

var calculateChange = function calculateChange(amount, hasTens) {
  switch (amount) {
    // Give customer a five dollar bill if they pay with a ten
    case TEN:
      return _defineProperty({}, FIVE, ONE);
    // Attempt to give customer a ten and a five dollar bill if they pay with a 20
    // If larger bills are unavailable, give the customer three five dollar bills

    case TWENTY:
      if (hasTens) {
        var _ref2;

        return _ref2 = {}, _defineProperty(_ref2, TEN, ONE), _defineProperty(_ref2, FIVE, ONE), _ref2;
      } else {
        return _defineProperty({}, FIVE, THREE);
      }

    // No change if the customer uses a five dollar bill

    default:
      return {};
  }
}; // Get the register's instance variable name for a bill type by supplying the amount

var getBillKeyByAmount = function getBillKeyByAmount(amount) {
  var _FIVE$TEN$TWENTY$amou;

  return (_FIVE$TEN$TWENTY$amou = {}, _defineProperty(_FIVE$TEN$TWENTY$amou, FIVE, BILL_KEYS.FIVES), _defineProperty(_FIVE$TEN$TWENTY$amou, TEN, BILL_KEYS.TENS), _defineProperty(_FIVE$TEN$TWENTY$amou, TWENTY, BILL_KEYS.TWENTIES), _FIVE$TEN$TWENTY$amou)[amount];
};

var LemonadeStandQueue = /*#__PURE__*/function () {
  function LemonadeStandQueue() {
    var queue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, LemonadeStandQueue);

    _defineProperty(this, "register", new Register());

    // Validate args and assign queue instance variable from constructor argument
    this.queue = validateBillDenominations(queue) && queue;
    this.serveQueue = this.serveQueue.bind(this);
  } // Serve each customer in the queue until the register state becomes invalid or all customers have been served


  _createClass(LemonadeStandQueue, [{
    key: "serveQueue",
    value: function serveQueue() {
      return this.queue.every(this.register.sellItemToCustomer);
    }
  }]);

  return LemonadeStandQueue;
}();

var Register = /*#__PURE__*/function () {
  function Register() {
    _classCallCheck(this, Register);

    this.fives = this.tens = this.twenties = ZERO;
    this.sellItemToCustomer = this.sellItemToCustomer.bind(this);
    this.updateRegister = this.updateRegister.bind(this);
    this.makeChangeForCustomer = this.makeChangeForCustomer.bind(this);
  } // Add customer's bill to the register, Make change for the customer,
  // and check if the cash register has a valid state. (N.B. This short circuits the serveQueue method)


  _createClass(Register, [{
    key: "sellItemToCustomer",
    value: function sellItemToCustomer(amount) {
      this.updateRegister(amount);
      this.makeChangeForCustomer(amount);
      return this.isValid;
    } // Update the amount of any denomination of bill in the register

  }, {
    key: "updateRegister",
    value: function updateRegister(amount) {
      var numberOfBills = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      this[getBillKeyByAmount(amount)] += numberOfBills;
    } // Calculate the change needed, give customer change, and update the register’s state

  }, {
    key: "makeChangeForCustomer",
    value: function makeChangeForCustomer(amount) {
      var _this = this;

      var changeEntries = Object.entries(calculateChange(amount, !!this.tens));
      changeEntries.forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            amount = _ref2[0],
            numberOfBills = _ref2[1];

        return _this.updateRegister(Number(amount), -numberOfBills);
      });
    } // Check that no denomination has a negative cash register balance

  }, {
    key: "isValid",
    get: function get() {
      return [this.fives, this.tens, this.twenties].every(function (billCount) {
        return billCount >= ZERO;
      });
    }
  }]);

  return Register;
}();

function index () {
  var queue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var instance = new LemonadeStandQueue(queue);
  console.log(instance);
}

module.exports = index;
