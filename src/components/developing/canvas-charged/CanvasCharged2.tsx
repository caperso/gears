import React, { CSSProperties, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { CanvasMode, Point2D, Size } from './canvas.interfaces';
import CanvasRect, { CanvasRectProps } from './CanvasRect';
import { DEFAULT_CANVAS_RECT_CLASS_NAME, DEFAULT_CANVAS_RECT_SELECTED_CLASS_NAME } from './constants';

interface Props {
  rects: CanvasRect[]; // canvas rect instances
  setRects: (rects: CanvasRect[]) => any; // canvas rect setter
  mode?: CanvasMode;
  defaultSize?: Size | null; // size of the canvas //! change will remove all canvas stroke
  color?: string;
  disabled?: boolean;
  clearSelected?: boolean; // for clear style of ghost dives
  blockVisible?: boolean;
  imageUrl?: string;
  onClick?: (instance: CanvasRect) => any;
}

const CanvasCharged = forwardRef((props: Props, ref) => {
  const {
    defaultSize,
    color = '#f11',
    onClick,
    disabled = false,
    rects,
    setRects,
    blockVisible = false,
    mode = 'draw',
    imageUrl = '',
  } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);

  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const [originPoint, setOriginPoint] = useState<Point2D>();
  const [drawingsData, setDrawingsData] = useState<ImageData>();

  // useLayoutEffect(() => {
  //   canvasRef.current && setCtx(canvasRef.current.getContext('2d')!);
  // });

  // handle draw mode
  const handleDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    mode === 'draw' && !disabled && beginDraw(e);
  };

  const handleMove = (e: React.MouseEvent) => {
    mode === 'draw' && !disabled && onDrawing(e);
  };

  const handleUp = (e: React.MouseEvent) => {
    mode === 'draw' && !disabled && endDraw(e);
  };

  // handle instance clicked
  function handleInstanceClick(instance: CanvasRect) {
    const nodes = document.getElementsByClassName(DEFAULT_CANVAS_RECT_CLASS_NAME);
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      node.className = DEFAULT_CANVAS_RECT_CLASS_NAME;
    }
    const node = instance.dom;
    node && (node.className = DEFAULT_CANVAS_RECT_SELECTED_CLASS_NAME);
    onClick && onClick(instance);
  }

  useImperativeHandle(ref, () => ({
    cleanSelected() {
      let i = 0;
      while (i < ghostRef.current!.childNodes.length) {
        console.log('CanvasCharged:: cleaning style');
        (ghostRef.current!.childNodes[i] as HTMLDivElement).className = DEFAULT_CANVAS_RECT_CLASS_NAME;
        ++i;
      }
    },
  }));

  // init canvas and draw data
  useEffect(() => {
    if (ghostRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')!;
      CanvasRect.removeAll(ctx, canvasRef.current, ghostRef.current);
      setCtx(ctx);
      rects.forEach(item => {
        item.dom === null && item.createDiv(handleInstanceClick, blockVisible, color);
        item.insertDiv(ghostRef.current!);
        item.draw(ctx!);
      });
    }
  }, [rects, blockVisible, color]);

  // handle draw mode
  function beginDraw(e: React.MouseEvent) {
    // if user accidentally missed mouseup method,re-fire it.
    if (originPoint) {
      endDraw(e);
    } else {
      setOriginPoint(CanvasRect.getCoordinates2D(e));
      if (canvasRef.current && ctx) {
        const w = canvasRef.current.width;
        const h = canvasRef.current.height;
        const data = ctx.getImageData(0, 0, w, h);
        setDrawingsData(data);
      }
    }
  }

  function onDrawing(e: React.MouseEvent) {
    if (originPoint && ctx && canvasRef.current && drawingsData) {
      ctx.putImageData(drawingsData, 0, 0);
      const config: CanvasRectProps = {
        id: uuid(),
        originPoint,
        crossPoint: CanvasRect.getCoordinates2D(e),
        style: { color },
      };
      let rect = new CanvasRect(config);
      rect.draw(ctx);
    }
  }

  function endDraw(e: React.MouseEvent) {
    if (originPoint && ctx && ghostRef.current) {
      const crossPoint = CanvasRect.getCoordinates2D(e);
      const tooClose: boolean = Math.abs(originPoint.x - crossPoint.x) < 3 || Math.abs(originPoint.y - crossPoint.y) < 3;
      if (tooClose) {
        return;
      }
      const config: CanvasRectProps = {
        id: uuid(),
        originPoint,
        crossPoint,
        style: { color },
      };
      let rect = new CanvasRect(config);
      const instance = rect.createDiv(handleInstanceClick, blockVisible, color);
      const newStack: CanvasRect[] = [...rects, instance];
      setRects(newStack);
      ctx && ctx.save();
    }
    setOriginPoint(undefined);
  }

  const scaleImage = (e: React.WheelEvent) => {
    console.log(e.deltaY);

    setUnionScaleX(s => s * (1 + e.deltaY / 1000));
    setUnionScaleY(s => s * (1 + e.deltaY / 1000));
  };

  const [size, setSize] = useState<Size>({ w: 0, h: 0 });
  const [imageLoadedSize, setImageLoadedSize] = useState<Size>({ w: 0, h: 0 });
  const [unionScaleX, setUnionScaleX] = useState(1);
  const [unionScaleY, setUnionScaleY] = useState(1);

  function getLoadedSize(e: any) {
    const loadedSize = { w: e.target.naturalWidth, h: e.target.naturalHeight };
    setImageLoadedSize(loadedSize);
    //! when size is undefined && image url exists,follow the loaded image size
    if (!defaultSize && imageUrl) {
      setSize(imageLoadedSize);
    }
  }

  // the outer-style of wrapper
  const wrapperStyle: CSSProperties = { width: size.w, height: size.h };
  // the union-style of image-ghostDIV-canvas
  const unionStyle: CSSProperties = { width: size.w, height: size.h, transform: `scaleX(${unionScaleX}) scaleY(${unionScaleY})` };

  const ghostStyle: CSSProperties = mode === 'select' ? { zIndex: 1 } : {};

  return (
    <div className="g-canvas-wrapper" style={wrapperStyle}>
      {imageUrl && (
        <img
          src={imageUrl}
          style={unionStyle}
          alt="fail to load image"
          onLoad={getLoadedSize}
          onWheel={scaleImage}
          className="g-canvas-image"
          onClick={e => e.preventDefault()}
          onMouseDown={e => e.preventDefault()}
        />
      )}
      <div style={ghostStyle} className="g-canvas-ghost-collection" ref={ghostRef} />
      <canvas
        onMouseDown={handleDown}
        onMouseMove={handleMove}
        onMouseUp={handleUp}
        width={unionStyle.width}
        height={unionStyle.height}
        ref={canvasRef}
        onClick={e => e.preventDefault()}
        className="g-canvas"
      />
    </div>
  );
});

export default CanvasCharged;
