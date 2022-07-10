webpackJsonpYMK([79],{

/***/ 2833:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _regenerator = __webpack_require__(8);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _skincaremanagerNonworkerEvent = __webpack_require__(2834);

var _skincaremanagerNonworkerEvent2 = _interopRequireDefault(_skincaremanagerNonworkerEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SkincaremanagerNonworker = function SkincaremanagerNonworker(onEvent) {
  var _this = this;

  (0, _classCallCheck3.default)(this, SkincaremanagerNonworker);

  this.postMessage = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(event) {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _skincaremanagerNonworkerEvent2.default)({ postMessage: function postMessage(e) {
                  return _this.onEvent({ data: e });
                } }, { data: event });

            case 2:
              return _context.abrupt('return', _context.sent);

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();

  this.onEvent = onEvent;
};

exports.default = SkincaremanagerNonworker;
module.exports = exports['default'];

/***/ }),

/***/ 2834:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = __webpack_require__(18);

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = __webpack_require__(8);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = __webpack_require__(171);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _get2 = __webpack_require__(3);

var _get3 = _interopRequireDefault(_get2);

var _SkincareManager = __webpack_require__(2381);

var _SkincareManager2 = _interopRequireDefault(_SkincareManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var manager = null;
var RESOLVE = null;
var CURRENT_FEAUTURE = null;

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(self, event) {
    var features;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (event.data) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt('return');

          case 2:
            _context2.t0 = (0, _get3.default)(event, 'data.type');
            _context2.next = _context2.t0 === 'cropped' ? 5 : _context2.t0 === 'load' ? 11 : _context2.t0 === 'predict' ? 14 : 19;
            break;

          case 5:
            if (!((0, _get3.default)(event, 'data.feature_name') !== CURRENT_FEAUTURE)) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt('return');

          case 7:
            RESOLVE && RESOLVE((0, _get3.default)(event, 'data.cropped'));
            RESOLVE = null;
            CURRENT_FEAUTURE = null;
            return _context2.abrupt('return');

          case 11:
            manager = new _SkincareManager2.default((0, _get3.default)(event, 'data.skincareFeatures'), (0, _get3.default)(event, 'data.platform'), (0, _get3.default)(event, 'data.isHighQualityAcneSupported'));
            self.postMessage({ type: 'loaded' });
            return _context2.abrupt('return');

          case 14:
            _context2.next = 16;
            return manager.initialize();

          case 16:
            features = [''].concat((0, _toConsumableArray3.default)(manager.getFeatures()));
            _context2.next = 19;
            return features.reduce(function () {
              var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(promise, feature_name) {
                var cropped, skincareInputTensor, predicted;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return promise;

                      case 2:
                        _context.next = 4;
                        return getCropped(self, feature_name);

                      case 4:
                        cropped = _context.sent;
                        skincareInputTensor = manager.getSkincareInputTensor(cropped);
                        _context.next = 8;
                        return manager.predict(feature_name, skincareInputTensor);

                      case 8:
                        predicted = _context.sent;

                        self.postMessage({ predicted: predicted, feature_name: feature_name, type: 'predicted' });

                      case 10:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x3, _x4) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 19:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getCropped = function getCropped(self, feature_name) {
  return new _promise2.default(function (resolve) {
    RESOLVE = resolve;
    CURRENT_FEAUTURE = feature_name;
    self.postMessage({
      type: 'crop',
      feature_name: feature_name,
      workerTYpe: 'nonworker'
    });
  });
};
module.exports = exports['default'];

/***/ })

});