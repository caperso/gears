import React from 'react';
import { AudioInput } from '../components/AudioInput';
import { AudioOutput } from '../components/AudioOutput';
import { VideoInput } from '../components/VideoInput';
import './demo.less';

const LiveSteamDemo = () => {
  return (
    <div className="live-stream-demo-wrapper">
      使用系统麦克风
      <AudioInput />
      <AudioOutput />
      使用系统摄像头
      <VideoInput />
    </div>
  );
};

export default () => <LiveSteamDemo />;
