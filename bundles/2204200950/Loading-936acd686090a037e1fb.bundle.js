webpackJsonpYMK([63],{

/***/ 2039:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(8);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.default = useBackgroundImage;

var _react = __webpack_require__(459);

var _ymkWebSdkCore = __webpack_require__(112);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useBackgroundImage(_ref) {
  var _this = this;

  var lastBackgroundImage = _ref.lastBackgroundImage,
      backgroundImage = _ref.backgroundImage,
      setViewBox = _ref.setViewBox;

  (0, _react.useEffect)(function () {
    lastBackgroundImage.current !== backgroundImage && setViewBoxByBackgroundImage();
  }, [backgroundImage]);

  var setViewBoxByBackgroundImage = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var size;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (backgroundImage) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return', setViewBox(''));

            case 2:
              _context.next = 4;
              return _ymkWebSdkCore.mediaUtils.getImageSize(backgroundImage);

            case 4:
              size = _context.sent;

              size && size.width && size.height && setViewBox('0 0 ' + size.width + ' ' + size.height);

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function setViewBoxByBackgroundImage() {
      return _ref2.apply(this, arguments);
    };
  }();
}
module.exports = exports['default'];

/***/ }),

/***/ 2459:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Loading;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _uiUtils = __webpack_require__(565);

var _uiUtils2 = _interopRequireDefault(_uiUtils);

var _image = __webpack_require__(624);

var _image2 = _interopRequireDefault(_image);

var _svgloading = __webpack_require__(2460);

var _svgloading2 = _interopRequireDefault(_svgloading);

var _powered = __webpack_require__(677);

var _powered2 = _interopRequireDefault(_powered);

var _styles = __webpack_require__(2465);

var _styles2 = _interopRequireDefault(_styles);

var _get2 = __webpack_require__(3);

var _get3 = _interopRequireDefault(_get2);

var _ymkWebSdkCore = __webpack_require__(112);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Loading(props) {
  var settings = props.settings,
      emitter = props.emitter,
      _previewProgress = props._previewProgress,
      _previewFeature = props._previewFeature;

  var loadingConfig = settings.getModuleSetting().getBlock('loading', 'body', 'image');

  var loadingType = _uiUtils2.default.getLoadingType(settings);

  var showEyewearLoader = function showEyewearLoader() {
    return _previewFeature ? _previewFeature === 'eyewear' : settings.features.eyewear;
  };

  var showBeardLoader = function showBeardLoader() {
    return _previewFeature ? _previewFeature === 'bearddye' : settings.features.bearddye;
  };

  (0, _react.useEffect)(function () {
    emitter.trigger(_ymkWebSdkCore.events.pageUpdated, [settings.i18n.getMessage('a11y.page.loading')]);
  }, []);

  if (loadingType === 'progress' && showEyewearLoader()) {
    return _react2.default.createElement(_svgloading2.default, { type: 'EYEWEAR', settings: settings, emitter: emitter, _previewProgress: _previewProgress });
  }
  if (loadingType === 'progress' && showBeardLoader()) {
    return _react2.default.createElement(_svgloading2.default, { type: 'BEARD', settings: settings, emitter: emitter, _previewProgress: _previewProgress });
  }
  return _react2.default.createElement(
    'div',
    { style: _uiUtils2.default.getTemplateBackground(settings), id: 'loading' },
    _react2.default.createElement(
      'div',
      { style: _styles2.default.containerLoading },
      _react2.default.createElement(_image2.default, { alt: 'loading', style: { width: (0, _get3.default)(loadingConfig, 'styles.width') }, src: _uiUtils2.default.getLoaderImage(settings) })
    ),
    _react2.default.createElement(_powered2.default, { key: 'powered', settings: settings })
  );
}
module.exports = exports['default'];

/***/ }),

/***/ 2460:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = __webpack_require__(72);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = SvgLoading;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _styles = __webpack_require__(2461);

var _styles2 = _interopRequireDefault(_styles);

var _ymkWebSdkCore = __webpack_require__(112);

var _EyewearMask = __webpack_require__(2462);

var _EyewearMask2 = _interopRequireDefault(_EyewearMask);

var _BeardMask = __webpack_require__(2463);

var _BeardMask2 = _interopRequireDefault(_BeardMask);

var _HandARMask = __webpack_require__(2464);

var _HandARMask2 = _interopRequireDefault(_HandARMask);

var _uiUtils = __webpack_require__(565);

var _uiUtils2 = _interopRequireDefault(_uiUtils);

var _toInteger2 = __webpack_require__(1);

var _toInteger3 = _interopRequireDefault(_toInteger2);

var _get2 = __webpack_require__(3);

var _get3 = _interopRequireDefault(_get2);

var _powered = __webpack_require__(677);

var _powered2 = _interopRequireDefault(_powered);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SvgLoading(props) {
  var emitter = props.emitter,
      settings = props.settings,
      _props$type = props.type,
      type = _props$type === undefined ? 'EYEWEAR' : _props$type,
      _previewProgress = props._previewProgress;

  var _useState = (0, _react.useState)(_previewProgress || 0),
      _useState2 = (0, _slicedToArray3.default)(_useState, 2),
      progress = _useState2[0],
      setProgress = _useState2[1];

  var moduleSetting = settings.getModuleSetting();
  var loadingConfig = moduleSetting.getPanel('loading', 'body');
  var generalConfig = moduleSetting.getGeneral();

  (0, _react.useEffect)(function () {
    emitter.on(_ymkWebSdkCore.events.loading, setAdjustedProgress);
    return function () {
      emitter.off(_ymkWebSdkCore.events.loading, setAdjustedProgress);
    };
  }, []);

  var adjustProgress = function adjustProgress(progress) {
    if (type !== 'HAND_AR') {
      return progress;
    }
    if (progress <= 80) {
      return (0, _toInteger3.default)(progress / 2);
    }
    if (progress === 81) {
      return 50;
    }
    if (progress === 82) {
      return 60;
    }
    if (progress === 83) {
      return 70;
    }
    if (progress === 84) {
      return 80;
    }
    return progress;
  };

  var setAdjustedProgress = function setAdjustedProgress(progress) {
    return setProgress(adjustProgress(progress));
  };

  var getMaskSize = function getMaskSize(type) {
    if (type === 'EYEWEAR') {
      return { maskWidth: 159, maskHeight: 55 };
    }
    if (type === 'BEARD') {
      return { maskWidth: 120, maskHeight: 120 };
    }
    if (type === 'HAND_AR') {
      return { maskWidth: 31, maskHeight: 65 };
    }
  };

  var getBackground = function getBackground(type) {
    var backgroundType = (0, _get3.default)(generalConfig, 'configs.backgroundType');
    switch (backgroundType) {
      case 'image':
        {
          return {
            backgroundType: 'image',
            backgroundImage: _uiUtils2.default.getBackgroundImage(settings)
          };
        }
      case 'color':
        {
          return {
            backgroundType: 'color',
            backgroundColor: (0, _get3.default)(generalConfig, 'styles.backgroundColor') || 'rgba(0, 0, 0, 1)'
          };
        }
      default:
        {
          if (type === 'BEARD' || type === 'HAND_AR') {
            return {
              backgroundType: 'image',
              backgroundImage: _uiUtils2.default.getBackgroundImage(settings)
            };
          } else {
            return {
              backgroundType: 'color',
              backgroundColor: (0, _get3.default)(generalConfig, 'styles.backgroundColor') || 'rgba(0, 0, 0, 1)'
            };
          }
        }
    }
  };

  var _getMaskSize = getMaskSize(type),
      maskWidth = _getMaskSize.maskWidth,
      maskHeight = _getMaskSize.maskHeight;

  var maskXMargin = (settings.displayWidth - maskWidth) * 0.5;
  var progressStartRight = maskWidth + maskXMargin;
  var xMove = progress * (maskWidth / 100);

  return _react2.default.createElement(
    'div',
    { style: _styles2.default.container },
    _react2.default.createElement('div', { style: (0, _extends3.default)({}, _styles2.default.progressBaseLayer, { right: progressStartRight - xMove, backgroundColor: (0, _get3.default)(loadingConfig, 'blocks.image.styles.fill') || 'white' }) }),
    type === 'EYEWEAR' && _react2.default.createElement(_EyewearMask2.default, { width: settings.displayWidth, height: settings.displayHeight, maskWidth: maskWidth, maskHeight: maskHeight, background: getBackground() }),
    type === 'BEARD' && _react2.default.createElement(_BeardMask2.default, { width: settings.displayWidth, height: settings.displayHeight, maskWidth: maskWidth, maskHeight: maskHeight, background: getBackground() }),
    type === 'HAND_AR' && _react2.default.createElement(_HandARMask2.default, { width: settings.displayWidth, height: settings.displayHeight, maskWidth: maskWidth, maskHeight: maskHeight, background: getBackground() }),
    _react2.default.createElement(
      'div',
      { style: (0, _extends3.default)({}, _styles2.default.progressText, (0, _get3.default)(loadingConfig, 'blocks.progress_text.styles', {})) },
      progress,
      '%'
    ),
    _react2.default.createElement(_powered2.default, { key: 'powered', settings: settings })
  );
}
module.exports = exports['default'];

/***/ }),

/***/ 2461:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  container: {
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    zIndex: 6,
    backgroundColor: 'rgba(59, 59, 59, 1)'
  },
  progressBaseLayer: {
    backgroundColor: 'white',
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    zIndex: -1,
    transition: 'right 300ms ease'
  },
  progressText: {
    position: 'relative',
    bottom: '42%',
    width: '100%',
    textAlign: 'center',
    color: 'white'
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 2462:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(72);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = EyewearMask;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _useBackgroundImage = __webpack_require__(2039);

var _useBackgroundImage2 = _interopRequireDefault(_useBackgroundImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function EyewearMask(props) {
  var _props$width = props.width,
      width = _props$width === undefined ? 0 : _props$width,
      _props$height = props.height,
      height = _props$height === undefined ? 0 : _props$height,
      _props$maskHeight = props.maskHeight,
      maskHeight = _props$maskHeight === undefined ? 159 : _props$maskHeight,
      _props$maskWidth = props.maskWidth,
      maskWidth = _props$maskWidth === undefined ? 55 : _props$maskWidth,
      background = props.background;

  var _useState = (0, _react.useState)(''),
      _useState2 = (0, _slicedToArray3.default)(_useState, 2),
      viewBox = _useState2[0],
      setViewBox = _useState2[1];

  var lastBackgroundImage = (0, _react.useRef)('');
  var backgroundImage = background.backgroundType === 'image' ? background.backgroundImage : '';
  var backgroundFillColor = background.backgroundType === 'color' ? background.backgroundColor : 'black';
  (0, _useBackgroundImage2.default)({ lastBackgroundImage: lastBackgroundImage, backgroundImage: backgroundImage, setViewBox: setViewBox });

  var backgroundImageEnabled = !!backgroundImage && !!viewBox;

  return _react2.default.createElement(
    'svg',
    { width: width, height: height },
    _react2.default.createElement(
      'defs',
      null,
      _react2.default.createElement(
        'mask',
        { id: 'eyewear-fullpage-mask' },
        _react2.default.createElement('rect', { width: '100%', height: '100%', fill: 'white' }),
        _react2.default.createElement(
          'svg',
          { x: (width - maskWidth) * 0.5, y: (height - maskHeight) * 0.5, width: maskWidth, height: maskHeight },
          _react2.default.createElement('path', {
            fill: 'black',
            d: 'M158.768 5.9923C144.785 2.56677 129.82 -1.65059 115.315 0.664657C110.771 1.38763 106.261 2.52374 102.05 4.43446C98.8808 5.87181 96.0534 7.97188 92.9271 9.42644C90.8685 10.3818 89.7324 10.5453 87.5115 10.2269C84.8122 9.83957 82.2069 9.3834 79.465 9.3834C76.834 9.3834 74.2971 9.84817 71.7003 10.2269C69.4794 10.5453 68.1298 10.3904 66.0712 9.42644C62.9449 7.97188 60.1089 5.87181 56.9484 4.43446C52.7372 2.52374 48.2271 1.38763 43.6828 0.664657C29.1786 -1.65059 14.2131 2.55817 0.22993 5.9923C-0.29967 6.1214 0.204304 12.1118 0.554524 12.6798C1.04141 13.4458 2.75834 13.9967 3.51004 14.7024C5.95303 17.0435 6.52534 20.624 7.22578 23.7827C8.02872 27.432 8.71208 31.1329 9.91649 34.679C13.0685 43.9485 21.4652 51.7808 30.887 54.1821C41.2398 56.8244 52.5835 52.8652 59.8698 45.1793C66.951 37.7086 67.5063 27.8451 71.4697 18.8509C71.7772 18.1538 72.5118 17.362 73.0756 16.8542C73.9298 16.0968 75.2965 15.8213 76.3813 15.6664C77.7139 15.4857 79.0806 15.3738 80.4217 15.4426C81.1819 15.4857 81.9592 15.5803 82.7109 15.7181C84.0776 15.9763 85.5383 16.1312 86.5292 17.2329C86.9392 17.689 87.3919 18.2743 87.6396 18.8423C91.6116 27.8365 92.0985 37.7 99.1883 45.1707C106.466 52.848 117.793 56.8158 128.137 54.1735C137.559 51.7636 145.947 43.9399 149.099 34.6703C150.303 31.1243 150.978 27.4234 151.781 23.7741C152.481 20.6154 153.054 17.0349 155.488 14.6938C156.231 13.9795 157.948 13.4372 158.444 12.6712C158.803 12.1118 159.298 6.1214 158.768 5.9923ZM65.2085 25.6504C65.0803 27.914 64.6362 30.1173 63.9528 32.4412C63.0986 35.3589 62.0907 38.3197 60.3652 40.8329C56.863 45.9453 51.4559 49.6377 45.4766 51.1008C43.3411 51.6259 41.18 52.1509 38.9676 52.2111C32.6722 52.3747 25.8045 50.593 21.2687 45.9798C19.9789 44.6715 18.672 43.1997 17.6555 41.6677C15.1783 37.9323 13.2906 34.3519 12.4791 29.8935C11.6761 25.4954 11.2832 20.9596 12.3509 16.7251C12.8805 15.4943 12.8805 13.7729 14.7341 11.3286C14.7769 11.2683 14.811 11.2081 14.8452 11.1478C17.3651 7.46407 22.029 5.24351 26.2231 4.36561C31.8607 3.18647 38.1732 2.79916 43.8792 3.63402C47.8256 4.21068 52.2076 5.76852 55.6415 7.79974C58.7081 9.61579 61.339 12.1548 62.9619 15.3738C63.8332 17.0865 64.7814 19.2727 65.0376 21.2006C65.2341 22.7326 65.2853 24.2044 65.2085 25.6504ZM146.528 29.8935C145.716 34.3519 143.828 37.941 141.351 41.6677C140.335 43.1997 139.028 44.6715 137.738 45.9798C133.202 50.593 126.335 52.3833 120.039 52.2111C117.835 52.1509 115.666 51.6259 113.53 51.1008C107.551 49.6377 102.135 45.9367 98.6416 40.8329C96.9162 38.311 95.9082 35.3503 95.054 32.4412C94.3707 30.1173 93.9179 27.914 93.7983 25.6504C93.7215 24.2044 93.7642 22.7412 93.9692 21.192C94.2254 19.2727 95.1736 17.0865 96.0449 15.3652C97.6678 12.1548 100.29 9.60718 103.357 7.79114C106.791 5.75992 111.173 4.20208 115.119 3.62542C120.825 2.79055 127.138 3.17786 132.775 4.357C136.969 5.2349 141.633 7.45547 144.153 11.1392C144.196 11.1995 144.23 11.2683 144.273 11.3286C146.118 13.7557 146.118 14.6164 146.647 16.7164C147.724 20.9682 147.331 25.4954 146.528 29.8935Z'
          })
        )
      ),
      _react2.default.createElement(
        'pattern',
        { id: 'eyewear-mask-background-image', patternUnits: 'userSpaceOnUse', width: '100%', height: '100%' },
        _react2.default.createElement(
          'svg',
          { preserveAspectRatio: 'xMidYMin slice', viewBox: viewBox || '0 0 100% 100%' },
          backgroundImageEnabled ? _react2.default.createElement('image', { href: backgroundImage, x: '0', y: '0', width: '100%', height: '100%' }) : _react2.default.createElement('rect', { width: '100%', height: '100%', fill: backgroundFillColor })
        )
      )
    ),
    _react2.default.createElement('rect', { x: '0', y: '0', width: '100%', height: '100%', fill: 'white', mask: 'url(#eyewear-fullpage-mask)' }),
    _react2.default.createElement('rect', { x: '0', y: '0', width: '100%', height: '100%', fill: 'url(#eyewear-mask-background-image)', mask: 'url(#eyewear-fullpage-mask)' })
  );
}
module.exports = exports['default'];

/***/ }),

/***/ 2463:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(72);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = BeardMask;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _useBackgroundImage = __webpack_require__(2039);

var _useBackgroundImage2 = _interopRequireDefault(_useBackgroundImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function BeardMask(props) {
  var _props$width = props.width,
      width = _props$width === undefined ? 0 : _props$width,
      _props$height = props.height,
      height = _props$height === undefined ? 0 : _props$height,
      _props$maskWidth = props.maskWidth,
      maskWidth = _props$maskWidth === undefined ? 120 : _props$maskWidth,
      _props$maskHeight = props.maskHeight,
      maskHeight = _props$maskHeight === undefined ? 120 : _props$maskHeight,
      background = props.background;

  var _useState = (0, _react.useState)(''),
      _useState2 = (0, _slicedToArray3.default)(_useState, 2),
      viewBox = _useState2[0],
      setViewBox = _useState2[1];

  var lastBackgroundImage = (0, _react.useRef)('');
  var backgroundImage = background.backgroundType === 'image' ? background.backgroundImage : '';
  var backgroundFillColor = background.backgroundType === 'color' ? background.backgroundColor : 'black';
  (0, _useBackgroundImage2.default)({ lastBackgroundImage: lastBackgroundImage, backgroundImage: backgroundImage, setViewBox: setViewBox });

  var backgroundImageEnabled = !!backgroundImage && !!viewBox;

  return _react2.default.createElement(
    'svg',
    { width: width, height: height },
    _react2.default.createElement(
      'defs',
      null,
      _react2.default.createElement(
        'mask',
        { id: 'beard-fullpage-mask' },
        _react2.default.createElement('rect', { width: '100%', height: '100%', fill: 'white' }),
        _react2.default.createElement(
          'svg',
          { x: (width - maskWidth) * 0.5, y: (height - maskHeight) * 0.5, width: maskWidth, height: maskHeight },
          _react2.default.createElement('path', {
            fill: 'black',
            d: 'M42.0704 79.8432C45.1834 78.8792 55.3125 74.6647 59.5468 72.9019C63.8075 74.6936 73.9876 78.8238 77.035 79.8045C82.6144 81.6816 88.5424 82.2901 94.3869 81.5855C97.7732 81.1819 101.035 80.0632 103.956 78.3034C106.877 76.5438 109.391 74.1833 111.331 71.3786C113.981 67.7815 115.442 63.4464 115.509 58.9789C115.845 54.7823 114.566 50.6155 111.933 47.3303C111.247 46.504 110.379 45.8474 109.398 45.4114C108.719 45.1341 108.002 44.9623 107.272 44.902C109.635 47.2326 110.051 50.2158 109.358 53.5344C109.187 54.5238 108.798 55.4629 108.219 56.2832C107.64 57.1036 106.885 57.7848 106.01 58.2771C104.723 58.984 103.304 59.4175 101.842 59.5504C100.379 59.6832 98.9055 59.5128 97.5122 59.0494C97.284 58.97 97.0611 58.8763 96.8447 58.7686C93.7344 57.4608 91.1371 53.661 88.521 51.2572C85.9049 48.8535 83.1183 46.0605 80.3482 43.6255C78.3973 41.8712 76.1745 40.4455 73.7666 39.4037C72.8167 39 71.8346 38.6765 70.8306 38.4366C68.8074 37.8509 66.6552 37.8832 64.6504 38.529C62.6456 39.175 60.8795 40.4053 59.5788 42.062C58.4229 40.688 56.9611 39.6039 55.3107 38.8968C53.0779 38.0166 50.6207 37.8802 48.3041 38.5076C44.7776 39.4307 41.5352 41.2143 38.8676 43.6987C36.1574 46.1691 33.3874 48.7817 30.6533 51.3089C27.9192 53.8363 25.0693 58.0698 21.7404 59.1102C19.3114 59.9165 16.6749 59.8327 14.3019 58.8738C13.929 58.7414 13.5639 58.5879 13.2084 58.4139C12.3278 57.9227 11.5683 57.2404 10.9861 56.417C10.4039 55.5937 10.0136 54.6504 9.84383 53.6564C9.1637 50.3452 9.52775 47.3729 11.9151 45.0341C11.0041 45.1059 10.1169 45.3611 9.30692 45.7845C8.49698 46.208 7.78101 46.7907 7.20207 47.498C4.56107 50.7851 3.27863 54.9583 3.61803 59.1613C3.68554 63.6304 5.15374 67.9657 7.81569 71.5562C10.4613 75.2775 14.0725 78.2061 18.26 80.0262C20.3427 80.8976 22.5375 81.4716 24.78 81.7316C30.6122 82.3863 36.517 81.7414 42.0704 79.8432Z'
          })
        )
      ),
      _react2.default.createElement(
        'pattern',
        { id: 'beard-mask-background-image', patternUnits: 'userSpaceOnUse', width: '100%', height: '100%' },
        _react2.default.createElement(
          'svg',
          { preserveAspectRatio: 'xMidYMid slice', viewBox: viewBox || '0 0 100% 100%' },
          backgroundImageEnabled ? _react2.default.createElement('image', { href: backgroundImage, x: '0', y: '0', width: '100%', height: '100%' }) : _react2.default.createElement('rect', { width: '100%', height: '100%', fill: backgroundFillColor })
        )
      )
    ),
    _react2.default.createElement('rect', { x: '0', y: '0', width: '100%', height: '100%', fill: 'white', mask: 'url(#beard-fullpage-mask)' }),
    _react2.default.createElement('rect', { x: '0', y: '0', width: '100%', height: '100%', fill: 'url(#beard-mask-background-image)', mask: 'url(#beard-fullpage-mask)' })
  );
}
module.exports = exports['default'];

/***/ }),

/***/ 2464:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(72);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = HandARMask;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _useBackgroundImage = __webpack_require__(2039);

var _useBackgroundImage2 = _interopRequireDefault(_useBackgroundImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function HandARMask(props) {
  var _props$width = props.width,
      width = _props$width === undefined ? 0 : _props$width,
      _props$height = props.height,
      height = _props$height === undefined ? 0 : _props$height,
      _props$maskWidth = props.maskWidth,
      maskWidth = _props$maskWidth === undefined ? 31 : _props$maskWidth,
      _props$maskHeight = props.maskHeight,
      maskHeight = _props$maskHeight === undefined ? 65 : _props$maskHeight,
      background = props.background;

  var _useState = (0, _react.useState)(''),
      _useState2 = (0, _slicedToArray3.default)(_useState, 2),
      viewBox = _useState2[0],
      setViewBox = _useState2[1];

  var lastBackgroundImage = (0, _react.useRef)('');
  var backgroundImage = background.backgroundType === 'image' ? background.backgroundImage : '';
  var backgroundFillColor = background.backgroundType === 'color' ? background.backgroundColor : 'black';
  (0, _useBackgroundImage2.default)({ lastBackgroundImage: lastBackgroundImage, backgroundImage: backgroundImage, setViewBox: setViewBox });

  var backgroundImageEnabled = !!backgroundImage && !!viewBox;

  return _react2.default.createElement(
    'svg',
    { width: width, height: height },
    _react2.default.createElement(
      'defs',
      null,
      _react2.default.createElement(
        'mask',
        { id: 'handar-fullpage-mask' },
        _react2.default.createElement('rect', { width: '100%', height: '100%', fill: 'white' }),
        _react2.default.createElement(
          'svg',
          { x: (width - maskWidth) * 0.5, y: (height - maskHeight) * 0.5, width: maskWidth, height: maskHeight, xmlns: 'http://www.w3.org/2000/svg' },
          _react2.default.createElement(
            'defs',
            null,
            _react2.default.createElement(
              'clipPath',
              { id: 'handar-loading-icon' },
              _react2.default.createElement('rect', { width: '31', height: '65', fill: 'black' })
            )
          ),
          _react2.default.createElement(
            'g',
            { clipPath: 'url(#handar-loading-icon)' },
            _react2.default.createElement('path', { d: 'M0.288419 36.2679C2.00027 48.6661 4.20364 60.4372 6.52565 63.1151C8.24597 65.0897 12.4324 65.3439 14.5086 65.3439C15.0595 65.3439 16.195 65.3439 16.7459 65.3439C18.8137 65.3439 23.0085 65.0897 24.7204 63.1151C27.0509 60.4457 29.2458 48.6746 30.9576 36.2679C31.822 30.0307 29 27.0562 25.4407 25.6324C25.4407 25.6324 25.3136 27.0985 25.2289 27.3697C26.2289 27.8189 27.1356 28.4206 27.839 29.2172C29.2119 30.7934 29.7034 33.09 29.2966 36.0391C26.4407 56.6999 24.2628 61.0897 23.4577 62.0135C22.5679 63.0389 19.9916 63.666 16.7459 63.666C16.2374 63.666 15.0171 63.666 14.5086 63.666C11.2544 63.666 8.68664 63.0304 7.79682 62.0135C6.99174 61.0897 4.80533 56.6999 1.95789 36.0391C1.55112 33.09 2.04264 30.7934 3.41551 29.2172C4.00872 28.5307 4.75448 28.0053 5.5765 27.5816C5.48328 27.3104 5.30532 25.8443 5.30532 25.8443C1.98332 27.3443 -0.525133 30.3273 0.288419 36.2679Z' }),
            _react2.default.createElement('path', { d: 'M5.07365 38.5902C6.24884 47.8249 7.76546 56.5832 9.36149 58.5683C10.5446 60.0373 13.427 60.2278 14.8483 60.2278C15.2295 60.2278 16.0076 60.2278 16.3888 60.2278C17.8101 60.2278 20.6925 60.0373 21.8756 58.5683C23.4716 56.5832 24.9883 47.8249 26.1634 38.5902C26.8146 33.5003 24.4086 31.3326 21.6374 30.4036L9.40913 30.4671C6.71732 31.4358 4.43842 33.6194 5.07365 38.5902Z' }),
            _react2.default.createElement('path', { d: 'M9.77145 28.3189H20.9578C21.9917 28.3189 22.8561 27.607 23.1103 26.6494C23.1612 26.4714 23.1951 26.2765 23.1951 26.0816V2.59029C23.1951 1.35302 22.1951 0.353027 20.9578 0.353027L9.77145 0.353027C8.54264 0.353027 7.53418 1.35302 7.53418 2.59029L7.53418 26.0816C7.53418 26.3274 7.58503 26.5562 7.65282 26.7765C7.94943 27.6663 8.77993 28.3189 9.77145 28.3189Z' })
          )
        )
      ),
      _react2.default.createElement(
        'pattern',
        { id: 'handar-mask-background-image', patternUnits: 'userSpaceOnUse', width: '100%', height: '100%' },
        _react2.default.createElement(
          'svg',
          { preserveAspectRatio: 'xMidYMin slice', viewBox: viewBox || '0 0 100% 100%' },
          backgroundImageEnabled ? _react2.default.createElement('image', { href: backgroundImage, x: '0', y: '0', width: '100%', height: '100%' }) : _react2.default.createElement('rect', { width: '100%', height: '100%', fill: backgroundFillColor })
        )
      )
    ),
    _react2.default.createElement('rect', { x: '0', y: '0', width: '100%', height: '100%', fill: 'white', mask: 'url(#handar-fullpage-mask)' }),
    _react2.default.createElement('rect', { x: '0', y: '0', width: '100%', height: '100%', fill: 'url(#handar-mask-background-image)', mask: 'url(#handar-fullpage-mask)' })
  );
}
module.exports = exports['default'];

/***/ }),

/***/ 2465:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  containerLoading: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};
module.exports = exports['default'];

/***/ })

});