import React, { useEffect, useState } from 'react';

export interface AudioControlsProps {
  stream?: MediaStream;
}

let defaultMIMEType = 'video/webm;codecs=h264';

export const AudioControls: React.FC<AudioControlsProps> = ({ stream = null }) => {
  const [recorder, setRecorder] = useState<Recorder>();
  const [paused, setPaused] = useState<boolean>(false);

  if (!stream) {
    return <></>;
  }

  async function recorderGenerator() {
    let result = MediaRecorder.isTypeSupported(defaultMIMEType);
    if (!result) {
      throw new Error();
    }
    let recorder = await new MediaRecorder(stream);
    setRecorder(recorder);
    return;
  }

  /* check browser able to record */
  useEffect(() => {
    recorderGenerator()
      .then(() => console.log('loaded'))
      .catch(() => console.warn('Media MIME type: %s, is not supported! ', defaultMIMEType));
  }, []);

  /* handle recording */
  const startRecording = () => {
    recorder && recorder.start();
  };

  const stopRecording = () => {
    recorder && recorder.stop();
  };

  const pauseRecording = () => {
    recorder && recorder.pause();
    setPaused(true);
  };

  const resumeRecording = () => {
    recorder && recorder.pause();
    setPaused(false);
  };

  return (
    <div>
      <button onClick={startRecording}> start</button>
      <button onClick={stopRecording}> stop</button>
      <button onClick={paused ? resumeRecording : pauseRecording}> pause/resume</button>
    </div>
  );
};
