import React from 'react';
import './SquareButton.less';

var SquareButton = function SquareButton(props) {
  var handleClick = function handleClick(e) {
    if (props.clickCallback) {
      props.clickCallback(e);
    }
  };

  return /*#__PURE__*/ React.createElement(
    'div',
    {
      className: 'g-square-button-wrapper',
      onClick: handleClick,
    },
    /*#__PURE__*/ React.createElement('div', {
      className: 'inner-container',
      style: {
        backgroundImage: 'url('.concat(props.icon, ')'),
      },
    }),
    /*#__PURE__*/ React.createElement('div', null, props.name),
  );
};

export default SquareButton;
