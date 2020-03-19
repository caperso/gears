import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { CodePaper } from 'components/code-paper/CodePaper';
import React, { useState } from 'react';
import { Levels } from './Levels';
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
export var LevelsDemo = function LevelsDemo() {
  var _useState = useState(levels),
      _useState2 = _slicedToArray(_useState, 2),
      levelData = _useState2[0],
      setLevelData = _useState2[1];

  var handleChange = function handleChange(text) {
    try {
      setLevelData(JSON.parse(text));
    } catch (_unused) {
      console.error('error: INVALID JSON ARRAY FORMAT');
    }
  };

  return React.createElement("div", {
    className: "demo-levels-wrapper"
  }, React.createElement("h3", null, "\u7EC4\u4EF6\u540D\u79F0\uFF1A\u5C42\u7EA7\u5BFC\u822A\uFF08Levels\uFF09"), React.createElement("h4", null, "(\u5F00\u53D1\u4E2D)"), React.createElement("h4", null, "\u793A\u4F8B"), "\u5F53\u524D\u6570\u636E:", React.createElement(CodePaper, {
    text: "".concat(JSON.stringify(levels)),
    handleClick: handleChange
  }), React.createElement(Levels, {
    data: levelData
  }));
};