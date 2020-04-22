import React, { useEffect, useState } from 'react';
import { getDevices, loadSystemDevices } from '../methods';

export interface AudioInputProps {
  devices?: MediaDeviceInfo[];
}

export const AudioInput: React.FC<AudioInputProps> = () => {
  const [audioInputs, setAudioInputs] = useState<MediaDeviceInfo[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<MediaDeviceInfo>();

  const changeSelectedDevice = (e: any) => {
    console.log(e);
  };
  useEffect(() => {
    loadSystemDevices().then(devices => {
      let inputs = getDevices(devices, 'audioinput');
      setAudioInputs(inputs);
      console.log(inputs);
    });
  }, []);

  return (
    <div>
      <select name="audio-select" onChange={changeSelectedDevice}>
        {audioInputs.map(item => (
          <option key={item.deviceId} value={item.label}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};
