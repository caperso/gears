'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _react = _interopRequireDefault(require('react'));

require('./MultiViewport.less');

var MultiViewport = function MultiViewport() {
  return /*#__PURE__*/ _react['default'].createElement(
    'div',
    {
      className: 'g-viewport-wrapper',
    },
    /*#__PURE__*/ _react['default'].createElement(
      'div',
      {
        className: 'g-viewport-container',
      },
      /*#__PURE__*/ _react['default'].createElement(
        'div',
        {
          className: 'g-viewport-unit',
        },
        'viewport 0',
      ),
      /*#__PURE__*/ _react['default'].createElement(
        'div',
        {
          className: 'g-viewport-unit',
        },
        'viewport 1',
      ),
      /*#__PURE__*/ _react['default'].createElement(
        'div',
        {
          className: 'g-viewport-unit',
        },
        'viewport 2',
      ),
      /*#__PURE__*/ _react['default'].createElement(
        'div',
        {
          className: 'g-viewport-unit',
        },
        'viewport 3',
      ),
    ),
  );
};

var _default = MultiViewport;
exports['default'] = _default;
