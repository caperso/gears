export type AxisPoint = { x: number; y: number };
export type ImageControlMode = 'rotate' | 'drag' | 'ratio-scale';

export interface DefaultHTMLElementProps {
    style?: React.CSSProperties;
    className?: string;
}

export type ContextMenuProps = 'default-context-menu' | React.ReactNode | null;
