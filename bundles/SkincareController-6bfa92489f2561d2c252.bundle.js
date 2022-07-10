webpackJsonpYMK([90],{

/***/ 2832:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _class, _temp, _initialiseProps;

var _isFunction2 = __webpack_require__(23);

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _filter2 = __webpack_require__(34);

var _filter3 = _interopRequireDefault(_filter2);

var _browserUtils = __webpack_require__(4);

var _browserUtils2 = _interopRequireDefault(_browserUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WORKER = null;
var NONWORKER = null;
var SkincareController = (_temp = _class = function SkincareController(onEvent, skincareFeatures) {
  (0, _classCallCheck3.default)(this, SkincareController);

  _initialiseProps.call(this);

  this.terminateWorker();
  if (_browserUtils2.default.isSamsungNote9() || _browserUtils2.default.isIphone8() || _browserUtils2.default.isIphoneUnderA11()) {
    this.loadNonWorker(onEvent, skincareFeatures, false);
    return;
  }
  if (_browserUtils2.default.isMobile() || _browserUtils2.default.isWebAssemblySIMDSupported()) {
    this.loadWorker(onEvent, skincareFeatures, _browserUtils2.default.isAndroid() || _browserUtils2.default.isWebAssemblySIMDSupported());
    return;
  }
  var f1 = (0, _filter3.default)(skincareFeatures, function (_, i) {
    return i % 2 === 0;
  });
  var f2 = (0, _filter3.default)(skincareFeatures, function (_, i) {
    return i % 2 === 1;
  });
  this.loadWorker(onEvent, f1, false);
  this.loadNonWorker(onEvent, f2);
}, _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.loadNonWorker = function (onEvent, skincareFeatures) {
    __webpack_require__.e/* import() */(79).then(__webpack_require__.bind(null, 2833)).then(function (NonWorker) {
      _this.nonworker = new NonWorker(onEvent);
      NONWORKER = _this.nonworker;
      _this.nonworker.postMessage({ type: 'load', skincareFeatures: skincareFeatures, platform: _browserUtils2.default.getPlatform() });
    });
  };

  this.loadWorker = function (onEvent, skincareFeatures) {
    var preloadModel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    __webpack_require__.e/* import() */(88).then(__webpack_require__.bind(null, 2835)).then(function (Worker) {
      _this.worker = new Worker();
      WORKER = _this.worker;
      _this.worker.addEventListener('message', onEvent);
      _this.worker.postMessage({ type: 'load', skincareFeatures: skincareFeatures, preloadModel: preloadModel, platform: _browserUtils2.default.getPlatform() });
    });
  };

  this.postMessage = function (data, workerType) {
    if (!workerType) {
      _this.worker && _this.worker.postMessage(data);
      _this.nonworker && _this.nonworker.postMessage(data);
    }
    if (workerType === 'worker') {
      _this.worker && _this.worker.postMessage(data);
    }
    if (workerType === 'nonworker') {
      _this.nonworker && _this.nonworker.postMessage(data);
    }
  };

  this.sendCropped = function (cropped, feature_name, workerType) {
    return _this.postMessage({ type: 'cropped', workerType: workerType, feature_name: feature_name, cropped: cropped });
  };

  this.predict = function () {
    return _this.postMessage({ type: 'predict' });
  };

  this.terminateWorker = function () {
    WORKER && (0, _isFunction3.default)(WORKER.terminate) && WORKER.terminate();
    NONWORKER && (0, _isFunction3.default)(NONWORKER.terminate) && NONWORKER.terminate();
  };
}, _temp);
exports.default = SkincareController;
module.exports = exports['default'];

/***/ })

});