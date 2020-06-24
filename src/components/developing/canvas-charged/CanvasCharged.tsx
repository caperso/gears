import React, { useLayoutEffect, useRef, useState } from 'react';
import { CanvasMode, Point2D, Size } from './canvas';
import CanvasRect from './CanvasRect';

interface Props {
  size: Size;
  color: string;
  blockVisible: boolean;
  mode?: CanvasMode;
  onClick?: (instance: CanvasRect, rects: CanvasRect[]) => any;
  onSelect?: () => any;
}

export const CanvasCharged = ({ size, color = '#f11', onClick, blockVisible = false, mode = 'draw' }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const [originPoint, setOriginPoint] = useState<Point2D>();
  const [drawingsData, setDrawingsData] = useState<ImageData>();
  const [rects, setRects] = useState<CanvasRect[]>([]);

  useLayoutEffect(() => {
    setCtx(canvasRef.current?.getContext('2d')!);
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
    if (originPoint && ctx && wrapperRef.current) {
      let rect = new CanvasRect(originPoint, CanvasRect.getCoordinates2D(e), color);
      rect.draw(ctx);
      function handleClick(instance: CanvasRect) {
        onClick && onClick(instance, [...rects, instance]);
      }
      const instance = rect.createDiv(wrapperRef.current, handleClick, blockVisible, color);
      const newStack = [...rects, instance];
      setRects(newStack);
      ctx && ctx.save();
    }
    setOriginPoint(undefined);
  }

  // handle select mode
  const [selectingData, setSelectingData] = useState<ImageData>();
  const [selectedRects, setSelectedRects] = useState<CanvasRect[]>([]);

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
    if (originPoint && wrapperRef.current) {
      let rect = new CanvasRect(originPoint, CanvasRect.getCoordinates2D(e), 'white');
      rect.createSelection(wrapperRef.current, false, color);
      let nodes = rect.getRangeRects();
      if (nodes) {
        const ids = nodes.map(item => +item.id);
        const selects = rects.filter(item => ids.filter(id => item.id === id));
        setSelectedRects(selects);
      }
      setOriginPoint(undefined);
    }
  }

  return (
    <div className="g-canvas-wrapper" ref={wrapperRef}>
      <canvas
        width={size?.w}
        height={size?.h}
        ref={canvasRef}
        onMouseDown={handleDown}
        onMouseMove={handleMove}
        onMouseUp={handleUp}
        onClick={e => e.preventDefault()}
        className="g-canvas"
      />
    </div>
  );
};
