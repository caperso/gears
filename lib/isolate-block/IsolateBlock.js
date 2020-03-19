"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IsolateBlock = void 0;

var _react = _interopRequireDefault(require("react"));

require("./IsolateBlock.scss");

var IsolateBlock = function IsolateBlock(props) {
  var style = props.style,
      className = props.className,
      children = props.children;
  return _react.default.createElement("div", {
    className: "g-isolate-block-wrapper ".concat(className),
    style: style
  }, children);
};

exports.IsolateBlock = IsolateBlock;