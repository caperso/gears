"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Loading = void 0;

var _react = _interopRequireDefault(require("react"));

require("./index.scss");

var Loading = function Loading(props) {
  return _react.default.createElement("span", {
    className: "g-icon-rotate",
    onClick: props.handleClick
  });
};

exports.Loading = Loading;