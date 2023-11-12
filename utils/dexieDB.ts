// dexieDB.ts
import { Drum, DrumMachine } from '@/app/types';
import Dexie, { type Table } from 'dexie';

export class DrumMachineDatabase extends Dexie {
  drums!: Table<Drum>; 
  drumMachines!: Table<DrumMachine>; 

  constructor() {
    super('drum-machine-database');
    this.version(1).stores({
      drums: '++id, createdAt', 
      drumMachines: '++id, createdAt',
    });
  }
}

const db = new DrumMachineDatabase();

// add new indexes for drumMachineId
db.version(3).stores({
  drums: '++id, createdAt, drumMachineId',
  drumMachines: '++id, createdAt, drumMachineId',
});

export default db;

