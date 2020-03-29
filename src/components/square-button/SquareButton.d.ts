/// <reference types="react" />
import './SquareButton.less';
interface Props {
  name: string;
  icon?: string;
  clickCallback?: (e: any) => void;
}
declare const SquareButton: (props: Props) => JSX.Element;
export default SquareButton;
