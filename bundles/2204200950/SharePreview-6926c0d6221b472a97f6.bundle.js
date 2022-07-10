webpackJsonpYMK([64],{

/***/ 2291:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shareTargets = undefined;

var _regenerator = __webpack_require__(8);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = __webpack_require__(18);

var _promise2 = _interopRequireDefault(_promise);

var _slicedToArray2 = __webpack_require__(72);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = useShare;

var _react = __webpack_require__(459);

var _shareUtils = __webpack_require__(954);

var _shareUtils2 = _interopRequireDefault(_shareUtils);

var _ymkWebSdkCore = __webpack_require__(112);

var _isFunction2 = __webpack_require__(23);

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _context3 = __webpack_require__(567);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var upload = _ymkWebSdkCore.dao.upload;
var shareTargets = exports.shareTargets = { fb: 'fb', twitter: 'twitter', pinterest: 'pinterest', whatsapp: 'whatsapp', weibo: 'weibo', sms: 'sms', email: 'email' };

function useShare(props) {
  var _this = this;

  var emitter = props.emitter,
      settings = props.settings,
      onUploadFail = props.onUploadFail;

  var _useContext = (0, _react.useContext)(_context3.EngineContext),
      engineType = _useContext.engineType;

  var _useState = (0, _react.useState)(''),
      _useState2 = (0, _slicedToArray3.default)(_useState, 2),
      base64 = _useState2[0],
      setBase64 = _useState2[1];

  var _useState3 = (0, _react.useState)(''),
      _useState4 = (0, _slicedToArray3.default)(_useState3, 2),
      converting = _useState4[0],
      setConverting = _useState4[1];

  var _useState5 = (0, _react.useState)(''),
      _useState6 = (0, _slicedToArray3.default)(_useState5, 2),
      uploading = _useState6[0],
      setUploading = _useState6[1];

  var _useState7 = (0, _react.useState)(''),
      _useState8 = (0, _slicedToArray3.default)(_useState7, 2),
      uploadedUrl = _useState8[0],
      setUploadedUrl = _useState8[1];

  var _useState9 = (0, _react.useState)(''),
      _useState10 = (0, _slicedToArray3.default)(_useState9, 2),
      twitterCardUrl = _useState10[0],
      setTwitterCardUrl = _useState10[1];

  var isShareDisabled = function isShareDisabled() {
    return !_shareUtils2.default.isFBEnabled(settings) && !_shareUtils2.default.isWeiboEnabled(settings) && !_shareUtils2.default.isTwitterEnabled(settings) && !_shareUtils2.default.isPinterestEnabled(settings) && !_shareUtils2.default.isSMSEnabled(settings) && !_shareUtils2.default.isWhatsAppEnabled(settings);
  };

  var saveCanvasThenUpload = function saveCanvasThenUpload() {
    if (converting || uploading || isShareDisabled()) {
      return;
    }
    saveCanvas().then(function (base64) {
      return uploadBase64(base64);
    });
  };

  var saveCanvas = function saveCanvas() {
    if (converting || isShareDisabled()) {
      return;
    }
    return new _promise2.default(function (resolve) {
      setConverting(true);
      emitter.once(_ymkWebSdkCore.events.saveCanvasComplete, function (base64) {
        setBase64(base64);
        setConverting(false);
        resolve(base64);
      });
      emitter.trigger(_ymkWebSdkCore.events.saveCanvas);
    });
  };

  var uploadBase64 = function uploadBase64(base64) {
    if (!base64 || uploading) {
      return;
    }
    setUploading(true);
    upload(_ymkWebSdkCore.browserUtils.getApiKey(document), base64, settings, true).then(function (r) {
      setUploading(false);
      setUploadedUrl(r.url);
      setTwitterCardUrl(r.twitterCardUrl);
    }).catch(function (e) {
      console.error('upload failed', e);
      setUploading(false);
      (0, _isFunction3.default)(onUploadFail) && onUploadFail();
    });
  };

  var submitShareViaEmail = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(displayName, email) {
      var src = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : base64;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.delegateYield(_regenerator2.default.mark(function _callee() {
                var base64;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!(!email || !_shareUtils2.default.isEmailEnabled(settings))) {
                          _context.next = 2;
                          break;
                        }

                        return _context.abrupt('return');

                      case 2:
                        if (!src) {
                          _context.next = 5;
                          break;
                        }

                        _shareUtils2.default.submitShareViaEmail(emitter, engineType, settings, src, displayName, email);
                        return _context.abrupt('return');

                      case 5:
                        _context.next = 7;
                        return saveCanvas();

                      case 7:
                        base64 = _context.sent;

                        _shareUtils2.default.submitShareViaEmail(emitter, engineType, settings, base64, displayName, email);

                      case 9:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              })(), 't0', 1);

            case 1:
              return _context2.abrupt('return', _context2.t0);

            case 2:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }));

    return function submitShareViaEmail(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var submitShare = function submitShare(target) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!target) {
      return;
    }
    switch (target) {
      case shareTargets.email:
        return _shareUtils2.default.isEmailEnabled(settings) && submitShareViaEmail(params.displayName, params.email, params.src);
      case shareTargets.fb:
        return _shareUtils2.default.isFBEnabled(settings) && _shareUtils2.default.submitShareToFB(emitter, engineType, settings, uploadedUrl, twitterCardUrl);
      case shareTargets.twitter:
        return _shareUtils2.default.isTwitterEnabled(settings) && _shareUtils2.default.submitShareToTwitter(emitter, engineType, settings, twitterCardUrl);
      case shareTargets.pinterest:
        return _shareUtils2.default.isPinterestEnabled(settings) && _shareUtils2.default.submitShareToPinterest(emitter, engineType, settings, uploadedUrl);
      case shareTargets.whatsapp:
        return _shareUtils2.default.isWhatsAppEnabled(settings) && _shareUtils2.default.submitShareToWhatsApp(emitter, engineType, settings, twitterCardUrl);
      case shareTargets.weibo:
        return _shareUtils2.default.isWeiboEnabled(settings) && _shareUtils2.default.submitShareToWeibo(emitter, engineType, settings, uploadedUrl);
      case shareTargets.sms:
        return _shareUtils2.default.isSMSEnabled(settings) && _shareUtils2.default.submitShareToSMS(emitter, engineType, settings, uploadedUrl);
      default:
        return;
    }
  };

  return {
    isShareDisabled: isShareDisabled,
    saveCanvas: saveCanvas,
    saveCanvasThenUpload: saveCanvasThenUpload,
    uploadBase64: uploadBase64,
    submitShare: submitShare,
    base64: base64,
    converting: converting,
    uploading: uploading,
    uploadedUrl: uploadedUrl
  };
}

/***/ }),

/***/ 2298:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(72);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = EmailSharingModal;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _trim2 = __webpack_require__(2177);

var _trim3 = _interopRequireDefault(_trim2);

var _index = __webpack_require__(2299);

var _index2 = _interopRequireDefault(_index);

var _modal = __webpack_require__(2178);

var _modal2 = _interopRequireDefault(_modal);

var _ConfirmButton = __webpack_require__(1989);

var _ConfirmButton2 = _interopRequireDefault(_ConfirmButton);

var _CancelButton = __webpack_require__(2179);

var _CancelButton2 = _interopRequireDefault(_CancelButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function EmailSharingModal(props) {
  var emitter = props.emitter,
      settings = props.settings,
      isOpen = props.isOpen,
      successCallback = props.successCallback,
      cancelCallback = props.cancelCallback;

  var _useState = (0, _react.useState)(''),
      _useState2 = (0, _slicedToArray3.default)(_useState, 2),
      error = _useState2[0],
      setError = _useState2[1];

  var lastIsOpen = (0, _react.useRef)(false);
  var displayNameRef = (0, _react.useRef)(null);
  var emailRef = (0, _react.useRef)(null);

  (0, _react.useEffect)(function () {
    if (lastIsOpen.current !== isOpen) {
      setError('');
    }
    lastIsOpen.current = isOpen;
  }, [isOpen]);

  var validateEmpty = function validateEmpty(v) {
    return !(0, _trim3.default)(v);
  };

  var validateEmail = function validateEmail(value) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(String(value).toLowerCase());
  };

  var handleSubmit = function handleSubmit() {
    if (validateEmpty(displayNameRef.current.value)) {
      return setError(settings.i18n.getMessage('mail.invalid.name'));
    }
    if (validateEmpty(emailRef.current.value) || validateEmail(emailRef.current.value)) {
      return setError(settings.i18n.getMessage('mail.invalid.email'));
    }
    setError('');
    successCallback((0, _trim3.default)(displayNameRef.current.value), (0, _trim3.default)(emailRef.current.value));
  };

  return _react2.default.createElement(
    _modal2.default,
    { id: 'email-sharing-modal', isOpen: isOpen, emitter: emitter, settings: settings, ariaLabel: settings.i18n.getMessage('a11y.modal.email.sharing') },
    error && _react2.default.createElement(
      'div',
      { style: { width: '100%' } },
      _react2.default.createElement(
        'div',
        { id: 'email-sharing-error', role: 'alert', style: _index2.default.error },
        error
      )
    ),
    _react2.default.createElement(
      'div',
      { style: { width: '100%' } },
      _react2.default.createElement(
        'label',
        null,
        _react2.default.createElement(
          'div',
          { id: 'email-sharing-label-name', style: _index2.default.label },
          settings.i18n.getMessage('mail.title.name')
        ),
        _react2.default.createElement(
          'div',
          { style: _index2.default.inputbox },
          _react2.default.createElement('input', {
            id: 'email-sharing-input-name',
            type: 'text',
            ref: displayNameRef,
            name: 'displayName',
            maxLength: 50,
            style: { width: '50%' },
            placeholder: settings.i18n.getMessage('mail.invalid.name')
          })
        )
      )
    ),
    _react2.default.createElement(
      'div',
      { style: { width: '100%' } },
      _react2.default.createElement(
        'label',
        null,
        _react2.default.createElement(
          'div',
          { id: 'email-sharing-label-email', style: _index2.default.label },
          settings.i18n.getMessage('mail.title.email')
        ),
        _react2.default.createElement(
          'div',
          { style: _index2.default.inputbox },
          _react2.default.createElement('input', { id: 'email-sharing-input-email', type: 'email', name: 'email', maxLength: 100, ref: emailRef, style: { width: '50%' }, placeholder: settings.i18n.getMessage('mail.invalid.email') })
        )
      )
    ),
    _react2.default.createElement(
      'div',
      { style: _index2.default.buttonContainer },
      _react2.default.createElement(_ConfirmButton2.default, { id: 'email-sharing-confirm', settings: settings, text: settings.i18n.getMessage('mail.action.submit'), onClick: handleSubmit })
    ),
    _react2.default.createElement(
      'div',
      { style: _index2.default.cancelContainer },
      _react2.default.createElement(_CancelButton2.default, { id: 'email-sharing-cancel', settings: settings, text: settings.i18n.getMessage('mail.action.cancel'), onClick: cancelCallback })
    )
  );
}
module.exports = exports['default'];

/***/ }),

/***/ 2299:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  error: {
    fontSize: '12px',
    color: '#ef3f78',
    height: '30px',
    textAlign: 'center',
    padding: '0 10px'
  },
  label: {
    width: '40%',
    textAlign: 'right',
    float: 'left',
    paddingRight: '10px',
    height: '35px',
    lineHeight: '35px',
    color: '#666'
  },
  buttonContainer: {
    textAlign: 'center',
    marginTop: '30px'
  },
  inputbox: {
    height: '35px',
    lineHeight: '35px'
  },
  cancelContainer: {
    textAlign: 'center',
    marginTop: '10px'
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 3598:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(72);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = SharePreview;

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _styles = __webpack_require__(3599);

var _styles2 = _interopRequireDefault(_styles);

var _useShare2 = __webpack_require__(2291);

var _useShare3 = _interopRequireDefault(_useShare2);

var _continueorretakebuttons = __webpack_require__(3600);

var _continueorretakebuttons2 = _interopRequireDefault(_continueorretakebuttons);

var _backandclose = __webpack_require__(1016);

var _backandclose2 = _interopRequireDefault(_backandclose);

var _emailsharingmodal = __webpack_require__(2298);

var _emailsharingmodal2 = _interopRequireDefault(_emailsharingmodal);

var _powered = __webpack_require__(677);

var _powered2 = _interopRequireDefault(_powered);

var _ymkWebSdkCore = __webpack_require__(112);

var _defer2 = __webpack_require__(997);

var _defer3 = _interopRequireDefault(_defer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SharePreview(props) {
  var emitter = props.emitter,
      settings = props.settings,
      target = props.target,
      onClose = props.onClose,
      onRetake = props.onRetake;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray3.default)(_useState, 2),
      emailSharingModalOpened = _useState2[0],
      setEmailSharingModalOpened = _useState2[1];

  var _useShare = (0, _useShare3.default)({ emitter: emitter, settings: settings, onUploadFail: onClose }),
      saveCanvasThenUpload = _useShare.saveCanvasThenUpload,
      submitShare = _useShare.submitShare,
      base64 = _useShare.base64,
      uploadedUrl = _useShare.uploadedUrl;

  var startSharing = function startSharing() {
    return target === _useShare2.shareTargets.email ? openEmailSharingModal() : submitShare(target);
  };

  var openEmailSharingModal = function openEmailSharingModal() {
    return setEmailSharingModalOpened(true);
  };
  var closeEmailSharingModal = function closeEmailSharingModal() {
    return setEmailSharingModalOpened(false);
  };
  var onEmailSharingSubmit = function onEmailSharingSubmit(displayName, email) {
    submitShare(_useShare2.shareTargets.email, { displayName: displayName, email: email });
    closeEmailSharingModal();
  };

  (0, _react.useEffect)(function () {
    saveCanvasThenUpload();
  }, []);

  (0, _react.useEffect)(function () {
    (0, _defer3.default)(function () {
      return emitter.trigger(_ymkWebSdkCore.events.pageUpdated, [settings.i18n.getMessage('a11y.page.share.photo.preview')]);
    });
  }, []);

  return _react2.default.createElement(
    'div',
    { style: _styles2.default.container },
    _react2.default.createElement(_emailsharingmodal2.default, { isOpen: emailSharingModalOpened, cancelCallback: closeEmailSharingModal, successCallback: onEmailSharingSubmit, settings: settings, emitter: emitter }),
    _react2.default.createElement(_continueorretakebuttons2.default, { settings: settings, isContinueDisabled: !uploadedUrl, onContinue: startSharing, onRetake: onRetake }),
    _react2.default.createElement(_backandclose2.default, {
      key: 'sharepreview_backandclose',
      settings: settings,
      emitter: emitter,
      isBackDisabled: true,
      onClose: onClose,
      confirmBeforeExit: false,
      closeAriaLabel: settings.i18n.getMessageWithValues('a11y.label.close', { target: settings.i18n.getMessage('a11y.page.share.photo.preview') })
    }),
    !!base64 && _react2.default.createElement('img', { alt: 'share-preview-image', 'aria-hidden': true, crossOrigin: 'anonymous', src: base64, style: { width: settings.displayWidth, height: settings.displayHeight } }),
    _react2.default.createElement(_powered2.default, { key: 'powered', settings: settings })
  );
}
module.exports = exports['default'];

/***/ }),

/***/ 3599:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  container: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    top: 0,
    left: 0,
    position: 'absolute'
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 3600:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _react = __webpack_require__(459);

var _react2 = _interopRequireDefault(_react);

var _styles = __webpack_require__(3601);

var _styles2 = _interopRequireDefault(_styles);

var _ConfirmButton = __webpack_require__(1989);

var _ConfirmButton2 = _interopRequireDefault(_ConfirmButton);

var _CancelButton = __webpack_require__(2179);

var _CancelButton2 = _interopRequireDefault(_CancelButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ContinueOrRetakeButtons = function (_Component) {
  (0, _inherits3.default)(ContinueOrRetakeButtons, _Component);

  function ContinueOrRetakeButtons() {
    (0, _classCallCheck3.default)(this, ContinueOrRetakeButtons);
    return (0, _possibleConstructorReturn3.default)(this, (ContinueOrRetakeButtons.__proto__ || (0, _getPrototypeOf2.default)(ContinueOrRetakeButtons)).apply(this, arguments));
  }

  (0, _createClass3.default)(ContinueOrRetakeButtons, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          settings = _props.settings,
          isContinueDisabled = _props.isContinueDisabled,
          onContinue = _props.onContinue,
          onRetake = _props.onRetake;


      return _react2.default.createElement(
        'div',
        { style: _styles2.default.container },
        _react2.default.createElement(_ConfirmButton2.default, {
          id: 'share-preview-confirm',
          settings: settings,
          disabled: isContinueDisabled,
          buttonStyle: { width: '100%', marginBottom: '16px' },
          text: settings.i18n.getMessage('fb.share.action.submit'),
          onClick: onContinue
        }),
        _react2.default.createElement(_CancelButton2.default, { id: 'share-preview-retake', settings: settings, buttonStyle: { width: '100%' }, text: settings.i18n.getMessage('fb.share.action.retake'), onClick: onRetake })
      );
    }
  }]);
  return ContinueOrRetakeButtons;
}(_react.Component);

exports.default = ContinueOrRetakeButtons;
module.exports = exports['default'];

/***/ }),

/***/ 3601:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  container: {
    position: 'absolute',
    bottom: '30px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '120px'
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 954:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = __webpack_require__(115);

var _stringify2 = _interopRequireDefault(_stringify);

var _ymkWebSdkCore = __webpack_require__(112);

var _replace2 = __webpack_require__(119);

var _replace3 = _interopRequireDefault(_replace2);

var _isUndefined2 = __webpack_require__(52);

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sendMail = _ymkWebSdkCore.dao.sendMail;


var shareUtils = {
  isFBEnabled: function isFBEnabled(settings) {
    return settings.enableFBSharing && window && window.FB;
  },
  isWeiboEnabled: function isWeiboEnabled(settings) {
    return settings.enableWeiboSharing;
  },
  isTwitterEnabled: function isTwitterEnabled(settings) {
    return settings.enableTwitterSharing;
  },
  isWhatsAppEnabled: function isWhatsAppEnabled(settings) {
    return settings.enableWhatsAppSharing && _ymkWebSdkCore.browserUtils.isMobile();
  },
  isPinterestEnabled: function isPinterestEnabled(settings) {
    return settings.enablePinterestSharing;
  },
  isSMSEnabled: function isSMSEnabled(settings) {
    return settings.enableSMSSharing && _ymkWebSdkCore.browserUtils.isMobile();
  },
  isEmailEnabled: function isEmailEnabled(settings) {
    return settings.enableEmailSharing;
  },
  submitShareViaEmail: function submitShareViaEmail(emitter, type, settings, uploaded, displayName, email, callback) {
    emitter.trigger(_ymkWebSdkCore.events.shareViaEmail, [type]);
    sendMail(_ymkWebSdkCore.browserUtils.getApiKey(document), uploaded, displayName, email, location.href).then(function () {
      emitter.trigger(_ymkWebSdkCore.events.toastMessage, [settings.i18n.getMessage('mail.sent.successfully'), 'success', 'toast', 5000]);
      emitter.trigger(_ymkWebSdkCore.events.shareViaEmailSuccess, [type]);
    }).catch(function () {
      emitter.trigger(_ymkWebSdkCore.events.toastMessage, [settings.i18n.getMessage('mail.sent.failure'), 'error', 'toast', 5000]);
      emitter.trigger(_ymkWebSdkCore.events.shareViaEmailFailure, [type]);
    });
    callback && callback();
  },
  submitShareToWeibo: function submitShareToWeibo(emitter, type, settings, uploadedUrl) {
    if (!uploadedUrl) {
      return;
    }
    emitter.trigger(_ymkWebSdkCore.events.shareToWeibo, [type]);
    var url = 'http://service.weibo.com/share/share.php?url=' + encodeURIComponent(location.href) + '&title=' + encodeURIComponent(settings.i18n.getMessage('fb.share.title')) + '&pic=' + encodeURIComponent((0, _replace3.default)(uploadedUrl, 'https://', 'http://'));
    window.open(url, '_blank');
  },
  submitShareToTwitter: function submitShareToTwitter(emitter, type, settings, twitterCardUrl) {
    if (!twitterCardUrl) {
      return;
    }
    emitter.trigger(_ymkWebSdkCore.events.shareToTwitter, [type]);
    var url = 'https://twitter.com/share?text=text goes here&url=' + encodeURIComponent(twitterCardUrl);
    window.open(url, '_blank');
  },
  submitShareToWhatsApp: function submitShareToWhatsApp(emitter, type, settings, twitterCardUrl) {
    if (!twitterCardUrl) {
      return;
    }
    emitter.trigger(_ymkWebSdkCore.events.shareToWhatsApp, [type]);
    var url = 'https://wa.me/?text=text goes here ' + encodeURIComponent(twitterCardUrl);
    window.open(url, '_blank');
  },
  submitShareToFB: function submitShareToFB(emitter, type, settings, uploadedUrl, twitterCardUrl) {
    if (!uploadedUrl || !twitterCardUrl) {
      return;
    }
    emitter.trigger(_ymkWebSdkCore.events.shareToFB, [type]);
    window && window.FB && window.FB.ui({
      method: 'share_open_graph',
      action_type: 'og.shares',
      action_properties: (0, _stringify2.default)({
        object: twitterCardUrl
      })
    }, function (r) {
      if ((0, _isUndefined3.default)(r)) {
        emitter.trigger(_ymkWebSdkCore.events.shareToFBCancel, [type]);
      } else {
        emitter.trigger(_ymkWebSdkCore.events.shareToFBSuccess, [type]);
      }
    });
  },
  submitShareToPinterest: function submitShareToPinterest(emitter, type, settings, uploadedUrl) {
    if (!uploadedUrl) {
      return;
    }
    emitter.trigger(_ymkWebSdkCore.events.shareToPinterest, [type]);
    var caption = settings.i18n.getMessage('fb.share.title');
    var shareUrl = location.href;
    var url = 'https://pinterest.com/pin/create/link/?url=' + encodeURIComponent(shareUrl) + '&media=' + encodeURIComponent(uploadedUrl) + '&description=' + encodeURIComponent(caption);
    window.open(url, '_blank');
  },
  submitShareToSMS: function submitShareToSMS(emitter, type, settings, uploadedUrl) {
    if (!uploadedUrl) {
      return;
    }
    if (_ymkWebSdkCore.browserUtils.isIOs()) {
      emitter.trigger(_ymkWebSdkCore.events.shareToSMS, [type]);
      var url = 'sms:&body=' + location.href;
      window.open(url, '_blank');
    }
    if (_ymkWebSdkCore.browserUtils.isAndroid()) {
      emitter.trigger(_ymkWebSdkCore.events.shareToSMS, [type]);
      var _url = 'sms:?body=' + location.href;
      window.open(_url, '_blank');
    }
  }
};

exports.default = shareUtils;
module.exports = exports['default'];

/***/ })

});