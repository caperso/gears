import React, { useState } from 'react';
import { AxisPoint } from 'typings/types';
import './index.scss';
interface Props {
    menu: React.ReactNode;
    children: React.ReactNode;
    onContextMenuCallback?:()=>void
}
export const ContextMenu = (props: Props) => {
    const { menu, children,onContextMenuCallback=null } = props;

    const [cursorPoint, setCursorPoint] = useState<AxisPoint>({ x: 0, y: 0 });
    const [showContextMenu, setShowContextMenu] = useState(false);

    const style: React.CSSProperties = {
        left: cursorPoint.x,
        top: cursorPoint.y,
    };
    /* 右键菜单 */

    const openMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setCursorPoint({ x: e.clientX, y: e.clientY });
        setShowContextMenu(true);
        if(onContextMenuCallback){
            onContextMenuCallback()
        }
    };
    const handleClick = (e: React.MouseEvent) => {
        setShowContextMenu(false);
        e.stopPropagation();
        e.preventDefault()
    };

    const wrapperStyle:React.CSSProperties={
        width:'fit-content',
        height:'fit-content'
    }

    return (
        <div onClick={handleClick}  style={wrapperStyle} onContextMenu={openMenu} >
            {children}
            {showContextMenu && <div className='g-context-menu-wrapper' style={style}>{menu}</div>}
        </div>
    );
};
