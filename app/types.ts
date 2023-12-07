export interface Drum {
    id?: number,
    audioFileUrl: string,
    key: string,
    name: string
} 

export interface DrumMachine {
    drums: Drum[]
    name: string
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

export interface Sound {
    sound: Recording,
    name?: string
}

export interface FormData {
    currentSound?: Sound,
    allSounds?: Sound[]
}