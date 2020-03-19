"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelsDemo = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _CodePaper = require("components/code-paper/CodePaper");

var _react = _interopRequireWildcard(require("react"));

var _Levels = require("./Levels");

var levels = [{
  name: 'Pipeline',
  route: 'pipeline'
}, {
  name: 'Github',
  route: 'https://github.com/',
  static: true
}, {
  name: 'Ground',
  route: 'ground',
  deep: [{
    name: 'Solid',
    route: 'solid',
    deep: [{
      name: 'Dust',
      route: 'dust'
    }, {
      name: 'Germ',
      route: 'germ'
    }]
  }, {
    name: 'Liquid',
    route: 'liquid'
  }]
}];

var LevelsDemo = function LevelsDemo() {
  var _useState = (0, _react.useState)(levels),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      levelData = _useState2[0],
      setLevelData = _useState2[1];

  var handleChange = function handleChange(text) {
    try {
      setLevelData(JSON.parse(text));
    } catch (_unused) {
      console.error('error: INVALID JSON ARRAY FORMAT');
    }
  };

  return _react.default.createElement("div", {
    className: "demo-levels-wrapper"
  }, _react.default.createElement("h3", null, "\u7EC4\u4EF6\u540D\u79F0\uFF1A\u5C42\u7EA7\u5BFC\u822A\uFF08Levels\uFF09"), _react.default.createElement("h4", null, "(\u5F00\u53D1\u4E2D)"), _react.default.createElement("h4", null, "\u793A\u4F8B"), "\u5F53\u524D\u6570\u636E:", _react.default.createElement(_CodePaper.CodePaper, {
    text: "".concat(JSON.stringify(levels)),
    handleClick: handleChange
  }), _react.default.createElement(_Levels.Levels, {
    data: levelData
  }));
};

exports.LevelsDemo = LevelsDemo;