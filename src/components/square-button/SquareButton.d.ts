/// <reference types="react" />
import './SquareButton.less';
interface Props {
  name: string;
  icon?: string;
  clickCallback?: (e: any) => void;
}
export declare const SquareButton: (props: Props) => JSX.Element;
export {};
