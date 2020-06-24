import { Button } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import React, { CSSProperties, useState } from 'react';
import CanvasCharged from '../';
import { CanvasMode, Size } from '../canvas';
import CanvasRect from '../CanvasRect';
import './index.less';

const url = 'https://cdn.pixabay.com/photo/2020/06/19/07/40/child-5316045_960_720.jpg';

const CanvasDemo = () => {
  // const [naturalSize, setNaturalSize] = useState<Size>();
  const [size, setSize] = useState<Size>({ w: 780, h: 480 });
  const [color, setColor] = useState<string>('#f11');
  const [blockVisible, setBlockVisible] = useState<boolean>(false);

  function getNaturalSize(e: any) {
    setSize({ w: e.target.naturalWidth, h: e.target.naturalHeight });
  }

  const imageStyle: CSSProperties = {
    width: size?.w,
    height: size?.h,
    position: 'absolute',
  };

  const getData = (instance: CanvasRect, stack: CanvasRect[]) => {
    console.log(instance, stack);
  };

  const [mode, setMode] = useState<CanvasMode>('draw');

  const [selectedData, setSelectedData] = useState();

  const handleSelect = () => {};

  const removeSelection = () => {};

  return (
    <div className="demo-canvas-test-wrapper">
      <ButtonGroup>
        <Button type="primary" onClick={() => setColor('#f11')}>
          Red
        </Button>
        <Button type="primary" onClick={() => setColor('#0fe')}>
          Blue
        </Button>
      </ButtonGroup>
      <br />
      <ButtonGroup>
        <Button type="primary" onClick={() => setBlockVisible(true)}>
          block-visible
        </Button>
        <Button type="primary" onClick={() => setBlockVisible(false)}>
          block-invisible
        </Button>
        <br />
        <ButtonGroup>
          <Button type="primary" onClick={() => setMode('select')}>
            Select
          </Button>
          <Button type="primary" onClick={() => setMode('draw')}>
            draw
          </Button>
        </ButtonGroup>
        <br />
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
        <CanvasCharged size={size} color={color} onClick={getData} blockVisible={blockVisible} mode={mode} />
      </div>
    </div>
  );
};

export default () => <CanvasDemo />;
