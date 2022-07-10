webpackJsonpYMK([45],{

/***/ 1000:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var __DEV__ = "production" !== 'production';

var warning = function() {};

if (__DEV__) {
  var printWarning = function printWarning(format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    var argIndex = 0;
    var message = 'Warning: ' +
      format.replace(/%s/g, function() {
        return args[argIndex++];
      });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  }

  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
          '`warning(condition, format, ...args)` requires a warning ' +
          'message argument'
      );
    }
    if (!condition) {
      printWarning.apply(null, [format].concat(args));
    }
  };
}

module.exports = warning;


/***/ }),

/***/ 1001:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = __webpack_require__(172);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = __webpack_require__(170);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = __webpack_require__(40);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(466);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(38);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(39);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(622);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(627);

var _classnames2 = _interopRequireDefault(_classnames);

var _addEventListener = __webpack_require__(1995);

var _addEventListener2 = _interopRequireDefault(_addEventListener);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Handle = function (_React$Component) {
  (0, _inherits3.default)(Handle, _React$Component);

  function Handle() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Handle);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Handle.__proto__ || (0, _getPrototypeOf2.default)(Handle)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      clickFocused: false
    }, _this.setHandleRef = function (node) {
      _this.handle = node;
    }, _this.handleMouseUp = function () {
      if (document.activeElement === _this.handle) {
        _this.setClickFocus(true);
      }
    }, _this.handleBlur = function () {
      _this.setClickFocus(false);
    }, _this.handleKeyDown = function () {
      _this.setClickFocus(false);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Handle, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // mouseup won't trigger if mouse moved out of handle,
      // so we listen on document here.
      this.onMouseUpListener = (0, _addEventListener2.default)(document, 'mouseup', this.handleMouseUp);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.onMouseUpListener) {
        this.onMouseUpListener.remove();
      }
    }
  }, {
    key: 'setClickFocus',
    value: function setClickFocus(focused) {
      this.setState({ clickFocused: focused });
    }
  }, {
    key: 'clickFocus',
    value: function clickFocus() {
      this.setClickFocus(true);
      this.focus();
    }
  }, {
    key: 'focus',
    value: function focus() {
      this.handle.focus();
    }
  }, {
    key: 'blur',
    value: function blur() {
      this.handle.blur();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          prefixCls = _props.prefixCls,
          vertical = _props.vertical,
          offset = _props.offset,
          style = _props.style,
          disabled = _props.disabled,
          min = _props.min,
          max = _props.max,
          value = _props.value,
          tabIndex = _props.tabIndex,
          ariaLabelForHandle = _props.ariaLabelForHandle,
          ariaValueTextForHandle = _props.ariaValueTextForHandle,
          _props$needA11ySlider = _props.needA11ySliderRole,
          needA11ySliderRole = _props$needA11ySlider === undefined ? true : _props$needA11ySlider,
          restProps = (0, _objectWithoutProperties3.default)(_props, ['prefixCls', 'vertical', 'offset', 'style', 'disabled', 'min', 'max', 'value', 'tabIndex', 'ariaLabelForHandle', 'ariaValueTextForHandle', 'needA11ySliderRole']);


      var className = (0, _classnames2.default)(this.props.className, (0, _defineProperty3.default)({}, prefixCls + '-handle-click-focused', this.state.clickFocused));

      var postionStyle = vertical ? { bottom: offset + '%' } : { left: offset + '%' };
      var elStyle = (0, _extends3.default)({}, style, postionStyle);

      return _react2.default.createElement('div', (0, _extends3.default)({
        ref: this.setHandleRef,
        tabIndex: disabled ? null : tabIndex || 0
      }, restProps, {
        className: className,
        style: elStyle,
        onBlur: this.handleBlur,
        onKeyDown: this.handleKeyDown
        // aria attribute
        , role: needA11ySliderRole ? 'slider' : '',
        'aria-valuemin': min,
        'aria-valuemax': max,
        'aria-valuenow': value,
        'aria-disabled': !!disabled,
        'aria-label': ariaLabelForHandle,
        'aria-valuetext': ariaValueTextForHandle + ': ' + value
      }));
    }
  }]);
  return Handle;
}(_react2.default.Component);

exports.default = Handle;


Handle.propTypes = {
  prefixCls: _propTypes2.default.string,
  className: _propTypes2.default.string,
  vertical: _propTypes2.default.bool,
  offset: _propTypes2.default.number,
  style: _propTypes2.default.object,
  disabled: _propTypes2.default.bool,
  min: _propTypes2.default.number,
  max: _propTypes2.default.number,
  value: _propTypes2.default.number,
  tabIndex: _propTypes2.default.number
};
module.exports = exports['default'];

/***/ }),

/***/ 1002:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = __webpack_require__(115);

var _stringify2 = _interopRequireDefault(_stringify);

var _toConsumableArray2 = __webpack_require__(171);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = __webpack_require__(49);

var _keys2 = _interopRequireDefault(_keys);

exports.isDev = isDev;
exports.isEventFromHandle = isEventFromHandle;
exports.isValueOutOfRange = isValueOutOfRange;
exports.isNotTouchEvent = isNotTouchEvent;
exports.getClosestPoint = getClosestPoint;
exports.getPrecision = getPrecision;
exports.getMousePosition = getMousePosition;
exports.getTouchPosition = getTouchPosition;
exports.getHandleCenterPosition = getHandleCenterPosition;
exports.ensureValueInRange = ensureValueInRange;
exports.ensureValuePrecision = ensureValuePrecision;
exports.pauseEvent = pauseEvent;
exports.calculateNextValue = calculateNextValue;
exports.getKeyboardValueMutator = getKeyboardValueMutator;

var _reactDom = __webpack_require__(551);

var _KeyCode = __webpack_require__(2225);

var _KeyCode2 = _interopRequireDefault(_KeyCode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isDev() {
  return "production" !== 'production';
}

function isEventFromHandle(e, handles) {
  try {
    return (0, _keys2.default)(handles).some(function (key) {
      return e.target === (0, _reactDom.findDOMNode)(handles[key]);
    });
  } catch (error) {
    return false;
  }
}

function isValueOutOfRange(value, _ref) {
  var min = _ref.min,
      max = _ref.max;

  return value < min || value > max;
}

function isNotTouchEvent(e) {
  return e.touches.length > 1 || e.type.toLowerCase() === 'touchend' && e.touches.length > 0;
}

function getClosestPoint(val, _ref2) {
  var marks = _ref2.marks,
      step = _ref2.step,
      min = _ref2.min;

  var points = (0, _keys2.default)(marks).map(parseFloat);
  if (step !== null) {
    var closestStep = Math.round((val - min) / step) * step + min;
    points.push(closestStep);
  }
  var diffs = points.map(function (point) {
    return Math.abs(val - point);
  });
  return points[diffs.indexOf(Math.min.apply(Math, (0, _toConsumableArray3.default)(diffs)))];
}

function getPrecision(step) {
  var stepString = step.toString();
  var precision = 0;
  if (stepString.indexOf('.') >= 0) {
    precision = stepString.length - stepString.indexOf('.') - 1;
  }
  return precision;
}

function getMousePosition(vertical, e) {
  return vertical ? e.clientY : e.pageX;
}

function getTouchPosition(vertical, e) {
  return vertical ? e.touches[0].clientY : e.touches[0].pageX;
}

function getHandleCenterPosition(vertical, handle) {
  var coords = handle.getBoundingClientRect();
  return vertical ? coords.top + coords.height * 0.5 : window.pageXOffset + coords.left + coords.width * 0.5;
}

function ensureValueInRange(val, _ref3) {
  var max = _ref3.max,
      min = _ref3.min;

  if (val <= min) {
    return min;
  }
  if (val >= max) {
    return max;
  }
  return val;
}

function ensureValuePrecision(val, props) {
  var step = props.step;

  var closestPoint = isFinite(getClosestPoint(val, props)) ? getClosestPoint(val, props) : 0; // eslint-disable-line
  return step === null ? closestPoint : parseFloat(closestPoint.toFixed(getPrecision(step)));
}

function pauseEvent(e) {
  e.stopPropagation();
  e.preventDefault();
}

function calculateNextValue(func, value, props) {
  var operations = {
    increase: function increase(a, b) {
      return a + b;
    },
    decrease: function decrease(a, b) {
      return a - b;
    }
  };

  var indexToGet = operations[func]((0, _keys2.default)(props.marks).indexOf((0, _stringify2.default)(value)), 1);
  var keyToGet = (0, _keys2.default)(props.marks)[indexToGet];

  if (props.step) {
    return operations[func](value, props.step);
  } else if (!!(0, _keys2.default)(props.marks).length && !!props.marks[keyToGet]) {
    return props.marks[keyToGet];
  }
  return value;
}

function getKeyboardValueMutator(e) {
  switch (e.keyCode) {
    case _KeyCode2.default.UP:
    case _KeyCode2.default.RIGHT:
    case _KeyCode2.default.NUM_PLUS:
      return function (value, props) {
        return calculateNextValue('increase', value, props);
      };

    case _KeyCode2.default.DOWN:
    case _KeyCode2.default.LEFT:
    case _KeyCode2.default.NUM_MINUS:
      return function (value, props) {
        return calculateNextValue('decrease', value, props);
      };

    case _KeyCode2.default.END:
      return function (value, props) {
        return props.max;
      };
    case _KeyCode2.default.HOME:
      return function (value, props) {
        return props.min;
      };
    case _KeyCode2.default.PAGE_UP:
      return function (value, props) {
        return value + props.step * 2;
      };
    case _KeyCode2.default.PAGE_DOWN:
      return function (value, props) {
        return value - props.step * 2;
      };

    default:
      return undefined;
  }
}

/***/ }),

/***/ 1003:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {var require;/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   4.1.1
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}

var _isArray = undefined;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = undefined;
var customSchedulerFn = undefined;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var r = require;
    var vertx = __webpack_require__(2293);
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = undefined;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var _arguments = arguments;

  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;

  if (_state) {
    (function () {
      var callback = _arguments[_state - 1];
      asap(function () {
        return invokeCallback(_state, child, callback, parent._result);
      });
    })();
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(16);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var GET_THEN_ERROR = new ErrorObject();

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    GET_THEN_ERROR.error = error;
    return GET_THEN_ERROR;
  }
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === GET_THEN_ERROR) {
      reject(promise, GET_THEN_ERROR.error);
      GET_THEN_ERROR.error = null;
    } else if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;

  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = undefined,
      callback = undefined,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function ErrorObject() {
  this.error = null;
}

var TRY_CATCH_ERROR = new ErrorObject();

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = undefined,
      error = undefined,
      succeeded = undefined,
      failed = undefined;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value.error = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
      resolve(promise, value);
    } else if (failed) {
      reject(promise, error);
    } else if (settled === FULFILLED) {
      fulfill(promise, value);
    } else if (settled === REJECTED) {
      reject(promise, value);
    }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function Enumerator$1(Constructor, input) {
  this._instanceConstructor = Constructor;
  this.promise = new Constructor(noop);

  if (!this.promise[PROMISE_ID]) {
    makePromise(this.promise);
  }

  if (isArray(input)) {
    this.length = input.length;
    this._remaining = input.length;

    this._result = new Array(this.length);

    if (this.length === 0) {
      fulfill(this.promise, this._result);
    } else {
      this.length = this.length || 0;
      this._enumerate(input);
      if (this._remaining === 0) {
        fulfill(this.promise, this._result);
      }
    }
  } else {
    reject(this.promise, validationError());
  }
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

Enumerator$1.prototype._enumerate = function (input) {
  for (var i = 0; this._state === PENDING && i < input.length; i++) {
    this._eachEntry(input[i], i);
  }
};

Enumerator$1.prototype._eachEntry = function (entry, i) {
  var c = this._instanceConstructor;
  var resolve$$1 = c.resolve;

  if (resolve$$1 === resolve$1) {
    var _then = getThen(entry);

    if (_then === then && entry._state !== PENDING) {
      this._settledAt(entry._state, i, entry._result);
    } else if (typeof _then !== 'function') {
      this._remaining--;
      this._result[i] = entry;
    } else if (c === Promise$2) {
      var promise = new c(noop);
      handleMaybeThenable(promise, entry, _then);
      this._willSettleAt(promise, i);
    } else {
      this._willSettleAt(new c(function (resolve$$1) {
        return resolve$$1(entry);
      }), i);
    }
  } else {
    this._willSettleAt(resolve$$1(entry), i);
  }
};

Enumerator$1.prototype._settledAt = function (state, i, value) {
  var promise = this.promise;

  if (promise._state === PENDING) {
    this._remaining--;

    if (state === REJECTED) {
      reject(promise, value);
    } else {
      this._result[i] = value;
    }
  }

  if (this._remaining === 0) {
    fulfill(promise, this._result);
  }
};

Enumerator$1.prototype._willSettleAt = function (promise, i) {
  var enumerator = this;

  subscribe(promise, undefined, function (value) {
    return enumerator._settledAt(FULFILLED, i, value);
  }, function (reason) {
    return enumerator._settledAt(REJECTED, i, reason);
  });
};

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all$1(entries) {
  return new Enumerator$1(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race$1(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {function} resolver
  Useful for tooling.
  @constructor
*/
function Promise$2(resolver) {
  this[PROMISE_ID] = nextId();
  this._result = this._state = undefined;
  this._subscribers = [];

  if (noop !== resolver) {
    typeof resolver !== 'function' && needsResolver();
    this instanceof Promise$2 ? initializePromise(this, resolver) : needsNew();
  }
}

Promise$2.all = all$1;
Promise$2.race = race$1;
Promise$2.resolve = resolve$1;
Promise$2.reject = reject$1;
Promise$2._setScheduler = setScheduler;
Promise$2._setAsap = setAsap;
Promise$2._asap = asap;

Promise$2.prototype = {
  constructor: Promise$2,

  /**
    The primary way of interacting with a promise is through its `then` method,
    which registers callbacks to receive either a promise's eventual value or the
    reason why the promise cannot be fulfilled.
  
    ```js
    findUser().then(function(user){
      // user is available
    }, function(reason){
      // user is unavailable, and you are given the reason why
    });
    ```
  
    Chaining
    --------
  
    The return value of `then` is itself a promise.  This second, 'downstream'
    promise is resolved with the return value of the first promise's fulfillment
    or rejection handler, or rejected if the handler throws an exception.
  
    ```js
    findUser().then(function (user) {
      return user.name;
    }, function (reason) {
      return 'default name';
    }).then(function (userName) {
      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
      // will be `'default name'`
    });
  
    findUser().then(function (user) {
      throw new Error('Found user, but still unhappy');
    }, function (reason) {
      throw new Error('`findUser` rejected and we're unhappy');
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
    });
    ```
    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
  
    ```js
    findUser().then(function (user) {
      throw new PedagogicalException('Upstream error');
    }).then(function (value) {
      // never reached
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // The `PedgagocialException` is propagated all the way down to here
    });
    ```
  
    Assimilation
    ------------
  
    Sometimes the value you want to propagate to a downstream promise can only be
    retrieved asynchronously. This can be achieved by returning a promise in the
    fulfillment or rejection handler. The downstream promise will then be pending
    until the returned promise is settled. This is called *assimilation*.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // The user's comments are now available
    });
    ```
  
    If the assimliated promise rejects, then the downstream promise will also reject.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // If `findCommentsByAuthor` fulfills, we'll have the value here
    }, function (reason) {
      // If `findCommentsByAuthor` rejects, we'll have the reason here
    });
    ```
  
    Simple Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let result;
  
    try {
      result = findResult();
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
    findResult(function(result, err){
      if (err) {
        // failure
      } else {
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findResult().then(function(result){
      // success
    }, function(reason){
      // failure
    });
    ```
  
    Advanced Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let author, books;
  
    try {
      author = findAuthor();
      books  = findBooksByAuthor(author);
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
  
    function foundBooks(books) {
  
    }
  
    function failure(reason) {
  
    }
  
    findAuthor(function(author, err){
      if (err) {
        failure(err);
        // failure
      } else {
        try {
          findBoooksByAuthor(author, function(books, err) {
            if (err) {
              failure(err);
            } else {
              try {
                foundBooks(books);
              } catch(reason) {
                failure(reason);
              }
            }
          });
        } catch(error) {
          failure(err);
        }
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findAuthor().
      then(findBooksByAuthor).
      then(function(books){
        // found books
    }).catch(function(reason){
      // something went wrong
    });
    ```
  
    @method then
    @param {Function} onFulfilled
    @param {Function} onRejected
    Useful for tooling.
    @return {Promise}
  */
  then: then,

  /**
    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
    as the catch block of a try/catch statement.
  
    ```js
    function findAuthor(){
      throw new Error('couldn't find that author');
    }
  
    // synchronous
    try {
      findAuthor();
    } catch(reason) {
      // something went wrong
    }
  
    // async with promises
    findAuthor().catch(function(reason){
      // something went wrong
    });
    ```
  
    @method catch
    @param {Function} onRejection
    Useful for tooling.
    @return {Promise}
  */
  'catch': function _catch(onRejection) {
    return this.then(null, onRejection);
  }
};

/*global self*/
function polyfill$1() {
    var local = undefined;

    if (typeof global !== 'undefined') {
        local = global;
    } else if (typeof self !== 'undefined') {
        local = self;
    } else {
        try {
            local = Function('return this')();
        } catch (e) {
            throw new Error('polyfill failed because global object is unavailable in this environment');
        }
    }

    var P = local.Promise;

    if (P) {
        var promiseToString = null;
        try {
            promiseToString = Object.prototype.toString.call(P.resolve());
        } catch (e) {
            // silently ignored
        }

        if (promiseToString === '[object Promise]' && !P.cast) {
            return;
        }
    }

    local.Promise = Promise$2;
}

// Strange compat..
Promise$2.polyfill = polyfill$1;
Promise$2.Promise = Promise$2;

return Promise$2;

})));

//# sourceMappingURL=es6-promise.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(169), __webpack_require__(74)))

/***/ }),

/***/ 1017:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbD0iI2VmM2Y3OCIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00LjI3NjYgNC41NzQ1NEg2LjUzMDM1TDguNTUyMjQgMi41NzExM0M4Ljg3NzggMi4yMjE2NyA5LjMzODk5IDIgOS44NTYyOSAySDE0LjMwNzZDMTQuNzk1NCAyIDE1LjIzNyAyLjE5NTE5IDE1LjU1ODcgMi41MTA3NUwxNS41NjI2IDIuNTEzOTZDMTUuNTY0MSAyLjUxNTk1IDE1LjU2NTcgMi41MTc0NCAxNS41Njc0IDIuNTE4OTlMMTUuNTY5NCAyLjUyMDk4TDE3LjYzNDQgNC41NzQ1NEgxOS43MjM0QzIxLjUzMyA0LjU3NDU0IDIzIDYuMDQxNTIgMjMgNy44NTExM1YxNy45MTVDMjMgMTkuNzI0NiAyMS41MzMgMjEuMTkxNiAxOS43MjM0IDIxLjE5MTZINC4yNzY2QzIuNDY2OTggMjEuMTkxNiAxIDE5LjcyNDYgMSAxNy45MTVWNy44NTExM0MxIDYuMDQxNTIgMi40NjY5OCA0LjU3NDU0IDQuMjc2NiA0LjU3NDU0Wk0xOC41OTc2IDguNDM2MjNDMTguNTk3NiA5LjAxNzk3IDE5LjA2OSA5LjQ4OTMyIDE5LjY1MSA5LjQ4OTMyQzIwLjIzMjggOS40ODkzMiAyMC43MDQgOS4wMTc5NyAyMC43MDQgOC40MzYyM0MyMC43MDQgNy44NTQ0OSAyMC4yMzI4IDcuMzgyOTQgMTkuNjUxIDcuMzgyOTRDMTkuMDY5IDcuMzgyOTQgMTguNTk3NiA3Ljg1NDQ5IDE4LjU5NzYgOC40MzYyM1pNNi40Mjc1NSAxMi43NjU5QzYuNDI3NTUgOS42Njg3MSA4Ljk0NzU1IDcuMTQ4ODcgMTIuMDQ0NyA3LjE0ODg3QzE1LjE0MTYgNy4xNDg4NyAxNy42NjE2IDkuNjY4NzEgMTcuNjYxNiAxMi43NjU5QzE3LjY2MTYgMTUuODYzMSAxNS4xNDE2IDE4LjM4MjkgMTIuMDQ0NyAxOC4zODI5QzguOTQ3NTUgMTguMzgyOSA2LjQyNzU1IDE1Ljg2MzEgNi40Mjc1NSAxMi43NjU5Wk0xMi4wNDQ1IDE3LjIxMjZDOS41OTI1MSAxNy4yMTI2IDcuNTk3NjQgMTUuMjE4IDcuNTk3NjQgMTIuNzY1OUM3LjU5NzY0IDEwLjMxMzkgOS41OTI1MSA4LjMxOTAxIDEyLjA0NDUgOC4zMTkwMUMxNC40OTY2IDguMzE5MDEgMTYuNDkxMyAxMC4zMTM5IDE2LjQ5MTMgMTIuNzY1OUMxNi40OTEzIDE1LjIxOCAxNC40OTY2IDE3LjIxMjYgMTIuMDQ0NSAxNy4yMTI2WiIgLz4KPC9zdmc+Cg=="

/***/ }),

/***/ 1939:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ProgressCircle;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STROKE_WIDTH = 25;
var SQUARE_LENGTH = 350;
var SQUARE_PERIMETER = 4 * SQUARE_LENGTH;
function ProgressCircle(props) {
  var size = props.size,
      progress = props.progress,
      progressColor = props.progressColor,
      _props$defaultColor = props.defaultColor,
      defaultColor = _props$defaultColor === undefined ? '#909090' : _props$defaultColor,
      _props$defaultOpacity = props.defaultOpacity,
      defaultOpacity = _props$defaultOpacity === undefined ? 0.5 : _props$defaultOpacity,
      style = props.style,
      _props$transitionDura = props.transitionDuration,
      transitionDuration = _props$transitionDura === undefined ? '1s' : _props$transitionDura,
      _props$borderRadius = props.borderRadius,
      borderRadius = _props$borderRadius === undefined ? '50%' : _props$borderRadius;


  var convertBorderRadius = function convertBorderRadius(borderRadius) {
    if (borderRadius.endsWith('%')) {
      return borderRadius.slice(0, -1) / 100;
    }
    if (borderRadius.endsWith('px')) {
      return 0.5;
    }
    return borderRadius;
  };

  var convertedBorderRadius = convertBorderRadius(borderRadius);
  var progressBorderRadius = convertedBorderRadius <= 0.5 ? SQUARE_LENGTH * convertedBorderRadius : SQUARE_LENGTH * 0.5;

  var getPerimeterRatio = function getPerimeterRatio(borderRadius) {
    return Math.PI / 4 + (1 - Math.PI / 4) * (SQUARE_LENGTH - borderRadius) / SQUARE_LENGTH;
  };

  var getOffset = function getOffset(progress, borderRadius) {
    return (100 - progress) / 100 * SQUARE_PERIMETER * getPerimeterRatio(borderRadius);
  };

  var handleClick = function handleClick() {
    var onClick = props.onClick;

    if (!onClick) {
      return;
    }
    onClick();
  };

  return _react2.default.createElement(
    'svg',
    { width: size, height: size, viewBox: '-25 -25 400 400', style: style, onClick: handleClick },
    _react2.default.createElement('rect', {
      width: SQUARE_LENGTH,
      height: SQUARE_LENGTH,
      rx: progressBorderRadius,
      ry: progressBorderRadius,
      stroke: defaultColor,
      strokeOpacity: defaultOpacity,
      strokeWidth: STROKE_WIDTH,
      fill: 'none'
    }),
    _react2.default.createElement('rect', {
      stroke: progress > 0 ? progressColor : '',
      width: SQUARE_LENGTH,
      height: SQUARE_LENGTH,
      strokeDasharray: SQUARE_PERIMETER * getPerimeterRatio(progressBorderRadius),
      strokeWidth: STROKE_WIDTH,
      strokeDashoffset: getOffset(progress, progressBorderRadius),
      rx: progressBorderRadius,
      ry: progressBorderRadius,
      strokeLinecap: 'round',
      fill: 'none',
      style: { transition: 'stroke-dashoffset ' + transitionDuration + ' ease-out' }
    })
  );
}
module.exports = exports['default'];

/***/ }),

/***/ 1991:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

exports.default = ActionButton;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _styles = __webpack_require__(998);

var _styles2 = _interopRequireDefault(_styles);

var _image = __webpack_require__(624);

var _image2 = _interopRequireDefault(_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ActionButton(props) {
  var id = props.id,
      img = props.img,
      disabled = props.disabled,
      _props$onClick = props.onClick,
      _onClick = _props$onClick === undefined ? function () {} : _props$onClick,
      ariaLabel = props.ariaLabel,
      style = props.style;

  var getStyle = function getStyle() {
    return disabled ? (0, _extends3.default)({}, _styles2.default.iconButton, { opacity: 0.5, cursor: 'no-drop' }) : _styles2.default.iconButton;
  };

  return _react2.default.createElement(
    'button',
    { id: id, type: 'button', 'aria-label': ariaLabel, disabled: disabled, style: (0, _extends3.default)({}, getStyle(), style), onClick: function onClick() {
        return !disabled && _onClick();
      } },
    img && _react2.default.createElement(_image2.default, { alt: ariaLabel, src: img, style: _styles2.default.icon })
  );
}
module.exports = exports['default'];

/***/ }),

/***/ 1992:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDciIGhlaWdodD0iNDciIHZpZXdCb3g9IjAgMCA0NyA0NyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00LjUgNDAuOTk5OUM0LjUgNDAuMTcxNSA1LjE3MTU3IDM5LjQ5OTkgNiAzOS40OTk5SDQwQzQwLjgyODQgMzkuNDk5OSA0MS41IDQwLjE3MTUgNDEuNSA0MC45OTk5QzQxLjUgNDEuODI4NCA0MC44Mjg0IDQyLjQ5OTkgNDAgNDIuNDk5OUg2QzUuMTcxNTcgNDIuNDk5OSA0LjUgNDEuODI4NCA0LjUgNDAuOTk5OVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMzMuNjA2NiAyNC41MTQ3TDI0LjA2MDcgMzQuMDYwN0MyMy40NzQ5IDM0LjY0NjQgMjIuNTI1MSAzNC42NDY0IDIxLjkzOTMgMzQuMDYwN0wxMi4zOTM0IDI0LjUxNDdDMTEuODA3NiAyMy45Mjg5IDExLjgwNzYgMjIuOTc5MiAxMi4zOTM0IDIyLjM5MzRDMTIuOTc5MiAyMS44MDc2IDEzLjkyODkgMjEuODA3NiAxNC41MTQ3IDIyLjM5MzRMMjEuNSAyOS4zNzg3TDIxLjUgNUwyNC41IDVMMjQuNSAyOS4zNzg3TDMxLjQ4NTMgMjIuMzkzNEMzMi4wNzExIDIxLjgwNzYgMzMuMDIwOCAyMS44MDc2IDMzLjYwNjYgMjIuMzkzNEMzNC4xOTI0IDIyLjk3OTIgMzQuMTkyNCAyMy45Mjg5IDMzLjYwNjYgMjQuNTE0N1oiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo="

/***/ }),

/***/ 1993:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Track = function Track(props) {
  var className = props.className,
      included = props.included,
      vertical = props.vertical,
      offset = props.offset,
      length = props.length,
      style = props.style;


  var positonStyle = vertical ? {
    bottom: offset + '%',
    height: length + '%'
  } : {
    left: offset + '%',
    width: length + '%'
  };

  var elStyle = (0, _extends3.default)({}, style, positonStyle);
  return included ? _react2.default.createElement('div', { className: className, style: elStyle }) : null;
}; /* eslint-disable react/prop-types */
exports.default = Track;
module.exports = exports['default'];

/***/ }),

/***/ 1994:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = __webpack_require__(170);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = __webpack_require__(172);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _keys = __webpack_require__(49);

var _keys2 = _interopRequireDefault(_keys);

var _getPrototypeOf = __webpack_require__(40);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(466);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(38);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(2216);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(39);

var _inherits3 = _interopRequireDefault(_inherits2);

exports.default = createSlider;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(622);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _addEventListener = __webpack_require__(1995);

var _addEventListener2 = _interopRequireDefault(_addEventListener);

var _classnames = __webpack_require__(627);

var _classnames2 = _interopRequireDefault(_classnames);

var _warning = __webpack_require__(1000);

var _warning2 = _interopRequireDefault(_warning);

var _Steps = __webpack_require__(2223);

var _Steps2 = _interopRequireDefault(_Steps);

var _Marks = __webpack_require__(2224);

var _Marks2 = _interopRequireDefault(_Marks);

var _Handle = __webpack_require__(1001);

var _Handle2 = _interopRequireDefault(_Handle);

var _utils = __webpack_require__(1002);

var utils = _interopRequireWildcard(_utils);

var _ymkWebSdkCore = __webpack_require__(112);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function noop() {}

function createSlider(Component) {
  var _class, _temp;

  return _temp = _class = function (_Component) {
    (0, _inherits3.default)(ComponentEnhancer, _Component);

    function ComponentEnhancer(props) {
      (0, _classCallCheck3.default)(this, ComponentEnhancer);

      var _this = (0, _possibleConstructorReturn3.default)(this, (ComponentEnhancer.__proto__ || (0, _getPrototypeOf2.default)(ComponentEnhancer)).call(this, props));

      _this.onMouseDown = function (e) {
        if (e.button !== 0) {
          return;
        }

        var isVertical = _this.props.vertical;
        var position = utils.getMousePosition(isVertical, e);
        if (!utils.isEventFromHandle(e, _this.handlesRefs)) {
          _this.dragOffset = 0;
        } else {
          var handlePosition = utils.getHandleCenterPosition(isVertical, e.target);
          _this.dragOffset = position - handlePosition;
          position = handlePosition;
        }
        _this.removeDocumentEvents();
        _this.onStart(position);
        _this.addDocumentMouseEvents();
      };

      _this.onTouchStart = function (e) {
        if (utils.isNotTouchEvent(e)) return;

        var isVertical = _this.props.vertical;
        var position = utils.getTouchPosition(isVertical, e);
        if (!utils.isEventFromHandle(e, _this.handlesRefs)) {
          _this.dragOffset = 0;
        } else {
          var handlePosition = utils.getHandleCenterPosition(isVertical, e.target);
          _this.dragOffset = position - handlePosition;
          position = handlePosition;
        }
        _this.onStart(position);
        _this.addDocumentTouchEvents();
        utils.pauseEvent(e);
      };

      _this.onFocus = function (e) {
        var _this$props = _this.props,
            onFocus = _this$props.onFocus,
            vertical = _this$props.vertical;

        if (utils.isEventFromHandle(e, _this.handlesRefs)) {
          var handlePosition = utils.getHandleCenterPosition(vertical, e.target);
          _this.dragOffset = 0;
          _this.onStart(handlePosition);
          utils.pauseEvent(e);
          if (onFocus) {
            onFocus(e);
          }
        }
      };

      _this.onBlur = function (e) {
        var onBlur = _this.props.onBlur;

        _this.onEnd(e);
        if (onBlur) {
          onBlur(e);
        }
      };

      _this.onMouseUp = function () {
        if (_this.handlesRefs[_this.prevMovedHandleIndex]) {
          _this.handlesRefs[_this.prevMovedHandleIndex].clickFocus();
        }
      };

      _this.onMouseMove = function (e) {
        if (!_this.sliderRef) {
          _this.onEnd();
          return;
        }
        var position = utils.getMousePosition(_this.props.vertical, e);
        _this.onMove(e, position - _this.dragOffset);
      };

      _this.onTouchMove = function (e) {
        if (utils.isNotTouchEvent(e) || !_this.sliderRef) {
          _this.onEnd();
          return;
        }

        var position = utils.getTouchPosition(_this.props.vertical, e);
        _this.onMove(e, position - _this.dragOffset);
      };

      _this.onKeyDown = function (e) {
        if (_this.sliderRef && utils.isEventFromHandle(e, _this.handlesRefs)) {
          _this.onKeyboard(e);
        }
      };

      _this.onClickMarkLabel = function (e, value) {
        e.stopPropagation();
        _this.onChange({ value: value });
        _this.onEnd();
      };

      _this.saveSlider = function (slider) {
        _this.sliderRef = slider;
      };

      if (utils.isDev()) {
        var step = props.step,
            max = props.max,
            min = props.min;

        var isPointDiffEven = isFinite(max - min) ? (max - min) % step === 0 : true; // eslint-disable-line
        (0, _warning2.default)(step && Math.floor(step) === step ? isPointDiffEven : true, 'Slider[max] - Slider[min] (%s) should be a multiple of Slider[step] (%s)', max - min, step);
      }
      _this.handlesRefs = {};
      return _this;
    }

    (0, _createClass3.default)(ComponentEnhancer, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        // Snapshot testing cannot handle refs, so be sure to null-check this.
        this.document = this.sliderRef && this.sliderRef.ownerDocument;
        if (_ymkWebSdkCore.browserUtils.isSafari()) {
          this.addDocumentTouchEvents();
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if ((0, _get3.default)(ComponentEnhancer.prototype.__proto__ || (0, _getPrototypeOf2.default)(ComponentEnhancer.prototype), 'componentWillUnmount', this)) (0, _get3.default)(ComponentEnhancer.prototype.__proto__ || (0, _getPrototypeOf2.default)(ComponentEnhancer.prototype), 'componentWillUnmount', this).call(this);
        this.removeDocumentEvents();
      }
    }, {
      key: 'getSliderStart',
      value: function getSliderStart() {
        var slider = this.sliderRef;
        var rect = slider.getBoundingClientRect();

        return this.props.vertical ? rect.top : rect.left + window.pageXOffset;
      }
    }, {
      key: 'getSliderLength',
      value: function getSliderLength() {
        var slider = this.sliderRef;
        if (!slider) {
          return 0;
        }

        var coords = slider.getBoundingClientRect();
        return this.props.vertical ? coords.height : coords.width;
      }
    }, {
      key: 'addDocumentTouchEvents',
      value: function addDocumentTouchEvents() {
        // just work for Chrome iOS Safari and Android Browser
        if (_ymkWebSdkCore.browserUtils.isIOs()) {
          //this.onTouchMoveListener = this.document.addEventListener('touchmove', this.onTouchMove, {passive: false});
          this.onTouchMoveListener = this.sliderRef.addEventListener('touchmove', this.onTouchMove, { passive: false });
          this.onTouchUpListener = (0, _addEventListener2.default)(this.document, 'touchend', this.onEnd);
        } else {
          this.onTouchMoveListener = (0, _addEventListener2.default)(this.document, 'touchmove', this.onTouchMove);
          this.onTouchUpListener = (0, _addEventListener2.default)(this.document, 'touchend', this.onEnd);
        }
      }
    }, {
      key: 'addDocumentMouseEvents',
      value: function addDocumentMouseEvents() {
        this.onMouseMoveListener = (0, _addEventListener2.default)(this.document, 'mousemove', this.onMouseMove);
        this.onMouseUpListener = (0, _addEventListener2.default)(this.document, 'mouseup', this.onEnd);
      }
    }, {
      key: 'removeDocumentEvents',
      value: function removeDocumentEvents() {
        /* eslint-disable no-unused-expressions */
        this.onTouchMoveListener && this.onTouchMoveListener.remove();
        this.onTouchUpListener && this.onTouchUpListener.remove();

        this.onMouseMoveListener && this.onMouseMoveListener.remove();
        this.onMouseUpListener && this.onMouseUpListener.remove();
        /* eslint-enable no-unused-expressions */
      }
    }, {
      key: 'focus',
      value: function focus() {
        if (!this.props.disabled) {
          this.handlesRefs[0].focus();
        }
      }
    }, {
      key: 'blur',
      value: function blur() {
        var _this2 = this;

        if (!this.props.disabled) {
          (0, _keys2.default)(this.handlesRefs).forEach(function (key) {
            if (_this2.handlesRefs[key] && _this2.handlesRefs[key].blur) {
              _this2.handlesRefs[key].blur();
            }
          });
        }
      }
    }, {
      key: 'calcValue',
      value: function calcValue(offset) {
        var _props = this.props,
            vertical = _props.vertical,
            min = _props.min,
            max = _props.max;

        var ratio = Math.abs(Math.max(offset, 0) / this.getSliderLength());
        var value = vertical ? (1 - ratio) * (max - min) + min : ratio * (max - min) + min;
        return value;
      }
    }, {
      key: 'calcValueByPos',
      value: function calcValueByPos(position) {
        var pixelOffset = position - this.getSliderStart();
        var nextValue = this.trimAlignValue(this.calcValue(pixelOffset));
        return nextValue;
      }
    }, {
      key: 'calcOffset',
      value: function calcOffset(value) {
        var _props2 = this.props,
            min = _props2.min,
            max = _props2.max;

        var ratio = (value - min) / (max - min);
        return ratio * 100;
      }
    }, {
      key: 'saveHandle',
      value: function saveHandle(index, handle) {
        this.handlesRefs[index] = handle;
      }
    }, {
      key: 'render',
      value: function render() {
        var _classNames;

        var _props3 = this.props,
            prefixCls = _props3.prefixCls,
            className = _props3.className,
            marks = _props3.marks,
            dots = _props3.dots,
            step = _props3.step,
            included = _props3.included,
            disabled = _props3.disabled,
            vertical = _props3.vertical,
            min = _props3.min,
            max = _props3.max,
            children = _props3.children,
            maximumTrackStyle = _props3.maximumTrackStyle,
            style = _props3.style,
            railStyle = _props3.railStyle,
            dotStyle = _props3.dotStyle,
            activeDotStyle = _props3.activeDotStyle;

        var _get$call = (0, _get3.default)(ComponentEnhancer.prototype.__proto__ || (0, _getPrototypeOf2.default)(ComponentEnhancer.prototype), 'render', this).call(this),
            tracks = _get$call.tracks,
            handles = _get$call.handles;

        var sliderClassName = (0, _classnames2.default)(prefixCls, (_classNames = {}, (0, _defineProperty3.default)(_classNames, prefixCls + '-with-marks', (0, _keys2.default)(marks).length), (0, _defineProperty3.default)(_classNames, prefixCls + '-disabled', disabled), (0, _defineProperty3.default)(_classNames, prefixCls + '-vertical', vertical), (0, _defineProperty3.default)(_classNames, className, className), _classNames));
        return _react2.default.createElement(
          'div',
          {
            ref: this.saveSlider,
            className: sliderClassName,
            onTouchStart: disabled ? noop : this.onTouchStart,
            onMouseDown: disabled ? noop : this.onMouseDown,
            onMouseUp: disabled ? noop : this.onMouseUp,
            onKeyDown: disabled ? noop : this.onKeyDown,
            onFocus: disabled ? noop : this.onFocus,
            onBlur: disabled ? noop : this.onBlur,
            style: style
          },
          _react2.default.createElement('div', {
            className: prefixCls + '-rail',
            style: (0, _extends3.default)({}, maximumTrackStyle, railStyle)
          }),
          tracks,
          _react2.default.createElement(_Steps2.default, {
            prefixCls: prefixCls,
            vertical: vertical,
            marks: marks,
            dots: dots,
            step: step,
            included: included,
            lowerBound: this.getLowerBound(),
            upperBound: this.getUpperBound(),
            max: max,
            min: min,
            dotStyle: dotStyle,
            activeDotStyle: activeDotStyle
          }),
          handles,
          _react2.default.createElement(_Marks2.default, {
            className: prefixCls + '-mark',
            onClickLabel: disabled ? noop : this.onClickMarkLabel,
            vertical: vertical,
            marks: marks,
            included: included,
            lowerBound: this.getLowerBound(),
            upperBound: this.getUpperBound(),
            max: max,
            min: min
          }),
          children
        );
      }
    }]);
    return ComponentEnhancer;
  }(Component), _class.displayName = 'ComponentEnhancer(' + Component.displayName + ')', _class.propTypes = (0, _extends3.default)({}, Component.propTypes, {
    min: _propTypes2.default.number,
    max: _propTypes2.default.number,
    step: _propTypes2.default.number,
    marks: _propTypes2.default.object,
    included: _propTypes2.default.bool,
    className: _propTypes2.default.string,
    prefixCls: _propTypes2.default.string,
    disabled: _propTypes2.default.bool,
    children: _propTypes2.default.any,
    onBeforeChange: _propTypes2.default.func,
    onChange: _propTypes2.default.func,
    onAfterChange: _propTypes2.default.func,
    handle: _propTypes2.default.func,
    dots: _propTypes2.default.bool,
    vertical: _propTypes2.default.bool,
    style: _propTypes2.default.object,
    minimumTrackStyle: _propTypes2.default.object, // just for compatibility, will be deperecate
    maximumTrackStyle: _propTypes2.default.object, // just for compatibility, will be deperecate
    handleStyle: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.arrayOf(_propTypes2.default.object)]),
    trackStyle: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.arrayOf(_propTypes2.default.object)]),
    railStyle: _propTypes2.default.object,
    dotStyle: _propTypes2.default.object,
    activeDotStyle: _propTypes2.default.object,
    autoFocus: _propTypes2.default.bool,
    onFocus: _propTypes2.default.func,
    onBlur: _propTypes2.default.func
  }), _class.defaultProps = (0, _extends3.default)({}, Component.defaultProps, {
    prefixCls: 'rc-slider',
    className: '',
    min: 0,
    max: 100,
    step: 1,
    marks: {},
    handle: function handle(_ref) {
      var index = _ref.index,
          restProps = (0, _objectWithoutProperties3.default)(_ref, ['index']);

      delete restProps.dragging;
      if (restProps.value === null) {
        return null;
      }

      return _react2.default.createElement(_Handle2.default, (0, _extends3.default)({}, restProps, { key: index }));
    },

    onBeforeChange: noop,
    onChange: noop,
    onAfterChange: noop,
    included: true,
    disabled: false,
    dots: false,
    vertical: false,
    trackStyle: [{}],
    handleStyle: [{}],
    railStyle: {},
    dotStyle: {},
    activeDotStyle: {}
  }), _temp;
}
module.exports = exports['default'];

/***/ }),

/***/ 1995:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = addEventListenerWrap;

var _addDomEventListener = __webpack_require__(2220);

var _addDomEventListener2 = _interopRequireDefault(_addDomEventListener);

var _reactDom = __webpack_require__(551);

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function addEventListenerWrap(target, eventType, cb, option) {
  /* eslint camelcase: 2 */
  var callback = _reactDom2['default'].unstable_batchedUpdates ? function run(e) {
    _reactDom2['default'].unstable_batchedUpdates(cb, e);
  } : cb;
  return (0, _addDomEventListener2['default'])(target, eventType, callback, option);
}
module.exports = exports['default'];

/***/ }),

/***/ 1996:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (false) {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(2231)();
}


/***/ }),

/***/ 1997:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(680);


/**
 * 得到会导致元素显示不全的祖先元素
 */

function getOffsetParent(element) {
  if (__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].isWindow(element) || element.nodeType === 9) {
    return null;
  }
  // ie 这个也不是完全可行
  /*
   <div style="width: 50px;height: 100px;overflow: hidden">
   <div style="width: 50px;height: 100px;position: relative;" id="d6">
   元素 6 高 100px 宽 50px<br/>
   </div>
   </div>
   */
  // element.offsetParent does the right thing in ie7 and below. Return parent with layout!
  //  In other browsers it only includes elements with position absolute, relative or
  // fixed, not elements with overflow set to auto or scroll.
  //        if (UA.ie && ieMode < 8) {
  //            return element.offsetParent;
  //        }
  // 统一的 offsetParent 方法
  var doc = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].getDocument(element);
  var body = doc.body;
  var parent = void 0;
  var positionStyle = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].css(element, 'position');
  var skipStatic = positionStyle === 'fixed' || positionStyle === 'absolute';

  if (!skipStatic) {
    return element.nodeName.toLowerCase() === 'html' ? null : element.parentNode;
  }

  for (parent = element.parentNode; parent && parent !== body; parent = parent.parentNode) {
    positionStyle = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].css(parent, 'position');
    if (positionStyle !== 'static') {
      return parent;
    }
  }
  return null;
}

/* harmony default export */ __webpack_exports__["a"] = (getOffsetParent);

/***/ }),

/***/ 1998:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(2271)();
}


/***/ }),

/***/ 1999:
/***/ (function(module, exports) {

module.exports = function(arr, obj){
  if (arr.indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};

/***/ }),

/***/ 2000:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var util = {
  isAppearSupported: function isAppearSupported(props) {
    return props.transitionName && props.transitionAppear || props.animation.appear;
  },
  isEnterSupported: function isEnterSupported(props) {
    return props.transitionName && props.transitionEnter || props.animation.enter;
  },
  isLeaveSupported: function isLeaveSupported(props) {
    return props.transitionName && props.transitionLeave || props.animation.leave;
  },
  allowAppearCallback: function allowAppearCallback(props) {
    return props.transitionAppear || props.animation.appear;
  },
  allowEnterCallback: function allowEnterCallback(props) {
    return props.transitionEnter || props.animation.enter;
  },
  allowLeaveCallback: function allowLeaveCallback(props) {
    return props.transitionLeave || props.animation.leave;
  }
};
/* harmony default export */ __webpack_exports__["a"] = (util);

/***/ }),

/***/ 2001:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_objectWithoutProperties__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_objectWithoutProperties___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_objectWithoutProperties__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(466);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(459);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types__ = __webpack_require__(955);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_prop_types__);








var LazyRenderBox = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(LazyRenderBox, _Component);

  function LazyRenderBox() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, LazyRenderBox);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (LazyRenderBox.__proto__ || Object.getPrototypeOf(LazyRenderBox)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(LazyRenderBox, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.hiddenClassName || nextProps.visible;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          hiddenClassName = _props.hiddenClassName,
          visible = _props.visible,
          props = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_objectWithoutProperties___default()(_props, ['hiddenClassName', 'visible']);

      if (hiddenClassName || __WEBPACK_IMPORTED_MODULE_5_react___default.a.Children.count(props.children) > 1) {
        if (!visible && hiddenClassName) {
          props.className += ' ' + hiddenClassName;
        }
        return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('div', props);
      }

      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.Children.only(props.children);
    }
  }]);

  return LazyRenderBox;
}(__WEBPACK_IMPORTED_MODULE_5_react__["Component"]);

LazyRenderBox.propTypes = {
  children: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.any,
  className: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.string,
  visible: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.bool,
  hiddenClassName: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.string
};


/* harmony default export */ __webpack_exports__["a"] = (LazyRenderBox);

/***/ }),

/***/ 2002:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getAlignFromPlacement;
/* harmony export (immutable) */ __webpack_exports__["b"] = getPopupClassNameFromAlign;
/* harmony export (immutable) */ __webpack_exports__["c"] = saveRef;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);

function isPointsEq(a1, a2) {
  return a1[0] === a2[0] && a1[1] === a2[1];
}

function getAlignFromPlacement(builtinPlacements, placementStr, align) {
  var baseAlign = builtinPlacements[placementStr] || {};
  return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, baseAlign, align);
}

function getPopupClassNameFromAlign(builtinPlacements, prefixCls, align) {
  var points = align.points;
  for (var placement in builtinPlacements) {
    if (builtinPlacements.hasOwnProperty(placement)) {
      if (isPointsEq(builtinPlacements[placement].points, points)) {
        return prefixCls + '-placement-' + placement;
      }
    }
  }
  return '';
}

function saveRef(name, component) {
  this[name] = component;
}

/***/ }),

/***/ 2032:
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory(__webpack_require__(551), __webpack_require__(459));
	else if(typeof define === 'function' && define.amd)
		define(["react-dom", "react"], factory);
	else if(typeof exports === 'object')
		exports["ReactDraggable"] = factory(require("react-dom"), require("react"));
	else
		root["ReactDraggable"] = factory(root["ReactDOM"], root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_6__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findInArray = findInArray;
exports.isFunction = isFunction;
exports.isNum = isNum;
exports.int = int;
exports.dontSetMe = dontSetMe;

// @credits https://gist.github.com/rogozhnikoff/a43cfed27c41e4e68cdc
function findInArray(array /*: Array<any> | TouchList*/, callback /*: Function*/) /*: any*/ {
  for (var i = 0, length = array.length; i < length; i++) {
    if (callback.apply(callback, [array[i], i, array])) return array[i];
  }
}

function isFunction(func /*: any*/) /*: boolean*/ {
  return typeof func === 'function' || Object.prototype.toString.call(func) === '[object Function]';
}

function isNum(num /*: any*/) /*: boolean*/ {
  return typeof num === 'number' && !isNaN(num);
}

function int(a /*: string*/) /*: number*/ {
  return parseInt(a, 10);
}

function dontSetMe(props /*: Object*/, propName /*: string*/, componentName /*: string*/) {
  if (props[propName]) {
    return new Error('Invalid prop ' + propName + ' passed to ' + componentName + ' - do not set this, set it on the child.');
  }
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (Object({"DRAGGABLE_DEBUG":undefined}).NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.matchesSelector = matchesSelector;
exports.matchesSelectorAndParentsTo = matchesSelectorAndParentsTo;
exports.addEvent = addEvent;
exports.removeEvent = removeEvent;
exports.outerHeight = outerHeight;
exports.outerWidth = outerWidth;
exports.innerHeight = innerHeight;
exports.innerWidth = innerWidth;
exports.offsetXYFromParent = offsetXYFromParent;
exports.createCSSTransform = createCSSTransform;
exports.createSVGTransform = createSVGTransform;
exports.getTouch = getTouch;
exports.getTouchIdentifier = getTouchIdentifier;
exports.addUserSelectStyles = addUserSelectStyles;
exports.removeUserSelectStyles = removeUserSelectStyles;
exports.styleHacks = styleHacks;
exports.addClassName = addClassName;
exports.removeClassName = removeClassName;

var _shims = __webpack_require__(0);

var _getPrefix = __webpack_require__(18);

var _getPrefix2 = _interopRequireDefault(_getPrefix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*:: import type {ControlPosition, MouseTouchEvent} from './types';*/


var matchesSelectorFunc = '';
function matchesSelector(el /*: Node*/, selector /*: string*/) /*: boolean*/ {
  if (!matchesSelectorFunc) {
    matchesSelectorFunc = (0, _shims.findInArray)(['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'], function (method) {
      // $FlowIgnore: Doesn't think elements are indexable
      return (0, _shims.isFunction)(el[method]);
    });
  }

  // $FlowIgnore: Doesn't think elements are indexable
  return el[matchesSelectorFunc].call(el, selector);
}

// Works up the tree to the draggable itself attempting to match selector.
function matchesSelectorAndParentsTo(el /*: Node*/, selector /*: string*/, baseNode /*: Node*/) /*: boolean*/ {
  var node = el;
  do {
    if (matchesSelector(node, selector)) return true;
    if (node === baseNode) return false;
    node = node.parentNode;
  } while (node);

  return false;
}

function addEvent(el /*: ?Node*/, event /*: string*/, handler /*: Function*/) /*: void*/ {
  if (!el) {
    return;
  }
  if (el.attachEvent) {
    el.attachEvent('on' + event, handler);
  } else if (el.addEventListener) {
    el.addEventListener(event, handler, true);
  } else {
    // $FlowIgnore: Doesn't think elements are indexable
    el['on' + event] = handler;
  }
}

function removeEvent(el /*: ?Node*/, event /*: string*/, handler /*: Function*/) /*: void*/ {
  if (!el) {
    return;
  }
  if (el.detachEvent) {
    el.detachEvent('on' + event, handler);
  } else if (el.removeEventListener) {
    el.removeEventListener(event, handler, true);
  } else {
    // $FlowIgnore: Doesn't think elements are indexable
    el['on' + event] = null;
  }
}

function outerHeight(node /*: HTMLElement*/) /*: number*/ {
  // This is deliberately excluding margin for our calculations, since we are using
  // offsetTop which is including margin. See getBoundPosition
  var height = node.clientHeight;
  var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  height += (0, _shims.int)(computedStyle.borderTopWidth);
  height += (0, _shims.int)(computedStyle.borderBottomWidth);
  return height;
}

function outerWidth(node /*: HTMLElement*/) /*: number*/ {
  // This is deliberately excluding margin for our calculations, since we are using
  // offsetLeft which is including margin. See getBoundPosition
  var width = node.clientWidth;
  var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  width += (0, _shims.int)(computedStyle.borderLeftWidth);
  width += (0, _shims.int)(computedStyle.borderRightWidth);
  return width;
}
function innerHeight(node /*: HTMLElement*/) /*: number*/ {
  var height = node.clientHeight;
  var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  height -= (0, _shims.int)(computedStyle.paddingTop);
  height -= (0, _shims.int)(computedStyle.paddingBottom);
  return height;
}

function innerWidth(node /*: HTMLElement*/) /*: number*/ {
  var width = node.clientWidth;
  var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  width -= (0, _shims.int)(computedStyle.paddingLeft);
  width -= (0, _shims.int)(computedStyle.paddingRight);
  return width;
}

// Get from offsetParent
function offsetXYFromParent(evt /*: {clientX: number, clientY: number}*/, offsetParent /*: HTMLElement*/) /*: ControlPosition*/ {
  var isBody = offsetParent === offsetParent.ownerDocument.body;
  var offsetParentRect = isBody ? { left: 0, top: 0 } : offsetParent.getBoundingClientRect();

  var x = evt.clientX + offsetParent.scrollLeft - offsetParentRect.left;
  var y = evt.clientY + offsetParent.scrollTop - offsetParentRect.top;

  return { x: x, y: y };
}

function createCSSTransform(_ref) /*: Object*/ {
  var x = _ref.x,
      y = _ref.y;

  // Replace unitless items with px
  return _defineProperty({}, (0, _getPrefix.browserPrefixToKey)('transform', _getPrefix2.default), 'translate(' + x + 'px,' + y + 'px)');
}

function createSVGTransform(_ref3) /*: string*/ {
  var x = _ref3.x,
      y = _ref3.y;

  return 'translate(' + x + ',' + y + ')';
}

function getTouch(e /*: MouseTouchEvent*/, identifier /*: number*/) /*: ?{clientX: number, clientY: number}*/ {
  return e.targetTouches && (0, _shims.findInArray)(e.targetTouches, function (t) {
    return identifier === t.identifier;
  }) || e.changedTouches && (0, _shims.findInArray)(e.changedTouches, function (t) {
    return identifier === t.identifier;
  });
}

function getTouchIdentifier(e /*: MouseTouchEvent*/) /*: ?number*/ {
  if (e.targetTouches && e.targetTouches[0]) return e.targetTouches[0].identifier;
  if (e.changedTouches && e.changedTouches[0]) return e.changedTouches[0].identifier;
}

// User-select Hacks:
//
// Useful for preventing blue highlights all over everything when dragging.

// Note we're passing `document` b/c we could be iframed
function addUserSelectStyles(doc /*: Document*/) {
  var styleEl = doc.getElementById('react-draggable-style-el');
  if (!styleEl) {
    styleEl = doc.createElement('style');
    styleEl.type = 'text/css';
    styleEl.id = 'react-draggable-style-el';
    styleEl.innerHTML = '.react-draggable-transparent-selection *::-moz-selection {background: transparent;}\n';
    styleEl.innerHTML += '.react-draggable-transparent-selection *::selection {background: transparent;}\n';
    doc.getElementsByTagName('head')[0].appendChild(styleEl);
  }
  if (doc.body) addClassName(doc.body, 'react-draggable-transparent-selection');
}

function removeUserSelectStyles(doc /*: Document*/) {
  if (doc.body) removeClassName(doc.body, 'react-draggable-transparent-selection');
  window.getSelection().removeAllRanges(); // remove selection caused by scroll
}

function styleHacks() /*: Object*/ {
  var childStyle /*: Object*/ = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // Workaround IE pointer events; see #51
  // https://github.com/mzabriskie/react-draggable/issues/51#issuecomment-103488278
  return _extends({
    touchAction: 'none'
  }, childStyle);
}

function addClassName(el /*: HTMLElement*/, className /*: string*/) {
  if (el.classList) {
    el.classList.add(className);
  } else {
    if (!el.className.match(new RegExp('(?:^|\\s)' + className + '(?!\\S)'))) {
      el.className += ' ' + className;
    }
  }
}

function removeClassName(el /*: HTMLElement*/, className /*: string*/) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(new RegExp('(?:^|\\s)' + className + '(?!\\S)', 'g'), '');
  }
}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (Object({"DRAGGABLE_DEBUG":undefined}).NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(14)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(16)();
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyFunction = __webpack_require__(1);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (Object({"DRAGGABLE_DEBUG":undefined}).NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBoundPosition = getBoundPosition;
exports.snapToGrid = snapToGrid;
exports.canDragX = canDragX;
exports.canDragY = canDragY;
exports.getControlPosition = getControlPosition;
exports.createCoreData = createCoreData;
exports.createDraggableData = createDraggableData;

var _shims = __webpack_require__(0);

var _reactDom = __webpack_require__(4);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _domFns = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*:: import type Draggable from '../Draggable';*/
/*:: import type {Bounds, ControlPosition, DraggableData, MouseTouchEvent} from './types';*/
/*:: import type DraggableCore from '../DraggableCore';*/
function getBoundPosition(draggable /*: Draggable*/, x /*: number*/, y /*: number*/) /*: [number, number]*/ {
  // If no bounds, short-circuit and move on
  if (!draggable.props.bounds) return [x, y];

  // Clone new bounds
  var bounds = draggable.props.bounds;

  bounds = typeof bounds === 'string' ? bounds : cloneBounds(bounds);
  var node = findDOMNode(draggable);

  if (typeof bounds === 'string') {
    var ownerDocument = node.ownerDocument;

    var ownerWindow = ownerDocument.defaultView;
    var boundNode = void 0;
    if (bounds === 'parent') {
      boundNode = node.parentNode;
    } else {
      boundNode = ownerDocument.querySelector(bounds);
    }
    if (!(boundNode instanceof HTMLElement)) {
      throw new Error('Bounds selector "' + bounds + '" could not find an element.');
    }
    var nodeStyle = ownerWindow.getComputedStyle(node);
    var boundNodeStyle = ownerWindow.getComputedStyle(boundNode);
    // Compute bounds. This is a pain with padding and offsets but this gets it exactly right.
    bounds = {
      left: -node.offsetLeft + (0, _shims.int)(boundNodeStyle.paddingLeft) + (0, _shims.int)(nodeStyle.marginLeft),
      top: -node.offsetTop + (0, _shims.int)(boundNodeStyle.paddingTop) + (0, _shims.int)(nodeStyle.marginTop),
      right: (0, _domFns.innerWidth)(boundNode) - (0, _domFns.outerWidth)(node) - node.offsetLeft + (0, _shims.int)(boundNodeStyle.paddingRight) - (0, _shims.int)(nodeStyle.marginRight),
      bottom: (0, _domFns.innerHeight)(boundNode) - (0, _domFns.outerHeight)(node) - node.offsetTop + (0, _shims.int)(boundNodeStyle.paddingBottom) - (0, _shims.int)(nodeStyle.marginBottom)
    };
  }

  // Keep x and y below right and bottom limits...
  if ((0, _shims.isNum)(bounds.right)) x = Math.min(x, bounds.right);
  if ((0, _shims.isNum)(bounds.bottom)) y = Math.min(y, bounds.bottom);

  // But above left and top limits.
  if ((0, _shims.isNum)(bounds.left)) x = Math.max(x, bounds.left);
  if ((0, _shims.isNum)(bounds.top)) y = Math.max(y, bounds.top);

  return [x, y];
}

function snapToGrid(grid /*: [number, number]*/, pendingX /*: number*/, pendingY /*: number*/) /*: [number, number]*/ {
  var x = Math.round(pendingX / grid[0]) * grid[0];
  var y = Math.round(pendingY / grid[1]) * grid[1];
  return [x, y];
}

function canDragX(draggable /*: Draggable*/) /*: boolean*/ {
  return draggable.props.axis === 'both' || draggable.props.axis === 'x';
}

function canDragY(draggable /*: Draggable*/) /*: boolean*/ {
  return draggable.props.axis === 'both' || draggable.props.axis === 'y';
}

// Get {x, y} positions from event.
function getControlPosition(e /*: MouseTouchEvent*/, touchIdentifier /*: ?number*/, draggableCore /*: DraggableCore*/) /*: ?ControlPosition*/ {
  var touchObj = typeof touchIdentifier === 'number' ? (0, _domFns.getTouch)(e, touchIdentifier) : null;
  if (typeof touchIdentifier === 'number' && !touchObj) return null; // not the right touch
  var node = findDOMNode(draggableCore);
  // User can provide an offsetParent if desired.
  var offsetParent = draggableCore.props.offsetParent || node.offsetParent || node.ownerDocument.body;
  return (0, _domFns.offsetXYFromParent)(touchObj || e, offsetParent);
}

// Create an data object exposed by <DraggableCore>'s events
function createCoreData(draggable /*: DraggableCore*/, x /*: number*/, y /*: number*/) /*: DraggableData*/ {
  var state = draggable.state;
  var isStart = !(0, _shims.isNum)(state.lastX);
  var node = findDOMNode(draggable);

  if (isStart) {
    // If this is our first move, use the x and y as last coords.
    return {
      node: node,
      deltaX: 0, deltaY: 0,
      lastX: x, lastY: y,
      x: x, y: y
    };
  } else {
    // Otherwise calculate proper values.
    return {
      node: node,
      deltaX: x - state.lastX, deltaY: y - state.lastY,
      lastX: state.lastX, lastY: state.lastY,
      x: x, y: y
    };
  }
}

// Create an data exposed by <Draggable>'s events
function createDraggableData(draggable /*: Draggable*/, coreData /*: DraggableData*/) /*: DraggableData*/ {
  return {
    node: coreData.node,
    x: draggable.state.x + coreData.deltaX,
    y: draggable.state.y + coreData.deltaY,
    deltaX: coreData.deltaX,
    deltaY: coreData.deltaY,
    lastX: draggable.state.x,
    lastY: draggable.state.y
  };
}

// A lot faster than stringify/parse
function cloneBounds(bounds /*: Bounds*/) /*: Bounds*/ {
  return {
    left: bounds.left,
    top: bounds.top,
    right: bounds.right,
    bottom: bounds.bottom
  };
}

function findDOMNode(draggable /*: Draggable | DraggableCore*/) /*: HTMLElement*/ {
  var node = _reactDom2.default.findDOMNode(draggable);
  if (!node) {
    throw new Error('<DraggableCore>: Unmounted during event!');
  }
  // $FlowIgnore we can't assert on HTMLElement due to tests... FIXME
  return node;
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = __webpack_require__(4);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _domFns = __webpack_require__(5);

var _positionFns = __webpack_require__(9);

var _shims = __webpack_require__(0);

var _log = __webpack_require__(11);

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*:: import type {EventHandler, MouseTouchEvent} from './utils/types';*/


// Simple abstraction for dragging events names.
/*:: import type {Element as ReactElement} from 'react';*/
var eventsFor = {
  touch: {
    start: 'touchstart',
    move: 'touchmove',
    stop: 'touchend'
  },
  mouse: {
    start: 'mousedown',
    move: 'mousemove',
    stop: 'mouseup'
  }
};

// Default to mouse events.
var dragEventFor = eventsFor.mouse;

/*:: type DraggableCoreState = {
  dragging: boolean,
  lastX: number,
  lastY: number,
  touchIdentifier: ?number
};*/
/*:: export type DraggableBounds = {
  left: number,
  right: number,
  top: number,
  bottom: number,
};*/
/*:: export type DraggableData = {
  node: HTMLElement,
  x: number, y: number,
  deltaX: number, deltaY: number,
  lastX: number, lastY: number,
};*/
/*:: export type DraggableEventHandler = (e: MouseEvent, data: DraggableData) => void;*/
/*:: export type ControlPosition = {x: number, y: number};*/


//
// Define <DraggableCore>.
//
// <DraggableCore> is for advanced usage of <Draggable>. It maintains minimal internal state so it can
// work well with libraries that require more control over the element.
//

/*:: export type DraggableCoreProps = {
  allowAnyClick: boolean,
  cancel: string,
  children: ReactElement<any>,
  disabled: boolean,
  enableUserSelectHack: boolean,
  offsetParent: HTMLElement,
  grid: [number, number],
  handle: string,
  onStart: DraggableEventHandler,
  onDrag: DraggableEventHandler,
  onStop: DraggableEventHandler,
  onMouseDown: (e: MouseEvent) => void,
};*/

var DraggableCore = function (_React$Component) {
  _inherits(DraggableCore, _React$Component);

  function DraggableCore() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DraggableCore);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DraggableCore.__proto__ || Object.getPrototypeOf(DraggableCore)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      dragging: false,
      // Used while dragging to determine deltas.
      lastX: NaN, lastY: NaN,
      touchIdentifier: null
    }, _this.handleDragStart = function (e) {
      // Make it possible to attach event handlers on top of this one.
      _this.props.onMouseDown(e);

      // Only accept left-clicks.
      if (!_this.props.allowAnyClick && typeof e.button === 'number' && e.button !== 0) return false;

      // Get nodes. Be sure to grab relative document (could be iframed)
      var thisNode = _reactDom2.default.findDOMNode(_this);
      if (!thisNode || !thisNode.ownerDocument || !thisNode.ownerDocument.body) {
        throw new Error('<DraggableCore> not mounted on DragStart!');
      }
      var ownerDocument = thisNode.ownerDocument;

      // Short circuit if handle or cancel prop was provided and selector doesn't match.

      if (_this.props.disabled || !(e.target instanceof ownerDocument.defaultView.Node) || _this.props.handle && !(0, _domFns.matchesSelectorAndParentsTo)(e.target, _this.props.handle, thisNode) || _this.props.cancel && (0, _domFns.matchesSelectorAndParentsTo)(e.target, _this.props.cancel, thisNode)) {
        return;
      }

      // Set touch identifier in component state if this is a touch event. This allows us to
      // distinguish between individual touches on multitouch screens by identifying which
      // touchpoint was set to this element.
      var touchIdentifier = (0, _domFns.getTouchIdentifier)(e);
      _this.setState({ touchIdentifier: touchIdentifier });

      // Get the current drag point from the event. This is used as the offset.
      var position = (0, _positionFns.getControlPosition)(e, touchIdentifier, _this);
      if (position == null) return; // not possible but satisfies flow
      var x = position.x,
          y = position.y;

      // Create an event object with all the data parents need to make a decision here.

      var coreEvent = (0, _positionFns.createCoreData)(_this, x, y);

      (0, _log2.default)('DraggableCore: handleDragStart: %j', coreEvent);

      // Call event handler. If it returns explicit false, cancel.
      (0, _log2.default)('calling', _this.props.onStart);
      var shouldUpdate = _this.props.onStart(e, coreEvent);
      if (shouldUpdate === false) return;

      // Add a style to the body to disable user-select. This prevents text from
      // being selected all over the page.
      if (_this.props.enableUserSelectHack) (0, _domFns.addUserSelectStyles)(ownerDocument);

      // Initiate dragging. Set the current x and y as offsets
      // so we know how much we've moved during the drag. This allows us
      // to drag elements around even if they have been moved, without issue.
      _this.setState({
        dragging: true,

        lastX: x,
        lastY: y
      });

      // Add events to the document directly so we catch when the user's mouse/touch moves outside of
      // this element. We use different events depending on whether or not we have detected that this
      // is a touch-capable device.
      (0, _domFns.addEvent)(ownerDocument, dragEventFor.move, _this.handleDrag);
      (0, _domFns.addEvent)(ownerDocument, dragEventFor.stop, _this.handleDragStop);
    }, _this.handleDrag = function (e) {

      // Prevent scrolling on mobile devices, like ipad/iphone.
      if (e.type === 'touchmove') e.preventDefault();

      // Get the current drag point from the event. This is used as the offset.
      var position = (0, _positionFns.getControlPosition)(e, _this.state.touchIdentifier, _this);
      if (position == null) return;
      var x = position.x,
          y = position.y;

      // Snap to grid if prop has been provided

      if (Array.isArray(_this.props.grid)) {
        var _deltaX = x - _this.state.lastX,
            _deltaY = y - _this.state.lastY;

        var _snapToGrid = (0, _positionFns.snapToGrid)(_this.props.grid, _deltaX, _deltaY);

        var _snapToGrid2 = _slicedToArray(_snapToGrid, 2);

        _deltaX = _snapToGrid2[0];
        _deltaY = _snapToGrid2[1];

        if (!_deltaX && !_deltaY) return; // skip useless drag
        x = _this.state.lastX + _deltaX, y = _this.state.lastY + _deltaY;
      }

      var coreEvent = (0, _positionFns.createCoreData)(_this, x, y);

      (0, _log2.default)('DraggableCore: handleDrag: %j', coreEvent);

      // Call event handler. If it returns explicit false, trigger end.
      var shouldUpdate = _this.props.onDrag(e, coreEvent);
      if (shouldUpdate === false) {
        try {
          // $FlowIgnore
          _this.handleDragStop(new MouseEvent('mouseup'));
        } catch (err) {
          // Old browsers
          var event = ((document.createEvent('MouseEvents') /*: any*/) /*: MouseTouchEvent*/);
          // I see why this insanity was deprecated
          // $FlowIgnore
          event.initMouseEvent('mouseup', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          _this.handleDragStop(event);
        }
        return;
      }

      _this.setState({
        lastX: x,
        lastY: y
      });
    }, _this.handleDragStop = function (e) {
      if (!_this.state.dragging) return;

      var position = (0, _positionFns.getControlPosition)(e, _this.state.touchIdentifier, _this);
      if (position == null) return;
      var x = position.x,
          y = position.y;

      var coreEvent = (0, _positionFns.createCoreData)(_this, x, y);

      var thisNode = _reactDom2.default.findDOMNode(_this);
      if (thisNode) {
        // Remove user-select hack
        if (_this.props.enableUserSelectHack) (0, _domFns.removeUserSelectStyles)(thisNode.ownerDocument);
      }

      (0, _log2.default)('DraggableCore: handleDragStop: %j', coreEvent);

      // Reset the el.
      _this.setState({
        dragging: false,
        lastX: NaN,
        lastY: NaN
      });

      // Call event handler
      _this.props.onStop(e, coreEvent);

      if (thisNode) {
        // Remove event handlers
        (0, _log2.default)('DraggableCore: Removing handlers');
        (0, _domFns.removeEvent)(thisNode.ownerDocument, dragEventFor.move, _this.handleDrag);
        (0, _domFns.removeEvent)(thisNode.ownerDocument, dragEventFor.stop, _this.handleDragStop);
      }
    }, _this.onMouseDown = function (e) {
      dragEventFor = eventsFor.mouse; // on touchscreen laptops we could switch back to mouse

      return _this.handleDragStart(e);
    }, _this.onMouseUp = function (e) {
      dragEventFor = eventsFor.mouse;

      return _this.handleDragStop(e);
    }, _this.onTouchStart = function (e) {
      // We're on a touch device now, so change the event handlers
      dragEventFor = eventsFor.touch;

      return _this.handleDragStart(e);
    }, _this.onTouchEnd = function (e) {
      // We're on a touch device now, so change the event handlers
      dragEventFor = eventsFor.touch;

      return _this.handleDragStop(e);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DraggableCore, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // Remove any leftover event handlers. Remove both touch and mouse handlers in case
      // some browser quirk caused a touch event to fire during a mouse move, or vice versa.
      var thisNode = _reactDom2.default.findDOMNode(this);
      if (thisNode) {
        var ownerDocument = thisNode.ownerDocument;

        (0, _domFns.removeEvent)(ownerDocument, eventsFor.mouse.move, this.handleDrag);
        (0, _domFns.removeEvent)(ownerDocument, eventsFor.touch.move, this.handleDrag);
        (0, _domFns.removeEvent)(ownerDocument, eventsFor.mouse.stop, this.handleDragStop);
        (0, _domFns.removeEvent)(ownerDocument, eventsFor.touch.stop, this.handleDragStop);
        if (this.props.enableUserSelectHack) (0, _domFns.removeUserSelectStyles)(ownerDocument);
      }
    }

    // Same as onMouseDown (start drag), but now consider this a touch device.

  }, {
    key: 'render',
    value: function render() {
      // Reuse the child provided
      // This makes it flexible to use whatever element is wanted (div, ul, etc)
      return _react2.default.cloneElement(_react2.default.Children.only(this.props.children), {
        style: (0, _domFns.styleHacks)(this.props.children.props.style),

        // Note: mouseMove handler is attached to document so it will still function
        // when the user drags quickly and leaves the bounds of the element.
        onMouseDown: this.onMouseDown,
        onTouchStart: this.onTouchStart,
        onMouseUp: this.onMouseUp,
        onTouchEnd: this.onTouchEnd
      });
    }
  }]);

  return DraggableCore;
}(_react2.default.Component);

DraggableCore.displayName = 'DraggableCore';
DraggableCore.propTypes = {
  /**
   * `allowAnyClick` allows dragging using any mouse button.
   * By default, we only accept the left button.
   *
   * Defaults to `false`.
   */
  allowAnyClick: _propTypes2.default.bool,

  /**
   * `disabled`, if true, stops the <Draggable> from dragging. All handlers,
   * with the exception of `onMouseDown`, will not fire.
   */
  disabled: _propTypes2.default.bool,

  /**
   * By default, we add 'user-select:none' attributes to the document body
   * to prevent ugly text selection during drag. If this is causing problems
   * for your app, set this to `false`.
   */
  enableUserSelectHack: _propTypes2.default.bool,

  /**
   * `offsetParent`, if set, uses the passed DOM node to compute drag offsets
   * instead of using the parent node.
   */
  offsetParent: function offsetParent(props, propName) {
    if (process.browser && props[propName] && props[propName].nodeType !== 1) {
      throw new Error('Draggable\'s offsetParent must be a DOM Node.');
    }
  },

  /**
   * `grid` specifies the x and y that dragging should snap to.
   */
  grid: _propTypes2.default.arrayOf(_propTypes2.default.number),

  /**
   * `handle` specifies a selector to be used as the handle that initiates drag.
   *
   * Example:
   *
   * ```jsx
   *   let App = React.createClass({
   *       render: function () {
   *         return (
   *            <Draggable handle=".handle">
   *              <div>
   *                  <div className="handle">Click me to drag</div>
   *                  <div>This is some other content</div>
   *              </div>
   *           </Draggable>
   *         );
   *       }
   *   });
   * ```
   */
  handle: _propTypes2.default.string,

  /**
   * `cancel` specifies a selector to be used to prevent drag initialization.
   *
   * Example:
   *
   * ```jsx
   *   let App = React.createClass({
   *       render: function () {
   *           return(
   *               <Draggable cancel=".cancel">
   *                   <div>
   *                     <div className="cancel">You can't drag from here</div>
   *                     <div>Dragging here works fine</div>
   *                   </div>
   *               </Draggable>
   *           );
   *       }
   *   });
   * ```
   */
  cancel: _propTypes2.default.string,

  /**
   * Called when dragging starts.
   * If this function returns the boolean false, dragging will be canceled.
   */
  onStart: _propTypes2.default.func,

  /**
   * Called while dragging.
   * If this function returns the boolean false, dragging will be canceled.
   */
  onDrag: _propTypes2.default.func,

  /**
   * Called when dragging stops.
   * If this function returns the boolean false, the drag will remain active.
   */
  onStop: _propTypes2.default.func,

  /**
   * A workaround option which can be passed if onMouseDown needs to be accessed,
   * since it'll always be blocked (as there is internal use of onMouseDown)
   */
  onMouseDown: _propTypes2.default.func,

  /**
   * These properties should be defined on the child, not here.
   */
  className: _shims.dontSetMe,
  style: _shims.dontSetMe,
  transform: _shims.dontSetMe
};
DraggableCore.defaultProps = {
  allowAnyClick: false, // by default only accept left click
  cancel: null,
  disabled: false,
  enableUserSelectHack: true,
  offsetParent: null,
  handle: null,
  grid: null,
  transform: null,
  onStart: function onStart() {},
  onDrag: function onDrag() {},
  onStop: function onStop() {},
  onMouseDown: function onMouseDown() {}
};
exports.default = DraggableCore;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = log;

/*eslint no-console:0*/
function log() {
  var _console;

  if (undefined) (_console = console).log.apply(_console, arguments);
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Draggable = __webpack_require__(13).default;

// Previous versions of this lib exported <Draggable> as the root export. As to not break
// them, or TypeScript, we export *both* as the root and as 'default'.
// See https://github.com/mzabriskie/react-draggable/pull/254
// and https://github.com/mzabriskie/react-draggable/issues/266
module.exports = Draggable;
module.exports.default = Draggable;
module.exports.DraggableCore = __webpack_require__(10).default;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = __webpack_require__(4);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = __webpack_require__(17);

var _classnames2 = _interopRequireDefault(_classnames);

var _domFns = __webpack_require__(5);

var _positionFns = __webpack_require__(9);

var _shims = __webpack_require__(0);

var _DraggableCore = __webpack_require__(10);

var _DraggableCore2 = _interopRequireDefault(_DraggableCore);

var _log = __webpack_require__(11);

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*:: import type {ControlPosition, DraggableBounds, DraggableCoreProps} from './DraggableCore';*/
/*:: import type {DraggableEventHandler} from './utils/types';*/
/*:: import type {Element as ReactElement} from 'react';*/
/*:: type DraggableState = {
  dragging: boolean,
  dragged: boolean,
  x: number, y: number,
  slackX: number, slackY: number,
  isElementSVG: boolean
};*/


//
// Define <Draggable>
//

/*:: export type DraggableProps = {
  ...$Exact<DraggableCoreProps>,
  axis: 'both' | 'x' | 'y' | 'none',
  bounds: DraggableBounds | string | false,
  defaultClassName: string,
  defaultClassNameDragging: string,
  defaultClassNameDragged: string,
  defaultPosition: ControlPosition,
  position: ControlPosition,
};*/

var Draggable = function (_React$Component) {
  _inherits(Draggable, _React$Component);

  function Draggable(props /*: DraggableProps*/) {
    _classCallCheck(this, Draggable);

    var _this = _possibleConstructorReturn(this, (Draggable.__proto__ || Object.getPrototypeOf(Draggable)).call(this, props));

    _this.onDragStart = function (e, coreData) {
      (0, _log2.default)('Draggable: onDragStart: %j', coreData);

      // Short-circuit if user's callback killed it.
      var shouldStart = _this.props.onStart(e, (0, _positionFns.createDraggableData)(_this, coreData));
      // Kills start event on core as well, so move handlers are never bound.
      if (shouldStart === false) return false;

      _this.setState({ dragging: true, dragged: true });
    };

    _this.onDrag = function (e, coreData) {
      if (!_this.state.dragging) return false;
      (0, _log2.default)('Draggable: onDrag: %j', coreData);

      var uiData = (0, _positionFns.createDraggableData)(_this, coreData);

      var newState /*: $Shape<DraggableState>*/ = {
        x: uiData.x,
        y: uiData.y
      };

      // Keep within bounds.
      if (_this.props.bounds) {
        // Save original x and y.
        var _x = newState.x,
            _y = newState.y;

        // Add slack to the values used to calculate bound position. This will ensure that if
        // we start removing slack, the element won't react to it right away until it's been
        // completely removed.

        newState.x += _this.state.slackX;
        newState.y += _this.state.slackY;

        // Get bound position. This will ceil/floor the x and y within the boundaries.
        // $FlowBug

        // Recalculate slack by noting how much was shaved by the boundPosition handler.
        var _getBoundPosition = (0, _positionFns.getBoundPosition)(_this, newState.x, newState.y);

        var _getBoundPosition2 = _slicedToArray(_getBoundPosition, 2);

        newState.x = _getBoundPosition2[0];
        newState.y = _getBoundPosition2[1];
        newState.slackX = _this.state.slackX + (_x - newState.x);
        newState.slackY = _this.state.slackY + (_y - newState.y);

        // Update the event we fire to reflect what really happened after bounds took effect.
        uiData.x = newState.x;
        uiData.y = newState.y;
        uiData.deltaX = newState.x - _this.state.x;
        uiData.deltaY = newState.y - _this.state.y;
      }

      // Short-circuit if user's callback killed it.
      var shouldUpdate = _this.props.onDrag(e, uiData);
      if (shouldUpdate === false) return false;

      _this.setState(newState);
    };

    _this.onDragStop = function (e, coreData) {
      if (!_this.state.dragging) return false;

      // Short-circuit if user's callback killed it.
      var shouldStop = _this.props.onStop(e, (0, _positionFns.createDraggableData)(_this, coreData));
      if (shouldStop === false) return false;

      (0, _log2.default)('Draggable: onDragStop: %j', coreData);

      var newState /*: $Shape<DraggableState>*/ = {
        dragging: false,
        slackX: 0,
        slackY: 0
      };

      // If this is a controlled component, the result of this operation will be to
      // revert back to the old position. We expect a handler on `onDragStop`, at the least.
      var controlled = Boolean(_this.props.position);
      if (controlled) {
        var _this$props$position = _this.props.position,
            _x2 = _this$props$position.x,
            _y2 = _this$props$position.y;

        newState.x = _x2;
        newState.y = _y2;
      }

      _this.setState(newState);
    };

    _this.state = {
      // Whether or not we are currently dragging.
      dragging: false,

      // Whether or not we have been dragged before.
      dragged: false,

      // Current transform x and y.
      x: props.position ? props.position.x : props.defaultPosition.x,
      y: props.position ? props.position.y : props.defaultPosition.y,

      // Used for compensating for out-of-bounds drags
      slackX: 0, slackY: 0,

      // Can only determine if SVG after mounting
      isElementSVG: false
    };
    return _this;
  }

  _createClass(Draggable, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (this.props.position && !(this.props.onDrag || this.props.onStop)) {
        // eslint-disable-next-line
        console.warn('A `position` was applied to this <Draggable>, without drag handlers. This will make this ' + 'component effectively undraggable. Please attach `onDrag` or `onStop` handlers so you can adjust the ' + '`position` of this element.');
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Check to see if the element passed is an instanceof SVGElement
      if (typeof window.SVGElement !== 'undefined' && _reactDom2.default.findDOMNode(this) instanceof window.SVGElement) {
        this.setState({ isElementSVG: true });
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps /*: Object*/) {
      // Set x/y if position has changed
      if (nextProps.position && (!this.props.position || nextProps.position.x !== this.props.position.x || nextProps.position.y !== this.props.position.y)) {
        this.setState({ x: nextProps.position.x, y: nextProps.position.y });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.setState({ dragging: false }); // prevents invariant if unmounted while dragging
    }
  }, {
    key: 'render',
    value: function render() /*: ReactElement<any>*/ {
      var _classNames;

      var style = {},
          svgTransform = null;

      // If this is controlled, we don't want to move it - unless it's dragging.
      var controlled = Boolean(this.props.position);
      var draggable = !controlled || this.state.dragging;

      var position = this.props.position || this.props.defaultPosition;
      var transformOpts = {
        // Set left if horizontal drag is enabled
        x: (0, _positionFns.canDragX)(this) && draggable ? this.state.x : position.x,

        // Set top if vertical drag is enabled
        y: (0, _positionFns.canDragY)(this) && draggable ? this.state.y : position.y
      };

      // If this element was SVG, we use the `transform` attribute.
      if (this.state.isElementSVG) {
        svgTransform = (0, _domFns.createSVGTransform)(transformOpts);
      } else {
        // Add a CSS transform to move the element around. This allows us to move the element around
        // without worrying about whether or not it is relatively or absolutely positioned.
        // If the item you are dragging already has a transform set, wrap it in a <span> so <Draggable>
        // has a clean slate.
        style = (0, _domFns.createCSSTransform)(transformOpts);
      }

      var _props = this.props,
          defaultClassName = _props.defaultClassName,
          defaultClassNameDragging = _props.defaultClassNameDragging,
          defaultClassNameDragged = _props.defaultClassNameDragged;

      // Mark with class while dragging

      var className = (0, _classnames2.default)(this.props.children.props.className || '', defaultClassName, (_classNames = {}, _defineProperty(_classNames, defaultClassNameDragging, this.state.dragging), _defineProperty(_classNames, defaultClassNameDragged, this.state.dragged), _classNames));

      // Reuse the child provided
      // This makes it flexible to use whatever element is wanted (div, ul, etc)
      return _react2.default.createElement(
        _DraggableCore2.default,
        _extends({}, this.props, { onStart: this.onDragStart, onDrag: this.onDrag, onStop: this.onDragStop }),
        _react2.default.cloneElement(_react2.default.Children.only(this.props.children), {
          className: className,
          style: _extends({}, this.props.children.props.style, style),
          transform: svgTransform
        })
      );
    }
  }]);

  return Draggable;
}(_react2.default.Component);

Draggable.displayName = 'Draggable';
Draggable.propTypes = _extends({}, _DraggableCore2.default.propTypes, {

  /**
   * `axis` determines which axis the draggable can move.
   *
   *  Note that all callbacks will still return data as normal. This only
   *  controls flushing to the DOM.
   *
   * 'both' allows movement horizontally and vertically.
   * 'x' limits movement to horizontal axis.
   * 'y' limits movement to vertical axis.
   * 'none' limits all movement.
   *
   * Defaults to 'both'.
   */
  axis: _propTypes2.default.oneOf(['both', 'x', 'y', 'none']),

  /**
   * `bounds` determines the range of movement available to the element.
   * Available values are:
   *
   * 'parent' restricts movement within the Draggable's parent node.
   *
   * Alternatively, pass an object with the following properties, all of which are optional:
   *
   * {left: LEFT_BOUND, right: RIGHT_BOUND, bottom: BOTTOM_BOUND, top: TOP_BOUND}
   *
   * All values are in px.
   *
   * Example:
   *
   * ```jsx
   *   let App = React.createClass({
   *       render: function () {
   *         return (
   *            <Draggable bounds={{right: 300, bottom: 300}}>
   *              <div>Content</div>
   *           </Draggable>
   *         );
   *       }
   *   });
   * ```
   */
  bounds: _propTypes2.default.oneOfType([_propTypes2.default.shape({
    left: _propTypes2.default.number,
    right: _propTypes2.default.number,
    top: _propTypes2.default.number,
    bottom: _propTypes2.default.number
  }), _propTypes2.default.string, _propTypes2.default.oneOf([false])]),

  defaultClassName: _propTypes2.default.string,
  defaultClassNameDragging: _propTypes2.default.string,
  defaultClassNameDragged: _propTypes2.default.string,

  /**
   * `defaultPosition` specifies the x and y that the dragged item should start at
   *
   * Example:
   *
   * ```jsx
   *      let App = React.createClass({
   *          render: function () {
   *              return (
   *                  <Draggable defaultPosition={{x: 25, y: 25}}>
   *                      <div>I start with transformX: 25px and transformY: 25px;</div>
   *                  </Draggable>
   *              );
   *          }
   *      });
   * ```
   */
  defaultPosition: _propTypes2.default.shape({
    x: _propTypes2.default.number,
    y: _propTypes2.default.number
  }),

  /**
   * `position`, if present, defines the current position of the element.
   *
   *  This is similar to how form elements in React work - if no `position` is supplied, the component
   *  is uncontrolled.
   *
   * Example:
   *
   * ```jsx
   *      let App = React.createClass({
   *          render: function () {
   *              return (
   *                  <Draggable position={{x: 25, y: 25}}>
   *                      <div>I start with transformX: 25px and transformY: 25px;</div>
   *                  </Draggable>
   *              );
   *          }
   *      });
   * ```
   */
  position: _propTypes2.default.shape({
    x: _propTypes2.default.number,
    y: _propTypes2.default.number
  }),

  /**
   * These properties should be defined on the child, not here.
   */
  className: _shims.dontSetMe,
  style: _shims.dontSetMe,
  transform: _shims.dontSetMe
});
Draggable.defaultProps = _extends({}, _DraggableCore2.default.defaultProps, {
  axis: 'both',
  bounds: false,
  defaultClassName: 'react-draggable',
  defaultClassNameDragging: 'react-draggable-dragging',
  defaultClassNameDragged: 'react-draggable-dragged',
  defaultPosition: { x: 0, y: 0 },
  position: null
});
exports.default = Draggable;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(1);
var invariant = __webpack_require__(2);
var warning = __webpack_require__(8);

var ReactPropTypesSecret = __webpack_require__(3);
var checkPropTypes = __webpack_require__(15);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (Object({"DRAGGABLE_DEBUG":undefined}).NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (Object({"DRAGGABLE_DEBUG":undefined}).NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      Object({"DRAGGABLE_DEBUG":undefined}).NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      Object({"DRAGGABLE_DEBUG":undefined}).NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplid to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



if (Object({"DRAGGABLE_DEBUG":undefined}).NODE_ENV !== 'production') {
  var invariant = __webpack_require__(2);
  var warning = __webpack_require__(8);
  var ReactPropTypesSecret = __webpack_require__(3);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (Object({"DRAGGABLE_DEBUG":undefined}).NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(1);
var invariant = __webpack_require__(2);
var ReactPropTypesSecret = __webpack_require__(3);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return classNames;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPrefix = getPrefix;
exports.browserPrefixToKey = browserPrefixToKey;
exports.browserPrefixToStyle = browserPrefixToStyle;
var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
function getPrefix() /*: string*/ {
  var prop /*: string*/ = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'transform';

  // Checking specifically for 'window.document' is for pseudo-browser server-side
  // environments that define 'window' as the global context.
  // E.g. React-rails (see https://github.com/reactjs/react-rails/pull/84)
  if (typeof window === 'undefined' || typeof window.document === 'undefined') return '';

  var style = window.document.documentElement.style;

  if (prop in style) return '';

  for (var i = 0; i < prefixes.length; i++) {
    if (browserPrefixToKey(prop, prefixes[i]) in style) return prefixes[i];
  }

  return '';
}

function browserPrefixToKey(prop /*: string*/, prefix /*: string*/) /*: string*/ {
  return prefix ? '' + prefix + kebabToTitleCase(prop) : prop;
}

function browserPrefixToStyle(prop /*: string*/, prefix /*: string*/) /*: string*/ {
  return prefix ? '-' + prefix.toLowerCase() + '-' + prop : prop;
}

function kebabToTitleCase(str /*: string*/) /*: string*/ {
  var out = '';
  var shouldCapitalize = true;
  for (var i = 0; i < str.length; i++) {
    if (shouldCapitalize) {
      out += str[i].toUpperCase();
      shouldCapitalize = false;
    } else if (str[i] === '-') {
      shouldCapitalize = true;
    } else {
      out += str[i];
    }
  }
  return out;
}

// Default export is the prefix itself, like 'Moz', 'Webkit', etc
// Note that you may have to re-test for certain things; for instance, Chrome 50
// can handle unprefixed `transform`, but not unprefixed `user-select`
exports.default = getPrefix();

/***/ }),
/* 19 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ })
/******/ ]);
});
//# sourceMappingURL=react-draggable.js.map

/***/ }),

/***/ 2033:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

exports.default = SubButton;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _styles = __webpack_require__(976);

var _styles2 = _interopRequireDefault(_styles);

var _image = __webpack_require__(624);

var _image2 = _interopRequireDefault(_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SubButton(props) {
  var id = props.id,
      ariaLabel = props.ariaLabel,
      style = props.style,
      onClick = props.onClick,
      icon = props.icon,
      alt = props.alt,
      iconStyle = props.iconStyle,
      _props$position = props.position,
      position = _props$position === undefined ? 'bottom' : _props$position;


  var getStyle = function getStyle() {
    if (position === 'top') {
      return (0, _extends3.default)({}, _styles2.default.subButton, _styles2.default.positionTop, style);
    }
    return (0, _extends3.default)({}, _styles2.default.subButton, _styles2.default.positionBottom, style);
  };

  return _react2.default.createElement(
    'button',
    { type: 'button', id: id, 'aria-label': ariaLabel, style: getStyle(), onClick: onClick },
    !!icon && _react2.default.createElement(_image2.default, { alt: alt, src: icon, style: (0, _extends3.default)({}, _styles2.default.subButtonIcon, iconStyle) })
  );
}
module.exports = exports['default'];

/***/ }),

/***/ 2034:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = __webpack_require__(72);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = ModeTitle;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _ScreenCenterText = __webpack_require__(2212);

var _ScreenCenterText2 = _interopRequireDefault(_ScreenCenterText);

var _get2 = __webpack_require__(3);

var _get3 = _interopRequireDefault(_get2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ModeTitle(props) {
  var id = props.id,
      settings = props.settings,
      style = props.style,
      _props$text = props.text,
      text = _props$text === undefined ? '' : _props$text,
      _props$displayDuratio = props.displayDuration,
      displayDuration = _props$displayDuratio === undefined ? 2000 : _props$displayDuratio;

  var footerConfig = settings.getModuleSetting().getPanel('virtual_tryon', 'footer');

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray3.default)(_useState, 2),
      isShow = _useState2[0],
      setIsShow = _useState2[1];

  var timeoutRef = (0, _react.useRef)(0);

  var getStyle = function getStyle() {
    return (0, _get3.default)(footerConfig, 'configs.position') === 'top' ? (0, _extends3.default)({ top: '20vh' }, style) : style;
  };

  var show = function show() {
    setIsShow(true);
    timeoutRef.current && clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(hide, displayDuration);
  };

  var hide = function hide() {
    setIsShow(false);
    timeoutRef.current && clearTimeout(timeoutRef.current);
    timeoutRef.current = 0;
  };

  (0, _react.useEffect)(function () {
    show();

    return function () {
      timeoutRef.current && clearTimeout(timeoutRef.current);
      timeoutRef.current = 0;
    };
  }, []);

  return _react2.default.createElement(_ScreenCenterText2.default, { id: id, settings: settings, style: (0, _extends3.default)({}, getStyle(), { display: isShow ? 'block' : 'none' }), text: text });
}
module.exports = exports['default'];

/***/ }),

/***/ 2035:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00LjI3NjYgNC41NzQ1NEg2LjUzMDM1TDguNTUyMjQgMi41NzExM0M4Ljg3NzggMi4yMjE2NyA5LjMzODk5IDIgOS44NTYyOSAySDE0LjMwNzZDMTQuNzk1NCAyIDE1LjIzNyAyLjE5NTE5IDE1LjU1ODcgMi41MTA3NUwxNS41NjI2IDIuNTEzOTZDMTUuNTY0MSAyLjUxNTk1IDE1LjU2NTcgMi41MTc0NCAxNS41Njc0IDIuNTE4OTlMMTUuNTY5NCAyLjUyMDk4TDE3LjYzNDQgNC41NzQ1NEgxOS43MjM0QzIxLjUzMyA0LjU3NDU0IDIzIDYuMDQxNTIgMjMgNy44NTExM1YxNy45MTVDMjMgMTkuNzI0NiAyMS41MzMgMjEuMTkxNiAxOS43MjM0IDIxLjE5MTZINC4yNzY2QzIuNDY2OTggMjEuMTkxNiAxIDE5LjcyNDYgMSAxNy45MTVWNy44NTExM0MxIDYuMDQxNTIgMi40NjY5OCA0LjU3NDU0IDQuMjc2NiA0LjU3NDU0Wk0xOC41OTc2IDguNDM2MjNDMTguNTk3NiA5LjAxNzk3IDE5LjA2OSA5LjQ4OTMyIDE5LjY1MSA5LjQ4OTMyQzIwLjIzMjggOS40ODkzMiAyMC43MDQgOS4wMTc5NyAyMC43MDQgOC40MzYyM0MyMC43MDQgNy44NTQ0OSAyMC4yMzI4IDcuMzgyOTQgMTkuNjUxIDcuMzgyOTRDMTkuMDY5IDcuMzgyOTQgMTguNTk3NiA3Ljg1NDQ5IDE4LjU5NzYgOC40MzYyM1pNNi40Mjc1NSAxMi43NjU5QzYuNDI3NTUgOS42Njg3MSA4Ljk0NzU1IDcuMTQ4ODcgMTIuMDQ0NyA3LjE0ODg3QzE1LjE0MTYgNy4xNDg4NyAxNy42NjE2IDkuNjY4NzEgMTcuNjYxNiAxMi43NjU5QzE3LjY2MTYgMTUuODYzMSAxNS4xNDE2IDE4LjM4MjkgMTIuMDQ0NyAxOC4zODI5QzguOTQ3NTUgMTguMzgyOSA2LjQyNzU1IDE1Ljg2MzEgNi40Mjc1NSAxMi43NjU5Wk0xMi4wNDQ1IDE3LjIxMjZDOS41OTI1MSAxNy4yMTI2IDcuNTk3NjQgMTUuMjE4IDcuNTk3NjQgMTIuNzY1OUM3LjU5NzY0IDEwLjMxMzkgOS41OTI1MSA4LjMxOTAxIDEyLjA0NDUgOC4zMTkwMUMxNC40OTY2IDguMzE5MDEgMTYuNDkxMyAxMC4zMTM5IDE2LjQ5MTMgMTIuNzY1OUMxNi40OTEzIDE1LjIxOCAxNC40OTY2IDE3LjIxMjYgMTIuMDQ0NSAxNy4yMTI2WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg=="

/***/ }),

/***/ 2036:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAqCAMAAADPj1gPAAAAM1BMVEUAAAD///////////////////////////////////////////////////////////////+3leKCAAAAEHRSTlMAH2B/EN/vn4+/QG9PMM+v+ev1zwAAAKhJREFUSMft0N0KwjAMhuEvXfrr1O/+r1aMzm5gS7cjwb1HpfAEEpx9TV07aSrx7HTBtqu+H5G9wgZJXuYo+0lFmkhOsGSU6RS4nxVPDrBUnK+sZHKEZQDzwiSSYyw+j23MlhplQYDJmDM0yOjvr3VuZIP1O9nJfoyVeIgJnD/EYPAAg6T9zJK4n1mzXzMNfab45HxlSF0VsUom0mHAZcEmSfVDpRn+rgeZO1CuPvdxJgAAAABJRU5ErkJggg=="

/***/ }),

/***/ 2037:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAMAAAAPzWOAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4BpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3NzU3MEYwRDg5NjIxMUU3OUQxMEZBNDI2RTJENzM4NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowRkJGM0E3NTk4MzUxMUU3OTIyNkYxQ0QxMzg0REYxRSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowRkJGM0E3NDk4MzUxMUU3OTIyNkYxQ0QxMzg0REYxRSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1ZDQ4YzEyZC00NDdmLWUxNGMtYWY3ZC04NzZhM2NjN2QzZjMiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDplNDU2MzMyYS05ODMzLTExZTctOWFhMC04NmI0OGNhYWQ1YTUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7QhAFEAAAA81BMVEXvP3j////0f6X1g6j1jK72jrDvQHnwSoDwRn396fDwR37vQXnvQnr+8PT/+/z5vNDwToPxVYf83ObwTYLvRHz6xNbwR3382eT81uL+9/rvRHv2kbLxUoX+9Pf5tMryYpHvQXr5scj2ja/2mbf3or3xV4n3n7vwSn/vQ3v4r8fxWov95u76u9DwSX/4rcX6x9f6v9LwUIT5t8zzcZv2kLH70+DxU4bxVoj0dp/0gab6wdT2lrXyYpDzapbxW4z3pL/yYZDyX4/wSH7wT4P83+n2k7P4rMX7zdz0d6D5tcv0gKbyZZPzcJryXY3yZZLyXo7////1fjO0AAAAUXRSTlP//////////////////////////////////////////////////////////////////////////////////////////////////////////wBo7KjBAAABzElEQVR42uTY15aCMBQF0IvjhI7Yey9jmd5779X//5p5igYMkFx48zxmZe2lUeBcYJ5AYJ0Qu98eujvu2UNdxyF70w6wMbOHkoh+S4CT07I48qxCULQ3McRpQFhUWwDpQVTOI5E8REerhiK2CSIhlRAkR0AwmUAkB+LJBCBNIoFAjo/wz2NDUTa551LlIQF/jyAEShykDpIIfK8gDkgjMPMjDQSi+ZAyIBCYeBEDhVgeRAcUAvssMkQiKosQJAIMUgQsUl8iUzSiLpEOGiFLBNAIOBSxYyAjilzFQNoU+Y2BuBTJxkA0irjMYtqfD0XZXllML/bXKLLFIIpYFvvHFMnHQAq8M0n586oorZXF1GK/QZHrGAebp0gvBnJPET0G8pLEtdNcIGYSV3EWjRhLpIVGPpl7LCRwj50fIJESi1SQSNfzBCygENP7GC2ikL6vFWwhEMtfLWwEcrLSlN6lkR9OZ3uURCxe8XOIHKJzK6hMF/a0YU+jzkgYd4Hd/lLYGIRMGWUi/V04805VEyCsWdTkdRRp/AnMgHr4h7EqYtNodxxImCPxubjIH2pLE8kJ/Vj1/lLEuMC9K9i9eTIKtZqR/xo46/P+5F+AAQCwkSCj/FD8AQAAAABJRU5ErkJggg=="

/***/ }),

/***/ 2038:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAMAAAAPzWOAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4BpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3NzU3MEYwRDg5NjIxMUU3OUQxMEZBNDI2RTJENzM4NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxNTZCNzU1MDk4MzUxMUU3QUNGRkVGNTE1NzM3M0QzNCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxNTZCNzU0Rjk4MzUxMUU3QUNGRkVGNTE1NzM3M0QzNCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1ZDQ4YzEyZC00NDdmLWUxNGMtYWY3ZC04NzZhM2NjN2QzZjMiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDplNDU2MzMyYS05ODMzLTExZTctOWFhMC04NmI0OGNhYWQ1YTUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz45wtsSAAAA5FBMVEXvP3j////0f6X1jK7vQHnwSoD96fDwR37vQXnwRn3+8PT/+/z5vNDvQnrwToP83ObxVYfwTYLxUoXvRHz82eT+9/r2kbL6xNb81uLwR33vRHvvQXrvQ3v4r8f+9Pf2mbf5scjxWov95u7yYpHwSn/xV4n2ja/3n7v3or3wUITyYZDwSH7zcZvwSX/7zdzyZZL2k7P83+n5t8z0d6DyX4/6x9f6wdTzapb0dp/0gKbxU4bzcJr0gab70+DyYpD3pL/2kLH4rcXwT4PxW4z6v9LyZZP2lrX5tMryXo7yXY3xVoj///88dDxdAAAATHRSTlP///////////////////////////////////////////////////////////////////////////////////////////////////8Ano3kzAAAAa5JREFUeNrk2NWWgzAQBuDZ3eAUSt3d1t3dpe//PnsVCG2AZMJd/8uenO8USWYGWOYQ2CTE7o+n3qH3d1HTccjlsA1szOKZJKK/E+DkriKOnGqQFOtIDHFKkBbNFkBmkJWbTCSA7FjVVMQ2QSSkkYL4BATjJiI+iMdNQHpEAgGfj5gyBpAqDymBXJocpAayuV9DHJDPaBUpIRBrBakAJt04YqCQQgzRAZcPFpkiEY1FCBIBBqljDahFyBCNaBHSRiMkQgAfhyK2AjKnyJcCMqbIsQLiUaSogFgU8Zgfd8QSrm9RZMIgW2IJ13coEiggZd492RZLuN6gyJPCjQ0oMlNA9iiiKyAneeydXoiYeexi/CtrRMg3GrllzljI4Yxd7iKNJos0kMggVgHLKMOMl1Fc0eivdAUTfCmOEMxh/bjWKZ1LG7+cnm0feTExxJGs6jq3BfWlDDeho3YljOfE3v5K2FikTBkVIn0tnHmnaok8l1HW5HWQafwIzIB6+p8pNMSm0UEned/OxefiOn+obXYlJ/QXLf6kiPGA+1bwev1mlFstI/hcOJvz/eRfgAEAn338Dl1Gp9MAAAAASUVORK5CYII="

/***/ }),

/***/ 2046:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = __webpack_require__(40);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(466);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(38);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(39);

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp; /* eslint-disable react/prop-types */


var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(622);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _warning = __webpack_require__(1000);

var _warning2 = _interopRequireDefault(_warning);

var _Track = __webpack_require__(1993);

var _Track2 = _interopRequireDefault(_Track);

var _createSlider = __webpack_require__(1994);

var _createSlider2 = _interopRequireDefault(_createSlider);

var _utils = __webpack_require__(1002);

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Slider = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(Slider, _React$Component);

  function Slider(props) {
    (0, _classCallCheck3.default)(this, Slider);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Slider.__proto__ || (0, _getPrototypeOf2.default)(Slider)).call(this, props));

    _this.onEnd = function () {
      _this.setState({ dragging: false });
      _this.removeDocumentEvents();
      _this.props.onAfterChange(_this.getValue());
    };

    var defaultValue = props.defaultValue !== undefined ? props.defaultValue : props.min;
    var value = props.value !== undefined ? props.value : defaultValue;

    _this.state = {
      value: _this.trimAlignValue(value),
      dragging: false
    };
    if (utils.isDev()) {
      (0, _warning2.default)(!('minimumTrackStyle' in props), 'minimumTrackStyle will be deprecate, please use trackStyle instead.');
      (0, _warning2.default)(!('maximumTrackStyle' in props), 'maximumTrackStyle will be deprecate, please use railStyle instead.');
    }
    return _this;
  }

  (0, _createClass3.default)(Slider, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          autoFocus = _props.autoFocus,
          disabled = _props.disabled;

      if (autoFocus && !disabled) {
        this.focus();
      }
    }
  }, {
    key: 'UNSAFE_componentWillReceiveProps',
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (!('value' in nextProps || 'min' in nextProps || 'max' in nextProps)) return;

      var prevValue = this.state.value;
      var value = nextProps.value !== undefined ? nextProps.value : prevValue;
      var nextValue = this.trimAlignValue(value, nextProps);
      if (nextValue === prevValue) return;

      this.setState({ value: nextValue });
      if (utils.isValueOutOfRange(value, nextProps)) {
        this.props.onChange(nextValue);
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      var props = this.props;
      var isNotControlled = !('value' in props);
      if (isNotControlled) {
        this.setState(state);
      }

      var changedValue = state.value;
      props.onChange(changedValue);
    }
  }, {
    key: 'onStart',
    value: function onStart(position) {
      this.setState({ dragging: true });
      var props = this.props;
      var prevValue = this.getValue();
      props.onBeforeChange(prevValue);

      var value = this.calcValueByPos(position);
      this.startValue = value;
      this.startPosition = position;

      if (value === prevValue) return;

      this.prevMovedHandleIndex = 0;

      this.onChange({ value: value });
    }
  }, {
    key: 'onMove',
    value: function onMove(e, position) {
      utils.pauseEvent(e);
      var oldValue = this.state.value;

      var value = this.calcValueByPos(position);
      if (value === oldValue) return;

      this.onChange({ value: value });
    }
  }, {
    key: 'onKeyboard',
    value: function onKeyboard(e) {
      var valueMutator = utils.getKeyboardValueMutator(e);

      if (valueMutator) {
        utils.pauseEvent(e);
        var state = this.state;
        var oldValue = state.value;
        var mutatedValue = valueMutator(oldValue, this.props);
        var value = this.trimAlignValue(mutatedValue);
        if (value === oldValue) return;

        this.onChange({ value: value });
      }
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.state.value;
    }
  }, {
    key: 'getLowerBound',
    value: function getLowerBound() {
      return this.props.min;
    }
  }, {
    key: 'getUpperBound',
    value: function getUpperBound() {
      return this.state.value;
    }
  }, {
    key: 'trimAlignValue',
    value: function trimAlignValue(v) {
      var nextProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (v === null) {
        return null;
      }

      var mergedProps = (0, _extends3.default)({}, this.props, nextProps);
      var val = utils.ensureValueInRange(v, mergedProps);
      return utils.ensureValuePrecision(val, mergedProps);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          prefixCls = _props2.prefixCls,
          vertical = _props2.vertical,
          included = _props2.included,
          disabled = _props2.disabled,
          minimumTrackStyle = _props2.minimumTrackStyle,
          trackStyle = _props2.trackStyle,
          handleStyle = _props2.handleStyle,
          tabIndex = _props2.tabIndex,
          min = _props2.min,
          max = _props2.max,
          handleGenerator = _props2.handle,
          ariaLabelForHandle = _props2.ariaLabelForHandle,
          ariaValueTextForHandle = _props2.ariaValueTextForHandle,
          needA11ySliderRole = _props2.needA11ySliderRole;
      var _state = this.state,
          value = _state.value,
          dragging = _state.dragging;

      var offset = this.calcOffset(value);
      var handle = handleGenerator({
        className: prefixCls + '-handle',
        prefixCls: prefixCls,
        vertical: vertical,
        offset: offset,
        value: value,
        dragging: dragging,
        disabled: disabled,
        min: min,
        max: max,
        index: 0,
        tabIndex: tabIndex,
        style: handleStyle[0] || handleStyle,
        ariaLabelForHandle: ariaLabelForHandle,
        ariaValueTextForHandle: ariaValueTextForHandle,
        needA11ySliderRole: needA11ySliderRole,
        ref: function ref(h) {
          return _this2.saveHandle(0, h);
        }
      });

      var _trackStyle = trackStyle[0] || trackStyle;
      var track = _react2.default.createElement(_Track2.default, {
        className: prefixCls + '-track',
        vertical: vertical,
        included: included,
        offset: 0,
        length: offset,
        style: (0, _extends3.default)({}, minimumTrackStyle, _trackStyle)
      });

      return { tracks: track, handles: handle };
    }
  }]);
  return Slider;
}(_react2.default.Component), _class.propTypes = {
  defaultValue: _propTypes2.default.number,
  value: _propTypes2.default.number,
  disabled: _propTypes2.default.bool,
  autoFocus: _propTypes2.default.bool,
  tabIndex: _propTypes2.default.number,
  min: _propTypes2.default.number,
  max: _propTypes2.default.number
}, _temp);
exports.default = (0, _createSlider2.default)(Slider);
module.exports = exports['default'];

/***/ }),

/***/ 2047:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * apng-canvas v2.1.2
 * https://github.com/davidmz/apng-canvas
 * API:
 *
 * ifNeeded([ignoreNativeAPNG bool]) → Promise()
 * animateImage(img HTMLImageElement) → Promise()
 *
 * animateContext(url String, CanvasRenderingContext2D context) → Promise(Animation)
 * parseBuffer(ArrayBuffer) → Promise(Animation)
 * parseURL(url String) → Promise(Animation)
 * checkNativeFeatures() → Promise(features)
 */


var support = __webpack_require__(2292);
var parseAPNG = __webpack_require__(2294);
var loadUrl = __webpack_require__(2297);

var APNG = {};
module.exports = APNG;

APNG.checkNativeFeatures = support.checkNativeFeatures;
APNG.ifNeeded = support.ifNeeded;

/**
 * @param {ArrayBuffer} buffer
 * @return {Promise}
 */
APNG.parseBuffer = function (buffer) {
    return parseAPNG(buffer);
};

var url2promise = {};
/**
 * @param {String} url
 * @return {Promise}
 */
APNG.parseURL = function (url) {
    if (!(url in url2promise)) url2promise[url] = loadUrl(url).then(parseAPNG);
    return url2promise[url];
};

/**
 * @param {String} url
 * @param {CanvasRenderingContext2D} context
 * @return {Promise}
 */
APNG.animateContext = function (url, context) {
    return APNG.parseURL(url).then(function (a) {
        a.addContext(context);
        a.play();
        return a;
    });
};

/**
 * @param {HTMLImageElement} img
 * @return {Promise}
 */
APNG.animateImage = function (img) {
    img.setAttribute("data-is-apng", "progress");
    return APNG.parseURL(img.src).then(function (anim) {
        img.setAttribute("data-is-apng", "yes");
        var canvas = document.createElement("canvas");
        canvas.width = anim.width;
        canvas.height = anim.height;
        Array.prototype.slice.call(img.attributes).forEach(function (attr) {
            if (["alt", "src", "usemap", "ismap", "data-is-apng", "width", "height"].indexOf(attr.nodeName) == -1) {
                canvas.setAttributeNode(attr.cloneNode(false));
            }
        });
        canvas.setAttribute("data-apng-src", img.src);
        if (img.alt != "") canvas.appendChild(document.createTextNode(img.alt));

        var imgWidth = "",
            imgHeight = "",
            val = 0,
            unit = "";

        if (img.style.width != "" && img.style.width != "auto") {
            imgWidth = img.style.width;
        } else if (img.hasAttribute("width")) {
            imgWidth = img.getAttribute("width") + "px";
        }
        if (img.style.height != "" && img.style.height != "auto") {
            imgHeight = img.style.height;
        } else if (img.hasAttribute("height")) {
            imgHeight = img.getAttribute("height") + "px";
        }
        if (imgWidth != "" && imgHeight == "") {
            val = parseFloat(imgWidth);
            unit = imgWidth.match(/\D+$/)[0];
            imgHeight = Math.round(canvas.height * val / canvas.width) + unit;
        }
        if (imgHeight != "" && imgWidth == "") {
            val = parseFloat(imgHeight);
            unit = imgHeight.match(/\D+$/)[0];
            imgWidth = Math.round(canvas.width * val / canvas.height) + unit;
        }
        canvas.style.width = imgWidth;
        canvas.style.height = imgHeight;

        var p = img.parentNode;
        p.insertBefore(canvas, img);
        p.removeChild(img);
        anim.addContext(canvas.getContext("2d"));
        anim.play();
    }, function () {
        img.setAttribute("data-is-apng", "no");
    });
};

/**
 * @param {HTMLCanvasElement} canvas
 * @return {void}
 */
APNG.releaseCanvas = function (canvas) {
    var ctx = canvas.getContext("2d");
    if ('_apng_animation' in ctx) {
        ctx['_apng_animation'].removeContext(ctx);
    }
};

/***/ }),

/***/ 2189:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  indicator: {
    position: 'absolute',
    left: '50%',
    top: 0,
    width: '2px',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    marginLeft: '-1px',
    cursor: 'ew-resize',
    display: 'none',
    resize: 'horizontal',
    zIndex: 5
  },
  indicatorButtons: {
    top: '80%',
    position: 'absolute'
  },
  indicatorThumb: {
    position: 'absolute',
    zIndex: 0,
    height: '34px',
    width: '34px',
    marginLeft: '-19px',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    border: '2px solid transparent',
    borderRadius: '50%'
  },
  hiddenRangeInput: {
    position: 'absolute',
    zIndex: -1,
    left: '-19px',
    top: 0,
    width: '38px',
    height: '38px'
  },
  compareBeforeAfter: {
    position: 'absolute',
    zIndex: 3,
    top: '20%',
    width: '100px',
    textAlign: 'center',
    marginLeft: '-50px',
    fontSize: '32px',
    color: 'white',
    textShadow: '1px 1px 2px rgb(0 0 0 / 70%)'
  },
  compareCaption: {
    zIndex: 3,
    position: 'fixed',
    top: '30%',
    width: '100%',
    height: '40px',
    left: 0
  },
  compareCaption2: {
    zIndex: 3,
    position: 'fixed',
    top: '26%',
    width: '100%',
    left: 0
  },
  compareCaptionText: {
    position: 'absolute',
    width: '100px',
    transform: 'translateX(-50%)',
    lineHeight: '40px',
    textAlign: 'center',
    fontSize: '30px',
    color: 'white',
    textShadow: '1px 1px #aaa'
  },
  compareCaptionText2: {
    position: 'absolute',
    width: '100px',
    height: '40px',
    lineHeight: '40px',
    transform: 'translateX(-50%)',
    textAlign: 'center',
    fontSize: '28px',
    color: 'white',
    textShadow: '0 1px 1px rgba(0,0,0,0.7)',
    left: '50%'
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 2190:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  indicator: {
    cursor: 'default'
  },
  indicatorButton: {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: '38px 38px',
    height: '38px',
    width: '38px',
    border: 0,
    backgroundColor: 'transparent'
  },
  hiddenRangeInput: {
    position: 'absolute',
    zIndex: -1,
    left: '-53px',
    top: 0,
    width: '106px',
    height: '38px'
  },
  compareBeforeAfter: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: '4px'
  },
  compareCaptionText: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: '4px'
  },
  compareCaptionText2: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: '4px'
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 2191:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAP1BMVEUAAAD////////////////////////////////////////////////////////+8/f0X5H5nbvyO3f+5+70U4hZdbz0AAAADnRSTlMAgO8gYN8Qz7+Qr59Qj/TJvxQAAAD3SURBVEjHnZVZbsMwDERpLpK8ZNLt/mctCjQIElqKJu/7DSjCxlASxS9bKIBoFzd5QVkaHqhuQ12R2buRm55YTnWr6BKWfVcM0CM9By9Ykk8lDkzgd98UE+h988AUNS0wuYbhnOt3elSRP/aO//FzPR1hPf/rE6cjfOznEZXw0USM8YEiTvlwWSkfqzTKxyZB+QjhfKhwPsAHlEzwS2+gEo3+cPyvUUAlTKQxiZoqICVyNxUlEpZaZlwCu0gaMaoZGF1k/1RMEe+XsTgmONiDQp+sJ47xUXRJWKBLtaSPnqWLdLD9VC/Sx7zigZb1nFlbANDYVs/2L0REYmWGNGE2AAAAAElFTkSuQmCC"

/***/ }),

/***/ 2192:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAP1BMVEUAAAD////////////////////////////////////////////////////////+8/f0YJH5nbvyO3f95+70U4gioz4YAAAADnRSTlMAgO8gYN8Qz7+Qr59Qj/TJvxQAAAD8SURBVEjHnZXbjsMgDESNsYFcOt3b/3/rStVK2caBMj3Pc2RbiQYJFLutrgC83SzLC0pqeKJaHsYVka2rJMU16TKeK7r4xRBTDNA9rIMXpJCnjB0T2L97dUbQ43LHFDUcMHlGxpnve2ep8hA2nLj/fHSMdD0An1+HEUcYhkYcUUEY7bERYxQxUIbJAspYpIEyVnFQhgtAGSogDV5QLg/+6JXKo9Efjv81CpVHFmlMvoYKCPnYTUXn88ihZcYlsImEEaOaQaaL7I+KKfz9MhabEXb2QaGfrBP7+FE0CWRHl3rcO7OWJumQt8t4kT7ZTh+xxXh0luYA1NfFYvoXQcxiZft3NZYAAAAASUVORK5CYII="

/***/ }),

/***/ 2193:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

exports.default = ActionButtonPanel;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _get2 = __webpack_require__(3);

var _get3 = _interopRequireDefault(_get2);

var _includes2 = __webpack_require__(120);

var _includes3 = _interopRequireDefault(_includes2);

var _ActionButton = __webpack_require__(1991);

var _ActionButton2 = _interopRequireDefault(_ActionButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ActionButtonPanel(props) {
  var settings = props.settings,
      _props$comparing = props.comparing,
      comparing = _props$comparing === undefined ? false : _props$comparing,
      _props$fourWayCompari = props.fourWayComparing,
      fourWayComparing = _props$fourWayCompari === undefined ? false : _props$fourWayCompari,
      canReset = props.canReset,
      canZoom = props.canZoom,
      canCompare = props.canCompare,
      canFourWay = props.canFourWay,
      onResetClick = props.onResetClick,
      onZoomInClick = props.onZoomInClick,
      onZoomOutClick = props.onZoomOutClick,
      onCompareClick = props.onCompareClick,
      onCompareOffClick = props.onCompareOffClick,
      onFourWayClick = props.onFourWayClick,
      onFourWayOffClick = props.onFourWayOffClick,
      zoomInDisabled = props.zoomInDisabled,
      zoomOutDisabled = props.zoomOutDisabled,
      compareDisabled = props.compareDisabled,
      fourWayDisabled = props.fourWayDisabled;

  var actionConfig = settings.getModuleSetting().getPanel('common', 'right');

  var ResetBlock = function ResetBlock() {
    if (settings.hideResetButton || !canReset) {
      return false;
    }
    return _react2.default.createElement(_ActionButton2.default, {
      id: 'reset',
      img: (0, _get3.default)(actionConfig, 'blocks.reset.configs.imgSrc') || __webpack_require__(2194),
      style: (0, _extends3.default)({}, (0, _get3.default)(actionConfig, 'blocks.reset.styles'), { borderRadius: (0, _get3.default)(actionConfig, 'styles.borderRadius') || '50%' }),
      ariaLabel: settings.i18n.getMessage('a11y.label.reset'),
      key: settings.i18n.getMessage('a11y.label.reset'),
      onClick: onResetClick
    });
  };

  var ZoomBlock = function ZoomBlock() {
    if (!canZoom) {
      return false;
    }
    return _react2.default.createElement(
      'div',
      { key: 'zoom' },
      _react2.default.createElement(_ActionButton2.default, {
        id: 'zoom-in',
        img: (0, _get3.default)(actionConfig, 'blocks.zoom_in.configs.imgSrc') || __webpack_require__(2195),
        style: (0, _extends3.default)({}, (0, _get3.default)(actionConfig, 'blocks.zoom_in.styles'), { borderRadius: (0, _get3.default)(actionConfig, 'styles.borderRadius') || '50%' }),
        ariaLabel: settings.i18n.getMessage('a11y.label.zoom.in'),
        key: settings.i18n.getMessage('a11y.label.zoom.in'),
        disabled: zoomInDisabled,
        onClick: onZoomInClick
      }),
      _react2.default.createElement(_ActionButton2.default, {
        id: 'zoom-out',
        img: (0, _get3.default)(actionConfig, 'blocks.zoom_out.configs.imgSrc') || __webpack_require__(2196),
        style: (0, _extends3.default)({}, (0, _get3.default)(actionConfig, 'blocks.zoom_out.styles'), { borderRadius: (0, _get3.default)(actionConfig, 'styles.borderRadius') || '50%' }),
        ariaLabel: settings.i18n.getMessage('a11y.label.zoom.out'),
        key: settings.i18n.getMessage('a11y.label.zoom.out'),
        disabled: zoomOutDisabled,
        onClick: onZoomOutClick
      })
    );
  };

  var CompareBlock = function CompareBlock() {
    if (!canCompare) {
      return false;
    }
    if (comparing) {
      return _react2.default.createElement(_ActionButton2.default, {
        id: 'disable-compare',
        img: (0, _get3.default)(actionConfig, 'blocks.compare.configs.offImgSrc') || __webpack_require__(2197),
        style: (0, _extends3.default)({}, (0, _get3.default)(actionConfig, 'blocks.compare.styles'), { borderRadius: (0, _get3.default)(actionConfig, 'styles.borderRadius') || '50%' }),
        ariaLabel: settings.i18n.getMessage('a11y.label.compare.off'),
        key: settings.i18n.getMessage('a11y.label.compare.off'),
        disabled: compareDisabled,
        onClick: onCompareOffClick
      });
    }
    return _react2.default.createElement(_ActionButton2.default, {
      id: 'enable-compare',
      img: (0, _get3.default)(actionConfig, 'blocks.compare.configs.imgSrc') || __webpack_require__(2198),
      style: (0, _extends3.default)({}, (0, _get3.default)(actionConfig, 'blocks.compare.styles'), { borderRadius: (0, _get3.default)(actionConfig, 'styles.borderRadius') || '50%' }),
      ariaLabel: settings.i18n.getMessage('a11y.label.compare.on'),
      key: settings.i18n.getMessage('a11y.label.compare.on'),
      disabled: compareDisabled,
      onClick: onCompareClick
    });
  };

  var FourWayBlock = function FourWayBlock() {
    if (!canFourWay) {
      return false;
    }
    if (fourWayComparing) {
      return _react2.default.createElement(_ActionButton2.default, {
        id: 'disable-fourway',
        img: (0, _get3.default)(actionConfig, 'blocks.fourway.configs.offImgSrc') || __webpack_require__(2199),
        style: (0, _extends3.default)({}, (0, _get3.default)(actionConfig, 'blocks.fourway.styles'), { borderRadius: (0, _get3.default)(actionConfig, 'styles.borderRadius') || '50%' }),
        ariaLabel: settings.i18n.getMessage('a11y.label.4way.off'),
        key: settings.i18n.getMessage('a11y.label.4way.off'),
        disabled: fourWayDisabled,
        onClick: onFourWayOffClick
      });
    }
    return _react2.default.createElement(_ActionButton2.default, {
      id: 'enable-fourway',
      img: (0, _get3.default)(actionConfig, 'blocks.fourway.configs.imgSrc') || __webpack_require__(2200),
      style: (0, _extends3.default)({}, (0, _get3.default)(actionConfig, 'blocks.fourway.styles'), { borderRadius: (0, _get3.default)(actionConfig, 'styles.borderRadius') || '50%' }),
      ariaLabel: settings.i18n.getMessage('a11y.label.4way.on'),
      key: settings.i18n.getMessage('a11y.label.4way.on'),
      disabled: fourWayDisabled,
      onClick: onFourWayClick
    });
  };

  if (settings.hideButtonsOnResult || settings.hideRightButtonsOnResult) {
    return false;
  }
  var enabledButtons = (0, _get3.default)(actionConfig, 'configs.enabledButtons', []);
  return _react2.default.createElement(
    'div',
    null,
    (0, _includes3.default)(enabledButtons, 'reset') && ResetBlock(),
    (0, _includes3.default)(enabledButtons, 'zoom') && ZoomBlock(),
    (0, _includes3.default)(enabledButtons, 'compare') && CompareBlock(),
    settings.enableFourWayLooks && FourWayBlock()
  );
}
module.exports = exports['default'];

/***/ }),

/***/ 2194:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDciIGhlaWdodD0iNDciIHZpZXdCb3g9IjAgMCA0NyA0NyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMy43NzA3IDcuODgwODhDMjYuOTg2NCA3Ljc0MDA4IDMwLjE3MTggOC41NTU5OCAzMi45MjM4IDEwLjIyNTVDMzUuNjc1OSAxMS44OTUgMzcuODcxIDE0LjM0MzEgMzkuMjMxNyAxNy4yNjAyQzQwLjU5MjQgMjAuMTc3MyA0MS4wNTc2IDIzLjQzMjQgNDAuNTY4MyAyNi42MTM4QzQwLjA3OTEgMjkuNzk1MiAzOC42NTczIDMyLjc2MDIgMzYuNDgyOSAzNS4xMzM2QzM0LjMwODYgMzcuNTA3MSAzMS40Nzk0IDM5LjE4MjQgMjguMzUyOSAzOS45NDc5QzI1LjIyNzYgNDAuNzEzIDIxLjk0NTUgNDAuNTM0NyAxOC45MjE2IDM5LjQzNTNDMTYuODMzIDM4LjY1NjYgMTQuOTE3NyAzNy40NzQ4IDEzLjI4NSAzNS45NTcyQzEyLjg4MDUgMzUuNTgxMiAxMi4yNDc3IDM1LjYwNDMgMTEuODcxNyAzNi4wMDg4QzExLjQ5NTcgMzYuNDEzMyAxMS41MTg4IDM3LjA0NjEgMTEuOTIzMyAzNy40MjIxQzEzLjc0OTIgMzkuMTE5MyAxNS44OTEyIDQwLjQ0MDYgMTguMjI3MiA0MS4zMTA4TDE4LjIyNzIgNDEuMzEwOUwxOC4yMzQ0IDQxLjMxMzVDMjEuNjMxIDQyLjU0OTIgMjUuMzE3OCA0Mi43NSAyOC44Mjg1IDQxLjg5MDVDMzIuMzM5MiA0MS4wMzEgMzUuNTE2MSAzOS4xNDk3IDM3Ljk1NzcgMzYuNDg0NkM0MC4zOTkyIDMzLjgxOTUgNDEuOTk1NyAzMC40OTAyIDQyLjU0NTEgMjYuOTE3OEM0My4wOTQ1IDIzLjM0NTQgNDIuNTcyMSAxOS42OTAzIDQxLjA0NDIgMTYuNDE0N0MzOS41MTYzIDEzLjEzOTIgMzcuMDUxNCAxMC4zOTAyIDMzLjk2MTIgOC41MTU1MkMzMC44NzA5IDYuNjQwODQgMjcuMjk0MSA1LjcyNDY5IDIzLjY4MzIgNS44ODI3OUMyMC4wNzIyIDYuMDQwOSAxNi41ODk0IDcuMjY2MTkgMTMuNjc0OCA5LjQwMzc4QzExLjEwNTYgMTEuMjg4MSA5LjA3OTcgMTMuODA2OCA3Ljc4OTE5IDE2LjcwMzhMNC4zNDQxMSAxNS40NTA0TDUuMTc2MzUgMjAuMTcyNkw2LjAwNjg1IDI0Ljg5NDVMOS42ODA3NSAyMS44MTE1TDEzLjM1MjkgMTguNzI4MUw5LjY3Mzg2IDE3LjM4OTVDMTAuODI1NCAxNC44NjM0IDEyLjYwNzUgMTIuNjY2OCAxNC44NTc2IDExLjAxNjVDMTcuNDUzMiA5LjExMjg3IDIwLjU1NDkgOC4wMjE2OCAyMy43NzA3IDcuODgwODhaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K"

/***/ }),

/***/ 2195:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDciIGhlaWdodD0iNDciIHZpZXdCb3g9IjAgMCA0NyA0NyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNC42NjY2IDYuOTk5ODhDMjQuNjY2NiA2LjQ0NzU5IDI0LjIxODkgNS45OTk4OCAyMy42NjY2IDUuOTk5ODhDMjMuMTE0NCA1Ljk5OTg4IDIyLjY2NjYgNi40NDc1OSAyMi42NjY2IDYuOTk5ODhWMjNINi42NjY1M0M2LjExNDI0IDIzIDUuNjY2NTMgMjMuNDQ3NyA1LjY2NjUzIDI0QzUuNjY2NTMgMjQuNTUyMyA2LjExNDI0IDI1IDYuNjY2NTMgMjVIMjIuNjY2NlY0MC45OTk5QzIyLjY2NjYgNDEuNTUyMiAyMy4xMTQ0IDQxLjk5OTkgMjMuNjY2NiA0MS45OTk5QzI0LjIxODkgNDEuOTk5OSAyNC42NjY2IDQxLjU1MjIgMjQuNjY2NiA0MC45OTk5VjI1SDQwLjY2NjVDNDEuMjE4OCAyNSA0MS42NjY1IDI0LjU1MjMgNDEuNjY2NSAyNEM0MS42NjY1IDIzLjQ0NzcgNDEuMjE4OCAyMyA0MC42NjY1IDIzSDI0LjY2NjZWNi45OTk4OFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo="

/***/ }),

/***/ 2196:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDciIGhlaWdodD0iNDciIHZpZXdCb3g9IjAgMCA0NyA0NyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01IDI0QzUgMjMuNDQ3NyA1LjQ0NzcyIDIzIDYgMjNINDBDNDAuNTUyMyAyMyA0MSAyMy40NDc3IDQxIDI0QzQxIDI0LjU1MjMgNDAuNTUyMyAyNSA0MCAyNUg2QzUuNDQ3NzIgMjUgNSAyNC41NTIzIDUgMjRaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K"

/***/ }),

/***/ 2197:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDciIGhlaWdodD0iNDciIHZpZXdCb3g9IjAgMCA0NyA0NyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01IDEyQzUgMTEuNDQ3NyA1LjQ0NzcyIDExIDYgMTFINDBDNDAuNTUyMyAxMSA0MSAxMS40NDc3IDQxIDEyVjM2QzQxIDM2LjU1MjMgNDAuNTUyMyAzNyA0MCAzN0g2QzUuNDQ3NzIgMzcgNSAzNi41NTIzIDUgMzZWMTJaTTcgMTNWMzVIMzlWMTNIN1oiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo="

/***/ }),

/***/ 2198:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDciIGhlaWdodD0iNDciIHZpZXdCb3g9IjAgMCA0NyA0NyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01IDExLjU1NTZDNSAxMS4wMDMzIDUuNDQ3NzIgMTAuNTU1NiA2IDEwLjU1NTZIMTkuMjIyMlYxMi41NTU2SDdWMzUuMTExMkgxOS4yMjIyVjM3LjExMTJINkM1LjQ0NzcyIDM3LjExMTIgNSAzNi42NjM0IDUgMzYuMTExMlYxMS41NTU2WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zOC44OTgxIDM1LjEwNzRWMzIuMzI5N0g0MC44OTgxVjM2LjEwNzRDNDAuODk4MSAzNi42NTk3IDQwLjQ1MDQgMzcuMTA3NCAzOS44OTgxIDM3LjEwNzRIMzYuMTIwM1YzNS4xMDc0SDM4Ljg5ODFaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTM2LjEyMDMgMTAuNTUxOUgzOS44OTgxQzQwLjQ1MDQgMTAuNTUxOSA0MC44OTgxIDEwLjk5OTYgNDAuODk4MSAxMS41NTE5VjE1LjMyOTdIMzguODk4MVYxMi41NTE5SDM2LjEyMDNWMTAuNTUxOVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMzIuNDQ0NCAxMi41NTU2SDI2Ljc3NzhWMTAuNTU1NkgzMi40NDQ0VjEyLjU1NTZaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTMyLjQ0NDQgMzcuMTExMUgyNi43Nzc4VjM1LjExMTFIMzIuNDQ0NFYzNy4xMTExWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zOC44OTgxIDI4LjMxOTVWMjAuNzYzOUg0MC44OTgxVjI4LjMxOTVIMzguODk4MVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjMgM0MyMy41NTIzIDMgMjQgMy40NDc3MiAyNCA0VjQyLjkxMTFDMjQgNDMuNDYzNCAyMy41NTIzIDQzLjkxMTEgMjMgNDMuOTExMUMyMi40NDc3IDQzLjkxMTEgMjIgNDMuNDYzNCAyMiA0Mi45MTExVjRDMjIgMy40NDc3MiAyMi40NDc3IDMgMjMgM1oiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo="

/***/ }),

/***/ 2199:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDciIGhlaWdodD0iNDciIHZpZXdCb3g9IjAgMCA0NyA0NyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik03IDguOTQ0NDRDNyA4LjQyMjg0IDcuNDIyODQgOCA3Ljk0NDQ0IDhIMzcuOTQ0NEMzOC40NjYgOCAzOC44ODg5IDguNDIyODQgMzguODg4OSA4Ljk0NDQ0VjM4Ljk0NDRDMzguODg4OSAzOS40NjYgMzguNDY2IDM5Ljg4ODkgMzcuOTQ0NCAzOS44ODg5SDcuOTQ0NDRDNy40MjI4NCAzOS44ODg5IDcgMzkuNDY2IDcgMzguOTQ0NFY4Ljk0NDQ0Wk04Ljg4ODg5IDkuODg4ODlWMzhIMzdWOS44ODg4OUg4Ljg4ODg5WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg=="

/***/ }),

/***/ 2200:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDciIGhlaWdodD0iNDciIHZpZXdCb3g9IjAgMCA0NyA0NyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcuODg4ODUgOC44ODg5OEgyMS4xMTExVjIyLjExMTJINy44ODg4NVY4Ljg4ODk4WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02Ljk0NDQgOC44ODg5NkM2Ljk0NDQgOC4zNjczNiA3LjM2NzI0IDcuOTQ0NTIgNy44ODg4NCA3Ljk0NDUySDIxLjExMTFDMjEuNjMyNyA3Ljk0NDUyIDIyLjA1NTUgOC4zNjczNiAyMi4wNTU1IDguODg4OTZWMjIuMTExMkMyMi4wNTU1IDIyLjYzMjggMjEuNjMyNyAyMy4wNTU2IDIxLjExMTEgMjMuMDU1Nkg3Ljg4ODg0QzcuMzY3MjQgMjMuMDU1NiA2Ljk0NDQgMjIuNjMyOCA2Ljk0NDQgMjIuMTExMlY4Ljg4ODk2Wk04LjgzMzI5IDkuODMzNDFWMjEuMTY2N0gyMC4xNjY2VjkuODMzNDFIOC44MzMyOVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNi45NDQ0IDI1Ljg4OUM2Ljk0NDQgMjUuMzY3NCA3LjM2NzI0IDI0Ljk0NDUgNy44ODg4NCAyNC45NDQ1SDIxLjExMTFDMjEuNjMyNyAyNC45NDQ1IDIyLjA1NTUgMjUuMzY3NCAyMi4wNTU1IDI1Ljg4OVYzOS4xMTEyQzIyLjA1NTUgMzkuNjMyOCAyMS42MzI3IDQwLjA1NTYgMjEuMTExMSA0MC4wNTU2SDcuODg4ODRDNy4zNjcyNCA0MC4wNTU2IDYuOTQ0NCAzOS42MzI4IDYuOTQ0NCAzOS4xMTEyVjI1Ljg4OVpNOC44MzMyOSAyNi44MzM0VjM4LjE2NjdIMjAuMTY2NlYyNi44MzM0SDguODMzMjlaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTIzLjk0NDQgOC44ODg5NkMyMy45NDQ0IDguMzY3MzYgMjQuMzY3MiA3Ljk0NDUyIDI0Ljg4ODggNy45NDQ1MkgzOC4xMTExQzM4LjYzMjcgNy45NDQ1MiAzOS4wNTU1IDguMzY3MzYgMzkuMDU1NSA4Ljg4ODk2VjIyLjExMTJDMzkuMDU1NSAyMi42MzI4IDM4LjYzMjcgMjMuMDU1NiAzOC4xMTExIDIzLjA1NTZIMjQuODg4OEMyNC4zNjcyIDIzLjA1NTYgMjMuOTQ0NCAyMi42MzI4IDIzLjk0NDQgMjIuMTExMlY4Ljg4ODk2Wk0yNS44MzMzIDkuODMzNDFWMjEuMTY2N0gzNy4xNjY2VjkuODMzNDFIMjUuODMzM1oiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjMuOTQ0NCAyNS44ODlDMjMuOTQ0NCAyNS4zNjc0IDI0LjM2NzIgMjQuOTQ0NSAyNC44ODg4IDI0Ljk0NDVIMzguMTExMUMzOC42MzI3IDI0Ljk0NDUgMzkuMDU1NSAyNS4zNjc0IDM5LjA1NTUgMjUuODg5VjM5LjExMTJDMzkuMDU1NSAzOS42MzI4IDM4LjYzMjcgNDAuMDU1NiAzOC4xMTExIDQwLjA1NTZIMjQuODg4OEMyNC4zNjcyIDQwLjA1NTYgMjMuOTQ0NCAzOS42MzI4IDIzLjk0NDQgMzkuMTExMlYyNS44ODlaTTI1LjgzMzMgMjYuODMzNFYzOC4xNjY3SDM3LjE2NjZWMjYuODMzNEgyNS44MzMzWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg=="

/***/ }),

/***/ 2201:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

exports.default = ShareMenuButton;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _get2 = __webpack_require__(3);

var _get3 = _interopRequireDefault(_get2);

var _styles = __webpack_require__(998);

var _styles2 = _interopRequireDefault(_styles);

var _MenuButton = __webpack_require__(2202);

var _MenuButton2 = _interopRequireDefault(_MenuButton);

var _ActionButton = __webpack_require__(1991);

var _ActionButton2 = _interopRequireDefault(_ActionButton);

var _shareUtils = __webpack_require__(954);

var _shareUtils2 = _interopRequireDefault(_shareUtils);

var _useLoadEngine = __webpack_require__(629);

var _context = __webpack_require__(567);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ShareMenuButton(props) {
  var settings = props.settings,
      disabled = props.disabled,
      shareDisabled = props.shareDisabled,
      opened = props.opened,
      openMenu = props.openMenu,
      closeMenu = props.closeMenu,
      onEmailClick = props.onEmailClick,
      onSMSClick = props.onSMSClick,
      onWeiboClick = props.onWeiboClick,
      onPinterestClick = props.onPinterestClick,
      onTwitterClick = props.onTwitterClick,
      onWhatsAppClick = props.onWhatsAppClick,
      onFBClick = props.onFBClick,
      onSavePhotoClick = props.onSavePhotoClick;

  var _useContext = (0, _react.useContext)(_context.EngineContext),
      engineType = _useContext.engineType;

  var _previewing = engineType === _useLoadEngine.engineTypes.previewfake;
  var shareConfig = settings.getModuleSetting().getPanel('common', 'right');

  var isEmailEnabled = function isEmailEnabled() {
    return _previewing && settings.enableEmailSharing || _shareUtils2.default.isEmailEnabled(settings);
  };

  var isFBEnabled = function isFBEnabled() {
    return _previewing && settings.enableFBSharing || _shareUtils2.default.isFBEnabled(settings);
  };

  var isTwitterEnabled = function isTwitterEnabled() {
    return _previewing && settings.enableTwitterSharing || _shareUtils2.default.isTwitterEnabled(settings);
  };

  var isPinterestEnabled = function isPinterestEnabled() {
    return _previewing && settings.enablePinterestSharing || _shareUtils2.default.isPinterestEnabled(settings);
  };

  var isSMSEnabled = function isSMSEnabled() {
    return _previewing && settings.enableSMSSharing || _shareUtils2.default.isSMSEnabled(settings);
  };

  var isWeiboEnabled = function isWeiboEnabled() {
    return _previewing && settings.enableWeiboSharing || _shareUtils2.default.isWeiboEnabled(settings);
  };

  var isWhatsAppEnabled = function isWhatsAppEnabled() {
    return _previewing && settings.enableWhatsAppSharing || _shareUtils2.default.isWhatsAppEnabled(settings);
  };

  var isSharingEnabled = function isSharingEnabled() {
    return isEmailEnabled() || isFBEnabled() || isTwitterEnabled() || isPinterestEnabled() || isSMSEnabled() || isWeiboEnabled() || isWhatsAppEnabled();
  };

  var countWidthOfMenu = function countWidthOfMenu() {
    var w = 76;
    if (isFBEnabled()) {
      w += 34;
    }
    if (isEmailEnabled()) {
      w += 34;
    }
    if (isTwitterEnabled()) {
      w += 34;
    }
    if (isWeiboEnabled()) {
      w += 34;
    }
    if (isPinterestEnabled()) {
      w += 34;
    }
    if (isSMSEnabled()) {
      w += 34;
    }
    if (isWhatsAppEnabled()) {
      w += 34;
    }
    return w + 'px';
  };

  if (settings.hideButtonsOnResult || settings.hideRightButtonsOnResult) {
    return false;
  }
  if (!isSharingEnabled()) {
    return _react2.default.createElement(_ActionButton2.default, {
      id: 'share-download',
      img: (0, _get3.default)(shareConfig, 'blocks.download.configs.imgSrc') || __webpack_require__(1992),
      ariaLabel: settings.i18n.getMessage('a11y.label.share.via.download'),
      disabled: disabled,
      onClick: onSavePhotoClick,
      style: (0, _extends3.default)({}, (0, _get3.default)(shareConfig, 'blocks.share.styles'), { borderRadius: (0, _get3.default)(shareConfig, 'styles.borderRadius') || '50%' })
    });
  }
  if (!opened) {
    return _react2.default.createElement(_ActionButton2.default, {
      id: 'share-menu-open',
      img: (0, _get3.default)(shareConfig, 'blocks.share.configs.imgSrc') || __webpack_require__(2203),
      disabled: disabled,
      onClick: openMenu,
      ariaLabel: settings.i18n.getMessage('a11y.label.share.menu.expand'),
      style: (0, _extends3.default)({}, (0, _get3.default)(shareConfig, 'blocks.share.styles'), { borderRadius: (0, _get3.default)(shareConfig, 'styles.borderRadius') || '50%' })
    });
  }
  return _react2.default.createElement(
    'div',
    { id: 'share-menu', style: (0, _extends3.default)({}, _styles2.default.expandedMenu, (0, _get3.default)(shareConfig, 'blocks.share_menu.styles'), { width: countWidthOfMenu() }) },
    isEmailEnabled() && _react2.default.createElement(_MenuButton2.default, {
      id: 'share-menu-email',
      autoFocus: true,
      img: (0, _get3.default)(shareConfig, 'blocks.email.configs.imgSrc') || __webpack_require__(2204),
      ariaLabel: settings.i18n.getMessage('a11y.label.share.via.email'),
      onClick: function onClick() {
        onEmailClick && onEmailClick();
        closeMenu();
      }
    }),
    isSMSEnabled() && _react2.default.createElement(_MenuButton2.default, {
      id: 'share-menu-sms',
      img: (0, _get3.default)(shareConfig, 'blocks.sms.configs.imgSrc') || __webpack_require__(2205),
      ariaLabel: settings.i18n.getMessage('a11y.label.share.via.SMS'),
      disabled: shareDisabled,
      onClick: function onClick() {
        onSMSClick && onSMSClick();
        closeMenu();
      }
    }),
    isWeiboEnabled() && _react2.default.createElement(_MenuButton2.default, {
      id: 'share-menu-weibo',
      img: (0, _get3.default)(shareConfig, 'blocks.weibo.configs.imgSrc') || __webpack_require__(2206),
      ariaLabel: settings.i18n.getMessage('a11y.label.share.via.weibo'),
      disabled: shareDisabled,
      onClick: function onClick() {
        onWeiboClick && onWeiboClick();
        closeMenu();
      }
    }),
    isPinterestEnabled() && _react2.default.createElement(_MenuButton2.default, {
      id: 'share-menu-pinterest',
      img: (0, _get3.default)(shareConfig, 'blocks.pinterest.configs.imgSrc') || __webpack_require__(2207),
      ariaLabel: settings.i18n.getMessage('a11y.label.share.via.pinterest'),
      disabled: shareDisabled,
      onClick: function onClick() {
        onPinterestClick && onPinterestClick();
        closeMenu();
      }
    }),
    isTwitterEnabled() && _react2.default.createElement(_MenuButton2.default, {
      id: 'share-menu-twitter',
      img: (0, _get3.default)(shareConfig, 'blocks.twitter.configs.imgSrc') || __webpack_require__(2208),
      ariaLabel: settings.i18n.getMessage('a11y.label.share.via.twitter'),
      disabled: shareDisabled,
      onClick: function onClick() {
        onTwitterClick && onTwitterClick();
        closeMenu();
      }
    }),
    isWhatsAppEnabled() && _react2.default.createElement(_MenuButton2.default, {
      id: 'share-menu-whatsapp',
      img: (0, _get3.default)(shareConfig, 'blocks.whatsapp.configs.imgSrc') || __webpack_require__(2209),
      ariaLabel: settings.i18n.getMessage('a11y.label.share.via.whatsapp'),
      disabled: shareDisabled,
      onClick: function onClick() {
        onWhatsAppClick && onWhatsAppClick();
        closeMenu();
      }
    }),
    isFBEnabled() && _react2.default.createElement(_MenuButton2.default, {
      id: 'share-menu-fb',
      img: (0, _get3.default)(shareConfig, 'blocks.fb.configs.imgSrc') || __webpack_require__(2210),
      ariaLabel: settings.i18n.getMessage('a11y.label.share.via.facebook'),
      disabled: shareDisabled,
      onClick: function onClick() {
        onFBClick && onFBClick();
        closeMenu();
      }
    }),
    _react2.default.createElement(_MenuButton2.default, {
      id: 'share-menu-download',
      img: (0, _get3.default)(shareConfig, 'blocks.download.configs.imgSrc') || __webpack_require__(1992),
      ariaLabel: settings.i18n.getMessage('a11y.label.share.via.download'),
      onClick: function onClick() {
        onSavePhotoClick && onSavePhotoClick();
        closeMenu();
      }
    }),
    _react2.default.createElement(_MenuButton2.default, {
      id: 'share-menu-close',
      img: (0, _get3.default)(shareConfig, 'blocks.share_menu.configs.imgSrc') || __webpack_require__(2211),
      ariaLabel: settings.i18n.getMessage('a11y.label.share.menu.collapse'),
      onClick: closeMenu
    })
  );
}
module.exports = exports['default'];

/***/ }),

/***/ 2202:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

exports.default = MenuButton;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _styles = __webpack_require__(998);

var _styles2 = _interopRequireDefault(_styles);

var _image = __webpack_require__(624);

var _image2 = _interopRequireDefault(_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MenuButton(props) {
  var id = props.id,
      img = props.img,
      disabled = props.disabled,
      _props$onClick = props.onClick,
      _onClick = _props$onClick === undefined ? function () {} : _props$onClick,
      ariaLabel = props.ariaLabel,
      autoFocus = props.autoFocus;

  var getStyle = function getStyle() {
    return disabled ? (0, _extends3.default)({}, _styles2.default.menuButton, { opacity: 0.5, cursor: 'no-drop' }) : _styles2.default.menuButton;
  };

  return _react2.default.createElement(
    'button',
    { id: id, type: 'button', autoFocus: autoFocus, 'aria-label': ariaLabel, disabled: disabled, style: getStyle(), onClick: function onClick() {
        return !disabled && _onClick();
      } },
    img && _react2.default.createElement(_image2.default, { alt: ariaLabel, src: img, style: _styles2.default.icon })
  );
}
module.exports = exports['default'];

/***/ }),

/***/ 2203:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDciIGhlaWdodD0iNDciIHZpZXdCb3g9IjAgMCA0NyA0NyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYuODcwNTQgMzQuODAyN0M3LjA4MjMzIDIyLjA5NTYgMTQuNzA2NiAxMi43NzcxIDMwLjU5MDQgMTEuOTNDMzAuNTkwNCAxMC4wMjM5IDMwLjU5MDQgOC4xMTc4NSAzMC41OTA0IDZDMzUuMjQ5NyAxMC4wMjM5IDM5LjQ4NTQgMTMuODM2IDQzLjkzMjkgMTcuODU5OUMzOS40ODU0IDIxLjg4MzkgMzUuMjQ5NyAyNS45MDc4IDMwLjgwMjIgMzAuMTQzNUMzMC44MDIyIDI4LjAyNTYgMzAuODAyMiAyNi4xMTk2IDMwLjgwMjIgMjMuNzg5OUMyOS41MzE1IDIzLjU3ODEgMjguMDQ5IDIzLjM2NjQgMjYuOTkwMSAyMy4zNjY0QzIzLjYwMTUgMjMuMTU0NiAyMC4yMTMgMjMuMzY2NCAxNy4wMzYyIDI0LjYzNzFDMTIuMzc2OSAyNi4zMzEzIDkuNDExOTYgMjkuNTA4MSA3LjUwNTkgMzMuOTU1NkM3LjI5NDExIDM0LjE2NzQgNy4yOTQxMSAzNC4zNzkyIDYuODcwNTQgMzQuODAyN0M3LjA4MjMzIDM0LjgwMjcgNy4wODIzMyAzNC44MDI3IDYuODcwNTQgMzQuODAyN1oiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0zMy4zNDQxIDM0LjM3OTNWMzYuOTIwN0MzMy4zNDQxIDM4LjE5MTQgMzIuMjg1MiAzOS4wMzg1IDMxLjIyNjMgMzkuMDM4NUg2LjIzNTdDNC45NjQ5OSAzOS4wMzg1IDQuMTE3ODUgMzcuOTc5NiA0LjExNzg1IDM2LjkyMDdWMTEuOTMwMUM0LjExNzg1IDEwLjY1OTQgNS4xNzY3NyA5LjgxMjI0IDYuMjM1NyA5LjgxMjI0SDIzLjgxMzRMMjMuODEzOCA3LjY5NDRINi4yMzU3QzMuOTA2MDYgNy42OTQ0IDIgOS42MDA0NiAyIDExLjkzMDFWMzYuNzA4OUMyIDM5LjAzODUgMy45MDYwNiA0MC45NDQ2IDYuMjM1NyA0MC45NDQ2SDMxLjAxNDVDMzMuMzQ0MSA0MC45NDQ2IDM1LjI1MDIgMzkuMDM4NSAzNS4yNTAyIDM2LjcwODlWMzIuMjYxNEMzNC44MjY2IDMyLjg5NjggMzMuOTc5NSAzMy41MzIxIDMzLjM0NDEgMzQuMzc5M1oiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo="

/***/ }),

/***/ 2204:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDciIGhlaWdodD0iNDciIHZpZXdCb3g9IjAgMCA0NyA0NyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00LjQgOC45MjY2N0g0MS4xMjE0QzQxLjkzNTEgOC45MjY2NyA0Mi41OTQ3IDkuNTg2MyA0Mi41OTQ3IDEwLjRWMzcuNkM0Mi41OTQ3IDM4LjQxMzcgNDEuOTM1MSAzOS4wNzMzIDQxLjEyMTQgMzkuMDczM0g0LjRDMy41ODYzIDM5LjA3MzMgMi45MjY2NyAzOC40MTM3IDIuOTI2NjcgMzcuNlYxMC40QzIuOTI2NjcgOS41ODYzIDMuNTg2MyA4LjkyNjY3IDQuNCA4LjkyNjY3Wk0xIDEwLjRDMSA4LjUyMjIzIDIuNTIyMjMgNyA0LjQgN0g0MS4xMjE0QzQyLjk5OTIgNyA0NC41MjE0IDguNTIyMjMgNDQuNTIxNCAxMC40VjM3LjZDNDQuNTIxNCAzOS40Nzc4IDQyLjk5OTIgNDEgNDEuMTIxNCA0MUg0LjRDMi41MjIyNCA0MSAxIDM5LjQ3NzggMSAzNy42VjEwLjRaTTMwLjEyNjggMjQuNzU5M0wzOC4zMjA3IDE1LjE5MTZDMzguNTIyMiAxNS4wNDg4IDM4LjY1MjMgMTQuODExNSAzOC42NTIzIDE0LjU0NjJDMzguNjUyMyAxNC4xMSAzOC4yOTc3IDEzLjc1NTQgMzcuODYxNSAxMy43NTU0QzM3LjYyOTMgMTMuNzU1NCAzNy40MjAyIDEzLjg1NzUgMzcuMjY5NiAxNC4wMTgyTDI2LjgyNTggMjUuNTkzNUMyNS43MDg0IDI2LjU5MDkgMjQuMjMxNCAyNy4wODg0IDIyLjc1NjkgMjcuMDg4NEMyMS4yODI0IDI3LjA4ODQgMTkuODA1NCAyNi41OTA5IDE4LjY4OCAyNS41OTM1TDguMjQ0MTcgMTQuMDE4MkM4LjEwMTMxIDEzLjg1NzUgNy44OTIxMyAxMy43NTU0IDcuNjU3NDMgMTMuNzU1NEM3LjIyMTIxIDEzLjc1NTQgNi44NjY2MiAxNC4xMSA2Ljg2NjYyIDE0LjU0NjJDNi44NjY2MiAxNC44MTE1IDYuOTk5MjcgMTUuMDQ4OCA3LjIwMDggMTUuMTkxNkwxNS4zOTQ3IDI0Ljc1OTNMNi42MjkzNyAzMi41NzA1QzYuNDI3ODQgMzIuNzEzNCA2LjI5NTE5IDMyLjk1MDYgNi4yOTUxOSAzMy4yMTU5QzYuMjk1MTkgMzMuNjUyMiA2LjY0OTc4IDM0LjAwNjggNy4wODYwMSAzNC4wMDY4QzcuMzE4MTUgMzQuMDA2OCA3LjUyOTg4IDMzLjkwNDcgNy42NzI3NCAzMy43NDRMMTYuNTc1OCAyNS44MTAzTDE3LjUxMiAyNi42NDQ1QzE4Ljk1NTkgMjcuOTMyOCAyMC44NTkgMjguNTc1NiAyMi43NjIgMjguNTc1NkMyNC42NjUxIDI4LjU3NTYgMjYuNTY4MSAyNy45MzI4IDI4LjAxMiAyNi42NDQ1TDI4Ljk0NTcgMjUuODEwM0wzNy44NDg3IDMzLjc0NEMzNy45OTE2IDMzLjkwNDcgMzguMjAwOCAzNC4wMDY4IDM4LjQzNTUgMzQuMDA2OEMzOC44NzE3IDM0LjAwNjggMzkuMjI2MyAzMy42NTIyIDM5LjIyNjMgMzMuMjE1OUMzOS4yMjYzIDMyLjk1MDYgMzkuMDkzNiAzMi43MTM0IDM4Ljg5MjEgMzIuNTcwNUwzMC4xMjY4IDI0Ljc1OTNaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K"

/***/ }),

/***/ 2205:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDciIGhlaWdodD0iNDciIHZpZXdCb3g9IjAgMCA0NyA0NyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwLjAxMzIgMjcuODY5MUMxMC4wMTMyIDI3LjE2NDEgOS43NjM1MiAyNi42MjA3IDkuMjY0MTQgMjYuMjM4OEM4Ljc3MjExIDI1Ljg1NyA3Ljg3OTg0IDI1LjQ3MTQgNi41ODczNCAyNS4wODIyQzUuMjk0ODQgMjQuNjkzIDQuMjY2NzIgMjQuMjU5NyAzLjUwMjk3IDIzLjc4MjNDMi4wNDE1NiAyMi44NjQ0IDEuMzEwODYgMjEuNjY3MyAxLjMxMDg2IDIwLjE5MTNDMS4zMTA4NiAxOC44OTg4IDEuODM1OTQgMTcuODMzOSAyLjg4NjA5IDE2Ljk5NjdDMy45NDM1OSAxNi4xNTk1IDUuMzEzMiAxNS43NDA5IDYuOTk0OTIgMTUuNzQwOUM4LjExMTE3IDE1Ljc0MDkgOS4xMDYyNSAxNS45NDY2IDkuOTgwMTYgMTYuMzU3OEMxMC44NTQxIDE2Ljc2OTEgMTEuNTQwNyAxNy4zNTY2IDEyLjA0MDEgMTguMTIwM0MxMi41Mzk1IDE4Ljg3NjcgMTIuNzg5MSAxOS43MTc2IDEyLjc4OTEgMjAuNjQyOUgxMC4wMTMyQzEwLjAxMzIgMTkuODA1NyA5Ljc0ODgzIDE5LjE1MjEgOS4yMjAwOCAxOC42ODIxQzguNjk4NjcgMTguMjA0OCA3Ljk0OTYxIDE3Ljk2NjEgNi45NzI4OSAxNy45NjYxQzYuMDYyMjcgMTcuOTY2MSA1LjM1MzU5IDE4LjE2MDcgNC44NDY4NyAxOC41NDk5QzQuMzQ3NSAxOC45MzkxIDQuMDk3ODEgMTkuNDgyNiA0LjA5NzgxIDIwLjE4MDJDNC4wOTc4MSAyMC43Njc3IDQuMzY5NTMgMjEuMjU5OCA0LjkxMjk3IDIxLjY1NjNDNS40NTY0MSAyMi4wNDU1IDYuMzUyMzQgMjIuNDI3NCA3LjYwMDc4IDIyLjgwMkM4Ljg0OTIyIDIzLjE2OTEgOS44NTE2NCAyMy41OTE0IDEwLjYwOCAyNC4wNjg4QzExLjM2NDUgMjQuNTM4OCAxMS45MTg5IDI1LjA4MjIgMTIuMjcxNCAyNS42OTkxQzEyLjYyMzkgMjYuMzA4NiAxMi44MDAyIDI3LjAyNDYgMTIuODAwMiAyNy44NDcxQzEyLjgwMDIgMjkuMTgzNyAxMi4yODYxIDMwLjI0ODUgMTEuMjU4IDMxLjA0MTZDMTAuMjM3MiAzMS44Mjc0IDguODQ5MjIgMzIuMjIwMyA3LjA5NDA2IDMyLjIyMDNDNS45MzM3NSAzMi4yMjAzIDQuODY1MjMgMzIuMDA3MyAzLjg4ODUyIDMxLjU4MTRDMi45MTkxNCAzMS4xNDgxIDIuMTYyNzMgMzAuNTUzMyAxLjYxOTMgMjkuNzk2OUMxLjA4MzIgMjkuMDQwNSAwLjgxNTE1NiAyOC4xNTkyIDAuODE1MTU2IDI3LjE1MzFIMy42MDIxMUMzLjYwMjExIDI4LjA2MzggMy45MDMyIDI4Ljc2ODggNC41MDUzOSAyOS4yNjgxQzUuMTA3NTggMjkuNzY3NSA1Ljk3MDQ3IDMwLjAxNzIgNy4wOTQwNiAzMC4wMTcyQzguMDYzNDQgMzAuMDE3MiA4Ljc5MDQ3IDI5LjgyMjYgOS4yNzUxNiAyOS40MzM0QzkuNzY3MTkgMjkuMDM2OCAxMC4wMTMyIDI4LjUxNTQgMTAuMDEzMiAyNy44NjkxWk0xOC44NTg3IDE1Ljk2MTNMMjMuNDg1MyAyOC4yNTQ3TDI4LjEwMDkgMTUuOTYxM0gzMS43MDNWMzJIMjguOTI3VjI2LjcxMjVMMjkuMjAyNCAxOS42NDA1TDI0LjQ2NTcgMzJIMjIuNDcxOUwxNy43NDYyIDE5LjY1MTVMMTguMDIxNiAyNi43MTI1VjMySDE1LjI0NTZWMTUuOTYxM0gxOC44NTg3Wk00My4zOTA1IDI3Ljg2OTFDNDMuMzkwNSAyNy4xNjQxIDQzLjE0MDkgMjYuNjIwNyA0Mi42NDE1IDI2LjIzODhDNDIuMTQ5NSAyNS44NTcgNDEuMjU3MiAyNS40NzE0IDM5Ljk2NDcgMjUuMDgyMkMzOC42NzIyIDI0LjY5MyAzNy42NDQxIDI0LjI1OTcgMzYuODgwMyAyMy43ODIzQzM1LjQxODkgMjIuODY0NCAzNC42ODgyIDIxLjY2NzMgMzQuNjg4MiAyMC4xOTEzQzM0LjY4ODIgMTguODk4OCAzNS4yMTMzIDE3LjgzMzkgMzYuMjYzNCAxNi45OTY3QzM3LjMyMDkgMTYuMTU5NSAzOC42OTA1IDE1Ljc0MDkgNDAuMzcyMyAxNS43NDA5QzQxLjQ4ODUgMTUuNzQwOSA0Mi40ODM2IDE1Ljk0NjYgNDMuMzU3NSAxNi4zNTc4QzQ0LjIzMTQgMTYuNzY5MSA0NC45MTggMTcuMzU2NiA0NS40MTc0IDE4LjEyMDNDNDUuOTE2OCAxOC44NzY3IDQ2LjE2NjUgMTkuNzE3NiA0Ni4xNjY1IDIwLjY0MjlINDMuMzkwNUM0My4zOTA1IDE5LjgwNTcgNDMuMTI2MiAxOS4xNTIxIDQyLjU5NzQgMTguNjgyMUM0Mi4wNzYgMTguMjA0OCA0MS4zMjcgMTcuOTY2MSA0MC4zNTAyIDE3Ljk2NjFDMzkuNDM5NiAxNy45NjYxIDM4LjczMDkgMTguMTYwNyAzOC4yMjQyIDE4LjU0OTlDMzcuNzI0OCAxOC45MzkxIDM3LjQ3NTIgMTkuNDgyNiAzNy40NzUyIDIwLjE4MDJDMzcuNDc1MiAyMC43Njc3IDM3Ljc0NjkgMjEuMjU5OCAzOC4yOTAzIDIxLjY1NjNDMzguODMzNyAyMi4wNDU1IDM5LjcyOTcgMjIuNDI3NCA0MC45NzgxIDIyLjgwMkM0Mi4yMjY2IDIzLjE2OTEgNDMuMjI5IDIzLjU5MTQgNDMuOTg1NCAyNC4wNjg4QzQ0Ljc0MTggMjQuNTM4OCA0NS4yOTYyIDI1LjA4MjIgNDUuNjQ4NyAyNS42OTkxQzQ2LjAwMTIgMjYuMzA4NiA0Ni4xNzc1IDI3LjAyNDYgNDYuMTc3NSAyNy44NDcxQzQ2LjE3NzUgMjkuMTgzNyA0NS42NjM0IDMwLjI0ODUgNDQuNjM1MyAzMS4wNDE2QzQzLjYxNDUgMzEuODI3NCA0Mi4yMjY2IDMyLjIyMDMgNDAuNDcxNCAzMi4yMjAzQzM5LjMxMTEgMzIuMjIwMyAzOC4yNDI2IDMyLjAwNzMgMzcuMjY1OSAzMS41ODE0QzM2LjI5NjUgMzEuMTQ4MSAzNS41NDAxIDMwLjU1MzMgMzQuOTk2NiAyOS43OTY5QzM0LjQ2MDUgMjkuMDQwNSAzNC4xOTI1IDI4LjE1OTIgMzQuMTkyNSAyNy4xNTMxSDM2Ljk3OTVDMzYuOTc5NSAyOC4wNjM4IDM3LjI4MDUgMjguNzY4OCAzNy44ODI3IDI5LjI2ODFDMzguNDg0OSAyOS43Njc1IDM5LjM0NzggMzAuMDE3MiA0MC40NzE0IDMwLjAxNzJDNDEuNDQwOCAzMC4wMTcyIDQyLjE2NzggMjkuODIyNiA0Mi42NTI1IDI5LjQzMzRDNDMuMTQ0NSAyOS4wMzY4IDQzLjM5MDUgMjguNTE1NCA0My4zOTA1IDI3Ljg2OTFaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K"

/***/ }),

/***/ 2206:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDciIGhlaWdodD0iNDciIHZpZXdCb3g9IjAgMCA0NyA0NyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwLjQ2NzIgMjQuNjM4OEMxNy4zMTQ1IDIzLjgxOTMgMTMuNzU0NCAyNS4zODg4IDEyLjM4NDEgMjguMTY2NUMxMC45OTA2IDMwLjk5OTcgMTIuMzM3OCAzNC4xNDMyIDE1LjUyMjkgMzUuMTcwOUMxOC44MTkxIDM2LjIzNTcgMjIuNzA3OSAzNC42MDYxIDI0LjA1OTcgMzEuNTQ2QzI1LjM4ODQgMjguNTU1NCAyMy43MjY0IDI1LjQ4MTMgMjAuNDY3MiAyNC42Mzg4VjI0LjYzODhaTTE4LjA1OTkgMzEuODcwMUMxNy40MjEgMzIuODkzMiAxNi4wNDYgMzMuMzM3NyAxNS4wMTM2IDMyLjg3MDFDMTMuOTk1MSAzMi40MDcxIDEzLjY5NDIgMzEuMjE3MyAxNC4zMzc3IDMwLjIyMkMxNC45NzIgMjkuMjMxMyAxNi4yOTYgMjguNzg2OCAxNy4zMTkxIDI5LjIxNzRDMTguMzU2MSAyOS42NTcyIDE4LjY4OTUgMzAuODM3NyAxOC4wNTk5IDMxLjg3MDFWMzEuODcwMVpNMjAuMTY2MyAyOS4xNjE4QzE5LjkzNDggMjkuNTYgMTkuNDIwOSAyOS43NDk4IDE5LjAyMjggMjkuNTgzMUMxOC42MjkzIDI5LjQyMTEgMTguNTA0MyAyOC45NzY2IDE4LjcyNjUgMjguNTg3OEMxOC45NTggMjguMTk4OSAxOS40NDg3IDI4LjAxMzcgMTkuODQyMiAyOC4xNjY1QzIwLjI0NSAyOC4zMTQ2IDIwLjM4ODUgMjguNzYzNyAyMC4xNjYzIDI5LjE2MThWMjkuMTYxOFpNMzUuNjUyMSAyMC4wMzI0QzM2LjM0NjUgMjAuMjU0NiAzNy4wODcyIDE5Ljg3NSAzNy4zMTQxIDE5LjE4NTJDMzcuODYwNCAxNy40OTA4IDM3LjUxNzggMTUuNTU1NiAzNi4yNCAxNC4xMzlDMzUuNjMzNCAxMy40NjY4IDM0Ljg2MDYgMTIuOTY2MiAzMy45OTkyIDEyLjY4NzRDMzMuMTM3NyAxMi40MDg3IDMyLjIxODEgMTIuMzYxNyAzMS4zMzI3IDEyLjU1MTFDMzEuMTYzMyAxMi41ODcxIDMxLjAwMjcgMTIuNjU2MiAzMC44NiAxMi43NTQzQzMwLjcxNzMgMTIuODUyNSAzMC41OTU0IDEyLjk3NzggMzAuNTAxMiAxMy4xMjMyQzMwLjQwNzEgMTMuMjY4NSAzMC4zNDI1IDEzLjQzMSAzMC4zMTEyIDEzLjYwMTRDMzAuMjc5OSAxMy43NzE3IDMwLjI4MjUgMTMuOTQ2NSAzMC4zMTg5IDE0LjExNThDMzAuMzU1IDE0LjI4NSAzMC40MjQzIDE0LjQ0NTQgMzAuNTIyNiAxNC41ODc3QzMwLjYyMDkgMTQuNzMwMSAzMC43NDYzIDE0Ljg1MTYgMzAuODkxNyAxNC45NDU0QzMxLjAzNzEgMTUuMDM5MSAzMS4xOTk1IDE1LjEwMzMgMzEuMzY5NyAxNS4xMzQxQzMxLjU0IDE1LjE2NDkgMzEuNzE0NiAxNS4xNjE5IDMxLjg4MzYgMTUuMTI1MUMzMi43MzU1IDE0Ljk0NDUgMzMuNjU2NyAxNS4yMDg0IDM0LjI4NjQgMTUuODk4MkMzNC41ODM2IDE2LjIyNjcgMzQuNzg4NiAxNi42MjgxIDM0Ljg4MDUgMTcuMDYxNUMzNC45NzI0IDE3LjQ5NDkgMzQuOTQ3OSAxNy45NDQ5IDM0LjgwOTUgMTguMzY1OEMzNC43NTQ5IDE4LjUzMDUgMzQuNzMzNCAxOC43MDQ0IDM0Ljc0NjMgMTguODc3NUMzNC43NTkxIDE5LjA1MDUgMzQuODA2IDE5LjIxOTMgMzQuODg0MyAxOS4zNzQyQzM0Ljk2MjYgMTkuNTI5MSAzNS4wNzA4IDE5LjY2NyAzNS4yMDI1IDE5Ljc3OTlDMzUuMzM0MyAxOS44OTI5IDM1LjQ4NzEgMTkuOTc4NyAzNS42NTIxIDIwLjAzMjRWMjAuMDMyNFpNNDAuMjcyMyAxMC40OTU2QzM3LjY0NzQgNy41ODM1OCAzMy43NzI1IDYuNDcyNSAzMC4xOTM5IDcuMjMxNzRDMjkuOTk2OSA3LjI3MzM5IDI5LjgxIDcuMzUzNTggMjkuNjQ0MiA3LjQ2NzcyQzI5LjQ3ODMgNy41ODE4NSAyOS4zMzY2IDcuNzI3NjcgMjkuMjI3MyA3Ljg5Njc3QzI5LjExOCA4LjA2NTg4IDI5LjA0MzMgOC4yNTQ5MyAyOS4wMDczIDguNDUzMDRDMjguOTcxNCA4LjY1MTE2IDI4Ljk3NSA4Ljg1NDQzIDI5LjAxOCA5LjA1MTE0QzI5LjA1OTkgOS4yNDgxNCAyOS4xNDAyIDkuNDM0OTUgMjkuMjU0MyA5LjYwMDlDMjkuMzY4NCA5Ljc2Njg2IDI5LjUxNDEgOS45MDg3IDI5LjY4MzEgMTAuMDE4M0MyOS44NTIxIDEwLjEyOCAzMC4wNDA5IDEwLjIwMzIgMzAuMjM5IDEwLjIzOThDMzAuNDM3MSAxMC4yNzY0IDMwLjY0MDQgMTAuMjczNyAzMC44Mzc0IDEwLjIzMTdDMzMuMzgzNiA5LjY5MDAyIDM2LjEzMzUgMTAuNDgxNyAzOC4wMDM5IDEyLjU1MTFDMzkuODY5NiAxNC42MjA1IDQwLjM3NDIgMTcuNDQ0NSAzOS41Nzc5IDE5LjkxNjZDMzkuMzE4NyAyMC43MjIyIDM5Ljc1ODUgMjEuNTgzMyA0MC41NjQgMjEuODQ3MkM0MS4zNjk1IDIyLjEwNjQgNDIuMjMwNiAyMS42NjY2IDQyLjQ4OTkgMjAuODY1N1YyMC44NjExQzQzLjYwNTYgMTcuMzcwNCA0Mi45MDE5IDEzLjQwMjkgNDAuMjcyMyAxMC40OTU2VjEwLjQ5NTZaTTMzLjA0NTYgMjIuNjAxOEMzMi40ODA4IDIyLjQzNTEgMzIuMDk2NiAyMi4zMTk0IDMyLjM5MjkgMjEuNTc4N0MzMy4wMzE4IDE5Ljk3MjIgMzMuMDk2NiAxOC41ODMzIDMyLjQwNjggMTcuNTk3M0MzMS4xMTA1IDE1Ljc0MDggMjcuNTU1IDE1Ljg0MjcgMjMuNDgxIDE3LjU0NjNDMjMuNDgxIDE3LjU0NjMgMjIuMjAzMyAxOC4xMDY1IDIyLjUyNzQgMTcuMDkyNkMyMy4xNTIzIDE1LjA3ODggMjMuMDU5OCAxMy4zOTM2IDIyLjA4MjkgMTIuNDE2OEMxOS44NzQ2IDEwLjIwMzkgMTMuOTk5OCAxMi41MDAxIDguOTU4MiAxNy41MzcxQzUuMTg5NzcgMjEuMzEwMSAzIDI1LjMxMDEgMyAyOC43NjgzQzMgMzUuMzgzOSAxMS40ODEzIDM5LjQwNyAxOS43ODIgMzkuNDA3QzMwLjY2MTQgMzkuNDA3IDM3Ljg5NzQgMzMuMDg3NyAzNy44OTc0IDI4LjA2NDZDMzcuODk3NCAyNS4wMzIzIDM1LjM0MTkgMjMuMzE0NyAzMy4wNDU2IDIyLjYwMThaTTE5LjgwNTIgMzcuMDM2NkMxMy4xODUgMzcuNjg5NCA3LjQ2NzUgMzQuNjk4NyA3LjAzNjk1IDMwLjM0N0M2LjYwNjQgMjUuOTk5OSAxMS42Mjk0IDIxLjk0NDQgMTguMjQ5NyAyMS4yOTE2QzI0Ljg2OTkgMjAuNjM0MiAzMC41ODc0IDIzLjYyOTUgMzEuMDE3OSAyNy45NzY3QzMxLjQ0MzggMzIuMzIzOCAyNi40MjU0IDM2LjM3OTMgMTkuODA1MiAzNy4wMzY2WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg=="

/***/ }),

/***/ 2207:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDciIGhlaWdodD0iNDciIHZpZXdCb3g9IjAgMCA0NyA0NyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcuMDAwMTQgMTcuNjAyNUM3LjAwMDE0IDE1Ljg0MjUgNy4zMDc4IDE0LjE3OTggNy45MTQwNyAxMi42Mjc5QzguNDkzMzIgMTEuMTIwNiA5LjM1MzkyIDkuNzM3MjQgMTAuNDUgOC41NTE0NUMxMS41NDM5IDcuMzgxMjQgMTIuNzk1NiA2LjM2OTMzIDE0LjE2OTEgNS41NDQ5OUMxNS41NzgyIDQuNjkyNDggMTcuMTAzOCA0LjA0OTMyIDE4LjY5OCAzLjYzNTY5QzIwLjMxMTQgMy4yMTIwMyAyMS45NzI4IDIuOTk4MzcgMjMuNjQwOSAzLjAwMDAxQzI2LjIxNzYgMy4wMDAwMSAyOC42MTU1IDMuNTQ1MiAzMC44MzkyIDQuNjMxMDZDMzMuMDMzOSA1LjY5NzExIDM0LjkwMiA3LjMzMzEzIDM2LjI0ODIgOS4zNjgxMUMzNy42MzcyIDExLjQzOCAzOC4zMjcxIDEzLjc3OTQgMzguMzI3MSAxNi4zOUMzOC4zMjcxIDE3Ljk1NTQgMzguMTczMyAxOS40ODY5IDM3Ljg1ODkgMjAuOTg0NUMzNy41NTAxIDIyLjQ4MTMgMzcuMDU5MyAyMy45MzQ2IDM2LjM5NzUgMjUuMzEyMUMzNS43NjY2IDI2LjY0NTYgMzQuOTQxOCAyNy44NzgzIDMzLjk0OTggMjguOTcwMUMzMi45NTI4IDMwLjA0NDUgMzEuNzQ1NCAzMC45MDI0IDMwLjQwMjYgMzEuNDkwMkMyOC45NDQ5IDMyLjEyOTEgMjcuMzY3OSAzMi40NTA2IDI1Ljc3NjQgMzIuNDMzNUMyNC42NzAyIDMyLjQzMzUgMjMuNTY2MyAzMi4xNzM0IDIyLjQ3NTkgMzEuNjUwOEMyMS4zODU1IDMxLjEzMDUgMjAuNjAyOCAzMC40MTU2IDIwLjEzMjIgMjkuNDk5NUMxOS45NjcxIDMwLjEzNTEgMTkuNzQwOSAzMS4wNTM2IDE5LjQ0IDMyLjI1NDhDMTkuMTUwNCAzMy40NTM4IDE4Ljk1NTkgMzQuMjI3NSAxOC44Njk5IDM0LjU3ODFDMTguNzc5NCAzNC45MjY1IDE4LjYxMiAzNS41MDc5IDE4LjM2NzcgMzYuMzEzMkMxOC4yMDIgMzYuOTA4OSAxNy45ODk1IDM3LjQ5MDYgMTcuNzMyIDM4LjA1MjhMMTYuOTUzOCAzOS41Nzc2QzE2LjYxNzMgNDAuMjMxOCAxNi4yNDExIDQwLjg2NDkgMTUuODI3MyA0MS40NzMzQzE1LjQxNzggNDIuMDY2IDE0LjkxMTEgNDIuNzc0MSAxNC4zMDcxIDQzLjU4ODVMMTMuOTcgNDMuNzA4NEwxMy43NDYgNDMuNDY0QzEzLjUwNCA0MC45MDEgMTMuMzc5NiAzOS4zNjcyIDEzLjM3OTYgMzguODYwNUMxMy4zNzk2IDM3LjM2MDYgMTMuNTU4MyAzNS42Nzc1IDEzLjkxMTIgMzMuODA5QzE0LjI1NzMgMzEuOTQyNiAxNC44MDQ3IDI5LjU5NjcgMTUuNTQgMjYuNzc1OEMxNi4yNzUyIDIzLjk1NzEgMTYuNjk1OSAyMi4yOTg5IDE2LjgwOTEgMjEuODA4QzE2LjI5MSAyMC43NTE1IDE2LjAyODYgMTkuMzcxNiAxNi4wMjg2IDE3LjY3NDlDMTYuMDI4NiAxNi4zMTk5IDE2LjQ1MTYgMTUuMDUwOCAxNy4zIDEzLjg1NjNDMTguMTUwNSAxMi42NjY0IDE5LjIyNTEgMTIuMDcxNCAyMC41MjgxIDEyLjA3MTRDMjEuNTI1NyAxMi4wNzE0IDIyLjI5OTQgMTIuNDAxNyAyMi44NTM3IDEzLjA2NDZDMjMuNDEwMiAxMy43MjUxIDIzLjY4MTYgMTQuNTU3NiAyMy42ODE2IDE1LjU3MzNDMjMuNjgxNiAxNi42NTAxIDIzLjMyNDIgMTguMjA4OCAyMi42MDQ4IDIwLjI0N0MyMS44ODU0IDIyLjI4NzYgMjEuNTI4IDIzLjgxIDIxLjUyOCAyNC44MjEyQzIxLjUyOCAyNS44NDYgMjEuODk0NSAyNi43MDM0IDIyLjYyNzQgMjcuMzc1MkMyMy4zNTA4IDI4LjA0NzUgMjQuMzA3MyAyOC40MTE3IDI1LjI5NDYgMjguMzkxQzI2LjE5MDQgMjguMzkxIDI3LjAyMDYgMjguMTg3NCAyNy43OTIgMjcuNzc3OUMyOC41NTE0IDI3LjM4MDUgMjkuMjA4NyAyNi44MTMgMjkuNzEyNyAyNi4xMTk3QzMwLjgxMDMgMjQuNjEzOCAzMS41OTI4IDIyLjkwMTggMzIuMDEzMyAyMS4wODYzQzMyLjIzMDUgMjAuMTMxNyAzMi4zOTc5IDE5LjIyNDUgMzIuNTAyIDE4LjM3MTdDMzIuNjEyOCAxNy41MTQzIDMyLjY2MDMgMTYuNzA0NCAzMi42NjAzIDE1LjkzNTNDMzIuNjYwMyAxMy4xMTQzIDMxLjc2NDUgMTAuOTE1NSAyOS45ODQxIDkuMzQwOTZDMjguMTk0NyA3Ljc2NjQ3IDI1Ljg2NDcgNi45ODM3NSAyMi45OTg0IDYuOTgzNzVDMTkuNzM4NiA2Ljk4Mzc1IDE3LjAxMjcgOC4wMzc5NCAxNC44Mjk2IDEwLjE1MzFDMTIuNjQ0MyAxMi4yNjE1IDExLjU0NDkgMTQuOTQyMiAxMS41NDQ5IDE4LjE5M0MxMS41NDQ5IDE4LjkxMDEgMTEuNjUzNSAxOS42MDIzIDExLjg1OTQgMjAuMjcxOUMxMi4wNjA3IDIwLjkzOTMgMTIuMjgwMSAyMS40NzA5IDEyLjUxNzcgMjEuODY0NUMxMi43NTI5IDIyLjI1MTQgMTIuOTc0NiAyMi42MjkxIDEzLjE3NiAyMi45Nzc1QzEzLjM3OTYgMjMuMzI1OSAxMy40ODU5IDIzLjU3NDcgMTMuNDg1OSAyMy43MjQxQzEzLjQ4NTkgMjQuMTgxIDEzLjM2NiAyNC43NzYgMTMuMTIzOSAyNS41MTEyQzEyLjg3MjggMjYuMjQ2NCAxMi41NzY1IDI2LjYxMjkgMTIuMjE5IDI2LjYxMjlDMTIuMTg1MSAyNi42MTI5IDEyLjA0NDkgMjYuNTg4IDExLjgwMDUgMjYuNTM2QzEwLjk1NDQgMjYuMjgzNCAxMC4xOTAyIDI1LjgxMTEgOS41ODU4NCAyNS4xNjczQzguOTQ0MzcgMjQuNTAwMSA4LjQzODEyIDIzLjcxNSA4LjA5NTA1IDIyLjg1NTRDNy43NTI5NSAyMS45OTg4IDcuNDg2NTEgMjEuMTEzOSA3LjI5ODc1IDIwLjIxMDhDNy4wOTU5MSAxOS4zNTY0IDYuOTk1NjYgMTguNDgwNyA3LjAwMDE0IDE3LjYwMjVWMTcuNjAyNVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo="

/***/ }),

/***/ 2208:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDciIGhlaWdodD0iNDciIHZpZXdCb3g9IjAgMCA0NyA0NyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQxLjcyOTQgMTIuODc5MkM0MC4zOTcgMTMuNDY5NiAzOC45NjU1IDEzLjg2ODYgMzcuNDYwNyAxNC4wNDg5QzM5LjAxMzQgMTMuMTE5OCA0MC4xNzUgMTEuNjU3NSA0MC43Mjg5IDkuOTM0OTFDMzkuMjcwMSAxMC44MDE0IDM3LjY3MzUgMTEuNDExMyAzNi4wMDg1IDExLjczODJDMzQuODg4OSAxMC41NDI3IDMzLjQwNTkgOS43NTAzMiAzMS43ODk4IDkuNDg0MDZDMzAuMTczNiA5LjIxNzggMjguNTE0OCA5LjQ5MjU0IDI3LjA3MDggMTAuMjY1NkMyNS42MjY5IDExLjAzODcgMjQuNDc4NSAxMi4yNjY5IDIzLjgwNDEgMTMuNzU5NkMyMy4xMjk3IDE1LjI1MjIgMjIuOTY2OSAxNi45MjU3IDIzLjM0MTEgMTguNTIwM0MyMC4zODUyIDE4LjM3MTkgMTcuNDkzNSAxNy42MDM2IDE0Ljg1MzcgMTYuMjY1M0MxMi4yMTQgMTQuOTI3IDkuODg1MDggMTMuMDQ4NiA4LjAxODI1IDEwLjc1MkM3LjM3OTk0IDExLjg1MzEgNy4wMTI5IDEzLjEyOTcgNy4wMTI5IDE0LjQ4OTNDNy4wMTIxOSAxNS43MTMzIDcuMzEzNiAxNi45MTg1IDcuODkwNCAxNy45OThDOC40NjcxOSAxOS4wNzc2IDkuMzAxNTMgMTkuOTk4MSAxMC4zMTk0IDIwLjY3NzhDOS4xMzg5NCAyMC42NDAzIDcuOTg0NTQgMjAuMzIxMyA2Ljk1MjI2IDE5Ljc0NzVWMTkuODQzMkM2Ljk1MjE0IDIxLjU1OTkgNy41NDU5NSAyMy4yMjM3IDguNjMyOTMgMjQuNTUyNEM5LjcxOTkgMjUuODgxMSAxMS4yMzMxIDI2Ljc5MjggMTIuOTE1OCAyNy4xMzI4QzExLjgyMDcgMjcuNDI5MiAxMC42NzI2IDI3LjQ3MjggOS41NTgyIDI3LjI2MDVDMTAuMDMyOSAyOC43Mzc2IDEwLjk1NzcgMzAuMDI5MiAxMi4yMDMgMzAuOTU0NkMxMy40NDgzIDMxLjg4IDE0Ljk1MTkgMzIuMzkyOCAxNi41MDMxIDMyLjQyMTNDMTMuODY5OCAzNC40ODg1IDEwLjYxNzYgMzUuNjA5OCA3LjI2OTgzIDM1LjYwNDlDNi42NzY4IDM1LjYwNSA2LjA4NDI3IDM1LjU3MDQgNS40OTUzIDM1LjUwMTJDOC44OTM1MSAzNy42ODYxIDEyLjg0OTMgMzguODQ1NyAxNi44ODkzIDM4Ljg0MTJDMzAuNTY1MyAzOC44NDEyIDM4LjA0MTYgMjcuNTE0MiAzOC4wNDE2IDE3LjY5MDVDMzguMDQxNiAxNy4zNzEzIDM4LjAzMzYgMTcuMDQ5IDM4LjAxOTIgMTYuNzI5OEMzOS40NzM1IDE1LjY3ODEgNDAuNzI4NyAxNC4zNzU4IDQxLjcyNjMgMTIuODgzOUw0MS43Mjk0IDEyLjg3OTJWMTIuODc5MloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo="

/***/ }),

/***/ 2209:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDciIGhlaWdodD0iNDciIHZpZXdCb3g9IjAgMCA0NyA0NyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zMS41NzM4IDI3Ljc3MTVDMzEuMTAxOSAyNy41MzU2IDI4Ljc4ODcgMjYuMzk4OCAyOC4zNTggMjYuMjQwNEMyNy45MjczIDI2LjA4MzcgMjcuNjEzOCAyNi4wMDYxIDI3LjI5ODggMjYuNDc3OUMyNi45ODUzIDI2Ljk0NjYgMjYuMDg0MyAyOC4wMDc0IDI1LjgxMDQgMjguMzIwOUMyNS41MzQ5IDI4LjYzNiAyNS4yNjEgMjguNjc0IDI0Ljc5MDcgMjguNDM5N0MyNC4zMjA1IDI4LjIwMjIgMjIuODAzNyAyNy43MDY2IDIxLjAwNjYgMjYuMTA0M0MxOS42MDg1IDI0Ljg1NjYgMTguNjYzMyAyMy4zMTYgMTguMzg5MyAyMi44NDQyQzE4LjExNTQgMjIuMzczOSAxOC4zNTkzIDIyLjExOSAxOC41OTUyIDIxLjg4NDdDMTguODA3MyAyMS42NzQxIDE5LjA2NTQgMjEuMzM1MyAxOS4zMDEzIDIxLjA2MTNDMTkuNTM3MiAyMC43ODU4IDE5LjYxNDggMjAuNTg5NSAxOS43NzE2IDIwLjI3NDRDMTkuOTI5OSAxOS45NjA5IDE5Ljg1MDggMTkuNjg3IDE5LjczMiAxOS40NTExQzE5LjYxNDggMTkuMjE1MiAxOC42NzQzIDE2Ljg5ODggMTguMjgxNyAxNS45NTY3QzE3LjkwMDEgMTUuMDM5OSAxNy41MTIyIDE1LjE2NSAxNy4yMjQgMTUuMTQ5MkMxNi45NDg1IDE1LjEzNjUgMTYuNjM1IDE1LjEzMzMgMTYuMzIxNSAxNS4xMzMzQzE2LjAwOCAxNS4xMzMzIDE1LjQ5ODIgMTUuMjUwNSAxNS4wNjc1IDE1LjcyMjNDMTQuNjM1MiAxNi4xOTI2IDEzLjQyMDggMTcuMzMxIDEzLjQyMDggMTkuNjQ3NEMxMy40MjA4IDIxLjk2MjMgMTUuMTA1NSAyNC4xOTk1IDE1LjM0MTQgMjQuNTE0NkMxNS41NzczIDI0LjgyODEgMTguNjU4NSAyOS41ODEzIDIzLjM3ODQgMzEuNjE5QzI0LjUwMjYgMzIuMTAzNSAyNS4zNzgyIDMyLjM5MzMgMjYuMDYwNiAzMi42MDg2QzI3LjE4NzkgMzIuOTY4IDI4LjIxMzkgMzIuOTE3MyAyOS4wMjQ2IDMyLjc5NTRDMjkuOTI3MSAzMi42NjA4IDMxLjgwODEgMzEuNjU3IDMyLjIwMDggMzAuNTU4MkMzMi41OTE4IDI5LjQ1OTMgMzIuNTkxOCAyOC41MTczIDMyLjQ3NDcgMjguMzIwOUMzMi4zNTc1IDI4LjEyNDYgMzIuMDQ0IDI4LjAwNzQgMzEuNTcyMiAyNy43NzE1SDMxLjU3MzhaTTIyLjk4ODkgMzkuNDkyOUgyMi45ODI2QzIwLjE3OTIgMzkuNDkzNCAxNy40MjczIDM4LjczOTggMTUuMDE1MiAzNy4zMTExTDE0LjQ0NTMgMzYuOTcyM0w4LjUyMDQyIDM4LjUyNzFMMTAuMTAyMiAzMi43NTExTDkuNzMwMDggMzIuMTU4OUM4LjE2MjggMjkuNjY0MSA3LjMzMzM4IDI2Ljc3NjggNy4zMzc2NyAyMy44MzA2QzcuMzQwODMgMTUuMjAxNCAxNC4zNjEzIDguMTgwOTIgMjIuOTk1MyA4LjE4MDkyQzI3LjE3NTMgOC4xODA5MiAzMS4xMDUxIDkuODExNzUgMzQuMDU5NiAxMi43Njk0QzM1LjUxNjggMTQuMjIwNyAzNi42NzE5IDE1Ljk0NjUgMzcuNDU3OSAxNy44NDdDMzguMjQzOCAxOS43NDc1IDM4LjY0NTEgMjEuNzg1IDM4LjYzODYgMjMuODQxN0MzOC42MzU0IDMyLjQ3MDggMzEuNjE0OSAzOS40OTI5IDIyLjk4ODkgMzkuNDkyOVYzOS40OTI5Wk0zNi4zMDc5IDEwLjUyMjdDMzQuNTYzNCA4Ljc2NjYzIDMyLjQ4NzcgNy4zNzQyNyAzMC4yMDExIDYuNDI2MjdDMjcuOTE0NiA1LjQ3ODI3IDI1LjQ2MjYgNC45OTM0OCAyMi45ODczIDVDMTIuNjEwMiA1IDQuMTYxNSAxMy40NDcxIDQuMTU4MzMgMjMuODI5QzQuMTU2NzUgMjcuMTQ3NyA1LjAyMjgzIDMwLjM4NzIgNi42NzEwOCAzMy4yNDE5TDQgNDNMMTMuOTgxMyA0MC4zODEyQzE2Ljc0MjUgNDEuODg1NSAxOS44MzY2IDQyLjY3MzggMjIuOTgxIDQyLjY3MzhIMjIuOTg4OUMzMy4zNjYxIDQyLjY3MzggNDEuODE0OCAzNC4yMjY4IDQxLjgxNzkgMjMuODQzM0M0MS44MjU2IDIxLjM2ODkgNDEuMzQyNSAxOC45MTc3IDQwLjM5NjggMTYuNjMxMkMzOS40NTEgMTQuMzQ0OCAzOC4wNjEyIDEyLjI2ODYgMzYuMzA3OSAxMC41MjI3IiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K"

/***/ }),

/***/ 2210:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDciIGhlaWdodD0iNDciIHZpZXdCb3g9IjAgMCA0NyA0NyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE3Ljk0NTYgNDMuODZWMjUuMTU2NUgxM1YxOC40MjI0SDE3Ljk0NTZWMTIuNjcwNkMxNy45NDU2IDguMTUwNyAyMC44NjcgNCAyNy41OTg1IDRDMzAuMzIzOSA0IDMyLjMzOTMgNC4yNjEyOCAzMi4zMzkzIDQuMjYxMjhMMzIuMTgwNSAxMC41NDk4QzMyLjE4MDUgMTAuNTQ5OCAzMC4xMjUxIDEwLjUyOTggMjcuODgyMyAxMC41Mjk4QzI1LjQ1NDggMTAuNTI5OCAyNS4wNjU5IDExLjY0ODUgMjUuMDY1OSAxMy41MDUyVjE4LjQyMjRIMzIuMzczNEwzMi4wNTU1IDI1LjE1NjVIMjUuMDY1OVY0My44NkgxNy45NDU2WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg=="

/***/ }),

/***/ 2211:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDciIGhlaWdodD0iNDciIHZpZXdCb3g9IjAgMCA0NyA0NyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik03LjI5Mjg5IDM4LjI5MjlDNi45MDIzNyAzOC42ODM0IDYuOTAyMzcgMzkuMzE2NiA3LjI5Mjg5IDM5LjcwNzFDNy42ODM0MiA0MC4wOTc2IDguMzE2NTggNDAuMDk3NiA4LjcwNzExIDM5LjcwNzFMMjMgMjUuNDE0MkwzNy4yOTI5IDM5LjcwNzFDMzcuNjgzNCA0MC4wOTc3IDM4LjMxNjYgNDAuMDk3NyAzOC43MDcxIDM5LjcwNzFDMzkuMDk3NiAzOS4zMTY2IDM5LjA5NzYgMzguNjgzNCAzOC43MDcxIDM4LjI5MjlMMjQuNDE0MiAyNEwzOC43MDcxIDkuNzA3MTFDMzkuMDk3NiA5LjMxNjU4IDM5LjA5NzYgOC42ODM0MiAzOC43MDcxIDguMjkyODlDMzguMzE2NiA3LjkwMjM3IDM3LjY4MzQgNy45MDIzNyAzNy4yOTI5IDguMjkyODlMMjMgMjIuNTg1OEw4LjcwNzExIDguMjkyOTJDOC4zMTY1OCA3LjkwMjQgNy42ODM0MiA3LjkwMjQgNy4yOTI4OSA4LjI5MjkyQzYuOTAyMzcgOC42ODM0NSA2LjkwMjM3IDkuMzE2NjEgNy4yOTI4OSA5LjcwNzE0TDIxLjU4NTggMjRMNy4yOTI4OSAzOC4yOTI5WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg=="

/***/ }),

/***/ 2212:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__(170);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = ScreenCenterText;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _styles = __webpack_require__(2180);

var _styles2 = _interopRequireDefault(_styles);

var _styles3 = __webpack_require__(2181);

var _styles4 = _interopRequireDefault(_styles3);

var _uiUtils = __webpack_require__(565);

var _uiUtils2 = _interopRequireDefault(_uiUtils);

var _useDynamicStyles = __webpack_require__(747);

var _useDynamicStyles2 = _interopRequireDefault(_useDynamicStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ScreenCenterText(props) {
  var settings = props.settings,
      style = props.style,
      resizable = props.resizable,
      text = props.text,
      children = props.children,
      textProps = (0, _objectWithoutProperties3.default)(props, ['settings', 'style', 'resizable', 'text', 'children']);

  var styles = (0, _useDynamicStyles2.default)({ settings: settings, defaultStyles: _styles2.default, a11yStyles: _styles4.default });

  var getTextStyle = function getTextStyle() {
    var s = (0, _extends3.default)({}, styles.screenCenterText, style);
    return resizable ? (0, _extends3.default)({}, styles.resizableText, _uiUtils2.default.adjustText(s, settings)) : s;
  };

  if (!text && !children) {
    return false;
  }
  return _react2.default.createElement(
    'h3',
    (0, _extends3.default)({ style: getTextStyle() }, textProps),
    text || children
  );
}
module.exports = exports['default'];

/***/ }),

/***/ 2213:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useCurrentEffectHolder;

var _react = __webpack_require__(459);

var _ymkWebSdkCore = __webpack_require__(112);

function useCurrentEffectHolder(props) {
  var emitter = props.emitter;

  var effectHolder = (0, _react.useRef)(null);

  var getCurrentEffectType = function getCurrentEffectType() {
    return effectHolder.current && effectHolder.current.get() && effectHolder.current.get().type;
  };

  (0, _react.useEffect)(function () {
    effectHolder.current = new _ymkWebSdkCore.CurrentEffectHolder(emitter, _ymkWebSdkCore.events);
  }, []);

  return {
    getCurrentEffectType: getCurrentEffectType
  };
}
module.exports = exports['default'];

/***/ }),

/***/ 2214:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = __webpack_require__(72);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = YMKSlider;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _styles = __webpack_require__(2448);

var _styles2 = _interopRequireDefault(_styles);

var _styles3 = __webpack_require__(2449);

var _styles4 = _interopRequireDefault(_styles3);

var _slider = __webpack_require__(2215);

var _slider2 = _interopRequireDefault(_slider);

var _ymkWebSdkCore = __webpack_require__(112);

var _toNumber2 = __webpack_require__(51);

var _toNumber3 = _interopRequireDefault(_toNumber2);

var _isFunction2 = __webpack_require__(23);

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _floor2 = __webpack_require__(973);

var _floor3 = _interopRequireDefault(_floor2);

var _get2 = __webpack_require__(3);

var _get3 = _interopRequireDefault(_get2);

var _useDynamicStyles = __webpack_require__(747);

var _useDynamicStyles2 = _interopRequireDefault(_useDynamicStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function YMKSlider(props) {
  var _props$idPrefix = props.idPrefix,
      idPrefix = _props$idPrefix === undefined ? '' : _props$idPrefix,
      emitter = props.emitter,
      settings = props.settings,
      value = props.value,
      _props$min = props.min,
      min = _props$min === undefined ? 1 : _props$min,
      _props$max = props.max,
      max = _props$max === undefined ? 100 : _props$max,
      _props$step = props.step,
      step = _props$step === undefined ? 1 : _props$step,
      sliderLabel = props.sliderLabel,
      _props$sliderLength = props.sliderLength,
      sliderLength = _props$sliderLength === undefined ? sliderLabel ? (0, _floor3.default)(settings.displayHeight * 0.33) : (0, _floor3.default)(settings.displayHeight * 0.35) : _props$sliderLength,
      ariaLabel = props.ariaLabel,
      isToolTipEnabled = props.isToolTipEnabled,
      enabled = props.enabled,
      onBeforeChange = props.onBeforeChange,
      onAfterChange = props.onAfterChange,
      onChange = props.onChange,
      getA11yMessageOnAfterChange = props.getA11yMessageOnAfterChange,
      _props$sliderLabelSty = props.sliderLabelStyle,
      sliderLabelStyle = _props$sliderLabelSty === undefined ? {} : _props$sliderLabelSty,
      _props$position = props.position,
      position = _props$position === undefined ? 'left' : _props$position,
      _props$containerStyle = props.containerStyle,
      containerStyle = _props$containerStyle === undefined ? {} : _props$containerStyle;

  var styles = (0, _useDynamicStyles2.default)({ settings: settings, defaultStyles: _styles2.default, a11yStyles: _styles4.default });

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray3.default)(_useState, 2),
      isToolTipVisible = _useState2[0],
      setIsToolTipVisible = _useState2[1];

  var _useState3 = (0, _react.useState)(14),
      _useState4 = (0, _slicedToArray3.default)(_useState3, 2),
      sliderWidth = _useState4[0],
      setSliderWidth = _useState4[1];

  var afterChangeTimeout = (0, _react.useRef)(-1);
  var toolTipTimeout = (0, _react.useRef)(-1);
  var changing = (0, _react.useRef)(false);
  var sliderRef = (0, _react.useRef)(null);
  var BUTTON_MARGIN = 10;
  var isButtonsEnabled = settings.enableAccessibilityMode;
  var sliderConfig = settings.getModuleSetting().getPanel('virtual_tryon', 'left');

  (0, _react.useEffect)(function () {
    return function () {
      clearTimeout(afterChangeTimeout.current);
      clearTimeout(toolTipTimeout.current);
    };
  }, []);

  (0, _react.useEffect)(function () {
    sliderRef.current && setSliderWidth(sliderRef.current.offsetWidth);
  }, [sliderRef]);

  var showToolTipWithTimeout = function showToolTipWithTimeout() {
    if (!enabled || !isToolTipEnabled) {
      return;
    }
    clearTimeout(toolTipTimeout.current);
    setIsToolTipVisible(true);
    toolTipTimeout.current = setTimeout(function () {
      return hideToolTip();
    }, 1000);
  };

  var hideToolTip = function hideToolTip() {
    clearTimeout(toolTipTimeout.current);
    setIsToolTipVisible(false);
  };

  var handleBeforeChange = function handleBeforeChange() {
    (0, _isFunction3.default)(onBeforeChange) && onBeforeChange();
    showToolTipWithTimeout();
  };

  var handleChanging = function handleChanging(v) {
    (0, _isFunction3.default)(onChange) && onChange(v);
    showToolTipWithTimeout();
  };

  var handleAfterChange = function handleAfterChange(v) {
    (0, _isFunction3.default)(onAfterChange) && onAfterChange(v);

    if (emitter && (0, _isFunction3.default)(getA11yMessageOnAfterChange)) {
      emitter.trigger(_ymkWebSdkCore.events.a11yMessage, [getA11yMessageOnAfterChange(v)]);
    }
  };

  var handleChange = function handleChange(v) {
    if (!changing.current) {
      handleBeforeChange();
    }
    changing.current = true;
    handleChanging(v);

    clearTimeout(afterChangeTimeout.current);
    afterChangeTimeout.current = setTimeout(function () {
      changing.current = false;
      handleAfterChange(v);
    }, 200);
  };

  var handleIncreaseButtonClick = function handleIncreaseButtonClick() {
    return handleChange(value + 1 > max ? max : value + 1);
  };

  var handleDecreaseButtonClick = function handleDecreaseButtonClick() {
    return handleChange(value - 1 < min ? min : value - 1);
  };

  var getSliderLabelStyle = function getSliderLabelStyle() {
    if (settings.enableAccessibilityMode) {
      return (0, _extends3.default)({}, styles.sliderLabel, { marginBottom: 0 }, sliderLabelStyle);
    }
    return (0, _extends3.default)({}, styles.sliderLabel, { marginBottom: '10px' }, sliderLabelStyle);
  };

  var getContainerStyle = function getContainerStyle() {
    var s = (0, _extends3.default)({}, styles.container, { display: enabled ? 'flex' : 'none' });
    return position === 'right' ? (0, _extends3.default)({}, s, { right: '12px' }, containerStyle) : (0, _extends3.default)({}, s, { left: '12px' }, containerStyle);
  };

  return _react2.default.createElement(
    'div',
    { style: getContainerStyle() },
    isToolTipEnabled && _react2.default.createElement(
      'div',
      { id: idPrefix + '-slider-tooltip', style: (0, _extends3.default)({}, styles.tooltip, { visibility: isToolTipVisible ? 'visible' : 'hidden' }) },
      value
    ),
    !!sliderLabel && _react2.default.createElement(
      'div',
      { id: idPrefix + '-slider-label', style: getSliderLabelStyle() },
      sliderLabel
    ),
    !!isButtonsEnabled && _react2.default.createElement(
      'button',
      { id: idPrefix + '-slider-increase', type: 'button', style: (0, _extends3.default)({}, styles.button, { marginBottom: BUTTON_MARGIN + 'px', marginLeft: '-1px' }), onClick: handleIncreaseButtonClick },
      _react2.default.createElement('img', { alt: settings.i18n.getMessage('a11y.label.slider.increase'), style: { height: '100%' }, src: __webpack_require__(2037) })
    ),
    _react2.default.createElement(
      'div',
      { ref: sliderRef, style: { position: 'relative', height: sliderLength + 'px' } },
      _react2.default.createElement(
        'div',
        { style: { position: 'absolute', zIndex: 1, top: 0, width: sliderWidth + 'px', height: sliderLength + 'px' } },
        _react2.default.createElement('input', {
          id: idPrefix + '-slider-hidden-input',
          type: 'range',
          role: 'slider',
          className: 'pf-hidden-slider',
          value: value,
          step: step,
          min: min,
          max: max,
          'aria-label': ariaLabel,
          'aria-valuemin': min,
          'aria-valuemax': max,
          'aria-valuenow': value,
          onMouseDown: function onMouseDown(e) {
            return handleBeforeChange((0, _toNumber3.default)(e.target.value));
          },
          onTouchStart: function onTouchStart(e) {
            return handleBeforeChange((0, _toNumber3.default)(e.target.value));
          },
          onChange: function onChange(e) {
            return handleChange((0, _toNumber3.default)(e.target.value));
          },
          style: {
            width: sliderLength + 'px',
            height: sliderWidth + 'px',
            transform: 'rotate(-90deg) translate(-' + (sliderLength - sliderWidth / 2) + 'px, ' + sliderWidth / 2 + 'px)',
            transformOrigin: 'left',
            cursor: 'pointer'
          }
        })
      ),
      _react2.default.createElement(_slider2.default, {
        step: step,
        min: min,
        max: max,
        value: value,
        onChange: handleChange,
        vertical: true,
        railStyle: (0, _extends3.default)({}, styles.sliderRail, (0, _get3.default)(sliderConfig, 'blocks.slider_rail.styles')),
        handleStyle: (0, _extends3.default)({}, styles.sliderHandle, (0, _get3.default)(sliderConfig, 'blocks.slider_node.styles')),
        trackStyle: (0, _extends3.default)({}, styles.sliderTrack, (0, _get3.default)(sliderConfig, 'blocks.slider_track.styles')),
        tabIndex: -1,
        needA11ySliderRole: false
      })
    ),
    !!isButtonsEnabled && _react2.default.createElement(
      'button',
      {
        id: idPrefix + '-slider-decrease',
        type: 'button',
        style: (0, _extends3.default)({}, styles.button, {
          marginTop: BUTTON_MARGIN + 'px',
          marginLeft: '-1px'
        }),
        onClick: handleDecreaseButtonClick
      },
      _react2.default.createElement('img', { alt: settings.i18n.getMessage('a11y.label.slider.decrease'), style: { height: '100%' }, src: __webpack_require__(2038) })
    )
  );
}
module.exports = exports['default'];

/***/ }),

/***/ 2215:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSliderWithTooltip = exports.Handle = exports.Range = undefined;

var _Slider = __webpack_require__(2046);

var _Slider2 = _interopRequireDefault(_Slider);

var _Range = __webpack_require__(2226);

var _Range2 = _interopRequireDefault(_Range);

var _Handle = __webpack_require__(1001);

var _Handle2 = _interopRequireDefault(_Handle);

var _createSliderWithTooltip = __webpack_require__(2228);

var _createSliderWithTooltip2 = _interopRequireDefault(_createSliderWithTooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Slider2.default.Range = _Range2.default;
_Slider2.default.Handle = _Handle2.default;
_Slider2.default.createSliderWithTooltip = _createSliderWithTooltip2.default;
exports.default = _Slider2.default;
exports.Range = _Range2.default;
exports.Handle = _Handle2.default;
exports.createSliderWithTooltip = _createSliderWithTooltip2.default;

/***/ }),

/***/ 2216:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _getPrototypeOf = __webpack_require__(40);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = __webpack_require__(2217);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

  if (desc === undefined) {
    var parent = (0, _getPrototypeOf2.default)(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

/***/ }),

/***/ 2217:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(2218), __esModule: true };

/***/ }),

/***/ 2218:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2219);
var $Object = __webpack_require__(2).Object;
module.exports = function getOwnPropertyDescriptor(it, key) {
  return $Object.getOwnPropertyDescriptor(it, key);
};


/***/ }),

/***/ 2219:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(29);
var $getOwnPropertyDescriptor = __webpack_require__(130).f;

__webpack_require__(129)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),

/***/ 2220:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = addEventListener;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _EventObject = __webpack_require__(2221);

var _EventObject2 = _interopRequireDefault(_EventObject);

function addEventListener(target, eventType, callback, option) {
  function wrapCallback(e) {
    var ne = new _EventObject2['default'](e);
    callback.call(target, ne);
  }

  if (target.addEventListener) {
    var _ret = (function () {
      var useCapture = false;
      if (typeof option === 'object') {
        useCapture = option.capture || false;
      } else if (typeof option === 'boolean') {
        useCapture = option;
      }

      target.addEventListener(eventType, wrapCallback, option || false);

      return {
        v: {
          remove: function remove() {
            target.removeEventListener(eventType, wrapCallback, useCapture);
          }
        }
      };
    })();

    if (typeof _ret === 'object') return _ret.v;
  } else if (target.attachEvent) {
    target.attachEvent('on' + eventType, wrapCallback);
    return {
      remove: function remove() {
        target.detachEvent('on' + eventType, wrapCallback);
      }
    };
  }
}

module.exports = exports['default'];

/***/ }),

/***/ 2221:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @ignore
 * event object for dom
 * @author yiminghe@gmail.com
 */



Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _EventBaseObject = __webpack_require__(2222);

var _EventBaseObject2 = _interopRequireDefault(_EventBaseObject);

var _objectAssign = __webpack_require__(953);

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var TRUE = true;
var FALSE = false;
var commonProps = ['altKey', 'bubbles', 'cancelable', 'ctrlKey', 'currentTarget', 'eventPhase', 'metaKey', 'shiftKey', 'target', 'timeStamp', 'view', 'type'];

function isNullOrUndefined(w) {
  return w === null || w === undefined;
}

var eventNormalizers = [{
  reg: /^key/,
  props: ['char', 'charCode', 'key', 'keyCode', 'which'],
  fix: function fix(event, nativeEvent) {
    if (isNullOrUndefined(event.which)) {
      event.which = !isNullOrUndefined(nativeEvent.charCode) ? nativeEvent.charCode : nativeEvent.keyCode;
    }

    // add metaKey to non-Mac browsers (use ctrl for PC 's and Meta for Macs)
    if (event.metaKey === undefined) {
      event.metaKey = event.ctrlKey;
    }
  }
}, {
  reg: /^touch/,
  props: ['touches', 'changedTouches', 'targetTouches']
}, {
  reg: /^hashchange$/,
  props: ['newURL', 'oldURL']
}, {
  reg: /^gesturechange$/i,
  props: ['rotation', 'scale']
}, {
  reg: /^(mousewheel|DOMMouseScroll)$/,
  props: [],
  fix: function fix(event, nativeEvent) {
    var deltaX = undefined;
    var deltaY = undefined;
    var delta = undefined;
    var wheelDelta = nativeEvent.wheelDelta;
    var axis = nativeEvent.axis;
    var wheelDeltaY = nativeEvent.wheelDeltaY;
    var wheelDeltaX = nativeEvent.wheelDeltaX;
    var detail = nativeEvent.detail;

    // ie/webkit
    if (wheelDelta) {
      delta = wheelDelta / 120;
    }

    // gecko
    if (detail) {
      // press control e.detail == 1 else e.detail == 3
      delta = 0 - (detail % 3 === 0 ? detail / 3 : detail);
    }

    // Gecko
    if (axis !== undefined) {
      if (axis === event.HORIZONTAL_AXIS) {
        deltaY = 0;
        deltaX = 0 - delta;
      } else if (axis === event.VERTICAL_AXIS) {
        deltaX = 0;
        deltaY = delta;
      }
    }

    // Webkit
    if (wheelDeltaY !== undefined) {
      deltaY = wheelDeltaY / 120;
    }
    if (wheelDeltaX !== undefined) {
      deltaX = -1 * wheelDeltaX / 120;
    }

    // 默认 deltaY (ie)
    if (!deltaX && !deltaY) {
      deltaY = delta;
    }

    if (deltaX !== undefined) {
      /**
       * deltaX of mousewheel event
       * @property deltaX
       * @member Event.DomEvent.Object
       */
      event.deltaX = deltaX;
    }

    if (deltaY !== undefined) {
      /**
       * deltaY of mousewheel event
       * @property deltaY
       * @member Event.DomEvent.Object
       */
      event.deltaY = deltaY;
    }

    if (delta !== undefined) {
      /**
       * delta of mousewheel event
       * @property delta
       * @member Event.DomEvent.Object
       */
      event.delta = delta;
    }
  }
}, {
  reg: /^mouse|contextmenu|click|mspointer|(^DOMMouseScroll$)/i,
  props: ['buttons', 'clientX', 'clientY', 'button', 'offsetX', 'relatedTarget', 'which', 'fromElement', 'toElement', 'offsetY', 'pageX', 'pageY', 'screenX', 'screenY'],
  fix: function fix(event, nativeEvent) {
    var eventDoc = undefined;
    var doc = undefined;
    var body = undefined;
    var target = event.target;
    var button = nativeEvent.button;

    // Calculate pageX/Y if missing and clientX/Y available
    if (target && isNullOrUndefined(event.pageX) && !isNullOrUndefined(nativeEvent.clientX)) {
      eventDoc = target.ownerDocument || document;
      doc = eventDoc.documentElement;
      body = eventDoc.body;
      event.pageX = nativeEvent.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
      event.pageY = nativeEvent.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
    }

    // which for click: 1 === left; 2 === middle; 3 === right
    // do not use button
    if (!event.which && button !== undefined) {
      if (button & 1) {
        event.which = 1;
      } else if (button & 2) {
        event.which = 3;
      } else if (button & 4) {
        event.which = 2;
      } else {
        event.which = 0;
      }
    }

    // add relatedTarget, if necessary
    if (!event.relatedTarget && event.fromElement) {
      event.relatedTarget = event.fromElement === target ? event.toElement : event.fromElement;
    }

    return event;
  }
}];

function retTrue() {
  return TRUE;
}

function retFalse() {
  return FALSE;
}

function DomEventObject(nativeEvent) {
  var type = nativeEvent.type;

  var isNative = typeof nativeEvent.stopPropagation === 'function' || typeof nativeEvent.cancelBubble === 'boolean';

  _EventBaseObject2['default'].call(this);

  this.nativeEvent = nativeEvent;

  // in case dom event has been mark as default prevented by lower dom node
  var isDefaultPrevented = retFalse;
  if ('defaultPrevented' in nativeEvent) {
    isDefaultPrevented = nativeEvent.defaultPrevented ? retTrue : retFalse;
  } else if ('getPreventDefault' in nativeEvent) {
    // https://bugzilla.mozilla.org/show_bug.cgi?id=691151
    isDefaultPrevented = nativeEvent.getPreventDefault() ? retTrue : retFalse;
  } else if ('returnValue' in nativeEvent) {
    isDefaultPrevented = nativeEvent.returnValue === FALSE ? retTrue : retFalse;
  }

  this.isDefaultPrevented = isDefaultPrevented;

  var fixFns = [];
  var fixFn = undefined;
  var l = undefined;
  var prop = undefined;
  var props = commonProps.concat();

  eventNormalizers.forEach(function (normalizer) {
    if (type.match(normalizer.reg)) {
      props = props.concat(normalizer.props);
      if (normalizer.fix) {
        fixFns.push(normalizer.fix);
      }
    }
  });

  l = props.length;

  // clone properties of the original event object
  while (l) {
    prop = props[--l];
    this[prop] = nativeEvent[prop];
  }

  // fix target property, if necessary
  if (!this.target && isNative) {
    this.target = nativeEvent.srcElement || document; // srcElement might not be defined either
  }

  // check if target is a text node (safari)
  if (this.target && this.target.nodeType === 3) {
    this.target = this.target.parentNode;
  }

  l = fixFns.length;

  while (l) {
    fixFn = fixFns[--l];
    fixFn(this, nativeEvent);
  }

  this.timeStamp = nativeEvent.timeStamp || Date.now();
}

var EventBaseObjectProto = _EventBaseObject2['default'].prototype;

(0, _objectAssign2['default'])(DomEventObject.prototype, EventBaseObjectProto, {
  constructor: DomEventObject,

  preventDefault: function preventDefault() {
    var e = this.nativeEvent;

    // if preventDefault exists run it on the original event
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      // otherwise set the returnValue property of the original event to FALSE (IE)
      e.returnValue = FALSE;
    }

    EventBaseObjectProto.preventDefault.call(this);
  },

  stopPropagation: function stopPropagation() {
    var e = this.nativeEvent;

    // if stopPropagation exists run it on the original event
    if (e.stopPropagation) {
      e.stopPropagation();
    } else {
      // otherwise set the cancelBubble property of the original event to TRUE (IE)
      e.cancelBubble = TRUE;
    }

    EventBaseObjectProto.stopPropagation.call(this);
  }
});

exports['default'] = DomEventObject;
module.exports = exports['default'];

/***/ }),

/***/ 2222:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @ignore
 * base event object for custom and dom event.
 * @author yiminghe@gmail.com
 */



Object.defineProperty(exports, "__esModule", {
  value: true
});
function returnFalse() {
  return false;
}

function returnTrue() {
  return true;
}

function EventBaseObject() {
  this.timeStamp = Date.now();
  this.target = undefined;
  this.currentTarget = undefined;
}

EventBaseObject.prototype = {
  isEventObject: 1,

  constructor: EventBaseObject,

  isDefaultPrevented: returnFalse,

  isPropagationStopped: returnFalse,

  isImmediatePropagationStopped: returnFalse,

  preventDefault: function preventDefault() {
    this.isDefaultPrevented = returnTrue;
  },

  stopPropagation: function stopPropagation() {
    this.isPropagationStopped = returnTrue;
  },

  stopImmediatePropagation: function stopImmediatePropagation() {
    this.isImmediatePropagationStopped = returnTrue;
    // fixed 1.2
    // call stopPropagation implicitly
    this.stopPropagation();
  },

  halt: function halt(immediate) {
    if (immediate) {
      this.stopImmediatePropagation();
    } else {
      this.stopPropagation();
    }
    this.preventDefault();
  }
};

exports["default"] = EventBaseObject;
module.exports = exports["default"];

/***/ }),

/***/ 2223:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(172);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

var _keys = __webpack_require__(49);

var _keys2 = _interopRequireDefault(_keys);

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(622);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(627);

var _classnames2 = _interopRequireDefault(_classnames);

var _warning = __webpack_require__(1000);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var calcPoints = function calcPoints(vertical, marks, dots, step, min, max) {
  (0, _warning2.default)(dots ? step > 0 : true, '`Slider[step]` should be a positive number in order to make Slider[dots] work.');
  var points = (0, _keys2.default)(marks).map(parseFloat).sort(function (a, b) {
    return a - b;
  });
  if (dots) {
    for (var i = min; i <= max; i += step) {
      if (points.indexOf(i) === -1) {
        points.push(i);
      }
    }
  }
  return points;
};

var Steps = function Steps(_ref) {
  var prefixCls = _ref.prefixCls,
      vertical = _ref.vertical,
      marks = _ref.marks,
      dots = _ref.dots,
      step = _ref.step,
      included = _ref.included,
      lowerBound = _ref.lowerBound,
      upperBound = _ref.upperBound,
      max = _ref.max,
      min = _ref.min,
      dotStyle = _ref.dotStyle,
      activeDotStyle = _ref.activeDotStyle;

  var range = max - min;
  var elements = calcPoints(vertical, marks, dots, step, min, max).map(function (point) {
    var _classNames;

    var offset = Math.abs(point - min) / range * 100 + '%';

    var isActived = !included && point === upperBound || included && point <= upperBound && point >= lowerBound;
    var style = vertical ? (0, _extends3.default)({ bottom: offset }, dotStyle) : (0, _extends3.default)({ left: offset }, dotStyle);
    if (isActived) {
      style = (0, _extends3.default)({}, style, activeDotStyle);
    }

    var pointClassName = (0, _classnames2.default)((_classNames = {}, (0, _defineProperty3.default)(_classNames, prefixCls + '-dot', true), (0, _defineProperty3.default)(_classNames, prefixCls + '-dot-active', isActived), _classNames));

    return _react2.default.createElement('span', { className: pointClassName, style: style, key: point });
  });

  return _react2.default.createElement(
    'div',
    { className: prefixCls + '-step' },
    elements
  );
};

Steps.propTypes = {
  prefixCls: _propTypes2.default.string,
  activeDotStyle: _propTypes2.default.object,
  dotStyle: _propTypes2.default.object,
  min: _propTypes2.default.number,
  max: _propTypes2.default.number,
  upperBound: _propTypes2.default.number,
  lowerBound: _propTypes2.default.number,
  included: _propTypes2.default.bool,
  dots: _propTypes2.default.bool,
  step: _propTypes2.default.number,
  marks: _propTypes2.default.object,
  vertical: _propTypes2.default.bool
};

exports.default = Steps;
module.exports = exports['default'];

/***/ }),

/***/ 2224:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = __webpack_require__(172);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _typeof2 = __webpack_require__(78);

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = __webpack_require__(49);

var _keys2 = _interopRequireDefault(_keys);

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(622);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(627);

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Marks = function Marks(_ref) {
  var className = _ref.className,
      vertical = _ref.vertical,
      marks = _ref.marks,
      included = _ref.included,
      upperBound = _ref.upperBound,
      lowerBound = _ref.lowerBound,
      max = _ref.max,
      min = _ref.min,
      onClickLabel = _ref.onClickLabel;

  var marksKeys = (0, _keys2.default)(marks);
  var marksCount = marksKeys.length;
  var unit = marksCount > 1 ? 100 / (marksCount - 1) : 100;
  var markWidth = unit * 0.9;

  var range = max - min;
  var elements = marksKeys.map(parseFloat).sort(function (a, b) {
    return a - b;
  }).map(function (point) {
    var _classNames;

    var markPoint = marks[point];
    var markPointIsObject = (typeof markPoint === 'undefined' ? 'undefined' : (0, _typeof3.default)(markPoint)) === 'object' && !_react2.default.isValidElement(markPoint);
    var markLabel = markPointIsObject ? markPoint.label : markPoint;
    if (!markLabel && markLabel !== 0) {
      return null;
    }

    var isActive = !included && point === upperBound || included && point <= upperBound && point >= lowerBound;
    var markClassName = (0, _classnames2.default)((_classNames = {}, (0, _defineProperty3.default)(_classNames, className + '-text', true), (0, _defineProperty3.default)(_classNames, className + '-text-active', isActive), _classNames));

    var bottomStyle = {
      marginBottom: '-50%',
      bottom: (point - min) / range * 100 + '%'
    };

    var leftStyle = {
      width: markWidth + '%',
      marginLeft: -markWidth / 2 + '%',
      left: (point - min) / range * 100 + '%'
    };

    var style = vertical ? bottomStyle : leftStyle;
    var markStyle = markPointIsObject ? (0, _extends3.default)({}, style, markPoint.style) : style;
    return _react2.default.createElement(
      'span',
      {
        className: markClassName,
        style: markStyle,
        key: point,
        onMouseDown: function onMouseDown(e) {
          return onClickLabel(e, point);
        },
        onTouchStart: function onTouchStart(e) {
          return onClickLabel(e, point);
        }
      },
      markLabel
    );
  });

  return _react2.default.createElement(
    'div',
    { className: className },
    elements
  );
};

Marks.propTypes = {
  className: _propTypes2.default.string,
  vertical: _propTypes2.default.bool,
  marks: _propTypes2.default.object,
  included: _propTypes2.default.bool,
  upperBound: _propTypes2.default.number,
  lowerBound: _propTypes2.default.number,
  max: _propTypes2.default.number,
  min: _propTypes2.default.number,
  onClickLabel: _propTypes2.default.func
};

exports.default = Marks;
module.exports = exports['default'];

/***/ }),

/***/ 2225:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @ignore
 * some key-codes definition and utils from closure-library
 * @author yiminghe@gmail.com
 */

var KeyCode = {
  /**
   * MAC_ENTER
   */
  MAC_ENTER: 3,
  /**
   * BACKSPACE
   */
  BACKSPACE: 8,
  /**
   * TAB
   */
  TAB: 9,
  /**
   * NUMLOCK on FF/Safari Mac
   */
  NUM_CENTER: 12, // NUMLOCK on FF/Safari Mac
  /**
   * ENTER
   */
  ENTER: 13,
  /**
   * SHIFT
   */
  SHIFT: 16,
  /**
   * CTRL
   */
  CTRL: 17,
  /**
   * ALT
   */
  ALT: 18,
  /**
   * PAUSE
   */
  PAUSE: 19,
  /**
   * CAPS_LOCK
   */
  CAPS_LOCK: 20,
  /**
   * ESC
   */
  ESC: 27,
  /**
   * SPACE
   */
  SPACE: 32,
  /**
   * PAGE_UP
   */
  PAGE_UP: 33, // also NUM_NORTH_EAST
  /**
   * PAGE_DOWN
   */
  PAGE_DOWN: 34, // also NUM_SOUTH_EAST
  /**
   * END
   */
  END: 35, // also NUM_SOUTH_WEST
  /**
   * HOME
   */
  HOME: 36, // also NUM_NORTH_WEST
  /**
   * LEFT
   */
  LEFT: 37, // also NUM_WEST
  /**
   * UP
   */
  UP: 38, // also NUM_NORTH
  /**
   * RIGHT
   */
  RIGHT: 39, // also NUM_EAST
  /**
   * DOWN
   */
  DOWN: 40, // also NUM_SOUTH
  /**
   * PRINT_SCREEN
   */
  PRINT_SCREEN: 44,
  /**
   * INSERT
   */
  INSERT: 45, // also NUM_INSERT
  /**
   * DELETE
   */
  DELETE: 46, // also NUM_DELETE
  /**
   * ZERO
   */
  ZERO: 48,
  /**
   * ONE
   */
  ONE: 49,
  /**
   * TWO
   */
  TWO: 50,
  /**
   * THREE
   */
  THREE: 51,
  /**
   * FOUR
   */
  FOUR: 52,
  /**
   * FIVE
   */
  FIVE: 53,
  /**
   * SIX
   */
  SIX: 54,
  /**
   * SEVEN
   */
  SEVEN: 55,
  /**
   * EIGHT
   */
  EIGHT: 56,
  /**
   * NINE
   */
  NINE: 57,
  /**
   * QUESTION_MARK
   */
  QUESTION_MARK: 63, // needs localization
  /**
   * A
   */
  A: 65,
  /**
   * B
   */
  B: 66,
  /**
   * C
   */
  C: 67,
  /**
   * D
   */
  D: 68,
  /**
   * E
   */
  E: 69,
  /**
   * F
   */
  F: 70,
  /**
   * G
   */
  G: 71,
  /**
   * H
   */
  H: 72,
  /**
   * I
   */
  I: 73,
  /**
   * J
   */
  J: 74,
  /**
   * K
   */
  K: 75,
  /**
   * L
   */
  L: 76,
  /**
   * M
   */
  M: 77,
  /**
   * N
   */
  N: 78,
  /**
   * O
   */
  O: 79,
  /**
   * P
   */
  P: 80,
  /**
   * Q
   */
  Q: 81,
  /**
   * R
   */
  R: 82,
  /**
   * S
   */
  S: 83,
  /**
   * T
   */
  T: 84,
  /**
   * U
   */
  U: 85,
  /**
   * V
   */
  V: 86,
  /**
   * W
   */
  W: 87,
  /**
   * X
   */
  X: 88,
  /**
   * Y
   */
  Y: 89,
  /**
   * Z
   */
  Z: 90,
  /**
   * META
   */
  META: 91, // WIN_KEY_LEFT
  /**
   * WIN_KEY_RIGHT
   */
  WIN_KEY_RIGHT: 92,
  /**
   * CONTEXT_MENU
   */
  CONTEXT_MENU: 93,
  /**
   * NUM_ZERO
   */
  NUM_ZERO: 96,
  /**
   * NUM_ONE
   */
  NUM_ONE: 97,
  /**
   * NUM_TWO
   */
  NUM_TWO: 98,
  /**
   * NUM_THREE
   */
  NUM_THREE: 99,
  /**
   * NUM_FOUR
   */
  NUM_FOUR: 100,
  /**
   * NUM_FIVE
   */
  NUM_FIVE: 101,
  /**
   * NUM_SIX
   */
  NUM_SIX: 102,
  /**
   * NUM_SEVEN
   */
  NUM_SEVEN: 103,
  /**
   * NUM_EIGHT
   */
  NUM_EIGHT: 104,
  /**
   * NUM_NINE
   */
  NUM_NINE: 105,
  /**
   * NUM_MULTIPLY
   */
  NUM_MULTIPLY: 106,
  /**
   * NUM_PLUS
   */
  NUM_PLUS: 107,
  /**
   * NUM_MINUS
   */
  NUM_MINUS: 109,
  /**
   * NUM_PERIOD
   */
  NUM_PERIOD: 110,
  /**
   * NUM_DIVISION
   */
  NUM_DIVISION: 111,
  /**
   * F1
   */
  F1: 112,
  /**
   * F2
   */
  F2: 113,
  /**
   * F3
   */
  F3: 114,
  /**
   * F4
   */
  F4: 115,
  /**
   * F5
   */
  F5: 116,
  /**
   * F6
   */
  F6: 117,
  /**
   * F7
   */
  F7: 118,
  /**
   * F8
   */
  F8: 119,
  /**
   * F9
   */
  F9: 120,
  /**
   * F10
   */
  F10: 121,
  /**
   * F11
   */
  F11: 122,
  /**
   * F12
   */
  F12: 123,
  /**
   * NUMLOCK
   */
  NUMLOCK: 144,
  /**
   * SEMICOLON
   */
  SEMICOLON: 186, // needs localization
  /**
   * DASH
   */
  DASH: 189, // needs localization
  /**
   * EQUALS
   */
  EQUALS: 187, // needs localization
  /**
   * COMMA
   */
  COMMA: 188, // needs localization
  /**
   * PERIOD
   */
  PERIOD: 190, // needs localization
  /**
   * SLASH
   */
  SLASH: 191, // needs localization
  /**
   * APOSTROPHE
   */
  APOSTROPHE: 192, // needs localization
  /**
   * SINGLE_QUOTE
   */
  SINGLE_QUOTE: 222, // needs localization
  /**
   * OPEN_SQUARE_BRACKET
   */
  OPEN_SQUARE_BRACKET: 219, // needs localization
  /**
   * BACKSLASH
   */
  BACKSLASH: 220, // needs localization
  /**
   * CLOSE_SQUARE_BRACKET
   */
  CLOSE_SQUARE_BRACKET: 221, // needs localization
  /**
   * WIN_KEY
   */
  WIN_KEY: 224,
  /**
   * MAC_FF_META
   */
  MAC_FF_META: 224, // Firefox (Gecko) fires this for the meta key instead of 91
  /**
   * WIN_IME
   */
  WIN_IME: 229
};

/*
 whether text and modified key is entered at the same time.
 */
KeyCode.isTextModifyingKeyEvent = function isTextModifyingKeyEvent(e) {
  var keyCode = e.keyCode;
  if (e.altKey && !e.ctrlKey || e.metaKey ||
  // Function keys don't generate text
  keyCode >= KeyCode.F1 && keyCode <= KeyCode.F12) {
    return false;
  }

  // The following keys are quite harmless, even in combination with
  // CTRL, ALT or SHIFT.
  switch (keyCode) {
    case KeyCode.ALT:
    case KeyCode.CAPS_LOCK:
    case KeyCode.CONTEXT_MENU:
    case KeyCode.CTRL:
    case KeyCode.DOWN:
    case KeyCode.END:
    case KeyCode.ESC:
    case KeyCode.HOME:
    case KeyCode.INSERT:
    case KeyCode.LEFT:
    case KeyCode.MAC_FF_META:
    case KeyCode.META:
    case KeyCode.NUMLOCK:
    case KeyCode.NUM_CENTER:
    case KeyCode.PAGE_DOWN:
    case KeyCode.PAGE_UP:
    case KeyCode.PAUSE:
    case KeyCode.PRINT_SCREEN:
    case KeyCode.RIGHT:
    case KeyCode.SHIFT:
    case KeyCode.UP:
    case KeyCode.WIN_KEY:
    case KeyCode.WIN_KEY_RIGHT:
      return false;
    default:
      return true;
  }
};

/*
 whether character is entered.
 */
KeyCode.isCharacterKey = function isCharacterKey(keyCode) {
  if (keyCode >= KeyCode.ZERO && keyCode <= KeyCode.NINE) {
    return true;
  }

  if (keyCode >= KeyCode.NUM_ZERO && keyCode <= KeyCode.NUM_MULTIPLY) {
    return true;
  }

  if (keyCode >= KeyCode.A && keyCode <= KeyCode.Z) {
    return true;
  }

  // Safari sends zero key code for non-latin characters.
  if (window.navigation.userAgent.indexOf('WebKit') !== -1 && keyCode === 0) {
    return true;
  }

  switch (keyCode) {
    case KeyCode.SPACE:
    case KeyCode.QUESTION_MARK:
    case KeyCode.NUM_PLUS:
    case KeyCode.NUM_MINUS:
    case KeyCode.NUM_PERIOD:
    case KeyCode.NUM_DIVISION:
    case KeyCode.SEMICOLON:
    case KeyCode.DASH:
    case KeyCode.EQUALS:
    case KeyCode.COMMA:
    case KeyCode.PERIOD:
    case KeyCode.SLASH:
    case KeyCode.APOSTROPHE:
    case KeyCode.SINGLE_QUOTE:
    case KeyCode.OPEN_SQUARE_BRACKET:
    case KeyCode.BACKSLASH:
    case KeyCode.CLOSE_SQUARE_BRACKET:
      return true;
    default:
      return false;
  }
};

exports['default'] = KeyCode;
module.exports = exports['default'];

/***/ }),

/***/ 2226:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(172);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _keys = __webpack_require__(49);

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = __webpack_require__(171);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getPrototypeOf = __webpack_require__(40);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(466);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(38);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(39);

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp; /* eslint-disable react/prop-types */


var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(622);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(627);

var _classnames2 = _interopRequireDefault(_classnames);

var _shallowequal = __webpack_require__(2227);

var _shallowequal2 = _interopRequireDefault(_shallowequal);

var _Track = __webpack_require__(1993);

var _Track2 = _interopRequireDefault(_Track);

var _createSlider = __webpack_require__(1994);

var _createSlider2 = _interopRequireDefault(_createSlider);

var _utils = __webpack_require__(1002);

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Range = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(Range, _React$Component);

  function Range(props) {
    (0, _classCallCheck3.default)(this, Range);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Range.__proto__ || (0, _getPrototypeOf2.default)(Range)).call(this, props));

    _this.onEnd = function () {
      _this.setState({
        handle: null
      });
      _this.removeDocumentEvents();
      _this.props.onAfterChange(_this.getValue());
    };

    var count = props.count,
        min = props.min,
        max = props.max;

    var initialValue = Array.apply(undefined, (0, _toConsumableArray3.default)(Array(count + 1))).map(function () {
      return min;
    });
    var defaultValue = 'defaultValue' in props ? props.defaultValue : initialValue;
    var value = props.value !== undefined ? props.value : defaultValue;
    var bounds = value.map(function (v, i) {
      return _this.trimAlignValue(v, i);
    });
    var recent = bounds[0] === max ? 0 : bounds.length - 1;

    _this.state = {
      handle: null,
      recent: recent,
      bounds: bounds
    };
    return _this;
  }

  (0, _createClass3.default)(Range, [{
    key: 'UNSAFE_componentWillReceiveProps',
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var _this2 = this;

      if (!('value' in nextProps || 'min' in nextProps || 'max' in nextProps)) return;
      if (this.props.min === nextProps.min && this.props.max === nextProps.max && (0, _shallowequal2.default)(this.props.value, nextProps.value)) {
        return;
      }

      var bounds = this.state.bounds;

      var value = nextProps.value || bounds;
      var nextBounds = value.map(function (v, i) {
        return _this2.trimAlignValue(v, i, nextProps);
      });
      if (nextBounds.length === bounds.length && nextBounds.every(function (v, i) {
        return v === bounds[i];
      })) return;

      this.setState({ bounds: nextBounds });

      if (value.some(function (v) {
        return utils.isValueOutOfRange(v, nextProps);
      })) {
        var newValues = value.map(function (v) {
          return utils.ensureValueInRange(v, nextProps);
        });
        this.props.onChange(newValues);
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      var props = this.props;
      var isNotControlled = !('value' in props);
      if (isNotControlled) {
        this.setState(state);
      } else if (state.handle !== undefined) {
        this.setState({ handle: state.handle });
      }

      var data = (0, _extends3.default)({}, this.state, state);
      var changedValue = data.bounds;
      props.onChange(changedValue);
    }
  }, {
    key: 'onStart',
    value: function onStart(position) {
      var props = this.props;
      var state = this.state;
      var bounds = this.getValue();
      props.onBeforeChange(bounds);

      var value = this.calcValueByPos(position);
      this.startValue = value;
      this.startPosition = position;

      var closestBound = this.getClosestBound(value);
      this.prevMovedHandleIndex = this.getBoundNeedMoving(value, closestBound);

      this.setState({
        handle: this.prevMovedHandleIndex,
        recent: this.prevMovedHandleIndex
      });

      var prevValue = bounds[this.prevMovedHandleIndex];
      if (value === prevValue) return;

      var nextBounds = [].concat((0, _toConsumableArray3.default)(state.bounds));
      nextBounds[this.prevMovedHandleIndex] = value;
      this.onChange({ bounds: nextBounds });
    }
  }, {
    key: 'onMove',
    value: function onMove(e, position) {
      utils.pauseEvent(e);
      var state = this.state;

      var value = this.calcValueByPos(position);
      var oldValue = state.bounds[state.handle];
      if (value === oldValue) return;

      this.moveTo(value);
    }
  }, {
    key: 'onKeyboard',
    value: function onKeyboard(e) {
      var valueMutator = utils.getKeyboardValueMutator(e);

      if (valueMutator) {
        utils.pauseEvent(e);
        var state = this.state,
            props = this.props;
        var bounds = state.bounds,
            handle = state.handle;

        var oldValue = bounds[handle];
        var mutatedValue = valueMutator(oldValue, props);
        var value = this.trimAlignValue(mutatedValue);
        if (value === oldValue) return;
        var isFromKeyboardEvent = true;
        this.moveTo(value, isFromKeyboardEvent);
      }
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.state.bounds;
    }
  }, {
    key: 'getClosestBound',
    value: function getClosestBound(value) {
      var bounds = this.state.bounds;

      var closestBound = 0;
      for (var i = 1; i < bounds.length - 1; ++i) {
        if (value > bounds[i]) {
          closestBound = i;
        }
      }
      if (Math.abs(bounds[closestBound + 1] - value) < Math.abs(bounds[closestBound] - value)) {
        closestBound += 1;
      }
      return closestBound;
    }
  }, {
    key: 'getBoundNeedMoving',
    value: function getBoundNeedMoving(value, closestBound) {
      var _state = this.state,
          bounds = _state.bounds,
          recent = _state.recent;

      var boundNeedMoving = closestBound;
      var isAtTheSamePoint = bounds[closestBound + 1] === bounds[closestBound];

      if (isAtTheSamePoint && bounds[recent] === bounds[closestBound]) {
        boundNeedMoving = recent;
      }

      if (isAtTheSamePoint && value !== bounds[closestBound + 1]) {
        boundNeedMoving = value < bounds[closestBound + 1] ? closestBound : closestBound + 1;
      }
      return boundNeedMoving;
    }
  }, {
    key: 'getLowerBound',
    value: function getLowerBound() {
      return this.state.bounds[0];
    }
  }, {
    key: 'getUpperBound',
    value: function getUpperBound() {
      var bounds = this.state.bounds;

      return bounds[bounds.length - 1];
    }

    /**
     * Returns an array of possible slider points, taking into account both
     * `marks` and `step`. The result is cached.
     */

  }, {
    key: 'getPoints',
    value: function getPoints() {
      var _props = this.props,
          marks = _props.marks,
          step = _props.step,
          min = _props.min,
          max = _props.max;

      var cache = this._getPointsCache;
      if (!cache || cache.marks !== marks || cache.step !== step) {
        var pointsObject = (0, _extends3.default)({}, marks);
        if (step !== null) {
          for (var point = min; point <= max; point += step) {
            pointsObject[point] = point;
          }
        }
        var points = (0, _keys2.default)(pointsObject).map(parseFloat);
        points.sort(function (a, b) {
          return a - b;
        });
        this._getPointsCache = { marks: marks, step: step, points: points };
      }
      return this._getPointsCache.points;
    }
  }, {
    key: 'moveTo',
    value: function moveTo(value, isFromKeyboardEvent) {
      var _this3 = this;

      var state = this.state,
          props = this.props;

      var nextBounds = [].concat((0, _toConsumableArray3.default)(state.bounds));
      nextBounds[state.handle] = value;
      var nextHandle = state.handle;
      if (props.pushable !== false) {
        this.pushSurroundingHandles(nextBounds, nextHandle);
      } else if (props.allowCross) {
        nextBounds.sort(function (a, b) {
          return a - b;
        });
        nextHandle = nextBounds.indexOf(value);
      }
      this.onChange({
        handle: nextHandle,
        bounds: nextBounds
      });
      if (isFromKeyboardEvent) {
        // known problem: because setState is async,
        // so trigger focus will invoke handler's onEnd and another handler's onStart too early,
        // cause onBeforeChange and onAfterChange receive wrong value.
        // here use setState callback to hack，but not elegant
        this.setState({}, function () {
          _this3.handlesRefs[nextHandle].focus();
        });
      }
    }
  }, {
    key: 'pushSurroundingHandles',
    value: function pushSurroundingHandles(bounds, handle) {
      var value = bounds[handle];
      var threshold = this.props.pushable;

      threshold = Number(threshold);

      var direction = 0;
      if (bounds[handle + 1] - value < threshold) {
        direction = +1; // push to right
      }
      if (value - bounds[handle - 1] < threshold) {
        direction = -1; // push to left
      }

      if (direction === 0) {
        return;
      }

      var nextHandle = handle + direction;
      var diffToNext = direction * (bounds[nextHandle] - value);
      if (!this.pushHandle(bounds, nextHandle, direction, threshold - diffToNext)) {
        // revert to original value if pushing is impossible
        bounds[handle] = bounds[nextHandle] - direction * threshold;
      }
    }
  }, {
    key: 'pushHandle',
    value: function pushHandle(bounds, handle, direction, amount) {
      var originalValue = bounds[handle];
      var currentValue = bounds[handle];
      while (direction * (currentValue - originalValue) < amount) {
        if (!this.pushHandleOnePoint(bounds, handle, direction)) {
          // can't push handle enough to create the needed `amount` gap, so we
          // revert its position to the original value
          bounds[handle] = originalValue;
          return false;
        }
        currentValue = bounds[handle];
      }
      // the handle was pushed enough to create the needed `amount` gap
      return true;
    }
  }, {
    key: 'pushHandleOnePoint',
    value: function pushHandleOnePoint(bounds, handle, direction) {
      var points = this.getPoints();
      var pointIndex = points.indexOf(bounds[handle]);
      var nextPointIndex = pointIndex + direction;
      if (nextPointIndex >= points.length || nextPointIndex < 0) {
        // reached the minimum or maximum available point, can't push anymore
        return false;
      }
      var nextHandle = handle + direction;
      var nextValue = points[nextPointIndex];
      var threshold = this.props.pushable;

      var diffToNext = direction * (bounds[nextHandle] - nextValue);
      if (!this.pushHandle(bounds, nextHandle, direction, threshold - diffToNext)) {
        // couldn't push next handle, so we won't push this one either
        return false;
      }
      // push the handle
      bounds[handle] = nextValue;
      return true;
    }
  }, {
    key: 'trimAlignValue',
    value: function trimAlignValue(v, handle) {
      var nextProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var mergedProps = (0, _extends3.default)({}, this.props, nextProps);
      var valInRange = utils.ensureValueInRange(v, mergedProps);
      var valNotConflict = this.ensureValueNotConflict(handle, valInRange, mergedProps);
      return utils.ensureValuePrecision(valNotConflict, mergedProps);
    }
  }, {
    key: 'ensureValueNotConflict',
    value: function ensureValueNotConflict(handle, val, _ref) {
      var allowCross = _ref.allowCross,
          thershold = _ref.pushable;

      var state = this.state || {};
      var bounds = state.bounds;

      handle = handle === undefined ? state.handle : handle;
      thershold = Number(thershold);
      /* eslint-disable eqeqeq */
      if (!allowCross && handle != null && bounds !== undefined) {
        if (handle > 0 && val <= bounds[handle - 1] + thershold) {
          return bounds[handle - 1] + thershold;
        }
        if (handle < bounds.length - 1 && val >= bounds[handle + 1] - thershold) {
          return bounds[handle + 1] - thershold;
        }
      }
      /* eslint-enable eqeqeq */
      return val;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _state2 = this.state,
          handle = _state2.handle,
          bounds = _state2.bounds;
      var _props2 = this.props,
          prefixCls = _props2.prefixCls,
          vertical = _props2.vertical,
          included = _props2.included,
          disabled = _props2.disabled,
          min = _props2.min,
          max = _props2.max,
          handleGenerator = _props2.handle,
          trackStyle = _props2.trackStyle,
          handleStyle = _props2.handleStyle,
          tabIndex = _props2.tabIndex;


      var offsets = bounds.map(function (v) {
        return _this4.calcOffset(v);
      });

      var handleClassName = prefixCls + '-handle';
      var handles = bounds.map(function (v, i) {
        var _classNames;

        return handleGenerator({
          className: (0, _classnames2.default)((_classNames = {}, (0, _defineProperty3.default)(_classNames, handleClassName, true), (0, _defineProperty3.default)(_classNames, handleClassName + '-' + (i + 1), true), _classNames)),
          prefixCls: prefixCls,
          vertical: vertical,
          offset: offsets[i],
          value: v,
          dragging: handle === i,
          index: i,
          tabIndex: tabIndex[i] || 0,
          min: min,
          max: max,
          disabled: disabled,
          style: handleStyle[i],
          ref: function ref(h) {
            return _this4.saveHandle(i, h);
          }
        });
      });

      var tracks = bounds.slice(0, -1).map(function (_, index) {
        var _classNames2;

        var i = index + 1;
        var trackClassName = (0, _classnames2.default)((_classNames2 = {}, (0, _defineProperty3.default)(_classNames2, prefixCls + '-track', true), (0, _defineProperty3.default)(_classNames2, prefixCls + '-track-' + i, true), _classNames2));
        return _react2.default.createElement(_Track2.default, {
          className: trackClassName,
          vertical: vertical,
          included: included,
          offset: offsets[i - 1],
          length: offsets[i] - offsets[i - 1],
          style: trackStyle[index],
          key: i
        });
      });

      return { tracks: tracks, handles: handles };
    }
  }]);
  return Range;
}(_react2.default.Component), _class.displayName = 'Range', _class.propTypes = {
  defaultValue: _propTypes2.default.arrayOf(_propTypes2.default.number),
  value: _propTypes2.default.arrayOf(_propTypes2.default.number),
  count: _propTypes2.default.number,
  pushable: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.number]),
  allowCross: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  tabIndex: _propTypes2.default.arrayOf(_propTypes2.default.number),
  min: _propTypes2.default.number,
  max: _propTypes2.default.number
}, _class.defaultProps = {
  count: 1,
  allowCross: true,
  pushable: false,
  tabIndex: []
}, _temp);
exports.default = (0, _createSlider2.default)(Range);
module.exports = exports['default'];

/***/ }),

/***/ 2227:
/***/ (function(module, exports) {

//

module.exports = function shallowEqual(objA, objB, compare, compareContext) {
  var ret = compare ? compare.call(compareContext, objA, objB) : void 0;

  if (ret !== void 0) {
    return !!ret;
  }

  if (objA === objB) {
    return true;
  }

  if (typeof objA !== "object" || !objA || typeof objB !== "object" || !objB) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

  // Test for A's keys different from B.
  for (var idx = 0; idx < keysA.length; idx++) {
    var key = keysA[idx];

    if (!bHasOwnProperty(key)) {
      return false;
    }

    var valueA = objA[key];
    var valueB = objB[key];

    ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;

    if (ret === false || (ret === void 0 && valueA !== valueB)) {
      return false;
    }
  }

  return true;
};


/***/ }),

/***/ 2228:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = __webpack_require__(170);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _defineProperty2 = __webpack_require__(172);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = __webpack_require__(11);

var _extends4 = _interopRequireDefault(_extends3);

var _getPrototypeOf = __webpack_require__(40);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(466);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(38);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(39);

var _inherits3 = _interopRequireDefault(_inherits2);

exports.default = createSliderWithTooltip;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(622);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _rcTooltip = __webpack_require__(2229);

var _rcTooltip2 = _interopRequireDefault(_rcTooltip);

var _Handle = __webpack_require__(1001);

var _Handle2 = _interopRequireDefault(_Handle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createSliderWithTooltip(Component) {
  var _class, _temp;

  return _temp = _class = function (_React$Component) {
    (0, _inherits3.default)(ComponentWrapper, _React$Component);

    function ComponentWrapper(props) {
      (0, _classCallCheck3.default)(this, ComponentWrapper);

      var _this = (0, _possibleConstructorReturn3.default)(this, (ComponentWrapper.__proto__ || (0, _getPrototypeOf2.default)(ComponentWrapper)).call(this, props));

      _this.handleTooltipVisibleChange = function (index, visible) {
        _this.setState(function (prevState) {
          return {
            visibles: (0, _extends4.default)({}, prevState.visibles, (0, _defineProperty3.default)({}, index, visible))
          };
        });
      };

      _this.handleWithTooltip = function (_ref) {
        var value = _ref.value,
            dragging = _ref.dragging,
            index = _ref.index,
            disabled = _ref.disabled,
            restProps = (0, _objectWithoutProperties3.default)(_ref, ['value', 'dragging', 'index', 'disabled']);
        var _this$props = _this.props,
            tipFormatter = _this$props.tipFormatter,
            tipProps = _this$props.tipProps,
            handleStyle = _this$props.handleStyle;
        var _tipProps$prefixCls = tipProps.prefixCls,
            prefixCls = _tipProps$prefixCls === undefined ? 'rc-slider-tooltip' : _tipProps$prefixCls,
            _tipProps$overlay = tipProps.overlay,
            overlay = _tipProps$overlay === undefined ? tipFormatter(value) : _tipProps$overlay,
            _tipProps$placement = tipProps.placement,
            placement = _tipProps$placement === undefined ? 'top' : _tipProps$placement,
            _tipProps$visible = tipProps.visible,
            visible = _tipProps$visible === undefined ? false : _tipProps$visible,
            restTooltipProps = (0, _objectWithoutProperties3.default)(tipProps, ['prefixCls', 'overlay', 'placement', 'visible']);


        var handleStyleWithIndex = void 0;
        if (Array.isArray(handleStyle)) {
          handleStyleWithIndex = handleStyle[index] || handleStyle[0];
        } else {
          handleStyleWithIndex = handleStyle;
        }

        return _react2.default.createElement(
          _rcTooltip2.default,
          (0, _extends4.default)({}, restTooltipProps, {
            prefixCls: prefixCls,
            overlay: overlay,
            placement: placement,
            visible: !disabled && (_this.state.visibles[index] || dragging) || visible,
            key: index
          }),
          _react2.default.createElement(_Handle2.default, (0, _extends4.default)({}, restProps, {
            style: (0, _extends4.default)({}, handleStyleWithIndex),
            value: value,
            onMouseEnter: function onMouseEnter() {
              return _this.handleTooltipVisibleChange(index, true);
            },
            onMouseLeave: function onMouseLeave() {
              return _this.handleTooltipVisibleChange(index, false);
            }
          }))
        );
      };

      _this.state = { visibles: {} };
      return _this;
    }

    (0, _createClass3.default)(ComponentWrapper, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(Component, (0, _extends4.default)({}, this.props, { handle: this.handleWithTooltip }));
      }
    }]);
    return ComponentWrapper;
  }(_react2.default.Component), _class.propTypes = {
    tipFormatter: _propTypes2.default.func,
    handleStyle: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.arrayOf(_propTypes2.default.object)]),
    tipProps: _propTypes2.default.object
  }, _class.defaultProps = {
    tipFormatter: function tipFormatter(value) {
      return value;
    },

    handleStyle: [{}],
    tipProps: {}
  }, _temp;
}
module.exports = exports['default'];

/***/ }),

/***/ 2229:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Tooltip__ = __webpack_require__(2230);


/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__Tooltip__["a" /* default */]);

/***/ }),

/***/ 2230:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(459);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types__ = __webpack_require__(1996);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rc_trigger__ = __webpack_require__(2235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__placements__ = __webpack_require__(2288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Content__ = __webpack_require__(2289);











var Tooltip = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Tooltip, _Component);

  function Tooltip() {
    var _temp, _this, _ret;

    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, Tooltip);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.getPopupElement = function () {
      var _this$props = _this.props,
          arrowContent = _this$props.arrowContent,
          overlay = _this$props.overlay,
          prefixCls = _this$props.prefixCls,
          id = _this$props.id;

      return [__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'div',
        { className: prefixCls + '-arrow', key: 'arrow' },
        arrowContent
      ), __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9__Content__["a" /* default */], {
        key: 'content',
        trigger: _this.trigger,
        prefixCls: prefixCls,
        id: id,
        overlay: overlay
      })];
    }, _this.saveTrigger = function (node) {
      _this.trigger = node;
    }, _temp), __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(_this, _ret);
  }

  Tooltip.prototype.getPopupDomNode = function getPopupDomNode() {
    return this.trigger.getPopupDomNode();
  };

  Tooltip.prototype.render = function render() {
    var _props = this.props,
        overlayClassName = _props.overlayClassName,
        trigger = _props.trigger,
        mouseEnterDelay = _props.mouseEnterDelay,
        mouseLeaveDelay = _props.mouseLeaveDelay,
        overlayStyle = _props.overlayStyle,
        prefixCls = _props.prefixCls,
        children = _props.children,
        onVisibleChange = _props.onVisibleChange,
        afterVisibleChange = _props.afterVisibleChange,
        transitionName = _props.transitionName,
        animation = _props.animation,
        placement = _props.placement,
        align = _props.align,
        destroyTooltipOnHide = _props.destroyTooltipOnHide,
        defaultVisible = _props.defaultVisible,
        getTooltipContainer = _props.getTooltipContainer,
        restProps = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties___default()(_props, ['overlayClassName', 'trigger', 'mouseEnterDelay', 'mouseLeaveDelay', 'overlayStyle', 'prefixCls', 'children', 'onVisibleChange', 'afterVisibleChange', 'transitionName', 'animation', 'placement', 'align', 'destroyTooltipOnHide', 'defaultVisible', 'getTooltipContainer']);

    var extraProps = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, restProps);
    if ('visible' in this.props) {
      extraProps.popupVisible = this.props.visible;
    }
    return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_7_rc_trigger__["a" /* default */],
      __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({
        popupClassName: overlayClassName,
        ref: this.saveTrigger,
        prefixCls: prefixCls,
        popup: this.getPopupElement,
        action: trigger,
        builtinPlacements: __WEBPACK_IMPORTED_MODULE_8__placements__["a" /* placements */],
        popupPlacement: placement,
        popupAlign: align,
        getPopupContainer: getTooltipContainer,
        onPopupVisibleChange: onVisibleChange,
        afterPopupVisibleChange: afterVisibleChange,
        popupTransitionName: transitionName,
        popupAnimation: animation,
        defaultPopupVisible: defaultVisible,
        destroyPopupOnHide: destroyTooltipOnHide,
        mouseLeaveDelay: mouseLeaveDelay,
        popupStyle: overlayStyle,
        mouseEnterDelay: mouseEnterDelay
      }, extraProps),
      children
    );
  };

  return Tooltip;
}(__WEBPACK_IMPORTED_MODULE_5_react__["Component"]);

Tooltip.propTypes = {
  trigger: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.any,
  children: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.any,
  defaultVisible: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.bool,
  visible: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.bool,
  placement: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.string,
  transitionName: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.object]),
  animation: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.any,
  onVisibleChange: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func,
  afterVisibleChange: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func,
  overlay: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.node, __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func]).isRequired,
  overlayStyle: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.object,
  overlayClassName: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.string,
  prefixCls: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.string,
  mouseEnterDelay: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.number,
  mouseLeaveDelay: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.number,
  getTooltipContainer: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func,
  destroyTooltipOnHide: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.bool,
  align: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.object,
  arrowContent: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.any,
  id: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.string
};
Tooltip.defaultProps = {
  prefixCls: 'rc-tooltip',
  mouseEnterDelay: 0,
  destroyTooltipOnHide: false,
  mouseLeaveDelay: 0.1,
  align: {},
  placement: 'right',
  trigger: ['hover'],
  arrowContent: null
};


/* harmony default export */ __webpack_exports__["a"] = (Tooltip);

/***/ }),

/***/ 2231:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(2232);
var invariant = __webpack_require__(2233);
var ReactPropTypesSecret = __webpack_require__(2234);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ 2232:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),

/***/ 2233:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (false) {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),

/***/ 2234:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ 2235:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(459);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__(955);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_dom__ = __webpack_require__(551);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_create_react_class__ = __webpack_require__(2240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_create_react_class___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_create_react_class__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rc_util_es_Dom_contains__ = __webpack_require__(2244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rc_util_lib_Dom_addEventListener__ = __webpack_require__(2245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rc_util_lib_Dom_addEventListener___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rc_util_lib_Dom_addEventListener__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Popup__ = __webpack_require__(2249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__utils__ = __webpack_require__(2002);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rc_util_lib_getContainerRenderMixin__ = __webpack_require__(2281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rc_util_lib_getContainerRenderMixin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rc_util_lib_getContainerRenderMixin__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rc_util_lib_Portal__ = __webpack_require__(2282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rc_util_lib_Portal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rc_util_lib_Portal__);












function noop() {}

function returnEmptyString() {
  return '';
}

function returnDocument() {
  return window.document;
}

var ALL_HANDLERS = ['onClick', 'onMouseDown', 'onTouchStart', 'onMouseEnter', 'onMouseLeave', 'onFocus', 'onBlur', 'onContextMenu'];

var IS_REACT_16 = !!__WEBPACK_IMPORTED_MODULE_3_react_dom__["createPortal"];

var isMobile = typeof navigator !== 'undefined' && !!navigator.userAgent.match(/(Android|iPhone|iPad|iPod|iOS|UCWEB)/i);

var mixins = [];

if (!IS_REACT_16) {
  mixins.push(__WEBPACK_IMPORTED_MODULE_9_rc_util_lib_getContainerRenderMixin___default()({
    autoMount: false,

    isVisible: function isVisible(instance) {
      return instance.state.popupVisible;
    },
    isForceRender: function isForceRender(instance) {
      return instance.props.forceRender;
    },
    getContainer: function getContainer(instance) {
      return instance.getContainer();
    }
  }));
}

var Trigger = __WEBPACK_IMPORTED_MODULE_4_create_react_class___default()({
  displayName: 'Trigger',
  propTypes: {
    children: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.any,
    action: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string)]),
    showAction: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.any,
    hideAction: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.any,
    getPopupClassNameFromAlign: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.any,
    onPopupVisibleChange: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
    afterPopupVisibleChange: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
    popup: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.node, __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func]).isRequired,
    popupStyle: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object,
    prefixCls: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string,
    popupClassName: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string,
    popupPlacement: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string,
    builtinPlacements: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object,
    popupTransitionName: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object]),
    popupAnimation: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.any,
    mouseEnterDelay: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.number,
    mouseLeaveDelay: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.number,
    zIndex: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.number,
    focusDelay: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.number,
    blurDelay: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.number,
    getPopupContainer: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
    getDocument: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
    forceRender: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool,
    destroyPopupOnHide: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool,
    mask: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool,
    maskClosable: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool,
    onPopupAlign: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
    popupAlign: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object,
    popupVisible: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool,
    maskTransitionName: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object]),
    maskAnimation: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string
  },

  mixins: mixins,

  getDefaultProps: function getDefaultProps() {
    return {
      prefixCls: 'rc-trigger-popup',
      getPopupClassNameFromAlign: returnEmptyString,
      getDocument: returnDocument,
      onPopupVisibleChange: noop,
      afterPopupVisibleChange: noop,
      onPopupAlign: noop,
      popupClassName: '',
      mouseEnterDelay: 0,
      mouseLeaveDelay: 0.1,
      focusDelay: 0,
      blurDelay: 0.15,
      popupStyle: {},
      destroyPopupOnHide: false,
      popupAlign: {},
      defaultPopupVisible: false,
      mask: false,
      maskClosable: true,
      action: [],
      showAction: [],
      hideAction: []
    };
  },
  getInitialState: function getInitialState() {
    var props = this.props;
    var popupVisible = void 0;
    if ('popupVisible' in props) {
      popupVisible = !!props.popupVisible;
    } else {
      popupVisible = !!props.defaultPopupVisible;
    }

    this.prevPopupVisible = popupVisible;

    return {
      popupVisible: popupVisible
    };
  },
  componentWillMount: function componentWillMount() {
    var _this = this;

    ALL_HANDLERS.forEach(function (h) {
      _this['fire' + h] = function (e) {
        _this.fireEvents(h, e);
      };
    });
  },
  componentDidMount: function componentDidMount() {
    this.componentDidUpdate({}, {
      popupVisible: this.state.popupVisible
    });
  },
  componentWillReceiveProps: function componentWillReceiveProps(_ref) {
    var popupVisible = _ref.popupVisible;

    if (popupVisible !== undefined) {
      this.setState({
        popupVisible: popupVisible
      });
    }
  },
  componentDidUpdate: function componentDidUpdate(_, prevState) {
    var props = this.props;
    var state = this.state;
    var triggerAfterPopupVisibleChange = function triggerAfterPopupVisibleChange() {
      if (prevState.popupVisible !== state.popupVisible) {
        props.afterPopupVisibleChange(state.popupVisible);
      }
    };
    if (!IS_REACT_16) {
      this.renderComponent(null, triggerAfterPopupVisibleChange);
    }

    this.prevPopupVisible = prevState.popupVisible;

                    if (state.popupVisible) {
      var currentDocument = void 0;
      if (!this.clickOutsideHandler && (this.isClickToHide() || this.isContextMenuToShow())) {
        currentDocument = props.getDocument();
        this.clickOutsideHandler = __WEBPACK_IMPORTED_MODULE_6_rc_util_lib_Dom_addEventListener___default()(currentDocument, 'mousedown', this.onDocumentClick);
      }
                              if (!this.touchOutsideHandler && isMobile) {
        currentDocument = currentDocument || props.getDocument();
        this.touchOutsideHandler = __WEBPACK_IMPORTED_MODULE_6_rc_util_lib_Dom_addEventListener___default()(currentDocument, 'click', this.onDocumentClick);
      }
            if (!this.contextMenuOutsideHandler1 && this.isContextMenuToShow()) {
        currentDocument = currentDocument || props.getDocument();
        this.contextMenuOutsideHandler1 = __WEBPACK_IMPORTED_MODULE_6_rc_util_lib_Dom_addEventListener___default()(currentDocument, 'scroll', this.onContextMenuClose);
      }
            if (!this.contextMenuOutsideHandler2 && this.isContextMenuToShow()) {
        this.contextMenuOutsideHandler2 = __WEBPACK_IMPORTED_MODULE_6_rc_util_lib_Dom_addEventListener___default()(window, 'blur', this.onContextMenuClose);
      }
      return;
    }

    this.clearOutsideHandler();
  },
  componentWillUnmount: function componentWillUnmount() {
    this.clearDelayTimer();
    this.clearOutsideHandler();
  },
  onMouseEnter: function onMouseEnter(e) {
    this.fireEvents('onMouseEnter', e);
    this.delaySetPopupVisible(true, this.props.mouseEnterDelay);
  },
  onMouseLeave: function onMouseLeave(e) {
    this.fireEvents('onMouseLeave', e);
    this.delaySetPopupVisible(false, this.props.mouseLeaveDelay);
  },
  onPopupMouseEnter: function onPopupMouseEnter() {
    this.clearDelayTimer();
  },
  onPopupMouseLeave: function onPopupMouseLeave(e) {
            if (e.relatedTarget && !e.relatedTarget.setTimeout && this._component && this._component.getPopupDomNode && Object(__WEBPACK_IMPORTED_MODULE_5_rc_util_es_Dom_contains__["a" /* default */])(this._component.getPopupDomNode(), e.relatedTarget)) {
      return;
    }
    this.delaySetPopupVisible(false, this.props.mouseLeaveDelay);
  },
  onFocus: function onFocus(e) {
    this.fireEvents('onFocus', e);
        this.clearDelayTimer();
    if (this.isFocusToShow()) {
      this.focusTime = Date.now();
      this.delaySetPopupVisible(true, this.props.focusDelay);
    }
  },
  onMouseDown: function onMouseDown(e) {
    this.fireEvents('onMouseDown', e);
    this.preClickTime = Date.now();
  },
  onTouchStart: function onTouchStart(e) {
    this.fireEvents('onTouchStart', e);
    this.preTouchTime = Date.now();
  },
  onBlur: function onBlur(e) {
    this.fireEvents('onBlur', e);
    this.clearDelayTimer();
    if (this.isBlurToHide()) {
      this.delaySetPopupVisible(false, this.props.blurDelay);
    }
  },
  onContextMenu: function onContextMenu(e) {
    e.preventDefault();
    this.fireEvents('onContextMenu', e);
    this.setPopupVisible(true);
  },
  onContextMenuClose: function onContextMenuClose() {
    if (this.isContextMenuToShow()) {
      this.close();
    }
  },
  onClick: function onClick(event) {
    this.fireEvents('onClick', event);
        if (this.focusTime) {
      var preTime = void 0;
      if (this.preClickTime && this.preTouchTime) {
        preTime = Math.min(this.preClickTime, this.preTouchTime);
      } else if (this.preClickTime) {
        preTime = this.preClickTime;
      } else if (this.preTouchTime) {
        preTime = this.preTouchTime;
      }
      if (Math.abs(preTime - this.focusTime) < 20) {
        return;
      }
      this.focusTime = 0;
    }
    this.preClickTime = 0;
    this.preTouchTime = 0;
    event.preventDefault();
    var nextVisible = !this.state.popupVisible;
    if (this.isClickToHide() && !nextVisible || nextVisible && this.isClickToShow()) {
      this.setPopupVisible(!this.state.popupVisible);
    }
  },
  onDocumentClick: function onDocumentClick(event) {
    if (this.props.mask && !this.props.maskClosable) {
      return;
    }
    var target = event.target;
    var root = Object(__WEBPACK_IMPORTED_MODULE_3_react_dom__["findDOMNode"])(this);
    var popupNode = this.getPopupDomNode();
    if (!Object(__WEBPACK_IMPORTED_MODULE_5_rc_util_es_Dom_contains__["a" /* default */])(root, target) && !Object(__WEBPACK_IMPORTED_MODULE_5_rc_util_es_Dom_contains__["a" /* default */])(popupNode, target)) {
      this.close();
    }
  },
  handlePortalUpdate: function handlePortalUpdate() {
    if (this.prevPopupVisible !== this.state.popupVisible) {
      this.props.afterPopupVisibleChange(this.state.popupVisible);
    }
  },
  getPopupDomNode: function getPopupDomNode() {
        if (this._component && this._component.getPopupDomNode) {
      return this._component.getPopupDomNode();
    }
    return null;
  },
  getRootDomNode: function getRootDomNode() {
    return Object(__WEBPACK_IMPORTED_MODULE_3_react_dom__["findDOMNode"])(this);
  },
  getPopupClassNameFromAlign: function getPopupClassNameFromAlign(align) {
    var className = [];
    var props = this.props;
    var popupPlacement = props.popupPlacement,
        builtinPlacements = props.builtinPlacements,
        prefixCls = props.prefixCls;

    if (popupPlacement && builtinPlacements) {
      className.push(Object(__WEBPACK_IMPORTED_MODULE_8__utils__["b" /* getPopupClassNameFromAlign */])(builtinPlacements, prefixCls, align));
    }
    if (props.getPopupClassNameFromAlign) {
      className.push(props.getPopupClassNameFromAlign(align));
    }
    return className.join(' ');
  },
  getPopupAlign: function getPopupAlign() {
    var props = this.props;
    var popupPlacement = props.popupPlacement,
        popupAlign = props.popupAlign,
        builtinPlacements = props.builtinPlacements;

    if (popupPlacement && builtinPlacements) {
      return Object(__WEBPACK_IMPORTED_MODULE_8__utils__["a" /* getAlignFromPlacement */])(builtinPlacements, popupPlacement, popupAlign);
    }
    return popupAlign;
  },
  getComponent: function getComponent() {
    var props = this.props,
        state = this.state;

    var mouseProps = {};
    if (this.isMouseEnterToShow()) {
      mouseProps.onMouseEnter = this.onPopupMouseEnter;
    }
    if (this.isMouseLeaveToHide()) {
      mouseProps.onMouseLeave = this.onPopupMouseLeave;
    }
    return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_7__Popup__["a" /* default */],
      __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({
        prefixCls: props.prefixCls,
        destroyPopupOnHide: props.destroyPopupOnHide,
        visible: state.popupVisible,
        className: props.popupClassName,
        action: props.action,
        align: this.getPopupAlign(),
        onAlign: props.onPopupAlign,
        animation: props.popupAnimation,
        getClassNameFromAlign: this.getPopupClassNameFromAlign
      }, mouseProps, {
        getRootDomNode: this.getRootDomNode,
        style: props.popupStyle,
        mask: props.mask,
        zIndex: props.zIndex,
        transitionName: props.popupTransitionName,
        maskAnimation: props.maskAnimation,
        maskTransitionName: props.maskTransitionName,
        ref: this.savePopup
      }),
      typeof props.popup === 'function' ? props.popup() : props.popup
    );
  },
  getContainer: function getContainer() {
    var props = this.props;

    var popupContainer = document.createElement('div');
            popupContainer.style.position = 'absolute';
    popupContainer.style.top = '0';
    popupContainer.style.left = '0';
    popupContainer.style.width = '100%';
    var mountNode = props.getPopupContainer ? props.getPopupContainer(Object(__WEBPACK_IMPORTED_MODULE_3_react_dom__["findDOMNode"])(this)) : props.getDocument().body;
    mountNode.appendChild(popupContainer);
    return popupContainer;
  },
  setPopupVisible: function setPopupVisible(popupVisible) {
    this.clearDelayTimer();
    if (this.state.popupVisible !== popupVisible) {
      if (!('popupVisible' in this.props)) {
        this.setState({
          popupVisible: popupVisible
        });
      }
      this.props.onPopupVisibleChange(popupVisible);
    }
  },
  delaySetPopupVisible: function delaySetPopupVisible(visible, delayS) {
    var _this2 = this;

    var delay = delayS * 1000;
    this.clearDelayTimer();
    if (delay) {
      this.delayTimer = setTimeout(function () {
        _this2.setPopupVisible(visible);
        _this2.clearDelayTimer();
      }, delay);
    } else {
      this.setPopupVisible(visible);
    }
  },
  clearDelayTimer: function clearDelayTimer() {
    if (this.delayTimer) {
      clearTimeout(this.delayTimer);
      this.delayTimer = null;
    }
  },
  clearOutsideHandler: function clearOutsideHandler() {
    if (this.clickOutsideHandler) {
      this.clickOutsideHandler.remove();
      this.clickOutsideHandler = null;
    }

    if (this.contextMenuOutsideHandler1) {
      this.contextMenuOutsideHandler1.remove();
      this.contextMenuOutsideHandler1 = null;
    }

    if (this.contextMenuOutsideHandler2) {
      this.contextMenuOutsideHandler2.remove();
      this.contextMenuOutsideHandler2 = null;
    }

    if (this.touchOutsideHandler) {
      this.touchOutsideHandler.remove();
      this.touchOutsideHandler = null;
    }
  },
  createTwoChains: function createTwoChains(event) {
    var childPros = this.props.children.props;
    var props = this.props;
    if (childPros[event] && props[event]) {
      return this['fire' + event];
    }
    return childPros[event] || props[event];
  },
  isClickToShow: function isClickToShow() {
    var _props = this.props,
        action = _props.action,
        showAction = _props.showAction;

    return action.indexOf('click') !== -1 || showAction.indexOf('click') !== -1;
  },
  isContextMenuToShow: function isContextMenuToShow() {
    var _props2 = this.props,
        action = _props2.action,
        showAction = _props2.showAction;

    return action.indexOf('contextMenu') !== -1 || showAction.indexOf('contextMenu') !== -1;
  },
  isClickToHide: function isClickToHide() {
    var _props3 = this.props,
        action = _props3.action,
        hideAction = _props3.hideAction;

    return action.indexOf('click') !== -1 || hideAction.indexOf('click') !== -1;
  },
  isMouseEnterToShow: function isMouseEnterToShow() {
    var _props4 = this.props,
        action = _props4.action,
        showAction = _props4.showAction;

    return action.indexOf('hover') !== -1 || showAction.indexOf('mouseEnter') !== -1;
  },
  isMouseLeaveToHide: function isMouseLeaveToHide() {
    var _props5 = this.props,
        action = _props5.action,
        hideAction = _props5.hideAction;

    return action.indexOf('hover') !== -1 || hideAction.indexOf('mouseLeave') !== -1;
  },
  isFocusToShow: function isFocusToShow() {
    var _props6 = this.props,
        action = _props6.action,
        showAction = _props6.showAction;

    return action.indexOf('focus') !== -1 || showAction.indexOf('focus') !== -1;
  },
  isBlurToHide: function isBlurToHide() {
    var _props7 = this.props,
        action = _props7.action,
        hideAction = _props7.hideAction;

    return action.indexOf('focus') !== -1 || hideAction.indexOf('blur') !== -1;
  },
  forcePopupAlign: function forcePopupAlign() {
    if (this.state.popupVisible && this._component && this._component.alignInstance) {
      this._component.alignInstance.forceAlign();
    }
  },
  fireEvents: function fireEvents(type, e) {
    var childCallback = this.props.children.props[type];
    if (childCallback) {
      childCallback(e);
    }
    var callback = this.props[type];
    if (callback) {
      callback(e);
    }
  },
  close: function close() {
    this.setPopupVisible(false);
  },
  savePopup: function savePopup(node) {
    if (IS_REACT_16) {
      this._component = node;
    }
  },
  render: function render() {
    var popupVisible = this.state.popupVisible;

    var props = this.props;
    var children = props.children;
    var child = __WEBPACK_IMPORTED_MODULE_1_react___default.a.Children.only(children);
    var newChildProps = { key: 'trigger' };

    if (this.isContextMenuToShow()) {
      newChildProps.onContextMenu = this.onContextMenu;
    } else {
      newChildProps.onContextMenu = this.createTwoChains('onContextMenu');
    }

    if (this.isClickToHide() || this.isClickToShow()) {
      newChildProps.onClick = this.onClick;
      newChildProps.onMouseDown = this.onMouseDown;
      newChildProps.onTouchStart = this.onTouchStart;
    } else {
      newChildProps.onClick = this.createTwoChains('onClick');
      newChildProps.onMouseDown = this.createTwoChains('onMouseDown');
      newChildProps.onTouchStart = this.createTwoChains('onTouchStart');
    }
    if (this.isMouseEnterToShow()) {
      newChildProps.onMouseEnter = this.onMouseEnter;
    } else {
      newChildProps.onMouseEnter = this.createTwoChains('onMouseEnter');
    }
    if (this.isMouseLeaveToHide()) {
      newChildProps.onMouseLeave = this.onMouseLeave;
    } else {
      newChildProps.onMouseLeave = this.createTwoChains('onMouseLeave');
    }
    if (this.isFocusToShow() || this.isBlurToHide()) {
      newChildProps.onFocus = this.onFocus;
      newChildProps.onBlur = this.onBlur;
    } else {
      newChildProps.onFocus = this.createTwoChains('onFocus');
      newChildProps.onBlur = this.createTwoChains('onBlur');
    }

    var trigger = __WEBPACK_IMPORTED_MODULE_1_react___default.a.cloneElement(child, newChildProps);

    if (!IS_REACT_16) {
      return trigger;
    }

    var portal = void 0;
        if (popupVisible || this._component || props.forceRender) {
      portal = __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_10_rc_util_lib_Portal___default.a,
        {
          key: 'portal',
          getContainer: this.getContainer,
          didUpdate: this.handlePortalUpdate
        },
        this.getComponent()
      );
    }

    return [trigger, portal];
  }
});

/* harmony default export */ __webpack_exports__["a"] = (Trigger);

/***/ }),

/***/ 2236:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(2237);
var invariant = __webpack_require__(2238);
var ReactPropTypesSecret = __webpack_require__(2239);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ 2237:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),

/***/ 2238:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (false) {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),

/***/ 2239:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ 2240:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var React = __webpack_require__(459);
var factory = __webpack_require__(2241);

if (typeof React === 'undefined') {
  throw Error(
    'create-react-class could not find the React object. If you are using script tags, ' +
      'make sure that React is being loaded before create-react-class.'
  );
}

// Hack to grab NoopUpdateQueue from isomorphic React
var ReactNoopUpdateQueue = new React.Component().updater;

module.exports = factory(
  React.Component,
  React.isValidElement,
  ReactNoopUpdateQueue
);


/***/ }),

/***/ 2241:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var _assign = __webpack_require__(953);

var emptyObject = __webpack_require__(2242);
var _invariant = __webpack_require__(2243);

if (false) {
  var warning = require('fbjs/lib/warning');
}

var MIXINS_KEY = 'mixins';

// Helper function to allow the creation of anonymous functions which do not
// have .name set to the name of the variable being assigned to.
function identity(fn) {
  return fn;
}

var ReactPropTypeLocationNames;
if (false) {
  ReactPropTypeLocationNames = {
    prop: 'prop',
    context: 'context',
    childContext: 'child context'
  };
} else {
  ReactPropTypeLocationNames = {};
}

function factory(ReactComponent, isValidElement, ReactNoopUpdateQueue) {
  /**
   * Policies that describe methods in `ReactClassInterface`.
   */

  var injectedMixins = [];

  /**
   * Composite components are higher-level components that compose other composite
   * or host components.
   *
   * To create a new type of `ReactClass`, pass a specification of
   * your new class to `React.createClass`. The only requirement of your class
   * specification is that you implement a `render` method.
   *
   *   var MyComponent = React.createClass({
   *     render: function() {
   *       return <div>Hello World</div>;
   *     }
   *   });
   *
   * The class specification supports a specific protocol of methods that have
   * special meaning (e.g. `render`). See `ReactClassInterface` for
   * more the comprehensive protocol. Any other properties and methods in the
   * class specification will be available on the prototype.
   *
   * @interface ReactClassInterface
   * @internal
   */
  var ReactClassInterface = {
    /**
     * An array of Mixin objects to include when defining your component.
     *
     * @type {array}
     * @optional
     */
    mixins: 'DEFINE_MANY',

    /**
     * An object containing properties and methods that should be defined on
     * the component's constructor instead of its prototype (static methods).
     *
     * @type {object}
     * @optional
     */
    statics: 'DEFINE_MANY',

    /**
     * Definition of prop types for this component.
     *
     * @type {object}
     * @optional
     */
    propTypes: 'DEFINE_MANY',

    /**
     * Definition of context types for this component.
     *
     * @type {object}
     * @optional
     */
    contextTypes: 'DEFINE_MANY',

    /**
     * Definition of context types this component sets for its children.
     *
     * @type {object}
     * @optional
     */
    childContextTypes: 'DEFINE_MANY',

    // ==== Definition methods ====

    /**
     * Invoked when the component is mounted. Values in the mapping will be set on
     * `this.props` if that prop is not specified (i.e. using an `in` check).
     *
     * This method is invoked before `getInitialState` and therefore cannot rely
     * on `this.state` or use `this.setState`.
     *
     * @return {object}
     * @optional
     */
    getDefaultProps: 'DEFINE_MANY_MERGED',

    /**
     * Invoked once before the component is mounted. The return value will be used
     * as the initial value of `this.state`.
     *
     *   getInitialState: function() {
     *     return {
     *       isOn: false,
     *       fooBaz: new BazFoo()
     *     }
     *   }
     *
     * @return {object}
     * @optional
     */
    getInitialState: 'DEFINE_MANY_MERGED',

    /**
     * @return {object}
     * @optional
     */
    getChildContext: 'DEFINE_MANY_MERGED',

    /**
     * Uses props from `this.props` and state from `this.state` to render the
     * structure of the component.
     *
     * No guarantees are made about when or how often this method is invoked, so
     * it must not have side effects.
     *
     *   render: function() {
     *     var name = this.props.name;
     *     return <div>Hello, {name}!</div>;
     *   }
     *
     * @return {ReactComponent}
     * @required
     */
    render: 'DEFINE_ONCE',

    // ==== Delegate methods ====

    /**
     * Invoked when the component is initially created and about to be mounted.
     * This may have side effects, but any external subscriptions or data created
     * by this method must be cleaned up in `componentWillUnmount`.
     *
     * @optional
     */
    componentWillMount: 'DEFINE_MANY',

    /**
     * Invoked when the component has been mounted and has a DOM representation.
     * However, there is no guarantee that the DOM node is in the document.
     *
     * Use this as an opportunity to operate on the DOM when the component has
     * been mounted (initialized and rendered) for the first time.
     *
     * @param {DOMElement} rootNode DOM element representing the component.
     * @optional
     */
    componentDidMount: 'DEFINE_MANY',

    /**
     * Invoked before the component receives new props.
     *
     * Use this as an opportunity to react to a prop transition by updating the
     * state using `this.setState`. Current props are accessed via `this.props`.
     *
     *   componentWillReceiveProps: function(nextProps, nextContext) {
     *     this.setState({
     *       likesIncreasing: nextProps.likeCount > this.props.likeCount
     *     });
     *   }
     *
     * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
     * transition may cause a state change, but the opposite is not true. If you
     * need it, you are probably looking for `componentWillUpdate`.
     *
     * @param {object} nextProps
     * @optional
     */
    componentWillReceiveProps: 'DEFINE_MANY',

    /**
     * Invoked while deciding if the component should be updated as a result of
     * receiving new props, state and/or context.
     *
     * Use this as an opportunity to `return false` when you're certain that the
     * transition to the new props/state/context will not require a component
     * update.
     *
     *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
     *     return !equal(nextProps, this.props) ||
     *       !equal(nextState, this.state) ||
     *       !equal(nextContext, this.context);
     *   }
     *
     * @param {object} nextProps
     * @param {?object} nextState
     * @param {?object} nextContext
     * @return {boolean} True if the component should update.
     * @optional
     */
    shouldComponentUpdate: 'DEFINE_ONCE',

    /**
     * Invoked when the component is about to update due to a transition from
     * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
     * and `nextContext`.
     *
     * Use this as an opportunity to perform preparation before an update occurs.
     *
     * NOTE: You **cannot** use `this.setState()` in this method.
     *
     * @param {object} nextProps
     * @param {?object} nextState
     * @param {?object} nextContext
     * @param {ReactReconcileTransaction} transaction
     * @optional
     */
    componentWillUpdate: 'DEFINE_MANY',

    /**
     * Invoked when the component's DOM representation has been updated.
     *
     * Use this as an opportunity to operate on the DOM when the component has
     * been updated.
     *
     * @param {object} prevProps
     * @param {?object} prevState
     * @param {?object} prevContext
     * @param {DOMElement} rootNode DOM element representing the component.
     * @optional
     */
    componentDidUpdate: 'DEFINE_MANY',

    /**
     * Invoked when the component is about to be removed from its parent and have
     * its DOM representation destroyed.
     *
     * Use this as an opportunity to deallocate any external resources.
     *
     * NOTE: There is no `componentDidUnmount` since your component will have been
     * destroyed by that point.
     *
     * @optional
     */
    componentWillUnmount: 'DEFINE_MANY',

    // ==== Advanced methods ====

    /**
     * Updates the component's currently mounted DOM representation.
     *
     * By default, this implements React's rendering and reconciliation algorithm.
     * Sophisticated clients may wish to override this.
     *
     * @param {ReactReconcileTransaction} transaction
     * @internal
     * @overridable
     */
    updateComponent: 'OVERRIDE_BASE'
  };

  /**
   * Mapping from class specification keys to special processing functions.
   *
   * Although these are declared like instance properties in the specification
   * when defining classes using `React.createClass`, they are actually static
   * and are accessible on the constructor instead of the prototype. Despite
   * being static, they must be defined outside of the "statics" key under
   * which all other static methods are defined.
   */
  var RESERVED_SPEC_KEYS = {
    displayName: function(Constructor, displayName) {
      Constructor.displayName = displayName;
    },
    mixins: function(Constructor, mixins) {
      if (mixins) {
        for (var i = 0; i < mixins.length; i++) {
          mixSpecIntoComponent(Constructor, mixins[i]);
        }
      }
    },
    childContextTypes: function(Constructor, childContextTypes) {
      if (false) {
        validateTypeDef(Constructor, childContextTypes, 'childContext');
      }
      Constructor.childContextTypes = _assign(
        {},
        Constructor.childContextTypes,
        childContextTypes
      );
    },
    contextTypes: function(Constructor, contextTypes) {
      if (false) {
        validateTypeDef(Constructor, contextTypes, 'context');
      }
      Constructor.contextTypes = _assign(
        {},
        Constructor.contextTypes,
        contextTypes
      );
    },
    /**
     * Special case getDefaultProps which should move into statics but requires
     * automatic merging.
     */
    getDefaultProps: function(Constructor, getDefaultProps) {
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps = createMergedResultFunction(
          Constructor.getDefaultProps,
          getDefaultProps
        );
      } else {
        Constructor.getDefaultProps = getDefaultProps;
      }
    },
    propTypes: function(Constructor, propTypes) {
      if (false) {
        validateTypeDef(Constructor, propTypes, 'prop');
      }
      Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
    },
    statics: function(Constructor, statics) {
      mixStaticSpecIntoComponent(Constructor, statics);
    },
    autobind: function() {}
  };

  function validateTypeDef(Constructor, typeDef, location) {
    for (var propName in typeDef) {
      if (typeDef.hasOwnProperty(propName)) {
        // use a warning instead of an _invariant so components
        // don't show up in prod but only in __DEV__
        if (false) {
          warning(
            typeof typeDef[propName] === 'function',
            '%s: %s type `%s` is invalid; it must be a function, usually from ' +
              'React.PropTypes.',
            Constructor.displayName || 'ReactClass',
            ReactPropTypeLocationNames[location],
            propName
          );
        }
      }
    }
  }

  function validateMethodOverride(isAlreadyDefined, name) {
    var specPolicy = ReactClassInterface.hasOwnProperty(name)
      ? ReactClassInterface[name]
      : null;

    // Disallow overriding of base class methods unless explicitly allowed.
    if (ReactClassMixin.hasOwnProperty(name)) {
      _invariant(
        specPolicy === 'OVERRIDE_BASE',
        'ReactClassInterface: You are attempting to override ' +
          '`%s` from your class specification. Ensure that your method names ' +
          'do not overlap with React methods.',
        name
      );
    }

    // Disallow defining methods more than once unless explicitly allowed.
    if (isAlreadyDefined) {
      _invariant(
        specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED',
        'ReactClassInterface: You are attempting to define ' +
          '`%s` on your component more than once. This conflict may be due ' +
          'to a mixin.',
        name
      );
    }
  }

  /**
   * Mixin helper which handles policy validation and reserved
   * specification keys when building React classes.
   */
  function mixSpecIntoComponent(Constructor, spec) {
    if (!spec) {
      if (false) {
        var typeofSpec = typeof spec;
        var isMixinValid = typeofSpec === 'object' && spec !== null;

        if (process.env.NODE_ENV !== 'production') {
          warning(
            isMixinValid,
            "%s: You're attempting to include a mixin that is either null " +
              'or not an object. Check the mixins included by the component, ' +
              'as well as any mixins they include themselves. ' +
              'Expected object but got %s.',
            Constructor.displayName || 'ReactClass',
            spec === null ? null : typeofSpec
          );
        }
      }

      return;
    }

    _invariant(
      typeof spec !== 'function',
      "ReactClass: You're attempting to " +
        'use a component class or function as a mixin. Instead, just use a ' +
        'regular object.'
    );
    _invariant(
      !isValidElement(spec),
      "ReactClass: You're attempting to " +
        'use a component as a mixin. Instead, just use a regular object.'
    );

    var proto = Constructor.prototype;
    var autoBindPairs = proto.__reactAutoBindPairs;

    // By handling mixins before any other properties, we ensure the same
    // chaining order is applied to methods with DEFINE_MANY policy, whether
    // mixins are listed before or after these methods in the spec.
    if (spec.hasOwnProperty(MIXINS_KEY)) {
      RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
    }

    for (var name in spec) {
      if (!spec.hasOwnProperty(name)) {
        continue;
      }

      if (name === MIXINS_KEY) {
        // We have already handled mixins in a special case above.
        continue;
      }

      var property = spec[name];
      var isAlreadyDefined = proto.hasOwnProperty(name);
      validateMethodOverride(isAlreadyDefined, name);

      if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
        RESERVED_SPEC_KEYS[name](Constructor, property);
      } else {
        // Setup methods on prototype:
        // The following member methods should not be automatically bound:
        // 1. Expected ReactClass methods (in the "interface").
        // 2. Overridden methods (that were mixed in).
        var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
        var isFunction = typeof property === 'function';
        var shouldAutoBind =
          isFunction &&
          !isReactClassMethod &&
          !isAlreadyDefined &&
          spec.autobind !== false;

        if (shouldAutoBind) {
          autoBindPairs.push(name, property);
          proto[name] = property;
        } else {
          if (isAlreadyDefined) {
            var specPolicy = ReactClassInterface[name];

            // These cases should already be caught by validateMethodOverride.
            _invariant(
              isReactClassMethod &&
                (specPolicy === 'DEFINE_MANY_MERGED' ||
                  specPolicy === 'DEFINE_MANY'),
              'ReactClass: Unexpected spec policy %s for key %s ' +
                'when mixing in component specs.',
              specPolicy,
              name
            );

            // For methods which are defined more than once, call the existing
            // methods before calling the new property, merging if appropriate.
            if (specPolicy === 'DEFINE_MANY_MERGED') {
              proto[name] = createMergedResultFunction(proto[name], property);
            } else if (specPolicy === 'DEFINE_MANY') {
              proto[name] = createChainedFunction(proto[name], property);
            }
          } else {
            proto[name] = property;
            if (false) {
              // Add verbose displayName to the function, which helps when looking
              // at profiling tools.
              if (typeof property === 'function' && spec.displayName) {
                proto[name].displayName = spec.displayName + '_' + name;
              }
            }
          }
        }
      }
    }
  }

  function mixStaticSpecIntoComponent(Constructor, statics) {
    if (!statics) {
      return;
    }
    for (var name in statics) {
      var property = statics[name];
      if (!statics.hasOwnProperty(name)) {
        continue;
      }

      var isReserved = name in RESERVED_SPEC_KEYS;
      _invariant(
        !isReserved,
        'ReactClass: You are attempting to define a reserved ' +
          'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' +
          'as an instance property instead; it will still be accessible on the ' +
          'constructor.',
        name
      );

      var isInherited = name in Constructor;
      _invariant(
        !isInherited,
        'ReactClass: You are attempting to define ' +
          '`%s` on your component more than once. This conflict may be ' +
          'due to a mixin.',
        name
      );
      Constructor[name] = property;
    }
  }

  /**
   * Merge two objects, but throw if both contain the same key.
   *
   * @param {object} one The first object, which is mutated.
   * @param {object} two The second object
   * @return {object} one after it has been mutated to contain everything in two.
   */
  function mergeIntoWithNoDuplicateKeys(one, two) {
    _invariant(
      one && two && typeof one === 'object' && typeof two === 'object',
      'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.'
    );

    for (var key in two) {
      if (two.hasOwnProperty(key)) {
        _invariant(
          one[key] === undefined,
          'mergeIntoWithNoDuplicateKeys(): ' +
            'Tried to merge two objects with the same key: `%s`. This conflict ' +
            'may be due to a mixin; in particular, this may be caused by two ' +
            'getInitialState() or getDefaultProps() methods returning objects ' +
            'with clashing keys.',
          key
        );
        one[key] = two[key];
      }
    }
    return one;
  }

  /**
   * Creates a function that invokes two functions and merges their return values.
   *
   * @param {function} one Function to invoke first.
   * @param {function} two Function to invoke second.
   * @return {function} Function that invokes the two argument functions.
   * @private
   */
  function createMergedResultFunction(one, two) {
    return function mergedResult() {
      var a = one.apply(this, arguments);
      var b = two.apply(this, arguments);
      if (a == null) {
        return b;
      } else if (b == null) {
        return a;
      }
      var c = {};
      mergeIntoWithNoDuplicateKeys(c, a);
      mergeIntoWithNoDuplicateKeys(c, b);
      return c;
    };
  }

  /**
   * Creates a function that invokes two functions and ignores their return vales.
   *
   * @param {function} one Function to invoke first.
   * @param {function} two Function to invoke second.
   * @return {function} Function that invokes the two argument functions.
   * @private
   */
  function createChainedFunction(one, two) {
    return function chainedFunction() {
      one.apply(this, arguments);
      two.apply(this, arguments);
    };
  }

  /**
   * Binds a method to the component.
   *
   * @param {object} component Component whose method is going to be bound.
   * @param {function} method Method to be bound.
   * @return {function} The bound method.
   */
  function bindAutoBindMethod(component, method) {
    var boundMethod = method.bind(component);
    if (false) {
      boundMethod.__reactBoundContext = component;
      boundMethod.__reactBoundMethod = method;
      boundMethod.__reactBoundArguments = null;
      var componentName = component.constructor.displayName;
      var _bind = boundMethod.bind;
      boundMethod.bind = function(newThis) {
        for (
          var _len = arguments.length,
            args = Array(_len > 1 ? _len - 1 : 0),
            _key = 1;
          _key < _len;
          _key++
        ) {
          args[_key - 1] = arguments[_key];
        }

        // User is trying to bind() an autobound method; we effectively will
        // ignore the value of "this" that the user is trying to use, so
        // let's warn.
        if (newThis !== component && newThis !== null) {
          if (process.env.NODE_ENV !== 'production') {
            warning(
              false,
              'bind(): React component methods may only be bound to the ' +
                'component instance. See %s',
              componentName
            );
          }
        } else if (!args.length) {
          if (process.env.NODE_ENV !== 'production') {
            warning(
              false,
              'bind(): You are binding a component method to the component. ' +
                'React does this for you automatically in a high-performance ' +
                'way, so you can safely remove this call. See %s',
              componentName
            );
          }
          return boundMethod;
        }
        var reboundMethod = _bind.apply(boundMethod, arguments);
        reboundMethod.__reactBoundContext = component;
        reboundMethod.__reactBoundMethod = method;
        reboundMethod.__reactBoundArguments = args;
        return reboundMethod;
      };
    }
    return boundMethod;
  }

  /**
   * Binds all auto-bound methods in a component.
   *
   * @param {object} component Component whose method is going to be bound.
   */
  function bindAutoBindMethods(component) {
    var pairs = component.__reactAutoBindPairs;
    for (var i = 0; i < pairs.length; i += 2) {
      var autoBindKey = pairs[i];
      var method = pairs[i + 1];
      component[autoBindKey] = bindAutoBindMethod(component, method);
    }
  }

  var IsMountedPreMixin = {
    componentDidMount: function() {
      this.__isMounted = true;
    }
  };

  var IsMountedPostMixin = {
    componentWillUnmount: function() {
      this.__isMounted = false;
    }
  };

  /**
   * Add more to the ReactClass base class. These are all legacy features and
   * therefore not already part of the modern ReactComponent.
   */
  var ReactClassMixin = {
    /**
     * TODO: This will be deprecated because state should always keep a consistent
     * type signature and the only use case for this, is to avoid that.
     */
    replaceState: function(newState, callback) {
      this.updater.enqueueReplaceState(this, newState, callback);
    },

    /**
     * Checks whether or not this composite component is mounted.
     * @return {boolean} True if mounted, false otherwise.
     * @protected
     * @final
     */
    isMounted: function() {
      if (false) {
        warning(
          this.__didWarnIsMounted,
          '%s: isMounted is deprecated. Instead, make sure to clean up ' +
            'subscriptions and pending requests in componentWillUnmount to ' +
            'prevent memory leaks.',
          (this.constructor && this.constructor.displayName) ||
            this.name ||
            'Component'
        );
        this.__didWarnIsMounted = true;
      }
      return !!this.__isMounted;
    }
  };

  var ReactClassComponent = function() {};
  _assign(
    ReactClassComponent.prototype,
    ReactComponent.prototype,
    ReactClassMixin
  );

  /**
   * Creates a composite component class given a class specification.
   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
   *
   * @param {object} spec Class specification (which must define `render`).
   * @return {function} Component constructor function.
   * @public
   */
  function createClass(spec) {
    // To keep our warnings more understandable, we'll use a little hack here to
    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
    // unnecessarily identify a class without displayName as 'Constructor'.
    var Constructor = identity(function(props, context, updater) {
      // This constructor gets overridden by mocks. The argument is used
      // by mocks to assert on what gets mounted.

      if (false) {
        warning(
          this instanceof Constructor,
          'Something is calling a React component directly. Use a factory or ' +
            'JSX instead. See: https://fb.me/react-legacyfactory'
        );
      }

      // Wire up auto-binding
      if (this.__reactAutoBindPairs.length) {
        bindAutoBindMethods(this);
      }

      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;

      this.state = null;

      // ReactClasses doesn't have constructors. Instead, they use the
      // getInitialState and componentWillMount methods for initialization.

      var initialState = this.getInitialState ? this.getInitialState() : null;
      if (false) {
        // We allow auto-mocks to proceed as if they're returning null.
        if (
          initialState === undefined &&
          this.getInitialState._isMockFunction
        ) {
          // This is probably bad practice. Consider warning here and
          // deprecating this convenience.
          initialState = null;
        }
      }
      _invariant(
        typeof initialState === 'object' && !Array.isArray(initialState),
        '%s.getInitialState(): must return an object or null',
        Constructor.displayName || 'ReactCompositeComponent'
      );

      this.state = initialState;
    });
    Constructor.prototype = new ReactClassComponent();
    Constructor.prototype.constructor = Constructor;
    Constructor.prototype.__reactAutoBindPairs = [];

    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

    mixSpecIntoComponent(Constructor, IsMountedPreMixin);
    mixSpecIntoComponent(Constructor, spec);
    mixSpecIntoComponent(Constructor, IsMountedPostMixin);

    // Initialize the defaultProps property after all mixins have been merged.
    if (Constructor.getDefaultProps) {
      Constructor.defaultProps = Constructor.getDefaultProps();
    }

    if (false) {
      // This is a tag to indicate that the use of these method names is ok,
      // since it's used with createClass. If it's not, then it's likely a
      // mistake so we'll warn you to use the static property, property
      // initializer or constructor respectively.
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps.isReactClassApproved = {};
      }
      if (Constructor.prototype.getInitialState) {
        Constructor.prototype.getInitialState.isReactClassApproved = {};
      }
    }

    _invariant(
      Constructor.prototype.render,
      'createClass(...): Class specification must implement a `render` method.'
    );

    if (false) {
      warning(
        !Constructor.prototype.componentShouldUpdate,
        '%s has a method called ' +
          'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' +
          'The name is phrased as a question because the function is ' +
          'expected to return a value.',
        spec.displayName || 'A component'
      );
      warning(
        !Constructor.prototype.componentWillRecieveProps,
        '%s has a method called ' +
          'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?',
        spec.displayName || 'A component'
      );
    }

    // Reduce time spent doing lookups by setting these on the prototype.
    for (var methodName in ReactClassInterface) {
      if (!Constructor.prototype[methodName]) {
        Constructor.prototype[methodName] = null;
      }
    }

    return Constructor;
  }

  return createClass;
}

module.exports = factory;


/***/ }),

/***/ 2242:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyObject = {};

if (false) {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;

/***/ }),

/***/ 2243:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (false) {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),

/***/ 2244:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = contains;
function contains(root, n) {
  var node = n;
  while (node) {
    if (node === root) {
      return true;
    }
    node = node.parentNode;
  }

  return false;
}

/***/ }),

/***/ 2245:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = addEventListenerWrap;

var _addDomEventListener = __webpack_require__(2246);

var _addDomEventListener2 = _interopRequireDefault(_addDomEventListener);

var _reactDom = __webpack_require__(551);

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function addEventListenerWrap(target, eventType, cb) {
  /* eslint camelcase: 2 */
  var callback = _reactDom2['default'].unstable_batchedUpdates ? function run(e) {
    _reactDom2['default'].unstable_batchedUpdates(cb, e);
  } : cb;
  return (0, _addDomEventListener2['default'])(target, eventType, callback);
}
module.exports = exports['default'];

/***/ }),

/***/ 2246:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = addEventListener;

var _EventObject = __webpack_require__(2247);

var _EventObject2 = _interopRequireDefault(_EventObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function addEventListener(target, eventType, callback) {
  function wrapCallback(e) {
    var ne = new _EventObject2["default"](e);
    callback.call(target, ne);
  }

  if (target.addEventListener) {
    target.addEventListener(eventType, wrapCallback, false);
    return {
      remove: function remove() {
        target.removeEventListener(eventType, wrapCallback, false);
      }
    };
  } else if (target.attachEvent) {
    target.attachEvent('on' + eventType, wrapCallback);
    return {
      remove: function remove() {
        target.detachEvent('on' + eventType, wrapCallback);
      }
    };
  }
}
module.exports = exports['default'];

/***/ }),

/***/ 2247:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _EventBaseObject = __webpack_require__(2248);

var _EventBaseObject2 = _interopRequireDefault(_EventBaseObject);

var _objectAssign = __webpack_require__(953);

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @ignore
 * event object for dom
 * @author yiminghe@gmail.com
 */

var TRUE = true;
var FALSE = false;
var commonProps = ['altKey', 'bubbles', 'cancelable', 'ctrlKey', 'currentTarget', 'eventPhase', 'metaKey', 'shiftKey', 'target', 'timeStamp', 'view', 'type'];

function isNullOrUndefined(w) {
  return w === null || w === undefined;
}

var eventNormalizers = [{
  reg: /^key/,
  props: ['char', 'charCode', 'key', 'keyCode', 'which'],
  fix: function fix(event, nativeEvent) {
    if (isNullOrUndefined(event.which)) {
      event.which = !isNullOrUndefined(nativeEvent.charCode) ? nativeEvent.charCode : nativeEvent.keyCode;
    }

    // add metaKey to non-Mac browsers (use ctrl for PC 's and Meta for Macs)
    if (event.metaKey === undefined) {
      event.metaKey = event.ctrlKey;
    }
  }
}, {
  reg: /^touch/,
  props: ['touches', 'changedTouches', 'targetTouches']
}, {
  reg: /^hashchange$/,
  props: ['newURL', 'oldURL']
}, {
  reg: /^gesturechange$/i,
  props: ['rotation', 'scale']
}, {
  reg: /^(mousewheel|DOMMouseScroll)$/,
  props: [],
  fix: function fix(event, nativeEvent) {
    var deltaX = void 0;
    var deltaY = void 0;
    var delta = void 0;
    var wheelDelta = nativeEvent.wheelDelta;
    var axis = nativeEvent.axis;
    var wheelDeltaY = nativeEvent.wheelDeltaY;
    var wheelDeltaX = nativeEvent.wheelDeltaX;
    var detail = nativeEvent.detail;

    // ie/webkit
    if (wheelDelta) {
      delta = wheelDelta / 120;
    }

    // gecko
    if (detail) {
      // press control e.detail == 1 else e.detail == 3
      delta = 0 - (detail % 3 === 0 ? detail / 3 : detail);
    }

    // Gecko
    if (axis !== undefined) {
      if (axis === event.HORIZONTAL_AXIS) {
        deltaY = 0;
        deltaX = 0 - delta;
      } else if (axis === event.VERTICAL_AXIS) {
        deltaX = 0;
        deltaY = delta;
      }
    }

    // Webkit
    if (wheelDeltaY !== undefined) {
      deltaY = wheelDeltaY / 120;
    }
    if (wheelDeltaX !== undefined) {
      deltaX = -1 * wheelDeltaX / 120;
    }

    // 默认 deltaY (ie)
    if (!deltaX && !deltaY) {
      deltaY = delta;
    }

    if (deltaX !== undefined) {
      /**
       * deltaX of mousewheel event
       * @property deltaX
       * @member Event.DomEvent.Object
       */
      event.deltaX = deltaX;
    }

    if (deltaY !== undefined) {
      /**
       * deltaY of mousewheel event
       * @property deltaY
       * @member Event.DomEvent.Object
       */
      event.deltaY = deltaY;
    }

    if (delta !== undefined) {
      /**
       * delta of mousewheel event
       * @property delta
       * @member Event.DomEvent.Object
       */
      event.delta = delta;
    }
  }
}, {
  reg: /^mouse|contextmenu|click|mspointer|(^DOMMouseScroll$)/i,
  props: ['buttons', 'clientX', 'clientY', 'button', 'offsetX', 'relatedTarget', 'which', 'fromElement', 'toElement', 'offsetY', 'pageX', 'pageY', 'screenX', 'screenY'],
  fix: function fix(event, nativeEvent) {
    var eventDoc = void 0;
    var doc = void 0;
    var body = void 0;
    var target = event.target;
    var button = nativeEvent.button;

    // Calculate pageX/Y if missing and clientX/Y available
    if (target && isNullOrUndefined(event.pageX) && !isNullOrUndefined(nativeEvent.clientX)) {
      eventDoc = target.ownerDocument || document;
      doc = eventDoc.documentElement;
      body = eventDoc.body;
      event.pageX = nativeEvent.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
      event.pageY = nativeEvent.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
    }

    // which for click: 1 === left; 2 === middle; 3 === right
    // do not use button
    if (!event.which && button !== undefined) {
      if (button & 1) {
        event.which = 1;
      } else if (button & 2) {
        event.which = 3;
      } else if (button & 4) {
        event.which = 2;
      } else {
        event.which = 0;
      }
    }

    // add relatedTarget, if necessary
    if (!event.relatedTarget && event.fromElement) {
      event.relatedTarget = event.fromElement === target ? event.toElement : event.fromElement;
    }

    return event;
  }
}];

function retTrue() {
  return TRUE;
}

function retFalse() {
  return FALSE;
}

function DomEventObject(nativeEvent) {
  var type = nativeEvent.type;

  var isNative = typeof nativeEvent.stopPropagation === 'function' || typeof nativeEvent.cancelBubble === 'boolean';

  _EventBaseObject2["default"].call(this);

  this.nativeEvent = nativeEvent;

  // in case dom event has been mark as default prevented by lower dom node
  var isDefaultPrevented = retFalse;
  if ('defaultPrevented' in nativeEvent) {
    isDefaultPrevented = nativeEvent.defaultPrevented ? retTrue : retFalse;
  } else if ('getPreventDefault' in nativeEvent) {
    // https://bugzilla.mozilla.org/show_bug.cgi?id=691151
    isDefaultPrevented = nativeEvent.getPreventDefault() ? retTrue : retFalse;
  } else if ('returnValue' in nativeEvent) {
    isDefaultPrevented = nativeEvent.returnValue === FALSE ? retTrue : retFalse;
  }

  this.isDefaultPrevented = isDefaultPrevented;

  var fixFns = [];
  var fixFn = void 0;
  var l = void 0;
  var prop = void 0;
  var props = commonProps.concat();

  eventNormalizers.forEach(function (normalizer) {
    if (type.match(normalizer.reg)) {
      props = props.concat(normalizer.props);
      if (normalizer.fix) {
        fixFns.push(normalizer.fix);
      }
    }
  });

  l = props.length;

  // clone properties of the original event object
  while (l) {
    prop = props[--l];
    this[prop] = nativeEvent[prop];
  }

  // fix target property, if necessary
  if (!this.target && isNative) {
    this.target = nativeEvent.srcElement || document; // srcElement might not be defined either
  }

  // check if target is a text node (safari)
  if (this.target && this.target.nodeType === 3) {
    this.target = this.target.parentNode;
  }

  l = fixFns.length;

  while (l) {
    fixFn = fixFns[--l];
    fixFn(this, nativeEvent);
  }

  this.timeStamp = nativeEvent.timeStamp || Date.now();
}

var EventBaseObjectProto = _EventBaseObject2["default"].prototype;

(0, _objectAssign2["default"])(DomEventObject.prototype, EventBaseObjectProto, {
  constructor: DomEventObject,

  preventDefault: function preventDefault() {
    var e = this.nativeEvent;

    // if preventDefault exists run it on the original event
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      // otherwise set the returnValue property of the original event to FALSE (IE)
      e.returnValue = FALSE;
    }

    EventBaseObjectProto.preventDefault.call(this);
  },
  stopPropagation: function stopPropagation() {
    var e = this.nativeEvent;

    // if stopPropagation exists run it on the original event
    if (e.stopPropagation) {
      e.stopPropagation();
    } else {
      // otherwise set the cancelBubble property of the original event to TRUE (IE)
      e.cancelBubble = TRUE;
    }

    EventBaseObjectProto.stopPropagation.call(this);
  }
});

exports["default"] = DomEventObject;
module.exports = exports['default'];

/***/ }),

/***/ 2248:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @ignore
 * base event object for custom and dom event.
 * @author yiminghe@gmail.com
 */

function returnFalse() {
  return false;
}

function returnTrue() {
  return true;
}

function EventBaseObject() {
  this.timeStamp = Date.now();
  this.target = undefined;
  this.currentTarget = undefined;
}

EventBaseObject.prototype = {
  isEventObject: 1,

  constructor: EventBaseObject,

  isDefaultPrevented: returnFalse,

  isPropagationStopped: returnFalse,

  isImmediatePropagationStopped: returnFalse,

  preventDefault: function preventDefault() {
    this.isDefaultPrevented = returnTrue;
  },
  stopPropagation: function stopPropagation() {
    this.isPropagationStopped = returnTrue;
  },
  stopImmediatePropagation: function stopImmediatePropagation() {
    this.isImmediatePropagationStopped = returnTrue;
    // fixed 1.2
    // call stopPropagation implicitly
    this.stopPropagation();
  },
  halt: function halt(immediate) {
    if (immediate) {
      this.stopImmediatePropagation();
    } else {
      this.stopPropagation();
    }
    this.preventDefault();
  }
};

exports["default"] = EventBaseObject;
module.exports = exports['default'];

/***/ }),

/***/ 2249:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(466);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(459);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types__ = __webpack_require__(955);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_dom__ = __webpack_require__(551);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rc_align__ = __webpack_require__(2250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rc_align___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rc_align__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rc_animate__ = __webpack_require__(2270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__PopupInner__ = __webpack_require__(2280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__LazyRenderBox__ = __webpack_require__(2001);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__utils__ = __webpack_require__(2002);














var Popup = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Popup, _Component);

  function Popup(props) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Popup);

    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Popup.__proto__ || Object.getPrototypeOf(Popup)).call(this, props));

    _initialiseProps.call(_this);

    _this.savePopupRef = __WEBPACK_IMPORTED_MODULE_12__utils__["c" /* saveRef */].bind(_this, 'popupInstance');
    _this.saveAlignRef = __WEBPACK_IMPORTED_MODULE_12__utils__["c" /* saveRef */].bind(_this, 'alignInstance');
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Popup, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.rootNode = this.getPopupDomNode();
    }
  }, {
    key: 'getPopupDomNode',
    value: function getPopupDomNode() {
      return __WEBPACK_IMPORTED_MODULE_7_react_dom___default.a.findDOMNode(this.popupInstance);
    }
  }, {
    key: 'getMaskTransitionName',
    value: function getMaskTransitionName() {
      var props = this.props;
      var transitionName = props.maskTransitionName;
      var animation = props.maskAnimation;
      if (!transitionName && animation) {
        transitionName = props.prefixCls + '-' + animation;
      }
      return transitionName;
    }
  }, {
    key: 'getTransitionName',
    value: function getTransitionName() {
      var props = this.props;
      var transitionName = props.transitionName;
      if (!transitionName && props.animation) {
        transitionName = props.prefixCls + '-' + props.animation;
      }
      return transitionName;
    }
  }, {
    key: 'getClassName',
    value: function getClassName(currentAlignClassName) {
      return this.props.prefixCls + ' ' + this.props.className + ' ' + currentAlignClassName;
    }
  }, {
    key: 'getPopupElement',
    value: function getPopupElement() {
      var savePopupRef = this.savePopupRef,
          props = this.props;
      var align = props.align,
          style = props.style,
          visible = props.visible,
          prefixCls = props.prefixCls,
          destroyPopupOnHide = props.destroyPopupOnHide;

      var className = this.getClassName(this.currentAlignClassName || props.getClassNameFromAlign(align));
      var hiddenClassName = prefixCls + '-hidden';
      if (!visible) {
        this.currentAlignClassName = null;
      }
      var newStyle = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, style, this.getZIndexStyle());
      var popupInnerProps = {
        className: className,
        prefixCls: prefixCls,
        ref: savePopupRef,
        onMouseEnter: props.onMouseEnter,
        onMouseLeave: props.onMouseLeave,
        style: newStyle
      };
      if (destroyPopupOnHide) {
        return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_9_rc_animate__["a" /* default */],
          {
            component: '',
            exclusive: true,
            transitionAppear: true,
            transitionName: this.getTransitionName()
          },
          visible ? __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_8_rc_align___default.a,
            {
              target: this.getTarget,
              key: 'popup',
              ref: this.saveAlignRef,
              monitorWindowResize: true,
              align: align,
              onAlign: this.onAlign
            },
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_10__PopupInner__["a" /* default */],
              __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({
                visible: true
              }, popupInnerProps),
              props.children
            )
          ) : null
        );
      }
      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_9_rc_animate__["a" /* default */],
        {
          component: '',
          exclusive: true,
          transitionAppear: true,
          transitionName: this.getTransitionName(),
          showProp: 'xVisible'
        },
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_8_rc_align___default.a,
          {
            target: this.getTarget,
            key: 'popup',
            ref: this.saveAlignRef,
            monitorWindowResize: true,
            xVisible: visible,
            childrenProps: { visible: 'xVisible' },
            disabled: !visible,
            align: align,
            onAlign: this.onAlign
          },
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_10__PopupInner__["a" /* default */],
            __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({
              hiddenClassName: hiddenClassName
            }, popupInnerProps),
            props.children
          )
        )
      );
    }
  }, {
    key: 'getZIndexStyle',
    value: function getZIndexStyle() {
      var style = {};
      var props = this.props;
      if (props.zIndex !== undefined) {
        style.zIndex = props.zIndex;
      }
      return style;
    }
  }, {
    key: 'getMaskElement',
    value: function getMaskElement() {
      var props = this.props;
      var maskElement = void 0;
      if (props.mask) {
        var maskTransition = this.getMaskTransitionName();
        maskElement = __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11__LazyRenderBox__["a" /* default */], {
          style: this.getZIndexStyle(),
          key: 'mask',
          className: props.prefixCls + '-mask',
          hiddenClassName: props.prefixCls + '-mask-hidden',
          visible: props.visible
        });
        if (maskTransition) {
          maskElement = __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_9_rc_animate__["a" /* default */],
            {
              key: 'mask',
              showProp: 'visible',
              transitionAppear: true,
              component: '',
              transitionName: maskTransition
            },
            maskElement
          );
        }
      }
      return maskElement;
    }
  }, {
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'div',
        null,
        this.getMaskElement(),
        this.getPopupElement()
      );
    }
  }]);

  return Popup;
}(__WEBPACK_IMPORTED_MODULE_5_react__["Component"]);

Popup.propTypes = {
  visible: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.bool,
  style: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.object,
  getClassNameFromAlign: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func,
  onAlign: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func,
  getRootDomNode: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func,
  onMouseEnter: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func,
  align: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.any,
  destroyPopupOnHide: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.bool,
  className: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.string,
  prefixCls: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.string,
  onMouseLeave: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.onAlign = function (popupDomNode, align) {
    var props = _this2.props;
    var currentAlignClassName = props.getClassNameFromAlign(align);
    // FIX: https://github.com/react-component/trigger/issues/56
    // FIX: https://github.com/react-component/tooltip/issues/79
    if (_this2.currentAlignClassName !== currentAlignClassName) {
      _this2.currentAlignClassName = currentAlignClassName;
      popupDomNode.className = _this2.getClassName(currentAlignClassName);
    }
    props.onAlign(popupDomNode, align);
  };

  this.getTarget = function () {
    return _this2.props.getRootDomNode();
  };
};

/* harmony default export */ __webpack_exports__["a"] = (Popup);

/***/ }),

/***/ 2250:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Align = __webpack_require__(2251);

var _Align2 = _interopRequireDefault(_Align);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports["default"] = _Align2["default"]; // export this package's api

module.exports = exports['default'];

/***/ }),

/***/ 2251:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2252);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = __webpack_require__(551);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _domAlign = __webpack_require__(2257);

var _domAlign2 = _interopRequireDefault(_domAlign);

var _addEventListener = __webpack_require__(2265);

var _addEventListener2 = _interopRequireDefault(_addEventListener);

var _isWindow = __webpack_require__(2269);

var _isWindow2 = _interopRequireDefault(_isWindow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

function buffer(fn, ms) {
  var timer = void 0;

  function clear() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }

  function bufferFn() {
    clear();
    timer = setTimeout(fn, ms);
  }

  bufferFn.clear = clear;

  return bufferFn;
}

var Align = function (_Component) {
  _inherits(Align, _Component);

  function Align() {
    var _temp, _this, _ret;

    _classCallCheck(this, Align);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.forceAlign = function () {
      var props = _this.props;
      if (!props.disabled) {
        var source = _reactDom2["default"].findDOMNode(_this);
        props.onAlign(source, (0, _domAlign2["default"])(source, props.target(), props.align));
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Align.prototype.componentDidMount = function componentDidMount() {
    var props = this.props;
    // if parent ref not attached .... use document.getElementById
    this.forceAlign();
    if (!props.disabled && props.monitorWindowResize) {
      this.startMonitorWindowResize();
    }
  };

  Align.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    var reAlign = false;
    var props = this.props;

    if (!props.disabled) {
      if (prevProps.disabled || prevProps.align !== props.align) {
        reAlign = true;
      } else {
        var lastTarget = prevProps.target();
        var currentTarget = props.target();
        if ((0, _isWindow2["default"])(lastTarget) && (0, _isWindow2["default"])(currentTarget)) {
          reAlign = false;
        } else if (lastTarget !== currentTarget) {
          reAlign = true;
        }
      }
    }

    if (reAlign) {
      this.forceAlign();
    }

    if (props.monitorWindowResize && !props.disabled) {
      this.startMonitorWindowResize();
    } else {
      this.stopMonitorWindowResize();
    }
  };

  Align.prototype.componentWillUnmount = function componentWillUnmount() {
    this.stopMonitorWindowResize();
  };

  Align.prototype.startMonitorWindowResize = function startMonitorWindowResize() {
    if (!this.resizeHandler) {
      this.bufferMonitor = buffer(this.forceAlign, this.props.monitorBufferTime);
      this.resizeHandler = (0, _addEventListener2["default"])(window, 'resize', this.bufferMonitor);
    }
  };

  Align.prototype.stopMonitorWindowResize = function stopMonitorWindowResize() {
    if (this.resizeHandler) {
      this.bufferMonitor.clear();
      this.resizeHandler.remove();
      this.resizeHandler = null;
    }
  };

  Align.prototype.render = function render() {
    var _props = this.props,
        childrenProps = _props.childrenProps,
        children = _props.children;

    var child = _react2["default"].Children.only(children);
    if (childrenProps) {
      var newProps = {};
      for (var prop in childrenProps) {
        if (childrenProps.hasOwnProperty(prop)) {
          newProps[prop] = this.props[childrenProps[prop]];
        }
      }
      return _react2["default"].cloneElement(child, newProps);
    }
    return child;
  };

  return Align;
}(_react.Component);

Align.propTypes = {
  childrenProps: _propTypes2["default"].object,
  align: _propTypes2["default"].object.isRequired,
  target: _propTypes2["default"].func,
  onAlign: _propTypes2["default"].func,
  monitorBufferTime: _propTypes2["default"].number,
  monitorWindowResize: _propTypes2["default"].bool,
  disabled: _propTypes2["default"].bool,
  children: _propTypes2["default"].any
};
Align.defaultProps = {
  target: function target() {
    return window;
  },
  onAlign: function onAlign() {},
  monitorBufferTime: 50,
  monitorWindowResize: false,
  disabled: false
};
exports["default"] = Align;
module.exports = exports['default'];

/***/ }),

/***/ 2252:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (false) {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(2253)();
}


/***/ }),

/***/ 2253:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(2254);
var invariant = __webpack_require__(2255);
var ReactPropTypesSecret = __webpack_require__(2256);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ 2254:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),

/***/ 2255:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (false) {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),

/***/ 2256:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ 2257:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(680);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getOffsetParent__ = __webpack_require__(1997);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__getVisibleRectForElement__ = __webpack_require__(2259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__adjustForViewport__ = __webpack_require__(2261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__getRegion__ = __webpack_require__(2262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__getElFuturePos__ = __webpack_require__(2263);
/**
 * align dom node flexibly
 * @author yiminghe@gmail.com
 */








// http://yiminghe.iteye.com/blog/1124720

function isFailX(elFuturePos, elRegion, visibleRect) {
  return elFuturePos.left < visibleRect.left || elFuturePos.left + elRegion.width > visibleRect.right;
}

function isFailY(elFuturePos, elRegion, visibleRect) {
  return elFuturePos.top < visibleRect.top || elFuturePos.top + elRegion.height > visibleRect.bottom;
}

function isCompleteFailX(elFuturePos, elRegion, visibleRect) {
  return elFuturePos.left > visibleRect.right || elFuturePos.left + elRegion.width < visibleRect.left;
}

function isCompleteFailY(elFuturePos, elRegion, visibleRect) {
  return elFuturePos.top > visibleRect.bottom || elFuturePos.top + elRegion.height < visibleRect.top;
}

function isOutOfVisibleRect(target) {
  var visibleRect = Object(__WEBPACK_IMPORTED_MODULE_2__getVisibleRectForElement__["a" /* default */])(target);
  var targetRegion = Object(__WEBPACK_IMPORTED_MODULE_4__getRegion__["a" /* default */])(target);

  return !visibleRect || targetRegion.left + targetRegion.width <= visibleRect.left || targetRegion.top + targetRegion.height <= visibleRect.top || targetRegion.left >= visibleRect.right || targetRegion.top >= visibleRect.bottom;
}

function flip(points, reg, map) {
  var ret = [];
  __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].each(points, function (p) {
    ret.push(p.replace(reg, function (m) {
      return map[m];
    }));
  });
  return ret;
}

function flipOffset(offset, index) {
  offset[index] = -offset[index];
  return offset;
}

function convertOffset(str, offsetLen) {
  var n = void 0;
  if (/%$/.test(str)) {
    n = parseInt(str.substring(0, str.length - 1), 10) / 100 * offsetLen;
  } else {
    n = parseInt(str, 10);
  }
  return n || 0;
}

function normalizeOffset(offset, el) {
  offset[0] = convertOffset(offset[0], el.width);
  offset[1] = convertOffset(offset[1], el.height);
}

function domAlign(el, refNode, align) {
  var points = align.points;
  var offset = align.offset || [0, 0];
  var targetOffset = align.targetOffset || [0, 0];
  var overflow = align.overflow;
  var target = align.target || refNode;
  var source = align.source || el;
  offset = [].concat(offset);
  targetOffset = [].concat(targetOffset);
  overflow = overflow || {};
  var newOverflowCfg = {};
  var fail = 0;
  // 当前节点可以被放置的显示区域
  var visibleRect = Object(__WEBPACK_IMPORTED_MODULE_2__getVisibleRectForElement__["a" /* default */])(source);
  // 当前节点所占的区域, left/top/width/height
  var elRegion = Object(__WEBPACK_IMPORTED_MODULE_4__getRegion__["a" /* default */])(source);
  // 参照节点所占的区域, left/top/width/height
  var refNodeRegion = Object(__WEBPACK_IMPORTED_MODULE_4__getRegion__["a" /* default */])(target);
  // 将 offset 转换成数值，支持百分比
  normalizeOffset(offset, elRegion);
  normalizeOffset(targetOffset, refNodeRegion);
  // 当前节点将要被放置的位置
  var elFuturePos = Object(__WEBPACK_IMPORTED_MODULE_5__getElFuturePos__["a" /* default */])(elRegion, refNodeRegion, points, offset, targetOffset);
  // 当前节点将要所处的区域
  var newElRegion = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].merge(elRegion, elFuturePos);

  var isTargetNotOutOfVisible = !isOutOfVisibleRect(target);

  // 如果可视区域不能完全放置当前节点时允许调整
  if (visibleRect && (overflow.adjustX || overflow.adjustY) && isTargetNotOutOfVisible) {
    if (overflow.adjustX) {
      // 如果横向不能放下
      if (isFailX(elFuturePos, elRegion, visibleRect)) {
        // 对齐位置反下
        var newPoints = flip(points, /[lr]/ig, {
          l: 'r',
          r: 'l'
        });
        // 偏移量也反下
        var newOffset = flipOffset(offset, 0);
        var newTargetOffset = flipOffset(targetOffset, 0);
        var newElFuturePos = Object(__WEBPACK_IMPORTED_MODULE_5__getElFuturePos__["a" /* default */])(elRegion, refNodeRegion, newPoints, newOffset, newTargetOffset);

        if (!isCompleteFailX(newElFuturePos, elRegion, visibleRect)) {
          fail = 1;
          points = newPoints;
          offset = newOffset;
          targetOffset = newTargetOffset;
        }
      }
    }

    if (overflow.adjustY) {
      // 如果纵向不能放下
      if (isFailY(elFuturePos, elRegion, visibleRect)) {
        // 对齐位置反下
        var _newPoints = flip(points, /[tb]/ig, {
          t: 'b',
          b: 't'
        });
        // 偏移量也反下
        var _newOffset = flipOffset(offset, 1);
        var _newTargetOffset = flipOffset(targetOffset, 1);
        var _newElFuturePos = Object(__WEBPACK_IMPORTED_MODULE_5__getElFuturePos__["a" /* default */])(elRegion, refNodeRegion, _newPoints, _newOffset, _newTargetOffset);

        if (!isCompleteFailY(_newElFuturePos, elRegion, visibleRect)) {
          fail = 1;
          points = _newPoints;
          offset = _newOffset;
          targetOffset = _newTargetOffset;
        }
      }
    }

    // 如果失败，重新计算当前节点将要被放置的位置
    if (fail) {
      elFuturePos = Object(__WEBPACK_IMPORTED_MODULE_5__getElFuturePos__["a" /* default */])(elRegion, refNodeRegion, points, offset, targetOffset);
      __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].mix(newElRegion, elFuturePos);
    }

    // 检查反下后的位置是否可以放下了
    // 如果仍然放不下只有指定了可以调整当前方向才调整
    newOverflowCfg.adjustX = overflow.adjustX && isFailX(elFuturePos, elRegion, visibleRect);

    newOverflowCfg.adjustY = overflow.adjustY && isFailY(elFuturePos, elRegion, visibleRect);

    // 确实要调整，甚至可能会调整高度宽度
    if (newOverflowCfg.adjustX || newOverflowCfg.adjustY) {
      newElRegion = Object(__WEBPACK_IMPORTED_MODULE_3__adjustForViewport__["a" /* default */])(elFuturePos, elRegion, visibleRect, newOverflowCfg);
    }
  }

  // need judge to in case set fixed with in css on height auto element
  if (newElRegion.width !== elRegion.width) {
    __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].css(source, 'width', __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].width(source) + newElRegion.width - elRegion.width);
  }

  if (newElRegion.height !== elRegion.height) {
    __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].css(source, 'height', __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].height(source) + newElRegion.height - elRegion.height);
  }

  // https://github.com/kissyteam/kissy/issues/190
  // 相对于屏幕位置没变，而 left/top 变了
  // 例如 <div 'relative'><el absolute></div>
  __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].offset(source, {
    left: newElRegion.left,
    top: newElRegion.top
  }, {
    useCssRight: align.useCssRight,
    useCssBottom: align.useCssBottom,
    useCssTransform: align.useCssTransform
  });

  return {
    points: points,
    offset: offset,
    targetOffset: targetOffset,
    overflow: newOverflowCfg
  };
}

domAlign.__getOffsetParent = __WEBPACK_IMPORTED_MODULE_1__getOffsetParent__["a" /* default */];

domAlign.__getVisibleRectForElement = __WEBPACK_IMPORTED_MODULE_2__getVisibleRectForElement__["a" /* default */];

/* harmony default export */ __webpack_exports__["default"] = (domAlign);
/**
 *  2012-04-26 yiminghe@gmail.com
 *   - 优化智能对齐算法
 *   - 慎用 resizeXX
 *
 *  2011-07-13 yiminghe@gmail.com note:
 *   - 增加智能对齐，以及大小调整选项
 **/

/***/ }),

/***/ 2258:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getTransformName;
/* harmony export (immutable) */ __webpack_exports__["e"] = setTransitionProperty;
/* harmony export (immutable) */ __webpack_exports__["c"] = getTransitionProperty;
/* harmony export (immutable) */ __webpack_exports__["b"] = getTransformXY;
/* harmony export (immutable) */ __webpack_exports__["d"] = setTransformXY;
var vendorPrefix = void 0;

var jsCssMap = {
  Webkit: '-webkit-',
  Moz: '-moz-',
  // IE did it wrong again ...
  ms: '-ms-',
  O: '-o-'
};

function getVendorPrefix() {
  if (vendorPrefix !== undefined) {
    return vendorPrefix;
  }
  vendorPrefix = '';
  var style = document.createElement('p').style;
  var testProp = 'Transform';
  for (var key in jsCssMap) {
    if (key + testProp in style) {
      vendorPrefix = key;
    }
  }
  return vendorPrefix;
}

function getTransitionName() {
  return getVendorPrefix() ? getVendorPrefix() + 'TransitionProperty' : 'transitionProperty';
}

function getTransformName() {
  return getVendorPrefix() ? getVendorPrefix() + 'Transform' : 'transform';
}

function setTransitionProperty(node, value) {
  var name = getTransitionName();
  if (name) {
    node.style[name] = value;
    if (name !== 'transitionProperty') {
      node.style.transitionProperty = value;
    }
  }
}

function setTransform(node, value) {
  var name = getTransformName();
  if (name) {
    node.style[name] = value;
    if (name !== 'transform') {
      node.style.transform = value;
    }
  }
}

function getTransitionProperty(node) {
  return node.style.transitionProperty || node.style[getTransitionName()];
}

function getTransformXY(node) {
  var style = window.getComputedStyle(node, null);
  var transform = style.getPropertyValue('transform') || style.getPropertyValue(getTransformName());
  if (transform && transform !== 'none') {
    var matrix = transform.replace(/[^0-9\-.,]/g, '').split(',');
    return { x: parseFloat(matrix[12] || matrix[4], 0), y: parseFloat(matrix[13] || matrix[5], 0) };
  }
  return {
    x: 0,
    y: 0
  };
}

var matrix2d = /matrix\((.*)\)/;
var matrix3d = /matrix3d\((.*)\)/;

function setTransformXY(node, xy) {
  var style = window.getComputedStyle(node, null);
  var transform = style.getPropertyValue('transform') || style.getPropertyValue(getTransformName());
  if (transform && transform !== 'none') {
    var arr = void 0;
    var match2d = transform.match(matrix2d);
    if (match2d) {
      match2d = match2d[1];
      arr = match2d.split(',').map(function (item) {
        return parseFloat(item, 10);
      });
      arr[4] = xy.x;
      arr[5] = xy.y;
      setTransform(node, 'matrix(' + arr.join(',') + ')');
    } else {
      var match3d = transform.match(matrix3d)[1];
      arr = match3d.split(',').map(function (item) {
        return parseFloat(item, 10);
      });
      arr[12] = xy.x;
      arr[13] = xy.y;
      setTransform(node, 'matrix3d(' + arr.join(',') + ')');
    }
  } else {
    setTransform(node, 'translateX(' + xy.x + 'px) translateY(' + xy.y + 'px) translateZ(0)');
  }
}

/***/ }),

/***/ 2259:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(680);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getOffsetParent__ = __webpack_require__(1997);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__isAncestorFixed__ = __webpack_require__(2260);




/**
 * 获得元素的显示部分的区域
 */
function getVisibleRectForElement(element) {
  var visibleRect = {
    left: 0,
    right: Infinity,
    top: 0,
    bottom: Infinity
  };
  var el = Object(__WEBPACK_IMPORTED_MODULE_1__getOffsetParent__["a" /* default */])(element);
  var doc = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].getDocument(element);
  var win = doc.defaultView || doc.parentWindow;
  var body = doc.body;
  var documentElement = doc.documentElement;

  // Determine the size of the visible rect by climbing the dom accounting for
  // all scrollable containers.
  while (el) {
    // clientWidth is zero for inline block elements in ie.
    if ((navigator.userAgent.indexOf('MSIE') === -1 || el.clientWidth !== 0) &&
    // body may have overflow set on it, yet we still get the entire
    // viewport. In some browsers, el.offsetParent may be
    // document.documentElement, so check for that too.
    el !== body && el !== documentElement && __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].css(el, 'overflow') !== 'visible') {
      var pos = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].offset(el);
      // add border
      pos.left += el.clientLeft;
      pos.top += el.clientTop;
      visibleRect.top = Math.max(visibleRect.top, pos.top);
      visibleRect.right = Math.min(visibleRect.right,
      // consider area without scrollBar
      pos.left + el.clientWidth);
      visibleRect.bottom = Math.min(visibleRect.bottom, pos.top + el.clientHeight);
      visibleRect.left = Math.max(visibleRect.left, pos.left);
    } else if (el === body || el === documentElement) {
      break;
    }
    el = Object(__WEBPACK_IMPORTED_MODULE_1__getOffsetParent__["a" /* default */])(el);
  }

  // Set element position to fixed
  // make sure absolute element itself don't affect it's visible area
  // https://github.com/ant-design/ant-design/issues/7601
  var originalPosition = null;
  if (!__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].isWindow(element) && element.nodeType !== 9) {
    originalPosition = element.style.position;
    var position = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].css(element, 'position');
    if (position === 'absolute') {
      element.style.position = 'fixed';
    }
  }

  var scrollX = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].getWindowScrollLeft(win);
  var scrollY = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].getWindowScrollTop(win);
  var viewportWidth = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].viewportWidth(win);
  var viewportHeight = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].viewportHeight(win);
  var documentWidth = documentElement.scrollWidth;
  var documentHeight = documentElement.scrollHeight;

  // Reset element position after calculate the visible area
  if (element.style) {
    element.style.position = originalPosition;
  }

  if (Object(__WEBPACK_IMPORTED_MODULE_2__isAncestorFixed__["a" /* default */])(element)) {
    // Clip by viewport's size.
    visibleRect.left = Math.max(visibleRect.left, scrollX);
    visibleRect.top = Math.max(visibleRect.top, scrollY);
    visibleRect.right = Math.min(visibleRect.right, scrollX + viewportWidth);
    visibleRect.bottom = Math.min(visibleRect.bottom, scrollY + viewportHeight);
  } else {
    // Clip by document's size.
    var maxVisibleWidth = Math.max(documentWidth, scrollX + viewportWidth);
    visibleRect.right = Math.min(visibleRect.right, maxVisibleWidth);

    var maxVisibleHeight = Math.max(documentHeight, scrollY + viewportHeight);
    visibleRect.bottom = Math.min(visibleRect.bottom, maxVisibleHeight);
  }

  return visibleRect.top >= 0 && visibleRect.left >= 0 && visibleRect.bottom > visibleRect.top && visibleRect.right > visibleRect.left ? visibleRect : null;
}

/* harmony default export */ __webpack_exports__["a"] = (getVisibleRectForElement);

/***/ }),

/***/ 2260:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = isAncestorFixed;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(680);


function isAncestorFixed(element) {
  if (__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].isWindow(element) || element.nodeType === 9) {
    return false;
  }

  var doc = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].getDocument(element);
  var body = doc.body;
  var parent = null;
  for (parent = element.parentNode; parent && parent !== body; parent = parent.parentNode) {
    var positionStyle = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].css(parent, 'position');
    if (positionStyle === 'fixed') {
      return true;
    }
  }
  return false;
}

/***/ }),

/***/ 2261:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(680);


function adjustForViewport(elFuturePos, elRegion, visibleRect, overflow) {
  var pos = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].clone(elFuturePos);
  var size = {
    width: elRegion.width,
    height: elRegion.height
  };

  if (overflow.adjustX && pos.left < visibleRect.left) {
    pos.left = visibleRect.left;
  }

  // Left edge inside and right edge outside viewport, try to resize it.
  if (overflow.resizeWidth && pos.left >= visibleRect.left && pos.left + size.width > visibleRect.right) {
    size.width -= pos.left + size.width - visibleRect.right;
  }

  // Right edge outside viewport, try to move it.
  if (overflow.adjustX && pos.left + size.width > visibleRect.right) {
    // 保证左边界和可视区域左边界对齐
    pos.left = Math.max(visibleRect.right - size.width, visibleRect.left);
  }

  // Top edge outside viewport, try to move it.
  if (overflow.adjustY && pos.top < visibleRect.top) {
    pos.top = visibleRect.top;
  }

  // Top edge inside and bottom edge outside viewport, try to resize it.
  if (overflow.resizeHeight && pos.top >= visibleRect.top && pos.top + size.height > visibleRect.bottom) {
    size.height -= pos.top + size.height - visibleRect.bottom;
  }

  // Bottom edge outside viewport, try to move it.
  if (overflow.adjustY && pos.top + size.height > visibleRect.bottom) {
    // 保证上边界和可视区域上边界对齐
    pos.top = Math.max(visibleRect.bottom - size.height, visibleRect.top);
  }

  return __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].mix(pos, size);
}

/* harmony default export */ __webpack_exports__["a"] = (adjustForViewport);

/***/ }),

/***/ 2262:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(680);


function getRegion(node) {
  var offset = void 0;
  var w = void 0;
  var h = void 0;
  if (!__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].isWindow(node) && node.nodeType !== 9) {
    offset = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].offset(node);
    w = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].outerWidth(node);
    h = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].outerHeight(node);
  } else {
    var win = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].getWindow(node);
    offset = {
      left: __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].getWindowScrollLeft(win),
      top: __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].getWindowScrollTop(win)
    };
    w = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].viewportWidth(win);
    h = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].viewportHeight(win);
  }
  offset.width = w;
  offset.height = h;
  return offset;
}

/* harmony default export */ __webpack_exports__["a"] = (getRegion);

/***/ }),

/***/ 2263:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__getAlignOffset__ = __webpack_require__(2264);


function getElFuturePos(elRegion, refNodeRegion, points, offset, targetOffset) {
  var p1 = Object(__WEBPACK_IMPORTED_MODULE_0__getAlignOffset__["a" /* default */])(refNodeRegion, points[1]);
  var p2 = Object(__WEBPACK_IMPORTED_MODULE_0__getAlignOffset__["a" /* default */])(elRegion, points[0]);
  var diff = [p2.left - p1.left, p2.top - p1.top];

  return {
    left: elRegion.left - diff[0] + offset[0] - targetOffset[0],
    top: elRegion.top - diff[1] + offset[1] - targetOffset[1]
  };
}

/* harmony default export */ __webpack_exports__["a"] = (getElFuturePos);

/***/ }),

/***/ 2264:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * 获取 node 上的 align 对齐点 相对于页面的坐标
 */

function getAlignOffset(region, align) {
  var V = align.charAt(0);
  var H = align.charAt(1);
  var w = region.width;
  var h = region.height;

  var x = region.left;
  var y = region.top;

  if (V === 'c') {
    y += h / 2;
  } else if (V === 'b') {
    y += h;
  }

  if (H === 'c') {
    x += w / 2;
  } else if (H === 'r') {
    x += w;
  }

  return {
    left: x,
    top: y
  };
}

/* harmony default export */ __webpack_exports__["a"] = (getAlignOffset);

/***/ }),

/***/ 2265:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = addEventListenerWrap;

var _addDomEventListener = __webpack_require__(2266);

var _addDomEventListener2 = _interopRequireDefault(_addDomEventListener);

var _reactDom = __webpack_require__(551);

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function addEventListenerWrap(target, eventType, cb) {
  /* eslint camelcase: 2 */
  var callback = _reactDom2['default'].unstable_batchedUpdates ? function run(e) {
    _reactDom2['default'].unstable_batchedUpdates(cb, e);
  } : cb;
  return (0, _addDomEventListener2['default'])(target, eventType, callback);
}
module.exports = exports['default'];

/***/ }),

/***/ 2266:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = addEventListener;

var _EventObject = __webpack_require__(2267);

var _EventObject2 = _interopRequireDefault(_EventObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function addEventListener(target, eventType, callback) {
  function wrapCallback(e) {
    var ne = new _EventObject2["default"](e);
    callback.call(target, ne);
  }

  if (target.addEventListener) {
    target.addEventListener(eventType, wrapCallback, false);
    return {
      remove: function remove() {
        target.removeEventListener(eventType, wrapCallback, false);
      }
    };
  } else if (target.attachEvent) {
    target.attachEvent('on' + eventType, wrapCallback);
    return {
      remove: function remove() {
        target.detachEvent('on' + eventType, wrapCallback);
      }
    };
  }
}
module.exports = exports['default'];

/***/ }),

/***/ 2267:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _EventBaseObject = __webpack_require__(2268);

var _EventBaseObject2 = _interopRequireDefault(_EventBaseObject);

var _objectAssign = __webpack_require__(953);

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @ignore
 * event object for dom
 * @author yiminghe@gmail.com
 */

var TRUE = true;
var FALSE = false;
var commonProps = ['altKey', 'bubbles', 'cancelable', 'ctrlKey', 'currentTarget', 'eventPhase', 'metaKey', 'shiftKey', 'target', 'timeStamp', 'view', 'type'];

function isNullOrUndefined(w) {
  return w === null || w === undefined;
}

var eventNormalizers = [{
  reg: /^key/,
  props: ['char', 'charCode', 'key', 'keyCode', 'which'],
  fix: function fix(event, nativeEvent) {
    if (isNullOrUndefined(event.which)) {
      event.which = !isNullOrUndefined(nativeEvent.charCode) ? nativeEvent.charCode : nativeEvent.keyCode;
    }

    // add metaKey to non-Mac browsers (use ctrl for PC 's and Meta for Macs)
    if (event.metaKey === undefined) {
      event.metaKey = event.ctrlKey;
    }
  }
}, {
  reg: /^touch/,
  props: ['touches', 'changedTouches', 'targetTouches']
}, {
  reg: /^hashchange$/,
  props: ['newURL', 'oldURL']
}, {
  reg: /^gesturechange$/i,
  props: ['rotation', 'scale']
}, {
  reg: /^(mousewheel|DOMMouseScroll)$/,
  props: [],
  fix: function fix(event, nativeEvent) {
    var deltaX = void 0;
    var deltaY = void 0;
    var delta = void 0;
    var wheelDelta = nativeEvent.wheelDelta;
    var axis = nativeEvent.axis;
    var wheelDeltaY = nativeEvent.wheelDeltaY;
    var wheelDeltaX = nativeEvent.wheelDeltaX;
    var detail = nativeEvent.detail;

    // ie/webkit
    if (wheelDelta) {
      delta = wheelDelta / 120;
    }

    // gecko
    if (detail) {
      // press control e.detail == 1 else e.detail == 3
      delta = 0 - (detail % 3 === 0 ? detail / 3 : detail);
    }

    // Gecko
    if (axis !== undefined) {
      if (axis === event.HORIZONTAL_AXIS) {
        deltaY = 0;
        deltaX = 0 - delta;
      } else if (axis === event.VERTICAL_AXIS) {
        deltaX = 0;
        deltaY = delta;
      }
    }

    // Webkit
    if (wheelDeltaY !== undefined) {
      deltaY = wheelDeltaY / 120;
    }
    if (wheelDeltaX !== undefined) {
      deltaX = -1 * wheelDeltaX / 120;
    }

    // 默认 deltaY (ie)
    if (!deltaX && !deltaY) {
      deltaY = delta;
    }

    if (deltaX !== undefined) {
      /**
       * deltaX of mousewheel event
       * @property deltaX
       * @member Event.DomEvent.Object
       */
      event.deltaX = deltaX;
    }

    if (deltaY !== undefined) {
      /**
       * deltaY of mousewheel event
       * @property deltaY
       * @member Event.DomEvent.Object
       */
      event.deltaY = deltaY;
    }

    if (delta !== undefined) {
      /**
       * delta of mousewheel event
       * @property delta
       * @member Event.DomEvent.Object
       */
      event.delta = delta;
    }
  }
}, {
  reg: /^mouse|contextmenu|click|mspointer|(^DOMMouseScroll$)/i,
  props: ['buttons', 'clientX', 'clientY', 'button', 'offsetX', 'relatedTarget', 'which', 'fromElement', 'toElement', 'offsetY', 'pageX', 'pageY', 'screenX', 'screenY'],
  fix: function fix(event, nativeEvent) {
    var eventDoc = void 0;
    var doc = void 0;
    var body = void 0;
    var target = event.target;
    var button = nativeEvent.button;

    // Calculate pageX/Y if missing and clientX/Y available
    if (target && isNullOrUndefined(event.pageX) && !isNullOrUndefined(nativeEvent.clientX)) {
      eventDoc = target.ownerDocument || document;
      doc = eventDoc.documentElement;
      body = eventDoc.body;
      event.pageX = nativeEvent.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
      event.pageY = nativeEvent.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
    }

    // which for click: 1 === left; 2 === middle; 3 === right
    // do not use button
    if (!event.which && button !== undefined) {
      if (button & 1) {
        event.which = 1;
      } else if (button & 2) {
        event.which = 3;
      } else if (button & 4) {
        event.which = 2;
      } else {
        event.which = 0;
      }
    }

    // add relatedTarget, if necessary
    if (!event.relatedTarget && event.fromElement) {
      event.relatedTarget = event.fromElement === target ? event.toElement : event.fromElement;
    }

    return event;
  }
}];

function retTrue() {
  return TRUE;
}

function retFalse() {
  return FALSE;
}

function DomEventObject(nativeEvent) {
  var type = nativeEvent.type;

  var isNative = typeof nativeEvent.stopPropagation === 'function' || typeof nativeEvent.cancelBubble === 'boolean';

  _EventBaseObject2["default"].call(this);

  this.nativeEvent = nativeEvent;

  // in case dom event has been mark as default prevented by lower dom node
  var isDefaultPrevented = retFalse;
  if ('defaultPrevented' in nativeEvent) {
    isDefaultPrevented = nativeEvent.defaultPrevented ? retTrue : retFalse;
  } else if ('getPreventDefault' in nativeEvent) {
    // https://bugzilla.mozilla.org/show_bug.cgi?id=691151
    isDefaultPrevented = nativeEvent.getPreventDefault() ? retTrue : retFalse;
  } else if ('returnValue' in nativeEvent) {
    isDefaultPrevented = nativeEvent.returnValue === FALSE ? retTrue : retFalse;
  }

  this.isDefaultPrevented = isDefaultPrevented;

  var fixFns = [];
  var fixFn = void 0;
  var l = void 0;
  var prop = void 0;
  var props = commonProps.concat();

  eventNormalizers.forEach(function (normalizer) {
    if (type.match(normalizer.reg)) {
      props = props.concat(normalizer.props);
      if (normalizer.fix) {
        fixFns.push(normalizer.fix);
      }
    }
  });

  l = props.length;

  // clone properties of the original event object
  while (l) {
    prop = props[--l];
    this[prop] = nativeEvent[prop];
  }

  // fix target property, if necessary
  if (!this.target && isNative) {
    this.target = nativeEvent.srcElement || document; // srcElement might not be defined either
  }

  // check if target is a text node (safari)
  if (this.target && this.target.nodeType === 3) {
    this.target = this.target.parentNode;
  }

  l = fixFns.length;

  while (l) {
    fixFn = fixFns[--l];
    fixFn(this, nativeEvent);
  }

  this.timeStamp = nativeEvent.timeStamp || Date.now();
}

var EventBaseObjectProto = _EventBaseObject2["default"].prototype;

(0, _objectAssign2["default"])(DomEventObject.prototype, EventBaseObjectProto, {
  constructor: DomEventObject,

  preventDefault: function preventDefault() {
    var e = this.nativeEvent;

    // if preventDefault exists run it on the original event
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      // otherwise set the returnValue property of the original event to FALSE (IE)
      e.returnValue = FALSE;
    }

    EventBaseObjectProto.preventDefault.call(this);
  },
  stopPropagation: function stopPropagation() {
    var e = this.nativeEvent;

    // if stopPropagation exists run it on the original event
    if (e.stopPropagation) {
      e.stopPropagation();
    } else {
      // otherwise set the cancelBubble property of the original event to TRUE (IE)
      e.cancelBubble = TRUE;
    }

    EventBaseObjectProto.stopPropagation.call(this);
  }
});

exports["default"] = DomEventObject;
module.exports = exports['default'];

/***/ }),

/***/ 2268:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @ignore
 * base event object for custom and dom event.
 * @author yiminghe@gmail.com
 */

function returnFalse() {
  return false;
}

function returnTrue() {
  return true;
}

function EventBaseObject() {
  this.timeStamp = Date.now();
  this.target = undefined;
  this.currentTarget = undefined;
}

EventBaseObject.prototype = {
  isEventObject: 1,

  constructor: EventBaseObject,

  isDefaultPrevented: returnFalse,

  isPropagationStopped: returnFalse,

  isImmediatePropagationStopped: returnFalse,

  preventDefault: function preventDefault() {
    this.isDefaultPrevented = returnTrue;
  },
  stopPropagation: function stopPropagation() {
    this.isPropagationStopped = returnTrue;
  },
  stopImmediatePropagation: function stopImmediatePropagation() {
    this.isImmediatePropagationStopped = returnTrue;
    // fixed 1.2
    // call stopPropagation implicitly
    this.stopPropagation();
  },
  halt: function halt(immediate) {
    if (immediate) {
      this.stopImmediatePropagation();
    } else {
      this.stopPropagation();
    }
    this.preventDefault();
  }
};

exports["default"] = EventBaseObject;
module.exports = exports['default'];

/***/ }),

/***/ 2269:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isWindow;
function isWindow(obj) {
  /* eslint no-eq-null: 0 */
  /* eslint eqeqeq: 0 */
  return obj != null && obj == obj.window;
}
module.exports = exports['default'];

/***/ }),

/***/ 2270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(466);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(459);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prop_types__ = __webpack_require__(1998);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__ = __webpack_require__(2275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__AnimateChild__ = __webpack_require__(2276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__util__ = __webpack_require__(2000);










var defaultKey = 'rc_animate_' + Date.now();


function getChildrenFromProps(props) {
  var children = props.children;
  if (__WEBPACK_IMPORTED_MODULE_6_react___default.a.isValidElement(children)) {
    if (!children.key) {
      return __WEBPACK_IMPORTED_MODULE_6_react___default.a.cloneElement(children, {
        key: defaultKey
      });
    }
  }
  return children;
}

function noop() {}

var Animate = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(Animate, _React$Component);

  function Animate(props) {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, Animate);

    var _this = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Animate.__proto__ || Object.getPrototypeOf(Animate)).call(this, props));

    _initialiseProps.call(_this);

    _this.currentlyAnimatingKeys = {};
    _this.keysToEnter = [];
    _this.keysToLeave = [];

    _this.state = {
      children: Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["e" /* toArrayChildren */])(getChildrenFromProps(_this.props))
    };

    _this.childrenRefs = {};
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(Animate, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var showProp = this.props.showProp;
      var children = this.state.children;
      if (showProp) {
        children = children.filter(function (child) {
          return !!child.props[showProp];
        });
      }
      children.forEach(function (child) {
        if (child) {
          _this2.performAppear(child.key);
        }
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      this.nextProps = nextProps;
      var nextChildren = Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["e" /* toArrayChildren */])(getChildrenFromProps(nextProps));
      var props = this.props;
      // exclusive needs immediate response
      if (props.exclusive) {
        Object.keys(this.currentlyAnimatingKeys).forEach(function (key) {
          _this3.stop(key);
        });
      }
      var showProp = props.showProp;
      var currentlyAnimatingKeys = this.currentlyAnimatingKeys;
      // last props children if exclusive
      var currentChildren = props.exclusive ? Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["e" /* toArrayChildren */])(getChildrenFromProps(props)) : this.state.children;
      // in case destroy in showProp mode
      var newChildren = [];
      if (showProp) {
        currentChildren.forEach(function (currentChild) {
          var nextChild = currentChild && Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["a" /* findChildInChildrenByKey */])(nextChildren, currentChild.key);
          var newChild = void 0;
          if ((!nextChild || !nextChild.props[showProp]) && currentChild.props[showProp]) {
            newChild = __WEBPACK_IMPORTED_MODULE_6_react___default.a.cloneElement(nextChild || currentChild, __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()({}, showProp, true));
          } else {
            newChild = nextChild;
          }
          if (newChild) {
            newChildren.push(newChild);
          }
        });
        nextChildren.forEach(function (nextChild) {
          if (!nextChild || !Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["a" /* findChildInChildrenByKey */])(currentChildren, nextChild.key)) {
            newChildren.push(nextChild);
          }
        });
      } else {
        newChildren = Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["d" /* mergeChildren */])(currentChildren, nextChildren);
      }

      // need render to avoid update
      this.setState({
        children: newChildren
      });

      nextChildren.forEach(function (child) {
        var key = child && child.key;
        if (child && currentlyAnimatingKeys[key]) {
          return;
        }
        var hasPrev = child && Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["a" /* findChildInChildrenByKey */])(currentChildren, key);
        if (showProp) {
          var showInNext = child.props[showProp];
          if (hasPrev) {
            var showInNow = Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["b" /* findShownChildInChildrenByKey */])(currentChildren, key, showProp);
            if (!showInNow && showInNext) {
              _this3.keysToEnter.push(key);
            }
          } else if (showInNext) {
            _this3.keysToEnter.push(key);
          }
        } else if (!hasPrev) {
          _this3.keysToEnter.push(key);
        }
      });

      currentChildren.forEach(function (child) {
        var key = child && child.key;
        if (child && currentlyAnimatingKeys[key]) {
          return;
        }
        var hasNext = child && Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["a" /* findChildInChildrenByKey */])(nextChildren, key);
        if (showProp) {
          var showInNow = child.props[showProp];
          if (hasNext) {
            var showInNext = Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["b" /* findShownChildInChildrenByKey */])(nextChildren, key, showProp);
            if (!showInNext && showInNow) {
              _this3.keysToLeave.push(key);
            }
          } else if (showInNow) {
            _this3.keysToLeave.push(key);
          }
        } else if (!hasNext) {
          _this3.keysToLeave.push(key);
        }
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var keysToEnter = this.keysToEnter;
      this.keysToEnter = [];
      keysToEnter.forEach(this.performEnter);
      var keysToLeave = this.keysToLeave;
      this.keysToLeave = [];
      keysToLeave.forEach(this.performLeave);
    }
  }, {
    key: 'isValidChildByKey',
    value: function isValidChildByKey(currentChildren, key) {
      var showProp = this.props.showProp;
      if (showProp) {
        return Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["b" /* findShownChildInChildrenByKey */])(currentChildren, key, showProp);
      }
      return Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["a" /* findChildInChildrenByKey */])(currentChildren, key);
    }
  }, {
    key: 'stop',
    value: function stop(key) {
      delete this.currentlyAnimatingKeys[key];
      var component = this.childrenRefs[key];
      if (component) {
        component.stop();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var props = this.props;
      this.nextProps = props;
      var stateChildren = this.state.children;
      var children = null;
      if (stateChildren) {
        children = stateChildren.map(function (child) {
          if (child === null || child === undefined) {
            return child;
          }
          if (!child.key) {
            throw new Error('must set key for <rc-animate> children');
          }
          return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_9__AnimateChild__["a" /* default */],
            {
              key: child.key,
              ref: function ref(node) {
                return _this4.childrenRefs[child.key] = node;
              },
              animation: props.animation,
              transitionName: props.transitionName,
              transitionEnter: props.transitionEnter,
              transitionAppear: props.transitionAppear,
              transitionLeave: props.transitionLeave
            },
            child
          );
        });
      }
      var Component = props.component;
      if (Component) {
        var passedProps = props;
        if (typeof Component === 'string') {
          passedProps = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({
            className: props.className,
            style: props.style
          }, props.componentProps);
        }
        return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          Component,
          passedProps,
          children
        );
      }
      return children[0] || null;
    }
  }]);

  return Animate;
}(__WEBPACK_IMPORTED_MODULE_6_react___default.a.Component);

Animate.propTypes = {
  component: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.any,
  componentProps: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.object,
  animation: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.object,
  transitionName: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.object]),
  transitionEnter: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.bool,
  transitionAppear: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.bool,
  exclusive: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.bool,
  transitionLeave: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.bool,
  onEnd: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func,
  onEnter: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func,
  onLeave: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func,
  onAppear: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func,
  showProp: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.string
};
Animate.defaultProps = {
  animation: {},
  component: 'span',
  componentProps: {},
  transitionEnter: true,
  transitionLeave: true,
  transitionAppear: false,
  onEnd: noop,
  onEnter: noop,
  onLeave: noop,
  onAppear: noop
};

var _initialiseProps = function _initialiseProps() {
  var _this5 = this;

  this.performEnter = function (key) {
    // may already remove by exclusive
    if (_this5.childrenRefs[key]) {
      _this5.currentlyAnimatingKeys[key] = true;
      _this5.childrenRefs[key].componentWillEnter(_this5.handleDoneAdding.bind(_this5, key, 'enter'));
    }
  };

  this.performAppear = function (key) {
    if (_this5.childrenRefs[key]) {
      _this5.currentlyAnimatingKeys[key] = true;
      _this5.childrenRefs[key].componentWillAppear(_this5.handleDoneAdding.bind(_this5, key, 'appear'));
    }
  };

  this.handleDoneAdding = function (key, type) {
    var props = _this5.props;
    delete _this5.currentlyAnimatingKeys[key];
    // if update on exclusive mode, skip check
    if (props.exclusive && props !== _this5.nextProps) {
      return;
    }
    var currentChildren = Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["e" /* toArrayChildren */])(getChildrenFromProps(props));
    if (!_this5.isValidChildByKey(currentChildren, key)) {
      // exclusive will not need this
      _this5.performLeave(key);
    } else {
      if (type === 'appear') {
        if (__WEBPACK_IMPORTED_MODULE_10__util__["a" /* default */].allowAppearCallback(props)) {
          props.onAppear(key);
          props.onEnd(key, true);
        }
      } else {
        if (__WEBPACK_IMPORTED_MODULE_10__util__["a" /* default */].allowEnterCallback(props)) {
          props.onEnter(key);
          props.onEnd(key, true);
        }
      }
    }
  };

  this.performLeave = function (key) {
    // may already remove by exclusive
    if (_this5.childrenRefs[key]) {
      _this5.currentlyAnimatingKeys[key] = true;
      _this5.childrenRefs[key].componentWillLeave(_this5.handleDoneLeaving.bind(_this5, key));
    }
  };

  this.handleDoneLeaving = function (key) {
    var props = _this5.props;
    delete _this5.currentlyAnimatingKeys[key];
    // if update on exclusive mode, skip check
    if (props.exclusive && props !== _this5.nextProps) {
      return;
    }
    var currentChildren = Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["e" /* toArrayChildren */])(getChildrenFromProps(props));
    // in case state change is too fast
    if (_this5.isValidChildByKey(currentChildren, key)) {
      _this5.performEnter(key);
    } else {
      var end = function end() {
        if (__WEBPACK_IMPORTED_MODULE_10__util__["a" /* default */].allowLeaveCallback(props)) {
          props.onLeave(key);
          props.onEnd(key, false);
        }
      };
      if (!Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["c" /* isSameChildren */])(_this5.state.children, currentChildren, props.showProp)) {
        _this5.setState({
          children: currentChildren
        }, end);
      } else {
        end();
      }
    }
  };
};

/* harmony default export */ __webpack_exports__["a"] = (Animate);

/***/ }),

/***/ 2271:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(2272);
var invariant = __webpack_require__(2273);
var ReactPropTypesSecret = __webpack_require__(2274);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ 2272:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),

/***/ 2273:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (false) {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),

/***/ 2274:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ 2275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["e"] = toArrayChildren;
/* harmony export (immutable) */ __webpack_exports__["a"] = findChildInChildrenByKey;
/* harmony export (immutable) */ __webpack_exports__["b"] = findShownChildInChildrenByKey;
/* unused harmony export findHiddenChildInChildrenByKey */
/* harmony export (immutable) */ __webpack_exports__["c"] = isSameChildren;
/* harmony export (immutable) */ __webpack_exports__["d"] = mergeChildren;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(459);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function toArrayChildren(children) {
  var ret = [];
  __WEBPACK_IMPORTED_MODULE_0_react___default.a.Children.forEach(children, function (child) {
    ret.push(child);
  });
  return ret;
}

function findChildInChildrenByKey(children, key) {
  var ret = null;
  if (children) {
    children.forEach(function (child) {
      if (ret) {
        return;
      }
      if (child && child.key === key) {
        ret = child;
      }
    });
  }
  return ret;
}

function findShownChildInChildrenByKey(children, key, showProp) {
  var ret = null;
  if (children) {
    children.forEach(function (child) {
      if (child && child.key === key && child.props[showProp]) {
        if (ret) {
          throw new Error('two child with same key for <rc-animate> children');
        }
        ret = child;
      }
    });
  }
  return ret;
}

function findHiddenChildInChildrenByKey(children, key, showProp) {
  var found = 0;
  if (children) {
    children.forEach(function (child) {
      if (found) {
        return;
      }
      found = child && child.key === key && !child.props[showProp];
    });
  }
  return found;
}

function isSameChildren(c1, c2, showProp) {
  var same = c1.length === c2.length;
  if (same) {
    c1.forEach(function (child, index) {
      var child2 = c2[index];
      if (child && child2) {
        if (child && !child2 || !child && child2) {
          same = false;
        } else if (child.key !== child2.key) {
          same = false;
        } else if (showProp && child.props[showProp] !== child2.props[showProp]) {
          same = false;
        }
      }
    });
  }
  return same;
}

function mergeChildren(prev, next) {
  var ret = [];

  // For each key of `next`, the list of keys to insert before that key in
  // the combined list
  var nextChildrenPending = {};
  var pendingChildren = [];
  prev.forEach(function (child) {
    if (child && findChildInChildrenByKey(next, child.key)) {
      if (pendingChildren.length) {
        nextChildrenPending[child.key] = pendingChildren;
        pendingChildren = [];
      }
    } else {
      pendingChildren.push(child);
    }
  });

  next.forEach(function (child) {
    if (child && nextChildrenPending.hasOwnProperty(child.key)) {
      ret = ret.concat(nextChildrenPending[child.key]);
    }
    ret.push(child);
  });

  ret = ret.concat(pendingChildren);

  return ret;
}

/***/ }),

/***/ 2276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(466);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(459);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom__ = __webpack_require__(551);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prop_types__ = __webpack_require__(1998);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_css_animation__ = __webpack_require__(2277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__util__ = __webpack_require__(2000);











var transitionMap = {
  enter: 'transitionEnter',
  appear: 'transitionAppear',
  leave: 'transitionLeave'
};

var AnimateChild = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(AnimateChild, _React$Component);

  function AnimateChild() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, AnimateChild);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (AnimateChild.__proto__ || Object.getPrototypeOf(AnimateChild)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(AnimateChild, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.stop();
    }
  }, {
    key: 'componentWillEnter',
    value: function componentWillEnter(done) {
      if (__WEBPACK_IMPORTED_MODULE_9__util__["a" /* default */].isEnterSupported(this.props)) {
        this.transition('enter', done);
      } else {
        done();
      }
    }
  }, {
    key: 'componentWillAppear',
    value: function componentWillAppear(done) {
      if (__WEBPACK_IMPORTED_MODULE_9__util__["a" /* default */].isAppearSupported(this.props)) {
        this.transition('appear', done);
      } else {
        done();
      }
    }
  }, {
    key: 'componentWillLeave',
    value: function componentWillLeave(done) {
      if (__WEBPACK_IMPORTED_MODULE_9__util__["a" /* default */].isLeaveSupported(this.props)) {
        this.transition('leave', done);
      } else {
        // always sync, do not interupt with react component life cycle
        // update hidden -> animate hidden ->
        // didUpdate -> animate leave -> unmount (if animate is none)
        done();
      }
    }
  }, {
    key: 'transition',
    value: function transition(animationType, finishCallback) {
      var _this2 = this;

      var node = __WEBPACK_IMPORTED_MODULE_6_react_dom___default.a.findDOMNode(this);
      var props = this.props;
      var transitionName = props.transitionName;
      var nameIsObj = (typeof transitionName === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(transitionName)) === 'object';
      this.stop();
      var end = function end() {
        _this2.stopper = null;
        finishCallback();
      };
      if ((__WEBPACK_IMPORTED_MODULE_8_css_animation__["b" /* isCssAnimationSupported */] || !props.animation[animationType]) && transitionName && props[transitionMap[animationType]]) {
        var name = nameIsObj ? transitionName[animationType] : transitionName + '-' + animationType;
        var activeName = name + '-active';
        if (nameIsObj && transitionName[animationType + 'Active']) {
          activeName = transitionName[animationType + 'Active'];
        }
        this.stopper = Object(__WEBPACK_IMPORTED_MODULE_8_css_animation__["a" /* default */])(node, {
          name: name,
          active: activeName
        }, end);
      } else {
        this.stopper = props.animation[animationType](node, end);
      }
    }
  }, {
    key: 'stop',
    value: function stop() {
      var stopper = this.stopper;
      if (stopper) {
        this.stopper = null;
        stopper.stop();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);

  return AnimateChild;
}(__WEBPACK_IMPORTED_MODULE_5_react___default.a.Component);

AnimateChild.propTypes = {
  children: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.any
};
/* harmony default export */ __webpack_exports__["a"] = (AnimateChild);

/***/ }),

/***/ 2277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return isCssAnimationSupported; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Event__ = __webpack_require__(2278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_component_classes__ = __webpack_require__(2279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_component_classes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_component_classes__);




var isCssAnimationSupported = __WEBPACK_IMPORTED_MODULE_1__Event__["a" /* default */].endEvents.length !== 0;
var capitalPrefixes = ['Webkit', 'Moz', 'O',
// ms is special .... !
'ms'];
var prefixes = ['-webkit-', '-moz-', '-o-', 'ms-', ''];

function getStyleProperty(node, name) {
  // old ff need null, https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
  var style = window.getComputedStyle(node, null);
  var ret = '';
  for (var i = 0; i < prefixes.length; i++) {
    ret = style.getPropertyValue(prefixes[i] + name);
    if (ret) {
      break;
    }
  }
  return ret;
}

function fixBrowserByTimeout(node) {
  if (isCssAnimationSupported) {
    var transitionDelay = parseFloat(getStyleProperty(node, 'transition-delay')) || 0;
    var transitionDuration = parseFloat(getStyleProperty(node, 'transition-duration')) || 0;
    var animationDelay = parseFloat(getStyleProperty(node, 'animation-delay')) || 0;
    var animationDuration = parseFloat(getStyleProperty(node, 'animation-duration')) || 0;
    var time = Math.max(transitionDuration + transitionDelay, animationDuration + animationDelay);
    // sometimes, browser bug
    node.rcEndAnimTimeout = setTimeout(function () {
      node.rcEndAnimTimeout = null;
      if (node.rcEndListener) {
        node.rcEndListener();
      }
    }, time * 1000 + 200);
  }
}

function clearBrowserBugTimeout(node) {
  if (node.rcEndAnimTimeout) {
    clearTimeout(node.rcEndAnimTimeout);
    node.rcEndAnimTimeout = null;
  }
}

var cssAnimation = function cssAnimation(node, transitionName, endCallback) {
  var nameIsObj = (typeof transitionName === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(transitionName)) === 'object';
  var className = nameIsObj ? transitionName.name : transitionName;
  var activeClassName = nameIsObj ? transitionName.active : transitionName + '-active';
  var end = endCallback;
  var start = void 0;
  var active = void 0;
  var nodeClasses = __WEBPACK_IMPORTED_MODULE_2_component_classes___default()(node);

  if (endCallback && Object.prototype.toString.call(endCallback) === '[object Object]') {
    end = endCallback.end;
    start = endCallback.start;
    active = endCallback.active;
  }

  if (node.rcEndListener) {
    node.rcEndListener();
  }

  node.rcEndListener = function (e) {
    if (e && e.target !== node) {
      return;
    }

    if (node.rcAnimTimeout) {
      clearTimeout(node.rcAnimTimeout);
      node.rcAnimTimeout = null;
    }

    clearBrowserBugTimeout(node);

    nodeClasses.remove(className);
    nodeClasses.remove(activeClassName);

    __WEBPACK_IMPORTED_MODULE_1__Event__["a" /* default */].removeEndEventListener(node, node.rcEndListener);
    node.rcEndListener = null;

    // Usually this optional end is used for informing an owner of
    // a leave animation and telling it to remove the child.
    if (end) {
      end();
    }
  };

  __WEBPACK_IMPORTED_MODULE_1__Event__["a" /* default */].addEndEventListener(node, node.rcEndListener);

  if (start) {
    start();
  }
  nodeClasses.add(className);

  node.rcAnimTimeout = setTimeout(function () {
    node.rcAnimTimeout = null;
    nodeClasses.add(activeClassName);
    if (active) {
      setTimeout(active, 0);
    }
    fixBrowserByTimeout(node);
    // 30ms for firefox
  }, 30);

  return {
    stop: function stop() {
      if (node.rcEndListener) {
        node.rcEndListener();
      }
    }
  };
};

cssAnimation.style = function (node, style, callback) {
  if (node.rcEndListener) {
    node.rcEndListener();
  }

  node.rcEndListener = function (e) {
    if (e && e.target !== node) {
      return;
    }

    if (node.rcAnimTimeout) {
      clearTimeout(node.rcAnimTimeout);
      node.rcAnimTimeout = null;
    }

    clearBrowserBugTimeout(node);

    __WEBPACK_IMPORTED_MODULE_1__Event__["a" /* default */].removeEndEventListener(node, node.rcEndListener);
    node.rcEndListener = null;

    // Usually this optional callback is used for informing an owner of
    // a leave animation and telling it to remove the child.
    if (callback) {
      callback();
    }
  };

  __WEBPACK_IMPORTED_MODULE_1__Event__["a" /* default */].addEndEventListener(node, node.rcEndListener);

  node.rcAnimTimeout = setTimeout(function () {
    for (var s in style) {
      if (style.hasOwnProperty(s)) {
        node.style[s] = style[s];
      }
    }
    node.rcAnimTimeout = null;
    fixBrowserByTimeout(node);
  }, 0);
};

cssAnimation.setTransition = function (node, p, value) {
  var property = p;
  var v = value;
  if (value === undefined) {
    v = property;
    property = '';
  }
  property = property || '';
  capitalPrefixes.forEach(function (prefix) {
    node.style[prefix + 'Transition' + property] = v;
  });
};

cssAnimation.isCssAnimationSupported = isCssAnimationSupported;



/* harmony default export */ __webpack_exports__["a"] = (cssAnimation);

/***/ }),

/***/ 2278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var EVENT_NAME_MAP = {
  transitionend: {
    transition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'mozTransitionEnd',
    OTransition: 'oTransitionEnd',
    msTransition: 'MSTransitionEnd'
  },

  animationend: {
    animation: 'animationend',
    WebkitAnimation: 'webkitAnimationEnd',
    MozAnimation: 'mozAnimationEnd',
    OAnimation: 'oAnimationEnd',
    msAnimation: 'MSAnimationEnd'
  }
};

var endEvents = [];

function detectEvents() {
  var testEl = document.createElement('div');
  var style = testEl.style;

  if (!('AnimationEvent' in window)) {
    delete EVENT_NAME_MAP.animationend.animation;
  }

  if (!('TransitionEvent' in window)) {
    delete EVENT_NAME_MAP.transitionend.transition;
  }

  for (var baseEventName in EVENT_NAME_MAP) {
    if (EVENT_NAME_MAP.hasOwnProperty(baseEventName)) {
      var baseEvents = EVENT_NAME_MAP[baseEventName];
      for (var styleName in baseEvents) {
        if (styleName in style) {
          endEvents.push(baseEvents[styleName]);
          break;
        }
      }
    }
  }
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  detectEvents();
}

function addEventListener(node, eventName, eventListener) {
  node.addEventListener(eventName, eventListener, false);
}

function removeEventListener(node, eventName, eventListener) {
  node.removeEventListener(eventName, eventListener, false);
}

var TransitionEvents = {
  addEndEventListener: function addEndEventListener(node, eventListener) {
    if (endEvents.length === 0) {
      window.setTimeout(eventListener, 0);
      return;
    }
    endEvents.forEach(function (endEvent) {
      addEventListener(node, endEvent, eventListener);
    });
  },


  endEvents: endEvents,

  removeEndEventListener: function removeEndEventListener(node, eventListener) {
    if (endEvents.length === 0) {
      return;
    }
    endEvents.forEach(function (endEvent) {
      removeEventListener(node, endEvent, eventListener);
    });
  }
};

/* harmony default export */ __webpack_exports__["a"] = (TransitionEvents);

/***/ }),

/***/ 2279:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

try {
  var index = __webpack_require__(1999);
} catch (err) {
  var index = __webpack_require__(1999);
}

/**
 * Whitespace regexp.
 */

var re = /\s+/;

/**
 * toString reference.
 */

var toString = Object.prototype.toString;

/**
 * Wrap `el` in a `ClassList`.
 *
 * @param {Element} el
 * @return {ClassList}
 * @api public
 */

module.exports = function(el){
  return new ClassList(el);
};

/**
 * Initialize a new ClassList for `el`.
 *
 * @param {Element} el
 * @api private
 */

function ClassList(el) {
  if (!el || !el.nodeType) {
    throw new Error('A DOM element reference is required');
  }
  this.el = el;
  this.list = el.classList;
}

/**
 * Add class `name` if not already present.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.add = function(name){
  // classList
  if (this.list) {
    this.list.add(name);
    return this;
  }

  // fallback
  var arr = this.array();
  var i = index(arr, name);
  if (!~i) arr.push(name);
  this.el.className = arr.join(' ');
  return this;
};

/**
 * Remove class `name` when present, or
 * pass a regular expression to remove
 * any which match.
 *
 * @param {String|RegExp} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.remove = function(name){
  if ('[object RegExp]' == toString.call(name)) {
    return this.removeMatching(name);
  }

  // classList
  if (this.list) {
    this.list.remove(name);
    return this;
  }

  // fallback
  var arr = this.array();
  var i = index(arr, name);
  if (~i) arr.splice(i, 1);
  this.el.className = arr.join(' ');
  return this;
};

/**
 * Remove all classes matching `re`.
 *
 * @param {RegExp} re
 * @return {ClassList}
 * @api private
 */

ClassList.prototype.removeMatching = function(re){
  var arr = this.array();
  for (var i = 0; i < arr.length; i++) {
    if (re.test(arr[i])) {
      this.remove(arr[i]);
    }
  }
  return this;
};

/**
 * Toggle class `name`, can force state via `force`.
 *
 * For browsers that support classList, but do not support `force` yet,
 * the mistake will be detected and corrected.
 *
 * @param {String} name
 * @param {Boolean} force
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.toggle = function(name, force){
  // classList
  if (this.list) {
    if ("undefined" !== typeof force) {
      if (force !== this.list.toggle(name, force)) {
        this.list.toggle(name); // toggle again to correct
      }
    } else {
      this.list.toggle(name);
    }
    return this;
  }

  // fallback
  if ("undefined" !== typeof force) {
    if (!force) {
      this.remove(name);
    } else {
      this.add(name);
    }
  } else {
    if (this.has(name)) {
      this.remove(name);
    } else {
      this.add(name);
    }
  }

  return this;
};

/**
 * Return an array of classes.
 *
 * @return {Array}
 * @api public
 */

ClassList.prototype.array = function(){
  var className = this.el.getAttribute('class') || '';
  var str = className.replace(/^\s+|\s+$/g, '');
  var arr = str.split(re);
  if ('' === arr[0]) arr.shift();
  return arr;
};

/**
 * Check if class `name` is present.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.has =
ClassList.prototype.contains = function(name){
  return this.list
    ? this.list.contains(name)
    : !! ~index(this.array(), name);
};


/***/ }),

/***/ 2280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(466);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react__ = __webpack_require__(459);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_prop_types__ = __webpack_require__(955);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__LazyRenderBox__ = __webpack_require__(2001);








var PopupInner = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(PopupInner, _Component);

  function PopupInner() {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, PopupInner);

    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (PopupInner.__proto__ || Object.getPrototypeOf(PopupInner)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(PopupInner, [{
    key: 'render',
    value: function render() {
      var props = this.props;
      var className = props.className;
      if (!props.visible) {
        className += ' ' + props.hiddenClassName;
      }
      return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        'div',
        {
          className: className,
          onMouseEnter: props.onMouseEnter,
          onMouseLeave: props.onMouseLeave,
          style: props.style
        },
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_6__LazyRenderBox__["a" /* default */],
          { className: props.prefixCls + '-content', visible: props.visible },
          props.children
        )
      );
    }
  }]);

  return PopupInner;
}(__WEBPACK_IMPORTED_MODULE_4_react__["Component"]);

PopupInner.propTypes = {
  hiddenClassName: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string,
  className: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string,
  prefixCls: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string,
  onMouseEnter: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func,
  onMouseLeave: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func,
  children: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.any
};


/* harmony default export */ __webpack_exports__["a"] = (PopupInner);

/***/ }),

/***/ 2281:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

exports['default'] = getContainerRenderMixin;

var _reactDom = __webpack_require__(551);

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function defaultGetContainer() {
  var container = document.createElement('div');
  document.body.appendChild(container);
  return container;
}

function getContainerRenderMixin(config) {
  var _config$autoMount = config.autoMount,
      autoMount = _config$autoMount === undefined ? true : _config$autoMount,
      _config$autoDestroy = config.autoDestroy,
      autoDestroy = _config$autoDestroy === undefined ? true : _config$autoDestroy,
      isVisible = config.isVisible,
      isForceRender = config.isForceRender,
      getComponent = config.getComponent,
      _config$getContainer = config.getContainer,
      getContainer = _config$getContainer === undefined ? defaultGetContainer : _config$getContainer;


  var mixin = void 0;

  function _renderComponent(instance, componentArg, ready) {
    if (!isVisible || instance._component || isVisible(instance) || isForceRender && isForceRender(instance)) {
      if (!instance._container) {
        instance._container = getContainer(instance);
      }
      var component = void 0;
      if (instance.getComponent) {
        component = instance.getComponent(componentArg);
      } else {
        component = getComponent(instance, componentArg);
      }
      _reactDom2['default'].unstable_renderSubtreeIntoContainer(instance, component, instance._container, function callback() {
        instance._component = this;
        if (ready) {
          ready.call(this);
        }
      });
    }
  }

  if (autoMount) {
    mixin = (0, _extends3['default'])({}, mixin, {
      componentDidMount: function componentDidMount() {
        _renderComponent(this);
      },
      componentDidUpdate: function componentDidUpdate() {
        _renderComponent(this);
      }
    });
  }

  if (!autoMount || !autoDestroy) {
    mixin = (0, _extends3['default'])({}, mixin, {
      renderComponent: function renderComponent(componentArg, ready) {
        _renderComponent(this, componentArg, ready);
      }
    });
  }

  function _removeContainer(instance) {
    if (instance._container) {
      var container = instance._container;
      _reactDom2['default'].unmountComponentAtNode(container);
      container.parentNode.removeChild(container);
      instance._container = null;
    }
  }

  if (autoDestroy) {
    mixin = (0, _extends3['default'])({}, mixin, {
      componentWillUnmount: function componentWillUnmount() {
        _removeContainer(this);
      }
    });
  } else {
    mixin = (0, _extends3['default'])({}, mixin, {
      removeContainer: function removeContainer() {
        _removeContainer(this);
      }
    });
  }

  return mixin;
}
module.exports = exports['default'];

/***/ }),

/***/ 2282:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(466);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(38);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(39);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2283);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = __webpack_require__(551);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Portal = function (_React$Component) {
  (0, _inherits3['default'])(Portal, _React$Component);

  function Portal() {
    (0, _classCallCheck3['default'])(this, Portal);
    return (0, _possibleConstructorReturn3['default'])(this, (Portal.__proto__ || Object.getPrototypeOf(Portal)).apply(this, arguments));
  }

  (0, _createClass3['default'])(Portal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.createContainer();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var didUpdate = this.props.didUpdate;

      if (didUpdate) {
        didUpdate(prevProps);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.removeContainer();
    }
  }, {
    key: 'createContainer',
    value: function createContainer() {
      this._container = this.props.getContainer();
      this.forceUpdate();
    }
  }, {
    key: 'removeContainer',
    value: function removeContainer() {
      if (this._container) {
        this._container.parentNode.removeChild(this._container);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      if (this._container) {
        return (0, _reactDom.createPortal)(this.props.children, this._container);
      }
      return null;
    }
  }]);
  return Portal;
}(_react2['default'].Component);

Portal.propTypes = {
  getContainer: _propTypes2['default'].func.isRequired,
  children: _propTypes2['default'].node.isRequired,
  didUpdate: _propTypes2['default'].func
};
exports['default'] = Portal;
module.exports = exports['default'];

/***/ }),

/***/ 2283:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (false) {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(2284)();
}


/***/ }),

/***/ 2284:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(2285);
var invariant = __webpack_require__(2286);
var ReactPropTypesSecret = __webpack_require__(2287);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ 2285:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),

/***/ 2286:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (false) {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),

/***/ 2287:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ 2288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return placements; });
var autoAdjustOverflow = {
  adjustX: 1,
  adjustY: 1
};

var targetOffset = [0, 0];

var placements = {
  left: {
    points: ['cr', 'cl'],
    overflow: autoAdjustOverflow,
    offset: [-4, 0],
    targetOffset: targetOffset
  },
  right: {
    points: ['cl', 'cr'],
    overflow: autoAdjustOverflow,
    offset: [4, 0],
    targetOffset: targetOffset
  },
  top: {
    points: ['bc', 'tc'],
    overflow: autoAdjustOverflow,
    offset: [0, -4],
    targetOffset: targetOffset
  },
  bottom: {
    points: ['tc', 'bc'],
    overflow: autoAdjustOverflow,
    offset: [0, 4],
    targetOffset: targetOffset
  },
  topLeft: {
    points: ['bl', 'tl'],
    overflow: autoAdjustOverflow,
    offset: [0, -4],
    targetOffset: targetOffset
  },
  leftTop: {
    points: ['tr', 'tl'],
    overflow: autoAdjustOverflow,
    offset: [-4, 0],
    targetOffset: targetOffset
  },
  topRight: {
    points: ['br', 'tr'],
    overflow: autoAdjustOverflow,
    offset: [0, -4],
    targetOffset: targetOffset
  },
  rightTop: {
    points: ['tl', 'tr'],
    overflow: autoAdjustOverflow,
    offset: [4, 0],
    targetOffset: targetOffset
  },
  bottomRight: {
    points: ['tr', 'br'],
    overflow: autoAdjustOverflow,
    offset: [0, 4],
    targetOffset: targetOffset
  },
  rightBottom: {
    points: ['bl', 'br'],
    overflow: autoAdjustOverflow,
    offset: [4, 0],
    targetOffset: targetOffset
  },
  bottomLeft: {
    points: ['tl', 'bl'],
    overflow: autoAdjustOverflow,
    offset: [0, 4],
    targetOffset: targetOffset
  },
  leftBottom: {
    points: ['br', 'bl'],
    overflow: autoAdjustOverflow,
    offset: [-4, 0],
    targetOffset: targetOffset
  }
};

/* unused harmony default export */ var _unused_webpack_default_export = (placements);

/***/ }),

/***/ 2289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react__ = __webpack_require__(459);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_prop_types__ = __webpack_require__(1996);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_prop_types__);






var Content = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits___default()(Content, _React$Component);

  function Content() {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Content);

    return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default()(this, _React$Component.apply(this, arguments));
  }

  Content.prototype.componentDidUpdate = function componentDidUpdate() {
    var trigger = this.props.trigger;

    if (trigger) {
      trigger.forcePopupAlign();
    }
  };

  Content.prototype.render = function render() {
    var _props = this.props,
        overlay = _props.overlay,
        prefixCls = _props.prefixCls,
        id = _props.id;

    return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
      'div',
      { className: prefixCls + '-inner', id: id, role: 'tooltip' },
      typeof overlay === 'function' ? overlay() : overlay
    );
  };

  return Content;
}(__WEBPACK_IMPORTED_MODULE_3_react___default.a.Component);

Content.propTypes = {
  prefixCls: __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.string,
  overlay: __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.node, __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.func]).isRequired,
  id: __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.string,
  trigger: __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.any
};
/* harmony default export */ __webpack_exports__["a"] = (Content);

/***/ }),

/***/ 2290:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 2291:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shareTargets = undefined;

var _regenerator = __webpack_require__(8);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = __webpack_require__(18);

var _promise2 = _interopRequireDefault(_promise);

var _slicedToArray2 = __webpack_require__(72);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = useShare;

var _react = __webpack_require__(459);

var _shareUtils = __webpack_require__(954);

var _shareUtils2 = _interopRequireDefault(_shareUtils);

var _ymkWebSdkCore = __webpack_require__(112);

var _isFunction2 = __webpack_require__(23);

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _context3 = __webpack_require__(567);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var upload = _ymkWebSdkCore.dao.upload;
var shareTargets = exports.shareTargets = { fb: 'fb', twitter: 'twitter', pinterest: 'pinterest', whatsapp: 'whatsapp', weibo: 'weibo', sms: 'sms', email: 'email' };

function useShare(props) {
  var _this = this;

  var emitter = props.emitter,
      settings = props.settings,
      onUploadFail = props.onUploadFail;

  var _useContext = (0, _react.useContext)(_context3.EngineContext),
      engineType = _useContext.engineType;

  var _useState = (0, _react.useState)(''),
      _useState2 = (0, _slicedToArray3.default)(_useState, 2),
      base64 = _useState2[0],
      setBase64 = _useState2[1];

  var _useState3 = (0, _react.useState)(''),
      _useState4 = (0, _slicedToArray3.default)(_useState3, 2),
      converting = _useState4[0],
      setConverting = _useState4[1];

  var _useState5 = (0, _react.useState)(''),
      _useState6 = (0, _slicedToArray3.default)(_useState5, 2),
      uploading = _useState6[0],
      setUploading = _useState6[1];

  var _useState7 = (0, _react.useState)(''),
      _useState8 = (0, _slicedToArray3.default)(_useState7, 2),
      uploadedUrl = _useState8[0],
      setUploadedUrl = _useState8[1];

  var _useState9 = (0, _react.useState)(''),
      _useState10 = (0, _slicedToArray3.default)(_useState9, 2),
      twitterCardUrl = _useState10[0],
      setTwitterCardUrl = _useState10[1];

  var isShareDisabled = function isShareDisabled() {
    return !_shareUtils2.default.isFBEnabled(settings) && !_shareUtils2.default.isWeiboEnabled(settings) && !_shareUtils2.default.isTwitterEnabled(settings) && !_shareUtils2.default.isPinterestEnabled(settings) && !_shareUtils2.default.isSMSEnabled(settings) && !_shareUtils2.default.isWhatsAppEnabled(settings);
  };

  var saveCanvasThenUpload = function saveCanvasThenUpload() {
    if (converting || uploading || isShareDisabled()) {
      return;
    }
    saveCanvas().then(function (base64) {
      return uploadBase64(base64);
    });
  };

  var saveCanvas = function saveCanvas() {
    if (converting || isShareDisabled()) {
      return;
    }
    return new _promise2.default(function (resolve) {
      setConverting(true);
      emitter.once(_ymkWebSdkCore.events.saveCanvasComplete, function (base64) {
        setBase64(base64);
        setConverting(false);
        resolve(base64);
      });
      emitter.trigger(_ymkWebSdkCore.events.saveCanvas);
    });
  };

  var uploadBase64 = function uploadBase64(base64) {
    if (!base64 || uploading) {
      return;
    }
    setUploading(true);
    upload(_ymkWebSdkCore.browserUtils.getApiKey(document), base64, settings, true).then(function (r) {
      setUploading(false);
      setUploadedUrl(r.url);
      setTwitterCardUrl(r.twitterCardUrl);
    }).catch(function (e) {
      console.error('upload failed', e);
      setUploading(false);
      (0, _isFunction3.default)(onUploadFail) && onUploadFail();
    });
  };

  var submitShareViaEmail = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(displayName, email) {
      var src = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : base64;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.delegateYield(_regenerator2.default.mark(function _callee() {
                var base64;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!(!email || !_shareUtils2.default.isEmailEnabled(settings))) {
                          _context.next = 2;
                          break;
                        }

                        return _context.abrupt('return');

                      case 2:
                        if (!src) {
                          _context.next = 5;
                          break;
                        }

                        _shareUtils2.default.submitShareViaEmail(emitter, engineType, settings, src, displayName, email);
                        return _context.abrupt('return');

                      case 5:
                        _context.next = 7;
                        return saveCanvas();

                      case 7:
                        base64 = _context.sent;

                        _shareUtils2.default.submitShareViaEmail(emitter, engineType, settings, base64, displayName, email);

                      case 9:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              })(), 't0', 1);

            case 1:
              return _context2.abrupt('return', _context2.t0);

            case 2:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }));

    return function submitShareViaEmail(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var submitShare = function submitShare(target) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!target) {
      return;
    }
    switch (target) {
      case shareTargets.email:
        return _shareUtils2.default.isEmailEnabled(settings) && submitShareViaEmail(params.displayName, params.email, params.src);
      case shareTargets.fb:
        return _shareUtils2.default.isFBEnabled(settings) && _shareUtils2.default.submitShareToFB(emitter, engineType, settings, uploadedUrl, twitterCardUrl);
      case shareTargets.twitter:
        return _shareUtils2.default.isTwitterEnabled(settings) && _shareUtils2.default.submitShareToTwitter(emitter, engineType, settings, twitterCardUrl);
      case shareTargets.pinterest:
        return _shareUtils2.default.isPinterestEnabled(settings) && _shareUtils2.default.submitShareToPinterest(emitter, engineType, settings, uploadedUrl);
      case shareTargets.whatsapp:
        return _shareUtils2.default.isWhatsAppEnabled(settings) && _shareUtils2.default.submitShareToWhatsApp(emitter, engineType, settings, twitterCardUrl);
      case shareTargets.weibo:
        return _shareUtils2.default.isWeiboEnabled(settings) && _shareUtils2.default.submitShareToWeibo(emitter, engineType, settings, uploadedUrl);
      case shareTargets.sms:
        return _shareUtils2.default.isSMSEnabled(settings) && _shareUtils2.default.submitShareToSMS(emitter, engineType, settings, uploadedUrl);
      default:
        return;
    }
  };

  return {
    isShareDisabled: isShareDisabled,
    saveCanvas: saveCanvas,
    saveCanvasThenUpload: saveCanvasThenUpload,
    uploadBase64: uploadBase64,
    submitShare: submitShare,
    base64: base64,
    converting: converting,
    uploading: uploading,
    uploadedUrl: uploadedUrl
  };
}

/***/ }),

/***/ 2292:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var Promise = Promise || __webpack_require__(1003).Promise;

var oncePromise = function oncePromise(foo) {
    var promise = null;
    return function (callback) {
        if (!promise) promise = new Promise(foo);
        if (callback) promise.then(callback);
        return promise;
    };
};

var checkNativeFeatures = oncePromise(function (resolve) {
    var canvas = document.createElement("canvas");
    var result = {
        TypedArrays: "ArrayBuffer" in global,
        BlobURLs: "URL" in global,
        requestAnimationFrame: "requestAnimationFrame" in global,
        pageProtocol: location.protocol == "http:" || location.protocol == "https:",
        canvas: "getContext" in document.createElement("canvas"),
        APNG: false
    };

    if (result.canvas) {
        // see http://eligrey.com/blog/post/apng-feature-detection
        var img = new Image();
        img.onload = function () {
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            result.APNG = ctx.getImageData(0, 0, 1, 1).data[3] === 0;
            resolve(result);
        };
        // frame 1 (skipped on apng-supporting browsers): [0, 0, 0, 255]
        // frame 2: [0, 0, 0, 0]
        img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACGFjV" + "EwAAAABAAAAAcMq2TYAAAANSURBVAiZY2BgYPgPAAEEAQB9ssjfAAAAGmZjVEwAAAAAAAAAAQAAAAEAAA" + "AAAAAAAAD6A+gBAbNU+2sAAAARZmRBVAAAAAEImWNgYGBgAAAABQAB6MzFdgAAAABJRU5ErkJggg==";
    } else {
        resolve(result);
    }
});

/**
 * @param {boolean} [ignoreNativeAPNG]
 * @return {Promise}
 */
var ifNeeded = function ifNeeded(ignoreNativeAPNG) {
    if (typeof ignoreNativeAPNG == 'undefined') ignoreNativeAPNG = false;
    return checkNativeFeatures().then(function (features) {
        if (features.APNG && !ignoreNativeAPNG) {
            reject();
        } else {
            var ok = true;
            for (var k in features) {
                if (features.hasOwnProperty(k) && k != 'APNG') {
                    ok = ok && features[k];
                }
            }
        }
    });
};

module.exports = {
    checkNativeFeatures: checkNativeFeatures,
    ifNeeded: ifNeeded
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(74)))

/***/ }),

/***/ 2293:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2294:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Promise = Promise || __webpack_require__(1003).Promise;
var Animation = __webpack_require__(2295);
var crc32 = __webpack_require__(2296);

// "\x89PNG\x0d\x0a\x1a\x0a"
var PNG_SIGNATURE_BYTES = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

/**
 * @param {ArrayBuffer} buffer
 * @return {Promise}
 */
module.exports = function (buffer) {
    var bytes = new Uint8Array(buffer);
    return new Promise(function (resolve, reject) {

        for (var i = 0; i < PNG_SIGNATURE_BYTES.length; i++) {
            if (PNG_SIGNATURE_BYTES[i] != bytes[i]) {
                reject("Not a PNG file (invalid file signature)");
                return;
            }
        }

        // fast animation test
        var isAnimated = false;
        parseChunks(bytes, function (type) {
            if (type == "acTL") {
                isAnimated = true;
                return false;
            }
            return true;
        });
        if (!isAnimated) {
            reject("Not an animated PNG");
            return;
        }

        var preDataParts = [],
            postDataParts = [],
            headerDataBytes = null,
            frame = null,
            anim = new Animation();

        parseChunks(bytes, function (type, bytes, off, length) {
            switch (type) {
                case "IHDR":
                    headerDataBytes = bytes.subarray(off + 8, off + 8 + length);
                    anim.width = readDWord(bytes, off + 8);
                    anim.height = readDWord(bytes, off + 12);
                    break;
                case "acTL":
                    anim.numPlays = readDWord(bytes, off + 8 + 4);
                    break;
                case "fcTL":
                    if (frame) anim.frames.push(frame);
                    frame = {};
                    frame.width = readDWord(bytes, off + 8 + 4);
                    frame.height = readDWord(bytes, off + 8 + 8);
                    frame.left = readDWord(bytes, off + 8 + 12);
                    frame.top = readDWord(bytes, off + 8 + 16);
                    var delayN = readWord(bytes, off + 8 + 20);
                    var delayD = readWord(bytes, off + 8 + 22);
                    if (delayD == 0) delayD = 100;
                    frame.delay = 1000 * delayN / delayD;
                    // see http://mxr.mozilla.org/mozilla/source/gfx/src/shared/gfxImageFrame.cpp#343
                    if (frame.delay <= 10) frame.delay = 100;
                    anim.playTime += frame.delay;
                    frame.disposeOp = readByte(bytes, off + 8 + 24);
                    frame.blendOp = readByte(bytes, off + 8 + 25);
                    frame.dataParts = [];
                    break;
                case "fdAT":
                    if (frame) frame.dataParts.push(bytes.subarray(off + 8 + 4, off + 8 + length));
                    break;
                case "IDAT":
                    if (frame) frame.dataParts.push(bytes.subarray(off + 8, off + 8 + length));
                    break;
                case "IEND":
                    postDataParts.push(subBuffer(bytes, off, 12 + length));
                    break;
                default:
                    preDataParts.push(subBuffer(bytes, off, 12 + length));
            }
        });

        if (frame) anim.frames.push(frame);

        if (anim.frames.length == 0) {
            reject("Not an animated PNG");
            return;
        }

        // creating images
        var createdImages = 0;
        var preBlob = new Blob(preDataParts),
            postBlob = new Blob(postDataParts);
        for (var f = 0; f < anim.frames.length; f++) {
            frame = anim.frames[f];

            var bb = [];
            bb.push(PNG_SIGNATURE_BYTES);
            headerDataBytes.set(makeDWordArray(frame.width), 0);
            headerDataBytes.set(makeDWordArray(frame.height), 4);
            bb.push(makeChunkBytes("IHDR", headerDataBytes));
            bb.push(preBlob);
            for (var j = 0; j < frame.dataParts.length; j++) {
                bb.push(makeChunkBytes("IDAT", frame.dataParts[j]));
            }
            bb.push(postBlob);
            var url = URL.createObjectURL(new Blob(bb, { "type": "image/png" }));
            delete frame.dataParts;
            bb = null;

            /**
             * Using "createElement" instead of "new Image" because of bug in Chrome 27
             * https://code.google.com/p/chromium/issues/detail?id=238071
             * http://stackoverflow.com/questions/16377375/using-canvas-drawimage-in-chrome-extension-content-script/16378270
             */
            frame.img = document.createElement('img');
            frame.img.onload = function () {
                URL.revokeObjectURL(this.src);
                createdImages++;
                if (createdImages == anim.frames.length) {
                    resolve(anim);
                }
            };
            frame.img.onerror = function () {
                reject("Image creation error");
            };
            frame.img.src = url;
        }
    });
};

/**
 * @param {Uint8Array} bytes
 * @param {function(string, Uint8Array, int, int)} callback
 */
var parseChunks = function parseChunks(bytes, callback) {
    var off = 8;
    do {
        var length = readDWord(bytes, off);
        var type = readString(bytes, off + 4, 4);
        var res = callback(type, bytes, off, length);
        off += 12 + length;
    } while (res !== false && type != "IEND" && off < bytes.length);
};

/**
 * @param {Uint8Array} bytes
 * @param {int} off
 * @return {int}
 */
var readDWord = function readDWord(bytes, off) {
    var x = 0;
    // Force the most-significant byte to unsigned.
    x += bytes[0 + off] << 24 >>> 0;
    for (var i = 1; i < 4; i++) {
        x += bytes[i + off] << (3 - i) * 8;
    }return x;
};

/**
 * @param {Uint8Array} bytes
 * @param {int} off
 * @return {int}
 */
var readWord = function readWord(bytes, off) {
    var x = 0;
    for (var i = 0; i < 2; i++) {
        x += bytes[i + off] << (1 - i) * 8;
    }return x;
};

/**
 * @param {Uint8Array} bytes
 * @param {int} off
 * @return {int}
 */
var readByte = function readByte(bytes, off) {
    return bytes[off];
};

/**
 * @param {Uint8Array} bytes
 * @param {int} start
 * @param {int} length
 * @return {Uint8Array}
 */
var subBuffer = function subBuffer(bytes, start, length) {
    var a = new Uint8Array(length);
    a.set(bytes.subarray(start, start + length));
    return a;
};

var readString = function readString(bytes, off, length) {
    var chars = Array.prototype.slice.call(bytes.subarray(off, off + length));
    return String.fromCharCode.apply(String, chars);
};

var makeDWordArray = function makeDWordArray(x) {
    return [x >>> 24 & 0xff, x >>> 16 & 0xff, x >>> 8 & 0xff, x & 0xff];
};
var makeStringArray = function makeStringArray(x) {
    var res = [];
    for (var i = 0; i < x.length; i++) {
        res.push(x.charCodeAt(i));
    }return res;
};
/**
 * @param {string} type
 * @param {Uint8Array} dataBytes
 * @return {Uint8Array}
 */
var makeChunkBytes = function makeChunkBytes(type, dataBytes) {
    var crcLen = type.length + dataBytes.length;
    var bytes = new Uint8Array(new ArrayBuffer(crcLen + 8));
    bytes.set(makeDWordArray(dataBytes.length), 0);
    bytes.set(makeStringArray(type), 4);
    bytes.set(dataBytes, 8);
    var crc = crc32(bytes, 4, crcLen);
    bytes.set(makeDWordArray(crc), crcLen + 4);
    return bytes;
};

/***/ }),

/***/ 2295:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Animation class
 * @constructor
 */

var Animation = function Animation() {
    // Public

    this.width = 0;
    this.height = 0;
    this.numPlays = 0;
    this.playTime = 0;
    this.frames = [];

    /**
     * Play animation (if not finished)
     * @return {void}
     */
    this.play = function () {
        if (played || finished) return;
        this.rewind();
        played = true;
        requestAnimationFrame(tick);
    };

    /**
     * Rewind animation to start (and stop it)
     * @return {void}
     */
    this.rewind = function () {
        nextRenderTime = 0;
        fNum = 0;
        prevF = null;
        played = false;
        finished = false;
    };

    /**
     * Add new canvas context to animate
     * @param {CanvasRenderingContext2D} ctx
     * @return {void}
     */
    this.addContext = function (ctx) {
        if (contexts.length > 0) {
            var dat = contexts[0].getImageData(0, 0, this.width, this.height);
            ctx.putImageData(dat, 0, 0);
        }
        contexts.push(ctx);
        ctx['_apng_animation'] = this;
    };

    /**
     * Remove canvas context from animation
     * @param {CanvasRenderingContext2D} ctx
     * @return {void}
     */
    this.removeContext = function (ctx) {
        var idx = contexts.indexOf(ctx);
        if (idx === -1) {
            return;
        }
        contexts.splice(idx, 1);
        if (contexts.length === 0) {
            this.rewind();
        }
        if ('_apng_animation' in ctx) {
            delete ctx['_apng_animation'];
        }
    };

    //noinspection JSUnusedGlobalSymbols
    /**
     * Is animation played?
     * @return {boolean}
     */
    this.isPlayed = function () {
        return played;
    };

    //noinspection JSUnusedGlobalSymbols
    /**
     * Is animation finished?
     * @return {boolean}
     */
    this.isFinished = function () {
        return finished;
    };

    // Private

    var ani = this,
        nextRenderTime = 0,
        fNum = 0,
        prevF = null,
        played = false,
        finished = false,
        contexts = [];

    var tick = function tick(now) {
        while (played && nextRenderTime <= now) {
            renderFrame(now);
        }if (played) requestAnimationFrame(tick);
    };

    var renderFrame = function renderFrame(now) {
        var f = fNum++ % ani.frames.length;
        var frame = ani.frames[f];

        if (!(ani.numPlays == 0 || fNum / ani.frames.length <= ani.numPlays)) {
            played = false;
            finished = true;
            return;
        }

        if (f == 0) {
            contexts.forEach(function (ctx) {
                ctx.clearRect(0, 0, ani.width, ani.height);
            });
            prevF = null;
            if (frame.disposeOp == 2) frame.disposeOp = 1;
        }

        if (prevF && prevF.disposeOp == 1) {
            contexts.forEach(function (ctx) {
                ctx.clearRect(prevF.left, prevF.top, prevF.width, prevF.height);
            });
        } else if (prevF && prevF.disposeOp == 2) {
            contexts.forEach(function (ctx) {
                ctx.putImageData(prevF.iData, prevF.left, prevF.top);
            });
        }
        prevF = frame;
        prevF.iData = null;
        if (prevF.disposeOp == 2) {
            prevF.iData = contexts[0].getImageData(frame.left, frame.top, frame.width, frame.height);
        }
        if (frame.blendOp == 0) {
            contexts.forEach(function (ctx) {
                ctx.clearRect(frame.left, frame.top, frame.width, frame.height);
            });
        }
        contexts.forEach(function (ctx) {
            ctx.drawImage(frame.img, frame.left, frame.top);
        });

        if (nextRenderTime == 0) nextRenderTime = now;
        while (now > nextRenderTime + ani.playTime) {
            nextRenderTime += ani.playTime;
        }nextRenderTime += frame.delay;
    };
};

module.exports = Animation;

/***/ }),

/***/ 2296:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var table = new Uint32Array(256);

for (var i = 0; i < 256; i++) {
    var c = i;
    for (var k = 0; k < 8; k++) {
        c = c & 1 ? 0xEDB88320 ^ c >>> 1 : c >>> 1;
    }table[i] = c;
}

/**
 *
 * @param {Uint8Array} bytes
 * @param {int} start
 * @param {int} length
 * @return {int}
 */
module.exports = function (bytes, start, length) {
    start = start || 0;
    length = length || bytes.length - start;
    var crc = -1;
    for (var i = start, l = start + length; i < l; i++) {
        crc = crc >>> 8 ^ table[(crc ^ bytes[i]) & 0xFF];
    }
    return crc ^ -1;
};

/***/ }),

/***/ 2297:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Promise = Promise || __webpack_require__(1003).Promise;

module.exports = function (url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function () {
            if (this.status == 200) {
                resolve(this.response);
            } else {
                reject(this);
            }
        };
        xhr.send();
    });
};

/***/ }),

/***/ 2298:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(72);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = EmailSharingModal;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _trim2 = __webpack_require__(2177);

var _trim3 = _interopRequireDefault(_trim2);

var _index = __webpack_require__(2299);

var _index2 = _interopRequireDefault(_index);

var _modal = __webpack_require__(2178);

var _modal2 = _interopRequireDefault(_modal);

var _ConfirmButton = __webpack_require__(1989);

var _ConfirmButton2 = _interopRequireDefault(_ConfirmButton);

var _CancelButton = __webpack_require__(2179);

var _CancelButton2 = _interopRequireDefault(_CancelButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function EmailSharingModal(props) {
  var emitter = props.emitter,
      settings = props.settings,
      isOpen = props.isOpen,
      successCallback = props.successCallback,
      cancelCallback = props.cancelCallback;

  var _useState = (0, _react.useState)(''),
      _useState2 = (0, _slicedToArray3.default)(_useState, 2),
      error = _useState2[0],
      setError = _useState2[1];

  var lastIsOpen = (0, _react.useRef)(false);
  var displayNameRef = (0, _react.useRef)(null);
  var emailRef = (0, _react.useRef)(null);

  (0, _react.useEffect)(function () {
    if (lastIsOpen.current !== isOpen) {
      setError('');
    }
    lastIsOpen.current = isOpen;
  }, [isOpen]);

  var validateEmpty = function validateEmpty(v) {
    return !(0, _trim3.default)(v);
  };

  var validateEmail = function validateEmail(value) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(String(value).toLowerCase());
  };

  var handleSubmit = function handleSubmit() {
    if (validateEmpty(displayNameRef.current.value)) {
      return setError(settings.i18n.getMessage('mail.invalid.name'));
    }
    if (validateEmpty(emailRef.current.value) || validateEmail(emailRef.current.value)) {
      return setError(settings.i18n.getMessage('mail.invalid.email'));
    }
    setError('');
    successCallback((0, _trim3.default)(displayNameRef.current.value), (0, _trim3.default)(emailRef.current.value));
  };

  return _react2.default.createElement(
    _modal2.default,
    { id: 'email-sharing-modal', isOpen: isOpen, emitter: emitter, settings: settings, ariaLabel: settings.i18n.getMessage('a11y.modal.email.sharing') },
    error && _react2.default.createElement(
      'div',
      { style: { width: '100%' } },
      _react2.default.createElement(
        'div',
        { id: 'email-sharing-error', role: 'alert', style: _index2.default.error },
        error
      )
    ),
    _react2.default.createElement(
      'div',
      { style: { width: '100%' } },
      _react2.default.createElement(
        'label',
        null,
        _react2.default.createElement(
          'div',
          { id: 'email-sharing-label-name', style: _index2.default.label },
          settings.i18n.getMessage('mail.title.name')
        ),
        _react2.default.createElement(
          'div',
          { style: _index2.default.inputbox },
          _react2.default.createElement('input', {
            id: 'email-sharing-input-name',
            type: 'text',
            ref: displayNameRef,
            name: 'displayName',
            maxLength: 50,
            style: { width: '50%' },
            placeholder: settings.i18n.getMessage('mail.invalid.name')
          })
        )
      )
    ),
    _react2.default.createElement(
      'div',
      { style: { width: '100%' } },
      _react2.default.createElement(
        'label',
        null,
        _react2.default.createElement(
          'div',
          { id: 'email-sharing-label-email', style: _index2.default.label },
          settings.i18n.getMessage('mail.title.email')
        ),
        _react2.default.createElement(
          'div',
          { style: _index2.default.inputbox },
          _react2.default.createElement('input', { id: 'email-sharing-input-email', type: 'email', name: 'email', maxLength: 100, ref: emailRef, style: { width: '50%' }, placeholder: settings.i18n.getMessage('mail.invalid.email') })
        )
      )
    ),
    _react2.default.createElement(
      'div',
      { style: _index2.default.buttonContainer },
      _react2.default.createElement(_ConfirmButton2.default, { id: 'email-sharing-confirm', settings: settings, text: settings.i18n.getMessage('mail.action.submit'), onClick: handleSubmit })
    ),
    _react2.default.createElement(
      'div',
      { style: _index2.default.cancelContainer },
      _react2.default.createElement(_CancelButton2.default, { id: 'email-sharing-cancel', settings: settings, text: settings.i18n.getMessage('mail.action.cancel'), onClick: cancelCallback })
    )
  );
}
module.exports = exports['default'];

/***/ }),

/***/ 2299:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  error: {
    fontSize: '12px',
    color: '#ef3f78',
    height: '30px',
    textAlign: 'center',
    padding: '0 10px'
  },
  label: {
    width: '40%',
    textAlign: 'right',
    float: 'left',
    paddingRight: '10px',
    height: '35px',
    lineHeight: '35px',
    color: '#666'
  },
  buttonContainer: {
    textAlign: 'center',
    marginTop: '30px'
  },
  inputbox: {
    height: '35px',
    lineHeight: '35px'
  },
  cancelContainer: {
    textAlign: 'center',
    marginTop: '10px'
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 2436:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  rightButtons: {
    zIndex: 4,
    position: 'fixed',
    right: 0,
    bottom: '20px',
    width: '48px',
    paddingLeft: '190px'
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 2437:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(72);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = Compare;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _CompareLine = __webpack_require__(2438);

var _CompareLine2 = _interopRequireDefault(_CompareLine);

var _CompareCaption = __webpack_require__(2440);

var _CompareCaption2 = _interopRequireDefault(_CompareCaption);

var _ymkWebSdkCore = __webpack_require__(112);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Compare(props) {
  var settings = props.settings,
      emitter = props.emitter,
      comparing = props.comparing;

  var _useState = (0, _react.useState)(0),
      _useState2 = (0, _slicedToArray3.default)(_useState, 2),
      x = _useState2[0],
      setX = _useState2[1];

  var dragCompareIndicator = function dragCompareIndicator() {
    var newX = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : x;

    setX(newX);
    emitter.trigger(_ymkWebSdkCore.events.dragCompareIndicator, [newX]);
  };

  var resetCompareIndicator = function resetCompareIndicator() {
    return dragCompareIndicator(0);
  };

  var resetCompareIndicatorIfNecessary = function resetCompareIndicatorIfNecessary() {
    if (!comparing) {
      return;
    }
    var threshold = settings.displayWidth && settings.displayWidth / 4 || 50;
    if (threshold > Math.abs(x)) {
      return;
    }
    resetCompareIndicator();
  };

  var isCompareCaptionVisible = function isCompareCaptionVisible() {
    if (!comparing) {
      return false;
    }
    if (!settings.showCompareCaption) {
      return false;
    }
    return x === 0;
  };

  (0, _react.useEffect)(function () {
    emitter.on(_ymkWebSdkCore.events.applyMakeupBySku, resetCompareIndicatorIfNecessary);
    emitter.on(_ymkWebSdkCore.events.applyMakeupByLook, resetCompareIndicatorIfNecessary);
    emitter.on(_ymkWebSdkCore.events.dragCompareIndicator, setX);
    emitter.on(_ymkWebSdkCore.events.skinEmulationOpened, resetCompareIndicator);
    emitter.on(_ymkWebSdkCore.events.shadeFindComplete, resetCompareIndicator);
    emitter.on(_ymkWebSdkCore.events.faceAttributePredicted, resetCompareIndicator);

    return function () {
      emitter.off(_ymkWebSdkCore.events.applyMakeupBySku, resetCompareIndicatorIfNecessary);
      emitter.off(_ymkWebSdkCore.events.applyMakeupByLook, resetCompareIndicatorIfNecessary);
      emitter.off(_ymkWebSdkCore.events.dragCompareIndicator, setX);
      emitter.off(_ymkWebSdkCore.events.skinEmulationOpened, resetCompareIndicator);
      emitter.off(_ymkWebSdkCore.events.shadeFindComplete, resetCompareIndicator);
      emitter.off(_ymkWebSdkCore.events.faceAttributePredicted, resetCompareIndicator);
    };
  }, []);

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_CompareCaption2.default, { settings: settings, visible: isCompareCaptionVisible(), comparing: comparing, emitter: emitter }),
    _react2.default.createElement(_CompareLine2.default, { settings: settings, x: x, drag: dragCompareIndicator, comparing: comparing })
  );
}
module.exports = exports['default'];

/***/ }),

/***/ 2438:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

exports.default = CompareLine;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _reactDraggable = __webpack_require__(2032);

var _reactDraggable2 = _interopRequireDefault(_reactDraggable);

var _styles = __webpack_require__(2189);

var _styles2 = _interopRequireDefault(_styles);

var _styles3 = __webpack_require__(2190);

var _styles4 = _interopRequireDefault(_styles3);

var _throttle2 = __webpack_require__(19);

var _throttle3 = _interopRequireDefault(_throttle2);

var _toNumber2 = __webpack_require__(51);

var _toNumber3 = _interopRequireDefault(_toNumber2);

var _ymkWebSdkCore = __webpack_require__(112);

var _useDynamicStyles = __webpack_require__(747);

var _useDynamicStyles2 = _interopRequireDefault(_useDynamicStyles);

var _get2 = __webpack_require__(3);

var _get3 = _interopRequireDefault(_get2);

var _context = __webpack_require__(567);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CompareLine(props) {
  var settings = props.settings,
      x = props.x,
      drag = props.drag,
      comparing = props.comparing;

  var _useContext = (0, _react.useContext)(_context.EngineContext),
      engineType = _useContext.engineType;

  var styles = (0, _useDynamicStyles2.default)({ settings: settings, defaultStyles: _styles2.default, a11yStyles: _styles4.default });

  var isVolumeControlEnabled = _ymkWebSdkCore.browserUtils.isMobile();
  var BUTTON_SPACE = 38 + 15;
  var MOVE_UNIT = settings.enableAccessibilityMode ? (settings.displayWidth - 2 * BUTTON_SPACE) / 10 : settings.displayWidth / 10;
  var MIN = -1 * 5 * MOVE_UNIT;
  var MAX = 5 * MOVE_UNIT;
  var inputRef = (0, _react.useRef)(null);
  var compareConfig = settings.getModuleSetting().getPanel('virtual_tryon', 'body');

  var handleDrag = function handleDrag(e, d) {
    return drag(d.x);
  };

  var throttledHandleDrag = (0, _react.useCallback)((0, _throttle3.default)(handleDrag, 20, { leading: false }), []);

  var handleIndicatorButtonClick = function handleIndicatorButtonClick(v) {
    v > 0 ? inputRef.current.stepUp() : inputRef.current.stepDown();
    var next = parseFloat(inputRef.current.value);
    drag(next);
  };

  var handleIndicatorButtonDisable = function handleIndicatorButtonDisable(side) {
    if (side === 'left' && x <= MIN) {
      return true;
    } else if (side === 'right' && x >= MAX) {
      return true;
    } else {
      return false;
    }
  };

  var getIndicatorStyle = function getIndicatorStyle() {
    var s = (0, _get3.default)(compareConfig, 'blocks.compare_line.configs.type', 'solid') === 'solid' ? (0, _extends3.default)({}, styles.indicator, { height: settings.displayHeight + 'px' }, (0, _get3.default)(compareConfig, 'blocks.compare_line.styles', {})) : (0, _extends3.default)({}, styles.indicator, { height: settings.displayHeight + 'px', backgroundImage: 'linear-gradient(' + getGradient() + ')' });
    return engineType === _ymkWebSdkCore.engineTypes.previewfake ? (0, _extends3.default)({}, s, { display: 'block' }) : s;
  };

  var getGradient = function getGradient() {
    var lineConfig = settings.getModuleSetting().getBlock('virtual_tryon', 'body', 'compare_line');
    return (0, _get3.default)(lineConfig, 'configs.gradientColor1') + ' ' + (0, _get3.default)(lineConfig, 'configs.gradientColorRatio1') + ', ' + (0, _get3.default)(lineConfig, 'configs.gradientColor2');
  };

  var getIndicatorButtonTop = function getIndicatorButtonTop() {
    switch ((0, _get3.default)(compareConfig, 'blocks.compare_node.configs.position')) {
      case 'top':
        return { top: '10%' };
      case 'middle':
        return { top: '50%' };
      case 'bottom':
      default:
        return { top: '80%' };
    }
  };

  return _react2.default.createElement(
    _reactDraggable2.default,
    {
      axis: 'x',
      onDrag: throttledHandleDrag,
      onStop: function onStop() {
        return setTimeout(function () {
          return inputRef.current && inputRef.current.focus();
        });
      },
      position: { x: x, y: 0 },
      bounds: {
        top: 0,
        left: -1 * settings.displayWidth / 2,
        right: settings.displayWidth / 2 - 3,
        bottom: settings.displayHeight
      }
    },
    _react2.default.createElement(
      'div',
      { id: 'result-compare-indicator', style: getIndicatorStyle() },
      settings.compareMode === _ymkWebSdkCore.compareModes.split && settings.enableAccessibilityMode && _react2.default.createElement(
        'div',
        { style: settings.isBeardDyeOnly() ? (0, _extends3.default)({}, styles.indicatorButtons, { top: '50%', transform: 'translateY(-50%)' }) : styles.indicatorButtons },
        _react2.default.createElement(
          'div',
          { style: { position: 'absolute', zIndex: 0, width: '106px', left: '-53px', display: 'flex', justifyContent: 'space-between' } },
          _react2.default.createElement('button', {
            id: 'compare-arrow-left',
            type: 'button',
            style: (0, _extends3.default)({}, styles.indicatorButton, {
              backgroundImage: 'url(' + __webpack_require__(2191) + ')',
              cursor: handleIndicatorButtonDisable('left') ? 'not-allowed' : 'pointer'
            }),
            disabled: handleIndicatorButtonDisable('left'),
            onClick: function onClick() {
              handleIndicatorButtonClick(-1);
            },
            autoFocus: true,
            'aria-label': settings.i18n.getMessage('a11y.label.compare.arrow.left')
          }),
          _react2.default.createElement('button', {
            type: 'button',
            id: 'compare-arrow-right',
            style: (0, _extends3.default)({}, styles.indicatorButton, {
              backgroundImage: 'url(' + __webpack_require__(2192) + ')',
              cursor: handleIndicatorButtonDisable('right') ? 'not-allowed' : 'pointer'
            }),
            disabled: handleIndicatorButtonDisable('right'),
            onClick: function onClick() {
              handleIndicatorButtonClick(1);
            },
            'aria-label': settings.i18n.getMessage('a11y.label.compare.arrow.right')
          })
        ),
        _react2.default.createElement('input', {
          ref: inputRef,
          type: 'range',
          id: 'compare-slider-hidden-input',
          className: 'pf-hidden-slider pf-pointer-disabled-slider',
          value: x,
          min: MIN,
          max: MAX,
          step: MOVE_UNIT,
          tabIndex: comparing ? 0 : -1,
          'aria-label': settings.i18n.getMessage('a11y.label.compare.line'),
          'aria-valuenow': x,
          'aria-valuemin': MIN,
          'aria-valuemax': MAX,
          'aria-valuetext': Math.floor(x / (settings.displayWidth - 2 * BUTTON_SPACE) * 100) + ' %',
          onChange: function onChange(e) {
            return drag((0, _toNumber3.default)(e.target.value));
          },
          style: (0, _extends3.default)({}, styles.hiddenRangeInput, { pointerEvents: isVolumeControlEnabled ? 'auto' : 'none' })
        })
      ),
      !settings.enableAccessibilityMode && _react2.default.createElement(
        'div',
        { style: settings.isBeardDyeOnly() ? (0, _extends3.default)({}, styles.indicatorButtons, { top: '50%', transform: 'translateY(-50%)' }) : (0, _extends3.default)({}, styles.indicatorButtons, getIndicatorButtonTop()) },
        _react2.default.createElement('div', {
          style: (0, _extends3.default)({}, styles.indicatorThumb, (0, _get3.default)(compareConfig, 'blocks.compare_node.styles', {}), {
            backgroundImage: 'url(' + ((0, _get3.default)(compareConfig, 'blocks.compare_node.configs.imgSrc') || __webpack_require__(2439)) + ')'
          }),
          'aria-label': settings.i18n.getMessage('a11y.label.compare.line')
        }),
        _react2.default.createElement('input', {
          ref: function ref(r) {
            inputRef.current = r;
            r && r.focus();
          },
          type: 'range',
          id: 'compare-slider-hidden-input',
          className: 'pf-hidden-slider pf-pointer-disabled-slider',
          value: x,
          min: MIN,
          max: MAX,
          step: MOVE_UNIT,
          tabIndex: comparing ? 0 : -1,
          'aria-label': settings.i18n.getMessage('a11y.label.compare.line'),
          'aria-valuenow': x,
          'aria-valuemin': MIN,
          'aria-valuemax': MAX,
          autoFocus: true,
          onChange: function onChange(e) {
            return drag((0, _toNumber3.default)(e.target.value));
          },
          style: (0, _extends3.default)({}, styles.hiddenRangeInput, { pointerEvents: isVolumeControlEnabled ? 'auto' : 'none' })
        })
      )
    )
  );
}
module.exports = exports['default'];

/***/ }),

/***/ 2439:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDciIGhlaWdodD0iNDciIHZpZXdCb3g9IjAgMCA0NyA0NyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMy4xNzQxIDEwSDI0LjI5MzFWMzUuMTc2OEgyMy4xNzQxVjEwWk0xMiAxMC4wMDAxSDEzLjExOVYzNS4xNzY5SDEyVjEwLjAwMDFaTTM1LjQ2NjggMTBIMzQuMzQ3OFYzNS4xNzY4SDM1LjQ2NjhWMTBaIiBmaWxsPSIjRUYzRjc4Ii8+Cjwvc3ZnPgo="

/***/ }),

/***/ 2440:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = __webpack_require__(72);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = CompareCaption;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _styles = __webpack_require__(2189);

var _styles2 = _interopRequireDefault(_styles);

var _styles3 = __webpack_require__(2190);

var _styles4 = _interopRequireDefault(_styles3);

var _ymkWebSdkCore = __webpack_require__(112);

var _useDynamicStyles = __webpack_require__(747);

var _useDynamicStyles2 = _interopRequireDefault(_useDynamicStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CompareCaption(props) {
  var emitter = props.emitter,
      settings = props.settings,
      visible = props.visible,
      comparing = props.comparing;

  var styles = (0, _useDynamicStyles2.default)({ settings: settings, defaultStyles: _styles2.default, a11yStyles: _styles4.default });

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray3.default)(_useState, 2),
      show = _useState2[0],
      setShow = _useState2[1];

  var timer = (0, _react.useRef)(-1);
  var prevVisible = (0, _react.useRef)(false);

  var handleCloseEngine = function handleCloseEngine() {
    clearTimeout(timer.current);
    timer.current = -1;
    setShow(false);
  };

  var autoHide = function autoHide() {
    if (settings.compareMode === _ymkWebSdkCore.compareModes.split) {
      return;
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(function () {
      return setShow(false);
    }, 3000);
  };

  var getMessage = function getMessage(settings) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'before';

    if (settings.functionType === _ymkWebSdkCore.functionTypes.skincare) {
      return type === 'before' ? 'Before' : 'After';
    }
    return settings.i18n.getMessage('compare.' + type);
  };

  (0, _react.useEffect)(function () {
    if (!prevVisible.current && visible) {
      setShow(true);
      autoHide();
    }
    if (prevVisible.current && !visible) {
      if (settings.compareMode === _ymkWebSdkCore.compareModes.replace) {
        setShow(true);
        autoHide();
      } else {
        setShow(false);
      }
    }
    prevVisible.current = visible;
  }, [visible]);

  (0, _react.useEffect)(function () {
    emitter.on(_ymkWebSdkCore.events.closeEngine, handleCloseEngine);
    emitter.on(_ymkWebSdkCore.events.skinEmulationClosed, handleCloseEngine);
    return function () {
      emitter.off(_ymkWebSdkCore.events.closeEngine, handleCloseEngine);
      emitter.off(_ymkWebSdkCore.events.skinEmulationClosed, handleCloseEngine);
    };
  }, []);

  if (!show) {
    return _react2.default.createElement('div', null);
  }
  if (settings.compareMode === _ymkWebSdkCore.compareModes.replace) {
    return _react2.default.createElement(
      'div',
      { style: styles.compareCaption2 },
      _react2.default.createElement(
        'div',
        {
          id: 'toggle-compare-caption',
          style: (0, _extends3.default)({}, styles.compareCaptionText2)
        },
        comparing ? getMessage(settings, 'before') : getMessage(settings, 'after')
      )
    );
  }
  return _react2.default.createElement(
    'div',
    { style: styles.compareCaption },
    _react2.default.createElement(
      'div',
      {
        id: 'split-compare-caption-before',
        style: (0, _extends3.default)({}, styles.compareCaptionText, {
          left: '25%'
        })
      },
      getMessage(settings, 'before')
    ),
    _react2.default.createElement(
      'div',
      {
        id: 'split-compare-caption-after',
        style: (0, _extends3.default)({}, styles.compareCaptionText, {
          left: '75%'
        })
      },
      getMessage(settings, 'after')
    )
  );
}
module.exports = exports['default'];

/***/ }),

/***/ 2441:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CaptureButtons;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _context = __webpack_require__(567);

var _ymkWebSdkCore = __webpack_require__(112);

var _useCaptureButtons2 = __webpack_require__(2442);

var _useCaptureButtons3 = _interopRequireDefault(_useCaptureButtons2);

var _LiveCaptureButtons = __webpack_require__(2443);

var _LiveCaptureButtons2 = _interopRequireDefault(_LiveCaptureButtons);

var _VideoCaptureButtons = __webpack_require__(2444);

var _VideoCaptureButtons2 = _interopRequireDefault(_VideoCaptureButtons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CaptureButtons(props) {
  var settings = props.settings,
      emitter = props.emitter,
      hidden = props.hidden,
      changePage = props.changePage,
      resetZoomLevel = props.resetZoomLevel,
      _previewType = props._previewType;

  var _useCaptureButtons = (0, _useCaptureButtons3.default)({ settings: settings, emitter: emitter, changePage: changePage, resetZoomLevel: resetZoomLevel }),
      modeSwitchingTextEnabled = _useCaptureButtons.modeSwitchingTextEnabled,
      onCaptureClick = _useCaptureButtons.onCaptureClick,
      onBackToWebcamClick = _useCaptureButtons.onBackToWebcamClick,
      onRecordClick = _useCaptureButtons.onRecordClick,
      onVideoModeClick = _useCaptureButtons.onVideoModeClick;

  var _useContext = (0, _react.useContext)(_context.EngineContext),
      engineType = _useContext.engineType,
      webcamType = _useContext.webcamType,
      paused = _useContext.paused;

  var isLivecam = engineType === _ymkWebSdkCore.engineTypes.livecam;
  var isVideoMode = settings.enableRecordMode && isLivecam && webcamType !== _ymkWebSdkCore.WEBCAM_TYPES.webcam;

  if (settings.hideButtonsOnResult || settings.hideTakeAPhotoIcon) {
    return false;
  }
  if (isVideoMode || _previewType === 'video') {
    return _react2.default.createElement(_VideoCaptureButtons2.default, {
      key: 'videocapturebuttons',
      hidden: hidden,
      settings: settings,
      emitter: emitter,
      onVideoClick: onRecordClick,
      onCameraClick: onBackToWebcamClick,
      modeTitleEnabled: modeSwitchingTextEnabled,
      _previewProgress: _previewType === 'video' && 40
    });
  }
  var canShowLiveCaptureButtons = isLivecam && webcamType === _ymkWebSdkCore.WEBCAM_TYPES.webcam && !paused;
  var _canPreviewLiveCaptureButtons = ['camera_video', 'camera'].includes(_previewType);
  if (canShowLiveCaptureButtons || _canPreviewLiveCaptureButtons) {
    return _react2.default.createElement(_LiveCaptureButtons2.default, {
      key: 'livecapturebuttons',
      hidden: hidden,
      settings: settings,
      onCameraClick: onCaptureClick,
      onVideoClick: onVideoModeClick,
      modeTitleEnabled: modeSwitchingTextEnabled,
      videoEnabled: settings.enableRecordMode || _previewType === 'camera_video'
    });
  }
  return false;
}
module.exports = exports['default'];

/***/ }),

/***/ 2442:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(72);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = useCaptureButtons;

var _pages = __webpack_require__(623);

var _pages2 = _interopRequireDefault(_pages);

var _ymkWebSdkCore = __webpack_require__(112);

var _react = __webpack_require__(459);

var _context = __webpack_require__(567);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useCaptureButtons(props) {
  var settings = props.settings,
      emitter = props.emitter,
      changePage = props.changePage,
      resetZoomLevel = props.resetZoomLevel;

  var _useContext = (0, _react.useContext)(_context.EngineContext),
      blob = _useContext.blob;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray3.default)(_useState, 2),
      modeSwitchingTextEnabled = _useState2[0],
      setModeSwitchingTextEnabled = _useState2[1];

  var onCaptureClick = function onCaptureClick() {
    changePage(_pages2.default.capture_counting, {
      back: function back() {
        return changePage(_pages2.default.virtual_tryon);
      },
      callback: function callback() {
        emitter.trigger(_ymkWebSdkCore.events.pause, [true]);
        emitter.trigger(_ymkWebSdkCore.events.loadImageByCapture, ['makeup']);
        changePage(_pages2.default.virtual_tryon, { a11yInitPageReaderDisabled: true });
        emitter.trigger(_ymkWebSdkCore.events.a11yMessage, [[settings.i18n.getMessage('a11y.alert.take.photo.success'), settings.i18n.getMessage('a11y.page.try.on.photo')]]);
      }
    });
  };

  var onVideoModeClick = function onVideoModeClick() {
    resetZoomLevel();
    if (!!blob) {
      emitter.trigger(_ymkWebSdkCore.events.webcamChange, [_ymkWebSdkCore.WEBCAM_TYPES.blob, blob]);
      return;
    }
    changePage(_pages2.default.video_init, {
      backToVirtualTryOn: function backToVirtualTryOn() {
        changePage(_pages2.default.virtual_tryon);
        setModeSwitchingTextEnabled(true);
      }
    });
  };

  var onRecordClick = function onRecordClick() {
    resetZoomLevel();
    changePage(_pages2.default.video_recording);
  };

  var onBackToWebcamClick = function onBackToWebcamClick() {
    resetZoomLevel();
    emitter.trigger(_ymkWebSdkCore.events.webcamChange, [_ymkWebSdkCore.WEBCAM_TYPES.webcam]);
    setModeSwitchingTextEnabled(true);
  };

  return {
    modeSwitchingTextEnabled: modeSwitchingTextEnabled,
    onCaptureClick: onCaptureClick,
    onVideoModeClick: onVideoModeClick,
    onRecordClick: onRecordClick,
    onBackToWebcamClick: onBackToWebcamClick
  };
}
module.exports = exports['default'];

/***/ }),

/***/ 2443:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LiveCaptureButtons;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _MainButton = __webpack_require__(999);

var _MainButton2 = _interopRequireDefault(_MainButton);

var _SubButton = __webpack_require__(2033);

var _SubButton2 = _interopRequireDefault(_SubButton);

var _ModeTitle = __webpack_require__(2034);

var _ModeTitle2 = _interopRequireDefault(_ModeTitle);

var _get2 = __webpack_require__(3);

var _get3 = _interopRequireDefault(_get2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LiveCaptureButtons(props) {
  var settings = props.settings,
      modeTitleEnabled = props.modeTitleEnabled,
      videoEnabled = props.videoEnabled,
      onCameraClick = props.onCameraClick,
      onVideoClick = props.onVideoClick,
      hidden = props.hidden;

  var footerConfig = settings.getModuleSetting().getPanel('virtual_tryon', 'footer');

  return _react2.default.createElement(
    'div',
    { style: { display: hidden ? 'none' : 'block' } },
    modeTitleEnabled && _react2.default.createElement(_ModeTitle2.default, { id: 'live-mode-title', settings: settings, text: settings.i18n.getMessage('live.mode.title') }),
    _react2.default.createElement(_MainButton2.default, {
      id: 'vto-capture',
      settings: settings,
      ariaLabel: settings.i18n.getMessage('a11y.label.take.photo'),
      onClick: onCameraClick,
      position: (0, _get3.default)(footerConfig, 'configs.position'),
      style: (0, _get3.default)(footerConfig, 'blocks.camera.styles'),
      iconAlt: 'camera',
      icon: settings.enableAccessibilityMode ? __webpack_require__(1017) : (0, _get3.default)(footerConfig, 'blocks.camera.configs.imgSrc') || __webpack_require__(2035)
    }),
    videoEnabled && _react2.default.createElement(_SubButton2.default, {
      id: 'vto-video-mode',
      ariaLabel: settings.i18n.getMessage('a11y.label.video.mode'),
      onClick: onVideoClick,
      position: (0, _get3.default)(footerConfig, 'configs.position'),
      iconAlt: 'video',
      icon: (0, _get3.default)(footerConfig, 'blocks.video.configs.imgSrc') || __webpack_require__(2036)
    })
  );
}
module.exports = exports['default'];

/***/ }),

/***/ 2444:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(72);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = VideoCaptureButtons;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _ymkWebSdkCore = __webpack_require__(112);

var _ModeTitle = __webpack_require__(2034);

var _ModeTitle2 = _interopRequireDefault(_ModeTitle);

var _MainButton = __webpack_require__(999);

var _MainButton2 = _interopRequireDefault(_MainButton);

var _SubButton = __webpack_require__(2033);

var _SubButton2 = _interopRequireDefault(_SubButton);

var _get2 = __webpack_require__(3);

var _get3 = _interopRequireDefault(_get2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function VideoCaptureButtons(props) {
  var settings = props.settings,
      emitter = props.emitter,
      modeTitleEnabled = props.modeTitleEnabled,
      onVideoClick = props.onVideoClick,
      onCameraClick = props.onCameraClick,
      hidden = props.hidden,
      _previewProgress = props._previewProgress;

  var _useState = (0, _react.useState)(_previewProgress || 0),
      _useState2 = (0, _slicedToArray3.default)(_useState, 2),
      videoProgress = _useState2[0],
      setVideoProgress = _useState2[1];

  var footerConfig = settings.getModuleSetting().getPanel('virtual_tryon', 'footer');

  var initProgress = function initProgress() {
    return setVideoProgress(0);
  };

  var startProgress = function startProgress() {
    var WAIT_PROGRESS_INIT = 50;
    setTimeout(function () {
      return setVideoProgress(100);
    }, WAIT_PROGRESS_INIT);
  };

  (0, _react.useEffect)(function () {
    if (_previewProgress) {
      return;
    }
    emitter.on(_ymkWebSdkCore.events.videoSourceStarted, startProgress);
    emitter.on(_ymkWebSdkCore.events.videoSourceEnded, initProgress);

    return function () {
      emitter.off(_ymkWebSdkCore.events.videoSourceStarted, startProgress);
      emitter.off(_ymkWebSdkCore.events.videoSourceEnded, initProgress);
    };
  }, []);

  return _react2.default.createElement(
    'div',
    { style: { display: hidden ? 'none' : 'block' } },
    modeTitleEnabled && _react2.default.createElement(_ModeTitle2.default, { id: 'video-mode-title', settings: settings, text: settings.i18n.getMessage('video.mode.title') }),
    _react2.default.createElement(_MainButton2.default, {
      id: 'vto-record',
      settings: settings,
      ariaLabel: settings.i18n.getMessage('a11y.label.video.record'),
      onClick: onVideoClick,
      position: (0, _get3.default)(footerConfig, 'configs.position'),
      style: (0, _get3.default)(footerConfig, 'blocks.video.styles'),
      iconAlt: 'record',
      icon: (0, _get3.default)(footerConfig, 'blocks.video.configs.imgSrc') || __webpack_require__(2036),
      enableProgress: true,
      progress: videoProgress,
      trackColor: (0, _get3.default)(footerConfig, 'blocks.video.configs.track') || 'rgba(255, 255, 255, 0.5)',
      fillColor: (0, _get3.default)(footerConfig, 'blocks.video.configs.fill') || 'rgba(255, 0, 0, 1)',
      transitionDuration: videoProgress ? settings.recordModeMs + 'ms' : '0s'
    }),
    _react2.default.createElement(_SubButton2.default, {
      id: 'vto-live-mode',
      ariaLabel: settings.i18n.getMessage('a11y.label.live.mode'),
      onClick: onCameraClick,
      position: (0, _get3.default)(footerConfig, 'configs.position'),
      iconAlt: 'live',
      icon: settings.enableAccessibilityMode ? __webpack_require__(1017) : (0, _get3.default)(footerConfig, 'blocks.camera.configs.imgSrc') || __webpack_require__(2035)
    })
  );
}
module.exports = exports['default'];

/***/ }),

/***/ 2445:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__(170);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = LeftSlider;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _useIntensitySlider2 = __webpack_require__(2446);

var _useIntensitySlider3 = _interopRequireDefault(_useIntensitySlider2);

var _useEyewearPDSlider2 = __webpack_require__(2447);

var _useEyewearPDSlider3 = _interopRequireDefault(_useEyewearPDSlider2);

var _ymkslider = __webpack_require__(2214);

var _ymkslider2 = _interopRequireDefault(_ymkslider);

var _eyewearpdslider = __webpack_require__(2450);

var _eyewearpdslider2 = _interopRequireDefault(_eyewearpdslider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LeftSlider(props) {
  var settings = props.settings,
      emitter = props.emitter,
      changePage = props.changePage,
      _previewType = props._previewType;

  var _useIntensitySlider = (0, _useIntensitySlider3.default)({ settings: settings, emitter: emitter }),
      intensityEnabled = _useIntensitySlider.enabled,
      intensity = _useIntensitySlider.intensity,
      onSliderChange = _useIntensitySlider.onSliderChange,
      getA11yMessage4Changed = _useIntensitySlider.getA11yMessage4Changed;

  var _useEyewearPDSlider = (0, _useEyewearPDSlider3.default)({ settings: settings, emitter: emitter }),
      eyewearPDEnabled = _useEyewearPDSlider.enabled,
      pdSliderProps = (0, _objectWithoutProperties3.default)(_useEyewearPDSlider, ['enabled']);

  if (intensityEnabled || _previewType === 'intensity') {
    return _react2.default.createElement(_ymkslider2.default, {
      idPrefix: 'intensity',
      enabled: true,
      settings: settings,
      emitter: emitter,
      value: intensity,
      onChange: onSliderChange,
      isToolTipEnabled: true,
      ariaLabel: settings.i18n.getMessage('a11y.label.intensity.slider'),
      getA11yMessageOnAfterChange: getA11yMessage4Changed
    });
  }
  if (eyewearPDEnabled || _previewType === 'pd') {
    return _react2.default.createElement(_eyewearpdslider2.default, (0, _extends3.default)({ settings: settings, emitter: emitter, changePage: changePage }, pdSliderProps));
  }
  return false;
}
module.exports = exports['default'];

/***/ }),

/***/ 2446:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(72);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = useIntensitySlider;

var _react = __webpack_require__(459);

var _useCurrentEffectHolder = __webpack_require__(2213);

var _useCurrentEffectHolder2 = _interopRequireDefault(_useCurrentEffectHolder);

var _ymkWebSdkCore = __webpack_require__(112);

var _defer2 = __webpack_require__(997);

var _defer3 = _interopRequireDefault(_defer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_INTENSITY = 50;

function useIntensitySlider(props) {
  var settings = props.settings,
      emitter = props.emitter;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray3.default)(_useState, 2),
      enabled = _useState2[0],
      setEnabled = _useState2[1];

  var _useState3 = (0, _react.useState)(DEFAULT_INTENSITY),
      _useState4 = (0, _slicedToArray3.default)(_useState3, 2),
      intensity = _useState4[0],
      setIntensity = _useState4[1];

  var _useCurrentEffectHold = (0, _useCurrentEffectHolder2.default)({ emitter: emitter }),
      getCurrentEffectType = _useCurrentEffectHold.getCurrentEffectType;

  var resetSlider = function resetSlider() {
    return changeSlider(false, DEFAULT_INTENSITY);
  };

  var changeSlider = function changeSlider(newEnabled, newValue) {
    setEnabled(newEnabled);
    setIntensity(newValue);
  };

  var changeIntensity = function changeIntensity(v) {
    return enabled && setIntensity(v);
  };

  var handleCompare = function handleCompare() {
    return changeSlider(enabled, DEFAULT_INTENSITY);
  };

  var handleReset = function handleReset(skuType) {
    if (!enabled) {
      return;
    }
    if (!skuType) {
      resetSlider();
      return;
    }
    (0, _defer3.default)(function () {
      if (!getCurrentEffectType()) {
        resetSlider();
      }
    });
  };

  var onSliderChange = function onSliderChange(v) {
    return emitter.trigger(_ymkWebSdkCore.events.changeIntensity, [v]);
  };

  var getA11yMessage4Changed = function getA11yMessage4Changed(intensity) {
    var effectType = getCurrentEffectType();
    if (!effectType) {
      return settings.i18n.getMessageWithValues('a11y.alert.intensity.updated', { intensity: intensity });
    }
    var skuType = effectType === 'look' ? 'look' : _ymkWebSdkCore.skuUtils.convertSkuType(effectType);
    var skuTypeI18n = settings.i18n.getMessage('sku.type.' + skuType);
    return skuTypeI18n ? settings.i18n.getMessageWithValues('a11y.alert.intensity.updated.by.type', { skuType: skuTypeI18n, intensity: intensity }) : settings.i18n.getMessageWithValues('a11y.alert.intensity.updated', { intensity: intensity });
  };

  (0, _react.useEffect)(function () {
    emitter.on(_ymkWebSdkCore.events.compare, handleCompare);
    emitter.on(_ymkWebSdkCore.events.reset, handleReset);
    emitter.on(_ymkWebSdkCore.events.changeIntensitySlider, changeSlider);
    emitter.on(_ymkWebSdkCore.events.changeIntensity, changeIntensity);

    return function () {
      emitter.off(_ymkWebSdkCore.events.compare, handleCompare);
      emitter.off(_ymkWebSdkCore.events.reset, handleReset);
      emitter.off(_ymkWebSdkCore.events.changeIntensitySlider, changeSlider);
      emitter.off(_ymkWebSdkCore.events.changeIntensity, changeIntensity);
    };
  });

  return {
    enabled: enabled,
    intensity: intensity,
    onSliderChange: onSliderChange,
    getA11yMessage4Changed: getA11yMessage4Changed
  };
}
module.exports = exports['default'];

/***/ }),

/***/ 2447:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(72);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = useEyewearPDSlider;

var _react = __webpack_require__(459);

var _useCurrentEffectHolder = __webpack_require__(2213);

var _useCurrentEffectHolder2 = _interopRequireDefault(_useCurrentEffectHolder);

var _ymkWebSdkCore = __webpack_require__(112);

var _throttle2 = __webpack_require__(19);

var _throttle3 = _interopRequireDefault(_throttle2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_MAX = 74;
var DEFAULT_MIN = 54;

function useEyewearPDSlider(props) {
  var settings = props.settings,
      emitter = props.emitter;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray3.default)(_useState, 2),
      enabled = _useState2[0],
      setEnabled = _useState2[1];

  var _useState3 = (0, _react.useState)(settings.eyewearPD),
      _useState4 = (0, _slicedToArray3.default)(_useState3, 2),
      pd = _useState4[0],
      setPd = _useState4[1];

  var _useState5 = (0, _react.useState)(DEFAULT_MAX),
      _useState6 = (0, _slicedToArray3.default)(_useState5, 2),
      sliderMax = _useState6[0],
      setSliderMax = _useState6[1];

  var _useState7 = (0, _react.useState)(DEFAULT_MIN),
      _useState8 = (0, _slicedToArray3.default)(_useState7, 2),
      sliderMin = _useState8[0],
      setSliderMin = _useState8[1];

  var _useCurrentEffectHold = (0, _useCurrentEffectHolder2.default)({ emitter: emitter }),
      getCurrentEffectType = _useCurrentEffectHold.getCurrentEffectType;

  var initEnabled = function initEnabled() {
    var effectType = getCurrentEffectType();
    var skuType = _ymkWebSdkCore.skuUtils.convertSkuType(effectType);
    setEnabled(skuType === 'eye_wear');
  };

  var initSliderRange = function initSliderRange() {
    if (pd < DEFAULT_MIN) {
      setSliderMin(pd - 5);
    }
    if (pd > DEFAULT_MAX) {
      setSliderMax(pd + 5);
    }
  };

  var disableSliderIfEyewearReset = function disableSliderIfEyewearReset(skuType) {
    if (!skuType || skuType === 'eye_wear') {
      setEnabled(false);
    }
  };

  var updateEyewearPD = function updateEyewearPD(newPd) {
    return emitter.trigger(_ymkWebSdkCore.events.eyewearPDChanged, [newPd]);
  };

  var handlePDChanged = function handlePDChanged(newPd) {
    setPd(newPd);
    settings.setEyewearPD(newPd);
  };

  (0, _react.useEffect)(function () {
    initSliderRange();
    initEnabled();
    emitter.on(_ymkWebSdkCore.events.eyewearPDSliderEnabled, setEnabled);
    emitter.on(_ymkWebSdkCore.events.eyewearPDChanged, handlePDChanged);
    emitter.on(_ymkWebSdkCore.events.reset, disableSliderIfEyewearReset);

    return function () {
      emitter.off(_ymkWebSdkCore.events.eyewearPDSliderEnabled, setEnabled);
      emitter.off(_ymkWebSdkCore.events.eyewearPDChanged, handlePDChanged);
      emitter.off(_ymkWebSdkCore.events.reset, disableSliderIfEyewearReset);
    };
  }, []);

  return {
    enabled: enabled,
    pd: pd,
    sliderMin: sliderMin,
    sliderMax: sliderMax,
    throttleUpdateEyewearPD: (0, _react.useCallback)((0, _throttle3.default)(updateEyewearPD, 50, { leading: false }), [])
  };
}
module.exports = exports['default'];

/***/ }),

/***/ 2448:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  container: {
    position: 'absolute',
    top: '12vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  sliderLabel: {
    width: '100%',
    textAlign: 'center',
    fontSize: '12px',
    color: 'white',
    textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
  },
  sliderRail: {
    width: '2px',
    backgroundColor: '#888888'
  },
  sliderHandle: {
    width: '18px',
    height: '18px',
    marginLeft: '-9px',
    marginBottom: '-10px',
    backgroundColor: '#ef3f78',
    border: '1px solid transparent',
    boxShadow: 'none'
  },
  sliderTrack: {
    width: '2px',
    backgroundColor: '#ef3f78'
  },
  button: {
    border: 'none',
    backgroundColor: 'transparent',
    width: '24px',
    height: '24px',
    padding: 0
  },
  tooltip: {
    position: 'absolute',
    top: '50vh',
    left: '50vw',
    fontSize: '26px',
    color: 'white',
    marginLeft: '-20px',
    marginTop: '-20px',
    textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 2449:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  tooltip: {
    marginLeft: '-35px',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: '4px',
    width: '60px',
    textAlign: 'center'
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 2450:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EyewearPDSlider;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _useDynamicStyles = __webpack_require__(747);

var _useDynamicStyles2 = _interopRequireDefault(_useDynamicStyles);

var _styles = __webpack_require__(2451);

var _styles2 = _interopRequireDefault(_styles);

var _styles3 = __webpack_require__(2452);

var _styles4 = _interopRequireDefault(_styles3);

var _pages = __webpack_require__(623);

var _pages2 = _interopRequireDefault(_pages);

var _ymkslider = __webpack_require__(2214);

var _ymkslider2 = _interopRequireDefault(_ymkslider);

var _ymkWebSdkCore = __webpack_require__(112);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function EyewearPDSlider(props) {
  var settings = props.settings,
      emitter = props.emitter,
      changePage = props.changePage,
      pd = props.pd,
      sliderMin = props.sliderMin,
      sliderMax = props.sliderMax,
      throttleUpdateEyewearPD = props.throttleUpdateEyewearPD;

  var styles = (0, _useDynamicStyles2.default)({ settings: settings, defaultStyles: _styles2.default, a11yStyle: _styles4.default });

  var getLabel = function getLabel(sliderValue) {
    var label = settings.i18n.getMessage('eyewear.pd.slider.label');
    return settings.enableEyewearAutoPD ? label + ': ' + sliderValue : label;
  };

  var goPDDescriptionPage = function goPDDescriptionPage() {
    return changePage(_pages2.default.pd_description);
  };

  var getA11yMessageOnAfterChange = function getA11yMessageOnAfterChange(pd) {
    return settings.i18n.getMessageWithValues('a11y.alert.pd.updated', { pd: pd });
  };

  if (settings.hideEyewearPDSlider) {
    return false;
  }
  return _react2.default.createElement(_ymkslider2.default, {
    idPrefix: 'pd',
    settings: settings,
    emitter: emitter,
    value: pd,
    min: sliderMin,
    max: sliderMax,
    ariaLabel: settings.i18n.getMessage('a11y.label.pd.slider'),
    isToolTipEnabled: true,
    enabled: true,
    onChange: throttleUpdateEyewearPD,
    getA11yMessageOnAfterChange: getA11yMessageOnAfterChange,
    sliderLabel: _react2.default.createElement(
      'button',
      { id: 'pd-slider-label', type: 'button', 'aria-label': settings.i18n.getMessage('a11y.label.pd.about'), style: styles.labelButton, onClick: goPDDescriptionPage },
      _react2.default.createElement(
        'div',
        { style: styles.label },
        getLabel(pd)
      ),
      _react2.default.createElement('img', { alt: settings.i18n.getMessage('a11y.label.pd.about'), src: __webpack_require__(2290), style: styles.questionMarkImg })
    )
  });
}
module.exports = exports['default'];

/***/ }),

/***/ 2451:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  labelButton: {
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: 'transparent'
  },
  label: {
    fontSize: '16px',
    fontWeight: 500,
    color: 'white',
    textShadow: '0 0 2px rgba(0, 0, 0, 0.55)'
  },
  questionMarkImg: {
    width: '21px',
    height: '21px'
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 2452:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  labelButton: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: '4px'
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 2453:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useReset;

var _ymkWebSdkCore = __webpack_require__(112);

function useReset(props) {
  var emitter = props.emitter,
      settings = props.settings,
      comparing = props.comparing,
      _props$forceHideReset = props.forceHideReset,
      forceHideReset = _props$forceHideReset === undefined ? comparing : _props$forceHideReset;


  var canReset = function canReset() {
    return !forceHideReset;
  };

  var onResetClick = function onResetClick() {
    if (!canReset()) {
      return;
    }
    emitter.trigger(_ymkWebSdkCore.events.reset);
    emitter.trigger(_ymkWebSdkCore.events.a11yMessage, [settings.i18n.getMessage('a11y.label.reset.already')]);
  };

  return {
    canReset: canReset,
    onResetClick: onResetClick
  };
}
module.exports = exports['default'];

/***/ }),

/***/ 2457:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useVirtualTryon;

var _react = __webpack_require__(459);

var _context = __webpack_require__(567);

var _useLoadEngine = __webpack_require__(629);

var _ymkWebSdkCore = __webpack_require__(112);

function useVirtualTryon(props) {
  var settings = props.settings;

  var _useContext = (0, _react.useContext)(_context.EngineContext),
      engineType = _useContext.engineType,
      webcamType = _useContext.webcamType,
      paused = _useContext.paused,
      mediaSource = _useContext.mediaSource;

  var isLivecam = engineType === _useLoadEngine.engineTypes.livecam;
  var isModelMode = engineType === _useLoadEngine.engineTypes.image && mediaSource === _useLoadEngine.mediaSources.choosemodel;
  var isVideoMode = isLivecam && webcamType !== _ymkWebSdkCore.WEBCAM_TYPES.webcam;

  var getA11yPageTitle = function getA11yPageTitle() {
    if (isVideoMode && !paused) {
      return settings.i18n.getMessage('a11y.page.try.on.video');
    }
    if (isLivecam && !paused) {
      return settings.i18n.getMessage('a11y.page.try.on.live');
    }
    return isModelMode ? settings.i18n.getMessage('a11y.page.try.on.model') : settings.i18n.getMessage('a11y.page.try.on.photo');
  };

  return {
    getA11yPageTitle: getA11yPageTitle
  };
}
module.exports = exports['default'];

/***/ }),

/***/ 2466:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(72);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = useZoom;

var _react = __webpack_require__(459);

var _ymkWebSdkCore = __webpack_require__(112);

var _context = __webpack_require__(567);

var _useLoadEngine = __webpack_require__(629);

var _throttle2 = __webpack_require__(19);

var _throttle3 = _interopRequireDefault(_throttle2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MAX_ZOOM_LEVEL = 3;
var MIN_ZOOM_LEVEL = 0;

function useZoom(props) {
  var emitter = props.emitter,
      _props$disabled = props.disabled,
      disabled = _props$disabled === undefined ? false : _props$disabled;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray3.default)(_useState, 2),
      zoomDisabled = _useState2[0],
      setZoomDisabled = _useState2[1];

  var _useState3 = (0, _react.useState)(MIN_ZOOM_LEVEL),
      _useState4 = (0, _slicedToArray3.default)(_useState3, 2),
      zoomLevel = _useState4[0],
      setZoomLevel = _useState4[1];

  var _useContext = (0, _react.useContext)(_context.EngineContext),
      engineType = _useContext.engineType,
      webcamType = _useContext.webcamType;

  var isVideoMode = engineType === _useLoadEngine.engineTypes.livecam && webcamType !== _ymkWebSdkCore.WEBCAM_TYPES.webcam;

  var canZoom = function canZoom() {
    if (_ymkWebSdkCore.browserUtils.isMobile() && !isVideoMode) {
      return false;
    }
    if (zoomDisabled || disabled) {
      return false;
    }
    if (_ymkWebSdkCore.browserUtils.isIE()) {
      return false;
    }
    if (!_ymkWebSdkCore.browserUtils.isEngineDisabled()) {
      return true;
    }
    return true;
  };

  var canZoomIn = function canZoomIn() {
    return canZoom() && zoomLevel < MAX_ZOOM_LEVEL;
  };

  var canZoomOut = function canZoomOut() {
    return canZoom() && zoomLevel > MIN_ZOOM_LEVEL;
  };

  var zoom = function zoom(newZoomlevel) {
    if (zoomLevel === newZoomlevel) {
      return;
    }
    emitter.trigger(_ymkWebSdkCore.events.zoom, [newZoomlevel]);
    setZoomLevel(newZoomlevel);
  };

  var resetZoomLevel = function resetZoomLevel() {
    return zoom(MIN_ZOOM_LEVEL);
  };

  var onZoomInClick = function onZoomInClick() {
    return canZoomIn() && zoom(zoomLevel >= MAX_ZOOM_LEVEL ? MAX_ZOOM_LEVEL : zoomLevel + 1);
  };

  var onZoomOutClick = function onZoomOutClick() {
    return canZoomOut() && zoom(zoomLevel <= MIN_ZOOM_LEVEL ? MIN_ZOOM_LEVEL : zoomLevel - 1);
  };

  var handleZoom = function handleZoom(newZoomLevel) {
    return newZoomLevel >= MIN_ZOOM_LEVEL && newZoomLevel <= MAX_ZOOM_LEVEL && setZoomLevel(newZoomLevel);
  };

  (0, _react.useEffect)(function () {
    var disallowZoom = function disallowZoom() {
      return setZoomDisabled(true);
    };
    var allowZoomIfLiveHairDyeNotApplied = function allowZoomIfLiveHairDyeNotApplied(skuType) {
      return (!skuType || skuType === 'hairdye') && setZoomDisabled(false);
    };

    emitter.on(_ymkWebSdkCore.events.liveHairDyeApplied, disallowZoom);
    emitter.on(_ymkWebSdkCore.events.reset, allowZoomIfLiveHairDyeNotApplied);
    emitter.on(_ymkWebSdkCore.events.zoom, handleZoom);
    return function () {
      emitter.off(_ymkWebSdkCore.events.liveHairDyeApplied, disallowZoom);
      emitter.off(_ymkWebSdkCore.events.reset, allowZoomIfLiveHairDyeNotApplied);
      emitter.off(_ymkWebSdkCore.events.zoom, handleZoom);
    };
  }, []);

  return {
    resetZoomLevel: resetZoomLevel,
    canZoom: canZoom,
    canZoomIn: canZoomIn,
    canZoomOut: canZoomOut,
    onZoomInClick: (0, _throttle3.default)(onZoomInClick, 100, { leading: false }),
    onZoomOutClick: (0, _throttle3.default)(onZoomOutClick, 100, { leading: false })
  };
}
module.exports = exports['default'];

/***/ }),

/***/ 2467:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAACGFjVEwAAAAdAAAAABE9kyMAAAL6UExURQAAAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////zqL+5wAAAD+dFJOUwABAgMEBQYHCAkKCwwNDg8QERITFBUWFxgZGhscHR4fICEiIyQlJicoKSorLC0uLzAxMjM0NTY3ODk6Ozw9Pj9A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"

/***/ }),

/***/ 3568:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

var _promise = __webpack_require__(18);

var _promise2 = _interopRequireDefault(_promise);

var _slicedToArray2 = __webpack_require__(72);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = VirtualTryOn;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _styles = __webpack_require__(2436);

var _styles2 = _interopRequireDefault(_styles);

var _pages = __webpack_require__(623);

var _pages2 = _interopRequireDefault(_pages);

var _ymkWebSdkCore = __webpack_require__(112);

var _context = __webpack_require__(567);

var _useLoadEngine = __webpack_require__(629);

var _useVirtualTryon2 = __webpack_require__(2457);

var _useVirtualTryon3 = _interopRequireDefault(_useVirtualTryon2);

var _useFaceAttribute2 = __webpack_require__(2417);

var _useFaceAttribute3 = _interopRequireDefault(_useFaceAttribute2);

var _useShadefinder2 = __webpack_require__(2422);

var _useShadefinder3 = _interopRequireDefault(_useShadefinder2);

var _useEyewearAutoPD2 = __webpack_require__(1990);

var _useEyewearAutoPD3 = _interopRequireDefault(_useEyewearAutoPD2);

var _useZoom2 = __webpack_require__(2466);

var _useZoom3 = _interopRequireDefault(_useZoom2);

var _useCompare2 = __webpack_require__(3569);

var _useCompare3 = _interopRequireDefault(_useCompare2);

var _useReset2 = __webpack_require__(2453);

var _useReset3 = _interopRequireDefault(_useReset2);

var _useFourWay2 = __webpack_require__(3570);

var _useFourWay3 = _interopRequireDefault(_useFourWay2);

var _useShare2 = __webpack_require__(2291);

var _useShare3 = _interopRequireDefault(_useShare2);

var _sourceloading = __webpack_require__(3571);

var _sourceloading2 = _interopRequireDefault(_sourceloading);

var _compare = __webpack_require__(2437);

var _compare2 = _interopRequireDefault(_compare);

var _emailsharingmodal = __webpack_require__(2298);

var _emailsharingmodal2 = _interopRequireDefault(_emailsharingmodal);

var _detecting = __webpack_require__(3573);

var _detecting2 = _interopRequireDefault(_detecting);

var _ActionButtonPanel = __webpack_require__(2193);

var _ActionButtonPanel2 = _interopRequireDefault(_ActionButtonPanel);

var _ShareMenuButton = __webpack_require__(2201);

var _ShareMenuButton2 = _interopRequireDefault(_ShareMenuButton);

var _capturebuttons = __webpack_require__(2441);

var _capturebuttons2 = _interopRequireDefault(_capturebuttons);

var _leftslider = __webpack_require__(2445);

var _leftslider2 = _interopRequireDefault(_leftslider);

var _flipcamera = __webpack_require__(2419);

var _flipcamera2 = _interopRequireDefault(_flipcamera);

var _backandclose = __webpack_require__(1016);

var _backandclose2 = _interopRequireDefault(_backandclose);

var _powered = __webpack_require__(677);

var _powered2 = _interopRequireDefault(_powered);

var _defer2 = __webpack_require__(997);

var _defer3 = _interopRequireDefault(_defer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function VirtualTryOn(props) {
  var page = props.page,
      settings = props.settings,
      emitter = props.emitter,
      changePage = props.changePage,
      a11yInitPageReaderDisabled = props.a11yInitPageReaderDisabled;

  var _useContext = (0, _react.useContext)(_context.EngineContext),
      loading = _useContext.loading,
      loaded = _useContext.loaded,
      engineType = _useContext.engineType,
      webcamType = _useContext.webcamType,
      paused = _useContext.paused,
      mediaSource = _useContext.mediaSource,
      apiLoadLive = _useContext.apiLoadLive;

  var isLivecam = engineType === _useLoadEngine.engineTypes.livecam;
  var isModelMode = engineType === _useLoadEngine.engineTypes.image && mediaSource === _useLoadEngine.mediaSources.choosemodel;
  var isVideoMode = isLivecam && webcamType !== _ymkWebSdkCore.WEBCAM_TYPES.webcam;
  var noLauncher = mediaSource === _useLoadEngine.mediaSources.api || apiLoadLive;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray3.default)(_useState, 2),
      shareMenuOpened = _useState2[0],
      setShareMenuOpened = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray3.default)(_useState3, 2),
      emailSharingModalOpened = _useState4[0],
      setEmailSharingModalOpened = _useState4[1];

  var _useVirtualTryon = (0, _useVirtualTryon3.default)({ settings: settings }),
      getA11yPageTitle = _useVirtualTryon.getA11yPageTitle;

  var _useFaceAttribute = (0, _useFaceAttribute3.default)({ settings: settings, emitter: emitter, changePage: changePage }),
      isFaceAttributeDetectionOnly = _useFaceAttribute.isFaceAttributeDetectionOnly,
      startFaceAttributeLiveDetecting = _useFaceAttribute.startLiveDetecting;

  var _useShadefinder = (0, _useShadefinder3.default)({ settings: settings, emitter: emitter, changePage: changePage }),
      isShadeFinderOnly = _useShadefinder.isShadeFinderOnly,
      startShadeDetecting = _useShadefinder.startDetecting;

  var _useEyewearAutoPD = (0, _useEyewearAutoPD3.default)({ settings: settings, emitter: emitter, changePage: changePage }),
      isEyewearAutoPD = _useEyewearAutoPD.isEyewearAutoPD,
      startEyewearAutoPDLiveDetecting = _useEyewearAutoPD.startLiveDetecting;

  var _useCompare = (0, _useCompare3.default)({ emitter: emitter, settings: settings, comparing: false }),
      comparing = _useCompare.comparing,
      canCompare = _useCompare.canCompare,
      onCompareClick = _useCompare.onCompareClick,
      onCompareOffClick = _useCompare.onCompareOffClick;

  var _useFourWay = (0, _useFourWay3.default)({ emitter: emitter, settings: settings, fourWayComparing: false }),
      fourWayComparing = _useFourWay.fourWayComparing,
      canFourWay = _useFourWay.canFourWay;

  var _useReset = (0, _useReset3.default)({ emitter: emitter, settings: settings, comparing: comparing }),
      canReset = _useReset.canReset,
      onResetClick = _useReset.onResetClick;

  var _useZoom = (0, _useZoom3.default)({ emitter: emitter, settings: settings, disabled: comparing }),
      resetZoomLevel = _useZoom.resetZoomLevel,
      canZoom = _useZoom.canZoom,
      canZoomIn = _useZoom.canZoomIn,
      canZoomOut = _useZoom.canZoomOut,
      onZoomInClick = _useZoom.onZoomInClick,
      onZoomOutClick = _useZoom.onZoomOutClick;

  var _useShare = (0, _useShare3.default)({ emitter: emitter, settings: settings, onUploadFail: function onUploadFail() {
      return changePage(_pages2.default.virtual_tryon);
    } }),
      uploading = _useShare.uploading,
      imageConverting = _useShare.converting,
      uploadedUrl = _useShare.uploadedUrl,
      saveCanvasThenUpload = _useShare.saveCanvasThenUpload,
      submitShare = _useShare.submitShare;

  var isRightButtonsHidden = function isRightButtonsHidden() {
    return isShadeFinderOnly() || isFaceAttributeDetectionOnly();
  };

  var openShareMenu = function openShareMenu() {
    setShareMenuOpened(true);
    if (!isLivecam || paused) {
      saveCanvasThenUpload();
    }
  };

  var closeShareMenu = function closeShareMenu() {
    return setShareMenuOpened(false);
  };

  var goCapture4Share = function goCapture4Share(target) {
    changePage(_pages2.default.capture_counting, {
      back: function back() {
        return changePage(_pages2.default.virtual_tryon);
      },
      callback: function callback() {
        return goSharePreview(target);
      }
    });
  };

  var goSharePreview = function goSharePreview(target) {
    changePage(_pages2.default.share_preview, {
      target: target,
      onClose: function onClose() {
        return changePage(_pages2.default.virtual_tryon);
      },
      onRetake: function onRetake() {
        return isVideoMode ? changePage(_pages2.default.virtual_tryon) : goCapture4Share(target);
      }
    });
  };

  var startSharing = function startSharing(target) {
    closeShareMenu();
    target === _useShare2.shareTargets.email ? openEmailSharingModal() : submitShare(target);
  };

  var openEmailSharingModal = function openEmailSharingModal() {
    return setEmailSharingModalOpened(true);
  };

  var closeEmailSharingModal = function closeEmailSharingModal() {
    return setEmailSharingModalOpened(false);
  };

  var onEmailSharingSubmit = function onEmailSharingSubmit(displayName, email) {
    submitShare(_useShare2.shareTargets.email, { displayName: displayName, email: email });
    closeEmailSharingModal();
  };

  var onShareIconClick = function onShareIconClick(target) {
    closeShareMenu();
    if (!isLivecam || paused) {
      startSharing(target);
      return;
    }
    if (isVideoMode) {
      emitter.trigger(_ymkWebSdkCore.events.pause);
      goSharePreview(target);
      return;
    }
    goCapture4Share(target);
  };

  var save = function save() {
    return new _promise2.default(function (resolve) {
      changePage(_pages2.default.save_preview, {
        callback: function callback() {
          changePage(_pages2.default.virtual_tryon);
          resolve();
        }
      });
    });
  };

  var onSaveClick = function onSaveClick() {
    closeShareMenu();
    if (!isLivecam || paused) {
      save();
      return;
    }
    changePage(_pages2.default.capture_counting, {
      back: function back() {
        return changePage(_pages2.default.virtual_tryon);
      },
      callback: function callback() {
        return save();
      }
    });
  };

  var onFourWayClick = function onFourWayClick() {
    return changePage(_pages2.default.fourway);
  };

  var getBack = function getBack() {
    if (comparing) {
      return {
        onBack: function onBack() {
          return emitter.trigger(_ymkWebSdkCore.events.compareOff);
        },
        backAriaLabel: settings.i18n.getMessageWithValues('a11y.label.back.to', { pageTitle: getA11yPageTitle() })
      };
    }
    if (isLivecam && paused && !settings.enablePauseAfterFaceAttributePredicted) {
      return {
        onBack: function onBack() {
          emitter.trigger(_ymkWebSdkCore.events.resume);
          (0, _defer3.default)(function () {
            return emitter.trigger(_ymkWebSdkCore.events.pageUpdated, [settings.i18n.getMessage('a11y.page.try.on.live')]);
          });
        },
        backAriaLabel: settings.i18n.getMessageWithValues('a11y.label.back.to', { pageTitle: settings.i18n.getMessage('a11y.page.try.on.live') })
      };
    }
    if (isLivecam && settings.getFunctionType() === _ymkWebSdkCore.functionTypes.faceattribute) {
      return {
        onBack: function onBack() {
          return startFaceAttributeLiveDetecting();
        },
        backAriaLabel: settings.i18n.getMessageWithValues('a11y.label.back.to', { pageTitle: settings.i18n.getMessage('a11y.page.face.detecting') })
      };
    }
    if (isLivecam && settings.getFunctionType() === _ymkWebSdkCore.functionTypes.shadefinder) {
      return {
        onBack: function onBack() {
          return startShadeDetecting();
        },
        backAriaLabel: settings.i18n.getMessageWithValues('a11y.label.back.to', { pageTitle: settings.i18n.getMessage('a11y.page.face.detecting') })
      };
    }
    if (isLivecam && isEyewearAutoPD()) {
      return {
        onBack: function onBack() {
          return startEyewearAutoPDLiveDetecting();
        },
        backAriaLabel: settings.i18n.getMessageWithValues('a11y.label.back.to', { pageTitle: settings.i18n.getMessage('a11y.page.face.detecting') })
      };
    }
    if (isModelMode) {
      return {
        onBack: function onBack() {
          emitter.trigger(_ymkWebSdkCore.events.closeEngine);
          changePage(_pages2.default.model_list);
        },
        backAriaLabel: settings.i18n.getMessageWithValues('a11y.label.back.to', { pageTitle: settings.i18n.getMessage('a11y.page.choose.model') })
      };
    }
    if (!noLauncher) {
      return {
        onBack: function onBack() {
          emitter.trigger(_ymkWebSdkCore.events.closeEngine);
          changePage(_pages2.default.launcher);
        },
        backAriaLabel: settings.i18n.getMessageWithValues('a11y.label.back.to', { pageTitle: settings.i18n.getMessage('a11y.page.launcher') })
      };
    }
    return {
      isBackDisabled: true
    };
  };

  (0, _react.useEffect)(function () {
    if (a11yInitPageReaderDisabled || loading || !loaded || !engineType || page !== _pages2.default.virtual_tryon) {
      return;
    }

    var t = setTimeout(function () {
      return emitter.trigger(_ymkWebSdkCore.events.pageUpdated, [getA11yPageTitle()]);
    }, 50);
    return function () {
      t && clearTimeout(t);
    };
  }, [engineType, webcamType, page, a11yInitPageReaderDisabled]);

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_compare2.default, { settings: settings, emitter: emitter, comparing: comparing }),
    page === _pages2.default.virtual_tryon && _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_emailsharingmodal2.default, { isOpen: emailSharingModalOpened, cancelCallback: closeEmailSharingModal, successCallback: onEmailSharingSubmit, settings: settings, emitter: emitter }),
      _react2.default.createElement(_sourceloading2.default, { settings: settings, emitter: emitter }),
      _react2.default.createElement(_detecting2.default, { settings: settings, emitter: emitter, disabled: emailSharingModalOpened }),
      !isRightButtonsHidden() && _react2.default.createElement(
        'div',
        { style: _styles2.default.rightButtons },
        _react2.default.createElement(_ActionButtonPanel2.default, {
          emitter: emitter,
          settings: settings,
          comparing: comparing,
          fourWayComparing: fourWayComparing,
          canReset: canReset(),
          canZoom: canZoom(),
          canCompare: canCompare(),
          canFourWay: canFourWay(),
          onResetClick: onResetClick,
          onZoomInClick: onZoomInClick,
          onZoomOutClick: onZoomOutClick,
          onCompareClick: onCompareClick,
          onCompareOffClick: onCompareOffClick,
          onFourWayClick: onFourWayClick,
          zoomInDisabled: !canZoomIn(),
          zoomOutDisabled: !canZoomOut(),
          compareDisabled: fourWayComparing,
          fourWayDisabled: comparing
        }),
        _react2.default.createElement(_ShareMenuButton2.default, {
          emitter: emitter,
          disabled: comparing,
          shareDisabled: uploading || imageConverting || uploadedUrl,
          settings: settings,
          opened: shareMenuOpened,
          openMenu: openShareMenu,
          closeMenu: closeShareMenu,
          onSavePhotoClick: onSaveClick,
          onEmailClick: function onEmailClick() {
            return onShareIconClick(_useShare2.shareTargets.email);
          },
          onSMSClick: function onSMSClick() {
            return onShareIconClick(_useShare2.shareTargets.sms);
          },
          onWeiboClick: function onWeiboClick() {
            return onShareIconClick(_useShare2.shareTargets.weibo);
          },
          onPinterestClick: function onPinterestClick() {
            return onShareIconClick(_useShare2.shareTargets.pinterest);
          },
          onTwitterClick: function onTwitterClick() {
            return onShareIconClick(_useShare2.shareTargets.twitter);
          },
          onWhatsAppClick: function onWhatsAppClick() {
            return onShareIconClick(_useShare2.shareTargets.whatsapp);
          },
          onFBClick: function onFBClick() {
            return onShareIconClick(_useShare2.shareTargets.fb);
          }
        })
      ),
      _react2.default.createElement(_capturebuttons2.default, { settings: settings, emitter: emitter, hidden: comparing || shareMenuOpened, changePage: changePage, resetZoomLevel: resetZoomLevel }),
      _react2.default.createElement(_leftslider2.default, { settings: settings, emitter: emitter, changePage: changePage }),
      !comparing && _react2.default.createElement(_flipcamera2.default, { emitter: emitter, settings: settings }),
      _react2.default.createElement(_backandclose2.default, (0, _extends3.default)({ key: 'vto-backandclose', settings: settings, emitter: emitter }, getBack())),
      !comparing && _react2.default.createElement(_powered2.default, { key: 'powered', settings: settings })
    )
  );
}
module.exports = exports['default'];

/***/ }),

/***/ 3569:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(72);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = useCompare;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _ymkWebSdkCore = __webpack_require__(112);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useCompare(props) {
  var emitter = props.emitter,
      settings = props.settings,
      _props$comparing = props.comparing,
      defaultComparing = _props$comparing === undefined ? false : _props$comparing;

  var _useState = (0, _react.useState)(defaultComparing),
      _useState2 = (0, _slicedToArray3.default)(_useState, 2),
      comparing = _useState2[0],
      setComparing = _useState2[1];

  var handleCompareEnabled = function handleCompareEnabled() {
    return setComparing(true);
  };

  var handleCompareDisabled = function handleCompareDisabled() {
    return setComparing(false);
  };

  var canCompare = function canCompare() {
    return true;
  };

  var onCompareClick = function onCompareClick() {
    if (!canCompare()) {
      return;
    }
    emitter.trigger(_ymkWebSdkCore.events.compare);
    emitter.trigger(_ymkWebSdkCore.events.a11yMessage, [settings.i18n.getMessage('a11y.label.compare.mode.started')]);
  };

  var onCompareOffClick = function onCompareOffClick() {
    if (!canCompare()) {
      return;
    }
    emitter.trigger(_ymkWebSdkCore.events.compareOff);
    emitter.trigger(_ymkWebSdkCore.events.a11yMessage, [settings.i18n.getMessage('a11y.label.compare.mode.ended')]);
  };

  (0, _react.useEffect)(function () {
    emitter.on(_ymkWebSdkCore.events.compare, handleCompareEnabled);
    emitter.on(_ymkWebSdkCore.events.compareOff, handleCompareDisabled);

    return function () {
      emitter.off(_ymkWebSdkCore.events.compare, handleCompareEnabled);
      emitter.off(_ymkWebSdkCore.events.compareOff, handleCompareDisabled);
    };
  }, []);

  return {
    comparing: comparing,
    canCompare: canCompare,
    onCompareClick: onCompareClick,
    onCompareOffClick: onCompareOffClick
  };
}
module.exports = exports['default'];

/***/ }),

/***/ 3570:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(72);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = useFourWay;

var _react = __webpack_require__(459);

var _ymkWebSdkCore = __webpack_require__(112);

var _context = __webpack_require__(567);

var _useLoadEngine = __webpack_require__(629);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useFourWay(props) {
  var emitter = props.emitter,
      settings = props.settings,
      _props$fourWayCompari = props.fourWayComparing,
      defaultFourWayComparing = _props$fourWayCompari === undefined ? false : _props$fourWayCompari;

  var _useContext = (0, _react.useContext)(_context.EngineContext),
      engineType = _useContext.engineType,
      paused = _useContext.paused;

  var isLivecam = engineType === _useLoadEngine.engineTypes.livecam;

  var _useState = (0, _react.useState)(defaultFourWayComparing),
      _useState2 = (0, _slicedToArray3.default)(_useState, 2),
      fourWayComparing = _useState2[0],
      setFourWayComparing = _useState2[1];

  var handleFourWayCompare = function handleFourWayCompare() {
    return canFourWay() && setFourWayComparing(true);
  };

  var handleFourWayCompareOff = function handleFourWayCompareOff() {
    return canFourWay() && setFourWayComparing(false);
  };

  var canFourWay = function canFourWay() {
    if (!settings.enableFourWayLooks) {
      return false;
    }
    if (paused) {
      return true;
    }
    if (settings.features.fourway || settings.features.handar) {
      return true;
    }
    return !isLivecam;
  };

  (0, _react.useEffect)(function () {
    emitter.on(_ymkWebSdkCore.events.splitFourWay, handleFourWayCompare);
    emitter.on(_ymkWebSdkCore.events.splitFourWayOff, handleFourWayCompareOff);

    return function () {
      emitter.on(_ymkWebSdkCore.events.splitFourWay, handleFourWayCompare);
      emitter.on(_ymkWebSdkCore.events.splitFourWayOff, handleFourWayCompareOff);
    };
  }, []);

  return {
    fourWayComparing: fourWayComparing,
    canFourWay: canFourWay
  };
}
module.exports = exports['default'];

/***/ }),

/***/ 3571:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = __webpack_require__(72);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = SourceLoading;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _styles = __webpack_require__(3572);

var _styles2 = _interopRequireDefault(_styles);

var _ymkWebSdkCore = __webpack_require__(112);

var _apngCanvas = __webpack_require__(2047);

var _apngCanvas2 = _interopRequireDefault(_apngCanvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SourceLoading(props) {
  var settings = props.settings,
      emitter = props.emitter;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray3.default)(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  var imgRef = (0, _react.useRef)(null);

  var loadApngIfUnsupported = function loadApngIfUnsupported() {
    if (_ymkWebSdkCore.browserUtils.isIOs() && _ymkWebSdkCore.browserUtils.isIOsVersionUnder12()) {
      imgRef.current && _apngCanvas2.default.animateImage(imgRef.current);
    } else {
      _apngCanvas2.default.ifNeeded().then(function () {
        imgRef.current && _apngCanvas2.default.animateImage(imgRef.current);
      });
    }
  };

  var show = function show() {
    return setVisible(true);
  };

  var hide = function hide() {
    return setVisible(false);
  };

  (0, _react.useEffect)(function () {
    loadApngIfUnsupported();

    emitter.on(_ymkWebSdkCore.events.object3DLoading, show);
    emitter.on(_ymkWebSdkCore.events.object3DLoaded, hide);
    return function () {
      emitter.off(_ymkWebSdkCore.events.object3DLoading, show);
      emitter.off(_ymkWebSdkCore.events.object3DLoaded, hide);
    };
  }, []);

  if (settings.disableObject3DLoader) {
    return false;
  }
  return _react2.default.createElement('img', { ref: imgRef, alt: 'loading source', style: visible ? _styles2.default.image : (0, _extends3.default)({}, _styles2.default.image, { width: 0, height: 0, visibility: 'hidden' }), src: __webpack_require__(2467) });
}
module.exports = exports['default'];

/***/ }),

/***/ 3572:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  image: {
    width: '50px',
    position: 'absolute',
    zIndex: 5,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 3573:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Detecting;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _context = __webpack_require__(567);

var _ymkWebSdkCore = __webpack_require__(112);

var _async = __webpack_require__(3574);

var _async2 = _interopRequireDefault(_async);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Detecting(props) {
  var settings = props.settings,
      emitter = props.emitter,
      disabled = props.disabled;

  var _useContext = (0, _react.useContext)(_context.EngineContext),
      engineType = _useContext.engineType,
      webcamType = _useContext.webcamType,
      paused = _useContext.paused;

  var isLivecam = engineType === _ymkWebSdkCore.engineTypes.livecam;

  var canShowHint = function canShowHint() {
    return isLivecam && webcamType === _ymkWebSdkCore.WEBCAM_TYPES.webcam && !paused;
  };

  var canShowToast = function canShowToast() {
    return engineType === _ymkWebSdkCore.engineTypes.image || paused;
  };

  if (disabled) {
    return false;
  }
  return _react2.default.createElement(_async2.default, { hintEnabled: canShowHint(), toastEnabled: canShowToast(), settings: settings, emitter: emitter });
}
module.exports = exports['default'];

/***/ }),

/***/ 3574:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactAsyncComponent = __webpack_require__(550);

exports.default = (0, _reactAsyncComponent.asyncComponent)({
  resolve: function resolve() {
    return __webpack_require__.e/* import() */(67).then(__webpack_require__.bind(null, 3575));
  }
});
module.exports = exports['default'];

/***/ }),

/***/ 627:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return classNames;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ }),

/***/ 680:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__propertyUtils__ = __webpack_require__(2258);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };



var RE_NUM = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source;

var getComputedStyleX = void 0;

function force(x, y) {
  return x + y;
}

function css(el, name, v) {
  var value = v;
  if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') {
    for (var i in name) {
      if (name.hasOwnProperty(i)) {
        css(el, i, name[i]);
      }
    }
    return undefined;
  }
  if (typeof value !== 'undefined') {
    if (typeof value === 'number') {
      value = value + 'px';
    }
    el.style[name] = value;
    return undefined;
  }
  return getComputedStyleX(el, name);
}

function getClientPosition(elem) {
  var box = void 0;
  var x = void 0;
  var y = void 0;
  var doc = elem.ownerDocument;
  var body = doc.body;
  var docElem = doc && doc.documentElement;
  // 根据 GBS 最新数据，A-Grade Browsers 都已支持 getBoundingClientRect 方法，不用再考虑传统的实现方式
  box = elem.getBoundingClientRect();

  // 注：jQuery 还考虑减去 docElem.clientLeft/clientTop
  // 但测试发现，这样反而会导致当 html 和 body 有边距/边框样式时，获取的值不正确
  // 此外，ie6 会忽略 html 的 margin 值，幸运地是没有谁会去设置 html 的 margin

  x = box.left;
  y = box.top;

  // In IE, most of the time, 2 extra pixels are added to the top and left
  // due to the implicit 2-pixel inset border.  In IE6/7 quirks mode and
  // IE6 standards mode, this border can be overridden by setting the
  // document element's border to zero -- thus, we cannot rely on the
  // offset always being 2 pixels.

  // In quirks mode, the offset can be determined by querying the body's
  // clientLeft/clientTop, but in standards mode, it is found by querying
  // the document element's clientLeft/clientTop.  Since we already called
  // getClientBoundingRect we have already forced a reflow, so it is not
  // too expensive just to query them all.

  // ie 下应该减去窗口的边框吧，毕竟默认 absolute 都是相对窗口定位的
  // 窗口边框标准是设 documentElement ,quirks 时设置 body
  // 最好禁止在 body 和 html 上边框 ，但 ie < 9 html 默认有 2px ，减去
  // 但是非 ie 不可能设置窗口边框，body html 也不是窗口 ,ie 可以通过 html,body 设置
  // 标准 ie 下 docElem.clientTop 就是 border-top
  // ie7 html 即窗口边框改变不了。永远为 2
  // 但标准 firefox/chrome/ie9 下 docElem.clientTop 是窗口边框，即使设了 border-top 也为 0

  x -= docElem.clientLeft || body.clientLeft || 0;
  y -= docElem.clientTop || body.clientTop || 0;

  return {
    left: x,
    top: y
  };
}

function getScroll(w, top) {
  var ret = w['page' + (top ? 'Y' : 'X') + 'Offset'];
  var method = 'scroll' + (top ? 'Top' : 'Left');
  if (typeof ret !== 'number') {
    var d = w.document;
    // ie6,7,8 standard mode
    ret = d.documentElement[method];
    if (typeof ret !== 'number') {
      // quirks mode
      ret = d.body[method];
    }
  }
  return ret;
}

function getScrollLeft(w) {
  return getScroll(w);
}

function getScrollTop(w) {
  return getScroll(w, true);
}

function getOffset(el) {
  var pos = getClientPosition(el);
  var doc = el.ownerDocument;
  var w = doc.defaultView || doc.parentWindow;
  pos.left += getScrollLeft(w);
  pos.top += getScrollTop(w);
  return pos;
}

/**
 * A crude way of determining if an object is a window
 * @member util
 */
function isWindow(obj) {
  // must use == for ie8
  /* eslint eqeqeq:0 */
  return obj !== null && obj !== undefined && obj == obj.window;
}

function getDocument(node) {
  if (isWindow(node)) {
    return node.document;
  }
  if (node.nodeType === 9) {
    return node;
  }
  return node.ownerDocument;
}

function _getComputedStyle(elem, name, cs) {
  var computedStyle = cs;
  var val = '';
  var d = getDocument(elem);
  computedStyle = computedStyle || d.defaultView.getComputedStyle(elem, null);

  // https://github.com/kissyteam/kissy/issues/61
  if (computedStyle) {
    val = computedStyle.getPropertyValue(name) || computedStyle[name];
  }

  return val;
}

var _RE_NUM_NO_PX = new RegExp('^(' + RE_NUM + ')(?!px)[a-z%]+$', 'i');
var RE_POS = /^(top|right|bottom|left)$/;
var CURRENT_STYLE = 'currentStyle';
var RUNTIME_STYLE = 'runtimeStyle';
var LEFT = 'left';
var PX = 'px';

function _getComputedStyleIE(elem, name) {
  // currentStyle maybe null
  // http://msdn.microsoft.com/en-us/library/ms535231.aspx
  var ret = elem[CURRENT_STYLE] && elem[CURRENT_STYLE][name];

  // 当 width/height 设置为百分比时，通过 pixelLeft 方式转换的 width/height 值
  // 一开始就处理了! CUSTOM_STYLE.height,CUSTOM_STYLE.width ,cssHook 解决@2011-08-19
  // 在 ie 下不对，需要直接用 offset 方式
  // borderWidth 等值也有问题，但考虑到 borderWidth 设为百分比的概率很小，这里就不考虑了

  // From the awesome hack by Dean Edwards
  // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291
  // If we're not dealing with a regular pixel number
  // but a number that has a weird ending, we need to convert it to pixels
  // exclude left right for relativity
  if (_RE_NUM_NO_PX.test(ret) && !RE_POS.test(name)) {
    // Remember the original values
    var style = elem.style;
    var left = style[LEFT];
    var rsLeft = elem[RUNTIME_STYLE][LEFT];

    // prevent flashing of content
    elem[RUNTIME_STYLE][LEFT] = elem[CURRENT_STYLE][LEFT];

    // Put in the new values to get a computed value out
    style[LEFT] = name === 'fontSize' ? '1em' : ret || 0;
    ret = style.pixelLeft + PX;

    // Revert the changed values
    style[LEFT] = left;

    elem[RUNTIME_STYLE][LEFT] = rsLeft;
  }
  return ret === '' ? 'auto' : ret;
}

if (typeof window !== 'undefined') {
  getComputedStyleX = window.getComputedStyle ? _getComputedStyle : _getComputedStyleIE;
}

function getOffsetDirection(dir, option) {
  if (dir === 'left') {
    return option.useCssRight ? 'right' : dir;
  }
  return option.useCssBottom ? 'bottom' : dir;
}

function oppositeOffsetDirection(dir) {
  if (dir === 'left') {
    return 'right';
  } else if (dir === 'right') {
    return 'left';
  } else if (dir === 'top') {
    return 'bottom';
  } else if (dir === 'bottom') {
    return 'top';
  }
}

// 设置 elem 相对 elem.ownerDocument 的坐标
function setLeftTop(elem, offset, option) {
  // set position first, in-case top/left are set even on static elem
  if (css(elem, 'position') === 'static') {
    elem.style.position = 'relative';
  }
  var presetH = -999;
  var presetV = -999;
  var horizontalProperty = getOffsetDirection('left', option);
  var verticalProperty = getOffsetDirection('top', option);
  var oppositeHorizontalProperty = oppositeOffsetDirection(horizontalProperty);
  var oppositeVerticalProperty = oppositeOffsetDirection(verticalProperty);

  if (horizontalProperty !== 'left') {
    presetH = 999;
  }

  if (verticalProperty !== 'top') {
    presetV = 999;
  }
  var originalTransition = '';
  var originalOffset = getOffset(elem);
  if ('left' in offset || 'top' in offset) {
    originalTransition = Object(__WEBPACK_IMPORTED_MODULE_0__propertyUtils__["c" /* getTransitionProperty */])(elem) || '';
    Object(__WEBPACK_IMPORTED_MODULE_0__propertyUtils__["e" /* setTransitionProperty */])(elem, 'none');
  }
  if ('left' in offset) {
    elem.style[oppositeHorizontalProperty] = '';
    elem.style[horizontalProperty] = presetH + 'px';
  }
  if ('top' in offset) {
    elem.style[oppositeVerticalProperty] = '';
    elem.style[verticalProperty] = presetV + 'px';
  }
  var old = getOffset(elem);
  var originalStyle = {};
  for (var key in offset) {
    if (offset.hasOwnProperty(key)) {
      var dir = getOffsetDirection(key, option);
      var preset = key === 'left' ? presetH : presetV;
      var off = originalOffset[key] - old[key];
      if (dir === key) {
        originalStyle[dir] = preset + off;
      } else {
        originalStyle[dir] = preset - off;
      }
    }
  }
  css(elem, originalStyle);
  // force relayout
  force(elem.offsetTop, elem.offsetLeft);
  if ('left' in offset || 'top' in offset) {
    Object(__WEBPACK_IMPORTED_MODULE_0__propertyUtils__["e" /* setTransitionProperty */])(elem, originalTransition);
  }
  var ret = {};
  for (var _key in offset) {
    if (offset.hasOwnProperty(_key)) {
      var _dir = getOffsetDirection(_key, option);
      var _off = offset[_key] - originalOffset[_key];
      if (_key === _dir) {
        ret[_dir] = originalStyle[_dir] + _off;
      } else {
        ret[_dir] = originalStyle[_dir] - _off;
      }
    }
  }
  css(elem, ret);
}

function setTransform(elem, offset) {
  var originalOffset = getOffset(elem);
  var originalXY = Object(__WEBPACK_IMPORTED_MODULE_0__propertyUtils__["b" /* getTransformXY */])(elem);
  var resultXY = { x: originalXY.x, y: originalXY.y };
  if ('left' in offset) {
    resultXY.x = originalXY.x + offset.left - originalOffset.left;
  }
  if ('top' in offset) {
    resultXY.y = originalXY.y + offset.top - originalOffset.top;
  }
  Object(__WEBPACK_IMPORTED_MODULE_0__propertyUtils__["d" /* setTransformXY */])(elem, resultXY);
}

function setOffset(elem, offset, option) {
  if (option.useCssRight || option.useCssBottom) {
    setLeftTop(elem, offset, option);
  } else if (option.useCssTransform && Object(__WEBPACK_IMPORTED_MODULE_0__propertyUtils__["a" /* getTransformName */])() in document.body.style) {
    setTransform(elem, offset, option);
  } else {
    setLeftTop(elem, offset, option);
  }
}

function each(arr, fn) {
  for (var i = 0; i < arr.length; i++) {
    fn(arr[i]);
  }
}

function isBorderBoxFn(elem) {
  return getComputedStyleX(elem, 'boxSizing') === 'border-box';
}

var BOX_MODELS = ['margin', 'border', 'padding'];
var CONTENT_INDEX = -1;
var PADDING_INDEX = 2;
var BORDER_INDEX = 1;
var MARGIN_INDEX = 0;

function swap(elem, options, callback) {
  var old = {};
  var style = elem.style;
  var name = void 0;

  // Remember the old values, and insert the new ones
  for (name in options) {
    if (options.hasOwnProperty(name)) {
      old[name] = style[name];
      style[name] = options[name];
    }
  }

  callback.call(elem);

  // Revert the old values
  for (name in options) {
    if (options.hasOwnProperty(name)) {
      style[name] = old[name];
    }
  }
}

function getPBMWidth(elem, props, which) {
  var value = 0;
  var prop = void 0;
  var j = void 0;
  var i = void 0;
  for (j = 0; j < props.length; j++) {
    prop = props[j];
    if (prop) {
      for (i = 0; i < which.length; i++) {
        var cssProp = void 0;
        if (prop === 'border') {
          cssProp = '' + prop + which[i] + 'Width';
        } else {
          cssProp = prop + which[i];
        }
        value += parseFloat(getComputedStyleX(elem, cssProp)) || 0;
      }
    }
  }
  return value;
}

var domUtils = {};

each(['Width', 'Height'], function (name) {
  domUtils['doc' + name] = function (refWin) {
    var d = refWin.document;
    return Math.max(
    // firefox chrome documentElement.scrollHeight< body.scrollHeight
    // ie standard mode : documentElement.scrollHeight> body.scrollHeight
    d.documentElement['scroll' + name],
    // quirks : documentElement.scrollHeight 最大等于可视窗口多一点？
    d.body['scroll' + name], domUtils['viewport' + name](d));
  };

  domUtils['viewport' + name] = function (win) {
    // pc browser includes scrollbar in window.innerWidth
    var prop = 'client' + name;
    var doc = win.document;
    var body = doc.body;
    var documentElement = doc.documentElement;
    var documentElementProp = documentElement[prop];
    // 标准模式取 documentElement
    // backcompat 取 body
    return doc.compatMode === 'CSS1Compat' && documentElementProp || body && body[prop] || documentElementProp;
  };
});

/*
 得到元素的大小信息
 @param elem
 @param name
 @param {String} [extra]  'padding' : (css width) + padding
 'border' : (css width) + padding + border
 'margin' : (css width) + padding + border + margin
 */
function getWH(elem, name, ex) {
  var extra = ex;
  if (isWindow(elem)) {
    return name === 'width' ? domUtils.viewportWidth(elem) : domUtils.viewportHeight(elem);
  } else if (elem.nodeType === 9) {
    return name === 'width' ? domUtils.docWidth(elem) : domUtils.docHeight(elem);
  }
  var which = name === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'];
  var borderBoxValue = name === 'width' ? elem.getBoundingClientRect().width : elem.getBoundingClientRect().height;
  var computedStyle = getComputedStyleX(elem);
  var isBorderBox = isBorderBoxFn(elem, computedStyle);
  var cssBoxValue = 0;
  if (borderBoxValue === null || borderBoxValue === undefined || borderBoxValue <= 0) {
    borderBoxValue = undefined;
    // Fall back to computed then un computed css if necessary
    cssBoxValue = getComputedStyleX(elem, name);
    if (cssBoxValue === null || cssBoxValue === undefined || Number(cssBoxValue) < 0) {
      cssBoxValue = elem.style[name] || 0;
    }
    // Normalize '', auto, and prepare for extra
    cssBoxValue = parseFloat(cssBoxValue) || 0;
  }
  if (extra === undefined) {
    extra = isBorderBox ? BORDER_INDEX : CONTENT_INDEX;
  }
  var borderBoxValueOrIsBorderBox = borderBoxValue !== undefined || isBorderBox;
  var val = borderBoxValue || cssBoxValue;
  if (extra === CONTENT_INDEX) {
    if (borderBoxValueOrIsBorderBox) {
      return val - getPBMWidth(elem, ['border', 'padding'], which, computedStyle);
    }
    return cssBoxValue;
  } else if (borderBoxValueOrIsBorderBox) {
    if (extra === BORDER_INDEX) {
      return val;
    }
    return val + (extra === PADDING_INDEX ? -getPBMWidth(elem, ['border'], which, computedStyle) : getPBMWidth(elem, ['margin'], which, computedStyle));
  }
  return cssBoxValue + getPBMWidth(elem, BOX_MODELS.slice(extra), which, computedStyle);
}

var cssShow = {
  position: 'absolute',
  visibility: 'hidden',
  display: 'block'
};

// fix #119 : https://github.com/kissyteam/kissy/issues/119
function getWHIgnoreDisplay() {
  for (var _len = arguments.length, args = Array(_len), _key2 = 0; _key2 < _len; _key2++) {
    args[_key2] = arguments[_key2];
  }

  var val = void 0;
  var elem = args[0];
  // in case elem is window
  // elem.offsetWidth === undefined
  if (elem.offsetWidth !== 0) {
    val = getWH.apply(undefined, args);
  } else {
    swap(elem, cssShow, function () {
      val = getWH.apply(undefined, args);
    });
  }
  return val;
}

each(['width', 'height'], function (name) {
  var first = name.charAt(0).toUpperCase() + name.slice(1);
  domUtils['outer' + first] = function (el, includeMargin) {
    return el && getWHIgnoreDisplay(el, name, includeMargin ? MARGIN_INDEX : BORDER_INDEX);
  };
  var which = name === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'];

  domUtils[name] = function (elem, v) {
    var val = v;
    if (val !== undefined) {
      if (elem) {
        var computedStyle = getComputedStyleX(elem);
        var isBorderBox = isBorderBoxFn(elem);
        if (isBorderBox) {
          val += getPBMWidth(elem, ['padding', 'border'], which, computedStyle);
        }
        return css(elem, name, val);
      }
      return undefined;
    }
    return elem && getWHIgnoreDisplay(elem, name, CONTENT_INDEX);
  };
});

function mix(to, from) {
  for (var i in from) {
    if (from.hasOwnProperty(i)) {
      to[i] = from[i];
    }
  }
  return to;
}

var utils = {
  getWindow: function getWindow(node) {
    if (node && node.document && node.setTimeout) {
      return node;
    }
    var doc = node.ownerDocument || node;
    return doc.defaultView || doc.parentWindow;
  },

  getDocument: getDocument,
  offset: function offset(el, value, option) {
    if (typeof value !== 'undefined') {
      setOffset(el, value, option || {});
    } else {
      return getOffset(el);
    }
  },

  isWindow: isWindow,
  each: each,
  css: css,
  clone: function clone(obj) {
    var i = void 0;
    var ret = {};
    for (i in obj) {
      if (obj.hasOwnProperty(i)) {
        ret[i] = obj[i];
      }
    }
    var overflow = obj.overflow;
    if (overflow) {
      for (i in obj) {
        if (obj.hasOwnProperty(i)) {
          ret.overflow[i] = obj.overflow[i];
        }
      }
    }
    return ret;
  },

  mix: mix,
  getWindowScrollLeft: function getWindowScrollLeft(w) {
    return getScrollLeft(w);
  },
  getWindowScrollTop: function getWindowScrollTop(w) {
    return getScrollTop(w);
  },
  merge: function merge() {
    var ret = {};

    for (var _len2 = arguments.length, args = Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
      args[_key3] = arguments[_key3];
    }

    for (var i = 0; i < args.length; i++) {
      utils.mix(ret, args[i]);
    }
    return ret;
  },

  viewportWidth: 0,
  viewportHeight: 0
};

mix(utils, domUtils);

/* harmony default export */ __webpack_exports__["a"] = (utils);

/***/ }),

/***/ 954:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = __webpack_require__(115);

var _stringify2 = _interopRequireDefault(_stringify);

var _ymkWebSdkCore = __webpack_require__(112);

var _replace2 = __webpack_require__(119);

var _replace3 = _interopRequireDefault(_replace2);

var _isUndefined2 = __webpack_require__(52);

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sendMail = _ymkWebSdkCore.dao.sendMail;


var shareUtils = {
  isFBEnabled: function isFBEnabled(settings) {
    return settings.enableFBSharing && window && window.FB;
  },
  isWeiboEnabled: function isWeiboEnabled(settings) {
    return settings.enableWeiboSharing;
  },
  isTwitterEnabled: function isTwitterEnabled(settings) {
    return settings.enableTwitterSharing;
  },
  isWhatsAppEnabled: function isWhatsAppEnabled(settings) {
    return settings.enableWhatsAppSharing && _ymkWebSdkCore.browserUtils.isMobile();
  },
  isPinterestEnabled: function isPinterestEnabled(settings) {
    return settings.enablePinterestSharing;
  },
  isSMSEnabled: function isSMSEnabled(settings) {
    return settings.enableSMSSharing && _ymkWebSdkCore.browserUtils.isMobile();
  },
  isEmailEnabled: function isEmailEnabled(settings) {
    return settings.enableEmailSharing;
  },
  submitShareViaEmail: function submitShareViaEmail(emitter, type, settings, uploaded, displayName, email, callback) {
    emitter.trigger(_ymkWebSdkCore.events.shareViaEmail, [type]);
    sendMail(_ymkWebSdkCore.browserUtils.getApiKey(document), uploaded, displayName, email, location.href).then(function () {
      emitter.trigger(_ymkWebSdkCore.events.toastMessage, [settings.i18n.getMessage('mail.sent.successfully'), 'success', 'toast', 5000]);
      emitter.trigger(_ymkWebSdkCore.events.shareViaEmailSuccess, [type]);
    }).catch(function () {
      emitter.trigger(_ymkWebSdkCore.events.toastMessage, [settings.i18n.getMessage('mail.sent.failure'), 'error', 'toast', 5000]);
      emitter.trigger(_ymkWebSdkCore.events.shareViaEmailFailure, [type]);
    });
    callback && callback();
  },
  submitShareToWeibo: function submitShareToWeibo(emitter, type, settings, uploadedUrl) {
    if (!uploadedUrl) {
      return;
    }
    emitter.trigger(_ymkWebSdkCore.events.shareToWeibo, [type]);
    var url = 'http://service.weibo.com/share/share.php?url=' + encodeURIComponent(location.href) + '&title=' + encodeURIComponent(settings.i18n.getMessage('fb.share.title')) + '&pic=' + encodeURIComponent((0, _replace3.default)(uploadedUrl, 'https://', 'http://'));
    window.open(url, '_blank');
  },
  submitShareToTwitter: function submitShareToTwitter(emitter, type, settings, twitterCardUrl) {
    if (!twitterCardUrl) {
      return;
    }
    emitter.trigger(_ymkWebSdkCore.events.shareToTwitter, [type]);
    var url = 'https://twitter.com/share?text=text goes here&url=' + encodeURIComponent(twitterCardUrl);
    window.open(url, '_blank');
  },
  submitShareToWhatsApp: function submitShareToWhatsApp(emitter, type, settings, twitterCardUrl) {
    if (!twitterCardUrl) {
      return;
    }
    emitter.trigger(_ymkWebSdkCore.events.shareToWhatsApp, [type]);
    var url = 'https://wa.me/?text=text goes here ' + encodeURIComponent(twitterCardUrl);
    window.open(url, '_blank');
  },
  submitShareToFB: function submitShareToFB(emitter, type, settings, uploadedUrl, twitterCardUrl) {
    if (!uploadedUrl || !twitterCardUrl) {
      return;
    }
    emitter.trigger(_ymkWebSdkCore.events.shareToFB, [type]);
    window && window.FB && window.FB.ui({
      method: 'share_open_graph',
      action_type: 'og.shares',
      action_properties: (0, _stringify2.default)({
        object: twitterCardUrl
      })
    }, function (r) {
      if ((0, _isUndefined3.default)(r)) {
        emitter.trigger(_ymkWebSdkCore.events.shareToFBCancel, [type]);
      } else {
        emitter.trigger(_ymkWebSdkCore.events.shareToFBSuccess, [type]);
      }
    });
  },
  submitShareToPinterest: function submitShareToPinterest(emitter, type, settings, uploadedUrl) {
    if (!uploadedUrl) {
      return;
    }
    emitter.trigger(_ymkWebSdkCore.events.shareToPinterest, [type]);
    var caption = settings.i18n.getMessage('fb.share.title');
    var shareUrl = location.href;
    var url = 'https://pinterest.com/pin/create/link/?url=' + encodeURIComponent(shareUrl) + '&media=' + encodeURIComponent(uploadedUrl) + '&description=' + encodeURIComponent(caption);
    window.open(url, '_blank');
  },
  submitShareToSMS: function submitShareToSMS(emitter, type, settings, uploadedUrl) {
    if (!uploadedUrl) {
      return;
    }
    if (_ymkWebSdkCore.browserUtils.isIOs()) {
      emitter.trigger(_ymkWebSdkCore.events.shareToSMS, [type]);
      var url = 'sms:&body=' + location.href;
      window.open(url, '_blank');
    }
    if (_ymkWebSdkCore.browserUtils.isAndroid()) {
      emitter.trigger(_ymkWebSdkCore.events.shareToSMS, [type]);
      var _url = 'sms:?body=' + location.href;
      window.open(_url, '_blank');
    }
  }
};

exports.default = shareUtils;
module.exports = exports['default'];

/***/ }),

/***/ 955:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(2236)();
}


/***/ }),

/***/ 976:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BUTTON = {
  position: 'fixed',
  zIndex: 5,
  height: '42px',
  width: '42px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  borderRadius: '50%',
  backgroundColor: 'transparent',
  border: '1px solid transparent'
};

var ICON = {
  width: '26px'
};

exports.default = {
  mainButton: (0, _extends3.default)({}, BUTTON),
  mainButtonIcon: (0, _extends3.default)({}, ICON),
  mainButtonLabel: {
    top: '-40px',
    left: '50%',
    transform: 'translateX(-50%)'
  },
  subButton: (0, _extends3.default)({}, BUTTON, {
    marginLeft: '62px'
  }),
  subButtonIcon: (0, _extends3.default)({}, ICON, {
    border: '1px solid transparent',
    backgroundColor: 'transparent'
  }),
  positionBottom: {
    bottom: '33px'
  },
  positionTop: {
    top: '46px'
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 998:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  iconButton: {
    width: '34px',
    height: '34px',
    margin: '6px 5px',
    zIndex: 2,
    display: 'block',
    cursor: 'pointer',
    border: '2px solid transparent',
    padding: '2px',
    backgroundColor: 'rgba(239, 63, 120, 1)',
    borderRadius: '50%'
  },
  icon: {
    width: '100%',
    height: '100%'
  },
  menuButton: {
    width: '34px',
    height: '34px',
    margin: '0',
    zIndex: 2,
    float: 'left',
    cursor: 'pointer',
    border: '2px solid transparent',
    padding: '2px',
    backgroundColor: 'transparent'
  },
  expandedMenu: {
    marginRight: '5px',
    width: '126px',
    height: '34px',
    marginTop: '2px',
    float: 'right',
    backgroundColor: 'rgba(239, 63, 120, 1)',
    borderRadius: '20px',
    border: '2px solid transparent'
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 999:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

exports.default = MainButton;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _styles = __webpack_require__(976);

var _styles2 = _interopRequireDefault(_styles);

var _progresscircle = __webpack_require__(1939);

var _progresscircle2 = _interopRequireDefault(_progresscircle);

var _ScreenText = __webpack_require__(2027);

var _ScreenText2 = _interopRequireDefault(_ScreenText);

var _image = __webpack_require__(624);

var _image2 = _interopRequireDefault(_image);

var _get2 = __webpack_require__(3);

var _get3 = _interopRequireDefault(_get2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MainButton(props) {
  var id = props.id,
      ariaLabel = props.ariaLabel,
      style = props.style,
      onClick = props.onClick,
      icon = props.icon,
      alt = props.alt,
      iconStyle = props.iconStyle,
      _props$position = props.position,
      position = _props$position === undefined ? 'bottom' : _props$position,
      enableProgress = props.enableProgress,
      progress = props.progress,
      trackColor = props.trackColor,
      fillColor = props.fillColor,
      transitionDuration = props.transitionDuration,
      label = props.label,
      labelId = props.labelId,
      settings = props.settings;


  var getStyle = function getStyle() {
    if (position === 'top') {
      return (0, _extends3.default)({}, _styles2.default.mainButton, _styles2.default.positionTop, style);
    }
    return (0, _extends3.default)({}, _styles2.default.mainButton, _styles2.default.positionBottom, style);
  };

  var getButtonStyle = function getButtonStyle() {
    return enableProgress ? (0, _extends3.default)({}, getStyle(), { border: 'none' }) : getStyle();
  };

  var getBorderRadius = function getBorderRadius() {
    return (0, _get3.default)(getStyle(), 'borderRadius', '50%');
  };

  var getLabelStyles = function getLabelStyles() {
    return { top: position === 'top' ? '50px' : '-40px' };
  };

  return _react2.default.createElement(
    'button',
    { id: id, type: 'button', 'aria-label': ariaLabel, style: getButtonStyle(), onClick: onClick },
    label && _react2.default.createElement(_ScreenText2.default, { id: labelId, settings: settings, style: (0, _extends3.default)({}, _styles2.default.mainButtonLabel, getLabelStyles()), text: label }),
    enableProgress && _react2.default.createElement(_progresscircle2.default, {
      progress: progress,
      defaultColor: trackColor,
      progressColor: fillColor,
      size: 50,
      transitionDuration: transitionDuration,
      borderRadius: getBorderRadius(),
      onClick: onClick,
      style: { position: 'absolute' }
    }),
    !!icon && _react2.default.createElement(_image2.default, { alt: alt, src: icon, style: (0, _extends3.default)({}, _styles2.default.mainButtonIcon, iconStyle) })
  );
}
module.exports = exports['default'];

/***/ })

});