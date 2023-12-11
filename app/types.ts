// experimenting with types. tbh I prefer just optional ids
// but wanted to do sth a bit more complicated as a demo to show my
// understanding of this problem and the ways there are to solve it :)

interface InsertDrum {
    name: string,
    audioFileUrl: string,
    key: string,
    drumMachineId: number
} 

interface RetrieveDrum extends InsertDrum {
    id: number
}

export type Drum = InsertDrum | RetrieveDrum

interface InsertDrumMachine {
    name: string
}

interface RetrieveDrumMachine extends InsertDrumMachine {
    id: number, 
    drums: Drum[]
}

export type DrumMachine = InsertDrumMachine | RetrieveDrumMachine

export function isDrumMachineWithId(obj: DrumMachine): obj is RetrieveDrumMachine {
    return 'drums' in obj && 'id' in obj;
}

export function isDrumWithId(obj: Drum): obj is RetrieveDrum {
    return 'id' in obj;
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