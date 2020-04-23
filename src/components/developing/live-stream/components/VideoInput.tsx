import React, { useEffect, useRef } from 'react';
import { getUserMedia } from '../methods';

export interface VideoInputProps {
  audio?: boolean; // audio input is optional
  onSelfie?: boolean; // return a video element showing selfie
  onStreaming?: boolean;
  getMediaStream?: (stream: MediaStream) => any;
}

export const VideoInput = (props: VideoInputProps) => {
  //   const [stream, setStream] = useState<MediaStream | undefined>();

  const { audio = true, onSelfie = false, getMediaStream, onStreaming } = props;
  const videoEle = useRef<HTMLVideoElement>(null);

  /* on streaming */
  useEffect(() => {
    onStreaming && getMediaStream ? getUserMedia({ audio }).then(s => getMediaStream(s)) : void 0;
  }, [onStreaming, getMediaStream]);

  /* on selfie, giving video port */
  useEffect(() => {
    getUserMedia({ audio }).then(s => {
      if (!videoEle.current) {
        return;
      }
      onSelfie ? (videoEle.current.srcObject = s) : (videoEle.current.srcObject = null);
    });
  }, [onSelfie]);

  return onSelfie ? <video ref={videoEle} controls={true} autoPlay={true}></video> : <></>;
};
