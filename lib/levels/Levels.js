"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Levels = void 0;

var _react = _interopRequireDefault(require("react"));

require("./index.scss");

var _OneLevel = require("./OneLevel");

var Levels = function Levels(props) {
  var data = props.data,
      _props$fontSize = props.fontSize,
      fontSize = _props$fontSize === void 0 ? 45 : _props$fontSize; // const [activeUrl, setActiveUrl] = useState('');

  /**
   * 递归渲染层级菜单
   * @param {Level} item
   * @param {number} [depth=0]
   * @param {string} [lastUrl]
   * @returns {React.ReactNode}
   */

  var recursiveRender = function recursiveRender(item) {
    var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var lastRoute = arguments.length > 2 ? arguments[2] : undefined;
    var route = lastRoute ? "".concat(lastRoute, "/").concat(item.route) : item.route;
    return _react.default.createElement("div", {
      key: item.name
    }, _react.default.createElement(_OneLevel.OneLevel, {
      level: item,
      depth: depth,
      route: route,
      fontSize: fontSize
    }), item.deep && item.deep.map(function (deepItem) {
      return recursiveRender(deepItem, depth + 1, route);
    }));
  };

  return _react.default.createElement("div", {
    className: "g-levels-wrapper"
  }, data.map(function (item) {
    return recursiveRender(item);
  })); //  return <div className="wrapper">{props.data.map((item: LevelProps) => <OneLevel item={item} depth={}></OneLevel>)}</div>;
};

exports.Levels = Levels;