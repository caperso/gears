import React, { useEffect, useRef, useState } from 'react';
import { getDevices, getUserMedia, loadSystemDevices } from '../methods';

export interface AudioInputProps {
  onStreaming: boolean;
  deviceSelectable?: boolean;
}

export const AudioInput: React.FC<AudioInputProps> = ({ onStreaming = false, deviceSelectable = false }) => {
  const [audioInputs, setAudioInputs] = useState<MediaDeviceInfo[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<MediaDeviceInfo>();

  /* handle device */
  const changeSelectedDevice = (e: any) => {
    // TODO:Change
    console.log('change to', e);
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
    if (!audioEle.current) {
      return;
    }

    onStreaming
      ? getUserMedia({ video: false }).then(userMedia => {
          if (audioEle.current) {
            audioEle.current.srcObject = userMedia;
          }
        })
      : (audioEle.current.srcObject = null);
  }, []);

  return (
    <div>
      {deviceSelectable && (
        <select name="audio-select" onChange={changeSelectedDevice}>
          {audioInputs.map(item => (
            <option key={item.deviceId} value={item.label}>
              {item.label}
            </option>
          ))}
        </select>
      )}

      <audio ref={audioEle} controls={true}></audio>
    </div>
  );
};
