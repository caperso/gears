export interface DefaultHTMLElementProps {
  style?: React.CSSProperties;
  className?: string;
}

export interface MenuItem {
  name: string;
  method: (props?: any) => void;
}

export type AxisPoint = { x: number; y: number };
export type AxisPointString = { x: string; y: string };
