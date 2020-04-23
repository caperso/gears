import React, { useEffect, useRef, useState } from 'react';
import { getDevices, getUserMedia, loadSystemDevices } from '../methods';

export interface AudioInputProps {
  devices?: MediaDeviceInfo[];
}

export const AudioInput: React.FC<AudioInputProps> = () => {
  const [audioInputs, setAudioInputs] = useState<MediaDeviceInfo[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<MediaDeviceInfo>();

  /* handle device */
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

  /* load sound streaming */
  const audioEle = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    getUserMedia({ video: false }).then(userMedia => {
      if (audioEle.current) {
        audioEle.current.srcObject = userMedia;
      }
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

      <audio src="" ref={audioEle} controls={true}></audio>
    </div>
  );
};
