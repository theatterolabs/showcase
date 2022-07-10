webpackJsonpYMK([89],{

/***/ 2945:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _browserUtils = __webpack_require__(4);

var _browserUtils2 = _interopRequireDefault(_browserUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ApngDecoderController = function ApngDecoderController() {
  var _this = this;

  (0, _classCallCheck3.default)(this, ApngDecoderController);

  this.importWorker = function () {
    return _browserUtils2.default.isWebAssemblyEnabled() ? __webpack_require__.e/* import() */(72).then(__webpack_require__.bind(null, 2946)) : __webpack_require__.e/* import() */(73).then(__webpack_require__.bind(null, 2947));
  };

  this.onInit = function () {};

  this.importWorker().then(function (Worker) {
    _this.worker = new Worker();
    _this.onInit();
  });
};

exports.default = ApngDecoderController;
module.exports = exports['default'];

/***/ })

});