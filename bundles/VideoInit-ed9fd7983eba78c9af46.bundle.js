webpackJsonpYMK([57],{

/***/ 1017:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbD0iI2VmM2Y3OCIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00LjI3NjYgNC41NzQ1NEg2LjUzMDM1TDguNTUyMjQgMi41NzExM0M4Ljg3NzggMi4yMjE2NyA5LjMzODk5IDIgOS44NTYyOSAySDE0LjMwNzZDMTQuNzk1NCAyIDE1LjIzNyAyLjE5NTE5IDE1LjU1ODcgMi41MTA3NUwxNS41NjI2IDIuNTEzOTZDMTUuNTY0MSAyLjUxNTk1IDE1LjU2NTcgMi41MTc0NCAxNS41Njc0IDIuNTE4OTlMMTUuNTY5NCAyLjUyMDk4TDE3LjYzNDQgNC41NzQ1NEgxOS43MjM0QzIxLjUzMyA0LjU3NDU0IDIzIDYuMDQxNTIgMjMgNy44NTExM1YxNy45MTVDMjMgMTkuNzI0NiAyMS41MzMgMjEuMTkxNiAxOS43MjM0IDIxLjE5MTZINC4yNzY2QzIuNDY2OTggMjEuMTkxNiAxIDE5LjcyNDYgMSAxNy45MTVWNy44NTExM0MxIDYuMDQxNTIgMi40NjY5OCA0LjU3NDU0IDQuMjc2NiA0LjU3NDU0Wk0xOC41OTc2IDguNDM2MjNDMTguNTk3NiA5LjAxNzk3IDE5LjA2OSA5LjQ4OTMyIDE5LjY1MSA5LjQ4OTMyQzIwLjIzMjggOS40ODkzMiAyMC43MDQgOS4wMTc5NyAyMC43MDQgOC40MzYyM0MyMC43MDQgNy44NTQ0OSAyMC4yMzI4IDcuMzgyOTQgMTkuNjUxIDcuMzgyOTRDMTkuMDY5IDcuMzgyOTQgMTguNTk3NiA3Ljg1NDQ5IDE4LjU5NzYgOC40MzYyM1pNNi40Mjc1NSAxMi43NjU5QzYuNDI3NTUgOS42Njg3MSA4Ljk0NzU1IDcuMTQ4ODcgMTIuMDQ0NyA3LjE0ODg3QzE1LjE0MTYgNy4xNDg4NyAxNy42NjE2IDkuNjY4NzEgMTcuNjYxNiAxMi43NjU5QzE3LjY2MTYgMTUuODYzMSAxNS4xNDE2IDE4LjM4MjkgMTIuMDQ0NyAxOC4zODI5QzguOTQ3NTUgMTguMzgyOSA2LjQyNzU1IDE1Ljg2MzEgNi40Mjc1NSAxMi43NjU5Wk0xMi4wNDQ1IDE3LjIxMjZDOS41OTI1MSAxNy4yMTI2IDcuNTk3NjQgMTUuMjE4IDcuNTk3NjQgMTIuNzY1OUM3LjU5NzY0IDEwLjMxMzkgOS41OTI1MSA4LjMxOTAxIDEyLjA0NDUgOC4zMTkwMUMxNC40OTY2IDguMzE5MDEgMTYuNDkxMyAxMC4zMTM5IDE2LjQ5MTMgMTIuNzY1OUMxNi40OTEzIDE1LjIxOCAxNC40OTY2IDE3LjIxMjYgMTIuMDQ0NSAxNy4yMTI2WiIgLz4KPC9zdmc+Cg=="

/***/ }),

/***/ 1939:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ProgressCircle;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STROKE_WIDTH = 25;
var SQUARE_LENGTH = 350;
var SQUARE_PERIMETER = 4 * SQUARE_LENGTH;
function ProgressCircle(props) {
  var size = props.size,
      progress = props.progress,
      progressColor = props.progressColor,
      _props$defaultColor = props.defaultColor,
      defaultColor = _props$defaultColor === undefined ? '#909090' : _props$defaultColor,
      _props$defaultOpacity = props.defaultOpacity,
      defaultOpacity = _props$defaultOpacity === undefined ? 0.5 : _props$defaultOpacity,
      style = props.style,
      _props$transitionDura = props.transitionDuration,
      transitionDuration = _props$transitionDura === undefined ? '1s' : _props$transitionDura,
      _props$borderRadius = props.borderRadius,
      borderRadius = _props$borderRadius === undefined ? '50%' : _props$borderRadius;


  var convertBorderRadius = function convertBorderRadius(borderRadius) {
    if (borderRadius.endsWith('%')) {
      return borderRadius.slice(0, -1) / 100;
    }
    if (borderRadius.endsWith('px')) {
      return 0.5;
    }
    return borderRadius;
  };

  var convertedBorderRadius = convertBorderRadius(borderRadius);
  var progressBorderRadius = convertedBorderRadius <= 0.5 ? SQUARE_LENGTH * convertedBorderRadius : SQUARE_LENGTH * 0.5;

  var getPerimeterRatio = function getPerimeterRatio(borderRadius) {
    return Math.PI / 4 + (1 - Math.PI / 4) * (SQUARE_LENGTH - borderRadius) / SQUARE_LENGTH;
  };

  var getOffset = function getOffset(progress, borderRadius) {
    return (100 - progress) / 100 * SQUARE_PERIMETER * getPerimeterRatio(borderRadius);
  };

  var handleClick = function handleClick() {
    var onClick = props.onClick;

    if (!onClick) {
      return;
    }
    onClick();
  };

  return _react2.default.createElement(
    'svg',
    { width: size, height: size, viewBox: '-25 -25 400 400', style: style, onClick: handleClick },
    _react2.default.createElement('rect', {
      width: SQUARE_LENGTH,
      height: SQUARE_LENGTH,
      rx: progressBorderRadius,
      ry: progressBorderRadius,
      stroke: defaultColor,
      strokeOpacity: defaultOpacity,
      strokeWidth: STROKE_WIDTH,
      fill: 'none'
    }),
    _react2.default.createElement('rect', {
      stroke: progress > 0 ? progressColor : '',
      width: SQUARE_LENGTH,
      height: SQUARE_LENGTH,
      strokeDasharray: SQUARE_PERIMETER * getPerimeterRatio(progressBorderRadius),
      strokeWidth: STROKE_WIDTH,
      strokeDashoffset: getOffset(progress, progressBorderRadius),
      rx: progressBorderRadius,
      ry: progressBorderRadius,
      strokeLinecap: 'round',
      fill: 'none',
      style: { transition: 'stroke-dashoffset ' + transitionDuration + ' ease-out' }
    })
  );
}
module.exports = exports['default'];

/***/ }),

/***/ 2033:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

exports.default = SubButton;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _styles = __webpack_require__(976);

var _styles2 = _interopRequireDefault(_styles);

var _image = __webpack_require__(624);

var _image2 = _interopRequireDefault(_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SubButton(props) {
  var id = props.id,
      ariaLabel = props.ariaLabel,
      style = props.style,
      onClick = props.onClick,
      icon = props.icon,
      alt = props.alt,
      iconStyle = props.iconStyle,
      _props$position = props.position,
      position = _props$position === undefined ? 'bottom' : _props$position;


  var getStyle = function getStyle() {
    if (position === 'top') {
      return (0, _extends3.default)({}, _styles2.default.subButton, _styles2.default.positionTop, style);
    }
    return (0, _extends3.default)({}, _styles2.default.subButton, _styles2.default.positionBottom, style);
  };

  return _react2.default.createElement(
    'button',
    { type: 'button', id: id, 'aria-label': ariaLabel, style: getStyle(), onClick: onClick },
    !!icon && _react2.default.createElement(_image2.default, { alt: alt, src: icon, style: (0, _extends3.default)({}, _styles2.default.subButtonIcon, iconStyle) })
  );
}
module.exports = exports['default'];

/***/ }),

/***/ 2034:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = __webpack_require__(72);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = ModeTitle;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _ScreenCenterText = __webpack_require__(2212);

var _ScreenCenterText2 = _interopRequireDefault(_ScreenCenterText);

var _get2 = __webpack_require__(3);

var _get3 = _interopRequireDefault(_get2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ModeTitle(props) {
  var id = props.id,
      settings = props.settings,
      style = props.style,
      _props$text = props.text,
      text = _props$text === undefined ? '' : _props$text,
      _props$displayDuratio = props.displayDuration,
      displayDuration = _props$displayDuratio === undefined ? 2000 : _props$displayDuratio;

  var footerConfig = settings.getModuleSetting().getPanel('virtual_tryon', 'footer');

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray3.default)(_useState, 2),
      isShow = _useState2[0],
      setIsShow = _useState2[1];

  var timeoutRef = (0, _react.useRef)(0);

  var getStyle = function getStyle() {
    return (0, _get3.default)(footerConfig, 'configs.position') === 'top' ? (0, _extends3.default)({ top: '20vh' }, style) : style;
  };

  var show = function show() {
    setIsShow(true);
    timeoutRef.current && clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(hide, displayDuration);
  };

  var hide = function hide() {
    setIsShow(false);
    timeoutRef.current && clearTimeout(timeoutRef.current);
    timeoutRef.current = 0;
  };

  (0, _react.useEffect)(function () {
    show();

    return function () {
      timeoutRef.current && clearTimeout(timeoutRef.current);
      timeoutRef.current = 0;
    };
  }, []);

  return _react2.default.createElement(_ScreenCenterText2.default, { id: id, settings: settings, style: (0, _extends3.default)({}, getStyle(), { display: isShow ? 'block' : 'none' }), text: text });
}
module.exports = exports['default'];

/***/ }),

/***/ 2035:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00LjI3NjYgNC41NzQ1NEg2LjUzMDM1TDguNTUyMjQgMi41NzExM0M4Ljg3NzggMi4yMjE2NyA5LjMzODk5IDIgOS44NTYyOSAySDE0LjMwNzZDMTQuNzk1NCAyIDE1LjIzNyAyLjE5NTE5IDE1LjU1ODcgMi41MTA3NUwxNS41NjI2IDIuNTEzOTZDMTUuNTY0MSAyLjUxNTk1IDE1LjU2NTcgMi41MTc0NCAxNS41Njc0IDIuNTE4OTlMMTUuNTY5NCAyLjUyMDk4TDE3LjYzNDQgNC41NzQ1NEgxOS43MjM0QzIxLjUzMyA0LjU3NDU0IDIzIDYuMDQxNTIgMjMgNy44NTExM1YxNy45MTVDMjMgMTkuNzI0NiAyMS41MzMgMjEuMTkxNiAxOS43MjM0IDIxLjE5MTZINC4yNzY2QzIuNDY2OTggMjEuMTkxNiAxIDE5LjcyNDYgMSAxNy45MTVWNy44NTExM0MxIDYuMDQxNTIgMi40NjY5OCA0LjU3NDU0IDQuMjc2NiA0LjU3NDU0Wk0xOC41OTc2IDguNDM2MjNDMTguNTk3NiA5LjAxNzk3IDE5LjA2OSA5LjQ4OTMyIDE5LjY1MSA5LjQ4OTMyQzIwLjIzMjggOS40ODkzMiAyMC43MDQgOS4wMTc5NyAyMC43MDQgOC40MzYyM0MyMC43MDQgNy44NTQ0OSAyMC4yMzI4IDcuMzgyOTQgMTkuNjUxIDcuMzgyOTRDMTkuMDY5IDcuMzgyOTQgMTguNTk3NiA3Ljg1NDQ5IDE4LjU5NzYgOC40MzYyM1pNNi40Mjc1NSAxMi43NjU5QzYuNDI3NTUgOS42Njg3MSA4Ljk0NzU1IDcuMTQ4ODcgMTIuMDQ0NyA3LjE0ODg3QzE1LjE0MTYgNy4xNDg4NyAxNy42NjE2IDkuNjY4NzEgMTcuNjYxNiAxMi43NjU5QzE3LjY2MTYgMTUuODYzMSAxNS4xNDE2IDE4LjM4MjkgMTIuMDQ0NyAxOC4zODI5QzguOTQ3NTUgMTguMzgyOSA2LjQyNzU1IDE1Ljg2MzEgNi40Mjc1NSAxMi43NjU5Wk0xMi4wNDQ1IDE3LjIxMjZDOS41OTI1MSAxNy4yMTI2IDcuNTk3NjQgMTUuMjE4IDcuNTk3NjQgMTIuNzY1OUM3LjU5NzY0IDEwLjMxMzkgOS41OTI1MSA4LjMxOTAxIDEyLjA0NDUgOC4zMTkwMUMxNC40OTY2IDguMzE5MDEgMTYuNDkxMyAxMC4zMTM5IDE2LjQ5MTMgMTIuNzY1OUMxNi40OTEzIDE1LjIxOCAxNC40OTY2IDE3LjIxMjYgMTIuMDQ0NSAxNy4yMTI2WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg=="

/***/ }),

/***/ 2036:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAqCAMAAADPj1gPAAAAM1BMVEUAAAD///////////////////////////////////////////////////////////////+3leKCAAAAEHRSTlMAH2B/EN/vn4+/QG9PMM+v+ev1zwAAAKhJREFUSMft0N0KwjAMhuEvXfrr1O/+r1aMzm5gS7cjwb1HpfAEEpx9TV07aSrx7HTBtqu+H5G9wgZJXuYo+0lFmkhOsGSU6RS4nxVPDrBUnK+sZHKEZQDzwiSSYyw+j23MlhplQYDJmDM0yOjvr3VuZIP1O9nJfoyVeIgJnD/EYPAAg6T9zJK4n1mzXzMNfab45HxlSF0VsUom0mHAZcEmSfVDpRn+rgeZO1CuPvdxJgAAAABJRU5ErkJggg=="

/***/ }),

/***/ 2212:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__(170);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = ScreenCenterText;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _styles = __webpack_require__(2180);

var _styles2 = _interopRequireDefault(_styles);

var _styles3 = __webpack_require__(2181);

var _styles4 = _interopRequireDefault(_styles3);

var _uiUtils = __webpack_require__(565);

var _uiUtils2 = _interopRequireDefault(_uiUtils);

var _useDynamicStyles = __webpack_require__(747);

var _useDynamicStyles2 = _interopRequireDefault(_useDynamicStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ScreenCenterText(props) {
  var settings = props.settings,
      style = props.style,
      resizable = props.resizable,
      text = props.text,
      children = props.children,
      textProps = (0, _objectWithoutProperties3.default)(props, ['settings', 'style', 'resizable', 'text', 'children']);

  var styles = (0, _useDynamicStyles2.default)({ settings: settings, defaultStyles: _styles2.default, a11yStyles: _styles4.default });

  var getTextStyle = function getTextStyle() {
    var s = (0, _extends3.default)({}, styles.screenCenterText, style);
    return resizable ? (0, _extends3.default)({}, styles.resizableText, _uiUtils2.default.adjustText(s, settings)) : s;
  };

  if (!text && !children) {
    return false;
  }
  return _react2.default.createElement(
    'h3',
    (0, _extends3.default)({ style: getTextStyle() }, textProps),
    text || children
  );
}
module.exports = exports['default'];

/***/ }),

/***/ 2466:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(72);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = useZoom;

var _react = __webpack_require__(459);

var _ymkWebSdkCore = __webpack_require__(112);

var _context = __webpack_require__(567);

var _useLoadEngine = __webpack_require__(629);

var _throttle2 = __webpack_require__(19);

var _throttle3 = _interopRequireDefault(_throttle2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MAX_ZOOM_LEVEL = 3;
var MIN_ZOOM_LEVEL = 0;

function useZoom(props) {
  var emitter = props.emitter,
      _props$disabled = props.disabled,
      disabled = _props$disabled === undefined ? false : _props$disabled;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray3.default)(_useState, 2),
      zoomDisabled = _useState2[0],
      setZoomDisabled = _useState2[1];

  var _useState3 = (0, _react.useState)(MIN_ZOOM_LEVEL),
      _useState4 = (0, _slicedToArray3.default)(_useState3, 2),
      zoomLevel = _useState4[0],
      setZoomLevel = _useState4[1];

  var _useContext = (0, _react.useContext)(_context.EngineContext),
      engineType = _useContext.engineType,
      webcamType = _useContext.webcamType;

  var isVideoMode = engineType === _useLoadEngine.engineTypes.livecam && webcamType !== _ymkWebSdkCore.WEBCAM_TYPES.webcam;

  var canZoom = function canZoom() {
    if (_ymkWebSdkCore.browserUtils.isMobile() && !isVideoMode) {
      return false;
    }
    if (zoomDisabled || disabled) {
      return false;
    }
    if (_ymkWebSdkCore.browserUtils.isIE()) {
      return false;
    }
    if (!_ymkWebSdkCore.browserUtils.isEngineDisabled()) {
      return true;
    }
    return true;
  };

  var canZoomIn = function canZoomIn() {
    return canZoom() && zoomLevel < MAX_ZOOM_LEVEL;
  };

  var canZoomOut = function canZoomOut() {
    return canZoom() && zoomLevel > MIN_ZOOM_LEVEL;
  };

  var zoom = function zoom(newZoomlevel) {
    if (zoomLevel === newZoomlevel) {
      return;
    }
    emitter.trigger(_ymkWebSdkCore.events.zoom, [newZoomlevel]);
    setZoomLevel(newZoomlevel);
  };

  var resetZoomLevel = function resetZoomLevel() {
    return zoom(MIN_ZOOM_LEVEL);
  };

  var onZoomInClick = function onZoomInClick() {
    return canZoomIn() && zoom(zoomLevel >= MAX_ZOOM_LEVEL ? MAX_ZOOM_LEVEL : zoomLevel + 1);
  };

  var onZoomOutClick = function onZoomOutClick() {
    return canZoomOut() && zoom(zoomLevel <= MIN_ZOOM_LEVEL ? MIN_ZOOM_LEVEL : zoomLevel - 1);
  };

  var handleZoom = function handleZoom(newZoomLevel) {
    return newZoomLevel >= MIN_ZOOM_LEVEL && newZoomLevel <= MAX_ZOOM_LEVEL && setZoomLevel(newZoomLevel);
  };

  (0, _react.useEffect)(function () {
    var disallowZoom = function disallowZoom() {
      return setZoomDisabled(true);
    };
    var allowZoomIfLiveHairDyeNotApplied = function allowZoomIfLiveHairDyeNotApplied(skuType) {
      return (!skuType || skuType === 'hairdye') && setZoomDisabled(false);
    };

    emitter.on(_ymkWebSdkCore.events.liveHairDyeApplied, disallowZoom);
    emitter.on(_ymkWebSdkCore.events.reset, allowZoomIfLiveHairDyeNotApplied);
    emitter.on(_ymkWebSdkCore.events.zoom, handleZoom);
    return function () {
      emitter.off(_ymkWebSdkCore.events.liveHairDyeApplied, disallowZoom);
      emitter.off(_ymkWebSdkCore.events.reset, allowZoomIfLiveHairDyeNotApplied);
      emitter.off(_ymkWebSdkCore.events.zoom, handleZoom);
    };
  }, []);

  return {
    resetZoomLevel: resetZoomLevel,
    canZoom: canZoom,
    canZoomIn: canZoomIn,
    canZoomOut: canZoomOut,
    onZoomInClick: (0, _throttle3.default)(onZoomInClick, 100, { leading: false }),
    onZoomOutClick: (0, _throttle3.default)(onZoomOutClick, 100, { leading: false })
  };
}
module.exports = exports['default'];

/***/ }),

/***/ 3580:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = VideoInit;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _styles = __webpack_require__(3581);

var _styles2 = _interopRequireDefault(_styles);

var _ymkWebSdkCore = __webpack_require__(112);

var _pages = __webpack_require__(623);

var _pages2 = _interopRequireDefault(_pages);

var _useZoom2 = __webpack_require__(2466);

var _useZoom3 = _interopRequireDefault(_useZoom2);

var _ScreenText = __webpack_require__(2027);

var _ScreenText2 = _interopRequireDefault(_ScreenText);

var _ModeTitle = __webpack_require__(2034);

var _ModeTitle2 = _interopRequireDefault(_ModeTitle);

var _MainButton = __webpack_require__(999);

var _MainButton2 = _interopRequireDefault(_MainButton);

var _SubButton = __webpack_require__(2033);

var _SubButton2 = _interopRequireDefault(_SubButton);

var _backandclose = __webpack_require__(1016);

var _backandclose2 = _interopRequireDefault(_backandclose);

var _get2 = __webpack_require__(3);

var _get3 = _interopRequireDefault(_get2);

var _powered = __webpack_require__(677);

var _powered2 = _interopRequireDefault(_powered);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function VideoInit(props) {
  var settings = props.settings,
      emitter = props.emitter,
      changePage = props.changePage;

  var footerConfig = settings.getModuleSetting().getPanel('virtual_tryon', 'footer');

  var _useZoom = (0, _useZoom3.default)({ emitter: emitter, settings: settings }),
      resetZoomLevel = _useZoom.resetZoomLevel;

  var onRecordClick = function onRecordClick() {
    return changePage(_pages2.default.video_recording);
  };

  var onBackToWebcamClick = function onBackToWebcamClick() {
    return changePage(_pages2.default.virtual_tryon);
  };

  (0, _react.useEffect)(function () {
    emitter.trigger(_ymkWebSdkCore.events.pageUpdated, [settings.i18n.getMessage('a11y.page.try.on.video')]);
    resetZoomLevel();
    emitter.trigger(_ymkWebSdkCore.events.reset);
  }, []);

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_ModeTitle2.default, { id: 'video-mode-title', settings: settings, text: settings.i18n.getMessage('video.mode.title') }),
    _react2.default.createElement(_ScreenText2.default, { id: 'video-mode-hint', resizable: true, settings: settings, style: _styles2.default.videoModeHint, text: settings.i18n.getMessage('video.mode.hint') }),
    _react2.default.createElement(_MainButton2.default, {
      id: 'videoinit-record-start',
      settings: settings,
      ariaLabel: settings.i18n.getMessage('a11y.label.video.record'),
      onClick: onRecordClick,
      position: (0, _get3.default)(footerConfig, 'configs.position'),
      style: (0, _get3.default)(footerConfig, 'blocks.video.styles'),
      iconAlt: 'record',
      icon: (0, _get3.default)(footerConfig, 'blocks.video.configs.imgSrc') || __webpack_require__(2036)
    }),
    _react2.default.createElement(_SubButton2.default, {
      id: 'videoinit-live-mode',
      ariaLabel: settings.i18n.getMessage('a11y.label.live.mode'),
      onClick: onBackToWebcamClick,
      position: (0, _get3.default)(footerConfig, 'configs.position'),
      iconAlt: 'live',
      icon: settings.enableAccessibilityMode ? __webpack_require__(1017) : (0, _get3.default)(footerConfig, 'blocks.camera.configs.imgSrc') || __webpack_require__(2035)
    }),
    _react2.default.createElement(_backandclose2.default, {
      key: 'videoinit_backandclose',
      settings: settings,
      emitter: emitter,
      onBack: function onBack() {
        emitter.trigger(_ymkWebSdkCore.events.closeEngine);
        changePage(_pages2.default.launcher);
      },
      backAriaLabel: settings.i18n.getMessageWithValues('a11y.label.back.to', { pageTitle: settings.i18n.getMessage('a11y.page.launcher') })
    }),
    _react2.default.createElement(_powered2.default, { key: 'powered', settings: settings })
  );
}
module.exports = exports['default'];

/***/ }),

/***/ 3581:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  rightButtons: {
    zIndex: 4,
    position: 'fixed',
    right: 0,
    bottom: '20px',
    width: '48px',
    paddingLeft: '190px'
  },
  videoModeHint: {
    width: '76vw',
    left: '12vw',
    bottom: '100px'
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 976:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BUTTON = {
  position: 'fixed',
  zIndex: 5,
  height: '42px',
  width: '42px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  borderRadius: '50%',
  backgroundColor: 'transparent',
  border: '1px solid transparent'
};

var ICON = {
  width: '26px'
};

exports.default = {
  mainButton: (0, _extends3.default)({}, BUTTON),
  mainButtonIcon: (0, _extends3.default)({}, ICON),
  mainButtonLabel: {
    top: '-40px',
    left: '50%',
    transform: 'translateX(-50%)'
  },
  subButton: (0, _extends3.default)({}, BUTTON, {
    marginLeft: '62px'
  }),
  subButtonIcon: (0, _extends3.default)({}, ICON, {
    border: '1px solid transparent',
    backgroundColor: 'transparent'
  }),
  positionBottom: {
    bottom: '33px'
  },
  positionTop: {
    top: '46px'
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 999:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

exports.default = MainButton;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _styles = __webpack_require__(976);

var _styles2 = _interopRequireDefault(_styles);

var _progresscircle = __webpack_require__(1939);

var _progresscircle2 = _interopRequireDefault(_progresscircle);

var _ScreenText = __webpack_require__(2027);

var _ScreenText2 = _interopRequireDefault(_ScreenText);

var _image = __webpack_require__(624);

var _image2 = _interopRequireDefault(_image);

var _get2 = __webpack_require__(3);

var _get3 = _interopRequireDefault(_get2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MainButton(props) {
  var id = props.id,
      ariaLabel = props.ariaLabel,
      style = props.style,
      onClick = props.onClick,
      icon = props.icon,
      alt = props.alt,
      iconStyle = props.iconStyle,
      _props$position = props.position,
      position = _props$position === undefined ? 'bottom' : _props$position,
      enableProgress = props.enableProgress,
      progress = props.progress,
      trackColor = props.trackColor,
      fillColor = props.fillColor,
      transitionDuration = props.transitionDuration,
      label = props.label,
      labelId = props.labelId,
      settings = props.settings;


  var getStyle = function getStyle() {
    if (position === 'top') {
      return (0, _extends3.default)({}, _styles2.default.mainButton, _styles2.default.positionTop, style);
    }
    return (0, _extends3.default)({}, _styles2.default.mainButton, _styles2.default.positionBottom, style);
  };

  var getButtonStyle = function getButtonStyle() {
    return enableProgress ? (0, _extends3.default)({}, getStyle(), { border: 'none' }) : getStyle();
  };

  var getBorderRadius = function getBorderRadius() {
    return (0, _get3.default)(getStyle(), 'borderRadius', '50%');
  };

  var getLabelStyles = function getLabelStyles() {
    return { top: position === 'top' ? '50px' : '-40px' };
  };

  return _react2.default.createElement(
    'button',
    { id: id, type: 'button', 'aria-label': ariaLabel, style: getButtonStyle(), onClick: onClick },
    label && _react2.default.createElement(_ScreenText2.default, { id: labelId, settings: settings, style: (0, _extends3.default)({}, _styles2.default.mainButtonLabel, getLabelStyles()), text: label }),
    enableProgress && _react2.default.createElement(_progresscircle2.default, {
      progress: progress,
      defaultColor: trackColor,
      progressColor: fillColor,
      size: 50,
      transitionDuration: transitionDuration,
      borderRadius: getBorderRadius(),
      onClick: onClick,
      style: { position: 'absolute' }
    }),
    !!icon && _react2.default.createElement(_image2.default, { alt: alt, src: icon, style: (0, _extends3.default)({}, _styles2.default.mainButtonIcon, iconStyle) })
  );
}
module.exports = exports['default'];

/***/ })

});