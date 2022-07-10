webpackJsonpYMK([85],{

/***/ 3530:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FaceAttributeDetecting;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _useFaceAttribute2 = __webpack_require__(2417);

var _useFaceAttribute3 = _interopRequireDefault(_useFaceAttribute2);

var _singlephasedetecting = __webpack_require__(2044);

var _singlephasedetecting2 = _interopRequireDefault(_singlephasedetecting);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FaceAttributeDetecting(props) {
  var settings = props.settings,
      emitter = props.emitter,
      changePage = props.changePage;

  var _useFaceAttribute = (0, _useFaceAttribute3.default)({ settings: settings, emitter: emitter, changePage: changePage }),
      startLivePredicting = _useFaceAttribute.startLivePredicting,
      isColorFeatureEnabled = _useFaceAttribute.isColorFeatureEnabled;

  return _react2.default.createElement(_singlephasedetecting2.default, {
    key: 'faceattribute',
    isOpen: true,
    callback: startLivePredicting,
    isBackDisabled: true,
    isCloseDisabled: true,
    emitter: emitter,
    settings: settings,
    duration: isColorFeatureEnabled() ? 1200 : 800,
    pauseAfterCounting: true,
    isCountingEnabled: true,
    isQualityRequired: true
  });
}
module.exports = exports['default'];

/***/ })

});