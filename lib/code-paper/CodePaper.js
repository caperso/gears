'use strict';

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.CodePaper = void 0;

var _react = _interopRequireWildcard(require('react'));

require('./CodePaper.less');

var CodePaper = function CodePaper(props) {
  var textarea = (0, _react.useRef)(null);

  var updateChanges = function updateChanges() {
    var text = textarea.current.value;

    if (props.handleClick) {
      props.handleClick(text);
    }
  };

  return /*#__PURE__*/ _react['default'].createElement(
    'div',
    {
      className: 'g-code-paper-wrapper',
    },
    /*#__PURE__*/ _react['default'].createElement('textarea', {
      ref: textarea,
      defaultValue: props.text,
      className: 'g-code-paper-textarea '.concat(props.className),
    }),
    props.handleClick &&
      /*#__PURE__*/ _react['default'].createElement(
        'button',
        {
          onClick: updateChanges,
        },
        props.buttonText ? props.buttonText : '更新数据',
      ),
  );
};

exports.CodePaper = CodePaper;
