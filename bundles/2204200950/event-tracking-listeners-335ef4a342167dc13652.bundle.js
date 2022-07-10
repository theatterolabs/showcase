webpackJsonpYMK([31],{

/***/ 3451:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _regenerator = __webpack_require__(8);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getIterator2 = __webpack_require__(41);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _toConsumableArray2 = __webpack_require__(171);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _browserUtils = __webpack_require__(4);

var _browserUtils2 = _interopRequireDefault(_browserUtils);

var _toInteger2 = __webpack_require__(1);

var _toInteger3 = _interopRequireDefault(_toInteger2);

var _floor2 = __webpack_require__(973);

var _floor3 = _interopRequireDefault(_floor2);

var _isArray2 = __webpack_require__(5);

var _isArray3 = _interopRequireDefault(_isArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TRACKER_ID2_PREFIX = '' + "UA-164628847-";
var TRACKER_ID = '' + "UA-77063135-2";
var DATA_LAYER = 'dataLayer';
var YMK_DATA_LAYER = 'ymkDataLayer';
var BUFFER = [];
var IS_BLOCKING = true;

function getDl() {
  return window[YMK_DATA_LAYER] || window[DATA_LAYER];
}

function ymkGtag() {
  try {
    var dl = IS_BLOCKING ? BUFFER : getDl();
    if (!dl) {
      return;
    }
    if (!(0, _isArray3.default)(dl)) {
      return;
    }
    dl.push(arguments);
  } catch (err) {
    console.log(err);
  }
}

var GTAG = function GTAG(optOutGoogleAnalytics) {
  var _this = this;

  (0, _classCallCheck3.default)(this, GTAG);

  this.block = function () {
    IS_BLOCKING = true;
  };

  this.unblock = function () {

    IS_BLOCKING = false;
    var tmp = [].concat((0, _toConsumableArray3.default)(BUFFER));
    BUFFER = [];
    var dl = getDl();
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(tmp), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var args = _step.value;

        dl.push(args);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  };

  this.isGtagLoaded = function () {
    return _this.isScriptLoaded('googletagmanager.com/gtag/js');
  };

  this.isScriptLoaded = function (query) {
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].src;
      if (!src) {
        continue;
      }
      if (src.indexOf(query) !== -1) {
        return true;
      }
    }
    return false;
  };

  this._loadScript = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            window[YMK_DATA_LAYER] = window[YMK_DATA_LAYER] || [];
            return _context.abrupt('return', function (i, s, o, g, r, a, m) {
              a = s.createElement(o), m = s.getElementsByTagName(o)[0];
              a.async = 1;
              a.src = g;
              m.parentNode.insertBefore(a, m);
            }(window, document, 'script', 'https://www.googletagmanager.com/gtag/js?id=' + _this.trackerId + '&l=' + YMK_DATA_LAYER));

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));

  this._init = function () {
    return ymkGtag('js', new Date());
  };

  this.getSecondTrackerId = function (source) {
    if (!TRACKER_ID2_PREFIX) {
      return '';
    }
    var sourceId = 0;
    try {
      sourceId = (0, _toInteger3.default)(source);
    } catch (err) {}
    var id = (0, _floor3.default)(Math.abs(sourceId) / 2);
    return TRACKER_ID2_PREFIX + (id % 50 + 1);
  };

  this.getCampaign = function () {
    return {
      source: _this._source,
      medium: _this._medium,
      name: _this._campaign
    };
  };

  this.pageview = function (page_path) {
    return _this.event('pageview', page_path);
  };

  this.event = function (event_category) {
    var event_action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'action';
    var event_label = arguments[2];
    var value = arguments[3];

    ymkGtag('event', event_action, {
      event_category: event_category,
      event_label: event_label,
      value: value,
      send_to: _this.trackerId,
      campaign: _this.getCampaign()
    });
  };

  this.source = function (source) {
    return _this._source = source;
  };

  this.medium = function (medium) {
    return _this._medium = medium;
  };

  this.campaign = function (campaign, type) {
    return _this._campaign = _this._convertCampaign(campaign, type);
  };

  this.setSubCampaign = function (type) {
    return _this.campaign(_this._campaign, type);
  };

  this._convertCampaign = function (campaign, type) {
    switch (campaign) {
      case 'livesetream':
        return 'livestream';
      case 'shade':
      case 'shadefinder':
        return 'shade';
      case 'skincare':
        return 'skincare';
      case 'face_attribute':
      case 'faceattribute':
        return 'face_attribute';
      default:
        switch (type) {
          case 'video':
            return 'makeup_live';
          case 'model':
            return 'makeup_model';
          case 'upload':
            return 'makeup_photo';
          default:
            return 'makeup';
        }
    }
  };

  IS_BLOCKING = optOutGoogleAnalytics;
  this._source = _browserUtils2.default.getCustomerId(document);
  this.trackerId = this.getSecondTrackerId(this._source) || TRACKER_ID;
  this._medium = '';
  this._campaign = '';
  (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _browserUtils2.default.sleep(10);

          case 2:
            if (!_this.isGtagLoaded()) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt('return');

          case 4:
            _context2.next = 6;
            return _this._loadScript();

          case 6:
            _this._init();

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  }))();
};

exports.default = GTAG;
module.exports = exports['default'];

/***/ }),

/***/ 449:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _keys = __webpack_require__(49);

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _class, _temp, _initialiseProps;

var _Gtag = __webpack_require__(3451);

var _Gtag2 = _interopRequireDefault(_Gtag);

var _get2 = __webpack_require__(3);

var _get3 = _interopRequireDefault(_get2);

var _join2 = __webpack_require__(215);

var _join3 = _interopRequireDefault(_join2);

var _browserUtils = __webpack_require__(4);

var _browserUtils2 = _interopRequireDefault(_browserUtils);

var _settings = __webpack_require__(114);

var _isFunction2 = __webpack_require__(23);

var _isFunction3 = _interopRequireDefault(_isFunction2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tracking = (_temp = _class = function Tracking(emitter, events, settings) {
  var _this = this;

  var disabled = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var core = arguments[4];
  (0, _classCallCheck3.default)(this, Tracking);

  _initialiseProps.call(this);

  this.lastType = '';
  this.lastGuid = '';
  this.lastSubGuid = '';
  this.tracker = new _Gtag2.default(settings.optOutGoogleAnalytics);
  if (disabled) {
    this.tracker.block();
  }
  this.mediaSource = 'video';
  var tempCustomerId = _browserUtils2.default.getCustomerId(document);
  if (!!tempCustomerId) {
    this.tracker.source(tempCustomerId);
  }
  emitter.on(events.functionTypeChanged, function (functionType) {
    return _this.tracker.campaign(functionType);
  });
  emitter.on(events.authorize, function (customerId, country, language, affiliate) {
    _this.tracker.source(customerId);
    if (!!affiliate) {
      _this.tracker.medium(country + ':::' + language + ':::' + affiliate);
    } else {
      _this.tracker.medium(country + ':::' + language);
    }
    _this.tracker.event('engine', 'init');
  });
  emitter.on(events.changeRoute, function (route) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (route === 'virtual_tryon' && params.engineType === _settings.engineTypes.image) {
      _this.tracker.pageview('/YMK/route/' + route + '/' + params.mediaSource);
    } else if (route === 'image') {
      _this.tracker.pageview('/YMK/route/' + route + '/' + (params.type || params.mediaSource));
    } else {
      _this.tracker.pageview('/YMK/route/' + route);
    }
  });
  emitter.on(events.loadVideo, function () {
    _this.tracker.setSubCampaign('video');
    _this.tracker.event('engine', 'load', 'video');
    _this.mediaSource = 'video';
  });
  emitter.on(events.loadImage, function () {
    _this.tracker.event('engine', 'load', 'image');
    _this.mediaSource = 'image';
  });
  emitter.on(events.loadImageByUpload, function () {
    _this.tracker.setSubCampaign('upload');
    _this.tracker.event('photo-source', 'upload');
  });
  emitter.on(events.loadImageByModel, function (path) {
    _this.tracker.setSubCampaign('model');
    _this.tracker.event('photo-source', 'model', path);
  });
  emitter.on(events.loadImageByCapture, function () {
    return _this.tracker.event('photo-source', 'capture');
  });
  emitter.on(events.savePhoto, function () {
    return _this.tracker.event('save-' + _this.lastType, _this.lastGuid + ':::' + _this.lastSubGuid, _this.mediaSource);
  });
  emitter.on(events.compare, function () {
    return _this.tracker.event('compare', 'on', _this.mediaSource);
  });
  emitter.on(events.compareOff, function () {
    return _this.tracker.event('compare', 'off', _this.mediaSource);
  });
  emitter.on(events.splitFourWay, function () {
    return _this.tracker.event('split-fourway', 'on', _this.mediaSource);
  });
  emitter.on(events.splitFourWayOff, function () {
    return _this.tracker.event('split-fourway', 'off', _this.mediaSource);
  });
  emitter.on(events.closeEngine, function () {
    return _this.tracker.event('engine', 'close', _this.mediaSource);
  });
  emitter.on(events.reset, function (skuType) {
    if (!skuType || skuType === _this.lastType) {
      _this.lastGuid = '';
      _this.lastSubGuid = '';
      _this.tracker.event('engine', 'reset', _this.mediaSource);
    }
  });
  emitter.on(events.dragCompareIndicator, function () {
    return _this.tracker.event('compare', 'drag', _this.mediaSource);
  });
  emitter.on(events.applyMakeupBySku, function (type, skuGuid, skuItem, patternInfo) {
    _this.lastType = type;
    _this.lastGuid = skuGuid;
    _this.lastSubGuid = skuItem && skuItem.guid;
    _this.tracker.event('sku-' + type, skuGuid + ':::' + skuItem && skuItem.guid, _this.mediaSource, (0, _get3.default)(patternInfo, 'guid') || (0, _get3.default)(patternInfo, 'pattern_guid'));
  });
  emitter.on(events.applyMakeupBySkuSet, function (type, skuSetGuid) {
    _this.lastType = type;
    _this.lastGuid = skuSetGuid;
    _this.lastSubGuid = '';
    _this.tracker.event('skuset-' + type, skuSetGuid, _this.mediaSource);
  });
  emitter.on(events.applyMakeupByLook, function (lookGuid) {
    _this.lastType = 'look';
    _this.lastGuid = lookGuid;
    _this.lastSubGuid = '';
    _this.tracker.event('look', lookGuid, _this.mediaSource);
  });
  emitter.on(events.applyFunSticker, function (stickerGuid) {
    return _this.tracker.event('sticker', stickerGuid, _this.mediaSource);
  });
  emitter.on(events.pause, function () {
    return _this.tracker.event('pause');
  });
  emitter.on(events.resume, function () {
    return _this.tracker.event('resume');
  });
  emitter.on(events.applyMakeupByPattern, function (type, _skuGuid, _itemGuid, patternGuid) {
    return _this.tracker.event('pattern-' + type, patternGuid);
  });
  emitter.on(events.snapshot, function () {
    return _this.tracker.event('snapshot');
  });
  emitter.on(events.shareToFB, function (type) {
    return _this.tracker.event('share-to-fb', type);
  });
  emitter.on(events.shareToFBSuccess, function (type) {
    return _this.tracker.event('share-to-fb-success', type);
  });
  emitter.on(events.shareToFBCancel, function (type) {
    return _this.tracker.event('share-to-fb-cancel', type);
  });
  emitter.on(events.shareToWeibo, function (type) {
    return _this.tracker.event('share-to-weibo', type);
  });
  emitter.on(events.shareToTwitter, function (type) {
    return _this.tracker.event('share-to-twitter', type);
  });
  emitter.on(events.shareToWhatsApp, function (type) {
    return _this.tracker.event('share-to-whatsapp', type);
  });
  emitter.on(events.shareToPinterest, function (type) {
    return _this.tracker.event('share-to-pinterest', type);
  });
  emitter.on(events.shareToSMS, function (type) {
    return _this.tracker.event('share-to-sms', type);
  });
  emitter.on(events.shareViaEmail, function (type) {
    return _this.tracker.event('share-via-email', type);
  });
  emitter.on(events.shareViaEmailSuccess, function (type) {
    return _this.tracker.event('share-via-email-success', type);
  });
  emitter.on(events.shareViaEmailFailure, function (type) {
    return _this.tracker.event('share-via-email-failure', type);
  });
  emitter.on(events.kissDetected, function () {
    return _this.tracker.event('kiss-detected');
  });
  emitter.on(events.recordStarted, function (fps, ms) {
    return _this.tracker.event('record-started', fps, ms);
  });
  emitter.on(events.recordCancelled, function () {
    return _this.tracker.event('record-cancelled');
  });
  emitter.on(events.recordComplete, function (fps, ms) {
    return _this.tracker.event('record-complete', fps, ms);
  });
  emitter.on(events.productRecommendationStarted, function () {
    return _this.tracker.event('product-recommendation-started');
  });
  emitter.on(events.productRecommendationFailure, function () {
    return _this.tracker.event('product-recommendation-failure');
  });
  emitter.on(events.productRecommendationSuccess, function () {
    return _this.tracker.event('product-recommendation-complete');
  });
  emitter.on(events.shadeFindOpened, function () {
    return _this.tracker.event('shade-find-opened');
  });
  emitter.on(events.shadeFindClosed, function () {
    return _this.tracker.event('shade-find-closed');
  });
  emitter.on(events.shadeFindStarted, function () {
    return _this.tracker.event('shade-find-started');
  });
  emitter.on(events.shadeFindComplete, function () {
    return _this.tracker.event('shade-find-complete');
  });
  emitter.on(events.skinAnalysisParameterChanged, function (type) {
    return _this.tracker.event('skincare-parameter-changed', type);
  });
  emitter.on(events.skinAnalysisUpdated, function () {
    return _this.tracker.event('skincare-report-updated');
  });
  emitter.on(events.skinAnalysisCompleted, function () {
    return _this.tracker.event('skincare_detect_complete');
  });
  emitter.on(events.skinAnalysisOpened, function (skincareType) {
    return _this.tracker.event('skincare-opened', skincareType);
  });
  emitter.on(events.skinEmulationApplied, function (emulations) {
    return _this.tracker.event('skincare-emulation', 'apply', (0, _join3.default)((0, _keys2.default)(emulations), ','));
  });
  emitter.on(events.retrieveLandmakrs, function (size) {
    return _this.tracker.event('retrieve-landmarks', size);
  });
  emitter.on(events.offlineModeInit, function () {
    return _this.tracker.event('offline', 'init');
  });
  emitter.on(events.offlineModeNetworkError, function () {
    return _this.tracker.event('offline', 'network-error');
  });
  emitter.on(events.offlineModeComplete, function () {
    return _this.tracker.event('offline', 'complete');
  });
  emitter.on(events.offlineModeExpired, function () {
    return _this.tracker.event('offline', 'expired');
  });
  emitter.on(events.offlineModeNotReady, function () {
    return _this.tracker.event('offline', 'not-ready');
  });
  emitter.on(events.offlineModeUnsupported, function () {
    return _this.tracker.event('offline', 'unsupported');
  });
  emitter.on(events.faceAttributePredictorsInitialized, function () {
    return _this.tracker.event('face-attribute-predictors-initialized');
  });
  emitter.on(events.sizeChanged, function () {
    return _this.tracker.event('size-changed');
  });
  emitter.on(events.videoSourceChanged, function () {
    return _this.tracker.event('video-source-changed');
  });
  emitter.on(events.recordModeChanged, function (phase) {
    return _this.tracker.event('record-mode-change', 'phase');
  });
  emitter.on(events.faceAttributePredicted, function () {
    _this.tracker.event('face-attribute-predicted');
    _this.tracker.event('face_attribute_complete');
  });
  emitter.on(events.eyewearPDEstimated, function () {
    return _this.tracker.event('eyewear-auto-pd', 'estimate');
  });
  emitter.on(events.eyewearAutoPDOpened, function () {
    return _this.tracker.event('eyewear-auto-pd', 'open');
  });
  emitter.on(events.bipaConsentUpdated, function (consent) {
    return _this.tracker.event('bipa-consent', consent);
  });
  emitter.on(events.bipaConsentUIShowed, function () {
    return _this.tracker.event('bipa-consent-ui', 'show');
  });
  emitter.on(events.bipaDisagreeUIShowed, function () {
    return _this.tracker.event('bipa-deny-ui', 'show');
  });
  if ((0, _isFunction3.default)(core.eventTrackingListenerRegister)) {
    core.eventTrackingListenerRegister(emitter, this.tracker);
  }
}, _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.setSettings = function (settings) {
    var disabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (disabled) {
      _this2.tracker.block();
      return;
    }
    if (settings.userGoogleAnalyticsConsent === _settings.consents.disagree) {
      _this2.tracker.block();
      return;
    }
    if (settings.userGoogleAnalyticsConsent === _settings.consents.agree) {
      _this2.tracker.unblock();
      return;
    }
    if (settings.optOutGoogleAnalytics) {
      _this2.tracker.block();
    } else {
      _this2.tracker.unblock();
    }
  };
}, _temp);
exports.default = Tracking;
module.exports = exports['default'];

/***/ }),

/***/ 679:
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(1),
    toNumber = __webpack_require__(51),
    toString = __webpack_require__(26);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMin = Math.min;

/**
 * Creates a function like `_.round`.
 *
 * @private
 * @param {string} methodName The name of the `Math` method to use when rounding.
 * @returns {Function} Returns the new round function.
 */
function createRound(methodName) {
  var func = Math[methodName];
  return function(number, precision) {
    number = toNumber(number);
    precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
    if (precision) {
      // Shift with exponential notation to avoid floating-point issues.
      // See [MDN](https://mdn.io/round#Examples) for more details.
      var pair = (toString(number) + 'e').split('e'),
          value = func(pair[0] + 'e' + (+pair[1] + precision));

      pair = (toString(value) + 'e').split('e');
      return +(pair[0] + 'e' + (+pair[1] - precision));
    }
    return func(number);
  };
}

module.exports = createRound;


/***/ }),

/***/ 973:
/***/ (function(module, exports, __webpack_require__) {

var createRound = __webpack_require__(679);

/**
 * Computes `number` rounded down to `precision`.
 *
 * @static
 * @memberOf _
 * @since 3.10.0
 * @category Math
 * @param {number} number The number to round down.
 * @param {number} [precision=0] The precision to round down to.
 * @returns {number} Returns the rounded down number.
 * @example
 *
 * _.floor(4.006);
 * // => 4
 *
 * _.floor(0.046, 2);
 * // => 0.04
 *
 * _.floor(4060, -2);
 * // => 4000
 */
var floor = createRound('floor');

module.exports = floor;


/***/ })

});