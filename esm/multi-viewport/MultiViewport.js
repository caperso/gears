import React from 'react';
import './MultiViewport.less';

var MultiViewport = function MultiViewport() {
  return /*#__PURE__*/ React.createElement(
    'div',
    {
      className: 'g-viewport-wrapper',
    },
    /*#__PURE__*/ React.createElement(
      'div',
      {
        className: 'g-viewport-container',
      },
      /*#__PURE__*/ React.createElement(
        'div',
        {
          className: 'g-viewport-unit',
        },
        'viewport 0',
      ),
      /*#__PURE__*/ React.createElement(
        'div',
        {
          className: 'g-viewport-unit',
        },
        'viewport 1',
      ),
      /*#__PURE__*/ React.createElement(
        'div',
        {
          className: 'g-viewport-unit',
        },
        'viewport 2',
      ),
      /*#__PURE__*/ React.createElement(
        'div',
        {
          className: 'g-viewport-unit',
        },
        'viewport 3',
      ),
    ),
  );
};

export default MultiViewport;
