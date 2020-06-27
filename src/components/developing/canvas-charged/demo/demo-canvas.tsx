import { Button, message } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import React, { CSSProperties, useState } from 'react';
import CanvasCharged from '../';
import { CanvasMode, Size } from '../canvas';
import CanvasRect from '../CanvasRect';
import './index.less';

const url = 'https://cdn.pixabay.com/photo/2020/06/18/09/25/waterfall-5312692_1280.jpg';
const fakeData = [
  new CanvasRect({ x: 50, y: 50 }, { x: 70, y: 70 }, 'orange', 0),
  new CanvasRect({ x: 80, y: 80 }, { x: 90, y: 90 }, 'orange', 1),
];

const CanvasDemo = () => {
  const [size, setSize] = useState<Size | null>(null);
  const [blockVisible, setBlockVisible] = useState<boolean>(false);
  const [color, setColor] = useState<string>('#f11');
  const [mode, setMode] = useState<CanvasMode>('draw');

  // const [naturalSize, setNaturalSize] = useState<Size>();
  const [rects, setRects] = useState<CanvasRect[]>(fakeData);

  const imageStyle: CSSProperties = {
    width: size?.w,
    height: size?.h,
  };

  function getLoadedSize(e: any) {
    setSize({ w: e.target.naturalWidth, h: e.target.naturalHeight });
  }

  // standard remove action
  const [selected, setSelected] = useState<CanvasRect | null>(null);

  const getInstance = (rect: CanvasRect) => {
    message.info(`Selected item's id: ${rect.id}`);
    setSelected(rect);
    console.log(rect);
  };

  const removeItem = () => {
    if (mode === 'select' && selected) {
      setRects(s => {
        const updatedState = [...s];
        const index = updatedState.findIndex(item => item.id === selected.id);
        updatedState.splice(index, 1);
        console.log('updatedState,', updatedState);

        return updatedState;
      });
      setSelected(null);
      setTimeout(() => console.log('rect', rects), 0);
    }
  };

  return (
    <div className="demo-canvas-wrapper">
      <ButtonGroup>
        <Button type="ghost" onClick={() => setColor('#f11')}>
          Red
        </Button>
        <Button type="ghost" onClick={() => setColor('#0fe')}>
          Blue
        </Button>
        <Button type="ghost" onClick={() => setBlockVisible(true)}>
          Block-visible
        </Button>
        <Button type="ghost" onClick={() => setBlockVisible(false)}>
          Block-invisible
        </Button>
        <ButtonGroup>
          <Button type="ghost" onClick={() => setMode('draw')}>
            Draw
          </Button>
          <Button type="ghost" onClick={() => setMode('select')}>
            Select
          </Button>
          <Button type="ghost" onClick={removeItem}>
            Remove
          </Button>
        </ButtonGroup>
      </ButtonGroup>
      <div className="demo-canvas-wrapper" style={{ width: size?.w, height: size?.h }}>
        <img
          src={url}
          style={imageStyle}
          alt="turbine defects"
          onLoad={getLoadedSize}
          className="g-canvas-image"
          onClick={e => e.preventDefault()}
          onMouseDown={e => e.preventDefault()}
        />
        <CanvasCharged
          size={size}
          color={color}
          rects={rects}
          setRects={setRects}
          onClick={getInstance}
          blockVisible={blockVisible}
          mode={mode}
        />
      </div>
    </div>
  );
};

export default () => <CanvasDemo />;
