webpackJsonpYMK([70],{

/***/ 3860:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = __webpack_require__(40);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(466);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(38);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(39);

var _inherits3 = _interopRequireDefault(_inherits2);

var _class;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _radium = __webpack_require__(671);

var _radium2 = _interopRequireDefault(_radium);

var _styles = __webpack_require__(3861);

var _styles2 = _interopRequireDefault(_styles);

var _utils = __webpack_require__(552);

var _utils2 = _interopRequireDefault(_utils);

var _backandclose = __webpack_require__(978);

var _backandclose2 = _interopRequireDefault(_backandclose);

var _ymkWebSdkCore = __webpack_require__(112);

var _routes = __webpack_require__(977);

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UnsupportedBrowser = (0, _radium2.default)(_class = function (_Component) {
  (0, _inherits3.default)(UnsupportedBrowser, _Component);

  function UnsupportedBrowser() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, UnsupportedBrowser);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = UnsupportedBrowser.__proto__ || (0, _getPrototypeOf2.default)(UnsupportedBrowser)).call.apply(_ref, [this].concat(args))), _this), _this.close = function () {
      var _this$props = _this.props,
          emitter = _this$props.emitter,
          changeRoute = _this$props.changeRoute;

      changeRoute(_routes2.default.launcher);
      emitter.trigger(_ymkWebSdkCore.events.close);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(UnsupportedBrowser, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          emitter = _props.emitter,
          settings = _props.settings;

      emitter.trigger(_ymkWebSdkCore.events.pageUpdated, [settings.i18n.getMessage('a11y.page.error')]);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          settings = _props2.settings,
          routeParams = _props2.routeParams,
          emitter = _props2.emitter;

      return _react2.default.createElement(
        'div',
        {
          style: (0, _extends3.default)({}, _styles2.default.expired, _utils2.default.getTemplateBackground(settings))
        },
        _react2.default.createElement(
          'div',
          {
            style: (0, _extends3.default)({}, _styles2.default.contentTitle, {
              fontFamily: settings.i18n.getFontFamily(),
              height: settings.displayHeight,
              width: settings.displayWidth
            })
          },
          routeParams && routeParams.message ? _react2.default.createElement(
            'div',
            { style: { paddingBottom: '20px' } },
            routeParams.message
          ) : _react2.default.createElement(
            'div',
            { style: { width: '100%' } },
            _react2.default.createElement(
              'div',
              { style: { width: '100%', fontSize: '16px' } },
              settings.i18n.getMessage('unsupported.browser.title')
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              'div',
              { style: { width: '100%' } },
              _ymkWebSdkCore.browserUtils.isIOs() && settings.i18n.getMessage('unsupported.browser.desc.ios'),
              _ymkWebSdkCore.browserUtils.isAndroid() && settings.i18n.getMessage('unsupported.browser.desc.android'),
              !_ymkWebSdkCore.browserUtils.isIOs() && !_ymkWebSdkCore.browserUtils.isAndroid() && settings.i18n.getMessage('unsupported.browser.desc.others')
            )
          ),
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'button',
            { type: 'button', onClick: function onClick() {
                return _this2.close();
              }, style: _styles2.default.button },
            settings.i18n.getMessage('unsupported.browser.got.it')
          )
        ),
        _react2.default.createElement(_backandclose2.default, { isBackDisabled: true, onClose: this.close, emitter: emitter, settings: settings, confirmBeforeExit: false })
      );
    }
  }]);
  return UnsupportedBrowser;
}(_react.Component)) || _class;

exports.default = UnsupportedBrowser;
module.exports = exports['default'];

/***/ }),

/***/ 3861:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  expired: {
    width: '100%',
    height: '100%',
    backgroundColor: '#302b27',
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat'
  },
  button: {
    backgroundColor: '#ef3f78',
    border: '1px solid #ef3f78',
    color: '#fff',
    borderRadius: '2px',
    padding: '5px 30px',
    cursor: 'pointer',
    outline: 0
  },
  contentTitle: {
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexFlow: 'column',
    padding: '0 10%',
    textAlign: 'center',
    boxSizing: 'border-box',
    fontSize: '13px',
    lineHeight: '18px'
  }
};
module.exports = exports['default'];

/***/ })

});