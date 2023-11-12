// utils/indexedDB.js @deprecated
const dbName:string = 'RockinDrumMachine';
const dbVersion:number = 1;


/**
 * 
 * openDatabase creates an indexDB request: IDBOpenDBRequest to open a database
 * Because indexedDB.open is an async operation we wrap it in a promise then we can call it with await inside
 * an async function
 * 
 * To handle the outcome we have to implement event handlers for the events that fire
 * inside these handlers we can resolve or reject the promise
 */
export const openDatabase = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(dbName, dbVersion)

    // assign a callback to the onerror property of IDBOpenDBRequest
    request.onerror = (event) => {
      const errorMessage = (event.target instanceof IDBOpenDBRequest) ? event.target.error : 'Unknown error'
      console.error(`IndexedDB error: ${errorMessage}`)
      reject(`IndexedDB error: ${errorMessage}`)
    };

    // assign a callback to the onsuccess property of IDBOpenDBRequest
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

    // assign a callback to the onupgradeneeded property of IDBOpenDBRequest
    request.onupgradeneeded = (event) => {
      if(event.target instanceof IDBOpenDBRequest){

        const customerData = [
          { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
          { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" },
        ]

        const db = event.target.result
        // Create an objectStore to hold information about our customers.
        // keyPath is your unique id column
        const objectStore = db.createObjectStore("customers", { keyPath: "ssn" })

        // Use transaction oncomplete to make sure the objectStore creation is
        // finished before adding data into it.

        objectStore.transaction.oncomplete = (event) => {
          // Store values in the newly created objectStore.
          const customerObjectStore = db
            .transaction("customers", "readwrite")
            .objectStore("customers")
          customerData.forEach((customer) => {
            customerObjectStore.add(customer)
          })
        }
      }

    }
  })
}

// Other functions for CRUD operations...


/* export const createRecord = (db: IDBDatabase, storeName: string, data: any): Promise<void> => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const objectStore = transaction.objectStore(storeName);

    const request = objectStore.add(data);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      const errorMessage = (event.target instanceof IDBRequest) ? event.target.error : 'Unknown error';
      console.error(`IndexedDB error during create operation: ${errorMessage}`);
      reject(`IndexedDB error: ${errorMessage}`);
    };
  });
};

export const readRecord = (db: IDBDatabase, storeName: string, key: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const objectStore = transaction.objectStore(storeName);

    const request = objectStore.get(key);

    request.onsuccess = (event) => {
      const result = (event.target instanceof IDBRequest) ? event.target.result : undefined;
      resolve(result);
    };

    request.onerror = (event) => {
      const errorMessage = (event.target instanceof IDBRequest) ? event.target.error : 'Unknown error';
      console.error(`IndexedDB error during read operation: ${errorMessage}`);
      reject(`IndexedDB error: ${errorMessage}`);
    };
  });
};

export const updateRecord = (db: IDBDatabase, storeName: string, key: any, newData: any): Promise<void> => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const objectStore = transaction.objectStore(storeName);

    const request = objectStore.put(newData, key);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      const errorMessage = (event.target instanceof IDBRequest) ? event.target.error : 'Unknown error';
      console.error(`IndexedDB error during update operation: ${errorMessage}`);
      reject(`IndexedDB error: ${errorMessage}`);
    };
  });
};

export const deleteRecord = (db: IDBDatabase, storeName: string, key: any): Promise<void> => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const objectStore = transaction.objectStore(storeName);

    const request = objectStore.delete(key);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      const errorMessage = (event.target instanceof IDBRequest) ? event.target.error : 'Unknown error';
      console.error(`IndexedDB error during delete operation: ${errorMessage}`);
      reject(`IndexedDB error: ${errorMessage}`);
    };
  });
}; */
