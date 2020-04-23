import React, { useEffect, useState } from 'react';
import { getDevices, loadSystemDevices } from '../methods';

export interface AudioDeviceSelectorProps {
  //   setAudioInputs: (device: MediaDeviceInfo[]) => void;
}

export const AudioDeviceSelector = (props: AudioDeviceSelectorProps) => {
  //   const { setAudioInputs } = props;
  const [audioInputs, setAudioInputs] = useState<MediaDeviceInfo[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>();
  /* handle device change */
  const changeSelectedDevice = (e: any) => {
    // TODO:Change
    setSelectedDevice(e.target.value);
    console.log('change to', { ...e }, e.target.value);
  };

  useEffect(() => {
    loadSystemDevices().then(devices => {
      let inputs = getDevices(devices, 'audioinput');
      setAudioInputs(inputs);
    });
  }, []);
  return (
    <select name="audio-select" onChange={changeSelectedDevice} value={selectedDevice}>
      {audioInputs.map(item => (
        <option key={item.deviceId} id={item.deviceId} value={item.label}>
          {item.label}
        </option>
      ))}
    </select>
  );
};
