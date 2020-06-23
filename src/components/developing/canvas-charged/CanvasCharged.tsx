import React, { useLayoutEffect, useRef, useState } from 'react';
import { drawCanvas, Point2D, Size } from './canvas';

interface Props {
  size: Size;
}

export const CanvasCharged = ({ size }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const [originPoint, setOriginPoint] = useState<Point2D>();
  const [drawingsData, setDrawingsData] = useState<ImageData>();

  const getXY = (e: React.MouseEvent): Point2D => ({
    x: e.nativeEvent.offsetX,
    y: e.nativeEvent.offsetY,
  });

  useLayoutEffect(() => {
    setCtx(canvasRef.current?.getContext('2d')!);
  });

  const startDraw = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOriginPoint(getXY(e));
    saveDrawings();
  };

  const moveDraw = (e: React.MouseEvent) => {
    if (originPoint && ctx) {
      restoreDrawings();
      drawCanvas(ctx, originPoint, getXY(e), '#f11');
    }
  };

  const endDraw = (e: React.MouseEvent) => {
    setOriginPoint(undefined);
    ctx && ctx.save();
  };

  function saveDrawings() {
    if (canvasRef.current && ctx) {
      const w = canvasRef.current.width;
      const h = canvasRef.current.height;

      const data = ctx.getImageData(0, 0, w, h);
      console.log('画布:保存数据::', { data, w, h });
      setDrawingsData(data);
    }
  }

  function restoreDrawings() {
    if (drawingsData && ctx) {
      ctx.putImageData(drawingsData, 0, 0);
    }
  }

  return (
    <div className="g-canvas-wrapper">
      <canvas
        width={size?.w}
        height={size?.h}
        ref={canvasRef}
        onMouseDown={startDraw}
        onMouseMove={moveDraw}
        onMouseUp={endDraw}
        className="g-canvas"
      />
    </div>
  );
};
