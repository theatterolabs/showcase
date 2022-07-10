webpackJsonpYMK([39],{

/***/ 2031:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

var _from = __webpack_require__(178);

var _from2 = _interopRequireDefault(_from);

exports.default = Models;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _styles = __webpack_require__(2185);

var _styles2 = _interopRequireDefault(_styles);

var _image = __webpack_require__(624);

var _image2 = _interopRequireDefault(_image);

var _ymkWebSdkCore = __webpack_require__(112);

var _get2 = __webpack_require__(3);

var _get3 = _interopRequireDefault(_get2);

var _textwithdivider = __webpack_require__(2186);

var _textwithdivider2 = _interopRequireDefault(_textwithdivider);

var _uiUtils = __webpack_require__(565);

var _uiUtils2 = _interopRequireDefault(_uiUtils);

var _isomorphicFetch = __webpack_require__(183);

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _pages = __webpack_require__(623);

var _pages2 = _interopRequireDefault(_pages);

var _useLoadEngine = __webpack_require__(629);

var _useEyewearAutoPD2 = __webpack_require__(1990);

var _useEyewearAutoPD3 = _interopRequireDefault(_useEyewearAutoPD2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MODEL_MARGIN_PERCENT = 3;
function Models(props) {
  var settings = props.settings,
      emitter = props.emitter,
      moduleSetting = props.moduleSetting,
      changePage = props.changePage,
      _props$modelsPerRow = props.modelsPerRow,
      modelsPerRow = _props$modelsPerRow === undefined ? 3 : _props$modelsPerRow,
      maxRowNum = props.maxRowNum,
      _props$fallbackModels = props.fallbackModels,
      fallbackModels = _props$fallbackModels === undefined ? [] : _props$fallbackModels,
      showTitle = props.showTitle,
      title = props.title,
      containerStyle = props.containerStyle,
      titleStyle = props.titleStyle,
      modelContainerStyle = props.modelContainerStyle,
      modelRowStyle = props.modelRowStyle,
      modelImageContainerStyle = props.modelImageContainerStyle;

  var titleConfig = moduleSetting.getBlock('launcher', 'header', 'choose_model_title');

  var _useEyewearAutoPD = (0, _useEyewearAutoPD3.default)({ settings: settings, emitter: emitter, changePage: changePage }),
      startEyewearAutoPDPhotoDetecting = _useEyewearAutoPD.startPhotoDetecting;

  var splitArrayIntoChunks = function splitArrayIntoChunks() {
    var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var chunkSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    var chunkLength = Math.ceil(arr.length / chunkSize);
    return (0, _from2.default)({ length: chunkLength }, function (chunk, i) {
      return arr.slice(i * chunkSize, i * chunkSize + chunkSize);
    });
  };

  var splitModelsIntoChunks = function splitModelsIntoChunks() {
    var models = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var chunkSize = arguments[1];

    var chunkLength = Math.ceil(models.length / chunkSize);
    return (0, _from2.default)({ length: chunkLength }, function (chunk, i) {
      var startIdx = i * chunkSize;
      var slicedModels = models.slice(startIdx, startIdx + chunkSize);

      return slicedModels.map(function (model, i) {
        return { original: (0, _get3.default)(model, 'imgSrc'), thumbnail: (0, _get3.default)(model, 'thumbnailSrc') || (0, _get3.default)(model, 'imgSrc') };
      });
    });
  };

  var handleImageLoaded = function handleImageLoaded(file, path) {
    if (settings.enableEyewearAutoPD) {
      startEyewearAutoPDPhotoDetecting({ file: file, mediaSource: _useLoadEngine.mediaSources.choosemodel, modelPath: path });
      return;
    }
    changePage(_pages2.default.virtual_tryon, { engineType: _useLoadEngine.engineTypes.image, file: file, mediaSource: _useLoadEngine.mediaSources.choosemodel, modelPath: path });
  };

  var loadImage = function loadImage(path, index) {
    emitter.trigger(_ymkWebSdkCore.events.loadImageByModel, [path, index]);
    (0, _isomorphicFetch2.default)(_ymkWebSdkCore.browserUtils.changeHost(path), {
      method: 'GET',
      credentials: 'same-origin',
      mode: 'cors'
    }).then(function (r) {
      return r.blob();
    }).then(function (blob) {
      return handleImageLoaded(blob, path);
    });
  };

  var getModelRows = function getModelRows(_ref) {
    var moduleSetting = _ref.moduleSetting,
        maxRowNum = _ref.maxRowNum,
        modelsPerRow = _ref.modelsPerRow,
        fallbackModels = _ref.fallbackModels;

    var models = moduleSetting && moduleSetting.getModelList();
    var modelRows = (0, _get3.default)(models, 'length') ? splitModelsIntoChunks(models, modelsPerRow) : splitArrayIntoChunks(fallbackModels, modelsPerRow);

    return maxRowNum ? modelRows.slice(0, maxRowNum) : modelRows;
  };

  var getModelFlexBasis = function getModelFlexBasis(modelsPerRow) {
    return modelsPerRow === 1 ? '43%' : Math.floor(100 / modelsPerRow) - MODEL_MARGIN_PERCENT * 2 + '%';
  };

  var getModelMargin = function getModelMargin(isFirst, isLast) {
    var yMargin = '1%';
    var xMargin = MODEL_MARGIN_PERCENT + '%';
    return {
      marginTop: yMargin,
      marginRight: isLast ? 0 : xMargin,
      marginBottom: yMargin,
      marginLeft: isFirst ? 0 : xMargin
    };
  };

  var modelRows = getModelRows({ moduleSetting: moduleSetting, modelsPerRow: modelsPerRow, maxRowNum: maxRowNum, fallbackModels: fallbackModels });
  return _react2.default.createElement(
    'div',
    { style: (0, _extends3.default)({ marginTop: '15px', width: '100%' }, containerStyle) },
    showTitle && _react2.default.createElement(_textwithdivider2.default, {
      textId: 'model-title',
      settings: settings,
      text: (0, _get3.default)(title, 'text', settings.i18n.getMessage('page.model.title')),
      textStyle: (0, _extends3.default)({
        color: (0, _get3.default)(titleConfig, 'styles.color', _uiUtils2.default.getTextColor(settings)),
        fontSize: (0, _get3.default)(titleConfig, 'styles.fontSize') || '18px'
      }, titleStyle)
    }),
    _react2.default.createElement(
      'div',
      { style: (0, _extends3.default)({}, _styles2.default.modelContainer, modelContainerStyle) },
      modelRows && modelRows.map(function () {
        var row = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var rowIdx = arguments[1];
        return _react2.default.createElement(
          'div',
          {
            key: 'modelrow' + rowIdx,
            style: (0, _extends3.default)({}, _styles2.default.rowContainer, {
              width: _uiUtils2.default.isShortScreen(settings) ? '90%' : '100%',
              height: Math.floor(100 / modelRows.length) + '%'
            }, modelRowStyle)
          },
          row.map(function (model, j) {
            return _react2.default.createElement(
              'button',
              {
                key: 'model' + j + '_' + model.original + '_' + model.thumbnail,
                id: 'model-' + (modelsPerRow * rowIdx + j + 1),
                onClick: function onClick() {
                  return loadImage(model.original, modelsPerRow * rowIdx + j);
                },
                style: (0, _extends3.default)({}, _styles2.default.modelImageContainer, getModelMargin(j === 0, j === row.length - 1), {
                  width: getModelFlexBasis(modelsPerRow)
                }, modelImageContainerStyle),
                'aria-label': settings.i18n.getMessageWithValues('a11y.label.model.index', { index: modelsPerRow * rowIdx + j + 1 })
              },
              _react2.default.createElement(_image2.default, { key: 'modelImage' + (modelsPerRow * rowIdx + j), style: _styles2.default.modelImage, src: _ymkWebSdkCore.browserUtils.changeHost(model.thumbnail), shouldDownload: true })
            );
          })
        );
      })
    )
  );
}
module.exports = exports['default'];

/***/ }),

/***/ 2185:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  modelContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '100%'
  },
  rowContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  modelImageContainer: {
    overflow: 'hidden',
    cursor: 'pointer',
    padding: 0,
    border: 0,
    backgroundColor: 'transparent'
  },
  modelImage: {
    width: '100%',
    boxSizing: 'border-box'
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 2186:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

exports.default = TextWithDivider;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _styles = __webpack_require__(2187);

var _styles2 = _interopRequireDefault(_styles);

var _get2 = __webpack_require__(3);

var _get3 = _interopRequireDefault(_get2);

var _uiUtils = __webpack_require__(565);

var _uiUtils2 = _interopRequireDefault(_uiUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TextWithDivider(props) {
  var settings = props.settings,
      _props$text = props.text,
      text = _props$text === undefined ? '' : _props$text,
      style = props.style,
      textStyle = props.textStyle,
      textId = props.textId;


  var getContainerHeightEm = function getContainerHeightEm() {
    return _uiUtils2.default.isShortScreen(settings) ? 0.8 : 1.2;
  };

  return _react2.default.createElement(
    'div',
    { style: (0, _extends3.default)({}, _styles2.default.container, { height: getContainerHeightEm() + 'em' }, style) },
    _react2.default.createElement('div', { style: (0, _extends3.default)({}, _styles2.default.divider, { backgroundColor: (0, _get3.default)(textStyle, 'color', _styles2.default.text.color), marginRight: '10px' }) }),
    _react2.default.createElement(
      'h3',
      { id: textId, tabIndex: 0, style: (0, _extends3.default)({}, _styles2.default.text, { bottom: getContainerHeightEm() / 2 - 0.05 + 'em' }, textStyle) },
      text
    ),
    _react2.default.createElement('div', { style: (0, _extends3.default)({}, _styles2.default.divider, { backgroundColor: (0, _get3.default)(textStyle, 'color', _styles2.default.text.color), marginLeft: '10px' }) })
  );
}
module.exports = exports['default'];

/***/ }),

/***/ 2187:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItem: 'center'
  },
  divider: {
    height: '1px',
    flex: 1
  },
  text: {
    position: 'relative',
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    color: '#575757',
    fontWeight: 300,
    margin: 0
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 2594:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

exports.default = ModelList;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _styles = __webpack_require__(3544);

var _styles2 = _interopRequireDefault(_styles);

var _ymkWebSdkCore = __webpack_require__(112);

var _pages = __webpack_require__(623);

var _pages2 = _interopRequireDefault(_pages);

var _models = __webpack_require__(2031);

var _models2 = _interopRequireDefault(_models);

var _backandclose = __webpack_require__(1016);

var _backandclose2 = _interopRequireDefault(_backandclose);

var _powered = __webpack_require__(677);

var _powered2 = _interopRequireDefault(_powered);

var _uiUtils = __webpack_require__(565);

var _uiUtils2 = _interopRequireDefault(_uiUtils);

var _get2 = __webpack_require__(3);

var _get3 = _interopRequireDefault(_get2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ModelList(props) {
  var settings = props.settings,
      emitter = props.emitter,
      changePage = props.changePage,
      _props$models = props.models,
      models = _props$models === undefined ? [] : _props$models;

  var moduleSetting = settings.getModuleSetting();
  var titleConfig = moduleSetting.getBlock('model_list', 'header', 'title');

  var back = function back() {
    return changePage(_pages2.default.launcher);
  };

  var close = function close() {
    return emitter.trigger(_ymkWebSdkCore.events.close);
  };

  var getModelLength = function getModelLength() {
    var moduleSetting = settings.getModuleSetting();
    return (0, _get3.default)(moduleSetting && moduleSetting.getModelList(), 'length') || (0, _get3.default)(models, 'length');
  };

  var getModelListLayout = function getModelListLayout() {
    switch (getModelLength()) {
      case 1:
        return { modelsPerRow: 1 };
      case 2:
      case 4:
        return { modelsPerRow: 2 };
      default:
        return { modelsPerRow: 3 };
    }
  };

  (0, _react.useEffect)(function () {
    emitter.trigger(_ymkWebSdkCore.events.pageUpdated, [settings.i18n.getMessage('a11y.page.choose.model')]);
  }, []);

  return _react2.default.createElement(
    'div',
    { style: _uiUtils2.default.getTemplateBackground(settings) },
    _react2.default.createElement(
      'div',
      { style: (0, _extends3.default)({}, _styles2.default.contentContainer, { padding: _uiUtils2.default.isShortScreen(settings) ? '0 15%' : '0 13%' }) },
      _react2.default.createElement(_models2.default, (0, _extends3.default)({
        moduleSetting: moduleSetting,
        settings: settings,
        emitter: emitter,
        changePage: changePage,
        fallbackModels: models,
        showTitle: true,
        containerStyle: { marginTop: settings.displayHeight < 320 ? '10px' : '15px' },
        titleStyle: {
          color: (0, _get3.default)(titleConfig, 'styles.color', _uiUtils2.default.getTextColor(settings)),
          fontSize: (0, _get3.default)(titleConfig, 'styles.fontSize') || '18px'
        },
        modelContainerStyle: { maxHeight: '75vh', padding: 0 }
      }, getModelListLayout()))
    ),
    _react2.default.createElement(_backandclose2.default, {
      backAriaLabel: settings.i18n.getMessageWithValues('a11y.label.back.to', { pageTitle: settings.i18n.getMessage('a11y.page.launcher') }),
      onBack: back,
      onClose: close,
      settings: settings,
      emitter: emitter,
      confirmBeforeExit: settings.confirmBeforeExit
    }),
    _react2.default.createElement(_powered2.default, { key: 'powered', settings: settings })
  );
}
module.exports = exports['default'];

/***/ }),

/***/ 3544:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  contentContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 15%'
  }
};
module.exports = exports['default'];

/***/ })

});