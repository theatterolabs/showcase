webpackJsonpYMK([86],{

/***/ 3526:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EyewearAutoPDDetecting;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _singlephasedetecting = __webpack_require__(2044);

var _singlephasedetecting2 = _interopRequireDefault(_singlephasedetecting);

var _useEyewearAutoPD2 = __webpack_require__(1990);

var _useEyewearAutoPD3 = _interopRequireDefault(_useEyewearAutoPD2);

var _ymkWebSdkCore = __webpack_require__(112);

var _pages = __webpack_require__(623);

var _pages2 = _interopRequireDefault(_pages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function EyewearAutoPDDetecting(props) {
  var settings = props.settings,
      emitter = props.emitter,
      changePage = props.changePage,
      _props$isBackDisabled = props.isBackDisabled,
      isBackDisabled = _props$isBackDisabled === undefined ? false : _props$isBackDisabled,
      _previewQuality = props._previewQuality;

  var _useEyewearAutoPD = (0, _useEyewearAutoPD3.default)({ settings: settings, emitter: emitter, changePage: changePage }),
      onDetected = _useEyewearAutoPD.onDetected;

  var back = function back() {
    emitter.trigger(_ymkWebSdkCore.events.closeEngine);
    changePage(_pages2.default.launcher);
  };

  return _react2.default.createElement(_singlephasedetecting2.default, {
    key: 'eyewearautopd',
    isOpen: true,
    close: back,
    backAriaLabel: settings.i18n.getMessageWithValues('a11y.label.back.to', { pageTitle: settings.i18n.getMessage('a11y.page.launcher') }),
    counting: true,
    emitter: emitter,
    settings: settings,
    isQualityRequired: true,
    isCountingEnabled: true,
    isBackDisabled: isBackDisabled,
    callback: onDetected,
    _previewQuality: _previewQuality
  });
}
module.exports = exports['default'];

/***/ })

});