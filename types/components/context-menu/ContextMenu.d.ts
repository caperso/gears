import React from 'react';
import { DefaultHTMLElementProps, MenuItem } from 'typings/types';
import './ContextMenu.scss';
interface Props extends DefaultHTMLElementProps {
    menu?: MenuItem[] | React.ReactElement | null;
    children: React.ReactElement;
}
declare const ContextMenu: (props: Props) => JSX.Element;
export default ContextMenu;
