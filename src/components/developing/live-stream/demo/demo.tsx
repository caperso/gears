import React from 'react';
import { AudioInput } from '../components/AudioInput';
import { VideoInput } from '../components/VideoInput';
import './demo.less';

const LiveSteamDemo = () => {
  return (
    <div className="live-stream-demo-wrapper">
      <br />
      使用系统麦克风
      <br />
      <AudioInput />
      <br />
      使用系统摄像头
      <br />
      <VideoInput />
    </div>
  );
};

export default () => <LiveSteamDemo />;
