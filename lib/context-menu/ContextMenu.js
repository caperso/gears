'use strict';

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard');

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _slicedToArray2 = _interopRequireDefault(require('@babel/runtime/helpers/slicedToArray'));

var _react = _interopRequireWildcard(require('react'));

require('./ContextMenu.less');

var ContextMenu = function ContextMenu(props) {
  var menu = props.menu,
    children = props.children;

  var _useState = (0, _react.useState)({
      x: 0,
      y: 0,
    }),
    _useState2 = (0, _slicedToArray2['default'])(_useState, 2),
    cursorPoint = _useState2[0],
    setCursorPoint = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
    _useState4 = (0, _slicedToArray2['default'])(_useState3, 2),
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
      return /*#__PURE__*/ _react['default'].createElement(
        _react['default'].Fragment,
        null,
        menu.map(function(item) {
          return /*#__PURE__*/ _react['default'].createElement(
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

  return /*#__PURE__*/ _react['default'].createElement(
    'div',
    {
      onContextMenu: openMenu,
    },
    children,
    showContextMenu &&
      /*#__PURE__*/ _react['default'].createElement(
        'div',
        {
          className: 'g-context-menu-cover-mask',
          onClick: closeMenu,
          onWheel: closeMenu,
        },
        /*#__PURE__*/ _react['default'].createElement(
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

var _default = ContextMenu;
exports['default'] = _default;
