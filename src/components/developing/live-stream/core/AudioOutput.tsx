import React, { useEffect, useRef } from 'react';
import { getUserMedia } from '../methods';

export const AudioOutput = () => {
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
      <audio src="" ref={audioEle} controls={true}></audio>
    </div>
  );
};
