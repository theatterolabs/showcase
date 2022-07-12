webpackJsonp([9],{

/***/ 1013:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(3);

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__(6));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(9));

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(8));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(64));

var _classnames = _interopRequireDefault(__webpack_require__(11));

var _react = _interopRequireDefault(__webpack_require__(1));

var _propTypes = _interopRequireDefault(__webpack_require__(2));

var _elementType = _interopRequireDefault(__webpack_require__(84));

var _warning = _interopRequireDefault(__webpack_require__(20));

var _bootstrapUtils = __webpack_require__(16);

var _createChainedFunction = _interopRequireDefault(__webpack_require__(27));

var _Fade = _interopRequireDefault(__webpack_require__(864));

var propTypes = {
  /**
   * Uniquely identify the `<TabPane>` among its siblings.
   */
  eventKey: _propTypes.default.any,

  /**
   * Use animation when showing or hiding `<TabPane>`s. Use `false` to disable,
   * `true` to enable the default `<Fade>` animation or
   * a react-transition-group v2 `<Transition/>` component.
   */
  animation: _propTypes.default.oneOfType([_propTypes.default.bool, _elementType.default]),

  /** @private * */
  id: _propTypes.default.string,

  /** @private * */
  'aria-labelledby': _propTypes.default.string,

  /**
   * If not explicitly specified and rendered in the context of a
   * `<TabContent>`, the `bsClass` of the `<TabContent>` suffixed by `-pane`.
   * If otherwise not explicitly specified, `tab-pane`.
   */
  bsClass: _propTypes.default.string,

  /**
   * Transition onEnter callback when animation is not `false`
   */
  onEnter: _propTypes.default.func,

  /**
   * Transition onEntering callback when animation is not `false`
   */
  onEntering: _propTypes.default.func,

  /**
   * Transition onEntered callback when animation is not `false`
   */
  onEntered: _propTypes.default.func,

  /**
   * Transition onExit callback when animation is not `false`
   */
  onExit: _propTypes.default.func,

  /**
   * Transition onExiting callback when animation is not `false`
   */
  onExiting: _propTypes.default.func,

  /**
   * Transition onExited callback when animation is not `false`
   */
  onExited: _propTypes.default.func,

  /**
   * Wait until the first "enter" transition to mount the tab (add it to the DOM)
   */
  mountOnEnter: _propTypes.default.bool,

  /**
   * Unmount the tab (remove it from the DOM) when it is no longer visible
   */
  unmountOnExit: _propTypes.default.bool
};
var contextTypes = {
  $bs_tabContainer: _propTypes.default.shape({
    getTabId: _propTypes.default.func,
    getPaneId: _propTypes.default.func
  }),
  $bs_tabContent: _propTypes.default.shape({
    bsClass: _propTypes.default.string,
    animation: _propTypes.default.oneOfType([_propTypes.default.bool, _elementType.default]),
    activeKey: _propTypes.default.any,
    mountOnEnter: _propTypes.default.bool,
    unmountOnExit: _propTypes.default.bool,
    onPaneEnter: _propTypes.default.func.isRequired,
    onPaneExited: _propTypes.default.func.isRequired,
    exiting: _propTypes.default.bool.isRequired
  })
};
/**
 * We override the `<TabContainer>` context so `<Nav>`s in `<TabPane>`s don't
 * conflict with the top level one.
 */

var childContextTypes = {
  $bs_tabContainer: _propTypes.default.oneOf([null])
};

var TabPane =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(TabPane, _React$Component);

  function TabPane(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;
    _this.handleEnter = _this.handleEnter.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleExited = _this.handleExited.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.in = false;
    return _this;
  }

  var _proto = TabPane.prototype;

  _proto.getChildContext = function getChildContext() {
    return {
      $bs_tabContainer: null
    };
  };

  _proto.componentDidMount = function componentDidMount() {
    if (this.shouldBeIn()) {
      // In lieu of the action event firing.
      this.handleEnter();
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    if (this.in) {
      if (!this.shouldBeIn()) {
        // We shouldn't be active any more. Notify the parent.
        this.handleExited();
      }
    } else if (this.shouldBeIn()) {
      // We are the active child. Notify the parent.
      this.handleEnter();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.in) {
      // In lieu of the action event firing.
      this.handleExited();
    }
  };

  _proto.getAnimation = function getAnimation() {
    if (this.props.animation != null) {
      return this.props.animation;
    }

    var tabContent = this.context.$bs_tabContent;
    return tabContent && tabContent.animation;
  };

  _proto.handleEnter = function handleEnter() {
    var tabContent = this.context.$bs_tabContent;

    if (!tabContent) {
      return;
    }

    this.in = tabContent.onPaneEnter(this, this.props.eventKey);
  };

  _proto.handleExited = function handleExited() {
    var tabContent = this.context.$bs_tabContent;

    if (!tabContent) {
      return;
    }

    tabContent.onPaneExited(this);
    this.in = false;
  };

  _proto.isActive = function isActive() {
    var tabContent = this.context.$bs_tabContent;
    var activeKey = tabContent && tabContent.activeKey;
    return this.props.eventKey === activeKey;
  };

  _proto.shouldBeIn = function shouldBeIn() {
    return this.getAnimation() && this.isActive();
  };

  _proto.render = function render() {
    var _this$props = this.props,
        eventKey = _this$props.eventKey,
        className = _this$props.className,
        onEnter = _this$props.onEnter,
        onEntering = _this$props.onEntering,
        onEntered = _this$props.onEntered,
        onExit = _this$props.onExit,
        onExiting = _this$props.onExiting,
        onExited = _this$props.onExited,
        propsMountOnEnter = _this$props.mountOnEnter,
        propsUnmountOnExit = _this$props.unmountOnExit,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["eventKey", "className", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "mountOnEnter", "unmountOnExit"]);
    var _this$context = this.context,
        tabContent = _this$context.$bs_tabContent,
        tabContainer = _this$context.$bs_tabContainer;

    var _splitBsPropsAndOmit = (0, _bootstrapUtils.splitBsPropsAndOmit)(props, ['animation']),
        bsProps = _splitBsPropsAndOmit[0],
        elementProps = _splitBsPropsAndOmit[1];

    var active = this.isActive();
    var animation = this.getAnimation();
    var mountOnEnter = propsMountOnEnter != null ? propsMountOnEnter : tabContent && tabContent.mountOnEnter;
    var unmountOnExit = propsUnmountOnExit != null ? propsUnmountOnExit : tabContent && tabContent.unmountOnExit;

    if (!active && !animation && unmountOnExit) {
      return null;
    }

    var Transition = animation === true ? _Fade.default : animation || null;

    if (tabContent) {
      bsProps.bsClass = (0, _bootstrapUtils.prefix)(tabContent, 'pane');
    }

    var classes = (0, _extends2.default)({}, (0, _bootstrapUtils.getClassSet)(bsProps), {
      active: active
    });

    if (tabContainer) {
       false ? (0, _warning.default)(!elementProps.id && !elementProps['aria-labelledby'], 'In the context of a `<TabContainer>`, `<TabPanes>` are given ' + 'generated `id` and `aria-labelledby` attributes for the sake of ' + 'proper component accessibility. Any provided ones will be ignored. ' + 'To control these attributes directly provide a `generateChildId` ' + 'prop to the parent `<TabContainer>`.') : void 0;
      elementProps.id = tabContainer.getPaneId(eventKey);
      elementProps['aria-labelledby'] = tabContainer.getTabId(eventKey);
    }

    var pane = _react.default.createElement("div", (0, _extends2.default)({}, elementProps, {
      role: "tabpanel",
      "aria-hidden": !active,
      className: (0, _classnames.default)(className, classes)
    }));

    if (Transition) {
      var exiting = tabContent && tabContent.exiting;
      return _react.default.createElement(Transition, {
        in: active && !exiting,
        onEnter: (0, _createChainedFunction.default)(this.handleEnter, onEnter),
        onEntering: onEntering,
        onEntered: onEntered,
        onExit: onExit,
        onExiting: onExiting,
        onExited: (0, _createChainedFunction.default)(this.handleExited, onExited),
        mountOnEnter: mountOnEnter,
        unmountOnExit: unmountOnExit
      }, pane);
    }

    return pane;
  };

  return TabPane;
}(_react.default.Component);

TabPane.propTypes = propTypes;
TabPane.contextTypes = contextTypes;
TabPane.childContextTypes = childContextTypes;

var _default = (0, _bootstrapUtils.bsClass)('tab-pane', TabPane);

exports.default = _default;
module.exports = exports["default"];

/***/ }),

/***/ 1033:
/***/ (function(module, exports) {

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

module.exports = baseSlice;


/***/ }),

/***/ 1056:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Color;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(11);

var _classnames2 = _interopRequireDefault(_classnames);

__webpack_require__(1209);

var _deviceUtils = __webpack_require__(369);

var _deviceUtils2 = _interopRequireDefault(_deviceUtils);

var _toLower2 = __webpack_require__(239);

var _toLower3 = _interopRequireDefault(_toLower2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CIRCLE_SIZE = _deviceUtils2.default.isMobile() ? 24 : 46;
var CIRCLE_BORDER_GAP = _deviceUtils2.default.isMobile() ? 0 : 3;

var _ref = _react2.default.createElement(
  'div',
  { className: 'shadefinder-finder-colors__star' },
  '\u2605'
);

function Color(props) {
  var color = props.color,
      isRecommendded = props.isRecommendded,
      isActive = props.isActive,
      title = props.title,
      matchedClass = props.matchedClass;


  var getStrokeColor = function getStrokeColor(color) {
    if (_deviceUtils2.default.isMobile()) {
      return 'none';
    }
    return (0, _toLower3.default)(color) === '#ffffff' ? '#ccc' : '#ffffff';
  };

  return _react2.default.createElement(
    'div',
    null,
    isRecommendded && _ref,
    _react2.default.createElement(
      'div',
      { className: 'shadefinder-finder-colors__color-title-container ' + matchedClass },
      _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)({
            'shadefinder-finder-colors__color': true,
            'shadefinder-finder-colors__color--active': isActive
          })
        },
        _react2.default.createElement(
          'svg',
          { width: CIRCLE_SIZE, height: CIRCLE_SIZE },
          _react2.default.createElement('circle', {
            cx: '50%',
            cy: '50%',
            r: CIRCLE_SIZE * 0.5 - CIRCLE_BORDER_GAP,
            fill: color,
            stroke: getStrokeColor(color),
            strokeWidth: 1
          })
        )
      ),
      !!title && _react2.default.createElement(
        'div',
        { className: 'shadefinder-finder-colors__title' },
        title
      )
    )
  );
}
module.exports = exports['default'];

/***/ }),

/***/ 1057:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = __webpack_require__(4);

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = __webpack_require__(59);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(60);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(61);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(63);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(62);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _Color = __webpack_require__(1056);

var _Color2 = _interopRequireDefault(_Color);

__webpack_require__(1210);

var _config = __webpack_require__(86);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var titles = ['Cooler', 'Lighter', 'Best Matched', 'Darker', 'Warmer'];
var initialState = {
  index: 2
};

var Colors = function (_Component) {
  (0, _inherits3.default)(Colors, _Component);

  function Colors(props) {
    (0, _classCallCheck3.default)(this, Colors);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Colors.__proto__ || (0, _getPrototypeOf2.default)(Colors)).call(this, props));

    _this.setIndex = function (index) {
      var _this$props = _this.props,
          colors = _this$props.colors,
          setProducts = _this$props.setProducts;

      _this.setState(function (ps) {
        return (0, _extends3.default)({}, ps, { index: index });
      });
      var color = colors[index];
      if (index === -1) {
        setProducts([]);
      } else {
        setProducts([colors[index]]);
      }
      color && window.YMK && window.YMK.isLoaded() && window.YMK.applyMakeupBySkuItem(_config2.default.skus[color.skuGuid], color.itemGuid);
    };

    _this.state = initialState;
    return _this;
  }

  (0, _createClass3.default)(Colors, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.activeKey !== nextProps.activeKey && this.props.type === nextProps.activeKey) {
        this.setIndex(this.state.index);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var type = this.props.type;

      this.setIndex(type === 'matched' ? 2 : 0);
      this.resetListener = window.YMK.addEventListener('reset', function () {
        return _this2.setIndex(-1);
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.resetListener) window.YMK.removeEventListener(this.resetListener);
      this.resetListener = undefined;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          colors = _props.colors,
          type = _props.type;
      var index = this.state.index;

      return _react2.default.createElement(
        "div",
        { className: "shadefinder-finder-product-colors__container" },
        _react2.default.createElement(
          "div",
          { className: "shadefinder-finder-product-colors" },
          colors.map(function (c, i) {
            return c && _react2.default.createElement(
              "div",
              { key: 'shadefinder-color' + i, onClick: function onClick() {
                  return _this3.setIndex(i);
                } },
              _react2.default.createElement(_Color2.default, {
                color: c && c.color,
                isRecommendded: i === 2 && type === 'matched',
                isActive: i === index,
                title: type === 'matched' ? titles[i] : '',
                matchedClass: type === 'matched' ? 'matched' : ''
              })
            );
          })
        )
      );
    }
  }]);
  return Colors;
}(_react.Component);

exports.default = Colors;
module.exports = exports["default"];

/***/ }),

/***/ 1058:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _typeof2 = __webpack_require__(238);

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = __webpack_require__(4);

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = __webpack_require__(59);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(60);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(61);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(63);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(62);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _Tabs = __webpack_require__(1197);

var _Tabs2 = _interopRequireDefault(_Tabs);

var _Tab = __webpack_require__(925);

var _Tab2 = _interopRequireDefault(_Tab);

var _config = __webpack_require__(86);

var _config2 = _interopRequireDefault(_config);

var _sortBy2 = __webpack_require__(1091);

var _sortBy3 = _interopRequireDefault(_sortBy2);

var _slice2 = __webpack_require__(1090);

var _slice3 = _interopRequireDefault(_slice2);

var _find2 = __webpack_require__(990);

var _find3 = _interopRequireDefault(_find2);

var _filter2 = __webpack_require__(233);

var _filter3 = _interopRequireDefault(_filter2);

var _deviceUtils = __webpack_require__(369);

var _deviceUtils2 = _interopRequireDefault(_deviceUtils);

var _Colors = __webpack_require__(1057);

var _Colors2 = _interopRequireDefault(_Colors);

__webpack_require__(1211);

var _shadefinderskintones = __webpack_require__(236);

var _shadefinderskintones2 = _interopRequireDefault(_shadefinderskintones);

var _shadefindermapping = __webpack_require__(235);

var _shadefindermapping2 = _interopRequireDefault(_shadefindermapping);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
  key: 'matched',
  products: []
};

var _ref = _react2.default.createElement(
  "div",
  { className: "shadefinder-finder-product__skintone-title" },
  "Your Skintone"
);

var _ref2 = _react2.default.createElement(
  "div",
  { className: "shadefinder-finder-product__skintone-title" },
  "Your Skintone:"
);

var _ref3 = _react2.default.createElement(
  "div",
  { className: "shadefinder-finder-product__product-brand-mobile" },
  "Foundation"
);

var _ref4 = _react2.default.createElement(
  "div",
  { className: "shadefinder-finder-product__product-content-button" },
  _react2.default.createElement(
    "button",
    null,
    "Add to cart"
  )
);

var Product = function (_Component) {
  (0, _inherits3.default)(Product, _Component);

  function Product(props) {
    (0, _classCallCheck3.default)(this, Product);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Product.__proto__ || (0, _getPrototypeOf2.default)(Product)).call(this, props));

    _this.hexToInt = function (hex) {
      return parseInt('0x' + hex);
    };

    _this.hexToRgb = function (hex) {
      return {
        r: _this.hexToInt(hex.substring(1, 3)),
        g: _this.hexToInt(hex.substring(3, 5)),
        b: _this.hexToInt(hex.substring(5, 7))
      };
    };

    _this.diff = function (c1, c2) {
      return Math.abs(c1.r - c2.r) + Math.abs(c1.g - c2.g) + Math.abs(c1.b - c2.b);
    };

    _this.getSortedColors = function () {
      var color = _this.props.color;

      var items = _config2.default.shadefindercolors;
      var r = items.map(function (item) {
        var rgb = _this.hexToRgb(item.color);
        return (0, _extends3.default)({}, item, {
          rgb: rgb,
          diff: _this.diff(color, rgb)
        });
      });
      return (0, _sortBy3.default)(r, 'diff');
    };

    _this.getMatchedSkintone = function (pfskintone) {
      var skintones = _shadefinderskintones2.default[pfskintone];
      if (!skintones) {
        skintones = _shadefinderskintones2.default['5W'];
      }

      var _loop = function _loop(i) {
        var skintone = (0, _find3.default)(_shadefindermapping2.default, function (m) {
          return m.pf_skintone === skintones[i];
        });
        if (!!skintone) {
          return {
            v: skintone
          };
        }
      };

      for (var i = 0; i < skintones.length; i++) {
        var _ret = _loop(i);

        if ((typeof _ret === "undefined" ? "undefined" : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
      }
    };

    _this.getMatchedShades = function () {
      var skintone = _this.getMatchedSkintone(_this.props.color.pfskintone);
      return [_this.getItemBySkuItemGuid(skintone['cooler']), _this.getItemBySkuItemGuid(skintone['lighter']), _this.getItemBySkuItemGuid(skintone['recommended']), _this.getItemBySkuItemGuid(skintone['darker']), _this.getItemBySkuItemGuid(skintone['warmer'])];
    };

    _this.getItemBySkuItemGuid = function (skuItemGuid) {
      return (0, _find3.default)(_config2.default.shadefindercolors, function (c) {
        return c.skuItemGuid === skuItemGuid;
      });
    };

    _this.getOtherShades = function () {
      var matched = {};
      _this.getMatchedShades().map(function (s) {
        if (s && s.color) {
          matched[s.color] = 1;
        }
      });
      var filtered = (0, _filter3.default)(_this.getSortedColors(), function (s) {
        return !matched[s && s.color];
      });
      return (0, _slice3.default)(filtered, 10, 30);
    };

    _this.getStrokeColor = function (color) {
      if (color === '#D8D8D8') {
        return '#ccc';
      }
      if (color === '#d8d8d8') {
        return '#ccc';
      }
      return '#d8d8d8';
    };

    _this.getAdjustedColor = function (color) {
      var m = _this.getMatchedShades();
      if (m && m[2] && m[2].color) {
        var mc = _this.hexToRgb(m[2].color);
        return (0, _extends3.default)({}, color, {
          r: Math.round((color.r + mc.r) / 2),
          g: Math.round((color.g + mc.g) / 2),
          b: Math.round((color.b + mc.b) / 2)
        });
      }

      return color;
    };

    _this.rgb2Hex = function (rgb) {
      return '#' + rgb.r.toString(16) + rgb.g.toString(16) + rgb.b.toString(16);
    };

    _this.isMobile = function () {
      return _deviceUtils2.default.isMobile();
    };

    _this.getStyles = function () {
      if (!_this.isMobile()) {
        return {};
      }
      return {
        position: 'fixed',
        width: '100vw',
        zIndex: 2,
        bottom: 0
      };
    };

    _this.handleSelect = function (key) {
      return _this.setState(function (ps) {
        return (0, _extends3.default)({}, ps, { key: key });
      });
    };

    _this.setProducts = function (products) {
      return _this.setState(function (ps) {
        return (0, _extends3.default)({}, ps, { products: products });
      });
    };

    _this.state = initialState;
    return _this;
  }

  (0, _createClass3.default)(Product, [{
    key: "render",
    value: function render() {
      var color = this.props.color;
      var _state = this.state,
          products = _state.products,
          key = _state.key;

      var p = products && products[0];
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "div",
          { className: "shadefinder-finder-product", style: this.getStyles() },
          this.isMobile() ? _react2.default.createElement(
            "div",
            { className: "shadefinder-finder-product__skintone" },
            _react2.default.createElement(
              "div",
              { className: "shadefinder-finder-product__skintone-color" },
              _react2.default.createElement(
                "svg",
                { width: "30", height: "30" },
                _react2.default.createElement("rect", { x: "2", y: "2", rx: "5", ry: "5", width: "26", height: "26",
                  stroke: this.getStrokeColor(this.rgb2Hex(color)),
                  strokeWidth: "1px",
                  fill: this.rgb2Hex(this.getAdjustedColor(color)) })
              )
            ),
            _ref
          ) : _react2.default.createElement(
            "div",
            { className: "shadefinder-finder-product__skintone" },
            _ref2,
            _react2.default.createElement(
              "div",
              { className: "shadefinder-finder-product__skintone-color" },
              _react2.default.createElement(
                "svg",
                { width: "30", height: "30", style: { float: 'left' } },
                _react2.default.createElement("rect", { x: "2", y: "2", rx: "5", ry: "5", width: "26", height: "26",
                  stroke: this.getStrokeColor(this.rgb2Hex(color)),
                  strokeWidth: "1px",
                  fill: this.rgb2Hex(this.getAdjustedColor(color)) })
              ),
              _react2.default.createElement(
                "div",
                { className: "shadefinder-finder-product__skintone-color-info" },
                "(hex: ",
                this.rgb2Hex(color),
                ", pfcolor: ",
                color.pfskintone,
                ")"
              )
            )
          ),
          _react2.default.createElement(
            _Tabs2.default,
            { defaultActiveKey: key, onSelect: this.handleSelect, mountOnEnter: true },
            _react2.default.createElement(
              _Tab2.default,
              { title: this.isMobile() ? "MATCHED" : "Matched Shades", eventKey: 'matched',
                tabClassName: "shadefinder-finder-product__tab" },
              _react2.default.createElement(
                "div",
                { className: "shadefinder-finder-product__colors" },
                _react2.default.createElement(_Colors2.default, { key: "matched", colors: this.getMatchedShades(), type: "matched", activeKey: this.state.key,
                  setProducts: this.setProducts })
              )
            ),
            _react2.default.createElement(
              _Tab2.default,
              { title: this.isMobile() ? "OTHER COLORS" : "Other Shades", eventKey: 'others',
                tabClassName: "shadefinder-finder-product__tab" },
              _react2.default.createElement(
                "div",
                { className: "shadefinder-finder-product__colors" },
                _react2.default.createElement(_Colors2.default, { key: "others", colors: this.getOtherShades(), type: "others", activeKey: this.state.key,
                  setProducts: this.setProducts })
              )
            )
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "shadefinder-finder-product__products" },
          p && this.isMobile() && _react2.default.createElement(
            "div",
            { className: "shadefinder-finder-product__product-mobile" },
            _react2.default.createElement(
              "div",
              { className: "shadefinder-finder-product__product-thumbnail-mobile" },
              _react2.default.createElement("img", { src: p.thumbnail, className: "products" })
            ),
            _ref3,
            _react2.default.createElement(
              "div",
              { className: "shadefinder-finder-product__product-title-mobile" },
              p.title
            ),
            _react2.default.createElement(
              "div",
              { className: "shadefinder-finder-product__product-price-mobile" },
              p.price
            )
          ),
          p && !this.isMobile() && _react2.default.createElement(
            "div",
            { className: "shadefinder-finder-product__product" },
            _react2.default.createElement(
              "div",
              { className: "shadefinder-finder-product__product-thumbnail" },
              _react2.default.createElement("img", { src: p.thumbnail, className: "products" })
            ),
            _react2.default.createElement(
              "div",
              { className: "shadefinder-finder-product__product-content" },
              _react2.default.createElement(
                "div",
                { className: "shadefinder-finder-product__product-content-brand" },
                p.brand
              ),
              _react2.default.createElement(
                "div",
                { className: "shadefinder-finder-product__product-content-title" },
                p.title
              ),
              _react2.default.createElement(
                "div",
                { className: "shadefinder-finder-product__product-content-price" },
                p.price
              ),
              _ref4
            )
          )
        )
      );
    }
  }]);
  return Product;
}(_react.Component);

exports.default = Product;
module.exports = exports["default"];

/***/ }),

/***/ 1065:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(40)(undefined);
// imports


// module
exports.push([module.i, ".shadefinder-finder-colors__star {\r\n  position: absolute;\r\n  font-size: 16px;\r\n  color: #f23b77;\r\n}\r\n\r\n.shadefinder-finder-colors__color-title-container {\r\n  width: 50px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: start;\r\n  align-items: center;\r\n}\r\n\r\n.shadefinder-finder-colors__color {\r\n  border: 2px solid white;\r\n  border-radius: 50%;\r\n  cursor: pointer;\r\n  height: 50px;\r\n}\r\n\r\n.shadefinder-finder-colors__title {\r\n  font-size: 0.7em;\r\n  text-align: center;\r\n}\r\n\r\n@media screen and (min-width: 600px) {\r\n  .shadefinder-finder-colors__star {\r\n    margin-top: -8px;\r\n    margin-left: 39px;\r\n  }\r\n\r\n  .shadefinder-finder-colors__color:hover,\r\n  .shadefinder-finder-colors__color--active {\r\n    border: 2px solid #f23b77;\r\n  }\r\n}\r\n\r\n@media screen and (max-width: 600px) {\r\n  .shadefinder-finder-colors__color-title-container.matched {\r\n    width: 19.5vw;\r\n  }\r\n\r\n  .shadefinder-finder-colors__star {\r\n    margin-top: -10px;\r\n    margin-left: 12vw;\r\n  }\r\n\r\n  .shadefinder-finder-colors__color {\r\n    margin: 0 auto;\r\n    width: 30px;\r\n    height: 30px;\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n  }\r\n\r\n  .shadefinder-finder-colors__color:hover,\r\n  .shadefinder-finder-colors__color--active {\r\n    border: 2px solid #04a8af;\r\n  }\r\n\r\n  .shadefinder-finder-colors__title {\r\n    color: white;\r\n    white-space: nowrap;\r\n  }\r\n}\r\n", ""]);

// exports


/***/ }),

/***/ 1066:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(40)(undefined);
// imports


// module
exports.push([module.i, ".shadefinder-finder-product-colors {\r\n  display: flex;\r\n  justify-content: flex-start;\r\n}\r\n\r\n@media screen and (min-width: 600px) {\r\n  .shadefinder-finder-product-colors__container {\r\n    padding: 12px 0;\r\n    border-bottom: #ccc solid 1px;\r\n  }\r\n\r\n  .shadefinder-finder-product-colors {\r\n    flex-flow: wrap;\r\n  }\r\n}\r\n\r\n@media screen and (max-width: 600px) {\r\n  .shadefinder-finder-product-colors {\r\n    flex-flow: nowrap;\r\n    overflow-x: scroll;\r\n    overflow-y: hidden;\r\n    height: 100%;\r\n    padding-bottom: 8px;\r\n  }\r\n}\r\n", ""]);

// exports


/***/ }),

/***/ 1067:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(40)(undefined);
// imports


// module
exports.push([module.i, "/*.nav-tabs > li.active > a, .nav-tabs > li.active > a:hover, .nav-tabs > li.active > a:focus {*/\r\n/*color: #f23b77;*/\r\n/*}*/\r\n\r\n.shadefinder-finder-product {\r\n  float: left;\r\n  width: 550px;\r\n}\r\n\r\n.shadefinder-finder-product__colors {\r\n  margin-top: 5px;\r\n}\r\n\r\n.shadefinder-finder-product > .nav-tabs > li {\r\n  width: 50%;\r\n  text-align: center;\r\n}\r\n\r\n.shadefinder-finder-product__product {\r\n  border-bottom: 1px solid #ddd;\r\n  height: 100px;\r\n  margin: 10px;\r\n}\r\n\r\n.shadefinder-finder-product__product-thumbnail {\r\n  float: left;\r\n  width: 100px;\r\n\r\n}\r\n\r\n.shadefinder-finder-product__product-thumbnail img {\r\n  width: 80px;\r\n}\r\n\r\n.shadefinder-finder-product__product-content {\r\n\r\n}\r\n\r\n.shadefinder-finder-product__product-content-brand {\r\n  font-size: 16px;\r\n  text-align: left;\r\n  line-height: 20px;\r\n  overflow: hidden;\r\n  font-weight: 400;\r\n  white-space: nowrap;\r\n  -ms-text-overflow: ellipsis;\r\n  text-overflow: ellipsis;\r\n}\r\n\r\n.shadefinder-finder-product__product-content-title {\r\n  color: #464646;\r\n  font-weight: normal;\r\n  font-size: 13px;\r\n  line-height: 17px;\r\n}\r\n\r\n.shadefinder-finder-product__product-content-price {\r\n  color: #ef3f78;\r\n  font-weight: 600;\r\n  text-align: left;\r\n  font-size: 15px;\r\n  line-height: 17px;\r\n  display: none;\r\n}\r\n\r\n.shadefinder-finder-product__product-content-button button {\r\n  background-color: #ef3f78;\r\n  height: 36px;\r\n  line-height: 32px;\r\n  vertical-align: middle;\r\n  font-size: 15px;\r\n  border-radius: 4px;\r\n  color: white;\r\n  border: 1px solid #ef3f78;\r\n  outline: 0;\r\n  cursor: pointer;\r\n  margin-top: 10px;\r\n  padding: 0 20px;\r\n}\r\n\r\n.shadefinder-finder-product__product-mobile {\r\n  margin-left: 10px;\r\n  overflow: hidden;\r\n  pointer-events: none;\r\n}\r\n\r\n.shadefinder-finder-product__product-thumbnail-mobile {\r\n  width: 80px;\r\n  line-height: 0;\r\n}\r\n\r\n.shadefinder-finder-product__product-thumbnail-mobile img {\r\n  width: 80px;\r\n}\r\n\r\n.shadefinder-finder-product__product-brand-mobile {\r\n  color: #eee;\r\n  font-size: 13px;\r\n  text-align: left;\r\n  line-height: 20px;\r\n  overflow: hidden;\r\n  white-space: nowrap;\r\n  -ms-text-overflow: ellipsis;\r\n  text-overflow: ellipsis;\r\n}\r\n\r\n.shadefinder-finder-product__product-title-mobile {\r\n  color: #eee;\r\n  font-size: 13px;\r\n  line-height: 17px;\r\n  width: 150px;\r\n}\r\n\r\n.shadefinder-finder-product__product-price-mobile {\r\n  color: #ef3f78;\r\n  font-weight: 600;\r\n  text-align: left;\r\n  font-size: 14px;\r\n  line-height: 17px;\r\n  display: none;\r\n}\r\n\r\n.shadefinder-finder-product__products {\r\n  float: left;\r\n  width: 550px;\r\n}\r\n\r\n.shadefinder-finder-product__skintone-color-info {\r\n  height: 30px;\r\n  line-height: 30px;\r\n  float: left;\r\n}\r\n\r\n@media screen and (min-width: 500px) {\r\n  .shadefinder-finder-product__skintone {\r\n    margin-bottom: 5px;\r\n  }\r\n\r\n  .shadefinder-finder-product__skintone-title {\r\n    float: left;\r\n    font-size: 20px;\r\n    height: 60px;\r\n    line-height: 30px;\r\n    vertical-align: middle;\r\n    margin-right: 5px;\r\n  }\r\n\r\n  .shadefinder-finder-product__skintone-color {\r\n    height: 30px;\r\n    line-height: 30px;\r\n  }\r\n}\r\n\r\n@media screen and (max-width: 499px) {\r\n  .shadefinder-finder-product__product-mobile,\r\n  .shadefinder-finder-product__skintone {\r\n    position: fixed;\r\n    bottom: 103px;\r\n    right: 0;\r\n    pointer-events: none;\r\n  }\r\n  .shadefinder-finder-product__skintone {\r\n    right: 0;\r\n  }\r\n  .shadefinder-finder-product__product-mobile {\r\n    left: 0;\r\n  }\r\n\r\n  .shadefinder-finder-product__skintone-title {\r\n    float: left;\r\n    font-size: 13px;\r\n    color: #eee;\r\n    height: 20px;\r\n    line-height: 20px;\r\n    vertical-align: middle;\r\n    margin-right: 5px;\r\n  }\r\n\r\n  .shadefinder-finder-product__skintone-color {\r\n    height: 30px;\r\n    line-height: 30px;\r\n    text-align: center;\r\n  }\r\n\r\n  .shadefinder-finder-product__product-thumbnail-mobile {\r\n    background-color: white;\r\n    border-radius: 10px;\r\n    margin-bottom: 2px;\r\n  }\r\n\r\n  .shadefinder-finder-product {\r\n    background-color: rgba(0, 0, 0, 0.8);\r\n    padding-top: 2px;\r\n    padding-left: 2px;\r\n  }\r\n\r\n  .shadefinder-finder-product__products {\r\n    position: absolute;\r\n    z-index: 1000;\r\n  }\r\n\r\n  .shadefinder-finder-product {\r\n    position: fixed;\r\n  }\r\n\r\n  .shadefinder-finder-product__tab {\r\n    width: 50%;\r\n    text-align: center;\r\n  }\r\n\r\n  .shadefinder-finder-product__tab a {\r\n    background-color: rgba(177, 177, 177, 0.5) !important;\r\n    color: #eee !important;\r\n    padding: 0 !important;\r\n    height: 30px !important;\r\n    border: 0 !important;\r\n    margin-top: -3px !important;\r\n    margin-right: 0 !important;\r\n    line-height: 30px !important;\r\n    vertical-align: middle !important;\r\n  }\r\n\r\n  .active > a {\r\n    background-color: transparent !important;\r\n    border: 1px solid transparent !important;\r\n    color: #eee !important;\r\n  }\r\n\r\n  .nav-tabs {\r\n    border: 1px solid transparent;\r\n  }\r\n\r\n  .shadefinder-finder-product__colors {\r\n    height: 60px;\r\n    overflow-x: scroll;\r\n  }\r\n}\r\n", ""]);

// exports


/***/ }),

/***/ 1076:
/***/ (function(module, exports, __webpack_require__) {

var arrayMap = __webpack_require__(379),
    baseIteratee = __webpack_require__(225),
    baseMap = __webpack_require__(936),
    baseSortBy = __webpack_require__(1077),
    baseUnary = __webpack_require__(391),
    compareMultiple = __webpack_require__(1080),
    identity = __webpack_require__(226);

/**
 * The base implementation of `_.orderBy` without param guards.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
 * @param {string[]} orders The sort orders of `iteratees`.
 * @returns {Array} Returns the new sorted array.
 */
function baseOrderBy(collection, iteratees, orders) {
  var index = -1;
  iteratees = arrayMap(iteratees.length ? iteratees : [identity], baseUnary(baseIteratee));

  var result = baseMap(collection, function(value, key, collection) {
    var criteria = arrayMap(iteratees, function(iteratee) {
      return iteratee(value);
    });
    return { 'criteria': criteria, 'index': ++index, 'value': value };
  });

  return baseSortBy(result, function(object, other) {
    return compareMultiple(object, other, orders);
  });
}

module.exports = baseOrderBy;


/***/ }),

/***/ 1077:
/***/ (function(module, exports) {

/**
 * The base implementation of `_.sortBy` which uses `comparer` to define the
 * sort order of `array` and replaces criteria objects with their corresponding
 * values.
 *
 * @private
 * @param {Array} array The array to sort.
 * @param {Function} comparer The function to define sort order.
 * @returns {Array} Returns `array`.
 */
function baseSortBy(array, comparer) {
  var length = array.length;

  array.sort(comparer);
  while (length--) {
    array[length] = array[length].value;
  }
  return array;
}

module.exports = baseSortBy;


/***/ }),

/***/ 1079:
/***/ (function(module, exports, __webpack_require__) {

var isSymbol = __webpack_require__(106);

/**
 * Compares values to sort them in ascending order.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {number} Returns the sort order indicator for `value`.
 */
function compareAscending(value, other) {
  if (value !== other) {
    var valIsDefined = value !== undefined,
        valIsNull = value === null,
        valIsReflexive = value === value,
        valIsSymbol = isSymbol(value);

    var othIsDefined = other !== undefined,
        othIsNull = other === null,
        othIsReflexive = other === other,
        othIsSymbol = isSymbol(other);

    if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
        (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
        (valIsNull && othIsDefined && othIsReflexive) ||
        (!valIsDefined && othIsReflexive) ||
        !valIsReflexive) {
      return 1;
    }
    if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
        (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
        (othIsNull && valIsDefined && valIsReflexive) ||
        (!othIsDefined && valIsReflexive) ||
        !othIsReflexive) {
      return -1;
    }
  }
  return 0;
}

module.exports = compareAscending;


/***/ }),

/***/ 1080:
/***/ (function(module, exports, __webpack_require__) {

var compareAscending = __webpack_require__(1079);

/**
 * Used by `_.orderBy` to compare multiple properties of a value to another
 * and stable sort them.
 *
 * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
 * specify an order of "desc" for descending or "asc" for ascending sort order
 * of corresponding values.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {boolean[]|string[]} orders The order to sort by for each property.
 * @returns {number} Returns the sort order indicator for `object`.
 */
function compareMultiple(object, other, orders) {
  var index = -1,
      objCriteria = object.criteria,
      othCriteria = other.criteria,
      length = objCriteria.length,
      ordersLength = orders.length;

  while (++index < length) {
    var result = compareAscending(objCriteria[index], othCriteria[index]);
    if (result) {
      if (index >= ordersLength) {
        return result;
      }
      var order = orders[index];
      return result * (order == 'desc' ? -1 : 1);
    }
  }
  // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
  // that causes it, under certain circumstances, to provide the same value for
  // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
  // for more details.
  //
  // This also ensures a stable sort in V8 and other engines.
  // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
  return object.index - other.index;
}

module.exports = compareMultiple;


/***/ }),

/***/ 1090:
/***/ (function(module, exports, __webpack_require__) {

var baseSlice = __webpack_require__(1033),
    isIterateeCall = __webpack_require__(385),
    toInteger = __webpack_require__(376);

/**
 * Creates a slice of `array` from `start` up to, but not including, `end`.
 *
 * **Note:** This method is used instead of
 * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are
 * returned.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function slice(array, start, end) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  if (end && typeof end != 'number' && isIterateeCall(array, start, end)) {
    start = 0;
    end = length;
  }
  else {
    start = start == null ? 0 : toInteger(start);
    end = end === undefined ? length : toInteger(end);
  }
  return baseSlice(array, start, end);
}

module.exports = slice;


/***/ }),

/***/ 1091:
/***/ (function(module, exports, __webpack_require__) {

var baseFlatten = __webpack_require__(232),
    baseOrderBy = __webpack_require__(1076),
    baseRest = __webpack_require__(937),
    isIterateeCall = __webpack_require__(385);

/**
 * Creates an array of elements, sorted in ascending order by the results of
 * running each element in a collection thru each iteratee. This method
 * performs a stable sort, that is, it preserves the original sort order of
 * equal elements. The iteratees are invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {...(Function|Function[])} [iteratees=[_.identity]]
 *  The iteratees to sort by.
 * @returns {Array} Returns the new sorted array.
 * @example
 *
 * var users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 40 },
 *   { 'user': 'barney', 'age': 34 }
 * ];
 *
 * _.sortBy(users, [function(o) { return o.user; }]);
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
 *
 * _.sortBy(users, ['user', 'age']);
 * // => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
 */
var sortBy = baseRest(function(collection, iteratees) {
  if (collection == null) {
    return [];
  }
  var length = iteratees.length;
  if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
    iteratees = [];
  } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
    iteratees = [iteratees[0]];
  }
  return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
});

module.exports = sortBy;


/***/ }),

/***/ 1197:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(3);

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__(6));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(9));

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(8));

var _react = _interopRequireDefault(__webpack_require__(1));

var _propTypes = _interopRequireDefault(__webpack_require__(2));

var _isRequiredForA11y = _interopRequireDefault(__webpack_require__(394));

var _uncontrollable = __webpack_require__(231);

var _elementType = _interopRequireDefault(__webpack_require__(84));

var _Nav = _interopRequireDefault(__webpack_require__(381));

var _NavItem = _interopRequireDefault(__webpack_require__(382));

var _TabContainer = _interopRequireDefault(__webpack_require__(961));

var _TabContent = _interopRequireDefault(__webpack_require__(962));

var _bootstrapUtils = __webpack_require__(16);

var _ValidComponentChildren = _interopRequireDefault(__webpack_require__(89));

var TabContainer = _TabContainer.default.ControlledComponent;
var propTypes = {
  /**
   * Mark the Tab with a matching `eventKey` as active.
   *
   * @controllable onSelect
   */
  activeKey: _propTypes.default.any,

  /**
   * Navigation style
   */
  bsStyle: _propTypes.default.oneOf(['tabs', 'pills']),

  /**
   * Sets a default animation strategy. Use `false` to disable, `true`
   * to enable the default `<Fade>` animation, or a react-transition-group
   * v2 `<Transition/>` component.
   */
  animation: _propTypes.default.oneOfType([_propTypes.default.bool, _elementType.default]),
  id: (0, _isRequiredForA11y.default)(_propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])),

  /**
   * Callback fired when a Tab is selected.
   *
   * ```js
   * function (
   *   Any eventKey,
   *   SyntheticEvent event?
   * )
   * ```
   *
   * @controllable activeKey
   */
  onSelect: _propTypes.default.func,

  /**
   * Wait until the first "enter" transition to mount tabs (add them to the DOM)
   */
  mountOnEnter: _propTypes.default.bool,

  /**
   * Unmount tabs (remove it from the DOM) when it is no longer visible
   */
  unmountOnExit: _propTypes.default.bool
};
var defaultProps = {
  bsStyle: 'tabs',
  animation: true,
  mountOnEnter: false,
  unmountOnExit: false
};

function getDefaultActiveKey(children) {
  var defaultActiveKey;

  _ValidComponentChildren.default.forEach(children, function (child) {
    if (defaultActiveKey == null) {
      defaultActiveKey = child.props.eventKey;
    }
  });

  return defaultActiveKey;
}

var Tabs =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Tabs, _React$Component);

  function Tabs() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Tabs.prototype;

  _proto.renderTab = function renderTab(child) {
    var _child$props = child.props,
        title = _child$props.title,
        eventKey = _child$props.eventKey,
        disabled = _child$props.disabled,
        tabClassName = _child$props.tabClassName;

    if (title == null) {
      return null;
    }

    return _react.default.createElement(_NavItem.default, {
      eventKey: eventKey,
      disabled: disabled,
      className: tabClassName
    }, title);
  };

  _proto.render = function render() {
    var _this$props = this.props,
        id = _this$props.id,
        onSelect = _this$props.onSelect,
        animation = _this$props.animation,
        mountOnEnter = _this$props.mountOnEnter,
        unmountOnExit = _this$props.unmountOnExit,
        bsClass = _this$props.bsClass,
        className = _this$props.className,
        style = _this$props.style,
        children = _this$props.children,
        _this$props$activeKey = _this$props.activeKey,
        activeKey = _this$props$activeKey === void 0 ? getDefaultActiveKey(children) : _this$props$activeKey,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["id", "onSelect", "animation", "mountOnEnter", "unmountOnExit", "bsClass", "className", "style", "children", "activeKey"]);
    return _react.default.createElement(TabContainer, {
      id: id,
      activeKey: activeKey,
      onSelect: onSelect,
      className: className,
      style: style
    }, _react.default.createElement("div", null, _react.default.createElement(_Nav.default, (0, _extends2.default)({}, props, {
      role: "tablist"
    }), _ValidComponentChildren.default.map(children, this.renderTab)), _react.default.createElement(_TabContent.default, {
      bsClass: bsClass,
      animation: animation,
      mountOnEnter: mountOnEnter,
      unmountOnExit: unmountOnExit
    }, children)));
  };

  return Tabs;
}(_react.default.Component);

Tabs.propTypes = propTypes;
Tabs.defaultProps = defaultProps;
(0, _bootstrapUtils.bsClass)('tab', Tabs);

var _default = (0, _uncontrollable.uncontrollable)(Tabs, {
  activeKey: 'onSelect'
});

exports.default = _default;
module.exports = exports["default"];

/***/ }),

/***/ 1209:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1065);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(41)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./Color.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./Color.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1210:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1066);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(41)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./Colors.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./Colors.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1211:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1067);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(41)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./Product.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./Product.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1215:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA3lBMVEUAAADyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3fyO3cAAAD0nXhyAAAASHRSTlMAY+/sV2nrYvFb/XB4WYVO+oiQQpcB9pk8pQM3NrEtsgYPEbj8/oIk6b4K8uTqfL8fyRzccdMQFdR1aNjPf08LikhMJ6OW+dc8mgSLAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAUtJREFUaN7t1llTwjAUhuGjQmVTQAEFFa1bBXEBRNxxN///F9mcWkfHKunyOYOe9zKT5JnJTQ6RJEmSJEmSJEkT1dT0TAptpJVSFtiYdQ2VwRrZnEbyv2AUJt6YY2MeahRL2iiLYWwsQI1FNipVqFH7S8YS1Fhmo95AGisZMUxbZWMNajQtbaxv/FvD3gxpbIU38ts7u4ZbnT1ttNrhX2Df+E9wOlENOtAnD7EGpQznDc84imSYTjXHbHTtaIarqPFKrx/P8CZmpU6ghq+kocY4xTMGp/GMn5XhGRvDuAbROSsXQcYgKYOooK/KZaHGd4pnXCZkBCv2lV7s95IyiK6/KHY3aYOozMoN1HhTSkWo8VkZsdFxkjaIbt+VdgtlULXCyh3S8JXaPdLwFc56ABkfFKsJM1zlEW8QNep4w1Wenl/QhiRJkiRJUlCvVQ1su46IhwAAAAAASUVORK5CYII="

/***/ }),

/***/ 1551:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(40)(undefined);
// imports


// module
exports.push([module.i, ".shadefinder-finder {\r\n  margin: 0 auto;\r\n  padding: 0;\r\n  height: 480px;\r\n  position: relative;\r\n  max-width: 950px;\r\n}\r\n\r\n.shadefinder-finder__module {\r\n  float: left;\r\n  margin-right: 40px;\r\n}\r\n\r\n.shadefinder-finder__intro {\r\n  width: 550px;\r\n  float: right;\r\n  padding: 100px 80px 0 40px;\r\n}\r\n\r\n.shadefinder-finder__title {\r\n  margin-bottom: 20px;\r\n  font-size: 36px;\r\n  font-weight: 500;\r\n  text-align: center;\r\n}\r\n\r\n.shadefinder-finder__desc {\r\n  font-size: 20px;\r\n  text-align: center;\r\n}\r\n\r\n.shadefinder-finder__status {\r\n  margin-left: 80px;\r\n  display: block;\r\n  height: 36px;\r\n  line-height: 36px;\r\n  vertical-align: middle;\r\n}\r\n\r\n.shadefinder-finder__status-icon {\r\n  height: 36px;\r\n  line-height: 36px;\r\n  float: left;\r\n}\r\n\r\n.shadefinder-finder__status-icon img {\r\n  height: 100%;\r\n\r\n}\r\n\r\n.shadefinder-finder__status-text {\r\n  float: left;\r\n  font-size: 20px;\r\n}\r\n\r\n.shadefinder-finder__intro-mobile {\r\n  padding-top: 10px;\r\n  width: 100vw;\r\n  height: 50px;\r\n  font-size: 20px;\r\n  font-weight: 500;\r\n  text-indent: 10px;\r\n}\r\n\r\n.shadefinder-finder__intro-detected--mobile {\r\n  position: absolute;\r\n  top: 50%;\r\n  color: white;\r\n  font-family: Avenir, \"Segoe UI\", \"Microsoft JhengHei\";\r\n  font-size: 24px;\r\n  width: 100%;\r\n  text-align: center;\r\n  margin-top: -20px;\r\n  z-index: 2;\r\n}\r\n\r\n@media screen and (max-width: 499px) {\r\n  .shadefinder-finder__title {\r\n    display: none;\r\n  }\r\n\r\n  .shadefinder-finder__intro {\r\n    display: none;\r\n  }\r\n\r\n  .shadefinder-finder__status-icon {\r\n    display: none;\r\n  }\r\n\r\n  .shadefinder-finder {\r\n    position: fixed;\r\n    margin: 0 auto;\r\n    padding: 0;\r\n  }\r\n}\r\n\r\n@media screen and(max-width: 320px) {\r\n  .shadefinder-finder__intro-mobile {\r\n    padding-top: 10px;\r\n    width: 100vw;\r\n    height: 45px;\r\n    font-size: 16px;\r\n    font-weight: 500;\r\n    text-indent: 5px;\r\n  }\r\n}\r\n", ""]);

// exports


/***/ }),

/***/ 1695:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1551);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(41)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./index.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./index.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 839:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _regenerator = __webpack_require__(104);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(103);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = __webpack_require__(4);

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = __webpack_require__(59);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(60);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(61);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(63);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(62);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(26);

var _shadefinderReducer = __webpack_require__(389);

var _header = __webpack_require__(224);

var _header2 = _interopRequireDefault(_header);

var _footer = __webpack_require__(368);

var _footer2 = _interopRequireDefault(_footer);

var _Product = __webpack_require__(1058);

var _Product2 = _interopRequireDefault(_Product);

__webpack_require__(1695);

var _reactRouter = __webpack_require__(101);

var _deviceUtils = __webpack_require__(369);

var _deviceUtils2 = _interopRequireDefault(_deviceUtils);

var _connect = __webpack_require__(241);

var _connect2 = _interopRequireDefault(_connect);

var _get2 = __webpack_require__(100);

var _get3 = _interopRequireDefault(_get2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initializeState = {
  phase: 'init',
  color: null,
  isModuleVisible: false
};

var _ref2 = _react2.default.createElement(
  "div",
  { className: "shadefinder-finder__title" },
  "SMART SHADE FINDER"
);

var _ref3 = _react2.default.createElement(
  "div",
  { className: "shadefinder-finder__status-text" },
  "Loading..."
);

var _ref4 = _react2.default.createElement(
  "div",
  { className: "shadefinder-finder__intro" },
  _react2.default.createElement(
    "div",
    { className: "shadefinder-finder__title" },
    "SMART SHADE FINDER"
  ),
  _react2.default.createElement(
    "div",
    { className: "shadefinder-finder__desc" },
    "Let's get started.",
    _react2.default.createElement("br", null),
    "Keep your face inside the circle and hold still for skintone detection"
  )
);

var _ref5 = _react2.default.createElement(
  "div",
  { className: "shadefinder-finder__title" },
  "SMART SHADE FINDER"
);

var _ref6 = _react2.default.createElement(
  "div",
  { className: "shadefinder-finder__status-text" },
  "Shade detecting..."
);

var _ref7 = _react2.default.createElement(
  "div",
  { className: "shadefinder-finder__title" },
  "SMART SHADE FINDER"
);

var _ref8 = _react2.default.createElement(
  "div",
  { className: "shadefinder-finder__status-text" },
  "Shade detected"
);

var _ref9 = _react2.default.createElement(
  "div",
  { className: "shadefinder-finder__status-text" },
  "Preparing shades..."
);

var _ref10 = _react2.default.createElement(
  "div",
  { className: "shadefinder-finder__intro-detected--mobile" },
  "Preparing shades..."
);

var Finder = (_dec = (0, _connect2.default)(function (state) {
  return {
    language: state.app.language,
    isShadefinderAllowed: state.pages.shadefinder.isShadefinderAllowed
  };
}, function (dispatch) {
  return (0, _redux.bindActionCreators)({ checkIsShadefinderAllowed: _shadefinderReducer.checkIsShadefinderAllowed }, dispatch);
}), _dec(_class = function (_Component) {
  (0, _inherits3.default)(Finder, _Component);

  function Finder(props) {
    (0, _classCallCheck3.default)(this, Finder);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Finder.__proto__ || (0, _getPrototypeOf2.default)(Finder)).call(this, props));

    _this.setPhase = function (phase) {
      return _this.setState(function (ps) {
        return (0, _extends3.default)({}, ps, { phase: phase });
      });
    };

    _this.setColor = function (color) {
      return _this.setState(function (ps) {
        return (0, _extends3.default)({}, ps, { color: color });
      });
    };

    _this.setIsModuleVisible = function (isModuleVisible) {
      return _this.setState(function (ps) {
        return (0, _extends3.default)({}, ps, { isModuleVisible: isModuleVisible });
      });
    };

    _this.removeEventListeners = function () {
      return _this.listeners && !!_this.listeners.length && _this.listeners.map(window.YMK && window.YMK.removeEventListener);
    };

    _this.clearTimers = function () {
      _this.initTimer && clearTimeout(_this.initTimer);
      _this.initTimer = null;
      _this.openTimer && clearTimeout(_this.openTimer);
      _this.openTimer = null;
      _this.productPhaseTimer && clearTimeout(_this.productPhaseTimer);
      _this.productPhaseTimer = null;
    };

    _this.closeShadeFinder = function () {
      if (window.YMK) {
        window.YMK.closeEngine();
        window.YMK.close();
      }
    };

    _this.init = function () {
      var language = _this.props.language;

      _this.setState(function (ps) {
        return (0, _extends3.default)({}, ps, initializeState);
      });
      if (!window.YMK) {
        _this.initTimer && clearTimeout(_this.initTimer);
        _this.initTimer = setTimeout(_this.init, 100);
        return;
      }
      _this.removeEventListeners();
      _this.clearTimers();
      _this.closeShadeFinder();
      _this.openTimer = setTimeout(function () {
        window.YMK.init({
          width: _this.moduleWidth,
          height: _this.moduleHeight,
          disable2ColorComparison: true,
          showCompareCaption: true,
          hideRightButtonsOnResultPage: _this.isMobile,
          hideTakeAPhotoIcon: _this.isMobile,
          userBIPAConsent: 'agree',
          userGoogleAnalyticsConsent: 'agree',
          language: language
        });
        _this.registerYmkEvents();
        window.YMK.openShadeFinder();
      }, 1000);
    };

    _this.restart = function () {
      window.YMK.resume();
      _this.setState(function (ps) {
        return (0, _extends3.default)({}, ps, initializeState, { phase: 'loading' });
      });
      _this.removeEventListeners();
      _this.clearTimers();

      var RESUME_TIME = 1600; // for releasing video-source correctly before reopen
      _this.openTimer = setTimeout(function () {
        _this.registerYmkEvents();
        window.YMK.openShadeFinder();
      }, RESUME_TIME);
    };

    _this.registerYmkEvents = function () {
      var opened = window.YMK.addEventListener('opened', function () {
        _this.setIsModuleVisible(true);
        var closed = window.YMK.addEventListener('closed', function () {
          return window.location.href = '/showcase/shadefinder/home';
        });
        _this.listeners = _this.listeners.concat([opened, closed]);
      });

      var l0 = window.YMK.addEventListener('loaded', function () {
        var l1 = window.YMK.addEventListener('shadeFinderStarted', function () {
          _this.setPhase('detecting');
          window.YMK.reset();
        });
        var l2 = window.YMK.addEventListener('shadeFinderComplete', function (color) {
          _this.setColor(color);
          _this.setPhase('detected');
          _this.productPhaseTimer = setTimeout(function () {
            _this.setPhase('product');
            window.YMK.enableCompare();
          }, _this.isMobile ? 1000 : 1500);
        });
        var l3 = window.YMK.addEventListener('_backIconClicked', _this.restart);
        _this.listeners = _this.listeners.concat([l0, l1, l2, l3]);
      });
    };

    _this.state = initializeState;
    _this.isMobile = _deviceUtils2.default.isMobile();
    _this.listeners = [];
    _this.initTimer = null;
    _this.openTimer = null;
    _this.productPhaseTimer = null;
    _this.moduleWidth = 360;
    _this.moduleHeight = 480;
    return _this;
  }

  (0, _createClass3.default)(Finder, [{
    key: "componentDidMount",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var isShadefinderAllowed, headerHeight;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.props.checkIsShadefinderAllowed();

              case 2:
                isShadefinderAllowed = _context.sent;

                if (isShadefinderAllowed) {
                  _context.next = 6;
                  break;
                }

                _reactRouter.browserHistory.push('/showcase/shadefinder/home');
                return _context.abrupt("return");

              case 6:
                if (this.isMobile) {
                  headerHeight = (0, _get3.default)(this.containerRef, 'offsetTop', 48);

                  this.moduleHeight = window.innerHeight - headerHeight;
                  this.moduleWidth = window.innerWidth;
                }
                this.init();

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidMount() {
        return _ref.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.removeEventListeners();
      this.clearTimers();
      this.closeShadeFinder();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          phase = _state.phase,
          color = _state.color,
          isModuleVisible = _state.isModuleVisible;
      var isShadefinderAllowed = this.props.isShadefinderAllowed;


      if (!isShadefinderAllowed) {
        return false;
      }
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "div",
          {
            ref: function ref(r) {
              return _this2.containerRef = r;
            },
            className: "shadefinder-finder",
            style: { backgroundColor: phase === 'product' ? 'white' : '#e4e4e4', width: this.isMobile ? this.moduleWidth + "px" : 'auto', height: this.moduleHeight + "px" }
          },
          _react2.default.createElement(
            "div",
            { className: "shadefinder-finder__module" },
            _react2.default.createElement("div", { id: "YMK-module", ref: function ref(r) {
                return _this2.moduleRef = r;
              }, style: { visibility: isModuleVisible ? 'visible' : 'hidden' } })
          ),
          phase === 'loading' && _react2.default.createElement(
            "div",
            { className: "shadefinder-finder__intro" },
            _ref2,
            _react2.default.createElement(
              "div",
              { className: "shadefinder-finder__status" },
              _react2.default.createElement(
                "div",
                { className: "shadefinder-finder__status-icon" },
                _react2.default.createElement("img", { src: __webpack_require__(375) })
              ),
              _ref3
            )
          ),
          phase === 'init' && _ref4,
          phase === 'detecting' && _react2.default.createElement(
            "div",
            { className: "shadefinder-finder__intro" },
            _ref5,
            _react2.default.createElement(
              "div",
              { className: "shadefinder-finder__status" },
              _react2.default.createElement(
                "div",
                { className: "shadefinder-finder__status-icon" },
                _react2.default.createElement("img", { src: __webpack_require__(375) })
              ),
              _ref6
            )
          ),
          phase === 'detected' && !this.isMobile && _react2.default.createElement(
            "div",
            { className: "shadefinder-finder__intro" },
            _ref7,
            _react2.default.createElement(
              "div",
              { className: "shadefinder-finder__status" },
              _react2.default.createElement(
                "div",
                { className: "shadefinder-finder__status-icon" },
                _react2.default.createElement("img", { src: __webpack_require__(1215) })
              ),
              _ref8
            ),
            _react2.default.createElement(
              "div",
              { className: "shadefinder-finder__status" },
              _react2.default.createElement(
                "div",
                { className: "shadefinder-finder__status-icon" },
                _react2.default.createElement("img", { src: __webpack_require__(375) })
              ),
              _ref9
            )
          ),
          phase === 'detected' && this.isMobile && _ref10,
          phase === 'product' && _react2.default.createElement(_Product2.default, { color: color })
        )
      );
    }
  }]);
  return Finder;
}(_react.Component)) || _class);
exports.default = Finder;
module.exports = exports["default"];

/***/ }),

/***/ 864:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(3);

var _interopRequireWildcard = __webpack_require__(139);

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__(6));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(9));

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(8));

var _classnames = _interopRequireDefault(__webpack_require__(11));

var _react = _interopRequireDefault(__webpack_require__(1));

var _propTypes = _interopRequireDefault(__webpack_require__(2));

var _Transition = _interopRequireWildcard(__webpack_require__(372));

var _fadeStyles;

var propTypes = {
  /**
   * Show the component; triggers the fade in or fade out animation
   */
  in: _propTypes.default.bool,

  /**
   * Wait until the first "enter" transition to mount the component (add it to the DOM)
   */
  mountOnEnter: _propTypes.default.bool,

  /**
   * Unmount the component (remove it from the DOM) when it is faded out
   */
  unmountOnExit: _propTypes.default.bool,

  /**
   * Run the fade in animation when the component mounts, if it is initially
   * shown
   */
  appear: _propTypes.default.bool,

  /**
   * Duration of the fade animation in milliseconds, to ensure that finishing
   * callbacks are fired even if the original browser transition end events are
   * canceled
   */
  timeout: _propTypes.default.number,

  /**
   * Callback fired before the component fades in
   */
  onEnter: _propTypes.default.func,

  /**
   * Callback fired after the component starts to fade in
   */
  onEntering: _propTypes.default.func,

  /**
   * Callback fired after the has component faded in
   */
  onEntered: _propTypes.default.func,

  /**
   * Callback fired before the component fades out
   */
  onExit: _propTypes.default.func,

  /**
   * Callback fired after the component starts to fade out
   */
  onExiting: _propTypes.default.func,

  /**
   * Callback fired after the component has faded out
   */
  onExited: _propTypes.default.func
};
var defaultProps = {
  in: false,
  timeout: 300,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false
};
var fadeStyles = (_fadeStyles = {}, _fadeStyles[_Transition.ENTERING] = 'in', _fadeStyles[_Transition.ENTERED] = 'in', _fadeStyles);

var Fade =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Fade, _React$Component);

  function Fade() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Fade.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        children = _this$props.children,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["className", "children"]);
    return _react.default.createElement(_Transition.default, props, function (status, innerProps) {
      return _react.default.cloneElement(children, (0, _extends2.default)({}, innerProps, {
        className: (0, _classnames.default)('fade', className, children.props.className, fadeStyles[status])
      }));
    });
  };

  return Fade;
}(_react.default.Component);

Fade.propTypes = propTypes;
Fade.defaultProps = defaultProps;
var _default = Fade;
exports.default = _default;
module.exports = exports["default"];

/***/ }),

/***/ 925:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(3);

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(8));

var _extends2 = _interopRequireDefault(__webpack_require__(6));

var _react = _interopRequireDefault(__webpack_require__(1));

var _propTypes = _interopRequireDefault(__webpack_require__(2));

var _TabContainer = _interopRequireDefault(__webpack_require__(961));

var _TabContent = _interopRequireDefault(__webpack_require__(962));

var _TabPane = _interopRequireDefault(__webpack_require__(1013));

var propTypes = (0, _extends2.default)({}, _TabPane.default.propTypes, {
  disabled: _propTypes.default.bool,
  title: _propTypes.default.node,

  /**
   * tabClassName is used as className for the associated NavItem
   */
  tabClassName: _propTypes.default.string
});

var Tab =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Tab, _React$Component);

  function Tab() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Tab.prototype;

  _proto.render = function render() {
    var props = (0, _extends2.default)({}, this.props); // These props are for the parent `<Tabs>` rather than the `<TabPane>`.

    delete props.title;
    delete props.disabled;
    delete props.tabClassName;
    return _react.default.createElement(_TabPane.default, props);
  };

  return Tab;
}(_react.default.Component);

Tab.propTypes = propTypes;
Tab.Container = _TabContainer.default;
Tab.Content = _TabContent.default;
Tab.Pane = _TabPane.default;
var _default = Tab;
exports.default = _default;
module.exports = exports["default"];

/***/ }),

/***/ 935:
/***/ (function(module, exports) {

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;


/***/ }),

/***/ 936:
/***/ (function(module, exports, __webpack_require__) {

var baseEach = __webpack_require__(144),
    isArrayLike = __webpack_require__(140);

/**
 * The base implementation of `_.map` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function baseMap(collection, iteratee) {
  var index = -1,
      result = isArrayLike(collection) ? Array(collection.length) : [];

  baseEach(collection, function(value, key, collection) {
    result[++index] = iteratee(value, key, collection);
  });
  return result;
}

module.exports = baseMap;


/***/ }),

/***/ 937:
/***/ (function(module, exports, __webpack_require__) {

var identity = __webpack_require__(226),
    overRest = __webpack_require__(940),
    setToString = __webpack_require__(941);

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

module.exports = baseRest;


/***/ }),

/***/ 938:
/***/ (function(module, exports, __webpack_require__) {

var constant = __webpack_require__(943),
    defineProperty = __webpack_require__(939),
    identity = __webpack_require__(226);

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

module.exports = baseSetToString;


/***/ }),

/***/ 939:
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(66);

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ }),

/***/ 940:
/***/ (function(module, exports, __webpack_require__) {

var apply = __webpack_require__(935);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;


/***/ }),

/***/ 941:
/***/ (function(module, exports, __webpack_require__) {

var baseSetToString = __webpack_require__(938),
    shortOut = __webpack_require__(942);

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

module.exports = setToString;


/***/ }),

/***/ 942:
/***/ (function(module, exports) {

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;


/***/ }),

/***/ 943:
/***/ (function(module, exports) {

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;


/***/ }),

/***/ 961:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(3);

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(9));

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(8));

var _react = _interopRequireDefault(__webpack_require__(1));

var _propTypes = _interopRequireDefault(__webpack_require__(2));

var _uncontrollable = __webpack_require__(231);

var TAB = 'tab';
var PANE = 'pane';

var idPropType = _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]);

var propTypes = {
  /**
   * HTML id attribute, required if no `generateChildId` prop
   * is specified.
   */
  id: function id(props) {
    var error = null;

    if (!props.generateChildId) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      error = idPropType.apply(void 0, [props].concat(args));

      if (!error && !props.id) {
        error = new Error('In order to properly initialize Tabs in a way that is accessible ' + 'to assistive technologies (such as screen readers) an `id` or a ' + '`generateChildId` prop to TabContainer is required');
      }
    }

    return error;
  },

  /**
   * A function that takes an `eventKey` and `type` and returns a unique id for
   * child tab `<NavItem>`s and `<TabPane>`s. The function _must_ be a pure
   * function, meaning it should always return the _same_ id for the same set
   * of inputs. The default value requires that an `id` to be set for the
   * `<TabContainer>`.
   *
   * The `type` argument will either be `"tab"` or `"pane"`.
   *
   * @defaultValue (eventKey, type) => `${this.props.id}-${type}-${key}`
   */
  generateChildId: _propTypes.default.func,

  /**
   * A callback fired when a tab is selected.
   *
   * @controllable activeKey
   */
  onSelect: _propTypes.default.func,

  /**
   * The `eventKey` of the currently active tab.
   *
   * @controllable onSelect
   */
  activeKey: _propTypes.default.any
};
var childContextTypes = {
  $bs_tabContainer: _propTypes.default.shape({
    activeKey: _propTypes.default.any,
    onSelect: _propTypes.default.func.isRequired,
    getTabId: _propTypes.default.func.isRequired,
    getPaneId: _propTypes.default.func.isRequired
  })
};

var TabContainer =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(TabContainer, _React$Component);

  function TabContainer() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = TabContainer.prototype;

  _proto.getChildContext = function getChildContext() {
    var _this$props = this.props,
        activeKey = _this$props.activeKey,
        onSelect = _this$props.onSelect,
        generateChildId = _this$props.generateChildId,
        id = _this$props.id;

    var getId = generateChildId || function (key, type) {
      return id ? id + "-" + type + "-" + key : null;
    };

    return {
      $bs_tabContainer: {
        activeKey: activeKey,
        onSelect: onSelect,
        getTabId: function getTabId(key) {
          return getId(key, TAB);
        },
        getPaneId: function getPaneId(key) {
          return getId(key, PANE);
        }
      }
    };
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        children = _this$props2.children,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["children"]);
    delete props.generateChildId;
    delete props.onSelect;
    delete props.activeKey;
    return _react.default.cloneElement(_react.default.Children.only(children), props);
  };

  return TabContainer;
}(_react.default.Component);

TabContainer.propTypes = propTypes;
TabContainer.childContextTypes = childContextTypes;

var _default = (0, _uncontrollable.uncontrollable)(TabContainer, {
  activeKey: 'onSelect'
});

exports.default = _default;
module.exports = exports["default"];

/***/ }),

/***/ 962:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(3);

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__(6));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(9));

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(8));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(64));

var _classnames = _interopRequireDefault(__webpack_require__(11));

var _react = _interopRequireDefault(__webpack_require__(1));

var _propTypes = _interopRequireDefault(__webpack_require__(2));

var _elementType = _interopRequireDefault(__webpack_require__(84));

var _bootstrapUtils = __webpack_require__(16);

var propTypes = {
  componentClass: _elementType.default,

  /**
   * Sets a default animation strategy for all children `<TabPane>`s. Use
   * `false` to disable, `true` to enable the default `<Fade>` animation or
   * a react-transition-group v2 `<Transition/>` component.
   */
  animation: _propTypes.default.oneOfType([_propTypes.default.bool, _elementType.default]),

  /**
   * Wait until the first "enter" transition to mount tabs (add them to the DOM)
   */
  mountOnEnter: _propTypes.default.bool,

  /**
   * Unmount tabs (remove it from the DOM) when they are no longer visible
   */
  unmountOnExit: _propTypes.default.bool
};
var defaultProps = {
  componentClass: 'div',
  animation: true,
  mountOnEnter: false,
  unmountOnExit: false
};
var contextTypes = {
  $bs_tabContainer: _propTypes.default.shape({
    activeKey: _propTypes.default.any
  })
};
var childContextTypes = {
  $bs_tabContent: _propTypes.default.shape({
    bsClass: _propTypes.default.string,
    animation: _propTypes.default.oneOfType([_propTypes.default.bool, _elementType.default]),
    activeKey: _propTypes.default.any,
    mountOnEnter: _propTypes.default.bool,
    unmountOnExit: _propTypes.default.bool,
    onPaneEnter: _propTypes.default.func.isRequired,
    onPaneExited: _propTypes.default.func.isRequired,
    exiting: _propTypes.default.bool.isRequired
  })
};

var TabContent =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(TabContent, _React$Component);

  function TabContent(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;
    _this.handlePaneEnter = _this.handlePaneEnter.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handlePaneExited = _this.handlePaneExited.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))); // Active entries in state will be `null` unless `animation` is set. Need
    // to track active child in case keys swap and the active child changes
    // but the active key does not.

    _this.state = {
      activeKey: null,
      activeChild: null
    };
    return _this;
  }

  var _proto = TabContent.prototype;

  _proto.getChildContext = function getChildContext() {
    var _this$props = this.props,
        bsClass = _this$props.bsClass,
        animation = _this$props.animation,
        mountOnEnter = _this$props.mountOnEnter,
        unmountOnExit = _this$props.unmountOnExit;
    var stateActiveKey = this.state.activeKey;
    var containerActiveKey = this.getContainerActiveKey();
    var activeKey = stateActiveKey != null ? stateActiveKey : containerActiveKey;
    var exiting = stateActiveKey != null && stateActiveKey !== containerActiveKey;
    return {
      $bs_tabContent: {
        bsClass: bsClass,
        animation: animation,
        activeKey: activeKey,
        mountOnEnter: mountOnEnter,
        unmountOnExit: unmountOnExit,
        onPaneEnter: this.handlePaneEnter,
        onPaneExited: this.handlePaneExited,
        exiting: exiting
      }
    };
  };

  _proto.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(nextProps) {
    // eslint-disable-line
    if (!nextProps.animation && this.state.activeChild) {
      this.setState({
        activeKey: null,
        activeChild: null
      });
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.isUnmounted = true;
  };

  _proto.getContainerActiveKey = function getContainerActiveKey() {
    var tabContainer = this.context.$bs_tabContainer;
    return tabContainer && tabContainer.activeKey;
  };

  _proto.handlePaneEnter = function handlePaneEnter(child, childKey) {
    if (!this.props.animation) {
      return false;
    } // It's possible that this child should be transitioning out.


    if (childKey !== this.getContainerActiveKey()) {
      return false;
    }

    this.setState({
      activeKey: childKey,
      activeChild: child
    });
    return true;
  };

  _proto.handlePaneExited = function handlePaneExited(child) {
    // This might happen as everything is unmounting.
    if (this.isUnmounted) {
      return;
    }

    this.setState(function (_ref) {
      var activeChild = _ref.activeChild;

      if (activeChild !== child) {
        return null;
      }

      return {
        activeKey: null,
        activeChild: null
      };
    });
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        Component = _this$props2.componentClass,
        className = _this$props2.className,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["componentClass", "className"]);

    var _splitBsPropsAndOmit = (0, _bootstrapUtils.splitBsPropsAndOmit)(props, ['animation', 'mountOnEnter', 'unmountOnExit']),
        bsProps = _splitBsPropsAndOmit[0],
        elementProps = _splitBsPropsAndOmit[1];

    return _react.default.createElement(Component, (0, _extends2.default)({}, elementProps, {
      className: (0, _classnames.default)(className, (0, _bootstrapUtils.prefix)(bsProps, 'content'))
    }));
  };

  return TabContent;
}(_react.default.Component);

TabContent.propTypes = propTypes;
TabContent.defaultProps = defaultProps;
TabContent.contextTypes = contextTypes;
TabContent.childContextTypes = childContextTypes;

var _default = (0, _bootstrapUtils.bsClass)('tab', TabContent);

exports.default = _default;
module.exports = exports["default"];

/***/ }),

/***/ 974:
/***/ (function(module, exports) {

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = baseFindIndex;


/***/ }),

/***/ 989:
/***/ (function(module, exports, __webpack_require__) {

var baseIteratee = __webpack_require__(225),
    isArrayLike = __webpack_require__(140),
    keys = __webpack_require__(141);

/**
 * Creates a `_.find` or `_.findLast` function.
 *
 * @private
 * @param {Function} findIndexFunc The function to find the collection index.
 * @returns {Function} Returns the new find function.
 */
function createFind(findIndexFunc) {
  return function(collection, predicate, fromIndex) {
    var iterable = Object(collection);
    if (!isArrayLike(collection)) {
      var iteratee = baseIteratee(predicate, 3);
      collection = keys(collection);
      predicate = function(key) { return iteratee(iterable[key], key, iterable); };
    }
    var index = findIndexFunc(collection, predicate, fromIndex);
    return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
  };
}

module.exports = createFind;


/***/ }),

/***/ 990:
/***/ (function(module, exports, __webpack_require__) {

var createFind = __webpack_require__(989),
    findIndex = __webpack_require__(991);

/**
 * Iterates over elements of `collection`, returning the first element
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index|key, collection).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'age': 36, 'active': true },
 *   { 'user': 'fred',    'age': 40, 'active': false },
 *   { 'user': 'pebbles', 'age': 1,  'active': true }
 * ];
 *
 * _.find(users, function(o) { return o.age < 40; });
 * // => object for 'barney'
 *
 * // The `_.matches` iteratee shorthand.
 * _.find(users, { 'age': 1, 'active': true });
 * // => object for 'pebbles'
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.find(users, ['active', false]);
 * // => object for 'fred'
 *
 * // The `_.property` iteratee shorthand.
 * _.find(users, 'active');
 * // => object for 'barney'
 */
var find = createFind(findIndex);

module.exports = find;


/***/ }),

/***/ 991:
/***/ (function(module, exports, __webpack_require__) {

var baseFindIndex = __webpack_require__(974),
    baseIteratee = __webpack_require__(225),
    toInteger = __webpack_require__(376);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * This method is like `_.find` except that it returns the index of the first
 * element `predicate` returns truthy for instead of the element itself.
 *
 * @static
 * @memberOf _
 * @since 1.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': true }
 * ];
 *
 * _.findIndex(users, function(o) { return o.user == 'barney'; });
 * // => 0
 *
 * // The `_.matches` iteratee shorthand.
 * _.findIndex(users, { 'user': 'fred', 'active': false });
 * // => 1
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.findIndex(users, ['active', false]);
 * // => 0
 *
 * // The `_.property` iteratee shorthand.
 * _.findIndex(users, 'active');
 * // => 2
 */
function findIndex(array, predicate, fromIndex) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  var index = fromIndex == null ? 0 : toInteger(fromIndex);
  if (index < 0) {
    index = nativeMax(length + index, 0);
  }
  return baseFindIndex(array, baseIteratee(predicate, 3), index);
}

module.exports = findIndex;


/***/ })

});