import React, { useState } from 'react';
import { AxisPoint, ContextMenuProps, DefaultHTMLElementProps } from 'typings/types';
import './ContextMenu.scss';
interface MenuItem {
    name: string;
    method: (props?: any) => void;
}

interface Props extends DefaultHTMLElementProps {
    menu?: ContextMenuProps | MenuItem[] | undefined;
    children: React.ReactElement;
}

const ContextMenu = (props: Props) => {
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

    const renderMenu = (menu: Props['menu']): React.ReactNode => {
        if (menu instanceof Array) {
            return (
                <>
                    {(menu as MenuItem[]).map((item: MenuItem) => (
                        <div key={item.name} onClick={item.method}>
                            {item.name}
                        </div>
                    ))}
                </>
            );
        } else {
            return menu;
        }
    };

    if (!menu) {
        return children;
    }

    return (
        <div onClick={handleClick} onContextMenu={openMenu}>
            {children}
            {showContextMenu && (
                <div className="g-context-menu-default" style={style}>
                    {renderMenu(menu)}
                </div>
            )}
        </div>
    );
};

export default ContextMenu;
