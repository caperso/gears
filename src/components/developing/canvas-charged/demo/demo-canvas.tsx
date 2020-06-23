import React, { CSSProperties, useState } from 'react';
import CanvasCharged from '../';
import { Size } from '../canvas';
import './index.less';

const url = 'https://cdn.pixabay.com/photo/2020/02/21/12/58/toddler-hand-4867454_1280.jpg';

const CanvasDemo = () => {
  const [naturalSize, setNaturalSize] = useState<Size>();
  const [size, setSize] = useState<Size>({ w: 780, h: 480 });

  function getNaturalSize(e: any) {
    setSize({ w: e.target.naturalWidth, h: e.target.naturalHeight });
  }

  const imageStyle: CSSProperties = {
    width: size?.w,
    height: size?.h,
    position: 'absolute',
  };

  return (
    <div className="demo-canvas-wrapper" style={{ width: size?.w, height: size?.h }}>
      {url && (
        <img
          src={url}
          style={imageStyle}
          alt="turbine defects"
          onLoad={getNaturalSize}
          className="g-canvas-image"
          onClick={e => e.preventDefault()}
          onMouseDown={e => e.preventDefault()}
        />
      )}
      <CanvasCharged size={size}></CanvasCharged>
    </div>
  );
};

export default () => <CanvasDemo />;
