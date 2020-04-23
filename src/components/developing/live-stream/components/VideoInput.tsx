import React, { useEffect, useRef } from 'react';
import { getUserMedia } from '../methods';

interface VideoInputProps {
  onSelfie?: boolean; // return a video element showing selfie
  onStreaming?: boolean;
  getMediaStream?: (stream: MediaStream) => any;
}

export const VideoInput = (props: VideoInputProps) => {
  //   const [stream, setStream] = useState<MediaStream | undefined>();

  const { onSelfie = false, getMediaStream, onStreaming } = props;

  if (!onStreaming) {
    return <></>; // TODO: NOT ON STREAMING ALERT
  }

  const videoEle = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    getUserMedia({ audio: false }).then(s => {
      getMediaStream && getMediaStream(s);
      /* on selfie, giving video port */
      if (onSelfie && videoEle.current) {
        videoEle.current.srcObject = s;
      }
    });
  }, [onSelfie]);

  return onSelfie ? <video ref={videoEle} controls={true} autoPlay={true}></video> : <></>;
};
