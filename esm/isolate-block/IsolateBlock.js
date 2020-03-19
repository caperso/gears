import React from 'react';
import './IsolateBlock.scss';
export var IsolateBlock = function IsolateBlock(props) {
  var style = props.style,
      className = props.className,
      children = props.children;
  return React.createElement("div", {
    className: "g-isolate-block-wrapper ".concat(className),
    style: style
  }, children);
};