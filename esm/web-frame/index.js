import React from 'react';
import './index.scss';
export var WebFrame = function WebFrame(props) {
  var _props$url = props.url,
      url = _props$url === void 0 ? '' : _props$url;
  return React.createElement("iframe", {
    src: url,
    className: "g-frame",
    title: "placeholder"
  });
};