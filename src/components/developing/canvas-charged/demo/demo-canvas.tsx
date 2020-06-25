import { Button } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import React, { CSSProperties, useState } from 'react';
import CanvasCharged from '../';
import { CanvasMode, Size } from '../canvas';
import CanvasRect from '../CanvasRect';
import './index.less';

const url = 'https://cdn.pixabay.com/photo/2020/06/18/09/25/waterfall-5312692_1280.jpg';
const fakeData = [
  new CanvasRect({ x: 50, y: 50 }, { x: 70, y: 70 }, 'orange'),
  new CanvasRect({ x: 80, y: 80 }, { x: 90, y: 90 }, 'orange'),
];

const CanvasDemo = () => {
  const [size, setSize] = useState<Size | null>(null);
  const [blockVisible, setBlockVisible] = useState<boolean>(false);
  const [color, setColor] = useState<string>('#f11');
  const [mode, setMode] = useState<CanvasMode>('draw');

  // const [naturalSize, setNaturalSize] = useState<Size>();
  const [rects, setRects] = useState<CanvasRect[]>(fakeData);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const imageStyle: CSSProperties = {
    width: size?.w,
    height: size?.h,
  };

  function getLoadedSize(e: any) {
    setSize({ w: e.target.naturalWidth, h: e.target.naturalHeight });
  }

  const getData = (rect: CanvasRect) => {
    console.log(rect);
  };

  const removeSelection = () => {
    const unSelected = rects.filter(item => !selectedIds.filter(id => id === item.id).length);
    console.log(unSelected);
    setRects(unSelected);
  };

  const handleSelect = (ids: number[]) => {
    setSelectedIds(ids);
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
          <Button type="ghost" onClick={removeSelection}>
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
          onSelect={handleSelect}
          onClick={getData}
          blockVisible={blockVisible}
          mode={mode}
        />
      </div>
    </div>
  );
};

export default () => <CanvasDemo />;
