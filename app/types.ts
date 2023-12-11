// experimenting with types. tbh I prefer just optional ids
// but wanted to do sth a bit more complicated as a demo to show my
// understanding of this problem and the ways there are to solve it :)
// so here we have separate interface for insert and retrieve to solve this problem
// and we export one Union type and use a typeguard to check for id
// I actually feel this gives me more confidence than an optional id but its a bit more
// fiddly to use 

interface InsertDrum {
    name: string,
    audioFileUrl: string,
    key: string,
    drumMachineId: number
} 
export interface DatabaseDrum extends InsertDrum {
    id: number
}
export type Drum = InsertDrum | DatabaseDrum

interface InsertDrumMachine {
    name: string
}
export interface DatabaseDrumMachine extends InsertDrumMachine {
    id: number, 
    drums: Drum[]
}
export type DrumMachine = InsertDrumMachine | DatabaseDrumMachine

export function isDrumMachineWithId(obj: DrumMachine): obj is DatabaseDrumMachine {
    return 'drums' in obj && 'id' in obj;
}

export function isDrumWithId(obj: Drum): obj is DatabaseDrum {
    return 'id' in obj;
}

export interface DrumMachineProps {
    drums: DatabaseDrum[];
};


export interface DrumProps {
    drum: DatabaseDrum
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