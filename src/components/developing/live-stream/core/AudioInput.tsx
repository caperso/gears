import React, { useEffect, useRef, useState } from 'react';
import { AudioControls } from '../components/AudioControls';
import { AudioDeviceSelector } from '../components/AudioDeviceSelector';
import { getUserMedia } from '../methods';
import { MediaInputProps } from '../typings/interfaces';

export interface AudioInputProps extends MediaInputProps {}

export const AudioInput: React.FC<AudioInputProps> = ({ onStreaming = false, recordControls = true, deviceSelectable = false }) => {
  const [stream, setStream] = useState<MediaStream>();

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
          setStream(userMedia);
        })
      : (audioEle.current.srcObject = null);
  }, []);

  return (
    <div>
      {deviceSelectable && <AudioDeviceSelector />}
      {recordControls && <AudioControls stream={stream} />}
      recordControls
      <audio ref={audioEle}></audio>
    </div>
  );
};
