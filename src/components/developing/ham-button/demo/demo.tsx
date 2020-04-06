import React, { useState } from 'react';
import HamButton from '../HamButton';
import './demo.less';

const HamButtonDemo = () => {
  const [viewportWidth, setViewportWidth] = useState('100%');

  const toggleViewportWidth = () => {
    setViewportWidth(s => (s === '100%' ? '750px' : '100%'));
  };

  return (
    <div className="demo-wrapper" style={{ width: viewportWidth }}>
      <button onClick={toggleViewportWidth}>changeWidth</button>
      <HamButton />
    </div>
  );
};

export default () => <HamButtonDemo />;
