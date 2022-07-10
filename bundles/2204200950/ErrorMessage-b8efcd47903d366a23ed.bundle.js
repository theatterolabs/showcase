webpackJsonpYMK([69],{

/***/ 3562:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ErrorMessage;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _ymkWebSdkCore = __webpack_require__(112);

var _errors = __webpack_require__(2416);

var _errors2 = _interopRequireDefault(_errors);

var _message = __webpack_require__(3563);

var _message2 = _interopRequireDefault(_message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ErrorMessage(props) {
  var settings = props.settings,
      emitter = props.emitter,
      error = props.error,
      message = props.message;


  var close = function close() {
    return emitter.trigger(_ymkWebSdkCore.events.close);
  };

  var getUnsupportedBrowserMessage = function getUnsupportedBrowserMessage() {
    if (_ymkWebSdkCore.browserUtils.isIOs()) {
      return settings.i18n.getMessage('unsupported.browser.desc.ios');
    }
    if (_ymkWebSdkCore.browserUtils.isAndroid()) {
      return settings.i18n.getMessage('unsupported.browser.desc.android');
    }
    return settings.i18n.getMessage('unsupported.browser.desc.others');
  };

  (0, _react.useEffect)(function () {
    emitter.trigger(_ymkWebSdkCore.events.pageUpdated, [settings.i18n.getMessage('a11y.page.error')]);
  }, []);

  switch (error) {
    case _errors2.default.notauthorized:
      return _react2.default.createElement(_message2.default, { message: settings.i18n.getMessage('error.service.unavailable'), settings: settings, emitter: emitter });
    case _errors2.default.serviceunavailable:
      return _react2.default.createElement(_message2.default, { code: 'error.service.unavailable', message: settings.i18n.getMessage('error.service.unavailable'), settings: settings, emitter: emitter });
    case _errors2.default.invaliddomain:
      return _react2.default.createElement(_message2.default, { message: settings.i18n.getMessage('error.invalid.domain'), settings: settings, emitter: emitter });
    case _errors2.default.invalidfile:
      return _react2.default.createElement(_message2.default, { message: settings.i18n.getMessage('error.invalid.file'), settings: settings, emitter: emitter });
    case _errors2.default.unsupportedresolution:
      return _react2.default.createElement(_message2.default, { message: 'Unsupported width & height', settings: settings, emitter: emitter });
    case _errors2.default.webglnotsupported:
      return _react2.default.createElement(_message2.default, { message: settings.i18n.getMessage('error.web.gl.not.supported'), settings: settings, emitter: emitter });
    case _errors2.default.webglnotenabled:
      return _react2.default.createElement(_message2.default, { message: settings.i18n.getMessage('error.web.gl.not.enabled'), settings: settings, emitter: emitter });
    case _errors2.default.unsupporteddevice:
      return _react2.default.createElement(_message2.default, { code: 'error.feature.unsupported', message: settings.i18n.getMessage('error.feature.unsupported'), settings: settings, emitter: emitter });
    case _errors2.default.unsupportedbrowser:
      {
        if (!!message) {
          return _react2.default.createElement(_message2.default, { message: message, smaller: true, settings: settings, emitter: emitter, onClose: close, onConfirm: close });
        }
        return _react2.default.createElement(_message2.default, {
          title: settings.i18n.getMessage('unsupported.browser.title'),
          message: getUnsupportedBrowserMessage(),
          smaller: true,
          settings: settings,
          emitter: emitter,
          onClose: close,
          onConfirm: close
        });
      }
    default:
      return false;
  }
}
module.exports = exports['default'];

/***/ }),

/***/ 3563:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

exports.default = Message;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _styles = __webpack_require__(3564);

var _styles2 = _interopRequireDefault(_styles);

var _uiUtils = __webpack_require__(565);

var _uiUtils2 = _interopRequireDefault(_uiUtils);

var _backandclose = __webpack_require__(1016);

var _backandclose2 = _interopRequireDefault(_backandclose);

var _ResizableText = __webpack_require__(2369);

var _ResizableText2 = _interopRequireDefault(_ResizableText);

var _I18n = __webpack_require__(630);

var _I18n2 = _interopRequireDefault(_I18n);

var _ConfirmButton = __webpack_require__(1989);

var _ConfirmButton2 = _interopRequireDefault(_ConfirmButton);

var _powered = __webpack_require__(677);

var _powered2 = _interopRequireDefault(_powered);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Message(props) {
  var code = props.code,
      message = props.message,
      title = props.title,
      smaller = props.smaller,
      settings = props.settings,
      emitter = props.emitter,
      onConfirm = props.onConfirm,
      backAriaLabel = props.backAriaLabel,
      onBack = props.onBack,
      onClose = props.onClose,
      _props$confirmBeforeE = props.confirmBeforeExit,
      confirmBeforeExit = _props$confirmBeforeE === undefined ? false : _props$confirmBeforeE;


  var getTitleStyle = function getTitleStyle() {
    return smaller ? _styles2.default.smallerTitle : _styles2.default.title;
  };

  var getTextStyle = function getTextStyle() {
    return smaller ? _styles2.default.smallerText : _styles2.default.text;
  };

  return _react2.default.createElement(
    'div',
    {
      style: (0, _extends3.default)({}, _styles2.default.container, _uiUtils2.default.getTemplateBackground(settings))
    },
    _react2.default.createElement(
      'div',
      { style: (0, _extends3.default)({}, _styles2.default.content) },
      !!title && _react2.default.createElement(
        _ResizableText2.default,
        { id: 'error-message-title', settings: settings, style: getTitleStyle() },
        title
      ),
      _react2.default.createElement(
        _ResizableText2.default,
        { id: 'error-message-desc', settings: settings, style: getTextStyle() },
        code ? _react2.default.createElement(_I18n2.default, { code: code, settings: settings }) : message
      ),
      !!onConfirm && _react2.default.createElement(
        'div',
        { style: { marginTop: '20px' } },
        _react2.default.createElement(_ConfirmButton2.default, { id: 'error-message-confirm', settings: settings, text: settings.i18n.getMessage('error.got.it'), onClick: onConfirm })
      )
    ),
    _react2.default.createElement(_backandclose2.default, {
      isBackDisabled: !onBack,
      onBack: onBack,
      backAriaLabel: backAriaLabel,
      emitter: emitter,
      settings: settings,
      isCloseDisabled: !onClose,
      onClose: onClose,
      confirmBeforeExit: confirmBeforeExit
    }),
    _react2.default.createElement(_powered2.default, { key: 'powered', settings: settings })
  );
}
module.exports = exports['default'];

/***/ }),

/***/ 3564:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  container: {
    position: 'absolute',
    zIndex: 20,
    width: '100%',
    height: '100%',
    backgroundColor: '#302b27',
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat'
  },
  content: {
    zIndex: 2,
    padding: '0 10%',
    width: '80%',
    height: '100%',
    flexFlow: 'column',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: 'white'
  },
  text: {
    fontSize: '16px',
    lineHeight: '1.25em'
  },
  smallerText: {
    fontSize: '13px',
    lineHeight: '1.38em'
  },
  title: {
    marginBottom: '30px',
    fontSize: '20px',
    lineHeight: '1.16em',
    fontWeight: 500
  },
  smallerTitle: {
    marginBottom: '20px',
    fontSize: '16px',
    lineHeight: '1.13em'
  }
};
module.exports = exports['default'];

/***/ })

});