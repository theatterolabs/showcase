webpackJsonpYMK([81],{

/***/ 3556:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PreviewToast;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _ToastMessage = __webpack_require__(2596);

var _ToastMessage2 = _interopRequireDefault(_ToastMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PreviewToast(_ref) {
  var settings = _ref.settings;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_ToastMessage2.default, { type: 'error', message: settings.i18n.getMessage('error.no.face.detected'), settings: settings }),
    _react2.default.createElement(_ToastMessage2.default, { type: 'info', message: settings.i18n.getMessage('error.feature.unsupported'), settings: settings, toastContainerStyle: { top: '175px' } }),
    _react2.default.createElement(_ToastMessage2.default, { type: 'success', message: settings.i18n.getMessage('mail.sent.successfully'), settings: settings, toastContainerStyle: { top: '260px' } })
  );
}
module.exports = exports['default'];

/***/ })

});