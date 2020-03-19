"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Avatar = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(Avatar, _React$Component);

  function Avatar() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Avatar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Avatar)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      scale: 1,
      mounted: false,
      isImgExist: true
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "avatarNode", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "avatarChildren", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "lastChildrenWidth", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "lastNodeWith", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleImgLoadError", function () {
      var onError = _this.props.onError;
      var errorFlag = onError ? onError() : undefined;

      if (errorFlag !== false) {
        _this.setState({
          isImgExist: false
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderAvatar", function (_ref)
    /*ConfigConsumerProps*/
    {
      var _classNames, _classNames2;

      var getPrefixCls = _ref.getPrefixCls;
      var _this$props = _this.props,
          customizePrefixCls = _this$props.prefixCls,
          shape = _this$props.shape,
          size = _this$props.size,
          src = _this$props.src,
          srcSet = _this$props.srcSet,
          icon = _this$props.icon,
          className = _this$props.className,
          alt = _this$props.alt,
          others = (0, _objectWithoutProperties2.default)(_this$props, ["prefixCls", "shape", "size", "src", "srcSet", "icon", "className", "alt"]); // warning('')

      var _this$state = _this.state,
          isImgExist = _this$state.isImgExist,
          scale = _this$state.scale,
          mounted = _this$state.mounted;
      var prefixCls = getPrefixCls('avatar', customizePrefixCls);
      var sizeCls = (0, _classnames.default)((_classNames = {}, (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-lg"), size === 'large'), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-sm"), size === 'small'), _classNames));
      var classString = (0, _classnames.default)(prefixCls, className, sizeCls, (_classNames2 = {}, (0, _defineProperty2.default)(_classNames2, "".concat(prefixCls, "-").concat(shape), shape), (0, _defineProperty2.default)(_classNames2, "".concat(prefixCls, "-image"), src && isImgExist), (0, _defineProperty2.default)(_classNames2, "".concat(prefixCls, "-icon"), icon), _classNames2));
      var sizeStyle = typeof size === 'number' ? {
        width: size,
        height: size,
        lineHeight: "".concat(size, "px"),
        fontSize: icon ? size / 2 : 18
      } : {};
      var children = _this.props.children;

      if (src && isImgExist) {
        children = _react.default.createElement("img", {
          src: src,
          srcSet: srcSet,
          onError: _this.handleImgLoadError,
          alt: alt
        });
      } else if (icon) {
        children = icon;
      } else {
        var childrenNode = _this.avatarChildren;

        if (childrenNode || scale !== 1) {
          var transformString = "scale(".concat(scale, ") translateX(-50%)");
          var childrenStyle = {
            msTransform: transformString,
            WebkitTransform: transformString,
            transform: transformString
          };
          var sizeChildrenStyle = typeof size === 'number' ? {
            lineHeight: "".concat(size, "px")
          } : {};
          children = _react.default.createElement("span", {
            className: "".concat(prefixCls, "-string"),
            ref: function ref(node) {
              return _this.avatarChildren = node;
            },
            style: _objectSpread({}, sizeChildrenStyle, {}, childrenStyle)
          }, children);
        } else {
          var _childrenStyle = {};

          if (!mounted) {
            _childrenStyle.opacity = 0;
          }

          children = _react.default.createElement("span", {
            className: "".concat(prefixCls, "-string"),
            style: {
              opacity: 0
            },
            ref: function ref(node) {
              return _this.avatarChildren = node;
            }
          }, children);
        }
      }

      return _react.default.createElement("span", (0, _extends2.default)({}, others, {
        style: _objectSpread({}, sizeStyle, {}, others.style),
        ref: function ref(node) {
          return _this.avatarNode = node;
        }
      }), children);
    });
    return _this;
  }

  (0, _createClass2.default)(Avatar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setScale();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      this.setScale();

      if (prevProps.src !== this.props.src) {
        this.setState({
          isImgExist: true,
          scale: 1
        });
      }
    }
  }, {
    key: "setScale",
    value: function setScale() {
      if (!this.avatarChildren || !this.avatarNode) {
        return;
      }

      var childrenWidth = this.avatarChildren.offsetHeight; // offsetWidth avoid affecting be transform scale

      var nodeWidth = this.avatarNode.offsetWidth; // denominator is 0 is no meaning

      if (childrenWidth === 0 || nodeWidth === 0 || this.lastChildrenWidth === childrenWidth && this.lastNodeWith === nodeWidth) {
        return;
      }

      this.lastChildrenWidth = childrenWidth;
      this.lastNodeWith = nodeWidth; // add 4px gap for each side to get better performance

      this.setState({
        scale: nodeWidth - 8 < childrenWidth ? (nodeWidth - 8) / childrenWidth : 1
      });
    }
  }, {
    key: "render",
    value: function render() {
      // return <ConfigConsumer>{this.renderAvatar}</ConfigConsumer>;
      return _react.default.createElement(_react.default.Fragment, null, this.renderAvatar);
    }
  }]);
  return Avatar;
}(_react.default.Component);

exports.default = Avatar;
(0, _defineProperty2.default)(Avatar, "defaultProps", {
  shape: 'circle',
  size: 'default'
});