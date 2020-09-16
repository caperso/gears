export interface Point2D {
  x: number;
  y: number;
}

export interface Size {
  w: number;
  h: number;
}

export type CanvasMode = 'draw' | 'select';

export interface CanvasStyle {
  color?: string;
  lineWidth?: number;
}
