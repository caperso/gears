import _slicedToArray from '@babel/runtime/helpers/esm/slicedToArray';
import React, { useState } from 'react';
import './ContextMenu.less';

var ContextMenu = function ContextMenu(props) {
  var menu = props.menu,
    children = props.children;

  var _useState = useState({
      x: 0,
      y: 0,
    }),
    _useState2 = _slicedToArray(_useState, 2),
    cursorPoint = _useState2[0],
    setCursorPoint = _useState2[1];

  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    showContextMenu = _useState4[0],
    setShowContextMenu = _useState4[1];

  var contentStyle = {
    left: cursorPoint.x,
    top: cursorPoint.y,
  };
  /* 右键菜单 */

  var openMenu = function openMenu(e) {
    e.preventDefault();
    setShowContextMenu(true);
    setCursorPoint({
      x: e.clientX,
      y: e.clientY,
    });
  };

  var closeMenu = function closeMenu(e) {
    setShowContextMenu(false);
    e.stopPropagation();
  };

  var renderMenu = function renderMenu(menu) {
    if (menu instanceof Array) {
      return /*#__PURE__*/ React.createElement(
        React.Fragment,
        null,
        menu.map(function(item) {
          return /*#__PURE__*/ React.createElement(
            'div',
            {
              key: item.name,
              className: 'g-context-menu-item',
              onClick: item.method,
            },
            item.name,
          );
        }),
      );
    }

    return menu;
  };

  return /*#__PURE__*/ React.createElement(
    'div',
    {
      onContextMenu: openMenu,
    },
    children,
    showContextMenu &&
      /*#__PURE__*/ React.createElement(
        'div',
        {
          className: 'g-context-menu-cover-mask',
          onClick: closeMenu,
          onWheel: closeMenu,
        },
        /*#__PURE__*/ React.createElement(
          'div',
          {
            className: 'g-context-menu-default',
            style: contentStyle,
          },
          renderMenu(menu),
        ),
      ),
  );
};

export default ContextMenu;
