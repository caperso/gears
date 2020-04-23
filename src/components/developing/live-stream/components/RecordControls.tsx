import React, { useEffect, useState } from 'react';
import { RecorderControlsProps } from '../typings/interfaces';

const defaultMIMEType = 'video/webm;codecs=h264';

export const RecordControls: React.FC<RecorderControlsProps> = ({ stream = null }) => {
  const [recorder, setRecorder] = useState<Recorder>();
  const [paused, setPaused] = useState<boolean>(false);

  /* check browser able to record */
  async function recorderGenerator(): Promise<void> {
    let result = MediaRecorder.isTypeSupported(defaultMIMEType);

    if (!result) {
      throw new Error(`Media MIME type: ${defaultMIMEType}, is not supported! `);
    }

    try {
      let recorder = await new MediaRecorder(stream);
      recorder.ondataavailable = finishRecording;
      setRecorder(recorder);
    } catch (e) {
      console.error(`failed to generate recorder, stream: %s error: %o`, stream, e);
    }
  }

  /* start checking when stream is loaded */
  useEffect(() => {
    if (stream) {
      recorderGenerator()
        .then(() => console.log('loaded'))
        .catch(() => console.log('failed'));
    }
  }, [stream]);

  /* when recorded */
  const finishRecording = () => {};

  /* handle recording */
  const startRecording = () => {
    recorder && recorder.start();
    console.log('%cSTARTED', 'color: #0fe');
  };

  const stopRecording = () => {
    recorder && recorder.stop();
    console.log('%cSTOPPED', 'color: red');
  };

  const pauseRecording = () => {
    recorder && recorder.pause();
    setPaused(true);
  };

  const resumeRecording = () => {
    recorder && recorder.resume();
    setPaused(false);
  };

  const requestRecordedData = () => {
    recorder && console.log(recorder.requestData());
  };

  return (
    <div>
      <button onClick={startRecording}> start</button>
      <button onClick={stopRecording}> stop</button>
      <button onClick={paused ? resumeRecording : pauseRecording}> pause/resume</button>
      falsy button
      <button onClick={requestRecordedData}> get data</button>
    </div>
  );
};
