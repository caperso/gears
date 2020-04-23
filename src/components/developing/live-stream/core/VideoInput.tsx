import React, { useEffect, useRef, useState } from 'react';
import { RecordControls } from '../components/RecordControls';
import { getUserMedia } from '../methods';
import { MediaInputProps } from '../typings/interfaces';

export interface VideoInputProps extends MediaInputProps {
  audio?: boolean; // audio input is optional
  onSelfie?: boolean; // return a video element showing selfie
  getMediaStream?: (stream: MediaStream | null) => any;
}

export const VideoInput = (props: VideoInputProps) => {
  const { audio = true, onSelfie = false, recordControls = true, getMediaStream, onStreaming } = props;

  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoEle = useRef<HTMLVideoElement>(null);

  /* load stream */
  useEffect(() => {
    onStreaming ? getUserMedia({ audio }).then(s => setStream(s)) : setStream(null);
  }, [getUserMedia, onStreaming]);

  /* on selfie,reflect to ref => video  */
  useEffect(() => {
    if (!videoEle.current) {
      return;
    }
    videoEle.current.srcObject = stream;
  }, [stream, videoEle.current]);

  /* need transport stream? */
  useEffect(() => {
    if (!getMediaStream) {
      return;
    }
    onStreaming ? getUserMedia({ audio }).then(s => getMediaStream(s)) : getMediaStream(null);
  }, [onStreaming, getMediaStream]);

  const renderSelfieVideo = () => <video ref={videoEle} controls={true} autoPlay={true}></video>;

  return (
    <>
      {onSelfie && renderSelfieVideo()}
      {recordControls && <RecordControls stream={stream} />}
    </>
  );
};
