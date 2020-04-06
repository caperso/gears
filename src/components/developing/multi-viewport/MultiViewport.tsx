import React from 'react';
import './index.less';

type Unit = [0, 1, 2, 3];
type Group = [[0, 1], [1, 2], [2, 3], [3, 0]];

interface Props {
  children: React.ReactElement | React.ReactElement[];
  disabled?: false;
  place: [];
}

const MultiViewport = () => {
  return (
    <div className="g-viewport-wrapper">
      {/* <div className="line-vertical"></div> */}
      {/* <div className="line-horizontal"></div> */}
      <div className="g-viewport-container">
        <div className="g-viewport-unit">viewport 0</div>
        <div className="g-viewport-unit">viewport 1</div>
        <div className="g-viewport-unit">viewport 2</div>
        <div className="g-viewport-unit">viewport 3</div>
      </div>
    </div>
  );
};

export default MultiViewport;
