import React, { useEffect, useRef } from 'react';
import { getUserMedia } from '../methods';
import { MediaInputProps } from '../typings/interfaces';

export interface VideoInputProps extends MediaInputProps {
  audio?: boolean; // audio input is optional
  onSelfie?: boolean; // return a video element showing selfie
  getMediaStream?: (stream: MediaStream | null) => any;
}

export const VideoInput = (props: VideoInputProps) => {
  const { audio = true, onSelfie = false, getMediaStream, onStreaming } = props;
  const videoEle = useRef<HTMLVideoElement>(null);

  /* on streaming,giving video port */
  useEffect(() => {
    if (!getMediaStream) {
      return;
    }
    onStreaming ? getUserMedia({ audio }).then(s => getMediaStream(s)) : getMediaStream(null);
  }, [onStreaming, getMediaStream]);

  useEffect(() => {
    getUserMedia({ audio }).then(s => {
      if (!videoEle.current) {
        return;
      }
      onStreaming ? (videoEle.current.srcObject = s) : (videoEle.current.srcObject = null);
    });
  }, [onStreaming, videoEle.current]);

  return (
    <>
      RecorderControls onSelfie ? <video ref={videoEle} controls={true} autoPlay={true}></video> : <></>;
    </>
  );
};
