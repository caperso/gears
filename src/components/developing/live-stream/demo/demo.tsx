import React, { useEffect, useState } from 'react';
import { loadSystemDevices } from '../methods';
import './demo.less';

const LiveSteamDemo = () => {
  const [systemDevices, setSystemDevices] = useState<MediaDeviceInfo[]>();

  useEffect(() => {
    loadSystemDevices().then(devices => setSystemDevices(devices));
  }, []);

  //   useEffect(() => {
  //     loadSystemDevices().then(devices =>setSystemDevices(devices));
  //   },[systemDevices])

  return <div className="live-stream-demo-wrapper">使用系统麦克风 使用系统摄像头</div>;
};

export default () => <LiveSteamDemo />;
