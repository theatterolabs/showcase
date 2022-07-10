webpackJsonpYMK([80],{

/***/ 1980:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = __webpack_require__(8);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _dao = __webpack_require__(57);

var _browserUtils = __webpack_require__(4);

var _browserUtils2 = _interopRequireDefault(_browserUtils);

var _forEach2 = __webpack_require__(116);

var _forEach3 = _interopRequireDefault(_forEach2);

var _find2 = __webpack_require__(53);

var _find3 = _interopRequireDefault(_find2);

var _flatten2 = __webpack_require__(191);

var _flatten3 = _interopRequireDefault(_flatten2);

var _get2 = __webpack_require__(3);

var _get3 = _interopRequireDefault(_get2);

var _isFunction2 = __webpack_require__(23);

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _imatchMapping = __webpack_require__(2719);

var _imatchMapping2 = _interopRequireDefault(_imatchMapping);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const THRESHOLD = 15;
var WORKER = null;

var ShadeFinderController = function ShadeFinderController(settings, initCallback, completeCallback) {
  var _this = this;

  (0, _classCallCheck3.default)(this, ShadeFinderController);

  this.importWorker = function () {
/////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////
    if (_browserUtils2.default.isLiteAIFaceTrackingSupported((0, _get3.default)(_this, 'settings.features', {}), 'shadefinder')) {
      return _browserUtils2.default.isWebAssemblyEnabled() ? __webpack_require__.e/* import() */(76).then(__webpack_require__.bind(null, 2720)) : __webpack_require__.e/* import() */(77).then(__webpack_require__.bind(null, 2721));
    }
    return _browserUtils2.default.isWebAssemblyEnabled() ? __webpack_require__.e/* import() */(74).then(__webpack_require__.bind(null, 2722)) : __webpack_require__.e/* import() */(75).then(__webpack_require__.bind(null, 2723));
//////////////
  };

  this.toHexes = function (mappings) {
    var r = {};
    (0, _forEach3.default)(mappings, function (v, k) {
      return v.map(function (vv) {
        return r[vv] = k;
      });
    });
    return r;
  };

  this.hexToRgb = function (hex) {
    var result = /([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      };
    }
  };

  this.toImatch = function (hex) {
    if (!hex) {
      return '';
    }
    var r = (0, _find3.default)(_imatchMapping2.default, function (m) {
      return m.color === hex;
    });
    if (r && r.name) {
      return r.name;
    }
    return '';
  };

  this.toShadeFinderDataLabs = function (hexes, mappings, wclds, labs, shadeIdMap, skus) {
    var items = [];
    (0, _forEach3.default)(labs, function (lab, itemGuid) {
      return items.push({
        lab: lab,
        itemGuid: itemGuid,
        wcld: wclds[itemGuid],
        hex: hexes[itemGuid],
        rgb: _this.hexToRgb(hexes[itemGuid]),
        imatch: _this.getImatch(hexes, itemGuid, skus)
      });
    });
    return {
      type: 'lab',
      items: items,
      shadeIdMap: shadeIdMap
    };
  };

  this.getImatch = function (hexes, itemGuid, skus) {
    if (_this.settings && _this.settings.exposeCliniqueShadeFinderLab && skus && skus.length) {
      var items = (0, _flatten3.default)(skus.map(function (s) {
        return s.items;
      }));
      var matched = (0, _find3.default)(items, function (i) {
        return i.guid === itemGuid;
      });
      return matched && matched.color_number;
    }
    return _this.toImatch(hexes[itemGuid]);
  };

  this.toShadeFinderDataRgbs = function (hexes, mappings, wclds) {
    var items = [];
    (0, _forEach3.default)(wclds, function (wcld, itemGuid) {
      return items.push({
        itemGuid: itemGuid,
        wcld: wcld,
        hex: hexes[itemGuid],
        rgb: _this.hexToRgb(hexes[itemGuid]),
        imatch: _this.toImatch(hexes[itemGuid])
      });
    });
    return {
      type: 'rgb',
      items: items
    };
  };

  this.toShadeFinderData = function (mappings, wclds, labs, shadeIdMap, skus) {
    if (!!labs) {
      return _this.toShadeFinderDataLabs(_this.toHexes(mappings), mappings, wclds, labs, shadeIdMap, skus);
    }
    return _this.toShadeFinderDataRgbs(_this.toHexes(mappings), mappings, wclds, null, shadeIdMap);
  };

  this.load = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    var mappings, wclds, labs, skus, shadeIdMap;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _dao.listShadeFinderMappingV4)(_browserUtils2.default.getApiKey(document));

          case 2:
            mappings = _context.sent;
            _context.next = 5;
            return (0, _dao.listShadeFinderMappingWcldV4)(_browserUtils2.default.getApiKey(document));

          case 5:
            wclds = _context.sent;
            _context.next = 8;
            return (0, _dao.listShadeFinderLabs)(_browserUtils2.default.getApiKey(document), mappings);

          case 8:
            labs = _context.sent;
            _context.next = 11;
            return (0, _dao.listShadeFinderSkus)(_browserUtils2.default.getApiKey(document), mappings);

          case 11:
            skus = _context.sent;
            _context.next = 14;
            return (0, _dao.listShadeIdMappings)(_browserUtils2.default.getApiKey(document), mappings);

          case 14:
            shadeIdMap = _context.sent;

            _this.postMessage({
              type: 'load',
              isWasm: _this.isWasm,
              shadeFinderDeltaEThreshold: _this.settings.shadeFinderDeltaEThreshold,
              shadeFinderResultVersion: _this.settings.shadeFinderResultVersion,
              data: _this.toShadeFinderData(mappings, wclds, labs, shadeIdMap, skus),
              shadeFinderVersion: _this.settings.shadeFinderVersion,
              exposeMacShadeFinderLab: _this.settings.exposeMacShadeFinderLab || false,
              exposeMufeShadeFinderLab: _this.settings.exposeMufeShadeFinderLab || false,
              exposeCliniqueShadeFinderLab: _this.settings.exposeCliniqueShadeFinderLab || false,
              exposeElChinaShadeFinderLab: _this.settings.exposeElChinaShadeFinderLab || false
            });

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));

  this.close = function () {
    return _this.terminateWorker();
  };

  this.terminateWorker = function () {
    return WORKER && (0, _isFunction3.default)(WORKER.terminate) && WORKER.terminate();
  };

  this.postMessage = function (data) {
    return _this.worker.postMessage(data);
  };

  this.beginShadeFinder = function () {
    return _this.postMessage({ type: 'beginShadeFinder' });
  };

  this.findShade = function (props) {
    return _this.postMessage((0, _extends3.default)({}, props, { type: 'findShade' }));
  };

  this.resetShadeFinder = function () {
    return _this.postMessage({ type: 'resetShadeFinder' });
  };

  this.updateUndertone = function (undertone) {
    return _this.postMessage({ undertone: undertone, type: 'updateUndertone' });
  };

  this.results = [];
  this.settings = settings;
  this.terminateWorker();
  this.importWorker().then(function (Worker) {
    _this.worker = new Worker();
    WORKER = _this.worker;
    _this.worker.addEventListener('message', function (event) {
      if (!event || !event.data) {
        return;
      }
      if (event.data.type === 'findShadeResult') {
        completeCallback && completeCallback(event.data);
      }
      if (event.data.type === 'updateUndertoneResult') {
        completeCallback && completeCallback(event.data);
      }
    });
    _this.load().then(initCallback);
  });
};

exports.default = ShadeFinderController;
module.exports = exports['default'];

/***/ }),

/***/ 2719:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = [{
  id: 0,
  name: '0N1',
  color: '#ccb19f'
}, {
  id: 1,
  name: '1C0',
  color: '#c9a289'
}, {
  id: 2,
  name: '1C1',
  color: '#c29f8b'
}, {
  id: 3,
  name: '1C2',
  color: '#b69584'
}, {
  id: 4,
  name: '1N0',
  color: '#bfa290'
}, {
  id: 5,
  name: '1N1',
  color: '#c9a890'
}, {
  id: 6,
  name: '1N2',
  color: '#bf9e87'
}, {
  id: 7,
  name: '1W0',
  color: '#c0a088'
}, {
  id: 8,
  name: '1W1',
  color: '#c6a58b'
}, {
  id: 9,
  name: '1W2',
  color: '#bf9e84'
}, {
  id: 10,
  name: '2C0',
  color: '#c7a58c'
}, {
  id: 11,
  name: '3C1',
  color: '#b28e79'
}, {
  id: 12,
  name: '2C1',
  color: '#b9957e'
}, {
  id: 13,
  name: '2C2',
  color: '#b5927f'
}, {
  id: 14,
  name: '2C3',
  color: '#b2927f'
}, {
  id: 15,
  name: '2C4',
  color: '#be9b8a'
}, {
  id: 16,
  name: '2N1',
  color: '#be9c83'
}, {
  id: 17,
  name: '2N2',
  color: '#b49378'
}, {
  id: 18,
  name: '2W0',
  color: '#c09d84'
}, {
  id: 19,
  name: '2W1',
  color: '#ba957b'
}, {
  id: 20,
  name: '2W1.5',
  color: '#b79377'
}, {
  id: 21,
  name: '2W2',
  color: '#ba9578'
}, {
  id: 22,
  name: '3C0',
  color: '#b89983'
}, {
  id: 23,
  name: '3C2',
  color: '#aa8976'
}, {
  id: 24,
  name: '3C3',
  color: '#a8836d'
}, {
  id: 25,
  name: '3N1',
  color: '#ab8771'
}, {
  id: 26,
  name: '3N2',
  color: '#b18b72'
}, {
  id: 27,
  name: '3W0',
  color: '#b8937a'
}, {
  id: 28,
  name: '3W1',
  color: '#b79279'
}, {
  id: 29,
  name: '3W1.5',
  color: '#b18b6e'
}, {
  id: 30,
  name: '3W2',
  color: '#af8668'
}, {
  id: 31,
  name: '4C1',
  color: '#b08873'
}, {
  id: 32,
  name: '4C2',
  color: '#a67c66'
}, {
  id: 33,
  name: '4C3',
  color: '#a37e69'
}, {
  id: 34,
  name: '4N1',
  color: '#a4826a'
}, {
  id: 35,
  name: '4N2',
  color: '#a37d62'
}, {
  id: 36,
  name: '4N3',
  color: '#a17a5f'
}, {
  id: 37,
  name: '4W1',
  color: '#b08669'
}, {
  id: 38,
  name: '4W2',
  color: '#9c785c'
}, {
  id: 39,
  name: '4W3',
  color: '#a88065'
}, {
  id: 40,
  name: '4W4',
  color: '#a47b5e'
}, {
  id: 41,
  name: '5C1',
  color: '#885f47'
}, {
  id: 42,
  name: '5C2',
  color: '#996c55'
}, {
  id: 43,
  name: '5N1',
  color: '#987059'
}, {
  id: 44,
  name: '5N1.5',
  color: '#916950'
}, {
  id: 45,
  name: '5N2',
  color: '#8b6148'
}, {
  id: 46,
  name: '5W1',
  color: '#9f7459'
}, {
  id: 47,
  name: '5W1.5',
  color: '#956b50'
}, {
  id: 48,
  name: '5W2',
  color: '#9a6f56'
}, {
  id: 49,
  name: '6C1',
  color: '#855c48'
}, {
  id: 50,
  name: '6C2',
  color: '#724e3b'
}, {
  id: 51,
  name: '7C1',
  color: '#614335'
}, {
  id: 52,
  name: '6N1',
  color: '#815d47'
}, {
  id: 53,
  name: '6N2',
  color: '#745744'
}, {
  id: 54,
  name: '6W1',
  color: '#866049'
}, {
  id: 55,
  name: '6W2',
  color: '#775440'
}, {
  id: 56,
  name: '7C2',
  color: '#674537'
}, {
  id: 57,
  name: '7N1',
  color: '#674939'
}, {
  id: 58,
  name: '7W1',
  color: '#704e3b'
}, {
  id: 59,
  name: '8C1',
  color: '#5d4034'
}, {
  id: 60,
  name: '8N1',
  color: '#5e4234'
}];
module.exports = exports['default'];

/***/ })

});