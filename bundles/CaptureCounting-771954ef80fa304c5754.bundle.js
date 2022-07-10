webpackJsonpYMK([87],{

/***/ 3584:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CaptureCounting;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _ymkWebSdkCore = __webpack_require__(112);

var _singlephasedetecting = __webpack_require__(2044);

var _singlephasedetecting2 = _interopRequireDefault(_singlephasedetecting);

var _isFunction2 = __webpack_require__(23);

var _isFunction3 = _interopRequireDefault(_isFunction2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CaptureCounting(props) {
  var emitter = props.emitter,
      settings = props.settings,
      back = props.back,
      callback = props.callback;


  var capture = function capture() {
    emitter.trigger(_ymkWebSdkCore.events.a11yMessage, [settings.i18n.getMessage('a11y.alert.take.photo.success')]);
    (0, _isFunction3.default)(callback) && callback();
  };

  (0, _react.useEffect)(function () {
    emitter.trigger(_ymkWebSdkCore.events.pageUpdated);
  }, []);

  return _react2.default.createElement(_singlephasedetecting2.default, {
    key: 'capturecounting',
    goodFacesThreshold: settings.isNailsTakePhotoMode() ? 5 : undefined,
    isOpen: true,
    close: back,
    callback: capture,
    emitter: emitter,
    settings: settings,
    isCountingEnabled: true,
    isFlipCameraHidden: true
  });
}
module.exports = exports['default'];

/***/ })

});