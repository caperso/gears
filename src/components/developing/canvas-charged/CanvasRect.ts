import { Point2D, Size } from './canvas';

export default class CanvasRect {
  private id: number;
  private originPoint: Point2D;
  private crossPoint: Point2D;
  private color: string;

  constructor(originPoint: Point2D, crossPoint: Point2D, color: string) {
    this.originPoint = originPoint;
    this.crossPoint = crossPoint;
    this.color = color;
    this.id = +new Date();
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;

    ctx.save();
    ctx.beginPath();
    ctx.strokeRect(this.originPoint.x, this.originPoint.y, this.getSize(false).w, this.getSize(false).h);
    ctx.stroke();
    ctx.restore();
  }

  static getCoordinates2D(e: React.MouseEvent): Point2D {
    return {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };
  }

  private getSize(absolute: boolean = true): Size {
    const deltaX = this.crossPoint.x - this.originPoint.x;
    const deltaY = this.crossPoint.y - this.originPoint.y;

    return {
      w: absolute ? Math.abs(deltaX) : deltaX,
      h: absolute ? Math.abs(deltaY) : deltaY,
    };
  }

  // create a div instance for interaction
  public createDiv(parent: HTMLElement, onClick: (obj: this) => any, visible: boolean = false) {
    const div = document.createElement('div');
    div.onclick = () => onClick(this);
    const left = this.originPoint.x <= this.crossPoint.x ? this.originPoint.x : this.crossPoint.x;
    const top = this.originPoint.y <= this.crossPoint.y ? this.originPoint.y : this.crossPoint.y;
    const defaultStyle: string = `position: absolute;opacity: 0;left:${left}px;top:${top}px;width:${this.getSize().w}px;height:${
      this.getSize().h
    }px;`;
    const visibleStyle: string = `${defaultStyle}opacity: 1; background: red`;
    div.setAttribute('style', visible ? visibleStyle : defaultStyle);
    parent.appendChild(div);
    return this;
  }

  public destroyDiv() {}
}
