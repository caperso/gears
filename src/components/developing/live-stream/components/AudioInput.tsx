import React, { useEffect, useState } from 'react';
import { getAudioDevices } from '../methods';

export interface AudioInputProps {
  devices: MediaDeviceInfo[];
}

export const AudioInput: React.FC<AudioInputProps> = ({ devices = [] }) => {
  const [audioInputs, setAudioInputs] = useState<MediaDeviceInfo[]>();

  useEffect(() => {
    if (devices.length) {
      let inputs = getAudioDevices(devices, 'audioinput');
      setAudioInputs(inputs);
    }
  }, [devices]);

  return (
    <div>
      <select name="audio-select" id=""></select>
    </div>
  );
};
