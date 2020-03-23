import React, { useState } from 'react';
import ContextMenu from '../ContextMenu';
import './demo.less';

const BasicContextMenuSample = () => {
  const log = () => console.log('this is a log');

  const renderNode = () => {
    const style: React.CSSProperties = {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
    };
    return <div style={style}>target</div>;
  };

  const [menuList] = useState([{ name: 'detective', method: log }]);

  const [menuNode] = useState(renderNode());

  return (
    <>
      <ContextMenu menu={menuList}>
        <div className="test-block bgc-brown">list context menu</div>
      </ContextMenu>
      <br />
      <ContextMenu menu={menuNode}>
        <div className="test-block bgc-gold">custom context menu</div>
      </ContextMenu>
    </>
  );
};

export default () => <BasicContextMenuSample />;
