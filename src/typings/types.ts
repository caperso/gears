export type AxisPoint = { x: number; y: number };
export type ImageControlMode = 'free-rotate' | 'free-drag' | 'ratio-scale';
export type ImageAction = 'rotate' | 'drag' | 'ratio-scale' | 'zoom-in' | 'zoom-out' | 'reset';

export type ImageOperation = ImageAction | ImageControlMode;

export interface MenuItem {
    name: string;
    method: (props?: any) => void;
}

export type ImageOperationMap = {
    [key in ImageOperation]?: (props?: any) => void;
};

export interface DefaultHTMLElementProps {
    style?: React.CSSProperties;
    className?: string;
}
