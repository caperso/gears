import { Button, message } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import React, { CSSProperties, useState } from 'react';
import CanvasCharged from '../';
import { CanvasMode, Size } from '../canvas';
import CanvasRect from '../CanvasRect';
import './index.less';

const url = 'https://wx1.sinaimg.cn/large/006nW6YZly1gg7429j7glj30j60y379b.jpg';
const fakeData = [
  new CanvasRect({ x: 50, y: 50 }, { x: 70, y: 70 }, 'orange', 0),
  new CanvasRect({ x: 80, y: 80 }, { x: 90, y: 90 }, 'orange', 1),
];

const CanvasDemo = () => {
  const [size, setSize] = useState<Size | null>(null);
  const [blockVisible, setBlockVisible] = useState<boolean>(false);
  const [color, setColor] = useState<string>('#f11');
  const [mode, setMode] = useState<CanvasMode>('draw');
  const [rects, setRects] = useState<CanvasRect[]>(fakeData);
  const [selected, setSelected] = useState<CanvasRect | null>(null);

  const imageStyle: CSSProperties = {
    width: size?.w,
    height: size?.h,
  };

  function getLoadedSize(e: any) {
    setSize({ w: e.target.naturalWidth, h: e.target.naturalHeight });
  }

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
      message.success('Removed !');
    }
  };

  return (
    <div className="demo-canvas-wrapper">
      <div className="canvas-header">
        <ButtonGroup className="button-group">
          <Button type={mode === 'draw' ? 'primary' : 'ghost'} onClick={() => setMode('draw')}>
            drawing-mode
          </Button>
          <Button type={mode === 'select' ? 'primary' : 'ghost'} onClick={() => setMode('select')}>
            selecting-mode
          </Button>
        </ButtonGroup>
        <ButtonGroup className="button-group">
          <Button type="danger" onClick={removeItem}>
            remove-selected
          </Button>
        </ButtonGroup>
        <ButtonGroup className="button-group">
          <Button type={color === '#f11' ? 'danger' : 'ghost'} onClick={() => setColor('#f11')}>
            color:red
          </Button>
          <Button type={color === '#0fe' ? 'primary' : 'ghost'} onClick={() => setColor('#0fe')}>
            color:blue
          </Button>
        </ButtonGroup>

        <ButtonGroup className="button-group">
          <Button type={blockVisible ? 'primary' : 'ghost'} onClick={() => setBlockVisible(true)}>
            block:visible
          </Button>
          <Button type={!blockVisible ? 'primary' : 'ghost'} onClick={() => setBlockVisible(false)}>
            block:invisible
          </Button>
        </ButtonGroup>
      </div>
      <div className="demo-canvas-wrapper" style={{ width: size?.w, height: size?.h }}>
        <img
          src={url}
          style={imageStyle}
          alt="fail to load image"
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
