export interface Drum {
    id: string,
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