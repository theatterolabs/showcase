webpackJsonpYMK([83],{

/***/ 3528:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ShadefinderDetecting;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _useShadefinder2 = __webpack_require__(2422);

var _useShadefinder3 = _interopRequireDefault(_useShadefinder2);

var _singlephasedetecting = __webpack_require__(2044);

var _singlephasedetecting2 = _interopRequireDefault(_singlephasedetecting);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ShadefinderDetecting(props) {
  var settings = props.settings,
      emitter = props.emitter,
      changePage = props.changePage;

  var _useShadefinder = (0, _useShadefinder3.default)({ settings: settings, emitter: emitter, changePage: changePage }),
      initDetection = _useShadefinder.initDetection,
      onCancel = _useShadefinder.onCancel;

  (0, _react.useEffect)(function () {
    initDetection();
  }, []);

  return _react2.default.createElement(_singlephasedetecting2.default, {
    key: 'shadefinder',
    isOpen: true,
    close: onCancel,
    emitter: emitter,
    settings: settings,
    isQualityRequired: true,
    isBackDisabled: true
  });
}
module.exports = exports['default'];

/***/ })

});