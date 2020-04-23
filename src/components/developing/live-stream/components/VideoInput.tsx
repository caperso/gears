import React, { useEffect, useRef } from 'react';
import { getUserMedia } from '../methods';

export interface VideoInputProps {
  audio?: boolean; // audio input is optional
  onSelfie?: boolean; // return a video element showing selfie
  onStreaming?: boolean;
  getMediaStream?: (stream: MediaStream | null) => any;
}

export const VideoInput = (props: VideoInputProps) => {
  const { audio = true, onSelfie = false, getMediaStream, onStreaming } = props;
  const videoEle = useRef<HTMLVideoElement>(null);

  /* on streaming */
  useEffect(() => {
    if (!getMediaStream) {
      return;
    }
    onStreaming ? getUserMedia({ audio }).then(s => getMediaStream(s)) : getMediaStream(null);
  }, [onStreaming, getMediaStream]);

  /* on selfie, giving video port */
  useEffect(() => {
    getUserMedia({ audio }).then(s => {
      if (!videoEle.current) {
        return;
      }
      onStreaming ? (videoEle.current.srcObject = s) : (videoEle.current.srcObject = null);
    });
  }, [onStreaming, videoEle.current]);

  return onSelfie ? <video ref={videoEle} controls={true} autoPlay={true}></video> : <></>;
};
