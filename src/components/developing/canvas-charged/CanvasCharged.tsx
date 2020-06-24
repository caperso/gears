import React, { useLayoutEffect, useRef, useState } from 'react';
import { Point2D, Size } from './canvas';
import CanvasRect from './CanvasRect';

interface Props {
  size: Size;
  forwardRef?: React.RefObject<any>;
}

export const CanvasCharged = ({ size }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const [originPoint, setOriginPoint] = useState<Point2D>();
  const [drawingsData, setDrawingsData] = useState<ImageData>();
  const [dataStack, setDataStack] = useState<CanvasRect[]>([]);

  useLayoutEffect(() => {
    setCtx(canvasRef.current?.getContext('2d')!);
  });

  const handleDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // if user accidentally missed mouseup method,re-fire it.
    if (originPoint) {
      handleUp(e);
    } else {
      setOriginPoint(CanvasRect.getCoordinates2D(e));
      saveDrawings();
    }
  };

  const handleMove = (e: React.MouseEvent) => {
    if (originPoint && ctx && canvasRef.current) {
      restoreDrawings();
      let rect = new CanvasRect(originPoint, CanvasRect.getCoordinates2D(e), '#f11');
      rect.draw(ctx);
    }
  };

  const handleUp = (e: React.MouseEvent) => {
    if (originPoint && ctx && wrapperRef.current) {
      function action(instance: CanvasRect) {
        console.log('clicked time::', instance);
      }
      let rect = new CanvasRect(originPoint, CanvasRect.getCoordinates2D(e), '#f11');
      rect.draw(ctx);
      const instance = rect.createDiv(wrapperRef.current, action, true);
      console.log(instance);
      setDataStack(s => [...s, instance]);

      ctx && ctx.save();
    }
    setOriginPoint(undefined);
  };

  function saveDrawings() {
    if (canvasRef.current && ctx) {
      const w = canvasRef.current.width;
      const h = canvasRef.current.height;

      const data = ctx.getImageData(0, 0, w, h);
      console.log('CanvasCharged:save data::', { data, w, h });
      setDrawingsData(data);
    }
  }

  function restoreDrawings() {
    if (drawingsData && ctx) {
      ctx.putImageData(drawingsData, 0, 0);
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
