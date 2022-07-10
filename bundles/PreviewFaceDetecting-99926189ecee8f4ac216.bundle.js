webpackJsonpYMK([84],{

/***/ 3552:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

exports.default = PreviewFaceDetecting;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _singlephasedetecting = __webpack_require__(2044);

var _singlephasedetecting2 = _interopRequireDefault(_singlephasedetecting);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PreviewFaceDetecting(props) {
  var _previewQuality = { lighting: 'good', nakedeye: 'notgood', frontal: 'ok', area: 'toosmall', hasFace: true };

  return _react2.default.createElement(_singlephasedetecting2.default, (0, _extends3.default)({}, props, { isQualityRequired: true, isOpen: true, _previewQuality: _previewQuality }));
}
module.exports = exports['default'];

/***/ })

});