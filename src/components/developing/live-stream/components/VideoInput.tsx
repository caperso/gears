import React, { useEffect, useRef } from 'react';
import { getUserMedia } from '../methods';

export const VideoInput = () => {
  //   const [stream, setStream] = useState<MediaStream | undefined>();
  const videoEle = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    getUserMedia().then(s => {
      if (videoEle.current) {
        videoEle.current.srcObject = s;
      }
    });
  }, []);
  return <video ref={videoEle} autoPlay={true}></video>;
};
