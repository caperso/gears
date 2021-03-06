import React from 'react';
import './index.less';

interface Props {
  name: string;
  icon?: string;
  clickCallback?: (e: any) => void;
}

const SquareButton = (props: Props) => {
  const handleClick = (e: any) => {
    if (props.clickCallback) {
      props.clickCallback(e);
    }
  };

  return (
    <div className="g-square-button-wrapper" onClick={handleClick}>
      <div className="inner-container" style={{ backgroundImage: `url(${props.icon})` }}></div>
      <div>{props.name}</div>
    </div>
  );
};
export default SquareButton;
