export interface MediaInputProps {
  onStreaming: boolean;
  recordControls?: boolean;
  deviceSelectable?: boolean;
}

export interface RecorderControlsProps {
  stream?: MediaStream | null;
}
