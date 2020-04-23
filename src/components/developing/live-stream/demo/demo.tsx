import React, { useState } from 'react';
import { VideoInput } from '../components/VideoInput';
import './demo.less';

const LiveSteamDemo = () => {
  const [onStreaming, setOnStreaming] = useState(false);
  const [onSelfie, setOnSelfie] = useState(true);
  const handleStreamClick = () => {
    setOnStreaming(s => !s);
  };

  const handleSelfieClick = () => {
    setOnSelfie(s => !s);
  };

  return (
    <div className="live-stream-demo-wrapper">
      使用系统摄像头
      <br />
      <br />
      <button onClick={handleStreamClick}>打开/关闭直播</button>
      <br />
      <br />
      <button onClick={handleSelfieClick}>打开/关闭自拍画面</button>
      <br />
      <br />
      <VideoInput onStreaming={onStreaming} onSelfie={onSelfie} audio={false} />
    </div>
  );
};

export default () => <LiveSteamDemo />;
