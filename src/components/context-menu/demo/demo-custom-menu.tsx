import { message } from 'antd';
import 'antd/es/message/style/css';
import React from 'react';
import { ContextMenu } from '../ContextMenu';
import './demo.less';

const BasicContextMenuSample = () => {
  const loadSequence = () => {
    message.success('Initiating nuclear missile launch sequence~');
  };

  const menuNode = (
    <div className="test-context-node">
      <p className="g-context-menu-item" onClick={loadSequence}>
        LAUNCH THE MISSILE
      </p>
      <p className="g-context-menu-item" onClick={loadSequence}>
        LAUNCH THE MISSILE
      </p>
      <p className="g-context-menu-item" onClick={loadSequence}>
        LAUNCH THE MISSILE
      </p>
      <p className="g-context-menu-item" onClick={loadSequence}>
        LAUNCH THE MISSILE
      </p>
      <p className="g-context-menu-item" onClick={loadSequence}>
        LAUNCH THE MISSILE
      </p>
    </div>
  );

  return (
    <ContextMenu menu={menuNode}>
      <div className="test-block bgc-gold">custom context menu</div>
    </ContextMenu>
  );
};

export default () => <BasicContextMenuSample />;
