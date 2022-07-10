webpackJsonpYMK([66],{

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

/***/ 2454:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = __webpack_require__(72);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = VideoRecording;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _styles = __webpack_require__(2455);

var _styles2 = _interopRequireDefault(_styles);

var _context = __webpack_require__(567);

var _ymkWebSdkCore = __webpack_require__(112);

var _pages = __webpack_require__(623);

var _pages2 = _interopRequireDefault(_pages);

var _backandclose = __webpack_require__(1016);

var _backandclose2 = _interopRequireDefault(_backandclose);

var _MainButton = __webpack_require__(999);

var _MainButton2 = _interopRequireDefault(_MainButton);

var _powered = __webpack_require__(677);

var _powered2 = _interopRequireDefault(_powered);

var _dayjs = __webpack_require__(194);

var _dayjs2 = _interopRequireDefault(_dayjs);

var _get2 = __webpack_require__(3);

var _get3 = _interopRequireDefault(_get2);

var _defer2 = __webpack_require__(997);

var _defer3 = _interopRequireDefault(_defer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PROGRESS_INTERVAL_MS = 1000;
function VideoRecording(props) {
  var settings = props.settings,
      emitter = props.emitter,
      changePage = props.changePage,
      _previewProgress = props._previewProgress;

  var _useContext = (0, _react.useContext)(_context.EngineContext),
      blob = _useContext.blob,
      setBlob = _useContext.setBlob;

  var footerConfig = settings.getModuleSetting().getPanel('virtual_tryon', 'footer');

  var _useState = (0, _react.useState)(settings.recordModeMs),
      _useState2 = (0, _slicedToArray3.default)(_useState, 2),
      leftMs = _useState2[0],
      setLeftMs = _useState2[1];

  var _useState3 = (0, _react.useState)(_previewProgress || 0),
      _useState4 = (0, _slicedToArray3.default)(_useState3, 2),
      progress = _useState4[0],
      setProgress = _useState4[1];

  var progressTimer = (0, _react.useRef)(-1);
  var progressUnitPerInterval = 100 / props.settings.recordModeMs * PROGRESS_INTERVAL_MS;

  var startProgressTimer = function startProgressTimer() {
    setProgress(progressUnitPerInterval);

    progressTimer.current = setInterval(function () {
      var newProgress = progress + progressUnitPerInterval;
      if (newProgress > 100) {
        clearProgressTimer();
        return;
      }
      setProgress(function (prev) {
        return prev + progressUnitPerInterval;
      });
      setLeftMs(function (prev) {
        return prev - PROGRESS_INTERVAL_MS;
      });
    }, PROGRESS_INTERVAL_MS);
  };

  var clearProgressTimer = function clearProgressTimer() {
    clearInterval(progressTimer.current);
    progressTimer.current = -1;
  };

  var startRecording = function startRecording() {
    emitter.trigger(_ymkWebSdkCore.events.recordStarted, [settings.recordModeFps, settings.recordModeMs, 'source']);
    (0, _defer3.default)(function () {
      return startProgressTimer();
    });
  };

  var cancelRecording = function cancelRecording() {
    emitter.trigger(_ymkWebSdkCore.events.recordCancelled);
    clearProgressTimer();
    setProgress(0);
    setLeftMs(settings.recordModeMs);
  };

  var back = function back() {
    cancelRecording();
    if (!!blob) {
      goVideoTryOn(blob);
      return;
    }
    changePage(_pages2.default.video_init);
  };

  var goVideoTryOn = function goVideoTryOn() {
    var newBlob = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : blob;

    emitter.once(_ymkWebSdkCore.events.webcamChanged, function () {
      return changePage(_pages2.default.virtual_tryon);
    });
    emitter.trigger(_ymkWebSdkCore.events.webcamChange, [_ymkWebSdkCore.WEBCAM_TYPES.blob, newBlob]);
  };

  var handleRecordComplete = function handleRecordComplete(fps, ms, blob) {
    emitter.trigger(_ymkWebSdkCore.events.pageUpdated, [settings.i18n.getMessage('a11y.alert.record.success')]);
    clearProgressTimer();
    setProgress(100);
    setLeftMs(0);
    setBlob(blob);
    goVideoTryOn(blob);
  };

  (0, _react.useEffect)(function () {
    if (_previewProgress) {
      return;
    }
    emitter.trigger(_ymkWebSdkCore.events.pageUpdated, [settings.i18n.getMessage('a11y.page.video.recording')]);
    emitter.on(_ymkWebSdkCore.events.pause, cancelRecording);
    emitter.on(_ymkWebSdkCore.events.resume, startRecording);
    emitter.on(_ymkWebSdkCore.events.recordComplete, handleRecordComplete);
    emitter.once(_ymkWebSdkCore.events.cameraClosed, back);
    emitter.once(_ymkWebSdkCore.events.webcamChanged, startRecording);
    emitter.trigger(_ymkWebSdkCore.events.webcamChange, [_ymkWebSdkCore.WEBCAM_TYPES.webcam]);

    return function () {
      emitter.off(_ymkWebSdkCore.events.pause, cancelRecording);
      emitter.off(_ymkWebSdkCore.events.resume, startRecording);
      emitter.off(_ymkWebSdkCore.events.recordComplete, handleRecordComplete);
      emitter.off(_ymkWebSdkCore.events.cameraClosed, back);
      emitter.off(_ymkWebSdkCore.events.webcamChanged, startRecording);
    };
  }, []);

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_MainButton2.default, {
      id: 'cancel-recording',
      settings: settings,
      ariaLabel: settings.i18n.getMessage('a11y.label.video.record.stop'),
      onClick: back,
      position: (0, _get3.default)(footerConfig, 'configs.position'),
      style: (0, _extends3.default)({}, _styles2.default.cancelButton, (0, _get3.default)(footerConfig, 'blocks.recording.styles')),
      iconAlt: 'cancel',
      icon: (0, _get3.default)(footerConfig, 'blocks.recording.configs.imgSrc') || __webpack_require__(2456),
      enableProgress: true,
      progress: progress,
      trackColor: (0, _get3.default)(footerConfig, 'blocks.recording.configs.track') || 'rgba(255, 255, 255, 0.5)',
      fillColor: (0, _get3.default)(footerConfig, 'blocks.recording.configs.fill') || 'rgba(255, 0, 0, 1)',
      transitionDuration: PROGRESS_INTERVAL_MS + 'ms',
      label: (0, _dayjs2.default)(leftMs).format('m:ss'),
      labelId: 'record-timer'
    }),
    _react2.default.createElement(_backandclose2.default, { key: 'videorecording_backandclose', settings: settings, emitter: emitter, isBackDisabled: true, keepWebcamOnPopup: true }),
    _react2.default.createElement(_powered2.default, { key: 'powered', settings: settings })
  );
}
module.exports = exports['default'];

/***/ }),

/***/ 2455:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  cancelButton: {
    backgroundColor: 'rgba(255, 255, 255, 1)'
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 2456:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8BAMAAADI0sRBAAAAElBMVEUAAAD/AAD/AAD/AAD/AAD/AADZchInAAAABXRSTlMA7yC/r1EOHTEAAABFSURBVDjLYxgFAwWYDENRQIgCirRiKBoQQpF2RZcORpEORQeB+KVDR6VHpUelqSktil/aFF02hJTsz4SW/4UVGEbBAAEAF0vUPcEBWcEAAAAASUVORK5CYII="

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