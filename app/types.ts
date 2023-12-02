export interface Drum {
    id?: number,
    audioFileUrl: string,
    key: string,
    name: string
} 

export interface DrumMachineProps {
  drums: Drum[]
}

export interface DrumProps {
    drum: Drum
    onDrumClick: () => void
}

export interface Recording {
  id?: number,
  audioBlob: Blob,
  blobUrl: string
}