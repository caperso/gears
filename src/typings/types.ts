export interface DefaultHTMLElementProps {
  style?: React.CSSProperties;
  className?: string;
}

export interface MenuItem {
  name: string;
  method: (props?: any) => void;
}

export type AxisPoint = { x: number | string; y: number | string };
