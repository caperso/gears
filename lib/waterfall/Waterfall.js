'use strict';

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard');

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.Waterfall = void 0;

var _slicedToArray2 = _interopRequireDefault(require('@babel/runtime/helpers/slicedToArray'));

var _react = _interopRequireWildcard(require('react'));

require('./Waterfall.less');

// const defaultGrid = {
//     horizontalEvenly: true,
// };
var Waterfall = function Waterfall(props) {
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

  var _useState = (0, _react.useState)({}),
    _useState2 = (0, _slicedToArray2['default'])(_useState, 2),
    style = _useState2[0],
    setStyle = _useState2[1];

  (0, _react.useEffect)(
    function() {
      var gridColumn = {
        gridTemplateColumns: generateColumn(column),
      };
      setStyle(gridColumn);
      console.log(gridColumn);
    },
    [column],
  );
  return /*#__PURE__*/ _react['default'].createElement(
    'div',
    {
      className: 'g-waterfall-wrapper',
      style: style,
    },
    children,
  );
};

exports.Waterfall = Waterfall;
