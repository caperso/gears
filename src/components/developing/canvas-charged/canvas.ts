export interface Point2D {
  x: number;
  y: number;
}

export interface Size {
  w: number;
  h: number;
}

// export function drawCanvas(ctx: CanvasRenderingContext2D, origin: Point2D, { x, y }: Point2D, color: string) {
//   ctx.strokeStyle = color;
//   ctx.lineWidth = 2;

//   ctx.save();
//   ctx.beginPath();
//   ctx.strokeRect(origin.x, origin.y, x - origin.x, y - origin.y);
//   ctx.stroke();
//   ctx.restore();
// }
