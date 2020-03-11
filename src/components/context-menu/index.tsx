import React, { useState } from 'react';
import { AxisPoint } from 'typings/types';
import './index.scss';

interface Props {
    menu: React.ReactNode;
    children: React.ReactNode;
}
export const ContextMenu = (props: Props) => {
    const { menu, children } = props;

    const [cursorPoint, setCursorPoint] = useState<AxisPoint>({ x: 0, y: 0 });
    const [showContextMenu, setShowContextMenu] = useState(false);

    const style: React.CSSProperties = {
        position: 'fixed',
        left: cursorPoint.x,
        top: cursorPoint.y,
        backgroundColor: 'white',
        borderRadius: '4px',
        padding: '4px',
    };
    /* 右键菜单 */

    const openMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setCursorPoint({ x: e.clientX, y: e.clientY });
        setShowContextMenu(true);
    };
    const handleClick = (e: React.MouseEvent) => {
        setShowContextMenu(false);
        e.stopPropagation();
    };

    return (
        <div onClick={handleClick} onContextMenu={openMenu}>
            {children}
            {showContextMenu && (
                <div className="g-context-menu-default" style={style}>
                    {menu}
                </div>
            )}
        </div>
    );
};
