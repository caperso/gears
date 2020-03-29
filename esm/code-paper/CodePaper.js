import React, { useRef } from 'react';
import './CodePaper.less';
export var CodePaper = function CodePaper(props) {
  var textarea = useRef(null);

  var updateChanges = function updateChanges() {
    var text = textarea.current.value;

    if (props.handleClick) {
      props.handleClick(text);
    }
  };

  return /*#__PURE__*/ React.createElement(
    'div',
    {
      className: 'g-code-paper-wrapper',
    },
    /*#__PURE__*/ React.createElement('textarea', {
      ref: textarea,
      defaultValue: props.text,
      className: 'g-code-paper-textarea '.concat(props.className),
    }),
    props.handleClick &&
      /*#__PURE__*/ React.createElement(
        'button',
        {
          onClick: updateChanges,
        },
        props.buttonText ? props.buttonText : '更新数据',
      ),
  );
};
