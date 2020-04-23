import { Button } from 'antd';
import React, { useState } from 'react';
import { AudioInput } from '../core/AudioInput';
import './demo.less';

const LiveSteamDemo = () => {
  const [onStreaming, setOnStreaming] = useState(false);
  const handleStreamClick = () => {
    setOnStreaming(s => !s);
  };

  return (
    <div className="live-stream-demo-wrapper">
      使用系统麦克风
      <br />
      <br />
      <Button onClick={handleStreamClick}>打开/关闭音频直播</Button>
      <br />
      <br />
      <AudioInput onStreaming={onStreaming} deviceSelectable={true} />
    </div>
  );
};

export default () => <LiveSteamDemo />;
