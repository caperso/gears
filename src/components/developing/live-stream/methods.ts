interface MediaProps {
  video?: boolean;
  audio?: boolean;
}

type AudioDevice = 'audioinput' | 'audiooutput';
type VideoDevice = 'videoinput' | 'videooutput';

export async function loadSystemDevices() {
  let devices = await navigator.mediaDevices.enumerateDevices();
  return devices;
}

export function getDevices(devices: MediaDeviceInfo[], type: AudioDevice | VideoDevice): MediaDeviceInfo[] {
  let audioDevices = devices.filter(item => item.kind === type);
  return audioDevices;
}

export async function getUserMedia(props?: MediaProps) {
  let constraints = { video: true, audio: true, ...props };
  let stream = await navigator.mediaDevices.getUserMedia(constraints);
  return stream;
}
