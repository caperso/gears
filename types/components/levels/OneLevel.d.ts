/// <reference types="react" />
import './index.scss';
import { Level } from './Levels';
interface Props {
    level: Level;
    depth: number;
    route: string;
    fontSize: number;
}
export declare const OneLevel: (props: Props) => JSX.Element;
export {};
