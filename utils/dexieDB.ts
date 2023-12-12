// dexieDB.ts
import { Drum, DrumMachine } from '@/app/types';
import Dexie, { type Table } from 'dexie';

export class DrumMachineDatabase extends Dexie {
  drums!: Table<Drum>; 
  drumMachines!: Table<DrumMachine>; 

  constructor() {
    super('drum-machine-database');
    this.version(1).stores({
      drums: '++id, createdAt', // it's an object store - we only declare cols we want to index on!
      drumMachines: '++id, createdAt',
    });
  }
}

const db = new DrumMachineDatabase();

export default db;

