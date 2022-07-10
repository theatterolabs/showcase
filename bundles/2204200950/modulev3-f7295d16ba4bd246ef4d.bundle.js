webpackJsonpYMK([32],{

/***/ 450:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(8);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loaded = false;
var Module = void 0;
var load = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            loaded = true;
            _context.next = 3;
            return __webpack_require__.e/* import() */(37).then(__webpack_require__.bind(null, 3452));

          case 3:
            Module = _context.sent;

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function load() {
    return _ref.apply(this, arguments);
  };
}();

var utils = {
  open: function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(props) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (loaded) {
                _context2.next = 3;
                break;
              }

              _context2.next = 3;
              return load();

            case 3:
              Module.open(props);

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function open(_x) {
      return _ref2.apply(this, arguments);
    };
  }(),
  close: function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (loaded) {
                _context3.next = 3;
                break;
              }

              _context3.next = 3;
              return load();

            case 3:
              Module.close();

            case 4:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function close() {
      return _ref3.apply(this, arguments);
    };
  }()
};
exports.default = utils;
module.exports = exports['default'];

/***/ })

});