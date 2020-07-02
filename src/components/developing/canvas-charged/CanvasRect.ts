import { Point2D, Size } from './canvas';

const defaultClassName = 'g-canvas-ghost-div';
const selectedClassName = `${defaultClassName} selected`;

interface Props {
  id: number | string;
  originPoint: Point2D;
  crossPoint: Point2D;
  color: string;
  dom: HTMLDivElement | null;
  status: string | undefined; // status for custom symbol
}

export default class CanvasRect {
  public readonly id: number | string;
  public readonly originPoint: Point2D;
  public readonly crossPoint: Point2D;
  public color: string;
  public dom: HTMLDivElement | null;
  public status: string | undefined; // status for custom symbol

  constructor(props: Props) {
    const { originPoint, crossPoint, color, id, status } = props;
    this.originPoint = originPoint;
    this.crossPoint = crossPoint;
    this.color = color;
    this.dom = null;
    this.id = id;
    this.status = status;
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
  public createDiv(onClick: (obj: this) => any, visible: boolean = false, color = 'red'): this {
    if (this.dom) {
      throw console.error('CanvasCharged: DIV ALREADY EXISTS');
    }
    const div = document.createElement('div');
    div.onclick = () => onClick(this);
    const { l, t } = this.getPosition();
    const { w, h } = this.getSize();
    // const defaultStyle: string = `position: absolute;z-index:-1;left:${l}px;top:${t}px;width:${w}px;height:${h}px;`;
    const defaultStyle: string = `position: absolute;left:${l}px;top:${t}px;width:${w}px;height:${h}px;`;
    const visibleStyle: string = `${defaultStyle}; background: ${color || ''}`;

    div.setAttribute('style', visible ? visibleStyle : defaultStyle);
    div.setAttribute('class', defaultClassName);
    div.setAttribute('data-id', this.id.toString());
    this.dom = div;
    return this;
  }

  public insertDiv(parent: HTMLElement) {
    if (!this.dom) {
      throw console.error('CanvasCharged: DOM IS NOT CREATED');
    }
    parent.insertBefore(this.dom, parent.firstChild);
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

  public selectInstance() {}

  // remove all instances and canvas items
  static removeAll() {}

  // get Instance of a selected div
  public getRangeRects() {
    if (!this.dom) {
      console.log('instance dom does not exist');
      return false;
    }
    const { l, t } = this.getPosition();
    const { w, h } = this.getSize();
    let nodes = document.getElementsByClassName(defaultClassName);
    const selectedNodes = [];
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i] as HTMLDivElement;
      let farLeft = node.offsetWidth + node.offsetLeft;
      let farTop = node.offsetHeight + node.offsetTop;
      // farLeft and farTop make a rect, return instance it encounters
      const inRange = farLeft > l && farTop > t && node.offsetLeft < l + w && node.offsetTop < t + h;
      node.className = inRange ? selectedClassName : defaultClassName;
      selectedNodes.push(node);
    }
    return selectedNodes;
  }
}
