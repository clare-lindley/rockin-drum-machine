// dexieDB.ts
import { Drum, Recording } from '@/app/types';
import Dexie, { type Table } from 'dexie';
import drums from './testData';

export class RockinDrumMachineDexie extends Dexie {
  drums!: Table<Drum>; 
  recordings!: Table<Recording>; 

  constructor() {
    super('rockin-drum-machine');
    this.version(1).stores({
      drums: '++id, audioFileUrl, key, name',
      recordings: '++id, audioBlob, blobUrl',
    });
  }
}

const db = new RockinDrumMachineDexie();

export default db;

