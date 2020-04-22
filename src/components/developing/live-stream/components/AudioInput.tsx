import React, { useEffect, useState } from 'react';
import { getAudioDevices } from '../methods';

interface AudioInputDemoProps {
  devices: MediaDeviceInfo[];
}

const AudioInput: React.FC<AudioInputDemoProps> = ({ devices = [] }) => {
  const [audioInputs, setAudioInputs] = useState<MediaDeviceInfo[]>();

  useEffect(() => {
    if (devices.length) {
      let inputs = getAudioDevices(devices, 'audioinput');
      setAudioInputs(inputs);
    }
  }, [devices]);

  return <div></div>;
};

export default AudioInput;
