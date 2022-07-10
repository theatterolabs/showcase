webpackJsonpYMK([68],{

/***/ 3591:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(172);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _slicedToArray2 = __webpack_require__(72);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = PDDetected;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _useDynamicStyles = __webpack_require__(747);

var _useDynamicStyles2 = _interopRequireDefault(_useDynamicStyles);

var _styles = __webpack_require__(3592);

var _styles2 = _interopRequireDefault(_styles);

var _styles3 = __webpack_require__(3593);

var _styles4 = _interopRequireDefault(_styles3);

var _context = __webpack_require__(567);

var _useLoadEngine = __webpack_require__(629);

var _ymkWebSdkCore = __webpack_require__(112);

var _pages = __webpack_require__(623);

var _pages2 = _interopRequireDefault(_pages);

var _I18n = __webpack_require__(630);

var _I18n2 = _interopRequireDefault(_I18n);

var _PDLine = __webpack_require__(3594);

var _PDLine2 = _interopRequireDefault(_PDLine);

var _ConfirmButton = __webpack_require__(1989);

var _ConfirmButton2 = _interopRequireDefault(_ConfirmButton);

var _forEach2 = __webpack_require__(116);

var _forEach3 = _interopRequireDefault(_forEach2);

var _isFunction2 = __webpack_require__(23);

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _defer2 = __webpack_require__(997);

var _defer3 = _interopRequireDefault(_defer2);

var _powered = __webpack_require__(677);

var _powered2 = _interopRequireDefault(_powered);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PDDetected(props) {
  var _React$createElement;

  var settings = props.settings,
      emitter = props.emitter,
      changePage = props.changePage,
      estimatedResult = props.estimatedResult;

  var _ref = estimatedResult || {},
      pd = _ref.pd;

  var styles = (0, _useDynamicStyles2.default)({ settings: settings, defaultStyles: _styles2.default, a11yStyles: _styles4.default });

  var _useContext = (0, _react.useContext)(_context.EngineContext),
      engineType = _useContext.engineType;

  var _useState = (0, _react.useState)({}),
      _useState2 = (0, _slicedToArray3.default)(_useState, 2),
      pdLineLeft = _useState2[0],
      setPdLineLeft = _useState2[1];

  var _useState3 = (0, _react.useState)({}),
      _useState4 = (0, _slicedToArray3.default)(_useState3, 2),
      pdLineRight = _useState4[0],
      setPdLineRight = _useState4[1];

  var _useState5 = (0, _react.useState)(3),
      _useState6 = (0, _slicedToArray3.default)(_useState5, 2),
      remainingSec = _useState6[0],
      setRemainingSec = _useState6[1];

  var counters = (0, _react.useRef)([]);

  var setLandmarks = function setLandmarks() {
    emitter.once(_ymkWebSdkCore.events.retrieveLandmarksComplete, function (r) {
      if (!Array.isArray(r)) {
        return;
      }
      if (settings.landmarkVersion === 'v1') {
        setPdLineLeft(r[10]);
        setPdLineRight(r[25]);
      } else {
        setPdLineLeft(r[74]);
        setPdLineRight(r[77]);
      }
    });
    (0, _defer3.default)(function () {
      return emitter.trigger(_ymkWebSdkCore.events.retrieveLandmakrs, ['display']);
    });
  };

  var startCounting = function startCounting(cb) {
    setRemainingSec(3);
    var c1 = setTimeout(function () {
      return setRemainingSec(2);
    }, 1000);
    var c2 = setTimeout(function () {
      return setRemainingSec(1);
    }, 2000);
    var c3 = setTimeout(function () {
      return (0, _isFunction3.default)(cb) && cb();
    }, 3000);
    counters.current.push(c1, c2, c3);
  };

  var clearCounters = function clearCounters() {
    (0, _forEach3.default)(counters.current, function (c) {
      return c && clearTimeout(c);
    });
    counters.current.length = 0;
  };

  var start = function start() {
    setLandmarks();
    !settings.enableAccessibilityMode && startCounting(onConfirm);
  };

  var onConfirm = function onConfirm() {
    engineType === _useLoadEngine.engineTypes.livecam && emitter.trigger(_ymkWebSdkCore.events.resume);
    changePage(_pages2.default.virtual_tryon);
  };

  (0, _react.useEffect)(function () {
    emitter.trigger(_ymkWebSdkCore.events.eyewearAutoPDResultOpened, [estimatedResult]);
    emitter.trigger(_ymkWebSdkCore.events.pageUpdated, [settings.i18n.getMessage('a11y.page.auto.pd.result')]);
    start();

    return function () {
      emitter.trigger(_ymkWebSdkCore.events.eyewearAutoPDResultClosed);
      clearCounters();
    };
  }, []);

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_PDLine2.default, { left: pdLineLeft, right: pdLineRight, pd: pd, settings: settings }),
    _react2.default.createElement(
      'div',
      { style: styles.textContainer },
      _react2.default.createElement(
        'div',
        { style: styles.text, tabIndex: 0 },
        _react2.default.createElement(_I18n2.default, { id: 'pd-detected-desc1', settings: settings, code: 'eyewear.auto.pd.result.desc1', values: { pd: pd } }),
        !settings.enableAccessibilityMode && _react2.default.createElement(_I18n2.default, { id: 'pd-detected-desc2', settings: settings, code: 'eyewear.auto.pd.result.desc2', values: { sec: remainingSec } })
      ),
      settings.enableAccessibilityMode && _react2.default.createElement(_ConfirmButton2.default, { id: 'pd-detected-confirm', settings: settings, buttonStyle: { padding: '0px 10px', margin: '50px 0 30px 0', fontSize: '15px' }, text: 'Start to try on', onClick: onConfirm })
    ),
    _react2.default.createElement(_powered2.default, (_React$createElement = { key: 'powered' }, (0, _defineProperty3.default)(_React$createElement, 'key', 'powered'), (0, _defineProperty3.default)(_React$createElement, 'settings', settings), _React$createElement))
  );
}
module.exports = exports['default'];

/***/ }),

/***/ 3592:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  textContainer: {
    position: 'absolute',
    zIndex: 3,
    left: 0,
    bottom: 0,
    width: '100%',
    height: '30%',
    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3))',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: '15px',
    lineHeight: '20px',
    color: 'white',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
    padding: '0 10px',
    borderRadius: '4px'
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 3593:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  text: {
    backgroundColor: 'rgba(0,0,0,0.6)'
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 3594:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PDLine;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _get2 = __webpack_require__(3);

var _get3 = _interopRequireDefault(_get2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HEIGHT = 20;
function PDLine(props) {
  var left = props.left,
      right = props.right,
      pd = props.pd,
      settings = props.settings;

  var TEXT_BOTTOM_MARGIN = settings.enableAccessibilityMode ? 15 : 5;

  if (!(0, _get3.default)(left, 'x') || !(0, _get3.default)(right, 'x')) {
    return false;
  }
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'svg',
      { style: { position: 'absolute', zIndex: 1, left: 0, top: 0, width: '100%', height: '100%' } },
      _react2.default.createElement(
        'g',
        null,
        _react2.default.createElement(
          'defs',
          null,
          _react2.default.createElement(
            'filter',
            { width: '1.2', height: '1.2', id: 'solid' },
            _react2.default.createElement('feFlood', { floodColor: 'black' }),
            _react2.default.createElement('feGaussianBlur', { stdDeviation: '2' }),
            _react2.default.createElement(
              'feComponentTransfer',
              null,
              _react2.default.createElement('feFuncA', { type: 'table', tableValues: '0 0 0 1' })
            ),
            _react2.default.createElement(
              'feComponentTransfer',
              null,
              _react2.default.createElement('feFuncA', { type: 'table', tableValues: '0 0.6 0.6 0.6' })
            ),
            _react2.default.createElement('feComposite', { 'in': 'SourceGraphic' })
          ),
          _react2.default.createElement('path', { id: 'upper-line', d: 'M' + left.x + ',' + (left.y - HEIGHT - TEXT_BOTTOM_MARGIN) + ' L' + right.x + ',' + (right.y - HEIGHT - TEXT_BOTTOM_MARGIN) })
        ),
        _react2.default.createElement(
          'text',
          { filter: settings.enableAccessibilityMode ? 'url(#solid)' : '', fill: 'white', style: { fontSize: '20px', fontWeight: 'bold', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' } },
          _react2.default.createElement(
            'textPath',
            { id: 'pd-detected-result', href: '#upper-line', startOffset: '50%', textAnchor: 'middle' },
            pd ? pd + 'mm' : ''
          )
        )
      ),
      _react2.default.createElement('polyline', { points: left.x + ',' + left.y + ' ' + left.x + ',' + (left.y - HEIGHT) + ' ' + right.x + ',' + (right.y - HEIGHT) + ' ' + right.x + ',' + right.y, fill: 'none', stroke: 'white', strokeWidth: 2 })
    )
  );
}
module.exports = exports['default'];

/***/ })

});