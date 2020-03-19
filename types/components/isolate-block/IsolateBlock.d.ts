import React from 'react';
import { DefaultHTMLElementProps } from 'typings/types';
import './IsolateBlock.scss';
interface Props extends DefaultHTMLElementProps {
    children: React.ReactNode;
}
export declare const IsolateBlock: (props: Props) => JSX.Element;
export {};
