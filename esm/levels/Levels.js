import _slicedToArray from '@babel/runtime/helpers/esm/slicedToArray';
import React, { useState } from 'react';
import './level.less';
export var Levels = function Levels(props) {
  var data = props.data,
    _props$baseFontSize = props.baseFontSize,
    baseFontSize = _props$baseFontSize === void 0 ? 45 : _props$baseFontSize,
    _props$fontSizeDecrea = props.fontSizeDecrease,
    fontSizeDecrease = _props$fontSizeDecrea === void 0 ? 3 : _props$fontSizeDecrea;

  var _useState = useState(''),
    _useState2 = _slicedToArray(_useState, 2),
    activeRoute = _useState2[0],
    setActiveRoute = _useState2[1];

  var activeLevel = function activeLevel(item, route) {
    console.log(route);
    setActiveRoute(route);
    item.staticUrl ? window.open(item.staticUrl) : void 0;
    item.action ? item.action(route) : void 0;
  };
  /**
   * 递归渲染层级菜单
   * @param {Level} item
   * @param {number} [depth=0]
   * @param {string} [route]
   * @returns {React.ReactNode}
   */

  var recursiveRender = function recursiveRender(item) {
    var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var route = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var currentRoute = route ? ''.concat(route, '/').concat(item.name) : ''.concat(item.name);
    var fontSize = baseFontSize - fontSizeDecrease * depth > 12 ? baseFontSize - fontSizeDecrease * depth : 12;
    return /*#__PURE__*/ React.createElement(
      'div',
      {
        key: item.name,
      },
      /*#__PURE__*/ React.createElement(
        'div',
        {
          key: item.name,
          className: 'g-levels-one',
          onClick: function onClick() {
            return activeLevel(item, currentRoute);
          },
          style: {
            fontSize: fontSize,
            color: ''.concat(activeRoute === currentRoute ? '#2dc6ad' : ''),
          },
        },
        /*#__PURE__*/ React.createElement('span', {
          style: {
            paddingLeft: ''.concat(depth, 'em'),
          },
        }),
        item.name,
      ),
      item.deep &&
        item.deep.map(function(deepItem) {
          return recursiveRender(deepItem, depth + 1, currentRoute);
        }),
    );
  };

  var LevelContext = React.createContext({
    activeRoute: '',
  });
  return /*#__PURE__*/ React.createElement(
    LevelContext.Provider,
    {
      value: {
        activeRoute: '',
      },
    },
    /*#__PURE__*/ React.createElement(
      'div',
      {
        className: 'g-levels-wrapper',
      },
      data.map(function(item) {
        return recursiveRender(item);
      }),
    ),
    ';',
  );
};
