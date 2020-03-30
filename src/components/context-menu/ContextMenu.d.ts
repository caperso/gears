import React from 'react';
import { DefaultHTMLElementProps, MenuItem } from '../../typings/types';
import './ContextMenu.less';
interface Props extends DefaultHTMLElementProps {
  menu: MenuItem[] | React.ReactElement;
  children: React.ReactElement | React.ReactElement[];
}
export declare const ContextMenu: (props: Props) => JSX.Element;
export {};
