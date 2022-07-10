webpackJsonpYMK([92],{

/***/ 1981:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _class, _temp, _initialiseProps;

var _browserUtils = __webpack_require__(4);

var _browserUtils2 = _interopRequireDefault(_browserUtils);

var _isFunction2 = __webpack_require__(23);

var _isFunction3 = _interopRequireDefault(_isFunction2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WORKER = null;
var FaceAIAttributeController = (_temp = _class = function FaceAIAttributeController(features, onEvent) {
  var _this = this;

  (0, _classCallCheck3.default)(this, FaceAIAttributeController);

  _initialiseProps.call(this);

  this.terminateWorker();
  if (_browserUtils2.default.isOfflineCanvasSupported()) {
    __webpack_require__.e/* import() */(78).then(__webpack_require__.bind(null, 2724)).then(function (Worker) {
      _this.worker = new Worker();
      WORKER = _this.worker;
      _this.worker.addEventListener('message', onEvent);
      _this._initialize(features);
    });
  } else {
    __webpack_require__.e/* import() */(41).then(__webpack_require__.bind(null, 2725)).then(function (Worker) {
      _this.worker = new Worker(onEvent);
      WORKER = _this.worker;
      _this._initialize(features);
    });
  }
}, _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.postMessage = function (data) {
    return _this2.worker && _this2.worker.postMessage(data);
  };

  this._initialize = function (features) {
    return _this2.postMessage({ features: features, type: 'initialize' });
  };

  this.predict = function (imageData, landmarks, faceRect) {
    return _this2.postMessage({ imageData: imageData, landmarks: landmarks, faceRect: faceRect, type: 'predict' });
  };

  this.terminateWorker = function () {
    return WORKER && (0, _isFunction3.default)(WORKER.terminate) && WORKER.terminate();
  };
}, _temp);
exports.default = FaceAIAttributeController;
module.exports = exports['default'];

/***/ })

});