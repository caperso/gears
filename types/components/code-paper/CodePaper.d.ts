/// <reference types="react" />
import './CodePaper.scss';
interface Props {
    text: string;
    buttonText?: string;
    className?: string;
    handleClick?: (text: string) => void;
}
export declare const CodePaper: (props: Props) => JSX.Element;
export {};
