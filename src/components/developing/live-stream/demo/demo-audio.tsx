import React, { useState } from 'react';
import { AudioInput } from '../components/AudioInput';
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
      <button onClick={handleStreamClick}>打开/关闭音频直播</button>
      <br />
      <br />
      <AudioInput onStreaming={onStreaming} />
    </div>
  );
};

export default () => <LiveSteamDemo />;
