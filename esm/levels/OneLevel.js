import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState } from 'react';
import './index.scss';
export var OneLevel = function OneLevel(props) {
  var level = props.level,
      depth = props.depth,
      route = props.route;

  var renderRouteCheck = function renderRouteCheck() {
    var path = window.location.pathname;
    var result = !!path.match(route);
    return result;
  };

  var _useState = useState(renderRouteCheck()),
      _useState2 = _slicedToArray(_useState, 2),
      active = _useState2[0],
      setActive = _useState2[1];

  var activeLevel = function activeLevel(item, route) {
    setActive(function (s) {
      return !s;
    });
    return item.static ? replaceRoute(item.route) : changeRoute(route);
  };

  var replaceRoute = function replaceRoute(route) {
    return window.location.replace(route);
  };

  var changeRoute = function changeRoute(route) {
    return console.log(route);
  };

  var classNameGenerator = function classNameGenerator(depth) {
    return "g-levels-link ".concat(depth ? 'g-small-font' : '');
  };

  return React.createElement("div", {
    key: level.name,
    className: classNameGenerator(depth),
    onClick: function onClick() {
      return activeLevel(level, route);
    },
    style: active ? {
      color: '#2dc6ad'
    } : undefined
  }, React.createElement("span", {
    style: {
      paddingLeft: "".concat(depth, "em")
    }
  }), level.name);
};