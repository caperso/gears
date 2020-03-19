import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState } from 'react';
import './ContextMenu.scss';

var ContextMenu = function ContextMenu(props) {
  var menu = props.menu,
      children = props.children;

  var _useState = useState({
    x: 0,
    y: 0
  }),
      _useState2 = _slicedToArray(_useState, 2),
      cursorPoint = _useState2[0],
      setCursorPoint = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
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
      return React.createElement(React.Fragment, null, menu.map(function (item) {
        return React.createElement("div", {
          key: item.name,
          onClick: item.method
        }, item.name);
      }));
    } else {
      return menu;
    }
  };

  if (!menu) {
    return React.createElement("div", {
      onClick: handleClick
    }, children);
  }

  return React.createElement("div", {
    onClick: handleClick,
    onContextMenu: openMenu
  }, children, showContextMenu && React.createElement("div", {
    className: "g-context-menu-default",
    style: style
  }, renderMenu(menu)));
};

export default ContextMenu;