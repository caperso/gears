import _slicedToArray from '@babel/runtime/helpers/esm/slicedToArray';
import React, { useEffect, useState } from 'react';
import './Waterfall.less';
// const defaultGrid = {
//     horizontalEvenly: true,
// };
export var Waterfall = function Waterfall(props) {
  var children = props.children,
    _props$column = props.column,
    column = _props$column === void 0 ? 3 : _props$column;

  var generateColumn = function generateColumn(column) {
    var totalPropString = '';

    for (var i = 0; i < column; i++) {
      totalPropString.concat(' 1fr');
    }

    return totalPropString;
  };

  var _useState = useState({}),
    _useState2 = _slicedToArray(_useState, 2),
    style = _useState2[0],
    setStyle = _useState2[1];

  useEffect(
    function() {
      var gridColumn = {
        gridTemplateColumns: generateColumn(column),
      };
      setStyle(gridColumn);
      console.log(gridColumn);
    },
    [column],
  );
  return /*#__PURE__*/ React.createElement(
    'div',
    {
      className: 'g-waterfall-wrapper',
      style: style,
    },
    children,
  );
};
