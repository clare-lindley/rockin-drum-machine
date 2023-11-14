// utils/indexedDB.js
const dbName:string = 'RockinDrumMachine';
const dbVersion:number = 1;

export const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(dbName, dbVersion)

    request.onerror = (event) => {
      const errorMessage = (event.target instanceof IDBOpenDBRequest) ? event.target.error : 'Unknown error';
      console.error(`IndexedDB error: ${errorMessage}`);
      reject(`IndexedDB error: ${errorMessage}`);
    };

    request.onsuccess = (event) => {
      // OK, look, event.target should not be null here but typescript
      // doesn't know that so let's keep the compiler happy and be thorough and deal 
      // with any potential edge cases :)
      if(event.target instanceof IDBOpenDBRequest){
        resolve(event.target.result)
      }
      else {
        reject('Unexpected result in IndexedDB onsuccess event.')
      }
    };

    request.onupgradeneeded = (event) => {
      if(event.target instanceof IDBOpenDBRequest){
        const db = event.target.result
        // Create object stores or perform other upgrade tasks here
      }

    };
  });
};

// Other functions for CRUD operations...
