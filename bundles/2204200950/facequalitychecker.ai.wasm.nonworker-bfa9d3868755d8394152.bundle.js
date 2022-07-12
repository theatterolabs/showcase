webpackJsonpYMK([60,23],{

/***/ 2016:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(8);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _FaceQualityCheckerSource = __webpack_require__(2017);

var _FaceQualityCheckerSource2 = _interopRequireDefault(_FaceQualityCheckerSource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var source = void 0;

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(self, event, loadVenus) {
    var isLiteAIFaceTrackingSupported = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var report;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(!event || !event.data)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return');

          case 2:
            if (!source) {
              source = new _FaceQualityCheckerSource2.default(loadVenus, isLiteAIFaceTrackingSupported);
            }

            if (event.data.type === 'load' && !source.loaded) {
              source.load(event.data, function () {
                self.postMessage({ type: 'loadResult' });
              });
            }

            if (event.data.type === 'close') {
              source.close();
              self.postMessage({ type: 'closeResult' });
            }

            if (!(!source || !source.loaded)) {
              _context.next = 7;
              break;
            }

            return _context.abrupt('return');

          case 7:
            if (!(event.data.type === 'checkFaceQuality')) {
              _context.next = 12;
              break;
            }

            _context.next = 10;
            return source.checkFaceQuality(event);

          case 10:
            report = _context.sent;

            if (!!report) {
              // warning - spread syntax dones not work in worker.
              report.type = 'checkFaceQualityResult';
              self.postMessage(report);
            }

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = exports['default'];

/***/ }),

/***/ 2017:
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

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _mediaUtils = __webpack_require__(73);

var _mediaUtils2 = _interopRequireDefault(_mediaUtils);

var _browserUtils = __webpack_require__(4);

var _browserUtils2 = _interopRequireDefault(_browserUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FACE_DETECTOR_PATH = '_run/YMK_Davinci_20160622_frontal.cade';
var FACE_ALIGNER_PATH = '_run/YMK_Venus_20181211.regressor';
var MAX_FACE = 1;
var ENGINE_POINTER = null;

var FaceQualityCheckerSource = function FaceQualityCheckerSource(loadVenus) {
  var _this = this;

  var isLiteAIFaceTrackingSupported = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  (0, _classCallCheck3.default)(this, FaceQualityCheckerSource);

  this.load = function (_ref) {
    var isShadeFinder = _ref.isShadeFinder;
    var onLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

    if (_this.loading) {
      return;
    }
    _this.loading = true;
    _this.isShadeFinder = isShadeFinder;
    _this.allocated = false;
    _this.loadVenus(null, null, function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(YMKModule) {
        var ShadeFinderFaceTrackingManager, _ShadeFinderFaceTrackingManager;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.YMKModule = YMKModule;
                if (!ENGINE_POINTER) {
                  ENGINE_POINTER = new _this.YMKModule.ValObject();
                  _this.YMKModule.CreateVenusLiveObject(_this.YMKModule.IID_VENUS_MAKEUP_LIVE, ENGINE_POINTER);
                }
                _this.venus_makeup_live = ENGINE_POINTER.value;
                if (!_this.isLiteAIFaceTrackingSupported) {
                  _this.venus_makeup_live.SetInternalModelPaths(FACE_DETECTOR_PATH, FACE_ALIGNER_PATH);
                }

                if (!_this.isLiteAIFaceTrackingSupported) {
                  _context.next = 19;
                  break;
                }

                if (!(_browserUtils2.default.isWebAssemblySIMDSupported() || _browserUtils2.default.isIOs15AndAbove())) {
                  _context.next = 12;
                  break;
                }

                _context.next = 8;
                return __webpack_require__.e/* import() */(44).then(__webpack_require__.bind(null, 2334));

              case 8:
                ShadeFinderFaceTrackingManager = _context.sent;

                _this.shadeFinderFaceTrackingManager = new ShadeFinderFaceTrackingManager();
                _context.next = 16;
                break;

              case 12:
                _context.next = 14;
                return __webpack_require__.e/* import() */(53).then(__webpack_require__.bind(null, 2335));

              case 14:
                _ShadeFinderFaceTrackingManager = _context.sent;

                _this.shadeFinderFaceTrackingManager = new _ShadeFinderFaceTrackingManager();

              case 16:
                _context.next = 18;
                return _this.shadeFinderFaceTrackingManager.init();

              case 18:
                _this.shadeFinderFaceTrackingManager.setVenusMakeupLive(_this.venus_makeup_live);

              case 19:
                _this.venus_makeup_live.SetEnableShadeFinder(_this.isShadeFinder);
                _this.loaded = true;
                _this.loading = false;
                onLoad && onLoad();

              case 23:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }));

      return function (_x3) {
        return _ref2.apply(this, arguments);
      };
    }());
  };

  this.allocateResource = function (width, height) {
    _this.venus_frame_buffer = _this.YMKModule._malloc(width * height * 4);
    _this.web_frame_buffer = new Uint8Array(_this.YMKModule.HEAPU8.buffer, _this.venus_frame_buffer, width * height * 4);

    if (_this.isLiteAIFaceTrackingSupported) {
      var cropBufferSize = _this.shadeFinderFaceTrackingManager && _this.shadeFinderFaceTrackingManager.getCropBufferSize();
      _this.venus_crop_buffer = _this.YMKModule._malloc(cropBufferSize);
      _this.web_crop_buffer = new Uint8Array(_this.YMKModule.HEAPU8.buffer, _this.venus_crop_buffer, cropBufferSize);
    }

    _this.face_rect_vec = _this.YMKModule.CreateVector_VN_Rect(MAX_FACE);
    _this.face_align_data_vec = _this.YMKModule.CreateVector_MakeupLive_FaceAlignData(MAX_FACE);
    _this.is_face_detected_vec = _this.YMKModule.CreateVector_BYTE(MAX_FACE);
    _this.temp_int = new _this.YMKModule.IntObject();
    _this.shade_finder_check_result = new _this.YMKModule.ShadeFinderCheckResult();
  };

  this.deallocateResource = function () {
    if (!!_this.venus_frame_buffer) {
      _this.YMKModule._free(_this.venus_frame_buffer);
      _this.venus_frame_buffer = null;
      _this.web_frame_buffer = null;
    }
    _this.venus_crop_buffer && _this.YMKModule._free(_this.venus_crop_buffer);
    _this.venus_crop_buffer = null;
    _this.web_crop_buffer = null;
    _this.face_rect_vec && _this.face_rect_vec.delete();
    _this.face_rect_vec = null;
    _this.face_align_data_vec && _this.face_align_data_vec.delete();
    _this.face_align_data_vec = null;
    _this.temp_int && _this.temp_int.delete();
    _this.temp_int = null;
    _this.is_face_detected_vec && _this.is_face_detected_vec.delete();
    _this.is_face_detected_vec = null;
    _this.shade_finder_check_result && _this.shade_finder_check_result.delete();
    _this.shade_finder_check_result = null;
    if (ENGINE_POINTER && _browserUtils2.default.isAbleToReleaseEngine()) {
      _this.YMKModule.ReleaseVenusLiveObject(ENGINE_POINTER);
      ENGINE_POINTER.delete();
      ENGINE_POINTER = null;
    }
    _this.loaded = false;
  };

  this.close = function () {
    _this.deallocateResource();
    if (_this.isLiteAIFaceTrackingSupported) {
      _this.shadeFinderFaceTrackingManager && _this.shadeFinderFaceTrackingManager.close();
    }
  };

  this.checkFaceQuality = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(event) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (_this.loaded) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt('return');

            case 2:
              if (!(!event || !event.data || !event.data.imageData)) {
                _context2.next = 4;
                break;
              }

              return _context2.abrupt('return');

            case 4:
              if (!_this.allocated) {
                _this.allocateResource(event.data.imageData.width, event.data.imageData.height);
                _this.allocated = true;
              }
              _this.venus_makeup_live.SetEnableShadeFinder(_this.isShadeFinder);

              if (!_this.isLiteAIFaceTrackingSupported) {
                _context2.next = 10;
                break;
              }

              _context2.next = 9;
              return _this.checkFaceQualityAI(event.data.imageData);

            case 9:
              return _context2.abrupt('return', _context2.sent);

            case 10:
              return _context2.abrupt('return', _this.checkFaceQualityVenus(event.data.imageData));

            case 11:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }));

    return function (_x4) {
      return _ref3.apply(this, arguments);
    };
  }();

  this.checkFaceQualityAI = function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(imageData) {
      var width, height, is_face_exist, align_points, face_align_data, i, min_x, max_x, min_y, max_y, _i, is_face_shape_ok;

      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              width = imageData.width;
              height = imageData.height;
              is_face_exist = true;

              _this.web_frame_buffer.set(imageData.data);
              _this.venus_makeup_live.TrackFrameRGBA(_this.face_rect_vec, _this.venus_frame_buffer, width, height, width * 4, 0, false, false, false);

              if (!_this.need_face_detection) {
                _context3.next = 11;
                break;
              }

              _context3.next = 8;
              return _this.shadeFinderFaceTrackingManager.doFaceDetect(_this.venus_frame_buffer, _this.web_frame_buffer, _this.venus_crop_buffer, _this.web_crop_buffer, width, height);

            case 8:
              _this.face_rect_data = _context3.sent;

              _this.face_rect_vec.set(0, _this.face_rect_data);
              is_face_exist = !(_this.face_rect_data.left < 0 && _this.face_rect_data.top < 0 && _this.face_rect_data.right < 0 && _this.face_rect_data.bottom < 0);

            case 11:
              if (is_face_exist) {
                _context3.next = 13;
                break;
              }

              return _context3.abrupt('return', {
                face_quality: _mediaUtils2.default.getFaceQuality(null, false),
                face_rect_data: false,
                face_align_data: false,
                face_check_result: false
              });

            case 13:
              _context3.next = 15;
              return _this.shadeFinderFaceTrackingManager.doAlignment(_this.venus_frame_buffer, _this.web_frame_buffer, _this.venus_crop_buffer, _this.web_crop_buffer, width, height, _this.face_rect_data);

            case 15:
              align_points = _context3.sent;
              face_align_data = _this.face_align_data_vec.get(0);

              for (i = 0; i < face_align_data.points.length; i++) {
                face_align_data.points[i].x = align_points[2 * i];
                face_align_data.points[i].y = align_points[2 * i + 1];
              }
              min_x = 1.0;
              max_x = 0.0;
              min_y = 1.0;
              max_y = 0.0;

              for (_i = 0; _i < face_align_data.points.length; _i++) {
                min_x = Math.min(min_x, face_align_data.points[_i].x);
                min_y = Math.min(min_y, face_align_data.points[_i].y);
                max_x = Math.max(max_x, face_align_data.points[_i].x);
                max_y = Math.max(max_y, face_align_data.points[_i].y);
              }

              // update face rect
              _this.face_rect_data.left = min_x * width;
              _this.face_rect_data.right = max_x * width;
              _this.face_rect_data.top = min_y * height;
              _this.face_rect_data.bottom = max_y * height;

              // skin care check
              is_face_shape_ok = new _this.YMKModule.BoolObject();

              _this.venus_makeup_live.ShadeFinderCheckFaceQuality(_this.shade_finder_check_result, is_face_shape_ok, face_align_data, width, height);
              _this.need_face_detection = !is_face_shape_ok.value;
              is_face_shape_ok.delete();
              return _context3.abrupt('return', {
                face_quality: _mediaUtils2.default.getFaceQuality(_this.shade_finder_check_result, is_face_exist),
                face_rect_data: _this.face_rect_data,
                face_align_data: face_align_data,
                face_check_result: _this.toPlainShadeFinderCheckResult(_this.shade_finder_check_result)
              });

            case 32:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this);
    }));

    return function (_x5) {
      return _ref4.apply(this, arguments);
    };
  }();

  this.checkFaceQualityVenus = function (imageData) {
    var width = imageData.width;
    var height = imageData.height;
    _this.web_frame_buffer.set(imageData.data);
    _this.venus_makeup_live.TrackFrameRGBA(_this.venus_frame_buffer, width, height, width * 4, 0, false, false, false);
    _this.venus_makeup_live.GetShadeFinderCheckResult(_this.shade_finder_check_result);
    _this.venus_makeup_live.GetFaceData(_this.is_face_detected_vec, _this.face_rect_vec, _this.face_align_data_vec, _this.temp_int);
    return {
      face_quality: _mediaUtils2.default.getFaceQuality(_this.shade_finder_check_result, _this.is_face_detected_vec.get(0)),
      face_rect_data: _this.face_rect_vec.get(0),
      face_align_data: _this.face_align_data_vec.get(0),
      face_check_result: _this.toPlainShadeFinderCheckResult(_this.shade_finder_check_result)
    };
  };

  this.toPlainShadeFinderCheckResult = function (native) {
    return {
      face_area: native.m_face_area_quality.value,
      face_frontal: native.m_face_frontal_quality.value,
      lighting: native.m_lighting_quality.value,
      naked_eye: native.m_naked_eye_quality.value,
      white_level: native.m_white_level,
      black_level: native.m_black_level,
      lighting_ratio: native.m_lighting_ratio
    };
  };

  this.YMKModule = null;
  this.engine_pointer = null;
  this.venus_makeup_live = null;
  this.loaded = false;
  this.loading = false;
  this.settings = {};
  this.loadVenus = loadVenus;
  this.isLiteAIFaceTrackingSupported = isLiteAIFaceTrackingSupported;
  this.need_face_detection = true;
  this.allocated = false;
};

exports.default = FaceQualityCheckerSource;
module.exports = exports['default'];

/***/ }),

/***/ 2707:
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

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _aiwasm = __webpack_require__(2708);

var _aiwasm2 = _interopRequireDefault(_aiwasm);

var _facequalitycheckerWorker = __webpack_require__(2016);

var _facequalitycheckerWorker2 = _interopRequireDefault(_facequalitycheckerWorker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FaceQualityCheckerAiWasmNonWorker = function FaceQualityCheckerAiWasmNonWorker(onEvent) {
  var _this = this;

  (0, _classCallCheck3.default)(this, FaceQualityCheckerAiWasmNonWorker);

  this.postMessage = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(event) {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _facequalitycheckerWorker2.default)({ postMessage: function postMessage(e) {
                  return _this.onEvent({ data: e });
                } }, { data: event }, _aiwasm2.default.load, true);

            case 2:
              return _context.abrupt('return', _context.sent);

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();

  this.onEvent = onEvent;
};

exports.default = FaceQualityCheckerAiWasmNonWorker;
module.exports = exports['default'];

/***/ }),

/***/ 2708:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(193);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadModule = function loadModule() {
  var m = void 0;
///////////////
////////////////////////////////////////////////////
////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////
  m = __webpack_require__(427);
//////////////////////////
////////////////////////////////////////////////////////////
///////////
////////////////////////////////////////////////////////
////////////
  return m;
};

exports.default = {
  load: function load(settings, emitter, cb) {
    return _utils2.default.load(settings, emitter, loadModule, loadModule, 'shadefinder', cb);
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 427:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, __dirname, module, Promise, Buffer) {var _0x38ad=['root','lstatSync','realPath','code','errno','nlink','uid','utimesSync','truncateSync','getMode','writeFileSync','renameSync','unlinkSync','rmdirSync','readdirSync','symlinkSync','readlinkSync','relative','nfd','flagsForNode','flags','closeSync','bufferFrom','writeSync','position','fstatSync','reader','DIR_MODE','FILE_MODE','lastModifiedDate','blobs','data','packages','metadata','blob','readAsArrayBuffer','recurse_count','isMountpoint','follow_mount','mounted','dirname','nameTable','name_next','mayLookup','hashName','FSNode','nextInode','hashRemoveNode','flagModes','Unknown\x20file\x20open\x20mode:\x20','nodePermissions','isRoot','getPath','flagsToPermissionString','MAX_OPEN_FDS','streams','FSStream','defineProperties','nextfd','getDevice','devices','mounts','syncFSRequests','\x20FS.syncfs\x20operations\x20in\x20flight\x20at\x20once,\x20probably\x20just\x20doing\x20extra\x20work','getMounts','syncfs','basename','mayCreate','mayDelete','rename','trackingDelegate','willMovePath','\x27,\x20\x27','\x27)\x20threw\x20an\x20exception:\x20','onMovePath','FS.trackingDelegate[\x27onMovePath\x27](\x27','message','willDeletePath','FS.trackingDelegate[\x27willDeletePath\x27](\x27','onDeletePath','FS.trackingDelegate[\x27onDeletePath\x27](\x27','destroyNode','readlink','getStream','chown','truncate','modeStringToFlags','mayOpen','createStream','logReadFiles','readFiles','FS.trackingDelegate\x20error\x20on\x20read\x20file:\x20','onOpenFile','tracking','openFlags','READ','FS.trackingDelegate[\x27onOpenFile\x27](\x27','\x27,\x20flags)\x20threw\x20an\x20exception:\x20','isClosed','getdents','close','closeStream','ungotten','seekable','onWriteToFile','FS.trackingDelegate[\x27onWriteToFile\x27](\x27','ioctl','encoding','Invalid\x20encoding\x20type\x20\x22','canOwn','isView','byteLength','Unsupported\x20data\x20type','currentPath','/tmp','/home','/dev','makedev','mkdev','/dev/null','default_tty_ops','register','/dev/tty','/dev/tty1','getRandomValues','crypto','randomBytes','random_device','random','urandom','/proc/self','/proc/self/fd','fake','createDevice','stdout','/dev/stdout','stderr','/dev/stderr','setErrno','FS\x20error','stack','defineProperty','constructor','<generic\x20error,\x20no\x20stack>','createDefaultDirectories','createDefaultDevices','filesystems','ensureErrnoError','createStandardStreams','_fflush','exists','parentExists','parentObject','create','major','isDevice','isFolder','Lazy\x20loading\x20should\x20have\x20been\x20performed\x20(contents\x20set)\x20in\x20createLazyFile,\x20but\x20it\x20was\x20not.\x20Lazy\x20loading\x20only\x20works\x20in\x20web\x20workers.\x20Use\x20--embed-file\x20or\x20--preload-file\x20in\x20emcc\x20on\x20the\x20main\x20thread.','Cannot\x20load\x20without\x20read()\x20or\x20XMLHttpRequest.','lengthKnown','chunks','setDataGetter','cacheLength','HEAD','getResponseHeader','Content-length','Accept-Ranges','bytes','Content-Encoding','gzip','only\x20','\x20bytes\x20available!\x20programmer\x20error!','setRequestHeader','Range','bytes=','overrideMimeType','text/plain;\x20charset=x-user-defined','.\x20Status:\x20','LazyFiles\x20on\x20gzip\x20forces\x20download\x20of\x20the\x20whole\x20file\x20when\x20length\x20is\x20accessed','Cannot\x20do\x20synchronous\x20binary\x20XHRs\x20outside\x20webworkers\x20in\x20modern\x20browsers.\x20Use\x20--embed-file\x20or\x20--preload-file\x20in\x20emcc','_chunkSize','createFile','url','forceLoadFile','createDataFile','preloadPlugins','canHandle','handle','asyncLoad','EM_FS_','FILE_DATA','DB_NAME','creating\x20db','analyzePath','cwd','getTime','EINVAL','EACCES','varargs','getSocket','EBADF','addr','lookup_addr','getStreamFromFD','EOVERFLOW','doReadv','doWritev','getStr','ENOTTY','bad\x20ioctl\x20syscall\x20','fromWireType','body','return\x20function\x20','()\x20{\x0a','\x20\x20\x20\x20return\x20body.apply(this,\x20arguments);\x0a','};\x0a','elements','getterReturnType','setterArgumentType','rawDestructor','getter','getterContext','setter','toWireType','Incorrect\x20number\x20of\x20tuple\x20elements\x20for\x20',':\x20expected=','rawConstructor','fields','fieldName','setterContext','Missing\x20field','Unknown\x20type\x20size:\x20','argPackAdvance','registerType\x20registeredInstance\x20requires\x20argPackAdvance','type\x20\x22','\x22\x20must\x20have\x20a\x20positive\x20integer\x20typeid\x20pointer','ignoreDuplicateRegistrations','\x27\x20twice','Unknown\x20boolean\x20type\x20size:\x20','ptrType','registeredClass','ptr','baseClass','upcast','count','smartPtr','smartPtrType','\x20instance\x20already\x20deleted','value','getPrototypeOf','deleteScheduled','preservePointerOnDelete','Object\x20already\x20scheduled\x20for\x20deletion','isDeleted','deleteLater','overloadTable','Function\x20\x27',')\x20-\x20expects\x20one\x20of\x20(','Cannot\x20register\x20public\x20name\x20\x27','Cannot\x20register\x20multiple\x20overloads\x20of\x20a\x20function\x20with\x20the\x20same\x20number\x20of\x20arguments\x20(','numArguments','instancePrototype','getActualType','downcast',',\x20got\x20an\x20instance\x20of\x20','isReference','null\x20is\x20not\x20a\x20valid\x20','Cannot\x20pass\x20\x22','\x22\x20as\x20a\x20','Cannot\x20pass\x20deleted\x20object\x20as\x20a\x20pointer\x20of\x20type\x20','isSmartPointer','isConst','Cannot\x20convert\x20argument\x20of\x20type\x20','Passing\x20raw\x20pointer\x20to\x20smart\x20pointer\x20is\x20illegal','sharingPolicy','\x20to\x20parameter\x20type\x20','clone','rawShare','Unsupporting\x20sharing\x20policy','rawGetPointee','getInheritedInstanceCount','getLiveInheritedInstances','flushPendingDeletes','setDelayFunction','ptr\x20should\x20not\x20be\x20undefined','makeClassHandle\x20requires\x20ptr\x20and\x20ptrType','Both\x20smartPtrType\x20and\x20smartPtr\x20must\x20be\x20specified','getPointee','pointeeType','pointerType','readValueFromPointer','destructorFunction','Replacing\x20nonexistant\x20public\x20symbol','argCount','\x20\x20\x20\x20return\x20dynCall(rawFunction',');\x0a','rawFunction','FUNCTION_TABLE_','No\x20dynCall\x20invoker\x20for\x20signature:\x20','unknown\x20function\x20pointer\x20with\x20signature\x20','Cannot\x20construct\x20','\x20due\x20to\x20unbound\x20types','Use\x20\x27new\x27\x20to\x20construct\x20','constructor_body','\x20has\x20no\x20accessible\x20constructor','\x20with\x20invalid\x20number\x20of\x20parameters\x20(',')\x20-\x20expected\x20(','constructor\x20','Cannot\x20register\x20multiple\x20constructors\x20with\x20identical\x20number\x20of\x20parameters\x20(','\x27!\x20Overload\x20resolution\x20is\x20currently\x20only\x20performed\x20using\x20the\x20parameter\x20count,\x20not\x20actual\x20type\x20info!','\x20arguments,\x20expected\x20','new_\x20called\x20with\x20constructor\x20type\x20','\x20which\x20is\x20not\x20a\x20function','argTypes\x20array\x20size\x20mismatch!\x20Must\x20at\x20least\x20get\x20return\x20value\x20and\x20\x27this\x27\x20types!','void','Wired',')\x20{\x0a','if\x20(arguments.length\x20!==\x20','throwBindingError(\x27function\x20','\x20called\x20with\x20\x27\x20+\x20arguments.length\x20+\x20\x27\x20arguments,\x20expected\x20','\x20args!\x27);\x0a','throwBindingError','invoker','retType','var\x20thisWired\x20=\x20classParam.toWireType(',',\x20this);\x0a','Wired\x20=\x20argType','.toWireType(',');\x20//\x20','argType','var\x20rv\x20=\x20','invoker(fn','runDestructors(destructors);\x0a','thisWired','_dtor(','var\x20ret\x20=\x20retType.fromWireType(rv);\x0a','pureVirtualFunctions','Cannot\x20call\x20','className','\x20incompatible\x20with\x20\x22this\x22\x20of\x20type\x20','cannot\x20call\x20emscripten\x20binding\x20method\x20','\x20on\x20deleted\x20object','Cannot\x20access\x20','\x20getter','\x20setter','count_emval_handles','Unknown\x20integer\x20type:\x20','values','enum','null','array','Unknown\x20float\x20type:\x20','boolean','Cannot\x20convert\x20\x22','\x22\x20to\x20','unsigned','Passing\x20a\x20number\x20\x22','\x22\x20from\x20JS\x20side\x20to\x20C/C++\x20side\x20to\x20an\x20argument\x20of\x20type\x20\x22','\x22,\x20which\x20is\x20outside\x20the\x20valid\x20range\x20[','std::string','Cannot\x20use\x20deleted\x20val.\x20handle\x20=\x20','emval::as','_emval_take_value','abort','staticInit','FS_createFolder','createFolder','FS_createPreloadedFile','createPreloadedFile','FS_createLazyFile','createLazyFile','FS_createLink','createLink','FS_createDevice','FS_unlink','InternalError','BindingError','UnboundTypeError',')\x20\x20at\x20offset\x20','___cxa_is_pointer_type','___getTypeName','__get_daylight','__get_environ','__get_timezone','__get_tzname','_free','_llvm_round_f32','_malloc','_memcpy','_memmove','_memset','_sbrk','establishStackSpace','globalCtors','stackAlloc','stackRestore','stackSave','dynCall_dii','dynCall_fii','dynCall_fiii','dynCall_fiiii','dynCall_i','dynCall_ii','dynCall_iidiiii','dynCall_iii','dynCall_iiii','dynCall_iiiif','dynCall_iiiii','dynCall_iiiiii','dynCall_iiiiiii','dynCall_iiiiiiii','dynCall_iiiiiiiii','dynCall_iiiiiiiiii','dynCall_iiiiiiiiiii','dynCall_iiiiiiiiiiii','dynCall_iiiiiiiiiiiiii','dynCall_iiiiiiiiiiiiiii','dynCall_jiji','dynCall_vii','dynCall_viid','dynCall_viif','dynCall_viii','dynCall_viiif','dynCall_viiii','dynCall_viiiif','dynCall_viiiii','dynCall_viiiiii','dynCall_viiiiiii','dynCall_viiiiiiii','createPath','ExitStatus','Program\x20terminated\x20with\x20exit(','onRuntimeInitialized','run','noExitRuntime','onExit','onAbort','stringify','abort(',').\x20Build\x20with\x20-s\x20ASSERTIONS=1\x20for\x20more\x20info.','preInit','https://theatterolabs.github.io/showcase/webconsultation/core/','undefined','expectedDataFileDownloads','finishedDataFileDownloads','encodeURIComponent','location','pathname','toString','lastIndexOf','using\x20preloaded\x20data\x20can\x20only\x20be\x20done\x20on\x20a\x20web\x20page\x20or\x20in\x20a\x20web\x20worker','Web_MakeupLive/wasm/Venus-20210309-ai.data','locateFilePackage','locateFile','warning:\x20you\x20defined\x20Module.locateFilePackage,\x20that\x20has\x20been\x20renamed\x20to\x20Module.locateFile\x20(using\x20your\x20locateFilePackage\x20for\x20now)','package_uuid','open','GET','responseType','arraybuffer','onprogress','total','addedTotal','dataFileDownloads','loaded','ceil','setStatus','Downloading\x20data...\x20(','Downloading\x20data...','onerror','NetworkError\x20for:\x20','onload','status','response','\x20:\x20','responseURL','send','error','getPreloadedPackage','FS_createPath','_run','start','end','audio','prototype','name','requests','addRunDependency','fp\x20','byteArray','subarray','finish','FS_createDataFile','removeRunDependency','files','filename','Loading\x20data\x20file\x20failed.','getMemory','length','HEAPU8','set','datafile_Web_MakeupLive/wasm/Venus-20210309-ai.data','preloadResults','calledRun','preRun','/_run/YMK_Davinci_20160622_frontal.cade','/_run/shade_finder_init_net_20210217.bin','/_run/pose.mtnet','6d7b199b-c2f8-4d90-b04d-6e7f75c6465b','hasOwnProperty','thisProgram','./this.program','quit','postRun','object','function','read','path','normalize','readFileSync','readBinary','buffer','argv','replace','arguments','slice','exports','uncaughtException','exit','[Emscripten\x20Module\x20object]','binary','href','currentScript','indexOf','blob:','substr','responseText','readAsync','setWindowTitle','title','bind','printErr','warn','i64','float','getNativeTypeSize\x20invalid\x20bits\x20','shown','push','concat','Module','Instance','grow','Unable\x20to\x20grow\x20wasm\x20table.\x20Use\x20a\x20higher\x20value\x20for\x20RESERVED_FUNCTION_POINTERS\x20or\x20set\x20ALLOW_TABLE_GROWTH.','Missing\x20signature\x20argument\x20to\x20addFunction','call','apply','dynCall_','i32','i16','double','invalid\x20type\x20for\x20getValue:\x20','Assertion\x20failed:\x20','Cannot\x20call\x20unknown\x20function\x20',',\x20make\x20sure\x20it\x20is\x20exported','every','string','invalid\x20type\x20for\x20setValue:\x20','number','max','this\x20function\x20has\x20been\x20removed\x20-\x20you\x20should\x20use\x20UTF8ToString(ptr,\x20maxBytesToRead)\x20instead!','fromCharCode','utf8','decode','charCodeAt','utf-16le','writeStringToMemory\x20is\x20deprecated\x20and\x20should\x20not\x20be\x20called!\x20Use\x20stringToUTF8()\x20instead!','(no\x20stack\x20trace\x20available)','extraStackTrace','HEAP8','HEAP16','HEAP32','HEAPU16','HEAPU32','HEAPF32','HEAPF64','TOTAL_MEMORY','TOTAL_MEMORY\x20should\x20be\x20larger\x20than\x20TOTAL_STACK,\x20was\x20','Memory','shift','func','arg','dynCall_v','dynCall_vi','init','initialized','ignorePermissions','unshift','pow','abs','cos','sin','tan','asin','atan','atan2','exp','log','imul','fround','round','min','trunc','monitorRunDependencies','data:application/octet-stream;base64,','startsWith','Venus-20210309-ai.wasm','wasmBinary','both\x20async\x20and\x20sync\x20fetching\x20of\x20the\x20wasm\x20failed','same-origin','failed\x20to\x20load\x20wasm\x20binary\x20file\x20at\x20\x27','arrayBuffer','catch','wasm-instantiate','instantiateWasm','Module.instantiateWasm\x20callback\x20failed\x20with\x20error:\x20','instance','then','instantiate','failed\x20to\x20asynchronously\x20prepare\x20wasm:\x20','asm','memory','table','anyfunc','__memory_base','called','USER','LOGNAME','PATH','HOME','/home/web_user','LANG','C.UTF-8','Environment\x20size\x20exceeded\x20TOTAL_ENV_SIZE!','uncaught_exception','infos','adjusted','refcount','rethrown','destructor','caught','addRef','deAdjust','last','type','___cxa_can_catch','___errno_location','splice','charAt','normalizeArray','split','filter','join','splitPath','Arguments\x20to\x20path.resolve\x20must\x20be\x20strings','resolve','registerDevice','stream_ops','ttys','node','rdev','ErrnoError','tty','flush','ops','get_char','timestamp','put_char','now','input','win32','stdin','openSync','/dev/stdin','readSync','utf-8','prompt','Input:\x20','output','createNode','isBlkdev','isFIFO','ops_table','node_ops','getattr','setattr','lookup','mknod','unlink','readdir','symlink','llseek','write','allocate','mmap','msync','chrdev_stream_ops','mode','dir','isFile','file','stream','usedBytes','isLink','link','isChrdev','chrdev','contents','dev','ino','gid','isDir','size','atime','mtime','ctime','blksize','blocks','genericErrors','lookupNode','parent','byteOffset','indexedDB','webkitIndexedDB','msIndexedDB','IDBFS\x20used,\x20but\x20indexedDB\x20not\x20supported','mount','getRemoteSet','reconcile','DB_VERSION','Unable\x20to\x20connect\x20to\x20IndexedDB','onupgradeneeded','result','target','transaction','contains','DB_STORE_NAME','createObjectStore','indexNames','dbs','preventDefault','join2','map','mountpoint','pop','stat','local','getDB','readonly','index','openKeyCursor','onsuccess','remote','primaryKey','key','continue','lookupPath','getFileDataAsTypedArray','mkdir','writeFile','node\x20type\x20not\x20supported','chmod','rmdir','get','put','delete','keys','forEach','entries','readwrite','objectStore','errored','sort','loadRemoteEntry','storeLocalEntry','loadLocalEntry','storeRemoteEntry','reverse','removeLocalEntry','removeRemoteEntry','isWindows','platform','match','constants','flagsForNodeMap','O_APPEND','O_CREAT','O_EXCL','O_RDONLY','O_RDWR','O_SYNC','O_WRONLY','from','opts'];(function(_0x467a57,_0x1083a0){var _0x239f4a=function(_0x1ed503){while(--_0x1ed503){_0x467a57['push'](_0x467a57['shift']());}};_0x239f4a(++_0x1083a0);}(_0x38ad,0x1b9));var _0x1aea=function(_0x35129b,_0x5ecadc){_0x35129b=_0x35129b-0x0;var _0x25289b=_0x38ad[_0x35129b];return _0x25289b;};var VENUS_PATH=_0x1aea('0x0');var Module=typeof Module!==_0x1aea('0x1')?Module:{};if(!Module[_0x1aea('0x2')]){Module[_0x1aea('0x2')]=0x0;Module[_0x1aea('0x3')]=0x0;}Module[_0x1aea('0x2')]++;(function(){var _0xa28d18=function(_0x3c7305){var _0x1fdeb5;if(typeof window==='object'){_0x1fdeb5=window[_0x1aea('0x4')](window[_0x1aea('0x5')][_0x1aea('0x6')][_0x1aea('0x7')]()['substring'](0x0,window[_0x1aea('0x5')][_0x1aea('0x6')][_0x1aea('0x7')]()['lastIndexOf']('/'))+'/');}else if(typeof location!==_0x1aea('0x1')){_0x1fdeb5=encodeURIComponent(location[_0x1aea('0x6')][_0x1aea('0x7')]()['substring'](0x0,location[_0x1aea('0x6')]['toString']()[_0x1aea('0x8')]('/'))+'/');}else{throw _0x1aea('0x9');}var _0x42bd91=_0x1aea('0xa');var _0xdfd4f='Venus-20210309-ai.data';if(typeof Module[_0x1aea('0xb')]==='function'&&!Module[_0x1aea('0xc')]){Module[_0x1aea('0xc')]=Module[_0x1aea('0xb')];err(_0x1aea('0xd'));}var _0x271234=Module[_0x1aea('0xc')]?Module[_0x1aea('0xc')](_0xdfd4f,''):_0xdfd4f;var _0x59fbb0=_0x3c7305['remote_package_size'];var _0x26cb98=_0x3c7305[_0x1aea('0xe')];function _0x187e45(_0x88ca5c,_0x1877fc,_0x2b47ed,_0x149352){var _0x15773c=new XMLHttpRequest();_0x15773c[_0x1aea('0xf')](_0x1aea('0x10'),VENUS_PATH+_0x88ca5c,!![]);_0x15773c[_0x1aea('0x11')]=_0x1aea('0x12');_0x15773c[_0x1aea('0x13')]=function(_0x526002){var _0x594135=_0x88ca5c;var _0x231d2c=_0x1877fc;if(_0x526002[_0x1aea('0x14')])_0x231d2c=_0x526002['total'];if(_0x526002['loaded']){if(!_0x15773c[_0x1aea('0x15')]){_0x15773c[_0x1aea('0x15')]=!![];if(!Module[_0x1aea('0x16')])Module[_0x1aea('0x16')]={};Module[_0x1aea('0x16')][_0x594135]={'loaded':_0x526002[_0x1aea('0x17')],'total':_0x231d2c};}else{Module[_0x1aea('0x16')][_0x594135][_0x1aea('0x17')]=_0x526002['loaded'];}var _0x1731fe=0x0;var _0x1e5460=0x0;var _0x6f2975=0x0;for(var _0x31c9f3 in Module[_0x1aea('0x16')]){var _0x52d322=Module[_0x1aea('0x16')][_0x31c9f3];_0x1731fe+=_0x52d322['total'];_0x1e5460+=_0x52d322[_0x1aea('0x17')];_0x6f2975++;}_0x1731fe=Math[_0x1aea('0x18')](_0x1731fe*Module[_0x1aea('0x2')]/_0x6f2975);if(Module[_0x1aea('0x19')])Module[_0x1aea('0x19')](_0x1aea('0x1a')+_0x1e5460+'/'+_0x1731fe+')');}else if(!Module[_0x1aea('0x16')]){if(Module['setStatus'])Module[_0x1aea('0x19')](_0x1aea('0x1b'));}};_0x15773c[_0x1aea('0x1c')]=function(_0xa8c6a5){throw new Error(_0x1aea('0x1d')+_0x88ca5c);};_0x15773c[_0x1aea('0x1e')]=function(_0x57cdc0){if(_0x15773c[_0x1aea('0x1f')]==0xc8||_0x15773c[_0x1aea('0x1f')]==0x130||_0x15773c[_0x1aea('0x1f')]==0xce||_0x15773c[_0x1aea('0x1f')]==0x0&&_0x15773c[_0x1aea('0x20')]){var _0xb2a451=_0x15773c[_0x1aea('0x20')];_0x2b47ed(_0xb2a451);}else{throw new Error(_0x15773c['statusText']+_0x1aea('0x21')+_0x15773c[_0x1aea('0x22')]);}};_0x15773c[_0x1aea('0x23')](null);};function _0xd90204(_0x2b3eca){console[_0x1aea('0x24')]('package\x20error:',_0x2b3eca);};var _0xd4ceb1=null;var _0x24b451=Module[_0x1aea('0x25')]?Module[_0x1aea('0x25')](_0x271234,_0x59fbb0):null;if(!_0x24b451)_0x187e45(_0x271234,_0x59fbb0,function(_0x4159a7){if(_0xd4ceb1){_0xd4ceb1(_0x4159a7);_0xd4ceb1=null;}else{_0x24b451=_0x4159a7;}},_0xd90204);function _0x4aaea3(){function _0x1f4954(_0x4ab5a1,_0x4d84d2){if(!_0x4ab5a1)throw _0x4d84d2+new Error()['stack'];}Module[_0x1aea('0x26')]('/',_0x1aea('0x27'),!![],!![]);function _0x4fc4fd(_0xe6c6d8,_0x5c4be9,_0x73831f){this[_0x1aea('0x28')]=_0xe6c6d8;this[_0x1aea('0x29')]=_0x5c4be9;this[_0x1aea('0x2a')]=_0x73831f;}_0x4fc4fd[_0x1aea('0x2b')]={'requests':{},'open':function(_0x470cdb,_0x344d98){this[_0x1aea('0x2c')]=_0x344d98;this[_0x1aea('0x2d')][_0x344d98]=this;Module[_0x1aea('0x2e')](_0x1aea('0x2f')+this[_0x1aea('0x2c')]);},'send':function(){},'onload':function(){var _0x846e25=this[_0x1aea('0x30')][_0x1aea('0x31')](this[_0x1aea('0x28')],this[_0x1aea('0x29')]);this[_0x1aea('0x32')](_0x846e25);},'finish':function(_0x828209){var _0x1e6305=this;Module[_0x1aea('0x33')](this[_0x1aea('0x2c')],null,_0x828209,!![],!![],!![]);Module[_0x1aea('0x34')](_0x1aea('0x2f')+_0x1e6305[_0x1aea('0x2c')]);this[_0x1aea('0x2d')][this[_0x1aea('0x2c')]]=null;}};var _0x3b0f2a=_0x3c7305[_0x1aea('0x35')];for(var _0x26dc73=0x0;_0x26dc73<_0x3b0f2a['length'];++_0x26dc73){new _0x4fc4fd(_0x3b0f2a[_0x26dc73][_0x1aea('0x28')],_0x3b0f2a[_0x26dc73][_0x1aea('0x29')],_0x3b0f2a[_0x26dc73][_0x1aea('0x2a')])[_0x1aea('0xf')](_0x1aea('0x10'),_0x3b0f2a[_0x26dc73][_0x1aea('0x36')]);}function _0x15e68c(_0x50b4b5){Module[_0x1aea('0x3')]++;_0x1f4954(_0x50b4b5,_0x1aea('0x37'));_0x1f4954(_0x50b4b5 instanceof ArrayBuffer,'bad\x20input\x20to\x20processPackageData');var _0x758bc2=new Uint8Array(_0x50b4b5);var _0xeeae3f;var _0x2937be=Module[_0x1aea('0x38')](_0x758bc2[_0x1aea('0x39')]);Module[_0x1aea('0x3a')][_0x1aea('0x3b')](_0x758bc2,_0x2937be);_0x4fc4fd[_0x1aea('0x2b')][_0x1aea('0x30')]=Module[_0x1aea('0x3a')][_0x1aea('0x31')](_0x2937be,_0x2937be+_0x758bc2[_0x1aea('0x39')]);var _0x3b0f2a=_0x3c7305[_0x1aea('0x35')];for(var _0x26dc73=0x0;_0x26dc73<_0x3b0f2a[_0x1aea('0x39')];++_0x26dc73){_0x4fc4fd[_0x1aea('0x2b')]['requests'][_0x3b0f2a[_0x26dc73]['filename']][_0x1aea('0x1e')]();}Module['removeRunDependency'](_0x1aea('0x3c'));};Module[_0x1aea('0x2e')](_0x1aea('0x3c'));if(!Module[_0x1aea('0x3d')])Module[_0x1aea('0x3d')]={};Module[_0x1aea('0x3d')][_0x42bd91]={'fromCache':![]};if(_0x24b451){_0x15e68c(_0x24b451);_0x24b451=null;}else{_0xd4ceb1=_0x15e68c;}}if(Module[_0x1aea('0x3e')]){_0x4aaea3();}else{if(!Module[_0x1aea('0x3f')])Module[_0x1aea('0x3f')]=[];Module[_0x1aea('0x3f')]['push'](_0x4aaea3);}};_0xa28d18({'files':[{'start':0x0,'audio':0x0,'end':0x373d8,'filename':_0x1aea('0x40')},{'start':0x373d8,'audio':0x0,'end':0x1502e8,'filename':_0x1aea('0x41')},{'start':0x1502e8,'audio':0x0,'end':0x16da39,'filename':_0x1aea('0x42')}],'remote_package_size':0x16da39,'package_uuid':_0x1aea('0x43')});}());var moduleOverrides={};var key;for(key in Module){if(Module[_0x1aea('0x44')](key)){moduleOverrides[key]=Module[key];}}Module['arguments']=[];Module[_0x1aea('0x45')]=_0x1aea('0x46');Module[_0x1aea('0x47')]=function(_0x35c4ac,_0x2a48b9){throw _0x2a48b9;};Module[_0x1aea('0x3f')]=[];Module[_0x1aea('0x48')]=[];var ENVIRONMENT_IS_WEB=![];var ENVIRONMENT_IS_WORKER=![];var ENVIRONMENT_IS_NODE=![];var ENVIRONMENT_IS_SHELL=![];ENVIRONMENT_IS_WEB=typeof window===_0x1aea('0x49');ENVIRONMENT_IS_WORKER=typeof importScripts==='function';ENVIRONMENT_IS_NODE=typeof process===_0x1aea('0x49')&&"function"===_0x1aea('0x4a')&&!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_WORKER;ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER;var scriptDirectory='';function locateFile(_0x5949ce){if(Module[_0x1aea('0xc')]){return Module[_0x1aea('0xc')](_0x5949ce,scriptDirectory);}else{return scriptDirectory+_0x5949ce;}}if(ENVIRONMENT_IS_NODE){scriptDirectory=__dirname+'/';var nodeFS;var nodePath;Module[_0x1aea('0x4b')]=function shell_read(_0x636109,_0x164d14){var _0x1a52b5;if(!nodeFS)nodeFS=__webpack_require__(501);if(!nodePath)nodePath=!(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }());_0x636109=nodePath[_0x1aea('0x4d')](_0x636109);_0x1a52b5=nodeFS[_0x1aea('0x4e')](_0x636109);return _0x164d14?_0x1a52b5:_0x1a52b5[_0x1aea('0x7')]();};Module[_0x1aea('0x4f')]=function readBinary(_0x5e9b93){var _0x5daa83=Module[_0x1aea('0x4b')](_0x5e9b93,!![]);if(!_0x5daa83[_0x1aea('0x50')]){_0x5daa83=new Uint8Array(_0x5daa83);}assert(_0x5daa83['buffer']);return _0x5daa83;};if(process[_0x1aea('0x51')]['length']>0x1){Module[_0x1aea('0x45')]=process[_0x1aea('0x51')][0x1][_0x1aea('0x52')](/\\/g,'/');}Module[_0x1aea('0x53')]=process[_0x1aea('0x51')][_0x1aea('0x54')](0x2);if(true){module[_0x1aea('0x55')]=Module;}process['on'](_0x1aea('0x56'),function(_0x39dad5){if(!(_0x39dad5 instanceof ExitStatus)){throw _0x39dad5;}});process['on']('unhandledRejection',abort);Module[_0x1aea('0x47')]=function(_0x5ee638){process[_0x1aea('0x57')](_0x5ee638);};Module['inspect']=function(){return _0x1aea('0x58');};}else if(ENVIRONMENT_IS_SHELL){if(typeof read!=_0x1aea('0x1')){Module[_0x1aea('0x4b')]=function shell_read(_0x57f374){return read(_0x57f374);};}Module[_0x1aea('0x4f')]=function readBinary(_0x346d1c){var _0x4ae493;if(typeof readbuffer===_0x1aea('0x4a')){return new Uint8Array(readbuffer(_0x346d1c));}_0x4ae493=read(_0x346d1c,_0x1aea('0x59'));assert(typeof _0x4ae493===_0x1aea('0x49'));return _0x4ae493;};if(typeof scriptArgs!='undefined'){Module['arguments']=scriptArgs;}else if(typeof arguments!=_0x1aea('0x1')){Module[_0x1aea('0x53')]=arguments;}if(typeof quit===_0x1aea('0x4a')){Module[_0x1aea('0x47')]=function(_0x5817a8){quit(_0x5817a8);};}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self[_0x1aea('0x5')][_0x1aea('0x5a')];}else if(document[_0x1aea('0x5b')]){scriptDirectory=document['currentScript']['src'];}if(scriptDirectory[_0x1aea('0x5c')](_0x1aea('0x5d'))!==0x0){scriptDirectory=scriptDirectory[_0x1aea('0x5e')](0x0,scriptDirectory[_0x1aea('0x8')]('/')+0x1);}else{scriptDirectory='';}Module['read']=function shell_read(_0x568aed){var _0x5b33bb=new XMLHttpRequest();_0x5b33bb[_0x1aea('0xf')]('GET',VENUS_PATH+_0x568aed,![]);_0x5b33bb[_0x1aea('0x23')](null);return _0x5b33bb[_0x1aea('0x5f')];};if(ENVIRONMENT_IS_WORKER){Module[_0x1aea('0x4f')]=function readBinary(_0x31aefb){var _0x15d7cf=new XMLHttpRequest();_0x15d7cf[_0x1aea('0xf')]('GET',VENUS_PATH+_0x31aefb,![]);_0x15d7cf[_0x1aea('0x11')]=_0x1aea('0x12');_0x15d7cf['send'](null);return new Uint8Array(_0x15d7cf[_0x1aea('0x20')]);};}Module[_0x1aea('0x60')]=function readAsync(_0xbddcb3,_0x191e80,_0x2e2cfb){var _0x5413db=new XMLHttpRequest();_0x5413db[_0x1aea('0xf')](_0x1aea('0x10'),VENUS_PATH+_0xbddcb3,!![]);_0x5413db['responseType']='arraybuffer';_0x5413db[_0x1aea('0x1e')]=function xhr_onload(){if(_0x5413db[_0x1aea('0x1f')]==0xc8||_0x5413db['status']==0x0&&_0x5413db[_0x1aea('0x20')]){_0x191e80(_0x5413db[_0x1aea('0x20')]);return;}_0x2e2cfb();};_0x5413db[_0x1aea('0x1c')]=_0x2e2cfb;_0x5413db['send'](null);};Module[_0x1aea('0x61')]=function(_0x188da6){document[_0x1aea('0x62')]=_0x188da6;};}else{}var out=Module['print']||(typeof console!=='undefined'?console['log'][_0x1aea('0x63')](console):typeof print!=='undefined'?print:null);var err=Module[_0x1aea('0x64')]||(typeof printErr!==_0x1aea('0x1')?printErr:typeof console!==_0x1aea('0x1')&&console[_0x1aea('0x65')]['bind'](console)||out);for(key in moduleOverrides){if(moduleOverrides[_0x1aea('0x44')](key)){Module[key]=moduleOverrides[key];}}moduleOverrides=undefined;var STACK_ALIGN=0x10;function dynamicAlloc(_0x225d52){var _0x3c481b=HEAP32[DYNAMICTOP_PTR>>0x2];var _0x133445=_0x3c481b+_0x225d52+0xf&-0x10;if(_0x133445<=_emscripten_get_heap_size()){HEAP32[DYNAMICTOP_PTR>>0x2]=_0x133445;}else{return 0x0;}return _0x3c481b;}function alignMemory(_0x212186,_0x52a46b){if(!_0x52a46b)_0x52a46b=STACK_ALIGN;return Math[_0x1aea('0x18')](_0x212186/_0x52a46b)*_0x52a46b;}function getNativeTypeSize(_0x36eebb){switch(_0x36eebb){case'i1':case'i8':return 0x1;case'i16':return 0x2;case'i32':return 0x4;case _0x1aea('0x66'):return 0x8;case _0x1aea('0x67'):return 0x4;case'double':return 0x8;default:{if(_0x36eebb[_0x36eebb[_0x1aea('0x39')]-0x1]==='*'){return 0x4;}else if(_0x36eebb[0x0]==='i'){var _0x32fd03=parseInt(_0x36eebb[_0x1aea('0x5e')](0x1));assert(_0x32fd03%0x8===0x0,_0x1aea('0x68')+_0x32fd03+',\x20type\x20'+_0x36eebb);return _0x32fd03/0x8;}else{return 0x0;}}}}function warnOnce(_0x4600a5){if(!warnOnce[_0x1aea('0x69')])warnOnce[_0x1aea('0x69')]={};if(!warnOnce[_0x1aea('0x69')][_0x4600a5]){warnOnce[_0x1aea('0x69')][_0x4600a5]=0x1;err(_0x4600a5);}}var asm2wasmImports={'f64-rem':function(_0x130211,_0x22dfc9){return _0x130211%_0x22dfc9;},'debugger':function(){debugger;}};var jsCallStartIndex=0x1;var functionPointers=new Array(0x0);function convertJsFunctionToWasm(_0x553162,_0x485278){var _0x2b1001=[0x1,0x0,0x1,0x60];var _0x5b08e4=_0x485278[_0x1aea('0x54')](0x0,0x1);var _0x3764fc=_0x485278[_0x1aea('0x54')](0x1);var _0x301374={'i':0x7f,'j':0x7e,'f':0x7d,'d':0x7c};_0x2b1001['push'](_0x3764fc[_0x1aea('0x39')]);for(var _0x5f7f74=0x0;_0x5f7f74<_0x3764fc[_0x1aea('0x39')];++_0x5f7f74){_0x2b1001['push'](_0x301374[_0x3764fc[_0x5f7f74]]);}if(_0x5b08e4=='v'){_0x2b1001[_0x1aea('0x6a')](0x0);}else{_0x2b1001=_0x2b1001['concat']([0x1,_0x301374[_0x5b08e4]]);}_0x2b1001[0x1]=_0x2b1001[_0x1aea('0x39')]-0x2;var _0x1269cf=new Uint8Array([0x0,0x61,0x73,0x6d,0x1,0x0,0x0,0x0][_0x1aea('0x6b')](_0x2b1001,[0x2,0x7,0x1,0x1,0x65,0x1,0x66,0x0,0x0,0x7,0x5,0x1,0x1,0x66,0x0,0x0]));var _0x615869=new WebAssembly[(_0x1aea('0x6c'))](_0x1269cf);var _0x952fe2=new WebAssembly[(_0x1aea('0x6d'))](_0x615869,{'e':{'f':_0x553162}});var _0x2c6990=_0x952fe2[_0x1aea('0x55')]['f'];return _0x2c6990;}function addFunctionWasm(_0x1c2835,_0x1e7f3e){var _0x856112=wasmTable;var _0x457ba9=_0x856112[_0x1aea('0x39')];try{_0x856112[_0x1aea('0x6e')](0x1);}catch(_0x2844b4){if(!_0x2844b4 instanceof RangeError){throw _0x2844b4;}throw _0x1aea('0x6f');}try{_0x856112[_0x1aea('0x3b')](_0x457ba9,_0x1c2835);}catch(_0xcb55c6){if(!_0xcb55c6 instanceof TypeError){throw _0xcb55c6;}assert(typeof _0x1e7f3e!==_0x1aea('0x1'),_0x1aea('0x70'));var _0x220d7a=convertJsFunctionToWasm(_0x1c2835,_0x1e7f3e);_0x856112[_0x1aea('0x3b')](_0x457ba9,_0x220d7a);}return _0x457ba9;}function removeFunctionWasm(_0x404018){}function addFunction(_0x1a4348,_0x2862e9){var _0x30bdc5=0x0;for(var _0x361edd=_0x30bdc5;_0x361edd<_0x30bdc5+0x0;_0x361edd++){if(!functionPointers[_0x361edd]){functionPointers[_0x361edd]=_0x1a4348;return jsCallStartIndex+_0x361edd;}}throw'Finished\x20up\x20all\x20reserved\x20function\x20pointers.\x20Use\x20a\x20higher\x20value\x20for\x20RESERVED_FUNCTION_POINTERS.';}function removeFunction(_0xf944a9){functionPointers[_0xf944a9-jsCallStartIndex]=null;}var funcWrappers={};function getFuncWrapper(_0xc2d8b7,_0x5f4803){if(!_0xc2d8b7)return;assert(_0x5f4803);if(!funcWrappers[_0x5f4803]){funcWrappers[_0x5f4803]={};}var _0x212d9f=funcWrappers[_0x5f4803];if(!_0x212d9f[_0xc2d8b7]){if(_0x5f4803[_0x1aea('0x39')]===0x1){_0x212d9f[_0xc2d8b7]=function dynCall_wrapper(){return dynCall(_0x5f4803,_0xc2d8b7);};}else if(_0x5f4803[_0x1aea('0x39')]===0x2){_0x212d9f[_0xc2d8b7]=function dynCall_wrapper(_0x38d739){return dynCall(_0x5f4803,_0xc2d8b7,[_0x38d739]);};}else{_0x212d9f[_0xc2d8b7]=function dynCall_wrapper(){return dynCall(_0x5f4803,_0xc2d8b7,Array[_0x1aea('0x2b')][_0x1aea('0x54')][_0x1aea('0x71')](arguments));};}}return _0x212d9f[_0xc2d8b7];}function makeBigInt(_0x4488e9,_0x40d53b,_0x1be671){return _0x1be671?+(_0x4488e9>>>0x0)+ +(_0x40d53b>>>0x0)*0x100000000:+(_0x4488e9>>>0x0)+ +(_0x40d53b|0x0)*0x100000000;}function dynCall(_0x4dc5b5,_0xdfa94b,_0xd4d8d7){if(_0xd4d8d7&&_0xd4d8d7[_0x1aea('0x39')]){return Module['dynCall_'+_0x4dc5b5][_0x1aea('0x72')](null,[_0xdfa94b][_0x1aea('0x6b')](_0xd4d8d7));}else{return Module[_0x1aea('0x73')+_0x4dc5b5][_0x1aea('0x71')](null,_0xdfa94b);}}var tempRet0=0x0;var setTempRet0=function(_0x2bd2b7){tempRet0=_0x2bd2b7;};var getTempRet0=function(){return tempRet0;};var Runtime={};var GLOBAL_BASE=0x400;if(typeof WebAssembly!=='object'){err('no\x20native\x20wasm\x20support\x20detected');}function getValue(_0x221dc5,_0xaf204d,_0x66e6c9){_0xaf204d=_0xaf204d||'i8';if(_0xaf204d['charAt'](_0xaf204d[_0x1aea('0x39')]-0x1)==='*')_0xaf204d=_0x1aea('0x74');switch(_0xaf204d){case'i1':return HEAP8[_0x221dc5>>0x0];case'i8':return HEAP8[_0x221dc5>>0x0];case _0x1aea('0x75'):return HEAP16[_0x221dc5>>0x1];case _0x1aea('0x74'):return HEAP32[_0x221dc5>>0x2];case _0x1aea('0x66'):return HEAP32[_0x221dc5>>0x2];case _0x1aea('0x67'):return HEAPF32[_0x221dc5>>0x2];case _0x1aea('0x76'):return HEAPF64[_0x221dc5>>0x3];default:abort(_0x1aea('0x77')+_0xaf204d);}return null;}var wasmMemory;var wasmTable;var ABORT=![];var EXITSTATUS=0x0;function assert(_0x3d8093,_0x466665){if(!_0x3d8093){abort(_0x1aea('0x78')+_0x466665);}}function getCFunc(_0x76c088){var _0xd78de8=Module['_'+_0x76c088];assert(_0xd78de8,_0x1aea('0x79')+_0x76c088+_0x1aea('0x7a'));return _0xd78de8;}function ccall(_0x204dfb,_0x3c0f55,_0x9dba69,_0x1338f1,_0x28efdd){var _0x43f216={'string':function(_0xe1560a){var _0x3fbd57=0x0;if(_0xe1560a!==null&&_0xe1560a!==undefined&&_0xe1560a!==0x0){var _0x29a78f=(_0xe1560a['length']<<0x2)+0x1;_0x3fbd57=stackAlloc(_0x29a78f);stringToUTF8(_0xe1560a,_0x3fbd57,_0x29a78f);}return _0x3fbd57;},'array':function(_0x535926){var _0x59fa8d=stackAlloc(_0x535926[_0x1aea('0x39')]);writeArrayToMemory(_0x535926,_0x59fa8d);return _0x59fa8d;}};function _0x1018c3(_0x489a35){if(_0x3c0f55==='string')return UTF8ToString(_0x489a35);if(_0x3c0f55==='boolean')return Boolean(_0x489a35);return _0x489a35;}var _0x2375d8=getCFunc(_0x204dfb);var _0x5b0e6e=[];var _0x49b5fc=0x0;if(_0x1338f1){for(var _0x5ee3c5=0x0;_0x5ee3c5<_0x1338f1[_0x1aea('0x39')];_0x5ee3c5++){var _0x5b643e=_0x43f216[_0x9dba69[_0x5ee3c5]];if(_0x5b643e){if(_0x49b5fc===0x0)_0x49b5fc=stackSave();_0x5b0e6e[_0x5ee3c5]=_0x5b643e(_0x1338f1[_0x5ee3c5]);}else{_0x5b0e6e[_0x5ee3c5]=_0x1338f1[_0x5ee3c5];}}}var _0x4b1395=_0x2375d8[_0x1aea('0x72')](null,_0x5b0e6e);_0x4b1395=_0x1018c3(_0x4b1395);if(_0x49b5fc!==0x0)stackRestore(_0x49b5fc);return _0x4b1395;}function cwrap(_0x21a0aa,_0x5792d4,_0x298a7c,_0x31c452){_0x298a7c=_0x298a7c||[];var _0x1412dd=_0x298a7c[_0x1aea('0x7b')](function(_0x1fc5fc){return _0x1fc5fc==='number';});var _0x5a64c7=_0x5792d4!==_0x1aea('0x7c');if(_0x5a64c7&&_0x1412dd&&!_0x31c452){return getCFunc(_0x21a0aa);}return function(){return ccall(_0x21a0aa,_0x5792d4,_0x298a7c,arguments,_0x31c452);};}function setValue(_0x3d560a,_0x1680ff,_0x51cf64,_0x347ef5){_0x51cf64=_0x51cf64||'i8';if(_0x51cf64['charAt'](_0x51cf64[_0x1aea('0x39')]-0x1)==='*')_0x51cf64=_0x1aea('0x74');switch(_0x51cf64){case'i1':HEAP8[_0x3d560a>>0x0]=_0x1680ff;break;case'i8':HEAP8[_0x3d560a>>0x0]=_0x1680ff;break;case _0x1aea('0x75'):HEAP16[_0x3d560a>>0x1]=_0x1680ff;break;case _0x1aea('0x74'):HEAP32[_0x3d560a>>0x2]=_0x1680ff;break;case'i64':tempI64=[_0x1680ff>>>0x0,(tempDouble=_0x1680ff,+Math_abs(tempDouble)>=0x1?tempDouble>0x0?(Math_min(+Math_floor(tempDouble/0x100000000),0xffffffff)|0x0)>>>0x0:~~+Math_ceil((tempDouble-+(~~tempDouble>>>0x0))/0x100000000)>>>0x0:0x0)],HEAP32[_0x3d560a>>0x2]=tempI64[0x0],HEAP32[_0x3d560a+0x4>>0x2]=tempI64[0x1];break;case _0x1aea('0x67'):HEAPF32[_0x3d560a>>0x2]=_0x1680ff;break;case _0x1aea('0x76'):HEAPF64[_0x3d560a>>0x3]=_0x1680ff;break;default:abort(_0x1aea('0x7d')+_0x51cf64);}}var ALLOC_NORMAL=0x0;var ALLOC_STACK=0x1;var ALLOC_DYNAMIC=0x2;var ALLOC_NONE=0x3;function allocate(_0x3de36d,_0x1c3306,_0x577c48,_0xb69d0e){var _0x35cb92,_0x44d78b;if(typeof _0x3de36d===_0x1aea('0x7e')){_0x35cb92=!![];_0x44d78b=_0x3de36d;}else{_0x35cb92=![];_0x44d78b=_0x3de36d[_0x1aea('0x39')];}var _0x26b6c8=typeof _0x1c3306==='string'?_0x1c3306:null;var _0x56ff01;if(_0x577c48==ALLOC_NONE){_0x56ff01=_0xb69d0e;}else{_0x56ff01=[_malloc,stackAlloc,dynamicAlloc][_0x577c48](Math[_0x1aea('0x7f')](_0x44d78b,_0x26b6c8?0x1:_0x1c3306[_0x1aea('0x39')]));}if(_0x35cb92){var _0x4d4130;_0xb69d0e=_0x56ff01;assert((_0x56ff01&0x3)==0x0);_0x4d4130=_0x56ff01+(_0x44d78b&~0x3);for(;_0xb69d0e<_0x4d4130;_0xb69d0e+=0x4){HEAP32[_0xb69d0e>>0x2]=0x0;}_0x4d4130=_0x56ff01+_0x44d78b;while(_0xb69d0e<_0x4d4130){HEAP8[_0xb69d0e++>>0x0]=0x0;}return _0x56ff01;}if(_0x26b6c8==='i8'){if(_0x3de36d[_0x1aea('0x31')]||_0x3de36d[_0x1aea('0x54')]){HEAPU8['set'](_0x3de36d,_0x56ff01);}else{HEAPU8[_0x1aea('0x3b')](new Uint8Array(_0x3de36d),_0x56ff01);}return _0x56ff01;}var _0x25fe0c=0x0,_0x1b5a80,_0x4c5667,_0x34869d;while(_0x25fe0c<_0x44d78b){var _0x3706de=_0x3de36d[_0x25fe0c];_0x1b5a80=_0x26b6c8||_0x1c3306[_0x25fe0c];if(_0x1b5a80===0x0){_0x25fe0c++;continue;}if(_0x1b5a80==_0x1aea('0x66'))_0x1b5a80=_0x1aea('0x74');setValue(_0x56ff01+_0x25fe0c,_0x3706de,_0x1b5a80);if(_0x34869d!==_0x1b5a80){_0x4c5667=getNativeTypeSize(_0x1b5a80);_0x34869d=_0x1b5a80;}_0x25fe0c+=_0x4c5667;}return _0x56ff01;}function getMemory(_0x423e1d){if(!runtimeInitialized)return dynamicAlloc(_0x423e1d);return _malloc(_0x423e1d);}function Pointer_stringify(_0x93408,_0x5225c9){abort(_0x1aea('0x80'));}function AsciiToString(_0x2af2e1){var _0x1f61fa='';while(0x1){var _0x1a6333=HEAPU8[_0x2af2e1++>>0x0];if(!_0x1a6333)return _0x1f61fa;_0x1f61fa+=String[_0x1aea('0x81')](_0x1a6333);}}function stringToAscii(_0x57e3b2,_0x537fda){return writeAsciiToMemory(_0x57e3b2,_0x537fda,![]);}var UTF8Decoder=typeof TextDecoder!==_0x1aea('0x1')?new TextDecoder(_0x1aea('0x82')):undefined;function UTF8ArrayToString(_0x27166a,_0x4ca2af,_0x562b83){var _0x243455=_0x4ca2af+_0x562b83;var _0x45f409=_0x4ca2af;while(_0x27166a[_0x45f409]&&!(_0x45f409>=_0x243455))++_0x45f409;if(_0x45f409-_0x4ca2af>0x10&&_0x27166a[_0x1aea('0x31')]&&UTF8Decoder){return UTF8Decoder[_0x1aea('0x83')](_0x27166a['subarray'](_0x4ca2af,_0x45f409));}else{var _0x16d748='';while(_0x4ca2af<_0x45f409){var _0x9819fd=_0x27166a[_0x4ca2af++];if(!(_0x9819fd&0x80)){_0x16d748+=String[_0x1aea('0x81')](_0x9819fd);continue;}var _0x52709e=_0x27166a[_0x4ca2af++]&0x3f;if((_0x9819fd&0xe0)==0xc0){_0x16d748+=String[_0x1aea('0x81')]((_0x9819fd&0x1f)<<0x6|_0x52709e);continue;}var _0x5c55dc=_0x27166a[_0x4ca2af++]&0x3f;if((_0x9819fd&0xf0)==0xe0){_0x9819fd=(_0x9819fd&0xf)<<0xc|_0x52709e<<0x6|_0x5c55dc;}else{_0x9819fd=(_0x9819fd&0x7)<<0x12|_0x52709e<<0xc|_0x5c55dc<<0x6|_0x27166a[_0x4ca2af++]&0x3f;}if(_0x9819fd<0x10000){_0x16d748+=String['fromCharCode'](_0x9819fd);}else{var _0x14c0d4=_0x9819fd-0x10000;_0x16d748+=String[_0x1aea('0x81')](0xd800|_0x14c0d4>>0xa,0xdc00|_0x14c0d4&0x3ff);}}}return _0x16d748;}function UTF8ToString(_0x3657a2,_0x11df51){return _0x3657a2?UTF8ArrayToString(HEAPU8,_0x3657a2,_0x11df51):'';}function stringToUTF8Array(_0x54074b,_0x4c0d0f,_0x499964,_0x163ad9){if(!(_0x163ad9>0x0))return 0x0;var _0x10e34d=_0x499964;var _0x579530=_0x499964+_0x163ad9-0x1;for(var _0x3e7d63=0x0;_0x3e7d63<_0x54074b[_0x1aea('0x39')];++_0x3e7d63){var _0x5a6e21=_0x54074b[_0x1aea('0x84')](_0x3e7d63);if(_0x5a6e21>=0xd800&&_0x5a6e21<=0xdfff){var _0x5885d9=_0x54074b[_0x1aea('0x84')](++_0x3e7d63);_0x5a6e21=0x10000+((_0x5a6e21&0x3ff)<<0xa)|_0x5885d9&0x3ff;}if(_0x5a6e21<=0x7f){if(_0x499964>=_0x579530)break;_0x4c0d0f[_0x499964++]=_0x5a6e21;}else if(_0x5a6e21<=0x7ff){if(_0x499964+0x1>=_0x579530)break;_0x4c0d0f[_0x499964++]=0xc0|_0x5a6e21>>0x6;_0x4c0d0f[_0x499964++]=0x80|_0x5a6e21&0x3f;}else if(_0x5a6e21<=0xffff){if(_0x499964+0x2>=_0x579530)break;_0x4c0d0f[_0x499964++]=0xe0|_0x5a6e21>>0xc;_0x4c0d0f[_0x499964++]=0x80|_0x5a6e21>>0x6&0x3f;_0x4c0d0f[_0x499964++]=0x80|_0x5a6e21&0x3f;}else{if(_0x499964+0x3>=_0x579530)break;_0x4c0d0f[_0x499964++]=0xf0|_0x5a6e21>>0x12;_0x4c0d0f[_0x499964++]=0x80|_0x5a6e21>>0xc&0x3f;_0x4c0d0f[_0x499964++]=0x80|_0x5a6e21>>0x6&0x3f;_0x4c0d0f[_0x499964++]=0x80|_0x5a6e21&0x3f;}}_0x4c0d0f[_0x499964]=0x0;return _0x499964-_0x10e34d;}function stringToUTF8(_0x119e3,_0x521318,_0x336a67){return stringToUTF8Array(_0x119e3,HEAPU8,_0x521318,_0x336a67);}function lengthBytesUTF8(_0x1fc7bf){var _0x4d7b48=0x0;for(var _0x1d8ac4=0x0;_0x1d8ac4<_0x1fc7bf['length'];++_0x1d8ac4){var _0x35b6b6=_0x1fc7bf[_0x1aea('0x84')](_0x1d8ac4);if(_0x35b6b6>=0xd800&&_0x35b6b6<=0xdfff)_0x35b6b6=0x10000+((_0x35b6b6&0x3ff)<<0xa)|_0x1fc7bf['charCodeAt'](++_0x1d8ac4)&0x3ff;if(_0x35b6b6<=0x7f)++_0x4d7b48;else if(_0x35b6b6<=0x7ff)_0x4d7b48+=0x2;else if(_0x35b6b6<=0xffff)_0x4d7b48+=0x3;else _0x4d7b48+=0x4;}return _0x4d7b48;}var UTF16Decoder=typeof TextDecoder!==_0x1aea('0x1')?new TextDecoder(_0x1aea('0x85')):undefined;function UTF16ToString(_0x417c02){var _0x5f2e70=_0x417c02;var _0x453de0=_0x5f2e70>>0x1;while(HEAP16[_0x453de0])++_0x453de0;_0x5f2e70=_0x453de0<<0x1;if(_0x5f2e70-_0x417c02>0x20&&UTF16Decoder){return UTF16Decoder['decode'](HEAPU8['subarray'](_0x417c02,_0x5f2e70));}else{var _0x1e48c8=0x0;var _0x596e34='';while(0x1){var _0x58c0a7=HEAP16[_0x417c02+_0x1e48c8*0x2>>0x1];if(_0x58c0a7==0x0)return _0x596e34;++_0x1e48c8;_0x596e34+=String[_0x1aea('0x81')](_0x58c0a7);}}}function stringToUTF16(_0x118df1,_0x1d8848,_0x2915ce){if(_0x2915ce===undefined){_0x2915ce=0x7fffffff;}if(_0x2915ce<0x2)return 0x0;_0x2915ce-=0x2;var _0x3fcd17=_0x1d8848;var _0x18b793=_0x2915ce<_0x118df1[_0x1aea('0x39')]*0x2?_0x2915ce/0x2:_0x118df1['length'];for(var _0x29eafe=0x0;_0x29eafe<_0x18b793;++_0x29eafe){var _0x484cbc=_0x118df1['charCodeAt'](_0x29eafe);HEAP16[_0x1d8848>>0x1]=_0x484cbc;_0x1d8848+=0x2;}HEAP16[_0x1d8848>>0x1]=0x0;return _0x1d8848-_0x3fcd17;}function lengthBytesUTF16(_0x32f44b){return _0x32f44b['length']*0x2;}function UTF32ToString(_0x27f576){var _0x4158ba=0x0;var _0x71000b='';while(0x1){var _0x47d004=HEAP32[_0x27f576+_0x4158ba*0x4>>0x2];if(_0x47d004==0x0)return _0x71000b;++_0x4158ba;if(_0x47d004>=0x10000){var _0x4df8e1=_0x47d004-0x10000;_0x71000b+=String[_0x1aea('0x81')](0xd800|_0x4df8e1>>0xa,0xdc00|_0x4df8e1&0x3ff);}else{_0x71000b+=String[_0x1aea('0x81')](_0x47d004);}}}function stringToUTF32(_0x2e5327,_0x4615b6,_0x4c9228){if(_0x4c9228===undefined){_0x4c9228=0x7fffffff;}if(_0x4c9228<0x4)return 0x0;var _0x3531f8=_0x4615b6;var _0x333632=_0x3531f8+_0x4c9228-0x4;for(var _0xede230=0x0;_0xede230<_0x2e5327[_0x1aea('0x39')];++_0xede230){var _0x100492=_0x2e5327[_0x1aea('0x84')](_0xede230);if(_0x100492>=0xd800&&_0x100492<=0xdfff){var _0x197b86=_0x2e5327[_0x1aea('0x84')](++_0xede230);_0x100492=0x10000+((_0x100492&0x3ff)<<0xa)|_0x197b86&0x3ff;}HEAP32[_0x4615b6>>0x2]=_0x100492;_0x4615b6+=0x4;if(_0x4615b6+0x4>_0x333632)break;}HEAP32[_0x4615b6>>0x2]=0x0;return _0x4615b6-_0x3531f8;}function lengthBytesUTF32(_0x435eba){var _0x224ed0=0x0;for(var _0x54219f=0x0;_0x54219f<_0x435eba['length'];++_0x54219f){var _0x3ccb3c=_0x435eba[_0x1aea('0x84')](_0x54219f);if(_0x3ccb3c>=0xd800&&_0x3ccb3c<=0xdfff)++_0x54219f;_0x224ed0+=0x4;}return _0x224ed0;}function allocateUTF8(_0x135776){var _0x1a630f=lengthBytesUTF8(_0x135776)+0x1;var _0x174f9a=_malloc(_0x1a630f);if(_0x174f9a)stringToUTF8Array(_0x135776,HEAP8,_0x174f9a,_0x1a630f);return _0x174f9a;}function allocateUTF8OnStack(_0xa0f86b){var _0x5161ba=lengthBytesUTF8(_0xa0f86b)+0x1;var _0x4ac80e=stackAlloc(_0x5161ba);stringToUTF8Array(_0xa0f86b,HEAP8,_0x4ac80e,_0x5161ba);return _0x4ac80e;}function writeStringToMemory(_0x19ad34,_0xf6a85e,_0x5ece32){warnOnce(_0x1aea('0x86'));var
_0x50f732,_0x35241d;if(_0x5ece32){_0x35241d=_0xf6a85e+lengthBytesUTF8(_0x19ad34);_0x50f732=HEAP8[_0x35241d];}stringToUTF8(_0x19ad34,_0xf6a85e,Infinity);if(_0x5ece32)HEAP8[_0x35241d]=_0x50f732;}function writeArrayToMemory(_0x16584c,_0x3faacf){HEAP8[_0x1aea('0x3b')](_0x16584c,_0x3faacf);}function writeAsciiToMemory(_0xbed91c,_0x1cd2a7,_0x3ae2ff){for(var _0x18dba8=0x0;_0x18dba8<_0xbed91c[_0x1aea('0x39')];++_0x18dba8){HEAP8[_0x1cd2a7++>>0x0]=_0xbed91c[_0x1aea('0x84')](_0x18dba8);}if(!_0x3ae2ff)HEAP8[_0x1cd2a7>>0x0]=0x0;}function demangle(_0x2a0a86){return _0x2a0a86;}function demangleAll(_0x3a8d9f){var _0xfa64c1=/__Z[\w\d_]+/g;return _0x3a8d9f[_0x1aea('0x52')](_0xfa64c1,function(_0x564c34){var _0x1e8c52=demangle(_0x564c34);return _0x564c34===_0x1e8c52?_0x564c34:_0x1e8c52+'\x20['+_0x564c34+']';});}function jsStackTrace(){var _0x382f2b=new Error();if(!_0x382f2b['stack']){try{throw new Error(0x0);}catch(_0xb037e4){_0x382f2b=_0xb037e4;}if(!_0x382f2b['stack']){return _0x1aea('0x87');}}return _0x382f2b['stack'][_0x1aea('0x7')]();}function stackTrace(){var _0x4d38a3=jsStackTrace();if(Module[_0x1aea('0x88')])_0x4d38a3+='\x0a'+Module[_0x1aea('0x88')]();return demangleAll(_0x4d38a3);}var PAGE_SIZE=0x4000;var WASM_PAGE_SIZE=0x10000;var ASMJS_PAGE_SIZE=0x1000000;function alignUp(_0x293c64,_0x3055fd){if(_0x293c64%_0x3055fd>0x0){_0x293c64+=_0x3055fd-_0x293c64%_0x3055fd;}return _0x293c64;}var HEAP,buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBufferViews(){Module[_0x1aea('0x89')]=HEAP8=new Int8Array(buffer);Module[_0x1aea('0x8a')]=HEAP16=new Int16Array(buffer);Module[_0x1aea('0x8b')]=HEAP32=new Int32Array(buffer);Module[_0x1aea('0x3a')]=HEAPU8=new Uint8Array(buffer);Module[_0x1aea('0x8c')]=HEAPU16=new Uint16Array(buffer);Module[_0x1aea('0x8d')]=HEAPU32=new Uint32Array(buffer);Module[_0x1aea('0x8e')]=HEAPF32=new Float32Array(buffer);Module[_0x1aea('0x8f')]=HEAPF64=new Float64Array(buffer);}var STATIC_BASE=0x400,STACK_BASE=0x8fc70,STACKTOP=STACK_BASE,STACK_MAX=0x58fc70,DYNAMIC_BASE=0x58fc70,DYNAMICTOP_PTR=0x8fc50;var TOTAL_STACK=0x500000;var INITIAL_TOTAL_MEMORY=Module[_0x1aea('0x90')]||0x8000000;if(INITIAL_TOTAL_MEMORY<TOTAL_STACK)err(_0x1aea('0x91')+INITIAL_TOTAL_MEMORY+'!\x20(TOTAL_STACK='+TOTAL_STACK+')');if(Module[_0x1aea('0x50')]){buffer=Module[_0x1aea('0x50')];}else{if(typeof WebAssembly===_0x1aea('0x49')&&typeof WebAssembly[_0x1aea('0x92')]===_0x1aea('0x4a')){wasmMemory=new WebAssembly[(_0x1aea('0x92'))]({'initial':INITIAL_TOTAL_MEMORY/WASM_PAGE_SIZE,'maximum':INITIAL_TOTAL_MEMORY/WASM_PAGE_SIZE});buffer=wasmMemory[_0x1aea('0x50')];}else{buffer=new ArrayBuffer(INITIAL_TOTAL_MEMORY);}}updateGlobalBufferViews();HEAP32[DYNAMICTOP_PTR>>0x2]=DYNAMIC_BASE;function callRuntimeCallbacks(_0x14f752){while(_0x14f752[_0x1aea('0x39')]>0x0){var _0x48329c=_0x14f752[_0x1aea('0x93')]();if(typeof _0x48329c=='function'){_0x48329c();continue;}var _0x10c334=_0x48329c[_0x1aea('0x94')];if(typeof _0x10c334===_0x1aea('0x7e')){if(_0x48329c[_0x1aea('0x95')]===undefined){Module[_0x1aea('0x96')](_0x10c334);}else{Module[_0x1aea('0x97')](_0x10c334,_0x48329c[_0x1aea('0x95')]);}}else{_0x10c334(_0x48329c[_0x1aea('0x95')]===undefined?null:_0x48329c[_0x1aea('0x95')]);}}}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATEXIT__=[];var __ATPOSTRUN__=[];var runtimeInitialized=![];var runtimeExited=![];function preRun(){if(Module[_0x1aea('0x3f')]){if(typeof Module[_0x1aea('0x3f')]=='function')Module['preRun']=[Module['preRun']];while(Module[_0x1aea('0x3f')][_0x1aea('0x39')]){addOnPreRun(Module[_0x1aea('0x3f')]['shift']());}}callRuntimeCallbacks(__ATPRERUN__);}function ensureInitRuntime(){if(runtimeInitialized)return;runtimeInitialized=!![];if(!Module['noFSInit']&&!FS[_0x1aea('0x98')][_0x1aea('0x99')])FS[_0x1aea('0x98')]();TTY[_0x1aea('0x98')]();callRuntimeCallbacks(__ATINIT__);}function preMain(){FS[_0x1aea('0x9a')]=![];callRuntimeCallbacks(__ATMAIN__);}function exitRuntime(){runtimeExited=!![];}function postRun(){if(Module[_0x1aea('0x48')]){if(typeof Module[_0x1aea('0x48')]==_0x1aea('0x4a'))Module[_0x1aea('0x48')]=[Module['postRun']];while(Module['postRun'][_0x1aea('0x39')]){addOnPostRun(Module[_0x1aea('0x48')][_0x1aea('0x93')]());}}callRuntimeCallbacks(__ATPOSTRUN__);}function addOnPreRun(_0x2aac3e){__ATPRERUN__[_0x1aea('0x9b')](_0x2aac3e);}function addOnInit(_0x1cdaf0){__ATINIT__[_0x1aea('0x9b')](_0x1cdaf0);}function addOnPreMain(_0x1035cf){__ATMAIN__[_0x1aea('0x9b')](_0x1035cf);}function addOnExit(_0x305ad9){}function addOnPostRun(_0x67afb4){__ATPOSTRUN__['unshift'](_0x67afb4);}function unSign(_0x530a19,_0x1f1e0a,_0x46c021){if(_0x530a19>=0x0){return _0x530a19;}return _0x1f1e0a<=0x20?0x2*Math['abs'](0x1<<_0x1f1e0a-0x1)+_0x530a19:Math[_0x1aea('0x9c')](0x2,_0x1f1e0a)+_0x530a19;}function reSign(_0x3bc251,_0x4211c8,_0x517f91){if(_0x3bc251<=0x0){return _0x3bc251;}var _0x493786=_0x4211c8<=0x20?Math[_0x1aea('0x9d')](0x1<<_0x4211c8-0x1):Math[_0x1aea('0x9c')](0x2,_0x4211c8-0x1);if(_0x3bc251>=_0x493786&&(_0x4211c8<=0x20||_0x3bc251>_0x493786)){_0x3bc251=-0x2*_0x493786+_0x3bc251;}return _0x3bc251;}var Math_abs=Math['abs'];var Math_cos=Math[_0x1aea('0x9e')];var Math_sin=Math[_0x1aea('0x9f')];var Math_tan=Math[_0x1aea('0xa0')];var Math_acos=Math['acos'];var Math_asin=Math[_0x1aea('0xa1')];var Math_atan=Math[_0x1aea('0xa2')];var Math_atan2=Math[_0x1aea('0xa3')];var Math_exp=Math[_0x1aea('0xa4')];var Math_log=Math[_0x1aea('0xa5')];var Math_sqrt=Math['sqrt'];var Math_ceil=Math[_0x1aea('0x18')];var Math_floor=Math['floor'];var Math_pow=Math['pow'];var Math_imul=Math[_0x1aea('0xa6')];var Math_fround=Math[_0x1aea('0xa7')];var Math_round=Math[_0x1aea('0xa8')];var Math_min=Math[_0x1aea('0xa9')];var Math_max=Math['max'];var Math_clz32=Math['clz32'];var Math_trunc=Math[_0x1aea('0xaa')];var runDependencies=0x0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function getUniqueRunDependency(_0x8519f0){return _0x8519f0;}function addRunDependency(_0xac8181){runDependencies++;if(Module[_0x1aea('0xab')]){Module['monitorRunDependencies'](runDependencies);}}function removeRunDependency(_0x186ee6){runDependencies--;if(Module['monitorRunDependencies']){Module['monitorRunDependencies'](runDependencies);}if(runDependencies==0x0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null;}if(dependenciesFulfilled){var _0xbd8ed2=dependenciesFulfilled;dependenciesFulfilled=null;_0xbd8ed2();}}}Module['preloadedImages']={};Module['preloadedAudios']={};var memoryInitializer=null;var dataURIPrefix=_0x1aea('0xac');function isDataURI(_0x3b394d){return String[_0x1aea('0x2b')][_0x1aea('0xad')]?_0x3b394d[_0x1aea('0xad')](dataURIPrefix):_0x3b394d[_0x1aea('0x5c')](dataURIPrefix)===0x0;}var wasmBinaryFile=_0x1aea('0xae');function getBinary(){try{if(Module[_0x1aea('0xaf')]){return new Uint8Array(Module[_0x1aea('0xaf')]);}if(Module['readBinary']){return Module[_0x1aea('0x4f')](wasmBinaryFile);}else{throw _0x1aea('0xb0');}}catch(_0x506524){abort(_0x506524);}}function getBinaryPromise(){if(!Module[_0x1aea('0xaf')]&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)&&typeof fetch==='function'){return fetch(VENUS_PATH+wasmBinaryFile,{'credentials':_0x1aea('0xb1')})['then'](function(_0x2c2590){if(!_0x2c2590['ok']){throw _0x1aea('0xb2')+wasmBinaryFile+'\x27';}return _0x2c2590[_0x1aea('0xb3')]();})[_0x1aea('0xb4')](function(){return getBinary();});}return new Promise(function(_0x2fb26b,_0xca697b){_0x2fb26b(getBinary());});}function createWasm(_0x37ec9d){var _0x14e0c7={'env':_0x37ec9d,'global':{'NaN':NaN,'Infinity':Infinity},'global.Math':Math,'asm2wasm':asm2wasmImports};function _0x613f67(_0xc5dbfb,_0x22148e){var _0x1882ad=_0xc5dbfb[_0x1aea('0x55')];Module['asm']=_0x1882ad;removeRunDependency(_0x1aea('0xb5'));}addRunDependency(_0x1aea('0xb5'));if(Module[_0x1aea('0xb6')]){try{return Module[_0x1aea('0xb6')](_0x14e0c7,_0x613f67);}catch(_0x53f1cc){err(_0x1aea('0xb7')+_0x53f1cc);return![];}}function _0x49f26f(_0x3dd2c9){_0x613f67(_0x3dd2c9[_0x1aea('0xb8')]);}function _0x2b85a1(_0x554cd0){getBinaryPromise()[_0x1aea('0xb9')](function(_0x362185){return WebAssembly[_0x1aea('0xba')](_0x362185,_0x14e0c7);})[_0x1aea('0xb9')](_0x554cd0,function(_0x4d78bd){err(_0x1aea('0xbb')+_0x4d78bd);abort(_0x4d78bd);});}_0x2b85a1(_0x49f26f);return{};}Module[_0x1aea('0xbc')]=function(_0x9b3482,_0x293d7,_0x2143e9){_0x293d7[_0x1aea('0xbd')]=wasmMemory;_0x293d7[_0x1aea('0xbe')]=wasmTable=new WebAssembly['Table']({'initial':0x4ec,'maximum':0x4ec,'element':_0x1aea('0xbf')});_0x293d7[_0x1aea('0xc0')]=0x400;_0x293d7['__table_base']=0x0;var _0x4f25fa=createWasm(_0x293d7);return _0x4f25fa;};var ASM_CONSTS=[];__ATINIT__[_0x1aea('0x6a')]({'func':function(){globalCtors();}});var tempDoublePtr=0x8fc60;function copyTempFloat(_0x2cc5d5){HEAP8[tempDoublePtr]=HEAP8[_0x2cc5d5];HEAP8[tempDoublePtr+0x1]=HEAP8[_0x2cc5d5+0x1];HEAP8[tempDoublePtr+0x2]=HEAP8[_0x2cc5d5+0x2];HEAP8[tempDoublePtr+0x3]=HEAP8[_0x2cc5d5+0x3];}function copyTempDouble(_0x37fd97){HEAP8[tempDoublePtr]=HEAP8[_0x37fd97];HEAP8[tempDoublePtr+0x1]=HEAP8[_0x37fd97+0x1];HEAP8[tempDoublePtr+0x2]=HEAP8[_0x37fd97+0x2];HEAP8[tempDoublePtr+0x3]=HEAP8[_0x37fd97+0x3];HEAP8[tempDoublePtr+0x4]=HEAP8[_0x37fd97+0x4];HEAP8[tempDoublePtr+0x5]=HEAP8[_0x37fd97+0x5];HEAP8[tempDoublePtr+0x6]=HEAP8[_0x37fd97+0x6];HEAP8[tempDoublePtr+0x7]=HEAP8[_0x37fd97+0x7];}var ENV={};function ___buildEnvironment(_0x53dded){var _0x1136b3=0x40;var _0xd092fd=0x400;var _0x78d7ed;var _0x38569b;if(!___buildEnvironment[_0x1aea('0xc1')]){___buildEnvironment[_0x1aea('0xc1')]=!![];ENV[_0x1aea('0xc2')]=ENV[_0x1aea('0xc3')]='web_user';ENV[_0x1aea('0xc4')]='/';ENV['PWD']='/';ENV[_0x1aea('0xc5')]=_0x1aea('0xc6');ENV[_0x1aea('0xc7')]=_0x1aea('0xc8');ENV['_']=Module[_0x1aea('0x45')];_0x78d7ed=getMemory(_0xd092fd);_0x38569b=getMemory(_0x1136b3*0x4);HEAP32[_0x38569b>>0x2]=_0x78d7ed;HEAP32[_0x53dded>>0x2]=_0x38569b;}else{_0x38569b=HEAP32[_0x53dded>>0x2];_0x78d7ed=HEAP32[_0x38569b>>0x2];}var _0xfc2494=[];var _0x5b54ff=0x0;for(var _0x12eec8 in ENV){if(typeof ENV[_0x12eec8]===_0x1aea('0x7c')){var _0x4f1994=_0x12eec8+'='+ENV[_0x12eec8];_0xfc2494['push'](_0x4f1994);_0x5b54ff+=_0x4f1994[_0x1aea('0x39')];}}if(_0x5b54ff>_0xd092fd){throw new Error(_0x1aea('0xc9'));}var _0x5867bc=0x4;for(var _0xbbe3a3=0x0;_0xbbe3a3<_0xfc2494[_0x1aea('0x39')];_0xbbe3a3++){var _0x4f1994=_0xfc2494[_0xbbe3a3];writeAsciiToMemory(_0x4f1994,_0x78d7ed);HEAP32[_0x38569b+_0xbbe3a3*_0x5867bc>>0x2]=_0x78d7ed;_0x78d7ed+=_0x4f1994[_0x1aea('0x39')]+0x1;}HEAP32[_0x38569b+_0xfc2494[_0x1aea('0x39')]*_0x5867bc>>0x2]=0x0;}function ___cxa_allocate_exception(_0x2ccf30){return _malloc(_0x2ccf30);}function __ZSt18uncaught_exceptionv(){return!!__ZSt18uncaught_exceptionv[_0x1aea('0xca')];}function ___cxa_free_exception(_0x4b8048){try{return _free(_0x4b8048);}catch(_0x5a8826){}}var EXCEPTIONS={'last':0x0,'caught':[],'infos':{},'deAdjust':function(_0x568b1f){if(!_0x568b1f||EXCEPTIONS['infos'][_0x568b1f])return _0x568b1f;for(var _0x4ae7a6 in EXCEPTIONS[_0x1aea('0xcb')]){var _0x128bc5=+_0x4ae7a6;var _0x422c44=EXCEPTIONS[_0x1aea('0xcb')][_0x128bc5][_0x1aea('0xcc')];var _0x56bde8=_0x422c44['length'];for(var _0x1412ae=0x0;_0x1412ae<_0x56bde8;_0x1412ae++){if(_0x422c44[_0x1412ae]===_0x568b1f){return _0x128bc5;}}}return _0x568b1f;},'addRef':function(_0x174826){if(!_0x174826)return;var _0x446b6c=EXCEPTIONS['infos'][_0x174826];_0x446b6c[_0x1aea('0xcd')]++;},'decRef':function(_0x8722cf){if(!_0x8722cf)return;var _0x20c6fa=EXCEPTIONS[_0x1aea('0xcb')][_0x8722cf];assert(_0x20c6fa[_0x1aea('0xcd')]>0x0);_0x20c6fa['refcount']--;if(_0x20c6fa[_0x1aea('0xcd')]===0x0&&!_0x20c6fa[_0x1aea('0xce')]){if(_0x20c6fa[_0x1aea('0xcf')]){Module[_0x1aea('0x97')](_0x20c6fa[_0x1aea('0xcf')],_0x8722cf);}delete EXCEPTIONS[_0x1aea('0xcb')][_0x8722cf];___cxa_free_exception(_0x8722cf);}},'clearRef':function(_0x4d9274){if(!_0x4d9274)return;var _0x53530f=EXCEPTIONS['infos'][_0x4d9274];_0x53530f[_0x1aea('0xcd')]=0x0;}};function ___cxa_begin_catch(_0x4a8c43){var _0x302a3f=EXCEPTIONS[_0x1aea('0xcb')][_0x4a8c43];if(_0x302a3f&&!_0x302a3f[_0x1aea('0xd0')]){_0x302a3f[_0x1aea('0xd0')]=!![];__ZSt18uncaught_exceptionv[_0x1aea('0xca')]--;}if(_0x302a3f)_0x302a3f['rethrown']=![];EXCEPTIONS[_0x1aea('0xd0')][_0x1aea('0x6a')](_0x4a8c43);EXCEPTIONS[_0x1aea('0xd1')](EXCEPTIONS[_0x1aea('0xd2')](_0x4a8c43));return _0x4a8c43;}function ___resumeException(_0x17c7ff){if(!EXCEPTIONS[_0x1aea('0xd3')]){EXCEPTIONS['last']=_0x17c7ff;}throw _0x17c7ff;}function ___cxa_find_matching_catch(){var _0x2e0ceb=EXCEPTIONS['last'];if(!_0x2e0ceb){return(setTempRet0(0x0),0x0)|0x0;}var _0x227daa=EXCEPTIONS[_0x1aea('0xcb')][_0x2e0ceb];var _0x51a64b=_0x227daa[_0x1aea('0xd4')];if(!_0x51a64b){return(setTempRet0(0x0),_0x2e0ceb)|0x0;}var _0x358291=Array[_0x1aea('0x2b')]['slice'][_0x1aea('0x71')](arguments);var _0x46ca25=Module['___cxa_is_pointer_type'](_0x51a64b);if(!___cxa_find_matching_catch[_0x1aea('0x50')])___cxa_find_matching_catch['buffer']=_malloc(0x4);HEAP32[___cxa_find_matching_catch['buffer']>>0x2]=_0x2e0ceb;_0x2e0ceb=___cxa_find_matching_catch[_0x1aea('0x50')];for(var _0x236f18=0x0;_0x236f18<_0x358291[_0x1aea('0x39')];_0x236f18++){if(_0x358291[_0x236f18]&&Module[_0x1aea('0xd5')](_0x358291[_0x236f18],_0x51a64b,_0x2e0ceb)){_0x2e0ceb=HEAP32[_0x2e0ceb>>0x2];_0x227daa[_0x1aea('0xcc')][_0x1aea('0x6a')](_0x2e0ceb);return(setTempRet0(_0x358291[_0x236f18]),_0x2e0ceb)|0x0;}}_0x2e0ceb=HEAP32[_0x2e0ceb>>0x2];return(setTempRet0(_0x51a64b),_0x2e0ceb)|0x0;}function ___cxa_throw(_0x5beb48,_0x45dadc,_0x441adf){EXCEPTIONS[_0x1aea('0xcb')][_0x5beb48]={'ptr':_0x5beb48,'adjusted':[_0x5beb48],'type':_0x45dadc,'destructor':_0x441adf,'refcount':0x0,'caught':![],'rethrown':![]};EXCEPTIONS[_0x1aea('0xd3')]=_0x5beb48;if(!(_0x1aea('0xca')in __ZSt18uncaught_exceptionv)){__ZSt18uncaught_exceptionv[_0x1aea('0xca')]=0x1;}else{__ZSt18uncaught_exceptionv[_0x1aea('0xca')]++;}throw _0x5beb48;}function ___gxx_personality_v0(){}function ___lock(){}function ___setErrNo(_0x49edbf){if(Module[_0x1aea('0xd6')])HEAP32[Module['___errno_location']()>>0x2]=_0x49edbf;return _0x49edbf;}var PATH={'splitPath':function(_0x393db3){var _0x1312d5=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;return _0x1312d5['exec'](_0x393db3)['slice'](0x1);},'normalizeArray':function(_0x39fc51,_0x25a338){var _0x22fe02=0x0;for(var _0x8ffa1=_0x39fc51[_0x1aea('0x39')]-0x1;_0x8ffa1>=0x0;_0x8ffa1--){var _0x1ffc21=_0x39fc51[_0x8ffa1];if(_0x1ffc21==='.'){_0x39fc51[_0x1aea('0xd7')](_0x8ffa1,0x1);}else if(_0x1ffc21==='..'){_0x39fc51['splice'](_0x8ffa1,0x1);_0x22fe02++;}else if(_0x22fe02){_0x39fc51[_0x1aea('0xd7')](_0x8ffa1,0x1);_0x22fe02--;}}if(_0x25a338){for(;_0x22fe02;_0x22fe02--){_0x39fc51['unshift']('..');}}return _0x39fc51;},'normalize':function(_0x980f4){var _0x33dcfc=_0x980f4[_0x1aea('0xd8')](0x0)==='/',_0x3e8944=_0x980f4[_0x1aea('0x5e')](-0x1)==='/';_0x980f4=PATH[_0x1aea('0xd9')](_0x980f4[_0x1aea('0xda')]('/')[_0x1aea('0xdb')](function(_0x167d36){return!!_0x167d36;}),!_0x33dcfc)[_0x1aea('0xdc')]('/');if(!_0x980f4&&!_0x33dcfc){_0x980f4='.';}if(_0x980f4&&_0x3e8944){_0x980f4+='/';}return(_0x33dcfc?'/':'')+_0x980f4;},'dirname':function(_0x27112e){var _0x4b75b5=PATH[_0x1aea('0xdd')](_0x27112e),_0x4335a1=_0x4b75b5[0x0],_0x3a33b6=_0x4b75b5[0x1];if(!_0x4335a1&&!_0x3a33b6){return'.';}if(_0x3a33b6){_0x3a33b6=_0x3a33b6[_0x1aea('0x5e')](0x0,_0x3a33b6[_0x1aea('0x39')]-0x1);}return _0x4335a1+_0x3a33b6;},'basename':function(_0x398fed){if(_0x398fed==='/')return'/';var _0x457fcf=_0x398fed['lastIndexOf']('/');if(_0x457fcf===-0x1)return _0x398fed;return _0x398fed['substr'](_0x457fcf+0x1);},'extname':function(_0x22b53c){return PATH[_0x1aea('0xdd')](_0x22b53c)[0x3];},'join':function(){var _0xd5affa=Array[_0x1aea('0x2b')][_0x1aea('0x54')][_0x1aea('0x71')](arguments,0x0);return PATH[_0x1aea('0x4d')](_0xd5affa[_0x1aea('0xdc')]('/'));},'join2':function(_0x57030e,_0x37e5e6){return PATH[_0x1aea('0x4d')](_0x57030e+'/'+_0x37e5e6);},'resolve':function(){var _0x1568b3='',_0x4150c4=![];for(var _0x36c3d8=arguments[_0x1aea('0x39')]-0x1;_0x36c3d8>=-0x1&&!_0x4150c4;_0x36c3d8--){var _0x13de48=_0x36c3d8>=0x0?arguments[_0x36c3d8]:FS['cwd']();if(typeof _0x13de48!=='string'){throw new TypeError(_0x1aea('0xde'));}else if(!_0x13de48){return'';}_0x1568b3=_0x13de48+'/'+_0x1568b3;_0x4150c4=_0x13de48['charAt'](0x0)==='/';}_0x1568b3=PATH[_0x1aea('0xd9')](_0x1568b3[_0x1aea('0xda')]('/')[_0x1aea('0xdb')](function(_0x408870){return!!_0x408870;}),!_0x4150c4)[_0x1aea('0xdc')]('/');return(_0x4150c4?'/':'')+_0x1568b3||'.';},'relative':function(_0x33445d,_0x2a914e){_0x33445d=PATH[_0x1aea('0xdf')](_0x33445d)[_0x1aea('0x5e')](0x1);_0x2a914e=PATH[_0x1aea('0xdf')](_0x2a914e)[_0x1aea('0x5e')](0x1);function _0x224521(_0x49533f){var _0x167d34=0x0;for(;_0x167d34<_0x49533f[_0x1aea('0x39')];_0x167d34++){if(_0x49533f[_0x167d34]!=='')break;}var _0xea16b1=_0x49533f[_0x1aea('0x39')]-0x1;for(;_0xea16b1>=0x0;_0xea16b1--){if(_0x49533f[_0xea16b1]!=='')break;}if(_0x167d34>_0xea16b1)return[];return _0x49533f[_0x1aea('0x54')](_0x167d34,_0xea16b1-_0x167d34+0x1);}var _0x2f7fe9=_0x224521(_0x33445d[_0x1aea('0xda')]('/'));var _0x2b7475=_0x224521(_0x2a914e[_0x1aea('0xda')]('/'));var _0x2738d0=Math[_0x1aea('0xa9')](_0x2f7fe9[_0x1aea('0x39')],_0x2b7475['length']);var _0x397ee8=_0x2738d0;for(var _0x3c150d=0x0;_0x3c150d<_0x2738d0;_0x3c150d++){if(_0x2f7fe9[_0x3c150d]!==_0x2b7475[_0x3c150d]){_0x397ee8=_0x3c150d;break;}}var _0x426871=[];for(var _0x3c150d=_0x397ee8;_0x3c150d<_0x2f7fe9[_0x1aea('0x39')];_0x3c150d++){_0x426871[_0x1aea('0x6a')]('..');}_0x426871=_0x426871[_0x1aea('0x6b')](_0x2b7475[_0x1aea('0x54')](_0x397ee8));return _0x426871[_0x1aea('0xdc')]('/');}};var TTY={'ttys':[],'init':function(){},'shutdown':function(){},'register':function(_0x5cf81d,_0x4cb484){TTY['ttys'][_0x5cf81d]={'input':[],'output':[],'ops':_0x4cb484};FS[_0x1aea('0xe0')](_0x5cf81d,TTY[_0x1aea('0xe1')]);},'stream_ops':{'open':function(_0xd7c564){var _0x26e5f0=TTY[_0x1aea('0xe2')][_0xd7c564[_0x1aea('0xe3')][_0x1aea('0xe4')]];if(!_0x26e5f0){throw new FS[(_0x1aea('0xe5'))](0x13);}_0xd7c564[_0x1aea('0xe6')]=_0x26e5f0;_0xd7c564['seekable']=![];},'close':function(_0x346b99){_0x346b99[_0x1aea('0xe6')]['ops'][_0x1aea('0xe7')](_0x346b99[_0x1aea('0xe6')]);},'flush':function(_0x41caf9){_0x41caf9[_0x1aea('0xe6')][_0x1aea('0xe8')]['flush'](_0x41caf9['tty']);},'read':function(_0x4edeea,_0x334f4d,_0x134e3f,_0x4cd97b,_0x3ce818){if(!_0x4edeea['tty']||!_0x4edeea[_0x1aea('0xe6')][_0x1aea('0xe8')][_0x1aea('0xe9')]){throw new FS['ErrnoError'](0x6);}var _0x2b6833=0x0;for(var _0x520cc6=0x0;_0x520cc6<_0x4cd97b;_0x520cc6++){var _0x1bf1ba;try{_0x1bf1ba=_0x4edeea['tty'][_0x1aea('0xe8')]['get_char'](_0x4edeea[_0x1aea('0xe6')]);}catch(_0x4c3100){throw new FS[(_0x1aea('0xe5'))](0x5);}if(_0x1bf1ba===undefined&&_0x2b6833===0x0){throw new FS['ErrnoError'](0xb);}if(_0x1bf1ba===null||_0x1bf1ba===undefined)break;_0x2b6833++;_0x334f4d[_0x134e3f+_0x520cc6]=_0x1bf1ba;}if(_0x2b6833){_0x4edeea[_0x1aea('0xe3')][_0x1aea('0xea')]=Date['now']();}return _0x2b6833;},'write':function(_0x3db54e,_0x207f1d,_0xfb2ed2,_0x2a13d3,_0x581325){if(!_0x3db54e[_0x1aea('0xe6')]||!_0x3db54e[_0x1aea('0xe6')]['ops'][_0x1aea('0xeb')]){throw new FS[(_0x1aea('0xe5'))](0x6);}try{for(var _0x17558c=0x0;_0x17558c<_0x2a13d3;_0x17558c++){_0x3db54e[_0x1aea('0xe6')][_0x1aea('0xe8')][_0x1aea('0xeb')](_0x3db54e[_0x1aea('0xe6')],_0x207f1d[_0xfb2ed2+_0x17558c]);}}catch(_0x325857){throw new FS['ErrnoError'](0x5);}if(_0x2a13d3){_0x3db54e[_0x1aea('0xe3')][_0x1aea('0xea')]=Date[_0x1aea('0xec')]();}return _0x17558c;}},'default_tty_ops':{'get_char':function(_0x30fc8c){if(!_0x30fc8c[_0x1aea('0xed')]['length']){var _0x25f554=null;if(ENVIRONMENT_IS_NODE){var _0x5bf5a3=0x100;var _0x44a187=new Buffer(_0x5bf5a3);var _0x146a40=0x0;var _0x21f0cd=process['platform']!=_0x1aea('0xee');var _0x2a2904=process[_0x1aea('0xef')]['fd'];if(_0x21f0cd){var _0x4faa6b=![];try{_0x2a2904=fs[_0x1aea('0xf0')](_0x1aea('0xf1'),'r');_0x4faa6b=!![];}catch(_0x562f8a){}}try{_0x146a40=fs[_0x1aea('0xf2')](_0x2a2904,_0x44a187,0x0,_0x5bf5a3,null);}catch(_0x120f88){if(_0x120f88[_0x1aea('0x7')]()[_0x1aea('0x5c')]('EOF')!=-0x1)_0x146a40=0x0;else throw _0x120f88;}if(_0x4faa6b){fs['closeSync'](_0x2a2904);}if(_0x146a40>0x0){_0x25f554=_0x44a187['slice'](0x0,_0x146a40)[_0x1aea('0x7')](_0x1aea('0xf3'));}else{_0x25f554=null;}}else if(typeof window!='undefined'&&typeof window[_0x1aea('0xf4')]==_0x1aea('0x4a')){_0x25f554=window['prompt'](_0x1aea('0xf5'));if(_0x25f554!==null){_0x25f554+='\x0a';}}else if(typeof readline==_0x1aea('0x4a')){_0x25f554=readline();if(_0x25f554!==null){_0x25f554+='\x0a';}}if(!_0x25f554){return null;}_0x30fc8c[_0x1aea('0xed')]=intArrayFromString(_0x25f554,!![]);}return _0x30fc8c[_0x1aea('0xed')][_0x1aea('0x93')]();},'put_char':function(_0x692288,_0xebc9cc){if(_0xebc9cc===null||_0xebc9cc===0xa){out(UTF8ArrayToString(_0x692288['output'],0x0));_0x692288[_0x1aea('0xf6')]=[];}else{if(_0xebc9cc!=0x0)_0x692288[_0x1aea('0xf6')][_0x1aea('0x6a')](_0xebc9cc);}},'flush':function(_0x3aed03){if(_0x3aed03[_0x1aea('0xf6')]&&_0x3aed03[_0x1aea('0xf6')][_0x1aea('0x39')]>0x0){out(UTF8ArrayToString(_0x3aed03[_0x1aea('0xf6')],0x0));_0x3aed03['output']=[];}}},'default_tty1_ops':{'put_char':function(_0x44c763,_0x3c7418){if(_0x3c7418===null||_0x3c7418===0xa){err(UTF8ArrayToString(_0x44c763[_0x1aea('0xf6')],0x0));_0x44c763[_0x1aea('0xf6')]=[];}else{if(_0x3c7418!=0x0)_0x44c763['output'][_0x1aea('0x6a')](_0x3c7418);}},'flush':function(_0x4e9ec5){if(_0x4e9ec5['output']&&_0x4e9ec5[_0x1aea('0xf6')][_0x1aea('0x39')]>0x0){err(UTF8ArrayToString(_0x4e9ec5[_0x1aea('0xf6')],0x0));_0x4e9ec5[_0x1aea('0xf6')]=[];}}}};var MEMFS={'ops_table':null,'mount':function(_0x546fb3){return MEMFS[_0x1aea('0xf7')](null,'/',0x4000|0x1ff,0x0);},'createNode':function(_0x2d8875,_0x599d5c,_0x1825b2,_0x499e70){if(FS[_0x1aea('0xf8')](_0x1825b2)||FS[_0x1aea('0xf9')](_0x1825b2)){throw new FS[(_0x1aea('0xe5'))](0x1);}if(!MEMFS[_0x1aea('0xfa')]){MEMFS['ops_table']={'dir':{'node':{'getattr':MEMFS[_0x1aea('0xfb')][_0x1aea('0xfc')],'setattr':MEMFS[_0x1aea('0xfb')][_0x1aea('0xfd')],'lookup':MEMFS[_0x1aea('0xfb')][_0x1aea('0xfe')],'mknod':MEMFS['node_ops'][_0x1aea('0xff')],'rename':MEMFS[_0x1aea('0xfb')]['rename'],'unlink':MEMFS[_0x1aea('0xfb')][_0x1aea('0x100')],'rmdir':MEMFS[_0x1aea('0xfb')]['rmdir'],'readdir':MEMFS[_0x1aea('0xfb')][_0x1aea('0x101')],'symlink':MEMFS[_0x1aea('0xfb')][_0x1aea('0x102')]},'stream':{'llseek':MEMFS[_0x1aea('0xe1')][_0x1aea('0x103')]}},'file':{'node':{'getattr':MEMFS[_0x1aea('0xfb')][_0x1aea('0xfc')],'setattr':MEMFS[_0x1aea('0xfb')]['setattr']},'stream':{'llseek':MEMFS[_0x1aea('0xe1')][_0x1aea('0x103')],'read':MEMFS['stream_ops'][_0x1aea('0x4b')],'write':MEMFS['stream_ops'][_0x1aea('0x104')],'allocate':MEMFS['stream_ops'][_0x1aea('0x105')],'mmap':MEMFS[_0x1aea('0xe1')][_0x1aea('0x106')],'msync':MEMFS[_0x1aea('0xe1')][_0x1aea('0x107')]}},'link':{'node':{'getattr':MEMFS[_0x1aea('0xfb')][_0x1aea('0xfc')],'setattr':MEMFS[_0x1aea('0xfb')][_0x1aea('0xfd')],'readlink':MEMFS[_0x1aea('0xfb')]['readlink']},'stream':{}},'chrdev':{'node':{'getattr':MEMFS[_0x1aea('0xfb')][_0x1aea('0xfc')],'setattr':MEMFS[_0x1aea('0xfb')][_0x1aea('0xfd')]},'stream':FS[_0x1aea('0x108')]}};}var _0x53f74b=FS[_0x1aea('0xf7')](_0x2d8875,_0x599d5c,_0x1825b2,_0x499e70);if(FS['isDir'](_0x53f74b[_0x1aea('0x109')])){_0x53f74b[_0x1aea('0xfb')]=MEMFS[_0x1aea('0xfa')][_0x1aea('0x10a')]['node'];_0x53f74b[_0x1aea('0xe1')]=MEMFS[_0x1aea('0xfa')][_0x1aea('0x10a')]['stream'];_0x53f74b['contents']={};}else if(FS[_0x1aea('0x10b')](_0x53f74b['mode'])){_0x53f74b[_0x1aea('0xfb')]=MEMFS[_0x1aea('0xfa')][_0x1aea('0x10c')][_0x1aea('0xe3')];_0x53f74b[_0x1aea('0xe1')]=MEMFS[_0x1aea('0xfa')][_0x1aea('0x10c')][_0x1aea('0x10d')];_0x53f74b[_0x1aea('0x10e')]=0x0;_0x53f74b['contents']=null;}else if(FS[_0x1aea('0x10f')](_0x53f74b[_0x1aea('0x109')])){_0x53f74b['node_ops']=MEMFS[_0x1aea('0xfa')]['link'][_0x1aea('0xe3')];_0x53f74b[_0x1aea('0xe1')]=MEMFS[_0x1aea('0xfa')][_0x1aea('0x110')][_0x1aea('0x10d')];}else if(FS[_0x1aea('0x111')](_0x53f74b[_0x1aea('0x109')])){_0x53f74b[_0x1aea('0xfb')]=MEMFS[_0x1aea('0xfa')][_0x1aea('0x112')]['node'];_0x53f74b[_0x1aea('0xe1')]=MEMFS['ops_table'][_0x1aea('0x112')][_0x1aea('0x10d')];}_0x53f74b['timestamp']=Date['now']();if(_0x2d8875){_0x2d8875[_0x1aea('0x113')][_0x599d5c]=_0x53f74b;}return _0x53f74b;},'getFileDataAsRegularArray':function(_0x14367d){if(_0x14367d[_0x1aea('0x113')]&&_0x14367d[_0x1aea('0x113')]['subarray']){var _0x52e141=[];for(var _0x9d7981=0x0;_0x9d7981<_0x14367d[_0x1aea('0x10e')];++_0x9d7981)_0x52e141[_0x1aea('0x6a')](_0x14367d[_0x1aea('0x113')][_0x9d7981]);return _0x52e141;}return _0x14367d[_0x1aea('0x113')];},'getFileDataAsTypedArray':function(_0x3dc982){if(!_0x3dc982[_0x1aea('0x113')])return new Uint8Array();if(_0x3dc982[_0x1aea('0x113')][_0x1aea('0x31')])return _0x3dc982['contents'][_0x1aea('0x31')](0x0,_0x3dc982[_0x1aea('0x10e')]);return new Uint8Array(_0x3dc982[_0x1aea('0x113')]);},'expandFileStorage':function(_0x2c38b2,_0x3530f9){var _0x3c89a2=_0x2c38b2[_0x1aea('0x113')]?_0x2c38b2['contents'][_0x1aea('0x39')]:0x0;if(_0x3c89a2>=_0x3530f9)return;var _0x47124f=0x400*0x400;_0x3530f9=Math[_0x1aea('0x7f')](_0x3530f9,_0x3c89a2*(_0x3c89a2<_0x47124f?0x2:1.125)|0x0);if(_0x3c89a2!=0x0)_0x3530f9=Math[_0x1aea('0x7f')](_0x3530f9,0x100);var _0x544d45=_0x2c38b2[_0x1aea('0x113')];_0x2c38b2[_0x1aea('0x113')]=new Uint8Array(_0x3530f9);if(_0x2c38b2[_0x1aea('0x10e')]>0x0)_0x2c38b2[_0x1aea('0x113')][_0x1aea('0x3b')](_0x544d45[_0x1aea('0x31')](0x0,_0x2c38b2[_0x1aea('0x10e')]),0x0);return;},'resizeFileStorage':function(_0x14ad69,_0x35d0cc){if(_0x14ad69['usedBytes']==_0x35d0cc)return;if(_0x35d0cc==0x0){_0x14ad69[_0x1aea('0x113')]=null;_0x14ad69[_0x1aea('0x10e')]=0x0;return;}if(!_0x14ad69['contents']||_0x14ad69[_0x1aea('0x113')][_0x1aea('0x31')]){var _0x25a852=_0x14ad69[_0x1aea('0x113')];_0x14ad69[_0x1aea('0x113')]=new Uint8Array(new ArrayBuffer(_0x35d0cc));if(_0x25a852){_0x14ad69[_0x1aea('0x113')][_0x1aea('0x3b')](_0x25a852[_0x1aea('0x31')](0x0,Math[_0x1aea('0xa9')](_0x35d0cc,_0x14ad69[_0x1aea('0x10e')])));}_0x14ad69['usedBytes']=_0x35d0cc;return;}if(!_0x14ad69[_0x1aea('0x113')])_0x14ad69[_0x1aea('0x113')]=[];if(_0x14ad69['contents'][_0x1aea('0x39')]>_0x35d0cc)_0x14ad69[_0x1aea('0x113')][_0x1aea('0x39')]=_0x35d0cc;else while(_0x14ad69[_0x1aea('0x113')][_0x1aea('0x39')]<_0x35d0cc)_0x14ad69['contents'][_0x1aea('0x6a')](0x0);_0x14ad69[_0x1aea('0x10e')]=_0x35d0cc;},'node_ops':{'getattr':function(_0x2baee1){var _0x40910f={};_0x40910f[_0x1aea('0x114')]=FS[_0x1aea('0x111')](_0x2baee1[_0x1aea('0x109')])?_0x2baee1['id']:0x1;_0x40910f[_0x1aea('0x115')]=_0x2baee1['id'];_0x40910f[_0x1aea('0x109')]=_0x2baee1[_0x1aea('0x109')];_0x40910f['nlink']=0x1;_0x40910f['uid']=0x0;_0x40910f[_0x1aea('0x116')]=0x0;_0x40910f[_0x1aea('0xe4')]=_0x2baee1[_0x1aea('0xe4')];if(FS[_0x1aea('0x117')](_0x2baee1[_0x1aea('0x109')])){_0x40910f[_0x1aea('0x118')]=0x1000;}else if(FS[_0x1aea('0x10b')](_0x2baee1[_0x1aea('0x109')])){_0x40910f[_0x1aea('0x118')]=_0x2baee1[_0x1aea('0x10e')];}else if(FS[_0x1aea('0x10f')](_0x2baee1[_0x1aea('0x109')])){_0x40910f[_0x1aea('0x118')]=_0x2baee1['link'][_0x1aea('0x39')];}else{_0x40910f[_0x1aea('0x118')]=0x0;}_0x40910f[_0x1aea('0x119')]=new Date(_0x2baee1[_0x1aea('0xea')]);_0x40910f[_0x1aea('0x11a')]=new Date(_0x2baee1[_0x1aea('0xea')]);_0x40910f[_0x1aea('0x11b')]=new Date(_0x2baee1['timestamp']);_0x40910f[_0x1aea('0x11c')]=0x1000;_0x40910f[_0x1aea('0x11d')]=Math[_0x1aea('0x18')](_0x40910f[_0x1aea('0x118')]/_0x40910f['blksize']);return _0x40910f;},'setattr':function(_0x2e5b6f,_0x2dc401){if(_0x2dc401[_0x1aea('0x109')]!==undefined){_0x2e5b6f[_0x1aea('0x109')]=_0x2dc401['mode'];}if(_0x2dc401[_0x1aea('0xea')]!==undefined){_0x2e5b6f[_0x1aea('0xea')]=_0x2dc401['timestamp'];}if(_0x2dc401[_0x1aea('0x118')]!==undefined){MEMFS['resizeFileStorage'](_0x2e5b6f,_0x2dc401[_0x1aea('0x118')]);}},'lookup':function(_0x4c6c6b,_0x17d77d){throw FS[_0x1aea('0x11e')][0x2];},'mknod':function(_0x49901a,_0x18df1e,_0x1b8a5b,_0x170720){return MEMFS[_0x1aea('0xf7')](_0x49901a,_0x18df1e,_0x1b8a5b,_0x170720);},'rename':function(_0x59f36c,_0x308ba5,_0x435c78){if(FS[_0x1aea('0x117')](_0x59f36c['mode'])){var _0x304df5;try{_0x304df5=FS[_0x1aea('0x11f')](_0x308ba5,_0x435c78);}catch(_0x3e8a33){}if(_0x304df5){for(var _0x34dac1 in _0x304df5[_0x1aea('0x113')]){throw new FS['ErrnoError'](0x27);}}}delete _0x59f36c['parent'][_0x1aea('0x113')][_0x59f36c[_0x1aea('0x2c')]];_0x59f36c[_0x1aea('0x2c')]=_0x435c78;_0x308ba5[_0x1aea('0x113')][_0x435c78]=_0x59f36c;_0x59f36c[_0x1aea('0x120')]=_0x308ba5;},'unlink':function(_0xc1398b,_0x260ca0){delete _0xc1398b[_0x1aea('0x113')][_0x260ca0];},'rmdir':function(_0x57ed14,_0x2c55d9){var _0x14ae95=FS[_0x1aea('0x11f')](_0x57ed14,_0x2c55d9);for(var _0xcfb2f6 in _0x14ae95[_0x1aea('0x113')]){throw new FS[(_0x1aea('0xe5'))](0x27);}delete _0x57ed14[_0x1aea('0x113')][_0x2c55d9];},'readdir':function(_0x15bb7b){var _0x3ca88a=['.','..'];for(var _0x414422 in _0x15bb7b[_0x1aea('0x113')]){if(!_0x15bb7b['contents'][_0x1aea('0x44')](_0x414422)){continue;}_0x3ca88a[_0x1aea('0x6a')](_0x414422);}return _0x3ca88a;},'symlink':function(_0x3fca38,_0x49c9e7,_0x15f25c){var _0x594659=MEMFS[_0x1aea('0xf7')](_0x3fca38,_0x49c9e7,0x1ff|0xa000,0x0);_0x594659[_0x1aea('0x110')]=_0x15f25c;return _0x594659;},'readlink':function(_0x2175fc){if(!FS[_0x1aea('0x10f')](_0x2175fc[_0x1aea('0x109')])){throw new FS[(_0x1aea('0xe5'))](0x16);}return _0x2175fc['link'];}},'stream_ops':{'read':function(_0x2fa4ed,_0xdbc0db,_0x258cce,_0x529da9,_0x487b64){var _0x572356=_0x2fa4ed['node'][_0x1aea('0x113')];if(_0x487b64>=_0x2fa4ed[_0x1aea('0xe3')]['usedBytes'])return 0x0;var _0x4e75f9=Math[_0x1aea('0xa9')](_0x2fa4ed['node']['usedBytes']-_0x487b64,_0x529da9);if(_0x4e75f9>0x8&&_0x572356['subarray']){_0xdbc0db['set'](_0x572356[_0x1aea('0x31')](_0x487b64,_0x487b64+_0x4e75f9),_0x258cce);}else{for(var _0x1a90e7=0x0;_0x1a90e7<_0x4e75f9;_0x1a90e7++)_0xdbc0db[_0x258cce+_0x1a90e7]=_0x572356[_0x487b64+_0x1a90e7];}return _0x4e75f9;},'write':function(_0x2115d5,_0x3a5ea0,_0x91736d,_0x1fb537,_0x37c048,_0x42077e){if(!_0x1fb537)return 0x0;var _0x13026b=_0x2115d5['node'];_0x13026b[_0x1aea('0xea')]=Date[_0x1aea('0xec')]();if(_0x3a5ea0[_0x1aea('0x31')]&&(!_0x13026b[_0x1aea('0x113')]||_0x13026b[_0x1aea('0x113')]['subarray'])){if(_0x42077e){_0x13026b[_0x1aea('0x113')]=_0x3a5ea0[_0x1aea('0x31')](_0x91736d,_0x91736d+_0x1fb537);_0x13026b[_0x1aea('0x10e')]=_0x1fb537;return _0x1fb537;}else if(_0x13026b[_0x1aea('0x10e')]===0x0&&_0x37c048===0x0){_0x13026b[_0x1aea('0x113')]=new Uint8Array(_0x3a5ea0[_0x1aea('0x31')](_0x91736d,_0x91736d+_0x1fb537));_0x13026b[_0x1aea('0x10e')]=_0x1fb537;return _0x1fb537;}else if(_0x37c048+_0x1fb537<=_0x13026b[_0x1aea('0x10e')]){_0x13026b[_0x1aea('0x113')][_0x1aea('0x3b')](_0x3a5ea0[_0x1aea('0x31')](_0x91736d,_0x91736d+_0x1fb537),_0x37c048);return _0x1fb537;}}MEMFS['expandFileStorage'](_0x13026b,_0x37c048+_0x1fb537);if(_0x13026b[_0x1aea('0x113')][_0x1aea('0x31')]&&_0x3a5ea0[_0x1aea('0x31')])_0x13026b[_0x1aea('0x113')]['set'](_0x3a5ea0[_0x1aea('0x31')](_0x91736d,_0x91736d+_0x1fb537),_0x37c048);else{for(var _0x56422a=0x0;_0x56422a<_0x1fb537;_0x56422a++){_0x13026b['contents'][_0x37c048+_0x56422a]=_0x3a5ea0[_0x91736d+_0x56422a];}}_0x13026b[_0x1aea('0x10e')]=Math['max'](_0x13026b[_0x1aea('0x10e')],_0x37c048+_0x1fb537);return _0x1fb537;},'llseek':function(_0x4a9e97,_0x58b9bf,_0x56b5f2){var _0x42a2ae=_0x58b9bf;if(_0x56b5f2===0x1){_0x42a2ae+=_0x4a9e97['position'];}else if(_0x56b5f2===0x2){if(FS[_0x1aea('0x10b')](_0x4a9e97['node'][_0x1aea('0x109')])){_0x42a2ae+=_0x4a9e97[_0x1aea('0xe3')][_0x1aea('0x10e')];}}if(_0x42a2ae<0x0){throw new FS[(_0x1aea('0xe5'))](0x16);}return _0x42a2ae;},'allocate':function(_0x40f086,_0x598fde,_0x221130){MEMFS['expandFileStorage'](_0x40f086[_0x1aea('0xe3')],_0x598fde+_0x221130);_0x40f086[_0x1aea('0xe3')][_0x1aea('0x10e')]=Math[_0x1aea('0x7f')](_0x40f086[_0x1aea('0xe3')][_0x1aea('0x10e')],_0x598fde+_0x221130);},'mmap':function(_0x5d54f8,_0x365a82,_0x3e4f6c,_0x5a2f01,_0x5cc9cd,_0x26a6cf,_0x3a10c4){if(!FS[_0x1aea('0x10b')](_0x5d54f8['node'][_0x1aea('0x109')])){throw new FS['ErrnoError'](0x13);}var _0x2f6dc4;var _0x4ec6fa;var _0x3acc66=_0x5d54f8[_0x1aea('0xe3')][_0x1aea('0x113')];if(!(_0x3a10c4&0x2)&&(_0x3acc66[_0x1aea('0x50')]===_0x365a82||_0x3acc66['buffer']===_0x365a82[_0x1aea('0x50')])){_0x4ec6fa=![];_0x2f6dc4=_0x3acc66[_0x1aea('0x121')];}else{if(_0x5cc9cd>0x0||_0x5cc9cd+_0x5a2f01<_0x5d54f8[_0x1aea('0xe3')][_0x1aea('0x10e')]){if(_0x3acc66[_0x1aea('0x31')]){_0x3acc66=_0x3acc66['subarray'](_0x5cc9cd,_0x5cc9cd+_0x5a2f01);}else{_0x3acc66=Array[_0x1aea('0x2b')][_0x1aea('0x54')][_0x1aea('0x71')](_0x3acc66,_0x5cc9cd,_0x5cc9cd+_0x5a2f01);}}_0x4ec6fa=!![];_0x2f6dc4=_malloc(_0x5a2f01);if(!_0x2f6dc4){throw new FS[(_0x1aea('0xe5'))](0xc);}_0x365a82[_0x1aea('0x3b')](_0x3acc66,_0x2f6dc4);}return{'ptr':_0x2f6dc4,'allocated':_0x4ec6fa};},'msync':function(_0x105386,_0x150c7f,_0x3f1a98,_0x4bf335,_0x508b32){if(!FS['isFile'](_0x105386[_0x1aea('0xe3')][_0x1aea('0x109')])){throw new FS[(_0x1aea('0xe5'))](0x13);}if(_0x508b32&0x2){return 0x0;}var _0x25e93c=MEMFS[_0x1aea('0xe1')][_0x1aea('0x104')](_0x105386,_0x150c7f,0x0,_0x4bf335,_0x3f1a98,![]);return 0x0;}}};var IDBFS={'dbs':{},'indexedDB':function(){if(typeof indexedDB!==_0x1aea('0x1'))return indexedDB;var _0x595878=null;if(typeof window===_0x1aea('0x49'))_0x595878=window[_0x1aea('0x122')]||window['mozIndexedDB']||window[_0x1aea('0x123')]||window[_0x1aea('0x124')];assert(_0x595878,_0x1aea('0x125'));return _0x595878;},'DB_VERSION':0x15,'DB_STORE_NAME':'FILE_DATA','mount':function(_0x235b7e){return MEMFS[_0x1aea('0x126')][_0x1aea('0x72')](null,arguments);},'syncfs':function(_0x5d8240,_0x51eb11,_0xff3acc){IDBFS['getLocalSet'](_0x5d8240,function(_0x301f03,_0x4a339f){if(_0x301f03)return _0xff3acc(_0x301f03);IDBFS[_0x1aea('0x127')](_0x5d8240,function(_0x48bbbd,_0x37413a){if(_0x48bbbd)return _0xff3acc(_0x48bbbd);var _0x2c2fc0=_0x51eb11?_0x37413a:_0x4a339f;var _0x14b294=_0x51eb11?_0x4a339f:_0x37413a;IDBFS[_0x1aea('0x128')](_0x2c2fc0,_0x14b294,_0xff3acc);});});},'getDB':function(_0x2c6562,_0xaeee97){var _0x36ea12=IDBFS['dbs'][_0x2c6562];if(_0x36ea12){return _0xaeee97(null,_0x36ea12);}var _0x52573a;try{_0x52573a=IDBFS['indexedDB']()[_0x1aea('0xf')](_0x2c6562,IDBFS[_0x1aea('0x129')]);}catch(_0x2702a9){return _0xaeee97(_0x2702a9);}if(!_0x52573a){return _0xaeee97(_0x1aea('0x12a'));}_0x52573a[_0x1aea('0x12b')]=function(_0xef2977){var _0x36ea12=_0xef2977['target'][_0x1aea('0x12c')];var _0x2566f7=_0xef2977[_0x1aea('0x12d')][_0x1aea('0x12e')];var _0x5bb0da;if(_0x36ea12['objectStoreNames'][_0x1aea('0x12f')](IDBFS[_0x1aea('0x130')])){_0x5bb0da=_0x2566f7['objectStore'](IDBFS[_0x1aea('0x130')]);}else{_0x5bb0da=_0x36ea12[_0x1aea('0x131')](IDBFS[_0x1aea('0x130')]);}if(!_0x5bb0da[_0x1aea('0x132')][_0x1aea('0x12f')]('timestamp')){_0x5bb0da['createIndex'](_0x1aea('0xea'),_0x1aea('0xea'),{'unique':![]});}};_0x52573a['onsuccess']=function(){_0x36ea12=_0x52573a[_0x1aea('0x12c')];IDBFS[_0x1aea('0x133')][_0x2c6562]=_0x36ea12;_0xaeee97(null,_0x36ea12);};_0x52573a[_0x1aea('0x1c')]=function(_0x5dea96){_0xaeee97(this[_0x1aea('0x24')]);_0x5dea96[_0x1aea('0x134')]();};},'getLocalSet':function(_0x55eb81,_0x4a6b80){var _0xd1d889={};function _0x44ee2d(_0xfce505){return _0xfce505!=='.'&&_0xfce505!=='..';};function _0x4b43e4(_0x4119dd){return function(_0x13fde6){return PATH[_0x1aea('0x135')](_0x4119dd,_0x13fde6);};};var _0x327a7e=FS[_0x1aea('0x101')](_0x55eb81['mountpoint'])[_0x1aea('0xdb')](_0x44ee2d)[_0x1aea('0x136')](_0x4b43e4(_0x55eb81[_0x1aea('0x137')]));while(_0x327a7e[_0x1aea('0x39')]){var _0x3141f0=_0x327a7e[_0x1aea('0x138')]();var _0x1776ff;try{_0x1776ff=FS[_0x1aea('0x139')](_0x3141f0);}catch(_0x5092d1){return _0x4a6b80(_0x5092d1);}if(FS[_0x1aea('0x117')](_0x1776ff['mode'])){_0x327a7e[_0x1aea('0x6a')][_0x1aea('0x72')](_0x327a7e,FS[_0x1aea('0x101')](_0x3141f0)[_0x1aea('0xdb')](_0x44ee2d)[_0x1aea('0x136')](_0x4b43e4(_0x3141f0)));}_0xd1d889[_0x3141f0]={'timestamp':_0x1776ff[_0x1aea('0x11a')]};}return _0x4a6b80(null,{'type':_0x1aea('0x13a'),'entries':_0xd1d889});},'getRemoteSet':function(_0x4458b2,_0xbf9852){var _0x47ee44={};IDBFS[_0x1aea('0x13b')](_0x4458b2[_0x1aea('0x137')],function(_0x48921b,_0x13a6b0){if(_0x48921b)return _0xbf9852(_0x48921b);try{var _0x85e9f1=_0x13a6b0[_0x1aea('0x12e')]([IDBFS[_0x1aea('0x130')]],_0x1aea('0x13c'));_0x85e9f1[_0x1aea('0x1c')]=function(_0x242637){_0xbf9852(this[_0x1aea('0x24')]);_0x242637['preventDefault']();};var _0x5b1541=_0x85e9f1['objectStore'](IDBFS['DB_STORE_NAME']);var _0x187887=_0x5b1541[_0x1aea('0x13d')](_0x1aea('0xea'));_0x187887[_0x1aea('0x13e')]()[_0x1aea('0x13f')]=function(_0x46a7c8){var _0x25d62c=_0x46a7c8[_0x1aea('0x12d')][_0x1aea('0x12c')];if(!_0x25d62c){return _0xbf9852(null,{'type':_0x1aea('0x140'),'db':_0x13a6b0,'entries':_0x47ee44});}_0x47ee44[_0x25d62c[_0x1aea('0x141')]]={'timestamp':_0x25d62c[_0x1aea('0x142')]};_0x25d62c[_0x1aea('0x143')]();};}catch(_0x422d04){return _0xbf9852(_0x422d04);}});},'loadLocalEntry':function(_0x300fa8,_0x350622){var _0xa4b982,_0x5bf058;try{var _0x13d27b=FS[_0x1aea('0x144')](_0x300fa8);_0x5bf058=_0x13d27b['node'];_0xa4b982=FS[_0x1aea('0x139')](_0x300fa8);}catch(_0x408e75){return _0x350622(_0x408e75);}if(FS[_0x1aea('0x117')](_0xa4b982[_0x1aea('0x109')])){return _0x350622(null,{'timestamp':_0xa4b982[_0x1aea('0x11a')],'mode':_0xa4b982[_0x1aea('0x109')]});}else if(FS[_0x1aea('0x10b')](_0xa4b982[_0x1aea('0x109')])){_0x5bf058['contents']=MEMFS[_0x1aea('0x145')](_0x5bf058);return _0x350622(null,{'timestamp':_0xa4b982[_0x1aea('0x11a')],'mode':_0xa4b982[_0x1aea('0x109')],'contents':_0x5bf058['contents']});}else{return _0x350622(new Error('node\x20type\x20not\x20supported'));}},'storeLocalEntry':function(_0x553bc8,_0x3ced61,_0x188bf8){try{if(FS[_0x1aea('0x117')](_0x3ced61[_0x1aea('0x109')])){FS[_0x1aea('0x146')](_0x553bc8,_0x3ced61[_0x1aea('0x109')]);}else if(FS[_0x1aea('0x10b')](_0x3ced61[_0x1aea('0x109')])){FS[_0x1aea('0x147')](_0x553bc8,_0x3ced61[_0x1aea('0x113')],{'canOwn':!![]});}else{return _0x188bf8(new Error(_0x1aea('0x148')));}FS[_0x1aea('0x149')](_0x553bc8,_0x3ced61[_0x1aea('0x109')]);FS['utime'](_0x553bc8,_0x3ced61['timestamp'],_0x3ced61[_0x1aea('0xea')]);}catch(_0xf4582){return _0x188bf8(_0xf4582);}_0x188bf8(null);},'removeLocalEntry':function(_0x27acf7,_0x2b1551){try{var _0x3133ec=FS[_0x1aea('0x144')](_0x27acf7);var _0x5bc3cb=FS['stat'](_0x27acf7);if(FS[_0x1aea('0x117')](_0x5bc3cb[_0x1aea('0x109')])){FS[_0x1aea('0x14a')](_0x27acf7);}else if(FS[_0x1aea('0x10b')](_0x5bc3cb['mode'])){FS['unlink'](_0x27acf7);}}catch(_0x3da434){return _0x2b1551(_0x3da434);}_0x2b1551(null);},'loadRemoteEntry':function(_0x435497,_0x4d9e2d,_0x46bf59){var _0x5f32f6=_0x435497[_0x1aea('0x14b')](_0x4d9e2d);_0x5f32f6[_0x1aea('0x13f')]=function(_0x57a4c7){_0x46bf59(null,_0x57a4c7[_0x1aea('0x12d')]['result']);};_0x5f32f6[_0x1aea('0x1c')]=function(_0x100c60){_0x46bf59(this[_0x1aea('0x24')]);_0x100c60[_0x1aea('0x134')]();};},'storeRemoteEntry':function(_0x476fb7,_0x361ba3,_0x1359e4,_0x5ecac2){var _0x5e10b8=_0x476fb7[_0x1aea('0x14c')](_0x1359e4,_0x361ba3);_0x5e10b8[_0x1aea('0x13f')]=function(){_0x5ecac2(null);};_0x5e10b8[_0x1aea('0x1c')]=function(_0x4d877b){_0x5ecac2(this[_0x1aea('0x24')]);_0x4d877b[_0x1aea('0x134')]();};},'removeRemoteEntry':function(_0x2931bc,_0x3313cc,_0x3ede88){var _0x28b1e4=_0x2931bc[_0x1aea('0x14d')](_0x3313cc);_0x28b1e4['onsuccess']=function(){_0x3ede88(null);};_0x28b1e4['onerror']=function(_0x3229a7){_0x3ede88(this[_0x1aea('0x24')]);_0x3229a7[_0x1aea('0x134')]();};},'reconcile':function(_0x8919be,_0x48030f,_0x3de937){var _0x1c3b46=0x0;var _0x3fd642=[];Object[_0x1aea('0x14e')](_0x8919be['entries'])[_0x1aea('0x14f')](function(_0x5e85b4){var _0x3dde44=_0x8919be[_0x1aea('0x150')][_0x5e85b4];var _0x236843=_0x48030f[_0x1aea('0x150')][_0x5e85b4];if(!_0x236843||_0x3dde44[_0x1aea('0xea')]>_0x236843[_0x1aea('0xea')]){_0x3fd642[_0x1aea('0x6a')](_0x5e85b4);_0x1c3b46++;}});var _0x41fe43=[];Object[_0x1aea('0x14e')](_0x48030f['entries'])[_0x1aea('0x14f')](function(_0x1aee19){var _0x5c85be=_0x48030f[_0x1aea('0x150')][_0x1aee19];var _0x28fe28=_0x8919be['entries'][_0x1aee19];if(!_0x28fe28){_0x41fe43[_0x1aea('0x6a')](_0x1aee19);_0x1c3b46++;}});if(!_0x1c3b46){return _0x3de937(null);}var _0x125d31=![];var _0x48d3df=0x0;var _0x23c0cd=_0x8919be['type']===_0x1aea('0x140')?_0x8919be['db']:_0x48030f['db'];var _0x4985fc=_0x23c0cd[_0x1aea('0x12e')]([IDBFS['DB_STORE_NAME']],_0x1aea('0x151'));var _0x59c57b=_0x4985fc[_0x1aea('0x152')](IDBFS[_0x1aea('0x130')]);function _0x3930fd(_0x44cd71){if(_0x44cd71){if(!_0x3930fd[_0x1aea('0x153')]){_0x3930fd[_0x1aea('0x153')]=!![];return _0x3de937(_0x44cd71);}return;}if(++_0x48d3df>=_0x1c3b46){return _0x3de937(null);}};_0x4985fc[_0x1aea('0x1c')]=function(_0x3b527d){_0x3930fd(this[_0x1aea('0x24')]);_0x3b527d[_0x1aea('0x134')]();};_0x3fd642[_0x1aea('0x154')]()['forEach'](function(_0x3dab50){if(_0x48030f[_0x1aea('0xd4')]===_0x1aea('0x13a')){IDBFS[_0x1aea('0x155')](_0x59c57b,_0x3dab50,function(_0x2a4dfd,_0x32a789){if(_0x2a4dfd)return _0x3930fd(_0x2a4dfd);IDBFS[_0x1aea('0x156')](_0x3dab50,_0x32a789,_0x3930fd);});}else{IDBFS[_0x1aea('0x157')](_0x3dab50,function(_0x4eabe6,_0x28b329){if(_0x4eabe6)return _0x3930fd(_0x4eabe6);IDBFS[_0x1aea('0x158')](_0x59c57b,_0x3dab50,_0x28b329,_0x3930fd);});}});_0x41fe43[_0x1aea('0x154')]()[_0x1aea('0x159')]()[_0x1aea('0x14f')](function(_0x4d6d62){if(_0x48030f[_0x1aea('0xd4')]===_0x1aea('0x13a')){IDBFS[_0x1aea('0x15a')](_0x4d6d62,_0x3930fd);}else{IDBFS[_0x1aea('0x15b')](_0x59c57b,_0x4d6d62,_0x3930fd);}});}};var NODEFS={'isWindows':![],'staticInit':function(){NODEFS[_0x1aea('0x15c')]=!!process[_0x1aea('0x15d')][_0x1aea('0x15e')](/^win/);var _0x1be8d6=process['binding'](_0x1aea('0x15f'));if(_0x1be8d6['fs']){_0x1be8d6=_0x1be8d6['fs'];}NODEFS[_0x1aea('0x160')]={'1024':_0x1be8d6[_0x1aea('0x161')],'64':_0x1be8d6[_0x1aea('0x162')],'128':_0x1be8d6[_0x1aea('0x163')],'0':_0x1be8d6[_0x1aea('0x164')],'2':_0x1be8d6[_0x1aea('0x165')],'4096':_0x1be8d6[_0x1aea('0x166')],'512':_0x1be8d6['O_TRUNC'],'1':_0x1be8d6[_0x1aea('0x167')]};},'bufferFrom':function(_0x2686e6){return Buffer['alloc']?Buffer[_0x1aea('0x168')](_0x2686e6):new Buffer(_0x2686e6);},'mount':function(_0x1368a0){assert(ENVIRONMENT_IS_NODE);return NODEFS[_0x1aea('0xf7')](null,'/',NODEFS['getMode'](_0x1368a0[_0x1aea('0x169')][_0x1aea('0x16a')]),0x0);},'createNode':function(_0x410a04,_0x1d655e,_0x28abc4,_0x4021ac){if(!FS[_0x1aea('0x117')](_0x28abc4)&&!FS[_0x1aea('0x10b')](_0x28abc4)&&!FS[_0x1aea('0x10f')](_0x28abc4)){throw new FS[(_0x1aea('0xe5'))](0x16);}var _0x540f1b=FS[_0x1aea('0xf7')](_0x410a04,_0x1d655e,_0x28abc4);_0x540f1b[_0x1aea('0xfb')]=NODEFS[_0x1aea('0xfb')];_0x540f1b[_0x1aea('0xe1')]=NODEFS[_0x1aea('0xe1')];return _0x540f1b;},'getMode':function(_0x501dab){var _0x369633;try{_0x369633=fs[_0x1aea('0x16b')](_0x501dab);if(NODEFS[_0x1aea('0x15c')]){_0x369633['mode']=_0x369633[_0x1aea('0x109')]|(_0x369633['mode']&0x124)>>0x2;}}catch(_0x3d9a6b){if(!_0x3d9a6b['code'])throw _0x3d9a6b;throw new FS[(_0x1aea('0xe5'))](-_0x3d9a6b['errno']);}return _0x369633[_0x1aea('0x109')];},'realPath':function(_0x4ec08e){var _0x4f008d=[];while(_0x4ec08e[_0x1aea('0x120')]!==_0x4ec08e){_0x4f008d[_0x1aea('0x6a')](_0x4ec08e['name']);_0x4ec08e=_0x4ec08e[_0x1aea('0x120')];}_0x4f008d[_0x1aea('0x6a')](_0x4ec08e[_0x1aea('0x126')][_0x1aea('0x169')][_0x1aea('0x16a')]);_0x4f008d[_0x1aea('0x159')]();return PATH[_0x1aea('0xdc')]['apply'](null,_0x4f008d);},'flagsForNode':function(_0x56934c){_0x56934c&=~0x200000;_0x56934c&=~0x800;_0x56934c&=~0x8000;_0x56934c&=~0x80000;var _0x188dc0=0x0;for(var _0x1779ff in NODEFS[_0x1aea('0x160')]){if(_0x56934c&_0x1779ff){_0x188dc0|=NODEFS[_0x1aea('0x160')][_0x1779ff];_0x56934c^=_0x1779ff;}}if(!_0x56934c){return _0x188dc0;}else{throw new FS[(_0x1aea('0xe5'))](0x16);}},'node_ops':{'getattr':function(_0x59fd7d){var _0x2cb392=NODEFS[_0x1aea('0x16c')](_0x59fd7d);var _0x105ef5;try{_0x105ef5=fs[_0x1aea('0x16b')](_0x2cb392);}catch(_0x52c3ff){if(!_0x52c3ff[_0x1aea('0x16d')])throw _0x52c3ff;throw new FS[(_0x1aea('0xe5'))](-_0x52c3ff[_0x1aea('0x16e')]);}if(NODEFS[_0x1aea('0x15c')]&&!_0x105ef5[_0x1aea('0x11c')]){_0x105ef5[_0x1aea('0x11c')]=0x1000;}if(NODEFS['isWindows']&&!_0x105ef5[_0x1aea('0x11d')]){_0x105ef5[_0x1aea('0x11d')]=(_0x105ef5[_0x1aea('0x118')]+_0x105ef5[_0x1aea('0x11c')]-0x1)/_0x105ef5[_0x1aea('0x11c')]|0x0;}return{'dev':_0x105ef5[_0x1aea('0x114')],'ino':_0x105ef5[_0x1aea('0x115')],'mode':_0x105ef5['mode'],'nlink':_0x105ef5[_0x1aea('0x16f')],'uid':_0x105ef5[_0x1aea('0x170')],'gid':_0x105ef5[_0x1aea('0x116')],'rdev':_0x105ef5[_0x1aea('0xe4')],'size':_0x105ef5[_0x1aea('0x118')],'atime':_0x105ef5[_0x1aea('0x119')],'mtime':_0x105ef5[_0x1aea('0x11a')],'ctime':_0x105ef5[_0x1aea('0x11b')],'blksize':_0x105ef5[_0x1aea('0x11c')],'blocks':_0x105ef5['blocks']};},'setattr':function(_0x1528f4,_0x3ae5df){var _0x40f977=NODEFS[_0x1aea('0x16c')](_0x1528f4);try{if(_0x3ae5df[_0x1aea('0x109')]!==undefined){fs['chmodSync'](_0x40f977,_0x3ae5df['mode']);_0x1528f4[_0x1aea('0x109')]=_0x3ae5df[_0x1aea('0x109')];}if(_0x3ae5df['timestamp']!==undefined){var _0x34c2e9=new Date(_0x3ae5df[_0x1aea('0xea')]);fs[_0x1aea('0x171')](_0x40f977,_0x34c2e9,_0x34c2e9);}if(_0x3ae5df[_0x1aea('0x118')]!==undefined){fs[_0x1aea('0x172')](_0x40f977,_0x3ae5df['size']);}}catch(_0x14cfa8){if(!_0x14cfa8[_0x1aea('0x16d')])throw _0x14cfa8;throw new FS[(_0x1aea('0xe5'))](-_0x14cfa8[_0x1aea('0x16e')]);}},'lookup':function(_0x2ee08c,_0x3c6e75){var _0xe42b59=PATH[_0x1aea('0x135')](NODEFS[_0x1aea('0x16c')](_0x2ee08c),_0x3c6e75);var _0x4a70d4=NODEFS[_0x1aea('0x173')](_0xe42b59);return NODEFS[_0x1aea('0xf7')](_0x2ee08c,_0x3c6e75,_0x4a70d4);},'mknod':function(_0x1a3a9b,_0x3b2d0f,_0x29ecc7,_0x54b829){var _0x5ee0de=NODEFS[_0x1aea('0xf7')](_0x1a3a9b,_0x3b2d0f,_0x29ecc7,_0x54b829);var _0x5b37ed=NODEFS[_0x1aea('0x16c')](_0x5ee0de);try{if(FS[_0x1aea('0x117')](_0x5ee0de[_0x1aea('0x109')])){fs['mkdirSync'](_0x5b37ed,_0x5ee0de['mode']);}else{fs[_0x1aea('0x174')](_0x5b37ed,'',{'mode':_0x5ee0de[_0x1aea('0x109')]});}}catch(_0xc71852){if(!_0xc71852[_0x1aea('0x16d')])throw _0xc71852;throw new FS[(_0x1aea('0xe5'))](-_0xc71852[_0x1aea('0x16e')]);}return _0x5ee0de;},'rename':function(_0x50b56a,_0x4070a5,_0x67932c){var _0x5a4ef0=NODEFS[_0x1aea('0x16c')](_0x50b56a);var _0x252e3d=PATH[_0x1aea('0x135')](NODEFS[_0x1aea('0x16c')](_0x4070a5),_0x67932c);try{fs[_0x1aea('0x175')](_0x5a4ef0,_0x252e3d);}catch(_0x42a7b3){if(!_0x42a7b3['code'])throw _0x42a7b3;throw new FS[(_0x1aea('0xe5'))](-_0x42a7b3[_0x1aea('0x16e')]);}},'unlink':function(_0x4df0bf,_0x511c67){var _0x3ef3b4=PATH[_0x1aea('0x135')](NODEFS[_0x1aea('0x16c')](_0x4df0bf),_0x511c67);try{fs[_0x1aea('0x176')](_0x3ef3b4);}catch(_0x1c6604){if(!_0x1c6604[_0x1aea('0x16d')])throw _0x1c6604;throw new FS[(_0x1aea('0xe5'))](-_0x1c6604['errno']);}},'rmdir':function(_0x2520a3,_0x3ed514){var _0x15e4db=PATH['join2'](NODEFS[_0x1aea('0x16c')](_0x2520a3),_0x3ed514);try{fs[_0x1aea('0x177')](_0x15e4db);}catch(_0x4af661){if(!_0x4af661[_0x1aea('0x16d')])throw _0x4af661;throw new FS[(_0x1aea('0xe5'))](-_0x4af661[_0x1aea('0x16e')]);}},'readdir':function(_0xb47fbf){var _0x4ea801=NODEFS[_0x1aea('0x16c')](_0xb47fbf);try{return fs[_0x1aea('0x178')](_0x4ea801);}catch(_0x4621ff){if(!_0x4621ff['code'])throw _0x4621ff;throw new FS[(_0x1aea('0xe5'))](-_0x4621ff[_0x1aea('0x16e')]);}},'symlink':function(_0x49ff4b,_0x167361,_0x5ae08d){var _0x5bf949=PATH[_0x1aea('0x135')](NODEFS[_0x1aea('0x16c')](_0x49ff4b),_0x167361);try{fs[_0x1aea('0x179')](_0x5ae08d,_0x5bf949);}catch(_0x29c553){if(!_0x29c553[_0x1aea('0x16d')])throw _0x29c553;throw new FS[(_0x1aea('0xe5'))](-_0x29c553['errno']);}},'readlink':function(_0x34a862){var _0x29efcb=NODEFS[_0x1aea('0x16c')](_0x34a862);try{_0x29efcb=fs[_0x1aea('0x17a')](_0x29efcb);_0x29efcb=NODEJS_PATH[_0x1aea('0x17b')](NODEJS_PATH[_0x1aea('0xdf')](_0x34a862[_0x1aea('0x126')]['opts'][_0x1aea('0x16a')]),_0x29efcb);return _0x29efcb;}catch(_0x3ca38b){if(!_0x3ca38b[_0x1aea('0x16d')])throw _0x3ca38b;throw new FS[(_0x1aea('0xe5'))](-_0x3ca38b['errno']);}}},'stream_ops':{'open':function(_0x41345c){var _0x2464e5=NODEFS['realPath'](_0x41345c[_0x1aea('0xe3')]);try{if(FS[_0x1aea('0x10b')](_0x41345c[_0x1aea('0xe3')][_0x1aea('0x109')])){_0x41345c[_0x1aea('0x17c')]=fs[_0x1aea('0xf0')](_0x2464e5,NODEFS[_0x1aea('0x17d')](_0x41345c[_0x1aea('0x17e')]));}}catch(_0xd04e4){if(!_0xd04e4['code'])throw _0xd04e4;throw new FS[(_0x1aea('0xe5'))](-_0xd04e4[_0x1aea('0x16e')]);}},'close':function(_0x42a7e4){try{if(FS[_0x1aea('0x10b')](_0x42a7e4[_0x1aea('0xe3')][_0x1aea('0x109')])&&_0x42a7e4['nfd']){fs[_0x1aea('0x17f')](_0x42a7e4[_0x1aea('0x17c')]);}}catch(_0x1a7cd1){if(!_0x1a7cd1[_0x1aea('0x16d')])throw _0x1a7cd1;throw new FS[(_0x1aea('0xe5'))](-_0x1a7cd1['errno']);}},'read':function(_0x385f06,_0x4575b9,_0x57984e,_0xb32582,_0xc06eed){if(_0xb32582===0x0)return 0x0;try{return fs[_0x1aea('0xf2')](_0x385f06[_0x1aea('0x17c')],NODEFS[_0x1aea('0x180')](_0x4575b9['buffer']),_0x57984e,_0xb32582,_0xc06eed);}catch(_0x3c9aee){throw new FS['ErrnoError'](-_0x3c9aee[_0x1aea('0x16e')]);}},'write':function(_0x3d522f,_0x6605d4,_0x183a07,_0x3292df,_0x1e4837){try{return fs[_0x1aea('0x181')](_0x3d522f['nfd'],NODEFS[_0x1aea('0x180')](_0x6605d4['buffer']),_0x183a07,_0x3292df,_0x1e4837);}catch(_0x2565c2){throw new FS[(_0x1aea('0xe5'))](-_0x2565c2[_0x1aea('0x16e')]);}},'llseek':function(_0x2b46c6,_0x4cabd3,_0x17a74){var _0x12d14a=_0x4cabd3;if(_0x17a74===0x1){_0x12d14a+=_0x2b46c6[_0x1aea('0x182')];}else if(_0x17a74===0x2){if(FS[_0x1aea('0x10b')](_0x2b46c6[_0x1aea('0xe3')][_0x1aea('0x109')])){try{var _0x16afe1=fs[_0x1aea('0x183')](_0x2b46c6[_0x1aea('0x17c')]);_0x12d14a+=_0x16afe1[_0x1aea('0x118')];}catch(_0x241371){throw new FS[(_0x1aea('0xe5'))](-_0x241371[_0x1aea('0x16e')]);}}}if(_0x12d14a<0x0){throw new FS[(_0x1aea('0xe5'))](0x16);}return _0x12d14a;}}};var WORKERFS={'DIR_MODE':0x41ff,'FILE_MODE':0x81ff,'reader':null,'mount':function(_0x372251){assert(ENVIRONMENT_IS_WORKER);if(!WORKERFS[_0x1aea('0x184')])WORKERFS[_0x1aea('0x184')]=new FileReaderSync();var _0x5625bb=WORKERFS[_0x1aea('0xf7')](null,'/',WORKERFS[_0x1aea('0x185')],0x0);var _0x1d3f4b={};function _0x5f0cc7(_0x530997){var _0x17171f=_0x530997[_0x1aea('0xda')]('/');var _0x20a43e=_0x5625bb;for(var _0x40f173=0x0;_0x40f173<_0x17171f['length']-0x1;_0x40f173++){var _0x1118ac=_0x17171f[_0x1aea('0x54')](0x0,_0x40f173+0x1)[_0x1aea('0xdc')]('/');if(!_0x1d3f4b[_0x1118ac]){_0x1d3f4b[_0x1118ac]=WORKERFS[_0x1aea('0xf7')](_0x20a43e,_0x17171f[_0x40f173],WORKERFS[_0x1aea('0x185')],0x0);}_0x20a43e=_0x1d3f4b[_0x1118ac];}return _0x20a43e;}function _0x388e21(_0x8c73b0){var _0x593b12=_0x8c73b0[_0x1aea('0xda')]('/');return _0x593b12[_0x593b12[_0x1aea('0x39')]-0x1];}Array['prototype'][_0x1aea('0x14f')][_0x1aea('0x71')](_0x372251[_0x1aea('0x169')][_0x1aea('0x35')]||[],function(_0x7d0f74){WORKERFS[_0x1aea('0xf7')](_0x5f0cc7(_0x7d0f74['name']),_0x388e21(_0x7d0f74[_0x1aea('0x2c')]),WORKERFS[_0x1aea('0x186')],0x0,_0x7d0f74,_0x7d0f74[_0x1aea('0x187')]);});(_0x372251[_0x1aea('0x169')][_0x1aea('0x188')]||[])[_0x1aea('0x14f')](function(_0x38060f){WORKERFS[_0x1aea('0xf7')](_0x5f0cc7(_0x38060f['name']),_0x388e21(_0x38060f[_0x1aea('0x2c')]),WORKERFS[_0x1aea('0x186')],0x0,_0x38060f[_0x1aea('0x189')]);});(_0x372251[_0x1aea('0x169')][_0x1aea('0x18a')]||[])[_0x1aea('0x14f')](function(_0x5b84d0){_0x5b84d0[_0x1aea('0x18b')]['files'][_0x1aea('0x14f')](function(_0x1a4abc){var _0x27b4d7=_0x1a4abc[_0x1aea('0x36')][_0x1aea('0x5e')](0x1);WORKERFS[_0x1aea('0xf7')](_0x5f0cc7(_0x27b4d7),_0x388e21(_0x27b4d7),WORKERFS[_0x1aea('0x186')],0x0,_0x5b84d0[_0x1aea('0x18c')]['slice'](_0x1a4abc[_0x1aea('0x28')],_0x1a4abc['end']));});});return _0x5625bb;},'createNode':function(_0x503216,_0x369905,_0x5beaba,_0x41b6e4,_0x351265,_0x16f794){var _0x734bff=FS['createNode'](_0x503216,_0x369905,_0x5beaba);_0x734bff[_0x1aea('0x109')]=_0x5beaba;_0x734bff[_0x1aea('0xfb')]=WORKERFS[_0x1aea('0xfb')];_0x734bff[_0x1aea('0xe1')]=WORKERFS[_0x1aea('0xe1')];_0x734bff[_0x1aea('0xea')]=(_0x16f794||new Date())['getTime']();assert(WORKERFS[_0x1aea('0x186')]!==WORKERFS['DIR_MODE']);if(_0x5beaba===WORKERFS[_0x1aea('0x186')]){_0x734bff[_0x1aea('0x118')]=_0x351265[_0x1aea('0x118')];_0x734bff[_0x1aea('0x113')]=_0x351265;}else{_0x734bff[_0x1aea('0x118')]=0x1000;_0x734bff[_0x1aea('0x113')]={};}if(_0x503216){_0x503216[_0x1aea('0x113')][_0x369905]=_0x734bff;}return _0x734bff;},'node_ops':{'getattr':function(_0x2008fc){return{'dev':0x1,'ino':undefined,'mode':_0x2008fc[_0x1aea('0x109')],'nlink':0x1,'uid':0x0,'gid':0x0,'rdev':undefined,'size':_0x2008fc[_0x1aea('0x118')],'atime':new Date(_0x2008fc['timestamp']),'mtime':new Date(_0x2008fc['timestamp']),'ctime':new Date(_0x2008fc[_0x1aea('0xea')]),'blksize':0x1000,'blocks':Math[_0x1aea('0x18')](_0x2008fc[_0x1aea('0x118')]/0x1000)};},'setattr':function(_0x1bd6b1,_0x4111ea){if(_0x4111ea['mode']!==undefined){_0x1bd6b1[_0x1aea('0x109')]=_0x4111ea[_0x1aea('0x109')];}if(_0x4111ea[_0x1aea('0xea')]!==undefined){_0x1bd6b1[_0x1aea('0xea')]=_0x4111ea[_0x1aea('0xea')];}},'lookup':function(_0xe37679,_0xd68178){throw new FS[(_0x1aea('0xe5'))](0x2);},'mknod':function(_0xd87c65,_0x3db26f,_0x34597e,_0x5ec775){throw new FS[(_0x1aea('0xe5'))](0x1);},'rename':function(_0x544012,_0x326df3,_0x4b2142){throw new FS['ErrnoError'](0x1);},'unlink':function(_0x2fc4a0,_0x455d11){throw new FS[(_0x1aea('0xe5'))](0x1);},'rmdir':function(_0x141718,_0x8569a5){throw new FS[(_0x1aea('0xe5'))](0x1);},'readdir':function(_0x1b95d9){var _0x35fa3a=['.','..'];for(var _0x1169cd in _0x1b95d9[_0x1aea('0x113')]){if(!_0x1b95d9[_0x1aea('0x113')]['hasOwnProperty'](_0x1169cd)){continue;}_0x35fa3a['push'](_0x1169cd);}return _0x35fa3a;},'symlink':function(_0x1bef51,_0x173400,_0x2585fe){throw new FS[(_0x1aea('0xe5'))](0x1);},'readlink':function(_0x4f73c6){throw new FS[(_0x1aea('0xe5'))](0x1);}},'stream_ops':{'read':function(_0x17b7c6,_0x4b5b2d,_0x524b03,_0x239bf6,_0x109fe2){if(_0x109fe2>=_0x17b7c6[_0x1aea('0xe3')][_0x1aea('0x118')])return 0x0;var _0x531aa2=_0x17b7c6['node']['contents'][_0x1aea('0x54')](_0x109fe2,_0x109fe2+_0x239bf6);var _0x59ea71=WORKERFS[_0x1aea('0x184')][_0x1aea('0x18d')](_0x531aa2);_0x4b5b2d[_0x1aea('0x3b')](new Uint8Array(_0x59ea71),_0x524b03);return _0x531aa2[_0x1aea('0x118')];},'write':function(_0x4b0384,_0x4478d0,_0x2c49d8,_0x3550fa,_0x475ace){throw new FS[(_0x1aea('0xe5'))](0x5);},'llseek':function(_0xc1702,_0x3c0375,_0x515bb3){var _0x242589=_0x3c0375;if(_0x515bb3===0x1){_0x242589+=_0xc1702[_0x1aea('0x182')];}else if(_0x515bb3===0x2){if(FS[_0x1aea('0x10b')](_0xc1702[_0x1aea('0xe3')][_0x1aea('0x109')])){_0x242589+=_0xc1702[_0x1aea('0xe3')][_0x1aea('0x118')];}}if(_0x242589<0x0){throw new FS[(_0x1aea('0xe5'))](0x16);}return _0x242589;}}};var FS={'root':null,'mounts':[],'devices':{},'streams':[],'nextInode':0x1,'nameTable':null,'currentPath':'/','initialized':![],'ignorePermissions':!![],'trackingDelegate':{},'tracking':{'openFlags':{'READ':0x1,'WRITE':0x2}},'ErrnoError':null,'genericErrors':{},'filesystems':null,'syncFSRequests':0x0,'handleFSError':function(_0x25f54c){if(!(_0x25f54c instanceof FS[_0x1aea('0xe5')]))throw _0x25f54c+_0x1aea('0x21')+stackTrace();return ___setErrNo(_0x25f54c['errno']);},'lookupPath':function(_0x186e24,_0x182266){_0x186e24=PATH[_0x1aea('0xdf')](FS['cwd'](),_0x186e24);_0x182266=_0x182266||{};if(!_0x186e24)return{'path':'','node':null};var _0x593dd9={'follow_mount':!![],'recurse_count':0x0};for(var _0x261219 in _0x593dd9){if(_0x182266[_0x261219]===undefined){_0x182266[_0x261219]=_0x593dd9[_0x261219];}}if(_0x182266[_0x1aea('0x18e')]>0x8){throw new FS[(_0x1aea('0xe5'))](0x28);}var _0x51145e=PATH[_0x1aea('0xd9')](_0x186e24['split']('/')[_0x1aea('0xdb')](function(_0x3dcad8){return!!_0x3dcad8;}),![]);var _0x5712ae=FS[_0x1aea('0x16a')];var _0x52c316='/';for(var _0x9bb783=0x0;_0x9bb783<_0x51145e[_0x1aea('0x39')];_0x9bb783++){var _0x567a7b=_0x9bb783===_0x51145e[_0x1aea('0x39')]-0x1;if(_0x567a7b&&_0x182266[_0x1aea('0x120')]){break;}_0x5712ae=FS[_0x1aea('0x11f')](_0x5712ae,_0x51145e[_0x9bb783]);_0x52c316=PATH['join2'](_0x52c316,_0x51145e[_0x9bb783]);if(FS[_0x1aea('0x18f')](_0x5712ae)){if(!_0x567a7b||_0x567a7b&&_0x182266[_0x1aea('0x190')]){_0x5712ae=_0x5712ae[_0x1aea('0x191')][_0x1aea('0x16a')];}}if(!_0x567a7b||_0x182266['follow']){var _0x93e81f=0x0;while(FS[_0x1aea('0x10f')](_0x5712ae[_0x1aea('0x109')])){var _0x4a561e=FS['readlink'](_0x52c316);_0x52c316=PATH['resolve'](PATH[_0x1aea('0x192')](_0x52c316),_0x4a561e);var _0x5cc649=FS[_0x1aea('0x144')](_0x52c316,{'recurse_count':_0x182266['recurse_count']});_0x5712ae=_0x5cc649['node'];if(_0x93e81f++>0x28){throw new FS[(_0x1aea('0xe5'))](0x28);}}}}return{'path':_0x52c316,'node':_0x5712ae};},'getPath':function(_0xf73144){var _0x11191c;while(!![]){if(FS['isRoot'](_0xf73144)){var _0x42189f=_0xf73144[_0x1aea('0x126')]['mountpoint'];if(!_0x11191c)return _0x42189f;return _0x42189f[_0x42189f[_0x1aea('0x39')]-0x1]!=='/'?_0x42189f+'/'+_0x11191c:_0x42189f+_0x11191c;}_0x11191c=_0x11191c?_0xf73144[_0x1aea('0x2c')]+'/'+_0x11191c:_0xf73144[_0x1aea('0x2c')];_0xf73144=_0xf73144[_0x1aea('0x120')];}},'hashName':function(_0x2240cf,_0x4bf4af){var _0x4396b1=0x0;for(var _0x2ebbb2=0x0;_0x2ebbb2<_0x4bf4af[_0x1aea('0x39')];_0x2ebbb2++){_0x4396b1=(_0x4396b1<<0x5)-_0x4396b1+_0x4bf4af[_0x1aea('0x84')](_0x2ebbb2)|0x0;}return(_0x2240cf+_0x4396b1>>>0x0)%FS[_0x1aea('0x193')][_0x1aea('0x39')];},'hashAddNode':function(_0x4b1b7a){var _0x67b554=FS['hashName'](_0x4b1b7a[_0x1aea('0x120')]['id'],_0x4b1b7a[_0x1aea('0x2c')]);_0x4b1b7a['name_next']=FS[_0x1aea('0x193')][_0x67b554];FS['nameTable'][_0x67b554]=_0x4b1b7a;},'hashRemoveNode':function(_0x443497){var _0x39b0c2=FS['hashName'](_0x443497[_0x1aea('0x120')]['id'],_0x443497['name']);if(FS[_0x1aea('0x193')][_0x39b0c2]===_0x443497){FS[_0x1aea('0x193')][_0x39b0c2]=_0x443497[_0x1aea('0x194')];}else{var _0x3d7db6=FS[_0x1aea('0x193')][_0x39b0c2];while(_0x3d7db6){if(_0x3d7db6[_0x1aea('0x194')]===_0x443497){_0x3d7db6[_0x1aea('0x194')]=_0x443497[_0x1aea('0x194')];break;}_0x3d7db6=_0x3d7db6[_0x1aea('0x194')];}}},'lookupNode':function(_0x164b1b,_0x3a5810){var _0x5c8e79=FS[_0x1aea('0x195')](_0x164b1b);if(_0x5c8e79){throw new FS[(_0x1aea('0xe5'))](_0x5c8e79,_0x164b1b);}var _0x20fbae=FS[_0x1aea('0x196')](_0x164b1b['id'],_0x3a5810);for(var _0x3ba48f=FS['nameTable'][_0x20fbae];_0x3ba48f;_0x3ba48f=_0x3ba48f[_0x1aea('0x194')]){var _0x4a53c5=_0x3ba48f[_0x1aea('0x2c')];if(_0x3ba48f[_0x1aea('0x120')]['id']===_0x164b1b['id']&&_0x4a53c5===_0x3a5810){return _0x3ba48f;}}return FS[_0x1aea('0xfe')](_0x164b1b,_0x3a5810);},'createNode':function(_0x22d2c2,_0xfb771e,_0x5a5129,_0x51bd1a){if(!FS[_0x1aea('0x197')]){FS[_0x1aea('0x197')]=function(_0x126015,_0x1f3c8b,_0x1f3b79,_0x5f0074){if(!_0x126015){_0x126015=this;}this[_0x1aea('0x120')]=_0x126015;this['mount']=_0x126015[_0x1aea('0x126')];this[_0x1aea('0x191')]=null;this['id']=FS[_0x1aea('0x198')]++;this[_0x1aea('0x2c')]=_0x1f3c8b;this[_0x1aea('0x109')]=_0x1f3b79;this['node_ops']={};this['stream_ops']={};this[_0x1aea('0xe4')]=_0x5f0074;};FS[_0x1aea('0x197')][_0x1aea('0x2b')]={};var _0x39a7f5=0x124|0x49;var _0x44c4d0=0x92;Object['defineProperties'](FS[_0x1aea('0x197')][_0x1aea('0x2b')],{'read':{'get':function(){return(this['mode']&_0x39a7f5)===_0x39a7f5;},'set':function(_0x39dc1a){_0x39dc1a?this['mode']|=_0x39a7f5:this[_0x1aea('0x109')]&=~_0x39a7f5;}},'write':{'get':function(){return(this[_0x1aea('0x109')]&_0x44c4d0)===_0x44c4d0;},'set':function(_0xda782b){_0xda782b?this['mode']|=_0x44c4d0:this[_0x1aea('0x109')]&=~_0x44c4d0;}},'isFolder':{'get':function(){return FS[_0x1aea('0x117')](this[_0x1aea('0x109')]);}},'isDevice':{'get':function(){return FS[_0x1aea('0x111')](this[_0x1aea('0x109')]);}}});}var _0x177ee9=new FS[(_0x1aea('0x197'))](_0x22d2c2,_0xfb771e,_0x5a5129,_0x51bd1a);FS['hashAddNode'](_0x177ee9);return _0x177ee9;},'destroyNode':function(_0x26f9cd){FS[_0x1aea('0x199')](_0x26f9cd);},'isRoot':function(_0x5e39af){return _0x5e39af===_0x5e39af[_0x1aea('0x120')];},'isMountpoint':function(_0x399c2d){return!!_0x399c2d[_0x1aea('0x191')];},'isFile':function(_0x2eb140){return(_0x2eb140&0xf000)===0x8000;},'isDir':function(_0x34df68){return(_0x34df68&0xf000)===0x4000;},'isLink':function(_0x5acc46){return(_0x5acc46&0xf000)===0xa000;},'isChrdev':function(_0x455f67){return(_0x455f67&0xf000)===0x2000;},'isBlkdev':function(_0x28ec05){return(_0x28ec05&0xf000)===0x6000;},'isFIFO':function(_0x766732){return(_0x766732&0xf000)===0x1000;},'isSocket':function(_0x586c3a){return(_0x586c3a&0xc000)===0xc000;},'flagModes':{'r':0x0,'rs':0x101000,'r+':0x2,'w':0x241,'wx':0x2c1,'xw':0x2c1,'w+':0x242,'wx+':0x2c2,'xw+':0x2c2,'a':0x441,'ax':0x4c1,'xa':0x4c1,'a+':0x442,'ax+':0x4c2,'xa+':0x4c2},'modeStringToFlags':function(_0x4ea0d7){var _0x2b61a8=FS[_0x1aea('0x19a')][_0x4ea0d7];if(typeof _0x2b61a8===_0x1aea('0x1')){throw new Error(_0x1aea('0x19b')+_0x4ea0d7);}return _0x2b61a8;},'flagsToPermissionString':function(_0x20f0b0){var _0x226128=['r','w','rw'][_0x20f0b0&0x3];if(_0x20f0b0&0x200){_0x226128+='w';}return _0x226128;},'nodePermissions':function(_0x217bfd,_0x101e57){if(FS[_0x1aea('0x9a')]){return 0x0;}if(_0x101e57[_0x1aea('0x5c')]('r')!==-0x1&&!(_0x217bfd[_0x1aea('0x109')]&0x124)){return 0xd;}else if(_0x101e57[_0x1aea('0x5c')]('w')!==-0x1&&!(_0x217bfd[_0x1aea('0x109')]&0x92)){return 0xd;}else if(_0x101e57[_0x1aea('0x5c')]('x')!==-0x1&&!(_0x217bfd['mode']&0x49)){return 0xd;}return 0x0;},'mayLookup':function(_0x4af10a){var _0x38c8ab=FS[_0x1aea('0x19c')](_0x4af10a,'x');if(_0x38c8ab)return _0x38c8ab;if(!_0x4af10a[_0x1aea('0xfb')][_0x1aea('0xfe')])return 0xd;return 0x0;},'mayCreate':function(_0x5bde6b,_0x292f4a){try{var _0x338d33=FS[_0x1aea('0x11f')](_0x5bde6b,_0x292f4a);return 0x11;}catch(_0x386ac1){}return FS[_0x1aea('0x19c')](_0x5bde6b,'wx');},'mayDelete':function(_0x296ad2,_0x2566db,_0x4b1803){var _0x579017;try{_0x579017=FS[_0x1aea('0x11f')](_0x296ad2,_0x2566db);}catch(_0x242287){return _0x242287[_0x1aea('0x16e')];}var _0x3aa189=FS[_0x1aea('0x19c')](_0x296ad2,'wx');if(_0x3aa189){return _0x3aa189;}if(_0x4b1803){if(!FS[_0x1aea('0x117')](_0x579017[_0x1aea('0x109')])){return 0x14;}if(FS[_0x1aea('0x19d')](_0x579017)||FS[_0x1aea('0x19e')](_0x579017)===FS['cwd']()){return 0x10;}}else{if(FS['isDir'](_0x579017['mode'])){return 0x15;}}return 0x0;},'mayOpen':function(_0x10f6cb,_0x4ce29b){if(!_0x10f6cb){return 0x2;}if(FS[_0x1aea('0x10f')](_0x10f6cb[_0x1aea('0x109')])){return 0x28;}else if(FS[_0x1aea('0x117')](_0x10f6cb[_0x1aea('0x109')])){if(FS[_0x1aea('0x19f')](_0x4ce29b)!=='r'||_0x4ce29b&0x200){return 0x15;}}return FS[_0x1aea('0x19c')](_0x10f6cb,FS[_0x1aea('0x19f')](_0x4ce29b));},'MAX_OPEN_FDS':0x1000,'nextfd':function(_0x350bd4,_0x190cf6){_0x350bd4=_0x350bd4||0x0;_0x190cf6=_0x190cf6||FS[_0x1aea('0x1a0')];for(var _0x71eaf9=_0x350bd4;_0x71eaf9<=_0x190cf6;_0x71eaf9++){if(!FS['streams'][_0x71eaf9]){return _0x71eaf9;}}throw new FS[(_0x1aea('0xe5'))](0x18);},'getStream':function(_0x561b6){return FS[_0x1aea('0x1a1')][_0x561b6];},'createStream':function(_0x5569b0,_0x469efb,_0xde877f){if(!FS[_0x1aea('0x1a2')]){FS[_0x1aea('0x1a2')]=function(){};FS['FSStream']['prototype']={};Object[_0x1aea('0x1a3')](FS[_0x1aea('0x1a2')][_0x1aea('0x2b')],{'object':{'get':function(){return this[_0x1aea('0xe3')];},'set':function(_0x8c590f){this[_0x1aea('0xe3')]=_0x8c590f;}},'isRead':{'get':function(){return(this[_0x1aea('0x17e')]&0x200003)!==0x1;}},'isWrite':{'get':function(){return(this['flags']&0x200003)!==0x0;}},'isAppend':{'get':function(){return this[_0x1aea('0x17e')]&0x400;}}});}var _0x58dde0=new FS[(_0x1aea('0x1a2'))]();for(var _0x22239b in _0x5569b0){_0x58dde0[_0x22239b]=_0x5569b0[_0x22239b];}_0x5569b0=_0x58dde0;var _0x358fc7=FS[_0x1aea('0x1a4')](_0x469efb,_0xde877f);_0x5569b0['fd']=_0x358fc7;FS[_0x1aea('0x1a1')][_0x358fc7]=_0x5569b0;return _0x5569b0;},'closeStream':function(_0x5673ba){FS['streams'][_0x5673ba]=null;},'chrdev_stream_ops':{'open':function(_0x24aeb4){var _0x766073=FS[_0x1aea('0x1a5')](_0x24aeb4[_0x1aea('0xe3')][_0x1aea('0xe4')]);_0x24aeb4[_0x1aea('0xe1')]=_0x766073[_0x1aea('0xe1')];if(_0x24aeb4[_0x1aea('0xe1')][_0x1aea('0xf')]){_0x24aeb4[_0x1aea('0xe1')][_0x1aea('0xf')](_0x24aeb4);}},'llseek':function(){throw new FS['ErrnoError'](0x1d);}},'major':function(_0x2e9ba0){return _0x2e9ba0>>0x8;},'minor':function(_0x3aaafb){return _0x3aaafb&0xff;},'makedev':function(_0x5a2c02,_0x29bd10){return _0x5a2c02<<0x8|_0x29bd10;},'registerDevice':function(_0x586603,_0x57cfc9){FS[_0x1aea('0x1a6')][_0x586603]={'stream_ops':_0x57cfc9};},'getDevice':function(_0xc3d7d4){return FS[_0x1aea('0x1a6')][_0xc3d7d4];},'getMounts':function(_0x13ff9d){var _0xacdd30=[];var _0x5e7696=[_0x13ff9d];while(_0x5e7696[_0x1aea('0x39')]){var _0xfac44c=_0x5e7696[_0x1aea('0x138')]();_0xacdd30[_0x1aea('0x6a')](_0xfac44c);_0x5e7696['push'][_0x1aea('0x72')](_0x5e7696,_0xfac44c[_0x1aea('0x1a7')]);}return _0xacdd30;},'syncfs':function(_0x4440db,_0x58e653){if(typeof _0x4440db===_0x1aea('0x4a')){_0x58e653=_0x4440db;_0x4440db=![];}FS[_0x1aea('0x1a8')]++;if(FS[_0x1aea('0x1a8')]>0x1){console['log']('warning:\x20'+FS[_0x1aea('0x1a8')]+_0x1aea('0x1a9'));}var _0x566534=FS[_0x1aea('0x1aa')](FS[_0x1aea('0x16a')][_0x1aea('0x126')]);var _0x5113e4=0x0;function _0x366912(_0x206f67){FS[_0x1aea('0x1a8')]--;return _0x58e653(_0x206f67);}function _0x24c5f8(_0x216c65){if(_0x216c65){if(!_0x24c5f8[_0x1aea('0x153')]){_0x24c5f8[_0x1aea('0x153')]=!![];return _0x366912(_0x216c65);}return;}if(++_0x5113e4>=_0x566534[_0x1aea('0x39')]){_0x366912(null);}};_0x566534[_0x1aea('0x14f')](function(_0x4fb42e){if(!_0x4fb42e[_0x1aea('0xd4')][_0x1aea('0x1ab')]){return _0x24c5f8(null);}_0x4fb42e[_0x1aea('0xd4')][_0x1aea('0x1ab')](_0x4fb42e,_0x4440db,_0x24c5f8);});},'mount':function(_0x185c79,_0x44d04b,_0x31397b){var _0x51e390=_0x31397b==='/';var _0x45adb5=!_0x31397b;var _0x1a8754;if(_0x51e390&&FS['root']){throw new FS[(_0x1aea('0xe5'))](0x10);}else if(!_0x51e390&&!_0x45adb5){var _0x4847fd=FS[_0x1aea('0x144')](_0x31397b,{'follow_mount':![]});_0x31397b=_0x4847fd[_0x1aea('0x4c')];_0x1a8754=_0x4847fd[_0x1aea('0xe3')];if(FS[_0x1aea('0x18f')](_0x1a8754)){throw new FS[(_0x1aea('0xe5'))](0x10);}if(!FS['isDir'](_0x1a8754[_0x1aea('0x109')])){throw new FS[(_0x1aea('0xe5'))](0x14);}}var _0x4f7ea5={'type':_0x185c79,'opts':_0x44d04b,'mountpoint':_0x31397b,'mounts':[]};var _0x1a0655=_0x185c79[_0x1aea('0x126')](_0x4f7ea5);_0x1a0655[_0x1aea('0x126')]=_0x4f7ea5;_0x4f7ea5[_0x1aea('0x16a')]=_0x1a0655;if(_0x51e390){FS[_0x1aea('0x16a')]=_0x1a0655;}else if(_0x1a8754){_0x1a8754[_0x1aea('0x191')]=_0x4f7ea5;if(_0x1a8754['mount']){_0x1a8754[_0x1aea('0x126')][_0x1aea('0x1a7')][_0x1aea('0x6a')](_0x4f7ea5);}}return _0x1a0655;},'unmount':function(_0x42e138){var _0x4b047c=FS['lookupPath'](_0x42e138,{'follow_mount':![]});if(!FS['isMountpoint'](_0x4b047c[_0x1aea('0xe3')])){throw new FS['ErrnoError'](0x16);}var _0x1d1dfb=_0x4b047c[_0x1aea('0xe3')];var _0x4512f6=_0x1d1dfb[_0x1aea('0x191')];var _0x427d7a=FS[_0x1aea('0x1aa')](_0x4512f6);Object[_0x1aea('0x14e')](FS[_0x1aea('0x193')])[_0x1aea('0x14f')](function(_0x13bd7b){var _0x2d5f2c=FS[_0x1aea('0x193')][_0x13bd7b];while(_0x2d5f2c){var _0x41639e=_0x2d5f2c[_0x1aea('0x194')];if(_0x427d7a[_0x1aea('0x5c')](_0x2d5f2c[_0x1aea('0x126')])!==-0x1){FS['destroyNode'](_0x2d5f2c);}_0x2d5f2c=_0x41639e;}});_0x1d1dfb['mounted']=null;var _0x535917=_0x1d1dfb[_0x1aea('0x126')][_0x1aea('0x1a7')][_0x1aea('0x5c')](_0x4512f6);_0x1d1dfb[_0x1aea('0x126')][_0x1aea('0x1a7')][_0x1aea('0xd7')](_0x535917,0x1);},'lookup':function(_0x2e2098,_0x9d9ed8){return _0x2e2098[_0x1aea('0xfb')][_0x1aea('0xfe')](_0x2e2098,_0x9d9ed8);},'mknod':function(_0x50e07b,_0x819482,_0x48af01){var _0x427008=FS[_0x1aea('0x144')](_0x50e07b,{'parent':!![]});var _0x2c6c96=_0x427008[_0x1aea('0xe3')];var _0x2ff32a=PATH[_0x1aea('0x1ac')](_0x50e07b);if(!_0x2ff32a||_0x2ff32a==='.'||_0x2ff32a==='..'){throw new FS[(_0x1aea('0xe5'))](0x16);}var _0x2ffa91=FS[_0x1aea('0x1ad')](_0x2c6c96,_0x2ff32a);if(_0x2ffa91){throw new FS[(_0x1aea('0xe5'))](_0x2ffa91);}if(!_0x2c6c96[_0x1aea('0xfb')][_0x1aea('0xff')]){throw new FS[(_0x1aea('0xe5'))](0x1);}return _0x2c6c96[_0x1aea('0xfb')][_0x1aea('0xff')](_0x2c6c96,_0x2ff32a,_0x819482,_0x48af01);},'create':function(_0x2d5914,_0x47ac80){_0x47ac80=_0x47ac80!==undefined?_0x47ac80:0x1b6;_0x47ac80&=0xfff;_0x47ac80|=0x8000;return FS[_0x1aea('0xff')](_0x2d5914,_0x47ac80,0x0);},'mkdir':function(_0x2fab86,_0x21293a){_0x21293a=_0x21293a!==undefined?_0x21293a:0x1ff;_0x21293a&=0x1ff|0x200;_0x21293a|=0x4000;return FS[_0x1aea('0xff')](_0x2fab86,_0x21293a,0x0);},'mkdirTree':function(_0x355012,_0xb7cf8d){var _0x277723=_0x355012[_0x1aea('0xda')]('/');var _0x5cb3c9='';for(var _0x45d4bd=0x0;_0x45d4bd<_0x277723[_0x1aea('0x39')];++_0x45d4bd){if(!_0x277723[_0x45d4bd])continue;_0x5cb3c9+='/'+_0x277723[_0x45d4bd];try{FS[_0x1aea('0x146')](_0x5cb3c9,_0xb7cf8d);}catch(_0xe3c708){if(_0xe3c708[_0x1aea('0x16e')]!=0x11)throw _0xe3c708;}}},'mkdev':function(_0x3c6d0a,_0x68aff6,_0x3a79d4){if(typeof _0x3a79d4===_0x1aea('0x1')){_0x3a79d4=_0x68aff6;_0x68aff6=0x1b6;}_0x68aff6|=0x2000;return FS[_0x1aea('0xff')](_0x3c6d0a,_0x68aff6,_0x3a79d4);},'symlink':function(_0x460fa6,_0x48b5fa){if(!PATH[_0x1aea('0xdf')](_0x460fa6)){throw new FS[(_0x1aea('0xe5'))](0x2);}var _0x4ae0c2=FS[_0x1aea('0x144')](_0x48b5fa,{'parent':!![]});var _0x586c6a=_0x4ae0c2[_0x1aea('0xe3')];if(!_0x586c6a){throw new FS[(_0x1aea('0xe5'))](0x2);}var _0x1e1fb8=PATH[_0x1aea('0x1ac')](_0x48b5fa);var _0x45648e=FS[_0x1aea('0x1ad')](_0x586c6a,_0x1e1fb8);if(_0x45648e){throw new FS['ErrnoError'](_0x45648e);}if(!_0x586c6a[_0x1aea('0xfb')][_0x1aea('0x102')]){throw new FS[(_0x1aea('0xe5'))](0x1);}return _0x586c6a[_0x1aea('0xfb')]['symlink'](_0x586c6a,_0x1e1fb8,_0x460fa6);},'rename':function(_0x4b893c,_0x41d3c0){var _0x286248=PATH['dirname'](_0x4b893c);var _0x3271d8=PATH[_0x1aea('0x192')](_0x41d3c0);var _0x40a004=PATH[_0x1aea('0x1ac')](_0x4b893c);var _0x51ec21=PATH[_0x1aea('0x1ac')](_0x41d3c0);var _0x1ead77,_0x7b5e2f,_0x568941;try{_0x1ead77=FS[_0x1aea('0x144')](_0x4b893c,{'parent':!![]});_0x7b5e2f=_0x1ead77[_0x1aea('0xe3')];_0x1ead77=FS[_0x1aea('0x144')](_0x41d3c0,{'parent':!![]});_0x568941=_0x1ead77['node'];}catch(_0x17e16e){throw new FS[(_0x1aea('0xe5'))](0x10);}if(!_0x7b5e2f||!_0x568941)throw new FS[(_0x1aea('0xe5'))](0x2);if(_0x7b5e2f[_0x1aea('0x126')]!==_0x568941[_0x1aea('0x126')]){throw new FS['ErrnoError'](0x12);}var _0x29290f=FS[_0x1aea('0x11f')](_0x7b5e2f,_0x40a004);var _0x4c9ad8=PATH[_0x1aea('0x17b')](_0x4b893c,_0x3271d8);if(_0x4c9ad8[_0x1aea('0xd8')](0x0)!=='.'){throw new FS[(_0x1aea('0xe5'))](0x16);}_0x4c9ad8=PATH[_0x1aea('0x17b')](_0x41d3c0,_0x286248);if(_0x4c9ad8['charAt'](0x0)!=='.'){throw new FS['ErrnoError'](0x27);}var _0x1c3097;try{_0x1c3097=FS[_0x1aea('0x11f')](_0x568941,_0x51ec21);}catch(_0x1cd2ea){}if(_0x29290f===_0x1c3097){return;}var _0x31de55=FS[_0x1aea('0x117')](_0x29290f[_0x1aea('0x109')]);var _0x2a998f=FS[_0x1aea('0x1ae')](_0x7b5e2f,_0x40a004,_0x31de55);if(_0x2a998f){throw new FS[(_0x1aea('0xe5'))](_0x2a998f);}_0x2a998f=_0x1c3097?FS[_0x1aea('0x1ae')](_0x568941,_0x51ec21,_0x31de55):FS[_0x1aea('0x1ad')](_0x568941,_0x51ec21);if(_0x2a998f){throw new FS['ErrnoError'](_0x2a998f);}if(!_0x7b5e2f[_0x1aea('0xfb')][_0x1aea('0x1af')]){throw new FS[(_0x1aea('0xe5'))](0x1);}if(FS[_0x1aea('0x18f')](_0x29290f)||_0x1c3097&&FS[_0x1aea('0x18f')](_0x1c3097)){throw new FS['ErrnoError'](0x10);}if(_0x568941!==_0x7b5e2f){_0x2a998f=FS[_0x1aea('0x19c')](_0x7b5e2f,'w');if(_0x2a998f){throw new FS[(_0x1aea('0xe5'))](_0x2a998f);}}try{if(FS[_0x1aea('0x1b0')][_0x1aea('0x1b1')]){FS[_0x1aea('0x1b0')]['willMovePath'](_0x4b893c,_0x41d3c0);}}catch(_0x2fd302){console['log']('FS.trackingDelegate[\x27willMovePath\x27](\x27'+_0x4b893c+_0x1aea('0x1b2')+_0x41d3c0+_0x1aea('0x1b3')+_0x2fd302['message']);}FS['hashRemoveNode'](_0x29290f);try{_0x7b5e2f[_0x1aea('0xfb')][_0x1aea('0x1af')](_0x29290f,_0x568941,_0x51ec21);}catch(_0x2435c0){throw _0x2435c0;}finally{FS['hashAddNode'](_0x29290f);}try{if(FS['trackingDelegate'][_0x1aea('0x1b4')])FS[_0x1aea('0x1b0')][_0x1aea('0x1b4')](_0x4b893c,_0x41d3c0);}catch(_0x2799ff){console[_0x1aea('0xa5')](_0x1aea('0x1b5')+_0x4b893c+_0x1aea('0x1b2')+_0x41d3c0+_0x1aea('0x1b3')+_0x2799ff[_0x1aea('0x1b6')]);}},'rmdir':function(_0x2d376b){var _0x6b65d2=FS[_0x1aea('0x144')](_0x2d376b,{'parent':!![]});var _0x169d0c=_0x6b65d2[_0x1aea('0xe3')];var _0x685ed5=PATH[_0x1aea('0x1ac')](_0x2d376b);var _0x2695ba=FS[_0x1aea('0x11f')](_0x169d0c,_0x685ed5);var _0x5a7563=FS[_0x1aea('0x1ae')](_0x169d0c,_0x685ed5,!![]);if(_0x5a7563){throw new FS[(_0x1aea('0xe5'))](_0x5a7563);}if(!_0x169d0c[_0x1aea('0xfb')][_0x1aea('0x14a')]){throw new FS[(_0x1aea('0xe5'))](0x1);}if(FS[_0x1aea('0x18f')](_0x2695ba)){throw new FS[(_0x1aea('0xe5'))](0x10);}try{if(FS['trackingDelegate']['willDeletePath']){FS[_0x1aea('0x1b0')][_0x1aea('0x1b7')](_0x2d376b);}}catch(_0x321d0a){console[_0x1aea('0xa5')](_0x1aea('0x1b8')+_0x2d376b+_0x1aea('0x1b3')+_0x321d0a['message']);}_0x169d0c[_0x1aea('0xfb')][_0x1aea('0x14a')](_0x169d0c,_0x685ed5);FS['destroyNode'](_0x2695ba);try{if(FS[_0x1aea('0x1b0')][_0x1aea('0x1b9')])FS['trackingDelegate'][_0x1aea('0x1b9')](_0x2d376b);}catch(_0x9108dd){console[_0x1aea('0xa5')](_0x1aea('0x1ba')+_0x2d376b+_0x1aea('0x1b3')+_0x9108dd[_0x1aea('0x1b6')]);}},'readdir':function(_0x55a8bd){var _0x27a204=FS[_0x1aea('0x144')](_0x55a8bd,{'follow':!![]});var _0x58c29d=_0x27a204[_0x1aea('0xe3')];if(!_0x58c29d[_0x1aea('0xfb')][_0x1aea('0x101')]){throw new FS['ErrnoError'](0x14);}return _0x58c29d[_0x1aea('0xfb')][_0x1aea('0x101')](_0x58c29d);},'unlink':function(_0x50f53b){var _0x57087b=FS[_0x1aea('0x144')](_0x50f53b,{'parent':!![]});var _0x35031e=_0x57087b[_0x1aea('0xe3')];var _0x507336=PATH[_0x1aea('0x1ac')](_0x50f53b);var _0x4b70e4=FS[_0x1aea('0x11f')](_0x35031e,_0x507336);var _0x464191=FS[_0x1aea('0x1ae')](_0x35031e,_0x507336,![]);if(_0x464191){throw new FS[(_0x1aea('0xe5'))](_0x464191);}if(!_0x35031e[_0x1aea('0xfb')][_0x1aea('0x100')]){throw new FS[(_0x1aea('0xe5'))](0x1);}if(FS[_0x1aea('0x18f')](_0x4b70e4)){throw new FS['ErrnoError'](0x10);}try{if(FS[_0x1aea('0x1b0')][_0x1aea('0x1b7')]){FS[_0x1aea('0x1b0')][_0x1aea('0x1b7')](_0x50f53b);}}catch(_0x313b2b){console[_0x1aea('0xa5')]('FS.trackingDelegate[\x27willDeletePath\x27](\x27'+_0x50f53b+_0x1aea('0x1b3')+_0x313b2b[_0x1aea('0x1b6')]);}_0x35031e[_0x1aea('0xfb')]['unlink'](_0x35031e,_0x507336);FS[_0x1aea('0x1bb')](_0x4b70e4);try{if(FS[_0x1aea('0x1b0')]['onDeletePath'])FS[_0x1aea('0x1b0')][_0x1aea('0x1b9')](_0x50f53b);}catch(_0xec325e){console[_0x1aea('0xa5')](_0x1aea('0x1ba')+_0x50f53b+_0x1aea('0x1b3')+_0xec325e[_0x1aea('0x1b6')]);}},'readlink':function(_0x5490fb){var _0x40763b=FS['lookupPath'](_0x5490fb);var _0x65d0b7=_0x40763b[_0x1aea('0xe3')];if(!_0x65d0b7){throw new FS[(_0x1aea('0xe5'))](0x2);}if(!_0x65d0b7[_0x1aea('0xfb')]['readlink']){throw new FS[(_0x1aea('0xe5'))](0x16);}return PATH[_0x1aea('0xdf')](FS[_0x1aea('0x19e')](_0x65d0b7['parent']),_0x65d0b7[_0x1aea('0xfb')][_0x1aea('0x1bc')](_0x65d0b7));},'stat':function(_0xe02e00,_0x135bd3){var _0x3ace2f=FS[_0x1aea('0x144')](_0xe02e00,{'follow':!_0x135bd3});var _0x397be0=_0x3ace2f[_0x1aea('0xe3')];if(!_0x397be0){throw new FS[(_0x1aea('0xe5'))](0x2);}if(!_0x397be0['node_ops'][_0x1aea('0xfc')]){throw new FS[(_0x1aea('0xe5'))](0x1);}return _0x397be0[_0x1aea('0xfb')][_0x1aea('0xfc')](_0x397be0);},'lstat':function(_0x5f1e0a){return FS['stat'](_0x5f1e0a,!![]);},'chmod':function(_0x588e56,_0x247346,_0x36123d){var _0x49721c;if(typeof _0x588e56===_0x1aea('0x7c')){var _0x151578=FS[_0x1aea('0x144')](_0x588e56,{'follow':!_0x36123d});_0x49721c=_0x151578[_0x1aea('0xe3')];}else{_0x49721c=_0x588e56;}if(!_0x49721c[_0x1aea('0xfb')][_0x1aea('0xfd')]){throw new FS[(_0x1aea('0xe5'))](0x1);}_0x49721c[_0x1aea('0xfb')]['setattr'](_0x49721c,{'mode':_0x247346&0xfff|_0x49721c[_0x1aea('0x109')]&~0xfff,'timestamp':Date[_0x1aea('0xec')]()});},'lchmod':function(_0x59ad24,_0x53a498){FS[_0x1aea('0x149')](_0x59ad24,_0x53a498,!![]);},'fchmod':function(_0x5f2a8b,_0xa449b3){var _0x3a84a5=FS[_0x1aea('0x1bd')](_0x5f2a8b);if(!_0x3a84a5){throw new FS['ErrnoError'](0x9);}FS[_0x1aea('0x149')](_0x3a84a5[_0x1aea('0xe3')],_0xa449b3);},'chown':function(_0x49f1e0,_0x3f463b,_0x30bdba,_0x5ca957){var _0x4d364c;if(typeof _0x49f1e0===_0x1aea('0x7c')){var _0x17fbad=FS[_0x1aea('0x144')](_0x49f1e0,{'follow':!_0x5ca957});_0x4d364c=_0x17fbad[_0x1aea('0xe3')];}else{_0x4d364c=_0x49f1e0;}if(!_0x4d364c[_0x1aea('0xfb')][_0x1aea('0xfd')]){throw new FS['ErrnoError'](0x1);}_0x4d364c['node_ops'][_0x1aea('0xfd')](_0x4d364c,{'timestamp':Date[_0x1aea('0xec')]()});},'lchown':function(_0xff3ea8,_0x353b02,_0xb64e57){FS[_0x1aea('0x1be')](_0xff3ea8,_0x353b02,_0xb64e57,!![]);},'fchown':function(_0x51b3a0,_0xa854f7,_0x1af1b5){var _0x34570c=FS[_0x1aea('0x1bd')](_0x51b3a0);if(!_0x34570c){throw new FS[(_0x1aea('0xe5'))](0x9);}FS[_0x1aea('0x1be')](_0x34570c[_0x1aea('0xe3')],_0xa854f7,_0x1af1b5);},'truncate':function(_0x2678f3,_0x5adc22){if(_0x5adc22<0x0){throw new FS['ErrnoError'](0x16);}var _0x500482;if(typeof _0x2678f3===_0x1aea('0x7c')){var _0x48c39d=FS[_0x1aea('0x144')](_0x2678f3,{'follow':!![]});_0x500482=_0x48c39d[_0x1aea('0xe3')];}else{_0x500482=_0x2678f3;}if(!_0x500482[_0x1aea('0xfb')][_0x1aea('0xfd')]){throw new FS[(_0x1aea('0xe5'))](0x1);}if(FS[_0x1aea('0x117')](_0x500482[_0x1aea('0x109')])){throw new FS[(_0x1aea('0xe5'))](0x15);}if(!FS[_0x1aea('0x10b')](_0x500482[_0x1aea('0x109')])){throw new FS[(_0x1aea('0xe5'))](0x16);}var _0x5d3920=FS[_0x1aea('0x19c')](_0x500482,'w');if(_0x5d3920){throw new FS['ErrnoError'](_0x5d3920);}_0x500482[_0x1aea('0xfb')]['setattr'](_0x500482,{'size':_0x5adc22,'timestamp':Date[_0x1aea('0xec')]()});},'ftruncate':function(_0xb56fa7,_0x2ecd45){var _0x550461=FS[_0x1aea('0x1bd')](_0xb56fa7);if(!_0x550461){throw new FS[(_0x1aea('0xe5'))](0x9);}if((_0x550461[_0x1aea('0x17e')]&0x200003)===0x0){throw new FS[(_0x1aea('0xe5'))](0x16);}FS[_0x1aea('0x1bf')](_0x550461[_0x1aea('0xe3')],_0x2ecd45);},'utime':function(_0xcf51c7,_0x5bb8c0,_0x33eee2){var _0x3ed11b=FS[_0x1aea('0x144')](_0xcf51c7,{'follow':!![]});var _0x36cf20=_0x3ed11b[_0x1aea('0xe3')];_0x36cf20[_0x1aea('0xfb')][_0x1aea('0xfd')](_0x36cf20,{'timestamp':Math[_0x1aea('0x7f')](_0x5bb8c0,_0x33eee2)});},'open':function(_0x29cde7,_0x7c53d8,_0x18ab80,_0x369924,_0x4157a2){if(_0x29cde7===''){throw new FS[(_0x1aea('0xe5'))](0x2);}_0x7c53d8=typeof _0x7c53d8===_0x1aea('0x7c')?FS[_0x1aea('0x1c0')](_0x7c53d8):_0x7c53d8;_0x18ab80=typeof _0x18ab80===_0x1aea('0x1')?0x1b6:_0x18ab80;if(_0x7c53d8&0x40){_0x18ab80=_0x18ab80&0xfff|0x8000;}else{_0x18ab80=0x0;}var _0x3bac7b;if(typeof _0x29cde7===_0x1aea('0x49')){_0x3bac7b=_0x29cde7;}else{_0x29cde7=PATH[_0x1aea('0x4d')](_0x29cde7);try{var _0x321a17=FS[_0x1aea('0x144')](_0x29cde7,{'follow':!(_0x7c53d8&0x20000)});_0x3bac7b=_0x321a17[_0x1aea('0xe3')];}catch(_0x51ceb6){}}var _0x82fe3=![];if(_0x7c53d8&0x40){if(_0x3bac7b){if(_0x7c53d8&0x80){throw new FS[(_0x1aea('0xe5'))](0x11);}}else{_0x3bac7b=FS['mknod'](_0x29cde7,_0x18ab80,0x0);_0x82fe3=!![];}}if(!_0x3bac7b){throw new FS[(_0x1aea('0xe5'))](0x2);}if(FS[_0x1aea('0x111')](_0x3bac7b[_0x1aea('0x109')])){_0x7c53d8&=~0x200;}if(_0x7c53d8&0x10000&&!FS[_0x1aea('0x117')](_0x3bac7b[_0x1aea('0x109')])){throw new FS['ErrnoError'](0x14);}if(!_0x82fe3){var _0xa2f0b8=FS[_0x1aea('0x1c1')](_0x3bac7b,_0x7c53d8);if(_0xa2f0b8){throw new FS[(_0x1aea('0xe5'))](_0xa2f0b8);}}if(_0x7c53d8&0x200){FS[_0x1aea('0x1bf')](_0x3bac7b,0x0);}_0x7c53d8&=~(0x80|0x200);var _0x36aa9d=FS[_0x1aea('0x1c2')]({'node':_0x3bac7b,'path':FS[_0x1aea('0x19e')](_0x3bac7b),'flags':_0x7c53d8,'seekable':!![],'position':0x0,'stream_ops':_0x3bac7b[_0x1aea('0xe1')],'ungotten':[],'error':![]},_0x369924,_0x4157a2);if(_0x36aa9d[_0x1aea('0xe1')][_0x1aea('0xf')]){_0x36aa9d[_0x1aea('0xe1')][_0x1aea('0xf')](_0x36aa9d);}if(Module[_0x1aea('0x1c3')]&&!(_0x7c53d8&0x1)){if(!FS[_0x1aea('0x1c4')])FS['readFiles']={};if(!(_0x29cde7 in FS[_0x1aea('0x1c4')])){FS[_0x1aea('0x1c4')][_0x29cde7]=0x1;console[_0x1aea('0xa5')](_0x1aea('0x1c5')+_0x29cde7);}}try{if(FS[_0x1aea('0x1b0')][_0x1aea('0x1c6')]){var _0x24008d=0x0;if((_0x7c53d8&0x200003)!==0x1){_0x24008d|=FS[_0x1aea('0x1c7')][_0x1aea('0x1c8')][_0x1aea('0x1c9')];}if((_0x7c53d8&0x200003)!==0x0){_0x24008d|=FS['tracking'][_0x1aea('0x1c8')]['WRITE'];}FS[_0x1aea('0x1b0')][_0x1aea('0x1c6')](_0x29cde7,_0x24008d);}}catch(_0x38ba6a){console['log'](_0x1aea('0x1ca')+_0x29cde7+_0x1aea('0x1cb')+_0x38ba6a[_0x1aea('0x1b6')]);}return _0x36aa9d;},'close':function(_0x397901){if(FS[_0x1aea('0x1cc')](_0x397901)){throw new FS[(_0x1aea('0xe5'))](0x9);}if(_0x397901[_0x1aea('0x1cd')])_0x397901[_0x1aea('0x1cd')]=null;try{if(_0x397901[_0x1aea('0xe1')][_0x1aea('0x1ce')]){_0x397901[_0x1aea('0xe1')]['close'](_0x397901);}}catch(_0x2568a8){throw _0x2568a8;}finally{FS[_0x1aea('0x1cf')](_0x397901['fd']);}_0x397901['fd']=null;},'isClosed':function(_0x453954){return _0x453954['fd']===null;},'llseek':function(_0x4ae001,_0x3e2ae4,_0x1fa4c0){if(FS['isClosed'](_0x4ae001)){throw new FS[(_0x1aea('0xe5'))](0x9);}if(!_0x4ae001['seekable']||!_0x4ae001[_0x1aea('0xe1')]['llseek']){throw new FS[(_0x1aea('0xe5'))](0x1d);}if(_0x1fa4c0!=0x0&&_0x1fa4c0!=0x1&&_0x1fa4c0!=0x2){throw new FS['ErrnoError'](0x16);}_0x4ae001['position']=_0x4ae001[_0x1aea('0xe1')][_0x1aea('0x103')](_0x4ae001,_0x3e2ae4,_0x1fa4c0);_0x4ae001[_0x1aea('0x1d0')]=[];return _0x4ae001[_0x1aea('0x182')];},'read':function(_0x106fe5,_0x502b74,_0xe1a70b,_0x1be854,_0x1c9da1){if(_0x1be854<0x0||_0x1c9da1<0x0){throw new FS[(_0x1aea('0xe5'))](0x16);}if(FS[_0x1aea('0x1cc')](_0x106fe5)){throw new FS[(_0x1aea('0xe5'))](0x9);}if((_0x106fe5[_0x1aea('0x17e')]&0x200003)===0x1){throw new FS[(_0x1aea('0xe5'))](0x9);}if(FS[_0x1aea('0x117')](_0x106fe5['node']['mode'])){throw new FS[(_0x1aea('0xe5'))](0x15);}if(!_0x106fe5[_0x1aea('0xe1')][_0x1aea('0x4b')]){throw new FS[(_0x1aea('0xe5'))](0x16);}var _0x4018cf=typeof _0x1c9da1!==_0x1aea('0x1');if(!_0x4018cf){_0x1c9da1=_0x106fe5[_0x1aea('0x182')];}else if(!_0x106fe5[_0x1aea('0x1d1')]){throw new FS[(_0x1aea('0xe5'))](0x1d);}var _0x21012e=_0x106fe5[_0x1aea('0xe1')][_0x1aea('0x4b')](_0x106fe5,_0x502b74,_0xe1a70b,_0x1be854,_0x1c9da1);if(!_0x4018cf)_0x106fe5['position']+=_0x21012e;return _0x21012e;},'write':function(_0x511581,_0x169114,_0x36d1b4,_0x4cbfe6,_0x156c1f,_0x2e29e7){if(_0x4cbfe6<0x0||_0x156c1f<0x0){throw new FS[(_0x1aea('0xe5'))](0x16);}if(FS[_0x1aea('0x1cc')](_0x511581)){throw new FS[(_0x1aea('0xe5'))](0x9);}if((_0x511581[_0x1aea('0x17e')]&0x200003)===0x0){throw new FS[(_0x1aea('0xe5'))](0x9);}if(FS[_0x1aea('0x117')](_0x511581[_0x1aea('0xe3')][_0x1aea('0x109')])){throw new FS[(_0x1aea('0xe5'))](0x15);}if(!_0x511581[_0x1aea('0xe1')][_0x1aea('0x104')]){throw new FS[(_0x1aea('0xe5'))](0x16);}if(_0x511581[_0x1aea('0x17e')]&0x400){FS[_0x1aea('0x103')](_0x511581,0x0,0x2);}var _0x4c98cc=typeof _0x156c1f!==_0x1aea('0x1');if(!_0x4c98cc){_0x156c1f=_0x511581[_0x1aea('0x182')];}else if(!_0x511581[_0x1aea('0x1d1')]){throw new FS['ErrnoError'](0x1d);}var _0x5dbc3c=_0x511581[_0x1aea('0xe1')][_0x1aea('0x104')](_0x511581,_0x169114,_0x36d1b4,_0x4cbfe6,_0x156c1f,_0x2e29e7);if(!_0x4c98cc)_0x511581[_0x1aea('0x182')]+=_0x5dbc3c;try{if(_0x511581[_0x1aea('0x4c')]&&FS[_0x1aea('0x1b0')][_0x1aea('0x1d2')])FS[_0x1aea('0x1b0')][_0x1aea('0x1d2')](_0x511581[_0x1aea('0x4c')]);}catch(_0x64e1a0){console[_0x1aea('0xa5')](_0x1aea('0x1d3')+_0x511581[_0x1aea('0x4c')]+_0x1aea('0x1b3')+_0x64e1a0[_0x1aea('0x1b6')]);}return _0x5dbc3c;},'allocate':function(_0x43657c,_0x1581cf,_0x4e308d){if(FS[_0x1aea('0x1cc')](_0x43657c)){throw new FS[(_0x1aea('0xe5'))](0x9);}if(_0x1581cf<0x0||_0x4e308d<=0x0){throw new FS[(_0x1aea('0xe5'))](0x16);}if((_0x43657c[_0x1aea('0x17e')]&0x200003)===0x0){throw new FS[(_0x1aea('0xe5'))](0x9);}if(!FS[_0x1aea('0x10b')](_0x43657c[_0x1aea('0xe3')][_0x1aea('0x109')])&&!FS['isDir'](_0x43657c['node'][_0x1aea('0x109')])){throw new FS[(_0x1aea('0xe5'))](0x13);}if(!_0x43657c[_0x1aea('0xe1')][_0x1aea('0x105')]){throw new FS[(_0x1aea('0xe5'))](0x5f);}_0x43657c[_0x1aea('0xe1')][_0x1aea('0x105')](_0x43657c,_0x1581cf,_0x4e308d);},'mmap':function(_0x7ae4a,_0x31bc72,_0x4b7388,_0x542e7c,_0x3e32bc,_0x43bb82,_0x1923cb){if((_0x7ae4a['flags']&0x200003)===0x1){throw new FS[(_0x1aea('0xe5'))](0xd);}if(!_0x7ae4a[_0x1aea('0xe1')][_0x1aea('0x106')]){throw new FS[(_0x1aea('0xe5'))](0x13);}return _0x7ae4a['stream_ops'][_0x1aea('0x106')](_0x7ae4a,_0x31bc72,_0x4b7388,_0x542e7c,_0x3e32bc,_0x43bb82,_0x1923cb);},'msync':function(_0x664952,_0x4db912,_0x3365a2,_0x47bd94,_0x343a5e){if(!_0x664952||!_0x664952['stream_ops'][_0x1aea('0x107')]){return 0x0;}return _0x664952[_0x1aea('0xe1')][_0x1aea('0x107')](_0x664952,_0x4db912,_0x3365a2,_0x47bd94,_0x343a5e);},'munmap':function(_0x78abf1){return 0x0;},'ioctl':function(_0x1868e0,_0x3e363a,_0x470fd9){if(!_0x1868e0[_0x1aea('0xe1')][_0x1aea('0x1d4')]){throw new FS[(_0x1aea('0xe5'))](0x19);}return _0x1868e0[_0x1aea('0xe1')]['ioctl'](_0x1868e0,_0x3e363a,_0x470fd9);},'readFile':function(_0x337797,_0xeb563d){_0xeb563d=_0xeb563d||{};_0xeb563d[_0x1aea('0x17e')]=_0xeb563d[_0x1aea('0x17e')]||'r';_0xeb563d[_0x1aea('0x1d5')]=_0xeb563d[_0x1aea('0x1d5')]||'binary';if(_0xeb563d[_0x1aea('0x1d5')]!==_0x1aea('0x82')&&_0xeb563d[_0x1aea('0x1d5')]!==_0x1aea('0x59')){throw new Error(_0x1aea('0x1d6')+_0xeb563d[_0x1aea('0x1d5')]+'\x22');}var _0x275d4b;var _0x22e3bc=FS[_0x1aea('0xf')](_0x337797,_0xeb563d[_0x1aea('0x17e')]);var _0x2f7883=FS[_0x1aea('0x139')](_0x337797);var _0x47048d=_0x2f7883[_0x1aea('0x118')];var _0x514c1c=new Uint8Array(_0x47048d);FS[_0x1aea('0x4b')](_0x22e3bc,_0x514c1c,0x0,_0x47048d,0x0);if(_0xeb563d[_0x1aea('0x1d5')]===_0x1aea('0x82')){_0x275d4b=UTF8ArrayToString(_0x514c1c,0x0);}else if(_0xeb563d[_0x1aea('0x1d5')]===_0x1aea('0x59')){_0x275d4b=_0x514c1c;}FS[_0x1aea('0x1ce')](_0x22e3bc);return _0x275d4b;},'writeFile':function(_0xe53f43,_0x5c164e,_0x3f9cfa){_0x3f9cfa=_0x3f9cfa||{};_0x3f9cfa[_0x1aea('0x17e')]=_0x3f9cfa['flags']||'w';var _0x19da8a=FS['open'](_0xe53f43,_0x3f9cfa[_0x1aea('0x17e')],_0x3f9cfa[_0x1aea('0x109')]);if(typeof _0x5c164e===_0x1aea('0x7c')){var _0x3d0f78=new Uint8Array(lengthBytesUTF8(_0x5c164e)+0x1);var _0x29886b=stringToUTF8Array(_0x5c164e,_0x3d0f78,0x0,_0x3d0f78[_0x1aea('0x39')]);FS[_0x1aea('0x104')](_0x19da8a,_0x3d0f78,0x0,_0x29886b,undefined,_0x3f9cfa[_0x1aea('0x1d7')]);}else if(ArrayBuffer[_0x1aea('0x1d8')](_0x5c164e)){FS[_0x1aea('0x104')](_0x19da8a,_0x5c164e,0x0,_0x5c164e[_0x1aea('0x1d9')],undefined,_0x3f9cfa[_0x1aea('0x1d7')]);}else{throw new Error(_0x1aea('0x1da'));}FS[_0x1aea('0x1ce')](_0x19da8a);},'cwd':function(){return FS[_0x1aea('0x1db')];},'chdir':function(_0x5f1f10){var _0x3a85d6=FS['lookupPath'](_0x5f1f10,{'follow':!![]});if(_0x3a85d6[_0x1aea('0xe3')]===null){throw new FS[(_0x1aea('0xe5'))](0x2);}if(!FS[_0x1aea('0x117')](_0x3a85d6[_0x1aea('0xe3')][_0x1aea('0x109')])){throw new FS[(_0x1aea('0xe5'))](0x14);}var _0xb325b2=FS[_0x1aea('0x19c')](_0x3a85d6[_0x1aea('0xe3')],'x');if(_0xb325b2){throw new FS[(_0x1aea('0xe5'))](_0xb325b2);}FS[_0x1aea('0x1db')]=_0x3a85d6[_0x1aea('0x4c')];},'createDefaultDirectories':function(){FS[_0x1aea('0x146')](_0x1aea('0x1dc'));FS[_0x1aea('0x146')](_0x1aea('0x1dd'));FS[_0x1aea('0x146')](_0x1aea('0xc6'));},'createDefaultDevices':function(){FS[_0x1aea('0x146')](_0x1aea('0x1de'));FS['registerDevice'](FS[_0x1aea('0x1df')](0x1,0x3),{'read':function(){return 0x0;},'write':function(_0x4fd327,_0x6d7a9a,_0x5f00cc,_0x12ad7e,_0x4470ef){return _0x12ad7e;}});FS[_0x1aea('0x1e0')](_0x1aea('0x1e1'),FS[_0x1aea('0x1df')](0x1,0x3));TTY['register'](FS[_0x1aea('0x1df')](0x5,0x0),TTY[_0x1aea('0x1e2')]);TTY[_0x1aea('0x1e3')](FS['makedev'](0x6,0x0),TTY['default_tty1_ops']);FS[_0x1aea('0x1e0')](_0x1aea('0x1e4'),FS['makedev'](0x5,0x0));FS[_0x1aea('0x1e0')](_0x1aea('0x1e5'),FS[_0x1aea('0x1df')](0x6,0x0));var _0x1d47ed;if(typeof crypto===_0x1aea('0x49')&&typeof crypto[_0x1aea('0x1e6')]===_0x1aea('0x4a')){var _0xe02e59=new Uint8Array(0x1);_0x1d47ed=function(){crypto[_0x1aea('0x1e6')](_0xe02e59);return _0xe02e59[0x0];};}else if(ENVIRONMENT_IS_NODE){try{var _0x49b2f4=!(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }());_0x1d47ed=function(){return _0x49b2f4[_0x1aea('0x1e8')](0x1)[0x0];};}catch(_0x58bfa3){}}else{}if(!_0x1d47ed){_0x1d47ed=function(){abort(_0x1aea('0x1e9'));};}FS['createDevice']('/dev',_0x1aea('0x1ea'),_0x1d47ed);FS['createDevice']('/dev',_0x1aea('0x1eb'),_0x1d47ed);FS[_0x1aea('0x146')]('/dev/shm');FS[_0x1aea('0x146')]('/dev/shm/tmp');},'createSpecialDirectories':function(){FS[_0x1aea('0x146')]('/proc');FS[_0x1aea('0x146')](_0x1aea('0x1ec'));FS['mkdir'](_0x1aea('0x1ed'));FS[_0x1aea('0x126')]({'mount':function(){var _0x50b396=FS[_0x1aea('0xf7')]('/proc/self','fd',0x4000|0x1ff,0x49);_0x50b396[_0x1aea('0xfb')]={'lookup':function(_0x21d4a3,_0x151b26){var _0x318262=+_0x151b26;var _0x21d647=FS[_0x1aea('0x1bd')](_0x318262);if(!_0x21d647)throw new FS[(_0x1aea('0xe5'))](0x9);var _0x3401ab={'parent':null,'mount':{'mountpoint':_0x1aea('0x1ee')},'node_ops':{'readlink':function(){return _0x21d647[_0x1aea('0x4c')];}}};_0x3401ab[_0x1aea('0x120')]=_0x3401ab;return _0x3401ab;}};return _0x50b396;}},{},_0x1aea('0x1ed'));},'createStandardStreams':function(){if(Module['stdin']){FS[_0x1aea('0x1ef')]('/dev',_0x1aea('0xef'),Module[_0x1aea('0xef')]);}else{FS[_0x1aea('0x102')](_0x1aea('0x1e4'),_0x1aea('0xf1'));}if(Module[_0x1aea('0x1f0')]){FS[_0x1aea('0x1ef')](_0x1aea('0x1de'),_0x1aea('0x1f0'),null,Module[_0x1aea('0x1f0')]);}else{FS[_0x1aea('0x102')](_0x1aea('0x1e4'),_0x1aea('0x1f1'));}if(Module[_0x1aea('0x1f2')]){FS[_0x1aea('0x1ef')](_0x1aea('0x1de'),'stderr',null,Module[_0x1aea('0x1f2')]);}else{FS[_0x1aea('0x102')]('/dev/tty1',_0x1aea('0x1f3'));}var _0x31c3e4=FS[_0x1aea('0xf')]('/dev/stdin','r');var _0x9943a=FS['open'](_0x1aea('0x1f1'),'w');var _0x153808=FS[_0x1aea('0xf')](_0x1aea('0x1f3'),'w');},'ensureErrnoError':function(){if(FS[_0x1aea('0xe5')])return;FS[_0x1aea('0xe5')]=function ErrnoError(_0x38f694,_0x2f5c90){this[_0x1aea('0xe3')]=_0x2f5c90;this[_0x1aea('0x1f4')]=function(_0x16d802){this[_0x1aea('0x16e')]=_0x16d802;};this[_0x1aea('0x1f4')](_0x38f694);this[_0x1aea('0x1b6')]=_0x1aea('0x1f5');if(this[_0x1aea('0x1f6')])Object[_0x1aea('0x1f7')](this,_0x1aea('0x1f6'),{'value':new Error()['stack'],'writable':!![]});};FS[_0x1aea('0xe5')][_0x1aea('0x2b')]=new Error();FS[_0x1aea('0xe5')][_0x1aea('0x2b')][_0x1aea('0x1f8')]=FS['ErrnoError'];[0x2]['forEach'](function(_0x4fb544){FS[_0x1aea('0x11e')][_0x4fb544]=new FS[(_0x1aea('0xe5'))](_0x4fb544);FS[_0x1aea('0x11e')][_0x4fb544][_0x1aea('0x1f6')]=_0x1aea('0x1f9');});},'staticInit':function(){FS['ensureErrnoError']();FS[_0x1aea('0x193')]=new Array(0x1000);FS[_0x1aea('0x126')](MEMFS,{},'/');FS[_0x1aea('0x1fa')]();FS[_0x1aea('0x1fb')]();FS['createSpecialDirectories']();FS[_0x1aea('0x1fc')]={'MEMFS':MEMFS,'IDBFS':IDBFS,'NODEFS':NODEFS,'WORKERFS':WORKERFS};},'init':function(_0xd79f7d,_0x1ef9bf,_0x107535){FS[_0x1aea('0x98')][_0x1aea('0x99')]=!![];FS[_0x1aea('0x1fd')]();Module['stdin']=_0xd79f7d||Module['stdin'];Module['stdout']=_0x1ef9bf||Module['stdout'];Module[_0x1aea('0x1f2')]=_0x107535||Module[_0x1aea('0x1f2')];FS[_0x1aea('0x1fe')]();},'quit':function(){FS[_0x1aea('0x98')][_0x1aea('0x99')]=![];var _0x21d58f=Module[_0x1aea('0x1ff')];if(_0x21d58f)_0x21d58f(0x0);for(var _0x1e519d=0x0;_0x1e519d<FS[_0x1aea('0x1a1')][_0x1aea('0x39')];_0x1e519d++){var _0x7350bd=FS[_0x1aea('0x1a1')][_0x1e519d];if(!_0x7350bd){continue;}FS[_0x1aea('0x1ce')](_0x7350bd);}},'getMode':function(_0x19e1e2,_0x385fb7){var _0x4dba73=0x0;if(_0x19e1e2)_0x4dba73|=0x124|0x49;if(_0x385fb7)_0x4dba73|=0x92;return _0x4dba73;},'joinPath':function(_0x103219,_0x3e7ea2){var _0x4ad4b8=PATH[_0x1aea('0xdc')][_0x1aea('0x72')](null,_0x103219);if(_0x3e7ea2&&_0x4ad4b8[0x0]=='/')_0x4ad4b8=_0x4ad4b8[_0x1aea('0x5e')](0x1);return _0x4ad4b8;},'absolutePath':function(_0x42ecc6,_0x544099){return PATH['resolve'](_0x544099,_0x42ecc6);},'standardizePath':function(_0xd8aeb1){return PATH[_0x1aea('0x4d')](_0xd8aeb1);},'findObject':function(_0x362444,_0x1f921f){var _0x2297ba=FS['analyzePath'](_0x362444,_0x1f921f);if(_0x2297ba[_0x1aea('0x200')]){return _0x2297ba[_0x1aea('0x49')];}else{___setErrNo(_0x2297ba['error']);return null;}},'analyzePath':function(_0x3fb8e5,_0x54f8aa){try{var _0x132eaa=FS[_0x1aea('0x144')](_0x3fb8e5,{'follow':!_0x54f8aa});_0x3fb8e5=_0x132eaa[_0x1aea('0x4c')];}catch(_0x366e62){}var _0x476e5e={'isRoot':![],'exists':![],'error':0x0,'name':null,'path':null,'object':null,'parentExists':![],'parentPath':null,'parentObject':null};try{var _0x132eaa=FS[_0x1aea('0x144')](_0x3fb8e5,{'parent':!![]});_0x476e5e[_0x1aea('0x201')]=!![];_0x476e5e['parentPath']=_0x132eaa[_0x1aea('0x4c')];_0x476e5e[_0x1aea('0x202')]=_0x132eaa[_0x1aea('0xe3')];_0x476e5e[_0x1aea('0x2c')]=PATH[_0x1aea('0x1ac')](_0x3fb8e5);_0x132eaa=FS['lookupPath'](_0x3fb8e5,{'follow':!_0x54f8aa});_0x476e5e[_0x1aea('0x200')]=!![];_0x476e5e[_0x1aea('0x4c')]=_0x132eaa[_0x1aea('0x4c')];_0x476e5e[_0x1aea('0x49')]=_0x132eaa[_0x1aea('0xe3')];_0x476e5e[_0x1aea('0x2c')]=_0x132eaa[_0x1aea('0xe3')][_0x1aea('0x2c')];_0x476e5e[_0x1aea('0x19d')]=_0x132eaa[_0x1aea('0x4c')]==='/';}catch(_0x2e80dc){_0x476e5e[_0x1aea('0x24')]=_0x2e80dc[_0x1aea('0x16e')];};return _0x476e5e;},'createFolder':function(_0x49218d,_0x141df5,_0x1693f6,_0x5cb461){var _0x4c2f00=PATH[_0x1aea('0x135')](typeof _0x49218d===_0x1aea('0x7c')?_0x49218d:FS[_0x1aea('0x19e')](_0x49218d),_0x141df5);var _0xc9fd42=FS['getMode'](_0x1693f6,_0x5cb461);return FS[_0x1aea('0x146')](_0x4c2f00,_0xc9fd42);},'createPath':function(_0x5e5973,_0x5ce5a2,_0xb00248,_0x5a2396){_0x5e5973=typeof _0x5e5973===_0x1aea('0x7c')?_0x5e5973:FS[_0x1aea('0x19e')](_0x5e5973);var _0x4ac7e9=_0x5ce5a2[_0x1aea('0xda')]('/')[_0x1aea('0x159')]();while(_0x4ac7e9['length']){var _0x41f50e=_0x4ac7e9[_0x1aea('0x138')]();if(!_0x41f50e)continue;var _0x38d0e0=PATH[_0x1aea('0x135')](_0x5e5973,_0x41f50e);try{FS['mkdir'](_0x38d0e0);}catch(_0x4db1d8){}_0x5e5973=_0x38d0e0;}return _0x38d0e0;},'createFile':function(_0x19d47e,_0x245cc1,_0x33477f,_0x337467,_0x987f95){var _0x5940b4=PATH[_0x1aea('0x135')](typeof _0x19d47e==='string'?_0x19d47e:FS[_0x1aea('0x19e')](_0x19d47e),_0x245cc1);var _0x4724fb=FS['getMode'](_0x337467,_0x987f95);return FS[_0x1aea('0x203')](_0x5940b4,_0x4724fb);},'createDataFile':function(_0x43550a,_0x33a41a,_0x4e43a4,_0x2a8e01,_0x55c953,_0x3ebcff){var _0x544573=_0x33a41a?PATH['join2'](typeof _0x43550a===_0x1aea('0x7c')?_0x43550a:FS[_0x1aea('0x19e')](_0x43550a),_0x33a41a):_0x43550a;var _0x20f843=FS[_0x1aea('0x173')](_0x2a8e01,_0x55c953);var _0x4f8951=FS[_0x1aea('0x203')](_0x544573,_0x20f843);if(_0x4e43a4){if(typeof _0x4e43a4==='string'){var _0x41d531=new Array(_0x4e43a4['length']);for(var _0x25cdaa=0x0,_0x5d81e0=_0x4e43a4[_0x1aea('0x39')];_0x25cdaa<_0x5d81e0;++_0x25cdaa)_0x41d531[_0x25cdaa]=_0x4e43a4[_0x1aea('0x84')](_0x25cdaa);_0x4e43a4=_0x41d531;}FS['chmod'](_0x4f8951,_0x20f843|0x92);var _0x2bf6ee=FS[_0x1aea('0xf')](_0x4f8951,'w');FS[_0x1aea('0x104')](_0x2bf6ee,_0x4e43a4,0x0,_0x4e43a4[_0x1aea('0x39')],0x0,_0x3ebcff);FS[_0x1aea('0x1ce')](_0x2bf6ee);FS['chmod'](_0x4f8951,_0x20f843);}return _0x4f8951;},'createDevice':function(_0x27b0f5,_0x46087c,_0x25aeff,_0x3cd9f8){var _0x222eca=PATH[_0x1aea('0x135')](typeof _0x27b0f5==='string'?_0x27b0f5:FS[_0x1aea('0x19e')](_0x27b0f5),_0x46087c);var _0xa019e8=FS[_0x1aea('0x173')](!!_0x25aeff,!!_0x3cd9f8);if(!FS['createDevice'][_0x1aea('0x204')])FS[_0x1aea('0x1ef')][_0x1aea('0x204')]=0x40;var _0x46ec7b=FS[_0x1aea('0x1df')](FS[_0x1aea('0x1ef')][_0x1aea('0x204')]++,0x0);FS[_0x1aea('0xe0')](_0x46ec7b,{'open':function(_0x53a605){_0x53a605[_0x1aea('0x1d1')]=![];},'close':function(_0x4791da){if(_0x3cd9f8&&_0x3cd9f8[_0x1aea('0x50')]&&_0x3cd9f8[_0x1aea('0x50')][_0x1aea('0x39')]){_0x3cd9f8(0xa);}},'read':function(_0x34da5c,_0x341922,_0x5294b4,_0x1c1630,_0x443421){var _0x42248c=0x0;for(var _0x398bfa=0x0;_0x398bfa<_0x1c1630;_0x398bfa++){var _0x12c3f4;try{_0x12c3f4=_0x25aeff();}catch(_0x56baab){throw new FS[(_0x1aea('0xe5'))](0x5);}if(_0x12c3f4===undefined&&_0x42248c===0x0){throw new FS[(_0x1aea('0xe5'))](0xb);}if(_0x12c3f4===null||_0x12c3f4===undefined)break;_0x42248c++;_0x341922[_0x5294b4+_0x398bfa]=_0x12c3f4;}if(_0x42248c){_0x34da5c['node'][_0x1aea('0xea')]=Date[_0x1aea('0xec')]();}return _0x42248c;},'write':function(_0x2bc0d8,_0x3249a3,_0x164736,_0x583c2c,_0x54fd2b){for(var _0x1be825=0x0;_0x1be825<_0x583c2c;_0x1be825++){try{_0x3cd9f8(_0x3249a3[_0x164736+_0x1be825]);}catch(_0x495934){throw new FS[(_0x1aea('0xe5'))](0x5);}}if(_0x583c2c){_0x2bc0d8['node'][_0x1aea('0xea')]=Date[_0x1aea('0xec')]();}return _0x1be825;}});return FS[_0x1aea('0x1e0')](_0x222eca,_0xa019e8,_0x46ec7b);},'createLink':function(_0x631793,_0x3e91e2,_0x4d618a,_0x32b3ee,_0x41490a){var _0x57803b=PATH[_0x1aea('0x135')](typeof _0x631793===_0x1aea('0x7c')?_0x631793:FS[_0x1aea('0x19e')](_0x631793),_0x3e91e2);return FS[_0x1aea('0x102')](_0x4d618a,_0x57803b);},'forceLoadFile':function(_0x29e607){if(_0x29e607[_0x1aea('0x205')]||_0x29e607[_0x1aea('0x206')]||_0x29e607['link']||_0x29e607[_0x1aea('0x113')])return!![];var _0x4fc703=!![];if(typeof XMLHttpRequest!==_0x1aea('0x1')){throw new Error(_0x1aea('0x207'));}else if(Module[_0x1aea('0x4b')]){try{_0x29e607[_0x1aea('0x113')]=intArrayFromString(Module['read'](_0x29e607['url']),!![]);_0x29e607[_0x1aea('0x10e')]=_0x29e607[_0x1aea('0x113')][_0x1aea('0x39')];}catch(_0x459eba){_0x4fc703=![];}}else{throw new Error(_0x1aea('0x208'));}if(!_0x4fc703)___setErrNo(0x5);return _0x4fc703;},'createLazyFile':function(_0x220fa5,_0xbeb011,_0x368d0a,_0x24f243,_0x3e83ac){function _0x2d183d(){this[_0x1aea('0x209')]=![];this[_0x1aea('0x20a')]=[];}_0x2d183d[_0x1aea('0x2b')][_0x1aea('0x14b')]=function LazyUint8Array_get(_0x594b7a){if(_0x594b7a>this[_0x1aea('0x39')]-0x1||_0x594b7a<0x0){return undefined;}var _0x577665=_0x594b7a%this['chunkSize'];var _0x2de1f4=_0x594b7a/this['chunkSize']|0x0;return this['getter'](_0x2de1f4)[_0x577665];};_0x2d183d[_0x1aea('0x2b')][_0x1aea('0x20b')]=function LazyUint8Array_setDataGetter(_0x497396){this['getter']=_0x497396;};_0x2d183d['prototype'][_0x1aea('0x20c')]=function LazyUint8Array_cacheLength(){var _0x141302=new XMLHttpRequest();_0x141302[_0x1aea('0xf')](_0x1aea('0x20d'),VENUS_PATH+_0x368d0a,![]);_0x141302[_0x1aea('0x23')](null);if(!(_0x141302[_0x1aea('0x1f')]>=0xc8&&_0x141302['status']<0x12c||_0x141302[_0x1aea('0x1f')]===0x130))throw new Error('Couldn\x27t\x20load\x20'+_0x368d0a+'.\x20Status:\x20'+_0x141302[_0x1aea('0x1f')]);var _0x4c8cd3=Number(_0x141302[_0x1aea('0x20e')](_0x1aea('0x20f')));var _0x213c81;var _0x59db8d=(_0x213c81=_0x141302[_0x1aea('0x20e')](_0x1aea('0x210')))&&_0x213c81===_0x1aea('0x211');var _0x3c30a7=(_0x213c81=_0x141302['getResponseHeader'](_0x1aea('0x212')))&&_0x213c81===_0x1aea('0x213');var _0x3446fd=0x400*0x400;if(!_0x59db8d)_0x3446fd=_0x4c8cd3;var _0x225d5e=function(_0x4a1477,_0xeeb429){if(_0x4a1477>_0xeeb429)throw new Error('invalid\x20range\x20('+_0x4a1477+',\x20'+_0xeeb429+')\x20or\x20no\x20bytes\x20requested!');if(_0xeeb429>_0x4c8cd3-0x1)throw new Error(_0x1aea('0x214')+_0x4c8cd3+_0x1aea('0x215'));var _0x141302=new XMLHttpRequest();_0x141302[_0x1aea('0xf')](_0x1aea('0x10'),VENUS_PATH+_0x368d0a,![]);if(_0x4c8cd3!==_0x3446fd)_0x141302[_0x1aea('0x216')](_0x1aea('0x217'),_0x1aea('0x218')+_0x4a1477+'-'+_0xeeb429);if(typeof Uint8Array!=_0x1aea('0x1'))_0x141302[_0x1aea('0x11')]=_0x1aea('0x12');if(_0x141302['overrideMimeType']){_0x141302[_0x1aea('0x219')](_0x1aea('0x21a'));}_0x141302[_0x1aea('0x23')](null);if(!(_0x141302[_0x1aea('0x1f')]>=0xc8&&_0x141302[_0x1aea('0x1f')]<0x12c||_0x141302[_0x1aea('0x1f')]===0x130))throw new Error('Couldn\x27t\x20load\x20'+_0x368d0a+_0x1aea('0x21b')+_0x141302[_0x1aea('0x1f')]);if(_0x141302[_0x1aea('0x20')]!==undefined){return new Uint8Array(_0x141302['response']||[]);}else{return intArrayFromString(_0x141302['responseText']||'',!![]);}};var _0x4ddf5c=this;_0x4ddf5c[_0x1aea('0x20b')](function(_0x4a7bc6){var _0x5635f9=_0x4a7bc6*_0x3446fd;var _0x42034b=(_0x4a7bc6+0x1)*_0x3446fd-0x1;_0x42034b=Math[_0x1aea('0xa9')](_0x42034b,_0x4c8cd3-0x1);if(typeof _0x4ddf5c[_0x1aea('0x20a')][_0x4a7bc6]==='undefined'){_0x4ddf5c[_0x1aea('0x20a')][_0x4a7bc6]=_0x225d5e(_0x5635f9,_0x42034b);}if(typeof _0x4ddf5c[_0x1aea('0x20a')][_0x4a7bc6]===_0x1aea('0x1'))throw new Error('doXHR\x20failed!');return _0x4ddf5c[_0x1aea('0x20a')][_0x4a7bc6];});if(_0x3c30a7||!_0x4c8cd3){_0x3446fd=_0x4c8cd3=0x1;_0x4c8cd3=this['getter'](0x0)[_0x1aea('0x39')];_0x3446fd=_0x4c8cd3;console['log'](_0x1aea('0x21c'));}this['_length']=_0x4c8cd3;this['_chunkSize']=_0x3446fd;this['lengthKnown']=!![];};if(typeof XMLHttpRequest!==_0x1aea('0x1')){if(!ENVIRONMENT_IS_WORKER)throw _0x1aea('0x21d');var _0x52213d=new _0x2d183d();Object[_0x1aea('0x1a3')](_0x52213d,{'length':{'get':function(){if(!this[_0x1aea('0x209')]){this[_0x1aea('0x20c')]();}return this['_length'];}},'chunkSize':{'get':function(){if(!this[_0x1aea('0x209')]){this[_0x1aea('0x20c')]();}return this[_0x1aea('0x21e')];}}});var _0xb74f1e={'isDevice':![],'contents':_0x52213d};}else{var _0xb74f1e={'isDevice':![],'url':_0x368d0a};}var _0xab4d68=FS[_0x1aea('0x21f')](_0x220fa5,_0xbeb011,_0xb74f1e,_0x24f243,_0x3e83ac);if(_0xb74f1e[_0x1aea('0x113')]){_0xab4d68[_0x1aea('0x113')]=_0xb74f1e['contents'];}else if(_0xb74f1e[_0x1aea('0x220')]){_0xab4d68[_0x1aea('0x113')]=null;_0xab4d68['url']=_0xb74f1e[_0x1aea('0x220')];}Object[_0x1aea('0x1a3')](_0xab4d68,{'usedBytes':{'get':function(){return this[_0x1aea('0x113')][_0x1aea('0x39')];}}});var _0x1fa70c={};var _0x12bfcb=Object[_0x1aea('0x14e')](_0xab4d68['stream_ops']);_0x12bfcb[_0x1aea('0x14f')](function(_0xd1848c){var _0x136c23=_0xab4d68[_0x1aea('0xe1')][_0xd1848c];_0x1fa70c[_0xd1848c]=function forceLoadLazyFile(){if(!FS['forceLoadFile'](_0xab4d68)){throw new FS[(_0x1aea('0xe5'))](0x5);}return _0x136c23[_0x1aea('0x72')](null,arguments);};});_0x1fa70c[_0x1aea('0x4b')]=function stream_ops_read(_0x3258e8,_0xbfbe2b,_0x2e367f,_0x2c6b49,_0x258ac7){if(!FS[_0x1aea('0x221')](_0xab4d68)){throw new FS['ErrnoError'](0x5);}var _0x376b37=_0x3258e8['node']['contents'];if(_0x258ac7>=_0x376b37[_0x1aea('0x39')])return 0x0;var _0x5438c3=Math[_0x1aea('0xa9')](_0x376b37[_0x1aea('0x39')]-_0x258ac7,_0x2c6b49);if(_0x376b37['slice']){for(var _0xf0814b=0x0;_0xf0814b<_0x5438c3;_0xf0814b++){_0xbfbe2b[_0x2e367f+_0xf0814b]=_0x376b37[_0x258ac7+_0xf0814b];}}else{for(var _0xf0814b=0x0;_0xf0814b<_0x5438c3;_0xf0814b++){_0xbfbe2b[_0x2e367f+_0xf0814b]=_0x376b37['get'](_0x258ac7+_0xf0814b);}}return _0x5438c3;};_0xab4d68['stream_ops']=_0x1fa70c;return _0xab4d68;},'createPreloadedFile':function(_0x521dde,_0x4bca8e,_0x4d02d6,_0x210890,_0x248a10,_0x3dce65,_0x1cf471,_0x16c060,_0x4caf67,_0x55bdb7){Browser[_0x1aea('0x98')]();var _0x3bef4b=_0x4bca8e?PATH[_0x1aea('0xdf')](PATH[_0x1aea('0x135')](_0x521dde,_0x4bca8e)):_0x521dde;var _0x285e00=getUniqueRunDependency('cp\x20'+_0x3bef4b);function _0x729d9b(_0x5c2bbd){function _0x302cec(_0x43a096){if(_0x55bdb7)_0x55bdb7();if(!_0x16c060){FS[_0x1aea('0x222')](_0x521dde,_0x4bca8e,_0x43a096,_0x210890,_0x248a10,_0x4caf67);}if(_0x3dce65)_0x3dce65();removeRunDependency(_0x285e00);}var _0x122d3a=![];Module[_0x1aea('0x223')][_0x1aea('0x14f')](function(_0xba6806){if(_0x122d3a)return;if(_0xba6806[_0x1aea('0x224')](_0x3bef4b)){_0xba6806[_0x1aea('0x225')](_0x5c2bbd,_0x3bef4b,_0x302cec,function(){if(_0x1cf471)_0x1cf471();removeRunDependency(_0x285e00);});_0x122d3a=!![];}});if(!_0x122d3a)_0x302cec(_0x5c2bbd);}addRunDependency(_0x285e00);if(typeof _0x4d02d6==_0x1aea('0x7c')){Browser[_0x1aea('0x226')](_0x4d02d6,function(_0x127340){_0x729d9b(_0x127340);},_0x1cf471);}else{_0x729d9b(_0x4d02d6);}},'indexedDB':function(){return window[_0x1aea('0x122')]||window['mozIndexedDB']||window[_0x1aea('0x123')]||window[_0x1aea('0x124')];},'DB_NAME':function(){return _0x1aea('0x227')+window[_0x1aea('0x5')][_0x1aea('0x6')];},'DB_VERSION':0x14,'DB_STORE_NAME':_0x1aea('0x228'),'saveFilesToDB':function(_0x22c8db,_0x1c945a,_0x5d7501){_0x1c945a=_0x1c945a||function(){};_0x5d7501=_0x5d7501||function(){};var _0x257579=FS[_0x1aea('0x122')]();try{var _0x173722=_0x257579[_0x1aea('0xf')](FS[_0x1aea('0x229')](),FS[_0x1aea('0x129')]);}catch(_0x5b1c30){return _0x5d7501(_0x5b1c30);}_0x173722[_0x1aea('0x12b')]=function openRequest_onupgradeneeded(){console[_0x1aea('0xa5')](_0x1aea('0x22a'));var _0x5ad05a=_0x173722[_0x1aea('0x12c')];_0x5ad05a[_0x1aea('0x131')](FS[_0x1aea('0x130')]);};_0x173722['onsuccess']=function openRequest_onsuccess(){var _0x1b6264=_0x173722[_0x1aea('0x12c')];var _0x1f80bd=_0x1b6264[_0x1aea('0x12e')]([FS[_0x1aea('0x130')]],_0x1aea('0x151'));var _0x309f3e=_0x1f80bd[_0x1aea('0x152')](FS[_0x1aea('0x130')]);var _0xa62cff=0x0,_0x191d50=0x0,_0xabf502=_0x22c8db[_0x1aea('0x39')];function _0x5289e1(){if(_0x191d50==0x0)_0x1c945a();else _0x5d7501();}_0x22c8db['forEach'](function(_0x305f60){var _0x14edc5=_0x309f3e[_0x1aea('0x14c')](FS['analyzePath'](_0x305f60)[_0x1aea('0x49')][_0x1aea('0x113')],_0x305f60);_0x14edc5[_0x1aea('0x13f')]=function putRequest_onsuccess(){_0xa62cff++;if(_0xa62cff+_0x191d50==_0xabf502)_0x5289e1();};_0x14edc5[_0x1aea('0x1c')]=function putRequest_onerror(){_0x191d50++;if(_0xa62cff+_0x191d50==_0xabf502)_0x5289e1();};});_0x1f80bd[_0x1aea('0x1c')]=_0x5d7501;};_0x173722[_0x1aea('0x1c')]=_0x5d7501;},'loadFilesFromDB':function(_0x1365ec,_0x5ac3f8,_0x441be9){_0x5ac3f8=_0x5ac3f8||function(){};_0x441be9=_0x441be9||function(){};var _0x5c9ba4=FS[_0x1aea('0x122')]();try{var _0x23f91a=_0x5c9ba4[_0x1aea('0xf')](FS[_0x1aea('0x229')](),FS['DB_VERSION']);}catch(_0x1a8cc2){return _0x441be9(_0x1a8cc2);}_0x23f91a[_0x1aea('0x12b')]=_0x441be9;_0x23f91a[_0x1aea('0x13f')]=function openRequest_onsuccess(){var _0xfb0234=_0x23f91a[_0x1aea('0x12c')];try{var _0x3f24cf=_0xfb0234[_0x1aea('0x12e')]([FS[_0x1aea('0x130')]],_0x1aea('0x13c'));}catch(_0x59ccab){_0x441be9(_0x59ccab);return;}var _0xe5754d=_0x3f24cf[_0x1aea('0x152')](FS[_0x1aea('0x130')]);var _0x255797=0x0,_0x373205=0x0,_0x5e9b9f=_0x1365ec[_0x1aea('0x39')];function _0x4f00a1(){if(_0x373205==0x0)_0x5ac3f8();else _0x441be9();}_0x1365ec[_0x1aea('0x14f')](function(_0x3d8405){var _0x13f9e2=_0xe5754d['get'](_0x3d8405);_0x13f9e2[_0x1aea('0x13f')]=function getRequest_onsuccess(){if(FS[_0x1aea('0x22b')](_0x3d8405)['exists']){FS[_0x1aea('0x100')](_0x3d8405);}FS['createDataFile'](PATH[_0x1aea('0x192')](_0x3d8405),PATH['basename'](_0x3d8405),_0x13f9e2[_0x1aea('0x12c')],!![],!![],!![]);_0x255797++;if(_0x255797+_0x373205==_0x5e9b9f)_0x4f00a1();};_0x13f9e2['onerror']=function getRequest_onerror(){_0x373205++;if(_0x255797+_0x373205==_0x5e9b9f)_0x4f00a1();};});_0x3f24cf[_0x1aea('0x1c')]=_0x441be9;};_0x23f91a[_0x1aea('0x1c')]=_0x441be9;}};var ERRNO_CODES={'EPERM':0x1,'ENOENT':0x2,'ESRCH':0x3,'EINTR':0x4,'EIO':0x5,'ENXIO':0x6,'E2BIG':0x7,'ENOEXEC':0x8,'EBADF':0x9,'ECHILD':0xa,'EAGAIN':0xb,'EWOULDBLOCK':0xb,'ENOMEM':0xc,'EACCES':0xd,'EFAULT':0xe,'ENOTBLK':0xf,'EBUSY':0x10,'EEXIST':0x11,'EXDEV':0x12,'ENODEV':0x13,'ENOTDIR':0x14,'EISDIR':0x15,'EINVAL':0x16,'ENFILE':0x17,'EMFILE':0x18,'ENOTTY':0x19,'ETXTBSY':0x1a,'EFBIG':0x1b,'ENOSPC':0x1c,'ESPIPE':0x1d,'EROFS':0x1e,'EMLINK':0x1f,'EPIPE':0x20,'EDOM':0x21,'ERANGE':0x22,'ENOMSG':0x2a,'EIDRM':0x2b,'ECHRNG':0x2c,'EL2NSYNC':0x2d,'EL3HLT':0x2e,'EL3RST':0x2f,'ELNRNG':0x30,'EUNATCH':0x31,'ENOCSI':0x32,'EL2HLT':0x33,'EDEADLK':0x23,'ENOLCK':0x25,'EBADE':0x34,'EBADR':0x35,'EXFULL':0x36,'ENOANO':0x37,'EBADRQC':0x38,'EBADSLT':0x39,'EDEADLOCK':0x23,'EBFONT':0x3b,'ENOSTR':0x3c,'ENODATA':0x3d,'ETIME':0x3e,'ENOSR':0x3f,'ENONET':0x40,'ENOPKG':0x41,'EREMOTE':0x42,'ENOLINK':0x43,'EADV':0x44,'ESRMNT':0x45,'ECOMM':0x46,'EPROTO':0x47,'EMULTIHOP':0x48,'EDOTDOT':0x49,'EBADMSG':0x4a,'ENOTUNIQ':0x4c,'EBADFD':0x4d,'EREMCHG':0x4e,'ELIBACC':0x4f,'ELIBBAD':0x50,'ELIBSCN':0x51,'ELIBMAX':0x52,'ELIBEXEC':0x53,'ENOSYS':0x26,'ENOTEMPTY':0x27,'ENAMETOOLONG':0x24,'ELOOP':0x28,'EOPNOTSUPP':0x5f,'EPFNOSUPPORT':0x60,'ECONNRESET':0x68,'ENOBUFS':0x69,'EAFNOSUPPORT':0x61,'EPROTOTYPE':0x5b,'ENOTSOCK':0x58,'ENOPROTOOPT':0x5c,'ESHUTDOWN':0x6c,'ECONNREFUSED':0x6f,'EADDRINUSE':0x62,'ECONNABORTED':0x67,'ENETUNREACH':0x65,'ENETDOWN':0x64,'ETIMEDOUT':0x6e,'EHOSTDOWN':0x70,'EHOSTUNREACH':0x71,'EINPROGRESS':0x73,'EALREADY':0x72,'EDESTADDRREQ':0x59,'EMSGSIZE':0x5a,'EPROTONOSUPPORT':0x5d,'ESOCKTNOSUPPORT':0x5e,'EADDRNOTAVAIL':0x63,'ENETRESET':0x66,'EISCONN':0x6a,'ENOTCONN':0x6b,'ETOOMANYREFS':0x6d,'EUSERS':0x57,'EDQUOT':0x7a,'ESTALE':0x74,'ENOTSUP':0x5f,'ENOMEDIUM':0x7b,'EILSEQ':0x54,'EOVERFLOW':0x4b,'ECANCELED':0x7d,'ENOTRECOVERABLE':0x83,'EOWNERDEAD':0x82,'ESTRPIPE':0x56};var SYSCALLS={'DEFAULT_POLLMASK':0x5,'mappings':{},'umask':0x1ff,'calculateAt':function(_0x5e370e,_0xbb851d){if(_0xbb851d[0x0]!=='/'){var _0x3bc377;if(_0x5e370e===-0x64){_0x3bc377=FS[_0x1aea('0x22c')]();}else{var _0x388aa3=FS[_0x1aea('0x1bd')](_0x5e370e);if(!_0x388aa3)throw new FS[(_0x1aea('0xe5'))](ERRNO_CODES['EBADF']);_0x3bc377=_0x388aa3[_0x1aea('0x4c')];}_0xbb851d=PATH[_0x1aea('0x135')](_0x3bc377,_0xbb851d);}return _0xbb851d;},'doStat':function(_0x7308e1,_0x2294b3,_0x3f783d){try{var _0x5bf713=_0x7308e1(_0x2294b3);}catch(_0x3e5457){if(_0x3e5457&&_0x3e5457[_0x1aea('0xe3')]&&PATH[_0x1aea('0x4d')](_0x2294b3)!==PATH[_0x1aea('0x4d')](FS[_0x1aea('0x19e')](_0x3e5457[_0x1aea('0xe3')]))){return-ERRNO_CODES['ENOTDIR'];}throw _0x3e5457;}HEAP32[_0x3f783d>>0x2]=_0x5bf713['dev'];HEAP32[_0x3f783d+0x4>>0x2]=0x0;HEAP32[_0x3f783d+0x8>>0x2]=_0x5bf713[_0x1aea('0x115')];HEAP32[_0x3f783d+0xc>>0x2]=_0x5bf713[_0x1aea('0x109')];HEAP32[_0x3f783d+0x10>>0x2]=_0x5bf713[_0x1aea('0x16f')];HEAP32[_0x3f783d+0x14>>0x2]=_0x5bf713[_0x1aea('0x170')];HEAP32[_0x3f783d+0x18>>0x2]=_0x5bf713['gid'];HEAP32[_0x3f783d+0x1c>>0x2]=_0x5bf713[_0x1aea('0xe4')];HEAP32[_0x3f783d+0x20>>0x2]=0x0;tempI64=[_0x5bf713[_0x1aea('0x118')]>>>0x0,(tempDouble=_0x5bf713[_0x1aea('0x118')],+Math_abs(tempDouble)>=0x1?tempDouble>0x0?(Math_min(+Math_floor(tempDouble/0x100000000),0xffffffff)|0x0)>>>0x0:~~+Math_ceil((tempDouble-+(~~tempDouble>>>0x0))/0x100000000)>>>0x0:0x0)],HEAP32[_0x3f783d+0x28>>0x2]=tempI64[0x0],HEAP32[_0x3f783d+0x2c>>0x2]=tempI64[0x1];HEAP32[_0x3f783d+0x30>>0x2]=0x1000;HEAP32[_0x3f783d+0x34>>0x2]=_0x5bf713[_0x1aea('0x11d')];HEAP32[_0x3f783d+0x38>>0x2]=_0x5bf713['atime']['getTime']()/0x3e8|0x0;HEAP32[_0x3f783d+0x3c>>0x2]=0x0;HEAP32[_0x3f783d+0x40>>0x2]=_0x5bf713['mtime'][_0x1aea('0x22d')]()/0x3e8|0x0;HEAP32[_0x3f783d+0x44>>0x2]=0x0;HEAP32[_0x3f783d+0x48>>0x2]=_0x5bf713[_0x1aea('0x11b')]['getTime']()/0x3e8|0x0;HEAP32[_0x3f783d+0x4c>>0x2]=0x0;tempI64=[_0x5bf713[_0x1aea('0x115')]>>>0x0,(tempDouble=_0x5bf713['ino'],+Math_abs(tempDouble)>=0x1?tempDouble>0x0?(Math_min(+Math_floor(tempDouble/0x100000000),0xffffffff)|0x0)>>>0x0:~~+Math_ceil((tempDouble-+(~~tempDouble>>>0x0))/0x100000000)>>>0x0:0x0)],HEAP32[_0x3f783d+0x50>>0x2]=tempI64[0x0],HEAP32[_0x3f783d+0x54>>0x2]=tempI64[0x1];return 0x0;},'doMsync':function(_0x24b6b8,_0x17deb8,_0x4144d8,_0x3e0d9c){var _0x5100c9=new Uint8Array(HEAPU8[_0x1aea('0x31')](_0x24b6b8,_0x24b6b8+_0x4144d8));FS['msync'](_0x17deb8,_0x5100c9,0x0,_0x4144d8,_0x3e0d9c);},'doMkdir':function(_0x426127,_0x547309){_0x426127=PATH[_0x1aea('0x4d')](_0x426127);if(_0x426127[_0x426127['length']-0x1]==='/')_0x426127=_0x426127[_0x1aea('0x5e')](0x0,_0x426127[_0x1aea('0x39')]-0x1);FS[_0x1aea('0x146')](_0x426127,_0x547309,0x0);return 0x0;},'doMknod':function(_0x3b4c66,_0x22fd65,_0x357815){switch(_0x22fd65&0xf000){case 0x8000:case 0x2000:case 0x6000:case 0x1000:case 0xc000:break;default:return-ERRNO_CODES[_0x1aea('0x22e')];}FS['mknod'](_0x3b4c66,_0x22fd65,_0x357815);return 0x0;},'doReadlink':function(_0x2aa2bf,_0x6ec6d7,_0x1faaa0){if(_0x1faaa0<=0x0)return-ERRNO_CODES[_0x1aea('0x22e')];var _0x11444e=FS[_0x1aea('0x1bc')](_0x2aa2bf);var _0x1aa47a=Math[_0x1aea('0xa9')](_0x1faaa0,lengthBytesUTF8(_0x11444e));var _0x489a29=HEAP8[_0x6ec6d7+_0x1aa47a];stringToUTF8(_0x11444e,_0x6ec6d7,_0x1faaa0+0x1);HEAP8[_0x6ec6d7+_0x1aa47a]=_0x489a29;return _0x1aa47a;},'doAccess':function(_0x576a5a,_0x197f98){if(_0x197f98&~0x7){return-ERRNO_CODES['EINVAL'];}var _0x568d78;var _0x2c423f=FS[_0x1aea('0x144')](_0x576a5a,{'follow':!![]});_0x568d78=_0x2c423f['node'];var _0x4af06b='';if(_0x197f98&0x4)_0x4af06b+='r';if(_0x197f98&0x2)_0x4af06b+='w';if(_0x197f98&0x1)_0x4af06b+='x';if(_0x4af06b&&FS[_0x1aea('0x19c')](_0x568d78,_0x4af06b)){return-ERRNO_CODES[_0x1aea('0x22f')];}return 0x0;},'doDup':function(_0x1c900d,_0x395d1f,_0x149864){var _0x5b2750=FS[_0x1aea('0x1bd')](_0x149864);if(_0x5b2750)FS[_0x1aea('0x1ce')](_0x5b2750);return FS[_0x1aea('0xf')](_0x1c900d,_0x395d1f,0x0,_0x149864,_0x149864)['fd'];},'doReadv':function(_0x1108d2,_0x345cb2,_0x1529e0,_0x13eaab){var _0x5d2cff=0x0;for(var _0x17d899=0x0;_0x17d899<_0x1529e0;_0x17d899++){var _0x411647=HEAP32[_0x345cb2+_0x17d899*0x8>>0x2];var _0x1f333d=HEAP32[_0x345cb2+(_0x17d899*0x8+0x4)>>0x2];var _0x5c68da=FS[_0x1aea('0x4b')](_0x1108d2,HEAP8,_0x411647,_0x1f333d,_0x13eaab);if(_0x5c68da<0x0)return-0x1;_0x5d2cff+=_0x5c68da;if(_0x5c68da<_0x1f333d)break;}return _0x5d2cff;},'doWritev':function(_0x4a5e25,_0x4890bb,_0x133db7,_0x245b02){var _0x47f624=0x0;for(var _0x4258a4=0x0;_0x4258a4<_0x133db7;_0x4258a4++){var _0x5847cd=HEAP32[_0x4890bb+_0x4258a4*0x8>>0x2];var _0x4d73d4=HEAP32[_0x4890bb+(_0x4258a4*0x8+0x4)>>0x2];var _0x583f61=FS['write'](_0x4a5e25,HEAP8,_0x5847cd,_0x4d73d4,_0x245b02);if(_0x583f61<0x0)return-0x1;_0x47f624+=_0x583f61;}return _0x47f624;},'varargs':0x0,'get':function(_0x486228){SYSCALLS[_0x1aea('0x230')]+=0x4;var _0x3d6e6f=HEAP32[SYSCALLS[_0x1aea('0x230')]-0x4>>0x2];return _0x3d6e6f;},'getStr':function(){var _0x3ed735=UTF8ToString(SYSCALLS[_0x1aea('0x14b')]());return _0x3ed735;},'getStreamFromFD':function(){var _0x493e16=FS[_0x1aea('0x1bd')](SYSCALLS[_0x1aea('0x14b')]());if(!_0x493e16)throw new FS[(_0x1aea('0xe5'))](ERRNO_CODES['EBADF']);return _0x493e16;},'getSocketFromFD':function(){var _0x38fdf3=SOCKFS[_0x1aea('0x231')](SYSCALLS[_0x1aea('0x14b')]());if(!_0x38fdf3)throw new FS[(_0x1aea('0xe5'))](ERRNO_CODES[_0x1aea('0x232')]);return _0x38fdf3;},'getSocketAddress':function(_0x225a7b){var _0x16810c=SYSCALLS[_0x1aea('0x14b')](),_0x540d66=SYSCALLS[_0x1aea('0x14b')]();if(_0x225a7b&&_0x16810c===0x0)return null;var _0x6a5323=__read_sockaddr(_0x16810c,_0x540d66);if(_0x6a5323[_0x1aea('0x16e')])throw new FS['ErrnoError'](_0x6a5323[_0x1aea('0x16e')]);_0x6a5323[_0x1aea('0x233')]=DNS[_0x1aea('0x234')](_0x6a5323[_0x1aea('0x233')])||_0x6a5323[_0x1aea('0x233')];return _0x6a5323;},'get64':function(){var _0x15b0ff=SYSCALLS[_0x1aea('0x14b')](),_0x1e41cc=SYSCALLS[_0x1aea('0x14b')]();return _0x15b0ff;},'getZero':function(){SYSCALLS[_0x1aea('0x14b')]();}};function ___syscall140(_0x36fc41,_0x386403){SYSCALLS['varargs']=_0x386403;try{var _0x3e274e=SYSCALLS[_0x1aea('0x235')](),_0x5b9e49=SYSCALLS[_0x1aea('0x14b')](),_0x42b356=SYSCALLS[_0x1aea('0x14b')](),_0x4551bc=SYSCALLS[_0x1aea('0x14b')](),_0xf679b2=SYSCALLS['get']();if(!(_0x5b9e49==-0x1&&_0x42b356<0x0)&&!(_0x5b9e49==0x0&&_0x42b356>=0x0)){return-ERRNO_CODES[_0x1aea('0x236')];}var _0x41f683=_0x42b356;FS['llseek'](_0x3e274e,_0x41f683,_0xf679b2);tempI64=[_0x3e274e[_0x1aea('0x182')]>>>0x0,(tempDouble=_0x3e274e[_0x1aea('0x182')],+Math_abs(tempDouble)>=0x1?tempDouble>0x0?(Math_min(+Math_floor(tempDouble/0x100000000),0xffffffff)|0x0)>>>0x0:~~+Math_ceil((tempDouble-+(~~tempDouble>>>0x0))/0x100000000)>>>0x0:0x0)],HEAP32[_0x4551bc>>0x2]=tempI64[0x0],HEAP32[_0x4551bc+0x4>>0x2]=tempI64[0x1];if(_0x3e274e[_0x1aea('0x1cd')]&&_0x41f683===0x0&&_0xf679b2===0x0)_0x3e274e[_0x1aea('0x1cd')]=null;return 0x0;}catch(_0x516cba){if(typeof FS==='undefined'||!(_0x516cba instanceof FS['ErrnoError']))abort(_0x516cba);return-_0x516cba[_0x1aea('0x16e')];}}function ___syscall145(_0x2567bd,_0xd709fe){SYSCALLS[_0x1aea('0x230')]=_0xd709fe;try{var _0x2df381=SYSCALLS[_0x1aea('0x235')](),_0x25279e=SYSCALLS[_0x1aea('0x14b')](),_0x6c3297=SYSCALLS[_0x1aea('0x14b')]();return SYSCALLS[_0x1aea('0x237')](_0x2df381,_0x25279e,_0x6c3297);}catch(_0x509a09){if(typeof FS===_0x1aea('0x1')||!(_0x509a09 instanceof FS[_0x1aea('0xe5')]))abort(_0x509a09);return-_0x509a09[_0x1aea('0x16e')];}}function ___syscall146(_0x55353c,_0x454e6e){SYSCALLS[_0x1aea('0x230')]=_0x454e6e;try{var _0x239245=SYSCALLS[_0x1aea('0x235')](),_0x7add64=SYSCALLS[_0x1aea('0x14b')](),_0x3fd941=SYSCALLS['get']();return SYSCALLS[_0x1aea('0x238')](_0x239245,_0x7add64,_0x3fd941);}catch(_0x9618a7){if(typeof FS===_0x1aea('0x1')||!(_0x9618a7 instanceof FS[_0x1aea('0xe5')]))abort(_0x9618a7);return-_0x9618a7[_0x1aea('0x16e')];}}function ___syscall221(_0x2c47c5,_0x172a7f){SYSCALLS[_0x1aea('0x230')]=_0x172a7f;try{var _0x57bd05=SYSCALLS[_0x1aea('0x235')](),_0x23821f=SYSCALLS[_0x1aea('0x14b')]();switch(_0x23821f){case 0x0:{var _0x1288e0=SYSCALLS[_0x1aea('0x14b')]();if(_0x1288e0<0x0){return-ERRNO_CODES[_0x1aea('0x22e')];}var _0x27cc42;_0x27cc42=FS[_0x1aea('0xf')](_0x57bd05[_0x1aea('0x4c')],_0x57bd05[_0x1aea('0x17e')],0x0,_0x1288e0);return _0x27cc42['fd'];}case 0x1:case 0x2:return 0x0;case 0x3:return _0x57bd05[_0x1aea('0x17e')];case 0x4:{var _0x1288e0=SYSCALLS['get']();_0x57bd05[_0x1aea('0x17e')]|=_0x1288e0;return 0x0;}case 0xc:{var _0x1288e0=SYSCALLS[_0x1aea('0x14b')]();var _0x44c4ad=0x0;HEAP16[_0x1288e0+_0x44c4ad>>0x1]=0x2;return 0x0;}case 0xd:case 0xe:return 0x0;case 0x10:case 0x8:return-ERRNO_CODES[_0x1aea('0x22e')];case 0x9:___setErrNo(ERRNO_CODES[_0x1aea('0x22e')]);return-0x1;default:{return-ERRNO_CODES[_0x1aea('0x22e')];}}}catch(_0x44cf70){if(typeof FS===_0x1aea('0x1')||!(_0x44cf70 instanceof FS[_0x1aea('0xe5')]))abort(_0x44cf70);return-_0x44cf70[_0x1aea('0x16e')];}}function ___syscall5(_0x4a428e,_0x4d797b){SYSCALLS[_0x1aea('0x230')]=_0x4d797b;try{var _0x475d54=SYSCALLS[_0x1aea('0x239')](),_0x5a8e07=SYSCALLS['get'](),_0x48d7d7=SYSCALLS[_0x1aea('0x14b')]();var _0x40d5f6=FS[_0x1aea('0xf')](_0x475d54,_0x5a8e07,_0x48d7d7);return _0x40d5f6['fd'];}catch(_0x32c289){if(typeof FS===_0x1aea('0x1')||!(_0x32c289 instanceof FS[_0x1aea('0xe5')]))abort(_0x32c289);return-_0x32c289['errno'];}}function ___syscall54(_0x154d22,_0xff61ce){SYSCALLS[_0x1aea('0x230')]=_0xff61ce;try{var _0x3e7512=SYSCALLS[_0x1aea('0x235')](),_0x26fd99=SYSCALLS['get']();switch(_0x26fd99){case 0x5405:case 0x5401:{if(!_0x3e7512[_0x1aea('0xe6')])return-ERRNO_CODES[_0x1aea('0x23a')];return 0x0;}case 0x5406:case 0x5407:case 0x5408:case 0x5402:case 0x5403:case 0x5404:{if(!_0x3e7512['tty'])return-ERRNO_CODES[_0x1aea('0x23a')];return 0x0;}case 0x540f:{if(!_0x3e7512[_0x1aea('0xe6')])return-ERRNO_CODES[_0x1aea('0x23a')];var _0x18c584=SYSCALLS['get']();HEAP32[_0x18c584>>0x2]=0x0;return 0x0;}case 0x5410:{if(!_0x3e7512[_0x1aea('0xe6')])return-ERRNO_CODES[_0x1aea('0x23a')];return-ERRNO_CODES[_0x1aea('0x22e')];}case 0x541b:{var _0x18c584=SYSCALLS[_0x1aea('0x14b')]();return FS[_0x1aea('0x1d4')](_0x3e7512,_0x26fd99,_0x18c584);}case 0x5413:{if(!_0x3e7512['tty'])return-ERRNO_CODES[_0x1aea('0x23a')];return 0x0;}case 0x5414:{if(!_0x3e7512[_0x1aea('0xe6')])return-ERRNO_CODES[_0x1aea('0x23a')];return 0x0;}default:abort(_0x1aea('0x23b')+_0x26fd99);}}catch(_0x19acf6){if(typeof FS===_0x1aea('0x1')||!(_0x19acf6 instanceof FS[_0x1aea('0xe5')]))abort(_0x19acf6);return-_0x19acf6[_0x1aea('0x16e')];}}function ___syscall6(_0x41fed7,_0x172fda){SYSCALLS[_0x1aea('0x230')]=_0x172fda;try{var _0x2730ec=SYSCALLS[_0x1aea('0x235')]();FS['close'](_0x2730ec);return 0x0;}catch(_0x2a4340){if(typeof FS===_0x1aea('0x1')||!(_0x2a4340 instanceof FS['ErrnoError']))abort(_0x2a4340);return-_0x2a4340['errno'];}}function ___unlock(){}var tupleRegistrations={};function runDestructors(_0x5301cd){while(_0x5301cd[_0x1aea('0x39')]){var _0x1e551=_0x5301cd[_0x1aea('0x138')]();var _0x56c365=_0x5301cd[_0x1aea('0x138')]();_0x56c365(_0x1e551);}}function simpleReadValueFromPointer(_0x524d8b){return this[_0x1aea('0x23c')](HEAPU32[_0x524d8b>>0x2]);}var awaitingDependencies={};var registeredTypes={};var typeDependencies={};var char_0=0x30;var char_9=0x39;function makeLegalFunctionName(_0x2b728e){if(undefined===_0x2b728e){return'_unknown';}_0x2b728e=_0x2b728e[_0x1aea('0x52')](/[^a-zA-Z0-9_]/g,'$');var _0x2bc8c9=_0x2b728e[_0x1aea('0x84')](0x0);if(_0x2bc8c9>=char_0&&_0x2bc8c9<=char_9){return'_'+_0x2b728e;}else{return _0x2b728e;}}function createNamedFunction(_0x265947,_0x1edeb0){_0x265947=makeLegalFunctionName(_0x265947);return new Function(_0x1aea('0x23d'),_0x1aea('0x23e')+_0x265947+_0x1aea('0x23f')+'\x20\x20\x20\x20\x22use\x20strict\x22;'+_0x1aea('0x240')+_0x1aea('0x241'))(_0x1edeb0);}function extendError(_0x3da547,_0x304c3){var _0x444354=createNamedFunction(_0x304c3,function(_0x30746f){this[_0x1aea('0x2c')]=_0x304c3;this[_0x1aea('0x1b6')]=_0x30746f;var _0x112b8c=new Error(_0x30746f)[_0x1aea('0x1f6')];if(_0x112b8c!==undefined){this[_0x1aea('0x1f6')]=this[_0x1aea('0x7')]()+'\x0a'+_0x112b8c[_0x1aea('0x52')](/^Error(:[^\n]*)?\n/,'');}});_0x444354['prototype']=Object['create'](_0x3da547['prototype']);_0x444354[_0x1aea('0x2b')][_0x1aea('0x1f8')]=_0x444354;_0x444354[_0x1aea('0x2b')][_0x1aea('0x7')]=function(){if(this['message']===undefined){return this[_0x1aea('0x2c')];}else{return this[_0x1aea('0x2c')]+':\x20'+this[_0x1aea('0x1b6')];}};return _0x444354;}var InternalError=undefined;function throwInternalError(_0x3e044a){throw new InternalError(_0x3e044a);}function whenDependentTypesAreResolved(_0x1c03bb,_0x822e8a,_0x161300){_0x1c03bb[_0x1aea('0x14f')](function(_0x53c8ec){typeDependencies[_0x53c8ec]=_0x822e8a;});function _0x2c411a(_0x116f00){var _0x1b3dcf=_0x161300(_0x116f00);if(_0x1b3dcf['length']!==_0x1c03bb['length']){throwInternalError('Mismatched\x20type\x20converter\x20count');}for(var _0x56d850=0x0;_0x56d850<_0x1c03bb[_0x1aea('0x39')];++_0x56d850){registerType(_0x1c03bb[_0x56d850],_0x1b3dcf[_0x56d850]);}}var _0x437fb4=new Array(_0x822e8a[_0x1aea('0x39')]);var _0x335ea1=[];var _0x59cfa5=0x0;_0x822e8a['forEach'](function(_0x139f61,_0x217adf){if(registeredTypes['hasOwnProperty'](_0x139f61)){_0x437fb4[_0x217adf]=registeredTypes[_0x139f61];}else{_0x335ea1[_0x1aea('0x6a')](_0x139f61);if(!awaitingDependencies[_0x1aea('0x44')](_0x139f61)){awaitingDependencies[_0x139f61]=[];}awaitingDependencies[_0x139f61][_0x1aea('0x6a')](function(){_0x437fb4[_0x217adf]=registeredTypes[_0x139f61];++_0x59cfa5;if(_0x59cfa5===_0x335ea1[_0x1aea('0x39')]){_0x2c411a(_0x437fb4);}});}});if(0x0===_0x335ea1['length']){_0x2c411a(_0x437fb4);}}function __embind_finalize_value_array(_0x10a536){var _0x185eff=tupleRegistrations[_0x10a536];delete tupleRegistrations[_0x10a536];var _0xc67d82=_0x185eff[_0x1aea('0x242')];var _0x4a31ba=_0xc67d82[_0x1aea('0x39')];var _0x14ea38=_0xc67d82['map'](function(_0x246a2d){return _0x246a2d[_0x1aea('0x243')];})[_0x1aea('0x6b')](_0xc67d82[_0x1aea('0x136')](function(_0x1e71cd){return _0x1e71cd[_0x1aea('0x244')];}));var _0x34f42a=_0x185eff['rawConstructor'];var _0x32c9b8=_0x185eff[_0x1aea('0x245')];whenDependentTypesAreResolved([_0x10a536],_0x14ea38,function(_0x53a022){_0xc67d82['forEach'](function(_0x27efde,_0x1e977c){var _0x504041=_0x53a022[_0x1e977c];var _0x2de796=_0x27efde[_0x1aea('0x246')];var _0x5ae6c4=_0x27efde[_0x1aea('0x247')];var _0x41192c=_0x53a022[_0x1e977c+_0x4a31ba];var _0x5d59f6=_0x27efde[_0x1aea('0x248')];var _0x1a2c14=_0x27efde['setterContext'];_0x27efde[_0x1aea('0x4b')]=function(_0x7fa81){return _0x504041['fromWireType'](_0x2de796(_0x5ae6c4,_0x7fa81));};_0x27efde[_0x1aea('0x104')]=function(_0x4df026,_0x1c5bab){var _0x21b8d3=[];_0x5d59f6(_0x1a2c14,_0x4df026,_0x41192c[_0x1aea('0x249')](_0x21b8d3,_0x1c5bab));runDestructors(_0x21b8d3);};});return[{'name':_0x185eff[_0x1aea('0x2c')],'fromWireType':function(_0x25f78a){var _0x1f0d34=new Array(_0x4a31ba);for(var _0x5b2a75=0x0;_0x5b2a75<_0x4a31ba;++_0x5b2a75){_0x1f0d34[_0x5b2a75]=_0xc67d82[_0x5b2a75][_0x1aea('0x4b')](_0x25f78a);}_0x32c9b8(_0x25f78a);return _0x1f0d34;},'toWireType':function(_0x1ffd72,_0x1d0d8a){if(_0x4a31ba!==_0x1d0d8a[_0x1aea('0x39')]){throw new TypeError(_0x1aea('0x24a')+_0x185eff['name']+_0x1aea('0x24b')+_0x4a31ba+',\x20actual='+_0x1d0d8a[_0x1aea('0x39')]);}var _0x8ddab7=_0x34f42a();for(var _0x55c429=0x0;_0x55c429<_0x4a31ba;++_0x55c429){_0xc67d82[_0x55c429][_0x1aea('0x104')](_0x8ddab7,_0x1d0d8a[_0x55c429]);}if(_0x1ffd72!==null){_0x1ffd72[_0x1aea('0x6a')](_0x32c9b8,_0x8ddab7);}return _0x8ddab7;},'argPackAdvance':0x8,'readValueFromPointer':simpleReadValueFromPointer,'destructorFunction':_0x32c9b8}];});}var structRegistrations={};function __embind_finalize_value_object(_0x3b0091){var _0x133e9d=structRegistrations[_0x3b0091];delete structRegistrations[_0x3b0091];var _0x1f0070=_0x133e9d[_0x1aea('0x24c')];var _0x5663d1=_0x133e9d['rawDestructor'];var _0x2ad408=_0x133e9d[_0x1aea('0x24d')];var _0x9984dc=_0x2ad408[_0x1aea('0x136')](function(_0x44646a){return _0x44646a[_0x1aea('0x243')];})[_0x1aea('0x6b')](_0x2ad408[_0x1aea('0x136')](function(_0x302fda){return _0x302fda[_0x1aea('0x244')];}));whenDependentTypesAreResolved([_0x3b0091],_0x9984dc,function(_0x4d5a83){var _0x5a0448={};_0x2ad408[_0x1aea('0x14f')](function(_0x323608,_0x13bc34){var _0x571aab=_0x323608[_0x1aea('0x24e')];var _0x46774c=_0x4d5a83[_0x13bc34];var _0x1c4cb0=_0x323608['getter'];var _0x2c30ff=_0x323608['getterContext'];var _0x4fbf37=_0x4d5a83[_0x13bc34+_0x2ad408[_0x1aea('0x39')]];var _0x942ff2=_0x323608[_0x1aea('0x248')];var _0x2e7bd7=_0x323608[_0x1aea('0x24f')];_0x5a0448[_0x571aab]={'read':function(_0x2a06ff){return _0x46774c[_0x1aea('0x23c')](_0x1c4cb0(_0x2c30ff,_0x2a06ff));},'write':function(_0x526069,_0x47577e){var _0x3aad8e=[];_0x942ff2(_0x2e7bd7,_0x526069,_0x4fbf37[_0x1aea('0x249')](_0x3aad8e,_0x47577e));runDestructors(_0x3aad8e);}};});return[{'name':_0x133e9d[_0x1aea('0x2c')],'fromWireType':function(_0x4c22c6){var _0x3ce27f={};for(var _0x36d227 in _0x5a0448){_0x3ce27f[_0x36d227]=_0x5a0448[_0x36d227][_0x1aea('0x4b')](_0x4c22c6);}_0x5663d1(_0x4c22c6);return _0x3ce27f;},'toWireType':function(_0x2fc99a,_0x2445c6){for(var _0x38463e in _0x5a0448){if(!(_0x38463e in _0x2445c6)){throw new TypeError(_0x1aea('0x250'));}}var _0x4f5f4f=_0x1f0070();for(_0x38463e in _0x5a0448){_0x5a0448[_0x38463e]['write'](_0x4f5f4f,_0x2445c6[_0x38463e]);}if(_0x2fc99a!==null){_0x2fc99a[_0x1aea('0x6a')](_0x5663d1,_0x4f5f4f);}return _0x4f5f4f;},'argPackAdvance':0x8,'readValueFromPointer':simpleReadValueFromPointer,'destructorFunction':_0x5663d1}];});}function getShiftFromSize(_0x3a2e1c){switch(_0x3a2e1c){case 0x1:return 0x0;case 0x2:return 0x1;case 0x4:return 0x2;case 0x8:return 0x3;default:throw new TypeError(_0x1aea('0x251')+_0x3a2e1c);}}function embind_init_charCodes(){var _0x35011c=new Array(0x100);for(var _0x453b9c=0x0;_0x453b9c<0x100;++_0x453b9c){_0x35011c[_0x453b9c]=String[_0x1aea('0x81')](_0x453b9c);}embind_charCodes=_0x35011c;}var embind_charCodes=undefined;function readLatin1String(_0x54425d){var _0x27aa50='';var _0x1c81b3=_0x54425d;while(HEAPU8[_0x1c81b3]){_0x27aa50+=embind_charCodes[HEAPU8[_0x1c81b3++]];}return _0x27aa50;}var BindingError=undefined;function throwBindingError(_0x34e198){throw new BindingError(_0x34e198);}function registerType(_0x5bea5b,_0x1245c3,_0x31d800){_0x31d800=_0x31d800||{};if(!(_0x1aea('0x252')in _0x1245c3)){throw new TypeError(_0x1aea('0x253'));}var _0x3f759d=_0x1245c3[_0x1aea('0x2c')];if(!_0x5bea5b){throwBindingError(_0x1aea('0x254')+_0x3f759d+_0x1aea('0x255'));}if(registeredTypes[_0x1aea('0x44')](_0x5bea5b)){if(_0x31d800[_0x1aea('0x256')]){return;}else{throwBindingError('Cannot\x20register\x20type\x20\x27'+_0x3f759d+_0x1aea('0x257'));}}registeredTypes[_0x5bea5b]=_0x1245c3;delete typeDependencies[_0x5bea5b];if(awaitingDependencies[_0x1aea('0x44')](_0x5bea5b)){var _0x1301c7=awaitingDependencies[_0x5bea5b];delete awaitingDependencies[_0x5bea5b];_0x1301c7['forEach'](function(_0x2a6068){_0x2a6068();});}}function __embind_register_bool(_0x3b046e,_0x2b1bf0,_0x5afdef,_0x57b7d9,_0x13f8fc){var _0x3206e2=getShiftFromSize(_0x5afdef);_0x2b1bf0=readLatin1String(_0x2b1bf0);registerType(_0x3b046e,{'name':_0x2b1bf0,'fromWireType':function(_0x8874b1){return!!_0x8874b1;},'toWireType':function(_0x5add11,_0x109061){return _0x109061?_0x57b7d9:_0x13f8fc;},'argPackAdvance':0x8,'readValueFromPointer':function(_0x149ef9){var _0x225f65;if(_0x5afdef===0x1){_0x225f65=HEAP8;}else if(_0x5afdef===0x2){_0x225f65=HEAP16;}else if(_0x5afdef===0x4){_0x225f65=HEAP32;}else{throw new TypeError(_0x1aea('0x258')+_0x2b1bf0);}return this[_0x1aea('0x23c')](_0x225f65[_0x149ef9>>_0x3206e2]);},'destructorFunction':null});}function ClassHandle_isAliasOf(_0x1da111){if(!(this instanceof ClassHandle)){return![];}if(!(_0x1da111 instanceof ClassHandle)){return![];}var _0x37c744=this['$$'][_0x1aea('0x259')][_0x1aea('0x25a')];var _0x902126=this['$$'][_0x1aea('0x25b')];var _0x44e753=_0x1da111['$$'][_0x1aea('0x259')][_0x1aea('0x25a')];var _0x3bce9b=_0x1da111['$$'][_0x1aea('0x25b')];while(_0x37c744[_0x1aea('0x25c')]){_0x902126=_0x37c744[_0x1aea('0x25d')](_0x902126);_0x37c744=_0x37c744[_0x1aea('0x25c')];}while(_0x44e753[_0x1aea('0x25c')]){_0x3bce9b=_0x44e753[_0x1aea('0x25d')](_0x3bce9b);_0x44e753=_0x44e753[_0x1aea('0x25c')];}return _0x37c744===_0x44e753&&_0x902126===_0x3bce9b;}function shallowCopyInternalPointer(_0x37945f){return{'count':_0x37945f[_0x1aea('0x25e')],'deleteScheduled':_0x37945f['deleteScheduled'],'preservePointerOnDelete':_0x37945f['preservePointerOnDelete'],'ptr':_0x37945f[_0x1aea('0x25b')],'ptrType':_0x37945f[_0x1aea('0x259')],'smartPtr':_0x37945f[_0x1aea('0x25f')],'smartPtrType':_0x37945f[_0x1aea('0x260')]};}function throwInstanceAlreadyDeleted(_0x30972d){function _0x227019(_0x1e7ff4){return _0x1e7ff4['$$'][_0x1aea('0x259')][_0x1aea('0x25a')][_0x1aea('0x2c')];}throwBindingError(_0x227019(_0x30972d)+_0x1aea('0x261'));}function ClassHandle_clone(){if(!this['$$'][_0x1aea('0x25b')]){throwInstanceAlreadyDeleted(this);}if(this['$$']['preservePointerOnDelete']){this['$$'][_0x1aea('0x25e')][_0x1aea('0x262')]+=0x1;return this;}else{var _0x3f3760=Object[_0x1aea('0x203')](Object[_0x1aea('0x263')](this),{'$$':{'value':shallowCopyInternalPointer(this['$$'])}});_0x3f3760['$$'][_0x1aea('0x25e')][_0x1aea('0x262')]+=0x1;_0x3f3760['$$'][_0x1aea('0x264')]=![];return _0x3f3760;}}function runDestructor(_0x15fb8f){var _0x4a3d97=_0x15fb8f['$$'];if(_0x4a3d97[_0x1aea('0x25f')]){_0x4a3d97[_0x1aea('0x260')][_0x1aea('0x245')](_0x4a3d97[_0x1aea('0x25f')]);}else{_0x4a3d97[_0x1aea('0x259')]['registeredClass'][_0x1aea('0x245')](_0x4a3d97['ptr']);}}function ClassHandle_delete(){if(!this['$$'][_0x1aea('0x25b')]){throwInstanceAlreadyDeleted(this);}if(this['$$'][_0x1aea('0x264')]&&!this['$$'][_0x1aea('0x265')]){throwBindingError(_0x1aea('0x266'));}this['$$'][_0x1aea('0x25e')][_0x1aea('0x262')]-=0x1;var _0x275c63=0x0===this['$$'][_0x1aea('0x25e')][_0x1aea('0x262')];if(_0x275c63){runDestructor(this);}if(!this['$$'][_0x1aea('0x265')]){this['$$'][_0x1aea('0x25f')]=undefined;this['$$']['ptr']=undefined;}}function ClassHandle_isDeleted(){return!this['$$']['ptr'];}var delayFunction=undefined;var deletionQueue=[];function flushPendingDeletes(){while(deletionQueue[_0x1aea('0x39')]){var _0xca0ff8=deletionQueue['pop']();_0xca0ff8['$$'][_0x1aea('0x264')]=![];_0xca0ff8[_0x1aea('0x14d')]();}}function ClassHandle_deleteLater(){if(!this['$$']['ptr']){throwInstanceAlreadyDeleted(this);}if(this['$$'][_0x1aea('0x264')]&&!this['$$'][_0x1aea('0x265')]){throwBindingError(_0x1aea('0x266'));}deletionQueue[_0x1aea('0x6a')](this);if(deletionQueue[_0x1aea('0x39')]===0x1&&delayFunction){delayFunction(flushPendingDeletes);}this['$$'][_0x1aea('0x264')]=!![];return this;}function init_ClassHandle(){ClassHandle[_0x1aea('0x2b')]['isAliasOf']=ClassHandle_isAliasOf;ClassHandle[_0x1aea('0x2b')]['clone']=ClassHandle_clone;ClassHandle[_0x1aea('0x2b')][_0x1aea('0x14d')]=ClassHandle_delete;ClassHandle[_0x1aea('0x2b')][_0x1aea('0x267')]=ClassHandle_isDeleted;ClassHandle['prototype'][_0x1aea('0x268')]=ClassHandle_deleteLater;}function ClassHandle(){}var registeredPointers={};function ensureOverloadTable(_0x58c594,_0x76faec,_0x20d6f1){if(undefined===_0x58c594[_0x76faec][_0x1aea('0x269')]){var _0x2ae4fe=_0x58c594[_0x76faec];_0x58c594[_0x76faec]=function(){if(!_0x58c594[_0x76faec][_0x1aea('0x269')][_0x1aea('0x44')](arguments[_0x1aea('0x39')])){throwBindingError(_0x1aea('0x26a')+_0x20d6f1+'\x27\x20called\x20with\x20an\x20invalid\x20number\x20of\x20arguments\x20('+arguments[_0x1aea('0x39')]+_0x1aea('0x26b')+_0x58c594[_0x76faec][_0x1aea('0x269')]+')!');}return _0x58c594[_0x76faec][_0x1aea('0x269')][arguments[_0x1aea('0x39')]][_0x1aea('0x72')](this,arguments);};_0x58c594[_0x76faec][_0x1aea('0x269')]=[];_0x58c594[_0x76faec][_0x1aea('0x269')][_0x2ae4fe['argCount']]=_0x2ae4fe;}}function exposePublicSymbol(_0x3e6b52,_0x12ac6f,_0x489f27){if(Module['hasOwnProperty'](_0x3e6b52)){if(undefined===_0x489f27||undefined!==Module[_0x3e6b52][_0x1aea('0x269')]&&undefined!==Module[_0x3e6b52][_0x1aea('0x269')][_0x489f27]){throwBindingError(_0x1aea('0x26c')+_0x3e6b52+_0x1aea('0x257'));}ensureOverloadTable(Module,_0x3e6b52,_0x3e6b52);if(Module[_0x1aea('0x44')](_0x489f27)){throwBindingError(_0x1aea('0x26d')+_0x489f27+')!');}Module[_0x3e6b52][_0x1aea('0x269')][_0x489f27]=_0x12ac6f;}else{Module[_0x3e6b52]=_0x12ac6f;if(undefined!==_0x489f27){Module[_0x3e6b52][_0x1aea('0x26e')]=_0x489f27;}}}function RegisteredClass(_0x512b49,_0x295a96,_0xa4f6fb,_0x1dec1a,_0x2b7c2f,_0x47b9db,_0x6edba4,_0x132afe){this[_0x1aea('0x2c')]=_0x512b49;this['constructor']=_0x295a96;this[_0x1aea('0x26f')]=_0xa4f6fb;this[_0x1aea('0x245')]=_0x1dec1a;this[_0x1aea('0x25c')]=_0x2b7c2f;this[_0x1aea('0x270')]=_0x47b9db;this[_0x1aea('0x25d')]=_0x6edba4;this[_0x1aea('0x271')]=_0x132afe;this['pureVirtualFunctions']=[];}function upcastPointer(_0x53c1eb,_0x11d576,_0x4678e0){while(_0x11d576!==_0x4678e0){if(!_0x11d576['upcast']){throwBindingError('Expected\x20null\x20or\x20instance\x20of\x20'+_0x4678e0['name']+_0x1aea('0x272')+_0x11d576[_0x1aea('0x2c')]);}_0x53c1eb=_0x11d576['upcast'](_0x53c1eb);_0x11d576=_0x11d576[_0x1aea('0x25c')];}return _0x53c1eb;}function constNoSmartPtrRawPointerToWireType(_0xbb4c09,_0x437689){if(_0x437689===null){if(this[_0x1aea('0x273')]){throwBindingError(_0x1aea('0x274')+this['name']);}return 0x0;}if(!_0x437689['$$']){throwBindingError(_0x1aea('0x275')+_embind_repr(_0x437689)+_0x1aea('0x276')+this[_0x1aea('0x2c')]);}if(!_0x437689['$$'][_0x1aea('0x25b')]){throwBindingError(_0x1aea('0x277')+this['name']);}var _0x25bbf7=_0x437689['$$'][_0x1aea('0x259')][_0x1aea('0x25a')];var _0x113450=upcastPointer(_0x437689['$$'][_0x1aea('0x25b')],_0x25bbf7,this[_0x1aea('0x25a')]);return _0x113450;}function genericPointerToWireType(_0x3b65c5,_0x254196){var _0x2f69fe;if(_0x254196===null){if(this[_0x1aea('0x273')]){throwBindingError('null\x20is\x20not\x20a\x20valid\x20'+this[_0x1aea('0x2c')]);}if(this[_0x1aea('0x278')]){_0x2f69fe=this[_0x1aea('0x24c')]();if(_0x3b65c5!==null){_0x3b65c5['push'](this[_0x1aea('0x245')],_0x2f69fe);}return _0x2f69fe;}else{return 0x0;}}if(!_0x254196['$$']){throwBindingError(_0x1aea('0x275')+_embind_repr(_0x254196)+'\x22\x20as\x20a\x20'+this[_0x1aea('0x2c')]);}if(!_0x254196['$$'][_0x1aea('0x25b')]){throwBindingError(_0x1aea('0x277')+this['name']);}if(!this[_0x1aea('0x279')]&&_0x254196['$$']['ptrType']['isConst']){throwBindingError(_0x1aea('0x27a')+(_0x254196['$$'][_0x1aea('0x260')]?_0x254196['$$']['smartPtrType']['name']:_0x254196['$$']['ptrType'][_0x1aea('0x2c')])+'\x20to\x20parameter\x20type\x20'+this[_0x1aea('0x2c')]);}var _0x3f0fd2=_0x254196['$$'][_0x1aea('0x259')][_0x1aea('0x25a')];_0x2f69fe=upcastPointer(_0x254196['$$'][_0x1aea('0x25b')],_0x3f0fd2,this[_0x1aea('0x25a')]);if(this[_0x1aea('0x278')]){if(undefined===_0x254196['$$']['smartPtr']){throwBindingError(_0x1aea('0x27b'));}switch(this[_0x1aea('0x27c')]){case 0x0:if(_0x254196['$$'][_0x1aea('0x260')]===this){_0x2f69fe=_0x254196['$$'][_0x1aea('0x25f')];}else{throwBindingError(_0x1aea('0x27a')+(_0x254196['$$'][_0x1aea('0x260')]?_0x254196['$$'][_0x1aea('0x260')][_0x1aea('0x2c')]:_0x254196['$$'][_0x1aea('0x259')][_0x1aea('0x2c')])+_0x1aea('0x27d')+this[_0x1aea('0x2c')]);}break;case 0x1:_0x2f69fe=_0x254196['$$'][_0x1aea('0x25f')];break;case 0x2:if(_0x254196['$$'][_0x1aea('0x260')]===this){_0x2f69fe=_0x254196['$$'][_0x1aea('0x25f')];}else{var _0x421e93=_0x254196[_0x1aea('0x27e')]();_0x2f69fe=this[_0x1aea('0x27f')](_0x2f69fe,__emval_register(function(){_0x421e93[_0x1aea('0x14d')]();}));if(_0x3b65c5!==null){_0x3b65c5[_0x1aea('0x6a')](this[_0x1aea('0x245')],_0x2f69fe);}}break;default:throwBindingError(_0x1aea('0x280'));}}return _0x2f69fe;}function nonConstNoSmartPtrRawPointerToWireType(_0x41a9a3,_0x3dad59){if(_0x3dad59===null){if(this[_0x1aea('0x273')]){throwBindingError(_0x1aea('0x274')+this['name']);}return 0x0;}if(!_0x3dad59['$$']){throwBindingError(_0x1aea('0x275')+_embind_repr(_0x3dad59)+'\x22\x20as\x20a\x20'+this[_0x1aea('0x2c')]);}if(!_0x3dad59['$$']['ptr']){throwBindingError(_0x1aea('0x277')+this[_0x1aea('0x2c')]);}if(_0x3dad59['$$']['ptrType']['isConst']){throwBindingError(_0x1aea('0x27a')+_0x3dad59['$$']['ptrType']['name']+_0x1aea('0x27d')+this[_0x1aea('0x2c')]);}var _0x5bfa59=_0x3dad59['$$'][_0x1aea('0x259')][_0x1aea('0x25a')];var _0x2cebdf=upcastPointer(_0x3dad59['$$'][_0x1aea('0x25b')],_0x5bfa59,this['registeredClass']);return _0x2cebdf;}function RegisteredPointer_getPointee(_0x3e3abb){if(this[_0x1aea('0x281')]){_0x3e3abb=this['rawGetPointee'](_0x3e3abb);}return _0x3e3abb;}function RegisteredPointer_destructor(_0x58f0e0){if(this[_0x1aea('0x245')]){this[_0x1aea('0x245')](_0x58f0e0);}}function RegisteredPointer_deleteObject(_0x47da4b){if(_0x47da4b!==null){_0x47da4b['delete']();}}function downcastPointer(_0x822bba,_0x4de5df,_0x85615c){if(_0x4de5df===_0x85615c){return _0x822bba;}if(undefined===_0x85615c[_0x1aea('0x25c')]){return null;}var _0x253fa8=downcastPointer(_0x822bba,_0x4de5df,_0x85615c[_0x1aea('0x25c')]);if(_0x253fa8===null){return null;}return _0x85615c[_0x1aea('0x271')](_0x253fa8);}function getInheritedInstanceCount(){return Object[_0x1aea('0x14e')](registeredInstances)[_0x1aea('0x39')];}function getLiveInheritedInstances(){var _0x5e63fa=[];for(var _0xf4e739 in registeredInstances){if(registeredInstances[_0x1aea('0x44')](_0xf4e739)){_0x5e63fa[_0x1aea('0x6a')](registeredInstances[_0xf4e739]);}}return _0x5e63fa;}function setDelayFunction(_0x22f06b){delayFunction=_0x22f06b;if(deletionQueue['length']&&delayFunction){delayFunction(flushPendingDeletes);}}function init_embind(){Module[_0x1aea('0x282')]=getInheritedInstanceCount;Module[_0x1aea('0x283')]=getLiveInheritedInstances;Module[_0x1aea('0x284')]=flushPendingDeletes;Module[_0x1aea('0x285')]=setDelayFunction;}var registeredInstances={};function getBasestPointer(_0x213e9d,_0x198fdf){if(_0x198fdf===undefined){throwBindingError(_0x1aea('0x286'));}while(_0x213e9d[_0x1aea('0x25c')]){_0x198fdf=_0x213e9d[_0x1aea('0x25d')](_0x198fdf);_0x213e9d=_0x213e9d[_0x1aea('0x25c')];}return _0x198fdf;}function getInheritedInstance(_0x3aa839,_0x3c231d){_0x3c231d=getBasestPointer(_0x3aa839,_0x3c231d);return registeredInstances[_0x3c231d];}function makeClassHandle(_0xf1ad2d,_0x582def){if(!_0x582def[_0x1aea('0x259')]||!_0x582def[_0x1aea('0x25b')]){throwInternalError(_0x1aea('0x287'));}var _0x3c7b5c=!!_0x582def['smartPtrType'];var _0x5e0340=!!_0x582def[_0x1aea('0x25f')];if(_0x3c7b5c!==_0x5e0340){throwInternalError(_0x1aea('0x288'));}_0x582def[_0x1aea('0x25e')]={'value':0x1};return Object[_0x1aea('0x203')](_0xf1ad2d,{'$$':{'value':_0x582def}});}function RegisteredPointer_fromWireType(_0x27bb93){var _0x1d79fc=this[_0x1aea('0x289')](_0x27bb93);if(!_0x1d79fc){this[_0x1aea('0xcf')](_0x27bb93);return null;}var _0x3bfd8b=getInheritedInstance(this['registeredClass'],_0x1d79fc);if(undefined!==_0x3bfd8b){if(0x0===_0x3bfd8b['$$'][_0x1aea('0x25e')]['value']){_0x3bfd8b['$$']['ptr']=_0x1d79fc;_0x3bfd8b['$$'][_0x1aea('0x25f')]=_0x27bb93;return _0x3bfd8b[_0x1aea('0x27e')]();}else{var _0x30350f=_0x3bfd8b[_0x1aea('0x27e')]();this[_0x1aea('0xcf')](_0x27bb93);return _0x30350f;}}function _0x339ea3(){if(this[_0x1aea('0x278')]){return makeClassHandle(this[_0x1aea('0x25a')][_0x1aea('0x26f')],{'ptrType':this[_0x1aea('0x28a')],'ptr':_0x1d79fc,'smartPtrType':this,'smartPtr':_0x27bb93});}else{return makeClassHandle(this['registeredClass'][_0x1aea('0x26f')],{'ptrType':this,'ptr':_0x27bb93});}}var _0x48b966=this[_0x1aea('0x25a')]['getActualType'](_0x1d79fc);var _0x335ee3=registeredPointers[_0x48b966];if(!_0x335ee3){return _0x339ea3[_0x1aea('0x71')](this);}var _0x13dd09;if(this[_0x1aea('0x279')]){_0x13dd09=_0x335ee3['constPointerType'];}else{_0x13dd09=_0x335ee3[_0x1aea('0x28b')];}var _0x6aa1f2=downcastPointer(_0x1d79fc,this['registeredClass'],_0x13dd09[_0x1aea('0x25a')]);if(_0x6aa1f2===null){return _0x339ea3[_0x1aea('0x71')](this);}if(this[_0x1aea('0x278')]){return makeClassHandle(_0x13dd09[_0x1aea('0x25a')][_0x1aea('0x26f')],{'ptrType':_0x13dd09,'ptr':_0x6aa1f2,'smartPtrType':this,'smartPtr':_0x27bb93});}else{return makeClassHandle(_0x13dd09[_0x1aea('0x25a')]['instancePrototype'],{'ptrType':_0x13dd09,'ptr':_0x6aa1f2});}}function init_RegisteredPointer(){RegisteredPointer[_0x1aea('0x2b')][_0x1aea('0x289')]=RegisteredPointer_getPointee;RegisteredPointer['prototype'][_0x1aea('0xcf')]=RegisteredPointer_destructor;RegisteredPointer[_0x1aea('0x2b')][_0x1aea('0x252')]=0x8;RegisteredPointer[_0x1aea('0x2b')][_0x1aea('0x28c')]=simpleReadValueFromPointer;RegisteredPointer[_0x1aea('0x2b')]['deleteObject']=RegisteredPointer_deleteObject;RegisteredPointer[_0x1aea('0x2b')][_0x1aea('0x23c')]=RegisteredPointer_fromWireType;}function RegisteredPointer(_0x39d206,_0x5ed093,_0x1e4fda,_0x1d9b90,_0x4ae3b3,_0xee1d11,_0xa7e757,_0x324904,_0xa8898f,_0x53f981,_0x2ad266){this['name']=_0x39d206;this['registeredClass']=_0x5ed093;this[_0x1aea('0x273')]=_0x1e4fda;this[_0x1aea('0x279')]=_0x1d9b90;this[_0x1aea('0x278')]=_0x4ae3b3;this[_0x1aea('0x28a')]=_0xee1d11;this[_0x1aea('0x27c')]=_0xa7e757;this[_0x1aea('0x281')]=_0x324904;this[_0x1aea('0x24c')]=_0xa8898f;this[_0x1aea('0x27f')]=_0x53f981;this[_0x1aea('0x245')]=_0x2ad266;if(!_0x4ae3b3&&_0x5ed093[_0x1aea('0x25c')]===undefined){if(_0x1d9b90){this[_0x1aea('0x249')]=constNoSmartPtrRawPointerToWireType;this[_0x1aea('0x28d')]=null;}else{this[_0x1aea('0x249')]=nonConstNoSmartPtrRawPointerToWireType;this[_0x1aea('0x28d')]=null;}}else{this[_0x1aea('0x249')]=genericPointerToWireType;}}function replacePublicSymbol(_0x3e9664,_0x5330fe,_0x3934c2){if(!Module[_0x1aea('0x44')](_0x3e9664)){throwInternalError(_0x1aea('0x28e'));}if(undefined!==Module[_0x3e9664][_0x1aea('0x269')]&&undefined!==_0x3934c2){Module[_0x3e9664][_0x1aea('0x269')][_0x3934c2]=_0x5330fe;}else{Module[_0x3e9664]=_0x5330fe;Module[_0x3e9664][_0x1aea('0x28f')]=_0x3934c2;}}function embind__requireFunction(_0x5f03f8,_0x5d69fa){_0x5f03f8=readLatin1String(_0x5f03f8);function _0x7bc5a0(_0x5e88fc){var _0xee8989=[];for(var _0x411bb1=0x1;_0x411bb1<_0x5f03f8[_0x1aea('0x39')];++_0x411bb1){_0xee8989[_0x1aea('0x6a')]('a'+_0x411bb1);}var _0x418809=_0x1aea('0x73')+_0x5f03f8+'_'+_0x5d69fa;var _0x10bb10=_0x1aea('0x23e')+_0x418809+'('+_0xee8989[_0x1aea('0xdc')](',\x20')+')\x20{\x0a';_0x10bb10+=_0x1aea('0x290')+(_0xee8989['length']?',\x20':'')+_0xee8989[_0x1aea('0xdc')](',\x20')+_0x1aea('0x291');_0x10bb10+=_0x1aea('0x241');return new Function('dynCall',_0x1aea('0x292'),_0x10bb10)(_0x5e88fc,_0x5d69fa);}var _0x20ca43;if(Module[_0x1aea('0x293')+_0x5f03f8]!==undefined){_0x20ca43=Module['FUNCTION_TABLE_'+_0x5f03f8][_0x5d69fa];}else if(typeof FUNCTION_TABLE!==_0x1aea('0x1')){_0x20ca43=FUNCTION_TABLE[_0x5d69fa];}else{var _0xd78322=Module['dynCall_'+_0x5f03f8];if(_0xd78322===undefined){_0xd78322=Module[_0x1aea('0x73')+_0x5f03f8[_0x1aea('0x52')](/f/g,'d')];if(_0xd78322===undefined){throwBindingError(_0x1aea('0x294')+_0x5f03f8);}}_0x20ca43=_0x7bc5a0(_0xd78322);}if(typeof _0x20ca43!==_0x1aea('0x4a')){throwBindingError(_0x1aea('0x295')+_0x5f03f8+':\x20'+_0x5d69fa);}return _0x20ca43;}var UnboundTypeError=undefined;function getTypeName(_0x286acb){var _0x2a6108=___getTypeName(_0x286acb);var _0x337a1f=readLatin1String(_0x2a6108);_free(_0x2a6108);return _0x337a1f;}function throwUnboundTypeError(_0x3b7308,_0x10419e){var _0x614522=[];var _0x1f0f9e={};function _0xaeae1b(_0xd4b2be){if(_0x1f0f9e[_0xd4b2be]){return;}if(registeredTypes[_0xd4b2be]){return;}if(typeDependencies[_0xd4b2be]){typeDependencies[_0xd4b2be][_0x1aea('0x14f')](_0xaeae1b);return;}_0x614522[_0x1aea('0x6a')](_0xd4b2be);_0x1f0f9e[_0xd4b2be]=!![];}_0x10419e[_0x1aea('0x14f')](_0xaeae1b);throw new UnboundTypeError(_0x3b7308+':\x20'+_0x614522['map'](getTypeName)[_0x1aea('0xdc')]([',\x20']));}function __embind_register_class(_0x234a66,_0x506894,_0x401965,_0x1c8a31,_0x13a329,_0x284019,_0x2ae052,_0x39bea3,_0x456984,_0x14196a,_0x12d144,_0x26b8d7,_0x1bae9a){_0x12d144=readLatin1String(_0x12d144);_0x284019=embind__requireFunction(_0x13a329,_0x284019);if(_0x39bea3){_0x39bea3=embind__requireFunction(_0x2ae052,_0x39bea3);}if(_0x14196a){_0x14196a=embind__requireFunction(_0x456984,_0x14196a);}_0x1bae9a=embind__requireFunction(_0x26b8d7,_0x1bae9a);var _0x3796a9=makeLegalFunctionName(_0x12d144);exposePublicSymbol(_0x3796a9,function(){throwUnboundTypeError(_0x1aea('0x296')+_0x12d144+_0x1aea('0x297'),[_0x1c8a31]);});whenDependentTypesAreResolved([_0x234a66,_0x506894,_0x401965],_0x1c8a31?[_0x1c8a31]:[],function(_0x27d40c){_0x27d40c=_0x27d40c[0x0];var _0x533c70;var _0x170afb;if(_0x1c8a31){_0x533c70=_0x27d40c[_0x1aea('0x25a')];_0x170afb=_0x533c70[_0x1aea('0x26f')];}else{_0x170afb=ClassHandle['prototype'];}var _0x162ac2=createNamedFunction(_0x3796a9,function(){if(Object[_0x1aea('0x263')](this)!==_0x53e247){throw new BindingError(_0x1aea('0x298')+_0x12d144);}if(undefined===_0x4c74a9[_0x1aea('0x299')]){throw new BindingError(_0x12d144+_0x1aea('0x29a'));}var _0x5c3ff6=_0x4c74a9['constructor_body'][arguments[_0x1aea('0x39')]];if(undefined===_0x5c3ff6){throw new BindingError('Tried\x20to\x20invoke\x20ctor\x20of\x20'+_0x12d144+_0x1aea('0x29b')+arguments['length']+_0x1aea('0x29c')+Object[_0x1aea('0x14e')](_0x4c74a9[_0x1aea('0x299')])[_0x1aea('0x7')]()+')\x20parameters\x20instead!');}return _0x5c3ff6[_0x1aea('0x72')](this,arguments);});var _0x53e247=Object['create'](_0x170afb,{'constructor':{'value':_0x162ac2}});_0x162ac2[_0x1aea('0x2b')]=_0x53e247;var _0x4c74a9=new RegisteredClass(_0x12d144,_0x162ac2,_0x53e247,_0x1bae9a,_0x533c70,_0x284019,_0x39bea3,_0x14196a);var _0x1e35bf=new RegisteredPointer(_0x12d144,_0x4c74a9,!![],![],![]);var _0x17f350=new RegisteredPointer(_0x12d144+'*',_0x4c74a9,![],![],![]);var _0x75cdc4=new RegisteredPointer(_0x12d144+'\x20const*',_0x4c74a9,![],!![],![]);registeredPointers[_0x234a66]={'pointerType':_0x17f350,'constPointerType':_0x75cdc4};replacePublicSymbol(_0x3796a9,_0x162ac2);return[_0x1e35bf,_0x17f350,_0x75cdc4];});}function heap32VectorToArray(_0x53b2d4,_0x29e7a4){var _0x9f4786=[];for(var _0x2585c4=0x0;_0x2585c4<_0x53b2d4;_0x2585c4++){_0x9f4786[_0x1aea('0x6a')](HEAP32[(_0x29e7a4>>0x2)+_0x2585c4]);}return _0x9f4786;}function __embind_register_class_constructor(_0x4fc3fc,_0x3da9bd,_0x35103d,_0x5c8aea,_0x527df1,_0x52fb02){var _0x3304bc=heap32VectorToArray(_0x3da9bd,_0x35103d);_0x527df1=embind__requireFunction(_0x5c8aea,_0x527df1);whenDependentTypesAreResolved([],[_0x4fc3fc],function(_0x593b6f){_0x593b6f=_0x593b6f[0x0];var _0x446a7c=_0x1aea('0x29d')+_0x593b6f[_0x1aea('0x2c')];if(undefined===_0x593b6f['registeredClass'][_0x1aea('0x299')]){_0x593b6f[_0x1aea('0x25a')][_0x1aea('0x299')]=[];}if(undefined!==_0x593b6f[_0x1aea('0x25a')][_0x1aea('0x299')][_0x3da9bd-0x1]){throw new BindingError(_0x1aea('0x29e')+(_0x3da9bd-0x1)+')\x20for\x20class\x20\x27'+_0x593b6f['name']+_0x1aea('0x29f'));}_0x593b6f[_0x1aea('0x25a')][_0x1aea('0x299')][_0x3da9bd-0x1]=function unboundTypeHandler(){throwUnboundTypeError(_0x1aea('0x296')+_0x593b6f[_0x1aea('0x2c')]+_0x1aea('0x297'),_0x3304bc);};whenDependentTypesAreResolved([],_0x3304bc,function(_0x24fe97){_0x593b6f['registeredClass']['constructor_body'][_0x3da9bd-0x1]=function constructor_body(){if(arguments[_0x1aea('0x39')]!==_0x3da9bd-0x1){throwBindingError(_0x446a7c+'\x20called\x20with\x20'+arguments[_0x1aea('0x39')]+_0x1aea('0x2a0')+(_0x3da9bd-0x1));}var _0x347a6b=[];var _0x3a390b=new Array(_0x3da9bd);_0x3a390b[0x0]=_0x52fb02;for(var _0x418d85=0x1;_0x418d85<_0x3da9bd;++_0x418d85){_0x3a390b[_0x418d85]=_0x24fe97[_0x418d85][_0x1aea('0x249')](_0x347a6b,arguments[_0x418d85-0x1]);}var _0x1a4103=_0x527df1[_0x1aea('0x72')](null,_0x3a390b);runDestructors(_0x347a6b);return _0x24fe97[0x0][_0x1aea('0x23c')](_0x1a4103);};return[];});return[];});}function new_(_0x41d6b3,_0x28d8e7){if(!(_0x41d6b3 instanceof Function)){throw new TypeError(_0x1aea('0x2a1')+typeof _0x41d6b3+_0x1aea('0x2a2'));}var _0x2e86be=createNamedFunction(_0x41d6b3['name']||'unknownFunctionName',function(){});_0x2e86be[_0x1aea('0x2b')]=_0x41d6b3[_0x1aea('0x2b')];var _0x442c97=new _0x2e86be();var _0x525e47=_0x41d6b3[_0x1aea('0x72')](_0x442c97,_0x28d8e7);return _0x525e47 instanceof Object?_0x525e47:_0x442c97;}function craftInvokerFunction(_0x169505,_0x39171c,_0x5ddb72,_0x997f9a,_0x308f47){var _0x4695eb=_0x39171c[_0x1aea('0x39')];if(_0x4695eb<0x2){throwBindingError(_0x1aea('0x2a3'));}var _0x1114ee=_0x39171c[0x1]!==null&&_0x5ddb72!==null;var _0x1cd19b=![];for(var _0x5aaf73=0x1;_0x5aaf73<_0x39171c[_0x1aea('0x39')];++_0x5aaf73){if(_0x39171c[_0x5aaf73]!==null&&_0x39171c[_0x5aaf73][_0x1aea('0x28d')]===undefined){_0x1cd19b=!![];break;}}var _0x58e555=_0x39171c[0x0]['name']!==_0x1aea('0x2a4');var _0x109792='';var _0x5020e0='';for(var _0x5aaf73=0x0;_0x5aaf73<_0x4695eb-0x2;++_0x5aaf73){_0x109792+=(_0x5aaf73!==0x0?',\x20':'')+_0x1aea('0x95')+_0x5aaf73;_0x5020e0+=(_0x5aaf73!==0x0?',\x20':'')+_0x1aea('0x95')+_0x5aaf73+_0x1aea('0x2a5');}var _0x558cdd=_0x1aea('0x23e')+makeLegalFunctionName(_0x169505)+'('+_0x109792+_0x1aea('0x2a6')+_0x1aea('0x2a7')+(_0x4695eb-0x2)+_0x1aea('0x2a6')+_0x1aea('0x2a8')+_0x169505+_0x1aea('0x2a9')+(_0x4695eb-0x2)+_0x1aea('0x2aa')+'}\x0a';if(_0x1cd19b){_0x558cdd+='var\x20destructors\x20=\x20[];\x0a';}var _0x5d8463=_0x1cd19b?'destructors':'null';var _0x459401=[_0x1aea('0x2ab'),_0x1aea('0x2ac'),'fn','runDestructors',_0x1aea('0x2ad'),'classParam'];var _0x5cf934=[throwBindingError,_0x997f9a,_0x308f47,runDestructors,_0x39171c[0x0],_0x39171c[0x1]];if(_0x1114ee){_0x558cdd+=_0x1aea('0x2ae')+_0x5d8463+_0x1aea('0x2af');}for(var _0x5aaf73=0x0;_0x5aaf73<_0x4695eb-0x2;++_0x5aaf73){_0x558cdd+='var\x20arg'+_0x5aaf73+_0x1aea('0x2b0')+_0x5aaf73+_0x1aea('0x2b1')+_0x5d8463+',\x20arg'+_0x5aaf73+_0x1aea('0x2b2')+_0x39171c[_0x5aaf73+0x2][_0x1aea('0x2c')]+'\x0a';_0x459401[_0x1aea('0x6a')](_0x1aea('0x2b3')+_0x5aaf73);_0x5cf934[_0x1aea('0x6a')](_0x39171c[_0x5aaf73+0x2]);}if(_0x1114ee){_0x5020e0='thisWired'+(_0x5020e0[_0x1aea('0x39')]>0x0?',\x20':'')+_0x5020e0;}_0x558cdd+=(_0x58e555?_0x1aea('0x2b4'):'')+_0x1aea('0x2b5')+(_0x5020e0[_0x1aea('0x39')]>0x0?',\x20':'')+_0x5020e0+_0x1aea('0x291');if(_0x1cd19b){_0x558cdd+=_0x1aea('0x2b6');}else{for(var _0x5aaf73=_0x1114ee?0x1:0x2;_0x5aaf73<_0x39171c[_0x1aea('0x39')];++_0x5aaf73){var _0x398936=_0x5aaf73===0x1?_0x1aea('0x2b7'):_0x1aea('0x95')+(_0x5aaf73-0x2)+_0x1aea('0x2a5');if(_0x39171c[_0x5aaf73][_0x1aea('0x28d')]!==null){_0x558cdd+=_0x398936+_0x1aea('0x2b8')+_0x398936+_0x1aea('0x2b2')+_0x39171c[_0x5aaf73][_0x1aea('0x2c')]+'\x0a';_0x459401[_0x1aea('0x6a')](_0x398936+'_dtor');_0x5cf934['push'](_0x39171c[_0x5aaf73][_0x1aea('0x28d')]);}}}if(_0x58e555){_0x558cdd+=_0x1aea('0x2b9')+'return\x20ret;\x0a';}else{}_0x558cdd+='}\x0a';_0x459401[_0x1aea('0x6a')](_0x558cdd);var _0x2c988e=new_(Function,_0x459401)['apply'](null,_0x5cf934);return _0x2c988e;}function __embind_register_class_function(_0x2a3966,_0x3f16d4,_0xf8d1a5,_0x2daaa5,_0x26a409,_0x63f20d,_0x58318d,_0x224519){var _0x5ebc2e=heap32VectorToArray(_0xf8d1a5,_0x2daaa5);_0x3f16d4=readLatin1String(_0x3f16d4);_0x63f20d=embind__requireFunction(_0x26a409,_0x63f20d);whenDependentTypesAreResolved([],[_0x2a3966],function(_0x149603){_0x149603=_0x149603[0x0];var _0x18970a=_0x149603['name']+'.'+_0x3f16d4;if(_0x224519){_0x149603[_0x1aea('0x25a')][_0x1aea('0x2ba')]['push'](_0x3f16d4);}function _0x279a80(){throwUnboundTypeError(_0x1aea('0x2bb')+_0x18970a+_0x1aea('0x297'),_0x5ebc2e);}var _0x5d70ea=_0x149603[_0x1aea('0x25a')][_0x1aea('0x26f')];var _0x21766c=_0x5d70ea[_0x3f16d4];if(undefined===_0x21766c||undefined===_0x21766c[_0x1aea('0x269')]&&_0x21766c[_0x1aea('0x2bc')]!==_0x149603[_0x1aea('0x2c')]&&_0x21766c[_0x1aea('0x28f')]===_0xf8d1a5-0x2){_0x279a80[_0x1aea('0x28f')]=_0xf8d1a5-0x2;_0x279a80[_0x1aea('0x2bc')]=_0x149603[_0x1aea('0x2c')];_0x5d70ea[_0x3f16d4]=_0x279a80;}else{ensureOverloadTable(_0x5d70ea,_0x3f16d4,_0x18970a);_0x5d70ea[_0x3f16d4][_0x1aea('0x269')][_0xf8d1a5-0x2]=_0x279a80;}whenDependentTypesAreResolved([],_0x5ebc2e,function(_0x31ea5d){var _0x4f28d3=craftInvokerFunction(_0x18970a,_0x31ea5d,_0x149603,_0x63f20d,_0x58318d);if(undefined===_0x5d70ea[_0x3f16d4][_0x1aea('0x269')]){_0x4f28d3[_0x1aea('0x28f')]=_0xf8d1a5-0x2;_0x5d70ea[_0x3f16d4]=_0x4f28d3;}else{_0x5d70ea[_0x3f16d4][_0x1aea('0x269')][_0xf8d1a5-0x2]=_0x4f28d3;}return[];});return[];});}function validateThis(_0x443c51,_0x13205c,_0x1e12f9){if(!(_0x443c51 instanceof Object)){throwBindingError(_0x1e12f9+'\x20with\x20invalid\x20\x22this\x22:\x20'+_0x443c51);}if(!(_0x443c51 instanceof _0x13205c[_0x1aea('0x25a')][_0x1aea('0x1f8')])){throwBindingError(_0x1e12f9+_0x1aea('0x2bd')+_0x443c51[_0x1aea('0x1f8')]['name']);}if(!_0x443c51['$$'][_0x1aea('0x25b')]){throwBindingError(_0x1aea('0x2be')+_0x1e12f9+_0x1aea('0x2bf'));}return upcastPointer(_0x443c51['$$'][_0x1aea('0x25b')],_0x443c51['$$'][_0x1aea('0x259')][_0x1aea('0x25a')],_0x13205c[_0x1aea('0x25a')]);}function __embind_register_class_property(_0x478c83,_0x2a674c,_0x299a3f,_0x211cff,_0x39e16e,_0x1f37a3,_0x17d47c,_0x5c53a0,_0x1f3ba0,_0x39118e){_0x2a674c=readLatin1String(_0x2a674c);_0x39e16e=embind__requireFunction(_0x211cff,_0x39e16e);whenDependentTypesAreResolved([],[_0x478c83],function(_0x15752b){_0x15752b=_0x15752b[0x0];var _0x2aca71=_0x15752b[_0x1aea('0x2c')]+'.'+_0x2a674c;var _0x326f0c={'get':function(){throwUnboundTypeError(_0x1aea('0x2c0')+_0x2aca71+_0x1aea('0x297'),[_0x299a3f,_0x17d47c]);},'enumerable':!![],'configurable':!![]};if(_0x1f3ba0){_0x326f0c[_0x1aea('0x3b')]=function(){throwUnboundTypeError(_0x1aea('0x2c0')+_0x2aca71+_0x1aea('0x297'),[_0x299a3f,_0x17d47c]);};}else{_0x326f0c[_0x1aea('0x3b')]=function(_0x938fc3){throwBindingError(_0x2aca71+'\x20is\x20a\x20read-only\x20property');};}Object[_0x1aea('0x1f7')](_0x15752b[_0x1aea('0x25a')][_0x1aea('0x26f')],_0x2a674c,_0x326f0c);whenDependentTypesAreResolved([],_0x1f3ba0?[_0x299a3f,_0x17d47c]:[_0x299a3f],function(_0x48d8a1){var _0x299a3f=_0x48d8a1[0x0];var _0x326f0c={'get':function(){var _0x263dfa=validateThis(this,_0x15752b,_0x2aca71+_0x1aea('0x2c1'));return _0x299a3f[_0x1aea('0x23c')](_0x39e16e(_0x1f37a3,_0x263dfa));},'enumerable':!![]};if(_0x1f3ba0){_0x1f3ba0=embind__requireFunction(_0x5c53a0,_0x1f3ba0);var _0x17d47c=_0x48d8a1[0x1];_0x326f0c[_0x1aea('0x3b')]=function(_0x108e84){var _0xbc5bcf=validateThis(this,_0x15752b,_0x2aca71+_0x1aea('0x2c2'));var _0x2b2fe6=[];_0x1f3ba0(_0x39118e,_0xbc5bcf,_0x17d47c['toWireType'](_0x2b2fe6,_0x108e84));runDestructors(_0x2b2fe6);};}Object[_0x1aea('0x1f7')](_0x15752b[_0x1aea('0x25a')][_0x1aea('0x26f')],_0x2a674c,_0x326f0c);return[];});return[];});}function __embind_register_constant(_0x3120ef,_0x4b8a30,_0x3a4ac1){_0x3120ef=readLatin1String(_0x3120ef);whenDependentTypesAreResolved([],[_0x4b8a30],function(_0x1c218c){_0x1c218c=_0x1c218c[0x0];Module[_0x3120ef]=_0x1c218c[_0x1aea('0x23c')](_0x3a4ac1);return[];});}var emval_free_list=[];var emval_handle_array=[{},{'value':undefined},{'value':null},{'value':!![]},{'value':![]}];function __emval_decref(_0x1f73ea){if(_0x1f73ea>0x4&&0x0===--emval_handle_array[_0x1f73ea][_0x1aea('0xcd')]){emval_handle_array[_0x1f73ea]=undefined;emval_free_list[_0x1aea('0x6a')](_0x1f73ea);}}function count_emval_handles(){var _0x42d386=0x0;for(var _0x4b086c=0x5;_0x4b086c<emval_handle_array[_0x1aea('0x39')];++_0x4b086c){if(emval_handle_array[_0x4b086c]!==undefined){++_0x42d386;}}return _0x42d386;}function get_first_emval(){for(var _0x4877c7=0x5;_0x4877c7<emval_handle_array['length'];++_0x4877c7){if(emval_handle_array[_0x4877c7]!==undefined){return emval_handle_array[_0x4877c7];}}return null;}function init_emval(){Module[_0x1aea('0x2c3')]=count_emval_handles;Module['get_first_emval']=get_first_emval;}function __emval_register(_0x3d7bc4){switch(_0x3d7bc4){case undefined:{return 0x1;}case null:{return 0x2;}case!![]:{return 0x3;}case![]:{return 0x4;}default:{var _0x267fb2=emval_free_list[_0x1aea('0x39')]?emval_free_list[_0x1aea('0x138')]():emval_handle_array[_0x1aea('0x39')];emval_handle_array[_0x267fb2]={'refcount':0x1,'value':_0x3d7bc4};return _0x267fb2;}}}function __embind_register_emval(_0x510ff2,_0x33a0cd){_0x33a0cd=readLatin1String(_0x33a0cd);registerType(_0x510ff2,{'name':_0x33a0cd,'fromWireType':function(_0x377038){var _0xef349c=emval_handle_array[_0x377038]['value'];__emval_decref(_0x377038);return _0xef349c;},'toWireType':function(_0x4ddac7,_0x313142){return __emval_register(_0x313142);},'argPackAdvance':0x8,'readValueFromPointer':simpleReadValueFromPointer,'destructorFunction':null});}function enumReadValueFromPointer(_0x71de12,_0x3f471d,_0x11308a){switch(_0x3f471d){case 0x0:return function(_0xe3918f){var _0x5bf62d=_0x11308a?HEAP8:HEAPU8;return this['fromWireType'](_0x5bf62d[_0xe3918f]);};case 0x1:return function(_0x56357a){var _0x544101=_0x11308a?HEAP16:HEAPU16;return this[_0x1aea('0x23c')](_0x544101[_0x56357a>>0x1]);};case 0x2:return function(_0x354690){var _0x38d96c=_0x11308a?HEAP32:HEAPU32;return this[_0x1aea('0x23c')](_0x38d96c[_0x354690>>0x2]);};default:throw new TypeError(_0x1aea('0x2c4')+_0x71de12);}}function __embind_register_enum(_0x49e2b8,_0x479d1b,_0x326a97,_0x38ce18){var _0x9c9d3=getShiftFromSize(_0x326a97);_0x479d1b=readLatin1String(_0x479d1b);function _0x45ab28(){}_0x45ab28[_0x1aea('0x2c5')]={};registerType(_0x49e2b8,{'name':_0x479d1b,'constructor':_0x45ab28,'fromWireType':function(_0x18ebfd){return this[_0x1aea('0x1f8')][_0x1aea('0x2c5')][_0x18ebfd];},'toWireType':function(_0x22fed6,_0x97b078){return _0x97b078[_0x1aea('0x262')];},'argPackAdvance':0x8,'readValueFromPointer':enumReadValueFromPointer(_0x479d1b,_0x9c9d3,_0x38ce18),'destructorFunction':null});exposePublicSymbol(_0x479d1b,_0x45ab28);}function requireRegisteredType(_0x1d0b00,_0x3ab892){var _0x36d5c1=registeredTypes[_0x1d0b00];if(undefined===_0x36d5c1){throwBindingError(_0x3ab892+'\x20has\x20unknown\x20type\x20'+getTypeName(_0x1d0b00));}return _0x36d5c1;}function __embind_register_enum_value(_0x39f5e3,_0x1e51cb,_0x2ad80d){var _0x4fc8ee=requireRegisteredType(_0x39f5e3,_0x1aea('0x2c6'));_0x1e51cb=readLatin1String(_0x1e51cb);var _0x165e8c=_0x4fc8ee[_0x1aea('0x1f8')];var _0x5c4f6e=Object[_0x1aea('0x203')](_0x4fc8ee[_0x1aea('0x1f8')][_0x1aea('0x2b')],{'value':{'value':_0x2ad80d},'constructor':{'value':createNamedFunction(_0x4fc8ee[_0x1aea('0x2c')]+'_'+_0x1e51cb,function(){})}});_0x165e8c[_0x1aea('0x2c5')][_0x2ad80d]=_0x5c4f6e;_0x165e8c[_0x1e51cb]=_0x5c4f6e;}function _embind_repr(_0x1d4b5d){if(_0x1d4b5d===null){return _0x1aea('0x2c7');}var _0x4b116b=typeof _0x1d4b5d;if(_0x4b116b===_0x1aea('0x49')||_0x4b116b===_0x1aea('0x2c8')||_0x4b116b===_0x1aea('0x4a')){return _0x1d4b5d[_0x1aea('0x7')]();}else{return''+_0x1d4b5d;}}function floatReadValueFromPointer(_0x4299d7,_0x397c1b){switch(_0x397c1b){case 0x2:return function(_0x1cf860){return this[_0x1aea('0x23c')](HEAPF32[_0x1cf860>>0x2]);};case 0x3:return function(_0x2f32ae){return this[_0x1aea('0x23c')](HEAPF64[_0x2f32ae>>0x3]);};default:throw new TypeError(_0x1aea('0x2c9')+_0x4299d7);}}function __embind_register_float(_0x341b04,_0x47f663,_0x42d233){var _0x5909e2=getShiftFromSize(_0x42d233);_0x47f663=readLatin1String(_0x47f663);registerType(_0x341b04,{'name':_0x47f663,'fromWireType':function(_0x3a5d32){return _0x3a5d32;},'toWireType':function(_0x4a39cc,_0x23e803){if(typeof _0x23e803!==_0x1aea('0x7e')&&typeof _0x23e803!==_0x1aea('0x2ca')){throw new TypeError(_0x1aea('0x2cb')+_embind_repr(_0x23e803)+_0x1aea('0x2cc')+this[_0x1aea('0x2c')]);}return _0x23e803;},'argPackAdvance':0x8,'readValueFromPointer':floatReadValueFromPointer(_0x47f663,_0x5909e2),'destructorFunction':null});}function __embind_register_function(_0xb63da1,_0xb145b9,_0x3958ff,_0x18cc63,_0x854e38,_0x551a56){var _0x3d4685=heap32VectorToArray(_0xb145b9,_0x3958ff);_0xb63da1=readLatin1String(_0xb63da1);_0x854e38=embind__requireFunction(_0x18cc63,_0x854e38);exposePublicSymbol(_0xb63da1,function(){throwUnboundTypeError(_0x1aea('0x2bb')+_0xb63da1+_0x1aea('0x297'),_0x3d4685);},_0xb145b9-0x1);whenDependentTypesAreResolved([],_0x3d4685,function(_0x532ac8){var _0x5c6e=[_0x532ac8[0x0],null]['concat'](_0x532ac8['slice'](0x1));replacePublicSymbol(_0xb63da1,craftInvokerFunction(_0xb63da1,_0x5c6e,null,_0x854e38,_0x551a56),_0xb145b9-0x1);return[];});}function integerReadValueFromPointer(_0x71dacd,_0x121238,_0x2e2ec1){switch(_0x121238){case 0x0:return _0x2e2ec1?function readS8FromPointer(_0x231d32){return HEAP8[_0x231d32];}:function readU8FromPointer(_0x294f5f){return HEAPU8[_0x294f5f];};case 0x1:return _0x2e2ec1?function readS16FromPointer(_0x5016eb){return HEAP16[_0x5016eb>>0x1];}:function readU16FromPointer(_0x751b53){return HEAPU16[_0x751b53>>0x1];};case 0x2:return _0x2e2ec1?function readS32FromPointer(_0xb5c1d8){return HEAP32[_0xb5c1d8>>0x2];}:function readU32FromPointer(_0x83d72b){return HEAPU32[_0x83d72b>>0x2];};default:throw new TypeError(_0x1aea('0x2c4')+_0x71dacd);}}function __embind_register_integer(_0x22cb72,_0x3547dd,_0x2925ce,_0x16044b,_0x1c6646){_0x3547dd=readLatin1String(_0x3547dd);if(_0x1c6646===-0x1){_0x1c6646=0xffffffff;}var _0x3ba8e0=getShiftFromSize(_0x2925ce);var _0x4801f7=function(_0x1a13bd){return _0x1a13bd;};if(_0x16044b===0x0){var _0x5d6955=0x20-0x8*_0x2925ce;_0x4801f7=function(_0xe2c717){return _0xe2c717<<_0x5d6955>>>_0x5d6955;};}var _0x14005d=_0x3547dd[_0x1aea('0x5c')](_0x1aea('0x2cd'))!=-0x1;registerType(_0x22cb72,{'name':_0x3547dd,'fromWireType':_0x4801f7,'toWireType':function(_0x5d8ffa,_0x14fb3a){if(typeof _0x14fb3a!=='number'&&typeof _0x14fb3a!=='boolean'){throw new TypeError(_0x1aea('0x2cb')+_embind_repr(_0x14fb3a)+_0x1aea('0x2cc')+this['name']);}if(_0x14fb3a<_0x16044b||_0x14fb3a>_0x1c6646){throw new TypeError(_0x1aea('0x2ce')+_embind_repr(_0x14fb3a)+_0x1aea('0x2cf')+_0x3547dd+_0x1aea('0x2d0')+_0x16044b+',\x20'+_0x1c6646+']!');}return _0x14005d?_0x14fb3a>>>0x0:_0x14fb3a|0x0;},'argPackAdvance':0x8,'readValueFromPointer':integerReadValueFromPointer(_0x3547dd,_0x3ba8e0,_0x16044b!==0x0),'destructorFunction':null});}function __embind_register_memory_view(_0x5e443c,_0x4db753,_0x2feb71){var _0xbcd72=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array];var _0x2f81f4=_0xbcd72[_0x4db753];function _0x236855(_0x483f14){_0x483f14=_0x483f14>>0x2;var _0x2587e6=HEAPU32;var _0x457d1e=_0x2587e6[_0x483f14];var _0xd4f05b=_0x2587e6[_0x483f14+0x1];return new _0x2f81f4(_0x2587e6[_0x1aea('0x50')],_0xd4f05b,_0x457d1e);}_0x2feb71=readLatin1String(_0x2feb71);registerType(_0x5e443c,{'name':_0x2feb71,'fromWireType':_0x236855,'argPackAdvance':0x8,'readValueFromPointer':_0x236855},{'ignoreDuplicateRegistrations':!![]});}function __embind_register_std_string(_0x3cdd9a,_0x591fac){_0x591fac=readLatin1String(_0x591fac);var _0x1ab3b3=_0x591fac===_0x1aea('0x2d1');registerType(_0x3cdd9a,{'name':_0x591fac,'fromWireType':function(_0x5492a3){var _0x1f9e75=HEAPU32[_0x5492a3>>0x2];var _0x524d28;if(_0x1ab3b3){var _0x22a600=HEAPU8[_0x5492a3+0x4+_0x1f9e75];var _0x341253=0x0;if(_0x22a600!=0x0){_0x341253=_0x22a600;HEAPU8[_0x5492a3+0x4+_0x1f9e75]=0x0;}var _0x1b779a=_0x5492a3+0x4;for(var _0x2721cf=0x0;_0x2721cf<=_0x1f9e75;++_0x2721cf){var _0x670b75=_0x5492a3+0x4+_0x2721cf;if(HEAPU8[_0x670b75]==0x0){var _0x42ba26=UTF8ToString(_0x1b779a);if(_0x524d28===undefined)_0x524d28=_0x42ba26;else{_0x524d28+=String[_0x1aea('0x81')](0x0);_0x524d28+=_0x42ba26;}_0x1b779a=_0x670b75+0x1;}}if(_0x341253!=0x0)HEAPU8[_0x5492a3+0x4+_0x1f9e75]=_0x341253;}else{var _0x1513cf=new Array(_0x1f9e75);for(var _0x2721cf=0x0;_0x2721cf<_0x1f9e75;++_0x2721cf){_0x1513cf[_0x2721cf]=String[_0x1aea('0x81')](HEAPU8[_0x5492a3+0x4+_0x2721cf]);}_0x524d28=_0x1513cf[_0x1aea('0xdc')]('');}_free(_0x5492a3);return _0x524d28;},'toWireType':function(_0x8bb420,_0x1381b0){if(_0x1381b0 instanceof ArrayBuffer){_0x1381b0=new Uint8Array(_0x1381b0);}var _0xfbf468;var _0x4f62bd=typeof _0x1381b0===_0x1aea('0x7c');if(!(_0x4f62bd||_0x1381b0 instanceof Uint8Array||_0x1381b0 instanceof Uint8ClampedArray||_0x1381b0 instanceof Int8Array)){throwBindingError('Cannot\x20pass\x20non-string\x20to\x20std::string');}if(_0x1ab3b3&&_0x4f62bd){_0xfbf468=function(){return lengthBytesUTF8(_0x1381b0);};}else{_0xfbf468=function(){return _0x1381b0[_0x1aea('0x39')];};}var _0x1779b3=_0xfbf468();var _0x3801d6=_malloc(0x4+_0x1779b3+0x1);HEAPU32[_0x3801d6>>0x2]=_0x1779b3;if(_0x1ab3b3&&_0x4f62bd){stringToUTF8(_0x1381b0,_0x3801d6+0x4,_0x1779b3+0x1);}else{if(_0x4f62bd){for(var _0x205386=0x0;_0x205386<_0x1779b3;++_0x205386){var _0xfabf68=_0x1381b0[_0x1aea('0x84')](_0x205386);if(_0xfabf68>0xff){_free(_0x3801d6);throwBindingError('String\x20has\x20UTF-16\x20code\x20units\x20that\x20do\x20not\x20fit\x20in\x208\x20bits');}HEAPU8[_0x3801d6+0x4+_0x205386]=_0xfabf68;}}else{for(var _0x205386=0x0;_0x205386<_0x1779b3;++_0x205386){HEAPU8[_0x3801d6+0x4+_0x205386]=_0x1381b0[_0x205386];}}}if(_0x8bb420!==null){_0x8bb420[_0x1aea('0x6a')](_free,_0x3801d6);}return _0x3801d6;},'argPackAdvance':0x8,'readValueFromPointer':simpleReadValueFromPointer,'destructorFunction':function(_0x467bc4){_free(_0x467bc4);}});}function __embind_register_std_wstring(_0x496816,_0x9cee23,_0x4b6de8){_0x4b6de8=readLatin1String(_0x4b6de8);var _0x16f2cd,_0x279ee9;if(_0x9cee23===0x2){_0x16f2cd=function(){return HEAPU16;};_0x279ee9=0x1;}else if(_0x9cee23===0x4){_0x16f2cd=function(){return HEAPU32;};_0x279ee9=0x2;}registerType(_0x496816,{'name':_0x4b6de8,'fromWireType':function(_0x5256e1){var _0x460a2c=_0x16f2cd();var _0x23d7f1=HEAPU32[_0x5256e1>>0x2];var _0x14d477=new Array(_0x23d7f1);var _0x57d62b=_0x5256e1+0x4>>_0x279ee9;for(var _0x1b6210=0x0;_0x1b6210<_0x23d7f1;++_0x1b6210){_0x14d477[_0x1b6210]=String[_0x1aea('0x81')](_0x460a2c[_0x57d62b+_0x1b6210]);}_free(_0x5256e1);return _0x14d477[_0x1aea('0xdc')]('');},'toWireType':function(_0x423bea,_0x1c3e7a){var _0x504e81=_0x16f2cd();var _0x4d89e2=_0x1c3e7a['length'];var _0x5ef581=_malloc(0x4+_0x4d89e2*_0x9cee23);HEAPU32[_0x5ef581>>0x2]=_0x4d89e2;var _0x5de108=_0x5ef581+0x4>>_0x279ee9;for(var _0x386e9a=0x0;_0x386e9a<_0x4d89e2;++_0x386e9a){_0x504e81[_0x5de108+_0x386e9a]=_0x1c3e7a[_0x1aea('0x84')](_0x386e9a);}if(_0x423bea!==null){_0x423bea[_0x1aea('0x6a')](_free,_0x5ef581);}return _0x5ef581;},'argPackAdvance':0x8,'readValueFromPointer':simpleReadValueFromPointer,'destructorFunction':function(_0x916e78){_free(_0x916e78);}});}function __embind_register_value_array(_0x1205bc,_0x162c3e,_0x242e8c,_0x3c673c,_0x3c852a,_0x142b80){tupleRegistrations[_0x1205bc]={'name':readLatin1String(_0x162c3e),'rawConstructor':embind__requireFunction(_0x242e8c,_0x3c673c),'rawDestructor':embind__requireFunction(_0x3c852a,_0x142b80),'elements':[]};}function __embind_register_value_array_element(_0x2a7304,_0x39a8b7,_0x287005,_0x3e9c37,_0x20c802,_0x1859d2,_0x119f74,_0x59ca6b,_0x53c1d7){tupleRegistrations[_0x2a7304][_0x1aea('0x242')][_0x1aea('0x6a')]({'getterReturnType':_0x39a8b7,'getter':embind__requireFunction(_0x287005,_0x3e9c37),'getterContext':_0x20c802,'setterArgumentType':_0x1859d2,'setter':embind__requireFunction(_0x119f74,_0x59ca6b),'setterContext':_0x53c1d7});}function __embind_register_value_object(_0x1aeb16,_0x334a38,_0x56c83f,_0x34b33a,_0x5d12b4,_0x3d3812){structRegistrations[_0x1aeb16]={'name':readLatin1String(_0x334a38),'rawConstructor':embind__requireFunction(_0x56c83f,_0x34b33a),'rawDestructor':embind__requireFunction(_0x5d12b4,_0x3d3812),'fields':[]};}function __embind_register_value_object_field(_0x11fe1e,_0x2a3206,_0x10ec91,_0x210bdc,_0x250317,_0x3ebfff,_0x1c201e,_0x10631f,_0x86cf89,_0xd2139d){structRegistrations[_0x11fe1e][_0x1aea('0x24d')]['push']({'fieldName':readLatin1String(_0x2a3206),'getterReturnType':_0x10ec91,'getter':embind__requireFunction(_0x210bdc,_0x250317),'getterContext':_0x3ebfff,'setterArgumentType':_0x1c201e,'setter':embind__requireFunction(_0x10631f,_0x86cf89),'setterContext':_0xd2139d});}function __embind_register_void(_0x576cd5,_0x1d2277){_0x1d2277=readLatin1String(_0x1d2277);registerType(_0x576cd5,{'isVoid':!![],'name':_0x1d2277,'argPackAdvance':0x0,'fromWireType':function(){return undefined;},'toWireType':function(_0x3677b5,_0x31f7e6){return undefined;}});}function requireHandle(_0x4f3151){if(!_0x4f3151){throwBindingError(_0x1aea('0x2d2')+_0x4f3151);}return emval_handle_array[_0x4f3151][_0x1aea('0x262')];}function __emval_as(_0x282aa6,_0x313536,_0x51f1fb){_0x282aa6=requireHandle(_0x282aa6);_0x313536=requireRegisteredType(_0x313536,_0x1aea('0x2d3'));var _0x3ab7de=[];var _0x348f93=__emval_register(_0x3ab7de);HEAP32[_0x51f1fb>>0x2]=_0x348f93;return _0x313536['toWireType'](_0x3ab7de,_0x282aa6);}function __emval_incref(_0x9bf02d){if(_0x9bf02d>0x4){emval_handle_array[_0x9bf02d][_0x1aea('0xcd')]+=0x1;}}function __emval_run_destructors(_0x4ab1c8){var _0x15b03f=emval_handle_array[_0x4ab1c8]['value'];runDestructors(_0x15b03f);__emval_decref(_0x4ab1c8);}function __emval_take_value(_0x20f86b,_0x305048){_0x20f86b=requireRegisteredType(_0x20f86b,_0x1aea('0x2d4'));var _0x27b87d=_0x20f86b[_0x1aea('0x28c')](_0x305048);return __emval_register(_0x27b87d);}function _abort(){Module[_0x1aea('0x2d5')]();}function _emscripten_get_now(){abort();}function _emscripten_get_now_is_monotonic(){return 0x0||ENVIRONMENT_IS_NODE||typeof dateNow!==_0x1aea('0x1')||typeof performance===_0x1aea('0x49')&&performance&&typeof performance['now']===_0x1aea('0x4a');}function _clock_gettime(_0x3e8edf,_0x1961cf){var _0x288ed6;if(_0x3e8edf===0x0){_0x288ed6=Date[_0x1aea('0xec')]();}else if(_0x3e8edf===0x1&&_emscripten_get_now_is_monotonic()){_0x288ed6=_emscripten_get_now();}else{___setErrNo(0x16);return-0x1;}HEAP32[_0x1961cf>>0x2]=_0x288ed6/0x3e8|0x0;HEAP32[_0x1961cf+0x4>>0x2]=_0x288ed6%0x3e8*0x3e8*0x3e8|0x0;return 0x0;}function _emscripten_get_heap_size(){return HEAP8['length'];}function _emscripten_resize_heap(_0x3dc03e){return![];}function _exit(_0xb2a037){exit(_0xb2a037);}function _emscripten_memcpy_big(_0xb2d62a,_0x28db85,_0x1d5850){HEAPU8[_0x1aea('0x3b')](HEAPU8[_0x1aea('0x31')](_0x28db85,_0x28db85+_0x1d5850),_0xb2d62a);}FS[_0x1aea('0x2d6')]();Module[_0x1aea('0x2d7')]=FS[_0x1aea('0x2d8')];Module['FS_createPath']=FS['createPath'];Module[_0x1aea('0x33')]=FS['createDataFile'];Module[_0x1aea('0x2d9')]=FS[_0x1aea('0x2da')];Module[_0x1aea('0x2db')]=FS[_0x1aea('0x2dc')];Module[_0x1aea('0x2dd')]=FS[_0x1aea('0x2de')];Module[_0x1aea('0x2df')]=FS[_0x1aea('0x1ef')];Module[_0x1aea('0x2e0')]=FS[_0x1aea('0x100')];;if(ENVIRONMENT_IS_NODE){var fs=__webpack_require__(501);var NODEJS_PATH=!(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }());NODEFS['staticInit']();};InternalError=Module['InternalError']=extendError(Error,_0x1aea('0x2e1'));;embind_init_charCodes();BindingError=Module[_0x1aea('0x2e2')]=extendError(Error,_0x1aea('0x2e2'));;init_ClassHandle();init_RegisteredPointer();init_embind();;UnboundTypeError=Module[_0x1aea('0x2e3')]=extendError(Error,'UnboundTypeError');;init_emval();;if(ENVIRONMENT_IS_NODE){_emscripten_get_now=function _emscripten_get_now_actual(){var _0x76f27=process['hrtime']();return _0x76f27[0x0]*0x3e8+_0x76f27[0x1]/0xf4240;};}else if(typeof dateNow!==_0x1aea('0x1')){_emscripten_get_now=dateNow;}else if(typeof performance===_0x1aea('0x49')&&performance&&typeof performance[_0x1aea('0xec')]==='function'){_emscripten_get_now=function(){return performance[_0x1aea('0xec')]();};}else{_emscripten_get_now=Date[_0x1aea('0xec')];};var ASSERTIONS=![];function intArrayFromString(_0x4e98d0,_0x5e94d4,_0x2599a2){var _0x2218f2=_0x2599a2>0x0?_0x2599a2:lengthBytesUTF8(_0x4e98d0)+0x1;var _0x4c02f4=new Array(_0x2218f2);var _0x106e95=stringToUTF8Array(_0x4e98d0,_0x4c02f4,0x0,_0x4c02f4[_0x1aea('0x39')]);if(_0x5e94d4)_0x4c02f4['length']=_0x106e95;return _0x4c02f4;}function intArrayToString(_0x184a9d){var _0x235495=[];for(var _0x112297=0x0;_0x112297<_0x184a9d['length'];_0x112297++){var _0x45d1ac=_0x184a9d[_0x112297];if(_0x45d1ac>0xff){if(ASSERTIONS){assert(![],'Character\x20code\x20'+_0x45d1ac+'\x20('+String['fromCharCode'](_0x45d1ac)+_0x1aea('0x2e4')+_0x112297+'\x20not\x20in\x200x00-0xFF.');}_0x45d1ac&=0xff;}_0x235495['push'](String[_0x1aea('0x81')](_0x45d1ac));}return _0x235495[_0x1aea('0xdc')]('');}var asmGlobalArg={};var asmLibraryArg={'abort':abort,'setTempRet0':setTempRet0,'getTempRet0':getTempRet0,'ClassHandle':ClassHandle,'ClassHandle_clone':ClassHandle_clone,'ClassHandle_delete':ClassHandle_delete,'ClassHandle_deleteLater':ClassHandle_deleteLater,'ClassHandle_isAliasOf':ClassHandle_isAliasOf,'ClassHandle_isDeleted':ClassHandle_isDeleted,'RegisteredClass':RegisteredClass,'RegisteredPointer':RegisteredPointer,'RegisteredPointer_deleteObject':RegisteredPointer_deleteObject,'RegisteredPointer_destructor':RegisteredPointer_destructor,'RegisteredPointer_fromWireType':RegisteredPointer_fromWireType,'RegisteredPointer_getPointee':RegisteredPointer_getPointee,'__ZSt18uncaught_exceptionv':__ZSt18uncaught_exceptionv,'___buildEnvironment':___buildEnvironment,'___cxa_allocate_exception':___cxa_allocate_exception,'___cxa_begin_catch':___cxa_begin_catch,'___cxa_find_matching_catch':___cxa_find_matching_catch,'___cxa_free_exception':___cxa_free_exception,'___cxa_throw':___cxa_throw,'___gxx_personality_v0':___gxx_personality_v0,'___lock':___lock,'___resumeException':___resumeException,'___setErrNo':___setErrNo,'___syscall140':___syscall140,'___syscall145':___syscall145,'___syscall146':___syscall146,'___syscall221':___syscall221,'___syscall5':___syscall5,'___syscall54':___syscall54,'___syscall6':___syscall6,'___unlock':___unlock,'__embind_finalize_value_array':__embind_finalize_value_array,'__embind_finalize_value_object':__embind_finalize_value_object,'__embind_register_bool':__embind_register_bool,'__embind_register_class':__embind_register_class,'__embind_register_class_constructor':__embind_register_class_constructor,'__embind_register_class_function':__embind_register_class_function,'__embind_register_class_property':__embind_register_class_property,'__embind_register_constant':__embind_register_constant,'__embind_register_emval':__embind_register_emval,'__embind_register_enum':__embind_register_enum,'__embind_register_enum_value':__embind_register_enum_value,'__embind_register_float':__embind_register_float,'__embind_register_function':__embind_register_function,'__embind_register_integer':__embind_register_integer,'__embind_register_memory_view':__embind_register_memory_view,'__embind_register_std_string':__embind_register_std_string,'__embind_register_std_wstring':__embind_register_std_wstring,'__embind_register_value_array':__embind_register_value_array,'__embind_register_value_array_element':__embind_register_value_array_element,'__embind_register_value_object':__embind_register_value_object,'__embind_register_value_object_field':__embind_register_value_object_field,'__embind_register_void':__embind_register_void,'__emval_as':__emval_as,'__emval_decref':__emval_decref,'__emval_incref':__emval_incref,'__emval_register':__emval_register,'__emval_run_destructors':__emval_run_destructors,'__emval_take_value':__emval_take_value,'_abort':_abort,'_clock_gettime':_clock_gettime,'_embind_repr':_embind_repr,'_emscripten_get_heap_size':_emscripten_get_heap_size,'_emscripten_get_now':_emscripten_get_now,'_emscripten_get_now_is_monotonic':_emscripten_get_now_is_monotonic,'_emscripten_memcpy_big':_emscripten_memcpy_big,'_emscripten_resize_heap':_emscripten_resize_heap,'_exit':_exit,'constNoSmartPtrRawPointerToWireType':constNoSmartPtrRawPointerToWireType,'count_emval_handles':count_emval_handles,'craftInvokerFunction':craftInvokerFunction,'createNamedFunction':createNamedFunction,'downcastPointer':downcastPointer,'embind__requireFunction':embind__requireFunction,'embind_init_charCodes':embind_init_charCodes,'ensureOverloadTable':ensureOverloadTable,'enumReadValueFromPointer':enumReadValueFromPointer,'exposePublicSymbol':exposePublicSymbol,'extendError':extendError,'floatReadValueFromPointer':floatReadValueFromPointer,'flushPendingDeletes':flushPendingDeletes,'genericPointerToWireType':genericPointerToWireType,'getBasestPointer':getBasestPointer,'getInheritedInstance':getInheritedInstance,'getInheritedInstanceCount':getInheritedInstanceCount,'getLiveInheritedInstances':getLiveInheritedInstances,'getShiftFromSize':getShiftFromSize,'getTypeName':getTypeName,'get_first_emval':get_first_emval,'heap32VectorToArray':heap32VectorToArray,'init_ClassHandle':init_ClassHandle,'init_RegisteredPointer':init_RegisteredPointer,'init_embind':init_embind,'init_emval':init_emval,'integerReadValueFromPointer':integerReadValueFromPointer,'makeClassHandle':makeClassHandle,'makeLegalFunctionName':makeLegalFunctionName,'new_':new_,'nonConstNoSmartPtrRawPointerToWireType':nonConstNoSmartPtrRawPointerToWireType,'readLatin1String':readLatin1String,'registerType':registerType,'replacePublicSymbol':replacePublicSymbol,'requireHandle':requireHandle,'requireRegisteredType':requireRegisteredType,'runDestructor':runDestructor,'runDestructors':runDestructors,'setDelayFunction':setDelayFunction,'shallowCopyInternalPointer':shallowCopyInternalPointer,'simpleReadValueFromPointer':simpleReadValueFromPointer,'throwBindingError':throwBindingError,'throwInstanceAlreadyDeleted':throwInstanceAlreadyDeleted,'throwInternalError':throwInternalError,'throwUnboundTypeError':throwUnboundTypeError,'upcastPointer':upcastPointer,'validateThis':validateThis,'whenDependentTypesAreResolved':whenDependentTypesAreResolved,'tempDoublePtr':tempDoublePtr,'DYNAMICTOP_PTR':DYNAMICTOP_PTR};var asm=Module[_0x1aea('0xbc')](asmGlobalArg,asmLibraryArg,buffer);Module[_0x1aea('0xbc')]=asm;var ___cxa_can_catch=Module[_0x1aea('0xd5')]=function(){return Module[_0x1aea('0xbc')][_0x1aea('0xd5')][_0x1aea('0x72')](null,arguments);};var ___cxa_is_pointer_type=Module[_0x1aea('0x2e5')]=function(){return Module['asm'][_0x1aea('0x2e5')][_0x1aea('0x72')](null,arguments);};var ___errno_location=Module[_0x1aea('0xd6')]=function(){return Module[_0x1aea('0xbc')][_0x1aea('0xd6')][_0x1aea('0x72')](null,arguments);};var ___getTypeName=Module[_0x1aea('0x2e6')]=function(){return Module[_0x1aea('0xbc')][_0x1aea('0x2e6')][_0x1aea('0x72')](null,arguments);};var __get_daylight=Module[_0x1aea('0x2e7')]=function(){return Module['asm'][_0x1aea('0x2e7')][_0x1aea('0x72')](null,arguments);};var __get_environ=Module[_0x1aea('0x2e8')]=function(){return Module[_0x1aea('0xbc')][_0x1aea('0x2e8')][_0x1aea('0x72')](null,arguments);};var __get_timezone=Module[_0x1aea('0x2e9')]=function(){return Module['asm'][_0x1aea('0x2e9')][_0x1aea('0x72')](null,arguments);};var __get_tzname=Module[_0x1aea('0x2ea')]=function(){return Module[_0x1aea('0xbc')][_0x1aea('0x2ea')][_0x1aea('0x72')](null,arguments);};var _free=Module[_0x1aea('0x2eb')]=function(){return Module[_0x1aea('0xbc')]['_free'][_0x1aea('0x72')](null,arguments);};var _llvm_round_f32=Module[_0x1aea('0x2ec')]=function(){return Module[_0x1aea('0xbc')]['_llvm_round_f32'][_0x1aea('0x72')](null,arguments);};var _malloc=Module[_0x1aea('0x2ed')]=function(){return Module[_0x1aea('0xbc')][_0x1aea('0x2ed')][_0x1aea('0x72')](null,arguments);};var _memcpy=Module[_0x1aea('0x2ee')]=function(){return Module[_0x1aea('0xbc')]['_memcpy']['apply'](null,arguments);};var _memmove=Module[_0x1aea('0x2ef')]=function(){return Module['asm'][_0x1aea('0x2ef')]['apply'](null,arguments);};var _memset=Module[_0x1aea('0x2f0')]=function(){return Module[_0x1aea('0xbc')]['_memset'][_0x1aea('0x72')](null,arguments);};var _sbrk=Module[_0x1aea('0x2f1')]=function(){return Module[_0x1aea('0xbc')]['_sbrk'][_0x1aea('0x72')](null,arguments);};var establishStackSpace=Module['establishStackSpace']=function(){return Module['asm'][_0x1aea('0x2f2')][_0x1aea('0x72')](null,arguments);};var globalCtors=Module[_0x1aea('0x2f3')]=function(){return Module[_0x1aea('0xbc')][_0x1aea('0x2f3')][_0x1aea('0x72')](null,arguments);};var stackAlloc=Module[_0x1aea('0x2f4')]=function(){return Module[_0x1aea('0xbc')][_0x1aea('0x2f4')][_0x1aea('0x72')](null,arguments);};var stackRestore=Module['stackRestore']=function(){return Module[_0x1aea('0xbc')][_0x1aea('0x2f5')]['apply'](null,arguments);};var stackSave=Module[_0x1aea('0x2f6')]=function(){return Module[_0x1aea('0xbc')][_0x1aea('0x2f6')][_0x1aea('0x72')](null,arguments);};var dynCall_dii=Module[_0x1aea('0x2f7')]=function(){return Module[_0x1aea('0xbc')][_0x1aea('0x2f7')]['apply'](null,arguments);};var dynCall_fii=Module[_0x1aea('0x2f8')]=function(){return Module[_0x1aea('0xbc')]['dynCall_fii'][_0x1aea('0x72')](null,arguments);};var dynCall_fiii=Module[_0x1aea('0x2f9')]=function(){return Module[_0x1aea('0xbc')][_0x1aea('0x2f9')][_0x1aea('0x72')](null,arguments);};var dynCall_fiiii=Module[_0x1aea('0x2fa')]=function(){return Module[_0x1aea('0xbc')][_0x1aea('0x2fa')][_0x1aea('0x72')](null,arguments);};var dynCall_i=Module[_0x1aea('0x2fb')]=function(){return Module['asm'][_0x1aea('0x2fb')][_0x1aea('0x72')](null,arguments);};var dynCall_ii=Module[_0x1aea('0x2fc')]=function(){return Module[_0x1aea('0xbc')][_0x1aea('0x2fc')][_0x1aea('0x72')](null,arguments);};var dynCall_iidiiii=Module[_0x1aea('0x2fd')]=function(){return Module[_0x1aea('0xbc')]['dynCall_iidiiii'][_0x1aea('0x72')](null,arguments);};var dynCall_iii=Module[_0x1aea('0x2fe')]=function(){return Module[_0x1aea('0xbc')][_0x1aea('0x2fe')]['apply'](null,arguments);};var dynCall_iiii=Module[_0x1aea('0x2ff')]=function(){return Module[_0x1aea('0xbc')][_0x1aea('0x2ff')][_0x1aea('0x72')](null,arguments);};var dynCall_iiiif=Module[_0x1aea('0x300')]=function(){return Module[_0x1aea('0xbc')][_0x1aea('0x300')][_0x1aea('0x72')](null,arguments);};var dynCall_iiiii=Module[_0x1aea('0x301')]=function(){return Module[_0x1aea('0xbc')][_0x1aea('0x301')][_0x1aea('0x72')](null,arguments);};var dynCall_iiiiii=Module[_0x1aea('0x302')]=function(){return Module[_0x1aea('0xbc')][_0x1aea('0x302')]['apply'](null,arguments);};var dynCall_iiiiiii=Module[_0x1aea('0x303')]=function(){return Module[_0x1aea('0xbc')][_0x1aea('0x303')][_0x1aea('0x72')](null,arguments);};var dynCall_iiiiiiii=Module[_0x1aea('0x304')]=function(){return Module[_0x1aea('0xbc')][_0x1aea('0x304')][_0x1aea('0x72')](null,arguments);};var dynCall_iiiiiiiii=Module[_0x1aea('0x305')]=function(){return Module['asm']['dynCall_iiiiiiiii'][_0x1aea('0x72')](null,arguments);};var dynCall_iiiiiiiiii=Module[_0x1aea('0x306')]=function(){return Module[_0x1aea('0xbc')][_0x1aea('0x306')][_0x1aea('0x72')](null,arguments);};var dynCall_iiiiiiiiiii=Module[_0x1aea('0x307')]=function(){return Module['asm']['dynCall_iiiiiiiiiii'][_0x1aea('0x72')](null,arguments);};var dynCall_iiiiiiiiiiii=Module[_0x1aea('0x308')]=function(){return Module[_0x1aea('0xbc')]['dynCall_iiiiiiiiiiii'][_0x1aea('0x72')](null,arguments);};var dynCall_iiiiiiiiiiiiii=Module[_0x1aea('0x309')]=function(){return Module[_0x1aea('0xbc')][_0x1aea('0x309')][_0x1aea('0x72')](null,arguments);};var dynCall_iiiiiiiiiiiiiii=Module[_0x1aea('0x30a')]=function(){return Module[_0x1aea('0xbc')][_0x1aea('0x30a')][_0x1aea('0x72')](null,arguments);};var dynCall_jiji=Module['dynCall_jiji']=function(){return Module[_0x1aea('0xbc')][_0x1aea('0x30b')]['apply'](null,arguments);};var dynCall_v=Module[_0x1aea('0x96')]=function(){return Module[_0x1aea('0xbc')][_0x1aea('0x96')][_0x1aea('0x72')](null,arguments);};var dynCall_vi=Module['dynCall_vi']=function(){return Module['asm']['dynCall_vi']['apply'](null,arguments);};var dynCall_vii=Module[_0x1aea('0x30c')]=function(){return Module[_0x1aea('0xbc')][_0x1aea('0x30c')][_0x1aea('0x72')](null,arguments);};var dynCall_viid=Module[_0x1aea('0x30d')]=function(){return Module[_0x1aea('0xbc')]['dynCall_viid']['apply'](null,arguments);};var dynCall_viif=Module['dynCall_viif']=function(){return Module['asm'][_0x1aea('0x30e')]['apply'](null,arguments);};var dynCall_viii=Module[_0x1aea('0x30f')]=function(){return Module[_0x1aea('0xbc')]['dynCall_viii'][_0x1aea('0x72')](null,arguments);};var dynCall_viiif=Module[_0x1aea('0x310')]=function(){return Module['asm'][_0x1aea('0x310')][_0x1aea('0x72')](null,arguments);};var dynCall_viiii=Module[_0x1aea('0x311')]=function(){return Module[_0x1aea('0xbc')][_0x1aea('0x311')][_0x1aea('0x72')](null,arguments);};var dynCall_viiiif=Module[_0x1aea('0x312')]=function(){return Module['asm']['dynCall_viiiif'][_0x1aea('0x72')](null,arguments);};var dynCall_viiiii=Module[_0x1aea('0x313')]=function(){return Module[_0x1aea('0xbc')][_0x1aea('0x313')][_0x1aea('0x72')](null,arguments);};var dynCall_viiiiii=Module[_0x1aea('0x314')]=function(){return Module[_0x1aea('0xbc')][_0x1aea('0x314')][_0x1aea('0x72')](null,arguments);};var dynCall_viiiiiii=Module[_0x1aea('0x315')]=function(){return Module[_0x1aea('0xbc')][_0x1aea('0x315')]['apply'](null,arguments);};var dynCall_viiiiiiii=Module['dynCall_viiiiiiii']=function(){return Module[_0x1aea('0xbc')][_0x1aea('0x316')][_0x1aea('0x72')](null,arguments);};;Module[_0x1aea('0xbc')]=asm;Module[_0x1aea('0x38')]=getMemory;Module[_0x1aea('0x2e')]=addRunDependency;Module[_0x1aea('0x34')]=removeRunDependency;Module[_0x1aea('0x2d7')]=FS[_0x1aea('0x2d8')];Module[_0x1aea('0x26')]=FS[_0x1aea('0x317')];Module[_0x1aea('0x33')]=FS['createDataFile'];Module['FS_createPreloadedFile']=FS[_0x1aea('0x2da')];Module[_0x1aea('0x2db')]=FS[_0x1aea('0x2dc')];Module[_0x1aea('0x2dd')]=FS[_0x1aea('0x2de')];Module[_0x1aea('0x2df')]=FS[_0x1aea('0x1ef')];Module[_0x1aea('0x2e0')]=FS[_0x1aea('0x100')];function ExitStatus(_0x44137f){this[_0x1aea('0x2c')]=_0x1aea('0x318');this['message']=_0x1aea('0x319')+_0x44137f+')';this[_0x1aea('0x1f')]=_0x44137f;};ExitStatus[_0x1aea('0x2b')]=new Error();ExitStatus['prototype'][_0x1aea('0x1f8')]=ExitStatus;var calledMain=![];dependenciesFulfilled=function runCaller(){if(!Module['calledRun'])run();if(!Module[_0x1aea('0x3e')])dependenciesFulfilled=runCaller;};function run(_0x1b57ba){_0x1b57ba=_0x1b57ba||Module[_0x1aea('0x53')];if(runDependencies>0x0){return;}preRun();if(runDependencies>0x0)return;if(Module[_0x1aea('0x3e')])return;function _0x1eef56(){if(Module[_0x1aea('0x3e')])return;Module['calledRun']=!![];if(ABORT)return;ensureInitRuntime();preMain();if(Module[_0x1aea('0x31a')])Module[_0x1aea('0x31a')]();postRun();}if(Module[_0x1aea('0x19')]){Module[_0x1aea('0x19')]('Running...');setTimeout(function(){setTimeout(function(){Module[_0x1aea('0x19')]('');},0x1);_0x1eef56();},0x1);}else{_0x1eef56();}}Module[_0x1aea('0x31b')]=run;function exit(_0x97a588,_0x162ad1){if(_0x162ad1&&Module[_0x1aea('0x31c')]&&_0x97a588===0x0){return;}if(Module[_0x1aea('0x31c')]){}else{ABORT=!![];EXITSTATUS=_0x97a588;exitRuntime();if(Module[_0x1aea('0x31d')])Module[_0x1aea('0x31d')](_0x97a588);}Module['quit'](_0x97a588,new ExitStatus(_0x97a588));}var abortDecorators=[];function abort(_0x1b72f8){if(Module[_0x1aea('0x31e')]){Module[_0x1aea('0x31e')](_0x1b72f8);}if(_0x1b72f8!==undefined){out(_0x1b72f8);err(_0x1b72f8);_0x1b72f8=JSON[_0x1aea('0x31f')](_0x1b72f8);}else{_0x1b72f8='';}ABORT=!![];EXITSTATUS=0x1;throw _0x1aea('0x320')+_0x1b72f8+_0x1aea('0x321');}Module[_0x1aea('0x2d5')]=abort;if(Module[_0x1aea('0x322')]){if(typeof Module[_0x1aea('0x322')]==_0x1aea('0x4a'))Module[_0x1aea('0x322')]=[Module[_0x1aea('0x322')]];while(Module[_0x1aea('0x322')]['length']>0x0){Module['preInit'][_0x1aea('0x138')]()();}}Module[_0x1aea('0x31c')]=!![];run();module[_0x1aea('0x55')]=Module;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(169), "/", __webpack_require__(111)(module), __webpack_require__(113), __webpack_require__(469).Buffer))

/***/ }),

/***/ 469:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(516)
var ieee754 = __webpack_require__(517)
var isArray = __webpack_require__(513)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(74)))

/***/ }),

/***/ 492:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 492;

/***/ }),

/***/ 501:
/***/ (function(module, exports) {



/***/ }),

/***/ 513:
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ 516:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),

/***/ 517:
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ })

});
