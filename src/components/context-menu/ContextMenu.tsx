import React, { useState } from 'react';
import { AxisPoint, DefaultHTMLElementProps, MenuItem } from '../../typings/types';
import './ContextMenu.less';

interface Props extends DefaultHTMLElementProps {
  menu: MenuItem[] | React.ReactElement;
  children: React.ReactElement | React.ReactElement[];
}

const ContextMenu = (props: Props) => {
  const { menu, children } = props;

  const [cursorPoint, setCursorPoint] = useState<AxisPoint>({ x: 0, y: 0 });

  const [showContextMenu, setShowContextMenu] = useState(false);

  const contentStyle: React.CSSProperties = {
    left: cursorPoint.x,
    top: cursorPoint.y,
  };

  /* 右键菜单 */
  const openMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowContextMenu(true);
    setCursorPoint({ x: e.clientX, y: e.clientY });
  };

  const closeMenu = (e: React.MouseEvent) => {
    setShowContextMenu(false);
    e.stopPropagation();
  };

  const renderMenu = (menu: Props['menu']): React.ReactNode => {
    if (menu instanceof Array) {
      return (
        <>
          {(menu as MenuItem[]).map((item: MenuItem) => (
            <div key={item.name} className="g-context-menu-item" onClick={item.method}>
              {item.name}
            </div>
          ))}
        </>
      );
    }
    return menu;
  };

  return (
    <div onContextMenu={openMenu}>
      {children}
      {showContextMenu && (
        <div className="g-context-menu-cover-mask" onClick={closeMenu} onWheel={closeMenu}>
          <div className="g-context-menu-default" style={contentStyle}>
            {renderMenu(menu)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContextMenu;
