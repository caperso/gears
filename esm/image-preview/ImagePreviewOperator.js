import _toConsumableArray from '@babel/runtime/helpers/esm/toConsumableArray';

function _createForOfIteratorHelper(o) {
  if (typeof Symbol === 'undefined' || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) {
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return { done: true };
          return { done: false, value: o[i++] };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F,
      };
    }
    throw new TypeError(
      'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
    );
  }
  var it,
    normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function s() {
      it = o[Symbol.iterator]();
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it['return'] != null) it['return']();
      } finally {
        if (didErr) throw err;
      }
    },
  };
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(n);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

import React from 'react';
import './ImagePreview.less';

var ImagePreviewOperator = function ImagePreviewOperator(props) {
  var operations = props.operations,
    _props$toolbar = props.toolbar,
    toolbar = _props$toolbar === void 0 ? null : _props$toolbar;

  var renderBar = function renderBar(toolbar) {
    if (!toolbar) {
      return null;
    }

    if (toolbar instanceof Array) {
      var barOperations = [];

      var _iterator = _createForOfIteratorHelper(toolbar),
        _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var name = _step.value;
          var method = operations[name];

          if (method) {
            var newItem = {
              name: name,
              method: method,
            };
            barOperations = [].concat(_toConsumableArray(barOperations), [newItem]);
          } else {
            console.warn("can't find method which refers ".concat(name));
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var menu = /*#__PURE__*/ React.createElement(
        React.Fragment,
        null,
        barOperations.map(function(item) {
          return /*#__PURE__*/ React.createElement(
            'i',
            {
              key: item.name,
              onClick: item.method,
            },
            item.name,
          );
        }),
      );
      return menu;
    }

    return toolbar;
  };

  return renderBar(toolbar);
};

export default ImagePreviewOperator;
