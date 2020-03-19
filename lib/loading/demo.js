"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingDemo = void 0;

var _react = _interopRequireDefault(require("react"));

var _ = require(".");

var LoadingDemo = function LoadingDemo() {
  return _react.default.createElement("div", null, _react.default.createElement(_.Loading, null));
};

exports.LoadingDemo = LoadingDemo;