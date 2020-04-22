type AudioDevice = 'audioinput' | 'audiooutput';

export async function loadSystemDevices() {
  let devices = await navigator.mediaDevices.enumerateDevices();
  console.log(devices);
  return devices;
}

export function getAudioDevices(devices: MediaDeviceInfo[], type: AudioDevice): MediaDeviceInfo[] {
  let audioDevices = devices.filter(item => item.kind === type);
  return audioDevices;
}
