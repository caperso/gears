import { Button } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import React, { CSSProperties, useRef, useState } from 'react';
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

  const getData = () => {
    console.log(comRef);
  };

  const comRef = useRef(null);

  return (
    <div className="demo-canvas-test-wrapper">
      <ButtonGroup>
        <Button type="primary" onClick={getData}>
          检查数据
        </Button>
        <Button type="primary" onClick={getData}>
          检查数据
        </Button>
      </ButtonGroup>
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
        <CanvasCharged size={size} forwardRef={comRef}></CanvasCharged>
      </div>
    </div>
  );
};

export default () => <CanvasDemo />;
