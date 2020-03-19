"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

require("./ContextMenu.scss");

var ContextMenu = function ContextMenu(props) {
  var menu = props.menu,
      children = props.children;

  var _useState = (0, _react.useState)({
    x: 0,
    y: 0
  }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      cursorPoint = _useState2[0],
      setCursorPoint = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      showContextMenu = _useState4[0],
      setShowContextMenu = _useState4[1];

  var style = {
    position: 'fixed',
    left: cursorPoint.x,
    top: cursorPoint.y,
    backgroundColor: 'white',
    borderRadius: '4px',
    padding: '4px'
  };
  /* 右键菜单 */

  var openMenu = function openMenu(e) {
    e.preventDefault();
    setCursorPoint({
      x: e.clientX,
      y: e.clientY
    });
    setShowContextMenu(true);
  };

  var handleClick = function handleClick(e) {
    setShowContextMenu(false);
    e.stopPropagation();
  };

  var renderMenu = function renderMenu(menu) {
    if (menu instanceof Array) {
      return _react.default.createElement(_react.default.Fragment, null, menu.map(function (item) {
        return _react.default.createElement("div", {
          key: item.name,
          onClick: item.method
        }, item.name);
      }));
    } else {
      return menu;
    }
  };

  if (!menu) {
    return _react.default.createElement("div", {
      onClick: handleClick
    }, children);
  }

  return _react.default.createElement("div", {
    onClick: handleClick,
    onContextMenu: openMenu
  }, children, showContextMenu && _react.default.createElement("div", {
    className: "g-context-menu-default",
    style: style
  }, renderMenu(menu)));
};

var _default = ContextMenu;
exports.default = _default;