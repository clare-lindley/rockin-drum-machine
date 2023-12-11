// dexieDB.ts
import { Drum, DrumMachine, Recording } from '@/app/types';
import Dexie, { type Table } from 'dexie';

export class DrumMachineDatabase extends Dexie {
  drums!: Table<Drum>; 
  drumMachines!: Table<DrumMachine>; 

  constructor() {
    super('drum-machine-database');
    this.version(1).stores({
      drums: '++id, name, drumMachineId, audioFileUrl, key',
      drumMachines: '++id, name',
    });
  }
}

const db = new DrumMachineDatabase();

export default db;

