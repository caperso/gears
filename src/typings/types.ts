export type AxisPoint = { x: number; y: number };
export type ImageControlMode = 'rotate' | 'drag' | 'ratio-scale';
export type ImageOperations = 'rotate' | 'drag' | 'ratio-scale' | 'zoom-in' | 'zoom-out';

export interface MenuItem {
    name: string;
    method: (props?: any) => void;
}

export interface DefaultHTMLElementProps {
    style?: React.CSSProperties;
    className?: string;
}
