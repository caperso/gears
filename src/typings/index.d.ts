declare var MediaRecorder: any;
declare var BlobEvent: { data: Blob };

declare type Recorder = {
  start: () => any;
  pause: () => any;
  resume: () => any;
  stop: () => any;
  requestData: () => any;
};
