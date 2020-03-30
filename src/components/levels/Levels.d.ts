/// <reference types="react" />
import './level.less';
export declare type BaseLevelProps = {
  name: string;
  staticUrl?: string;
  deep?: BaseLevelProps[];
  action?: <T>(route: string) => T;
};
export declare type Level = BaseLevelProps;
interface Props {
  data: Level[];
  baseFontSize?: number;
  fontSizeDecrease?: number;
}
export declare const Levels: (props: Props) => JSX.Element;
export {};
