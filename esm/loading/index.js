import React from 'react';
import './index.scss';
export var Loading = function Loading(props) {
  return React.createElement("span", {
    className: "g-icon-rotate",
    onClick: props.handleClick
  });
};