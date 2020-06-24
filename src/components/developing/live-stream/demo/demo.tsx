import { Button } from 'antd';
import React, { useState } from 'react';
import { VideoInput } from '../core/VideoInput';
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
    <div className="demo-live-stream-wrapper">
      使用系统摄像头
      <br />
      <br />
      <Button onClick={handleStreamClick}>打开/关闭直播</Button>
      <br />
      <br />
      <Button onClick={handleSelfieClick}>打开/关闭自拍画面</Button>
      <br />
      <br />
      <VideoInput onStreaming={onStreaming} onSelfie={onSelfie} audio={false} />
    </div>
  );
};

export default () => <LiveSteamDemo />;
