"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebFrame = void 0;

var _react = _interopRequireDefault(require("react"));

require("./index.scss");

var WebFrame = function WebFrame(props) {
  var _props$url = props.url,
      url = _props$url === void 0 ? '' : _props$url;
  return _react.default.createElement("iframe", {
    src: url,
    className: "g-frame",
    title: "placeholder"
  });
};

exports.WebFrame = WebFrame;