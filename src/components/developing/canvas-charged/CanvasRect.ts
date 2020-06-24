import { Point2D, Size } from './canvas';

export default class CanvasRect {
  public readonly id: number;
  private originPoint: Point2D;
  private crossPoint: Point2D;
  private color: string;
  private dom: HTMLDivElement | null;
  public readonly defaultClassName = 'g-canvas-ghost-div';
  public readonly selectedClassName = `${this.defaultClassName} selected`;

  constructor(originPoint: Point2D, crossPoint: Point2D, color: string) {
    this.originPoint = originPoint;
    this.crossPoint = crossPoint;
    this.color = color;
    this.dom = null;
    this.id = +new Date();
  }

  static getInstance() {
    return this;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    const { w, h } = this.getSize(false);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;

    ctx.save();
    ctx.beginPath();
    ctx.strokeRect(this.originPoint.x, this.originPoint.y, w, h);
    ctx.stroke();
    ctx.restore();
  }

  static getCoordinates2D(e: React.MouseEvent): Point2D {
    return {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };
  }

  // get style property [width] and [height] of this div
  private getSize(absolute: boolean = true): Size {
    const deltaX = this.crossPoint.x - this.originPoint.x;
    const deltaY = this.crossPoint.y - this.originPoint.y;

    return {
      w: absolute ? Math.abs(deltaX) : deltaX,
      h: absolute ? Math.abs(deltaY) : deltaY,
    };
  }

  // get style property [left] and [top] of this div
  private getPosition() {
    return {
      l: this.originPoint.x <= this.crossPoint.x ? this.originPoint.x : this.crossPoint.x,
      t: this.originPoint.y <= this.crossPoint.y ? this.originPoint.y : this.crossPoint.y,
    };
  }

  // create a div instance for interaction
  public createDiv(parent: HTMLElement, onClick: (obj: this) => any, visible: boolean = false, color = 'red') {
    const div = document.createElement('div');
    div.onclick = () => onClick(this);

    const { l, t } = this.getPosition();
    const { w, h } = this.getSize();
    const defaultStyle: string = `position: absolute;left:${l}px;top:${t}px;width:${w}px;height:${h}px;`;
    const visibleStyle: string = `${defaultStyle}; background: ${color}`;

    div.setAttribute('style', visible ? visibleStyle : defaultStyle);
    div.setAttribute('class', this.defaultClassName);
    div.setAttribute('data-id', this.id.toString());
    parent.appendChild(div);
    this.dom = div;
    return this;
  }

  // create a selection div
  public createSelection(parent: HTMLElement, visible: boolean = false, color = 'red') {
    const div = document.createElement('div');

    const { l, t } = this.getPosition();
    const { w, h } = this.getSize();
    const defaultStyle: string = `position: absolute;left:${l}px;top:${t}px;width:${w}px;height:${h}px;`;
    const visibleStyle: string = `${defaultStyle} background: ${color}`;
    div.setAttribute('style', visible ? visibleStyle : defaultStyle);
    parent.appendChild(div);
    this.dom = div;
    return div;
  }

  // get Instance of a selection div
  public getRangeRects() {
    if (!this.dom) {
      console.log('instance dom does not exist');
      return false;
    }
    const { l, t } = this.getPosition();
    const { w, h } = this.getSize();
    let nodes = document.getElementsByClassName(this.defaultClassName);
    const selectedNodes = [];
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i] as HTMLDivElement;
      let farLeft = node.offsetWidth + node.offsetLeft;
      let farTop = node.offsetHeight + node.offsetTop;
      // farLeft and farTop make a rect, return instance it encounters
      const inRange = farLeft > l && farTop > t && node.offsetLeft < l + w && node.offsetTop < t + h;
      node.className = inRange ? this.selectedClassName : this.defaultClassName;
      selectedNodes.push(node);
    }
    return selectedNodes;
  }
}
