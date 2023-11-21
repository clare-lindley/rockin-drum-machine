// dexieDB.ts


/**
 * Convert tasks to Drums
 * Stop inital insert happening more than once
 * Read Dexie best practises
 */



import { Drum } from '@/app/types';
import Dexie, { type Table } from 'dexie';
import drums from './testData';

export class RockinDrumMachineDexie extends Dexie {
  // Note: The 'drums' table/IDB object store is added by dexie when declaring the stores()
  // this is just so we can add a property 'drums' to the Dexie class and 
  // keep the type systen happy (note: we can use non-null assertion here as it's
  // part of a class definition)
  drums!: Table<Drum>; 

  constructor() {
    super('rockin-drum-machine');
    this.version(1).stores({
      drums: 'id, audioFileUrl, key, name'
    });
  }
}

const db = new RockinDrumMachineDexie();


const insertDrums = async () => {
    try {
      await db.drums.bulkAdd(drums);
      console.log('Drums inserted successfully!');
    } catch (error) {
      console.error('Error inserting drums:', error);
    }
  };
  
insertDrums();


export default db;

