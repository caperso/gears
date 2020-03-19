import React, { useRef } from 'react';
import './CodePaper.scss';
export var CodePaper = function CodePaper(props) {
  var textarea = useRef(null);

  var updateChanges = function updateChanges() {
    var text = textarea.current.value;

    if (props.handleClick) {
      props.handleClick(text);
    }
  };

  return React.createElement("div", {
    className: "g-code-paper-wrapper"
  }, React.createElement("textarea", {
    ref: textarea,
    defaultValue: props.text,
    className: "g-code-paper-textarea ".concat(props.className)
  }), props.handleClick && React.createElement("button", {
    onClick: updateChanges
  }, props.buttonText ? props.buttonText : '更新数据'));
};