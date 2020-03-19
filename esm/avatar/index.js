import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// 本组建照搬ant design avatar, 做练习用
import classNames from 'classnames';
import React from 'react';

var Avatar = /*#__PURE__*/function (_React$Component) {
  _inherits(Avatar, _React$Component);

  function Avatar() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Avatar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Avatar)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      scale: 1,
      mounted: false,
      isImgExist: true
    });

    _defineProperty(_assertThisInitialized(_this), "avatarNode", void 0);

    _defineProperty(_assertThisInitialized(_this), "avatarChildren", void 0);

    _defineProperty(_assertThisInitialized(_this), "lastChildrenWidth", void 0);

    _defineProperty(_assertThisInitialized(_this), "lastNodeWith", void 0);

    _defineProperty(_assertThisInitialized(_this), "handleImgLoadError", function () {
      var onError = _this.props.onError;
      var errorFlag = onError ? onError() : undefined;

      if (errorFlag !== false) {
        _this.setState({
          isImgExist: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderAvatar", function (_ref)
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
          others = _objectWithoutProperties(_this$props, ["prefixCls", "shape", "size", "src", "srcSet", "icon", "className", "alt"]); // warning('')


      var _this$state = _this.state,
          isImgExist = _this$state.isImgExist,
          scale = _this$state.scale,
          mounted = _this$state.mounted;
      var prefixCls = getPrefixCls('avatar', customizePrefixCls);
      var sizeCls = classNames((_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-lg"), size === 'large'), _defineProperty(_classNames, "".concat(prefixCls, "-sm"), size === 'small'), _classNames));
      var classString = classNames(prefixCls, className, sizeCls, (_classNames2 = {}, _defineProperty(_classNames2, "".concat(prefixCls, "-").concat(shape), shape), _defineProperty(_classNames2, "".concat(prefixCls, "-image"), src && isImgExist), _defineProperty(_classNames2, "".concat(prefixCls, "-icon"), icon), _classNames2));
      var sizeStyle = typeof size === 'number' ? {
        width: size,
        height: size,
        lineHeight: "".concat(size, "px"),
        fontSize: icon ? size / 2 : 18
      } : {};
      var children = _this.props.children;

      if (src && isImgExist) {
        children = React.createElement("img", {
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
          children = React.createElement("span", {
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

          children = React.createElement("span", {
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

      return React.createElement("span", _extends({}, others, {
        style: _objectSpread({}, sizeStyle, {}, others.style),
        ref: function ref(node) {
          return _this.avatarNode = node;
        }
      }), children);
    });

    return _this;
  }

  _createClass(Avatar, [{
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
      return React.createElement(React.Fragment, null, this.renderAvatar);
    }
  }]);

  return Avatar;
}(React.Component);

_defineProperty(Avatar, "defaultProps", {
  shape: 'circle',
  size: 'default'
});

export { Avatar as default };