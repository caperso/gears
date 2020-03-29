'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _react = _interopRequireDefault(require('react'));

require('./SquareButton.less');

var SquareButton = function SquareButton(props) {
  var handleClick = function handleClick(e) {
    if (props.clickCallback) {
      props.clickCallback(e);
    }
  };

  return /*#__PURE__*/ _react['default'].createElement(
    'div',
    {
      className: 'g-square-button-wrapper',
      onClick: handleClick,
    },
    /*#__PURE__*/ _react['default'].createElement('div', {
      className: 'inner-container',
      style: {
        backgroundImage: 'url('.concat(props.icon, ')'),
      },
    }),
    /*#__PURE__*/ _react['default'].createElement('div', null, props.name),
  );
};

var _default = SquareButton;
exports['default'] = _default;
