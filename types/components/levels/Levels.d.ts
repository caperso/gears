/// <reference types="react" />
import './index.scss';
export declare type LevelProps = {
    name: string;
    route: string;
};
interface StaticLevel extends LevelProps {
    static: true;
    deep?: null;
}
interface LayerLevel extends LevelProps {
    static?: false;
    deep?: Level[];
}
export declare type Level = StaticLevel | LayerLevel;
interface Props {
    data: Level[];
    fontSize?: number;
}
export declare const Levels: (props: Props) => JSX.Element;
export {};
