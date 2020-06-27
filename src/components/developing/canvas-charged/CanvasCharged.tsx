import React, { Component, CSSProperties, RefObject } from 'react';
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
}

interface State {
  ctx: CanvasRenderingContext2D | null;
  originPoint: Point2D | null;
  drawingsData: ImageData | null;
  rects: CanvasRect[];
  selected: CanvasRect | null;
}

const defaultClassName = 'g-canvas-ghost-div';
const selectedClassName = `${defaultClassName} selected`;

export class CanvasCharged extends Component<Props, State> {
  private ghostRef: RefObject<HTMLDivElement> | null;
  private canvasRef: RefObject<HTMLCanvasElement> | null;

  private wrapperStyle: CSSProperties = {
    width: this.props.size?.w,
    height: this.props.size?.h,
  };

  private ghostStyle: CSSProperties = this.props.mode === 'select' ? { zIndex: 1 } : {};
  constructor(props: Props) {
    super(props);
    this.state = {
      ctx: null,
      rects: [],
      selected: null,
      originPoint: null,
      drawingsData: null,
    };
    this.ghostRef = React.createRef<HTMLDivElement>();
    this.canvasRef = React.createRef<HTMLCanvasElement>();
  }

  // handle draw mode
  handleDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.mode === 'draw' && this.beginDraw(e);
  };

  handleMove = (e: React.MouseEvent) => {
    this.props.mode === 'draw' && this.drawing(e);
  };

  handleUp = (e: React.MouseEvent) => {
    this.props.mode === 'draw' && this.endDraw(e);
  };

  // handle instance clicked
  handleInstanceClick = (instance: CanvasRect) => {
    const nodes = document.getElementsByClassName(defaultClassName);
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      node.className = defaultClassName;
    }
    const node = instance.dom;
    node && (node.className = selectedClassName);
    // setSelectId(instance.id)
    this.props.onClick && this.props.onClick(instance);
  };

  // select

  // remove instance
  removeItem = () => {
    if (this.props.mode === 'draw') {
      return;
    }
    if (this.state.selected !== null) {
      const updatedRects = [...this.state.rects].filter(item => item.id !== this.state.selected?.id);
      this.setState({ selected: null, rects: updatedRects });
    }
  };

  componentWillUpdate(props: Props) {
    if (props.size && this.ghostRef?.current) {
      const { size } = props;

      this.state.ctx?.clearRect(0, 0, size.w, size.h);
      for (let i = 0; i < this.ghostRef.current.childNodes.length; i++) {
        const element = this.ghostRef.current.childNodes[i];
        this.ghostRef.current.removeChild(element);
      }

      this.state.rects.forEach(item => {
        item.dom === null && item.createDiv(this.handleInstanceClick, this.props.blockVisible, this.props.color);
        item.insertDiv(this.ghostRef!.current!);
        item.draw(this.state.ctx!);
      });
    }
  }

  // handle draw mode
  beginDraw = (e: React.MouseEvent) => {
    // if user accidentally missed mouseup method,re-fire it.
    if (this.state.originPoint) {
      this.endDraw(e);
    } else if (this.canvasRef?.current) {
      this.setState({ originPoint: CanvasRect.getCoordinates2D(e) });
      if (this.canvasRef.current && this.state.ctx) {
        const w = this.canvasRef.current.width;
        const h = this.canvasRef.current.height;
        const data = this.state.ctx.getImageData(0, 0, w, h);
        console.log('CanvasCharged:save data::', { data, w, h });
        this.setState({ drawingsData: data });
      }
    }
  };

  drawing = (e: React.MouseEvent) => {
    if (this.state.originPoint && this.state.ctx && this.canvasRef?.current && this.state.drawingsData) {
      this.state.ctx.putImageData(this.state.drawingsData, 0, 0);
      let rect = new CanvasRect(this.state.originPoint, CanvasRect.getCoordinates2D(e), this.props.color);
      rect.draw(this.state.ctx);
    }
  };

  endDraw = (e: React.MouseEvent) => {
    if (this.state.originPoint && this.state.ctx && this.ghostRef?.current) {
      const crossPoint = CanvasRect.getCoordinates2D(e);
      const tooClose: boolean =
        Math.abs(this.state.originPoint.x - crossPoint.x) < 3 || Math.abs(this.state.originPoint.y - crossPoint.y) < 3;
      if (tooClose) {
        return;
      }
      let rect = new CanvasRect(this.state.originPoint, crossPoint, this.props.color);
      const instance = rect.createDiv(this.handleInstanceClick, this.props.blockVisible, this.props.color);
      const rects: CanvasRect[] = [...this.state.rects, instance];
      this.setState({ rects });
      this.state.ctx && this.state.ctx.save();
    }
    this.setState({ originPoint: null });
  };

  render() {
    return (
      <div className="g-canvas-wrapper" style={this.wrapperStyle}>
        {console.log('render', this.props, this.state)}

        <div style={this.ghostStyle} className="g-canvas-ghost-collection" ref={this.ghostRef}></div>
        {this.props.size && (
          <canvas
            onMouseDown={this.handleDown}
            onMouseMove={this.handleMove}
            onMouseUp={this.handleUp}
            width={this.props.size.w}
            height={this.props.size.h}
            ref={this.canvasRef}
            onClick={e => e.preventDefault()}
            className="g-canvas"
          />
        )}
      </div>
    );
  }
}
