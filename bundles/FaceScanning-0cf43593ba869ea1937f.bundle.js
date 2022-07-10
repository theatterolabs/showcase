webpackJsonpYMK([56],{

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

/***/ 2469:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 2470:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA4QAAASwCAMAAACU3HQ8AAAACGFjVEwAAAAVAAAAACFN2OIAAACcUExURf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////0VpCyIAAAA0dFJOUwGkqKAEEpwKB5WNgoWRiZkWDn0aQjEeIkdyWisoTD41UC52OSVqblRiXnpmV/3Yx9Dv4LprepylAAAAGmZjVEwAAAAAAAADhAAABLAAAAAAAAAAAAABAA8BAKF3HV8AAAUISURBVHja7MGBAAAAAICg/akXqQIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYPbgQAAAAAAAyP+1EVRVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVhT04EAAAAAAA8n9tBFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVYQ8OBAAAAACA/F8bQVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV2IMDAQAAAAAg/9dGUFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUV9uBAAAAAAADI/7URVFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVWFPTgQAAAAAADyf20EVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVhDw4EAAAAAID8XxtBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVXYgwMBAAAAACD/10ZQVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVRX24EAAAAAAAMj/tRFUVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVYU9OBAAAAAAAPJ/bQRVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVWEPDgQAAAAAgPxfG0FVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVdiDAwEAAAAAIP/XRlBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVFfbgQAAAAAAAyP+1EVRVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVhT04EAAAAAAA8n9tBFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVYQ8OBAAAAACA/F8bQVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV2IMDAQAAAAAg/9dGUFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVWV9uCYAAAABgHQ6qx/QTv4+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQ+QOWAhCTACp1OrhaAAAAGmZjVEwAAAABAAAB9AAAA00AAAAJAAABYwABAA8BAMyR6DwAAAMyZmRBVAAAAAJ42uzUwYqDMBQF0C4UXSpaFWy1pYIb///75sURLAOznimcc0M2Cckiee/CR8iO8PHqqun6fllu4/i8hnl+hWma2t3QDr+L1TC10/SaXmGe52t4juPttix933dd01RVntd1UYYsy/yaf6C+Dtu2bmvyCDGF+7fh/vOVU07Du3uM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N06JlYrWOp+Toidvfemm6Gb04N2itT7dn3/4FZG8WLj9uaBpj/S3bf9Afu9KyoYOrvCDvTtJThCIAgBqSgUHLAfMYAwKRiOluf/5EnFMdrY7fW/Hgt2v4k/dvPf/NSIn2dKC/z1rDJfZ5Vpb76KhfVyZnAdk9mX0Zx1yk/uwPYK4yDenP6N1zu2jfSR9TRvXR1J+0QutJ9uxDtKjiNPZNjlkTefhf5VwlwHj+jjrnUv/0frjHq7p4ZqKbhRV/cPu6zGU+sn3NCAK4nX76ThiKwuV/+NpNIsyiX4DYDStVRZZ0JpUPG4fSraFTPtR7XLwRf+pvlhWj2Ej+9Zsf1AyWn3e032GXKuVzldRfdIMD8dxr9qtzZ3KppHm3TINXknv7HpIb3ZrOVxT8zwMe7NI6u3V1NSfkzgszSk23Sytwa0G+filBjdrDTSRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOCHPTgQAAAAAADyf20EVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVhDw4EAAAAAID8XxtBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVXYgwMBAAAAACD/10ZQVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVRX24EAAAAAAAMj/tRFUVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVYU9OBAAAAAAAPJ/bQRVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVWEPDgQAAAAAgPxfG0FVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVdiDAwEAAAAAIP/XRlBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVFfbgQAAAAAAAyP+1EVRVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV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"

/***/ }),

/***/ 3587:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(72);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = FaceScanning;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _ymkWebSdkCore = __webpack_require__(112);

var _facescanner = __webpack_require__(3588);

var _facescanner2 = _interopRequireDefault(_facescanner);

var _isFunction2 = __webpack_require__(23);

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _powered = __webpack_require__(677);

var _powered2 = _interopRequireDefault(_powered);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FaceScanning(props) {
  var settings = props.settings,
      emitter = props.emitter,
      autoHidden = props.autoHidden,
      callback = props.callback;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray3.default)(_useState, 2),
      enabled = _useState2[0],
      setEnabled = _useState2[1];

  var beforeScanning = function beforeScanning() {
    emitter.trigger(_ymkWebSdkCore.events.pageUpdated, [settings.i18n.getMessage('a11y.page.face.scanning')]);
  };

  var afterScanning = function afterScanning() {
    setEnabled(false);
    (0, _isFunction3.default)(callback) && callback();
  };

  (0, _react.useEffect)(function () {
    setEnabled(true);
  }, []);

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_facescanner2.default, {
      key: 'face-scanning-' + enabled + autoHidden,
      settings: settings,
      emitter: emitter,
      shouldShow: enabled,
      autoHideAfterScan: autoHidden,
      beforeScanning: beforeScanning,
      afterScanning: afterScanning
    }),
    _react2.default.createElement(_powered2.default, { key: 'powered', settings: settings })
  );
}
module.exports = exports['default'];

/***/ }),

/***/ 3588:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _styles = __webpack_require__(3589);

var _styles2 = _interopRequireDefault(_styles);

var _isNumber2 = __webpack_require__(180);

var _isNumber3 = _interopRequireDefault(_isNumber2);

var _isFunction2 = __webpack_require__(23);

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _apngCanvas = __webpack_require__(2047);

var _apngCanvas2 = _interopRequireDefault(_apngCanvas);

var _ymkWebSdkCore = __webpack_require__(112);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var frameOpenedTimer = null;
var lightScannedTimer = null;
var initialState = {
  enabled: false,
  faceRect: {},
  frameOpened: false,
  lightScanned: false
};

var FaceScanner = function (_Component) {
  (0, _inherits3.default)(FaceScanner, _Component);

  function FaceScanner(props) {
    (0, _classCallCheck3.default)(this, FaceScanner);

    var _this = (0, _possibleConstructorReturn3.default)(this, (FaceScanner.__proto__ || (0, _getPrototypeOf2.default)(FaceScanner)).call(this, props));

    _this.enableOnceGetFaceRect = function () {
      var _this$props = _this.props,
          emitter = _this$props.emitter,
          beforeScanning = _this$props.beforeScanning;

      emitter.once(_ymkWebSdkCore.events.getFaceRectComplete, function (faceRect) {
        (0, _isFunction3.default)(beforeScanning) && beforeScanning();
        _this.setState(function (ps) {
          return (0, _extends3.default)({}, ps, { faceRect: faceRect, enabled: true, frameOpened: false, lightScanned: false });
        });
        _this.loadScannerIfApngUnsupported();
      });
      emitter.trigger(_ymkWebSdkCore.events.getFaceRect);
    };

    _this.loadScannerIfApngUnsupported = function () {
      if (_ymkWebSdkCore.browserUtils.isIOs() && _ymkWebSdkCore.browserUtils.isIOsVersionUnder12()) {
        _this.scannerFrameImg && _apngCanvas2.default.animateImage(_this.scannerFrameImg);
        _this.scannerLightImg && _apngCanvas2.default.animateImage(_this.scannerLightImg);
      } else {
        _apngCanvas2.default.ifNeeded().then(function () {
          _this.scannerFrameImg && _apngCanvas2.default.animateImage(_this.scannerFrameImg);
          _this.scannerLightImg && _apngCanvas2.default.animateImage(_this.scannerLightImg);
        });
      }
    };

    _this.onFrameLoaded = function () {
      if (_this.state.frameOpened || frameOpenedTimer) {
        return;
      }
      var FRAME_OPEN = 800;
      frameOpenedTimer = setTimeout(function () {
        frameOpenedTimer = null;
        _this.setState(function (ps) {
          return (0, _extends3.default)({}, ps, { frameOpened: true });
        });
      }, FRAME_OPEN);
    };

    _this.onScannerLightLoaded = function () {
      if (_this.state.lightScanned || lightScannedTimer) {
        return;
      }
      var _this$props2 = _this.props,
          autoHideAfterScan = _this$props2.autoHideAfterScan,
          afterScanning = _this$props2.afterScanning;

      var LIGHT_SCAN_ONCE = 1600;
      lightScannedTimer = setTimeout(function () {
        lightScannedTimer = null;
        _this.setState(function (ps) {
          return (0, _extends3.default)({}, ps, { lightScanned: true });
        });

        if (autoHideAfterScan) {
          _this.setState({ enabled: false });
          (0, _isFunction3.default)(afterScanning) && afterScanning();
        }
      }, LIGHT_SCAN_ONCE);
    };

    _this.onFadeOutEnd = function () {
      var _this$props3 = _this.props,
          shouldShow = _this$props3.shouldShow,
          afterScanning = _this$props3.afterScanning;

      if (shouldShow) {
        return;
      }
      _this.setState({ enabled: false });
      (0, _isFunction3.default)(afterScanning) && afterScanning();
    };

    _this.getPosition = function () {
      var _this$state$faceRect = _this.state.faceRect,
          top = _this$state$faceRect.top,
          bottom = _this$state$faceRect.bottom,
          left = _this$state$faceRect.left,
          right = _this$state$faceRect.right;

      if (!(0, _isNumber3.default)(top) || !(0, _isNumber3.default)(bottom) || !(0, _isNumber3.default)(left) || !(0, _isNumber3.default)(right)) {
        return {
          width: '100%',
          height: '100%'
        };
      }

      var settings = _this.props.settings;

      top < 0 && (top = 0);
      left < 0 && (left = 0);
      bottom > settings.displayHeight && (bottom = settings.displayHeight);
      right > settings.displayWidth && (right = settings.displayWidth);

      var width = right - left;
      var faceHeight = bottom - top;
      var foreheadHeight = faceHeight * 0.45;
      var height = faceHeight + foreheadHeight;
      top = bottom - height < 0 ? 0 : bottom - height;

      return {
        position: 'absolute',
        zIndex: 1,
        top: top + 'px',
        left: left + 'px',
        width: (left + width > settings.displayWidth ? settings.displayWidth - left : width) + 'px',
        height: (top + height > settings.displayHeight ? settings.displayHeight - top : height) + 'px'
      };
    };

    _this.state = initialState;
    return _this;
  }

  (0, _createClass3.default)(FaceScanner, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.shouldShow && this.enableOnceGetFaceRect();
    }
  }, {
    key: 'UNSAFE_componentWillReceiveProps',
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      !this.props.shouldShow && nextProps.shouldShow && this.enableOnceGetFaceRect();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      frameOpenedTimer && clearTimeout(frameOpenedTimer);
      frameOpenedTimer = null;
      lightScannedTimer && clearTimeout(lightScannedTimer);
      lightScannedTimer = null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (!this.state.enabled) {
        return false;
      }
      var shouldShow = this.props.shouldShow;
      var _state = this.state,
          frameOpened = _state.frameOpened,
          lightScanned = _state.lightScanned;


      return _react2.default.createElement(
        'div',
        { style: (0, _extends3.default)({}, this.getPosition(), { transition: 'opacity 300ms ease', opacity: shouldShow || !frameOpened || !lightScanned ? 1 : 0 }), onTransitionEnd: this.onFadeOutEnd },
        _react2.default.createElement(
          'div',
          { style: _styles2.default.container },
          _react2.default.createElement('img', {
            alt: 'face-scanner-frame',
            ref: function ref(r) {
              _this2.scannerFrameImg = r;
              _this2.onFrameLoaded();
            },
            src: this.state.frameOpened ? __webpack_require__(2469) : __webpack_require__(2470),
            style: _styles2.default.image
          }),
          _react2.default.createElement('img', {
            alt: 'face-scanner-light',
            ref: function ref(r) {
              _this2.scannerLightImg = r;
              _this2.onScannerLightLoaded();
            },
            src: "https://plugins-media.makeupar.com" + '/webconsultation/images/face-scanner_scan-light.png',
            style: _styles2.default.image
          })
        )
      );
    }
  }]);
  return FaceScanner;
}(_react.Component);

exports.default = FaceScanner;
module.exports = exports['default'];

/***/ }),

/***/ 3589:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '105%',
    position: 'absolute',
    zIndex: 5
  }
};
module.exports = exports['default'];

/***/ })

});