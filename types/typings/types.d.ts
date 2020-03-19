/// <reference types="react" />
export interface DefaultHTMLElementProps {
    style?: React.CSSProperties;
    className?: string;
}
export interface MenuItem {
    name: string;
    method: (props?: any) => void;
}
export declare type AxisPoint = {
    x: number;
    y: number;
};
