webpackJsonpYMK([91],{

/***/ 1978:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _promise = __webpack_require__(18);

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _class, _temp, _initialiseProps;

var _browserUtils = __webpack_require__(4);

var _browserUtils2 = _interopRequireDefault(_browserUtils);

var _isFunction2 = __webpack_require__(23);

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _get2 = __webpack_require__(3);

var _get3 = _interopRequireDefault(_get2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const THRESHOLD = 15;
var WORKER = null;
var FaceQualityCheckerController = (_temp = _class = function FaceQualityCheckerController(_ref) {
  var _this = this;

  var settings = _ref.settings,
      isShadeFinder = _ref.isShadeFinder,
      _ref$onLoad = _ref.onLoad,
      onLoad = _ref$onLoad === undefined ? function () {} : _ref$onLoad;
  (0, _classCallCheck3.default)(this, FaceQualityCheckerController);

  _initialiseProps.call(this);

  this.results = [];
  this.settings = settings;
  this.isShadeFinder = isShadeFinder;
  this.terminateWorker();
  this.importWorker().then(function (Worker) {
    // if (false && browserUtils.isTfjsWebglSupportedInWorker()) {
    //   this.worker = new Worker();
    //   WORKER = this.worker;
    //   this.worker.addEventListener('message', event => this.onEvent(event, onLoad));
    // } else {
    _this.worker = new Worker(function (event) {
      return _this.onEvent(event, onLoad);
    });
    WORKER = _this.worker;
    // }
    _this.load();
  });
}, _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.onEvent = function (event, onLoad) {
    if (!event || !event.data) {
      return;
    }
    if (event.data.type === 'loadResult') {
      onLoad && onLoad();
    }
    if (event.data.type === 'closeResult') {
      _this2.terminateWorker();
    }
    if (event.data.type === 'checkFaceQualityResult') {
      _this2.checkFaceQualityResolve && _this2.checkFaceQualityResolve(event.data);
    }
  };

  this.importWorker = function () {
/////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////
    if (_browserUtils2.default.isLiteAIFaceTrackingSupported((0, _get3.default)(_this2, 'settings.features', {}), 'shadefinder')) {
      return _browserUtils2.default.isWebAssemblyEnabled() ? __webpack_require__.e/* import() */(60).then(__webpack_require__.bind(null, 2707)) : __webpack_require__.e/* import() */(61).then(__webpack_require__.bind(null, 2713));
    } else {
      return _browserUtils2.default.isWebAssemblyEnabled() ? __webpack_require__.e/* import() */(58).then(__webpack_require__.bind(null, 2715)) : __webpack_require__.e/* import() */(59).then(__webpack_require__.bind(null, 2717));
    }
//////////////
  };

  this.load = function () {
    return _this2.postMessage({
      type: 'load',
      facedetModel: _this2.facedetModel,
      isShadeFinder: _this2.isShadeFinder
    });
  };

  this.close = function () {
    return _this2.postMessage({
      type: 'close'
    });
  };

  this.checkFaceQuality = function (imageData) {
    if (!_this2.worker) {
      return _promise2.default.reject();
    }
    return new _promise2.default(function (resolve) {
      _this2.checkFaceQualityResolve = resolve;
      _this2.postMessage({ imageData: imageData, type: 'checkFaceQuality' });
    });
  };

  this.terminateWorker = function () {
    return WORKER && (0, _isFunction3.default)(WORKER.terminate) && WORKER.terminate();
  };

  this.postMessage = function (data) {
    return _this2.worker && _this2.worker.postMessage(data);
  };
}, _temp);
exports.default = FaceQualityCheckerController;
module.exports = exports['default'];

/***/ })

});