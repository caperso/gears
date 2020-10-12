import React, { CSSProperties, forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { CanvasMode, Point2D, Size } from './canvas.interfaces';
import CanvasRect, { CanvasRectProps } from './CanvasRect';

interface Props {
  size: Size | null; // size of the canvas //! change will remove all canvas stroke
  mode: CanvasMode;
  rects: CanvasRect[]; // canvas rect instances
  setRects: (rects: CanvasRect[]) => any; // canvas rect setter
  color?: string;
  disabled?: boolean;
  clearSelected?: boolean; // for clear style of ghost dives
  blockVisible?: boolean;
  onClick?: (instance: CanvasRect) => any;
}

const defaultClassName = 'g-canvas-ghost-div';
const selectedClassName = `${defaultClassName} selected`;

export const CanvasCharged = forwardRef(
  ({ size, color = '#f11', onClick, disabled = false, rects, setRects, blockVisible = false, mode = 'draw' }: Props, ref) => {
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
      const nodes = document.getElementsByClassName(defaultClassName);
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.className = defaultClassName;
      }
      const node = instance.dom;
      node && (node.className = selectedClassName);
      onClick && onClick(instance);
    }

    useImperativeHandle(ref, () => ({
      cleanSelected() {
        let i = 0;
        while (i < ghostRef.current!.childNodes.length) {
          console.log('CanvasCharged:: cleaning style');
          (ghostRef.current!.childNodes[i] as HTMLDivElement).className = defaultClassName;
          ++i;
        }
      },
    }));

    // init canvas and draw data
    useEffect(() => {
      if (size && ghostRef.current) {
        const ctx = canvasRef.current!.getContext('2d');
        setCtx(ctx!);
        ctx!.clearRect(0, 0, size.w, size.h);
        console.log('CanvasCharged: Drawing: ', rects);
        while (ghostRef.current.childNodes.length) {
          ghostRef.current.removeChild(ghostRef.current.childNodes[0]);
        }

        rects.forEach(item => {
          item.dom === null && item.createDiv(handleInstanceClick, blockVisible, color);
          item.insertDiv(ghostRef.current!);
          item.draw(ctx!);
        });
      }
    }, [rects, size, blockVisible, color, handleInstanceClick]);

    //!
    useEffect(() => {}, [rects]);

    //!
    function paintRects(rects: CanvasRect[]) {
      if (!ctx) {
        return;
      }
      rects.forEach(rect => {
        ctx.save();
        ctx.beginPath();
      });
    }

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

    const wrapperStyle: CSSProperties = {
      width: size?.w,
      height: size?.h,
    };

    const ghostStyle: CSSProperties = mode === 'select' ? { zIndex: 1 } : {};

    //! ===================================================================================

    const [scaleX, setScaleX] = useState(1);
    const [scaleY, setScaleY] = useState(1);

    // the union-style of image-ghostDIV-canvas
    const unionStyle: CSSProperties = { width: 0, height: 0, transform: `scaleX(${scaleX}) scaleX(${scaleY})` };

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
  },
);
