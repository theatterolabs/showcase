webpackJsonpYMK([40],{

/***/ 2457:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useVirtualTryon;

var _react = __webpack_require__(459);

var _context = __webpack_require__(567);

var _useLoadEngine = __webpack_require__(629);

var _ymkWebSdkCore = __webpack_require__(112);

function useVirtualTryon(props) {
  var settings = props.settings;

  var _useContext = (0, _react.useContext)(_context.EngineContext),
      engineType = _useContext.engineType,
      webcamType = _useContext.webcamType,
      paused = _useContext.paused,
      mediaSource = _useContext.mediaSource;

  var isLivecam = engineType === _useLoadEngine.engineTypes.livecam;
  var isModelMode = engineType === _useLoadEngine.engineTypes.image && mediaSource === _useLoadEngine.mediaSources.choosemodel;
  var isVideoMode = isLivecam && webcamType !== _ymkWebSdkCore.WEBCAM_TYPES.webcam;

  var getA11yPageTitle = function getA11yPageTitle() {
    if (isVideoMode && !paused) {
      return settings.i18n.getMessage('a11y.page.try.on.video');
    }
    if (isLivecam && !paused) {
      return settings.i18n.getMessage('a11y.page.try.on.live');
    }
    return isModelMode ? settings.i18n.getMessage('a11y.page.try.on.model') : settings.i18n.getMessage('a11y.page.try.on.photo');
  };

  return {
    getA11yPageTitle: getA11yPageTitle
  };
}
module.exports = exports['default'];

/***/ }),

/***/ 2458:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 2595:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

exports.default = PDDescription;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _styles = __webpack_require__(3550);

var _styles2 = _interopRequireDefault(_styles);

var _useVirtualTryon2 = __webpack_require__(2457);

var _useVirtualTryon3 = _interopRequireDefault(_useVirtualTryon2);

var _uiUtils = __webpack_require__(565);

var _uiUtils2 = _interopRequireDefault(_uiUtils);

var _pages = __webpack_require__(623);

var _pages2 = _interopRequireDefault(_pages);

var _ymkWebSdkCore = __webpack_require__(112);

var _image = __webpack_require__(624);

var _image2 = _interopRequireDefault(_image);

var _ResizableText = __webpack_require__(2369);

var _ResizableText2 = _interopRequireDefault(_ResizableText);

var _backandclose = __webpack_require__(1016);

var _backandclose2 = _interopRequireDefault(_backandclose);

var _powered = __webpack_require__(677);

var _powered2 = _interopRequireDefault(_powered);

var _get2 = __webpack_require__(3);

var _get3 = _interopRequireDefault(_get2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PDDescription(props) {
  var emitter = props.emitter,
      settings = props.settings,
      changePage = props.changePage;

  var isHorizontalDisplay = settings.displayWidth / settings.displayHeight > 1;
  var moduleSetting = settings.getModuleSetting();
  var textStyle = (0, _get3.default)(moduleSetting.getBlock('pd_description', 'body', 'text'), 'styles', {});
  var imageConfig = moduleSetting.getBlock('pd_description', 'body', 'image');

  var _useVirtualTryon = (0, _useVirtualTryon3.default)({ settings: settings }),
      getVTOA11yPageTitle = _useVirtualTryon.getA11yPageTitle;

  (0, _react.useEffect)(function () {
    emitter.trigger(_ymkWebSdkCore.events.eyewearPDAboutOpened);
    emitter.trigger(_ymkWebSdkCore.events.pageUpdated, [settings.i18n.getMessage('a11y.page.pd.about')]);
    return function () {
      emitter.trigger(_ymkWebSdkCore.events.eyewearPDAboutClosed);
    };
  }, []);

  var back = function back() {
    return changePage(_pages2.default.virtual_tryon);
  };

  return _react2.default.createElement(
    'div',
    { style: (0, _extends3.default)({}, _styles2.default.container, _uiUtils2.default.getTemplateBackground(settings)) },
    _react2.default.createElement(_backandclose2.default, {
      onBack: back,
      backAriaLabel: settings.i18n.getMessageWithValues('a11y.label.back.to', { pageTitle: getVTOA11yPageTitle() }),
      emitter: emitter,
      settings: settings,
      isCloseDisabled: true
    }),
    _react2.default.createElement(
      'div',
      { style: _styles2.default.mainContentContainer },
      _react2.default.createElement(
        _ResizableText2.default,
        { settings: settings, style: (0, _extends3.default)({}, _styles2.default.description, textStyle) },
        _react2.default.createElement(
          'div',
          { id: 'eyewear-pd-desc1' },
          settings.i18n.getMessage('eyewear.pd.detail.desc1')
        ),
        _react2.default.createElement(_image2.default, {
          id: 'eyewear-pd-guide',
          alt: 'pupillary-distance',
          src: (0, _get3.default)(imageConfig, 'configs.imgSrc') || __webpack_require__(2458),
          style: isHorizontalDisplay ? _styles2.default.pdImage4HS : _styles2.default.pdImage4VS
        }),
        _react2.default.createElement(
          'div',
          { id: 'eyewear-pd-desc2' },
          settings.i18n.getMessage('eyewear.pd.detail.desc2')
        )
      )
    ),
    _react2.default.createElement(_powered2.default, { key: 'powered', settings: settings })
  );
}
module.exports = exports['default'];

/***/ }),

/***/ 3550:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  container: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#302b27'
  },
  mainContentContainer: {
    padding: '0 5%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  description: {
    color: 'white',
    fontSize: '13px',
    textAlign: 'center'
  },
  pdImage4VS: {
    width: '80%',
    margin: '8px 0'
  },
  pdImage4HS: {
    height: '28vh',
    margin: '3vh 0'
  }
};
module.exports = exports['default'];

/***/ })

});