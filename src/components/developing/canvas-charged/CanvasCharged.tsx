import React, { CSSProperties, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CanvasMode, Point2D, Size } from './canvas';
import CanvasRect from './CanvasRect';

interface Props {
  size: Size | null; // size of the canvas //! change will remove all canvas stroke
  color: string;
  rects: CanvasRect[]; // canvas rect instances
  setRects: (rects: CanvasRect[]) => any; // canvas rect setter
  mode?: CanvasMode;
  blockVisible?: boolean;
  onClick?: (instance: CanvasRect) => any;
  onSelect?: (ids: number[]) => any;
}

export const CanvasCharged = ({ size, color = '#f11', onClick, rects, setRects, onSelect, blockVisible = false, mode = 'draw' }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);

  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const [originPoint, setOriginPoint] = useState<Point2D>();
  const [drawingsData, setDrawingsData] = useState<ImageData>();

  useLayoutEffect(() => {
    canvasRef.current && setCtx(canvasRef.current.getContext('2d')!);
  });

  // handle draw mode
  const handleDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    mode === 'draw' ? beginDraw(e) : beginSelect(e);
  };

  const handleMove = (e: React.MouseEvent) => {
    mode === 'draw' ? drawing(e) : selecting(e);
  };

  const handleUp = (e: React.MouseEvent) => {
    mode === 'draw' ? endDraw(e) : endSelect(e);
  };

  // draw data
  useEffect(() => {
    if (ghostRef.current && size) {
      rects.forEach(item => {
        function handleClick(instance: CanvasRect) {
          onClick && onClick(instance);
        }
        ghostRef.current && item.createDiv(ghostRef.current, handleClick, blockVisible, color);
        item.draw(ctx!);
      });
    }
  }, [rects, size, ghostRef.current]);

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
        console.log('CanvasCharged:save data::', { data, w, h });
        setDrawingsData(data);
      }
    }
  }

  function drawing(e: React.MouseEvent) {
    if (originPoint && ctx && canvasRef.current && drawingsData) {
      ctx.putImageData(drawingsData, 0, 0);
      let rect = new CanvasRect(originPoint, CanvasRect.getCoordinates2D(e), color);
      rect.draw(ctx);
    }
  }

  function endDraw(e: React.MouseEvent) {
    if (originPoint && ctx && ghostRef.current) {
      let rect = new CanvasRect(originPoint, CanvasRect.getCoordinates2D(e), color);
      function handleClick(instance: CanvasRect) {
        onClick && onClick(instance);
      }
      const instance = rect.createDiv(ghostRef.current, handleClick, blockVisible, color);
      const newStack = [...rects, instance];
      setRects(newStack);
      ctx && ctx.save();
    }
    setOriginPoint(undefined);
  }

  // handle select mode
  const [selectingData, setSelectingData] = useState<ImageData>();

  function beginSelect(e: React.MouseEvent) {
    //? is it safe to use ORIGIN POINT?
    if (originPoint) {
      endSelect(e);
    } else {
      setOriginPoint(CanvasRect.getCoordinates2D(e));
      if (canvasRef.current && ctx) {
        const w = canvasRef.current.width;
        const h = canvasRef.current.height;
        const data = ctx.getImageData(0, 0, w, h);
        console.log('CanvasCharged:save selection data::', { data, w, h });
        setSelectingData(data);
      }
    }
  }

  function selecting(e: React.MouseEvent) {
    if (originPoint && ctx && canvasRef.current && selectingData) {
      ctx.putImageData(selectingData, 0, 0);
      let rect = new CanvasRect(originPoint, CanvasRect.getCoordinates2D(e), color);
      rect.draw(ctx);
    }
  }

  function endSelect(e: React.MouseEvent) {
    if (originPoint && ghostRef.current) {
      let rect = new CanvasRect(originPoint, CanvasRect.getCoordinates2D(e), 'white');
      rect.createSelection(ghostRef.current, false, color);
      let nodes = rect.getRangeRects();
      if (nodes) {
        const ids = nodes.map(item => +item.id);
        onSelect && onSelect(ids);
      }
      setOriginPoint(undefined);
    }
  }

  const wrapperStyle: CSSProperties = {
    width: size?.w,
    height: size?.h,
  };

  const ghostStyle: CSSProperties = mode === 'select' ? { zIndex: 1 } : {};

  return (
    <div className="g-canvas-wrapper" style={wrapperStyle}>
      <div style={ghostStyle} className="g-canvas-ghost-collection" ref={ghostRef}></div>
      <canvas
        onMouseDown={handleDown}
        onMouseMove={handleMove}
        onMouseUp={handleUp}
        width={size?.w}
        height={size?.h}
        ref={canvasRef}
        onClick={e => e.preventDefault()}
        className="g-canvas"
      />
    </div>
  );
};
